import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import DescriptionContext from "./_context";

export interface descriptionProps {
  tmTitleStyle?: object;
  tmDescStyle?: object;
  tmSpace?: "xs" | "sm" | "mid" | "lg" | number; // 间距大小
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDescription(props: descriptionProps) {
  const {
    tmDescStyle = {},
    tmTitleStyle = {},
    tmSpace = "sm",
    className = "",
    style = {},
  } = props;

  return (
    <View className={classNames("tm-description", className)} style={style}>
      <DescriptionContext.Provider
        value={{ tmDescStyle, tmTitleStyle, tmSpace }}
      >
        {props.children}
      </DescriptionContext.Provider>
    </View>
  );
}

export default TmDescription;
