export default interface FreeDataProps {
  freeId: number;
  category: string;
  freeBody: string;
  freeTitle: string;
  createdAt: string;
  modifiedAt: string;
  freeLikes: [];
  location: string;
  views: number;
  memberId: number;
  nickname: string;
  authorHeart: number;
  // freeLikes: {
  //   memberId: number;
  // }[];
  freeTags: { tagId: number; tagName: string }[];
  tagId: number;
  tagName: string;
  freeComments: {
    commentId: number;
    freeId: number;
    commentBody: string;
    createdAt: string;
    modifiedAt: string;
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
  }[];
}
