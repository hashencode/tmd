import "./inputNumber.scss";

import React, { useLayoutEffect, useState } from "react";
import { Input, View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon } from "../index";
import throttle from "lodash/throttle";

interface PropsInterface {
  tmBorder?: boolean; // 显示边框
  tmDigit?: boolean; // 带小数
  tmDisabled?: boolean; // 禁用
  tmFocus?: boolean; // 获取焦点
  tmId?: any; // 唯一id，用于表单校验
  tmMax?: number; // 最大值
  tmMin?: number; // 最小值
  tmSmall?: boolean; // 大输入框
  tmStep?: number; // 步进值
  tmThrottle?: number; // 点击事件节流阀（毫秒）
  tmThrottleConfig?: {}; // 节流阀设置
  tmValue?: number; // value 值
  tmNotEditable?: boolean; // 不允许通过input编辑
  tmPrecision?: number; // 数值精度
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
  onBlur?: (event?: any) => void; // 失焦事件回调
  onChange?: (event?: any) => void; // 输入变化回调
  onConfirm?: (event?: any) => void; // 确认回调
  onFocus?: (event?: any) => void; // 聚焦回调
  onKeyboardHeightChange?: (event?: any) => void; // 键盘高度发生变化回调
}

function TmInputNumber(props: PropsInterface) {
  const {
    tmBorder = false,
    tmDigit = false,
    tmDisabled = false,
    tmNotEditable = false,
    tmFocus = false,
    tmId = "",
    tmMax = 9999,
    tmMin = -9999,
    tmSmall = false,
    tmStep = 1,
    tmThrottle = 500,
    tmThrottleConfig = {},
    tmValue = 1,
    tmPrecision = -1,
    onBlur = () => {},
    onChange = () => {},
    onConfirm = () => {},
    onFocus = () => {},
    onKeyboardHeightChange = () => {},
    className = "",
    style = {}
  } = props;

  const [valueCache, setValueCache] = useState<any>(0);
  const [decreaseEnable, setDecreaseEnable] = useState<boolean>(true);
  const [addEnable, setAddEnable] = useState<boolean>(true);

  // 点击减少
  const handleReduce = throttle(
    event => {
      event.stopPropagation();
      event.preventDefault();
      setValueCache(prevState => {
        const bigNum = 10e5;
        let value =
          prevState <= tmMin
            ? tmMin
            : (prevState * bigNum - tmStep * bigNum) / bigNum;
        onChange(value);
        return value < tmMin ? tmMin : value;
      });
    },
    tmThrottle,
    tmThrottleConfig
  );

  // 点击增加
  const handleAdd = throttle(
    event => {
      event.stopPropagation();
      event.preventDefault();
      setValueCache(prevState => {
        const bigNum = 10e5;
        let value =
          prevState >= tmMax
            ? tmMax
            : (prevState * bigNum + tmStep * bigNum) / bigNum;
        onChange(value);
        return value > tmMax ? tmMax : value;
      });
    },
    tmThrottle,
    tmThrottleConfig
  );

  // 输入时回调
  const handleChange = event => {
    let value = event.detail.value;
    if (value > tmMax) {
      value = tmMax;
    }
    if (value < tmMin) {
      value = tmMin;
    }
    setValueCache(value);
  };

  // 失焦回调
  const handleBlur = event => {
    let value = event.detail.value;
    // 判断是否允许存在小数点
    if (!tmDigit) {
      value = Number.parseInt(value);
    }
    // 判断输入精度
    if (tmPrecision > 0) {
      value = parseFloat(value).toFixed(tmPrecision);
    }
    setValueCache(value);
    onChange(value);
    onBlur(event);
  };

  useLayoutEffect(() => {
    setValueCache(tmValue);
  }, [tmValue]);

  useLayoutEffect(() => {
    setDecreaseEnable(valueCache > tmMin);
    setAddEnable(valueCache < tmMax);
  }, [valueCache]);

  return (
    <View
      className={classNames(
        "tm-input-number",
        tmSmall ? "tm-input-number-sm" : "tm-input-number-mid",
        {
          "tm-input-number-disabled": tmDisabled,
          "tm-input-number-bordered": tmBorder
        },
        className
      )}
      style={style}
    >
      <View
        className={classNames("tm-input-number__prefix", {
          "tm-input-number__prefix-disabled": !decreaseEnable
        })}
        onClick={handleReduce}
      >
        <TmIcon tmValue={"decrease"} />
      </View>
      {/*输入框*/}
      <View className="tm-input-number__content">
        <Input
          disabled={tmDisabled}
          focus={tmFocus}
          id={tmId}
          type={tmDigit ? "digit" : "number"}
          value={valueCache}
          onKeyboardHeightChange={onKeyboardHeightChange}
          onBlur={handleBlur}
          onInput={handleChange}
          onConfirm={onConfirm}
          onFocus={onFocus}
          style={{ pointerEvents: tmNotEditable ? "none" : "auto" }}
        />
      </View>
      <View
        className={classNames("tm-input-number__suffix", {
          "tm-input-number__suffix-disabled": !addEnable
        })}
        onClick={handleAdd}
      >
        <TmIcon tmValue={"add"} />
      </View>
    </View>
  );
}

export default TmInputNumber;
