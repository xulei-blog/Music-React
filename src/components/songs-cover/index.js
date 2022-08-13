import React, { memo, useCallback } from "react";

import { SongsCoverWrapper } from "./style";

import { getCount, getSizeImage } from "@/utils/format-utils";

const SongsCover = memo((props) => {
  const { info, hasBy } = props;
  const getAlbumLink = useCallback((id) => {
    return `https://music.163.com/#playlist?id=${id}`;
  }, []);
  const getSingerLink = useCallback((id) => {
    return `https://music.163.com/#/user/home?id=${id}`;
  }, []);
  return (
    <SongsCoverWrapper>
      <a href={getAlbumLink(info.id)} className="cover-top">
        <img src={getSizeImage(info.picUrl, 140)} alt={info.name} />
        <div className="cover sprite_cvoer">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon earphone"></i>
              {getCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </a>
      <a href={getAlbumLink(info.id)} className={"cover-bottom " + (hasBy ? "text-nowrap" : "")}>
        {info.name}
      </a>
      {hasBy ? (
        <a href={getSingerLink(info.creator.id)} className="cover-source">
          by {info.copywriter || info.creator.nickname}
        </a>
      ) : null}
    </SongsCoverWrapper>
  );
});

export default SongsCover;
