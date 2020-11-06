import React, { ReactNode, useContext } from "react";

import { SwiperItem } from "@tarojs/components";
import classNames from "classnames";
import TabsContext from "./_context";

export interface tabsItemProps {
  tmTitle: string | ReactNode; // tab页标题
  tmId: string; // 唯一id
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmTabsItem(props: tabsItemProps) {
  const { tmId = "", className = "", style = {} } = props;

  const { tmLazyLoad, keyCache } = useContext(TabsContext);

  return (
    <SwiperItem
      className={classNames("tm-tabs-item", className)}
      style={{
        ...style,
      }}
    >
      {/* 如果是懒加载，则判断是否当前正在激活或已经激活过 */}
      {/* 如果不是懒加载，统一直接显示 */}
      {tmLazyLoad
        ? keyCache.includes(tmId)
          ? props.children
          : ""
        : props.children}
    </SwiperItem>
  );
}

export default TmTabsItem;
