import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmImage } from "../../index";
import { transformPx } from "../../functions";

export interface avatarProps {
  tmShape?: "circle" | "rect"; // 头像形状
  tmSize?: number | string; // 头像宽度
  tmSrc?: string; // 头像地址
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmAvatar(props: avatarProps) {
  const {
    tmShape = "circle",
    tmSize = 100,
    tmSrc = "",
    className = "",
    style = {},
  } = props;

  return (
    <View
      className={classNames("tm-avatar", `tm-avatar-${tmShape}`, className)}
      style={{
        width: transformPx(tmSize),
        ...style,
      }}
    >
      <TmImage tmSrc={tmSrc} tmRatio={1} />
      {props.children}
    </View>
  );
}

export default TmAvatar;
