import styled from 'styled-components';

const ItemWrapper = styled.div`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  color: white;
  width: 30rem;
  border-radius: 10px;
  padding: 1.2rem;
  > div:first-child {
    text-shadow: white 0 0 0.3rem;
  }
  > div {
    margin: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    > div {
      display: flex;
      flex-direction: row;
      font-size: 0.8rem;
    }
  }
  span {
    margin-right: 0.6rem;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  i {
    font-size: 24px;
    margin-left: 40px;
  }
`;

interface Item {
  title: string;
  quota: string;
  dueDate: string;
  tags: string[];
}

const MyRecruitItem = ({ title, quota, dueDate, tags }: Item) => (
  <div>
    <ItemContainer>
      <ItemWrapper>
        <div>{title}</div>
        <div>
          <div>
            <span>{quota}</span>
            <span>{dueDate}</span>
          </div>
          <div>{tags[0]}</div>
        </div>
      </ItemWrapper>
      <div>
        <i className="fa-solid fa-xmark" />
      </div>
    </ItemContainer>
  </div>
);

export default MyRecruitItem;
