export default interface RecruitLikeProps {
  applyCount: number;
  date: string;
  memberId: number;
  recruitId: number;
  recruitTags: { tagId: number; tagName: string; emoji: string }[];
  require: number;
  title: string;
}
