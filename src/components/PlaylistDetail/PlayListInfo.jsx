import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Image, CircleImage } from '../common/Image/Image';
import { modalAtom } from '../../atoms/modalAtom';

import PenIcon from '../../img/pen-icon.svg';
import Mudig from '../../img/playlist-mudig-img.svg';
import ArrowIcon from '../../img/left-arrow-Icon.svg';
import ProfileBadge from '../../img/badge-icon.svg';

export default function PlayListInfo(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, playlist, playlistDesc } = props;
  const [moreInfoView, setMoreInfoView] = useState(false);
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const isModifyPath =
    location.pathname.includes('/playlist/detail/') &&
    location.pathname.includes('/edit');
  const isPlaylistSummary = location.pathname.includes('/playlist/summary');

  const handleMoveBackBtnClick = () => {
    navigate(-1);
  };
  const handleMoreBtn = () => {
    setMoreInfoView(true);
  };
  const handleCloseBtn = () => {
    setMoreInfoView(false);
  };
  const handleModify = () => {
    setModalOpen(true);
  };

  console.log(user);

  return (
    <PlayListInfoWrap
      isPlaylistSummary={isPlaylistSummary}
      backgroundUrl={`https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${playlist.thumbnail}`}
    >
      {!isPlaylistSummary && (
        <MoveBackBtn onClick={handleMoveBackBtnClick}>
          <img src={ArrowIcon} alt='뒤로가기' />
        </MoveBackBtn>
      )}
      {isPlaylistSummary && <SummaryTitle>{playlist.title}</SummaryTitle>}
      <ThumbnailBox isPlaylistSummary={isPlaylistSummary}>
        <Image src={playlist.thumbnail} alt='썸네일' />
      </ThumbnailBox>
      <InfoBox>
        {!isPlaylistSummary && (
          <Title>
            <h2>{playlistDesc?.title || playlist?.title}</h2>
            {isModifyPath && (
              <ModifyBtn onClick={handleModify}>
                <img src={PenIcon} alt='수정' />
              </ModifyBtn>
            )}
          </Title>
        )}
        {!isModifyPath && (
          <WriterInfo to={`/user/profile/${user.id}`} state={{ id: user.id }}>
            <CircleImage src={user.image} alt='프로필 이미지' />
            <img src={ProfileBadge} alt='프로필 작성자 배지' />
            <p>{user.name}</p>
          </WriterInfo>
        )}
        <Desc>
          <p>{playlistDesc?.content || playlist?.content}</p>
          {!isModifyPath && <MoreBtn onClick={handleMoreBtn}>더보기</MoreBtn>}
        </Desc>
        <PrivateCheck>
          {(isModifyPath ? playlistDesc?.is_public : playlist.is_public)
            ? '공개'
            : '비공개'}
        </PrivateCheck>
      </InfoBox>
      {moreInfoView && (
        <>
          <ThumbnailBlurBox />
          <MoreInfoBox>
            <p>{playlistDesc?.content || playlist?.content}</p>
            <button onClick={handleCloseBtn}>닫기</button>
          </MoreInfoBox>
        </>
      )}
    </PlayListInfoWrap>
  );
}
const PlayListInfoWrap = styled.section`
  position: relative;
  padding-top: ${(props) => (props.isPlaylistSummary ? '260px' : ' 216px')};
  position: relative;
  line-height: normal;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${(props) => props.backgroundUrl}) lightgray 50% / cover
      no-repeat;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(8px);
    transform: scale(1.05);
    z-index: -1;
  }
`;

export const MoveBackBtn = styled.button`
  position: absolute;
  top: 22px;
  left: 16px;
  filter: invert(100%) sepia(75%) saturate(1%) hue-rotate(10deg)
    brightness(104%) contrast(101%);
`;

const ThumbnailBox = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  top: 76px;
  transform: ${(props) =>
    props.isPlaylistSummary ? 'translate(50%, 43px)' : 'translate(50%, 0)'};
`;
const SummaryTitle = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(35%, 130%);
  width: 60%;
  text-align: center;
  word-break: keep-all;
  line-height: normal;
  font-size: var(--font-lg);
  font-weight: var(--font-semi-bold);
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 67px 16px 0;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
  h2 {
    width: 100%;
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
  }
`;

const Desc = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  p {
    color: var(--sub-font-color);
    font-size: var(--font-sm);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
  }
`;

const ModifyBtn = styled.button`
  height: 24px;
`;

const WriterInfo = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;

  img:first-child {
    width: 24px;
    height: 24px;
  }

  p {
    font-size: var(--font-sm);
    font-weight: var(--font-semi-bold);
  }
`;

const MoreBtn = styled.button`
  white-space: nowrap;
  color: #575757;
  font-size: var(--font-sm);
`;

const PrivateCheck = styled.p`
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
const ThumbnailBlurBox = styled.div`
  position: absolute;
  top: 0;
  width: 360px;
  height: 100%;
  background: rgba(15, 15, 16, 0.8);
  z-index: 3;
`;

const MoreInfoBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 3;
  display: flex;
  bottom: 0px;
  flex-direction: column;
  padding: 16px;
  background-color: var(--playlist-info-bg-color);
  color: #fff;
  font-size: var(--font-sm);
  line-height: normal;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-10%, -99%);
    width: 124px;
    height: 78px;
    background: url(${Mudig}) no-repeat center/contain;
  }
  button {
    color: var(--playlist-info-sub-color);
    font-weight: var(--font-regular);
    align-self: flex-end;
  }
`;
