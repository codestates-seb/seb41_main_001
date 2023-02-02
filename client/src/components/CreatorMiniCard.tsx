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
    font-size: 80%;
    font-weight: 600;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
      border-radius: 50%;
    }
    > div:nth-child(2) {
      font-weight: 400;
      margin: 5px 0px;
      font-size: 60%;
    }
    > div:nth-child(3) {
      color: var(--neon-red);
      font-size: 60%;
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
  className?: string;
  memberId: number;
  nickname: string;
  heart: number;
  image?: string;
  authorLocation?: string;
}

const CreatorMiniCard = ({
  className,
  memberId,
  nickname,
  heart,
  image,
  authorLocation,
}: CreatorMiniCardProps) => (
  <ListCreator className={className}>
    <Link to={`/members/${memberId}`}>
      <img
        src={
          image
            ? `${image}`
            : `https://picsum.photos/seed/${memberId}/30/30.webp`
        }
        alt={`avator of ${nickname}}`}
      />
      {nickname}
      <div>{authorLocation}</div>
      <div>
        <i className="fa-solid fa-heart" />
        {heart}
      </div>
    </Link>
  </ListCreator>
);

export default CreatorMiniCard;
