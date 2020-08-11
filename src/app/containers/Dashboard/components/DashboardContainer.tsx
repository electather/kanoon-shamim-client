import styled from 'styled-components';

export const DashboardContainer = styled.div`
  -webkit-overflow-scrolling: touch;
  background: ${({ theme }) => theme.secondary[1]};

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .isomorphicContent {
    margin-top: 70px;
  }

  .trigger:hover {
    color: ${props => props.theme.primary[0]};
  }

  .ant-layout-sider-collapsed .anticon {
    font-size: 16px;
  }

  .ant-layout-sider-collapsed .nav-text {
    display: none;
  }

  .ant-layout {
    background: ${props => props.theme.secondary[1]};

    &.isoContentMainLayout {
      overflow: auto;
      overflow-x: hidden;
      @media only screen and (min-width: 768px) and (max-width: 1220px) {
        width: ${props =>
          props.theme.dir === 'rtl'
            ? 'calc(100% - 240px)'
            : 'calc(100% - 80px)'};
        flex-shrink: 0;
      }

      @media only screen and (max-width: 767px) {
        width: 45%;
        flex-shrink: 0;
      }
    }
  }

  .isoLayoutContent {
    width: 100%;
    padding: 35px;
    background-color: #ffffff;
    border: 1px solid ${props => props.theme.border[0]};
    height: 100%;
  }

  .isomorphicLayout {
    width: calc(100% - 240px);
    flex-shrink: 0;
    overflow-x: hidden !important;

    @media only screen and (max-width: 767px) {
      width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1220px) {
      width: calc(100% - 80px);
      width: 100%;
    }
  }

  .ant-layout-footer {
    font-size: 13px;
    @media (max-width: 767px) {
      padding: 10px 20px;
    }
  }
`;
