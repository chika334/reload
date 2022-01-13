import {USSD_SUCCESS} from '../types'

export const ussdSuccess = (detail) => {
  return {
    type: USSD_SUCCESS,
    payload: { detail },
  };
};
