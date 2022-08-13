import React, { memo } from 'react';

import {hotAnchors} from '@/common/local-data';
import ThemeHeaderSmall from '@/components/theme-header-small';
import {HotAnchorWrapper} from './style'


const HotAnchor = memo(() => {
  return (
    <HotAnchorWrapper>
      <ThemeHeaderSmall title="热门主播"/>
      <div className="anchor-list">
        {
          hotAnchors.map((item, index) => {
            return (
              <div className="item" key={item.picUrl}>
                <a href="todo" className='image'>
                  <img src={item.picUrl} alt="" />
                </a>
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="position text-nowrap">{item.position}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </HotAnchorWrapper>
  );
});

export default HotAnchor;