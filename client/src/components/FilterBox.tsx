import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FilterDataProps from '../interfaces/FilterDataProps';
import AutoCompleteForString from './AutoCompleteForString';

const BoxContainer = styled.div`
  position: sticky;
  top: 130px;
  margin-left: 20px;
  padding: 0px 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  width: 100%;
  h3 {
    font-size: 120%;
  }
  > div:nth-child(2) {
    margin-bottom: 10px;
  }

  > div:nth-child(3) {
    margin-bottom: 50px;
  }

  > div:last-child {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const SelectBox = styled.div`
  margin-bottom: 50px;
  select,
  option {
    margin: 10px 0px;
    height: 35px;
    width: 100%;
    text-align: center;
    font-size: 100%;
    background-color: var(--gray);
    color: white;
  }
`;

const FilterBox = ({
  filterTag,
  filterStatus,
  distanceLimit,
  setFilterTag,
  setFilterStatus,
  setDistanceLimit,
}: FilterDataProps) => {
  const [tagData, setTagData] =
    useState<{ tagId: number; tagName: string; emoji: string }[]>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags/recruits`)
      .then((res) => {
        setTagData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoxContainer>
      <h3>필터 박스</h3>
      <div>운동태그</div>
      {tagData && (
        <AutoCompleteForString
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          data={tagData}
        />
      )}
      <div>모집상태</div>
      <SelectBox>
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
        >
          <option value="">----- 모집상태 -----</option>
          <option value="모집중">모집중</option>
          <option value="최소인원충족">최소인원충족</option>
          <option value="모집완료">모집완료</option>
          <option value="활동종료">활동종료</option>
        </select>
      </SelectBox>
      <div>현재위치에서부터의 거리</div>
      <SelectBox>
        <select
          onChange={(e) => setDistanceLimit(Number(e.target.value))}
          defaultValue={distanceLimit}
        >
          <option value={5}>5km</option>
          <option value={10}>10km</option>
          <option value={20}>20km</option>
          <option value={30}>30km</option>
          <option value={1000}>1000km (전체)</option>
        </select>
      </SelectBox>
    </BoxContainer>
  );
};

export default FilterBox;
