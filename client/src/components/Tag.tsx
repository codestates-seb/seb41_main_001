import styled from 'styled-components';

const TagContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  border-radius: 0.3rem;
  /* width: 6.55rem; */
  width: 7rem;
  height: 3rem;
  margin: 0.05rem;

  input {
    bottom: 0.5rem;
    margin-top: 0.75rem;
    top: 0.25rem;
    flex: 1;
  }

  label {
    /* width: 6rem; */
    font-size: 10px;
    height: auto;
    flex: 8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

interface PropsType {
  name: string;
  emoji: string;
  register: any;
  disabled: boolean;
}

const Tag = ({ disabled, register, name, emoji }: PropsType) => (
  <TagContainer>
    <input
      disabled={disabled}
      type="checkbox"
      // id={name}
      // name="tags"
      name={name}
      value={name}
      {...register('tags', { required: true })}
    />
    <label htmlFor={name}>
      {name}
      <br />
      {emoji}
    </label>
  </TagContainer>
);
export default Tag;
