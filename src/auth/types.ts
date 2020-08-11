import { UserData } from 'userResponse';

export type UserState =
  | 'loggedIn'
  | 'fetchingInfo'
  | 'locked'
  | 'unAuthenticated';

export type LoginPayload = {
  username: string;
  password: string;
};

export enum ErrorType {
  RESPONSE_ERROR = 'undefined',
  USER_NOT_FOUND = 'notFound',
  USER_NOT_AUTHORIZED = 'wrongUsernameOrPassword',
  SERVER_ERROR = 'serverError',
}

export interface AuthState {
  readonly authState: UserState;
  readonly user?: UserData;
  readonly error?: ErrorType;
  readonly loading: boolean;
}
