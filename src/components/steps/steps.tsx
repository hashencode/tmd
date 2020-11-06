import React, { ReactNode } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { colorPrimary, fontColorSecondary } from "../../functions/theme";
import { transformPx } from "../../functions";

export interface stepsProps {
  tmActiveColor?: string; // 激活时字体、图标和连接线的颜色
  tmData: {
    activeIcon?: ReactNode;
    height?: number | string;
    icon?: ReactNode;
    iconSpace?: number | string;
    percent: number;
    text?: string | ReactNode;
  }[]; // 展示数据
  tmValue?: number; // 当前进度
  tmVertical?: boolean; // 垂直显示
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmSteps(props: stepsProps) {
  const {
    tmActiveColor = colorPrimary,
    tmData = [],
    tmValue = 0,
    tmVertical = false,
    className = "",
    style = {},
  } = props;

  // 计算连接线的样式
  const calcConnectionStyle = (index) => {
    const currentItem = tmData[index];
    const { height = 0, iconSpace = 0 } = currentItem;
    const styleObj = {};
    if (tmVertical && height) {
      styleObj["height"] = transformPx(height);
    }
    const spaceValue = transformPx(iconSpace);
    if (iconSpace || iconSpace > 0) {
      styleObj["margin"] = tmVertical
        ? `${spaceValue} ${transformPx(21)}`
        : `0 ${spaceValue}`;
    }

    return styleObj;
  };

  // 计算连接线的样式
  const calcScheduleStyle = (index) => {
    const currentPercent = tmData[index].percent;
    const nextPercent =
      index <= tmData.length - 1 ? tmData[index + 1].percent : 100;
    const translateValue =
      (tmValue - currentPercent) / (nextPercent - currentPercent);
    return {
      backgroundColor: tmActiveColor,
      transform: tmVertical
        ? `translateY(-${(1 - translateValue) * 100}%)`
        : `translateX(-${(1 - translateValue) * 100}%)`,
    };
  };

  return (
    <View
      className={classNames(
        "tm-steps",
        { "tm-steps-vertical": tmVertical },
        className
      )}
      style={style}
    >
      {tmData.map((item, index) => {
        return [
          <View className="tm-steps__item" key={`tm-steps-item-${index}`}>
            {/* 图标 */}
            <View className="tm-steps__icon">
              {/* 根据状态显示图标，激活图标非必传 */}
              {tmValue >= item.percent
                ? item.activeIcon || <View className="tm-steps__icon-active" />
                : item.icon || <View className="tm-steps__icon-inactive" />}
            </View>
            {/* 描述文字 */}
            <View
              className={classNames("tm-steps__text")}
              style={{
                color:
                  tmValue >= item.percent && !React.isValidElement(item.text)
                    ? tmActiveColor
                    : fontColorSecondary,
              }}
            >
              {item.text}
            </View>
          </View>,
          // 连接短线，最后一项隐藏
          index < tmData.length - 1 && (
            <View
              className="tm-steps__connection"
              key={`tm-steps-connection-${index}`}
              style={calcConnectionStyle(index)}
            >
              <View
                className="tm-steps__connection-schedule"
                style={calcScheduleStyle(index)}
              />
            </View>
          ),
        ];
      })}
    </View>
  );
}

export default TmSteps;
