import { CheckCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Result,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ErrorResponse } from 'userResponse';
import { localizeErrorMsg, statusCodeToResultStatus } from 'utils';
import { formItemLayout } from 'utils/const';
import { history } from 'utils/history';

import { createClients, fetchClient, updateClient } from '../../rest';

export function NewClientRequest() {
  let { id } = useParams<{ id: string }>();
  const title = id ? 'ویرایش کاربر' : 'ثبت کاربر جدید';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (id) {
      const fetchClientData = async (id: string) => {
        try {
          const data = await fetchClient(id, { params: { fields: ['info'] } });
          form.setFieldsValue({
            firstName: data?.firstName,
            lastName: data?.lastName,
            phone: data?.phone,
            role: data?.role,
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
      fetchClientData(id);
      setDataLoaded(true);
      setLoading(false);
    }
  }, [id, form]);

  const onFinish = useCallback(
    async values => {
      setLoading(true);
      try {
        if (id) {
          const updated = await updateClient(id, values);
          if (updated) {
            message.success('با موفقیت بروز رسانی شد!');
            setSuccess(true);
          }
        } else {
          const created = await createClients(values);
          if (created) {
            message.success('کاربر با موفقیت ثبت شد!');
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
            onClick={() => history.push(`/dashboard/clients/info/${id}`)}
          >
            بازگشت به پروفایل کاربر
          </Button>,
          <Button
            key="list"
            onClick={() => history.push('/dashboard/clients/list')}
          >
            بازگشت به لیست کاربران
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
        subTitle="کاربر با موفقیت در سیستم ثبت(بروز رسانی) شد. هم اکنون می توانید ادامه مراحل ثبت خودرو و بیمه را انجام دهید."
        extra={[
          id ? (
            <Button
              type="primary"
              key="new"
              onClick={() => history.push(`/dashboard/clients/info/${id}`)}
            >
              بازگشت به پروفایل کاربر
            </Button>
          ) : (
            <Button type="primary" key="new" onClick={() => setSuccess(false)}>
              ثبت کاربر جدید
            </Button>
          ),
          <Button
            key="list"
            onClick={() => history.push('/dashboard/clients/list')}
          >
            بازگشت به لیست کاربران
          </Button>,
        ]}
      />
    );
  }
  return (
    <React.Fragment>
      <Helmet title={title} />
      <Typography.Title level={4}>{title}</Typography.Title>
      <Divider />
      <Form
        {...formItemLayout}
        name="newClient"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item label="نام">
          <Input.Group compact>
            <Form.Item
              name="firstName"
              noStyle
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'نام نمیتواند خالی باشد',
                },
                {
                  pattern: /^[\u0600-\u06FF\s]+$/,
                  message: 'نام باید فارسی نوشته شده باشد',
                },
              ]}
            >
              <Input style={{ width: '50%' }} placeholder="نام " />
            </Form.Item>
            <Form.Item
              name="lastName"
              noStyle
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'نام خانوادگی اجباری است',
                },
                {
                  pattern: /^[\u0600-\u06FF\s]+$/,
                  message: 'نام خانوادگی باید فارسی نوشته شده باشد',
                },
              ]}
            >
              <Input style={{ width: '50%' }} placeholder="نام خانوادگی" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        {/* <Form.Item
          name="melliCode"
          label={t(ClientsTranslations.melliCode.label())}
          rules={[
            {
              required: true,
              message: t(ClientsTranslations.melliCode.emptyError()),
            },
            {
              validator: (_, value) =>
                melliCodeValidator(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      t(ClientsTranslations.melliCode.invalidError()),
                    ),
            },
          ]}
        >
          <Input disabled={!!id} maxLength={10} />
        </Form.Item> */}
        <Form.Item
          name="phone"
          label="موبایل"
          rules={[
            {
              required: true,
              message: 'وارد کردن شماره موبایل اجباری است',
            },
            {
              pattern: /^9[0-9][0-9]{8}$/,
              message: 'شماره موبایل وارد شده معتبر نیست',
            },
          ]}
        >
          <Input addonAfter="+98" maxLength={10} />
        </Form.Item>
        <Form.Item
          name="role"
          label="سطح دسترسی"
          rules={[
            {
              required: true,
              message: 'وارد کردن شماره موبایل اجباری است',
            },
          ]}
        >
          <Select>
            <Select.Option value="SECRETARY">منشی</Select.Option>
            <Select.Option value="DOCTOR">دکتر</Select.Option>
            <Select.Option value="ADMIN">مدیر</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button.Group>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckCircleOutlined />}
              loading={loading}
            >
              ثبت کاربر
            </Button>
            <Button
              icon={<RollbackOutlined />}
              onClick={() => history.goBack()}
            >
              بازگشت
            </Button>
          </Button.Group>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
