import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PrivateRoute from './PrivateRoutes';
import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import SignupDetail from '../pages/Signup/SignupDetail';
import Login from '../pages/Login/Login';
import SetProfile from '../pages/SetProfile/SetProfile';
import EditProfile from '../pages/EditProfile/EditProfile';
import Profile from '../pages/Profile/Profile';
import PlaylistDetail from '../pages/PlaylistDetail/PlaylistDetail';
import PlaylistSummary from '../pages/PlaylistSummary/PlaylistSummary';
import PlaylistModify from '../pages/PlaylistModify/PlaylistModify';
import EventPage from '../pages/EventPage/EventPage';
import CreatePlaylist1 from '../pages/CreatePlaylist/CreatePlaylist1';
import CreatePlaylist2 from '../pages/CreatePlaylist/CreatePlaylist2';
import CreatePlaylist3 from '../pages/CreatePlaylist/CreatePlaylist3';
import Search from '../pages/Search/Search';
import ChangePassword from '../pages/UserInfo/ChangePassword';
import Resign from '../pages/UserInfo/UserLeave';
import RandomMusic from '../pages/RandomMusic/RandomMusic';
import Intro from '../pages/Home/Intro';
import Splash from '../pages/Splash/Splash';
import Follow from '../pages/Profile/Follow';
import NotFound from '../pages/NotFound/NotFound';
import SearchResult from '../pages/Search/SearchResult';
import RecentSearch from '../components/Search/RecentSearch';
import Comment from '../pages/PlaylistDetail/Comment';
import Reply from '../pages/PlaylistDetail/Reply';
import MorePlaylist from '../pages/Home/MorePlaylist';

export function Router() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/register/detail' element={<SignupDetail />} />
        <Route path='/setprofile' element={<SetProfile />} />
        <Route element={<PrivateRoute />}>
          <Route path='/event' element={<EventPage />} />
          <Route path='/main' element={<Outlet />}>
            <Route path='' element={<Home />} />
            <Route path=':playlistType' element={<MorePlaylist />} />
          </Route>
          <Route path='/intro' element={<Intro />} />
          <Route path='/search' element={<Search />}>
            <Route index element={<RecentSearch />} />
            <Route path=':keyword' element={<SearchResult />} />
          </Route>
          <Route path='/randomplay' element={<RandomMusic />} />
          <Route path='/playlist/create1' element={<CreatePlaylist1 />} />
          <Route path='/playlist/create2' element={<CreatePlaylist2 />} />
          <Route path='/playlist/create3' element={<CreatePlaylist3 />} />
          <Route path='/playlist/summary' element={<PlaylistSummary />} />
          <Route path='/user' element={<Outlet />}>
            <Route path='profile/my' element={<Profile />} />
            <Route path='profile/:id' element={<Profile />} />
            <Route path='profile/my/follow' element={<Follow />} />
            <Route path='profile/:id/follow' element={<Follow />} />
            <Route path='profile/edit' element={<EditProfile />} />
            <Route path='password' element={<ChangePassword />} />
            <Route path='resign' element={<Resign />} />
          </Route>
          <Route path='/playlist/detail'>
            <Route path=':id' element={<PlaylistDetail />} />
            <Route path=':id/edit' element={<PlaylistModify />} />
            <Route path=':id/comment' element={<Comment />} />
            <Route path=':id/reply' element={<Reply />} />
          </Route>
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
