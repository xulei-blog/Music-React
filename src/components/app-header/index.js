import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'


import { HeaderWrapper, HeaderLeft, HeaderRight } from "./style";

import { headerLinks } from "@/common/local-data";

export default memo(function WYAppheader() {
  const showSelectItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link}>
          {item.title}
        </a>
      );
    }
  };

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a href="#/" className="logo sprite_01">
            logo
          </a>
          <div className="select-list">
            {
              headerLinks.map((item, index) => {
                return (
                  <div className="select-item" key={item.title}>
                    {
                      showSelectItem(item, index)
                    }
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input placeholder="音乐/视频/电台/用户"
                 prefix={<SearchOutlined />} 
                 className="search"/>
          <button className="center btn">创作者中心</button>
          <button className="login btn">登录</button>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
});
