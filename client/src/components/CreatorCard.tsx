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
      width: 50px;
      height: 50px;
    }
    div {
      display: flex;
      flex-direction: column;
      > div:nth-child(2) {
        font-weight: 400;
        font-size: 80%;
        margin: 5px 0px;
      }
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
  authorLocation?: string;
  image?: string;
}

const CreatorCard = ({
  memberId,
  nickname,
  heart,
  authorLocation,
  image,
}: CreatorCardProps) => (
  <ListCreator>
    <Link to={`/members/${memberId}`}>
      <img
        src={
          image
            ? `${image}`
            : `https://picsum.photos/seed/${memberId}/50/50.webp`
        }
        alt={`avator of ${nickname}}`}
      />
      <div>
        <div>{nickname}</div>
        <div>{authorLocation}</div>
        <span>
          <i className="fa-solid fa-heart" />
          {heart}
        </span>
      </div>
    </Link>
  </ListCreator>
);

export default CreatorCard;
