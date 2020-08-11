import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { PublicRoutes } from 'app/containers/Routing/routes';
import { actions, selectAuthLoading } from 'auth/slice';
import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { login: strings } = translations.authPage;

export function Login() {
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
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
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
              type="password"
              placeholder={t(translations.authPage.shared.password())}
              size="large"
            />
          </Form.Item>

          <Form.Item className="isoLoginButton">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t(strings.rememberCheckBox())}</Checkbox>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={authLoading}
            >
              {t(strings.signIn())}
            </Button>
          </Form.Item>

          <p className="isoHelperText">{t(strings.help())}</p>
        </Form>
        <Divider>{t(translations.authPage.shared.or())}</Divider>
        <div className="isoInputWrapper isoOtherLogin">
          <Button type="primary" className="btnFacebook" disabled={authLoading}>
            {t(strings.facebook())}
          </Button>
          <Button
            type="primary"
            className="btnGooglePlus"
            disabled={authLoading}
          >
            {t(strings.google())}
          </Button>

          <Button type="primary" className="btnAuthZero" disabled={authLoading}>
            {t(strings.auth0())}
          </Button>
        </div>
        <div className="isoCenterComponent isoHelperWrapper">
          <Link to={PublicRoutes.FORGOT_PASSWORD} className="isoForgotPass">
            {t(strings.forgotPass())}
          </Link>
          <Link to={PublicRoutes.REGISTER}>{t(strings.createAcc())}</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
