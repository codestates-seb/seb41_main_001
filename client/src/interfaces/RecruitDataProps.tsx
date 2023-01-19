export default interface RecruitDataProps {
  recruitId: number;
  title: string;
  body: string;
  image: string; // TODO: 게시물용 사진. 나중에 추가.
  createdAt: string;
  modifiedAt: string;
  require: number;
  minRequire: number;
  recruitStatus: string; // 모집중/모집완료/활동종료
  star: number;
  views: number;
  heart: number;
  ageGroup: string[];
  memberId: number;
  nickname: string;
  sex: 'Male' | 'Female' | 'Both'; // Male, Female, Both
  date: string;
  location: { latitude: number; longitude: number }; // TODO: 지금은 string이지만 후에 객체로 변환 {latitude: number; longitude: number}
  applies: { memberId: number; nickname: string; heart: number }[]; // TODO: 후에 이미지도 추가될 듯
  recruitLikes: { memberId: number }[]; // TODO: 좋아요를 누른 회원. 후에 이미지도 추가될 듯
  recruitTags: { tagId: number; tagName: string; tagEmoji: string }[]; // TODO: 후에 tagEmoji도 추가될 듯
  reviews: {
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
    star: number;
  }[]; // TODO: 리뷰는 수정, 삭제 불가
  recruitComments: {
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
    createdAt: string;
    modifiedAt: string;
  }[];
  likes: number; // 좋아요 개수
}
