/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FreeBoardList from '../components/FreeBoardList';
import FreeDataProps from '../interfaces/FreeDataProps';
import ButtonLink from '../components/ButtonLink';
import PaginationLink from '../components/PaginationLink';
import Loading from './Loading';

const FBLContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: 100%;

  h1 {
    width: 35rem;
    margin-left: 1rem;
    /* margin-top: 1rem; */
    padding-top: 1rem;
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
    margin-bottom: 1rem;
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
    top: 44rem;
    margin-bottom: 1rem;
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

const CategoryLink = styled(Link)<{ color: string; currentcolor: string }>`
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
    background-color: ${(props) => props.currentcolor || '#484848'};
  }
`;

const FreeBoards = () => {
  const [data, setData] = useState<FreeDataProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  console.log(location);
  const searchParams = new URLSearchParams(useLocation().search);
  const [typeState, setTypeState] = useState<string>(
    searchParams.get('type')?.replaceAll('"', '') ?? '',
  );
  const [keywordState, setKeywordState] = useState<string>(
    searchParams.get('keyword')?.replaceAll('"', '') ?? '',
  );
  const memberId = useSelector((state: any) => state.memberId);

  // 클릭하면 맨 위로
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    console.log(typeState, keywordState);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/freeboards?type=${typeState}&keyword=${keywordState}`,
        {
          params: {
            page,
            size: 10,
          },
        },
      )
      .then((res) => {
        setData(res.data.data);
        setPageCount(res.data.pageInfo.totalPages);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => console.log(err));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [typeState, keywordState, page]);

  return (
    <FBLContainer>
      <div>
        <h1>자유게시판</h1>
        <span>자유롭게 글을 남겨보세요!</span>
        <FiltContainer>
          <i className="fa-solid fa-bars" />
          <CategoryLink
            color="#5aa1f1"
            to="/freeboards?type=category&keyword=운동"
            onClick={() => {
              setKeywordState('운동');
              setTypeState('category');
            }}
            currentcolor={
              typeState === 'category' && keywordState === '운동'
                ? '#5aa1f1'
                : '#484848'
            }
          >
            <div>
              <i className="fa-solid fa-dumbbell" />
              운동
            </div>
          </CategoryLink>
          <CategoryLink
            color="#ee8834"
            to="/freeboards?type=category&keyword=정보"
            onClick={() => {
              setKeywordState('정보');
              setTypeState('category');
            }}
            currentcolor={
              typeState === 'category' && keywordState === '정보'
                ? '#ee8834'
                : '#484848'
            }
          >
            <div>
              <i className="fa-solid fa-bullhorn" />
              정보
            </div>
          </CategoryLink>
          <CategoryLink
            color="#3fb950"
            to="/freeboards?type=category&keyword=질문"
            onClick={() => {
              setKeywordState('질문');
              setTypeState('category');
            }}
            currentcolor={
              typeState === 'category' && keywordState === '질문'
                ? '#3fb950'
                : '#484848'
            }
          >
            <div>
              <i className="fa-regular fa-comments" />
              질문
            </div>
          </CategoryLink>
          <CategoryLink
            color="#7dede1"
            to="/freeboards?type=category&keyword=나눔"
            onClick={() => {
              setKeywordState('나눔');
              setTypeState('category');
            }}
            currentcolor={
              typeState === 'category' && keywordState === '나눔'
                ? '#7dede1'
                : '#484848'
            }
          >
            <div>
              <i className="fa-solid fa-hand-holding-heart" />
              나눔
            </div>
          </CategoryLink>
        </FiltContainer>
        {memberId ? (
          <div className="btn">
            <ButtonLink value="작성하기" to="/freeboard/new" />
          </div>
        ) : (
          ''
        )}
        <ul>
          {location && data && !isLoading ? (
            data.map((el) => (
              <FreeBoardList
                data={el}
                key={el.freeId}
                setTypeState={setTypeState}
                setKeywordState={setKeywordState}
              />
            ))
          ) : (
            <Loading />
          )}
        </ul>
        {location && pageCount && (
          <PaginationLink
            pageCount={pageCount}
            active_page={page}
            setPage={setPage}
          />
        )}
      </div>
      <button className="scrollBtn" type="button" onClick={handleClick}>
        <i className="fa-solid fa-arrow-up-long" />
      </button>
    </FBLContainer>
  );
};

export default FreeBoards;
