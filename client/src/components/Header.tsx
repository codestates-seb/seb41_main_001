import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonLink from './ButtonLink';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: black;
  color: white;
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: var(--neon-yellow);
  display: flex;
  align-items: center;
  font-family: 'Rubik Bubbles', cursive;
  font-size: 220%;
  text-shadow: var(--neon-yellow) 0 0 20px;
  i {
    font-size: xx-large;
    margin-right: 0.5rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  form {
    display: flex;
    align-items: center;
    color: var(--gray);
    transition: 0.2s ease-in-out;
    i {
      margin-right: 10px;
      font-size: 150%;
    }
    input {
<<<<<<< HEAD
      width: 12rem;
      padding: 0.5rem;
      background-color: rgba(1, 1, 1, 0);
      outline: none;
      border: none;
      border-bottom: 0.1rem solid var(--gray);
=======
      width: 200px;
      padding: 10px;
      background-color: rgba(1, 1, 1, 0);
      outline: none;
      border: none;
      border-bottom: 1px solid var(--gray);
>>>>>>> 0aeae5d39f0b1c175cf725aed749fb83c73257e3
      color: white;
      font-size: 100%;
    }
    &:focus-within {
      color: white;
      input {
<<<<<<< HEAD
        border-bottom: 0.1rem solid white;
=======
        border-bottom: 1px solid white;
>>>>>>> 0aeae5d39f0b1c175cf725aed749fb83c73257e3
      }
      transition: 0.2s ease-in-out;
    }
  }
`;

// const Button = styled(Link)`
//   text-decoration: none;
//   background-color: var(--gray);
//   color: white;
//   border-radius: 5px;
//   margin-left: 10px;
//   padding: 8px 14px;
//   transition: 0.2s ease-in-out;
//   font-size: 16px;
//   white-space: nowrap;
//   &:hover {
//     cursor: pointer;
//     background-color: var(--neon-yellow);
//     color: black;
//     transition: 0.2s ease-in-out;
//   }
// `;

const Board = styled.nav`
  color: white;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  a {
    text-decoration: none;
    color: white;
    font-size: 100%;
    transition: 0.2s ease-in-out;
    width: auto;
<<<<<<< HEAD
    height: 1rem;
    margin: 0 0.3rem;
=======
    margin-right: 15px;
>>>>>>> 0aeae5d39f0b1c175cf725aed749fb83c73257e3
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    &:hover {
      color: var(--neon-yellow);
      text-shadow: white 0 0 1rem;
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
    <ButtonsContainer>
      <form>
        <i className="fa-solid fa-magnifying-glass" />
        <input placeholder="Search here..." />
      </form>
      <ButtonLink value="로그인" to="/login" />
      <ButtonLink value="회원가입" to="/signup" />
    </ButtonsContainer>
  </HeaderContainer>
);

export default Header;
