import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FreeBoardList from '../components/FreeBoardList';
import FreeDataProps from '../interfaces/FreeDataProps';

const FBLContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const BoardList = styled.div`
  width: 35rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  ul {
    a {
      text-decoration: none;
      color: white;
    }
  }
`;

const FreeBoards = () => {
  const [data, setData] = useState<FreeDataProps[]>([]);
  const { freeId } = useParams();

  useEffect(() => {
    axios
      .get('/freeboards?category=all&page=1&size=10&sort=latest&tag=all')
      .then((res) => {
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FBLContainer>
      <BoardList>
        <ul>
          <Link to={`/freeboard/${freeId}`}>
            {data.map((el) => (
              <FreeBoardList data={el} key={el.freeId} />
            ))}
          </Link>
        </ul>
      </BoardList>
    </FBLContainer>
  );
};

export default FreeBoards;
