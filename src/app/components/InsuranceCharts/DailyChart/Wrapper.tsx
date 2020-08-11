import styled from 'styled-components';
import { borderRadius } from 'utils/styleUtils';

type Props = {
  width?: number;
  height?: number;
  hasTitle?: boolean;
};
export const ChartsWrapper = styled.div<Props>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: ${props =>
    props.hasTitle ? '20px 20px 57px 10px' : '20px 20px 20px 10px'};
  background-color: #fff;
  direction: ltr;
  ${borderRadius('5px')}
  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }
  .custom-tooltip {
    direction: rtl;
    .white {
      color: white;
    }
  }
  .title {
    direction: rtl;
    margin-bottom: 7px;
  }
`;
