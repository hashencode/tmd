import "./space.scss";

import React, {useLayoutEffect, useState} from "react";
import {spaceLg, spaceMid, spaceSm} from "../_style/theme";

import {View} from "@tarojs/components";
import classNames from "classnames";
import {transformPx} from "../_scripts";

interface PropsInterface {
  tmAlign?: "flex-start" | "center" | "flex-end" | "baseline"; // 垂直对齐方式
  tmSize?: "sm" | "mid" | "lg" | number; // 间距大小
  tmVertical?: boolean; // 间距方向
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmSpace(props: PropsInterface) {
  const {
    tmAlign = "center",
    tmSize = "mid",
    tmVertical = false,
    className = "",
    style
  } = props;

  const [marginStyle, setMarginStyle] = useState({});

  const calcMarginValue = () => {
    const marginValueObj = {
      sm: spaceSm,
      mid: spaceMid,
      lg: spaceLg
    };
    let marginValue =
      typeof tmSize === "string"
        ? transformPx(marginValueObj[tmSize])
        : transformPx(tmSize);
    setMarginStyle({
      [tmVertical ? "marginBottom" : "marginRight"]: marginValue
    });
  };

  useLayoutEffect(() => {
    calcMarginValue();
  }, [tmSize]);

  return (
    <View
      className={classNames(
        "tm-space",
        {
          "tm-space-vertical": tmVertical
        },
        className
      )}
      style={{
        alignItems: tmAlign,
        ...style
      }}
    >
      {props.children &&
      React.Children.map(props.children, (child, index) => (
        <View
          className="tm-space__item"
          style={index === props.children.length - 1 ? "" : marginStyle}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

export default TmSpace;
