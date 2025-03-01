import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearch } from '../../hooks/queries/useSearch';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import SearchNav from '../../components/Search/SearchNav';
import SearchResultAll from '../../components/Search/SearchResultAll';
import SearchResultByType from '../../components/Search/SearchResultByType';
import AddModal from '../../components/common/Modal/AddModal';
import Loading from '../../components/Loading/Loading';

export default function SearchResult() {
  const { keyword } = useParams() as { keyword: string };
  const { data, isLoading, refetch } = useSearch(keyword);
  const result = data;
  const [currentNav, setCurrentNav] = useState({
    all: true,
    playlist: false,
    music: false,
    user: false,
  });
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const [musicId, setMusicId] = useState<number>(0);
  const handleAddPlaylist = (musicId: number) => {
    setMusicId(musicId);
    setModalOpen(true);
  };
  const handleNavPlaylist = () => {
    setCurrentNav({ all: false, playlist: true, music: false, user: false });
  };
  const handleNavMusic = () => {
    setCurrentNav({ all: false, playlist: true, music: true, user: false });
  };
  const handleNavUser = () => {
    setCurrentNav({ all: false, playlist: false, music: false, user: true });
  };

  useEffect(() => {
    refetch();
    setCurrentNav({ all: true, playlist: false, music: false, user: false });
  }, [keyword]);

  if (isLoading) return <Loading isLoading={isLoading} />;

  return (
    <>
      {modalOpen && <AddModal videoId={musicId.toString()} />}
      <SearchNav currentNav={currentNav} setCurrentNav={setCurrentNav} />
      <SearchResultBox>
        {currentNav.all && (
          <SearchResultAll
            result={result}
            handleAddPlaylist={handleAddPlaylist}
            handleNavPlaylist={handleNavPlaylist}
            handleNavMusic={handleNavMusic}
            handleNavUser={handleNavUser}
          />
        )}
        {(currentNav.playlist || currentNav.user) && (
          <SearchResultByType
            result={result}
            currentNav={currentNav}
            handleAddPlaylist={handleAddPlaylist}
          />
        )}
      </SearchResultBox>
    </>
  );
}

const SearchResultBox = styled.div`
  position: relative;
  height: calc(100% - 89px);
  overflow-y: scroll;
  padding-bottom: 116px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
