import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListCreator = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: 100px;
  border-radius: 20px;
  padding: 15px 10px;
  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    img {
      margin-bottom: 5px;
      border-radius: 50%;
    }
    div {
      font-size: 10px;
      color: var(--neon-red);
      margin-top: 5px;
      i {
        margin-right: 3px;
      }
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

interface CreatorMiniCardProps {
  memberId: number;
  nickname: string;
  heart: number;
}

const CreatorMiniCard = ({
  memberId,
  nickname,
  heart,
}: CreatorMiniCardProps) => (
  <ListCreator>
    <Link to={`/users/${memberId}/${nickname}`}>
      <img
        src={`https://picsum.photos/seed/${memberId}/30/30.webp`}
        alt={`avator of ${nickname}}`}
      />
      {nickname}
      <div>
        <i className="fa-solid fa-heart" />
        {heart}
      </div>
    </Link>
  </ListCreator>
);

export default CreatorMiniCard;
