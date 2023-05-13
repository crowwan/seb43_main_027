import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryTag from '../../components/common/CategoryTag';
import { StarTwoTone } from '@ant-design/icons';
import { Post } from '../../data/dummyPostList';

const PostItem = ({
  postId,
  title,
  tag,
  createdAt,
  updatedAt,
  view,
  userName,
  memberStatus,
  likeCount,
  commentCount
}: Post)  => {

  const [ isMarked, setMarked ] = useState(false);

  const handleMark = () => {
    setMarked((prev) => !prev)
  }

  // 필터링 데이터패칭 해서 받아와야됨, 페이지네이션,글자수 제한 ...
  // 날짜 분, 시, 일, 년전
  // 북마크,내가쓴글,팔로우 로그인상태만 허용

  const dateStr = createdAt;
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledFlexRow>
          <StyledTitle>
            {title}
          </StyledTitle>
          <CategoryTag index={0} categoryName={tag} />
        </StyledFlexRow>
        <StyledFlexRow>
          <StyledInfo>
            <StyledSpan>작성자:</StyledSpan>
            {userName}
            <StyledSpan>작성일:</StyledSpan>
            {formattedDate}
            <StyledSpan>추천 수:</StyledSpan>
            {likeCount}
            <StyledSpan>조회 수:</StyledSpan>
            {view}
          </StyledInfo>
        </StyledFlexRow>
      </StyledContent>
      <StyledFlexRow>
      <StyledInfo>
        <StyledSpan>댓글:</StyledSpan>
        {commentCount}
        <StarTwoTone
          onClick={handleMark}
          twoToneColor={ isMarked ? '#13A8A8'  : '#b4b4b4' }
          style={{ fontSize: '20px' }}
        />
      </StyledInfo>
      </StyledFlexRow>
    </StyledWrapper>
  );
};

export default PostItem;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 1px solid green;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }
  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-right: 20px;
  word-break: keep-all;
  overflow-wrap: break-word;
  cursor: pointer;
  &:hover {
    color: var(--cyan-light-800);
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;
  color: var(--default-text-color);
`;

const StyledSpan = styled.span`
  font-weight: 600;
  color: var(--sub-text-color);
`;