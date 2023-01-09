import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background-color: black;
  color: white;
  width: 100%;
  height: 100%;
`;

const HeartContainer = styled(Link)`
  text-decoration: none;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  div {
    color: white;
    font-family: 'Rubik Bubbles', cursive;
    font-size: 16px;
    display: flex;
    align-items: center;
    span:first-child {
      color: var(--neon-yellow);
      font-size: 30px;
      margin-right: 3px;
      padding-bottom: 10px;
      font-family: 'Rubik Bubbles', cursive;

    }
  }
`;
const TeamInfo = styled.div`
  text-shadow: white 0 0 20px;
  color: white;
  font-size: 16px;
  /* font-family: 'Rubik Bubbles', cursive; */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <HeartContainer to="/">
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

      <TeamInfo>
        By Heart Number 1<br />
        FE: 민인애, 우하늘, 조유지<br></br>BE: 변찬중, 윤인수, 정의현
      </TeamInfo>
    </FooterContainer>
  );
};
export default Footer;
