import React, { memo } from 'react';

import {
  PlayerWrapper,
  PlayRight,
  PlayerLeft,
} from './style'

const Player = memo(() => {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <h2>PlayInfo</h2>
          <h2>PlayComment</h2>
        </PlayerLeft>
        <PlayRight>
          <h2>PlaySongs</h2>
          <h2>PlayRelevant</h2>
        </PlayRight>
      </div>
    </PlayerWrapper>
  );
});

export default Player;