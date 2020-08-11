import styled from 'styled-components';
export const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 14px;
    color: ${({ theme }) => theme.text[0]};
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 5px;
  }

  .ant-progress-text {
    font-size: 13px;
    color: ${({ theme }) => theme.text[3]};
    font-weight: 400;
    line-height: 1.2;
    text-align: right;
    margin-left: ${props => (props.theme.dir === 'rtl' ? '0' : '0.75em')};
    margin-right: ${props => (props.theme.dir === 'rtl' ? '0.75em' : '0')};
  }

  .ant-progress-show-info .ant-progress-outer {
    padding-right: 4em;
    margin-right: -4em;
  }
`;
