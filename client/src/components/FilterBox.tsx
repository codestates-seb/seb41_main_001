import styled from 'styled-components';
import FilterDataProps from '../interfaces/FilterDataProps';
import ButtonLink from './ButtonLink';
import AutoCompleteForString from './AutoCompleteForString';

const BoxContainer = styled.div`
  position: sticky;
  top: 130px;
  margin-left: 20px;
  padding: 0px 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
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
  setFilterTag,
  setFilterStatus,
}: FilterDataProps) => {
  const TAG_DATA = [
    { tagId: 1, tagName: '축구/풋살', tagEmoji: '⚽️' },
    { tagId: 2, tagName: '농구', tagEmoji: '🏀' },
    { tagId: 3, tagName: '야구', tagEmoji: '⚾️' },
    { tagId: 4, tagName: '배구', tagEmoji: '🏐' },
    { tagId: 5, tagName: '복싱', tagEmoji: '🥊' },
    { tagId: 6, tagName: '탁구', tagEmoji: '🏓' },
    { tagId: 7, tagName: '배드민턴', tagEmoji: '🏸' },
    { tagId: 8, tagName: '테니스/스쿼시', tagEmoji: '🎾' },
    { tagId: 9, tagName: '태권도/유도', tagEmoji: '🥋' },
    { tagId: 10, tagName: '검도', tagEmoji: '⚔️' },
    { tagId: 11, tagName: '무술/주짓수', tagEmoji: '🥋' },
    { tagId: 12, tagName: '족구', tagEmoji: '⚽️' },
    { tagId: 13, tagName: '러닝', tagEmoji: '🏃' },
    { tagId: 14, tagName: '자전거', tagEmoji: '🚴' },
    { tagId: 15, tagName: '등산', tagEmoji: '🏔️' },
    { tagId: 16, tagName: '클라이밍', tagEmoji: '🧗‍♀️' },
    { tagId: 17, tagName: '수영', tagEmoji: '🏊‍♀️' },
    { tagId: 18, tagName: '골프', tagEmoji: '⛳️' },
    { tagId: 19, tagName: '요가/필라테스', tagEmoji: '🧘' },
    { tagId: 20, tagName: '헬스/크로스핏', tagEmoji: '🏋️' },
    { tagId: 21, tagName: '스케이트/인라인', tagEmoji: '⛸️' },
  ];

  return (
    <BoxContainer>
      <h3>필터 박스</h3>
      <div>운동태그</div>
      <AutoCompleteForString
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        data={TAG_DATA}
      />
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
      <div>
        <ButtonLink
          value="적용"
          to={`/recruits?tag="${filterTag}"&status="${filterStatus}"`}
        />
      </div>
    </BoxContainer>
  );
};

export default FilterBox;
