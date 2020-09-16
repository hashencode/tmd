import "./picker.scss";

import React, { useLayoutEffect, useRef, useState } from "react";

import PickerContext from "./_context";
import { TmList } from "../index";
import classNames from "classnames";

import { isEmpty } from "../_scripts";

interface PropsInterface {
  tmDefaultValue?: number | string | (number | string)[]; // 默认值
  tmDisabled?: boolean; // 禁用
  tmMax?: number; // 最大可选中数量
  tmMultiple?: boolean; // 多选模式
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

function TmPicker(props: PropsInterface) {
  const {
    tmDefaultValue = "",
    tmDisabled = false,
    tmMax = -1,
    tmMultiple = "",
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
    if (tmMultiple) {
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
    } else {
      setActiveKeys([currentValue]);
      updateIsPeak([currentValue]);
      onChange({
        text: hashMap.current.get(currentValue),
        value: currentValue,
      });
    }
  };

  const updateIsPeak = (currentActiveKeys) => {
    if (tmMax > 0 && tmMultiple) {
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
    <TmList
      tmInnerBorder
      tmIndent
      className={classNames(
        "tm-picker",
        { "tm-picker-disabled": tmDisabled },
        className
      )}
      style={style}
    >
      <PickerContext.Provider
        value={{ isPeak, activeKeys, updateActiveKeys, optionInit }}
      >
        {props.children}
      </PickerContext.Provider>
    </TmList>
  );
}

export default TmPicker;
