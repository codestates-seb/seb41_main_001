import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainContainer = styled.main`
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const Main = () => (
  <>
    <Header />
    <MainContainer>Main</MainContainer>
    <Footer />
  </>
);

export default Main;
