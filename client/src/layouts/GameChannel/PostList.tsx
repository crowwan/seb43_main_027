import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import PostItem from './PostItem';
import { dummyPostList, dummyBookmarkList, dummyMyList } from '../../data/dummyPostList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Props {
  gameId?: string;
  isSelectTab: string;
  isSelectTag: string;
};

const PostList: React.FC<Props> = ({ gameId, isSelectTag ,isSelectTab }) => {
  const [filteredPosts, setFilteredPosts] = useState(dummyPostList.post);
  const [page, setPage] = useState(1);
  const [userMessage, setUserMessage ] = useState('작성된 게시글이 없습니다.');
  const memberId = useSelector((state: RootState) => state.user.memberId);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
    setUserMessage('작성된 게시글이 없습니다.');
    const postData = dummyPostList.post;
    const bookmarkData = dummyBookmarkList.post;
    const myPostData = dummyMyList.post;
  
    switch (isSelectTab) {
      case '최신순':
        setFilteredPosts([...postData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        break;
      case '인기순':
        setFilteredPosts([...postData].sort((a, b) => b.likeCount - a.likeCount));
        break;
      case '조회순':
        setFilteredPosts([...postData].sort((a, b) => b.view - a.view));
        break;
      case '북마크 글':
        if (memberId === -1) {
          setFilteredPosts([]);
          setUserMessage('로그인이 필요한 기능입니다.');
        } else {
          // 로그인 후 북마크한 글들을 가져오는 코드 작성
          /* api 연결시 사용
          axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/bookmark`)
            .then((response) => {
              setFilteredPosts(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          */
          setFilteredPosts([...bookmarkData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
        break;
      case '내가 쓴 글':
        if (memberId === -1) {
          setFilteredPosts([]);
          setUserMessage('로그인이 필요한 기능입니다.');
        } else {
          // 로그인 후 내가 쓴 글들을 가져오는 코드 작성
          /* api 연결시 사용
          axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/mypost`)
            .then((response) => {
              setFilteredPosts(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          */
          setFilteredPosts([...myPostData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
        break;
      default:
        setFilteredPosts(postData);
        break;
    }

    if (isSelectTag !== '전체') {
      setFilteredPosts((prev) => prev.filter((post) => post.tag === isSelectTag));
    }
  }, [isSelectTab, isSelectTag, memberId]);

  const ITEMS_PER_PAGE = 10;
  const lastIndex = page * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentPagePosts = filteredPosts.slice(firstIndex, lastIndex);

  return (
    <PostListWrapper>
      {
        currentPagePosts.length > 0 ? 
        currentPagePosts.map((post, index) => (
          <PostItem
            key={index}
            postId={post.postId}
            title={post.title}
            tag={post.tag}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            view={post.view}
            userName={post.userName}
            memberStatus={post.memberStatus}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        )) :
        <StyledEmptyItem>
          {userMessage}
        </StyledEmptyItem>
      }
      <StyledPagination>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={filteredPosts.length}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
    />
    </StyledPagination>
    </PostListWrapper>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 650px) {
    padding: 0px 5px;
    max-height: 100%;
  }
`;

const StyledEmptyItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
`;

const StyledPagination = styled.div`
  padding: 20px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid var(--loding-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child{
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child{
    border-radius: 0 5px 5px 0;
  }
  
  ul.pagination li a {
    text-decoration: none;
    color: var(--cyan-light-600);
    font-size: 1rem;
  }
  
  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: var(--cyan-light-800);
  }
  
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: var(--cyan-light-300);
  }
  
  .page-selection {
    width: 48px;
    height: 30px;
    color: var(--cyan-light-800);
  }
`;