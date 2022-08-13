import React, { memo } from 'react';
import classNames from 'classnames';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { formatMinutesSecond } from '@/utils/format-utils';
import { switchCurrentSongAction } from '../../../app-player-bar/store/actionCreators'; 

import { PlayListWrapper } from './style'

const PlayList = memo(() => {
  const { playList, currentSongIndex } = useSelector(state => ({
    currentSongIndex: state.getIn(['player', 'currentSongIndex']),
    playList: state.getIn(['player', 'playList']),
  }), shallowEqual);
  const dispatch = useDispatch();

  const siwtchCurrentSong = (index) => {
    dispatch(switchCurrentSongAction(index - currentSongIndex));
  }
  return (
    <PlayListWrapper>
      {
        playList.map((item, index) => {
          return (
            <div key={item.id}
                 className={classNames('play-item', {'active': currentSongIndex === index})}
                 onClick={e => siwtchCurrentSong(index)}>
              <div className='left'>{item.name}</div>
              <div className="right">
                <span className='singer text-nowrap'>{item.ar[0].name}</span>
                <span className='duration'>{formatMinutesSecond(item.dt)}</span>
                <span className='sprite_playlist link'></span>
              </div>
            </div>
          )
        })
      }
    </PlayListWrapper>
  );
});

export default PlayList;