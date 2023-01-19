import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FreeDataProps from '../interfaces/FreeDataProps';
// import timeDifference from '../utils/timeDifference';
import Loading from './Loading';

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
    height: 1rem;
    border: 0.1rem solid white;
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-right: 28rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const CreatorContainer = styled.div`
  border: 0.1rem solid white;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  width: 33rem;
  height: 4rem;
  padding: 1rem;
  margin-bottom: 0.5rem;

  > div {
    > div {
      display: flex;
      padding: 0.3rem;
      > div {
        padding-right: 0.5rem;
        width: 5rem;
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
  margin-bottom: 0.5rem;

  > div {
    border: 0.1rem solid white;
    width: 33rem;
    height: auto;
    min-height: 3rem;
    padding: 1rem;
  }
`;

const CountContainer = styled.div`
  display: flex;
  border: 0.1rem solid white;
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
          <div>{post?.category}</div>
          <CreatorContainer>
            <div>profile</div>
            <div>
              <div>nickname</div>
              <div>
                <div>{post?.createdAt}</div>
                <div>{post?.modifiedAt}</div>
              </div>
            </div>
          </CreatorContainer>
          <ContentContainer>
            <div>{post?.freeTitle}</div>
            <div>img</div>
            <div>{post?.freeBody}</div>
            <div>gpsLocation</div>
          </ContentContainer>
          <CountContainer>
            <div>
              <i className="fa-solid fa-eye" />
              view
            </div>
            <div>
              <i className="fa-solid fa-heart" />
              like
            </div>
          </CountContainer>
          <div>
            <ul>
              <div>comment</div>
            </ul>
          </div>
          <div>
            <label htmlFor="comment">comment</label>
            <input id="comment" type="text" />
          </div>
        </BoardContainer>
      ) : (
        <Loading />
      )}
    </FDContainer>
  );
};

export default FreeDetail;
