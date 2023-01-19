import styled from 'styled-components';

const TagContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  border-radius: 0.3rem;
  width: 6.55rem;
  height: 2.5rem;
  margin: 0.05rem;

  input[type='checkbox'] {
    width: 0.8rem;
    bottom: 0.5rem;
    margin-top: 0.75rem;
    /* bottom:10px; */
    top: 0.25rem;
  }

  label {
    width: 5rem;
    font-size: 10px;
    padding: 0.25rem;
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
