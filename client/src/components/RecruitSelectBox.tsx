import styled from 'styled-components';

const SelectBox = styled.div``;

const RecruitSelectBox = () => <SelectBox />;

export default RecruitSelectBox;

// 글쓴 사람이 할 수 있는 것. 모집글 수정, 삭제, 끌올
// 이 외 사람이 할 수 있는 것. 모집글 신청/취소.(applies에 LOGIN_ID있다면 취소버튼으로 노출. 아니면 신청버튼으로 노출)
//                           모집글 좋아요(recruitLikes에 LOGIN_ID가 있다면 빨간 하트, 없으면 빈 하트로 노출).
// 모임에 참여한 사람만 할 수 있는 것. 최소인원충족모집글 상태 변경(모임시간이 지났다면 활동종료버튼활성화 => 누르면 리뷰작성버튼 노출), 모집글 리뷰 작성.
