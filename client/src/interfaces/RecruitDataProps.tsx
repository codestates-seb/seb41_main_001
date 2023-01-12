export default interface RecruitDataProps {
  recruitId: number;
  title: string;
  body: string;
  image: string;
  createdAt: string;
  modifiedAt: string;
  status: '모집중' | '모집완료' | '활동종료'; // 모집중/모집완료/활동종료
  star: number;
  views: number;
  memberId: number;
  nickname: string;
  like: number;
  heart: number; // number, 0
  ageGroup: number[];
  sex: 'Male' | 'Female' | 'Both'; // Male, Female, Both
  applicants: { memberId: number; nickname: string; heart: number }[];
  minRequire: number;
  require: number;
  date: string;
  tagId: number;
  tagName: string;
  tagEmoji: string;
}
