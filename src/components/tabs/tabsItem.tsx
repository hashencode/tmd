import "./tabsItem.scss";

import React, { ReactNode, useContext, useLayoutEffect, useState } from "react";

import TabsContext from "./_context";
import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmTitle?: string | ReactNode; // tab页标题
  tmKey: string; // 唯一key值
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmTabsItem(props: PropsInterface) {
  const { tmKey = "", className = "", style = {} } = props;

  const parentContext = useContext(TabsContext);

  // 是否激活
  const [isActive, setIsActive] = useState(false);

  useLayoutEffect(() => {
    setIsActive(parentContext.activeKey === tmKey);
  }, [parentContext]);

  return (
    <View
      className={classNames("tm-tabs-item", className)}
      style={{
        transform: `translateX(${isActive ? 0 : "-9999px"})`,
        height: isActive ? "auto" : 0,
        ...style
      }}
    >
      {/*如果是懒加载，则判断是否当前正在激活或已经激活过*/}
      {/*如果不是懒加载，统一直接显示*/}
      {parentContext.tmLazyLoad
        ? parentContext.keyCache.includes(tmKey)
          ? props.children
          : ""
        : props.children}
    </View>
  );
}

export default TmTabsItem;
