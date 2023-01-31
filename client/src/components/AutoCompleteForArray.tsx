import styled from 'styled-components';
import { useWatch } from 'react-hook-form';

const AutoCompleteContainer = styled.div`
  display: flex;
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    > li {
      white-space: nowrap;
      margin-right: 10px;
      border: 1px solid white;
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
      > button {
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
    }
  }
`;

const AutoCompleteBox = styled.div`
  position: relative;
  width: 100%;
  > input {
    width: 100%;
    height: 35px;
    padding: 5px;
    font-size: 16px;
    border: none;
    outline: 1px solid rgb(120, 120, 120);
    background-color: rgba(255, 255, 255, 0);
    color: white;
    &:focus {
      outline: 1px solid rgb(170, 170, 170);
    }
  }
  &:focus-within {
    > div {
      display: block;
    }
  }
`;

const DropBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  display: none;
  width: 100%;
  max-height: 200px;
  overflow: scroll;
  z-index: 10;
  &::-webkit-scrollbar {
    display: none;
  }
  > button {
    width: 100%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    margin-top: 2px;
    background-color: rgb(197, 197, 197);
    transition: 0.2s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      background-color: rgb(245, 245, 245);
      transition: 0.2s ease-in-out;
    }
  }
`;

interface DropBoxProps {
  data: { tagId: number; tagName: string; emoji: string }[];
  fields: { tagId: number; tagName: string; emoji: string; id?: string }[];
  control: any;
  append: any;
  tagLength: number;
}

const TagSearchDropBox = ({
  data,
  control,
  append,
  fields,
  tagLength,
}: DropBoxProps) => {
  const tagSearch = useWatch({ control, name: 'tagSearch', defaultValue: '' });
  return (
    <DropBox>
      {data
        .filter((el) => el.tagName.includes(tagSearch))
        .map((item) => (
          <button
            key={item.tagId}
            type="button"
            onClick={() => {
              // 이미 등록된 태그는 추가 불가
              if (
                !fields
                  .reduce((r: number[], e) => [...r, e.tagId], [])
                  .includes(item.tagId)
              ) {
                append({
                  tagId: item.tagId,
                  tagName: item.tagName,
                  emoji: item.emoji,
                });
              }
            }}
            // 태그 어레이의 길이를 여기서 제한
            disabled={fields.length === tagLength}
          >
            {item.emoji ? `${item.emoji} ${item.tagName}` : `${item.tagName}`}
          </button>
        ))}
    </DropBox>
  );
};

interface AutoCompleteForArrayProps {
  fields: { tagId: number; tagName: string; emoji: string; id: string }[];
  append: any;
  remove: any;
  register: any;
  control: any;
  data: { tagId: number; tagName: string; emoji: string }[];
  tagLength: number;
}

const AutoCompleteForArray = ({
  fields,
  append,
  remove,
  register,
  control,
  data,
  tagLength,
}: AutoCompleteForArrayProps) => (
  <AutoCompleteContainer>
    <ul>
      {fields.map((item, index) => (
        <li key={item.id}>
          {`${item.emoji} ${item.tagName}`}
          <button type="button" onClick={() => remove(index)}>
            <i className="fa-solid fa-xmark" />
          </button>
        </li>
      ))}
    </ul>
    <AutoCompleteBox>
      <input
        type="text"
        defaultValue=""
        autoComplete="off"
        {...register('tagSearch')}
      />
      <TagSearchDropBox
        control={control}
        data={data}
        append={append}
        fields={fields}
        tagLength={tagLength}
      />
    </AutoCompleteBox>
  </AutoCompleteContainer>
);

export default AutoCompleteForArray;
