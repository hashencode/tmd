import "./notice.scss";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import { TmIcon } from "../index";
import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmAutoClose?: number; // 自动关闭毫秒数
  tmCloseable?: boolean; // 允许关闭
  tmMotion?: boolean; // 是否滚动播放
  tmPrefix?: string | ReactNode; // 自定义前缀
  tmRound?: boolean; // 是否圆角显示
  tmSuffix?: string | ReactNode; // 自定义后缀
  tmType?: "default" | "info" | "success" | "warning" | "danger"; // 通知类型
  onClose?: () => void; // 关闭事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmTag(props: PropsInterface) {
  const {
    tmAutoClose = 0,
    tmCloseable = false,
    tmMotion = false,
    tmPrefix = null,
    tmRound = false,
    tmSuffix = null,
    tmType = "default",
    onClose = () => {},
    className = "",
    style = {},
  } = props;

  const closeTimer = useRef<any>(0);
  const [isVisible, setIsVisible] = useState(true);

  // 关闭按钮点击事件
  const handleSuffixClick = () => {
    if (tmCloseable) {
      setIsVisible(false);
      onClose();
    }
  };

  useEffect(() => {
    if (tmAutoClose) {
      closeTimer.current = setTimeout(() => {
        setIsVisible(false);
      }, tmAutoClose);
    }
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <View
      className={classNames(
        "tm-notice",
        `tm-notice-${tmType}`,
        {
          "tm-notice-tmMotion": tmMotion,
          "tm-notice-round": tmRound,
          "tm-notice-visible": isVisible,
        },
        className
      )}
      style={style}
    >
      <View className="tm-notice__prefix">{tmPrefix}</View>
      <View className="tm-notice__text">
        <View
          className={classNames("tm-notice__slot", {
            "tm-notice__slot-motion": tmMotion,
          })}
        >
          {props.children}
        </View>
      </View>
      <View className="tm-notice__suffix">
        {tmSuffix}
        {tmCloseable && (
          <TmIcon
            onClick={handleSuffixClick}
            className="tm-notice__suffix-close"
            tmValue={"close"}
          />
        )}
      </View>
    </View>
  );
}

export default TmTag;
