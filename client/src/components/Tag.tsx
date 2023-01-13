import styled from 'styled-components';
// import { useState } from 'react';

const TagContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
  width: 131px;
  height: 50px;
  margin: 1px;

  input[type='checkbox'] {
    width: 17px;
    bottom: 10px;
    top: 5px;
    margin-top: 15px;
  }

  label {
    width: 100px;
    font-size: 10px;
    padding: 5px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface PropsType {
  name: string;
  emoji: string;
}

// const [bChecked, setChecked] = useState(false);
// const checkHandler: any({target}) => {
//   setChecked(!bChecked);
//   checkTagHandler(tag.id, target.checked);
// }

const Tag = ({ name, emoji }: PropsType) => (
  <TagContainer>
    <input type="checkbox" id={name} name="tags" value={name} />
    <label htmlFor={name}>
      {name}
      <br />
      {emoji}
    </label>
  </TagContainer>
);
export default Tag;
