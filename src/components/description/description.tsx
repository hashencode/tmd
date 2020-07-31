import "./description.scss";

import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import DescriptionContext from "./_context";

interface PropsInterface {
  tmTitleStyle?: object;
  tmDescStyle?: object;
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDescription(props: PropsInterface) {
  const {
    tmDescStyle = {},
    tmTitleStyle = { width: "20%" },
    className = "",
    style = {}
  } = props;

  return (
    <View className={classNames("tm-description", className)} style={style}>
      <DescriptionContext.Provider value={{ tmDescStyle, tmTitleStyle }}>
        {props.children}
      </DescriptionContext.Provider>
    </View>
  );
}

export default TmDescription;
