import styled from 'styled-components';
import { useState } from 'react';

const FilterTagBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const Tag = styled.div`
  padding: 5px;
  border: none;
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
  height: 180px;
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
  selectedTag: { tagId: number; tagName: string; tagEmoji: string }[];
  setSelectedTag: (
    value: {
      tagId: number;
      tagName: string;
      tagEmoji: string;
    }[],
  ) => void;
  tagLimit: number;
  data: { tagId: number; tagName: string; tagEmoji: string }[];
}

const AutoCompleteForArray = ({
  selectedTag,
  setSelectedTag,
  tagLimit,
  data,
}: FilterTagProps) => {
  const [inputTag, setInputTag] = useState('');
  const handleAddTag = (t: {
    tagId: number;
    tagName: string;
    tagEmoji: string;
  }) => {
    if (selectedTag.length < tagLimit) {
      setSelectedTag([
        ...selectedTag,
        {
          tagId: t.tagId,
          tagName: t.tagName,
          tagEmoji: `${t.tagEmoji ? t.tagEmoji : ''}`,
        },
      ]);
    }
    console.log(selectedTag);
  };

  return (
    <FilterTagBox>
      {selectedTag.map((t) => (
        <Tag key={t.tagId}>
          {t.tagEmoji ? `${t.tagEmoji} ${t.tagName}` : `${t.tagName}`}
          <button
            type="button"
            onClick={() =>
              setSelectedTag(selectedTag.filter((el) => el.tagId !== t.tagId))
            }
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </Tag>
      ))}
      <AutoCompleteBox>
        <input value={inputTag} onChange={(e) => setInputTag(e.target.value)} />
        <DropDownBox>
          {data
            .filter((el) => el.tagName.includes(inputTag))
            .map((el) => (
              <button
                key={el.tagId}
                type="button"
                onClick={() => handleAddTag(el)}
              >
                {el.tagEmoji ? `${el.tagEmoji} ${el.tagName}` : `${el.tagName}`}
              </button>
            ))}
        </DropDownBox>
      </AutoCompleteBox>
    </FilterTagBox>
  );
};

export default AutoCompleteForArray;
