import styled from 'styled-components';

type Props = {};
export const ReportWidgetWrapper = styled.div<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.border[2]};

  .isoWidgetLabel {
    font-size: 21px;
    color: ${({ theme }) => theme.text[0]};
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 25px;
  }

  .isoReportsWidgetBar {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;

    .isoSingleProgressBar {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .isoDescription {
    font-size: 13px;
    color: ${({ theme }) => theme.text[2]};
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
  }
`;
