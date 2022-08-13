import React, { memo } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';

import {getSettleSingersAction} from '../../store/actionCreators';

import {SettleSingerWrapper} from './style'
import ThemeHeaderSmall from '@/components/theme-header-small';
import { getSizeImage } from '@/utils/format-utils';

const SettleSinger = memo(() => {
  const { settleSingers } = useSelector(state => ({
    settleSingers: state.getIn(['recommend', 'settleSingers']),
  }), shallowEqual);
  const dispatch = useDispatch();

  if (settleSingers.length === 0) {
    dispatch(getSettleSingersAction(5, 0));
  }
  return (
    <SettleSingerWrapper>
      <ThemeHeaderSmall title="入驻歌手" more="查看全部&gt;"/>
      <div className="singer-list">
        {
          settleSingers.map((item, index) => {
            return (
              <a href="todo" key={item.id} className="item">
                <img src={getSizeImage(item.img1v1Url, 62)} alt="" />
                <div className="info">
                  <div className="title">{item.alias.join('') || item.name}</div>
                  <div className="name">{item.name}</div>
                </div>
              </a>
            )
          })
        }
      </div>
      <div className="apply-for">
        <a href="todo">申请成为网易音乐人</a>
      </div>
    </SettleSingerWrapper>
  );
});

export default SettleSinger;