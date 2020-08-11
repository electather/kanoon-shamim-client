import styled from 'styled-components';

export const HeaderDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
  > span {
    color: ${props => props.theme.text[0]};
    vertical-align: middle;
  }
  &:hover {
    background: ${props => props.theme.grayscale[3]};
  }
  &.ant-popover-open {
    background: ${props => props.theme.grayscale[2]};
  }

  .dropDown {
    line-height: 70px;
    vertical-align: top;
    cursor: pointer;
    > span {
      font-size: 16px !important;
      transform: none !important;
      svg {
        position: relative;
        top: -1px;
      }
    }
  }

  .avatar {
    margin: 23px 0;
    margin-right: ${props => (props.theme.dir === 'rtl' ? 'inherit' : '8px')};
    margin-left: ${props => (props.theme.dir === 'rtl' ? '8px' : 'inherit')};
    color: ${props => props.theme.primary[0]};
    vertical-align: top;
    background: rgba(255, 255, 255, 0.85);
    @media only screen and (max-width: 767px) {
      margin-right: 0;
    }
  }
`;
