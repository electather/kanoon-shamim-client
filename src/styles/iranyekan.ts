import { createGlobalStyle } from 'styled-components';

import eotFont from './fonts/iranyekanwebregularfanum.eot';
import ttfFont from './fonts/iranyekanwebregularfanum.ttf';
import woffFont from './fonts/iranyekanwebregularfanum.woff';

export const IranYekanFontLoader = createGlobalStyle`
  @font-face {
    font-family: iranyekan;
    font-style: normal;
    font-weight: normal;
    src: url('${eotFont}');
    src: url('${eotFont}?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('${woffFont}') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url('${ttfFont}') format('truetype');
  }

  .ir-loaded {
    html h1,
  html h2,
  html h3,
  html h4,
  html h5,
  html h6,
  html a,
  html p,
  html li,
  input,
  textarea,
  span,
  div,
  html,
  body,
  html a {
    font-family: 'iranyekan';
  }
  .ant-list:not(.ant-list-vertical) .ant-list-item-no-flex .ant-list-item-action{
    float: left;

  }
  }
`;
