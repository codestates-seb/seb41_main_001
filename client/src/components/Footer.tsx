import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: black;
  color: white;
  width: 100%;
  height: 200px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: var(--neon-yellow);
  display: flex;
  align-items: center;
  font-family: 'Rubik Bubbles', cursive;
  font-size: 30px;
  text-shadow: var(--neon-yellow) 0 0 20px;
  i {
    font-size: xx-large;
    margin-right: 10px;
  }
  div {
    display: flex;
    /* flex-direction: column; */
  }
`;

const HeartContainer = styled.div`
  display: flex;
  flex-direction: column;
  div {
    color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
    span:first-child {
      color: var(--neon-yellow);
      font-size: 30px;
      margin-right: 3px;
      margin-top: 5px;
    }
  }
`;
const TeamInfo = styled.div`
  text-shadow: white 0 0 20px;
  color: white;
  font-size: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo to="/">
        <i className="fa-solid fa-heart-pulse"></i>
        <HeartContainer>
          <div>
            <span>H</span>ealthy
          </div>
          <div>
            <span>E</span>xercise
          </div>
          <div>
            <span>A</span>round
          </div>
          <div>
            <span>R</span>esidance
          </div>
          <div>
            <span>T</span>ogether
          </div>
        </HeartContainer>
      </Logo>
      <TeamInfo>
        FE: 민인애, 우하늘, 조유지<br></br>BE: 변찬중, 윤인수, 정의현
      </TeamInfo>
    </FooterContainer>
  );
};
export default Footer;
