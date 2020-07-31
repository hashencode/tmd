import "./button.scss";

import React, { ReactNode } from "react";

import { navigateTo } from "@tarojs/taro";
import { TmLoading } from "../index";
import { View } from "@tarojs/components";
import classNames from "classnames";
import throttle from "lodash/throttle";

interface PropsInterface {
  tmAutoSpace?: boolean; // 在两个汉字时自动添加空格
  tmBlock?: boolean; // 宽度与父组件一致
  tmDanger?: boolean; // 危险按钮
  tmDisabled?: boolean; // 禁止点击状态
  tmGhost?: boolean; // 幽灵按钮，取消背景
  tmHref?: string; // 点击按钮时跳转的链接
  tmIcon?: ReactNode; // 图标
  tmLoading?: boolean; // 载入状态
  tmShadow?: boolean; // 显示阴影
  tmShape?: "circle" | "round" | "rect"; // 按钮外观
  tmSize?: "sm" | "mid" | "lg"; // 按钮大小
  tmThrottle?: number; // 点击事件节流阀（毫秒）
  tmThrottleConfig?: {}; // 节流阀设置
  tmType?: "primary" | "default" | "dashed" | "link"; // 按钮类型
  onClick?: (event?: any) => void; // 点击事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmButton(props: PropsInterface) {
  const {
    tmAutoSpace = true,
    tmBlock = false,
    tmDanger = false,
    tmDisabled = false,
    tmGhost = false,
    tmHref = "",
    tmIcon = null,
    tmLoading = false,
    tmShadow = false,
    tmShape = "rect",
    tmSize = "mid",
    tmThrottle = 500,
    tmThrottleConfig = {},
    tmType = "default",
    onClick = () => {},
    className = "",
    style = {}
  } = props;

  // 按钮点击事件
  const handleButtonClick = throttle(
    event => {
      // 禁止和加载状态下不产生回调
      if (tmDisabled || tmLoading) return false;
      // 如果设置了href则跳转到对应页面
      if (tmHref) {
        navigateTo({ url: tmHref });
      }
      onClick(event);
    },
    tmThrottle,
    tmThrottleConfig
  );

  // 为汉字自动添加间隙
  const textFormat = () => {
    if (
      typeof props.children === "string" &&
      tmAutoSpace &&
      /^[\u4e00-\u9fa5]+$/.test(props.children)
    ) {
      const newChildrenArray = props.children.split("");
      const arrayLength = newChildrenArray.length;
      if (arrayLength === 2) {
        newChildrenArray.splice(1, 0, " ");
        return newChildrenArray.join("");
      } else {
        return props.children;
      }
    } else {
      return props.children;
    }
  };

  return (
    <View
      className={classNames(
        "tm-button",
        `tm-button-${tmType}`,
        `tm-button-${tmSize}`,
        `tm-button-${tmShape}`,
        {
          "tm-button-ghost": tmGhost,
          "tm-button-danger": tmDanger,
          "tm-button-loading": tmLoading,
          "tm-button-disabled": tmDisabled,
          "tm-button-block": tmBlock,
          "tm-button-shadow": tmShadow
        },
        className
      )}
      onClick={handleButtonClick}
      style={style}
    >
      {/*icon显示部分*/}
      {tmLoading ? <TmLoading /> : tmIcon}
      {/*自定义插槽*/}
      {props.children && (
        <View
          className={classNames("tm-button__slot", {
            "tm-button__slot-margin": tmLoading || tmIcon
          })}
        >
          {textFormat()}
        </View>
      )}
    </View>
  );
}

export default TmButton;
