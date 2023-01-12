import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: black;
  color: white;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 99;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: var(--neon-yellow);
  display: flex;
  align-items: center;
  font-family: 'Rubik Bubbles', cursive;
  font-size: 40px;
  text-shadow: var(--neon-yellow) 0 0 20px;
  i {
    font-size: xx-large;
    margin-right: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  form {
    display: flex;
    align-items: center;
    color: var(--gray);
    transition: 0.2s ease-in-out;
    i {
      margin-right: 10px;
      font-size: 25px;
    }
    input {
      width: 250px;
      padding: 10px;
      background-color: rgba(1, 1, 1, 0);
      outline: none;
      border: none;
      border-bottom: 2px solid var(--gray);
      color: white;
      font-size: 16px;
    }
    &:focus-within {
      color: white;
      input {
        border-bottom: 2px solid white;
      }
      transition: 0.2s ease-in-out;
    }
  }
`;

const Button = styled(Link)`
  text-decoration: none;
  background-color: var(--gray);
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  padding: 8px 14px;
  transition: 0.2s ease-in-out;
  font-size: 16px;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    background-color: var(--neon-yellow);
    color: black;
    transition: 0.2s ease-in-out;
  }
`;

const Board = styled.nav`
  color: white;
  display: flex;
  align-items: center;
  margin-top: 10px;
  a {
    text-decoration: none;
    color: white;
    font-size: 16px;
    transition: 0.2s ease-in-out;
    width: auto;
    height: 25px;
    margin: 0 9px;
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    &:hover {
      color: var(--neon-yellow);
      text-shadow: white 0 0 20px;
      font-weight: bold;
      transition: 0.2s ease-in-out;
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <div>
      <Logo to="/">
        <i className="fa-solid fa-heart-pulse" />
        HEART
      </Logo>
      <Board>
        <Link to="/freeboard">자유게시판</Link>
        <Link to="/freeboard/tags">자유게시판 태그</Link>
        <Link to="/recruits">모집게시판</Link>
        <Link to="/recruits/tags">모집게시판 태그</Link>
      </Board>
    </div>
    <ButtonContainer>
      <form>
        <i className="fa-solid fa-magnifying-glass" />
        <input placeholder="Search here..." />
      </form>
      <Button to="/login">로그인</Button>
      <Button to="/signup">회원가입</Button>
    </ButtonContainer>
  </HeaderContainer>
);

export default Header;
