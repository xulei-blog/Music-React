import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual  } from 'react-redux';

import { HotRecommendWrapper } from './style';
import ThemeHeaderRCM from '@/components/theme-header-rcm';
import SongsCover from '@/components/songs-cover';

import { getHotRecommendsAction } from '../../store/actionCreators'
import { HOT_RECOMMENDS_LIMIT } from '@/common/constants';

const HotRecommend = memo(() => {

  const dispatch = useDispatch();
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(['recommend', 'hotRecommends']),
  }), shallowEqual);

  useEffect(() => {
    dispatch(getHotRecommendsAction(HOT_RECOMMENDS_LIMIT));
  }, [dispatch])

  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM title='热门推荐' keywords={['华语', '流行', '摇滚', '民谣', '电子']}/>
      <div className="recommend-list">
        {
          hotRecommends.map((item, index) => {
            return (
              <SongsCover key={item.id} info={item} hasBy={false} />
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  );
});

export default HotRecommend;