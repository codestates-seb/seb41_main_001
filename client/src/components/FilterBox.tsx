import styled from 'styled-components';
import FilterDataProps from '../interfaces/FilterDataProps';
import ButtonLink from './ButtonLink';
import TagAutoComplete from './TagAutoComplete';

const BoxContainer = styled.div`
  position: sticky;
  top: 130px;
  margin-left: 20px;
  padding: 0px 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
<<<<<<< HEAD
=======
  h3 {
    font-size: 120%;
  }

  > div:nth-child(3) {
    margin-bottom: 50px;
  }
>>>>>>> a6f303a12e9148453b9bdec46cab22eaf18fef94

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
<<<<<<< HEAD
    font-size: 16px;
=======
    font-size: 100%;
>>>>>>> a6f303a12e9148453b9bdec46cab22eaf18fef94
    background-color: var(--gray);
    color: white;
  }
`;

const FilterBox = ({
  filterTag,
  filterStatus,
  setFilterTag,
  setFilterStatus,
}: FilterDataProps) => (
  <BoxContainer>
    <h3>필터 박스</h3>
    <div>운동태그</div>
    <TagAutoComplete filterTag={filterTag} setFilterTag={setFilterTag} />
    <div>모집상태</div>
    <SelectBox>
      <select
        onChange={(e) => setFilterStatus(e.target.value)}
        value={filterStatus}
      >
        <option value="">----- 모집상태 -----</option>
        <option value="모집중">모집중</option>
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

export default FilterBox;
