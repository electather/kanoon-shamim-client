import {
  BodyInsuranceResponse,
  ErrorResponse,
  TPIResponse,
  UserDataMinimal,
} from 'userResponse';

export type QuerySchema = {};

export type ExpiryList = {
  tpi: TPIResponse[];
  bii: BodyInsuranceResponse[];
};
export interface HomePageState {
  readonly stats?: UserDataMinimal;
  readonly expireList?: ExpiryList;
  readonly error?: ErrorResponse;
  readonly loading: boolean;
}
