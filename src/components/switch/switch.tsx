import React, { MouseEventHandler, useLayoutEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import throttle from "lodash/throttle";
import { TmLoading } from "../../index";
import { typeCheck } from "../../functions";

export interface switchProps {
  tmChecked?: boolean; // 是否选中
  tmDefaultChecked?: boolean; // 默认选中状态
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

function TmSwitch(props: switchProps) {
  const {
    tmChecked = false,
    tmDefaultChecked = false,
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

  // 是否选中
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // 处理点击事件
  const handleClick = throttle(
    (event) => {
      const _isChecked = !isChecked;
      onChange(_isChecked);
      onClick(event);
      // 当设置有 tmChecked 值时，视作完全控制，用户行为不会触发更新操作，只会触发 onChange 和 onClick 回调
      if (tmLoading || tmDisabled || "tmChecked" in props) return;
      setIsChecked(_isChecked);
    },
    tmThrottle,
    tmThrottleConfig
  );

  // 监听 tmChecked 的改变
  useLayoutEffect(() => {
    if (!typeCheck({ value: tmChecked, type: "Boolean" }))
      return console.warn("Switch, the value of tmChecked should be a boolean");
    setIsChecked(tmChecked);
  }, [tmChecked]);

  // 初次渲染时设置 tmDefaultChecked
  useLayoutEffect(() => {
    if ("tmChecked" in props) return;
    if (!typeCheck({ value: tmDefaultChecked, type: "Boolean" }))
      return console.warn(
        "Switch, the value of tmDefaultChecked should be a boolean"
      );
    setIsChecked(tmDefaultChecked);
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
