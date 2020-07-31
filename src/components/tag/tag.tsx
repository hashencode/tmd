import "./tag.scss";

import React, { ReactNode } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmBorder?: boolean; // 是否现实边框
  tmGhost?: boolean; // 幽灵标签
  tmIcon?: ReactNode; // 自定义图标
  tmRound?: boolean; // 圆角显示
  tmSize?: "sm" | "mid"; // 尺寸大小
  tmType?: "default" | "info" | "success" | "warning" | "danger"; // 预设状态
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmTag(props: PropsInterface) {
  const {
    tmBorder = false,
    tmGhost = false,
    tmIcon = null,
    tmRound = false,
    tmSize = "mid",
    tmType = "default",
    className = "",
    style = {}
  } = props;

  return (
    <View
      className={classNames(
        "tm-tag",
        {
          "tm-tag-bordered": tmBorder,
          "tm-tag-round": tmRound,
          "tm-tag-ghost": tmGhost
        },
        `tm-tag-${tmType}`,
        `tm-tag-${tmSize}`,
        className
      )}
      style={style}
    >
      {tmIcon && <View className="tm-tag__icon">{tmIcon}</View>}
      {props.children}
    </View>
  );
}

export default TmTag;
