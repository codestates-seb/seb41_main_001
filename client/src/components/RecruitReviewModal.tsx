/* eslint-disable react/no-array-index-key */
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AutoCompleteForString from './AutoCompleteForString';
import Button from './Button';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.8);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.form`
  width: 800px;
  height: 400px;
  background-color: rgb(169, 169, 169);
  color: black;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div:first-child {
    text-align: center;
    h3 {
      margin: 0;
      margin-bottom: 7px;
    }
    margin-bottom: 20px;
  }
  > div:last-child {
    button {
      color: black;
      border-color: black;
      margin-top: 10px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  table {
    border-spacing: 5px 1rem;
    tr {
      td:nth-child(1) {
        width: 100px;
        white-space: nowrap;
      }
      td:nth-child(2) {
        width: 500px;
      }
      td {
        > div:last-child {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
    textarea,
    input {
      background-color: rgba(255, 255, 255, 0);
      border: none;
      width: 100%;
      height: 100%;
      font-size: 1rem;
      padding: 5px;
      border: none;
      outline: 1px solid gray;
      color: black;
      &:focus {
        border: none;
        outline: 1px solid black;
      }
    }
    textarea {
      height: 60px;
    }
  }
`;

const StarBox = styled.td`
  display: flex;
  align-items: center;
  button {
    color: #ffc107;
    font-size: 2rem;
    padding: 0;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    transition: 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      color: #ffd351;
      transition: 0.2s ease-in-out;
    }
  }
  span {
    margin-left: 10px;
  }
`;

interface ReviewDataProps {
  creatorId: number;
  creatorNickname: string;
  applies: { memberId: number; nickname: string; heart: number }[];
  setReviewModal: (value: boolean) => void;
  setData: any;
}

const RecruitReviewModal = ({
  creatorId,
  creatorNickname,
  applies,
  setReviewModal,
  setData,
}: ReviewDataProps) => {
  const { recruitId } = useParams();
  const [filterTag, setFilterTag] = useState<string>('');
  const [star, setStar] = useState<number>(5);
  const reviewBody = useRef('');
  const LOGIN_ID = localStorage.getItem('memberId');
  const APPLICANTS = applies.reduce(
    (r: { tagId: number; tagName: string }[], e) => [
      ...r,
      { tagId: e.memberId, tagName: e.nickname },
    ],
    [],
  );

  const handleReviewSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (reviewBody.current.trim()) {
      console.log(`POST /recruits/${recruitId}/reviews, {
            "body": ${reviewBody.current},
            "memberId": ${LOGIN_ID},
            "star": ${star},
            "worstMemberNickname": ${filterTag}
          }`);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/reviews`,
          {
            body: reviewBody.current,
            memberId: LOGIN_ID,
            star,
            worstMemberNickname: filterTag,
          },
          {
            headers: {
              Authorization: localStorage.getItem('AccessToken'),
              Refresh: localStorage.getItem('RefreshToken'),
            },
          },
        )
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
      setReviewModal(false);
    }
  };

  return (
    <ModalContainer>
      <h2>리뷰 작성</h2>
      <ModalBox onSubmit={handleReviewSubmit}>
        <div>
          <h3>⚠️ 주의사항 ⚠️</h3>
          <div>리뷰는 수정 및 삭제가 불가합니다</div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>별점</td>
              <StarBox>
                {[...Array(5)].map((e, i) => {
                  if (i + 1 <= star)
                    return (
                      <button
                        key={i + 1}
                        type="button"
                        value={i + 1}
                        onClick={() => setStar(i + 1)}
                      >
                        <i className="fa-solid fa-star" />
                      </button>
                    );
                  return (
                    <button
                      key={i + 1}
                      type="button"
                      value={i + 1}
                      onClick={() => setStar(i + 1)}
                    >
                      <i className="fa-regular fa-star" />
                    </button>
                  );
                })}
                <span>{`${star}점`}</span>
                <span>(1~5점까지 선택가능)</span>
              </StarBox>
            </tr>
            <tr>
              <td>후기</td>
              <td>
                <textarea
                  required
                  maxLength={300}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    reviewBody.current = e.target.value;
                  }}
                />
                <div>* 필수항목입니다</div>
              </td>
            </tr>
            <tr>
              <td>워스트 멤버</td>
              <td>
                <AutoCompleteForString
                  filterTag={filterTag}
                  setFilterTag={setFilterTag}
                  data={[
                    {
                      tagId: creatorId,
                      tagName: creatorNickname,
                      emoji: '👑',
                    },
                    ...APPLICANTS,
                  ]}
                />
                <div>* 옵션항목입니다</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button value="제출" type="submit" onClick={handleReviewSubmit} />
          <Button value="닫기" onClick={() => setReviewModal(false)} />
        </div>
      </ModalBox>
    </ModalContainer>
  );
};

export default RecruitReviewModal;
