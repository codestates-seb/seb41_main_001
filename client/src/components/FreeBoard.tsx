import styled from 'styled-components';

const Board = styled.div`
  width: 30rem;
  padding: 1rem;
  margin: 1rem;
  border: 0.1rem solid white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentSec = styled.section`
  display: flex;
  flex-direction: column;

  div:first-child {
    display: flex;
    div:first-child {
      width: 6rem;
      height: 1.5rem;
      margin-bottom: 0.5rem;
      padding: 0.2rem;
      border: 0.1rem solid white;
      border-radius: 0.5rem;
      display: flex;
      text-align: center;
      justify-content: center;
    }
  }

  div:last-child {
    width: 18rem;
    height: auto;
    max-height: 5rem;
  }
`;

const AuthorSec = styled.section`
  display: flex;
  flex-direction: column;

  div {
    margin: 0.5rem;
  }
`;

const FreeBoard = () => (
  <Board>
    <ContentSec>
      <div>
        <div>정보</div>
        <div>title:dhkdfkshkfajfdhsakf</div>
      </div>
      {/* <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </div> */}
    </ContentSec>
    <AuthorSec>
      <div>tag</div>
      <div>creator</div>
      <div>heartRate</div>
    </AuthorSec>
  </Board>
);
export default FreeBoard;
