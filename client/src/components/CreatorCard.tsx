import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListCreator = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: auto;
  border-radius: 10px;
  padding: 15px 20px;
  a {
    text-decoration: none;
    color: black;
    display: flex;
    font-size: 100%;
    font-weight: 600;
    img {
      border-radius: 50%;
      margin-right: 20px;
    }
    div {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        color: var(--neon-red);
        font-size: 80%;
        i {
          margin-right: 4px;
        }
      }
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

interface CreatorCardProps {
  memberId: number;
  nickname: string;
  heart: number;
}

const CreatorCard = ({ memberId, nickname, heart }: CreatorCardProps) => (
  <ListCreator>
    <Link to={`/members/mypage/${memberId}`}>
      <img
        src={`https://picsum.photos/seed/${memberId}/50/50.webp`}
        alt={`avator of ${nickname}}`}
      />
      <div>
        {nickname}
        <span>
          <i className="fa-solid fa-heart" />
          {heart}
        </span>
      </div>
    </Link>
  </ListCreator>
);

export default CreatorCard;
