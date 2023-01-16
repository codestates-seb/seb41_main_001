import styled from 'styled-components';
import RecruitDataProps from '../interfaces/RecruitDataProps';

const MainContainer = styled.main`
  width: 1200px;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const RecruitDetail = () => {
  const DATA: RecruitDataProps = {
    recruitId: 1,
    title:
      '글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기',
    body: 'BODY1',
    image: '',
    createdAt: '2023-01-02T16:18:48.908218',
    modifiedAt: '2023-01-02T16:18:48.908218',
    status: '모집중', // 모집중/모집완료/활동종료
    star: 0,
    views: 0,
    memberId: 1,
    nickname: 'aaa',
    like: 0,
    heart: 50, // number, 0
    ageGroup: [10, 20, 30, 40, 50, 60],
    sex: 'Both', // Male, Female, Both
    applicants: [
      { memberId: 2, nickname: 'bbb', heart: 80 },
      { memberId: 3, nickname: 'ccc', heart: 80 },
      { memberId: 4, nickname: 'ddd', heart: 80 },
      { memberId: 5, nickname: 'eee', heart: 80 },
      { memberId: 6, nickname: 'fff', heart: 80 },
      { memberId: 7, nickname: 'ggg', heart: 80 },
      { memberId: 8, nickname: 'hhh', heart: 80 },
      { memberId: 9, nickname: 'iii', heart: 80 },
    ],
    minRequire: 2,
    require: 5,
    date: '2023-01-02T16:18:48.908218',
    tagId: 1,
    tagName: '축구/풋볼',
    tagEmoji: '⚽️',
  };

  return <MainContainer>{DATA.title}</MainContainer>;
};
export default RecruitDetail;
