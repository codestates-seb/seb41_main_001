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
  authorLocation: string;
  filePath: string;
  // freeLikes: {
  //   memberId: number;
  // }[];
  freeTags: { tagId: number; tagName: string }[];
  tagId: number;
  tagName: string;
  freeComments: {
    freeCommentId: number;
    freeId: number;
    commentBody: string;
    createdAt: string;
    modifiedAt: string;
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
    filePath: string;
  }[];
  freeImages: {
    freeImageId: number;
    freeId: number;
    filePath: string;
  }[];
}
