import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon } from "../../index";

export interface searchProps {
  tmBorder?: boolean; // 显示边框
  tmRound?: boolean; // 圆角显示
  tmShadow?: boolean; // 显示阴影
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmSearch(props: searchProps) {
  const {
    tmBorder = false,
    tmRound = false,
    tmShadow = false,
    className = "",
    style = {},
  } = props;

  return (
    <View
      className={classNames(
        "tm-search",
        {
          "tm-search-bordered": tmBorder,
          "tm-search-round": tmRound,
          "tm-search-shadow": tmShadow,
        },
        className
      )}
      style={style}
    >
      <TmIcon tmValue="search" className="tm-search__icon" />
      {props.children}
    </View>
  );
}

export default TmSearch;
