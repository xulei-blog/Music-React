import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Carousel } from "antd";
import ThemeHeaderRCM from "@/components/theme-header-rcm";
import { NewAlbumWrapper } from "./style";
import AlbumCover from '@/components/album-cover';

import { NEW_ALBUMS_LIMIT } from "@/common/constants";
import { getNewAlbumsAction } from "../../store/actionCreators";

const NewAlbum = memo(() => {
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const pageRef = useRef();
  useEffect(() => {
    dispatch(getNewAlbumsAction(NEW_ALBUMS_LIMIT));
  }, [dispatch]);

  return (
    <NewAlbumWrapper>
      <ThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <button className="arrow arrow-left sprite_02" 
                onClick={e => pageRef.current.prev()}></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {
              [0, 1].map((row) => {
                return (
                  <div key={row} className='page'>
                    {
                      newAlbums.slice(row * 5, (row + 1) * 5).map((item, index) => {
                        return <AlbumCover key={item.id}
                                           info={item}
                                           size={100}
                                           width={118}
                                           bgp={-570}/>
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02" 
                onClick={e => pageRef.current.next()}></button>
      </div>
    </NewAlbumWrapper>
  );
});

export default NewAlbum;
