import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";

export interface skeletonProps {
  tmAmount?: number; // 显示数量
  tmShowImage?: boolean; // 是否显示图片
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmSkeleton(props: skeletonProps) {
  const {
    tmAmount = 1,
    tmShowImage = false,
    className = "",
    style = {},
  } = props;

  return (
    <View className={classNames("tm-skeleton", className)} style={style}>
      {Array(tmAmount)
        .fill("")
        .map((_item, index) => {
          return (
            <View
              className="tm-skeleton__item"
              key={`tm-skeleton-item-${index}`}
            >
              {tmShowImage && <View className="tm-skeleton__image" />}
              <View className="tm-skeleton__text">
                <View className="tm-skeleton__text-item" />
                <View className="tm-skeleton__text-item" />
                <View className="tm-skeleton__text-item" />
                <View className="tm-skeleton__text-item" />
              </View>
            </View>
          );
        })}
    </View>
  );
}

export default TmSkeleton;
