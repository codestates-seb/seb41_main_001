import styled from 'styled-components';

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
    margin-top: 15px;
    /* bottom:10px; */
    top: 5px;
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
  onChange: object;
  register: any;
}

const Tag = ({ onChange, register, name, emoji }: PropsType) => (
  <TagContainer>
    <input
      type="checkbox"
      id={name}
      name="tags"
      value={name}
      onChange={onChange}
      {...register('tags', { required: '태그를 선택하세요' })}
    />
    <label htmlFor={name}>
      {name}
      <br />
      {emoji}
    </label>
  </TagContainer>
);
export default Tag;
