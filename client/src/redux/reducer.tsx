import { Reducer } from 'redux';
import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_ACCESS_TOKEN_EXPIRES_AT,
  SET_REFRESH_TOKEN_EXPIRES_AT,
  SET_BIRTH,
  SET_HEART,
  SET_MEMBER_ID,
  SET_SEX,
  DELETE_ACCESS_TOKEN,
  DELETE_BIRTH,
  DELETE_HEART,
  DELETE_MEMBER_ID,
  DELETE_REFRESH_TOKEN,
  DELETE_SEX,
  DELETE_ACCESS_TOKEN_EXPIRES_AT,
  DELETE_REFRESH_TOKEN_EXPIRES_AT,
} from './types';

type State = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
  memberId: number;
  sex: string;
  birth: string;
  heart: number;
};

type Action =
  | { type: typeof SET_ACCESS_TOKEN; payload: string }
  | { type: typeof SET_REFRESH_TOKEN; payload: string }
  | { type: typeof SET_MEMBER_ID; payload: number }
  | { type: typeof SET_BIRTH; payload: string }
  | { type: typeof SET_HEART; payload: number }
  | { type: typeof SET_SEX; payload: string }
  | { type: typeof DELETE_ACCESS_TOKEN }
  | { type: typeof DELETE_REFRESH_TOKEN }
  | { type: typeof DELETE_MEMBER_ID }
  | { type: typeof DELETE_BIRTH }
  | { type: typeof DELETE_HEART }
  | { type: typeof DELETE_SEX }
  | { type: typeof SET_ACCESS_TOKEN_EXPIRES_AT; expiresAt: string }
  | { type: typeof SET_REFRESH_TOKEN_EXPIRES_AT; expiresAt: string }
  | { type: typeof DELETE_ACCESS_TOKEN_EXPIRES_AT }
  | { type: typeof DELETE_REFRESH_TOKEN_EXPIRES_AT };

const initialState: State = {
  accessToken: '',
  refreshToken: '',
  accessTokenExpiresAt: 0,
  refreshTokenExpiresAt: 0,
  memberId: -1,
  sex: '',
  birth: '',
  heart: 0,
};

const reducer: Reducer<State, Action> = (
  state = initialState,
  action: any = {},
) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload,
      };
    case SET_MEMBER_ID:
      return {
        ...state,
        memberId: action.payload,
      };
    case SET_BIRTH:
      return {
        ...state,
        birth: action.payload,
      };
    case SET_HEART:
      return {
        ...state,
        heart: action.payload,
      };
    case SET_SEX:
      return {
        ...state,
        sex: action.payload,
      };
    case DELETE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: '',
      };
    case DELETE_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: '',
      };
    case DELETE_MEMBER_ID:
      return {
        ...state,
        memberId: -1,
      };
    case DELETE_BIRTH:
      return {
        ...state,
        birth: '',
      };
    case DELETE_HEART:
      return {
        ...state,
        heart: 0,
      };
    case DELETE_SEX:
      return {
        ...state,
        sex: '',
      };
    case SET_ACCESS_TOKEN_EXPIRES_AT:
      return { ...state, accessTokenExpiresAt: action.expiresAt };
    case SET_REFRESH_TOKEN_EXPIRES_AT:
      return { ...state, refreshTokenExpiresAt: action.expiresAt };
    case DELETE_ACCESS_TOKEN_EXPIRES_AT:
      return { ...state, accessTokenExpiresAt: 0 };
    case DELETE_REFRESH_TOKEN_EXPIRES_AT:
      return { ...state, refreshTokenExpiresAt: 0 };
    default:
      return state;
  }
};

export default reducer;
