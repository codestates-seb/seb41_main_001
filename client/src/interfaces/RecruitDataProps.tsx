export default interface RecruitDataProps {
  recruitId: number;
  title: string;
  body: string;
  image: string; // TODO: 게시물용 사진. 나중에 추가.
  createdAt: string;
  modifiedAt: string;
  require: number;
  minRequire: number;
  recruitStatus: '모집중' | '최소인원충족' | '모집완료' | '활동종료'; // 모집중/모집완료/최소인원충족/활동종료
  star: number;
  views: number;
  heartLimit: number;
  ageGroup: string[];
  memberId: number;
  nickname: string;
  authorHeart: number;
  sex: 'Male' | 'Female' | 'Both'; // Male, Female, Both
  date: string;
  lat: number;
  lon: number;
  location: string;
  applies: {
    memberId: number;
    nickname: string;
    heart: number;
    recruitId: number;
    filePath?: string;
  }[];
  recruitLikes: { memberId: number }[]; // TODO: 좋아요를 누른 회원.
  recruitTags: { tagId: number; tagName: string; emoji: string }[];
  reviews: {
    reviewId: number;
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
    star: number;
  }[]; // TODO: 리뷰는 수정, 삭제 불가
  recruitComments: {
    recruitCommentId: number;
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
    createdAt: string;
    modifiedAt: string;
    filePath?: string;
  }[];
  likes: number; // 좋아요 개수
  authorLocation: string;
  filePath?: string;
  applyCount?: number;
}
