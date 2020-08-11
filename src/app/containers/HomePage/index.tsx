import {
  DollarCircleFilled,
  FileTextFilled,
  StarFilled,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { Sticker } from 'app/components/Widgets/Sticker';
import { selectLoggedInUser } from 'auth/slice';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { OneLookDto } from 'userResponse';
import { formatAccess, formatMoney } from 'utils';
import { useDataApi } from 'utils/hooks/useDataApi';

import { homepageSaga } from './redux/saga';
import { actions, reducer, selectRenewal, sliceKey } from './redux/slice';
import { RenewalList } from './RenewalList';
export function Home() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const { expireList, loading } = useSelector(selectRenewal);
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homepageSaga });
  const [{ data: dataList }] = useDataApi<OneLookDto>(
    `stats/one-look`,
    undefined,
    {
      startDateMin: dayjs(dayjs().calendar('jalali').startOf('month'))
        .calendar('gregory')
        .format('YYYY-MM-DD'),
      startDateMax: dayjs().calendar('gregory').format('YYYY-MM-DD'),
      interval: 'day',
    },
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getList = () => {
      dispatch(actions.fetchExpiryList({ page: 1 }));
    };
    getList();
  }, [dispatch]);
  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col xxl={6} xl={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#1abc9c"
            fontColor="#fff"
            description="سطح دسترسی"
            value={formatAccess(loggedInUser?.role)}
            icon={<StarFilled />}
          />
        </Col>
        <Col xxl={6} xl={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#8e44ad"
            fontColor="#fff"
            description="بیمه شخص ثالث این ماه"
            value={dataList?.tpiCount ?? 0}
            icon={<FileTextFilled />}
          />
        </Col>
        <Col xxl={6} xl={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#2980b9"
            fontColor="#fff"
            description="بیمه بدنه این ماه"
            value={dataList?.bodyInsuranceCount ?? 0}
            icon={<FileTextFilled />}
          />
        </Col>
        <Col xxl={6} xl={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#2c3e50"
            fontColor="#fff"
            description="پورسانت کل این ماه"
            value={formatMoney(dataList?.totalCommission) ?? 0}
            icon={<DollarCircleFilled />}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
          <RenewalList
            data={expireList?.tpi}
            loading={loading}
            title="بیمه های شخص ثالث در حال انقضای شما "
          />
        </Col>
        <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
          <RenewalList
            data={expireList?.bii}
            loading={loading}
            title="بیمه های بدنه در حال انقضای شما"
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
