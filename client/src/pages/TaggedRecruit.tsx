import styled from 'styled-components';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import RecruitList from '../components/RecruitList';

const MainContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const TaggedRecruit = () => {
  const DATA: RecruitDataProps[] = [
    {
      recruitId: 1,
      title: 'TITLE1',
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
      ageGroup: [20, 30],
      sex: 'Both', // Male, Female, Both
      applicants: [
        { memberId: 2, nickname: 'bbb', heart: 80 },
        { memberId: 3, nickname: 'ccc', heart: 80 },
        { memberId: 4, nickname: 'ddd', heart: 80 },
      ],
      minRequire: 2,
      require: 5,
      date: '2023-01-02T16:18:48.908218',
      tagId: 1,
      tagName: '축구/풋볼',
      tagEmoji: '⚽️',
    },
  ];

  return (
    <MainContainer>
      <ul>
        {DATA.map((item) => (
          <RecruitList key={item.recruitId} data={item} />
        ))}
      </ul>
    </MainContainer>
  );
};

export default TaggedRecruit;
