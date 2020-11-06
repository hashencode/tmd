import { Image, View } from "@tarojs/components";

import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { transformPx } from "../../functions";

export interface imageProps {
  tmRatio?: number; // 图片宽高比
  tmHeight?: number | string; // 图片高度
  tmLazy?: boolean; // 懒加载
  tmSrc?: string; // 图片地址
  onClick?: MouseEventHandler; // 点击事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmImage(props: imageProps) {
  const {
    tmHeight = 0,
    tmLazy = false,
    tmRatio = 1,
    tmSrc = "",
    onClick = () => {},
    className = "",
    style = {},
  } = props;

  const calcHeight = () => {
    if (tmHeight) {
      return {
        height: transformPx(tmHeight),
      };
    }
    return { paddingBottom: `${tmRatio * 100}%` };
  };

  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <View
      className={classNames("tm-image", className)}
      style={style}
      onClick={handleClick}
    >
      <View className="tm-image__content" style={calcHeight()}>
        <Image mode="widthFix" src={tmSrc} lazyLoad={tmLazy} />
      </View>
    </View>
  );
}

export default TmImage;
