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

export function setAccessToken(accessToken: string) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
  };
}

export function deleteAccessToken() {
  return {
    type: DELETE_ACCESS_TOKEN,
  };
}

export function setRefreshToken(refreshToken: string) {
  return {
    type: SET_REFRESH_TOKEN,
    payload: refreshToken,
  };
}

export function deleteRefreshToken() {
  return {
    type: DELETE_REFRESH_TOKEN,
  };
}

export function setMemberId(memberId: string) {
  return {
    type: SET_MEMBER_ID,
    payload: memberId,
  };
}

export function deleteMemberId() {
  return {
    type: DELETE_MEMBER_ID,
  };
}

export function setBirth(birth: string) {
  return {
    type: SET_BIRTH,
    payload: birth,
  };
}

export function deleteBirth() {
  return {
    type: DELETE_BIRTH,
  };
}

export function setHeart(heart: string) {
  return {
    type: SET_HEART,
    payload: heart,
  };
}

export function deleteHeart() {
  return {
    type: DELETE_HEART,
  };
}

export function setSex(sex: string) {
  return {
    type: SET_SEX,
    payload: sex,
  };
}

export function deleteSex() {
  return {
    type: DELETE_SEX,
  };
}

export function setAccessTokenExpiresAt(expiresAt: number) {
  return { type: SET_ACCESS_TOKEN_EXPIRES_AT, payload: expiresAt };
}

export function setRefreshTokenExpiresAt(expiresAt: number) {
  return { type: SET_REFRESH_TOKEN_EXPIRES_AT, payload: expiresAt };
}

export function deleteAccessTokenExpiresAt() {
  return { type: DELETE_ACCESS_TOKEN_EXPIRES_AT };
}

export function deleteRefreshTokenExpiresAt() {
  return { type: DELETE_REFRESH_TOKEN_EXPIRES_AT };
}
