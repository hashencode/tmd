import React, { useEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { backgroundDefault, colorPrimary } from "../../functions/theme";

interface PropsInterface {
  tmShape?: "line" | "circle"; // 进度条外形
  tmValue?: number; // 进度值
  tmBarColor?: "string"; // 进度条颜色
  tmBackgroundColor?: "string"; // 背景色
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmProgress(props: PropsInterface) {
  const {
    tmShape = "line",
    tmValue = 0,
    tmBarColor = colorPrimary,
    tmBackgroundColor = backgroundDefault,
    className = "",
    style = {},
  } = props;

  const [barStyle, setBarStyle] = useState(`background:${tmBackgroundColor}`);
  const [slotStyle, setSlotStyle] = useState(
    tmShape === "line" ? `background:${tmBarColor}` : ""
  );

  useEffect(() => {
    if (tmShape === "line") {
      // 条状进度条
      if (tmValue <= 0) {
        setSlotStyle(
          `background:${tmBarColor};transform: translate3d(0, 0, 0)`
        );
      } else if (tmValue >= 100) {
        setSlotStyle(
          `background:${tmBarColor};transform: translate3d(100%, 0, 0)`
        );
      } else {
        setSlotStyle(
          `background:${tmBarColor};transform: translate3d(${tmValue}%, 0, 0)`
        );
      }
    } else {
      // 圆环进度条
      // 排除大于100小于0的情况
      if (tmValue <= 0) {
        setBarStyle(
          `background:linear-gradient(-90deg, ${tmBackgroundColor} 50%, transparent 50%), linear-gradient(-90deg, ${tmBarColor} 50%, ${tmBackgroundColor} 50%);`
        );
      } else if (tmValue >= 100) {
        setBarStyle(
          `background:linear-gradient(-90deg, ${tmBarColor} 50%, transparent 50%), linear-gradient(90deg, ${tmBarColor} 50%, ${tmBackgroundColor} 50%)`
        );
      } else if (tmValue <= 50) {
        setBarStyle(
          `background:linear-gradient(${
            (tmValue / 25 - 1) * 90
          }deg, ${tmBackgroundColor} 50%, transparent 50%), linear-gradient(-90deg, ${tmBarColor} 50%, ${tmBackgroundColor} 50%);`
        );
      } else {
        setBarStyle(
          `background:linear-gradient(-90deg, ${tmBarColor} 50%, transparent 50%), linear-gradient(${
            (tmValue / 25 - 3) * 90
          }deg, ${tmBarColor} 50%, ${tmBackgroundColor} 50%)`
        );
      }
    }
  }, [tmValue]);

  return (
    <View
      className={classNames("tm-progress", `tm-progress-${tmShape}`, className)}
      style={style}
    >
      {/* 填充颜色部分 */}
      <View className="tm-progress__bar" style={barStyle}>
        {/* 自定义内容 */}
        <View className="tm-progress__slot" style={slotStyle}>
          {props.children}
        </View>
      </View>
    </View>
  );
}

export default TmProgress;
