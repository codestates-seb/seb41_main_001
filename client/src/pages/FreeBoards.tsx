/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FreeBoardList from '../components/FreeBoardList';
import FreeDataProps from '../interfaces/FreeDataProps';
import ButtonLink from '../components/ButtonLink';

const FBLContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
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
    height: 1.5rem;
    margin-left: 29rem;
    margin-top: 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
    a {
      text-decoration: none;
      color: white;
    }
  }

  .scrollBtn {
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--neon-yellow);
    position: sticky;
    top: 41.5rem;
  }
`;

const FiltContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21rem;
  height: 3rem;
  border: 0.05rem solid white;
  border-radius: 1rem;
  margin-left: 8rem;
  margin-top: 1rem;
  /* margin-bottom: 1rem; */

  > a {
    text-decoration: none;
    color: white;
  }
`;

const CategoryLink = styled(Link)<{ color: string; currentColor: string }>`
  :hover {
    > div {
      color: black;
      border: none;
      background-color: ${(props) => props.color};
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 2rem;
    /* border: 0.05rem solid white; */
    border-radius: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.2rem;
    background-color: ${(props) => props.currentColor || '#484848'};
  }
`;

const FreeBoards = () => {
  const [data, setData] = useState<FreeDataProps[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const location = useLocation();
  console.log(location);
  // const params = new URLSearchParams(location.search);

  // 클릭하면 맨 위로
  const handleClick = () => {
    // useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // }, []);
  };

  useEffect(() => {
    axios
      .get(
        `/freeboards?category=${filterCategory}&page=1&size=10&sort=latest&tag=all`,
      )
      .then((res) => {
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [filterCategory]);

  return (
    <FBLContainer>
      <div>
        <h1>자유게시판</h1>
        <span>자유롭게 글을 남겨보세요!</span>
        <FiltContainer>
          <i className="fa-solid fa-bars" />
          <CategoryLink
            color="#5aa1f1"
            to="/freeboard?category=운동"
            onClick={() => {
              setFilterCategory('운동');
            }}
            currentColor={filterCategory === '운동' ? '#5aa1f1' : '#484848'}
          >
            <div>
              <i className="fa-solid fa-dumbbell" />
              운동
            </div>
          </CategoryLink>
          <CategoryLink
            color="#ee8834"
            to="/freeboard?category=정보"
            onClick={() => {
              setFilterCategory('정보');
            }}
            currentColor={filterCategory === '정보' ? '#ee8834' : '#484848'}
          >
            <div>
              <i className="fa-solid fa-bullhorn" />
              정보
            </div>
          </CategoryLink>
          <CategoryLink
            color="#3fb950"
            to="/freeboard?category=질문"
            onClick={() => {
              setFilterCategory('질문');
            }}
            currentColor={filterCategory === '질문' ? '#3fb950' : '#484848'}
          >
            <div>
              <i className="fa-regular fa-comments" />
              질문
            </div>
          </CategoryLink>
          <CategoryLink
            color="#7dede1"
            to="/freeboard?category=나눔"
            onClick={() => {
              setFilterCategory('나눔');
            }}
            currentColor={filterCategory === '나눔' ? '#7dede1' : '#484848'}
          >
            <div>
              <i className="fa-solid fa-hand-holding-heart" />
              나눔
            </div>
          </CategoryLink>
        </FiltContainer>
        <div className="btn">
          <ButtonLink value="작성하기" to="/freeboard/new" />
        </div>
        <ul>
          {data.map((el) => (
            <FreeBoardList data={el} key={el.freeId} />
          ))}
        </ul>
      </div>
      <button className="scrollBtn" type="button" onClick={handleClick}>
        <i className="fa-solid fa-arrow-up-long" />
      </button>
    </FBLContainer>
  );
};

export default FreeBoards;
