import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  message,
  Popconfirm,
  Result,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { InsuranceTimeLine } from 'app/components/InsuranceTimeLine';
import { selectLoggedInUser } from 'auth/slice';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { VehicleResponse } from 'userResponse';
import { formatDate, localizeErrorMsg, statusCodeToResultStatus } from 'utils';
import { history } from 'utils/history';
import { useDataApi } from 'utils/hooks/useDataApi';

import { alphabet } from '../../constants/alphabet';
import { deleteVehicle } from '../../rest';

export function VehicleInfo() {
  let { id } = useParams<{ id: string }>();
  const [{ data: selectedVehicle, isLoading, isError }] = useDataApi<
    VehicleResponse
  >(`vehicles/${id}`, undefined, {
    fields: ['tpi', 'bodyInsurance', 'creator', 'insurer'],
  });
  const user = useSelector(selectLoggedInUser);

  const removable =
    (selectedVehicle?.tpi?.length ?? 0) === 0 &&
    (selectedVehicle?.bodyInsurance?.length ?? 0) === 0;
  const editable =
    (selectedVehicle?.creator && selectedVehicle.creator.id === user?.id) ||
    user?.role === 'ADMIN';
  const deleteRequest = useCallback(async (id: string) => {
    const data = await deleteVehicle(id);
    if (data) {
      message.success('با موفقیت از سیستم پاک شد');
      history.goBack();
    }
  }, []);

  if (isError) {
    return (
      <Result
        status={statusCodeToResultStatus(isError.statusCode)}
        title="خطایی رخ داد"
        subTitle={localizeErrorMsg(isError)}
        extra={[
          <Button type="primary" key="new" onClick={() => history.goBack()}>
            بازگشت به صفحه قبل
          </Button>,
        ]}
      />
    );
  }

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <React.Fragment>
      <Helmet title="اطلاعات خودرو" />
      <Row>
        <Col span={24} sm={8}>
          <Typography.Title level={4}>اطلاعات خودرو</Typography.Title>
        </Col>
        <Col span={24} sm={16} style={{ textAlign: 'left', width: '100%' }}>
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            disabled={!editable}
            onClick={() => history.push(`/dashboard/vehicle/edit/${id}`)}
            style={{ margin: '0 10px' }}
          >
            ویرایش
          </Button>
          <Popconfirm
            placement="bottomLeft"
            title="آیا مطمئن هستید؟ این عمل غیر قابل بازگشت می باشد."
            onConfirm={() => deleteRequest(id)}
            okText="بله"
            cancelText="خیر"
          >
            <Button
              type="primary"
              danger
              shape="round"
              icon={<DeleteOutlined />}
              disabled={!removable}
            >
              حذف از سیستم
            </Button>
          </Popconfirm>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Descriptions bordered column={4}>
            <Descriptions.Item label="ایجاد شده توسط" span={3}>
              {selectedVehicle?.creator?.firstName}{' '}
              {selectedVehicle?.creator?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="تاریخ ایجاد" span={1}>
              {formatDate(selectedVehicle?.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="بیمه گزار" span={2}>
              <Link
                to={`/dashboard/users/info/${selectedVehicle?.insurer?.id}`}
              >
                {selectedVehicle?.insurer?.firstName}{' '}
                {selectedVehicle?.insurer?.lastName}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="صاحب خودرو" span={2}>
              {selectedVehicle?.ownerName} {selectedVehicle?.ownerLastName}
            </Descriptions.Item>
            <Descriptions.Item label="شماره موتور" span={4}>
              {selectedVehicle?.engineNumber}
            </Descriptions.Item>
            {selectedVehicle?.chassisNumber && (
              <Descriptions.Item label="شماره شاسی" span={4}>
                {selectedVehicle?.chassisNumber}
              </Descriptions.Item>
            )}
            {selectedVehicle?.plateFirstTwoNumbers && (
              <Descriptions.Item label="پلاک خودرو" span={4}>
                {selectedVehicle?.plateFirstTwoNumbers}{' '}
                {alphabet[selectedVehicle?.plateLetter || 1]}{' '}
                {selectedVehicle?.plateLastThreeNumbers}-
                {selectedVehicle?.plateIRNumber}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>
      <Divider />

      <Row gutter={[8, 32]}>
        <Col span={24} lg={12}>
          <InsuranceTimeLine
            title="بیمه های شخص ثالث ثبت شده"
            list={selectedVehicle?.tpi}
            url="tpi"
          />
        </Col>
        <Col span={24} lg={12}>
          <InsuranceTimeLine
            title="بیمه های بدنه ثبت شده"
            list={selectedVehicle?.bodyInsurance}
            url="bii"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
