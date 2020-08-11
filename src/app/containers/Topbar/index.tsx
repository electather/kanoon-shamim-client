import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectCollapsed, selectOpenDrawer } from 'settings/slice';

import { TopbarWrapper } from './components/TopbarWrapper';
import { LanguageSwitcher } from './LanguageSwitcher';
import { TopBarUser } from './TopbarUser';

export function TopBar() {
  const collapsed = useSelector(selectCollapsed);
  const openDrawer = useSelector(selectOpenDrawer);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(
    () => dispatch(actions.toggleCollapsed()),
    [dispatch],
  );
  const isCollapsed = collapsed && !openDrawer;
  const styling: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  return (
    <TopbarWrapper>
      <Layout.Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <MenuOutlined
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            onClick={handleToggle}
          />
        </div>

        <div className="isoRight">
          <LanguageSwitcher />
          <TopBarUser />
        </div>
      </Layout.Header>
    </TopbarWrapper>
  );
}
