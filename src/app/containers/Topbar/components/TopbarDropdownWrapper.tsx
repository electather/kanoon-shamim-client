import styled from 'styled-components';
import { borderRadius, boxShadow, transition } from 'utils/styleUtils';

export const TopBarDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: -12px -16px;
  width: 360px;
  min-width: 160px;
  flex-shrink: 0;
  ${borderRadius('5px')};
  ${boxShadow('0 2px 10px rgba(0,0,0,0.2)')};
  ${transition()};

  @media only screen and (max-width: 767px) {
    width: 310px;
  }

  .isoDropdownHeader {
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 0px;
    padding: 15px 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 14px;
      font-weight: 500;
      color: ${props => props.theme.text[0]};
      text-align: center;
      text-transform: uppercase;
      margin: 0;
    }
  }

  .isoDropdownBody {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    background-color: ${props => props.theme.grayscale[6]};

    a {
      text-decoration: none;
    }

    .isoDropdownListItem {
      padding: 15px 30px;
      flex-shrink: 0;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      text-align: ${props => (props.theme.dir === 'rtl' ? 'right' : 'left')};
      width: 100%;
      border-bottom: 1px solid ${props => props.theme.border[2]};
      ${transition()};

      &:hover {
        background-color: ${props => props.theme.grayscale[3]};
      }

      .isoListHead {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
      }

      h5 {
        font-size: 13px;
        font-weight: 500;
        color: ${props => props.theme.text[0]};
        margin-top: 0;
      }

      p {
        font-size: 12px;
        font-weight: 400;
        color: ${props => props.theme.text[0]};
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .isoDate {
        font-size: 11px;
        color: ${props => props.theme.grayscale[1]};
        flex-shrink: 0;
      }
    }
  }

  .isoViewAllBtn {
    font-size: 13px;
    font-weight: 500;
    color: ${props => props.theme.text[2]};
    padding: 10px 15px 20px;
    display: flex;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    text-align: center;
    ${transition()};

    &:hover {
      color: ${props => props.theme.primary[1]};
    }
  }

  .isoDropdownFooterLinks {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px 20px;

    a {
      font-size: 13px;
      font-weight: 500;
      color: ${props => props.theme.text[0]};
      text-decoration: none;
      padding: 10px 20px;
      line-height: 1;
      border: 1px solid ${props => props.theme.border[1]};
      display: flex;
      align-items: center;
      justify-content: center;
      ${transition()};

      &:hover {
        background-color: ${props => props.theme.primary[0]};
        border-color: ${props => props.theme.primary[0]};
        color: #ffffff;
      }
    }

    h3 {
      font-size: 14px;
      font-weight: 500;
      color: ${props => props.theme.text[0]};
      line-height: 1.3;
    }
  }

  &.withImg {
    .isoDropdownListItem {
      display: flex;
      flex-direction: row;

      .isoImgWrapper {
        width: 35px;
        height: 35px;
        overflow: hidden;
        margin: ${props =>
          props.theme.dir === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
        display: -webkit-inline-flex;
        display: -ms-inline-flex;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background-color: ${props => props.theme.grayscale[9]};
        ${borderRadius('50%')};

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .isoListContent {
        width: 100%;
        display: flex;
        flex-direction: column;

        .isoListHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        h5 {
          margin-bottom: 0;
          padding: ${props =>
            props.theme.dir === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
        }

        .isoDate {
          font-size: 11px;
          color: ${props => props.theme.grayscale[1]};
          flex-shrink: 0;
        }

        p {
          white-space: normal;
          line-height: 1.5;
        }
      }
    }
  }

  &.topbarMail {
    @media only screen and (max-width: 519px) {
      right: -170px;
    }
  }

  &.topbarMessage {
    @media only screen and (max-width: 500px) {
      right: -69px;
    }
  }

  &.topbarNotification {
    @media only screen and (max-width: 500px) {
      right: -120px;
    }
  }

  &.topbarAddtoCart {
    @media only screen and (max-width: 465px) {
      right: -55px;
    }

    .isoDropdownHeader {
      margin-bottom: 0;
    }

    .isoDropdownBody {
      background-color: ${props => props.theme.grayscale[6]};
      display: flex;
      flex-direction: column;

      .isoNoItemMsg {
        height: 100%;
        min-height: 260px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 30px;
          font-weight: 300;
          color: ${props => props.theme.grayscale[1]};
          line-height: 1.2;
        }
      }
    }
  }

  &.isoUserDropdown {
    padding: 7px 0;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    width: 220px;
    min-width: 160px;
    flex-shrink: 0;
    ${borderRadius('5px')};
    ${boxShadow('0 2px 10px rgba(0,0,0,0.2)')};
    ${transition()};

    .isoDropdownLink {
      font-size: 13px;
      color: ${props => props.theme.text[1]};
      line-height: 1.1;
      padding: 7px 15px;
      background-color: transparent;
      text-decoration: none;
      display: flex;
      justify-content: flex-start;
      cursor: pointer;
      ${transition()};

      &:hover {
        background-color: ${props => props.theme.secondary[6]};
      }
    }
  }
`;
