import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display:flex;
  justify-content: center;
  font-size: 32px;
  color: white;
  background-color: var(--gray);
  width: 100%;
  height: 1000px;
  align-items:center;
`;

const Loading = () => (
  <LoadingWrapper>
    Loading...
  </LoadingWrapper>
);

export default Loading;
