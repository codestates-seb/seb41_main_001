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
      margin-right: 5px;
      font-size: 25px;
    }
    input {
      width: 250px;
      padding: 10px;
      margin: 0 5px;
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
  margin: 5px;
  padding: 8px 14px;
  transition: 0.2s ease-in-out;
  font-size: 16px;
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
  flex-direction: row;
  a {
    text-decoration: none;
    text-shadow: white 0 0 15px;
    margin: 2px 10px;
    color: white;
    font-size: 16px;
    transition: 0.2s ease-in-out;
    white-space: nowrap;
    &:hover {
      color: var(--neon-yellow);
      text-shadow: white 0 0 20px;
      font-weight: bold;
      transition: 0.2s ease-in-out;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <Logo to="/">
          <i className="fa-solid fa-heart-pulse"></i>
          HEART
        </Logo>
        <Board>
          <Link to="/freeboards">자유게시판</Link>
          <Link to="/recruits">자유게시판 태그</Link>
          <Link to="/recruits">모집게시판</Link>
          <Link to="/recruits">모집게시판 태그</Link>
        </Board>
      </div>
      <ButtonContainer>
        <form>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search here..." />
        </form>
        <Button to="/login">로그인</Button>
        <Button to="/signup">회원가입</Button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
