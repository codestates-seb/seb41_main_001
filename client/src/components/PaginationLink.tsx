import styled from 'styled-components';

const PageContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
  width: 100%;

  #pagination-numbers {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PageNum = styled.button<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? `var(--neon-blue)` : `rgba(1, 1, 1, 0)`};
  color: ${(props) => (props.isActive ? `white` : `var(--neon-blue)`)};
  padding: 8px 15px;
  border-radius: 7px;
  border: 1px solid rgba(1, 1, 1, 0);
  font-size: 16px;
  margin: 2px;
  &:hover {
    border: 1px solid gray;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
`;

const PageButton = styled.button`
  background-color: rgba(1, 1, 1, 0);
  color: var(--neon-blue);
  padding: 8px 15px;
  border-radius: 7px;
  border: 1px solid rgba(1, 1, 1, 0);
  font-size: 16px;
  margin: 2px;
  transition: 0.2s ease-in-out;
  &:not(:disabled)&:hover {
    border: 1px solid gray;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  &:disabled {
    background-color: rbga(1, 1, 1, 0);
    color: gray;
    transition: 0.2s ease-in-out;
  }
`;

interface PaginationProps {
  pageCount: number;
  active_page: number;
  setPage: (value: number) => void;
}

const PaginationLink = ({
  pageCount,
  active_page,
  setPage,
}: PaginationProps) => {
  const handlePrevNextBtn = (e: any) => {
    if (e.target.textContent === ' Previous') {
      setPage(active_page - 1);
    }
    if (e.target.textContent === 'Next ') {
      setPage(active_page + 1);
    }
  };

  return (
    <PageContainer>
      <PageButton
        id="prev-button"
        disabled={active_page === 1}
        onClick={handlePrevNextBtn}
      >
        <i className="fa-solid fa-chevron-left" /> Previous
      </PageButton>
      <div id="pagination-numbers">
        {[...Array(pageCount)].map((e, i) => (
          <PageNum
            isActive={i + 1 === active_page}
            key={`Page ${i + 1}`}
            page-index={i + 1}
            onClick={(event: any) => setPage(Number(event.target.textContent))}
          >
            {i + 1}
          </PageNum>
        ))}
      </div>
      <PageButton
        id="next-button"
        disabled={active_page === pageCount}
        onClick={handlePrevNextBtn}
      >
        Next <i className="fa-solid fa-chevron-right" />
      </PageButton>
    </PageContainer>
  );
};

export default PaginationLink;
