import styled from 'styled-components';

export const SaleWidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid ${props => props.theme.border[2]};

  .isoSaleLabel {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
    color: ${props => props.theme.text[0]};
    margin: 0 0 20px;
  }

  .isoSalePrice {
    font-size: 28px;
    font-weight: 300;
    line-height: 1.2;
    margin: 0 0 20px;
  }

  .isoSaleDetails {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
    color: ${props => props.theme.text[2]};
    margin: 0;
  }
`;
