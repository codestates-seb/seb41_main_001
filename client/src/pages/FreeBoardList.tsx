import styled from 'styled-components';
import FreeBoard from '../components/FreeBoard';

const FBLContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const BoardList = styled.div`
  width: 35rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const FreeBoardList = () => (
  <FBLContainer>
    <BoardList>
      <FreeBoard />
      <FreeBoard />
      <FreeBoard />
    </BoardList>
  </FBLContainer>
);

export default FreeBoardList;
