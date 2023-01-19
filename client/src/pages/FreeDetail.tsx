import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FreeDataProps from '../interfaces/FreeDataProps';
import timeDifference from '../utils/timeDifference';
import Loading from './Loading';
import KakaoMap from '../components/KakaoMap';
// import CommentBox from '../components/CommentBox';
import preview from './preview.jpeg';

const FDContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const BoardContainer = styled.div`
  width: 35rem;
  height: auto;
  padding: 0.5rem;
  margin: 1rem;
  border: 0.1rem solid white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div:first-child {
    width: 5rem;
    height: 1.5rem;
    border: 0.1rem solid white;
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    margin-right: 26rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const CreatorContainer = styled.div`
  border: 0.1rem solid white;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  width: 31rem;
  height: 4rem;
  padding: 0.5rem;

  > div {
    > div {
      display: flex;
      padding: 0.3rem;
      > div {
        width: 7rem;
      }
    }
  }

  > div:first-child {
    width: 3rem;
    height: 3rem;
    border: 0.1rem solid white;
    border-radius: 1rem;
    margin-right: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 0.5rem; */
  div:first-child {
    font-weight: bold;
    /* padding: 0.3rem; */
  }

  > div {
    /* border: 0.1rem solid white; */
    width: 33rem;
    height: auto;
    min-height: 3rem;
    padding: 1rem;

    img {
      width: 31rem;
      height: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .map {
      width: 31rem;
      height: 10rem;
    }
  }
`;

const CountContainer = styled.div`
  display: flex;
  /* border: 0.1rem solid white; */
  border-radius: 0.3rem;
  width: 33rem;
  height: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  > div {
    margin-right: 0.5rem;
  }

  .view {
    color: var(--neon-blue);
  }

  .like {
    color: var(--neon-red);
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
          <CreatorContainer>
            <div>profile</div>
            <div>
              <div>
                <div>nickname</div>
                <div>heart</div>
              </div>
              <div>
                <div>
                  게시
                  {post && `${timeDifference(post?.createdAt)}`}
                </div>
                <div>
                  수정
                  {post && `${timeDifference(post?.modifiedAt)}`}
                </div>
              </div>
            </div>
          </CreatorContainer>
          <ContentContainer>
            <div>{post?.freeTitle}</div>
            <div>
              {/* img */}
              <img src={preview} alt="preview" />
            </div>
            <div>
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
          <CountContainer>
            <div>
              <i className="fa-solid fa-eye view" />
              {post?.views}
            </div>
            <div>
              <i className="fa-solid fa-heart like" />
              {post?.likes}
            </div>
          </CountContainer>
          {/* {post &&
            post?.freeComments.map((el) => (
              <CommentBox data={el} key={el.memberId} />
            ))} */}
          {/* <div>
            <label htmlFor="comment">comment</label>
            <input id="comment" type="text" />
          </div> */}
        </BoardContainer>
      ) : (
        <Loading />
      )}
    </FDContainer>
  );
};

export default FreeDetail;
