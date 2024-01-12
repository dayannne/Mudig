import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CircleImage } from '../common/Image/Image';
import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';
import EmptySearch from './EmptySearch';
import SearchResultTitle from './SearchResultTitle';
import AddPlaylist from '../../img/add-video-icon.svg';
export default function SearchResultByType(props) {
  const { result, currentNav, handleAddPlaylist } = props;
  const musicResult = result.search_music[0].music;
  const [type, setType] = useState('');

  useEffect(() => {
    const SearchResultType = () => {
      if (result) {
        if (currentNav.playlist) setType('playlist');
        else if (currentNav.user) setType('user');
      }
    };
    SearchResultType();
  }, [currentNav]);
  return (
    <>
      {/* 플리 결과만 */}
      {type === 'playlist' && (
        <>
          <PlaylistWrap>
            <ul>
              <SearchResultTitle title='플리 검색결과' />
              {result.playlists.length !== 0 ? (
                result.playlists.map((item) => (
                  <Link
                    to={`/playlist/detail/${item.playlist.id}`}
                    key={item.playlist.id}
                    state={{ id: item.playlist.id }}
                  >
                    <PlayListItem
                      key={item.playlist.id}
                      img={item.playlist.thumbnail}
                      title={item.playlist.title}
                      info={
                        item.writer.name ||
                        (item.writer === '유저 정보 없음'
                          ? '알 수 없는 사용자'
                          : null)
                      }
                    />
                  </Link>
                ))
              ) : (
                <EmptySearch />
              )}
            </ul>
            <ul>
              <SearchResultTitle title='노래 검색결과' />
              {result.search_music[0].music_count !== 0 ? (
                musicResult.map((music) => {
                  return (
                    <PlayListItem
                      key={music.id}
                      img={music.thumbnail}
                      title={music.song}
                      info={music.singer}
                    >
                      <button
                        type='button'
                        onClick={() => handleAddPlaylist(music.id)}
                      >
                        <img src={AddPlaylist} alt='플리에추가' />
                      </button>
                    </PlayListItem>
                  );
                })
              ) : (
                <EmptySearch />
              )}
            </ul>
          </PlaylistWrap>
        </>
      )}
      {/* 유저 결과만 */}
      {type === 'user' && (
        <UserList>
          {result.users.length !== 0 ? (
            result.users.map((user) => {
              return (
                <Link
                  to={`/user/profile/${user.id}`}
                  key={user.id}
                  state={{ id: user.id }}
                >
                  <UserItem key={user.id}>
                    <UserImgBox>
                      <CircleImage src={user.image} alt='유저이미지' />
                    </UserImgBox>
                    <UserInfoBox>
                      <div>{user.name}</div>
                      <p>{user.about}</p>
                    </UserInfoBox>
                  </UserItem>
                </Link>
              );
            })
          ) : (
            <EmptySearch />
          )}
        </UserList>
      )}
    </>
  );
}
const PlaylistWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const UserItem = styled.li`
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    border-radius: 50%;
  }
`;
const UserImgBox = styled.div`
  width: 60px;
  height: 60px;
`;
const UserInfoBox = styled.div`
  font-size: var(--font-md);
  div {
    margin-bottom: 3px;
    line-height: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  p {
    color: var(--sub-font-color);
  }
`;
