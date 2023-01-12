import styled from 'styled-components';

const ItemWrapper = styled.div`
  border: 1px solid white;
  display:flex;
  flex-direction: column;
  color: white;
  width: 600px;
  border-radius:10px;
  padding: 15px;
  > div:first-child {
    text-shadow: white 0 0 5px;
  }
  > div {
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    > div {
      display: flex;
      flex-direction: row;
      font-size: 14px;
    }
  }
  span {
    margin-right: 20px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  i {
    font-size:24px;
    margin-left: 40px;
  }
`;

interface Item {
  title: string;
  quota: string;
  dueDate: string;
  tags: string[];
}

const MyRecruitItem = ({
  title, quota, dueDate, tags,
}: Item) => (
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
