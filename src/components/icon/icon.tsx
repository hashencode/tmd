import React, { MouseEventHandler, useLayoutEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { transformPx } from "../../functions";

export interface iconProps {
  tmColor?: string; // 图标颜色
  tmPrefix?: string; // 自定义前缀
  tmRotate?: number; // 旋转角度
  tmSize?: number | string; // 图标大小
  tmSpin?: boolean; // 循环旋转
  tmValue: string; // 图标图案
  onClick?: MouseEventHandler; // 点击事件回调
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmIcon(props: iconProps) {
  const {
    tmColor = "",
    tmPrefix = "tmIcon",
    tmRotate = 0,
    tmSize = 0,
    tmSpin = false,
    tmValue,
    onClick = () => {},
    className = "",
    style = {},
  } = props;

  const calcStyle = () => {
    const styleObj = {};
    if (tmSize) {
      styleObj["fontSize"] = transformPx(tmSize);
    }
    if (tmColor) {
      styleObj["color"] = tmColor;
    }
    if (tmRotate) {
      styleObj["transform"] = `rotate(${tmRotate}deg)`;
    }
    setIconStyle(styleObj);
  };

  const [iconStyle, setIconStyle] = useState({});

  const handleClick = (event) => {
    onClick(event);
  };

  useLayoutEffect(() => {
    calcStyle();
  }, [tmSize, tmColor, tmRotate]);

  return (
    <View
      className={classNames(
        "tm-icon",
        `${tmPrefix}`,
        `${tmPrefix}_${tmValue}`,
        {
          "tm-icon-spin": tmSpin,
        },
        className
      )}
      style={{
        ...iconStyle,
        ...style,
      }}
      onClick={handleClick}
    />
  );
}

export default TmIcon;
