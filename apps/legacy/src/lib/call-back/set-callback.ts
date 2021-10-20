import { callBack } from './index';

export const setCallBack = (url, action) => {
  callBack.url = url;
  callBack.action = action;
};
