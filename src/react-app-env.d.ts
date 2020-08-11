/// <reference types="react-scripts" />
declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_MOCK: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_BASE_URL_DEV: string;
  }
}
