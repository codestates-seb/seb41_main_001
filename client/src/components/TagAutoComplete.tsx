import styled from 'styled-components';
import { useState } from 'react';

const FilterTagBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Tag = styled.div`
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  height: 35px;
  white-space: nowrap;
  margin-right: 10px;
  &:hover {
    cursor: default;
  }
  button {
    display: flex;
    align-items: center;
    margin-left: 7px;
    border: none;
    padding: 0px 3px;
    background-color: rgba(255, 255, 255, 0);
    transition: 0.2s ease-in-out;
    color: #303030;
    &:hover {
      cursor: pointer;
      outline: 1px solid #303030;
      transition: 0.2s ease-in-out;
    }
  }
`;

const AutoCompleteBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  input {
    width: 100%;
    height: 35px;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(1, 1, 1, 0);
    color: white;
    font-size: 100%;
    &:focus {
      border-bottom: 1px solid white;
      outline: none;
    }
  }
  &:focus-within {
    div {
      display: block;
    }
  }
`;

const DropDownBox = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
  display: flex;
  flex-direction: column;
  display: none;
  height: 250px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  button {
    width: 100%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    margin-top: 2px;
    background-color: rgb(197, 197, 197);
    transition: 0.2s ease-in-out;
    font-size: 100%;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      background-color: rgb(245, 245, 245);
      transition: 0.2s ease-in-out;
    }
  }
`;

interface FilterTagProps {
  filterTag: string;
  setFilterTag: React.Dispatch<React.SetStateAction<string>>;
}

const TagAutoComplete = ({ filterTag, setFilterTag }: FilterTagProps) => {
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

  const SELECTED_TAG = TAG_DATA.filter((el) => `${el.tagName}` === filterTag);
  const [inputTag, setInputTag] = useState('');

  return (
    <FilterTagBox>
      {SELECTED_TAG.map((t) => (
        <Tag key={t.tagId}>
          {`${t.tagEmoji} ${t.tagName}`}
          <button type="button" onClick={() => setFilterTag('')}>
            <i className="fa-solid fa-xmark" />
          </button>
        </Tag>
      ))}
      <AutoCompleteBox>
        <input value={inputTag} onChange={(e) => setInputTag(e.target.value)} />
        <DropDownBox>
          {TAG_DATA.filter((el) => el.tagName.includes(inputTag)).map((el) => (
            <button
              key={el.tagId}
              type="button"
              onClick={() => setFilterTag(el.tagName)}
            >
              {`${el.tagEmoji} ${el.tagName}`}
            </button>
          ))}
        </DropDownBox>
      </AutoCompleteBox>
    </FilterTagBox>
  );
};

export default TagAutoComplete;
