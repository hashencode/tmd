import "./tag.scss";

import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmTag(props: PropsInterface) {
  const { className = "", style = {} } = props;

  return (
    <View className={classNames(className)} style={style}>
      {props.children}
    </View>
  );
}

export default TmTag;
