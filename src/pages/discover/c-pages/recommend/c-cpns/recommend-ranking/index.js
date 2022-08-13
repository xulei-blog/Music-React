import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import ThemeHeaderRCM from '@/components/theme-header-rcm';
import { RankingWrapper } from './style';
import TopRanking from '@/components/top-ranking';

import { getTopListAction } from '../../store/actionCreators'

const RecommendRanking = memo(() => {

  const {upRanking, newRanking, originRanking} = useSelector(state => ({
    upRanking: state.getIn(['recommend', 'upRanking']),
    newRanking: state.getIn(['recommend', 'newRanking']),
    originRanking: state.getIn(['recommend', 'originRanking']),
  }), shallowEqual)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopListAction(19723756, 0));
    dispatch(getTopListAction(3779629, 2));
    dispatch(getTopListAction(2884035, 3));
  }, [dispatch]);

  return (
    <RankingWrapper>
      <ThemeHeaderRCM title='榜单'/>
      <div className="tops">
        <TopRanking info={upRanking}/>
        <TopRanking info={newRanking}/>
        <TopRanking info={originRanking}/>
       </div>
    </RankingWrapper>
  );
});

export default RecommendRanking;