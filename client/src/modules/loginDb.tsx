import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie } from '../utils/cookie';

interface LoginProps {
  email: string;
  password: string;
}

const loginDb = createAsyncThunk('post/loginDb', async (data: LoginProps) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/members/login`,
      data,
    );
    const accessToken = response.headers.authorization;
    setCookie('accessToken', `${accessToken}`);
    const refreshToken = response.headers.refresh;
    setCookie('refreshToken', `${refreshToken}`);
    const loginInfo = {
      memberId: response.headers.memberId,
      heart: response.headers.heart,
      birth: response.headers.birth,
      sex: response.headers.sex,
    };
    setCookie('loginInfo', `${loginInfo}`);
    console.log(accessToken, refreshToken, loginInfo);
    return response.headers;
  } catch (err) {
    console.log(err);
    return 'err';
  }
});

export default loginDb;
