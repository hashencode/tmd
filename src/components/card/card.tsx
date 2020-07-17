import "./card.scss";

import React, {ReactNode} from "react";

import {View} from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmAction?: string | ReactNode; // 右侧操作区域
  tmBorder?: boolean; // 显示边框
  tmBodyStyle?: object; // 自定义内容样式
  tmFooter?: ReactNode; // 自定义底部
  tmFooterStyle?: object; // 自定义底部样式
  tmHead?: ReactNode; // 自定义头部
  tmHeadStyle?: object; // 自定义头部样式
  tmRound?: boolean; // 圆角显示
  tmShadow?: boolean; // 显示阴影
  tmTitle?: string | ReactNode; // 主标题
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

function TmCard(props: PropsInterface) {
  const {
    tmAction = null,
    tmBorder = true,
    tmBodyStyle = {},
    tmFooter = null,
    tmFooterStyle = {},
    tmHead = null,
    tmHeadStyle = {},
    tmRound = false,
    tmShadow = false,
    tmTitle = null,
    className = "",
    style = {},
  } = props;

  return (
    <View
      className={classNames(
        "tm-card",
        {
          "tm-card-shadow": tmShadow,
          "tm-card-round": tmRound,
          "tm-card-bordered": tmBorder,
        },
        className
      )}
      style={style}
    >
      {(tmHead || tmTitle || tmAction) && (
        <View className="tm-card__head" style={tmHeadStyle}>
          <View className="tm-card__title">
            {tmTitle}
            {tmHead}
          </View>
          <View className="tm-card__action">{tmAction}</View>
        </View>
      )}
      <View className="tm-card__body" style={tmBodyStyle}>
        {props.children}
      </View>
      {tmFooter && (
        <View className="tm-card__footer" style={tmFooterStyle}>
          {tmFooter}
        </View>
      )}
    </View>
  );
}

export default TmCard;
