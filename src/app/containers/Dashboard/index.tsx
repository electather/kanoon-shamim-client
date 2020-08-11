import { useWindowSize } from '@react-hook/window-size';
import { Layout } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectHeight } from 'settings/slice';

import { SideBar } from '../SideBar';
import { TopBar } from '../Topbar';
import { DashboardContainer } from './components/DashboardContainer';
import { DashboardGlobalStyles } from './components/DashboardGlobalStyles';
import { DashboardRoutes } from './DashboardRouter';

export function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(selectHeight);
  const [width, height] = useWindowSize();

  React.useEffect(() => {
    dispatch(actions.toggleAll({ width, height }));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <TopBar />
        <Layout>
          <SideBar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Layout.Content className="isomorphicContent">
              <DashboardRoutes />
            </Layout.Content>
            {/* <Layout.Footer>{t(translations.global.footerText())}</Layout.Footer> */}
          </Layout>
        </Layout>
      </Layout>
    </DashboardContainer>
  );
}
