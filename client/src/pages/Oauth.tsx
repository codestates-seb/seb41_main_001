import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setMemberId,
  setBirth,
  setSex,
  setAccessTokenExpiresAt,
  setRefreshTokenExpiresAt,
} from '../redux/actions';

const OauthContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const authorization = searchParams.get('Authorization');
  const refresh = searchParams.get('Refresh');
  const memberId = searchParams.get('memberId');
  const birth = searchParams.get('birth');
  const sex = searchParams.get('sex');

  useEffect(() => {
    dispatch(setAccessToken(authorization!));
    dispatch(setRefreshToken(refresh!));
    dispatch(setMemberId(memberId!));
    dispatch(setBirth(birth!));
    dispatch(setSex(sex!));
    dispatch(setAccessTokenExpiresAt(Date.now() + 2400000)); // 40분
    dispatch(setRefreshTokenExpiresAt(Date.now() + 242000000)); // 4200분
    if (birth && sex) {
      navigate('/');
    } else {
      navigate('/members/edit');
      // navigate('/members/mypage');
    }
  }, [authorization, dispatch, refresh]);

  return <OauthContainer>Oauth</OauthContainer>;
};

export default Oauth;
