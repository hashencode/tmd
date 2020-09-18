import "./switch.scss";

import React, { MouseEventHandler, useLayoutEffect, useState } from "react";

import { TmLoading } from "../index";
import { View } from "@tarojs/components";
import classNames from "classnames";
import throttle from "lodash/throttle";

interface PropsInterface {
  tmChecked?: boolean | null; // 是否选中
  tmDefaultChecked?: boolean | null; // 默认选中状态
  tmDisabled?: boolean; // 禁用
  tmLoading?: boolean; // 加载中
  tmSize?: "lg" | "mid" | "sm"; // 尺寸
  tmThrottle?: number; // 点击事件节流阀（毫秒）
  tmThrottleConfig?: {}; // 节流阀设置
  onClick?: MouseEventHandler; // 点击事件回调
  onChange?: (isChecked?: boolean) => void; // 切换事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmSwitch(props: PropsInterface) {
  const {
    tmChecked = null,
    tmDefaultChecked = null,
    tmDisabled = false,
    tmLoading = false,
    tmSize = "mid",
    tmThrottle = 500,
    tmThrottleConfig = {},
    onClick = () => {},
    onChange = () => {},
    className = "",
    style = {},
  } = props;

  const [isChecked, setIsChecked] = useState(tmDefaultChecked);

  // 判断属性是否设置
  const isAlreadySet = (data) => {
    return typeof data === "boolean";
  };

  const handleClick = throttle(
    (event) => {
      if (tmLoading || tmDisabled || isAlreadySet(tmChecked)) return;
      const _isChecked = !isChecked;
      setIsChecked(_isChecked);
      onChange(_isChecked);
      onClick(event);
    },
    tmThrottle,
    tmThrottleConfig
  );

  useLayoutEffect(() => {
    if (isAlreadySet(tmChecked)) {
      setIsChecked(tmChecked);
    }
  }, [tmChecked]);

  useLayoutEffect(() => {
    if (isAlreadySet(tmDefaultChecked) && !isAlreadySet(tmChecked)) {
      setIsChecked(tmDefaultChecked);
    }
  }, []);

  return (
    <View
      className={classNames(
        "tm-switch",
        `tm-switch-${tmSize}`,
        {
          "tm-switch-checked": isChecked,
          "tm-switch-loading": tmLoading,
          "tm-switch-disabled": tmDisabled || tmLoading,
        },
        className
      )}
      style={style}
      onClick={handleClick}
    >
      <View className="tm-switch__handle">
        {tmLoading && <TmLoading className="tm-switch__loading" />}
      </View>
    </View>
  );
}

export default TmSwitch;
