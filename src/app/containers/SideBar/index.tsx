import { Layout, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectSettings } from 'settings/slice';

import { privateRoutes } from '../Routing/routes';
import { CustomScrollBar } from './components/CustomScrollbar';
import { Logo } from './components/Logo';
import { SidebarMenu } from './components/SideBarMenu';
import { SidebarWrapper } from './components/SidebarWrapper';

export function SideBar() {
  const dispatch = useDispatch();
  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    current,
    height,
  } = useSelector(selectSettings);

  function handleClick(e: any) {
    dispatch(actions.changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(actions.toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      key => !(openKeys.indexOf(key) > -1),
    );
    const latestCloseKey = openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1),
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(actions.changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = (key: string) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? 'vertical' : 'inline';
  const onMouseEnter = () => {
    if (collapsed && openDrawer === false) {
      dispatch(actions.toggleOpenDrawer({ openDrawer: true }));
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(actions.toggleOpenDrawer({ openDrawer: false }));
    }
    return;
  };
  return (
    <SidebarWrapper>
      <Layout.Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Logo collapsed={isCollapsed} />
        <CustomScrollBar style={{ height: height - 70 }}>
          <Menu
            onClick={handleClick}
            theme="dark"
            className="isoDashboardMenu"
            mode={mode}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={current}
            onOpenChange={onOpenChange}
          >
            {privateRoutes.map(singleOption => (
              <SidebarMenu key={singleOption.key} singleOption={singleOption} />
            ))}
          </Menu>
        </CustomScrollBar>
      </Layout.Sider>
    </SidebarWrapper>
  );
}
