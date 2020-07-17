import "./icon.scss";
import "../_style/iconfont.scss";

import React, {useLayoutEffect, useState} from "react";

import {View} from "@tarojs/components";
import classNames from "classnames";
import {sizeTransform} from "../_scripts";

interface PropsInterface {
  tmColor?: string; // 图标颜色
  tmPrefix?: string; // 自定义前缀
  tmRotate?: number; // 旋转角度
  tmSize?: number | string; // 图标大小
  tmSpin?: boolean; // 循环旋转
  tmValue: string; // 图标图案
  onClick?: (event?: any) => void; // 点击事件
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

function TmIcon(props: PropsInterface) {
  const {
    tmColor = "",
    tmPrefix = "tmIcon",
    tmRotate = 0,
    tmSize = 0,
    tmSpin = false,
    tmValue,
    onClick = () => {
    },
    className = "",
    style = {},
  } = props;

  const calcStyle = () => {
    const styleObj = {};
    if (tmSize) {
      styleObj["fontSize"] = sizeTransform(tmSize);
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
      onClick={onClick}
    />
  );
}

export default TmIcon;
