import styled from 'styled-components';

const MiniTagContainer = styled.div`
  margin: 0 5px 5px 0;
  display: flex;
  flex-direction: row;
`;

interface Tags {
  tagName: string;
  // 추가?
}

const MiniTag = ({ tagName }: Tags) => (
  <MiniTagContainer>
    <span>#</span>
    {tagName}
  </MiniTagContainer>
);

export default MiniTag;
