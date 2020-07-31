import "./picker.scss";

import React, { useLayoutEffect, useRef, useState } from "react";

import PickerContext from "./_context";
import { TmList } from "../index";
import classNames from "classnames";

import { isEmpty } from "../_scripts";

interface PropsInterface {
  tmDefaultValue?: number | string | (number | string)[]; // 默认值
  tmDisabled?: boolean; // 禁用
  tmMultiple?: boolean; // 多选模式
  tmValue?: number | string | (number | string)[]; // 当前选中的值
  onChange?: (event: any) => void; // 选项变动回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmPicker(props: PropsInterface) {
  const {
    tmDefaultValue = "",
    tmDisabled = false,
    tmMultiple = "",
    tmValue = "",
    onChange = () => {},
    className = "",
    style = {}
  } = props;

  const [activeKeys, setActiveKeys] = useState<(number | string)[]>([]);

  const hashMap = useRef(new Map());

  const optionInit = ({ tmText, tmValue }) => {
    hashMap.current.set(tmValue, tmText);
  };

  const updateActiveKeys = ({ tmValue }) => {
    let _newActiveKeys;
    // 判断是否已经有选中
    // 判断单选和多选
    if (tmMultiple) {
      if (activeKeys.includes(tmValue)) {
        const _activeKeys = [...activeKeys];
        _activeKeys.splice(_activeKeys.indexOf(tmValue), 1);
        _newActiveKeys = _activeKeys;
      } else {
        _newActiveKeys = [...activeKeys, tmValue];
      }
      setActiveKeys(_newActiveKeys);
      onChange(
        _newActiveKeys.map(value => {
          return {
            text: hashMap.current.get(value),
            value
          };
        })
      );
    } else {
      setActiveKeys([tmValue]);
      onChange({ text: hashMap.current.get(tmValue), tmValue });
    }
  };

  useLayoutEffect(() => {
    const value = tmValue || tmDefaultValue;
    // 判断是否存在
    if (!isEmpty(value)) {
      // 判断是否为数组
      if (Array.isArray(value)) {
        // 数组只有在多选时可用
        if (tmMultiple) setActiveKeys(value);
      } else if (!tmMultiple) {
        // 如果不是数组且不为多选，则作为单选
        setActiveKeys([value]);
      }
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
        value={{ activeKeys, updateActiveKeys, optionInit }}
      >
        {props.children}
      </PickerContext.Provider>
    </TmList>
  );
}

export default TmPicker;
