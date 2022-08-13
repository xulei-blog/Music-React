import * as actionType from './constants';

import {
   getTopBanners,
   getHotRecommends,
   getNewAlbums,
   getTopList,
   getSingerList,
} from '@/services/recommend';


export const changeTopBannersAction = (res) => ({
  type: actionType.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
});

export const changeHotRecommendsAction = (res) => ({
  type: actionType.CHANGE_HOT_RECOMMENDS,
  hotRecommends: res.result,
});

export const changeNewAlbumsAction = (res) => ({
  type: actionType.CHANGE_NEW_ALBUMS,
  newAlbums: res.albums,
});

export const changeUpRankingAction = (res) => ({
  type: actionType.CHANGE_UP_RANKING,
  upRanking: res.playlist,
});

export const changeNewRankingAction = (res) => ({
  type: actionType.CHANGE_NEW_RANKING,
  newRanking: res.playlist,
});

export const changeOriginRankingAction = (res) => ({
  type: actionType.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist,
});

const changeSettleSingerAction = (res) => ({
  type: actionType.CHANGE_SETTLE_SINGERS,
  settleSingers: res.artists,
});

export const getTopBannersAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannersAction(res));
    })
  }
};

export const getHotRecommendsAction = (limit) => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      dispatch(changeHotRecommendsAction(res));
    })
  }
};

export const getNewAlbumsAction = (limit) => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      dispatch(changeNewAlbumsAction(res));
    })
  }
}

export const getTopListAction = (id, idx) => {
  return dispatch => {
    getTopList(id).then(res => {
      switch(idx) {
        case 0: 
          dispatch(changeNewRankingAction(res));     
          break;
        case 2:
          dispatch(changeOriginRankingAction(res));
          break;
        case 3:
          dispatch(changeUpRankingAction(res));
          break;
        default:
      }
    }).catch(err => {
      console.log(err);
    })
  }
};

export const getSettleSingersAction = (limit, cat) => {
  return dispatch => {
    getSingerList(limit, cat).then(res => {
      dispatch(changeSettleSingerAction(res));
    })
  }
}