import styled from 'styled-components';

const BadgeWrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 100px;
  justify-content: center;
  align-items: center;
  > div:first-child {
    background-color: darkcyan;
    padding: 15px;
    border: 1.5px solid white;
    border-radius: 50px;
    width: 50px;
    height: 50px;
  }
  > div {
    margin: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

const Badge = () => (
  <div>
    <BadgeWrapper>
      <div>
        <i className="fa-solid fa-star" />
      </div>
      <div>
        Writer
      </div>
    </BadgeWrapper>
  </div>
);

export default Badge;
