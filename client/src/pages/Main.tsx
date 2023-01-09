import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const MainContainer = styled.div`
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;
const Main = () => {
  return (
    <>
      <Header />
      <MainContainer>Main</MainContainer>
      <Footer />
    </>
  );
};

export default Main;
