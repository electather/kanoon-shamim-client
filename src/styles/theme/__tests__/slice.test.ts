import { DefaultTheme } from 'styled-components';
import { RootState } from 'types';

import * as slice from '../slice';
import { themes } from '../themes';
import { ThemeKeyType, ThemeState } from '../types';

describe('theme slice', () => {
  let state: ThemeState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should changeTheme', () => {
    expect(slice.reducer(state, slice.changeTheme('light'))).toEqual<
      ThemeState
    >({ selected: 'light' });
  });

  describe('selectors', () => {
    it('selectTheme', () => {
      let state: RootState = {};
      expect(slice.selectTheme(state)).toEqual<DefaultTheme>(themes.light);
      state = {
        theme: { selected: 'system' },
      };
      expect(slice.selectTheme(state)).toEqual<DefaultTheme>(themes.light);
    });

    it('selectThemeKey', () => {
      let state: RootState = {};
      expect(slice.selectThemeKey(state)).toEqual<ThemeKeyType>(
        slice.initialState.selected,
      );

      state = {
        theme: { selected: 'system' },
      };
      expect(slice.selectThemeKey(state)).toEqual<ThemeKeyType>(
        state.theme!.selected,
      );
    });
  });
});
