import "./listItem.scss";

import React, { ReactNode, useContext } from "react";

import ListContext from "./_context";
import { navigateTo } from "@tarojs/taro";
import { TmIcon } from "../index";
import { View } from "@tarojs/components";
import classNames from "classnames";
import throttle from "lodash/throttle";

interface PropsInterface {
  tmAction?: string | ReactNode; // 右侧操作
  tmDisabled?: boolean; // 是否禁用
  tmHref?: string; // 跳转链接
  tmImage?: ReactNode; // 左侧图像
  tmShowArrow?: boolean; // 显示右侧箭头
  tmSubtitle?: string | ReactNode; // 二级标题
  tmThrottle?: number; // 点击事件节流阀（毫秒）
  tmThrottleConfig?: {}; // 节流阀设置
  tmTitle?: string | ReactNode; // 标题
  TmTitleAlignTop?: boolean; // 标题顶端对齐
  onClick?: () => void; // 点击事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

function TmListItem(props: PropsInterface) {
  const {
    tmAction = null,
    tmHref = "",
    tmDisabled = false,
    tmImage = null,
    tmShowArrow = false,
    tmSubtitle = "",
    tmThrottle = 500,
    tmThrottleConfig = {},
    tmTitle = "",
    TmTitleAlignTop = false,
    onClick = () => {},
    className = "",
    style = {}
  } = props;

  const handleClick = throttle(
    event => {
      event.stopPropagation();
      if (tmDisabled) return false;
      if (tmHref) {
        navigateTo({ url: tmHref });
      }
      onClick();
    },
    tmThrottle,
    tmThrottleConfig
  );

  const parentContext = useContext(ListContext);

  return (
    <View
      className={classNames(
        "tm-list-item",
        {
          "tm-list-item-disabled": tmDisabled,
          "tm-list-item-link": tmHref,
          "tm-list-item-has-image": tmImage,
          "tm-list-item-indent": parentContext.tmIndent,
          "tm-list-item-bordered": parentContext.tmInnerBorder
        },
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {tmImage && <View className="tm-list-item__image">{tmImage}</View>}
      <View className={"tm-list-item__content"}>
        {(tmTitle || tmSubtitle) && (
          <View
            className={classNames("tm-list-item__head", {
              "tm-list-item__head-top": TmTitleAlignTop
            })}
          >
            <View className="tm-list-item__title">{tmTitle}</View>
            <View className="tm-list-item__subtitle">{tmSubtitle}</View>
          </View>
        )}

        <View className="tm-list-item__slot">{props.children}</View>
        <View className="tm-list-item__action">{tmAction}</View>
        {tmShowArrow && (
          <TmIcon
            className="tm-list-item__arrow"
            tmValue={"jiantou_you"}
            tmSize={32}
          />
        )}
      </View>
    </View>
  );
}

export default TmListItem;
