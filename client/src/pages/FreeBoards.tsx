import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import FreeBoardList from '../components/FreeBoardList';
import FreeDataProps from '../interfaces/FreeDataProps';
import ButtonLink from '../components/ButtonLink';

const FBLContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  height: 100%;

  h1 {
    width: 34rem;
    margin-left: 1rem;
  }

  span {
    height: 1.5rem;
    margin-left: 1rem;
  }

  .btn {
    width: 3rem;
    height: 1rem;
    margin-left: 30rem;
  }

  ul {
    margin: 0;
    padding: 0;
    a {
      text-decoration: none;
      color: white;
    }
  }
`;

const FiltContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35rem;
  height: 3rem;
  /* border-top: 0.05rem solid white; */
  /* border-bottom: 0.05rem solid white; */
  margin-left: 0.5rem;
  margin-bottom: 0.8rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 2rem;
    border: 0.05rem solid white;
    border-radius: 1rem;
    margin-left: 1rem;
    /* color: black; */
  }

  > div:first-child {
    :hover {
      /* color: var(--neon-blue); */
      color: black;
      background-color: var(--neon-blue);
      border: none;
    }
  }
  > div:nth-child(2) {
    :hover {
      color: black;
      background-color: var(--neon-orange);
      border: none;
    }
  }
  > div:nth-child(3) {
    :hover {
      color: black;
      background-color: var(--neon-yellow);
      border: none;
    }
  }
  > div:last-child {
    :hover {
      color: black;
      background-color: var(--neon-sky-blue);
      border: none;
    }
  }
`;

const FreeBoards = () => {
  const [data, setData] = useState<FreeDataProps[]>([]);

  useEffect(() => {
    axios
      .get('/freeboards?category=all&page=1&size=10&sort=latest&tag=all')
      .then((res) => {
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FBLContainer>
      <h1>자유게시판</h1>
      <span>자유롭게 글을 남겨보세요!</span>
      <FiltContainer>
        <div>운동</div>
        <div>정보</div>
        <div>질문</div>
        <div>나눔</div>
      </FiltContainer>
      <div className="btn">
        {/* <i className="fa-solid fa-plus" /> */}
        <ButtonLink value="작성하기" to="/freeboard/new" />
      </div>
      <ul>
        {data.map((el) => (
          <FreeBoardList data={el} key={el.freeId} />
        ))}
      </ul>
    </FBLContainer>
  );
};

export default FreeBoards;
