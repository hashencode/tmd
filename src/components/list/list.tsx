import "./list.scss";

import React from "react";
import {View} from "@tarojs/components";
import classNames from "classnames";
import ListContext from "./_context";

interface PropsInterface {
  tmDisabled?: boolean; // 禁用
  tmRound?: boolean; // 圆角显示
  tmOuterBorder?: boolean; // 显示外边框
  tmInnerBorder?: boolean; // 显示内边框
  tmIndent?: boolean; // 边框缩进
  tmShadow?: boolean; // 显示阴影
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmList(props: PropsInterface) {
  const {
    tmDisabled = false,
    tmRound = false,
    tmOuterBorder = false,
    tmInnerBorder = false,
    tmIndent = false,
    tmShadow = false,
    className = "",
    style = {}
  } = props;

  return (
    <View
      className={classNames(
        "tm-list",
        {
          "tm-list-round": tmRound,
          "tm-list-outer-border": tmOuterBorder,
          "tm-list-inner-border": tmInnerBorder,
          "tm-list-indent": tmIndent,
          "tm-list-shadow": tmShadow,
          "tm-list-disabled": tmDisabled
        },
        className
      )}
      style={style}
    >
      <ListContext.Provider value={{tmInnerBorder, tmIndent}}>
        {props.children}
      </ListContext.Provider>
    </View>
  );
}

export default TmList;
