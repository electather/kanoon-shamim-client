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
import { selectLoggedInUser } from 'auth/slice';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TPIResponse } from 'userResponse';
import {
  formatDate,
  formatMoney,
  localizeErrorMsg,
  statusCodeToResultStatus,
} from 'utils';
import { history } from 'utils/history';
import { useDataApi } from 'utils/hooks/useDataApi';

import { deleteTpi } from '../../rest';

export function TPIInfo() {
  let { id } = useParams<{ id: string }>();
  const [{ data: selectedInsurance, isLoading, isError }] = useDataApi<
    TPIResponse
  >(`third-party/${id}`, undefined, {
    fields: ['vehicle', 'creator'],
  });
  const user = useSelector(selectLoggedInUser);

  const editable =
    (selectedInsurance?.creator && selectedInsurance.creator.id === user?.id) ||
    user?.role === 'ADMIN';

  const deleteRequest = useCallback(async (id: string) => {
    const data = await deleteTpi(id);
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
      <Helmet title="اطلاعات بیمه" />
      <Row>
        <Col span={24} sm={8}>
          <Typography.Title level={4}>اطلاعات بیمه</Typography.Title>
        </Col>
        <Col span={24} sm={16} style={{ textAlign: 'left', width: '100%' }}>
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            disabled={!editable}
            onClick={() => history.push(`/dashboard/tpi/edit/${id}`)}
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
              disabled={!editable}
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
              {selectedInsurance?.creator?.firstName}{' '}
              {selectedInsurance?.creator?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="تاریخ ایجاد" span={1}>
              {formatDate(selectedInsurance?.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="شماره بیمه" span={4}>
              {selectedInsurance?.bimeNumber}
            </Descriptions.Item>
            <Descriptions.Item label="بیمه گزار" span={2}>
              <Link
                to={`/dashboard/users/info/${selectedInsurance?.insurerId}`}
              >
                {selectedInsurance?.insurer?.firstName}{' '}
                {selectedInsurance?.insurer?.lastName}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="مدت زمان بیمه" span={2}>
              {formatDate(selectedInsurance?.startDate)} -{' '}
              {formatDate(selectedInsurance?.endDate)}
            </Descriptions.Item>
            <Descriptions.Item label="اطلاعات پرداخت" span={4}>
              مبلغ {formatMoney(selectedInsurance?.fullAmount)} به صورت{' '}
              {selectedInsurance?.isCash ? 'نقدی' : 'اقساطی'}
            </Descriptions.Item>
            <Descriptions.Item label="صاحب خودرو" span={4}>
              <Link
                to={`/dashboard/vehicle/info/${selectedInsurance?.vehicle?.id}`}
              >
                {selectedInsurance?.vehicle.ownerName}{' '}
                {selectedInsurance?.vehicle.ownerLastName}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="شماره موتور" span={4}>
              {selectedInsurance?.vehicle?.engineNumber}
            </Descriptions.Item>
            {selectedInsurance?.vehicle?.chassisNumber && (
              <Descriptions.Item label="شماره شاسی" span={4}>
                {selectedInsurance?.vehicle?.chassisNumber}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>
    </React.Fragment>
  );
}
