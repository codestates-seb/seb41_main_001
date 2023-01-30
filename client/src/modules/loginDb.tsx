import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie } from '../utils/cookie';

const loginDb = createAsyncThunk('post/loginDb', async (db) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/members/login`,
      db,
    );
    const accessToken = response.headers.authorization;
    setCookie('accessToken', `${accessToken}`);
    const refreshToken = response.headers.refresh;
    setCookie('refreshToken', `${refreshToken}`);
    // const LOGIN_INFO = {
    //     memberId: 11,
    //     heart: 50,
    //     birth: '1995.01.11',
    //     sex: 'Male',
    //   };
    const login_info = {}
    return response.headers;
  } catch {
    return 'err';
  }
});

export default loginDb;
