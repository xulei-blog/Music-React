import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTopBannersAction } from "../../store/actionCreators";

import {
  TopBannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl,
} from "./style";
import { Carousel } from 'antd';

const TopBanner = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { topBanners } = useSelector(
    (state) => ({
      topBanners: state.getIn(["recommend", "topBanners"]),
    }),
    shallowEqual
  );


  const dispatch = useDispatch();
  const bannerRef = useRef();
  useEffect(() => {
    dispatch(getTopBannersAction());
  }, [dispatch]);
  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to);
  }, []);
  const hasImageView = useCallback((str) => {
    return str.indexOf('?imageView') >= 0 ? str + '&blur=40x20' : str + '?imageView&blur=40x20';
  }, []);

  const bgImage = topBanners[currentIndex] && hasImageView(topBanners[currentIndex].imageUrl);

  return (
    <div>
      <TopBannerWrapper bgImage={bgImage}>
        <div className="banner wrap-v2">
          <BannerLeft>
            <Carousel effect="scrollx" autoplay ref={bannerRef} beforeChange={bannerChange} >
              {
                topBanners.map((item, index) => {
                  return (
                    <div className="banner-item" key={item.imageUrl}>
                      <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                    </div>
                  )
                })
              }
            </Carousel>
          </BannerLeft>
          <BannerRight></BannerRight>
          <BannerControl>
            <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
            <button className="btn right" onClick={e => bannerRef.current.next()}></button>
          </BannerControl>
        </div>
      </TopBannerWrapper>
    </div>
  );
});

export default TopBanner;
