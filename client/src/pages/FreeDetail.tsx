/* eslint-disable operator-linebreak */
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FreeDataProps from '../interfaces/FreeDataProps';
import timeDifference from '../utils/timeDifference';
import CreatorCard from '../components/CreatorCard';
import Loading from './Loading';
import KakaoMap from '../components/KakaoMap';
import CommentBox from '../components/CommentBox';
import CommentSubmitBox from '../components/CommentSubmitBox';
import Button from '../components/Button';
// import preview from '../img/preview.jpeg';

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
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    width: 33rem;
  }

  > div:first-child {
    width: 5rem;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f43a581cc4a49b17d3dbd477f796ec68b62e0c63
    height: 1rem;
    border: 0.1rem solid white;
=======
    height: 2rem;
    border: 0.05rem solid white;
>>>>>>> c0bb72c19b3c6ce82e7c28d3a3a306d0e759a6b0
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 28rem;
    /* margin-top: 0.5rem;
    margin-bottom: 0.5rem; */
    i {
      margin-right: 0.3rem;
    }
  }

  > div:nth-child(3) {
    display: flex;
    width: 33rem;
    justify-content: space-between;
    > div:first-child {
      width: 5.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        margin-right: 0.3rem;
      }
    }
  }

  > div:nth-child(4) {
    width: 33rem;
    margin: 1rem 0;
  }

  .commentCount {
    border-bottom: 1px solid white;
    width: 33rem;
    margin-bottom: 1rem;
    padding: 1rem 0;
  }

  .likeDiv {
    border: 1px solid white;
    border-radius: 0.3rem;
    padding: 0.5rem;
  }

  .btnCon {
    width: 33rem;
    display: flex;
    justify-content: space-between;
    > div:nth-child(2) {
      display: flex;
      > button:first-child {
        margin-right: 0.5rem;
      }
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .body {
    height: auto;
    min-height: 3rem;
    line-height: 150%;
  }

  > div {
    /* border: 0.1rem solid white; */
    width: 33rem;
    height: auto;
    min-height: 3rem;

    img {
      width: 33rem;
      height: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      /* padding: 1rem; */
      margin: 1rem 0;
    }

    .map {
<<<<<<< HEAD
      width: 33rem;
      height: 10rem;
      display: flex;
      margin: 1rem 0;
=======
      width: 31rem;
      height: 24rem;
>>>>>>> f43a581cc4a49b17d3dbd477f796ec68b62e0c63
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

const FreeDetail = () => {
  const { freeId } = useParams();
  const [post, setPost] = useState<FreeDataProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/freeboards/${freeId}`)
      .then((res) => {
        setPost(res.data.data);
        console.log(post);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <FDContainer>
      {!isLoading ? (
        <BoardContainer>
          <div>
            {/* {post?.category} */}
            <i className="fa-solid fa-dumbbell" />
            운동
          </div>
          <h1>{post?.freeTitle}</h1>
          <div>
            <div>
              <i className="fa-regular fa-clock" />
              {timeDifference(`${post?.createdAt}`)}
            </div>
            <CountContainer>
              <div>
                <i className="fa-solid fa-eye view" />
                {post?.views}
              </div>
              <div>
                <i className="fa-regular fa-thumbs-up like" />
                {post?.likes}
              </div>
              <div>
                <i className="fa-regular fa-comment-dots comment" />
                {0}
                {/* <div>{post?.freeComments.length}</div> */}
              </div>
            </CountContainer>
          </div>
          <CreatorCard memberId={1} nickname="aaa" heart={100} />
          <ContentContainer>
            {/* <div>
              <img src={preview} alt="preview" />
            </div> */}
            <div className="body">
              {post?.freeBody}
              안녕안녕안녕안녕 하세요하세요 안녕안녕안녕안녕 하세요하세요
              안녕안녕안녕안녕 하세요하세요 안녕안녕안녕안녕 하세요하세요
              안녕안녕안녕안녕 하세요하세요 안녕안녕안녕안녕 하세요하세요
            </div>
            <div>
              {/* 위치 */}
              <div className="map">
                <KakaoMap
                  latitude={37.7424074}
                  longitude={127.042215}
                  overlayvalue="운동 장소"
                />
              </div>
            </div>
          </ContentContainer>
          <div className="btnCon">
            <Button
              value="좋아요"
              onClick={() => console.log('좋아요!')}
              icon={<i className="fa-solid fa-heart" />}
            />
            <div>
              <Button
                value="수정"
                onClick={() => console.log('수정')}
                icon={<i className="fa-solid fa-pen-to-square" />}
              />
              <Button
                value="삭제"
                onClick={() => console.log('수정')}
                icon={<i className="fa-solid fa-trash" />}
              />
            </div>
          </div>
          <div className="commentCount">
            {0}
            개의 댓글이 있습니다
          </div>
          {post?.freeComments &&
            post?.freeComments.map((el) => (
              <CommentBox
                key={el.commentId}
                memberId={el.memberId}
                data={el}
                board="freeboards"
                boardId={post.freeId}
              />
            ))}
          <CommentSubmitBox submitComment={`/freeboards/${post?.freeId}`} />
        </BoardContainer>
      ) : (
        <Loading />
      )}
    </FDContainer>
  );
};

export default FreeDetail;
