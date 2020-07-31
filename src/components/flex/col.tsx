import "./col.scss";

import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { sizeTransform } from "../_scripts";

interface PropsInterface {
  tmFlex?: number | string;
  tmGutter?: number; // Row传递过来的Gutter
  tmOffset?: number; // 栅格左侧的间隔格数
  tmOrder?: number; // 栅格顺序
  tmPull?: number; // 栅格向左移动格数
  tmPush?: number; // 栅格向右移动格数
  tmSpan?: number; // 栅格占位格数
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmCol(props: PropsInterface) {
  const {
    tmGutter = 0,
    tmOffset = 0,
    tmOrder = 0,
    tmPull = 0,
    tmPush = 0,
    tmSpan = 0,
    className = "",
    style = {}
  } = props;

  return (
    <View
      className={classNames(
        "tm-col",
        { [`tm-col-offset-${tmOffset}`]: tmOffset },
        { [`tm-col-pull-${tmPull}`]: tmPull },
        { [`tm-col-push-${tmPush}`]: tmPush },
        { [`tm-col-order-${tmOrder}`]: tmOrder },
        `tm-col-span-${tmSpan}`,
        className
      )}
      style={{
        paddingLeft: sizeTransform(tmGutter),
        paddingRight: sizeTransform(tmGutter),
        ...style
      }}
    >
      {props.children}
    </View>
  );
}

export default TmCol;
