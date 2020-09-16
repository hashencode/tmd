import "./checkbox.scss";

import React, { useLayoutEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import CheckboxContext from "./_context";
import { isEmpty } from "../_scripts";

interface PropsInterface {
  tmDefaultValue?: number | string | (number | string)[]; // 默认值
  tmDisabled?: boolean; // 禁用
  tmMax?: number; // 最大可选中数量
  tmRadio?: boolean; // 单选模式
  tmSize?: "sm" | "mid" | "lg"; // 尺寸
  tmValue?: number | string | (number | string)[]; // 当前选中的值
  onChange?: (
    value:
      | { text: string; value: number | string }[]
      | { text: string; value: number | string }
  ) => void; // 选项变动回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmCheckbox(props: PropsInterface) {
  const {
    tmDefaultValue = "",
    tmDisabled = false,
    tmMax = -1,
    tmRadio = false,
    tmSize = "mid",
    tmValue = "",
    onChange = () => {},
    className = "",
    style = {},
  } = props;

  const [activeKeys, setActiveKeys] = useState<(number | string)[]>([]);
  const [isPeak, setIsPeak] = useState<boolean>(false);

  const hashMap = useRef(new Map());

  const optionInit = ({ tmText, tmValue }) => {
    hashMap.current.set(tmValue, tmText);
  };

  const updateActiveKeys = ({ currentValue }) => {
    let _newActiveKeys;
    // 判断是否已经有选中
    // 判断单选和多选
    if (tmRadio) {
      setActiveKeys([currentValue]);
      updateIsPeak([currentValue]);
      onChange({
        text: hashMap.current.get(currentValue),
        value: currentValue,
      });
    } else {
      if (activeKeys.includes(currentValue)) {
        const _activeKeys = [...activeKeys];
        _activeKeys.splice(_activeKeys.indexOf(currentValue), 1);
        _newActiveKeys = _activeKeys;
      } else {
        _newActiveKeys = [...activeKeys, currentValue];
      }
      setActiveKeys(_newActiveKeys);
      updateIsPeak(_newActiveKeys);
      onChange(
        _newActiveKeys.map((value) => {
          return {
            text: hashMap.current.get(value),
            value,
          };
        })
      );
    }
  };

  const updateIsPeak = (currentActiveKeys) => {
    if (tmMax > 0) {
      setIsPeak(currentActiveKeys.length >= tmMax);
    }
  };

  useLayoutEffect(() => {
    const value = tmValue || tmDefaultValue;
    // 判断是否存在
    if (!isEmpty(value)) {
      const _value = Array.isArray(value) ? value : [value];
      // 判断传入的值是否为数组，如果不是，则转换成数组
      setActiveKeys(_value);
      updateIsPeak(_value);
    }
  }, [tmDefaultValue, tmValue]);

  return (
    <View
      className={classNames(
        "tm-checkbox",
        { "tm-checkbox-disabled": tmDisabled },
        className
      )}
      style={style}
    >
      <CheckboxContext.Provider
        value={{
          isRadio: tmRadio,
          isPeak,
          tmSize,
          activeKeys,
          updateActiveKeys,
          optionInit,
        }}
      >
        {props.children}
      </CheckboxContext.Provider>
    </View>
  );
}

export default TmCheckbox;
