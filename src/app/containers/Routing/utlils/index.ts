import { isServer } from 'utils';

import { privateRoutes } from '../routes';

export function getDefaultPath() {
  const getParent = (lastRoute: string) => {
    const parent: string[] = [];
    if (!lastRoute) return parent;
    parent.push(lastRoute);
    privateRoutes.forEach(option => {
      if (option.children) {
        option.children.forEach(child => {
          if (child.key === lastRoute) {
            parent.push(option.key);
          }
        });
      }
    });
    return parent;
  };
  if (!isServer && window.location.pathname) {
    const routes = window.location.pathname.split('/');
    if (routes.length > 1) {
      const lastRoute = routes[routes.length - 1];
      return getParent(lastRoute);
    }
  }
  return [];
}

export function getCurrentKey() {
  if (!isServer && window.location.pathname) {
    const routes = window.location.pathname
      .split('/')
      .filter(item => item.length > 0 && item !== 'dashboard');
    console.log(routes);
    if (routes.length > 0) {
      return [routes.join('.')];
    }
  }
  return [];
}

export function getOpenKeys() {
  if (!isServer && window.location.pathname) {
    const routes = window.location.pathname
      .split('/')
      .filter(item => item.length > 0 && item !== 'dashboard');
    if (routes.length > 0) {
      return routes;
    }
  }
  return [];
}
