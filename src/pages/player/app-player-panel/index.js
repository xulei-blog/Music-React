import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { getSizeImage } from '@/utils/format-utils'; 

import { PanelWrapper } from './style'

import PlayHeader from './c-cpns/player-header';
import PlayList from './c-cpns/play-list';
import LyricPanel from './c-cpns/lyric-panel';

const AppPlayList = memo(() => {
  const { currentSong } = useSelector(state => ({
    currentSong: state.getIn(['player', 'currentSong']),
  }), shallowEqual);
  return (
    <PanelWrapper>
      <PlayHeader />
      <div className="main">
        <img className='image' src={getSizeImage(currentSong.al.picUrl, 980)} alt="" />
        <PlayList />
        <LyricPanel />
      </div>
    </PanelWrapper>
  );
});

export default AppPlayList;