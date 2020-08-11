import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import { RouteKeyType } from 'types/data';

const stripTrailingSlash = (str: string) => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

type Props = {
  singleOption: RouteKeyType;
  subMenuStyle?: React.CSSProperties;
  subMenuColor?: React.CSSProperties;
};

export const SidebarMenu: React.FC<Props> = React.memo(
  ({ singleOption, subMenuStyle, subMenuColor, ...rest }) => {
    let match = useRouteMatch();
    const { t } = useTranslation();

    const { key, label, Icon, children } = singleOption;
    const url = stripTrailingSlash(match.url);

    if (children) {
      return (
        <Menu.SubMenu
          key={key}
          title={
            <span className="isoMenuHolder" style={subMenuColor}>
              <Icon />
              <span className="nav-text">{t(label)}</span>
            </span>
          }
          {...rest}
        >
          {children
            .filter(item => !item.hideInSideBar)
            .map(child => {
              const linkTo = child.withoutDashboard
                ? `/${child.key}`
                : `${url}/${key}/${child.key}`;
              return (
                <Menu.Item
                  style={subMenuStyle}
                  key={`${key}.${child.key}`}
                  icon={child.Icon}
                >
                  <Link style={subMenuColor} to={linkTo}>
                    {t(child.label)}
                  </Link>
                </Menu.Item>
              );
            })}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={key} {...rest}>
        <Link to={`${url}/${key}`}>
          <span className="isoMenuHolder" style={subMenuColor}>
            <Icon />
            <span className="nav-text">{t(label)}</span>
          </span>
        </Link>
      </Menu.Item>
    );
  },
);
