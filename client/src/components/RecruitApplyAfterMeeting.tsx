import styled from 'styled-components';

const SelectBox = styled.div``;

const RecruitApplyAfterMeeting = () => <SelectBox />;

export default RecruitApplyAfterMeeting;

// 이 외 사람이 할 수 있는 것. 모집글 신청/취소.(applies에 LOGIN_ID있다면 취소버튼으로 노출. 아니면 신청버튼으로 노출)
// 모임에 참여한 사람만 할 수 있는 것. 최소인원충족모집글 상태 변경(모임시간이 지났다면 활동종료버튼활성화 => 누르면 리뷰작성버튼 노출), 모집글 리뷰 작성.
// 모임시간 전 => 모집완료전 : 모집글 신청/취소 모집완료후: 신청 및 취소 불가능
// 모임시간 후 => 모임이 성사X: 모임시간이 지났지만 최소인원충족에 실패했다면 "활동취소" 성사O :
