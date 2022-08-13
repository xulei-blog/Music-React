import React, { memo, useEffect, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';

import {PanelWrapper} from './style'

import { scrollTo } from '@/utils/ui-helper';

const LyricPanel = memo(() => {

  const { lyricIndex, lyricList } = useSelector(state => ({
    lyricList: state.getIn(['player', 'lyricList']),
    lyricIndex: state.getIn(['player', 'lyricIndex']),
  }), shallowEqual);

  const panelRef = useRef();

  useEffect(() => {
    if (lyricIndex > 0 && lyricIndex < 3) return;
    scrollTo(panelRef.current, (lyricIndex - 3) * 32, 300);
  }, [lyricIndex]);

  return (
    <PanelWrapper ref={panelRef}>
      <div className="lrc-content">
        {
          lyricList.map((item, index) => {
            return (
              <div key={item.time}
                   className={classNames('lrc-item', {'active': index === lyricIndex})}>
                     {item.content}
              </div>
            )
          })
        }
      </div>
    </PanelWrapper>
  );
});

export default LyricPanel;