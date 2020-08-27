import "./image.scss";

import {Image, View} from "@tarojs/components";

import React from "react";
import classNames from "classnames";
import {transformPx} from "../_scripts";

interface PropsInterface {
  tmRatio?: number; // 图片宽高比
  tmHeight?: number | string; // 图片高度
  tmLazy?: boolean; // 懒加载
  tmSrc?: string; // 图片地址
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmImage(props: PropsInterface) {
  const {
    tmHeight = 0,
    tmLazy = false,
    tmRatio = 1,
    tmSrc = "",
    className = "",
    style = {}
  } = props;

  const calcHeight = () => {
    if (tmHeight) {
      return {
        height: transformPx(tmHeight)
      };
    } else {
      return {paddingBottom: `${tmRatio * 100}%`};
    }
  };

  return (
    <View className={classNames("tm-image", className)} style={style}>
      <View className="tm-image__content" style={calcHeight()}>
        <Image mode={"widthFix"} src={tmSrc} lazyLoad={tmLazy}/>
      </View>
    </View>
  );
}

export default TmImage;
