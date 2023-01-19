import styled from 'styled-components';
import CreatorCard from './CreatorCard';
import TagLink from './TagLink';
import FreeDataProps from '../interfaces/FreeDataProps';
import timeDifference from '../utils/timeDifference';

const Board = styled.div`
  width: 30rem;
  padding: 1rem;
  margin: 1rem;
  border: 0.1rem solid white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
`;

const ContentSec = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  > div:first-child {
    display: flex;
    > div:first-child {
      width: 4rem;
      height: 1.5rem;
      padding: 0.2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      border: 0.1rem solid white;
      border-radius: 0.5rem;
      display: flex;
      text-align: center;
      justify-content: center;
      background-color: var(--neon-blue);

      /* i {
        color: var(--neon-blue);
      } */
    }
    > div:nth-child(2) {
      width: 17rem;
      height: 1.5rem;
      padding: 0.2rem;
      /* border: 0.05rem solid white; */
    }
  }

  > div:nth-child(2) {
    width: 21rem;
    height: auto;
    min-height: 1.5rem;
    max-height: 5rem;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    /* border: 0.05rem solid white; */
  }

  div:nth-child(3) {
    display: flex;
    width: 21rem;
    margin-bottom: 0.2rem;
    /* border: 0.05rem solid white; */
  }

  div:last-child {
    width: 21rem;
    height: 1.5rem;
    padding: 0.2rem;
    /* border: 0.05rem solid white; */
  }
`;

const AuthorSec = styled.section`
  display: flex;
  flex-direction: column;

  div {
    margin: 0.2rem;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;

    .like {
      color: var(--neon-yellow);
    }
    .view {
      color: var(--neon-blue);
    }
  }
`;

const FreeBoardList = (props: { data: FreeDataProps }) => {
  const {
    data: {
      freeId,
      // category,
      freeBody,
      // freeTitle,
      createdAt,
      // modifiedAt,
      likes,
      views,
      // memberId,
      // freeLikes,
      // freeTags,
      // freeComments,
      tagId,
      tagName,
    },
  } = props;

  return (
    <Board>
      <ContentSec>
        <div>
          <div>
            {/* {category} */}
            <i className="fa-solid fa-dumbbell" />
            정보
          </div>
          <div>
            {/* {freeTitle} */}
            안녕하세요!
          </div>
        </div>
        <div>
          {freeBody}
          내용내용내용내용내용 입니다입니다 내용내용내용내용내용 입니다입니다
          내용내용내용내용내용 입니다입니다 내용내용내용내용내용 입니다입니다
        </div>
        <div>
          <TagLink value={`${tagName}`} to={`/tags/${tagId}/${tagName}`} />
          <TagLink value={`${tagName}`} to={`/tags/${tagId}/${tagName}`} />
        </div>
        <div>
          {/* {`${convertToDate(createdAt)}`} */}
          {`${timeDifference(createdAt)}`}
        </div>
      </ContentSec>
      <AuthorSec>
        <div>
          <div>
            <i className="fa-regular fa-thumbs-up like" />
            {likes}
          </div>
          <div>
            <i className="fa-solid fa-eye view" />
            {views}
          </div>
        </div>
        <CreatorCard memberId={freeId} nickname="aaa" />
      </AuthorSec>
    </Board>
  );
};
export default FreeBoardList;
