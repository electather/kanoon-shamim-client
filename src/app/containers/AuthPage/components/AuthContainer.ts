/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

import bgImage from '../media/bg.jpg';

export const AuthContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props.theme.dir === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props.theme.dir === 'rtl' ? '0' : 'inherit')};
  }

  .isoLoginContentWrapper {
    width: 500px;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    position: relative;
  }

  .isoLoginContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 70px 50px;
    position: relative;
    background-color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }

    .isoLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 50px;
      justify-content: center;
      flex-shrink: 0;

      a {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        text-transform: uppercase;
        color: ${props => props.theme.secondary[2]};
      }
    }

    .isoSignInForm {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .isoLoginButton {
        .ant-form-item-control-input-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .isoInputWrapper {
        margin-bottom: 15px;

        &:last-of-type {
          margin-bottom: 0;
        }

        input {
          &::-webkit-input-placeholder {
            color: ${props => props.theme.grayscale[0]};
          }

          &:-moz-placeholder {
            color: ${props => props.theme.grayscale[0]};
          }

          &::-moz-placeholder {
            color: ${props => props.theme.grayscale[0]};
          }
          &:-ms-input-placeholder {
            color: ${props => props.theme.grayscale[0]};
          }
        }
      }

      .isoHelperText {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.2;
        color: ${props => props.theme.grayscale[1]};
        padding-left: ${({ theme }) =>
          theme.dir === 'rtl' ? 'inherit' : '13px'};
        padding-right: ${({ theme }) =>
          theme.dir === 'rtl' ? '13px' : 'inherit'};
        margin: 15px 0;
        position: relative;
        display: flex;
        align-items: center;

        &:before {
          content: '*';
          color: ${props => props.theme.error[0]};
          padding-right: 3px;
          font-size: 14px;
          line-height: 1;
          position: absolute;
          top: 2px;
          left: ${({ theme }) => (theme.dir === 'rtl' ? 'inherit' : '0')};
          right: ${({ theme }) => (theme.dir === 'rtl' ? '0' : 'inherit')};
        }
      }

      .isoHelperWrapper {
        margin-top: 35px;
        flex-direction: column;
      }

      .isoOtherLogin {
        > a {
          display: flex;
          margin-bottom: 10px;

          &:last-child {
            margin-bottom: 0;
          }
        }

        button {
          width: 100%;
          height: 42px;
          border: 0;
          font-weight: 500;

          &.btnFacebook {
            background-color: #3b5998;

            &:hover {
              background-color: darken(#3b5998, 5%);
            }
          }

          &.btnGooglePlus {
            background-color: #dd4b39;
            margin-top: 15px;

            &:hover {
              background-color: darken(#dd4b39, 5%);
            }
          }

          &.btnAuthZero {
            background-color: #e14615;
            margin-top: 15px;

            &:hover {
              background-color: darken(#e14615, 5%);
            }
          }

          &.btnFirebase {
            background-color: ${props => props.theme.color[5]};
            margin-top: 15px;

            &:hover {
              background-color: ${props => props.theme.color[6]};
            }
          }

          &.btnAccountKit {
            margin-top: 15px;

            &:hover {
            }
          }
        }
      }

      .isoForgotPass {
        font-size: 12px;
        color: ${props => props.theme.text[3]};
        margin-bottom: 10px;
        text-decoration: none;

        &:hover {
          color: ${props => props.theme.primary[0]};
        }
      }

      button {
        font-weight: 500;
      }
    }
  }
`;
