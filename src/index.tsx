/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'sanitize.css/sanitize.css';
// Initialize languages
import './locales/i18n';

import jalaliday from 'antd-dayjs-jalali';
// Import root app
import { App } from 'app';
import { AuthProvider } from 'auth/AuthProvider';
import { ConnectedRouter } from 'connected-react-router';
import dayjs from 'dayjs';
import FontFaceObserver from 'fontfaceobserver';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import { SettingsProvider } from 'settings/SettingsProvider';
import { configureAppStore } from 'store/configureStore';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { history } from 'utils/history';

// Observe loading of iranyekan
const openSansObserver = new FontFaceObserver('iranyekan', {});

// When iranyekan is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('ir-loaded');
});

dayjs.extend(jalaliday);
(dayjs as any).calendar('jalali'); // Jalali Calendar
dayjs.locale('fa');

// Create redux store with history
const store = configureAppStore(history);
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HelmetProvider>
        <SettingsProvider>
          <AuthProvider>
            <ThemeProvider>
              <React.StrictMode>
                <Component />
              </React.StrictMode>
            </ThemeProvider>
          </AuthProvider>
        </SettingsProvider>
      </HelmetProvider>
    </ConnectedRouter>
  </Provider>
);
const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
