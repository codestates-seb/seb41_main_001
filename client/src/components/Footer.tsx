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
  display: flex;
  flex-direction: column;
  div {
    color: white;
    font-family: 'Rubik Bubbles', cursive;
    font-size: 100%;
    display: flex;
    align-items: center;
    span:first-child {
      color: var(--neon-yellow);
      font-size: 200%;
      margin-right: 3px;
      padding-bottom: 10px;
      font-family: 'Rubik Bubbles', cursive;
    }
  }
`;

const TeamInfo = styled.div`
  color: white;
  font-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div:nth-child(2) {
    margin: 10px 0px;
  }
`;

const Footer = () => (
  <FooterContainer>
    <HeartContainer to="/">
      <div>
        <span>H</span>
        <span>ealthy</span>
      </div>
      <div>
        <span>E</span>
        <span>xercise</span>
      </div>
      <div>
        <span>A</span>
        <span>round</span>
      </div>
      <div>
        <span>R</span>
        <span>esidances</span>
      </div>
      <div>
        <span>T</span>
        <span>ogether</span>
      </div>
    </HeartContainer>
    <TeamInfo>
      <div>By Heart Number 1</div>
      <div>FE: 민인애, 우하늘, 조유지</div>
      <div>BE: 변찬중, 윤인수, 정의현</div>
    </TeamInfo>
  </FooterContainer>
);

export default Footer;

// const BREAK_POINT_TABLET = 768;
// const BREAK_POINT_PC = 1200;
