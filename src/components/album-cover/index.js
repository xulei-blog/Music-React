import React, { memo } from 'react';

import { AlbumCoverWrapper } from './style'

import { getSizeImage } from '@/utils/format-utils';

const AlbumCover = memo((props) => {
  const {info, size = 130, width = 153, bgp = -845} = props;
  return (
    <AlbumCoverWrapper size={size} width={width} bgp={bgp}>
      <div className="album-image">
        <img src={getSizeImage(info.picUrl, size)} alt="" />
        <a href="todo" className='cover image_cover'> </a>
      </div>
      <div className="album-info">
        <div className="name text-nowrap">{info.name}</div>
        <div className="artist text-nowrap">{info.artist.name}</div>
      </div>
    </AlbumCoverWrapper>
  );
});

export default AlbumCover;