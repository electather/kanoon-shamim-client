import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Descriptions,
  Divider,
  message,
  Popconfirm,
  Result,
  Skeleton,
  Tabs,
  Typography,
} from 'antd';
import { selectLoggedInUser } from 'auth/slice';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectRouter } from 'settings/slice';
import { UserData } from 'userResponse';
import {
  formatAccess,
  formatDate,
  localizeErrorMsg,
  statusCodeToResultStatus,
} from 'utils';
import { history } from 'utils/history';
import { useDataApi } from 'utils/hooks/useDataApi';

import { deleteClient } from '../../rest';

export function ClientInfo() {
  let { id } = useParams<{ id: string }>();
  const [{ data: selectedClient, isLoading, isError }] = useDataApi<UserData>(
    `clients/${id}`,
    undefined,
    // {
    //   fields: [
    //     'info',
    //     'avatar',
    //     'vehicles',
    //     'tpi',
    //     'tpi.vehicle',
    //     'bi',
    //     'bi.vehicle',
    //     'creator',
    //   ],
    // },
  );
  const client = useSelector(selectLoggedInUser);
  const location: any = useSelector(selectRouter);

  const removable = true;
  const editable =
    (selectedClient?.creator && selectedClient.creator.id === client?.id) ||
    client?.role === 'ADMIN';
  const deleteClientRequest = useCallback(async (id: string) => {
    const data = await deleteClient(id);
    if (data) {
      message.success('با موفقیت از سیستم پاک شد');
      history.goBack();
    }
  }, []);

  const operations = (
    <div>
      <Button
        type="primary"
        shape="round"
        icon={<EditOutlined />}
        disabled={!editable}
        onClick={() => history.push(`/dashboard/clients/edit/${id}`)}
        style={{ margin: '0 10px' }}
      >
        ویرایش
      </Button>
      <Popconfirm
        placement="bottomLeft"
        title="آیا مطمئن هستید؟ این عمل غیر قابل بازگشت می باشد."
        onConfirm={() => deleteClientRequest(id)}
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
    </div>
  );

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
      <Helmet
        title={
          selectedClient
            ? `${selectedClient?.firstName} ${selectedClient?.lastName}`
            : 'اطلاعات کاربر'
        }
      />
      <Tabs
        defaultActiveKey="info"
        activeKey={location?.query?.activeKey}
        onChange={key =>
          history.replace({
            search: '?activeKey=' + key,
          })
        }
        tabBarExtraContent={operations}
      >
        <Tabs.TabPane
          tab={
            <span>
              <UserOutlined />
              اطلاعات {selectedClient?.firstName} {selectedClient?.lastName}
            </span>
          }
          key="info"
        >
          <Typography.Title level={4}>اطلاعات کاربر</Typography.Title>
          <Divider />
          <Descriptions bordered column={4}>
            <Descriptions.Item label="ایجاد شده توسط" span={2}>
              {selectedClient?.creator?.firstName}{' '}
              {selectedClient?.creator?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="تاریخ ایجاد" span={1}>
              {formatDate(selectedClient?.createdAt)}
            </Descriptions.Item>

            <Descriptions.Item label="نام" span={3}>
              {selectedClient?.firstName} {selectedClient?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="سطح دسترسی" span={2}>
              {formatAccess(selectedClient?.role)}
            </Descriptions.Item>
            <Descriptions.Item label="موبایل" span={2}>
              <a href={`tel:+98${selectedClient?.phone}`} dir="ltr">
                0{selectedClient?.phone}
              </a>
            </Descriptions.Item>
          </Descriptions>
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
}
