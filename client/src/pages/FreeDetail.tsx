/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-lone-blocks */
/* eslint-disable operator-linebreak */
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FreeDataProps from '../interfaces/FreeDataProps';
import timeDifference from '../utils/timeDifference';
import CreatorCard from '../components/CreatorCard';
import Loading from './Loading';
import CommentBox from '../components/CommentBox';
import CommentSubmitBox from '../components/CommentSubmitBox';
import Button from '../components/Button';
import FreeCreatorSelectBox from '../components/FreeCreatorSelectBox';
// import TagLink from '../components/TagLink';

const FDContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: 100%;
`;

const BoardContainer = styled.div`
  width: 35rem;
  height: auto;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    width: 35rem;
  }

  > div:first-child {
    width: 5rem;
    height: 2rem;
    /* border: 0.05rem solid white; */
    border-radius: 0.3rem;
    /* background-color: white; */
    /* color: black; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30rem;
    /* margin-top: 0.5rem;
    margin-bottom: 0.5rem; */
    i {
      margin-right: 0.3rem;
    }
    a {
      text-decoration: none;
      color: white;
    }
  }

  > div:nth-child(3) {
    display: flex;
    width: 35rem;
    justify-content: space-between;
    > div:first-child {
      width: 6rem;
      /* width: auto; */
      display: flex;
      align-items: center;
      justify-content: center;
      /* border: 1px solid white; */
      i {
        margin-right: 0.3rem;
      }
    }
  }

  > div:nth-child(4) {
    width: 35rem;
    margin: 1rem 0;
  }

  .commentCount {
    border-bottom: 1px solid white;
    width: 35rem;
    margin-bottom: 1rem;
    padding: 1rem 0;
  }

  .likeDiv {
    border: 1px solid white;
    border-radius: 0.3rem;
    padding: 0.5rem;
  }

  .btnCon {
    width: 35rem;
    display: flex;
    justify-content: space-between;
    > div:nth-child(2) {
      /* width: 10.5rem;
      display: flex;
      justify-content: space-between; */
      /* border: 1px solid white; */
      /* > button:first-child {
        margin-right: 0.5rem;
      } */
    }
  }

  .location {
    width: 35rem;
    margin-bottom: 1rem;
    > i {
      margin-right: 0.3rem;
    }
  }

  /* .tag {
    display: flex;
    width: 35rem;
    margin-bottom: 0.2rem;
  } */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .body {
    height: auto;
    min-height: 2rem;
    line-height: 150%;
    margin-bottom: 1rem;
  }

  > div {
    /* border: 0.1rem solid white; */
    width: 35rem;
    height: auto;
    min-height: 3rem;

    img {
      width: 35rem;
      height: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      /* padding: 1rem; */
      margin: 1rem 0;
    }

    .map {
      width: 35rem;
      height: 10rem;
      display: flex;
      margin: 1rem 0;
    }
  }
`;

const CountContainer = styled.div`
  display: flex;
  border-radius: 0.3rem;
  height: 1rem;
  display: flex;
  align-items: center;

  > div {
    margin-right: 0.5rem;
    i {
      margin-right: 0.3rem;
    }
  }

  .view {
    color: var(--neon-blue);
  }

  .like {
    color: var(--neon-yellow);
  }

  .comment {
    color: var(--neon-green);
  }
`;

const Category = styled('div')<{ color: string }>`
  width: 4.5rem;
  height: 2rem;
  border-radius: 0.7rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.color === '운동'
      ? 'var(--neon-blue)'
      : props.color === '정보'
      ? 'var(--neon-orange)'
      : props.color === '질문'
      ? 'var(--neon-green)'
      : 'var(--neon-sky-blue)'};
`;

const LikeButton = styled(Button)<{ likes: boolean }>`
  color: ${(props) => (props.likes ? 'var(--neon-red)' : 'white')};
  border: 1px solid ${(props) => (props.likes ? 'var(--neon-red)' : 'white')};
`;

const FreeDetail = () => {
  const { freeId } = useParams();
  const [post, setPost] = useState<FreeDataProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likesMemberId, setLikesMemberId] = useState<number[]>();
  // const LOGIN_ID = Number(localStorage.getItem('memberId'));
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = Number(useSelector((state: any) => state.memberId));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/freeboards/${freeId}`)
      .then((res) => {
        setPost(res.data.data);
        console.log(post);
        setIsLoading(false);
        setLikesMemberId(
          res.data.data.freeLikes.reduce((r: number[], e: any) => {
            if (e.memberId) {
              r.push(e.memberId);
            }
            return r;
          }, []),
        );
      })
      .catch((err) => {
        console.log(err);
      });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <FDContainer>
      {!isLoading && post ? (
        <BoardContainer>
          <div>
            <Link to={`/freeboards?type=category&keyword=${post.category}`}>
              <Category color={post.category}>
                {post.category === '운동' ? (
                  <i className="fa-solid fa-dumbbell" />
                ) : post.category === '정보' ? (
                  <i className="fa-solid fa-bullhorn" />
                ) : post.category === '질문' ? (
                  <i className="fa-regular fa-comments" />
                ) : (
                  <i className="fa-solid fa-hand-holding-heart" />
                )}
                {post.category}
              </Category>
            </Link>
          </div>
          <h1>{post.freeTitle}</h1>
          <div>
            <div>
              <i className="fa-regular fa-clock" />
              {timeDifference(`${post.modifiedAt}`)}
            </div>
            <CountContainer>
              <div>
                <i className="fa-solid fa-eye view" />
                {post.views}
              </div>
              <div>
                <i className="fa-regular fa-thumbs-up like" />
                {post.freeLikes.length}
              </div>
              <div>
                <i className="fa-regular fa-comment-dots comment" />
                {post.freeComments.length}
              </div>
            </CountContainer>
          </div>
          <CreatorCard
            memberId={post.memberId}
            nickname={post.nickname}
            heart={post.authorHeart}
            authorLocation={post.authorLocation}
            image={post.filePath}
          />
          <ContentContainer>
            {/* <div>
              <img src={preview} alt="preview" />
            </div> */}
            <div className="body">{post.freeBody}</div>
            {/* {post?.location === undefined ? (
              ''
            ) : (
              <div>
                <div className="map">
                  <KakaoMap
                    latitude={37.7424074}
                    longitude={127.042215}
                    overlayvalue="운동 장소"
                  />
                </div>
              </div>
            )} */}
          </ContentContainer>
          {post.location ? (
            <div className="location">
              <i className="fa-solid fa-location-dot" />
              {post.location}
            </div>
          ) : (
            ''
          )}
          {/* <div className="tags">
            {post.freeTags.map((el) => (
              <TagLink
                onClick={() => {}}
                key={el.tagId}
                value={`${el.tagName}`}
                to={`/freeboards?type=tag&keyword=${el.tagName}`}
              />
            ))}
          </div> */}
          <div>
            {post.freeImages ? (
              post.freeImages.map((el) => (
                <img src={el.filePath} alt="" key={el.freeImageId} />
              ))
            ) : (
              <p>이미지 없음!</p>
            )}
          </div>
          <div className="btnCon">
            <LikeButton
              likes={likesMemberId!.includes(memberId)}
              value={`좋아요 ${post.freeLikes.length}`}
              onClick={() => {
                axios
                  .patch(
                    `${process.env.REACT_APP_API_URL}/freeboards/${freeId}/likes`,
                    { memberId },
                    {
                      headers: {
                        Authorization: accessToken,
                        Refresh: refreshToken,
                      },
                    },
                  )
                  .then((res) => {
                    console.log(res);
                    setPost(res.data.data);
                    setLikesMemberId(
                      res.data.data.freeLikes.reduce((r: number[], e: any) => {
                        if (e.memberId) {
                          r.push(e.memberId);
                        }
                        return r;
                      }, []),
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                    navigate('/login');
                  });
              }}
              icon={<i className="fa-solid fa-heart" />}
            />
            {post.memberId === memberId ? <FreeCreatorSelectBox /> : ''}
          </div>
          <div className="commentCount">
            {post.freeComments.length}
            개의 댓글이 있습니다
          </div>
          {/* <ul> */}
          {post.freeComments.map((el) => (
            <CommentBox
              key={el.freeCommentId}
              commentId={el.freeCommentId}
              memberId={post.memberId}
              board="freeboards"
              boardId={post.freeId}
              data={el}
              setData={setPost}
              image={el.filePath}
            />
          ))}
          {/* </ul> */}
          <CommentSubmitBox
            submitComment={`/freeboards/${post.freeId}`}
            setData={setPost}
          />
        </BoardContainer>
      ) : (
        <Loading />
      )}
    </FDContainer>
  );
};

export default FreeDetail;
