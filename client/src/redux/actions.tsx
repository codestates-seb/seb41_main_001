export function setAccessToken(accessToken: string) {
  return {
    type: 'SET_ACCESS_TOKEN',
    payload: accessToken,
  };
}

export function deleteAccessToken() {
  return {
    type: 'DELETE_ACCESS_TOKEN',
  };
}

export function setRefreshToken(refreshToken: string) {
  return {
    type: 'SET_REFRESH_TOKEN',
    payload: refreshToken,
  };
}

export function deleteRefreshToken() {
  return {
    type: 'DELETE_REFRESH_TOKEN',
  };
}

export function setMemberId(memberId: string) {
  return {
    type: 'SET_MEMBER_ID',
    payload: memberId,
  };
}

export function deleteMemberId() {
  return {
    type: 'DELETE_MEMBER_ID',
  };
}

export function setBirth(birth: string) {
  return {
    type: 'SET_BIRTH',
    payload: birth,
  };
}

export function deleteBirth() {
  return {
    type: 'DELETE_BIRTH',
  };
}

export function setHeart(heart: string) {
  return {
    type: 'SET_HEART',
    payload: heart,
  };
}

export function deleteHeart() {
  return {
    type: 'DELETE_HEART',
  };
}

export function setSex(sex: string) {
  return {
    type: 'SET_SEX',
    payload: sex,
  };
}

export function deleteSex() {
  return {
    type: 'DELETE_SEX',
  };
}
