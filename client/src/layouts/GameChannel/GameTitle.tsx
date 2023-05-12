import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { dummyGameData, Game } from '../../data/dummyCategories';
import CategoryTag from '../../components/common/CategoryTag';
import CreateChannelButton from '../../components/ui/CreateChannelButton';

const GameTitle = ()  => {

  const { id } = useParams();
  const game: Game | undefined = dummyGameData.find(item => item.gameId.toString() === id);
  const followNumber = 10; // 데이터패칭 해야됨 + 팔로우 기능추가 (버튼클릭시 텍스트변경)

  if (!game) {
    return <div>게임을 찾을 수 없습니다.</div>
  }

  const currentGameData = game.categories;

  return (
    <StyledTitleWrapper>
      <StlyedGameImg 
        src={game.mainImgUrl}
        alt='game-image'
      />
      <StyledGameName>
        {game.gameName}
      </StyledGameName>
      <StyledTagContain>
      {
        currentGameData.map((item, index) => (
          <CategoryTag 
            key={index}
            index={index}
            categoryName={item.categoryName}
          />
        ))
      }
      </StyledTagContain>
      <StyledFollowContain>
        <p>게임 팔로워: {followNumber}</p>
        <CreateChannelButton text='게임 팔로우' onClick={() => {console.log('팔로우 기능추가')}}/>
      </StyledFollowContain>
    </StyledTitleWrapper>
  );
};

export default GameTitle;

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 650px) {
    padding-bottom: 30px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StlyedGameImg = styled.img`
  width: 300px;
  height: 250px;
  border-radius: 15px;
  margin-top: 50px;
  @media screen and (max-width: 650px) {
    margin-top: 30px;
  }
`

const StyledGameName = styled.h3`
  margin-top: 10px;
  font-size: 28px;
  font-weight: 700;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledTagContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

const StyledFollowContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15%;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: var(--cyan-dark-800);
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 20px;
  @media screen and (max-width: 650px) {
    width: 80%;
  }
`;