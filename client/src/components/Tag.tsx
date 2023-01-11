import styled from 'styled-components';

const TagContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
  width: 140px;
  margin: 5px;
  padding: 5px;

  input {
    width: 20px;
    height: 20px;
  }

  label {
    width: 110px;
    height: 20px;
    font-size: 13px;
  }
`;

interface propsType {
  name: string;
  emoji: string;
}

const Tag = ({ name, emoji }: propsType) => {
  return (
    <TagContainer>
      <input type="checkbox" id={name} name="tags" value={name} />
      <label htmlFor={name}>
        {name}
        {emoji}
      </label>
    </TagContainer>
  );
};
export default Tag;
