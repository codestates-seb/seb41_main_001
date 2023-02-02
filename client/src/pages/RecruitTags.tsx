import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TagCounter from '../components/TagCounter';
import PaginationLink from '../components/PaginationLink';

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
  > div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0px;
    select {
      font-size: 16px;
      background-color: var(--gray);
      padding: 5px;
      color: white;
    }
  }
`;

const TagsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
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
  const [sorting, setSorting] = useState('count');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>();
  const limit = 16;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags/recruits`)
      .then((res) => {
        setTagData(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / limit));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <MainContainer>
      <div>
        <h1>모집게시판 태그 모음</h1>
        <span>게시물을 태그별로 한눈에 확인하세요!</span>
      </div>
      <div>
        <select
          onChange={(e) => setSorting(e.target.value)}
          defaultValue="count"
        >
          <option value="abc">가나다순</option>
          <option value="count">게시글수순</option>
        </select>
      </div>
      <TagsContainer>
        {tagData &&
          tagData
            .sort((a, b) => {
              if (sorting === 'abc') {
                if (a.tagName < b.tagName) return -1;
                if (a.tagName === b.tagName) return 0;
                return 1;
              }
              return b.recruitCount - a.recruitCount;
            })
            .map((el: any) => (
              <TagCounter
                key={el.tagId}
                board="recruits"
                emoji={el.emoji}
                tagName={el.tagName}
                tagCount={el.recruitCount}
              />
            ))
            .slice((page - 1) * limit, page * limit)}
      </TagsContainer>
      <PaginationLink
        pageCount={pageCount || 0}
        active_page={page}
        setPage={setPage}
      />
    </MainContainer>
  );
};

export default RecruitTags;
