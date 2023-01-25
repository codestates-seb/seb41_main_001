import styled from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBox from '../components/FilterBox';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import RecruitList from '../components/RecruitList';
import ButtonLink from '../components/ButtonLink';

const MainContainer = styled.main`
  width: 1100px;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  > div:first-child {
    padding: 20px 0px;
    h1 {
      margin: 10px 0px;
      font-size: 200%;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  aside {
    width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    > div:first-child {
      height: 100%;
      position: relative;
    }
    > div:last-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 0px;
      span {
        margin-bottom: 10px;
      }
      a {
        margin: 10px 0px;
      }
    }
  }
`;

const Recruits = () => {
  const DATA: RecruitDataProps[] = [
    {
      recruitId: 1,
      title:
        '글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기',
      body: 'BODY1',
      image: '',
      createdAt: '2023-01-02T16:18:48.908218',
      modifiedAt: '2023-01-02T16:18:48.908218',
      recruitStatus: '모집중', // 모집중/모집완료/활동종료
      star: 0,
      views: 0,
      memberId: 1,
      nickname: '글자수세기TEST글자수세기TEST글자',
      likes: 0,
      location: { latitude: 37.343336, longitude: 127.1233716 },
      heart: 50, // number, 0
      ageGroup: ['10', '20', '30', '40', '50', '60'],
      sex: 'Both', // Male, Female, Both
      applies: [
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
      recruitTags: [{ tagId: 1, tagName: '축구/풋볼', tagEmoji: '⚽️' }],
      recruitLikes: [
        {
          memberId: 1,
        },
      ],
      reviews: [
        {
          reviewId: 1,
          memberId: 1,
          nickname: '닉네임',
          heart: 50,
          body: '리뷰 내용',
          star: 5,
        },
      ],
      recruitComments: [
        {
          memberId: 1,
          nickname: '닉네임',
          heart: 50,
          body: '댓글 내용 작성',
          createdAt: '2023-01-18T17:35:10.171566',
          modifiedAt: '2023-01-18T17:35:10.165851',
        },
      ],
    },
    {
      recruitId: 2,
      title:
        '글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기',
      body: 'BODY1',
      image: '',
      createdAt: '2023-01-02T16:18:48.908218',
      modifiedAt: '2023-01-02T16:18:48.908218',
      recruitStatus: '최소인원충족', // 모집중/모집완료/활동종료
      star: 0,
      views: 0,
      memberId: 1,
      nickname: 'aaa',
      likes: 0,
      location: { latitude: 37.343336, longitude: 127.1233716 },
      heart: 20, // number, 0
      ageGroup: ['10', '20', '30'],
      sex: 'Male', // Male, Female, Both
      applies: [
        { memberId: 2, nickname: 'bbb', heart: 80 },
        { memberId: 3, nickname: 'ccc', heart: 80 },
      ],
      minRequire: 2,
      require: 5,
      date: '2023-01-02T16:18:48.908218',
      recruitTags: [{ tagId: 21, tagName: '스케이트/인라인', tagEmoji: '⛸️' }],
      recruitLikes: [
        {
          memberId: 1,
        },
      ],
      reviews: [
        {
          reviewId: 1,
          memberId: 1,
          nickname: '닉네임',
          heart: 50,
          body: '리뷰 내용',
          star: 5,
        },
      ],
      recruitComments: [
        {
          memberId: 1,
          nickname: '닉네임',
          heart: 50,
          body: '댓글 내용 작성',
          createdAt: '2023-01-18T17:35:10.171566',
          modifiedAt: '2023-01-18T17:35:10.165851',
        },
      ],
    },
    {
      recruitId: 3,
      title:
        '글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기',
      body: 'BODY1',
      image: '',
      createdAt: '2023-01-02T16:18:48.908218',
      modifiedAt: '2023-01-02T16:18:48.908218',
      recruitStatus: '모집완료', // 모집중/모집완료/활동종료
      star: 0,
      views: 0,
      memberId: 1,
      nickname: 'aaa',
      likes: 0,
      location: { latitude: 37.343336, longitude: 127.1233716 },
      heart: 20, // number, 0
      ageGroup: ['10', '20', '30', '40', '50', '60', '70'],
      sex: 'Female', // Male, Female, Both
      applies: [{ memberId: 2, nickname: 'bbb', heart: 80 }],
      minRequire: 2,
      require: 5,
      date: '2023-01-02T16:18:48.908218',
      recruitTags: [{ tagId: 11, tagName: '무술/주짓수', tagEmoji: '🥋' }],
      recruitLikes: [
        {
          memberId: 1,
        },
      ],
      reviews: [
        {
          reviewId: 1,
          memberId: 1,
          nickname: '닉네임',
          heart: 50,
          body: '리뷰 내용',
          star: 5,
        },
      ],
      recruitComments: [
        {
          memberId: 1,
          nickname: '닉네임',
          heart: 50,
          body: '댓글 내용 작성',
          createdAt: '2023-01-18T17:35:10.171566',
          modifiedAt: '2023-01-18T17:35:10.165851',
        },
      ],
    },
  ];
  const params = new URLSearchParams(useLocation().search);
  const [filterTag, setFilterTag] = useState<string>(
    params.get('tag')?.replaceAll('"', '') ?? '',
  );
  const [filterStatus, setFilterStatus] = useState<string>(
    params.get('status')?.replaceAll('"', '') ?? '',
  );
  // const [filterRegion, setFilterRegion] = useState('');

  return (
    <MainContainer>
      <div>
        <h1>모집게시판</h1>
        <span>동네 이웃과 함께 운동을 즐겨보세요!</span>
        <ul>
          {DATA.map((item) => (
            <RecruitList key={item.recruitId} data={item} />
          ))}
        </ul>
      </div>
      <aside>
        <div>
          <FilterBox
            filterTag={filterTag}
            filterStatus={filterStatus}
            setFilterTag={setFilterTag}
            setFilterStatus={setFilterStatus}
            // setFilterRegion={setFilterRegion}
          />
        </div>
        <div>
          <span>찾으시는 운동이 없으신가요?</span>
          <span>직접 이웃을 모아보세요!</span>
          <ButtonLink value="모집글 작성하기" to="/recruit/new" />
        </div>
      </aside>
    </MainContainer>
  );
};

export default Recruits;
