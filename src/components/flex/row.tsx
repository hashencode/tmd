import "./row.scss";

import React from "react";
import {View} from "@tarojs/components";
import classNames from "classnames";
import {transformPx} from "../_scripts";

interface PropsInterface {
  tmAlign?: "flex-start" | "center" | "flex-end" | "baseline"; // 垂直对齐方式
  tmGutter?: number; // 栅格间隔
  tmJustify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-between"; // 水平排列方式
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmRow(props: PropsInterface) {
  const {
    tmAlign = "flex-start",
    tmGutter = 0,
    tmJustify = "start",
    className = "",
    style = {}
  } = props;

  return (
    <View
      className={classNames("tm-row", className)}
      style={{
        marginLeft: transformPx(-tmGutter),
        marginRight: transformPx(-tmGutter),
        justifyContent: tmJustify,
        alignItems: tmAlign,
        ...style
      }}
    >
      {props.children &&
      React.Children.map(props.children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
            // @ts-ignore
            tmGutter
          })
          : props.children
      )}
    </View>
  );
}

export default TmRow;
