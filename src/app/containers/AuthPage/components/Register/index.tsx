import {
  EditOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { PublicRoutes } from 'app/containers/Routing/routes';
import { actions, selectAuthLoading } from 'auth/slice';
import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { register: strings } = translations.authPage;

export function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);

  const onFinish = values => {
    dispatch(actions.login(values));
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{t(strings.pageTitle())}</title>
        <meta name="description" content={t(strings.pageDescription())} />
      </Helmet>

      <div className="isoSignInForm">
        <Form name="normal_login" className="auth-form" onFinish={onFinish}>
          <Form.Item
            name="firstName"
            className="isoInputWrapper"
            rules={[
              {
                required: true,
                message: t(strings.firstNameError()),
              },
            ]}
          >
            <Input
              prefix={<EditOutlined className="site-form-item-icon" />}
              placeholder={t(strings.firstName())}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            className="isoInputWrapper"
            rules={[
              {
                required: true,
                message: t(strings.lastNameError()),
              },
            ]}
          >
            <Input
              prefix={<EditOutlined className="site-form-item-icon" />}
              placeholder={t(strings.lastName())}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="username"
            className="isoInputWrapper"
            rules={[
              {
                required: true,
                message: t(translations.authPage.shared.usernameError()),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t(translations.authPage.shared.username())}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            className="isoInputWrapper"
            rules={[
              {
                required: true,
                message: t(strings.emailError()),
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={t(strings.email())}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="isoInputWrapper"
            rules={[
              {
                required: true,
                message: t(translations.authPage.shared.passwordError()),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={t(translations.authPage.shared.password())}
              size="large"
            />
          </Form.Item>

          <Form.Item className="isoLoginButton">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t(strings.tos())}</Checkbox>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={authLoading}
            >
              {t(strings.submitBtn())}
            </Button>
          </Form.Item>

          <p className="isoHelperText">{t(strings.help())}</p>
        </Form>
        <Divider>{t(translations.authPage.shared.or())}</Divider>
        <div className="isoCenterComponent isoHelperWrapper">
          <Link to={PublicRoutes.LOGIN}>{t(strings.login())}</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
