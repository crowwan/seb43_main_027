import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import convertTag from '../../utils/convertTag';
import { elapsedText } from '../../utils/elapsedText';
import CategoryTag from '../common/CategoryTag';
import { type GamePagePostType } from '../../types/dataTypes';
import { StarTwoTone } from '@ant-design/icons';
import PATH_URL from '../../constants/pathUrl';
import { postOptionTags } from '../../data/postOptionTags';
import { Tooltip } from 'antd';

const PostItem = ({
  postId,
  userName,
  title,
  postTag,
  views,
  commentCount,
  likeCount,
  createdAt,
  isPostIdIncluded
}: GamePagePostType) => {

  const { gameId } = useParams();

  const filteredTitle = title.length >= 20
  ? title.slice(0, 20) + '...'
  : title;

  const renderTitle = title.length >= 20 ? (
    <Tooltip placement="bottom" title={title}>
      <StyledTitle>{filteredTitle}</StyledTitle>
    </Tooltip>
  ) : (
    <StyledTitle>{title}</StyledTitle>
  );

  const tagName = convertTag.asKR(postTag);
  const tagId = postOptionTags.findIndex((option) => option.value === tagName);
  const formattedDate =
    typeof createdAt === 'string' ? elapsedText(new Date(createdAt)) : '';

  return (
    <Link to={`${PATH_URL.GAME}${gameId}/posts/${postId}`}>
      <StyledWrapper>
        <StyledContent>
          <StyledFlexRow>
            {renderTitle}
            <CategoryTag categoryId={tagId} categoryName={tagName} />
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
              {views}
            </StyledInfo>
          </StyledFlexRow>
        </StyledContent>
        <StyledFlexRow>
          <StyledInfo>
            <StyledSpan>댓글:</StyledSpan>
            {commentCount}
            <StarTwoTone
              twoToneColor={isPostIdIncluded ? '#13A8A8' : '#b4b4b4'}
              style={{ fontSize: '15px' }}
            />
          </StyledInfo>
        </StyledFlexRow>
      </StyledWrapper>
    </Link>
  );
};

export default PostItem;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

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
`;

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
