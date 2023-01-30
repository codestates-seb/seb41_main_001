import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키에 값을 저장할 때
export const setCookie = (name: string, value: string | number, option?: any) =>
  cookies.set(name, value, { ...option });

// 쿠키에서 값을 가져올 때
export const getCookie = (name: string) => cookies.get(name);

// 쿠키를 지울 때
export const removeCookie = (name: string) => cookies.remove(name);
