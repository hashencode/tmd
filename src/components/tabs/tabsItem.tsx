import "./tabsItem.scss";

import React, { ReactNode, useContext, useLayoutEffect, useState } from "react";

import TabsContext from "./_context";
import { SwiperItem } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmTitle?: string | ReactNode; // tab页标题
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmTabsItem(props: PropsInterface) {
  const { className = "", style = {} } = props;

  const { tmLazyLoad, indexCache } = useContext(TabsContext);

  return (
    <SwiperItem
      className={classNames("tm-tabs-item", className)}
      style={{
        ...style,
      }}
    >
      {/*如果是懒加载，则判断是否当前正在激活或已经激活过*/}
      {/*如果不是懒加载，统一直接显示*/}
      {/*{tmLazyLoad*/}
      {/*  ? indexCache.includes(tmKey)*/}
      {/*    ? props.children*/}
      {/*    : ""*/}
      {/*  : props.children}*/}
      {props.children}
    </SwiperItem>
  );
}

export default TmTabsItem;
