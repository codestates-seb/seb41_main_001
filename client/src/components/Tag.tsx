import styled from 'styled-components';

const TagContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
  width: 140px;
  margin: 5px;

  input[type="checkbox"] {
    width: 17px;
    border: 10px solid red;
    bottom: 10px;
    position:relative;
    top:5px;
  }

  label {
    width: 107px;
    font-size: 13px;
    padding: 5px;
    height:100%;
  }
`;

interface PropsType {
  name: string;
  emoji: string;
}

const Tag = ({ name, emoji }: PropsType) => (
  <TagContainer>
    <input type="checkbox" id={name} name="tags" value={name} />
    <label htmlFor={name}>
      {name}
      {emoji}
    </label>
  </TagContainer>
);
export default Tag;
