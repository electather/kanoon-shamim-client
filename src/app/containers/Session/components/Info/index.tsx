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
import { translations } from 'locales/i18n';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SessionResponse } from 'userResponse';
import {
  formatDate,
  formatMoney,
  localizeErrorMsg,
  statusCodeToResultStatus,
} from 'utils';
import { history } from 'utils/history';
import { useDataApi } from 'utils/hooks/useDataApi';

import { deleteSession } from '../../rest';

export function SessionInfo() {
  let { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [{ data: selectedSession, isLoading, isError }] = useDataApi<
    SessionResponse
  >(`sessions/${id}`, undefined, {
    fields: ['vehicle', 'creator'],
  });
  const user = useSelector(selectLoggedInUser);

  const editable =
    (selectedSession?.creator && selectedSession.creatorId === user?.id) ||
    user?.role === 'ADMIN';

  const deleteRequest = useCallback(async (id: string) => {
    const data = await deleteSession(id);
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
      <Helmet title={t(translations.pages.sessions.title())} />
      <Row>
        <Col span={24} sm={8}>
          <Typography.Title level={4}>جزئیات جلسه</Typography.Title>
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
              {selectedSession?.creator?.firstName}{' '}
              {selectedSession?.creator?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="تاریخ ایجاد" span={1}>
              {formatDate(selectedSession?.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="درمان شونده" span={4}>
              {selectedSession?.client?.firstName}{' '}
              {selectedSession?.client?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="دکتر معالج" span={4}>
              {selectedSession?.doctor?.firstName}{' '}
              {selectedSession?.doctor?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="اطلاعات برگزاری جلسه" span={2}>
              {formatDate(selectedSession?.startDate)} -{' '}
              {formatDate(selectedSession?.endDate)}
            </Descriptions.Item>
            <Descriptions.Item label="هزینه جلسه" span={2}>
              {formatMoney(selectedSession?.amount)}{' '}
            </Descriptions.Item>
            {user?.role !== 'SECRETARY' && (
              <Descriptions.Item label="یاد داشت های دکتر" span={4}>
                {selectedSession?.sessionNotes}
              </Descriptions.Item>
            )}
            {user?.role !== 'SECRETARY' && (
              <Descriptions.Item label="پرونده جلسه" span={4}>
                {selectedSession?.sessionFiles?.length}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>
    </React.Fragment>
  );
}
