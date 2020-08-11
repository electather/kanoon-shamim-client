export type ViewType = 'MobileView' | 'DesktopView' | 'TabView';

export type RouteKeyType = {
  key: string;
  label: string;
  Icon?: React.ForwardRefExoticComponent;
  children?: RouteKeyType[];
  withoutDashboard?: boolean;
  exact?: boolean;
  component: (props: unknown) => JSX.Element;
  hideInSideBar?: boolean;
};
