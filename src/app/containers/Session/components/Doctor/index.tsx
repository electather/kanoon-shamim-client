import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Result,
  Skeleton,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import React, { useCallback, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ErrorResponse } from 'userResponse';
import {
  getBearerToken,
  getUploadedFileID,
  localizeErrorMsg,
  normFile,
  statusCodeToResultStatus,
} from 'utils';
import { formItemLayout } from 'utils/const';
import { history } from 'utils/history';

import { createSession, fetchSession, updateSession } from '../../rest';

export function NewSessionRequest() {
  let { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const handle = useFullScreenHandle();

  React.useEffect(() => {
    if (id) {
      const fetchSessionData = async (id: string) => {
        try {
          const data = await fetchSession(id);
          form.setFieldsValue({
            sessionNotes: data?.sessionNotes,
          });
        } catch (error) {
          setError(
            error?.response?.data ?? {
              message: 'لطفا اتصال خود را برسی نمایید!',
            },
          );
        }
      };
      setLoading(true);
      fetchSessionData(id);
      setDataLoaded(true);
      setLoading(false);
    }
  }, [id, form]);

  const onFinish = useCallback(
    async values => {
      const { attachment, ...rest } = values;

      const payload = {
        ...rest,
        attachmentId: getUploadedFileID(attachment),
      };

      setLoading(true);
      try {
        if (id) {
          const updated = await updateSession(id, payload);
          if (updated) {
            message.success('با موفقیت بروز رسانی شد!');
            setSuccess(true);
          }
        } else {
          const created = await createSession(payload);
          if (created) {
            message.success('بیمه با موفقیت ثبت شد!');
            setSuccess(true);
            form.resetFields();
          }
        }
      } catch {}
      setLoading(false);
    },
    [form, id],
  );

  const onUploadSketch = useCallback(
    async values => {
      const { attachment, ...rest } = values;

      const payload = {
        ...rest,
        attachmentId: getUploadedFileID(attachment),
      };

      setLoading(true);
      try {
        if (id) {
          const updated = await updateSession(id, payload);
          if (updated) {
            message.success('با موفقیت بروز رسانی شد!');
            setSuccess(true);
          }
        } else {
          const created = await createSession(payload);
          if (created) {
            message.success('بیمه با موفقیت ثبت شد!');
            setSuccess(true);
            form.resetFields();
          }
        }
      } catch {}
      setLoading(false);
    },
    [form, id],
  );

  if (error) {
    return (
      <Result
        status={statusCodeToResultStatus(error.statusCode)}
        title="خطایی رخ داد"
        subTitle={localizeErrorMsg(error)}
        extra={[
          <Button
            type="primary"
            key="new"
            onClick={() => history.push(`/dashboard/appointment/info/${id}`)}
          >
            بازگشت به جزئیات جلسه
          </Button>,
          <Button
            key="list"
            onClick={() => history.push('/dashboard/appointment/list')}
          >
            بازگشت به لیست جلسات
          </Button>,
        ]}
      />
    );
  }

  if (id && !dataLoaded) {
    return <Skeleton active />;
  }

  if (success) {
    return (
      <Result
        status="success"
        title="ثبت موفقیت آمیر"
        subTitle="جلسه با موفقیت در سیستم ثبت(بروز رسانی) شد. هم اکنون می توانید ادامه مراحل ثبت بیمه را انجام دهید."
        extra={[
          id ? (
            <Button
              type="primary"
              key="new"
              onClick={() => history.push(`/dashboard/appointment/info/${id}`)}
            >
              بازگشت به لیست جلسات
            </Button>
          ) : (
            <Button type="primary" key="new" onClick={() => setSuccess(false)}>
              ثبت جلسه جدید
            </Button>
          ),
          <Button
            key="list"
            onClick={() => history.push('/dashboard/appointment/list')}
          >
            بازگشت به لیست جلسات
          </Button>,
        ]}
      />
    );
  }
  return (
    <React.Fragment>
      <Helmet title="ثبت جزئیات جلسه" />
      <Typography.Title level={4}>ثبت جزئیات جلسه</Typography.Title>
      <Divider />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="ورود دستی اطلاعات" key="1">
          <Form
            {...formItemLayout}
            name="newInsurance"
            onFinish={onFinish}
            scrollToFirstError
            form={form}
          >
            <Form.Item name="sessionNotes" label="یادداشت های جلسه">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="یادداشت های جلسه">
              <Form.Item
                name="attachment"
                valuePropName="attachment"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  name="file"
                  headers={{ Authorization: getBearerToken() }}
                  action={process.env.REACT_APP_BASE_URL + 'file'}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">تصاویر جلسه را انتخاب کنید</p>
                  <p className="ant-upload-hint">
                    می توانید روی صفحه تصاویر مورد نظر را بکشید. یا روی باکس
                    کلیک کنید
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<CheckCircleOutlined />}
              >
                ثبت جلسه
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="استفاده از دفتر" key="2">
          <Button onClick={handle.enter}>تمام صفحه کردن</Button>
          <FullScreen handle={handle}>
            <CanvasDraw />
          </FullScreen>
          <Button
            type="primary"
            loading={loading}
            icon={<CheckCircleOutlined />}
          >
            ثبت جلسه
          </Button>
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
}
