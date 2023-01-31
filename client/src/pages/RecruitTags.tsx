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

interface RecruitTagsProps {
  tagId: number;
  categoryExercise: boolean;
  tagName: string;
  emoji: string;
  recruitCount: number;
  freeCount: number;
}

const RecruitTags = () => {
  const [tagData, setTagData] = useState<RecruitTagsProps[]>();
  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags/recruits?page=1&size=50`)
      .then((res) => {
        setTagData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainContainer>
      <div>
        <h1>모집게시판 태그 모음</h1>
        <span>게시물을 태그별로 한눈에 확인하세요!</span>
      </div>
      <TagsContainer>
        {tagData &&
          tagData.map((el: any) => (
            <TagCounter
              key={el.tagId}
              board="recruits"
              emoji={el.emoji}
              tagName={el.tagName}
              tagCount={el.recruitCount}
            />
          ))}
      </TagsContainer>
    </MainContainer>
  );
};

export default RecruitTags;
