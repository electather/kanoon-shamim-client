import {
  CloudServerOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { actions, selectLoggedInUser } from 'auth/slice';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleDevServer } from 'utils';

import { HeaderDropdownWrapper } from './components/HeaderDropdownWrapper';

export function TopBarUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loggedInUser = useSelector(selectLoggedInUser);
  const handleLogout = React.useCallback(() => dispatch(actions.logout()), [
    dispatch,
  ]);
  const content = (
    <Menu className="menu" selectedKeys={[]}>
      <Menu.Item key="center">
        <Link className="isoDropdownLink" to="/dashboard/my-profile">
          <UserOutlined />
          {t(translations.topBar.userDropDown.myProfile())}
        </Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        {t(translations.topBar.userDropDown.settings())}
      </Menu.Item>
      {process.env.NODE_ENV === 'development' && (
        <Menu.Item
          key="devServer"
          onClick={() => {
            toggleDevServer();
            window.location.reload();
          }}
        >
          <CloudServerOutlined />
          تغییر سرور
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined />
        {t(translations.topBar.userDropDown.logout())}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={content}>
      <HeaderDropdownWrapper>
        <Avatar
          size="default"
          className="avatar"
          src={loggedInUser?.avatar?.url}
          alt="avatar"
          icon={<UserOutlined />}
        />
        <span className="name">
          {loggedInUser?.firstName} {loggedInUser?.lastName}
        </span>
      </HeaderDropdownWrapper>
    </Dropdown>
  );
}
