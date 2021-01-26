import { atom } from 'recoil';

export const loggedState = atom({
  key: 'loggedState',
  default: false,
});

export const uidState = atom({
  key: 'uidState',
  default: '',
});

export const usernameState = atom({
  key: 'usernameState',
  default: '',
});

export const emailState = atom({
  key: 'emailState',
  default: '',
});
