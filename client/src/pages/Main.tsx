import styled from 'styled-components';
import MyPage from './MyPage';

const MainContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const Main = () => (
  <>
    <MyPage />
    <MainContainer>Main</MainContainer>
  </>
);

export default Main;
