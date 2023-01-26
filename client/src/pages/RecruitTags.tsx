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

const RecruitTags = () => {
  const TAG_DATA = [
    { tagId: 1, tagName: '축구/풋살', tagEmoji: '⚽️', tagCount: 1 },
    { tagId: 2, tagName: '농구', tagEmoji: '🏀', tagCount: 1 },
    { tagId: 3, tagName: '야구', tagEmoji: '⚾️', tagCount: 1 },
    { tagId: 4, tagName: '배구', tagEmoji: '🏐', tagCount: 1 },
    { tagId: 5, tagName: '복싱', tagEmoji: '🥊', tagCount: 1 },
    { tagId: 6, tagName: '탁구', tagEmoji: '🏓', tagCount: 1 },
    { tagId: 7, tagName: '배드민턴', tagEmoji: '🏸', tagCount: 1 },
    { tagId: 8, tagName: '테니스/스쿼시', tagEmoji: '🎾', tagCount: 1 },
    { tagId: 9, tagName: '태권도/유도', tagEmoji: '🥋', tagCount: 1 },
    { tagId: 10, tagName: '검도', tagEmoji: '⚔️', tagCount: 1 },
    { tagId: 11, tagName: '무술/주짓수', tagEmoji: '🥋', tagCount: 1 },
    { tagId: 12, tagName: '족구', tagEmoji: '⚽️', tagCount: 1 },
    { tagId: 13, tagName: '러닝', tagEmoji: '🏃', tagCount: 1 },
    { tagId: 14, tagName: '자전거', tagEmoji: '🚴', tagCount: 1 },
    { tagId: 15, tagName: '등산', tagEmoji: '🏔️', tagCount: 1 },
    { tagId: 16, tagName: '클라이밍', tagEmoji: '🧗‍♀️', tagCount: 1 },
    { tagId: 17, tagName: '수영', tagEmoji: '🏊‍♀️', tagCount: 1 },
    { tagId: 18, tagName: '골프', tagEmoji: '⛳️', tagCount: 1 },
    { tagId: 19, tagName: '요가/필라테스', tagEmoji: '🧘', tagCount: 1 },
    { tagId: 20, tagName: '헬스/크로스핏', tagEmoji: '🏋️', tagCount: 1 },
    { tagId: 21, tagName: '스케이트/인라인', tagEmoji: '⛸️', tagCount: 1 },
  ];

  return (
    <MainContainer>
      <div>
        <h1>모집게시판 태그 모음</h1>
        <span>게시물을 태그별로 한눈에 확인하세요!</span>
      </div>
      <TagsContainer>
        {TAG_DATA.map((el) => (
          <TagCounter
            key={el.tagId}
            board="recruits"
            tagEmoji={el.tagEmoji}
            tagName={el.tagName}
            tagCount={el.tagCount}
          />
        ))}
      </TagsContainer>
    </MainContainer>
  );
};

export default RecruitTags;
