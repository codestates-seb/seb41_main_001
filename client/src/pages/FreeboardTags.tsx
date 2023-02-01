import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TagCounter from '../components/TagCounter';

const MainContainer = styled.main`
  width: 70%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  h1 {
    margin: 30px 0px 10px 0px;
    font-size: 200%;
  }
`;

const TagsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin: 20px;
`;

interface FreeTagsProps {
  tagId: number;
  categoryExercise: boolean;
  tagName: string;
  emoji: string;
  recruitCount: number;
  freeCount: number;
}

const FreeboardTags = () => {
  const [tagData, setTagData] = useState<FreeTagsProps[]>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags/freeboards?page=1&size=10`)
      .then((res) => {
        setTagData(res.data.data);
        console.log(tagData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainContainer>
      <div>
        <h1>자유게시판 태그 모음</h1>
        <span>게시물을 태그별로 한눈에 확인하세요!</span>
      </div>
      <TagsContainer>
        {tagData &&
          tagData.map((el) => (
            <TagCounter
              key={el.tagId}
              board="freeboards"
              emoji={el.emoji}
              tagName={el.tagName}
              tagCount={el.freeCount}
            />
          ))}
      </TagsContainer>
    </MainContainer>
  );
};

export default FreeboardTags;
