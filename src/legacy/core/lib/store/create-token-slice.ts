import { DIALING_CODE } from '../constants/constants';

export const createTokenSlice = (set, _get, _store) => ({
  token: '',
  setToken: (token: string) => set({ token }),

  rememberMe: true,
  setRememberMe: (rememberMe: boolean) => set({ rememberMe }),
});

export const createPhoneCodeSlice = (set, _get, _store) => ({
  phoneCode: DIALING_CODE,
  setPhoneCode: (phoneCode: string) => set({ phoneCode }),
});
