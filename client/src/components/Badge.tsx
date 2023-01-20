import styled from 'styled-components';

const BadgeWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div:first-child {
    background-color: darkcyan;
    padding: 15px;
    border: 1.5px solid white;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    margin-bottom: 8px;
  }
  > div {
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;
interface BadgeItem {
  title: string;
  icon: string;
}

const Badge = ({ title, icon }:BadgeItem) => (
  <div>
    <BadgeWrapper>
      <div>
        <i className={icon} />
      </div>
      <div>
        {title}
      </div>
    </BadgeWrapper>
  </div>
);

export default Badge;
