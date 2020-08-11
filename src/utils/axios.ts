import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { getBearerToken, isDevServer, localizeErrorMsg } from 'utils';
export const createClient = () => {
  const defaultOptions: AxiosRequestConfig = {
    headers: {
      Authorization: getBearerToken(),
      'Content-Type': 'application/json',
    },
    baseURL: isDevServer()
      ? process.env.REACT_APP_BASE_URL_DEV
      : process.env.REACT_APP_BASE_URL,
    responseType: 'json',
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.response.use(
    res => res,
    err => {
      if (err.response) {
        message.error({
          content: 'خطا',
          duration: 7,
        });
      } else if (err.request) {
        message.error({
          content: 'پاسخی از سمت سرور دریافت نشد. لطفا اتصال خود را برسی کنید',
          duration: 7,
        });
      } else {
        message.error({
          content: 'خطایی در سمت شما رخ داد. لطفا برسی کنید!',
          duration: 7,
        });
      }
      throw err;
    },
  );
  return instance;
};
