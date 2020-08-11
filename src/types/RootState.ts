/* eslint-disable simple-import-sort/sort */
import { BodyInsuranceState } from 'app/containers/BIIPage/redux/types';
import { TPIState } from 'app/containers/TPIPage/redux/types';
import { AuthState } from 'auth/types';
import { RouterState } from 'connected-react-router';
import { SettingsState } from 'settings/types';
import { ThemeState } from 'styles/theme/types';
import { HomePageState } from 'app/containers/HomePage/redux/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  router?: RouterState;
  settings?: SettingsState;
  auth?: AuthState;
  theme?: ThemeState;
  tpi?: TPIState;
  bodyInsurance?: BodyInsuranceState;
  homePage?: HomePageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
