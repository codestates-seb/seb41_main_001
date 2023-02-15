import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FilterBox from '../components/FilterBox';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import RecruitList from '../components/RecruitList';
import ButtonLink from '../components/ButtonLink';
import PaginationLink from '../components/PaginationLink';
import useCurrentLocation from '../utils/useCurrentLocation';
import Loading from './Loading';

const MainContainer = styled.main`
  width: 1100px;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  ul {
    list-style: none;
    padding: 0;
    margin-top: 40px;
    width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    > div {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      select {
        margin-bottom: 10px;
        margin-right: 10px;
        font-size: 14px;
        background-color: var(--gray);
        color: white;
        padding: 5px;
      }
    }
  }

  aside {
    width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    > div:first-child {
      height: 100%;
      position: relative;
    }
    > div:last-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 0px;
      span {
        margin-bottom: 10px;
      }
      a {
        margin: 10px 0px;
      }
    }
  }
`;

const Recruits = () => {
  const [data, setData] = useState<RecruitDataProps[]>();
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [listNum, setListNum] = useState('5');
  const searchParams = new URLSearchParams(useLocation().search);
  const [filterTag, setFilterTag] = useState<string>(
    searchParams.get('tag')?.replaceAll('"', '') ?? '',
  );
  const [filterStatus, setFilterStatus] = useState<string>(
    searchParams.get('status')?.replaceAll('"', '') ?? '',
  );
  const { location } = useCurrentLocation();
  const [distanceLimit, setDistanceLimit] = useState(10);
  const memberId = useSelector((state: any) => state.memberId);

  useEffect(() => {
    if (location) {
      setPage(1);
      const params = {
        page: 1,
        size: listNum,
        distanceLimit,
        lat: location.latitude,
        lon: location.longitude,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/recruits?${
            filterTag ? `tagName=${filterTag}` : ''
          }&${filterStatus ? `status=${filterStatus}` : ''}`,
          { params },
        )
        .then((res) => {
          setData(res.data.data);
          console.log(res.data.data);
          setPageCount(res.data.pageInfo.totalPages);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [listNum, filterTag, filterStatus, location, distanceLimit]);

  useEffect(() => {
    if (location) {
      const params = {
        page,
        size: listNum,
        distanceLimit,
        lat: location.latitude,
        lon: location.longitude,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/recruits?${
            filterTag ? `tagName=${filterTag}` : ''
          }&${filterStatus ? `status=${filterStatus}` : ''}`,
          { params },
        )
        .then((res) => {
          setData(res.data.data);
          setPageCount(res.data.pageInfo.totalPages);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data]);

  const handleChangeListNum = (e: any) => {
    setListNum(e.target.value);
    setPage(1);
  };

  // const LOGIN_ID = localStorage.getItem('memberId');

  return (
    <MainContainer>
      <div>
        <h1>모집게시판</h1>
        <span>동네 이웃과 함께 운동을 즐겨보세요!</span>
        <ul>
          <div>
            <select onChange={handleChangeListNum} defaultValue={5}>
              <option value={5}>5개</option>
              <option value={10}>10개</option>
              <option value={15}>15개</option>
            </select>
          </div>
          {location && data && !isLoading ? (
            data.map((item) => (
              <RecruitList
                key={item.recruitId}
                data={item}
                setFilterTag={setFilterTag}
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
      <aside>
        <div>
          <FilterBox
            filterTag={filterTag}
            filterStatus={filterStatus}
            distanceLimit={distanceLimit}
            setFilterTag={setFilterTag}
            setFilterStatus={setFilterStatus}
            setDistanceLimit={setDistanceLimit}
          />
        </div>
        <div>
          {memberId ? (
            <>
              <span>찾으시는 운동이 없으신가요?</span>
              <span>직접 이웃을 모아보세요!</span>
              <ButtonLink value="모집글 작성하기" to="/recruit/new" />
            </>
          ) : (
            ''
          )}
        </div>
      </aside>
    </MainContainer>
  );
};

export default Recruits;
