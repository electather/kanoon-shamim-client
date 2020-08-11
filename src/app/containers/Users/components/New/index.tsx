import {
  CheckCircleOutlined,
  InboxOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Result,
  Skeleton,
  Typography,
  Upload,
} from 'antd';
import { translations } from 'locales/i18n';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import { melliCodeValidator } from 'utils/validation';

import { createUser, fetchUser, updateUser } from '../../rest';

export function NewUserRequest() {
  const { t } = useTranslation();
  let { id } = useParams<{ id: string }>();
  const title = id ? 'ویرایش کاربر' : 'ثبت کاربر جدید';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const { form: UsersTranslations } = translations.pages.users.newTab;

  React.useEffect(() => {
    if (id) {
      const fetchUserData = async (id: string) => {
        try {
          const data = await fetchUser(id, { params: { fields: ['info'] } });
          form.setFieldsValue({
            firstName: data?.firstName,
            lastName: data?.lastName,
            melliCode: data?.info?.melliCode,
            phone: data?.phone,
            address: data?.info?.address,
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
      fetchUserData(id);
      setDataLoaded(true);
      setLoading(false);
    }
  }, [id, form]);

  const onFinish = useCallback(
    async values => {
      const {
        avatar,
        melliCardScanBack,
        melliCardScanFront,
        payrollScan,
        ...rest
      } = values;

      const payload = {
        ...rest,
        avatarId: getUploadedFileID(avatar),
        melliCardScanFrontId: getUploadedFileID(melliCardScanFront),
        melliCardScanBackId: getUploadedFileID(melliCardScanBack),
        payrollScanId: getUploadedFileID(payrollScan),
      };
      setLoading(true);
      try {
        if (id) {
          const updated = await updateUser(id, payload);
          if (updated) {
            message.success('با موفقیت بروز رسانی شد!');
            setSuccess(true);
          }
        } else {
          const created = await createUser(payload);
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
            onClick={() => history.push(`/dashboard/users/info/${id}`)}
          >
            بازگشت به پروفایل کاربر
          </Button>,
          <Button
            key="list"
            onClick={() => history.push('/dashboard/users/list')}
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
              onClick={() => history.push(`/dashboard/users/info/${id}`)}
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
            onClick={() => history.push('/dashboard/users/list')}
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
        name="newUser"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item label={t(UsersTranslations.fullName.label())}>
          <Input.Group compact>
            <Form.Item
              name="firstName"
              noStyle
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t(UsersTranslations.fullName.emptyError()),
                },
                {
                  pattern: /^[\u0600-\u06FF\s]+$/,
                  message: t(UsersTranslations.fullName.invalidError()),
                },
              ]}
            >
              <Input
                style={{ width: '50%' }}
                placeholder={t(UsersTranslations.fullName.fName())}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              noStyle
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t(UsersTranslations.fullName.emptyError()),
                },
                {
                  pattern: /^[\u0600-\u06FF\s]+$/,
                  message: t(UsersTranslations.fullName.invalidError()),
                },
              ]}
            >
              <Input
                style={{ width: '50%' }}
                placeholder={t(UsersTranslations.fullName.lName())}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="melliCode"
          label={t(UsersTranslations.melliCode.label())}
          rules={[
            {
              required: true,
              message: t(UsersTranslations.melliCode.emptyError()),
            },
            {
              validator: (_, value) =>
                melliCodeValidator(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      t(UsersTranslations.melliCode.invalidError()),
                    ),
            },
          ]}
        >
          <Input disabled={!!id} maxLength={10} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t(UsersTranslations.phone.label())}
          rules={[
            {
              required: true,
              message: t(UsersTranslations.phone.emptyError()),
            },
            {
              pattern: /^9[0-9][0-9]{8}$/,
              message: t(UsersTranslations.phone.invalidError()),
            },
          ]}
        >
          <Input addonAfter="+98" maxLength={10} />
        </Form.Item>
        <Form.Item name="address" label={t(UsersTranslations.address.label())}>
          <Input.TextArea disabled={!!id} />
        </Form.Item>

        <Form.Item label={t(UsersTranslations.melliCardScanFront.label())}>
          <Form.Item
            name="melliCardScanFront"
            valuePropName="melliCardScanFront"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              disabled={!!id}
              name="file"
              headers={{ Authorization: getBearerToken() }}
              action={process.env.REACT_APP_BASE_URL + 'file'}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t(UsersTranslations.melliCardScanFront.guide())}
              </p>
              <p className="ant-upload-hint">
                {t(UsersTranslations.melliCardScanFront.help())}
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label={t(UsersTranslations.melliCardScanBack.label())}>
          <Form.Item
            name="melliCardScanBack"
            valuePropName="melliCardScanBack"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              disabled={!!id}
              headers={{ Authorization: getBearerToken() }}
              action={process.env.REACT_APP_BASE_URL + 'file'}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t(UsersTranslations.melliCardScanBack.guide())}
              </p>
              <p className="ant-upload-hint">
                {t(UsersTranslations.melliCardScanBack.help())}
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label={t(UsersTranslations.payrollScan.label())}>
          <Form.Item
            name="payrollScan"
            valuePropName="attachment"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              disabled={!!id}
              headers={{ Authorization: getBearerToken() }}
              action={process.env.REACT_APP_BASE_URL + 'file'}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t(UsersTranslations.payrollScan.guide())}
              </p>
              <p className="ant-upload-hint">
                {t(UsersTranslations.payrollScan.help())}
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label={t(UsersTranslations.avatar.label())}>
          <Form.Item
            name="avatar"
            valuePropName="attachment"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              disabled={!!id}
              headers={{ Authorization: getBearerToken() }}
              action={process.env.REACT_APP_BASE_URL + 'file'}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t(UsersTranslations.avatar.guide())}
              </p>
              <p className="ant-upload-hint">
                {t(UsersTranslations.avatar.help())}
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button.Group>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckCircleOutlined />}
              loading={loading}
            >
              {t(UsersTranslations.submit())}
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
