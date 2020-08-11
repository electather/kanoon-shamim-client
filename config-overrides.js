const {
  override,
  fixBabelImports,
  useBabelRc,
  addWebpackAlias,
  addLessLoader,
} = require('customize-cra');
const { default: darkTheme } = require('@ant-design/dark-theme');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({ moment: 'antd-jalali-moment' }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#16a085', // customize as needed
        '@link-color': '#2980b9', // customize as needed
      },
    },
  }),
);
