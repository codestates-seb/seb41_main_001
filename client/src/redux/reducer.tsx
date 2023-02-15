import { Reducer } from 'redux';

type State = {
  accessToken: string;
  refreshToken: string;
  memberId: number;
  sex: string;
  birth: string;
  heart: number;
};

type Action =
  | { type: 'SET_ACCESS_TOKEN'; payload: string }
  | { type: 'SET_REFRESH_TOKEN'; payload: string }
  | { type: 'SET_MEMBER_ID'; payload: number }
  | { type: 'SET_BIRTH'; payload: string }
  | { type: 'SET_HEART'; payload: number }
  | { type: 'SET_SEX'; payload: string }
  | { type: 'DELETE_ACCESS_TOKEN' }
  | { type: 'DELETE_REFRESH_TOKEN' }
  | { type: 'DELETE_MEMBER_ID' }
  | { type: 'DELETE_BIRTH' }
  | { type: 'DELETE_HEART' }
  | { type: 'DELETE_SEX' };

const initialState: State = {
  accessToken: '',
  refreshToken: '',
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
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload,
      };
    case 'SET_REFRESH_TOKEN':
      return {
        ...state,
        refreshToken: action.payload,
      };
    case 'SET_MEMBER_ID':
      return {
        ...state,
        memberId: action.payload,
      };
    case 'SET_BIRTH':
      return {
        ...state,
        birth: action.payload,
      };
    case 'SET_HEART':
      return {
        ...state,
        heart: action.payload,
      };
    case 'SET_SEX':
      return {
        ...state,
        sex: action.payload,
      };
    case 'DELETE_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: null,
      };
    case 'DELETE_REFRESH_TOKEN':
      return {
        ...state,
        refreshToken: null,
      };
    case 'DELETE_MEMBER_ID':
      return {
        ...state,
        memberId: null,
      };
    case 'DELETE_BIRTH':
      return {
        ...state,
        birth: null,
      };
    case 'DELETE_HEART':
      return {
        ...state,
        heart: null,
      };
    case 'DELETE_SEX':
      return {
        ...state,
        sex: null,
      };
    default:
      return state;
  }
};

export default reducer;
