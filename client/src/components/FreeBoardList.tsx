/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CreatorMiniCard from './CreatorMiniCard';
import TagLink from './TagLink';
import FreeDataProps from '../interfaces/FreeDataProps';
import timeDifference from '../utils/timeDifference';

const Board = styled.li`
  width: 35rem;
  padding: 1rem;
  margin: 1rem;
  border: 0.05rem solid white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
`;

const Category = styled('div')<{ color: string }>`
  width: 4.5rem;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
`;

const ContentSec = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  > div:first-child {
    display: flex;
    > a {
      width: 4.5rem;
      height: 2rem;
      /* border: 0.05rem solid white; */
      border-radius: 1rem;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      background-color: var(--neon-blue);
      /* i {
        color: var(--neon-blue);
      } */
    }
    > div:nth-child(2) {
      width: 17rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      margin-left: 0.3rem;
      margin-top: 0.3rem;
    }
  }

  > div:nth-child(2) {
    width: 26rem;
    height: auto;
    min-height: 1.5rem;
    max-height: 5rem;
    line-height: 150%;
    padding: 0.2rem;
    margin: 0.5rem 0;
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
    justify-content: center;
    align-items: center;

    .like {
      color: var(--neon-yellow);
    }
    .view {
      color: var(--neon-blue);
    }
    .comment {
      color: var(--neon-green);
    }
  }
  .counts {
    display: flex;
    flex-direction: column;
  }
`;

const FreeBoardList = (props: { data: FreeDataProps }) => {
  const {
    data: {
      freeId,
      category,
      freeBody,
      // freeTitle,
      createdAt,
      // modifiedAt,
      freeLikes,
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
    <Link to={`/freeboard/${freeId}`}>
      <Board>
        <ContentSec>
          <div>
            <Link to={`/freeboard?category=${category}`}>
              <Category
                color={
                  category === '운동'
                    ? '5aa1f1'
                    : category === '정보'
                    ? 'ee8834'
                    : category === '질문'
                    ? '3fb950'
                    : '7dede1'
                }
              >
                {category === '운동' ? (
                  <i className="fa-solid fa-dumbbell" />
                ) : category === '정보' ? (
                  <i className="fa-solid fa-bullhorn" />
                ) : category === '질문' ? (
                  <i className="fa-regular fa-comments" />
                ) : (
                  <i className="fa-solid fa-hand-holding-heart" />
                )}
                {/* {category} */}
                운동
              </Category>
            </Link>
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
          <div className="counts">
            <div>
              <i className="fa-solid fa-eye view" />
              {views}
            </div>
            <div>
              <i className="fa-regular fa-thumbs-up like" />
              {freeLikes.length}
            </div>
            <div>
              <i className="fa-regular fa-comment-dots comment" />
              {/* {freeComments.length} */}
              {0}
            </div>
            <CreatorMiniCard memberId={freeId} nickname="aaa" heart={100} />
          </div>
        </AuthorSec>
      </Board>
    </Link>
  );
};
export default FreeBoardList;
