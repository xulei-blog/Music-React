import React, { memo } from 'react';




import TopBanner from './c-cpns/top-banner';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import RecommendRanking from './c-cpns/recommend-ranking';
import SettleSinger from './c-cpns/settle-singer';
import UserLogin from './c-cpns/user-login';
import HotAnchor from './c-cpns/hot-anchor';
import { 
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from './style'

const Recommend = (props) => {

  return (
    <RecommendWrapper>
      <TopBanner />
      <Content className='wrap-v2'>
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RecommendRanking />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  );
};

export default memo(Recommend);