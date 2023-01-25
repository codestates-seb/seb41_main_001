import styled from 'styled-components';

const LoadingContainer = styled.main`
  display: flex;
  justify-content: center;
  font-size: 32px;
  color: white;
  width: 100%;
  height: 100vh;
  align-items: center;

  h3 {
    font-size: 30px;
    color: rgb(190, 190, 190);
    margin-right: 30px;
  }

  .dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: rgb(190, 190, 190);
    color: rgb(190, 190, 190);
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }
  .dot-flashing::before,
  .dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }
  .dot-flashing::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: rgb(190, 190, 190);
    color: rgb(190, 190, 190);
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }
  .dot-flashing::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: rgb(190, 190, 190);
    color: rgb(190, 190, 190);
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: rgb(190, 190, 190);
    }
    50%,
    100% {
      background-color: rgba(152, 128, 255, 0.2);
    }
  }
`;

const Loading = () => (
  <LoadingContainer>
    <h3>Loading</h3>
    <div className="dot-flashing" />
  </LoadingContainer>
);

export default Loading;
