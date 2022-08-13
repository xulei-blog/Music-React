import request from './request';

export function getTopBanners() {
  return request({
    url: '/banner',
  })
};

export function getHotRecommends(limit) {
  return request({
    url: '/personalized',
    params: {
      limit,
    }
  })
};

export function getNewAlbums(limit) {
  return request({
    url: '/top/album',
    params: {
      limit: 10,
    }
  })
};

export function getTopList(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    }
  })
};

export function getSingerList(limit, cat) {
  return request({
    url: '/artist/list',
    params: { 
      limit,
      cat,
      type: -1,
      area: -1,
    }
  })
};