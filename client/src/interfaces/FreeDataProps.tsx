export default interface FreeDataProps {
  freeId: number;
  category: string;
  freeBody: string;
  freeTitle: string;
  createdAt: string;
  modifiedAt: string;
  likes: number;
  views: number;
  memberId: number;
  freeLikes: {
    memberId: number;
  }[];
  freeTags: { tagId: number; tagName: string }[];
  tagId: number;
  tagName: string;
  freeComments: {
    commentId: number;
    freeId: number;
    commentBody: string;
    createdAt: string;
    modifiedAt: string;
  }[];
}
