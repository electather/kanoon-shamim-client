import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
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
import { translations } from 'locales/i18n';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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

import { deleteUser } from '../../rest';

export function UserInfo() {
  let { id } = useParams<{ id: string }>();
  const { findOne } = translations.pages.users.dataTab;
  const { t } = useTranslation();
  const [{ data: selectedUser, isLoading, isError }] = useDataApi<UserData>(
    `users/${id}`,
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
  const user = useSelector(selectLoggedInUser);
  const location: any = useSelector(selectRouter);

  const removable = selectedUser?.vehicles && selectedUser.vehicles.length < 1;
  const editable =
    (selectedUser?.creator && selectedUser.creator.id === user?.id) ||
    user?.role === 'ADMIN';
  const deleteUserRequest = useCallback(async (id: string) => {
    const data = await deleteUser(id);
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
        onClick={() => history.push(`/dashboard/users/edit/${id}`)}
        style={{ margin: '0 10px' }}
      >
        ویرایش
      </Button>
      <Popconfirm
        placement="bottomLeft"
        title="آیا مطمئن هستید؟ این عمل غیر قابل بازگشت می باشد."
        onConfirm={() => deleteUserRequest(id)}
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
          selectedUser
            ? `${selectedUser?.firstName} ${selectedUser?.lastName}`
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
              اطلاعات {selectedUser?.firstName} {selectedUser?.lastName}
            </span>
          }
          key="info"
        >
          <Typography.Title level={4}>اطلاعات کاربر</Typography.Title>
          <Divider />
          <Descriptions bordered column={4}>
            <Descriptions.Item label={t(findOne.elements.avatar())} span={1}>
              <Avatar src={selectedUser?.avatar?.url} />
            </Descriptions.Item>
            <Descriptions.Item label="ایجاد شده توسط" span={2}>
              {selectedUser?.creator?.firstName}{' '}
              {selectedUser?.creator?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="تاریخ ایجاد" span={1}>
              {formatDate(selectedUser?.createdAt)}
            </Descriptions.Item>

            <Descriptions.Item label={t(findOne.elements.firstName())} span={3}>
              {selectedUser?.firstName} {selectedUser?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label={t(findOne.elements.role())} span={2}>
              {formatAccess(selectedUser?.role)}
            </Descriptions.Item>
            <Descriptions.Item label={t(findOne.elements.phone())} span={2}>
              <a href={`tel:+98${selectedUser?.phone}`} dir="ltr">
                0{selectedUser?.phone}
              </a>
            </Descriptions.Item>
          </Descriptions>
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
}
