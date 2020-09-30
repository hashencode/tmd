import React, { useLayoutEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import CheckboxContext from "./_context";
import { isEmpty } from "../../functions";

interface PropsInterface {
  tmAllowClear?: boolean; // 单选模式下是否允许双击取消
  tmDefaultValue?: number | string | (number | string)[]; // 默认值
  tmDisabled?: boolean; // 禁用
  tmMax?: number; // 最大可选中数量
  tmOutputWithText?: boolean; // 值的输出附带描述文字
  tmRadio?: boolean; // 单选模式
  tmSize?: "sm" | "mid" | "lg"; // 尺寸
  tmValue?: number | string | (number | string)[] | undefined; // 当前选中的值
  onChange?: (
    value:
      | string
      | number
      | { text: string; value: number | string }[]
      | { text: string; value: number | string }
      | undefined
  ) => void; // 选项变动回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmCheckbox(props: PropsInterface) {
  const {
    tmAllowClear = false,
    tmDefaultValue = "",
    tmDisabled = false,
    tmMax = -1,
    tmOutputWithText = false,
    tmRadio = false,
    tmSize = "mid",
    tmValue = "",
    onChange = () => {},
    className = "",
    style = {},
  } = props;

  const [activeKeys, setActiveKeys] = useState<(number | string)[]>([]);
  const [isReachMax, setIsReachMax] = useState<boolean>(false);

  const hashMap = useRef(new Map());

  const optionInit = ({ tmText, tmValue }) => {
    hashMap.current.set(tmValue, tmText);
  };

  const updateActiveKeys = ({ currentValue }) => {
    // 当设置有 tmValue 值时，视作完全控制，用户行为不会触发更新操作
    if ("tmValue" in props) return;
    let _newActiveKeys;
    // 判断单选和多选
    if (tmRadio) {
      if (activeKeys.indexOf(currentValue) > -1) {
        if (tmAllowClear) {
          setActiveKeys([]);
          updateIsReachMax([]);
          onChange(undefined);
        }
      } else {
        setActiveKeys([currentValue]);
        updateIsReachMax([currentValue]);
        onChange(
          tmOutputWithText
            ? {
                text: hashMap.current.get(currentValue),
                value: currentValue,
              }
            : currentValue
        );
      }
    } else {
      // 多选模式
      if (activeKeys.includes(currentValue)) {
        const _activeKeys = [...activeKeys];
        _activeKeys.splice(_activeKeys.indexOf(currentValue), 1);
        _newActiveKeys = _activeKeys;
      } else {
        _newActiveKeys = [...activeKeys, currentValue];
      }
      // 更新激活项和可选最大值
      setActiveKeys(_newActiveKeys);
      updateIsReachMax(_newActiveKeys);
      // 在无任何选中的情况下，返回 undefined
      if (_newActiveKeys.length > 0) {
        onChange(
          _newActiveKeys.map((value) => {
            return tmOutputWithText
              ? {
                  text: hashMap.current.get(value),
                  value,
                }
              : value;
          })
        );
      } else {
        onChange(undefined);
      }
    }
  };

  const updateIsReachMax = (currentActiveKeys) => {
    // 设置了最大可选项且不为单选
    if (tmMax > 0 && !tmRadio) {
      setIsReachMax(currentActiveKeys.length >= tmMax);
    }
  };

  const valueFormat = (value) => {
    // 判断是否存在
    if (isEmpty(value)) {
      setActiveKeys([]);
      updateIsReachMax([]);
    } else {
      const _value = Array.isArray(value) ? value : [value];
      // 判断传入的值是否为数组，如果不是，则转换成数组
      setActiveKeys(_value);
      updateIsReachMax(_value);
    }
  };

  useLayoutEffect(() => {
    valueFormat(tmValue);
  }, [tmValue]);

  useLayoutEffect(() => {
    // 在 tmValue 为空且 tmDefaultValue 不为空时，设置默认值
    if (isEmpty(tmValue) && !isEmpty(tmDefaultValue)) {
      valueFormat(tmDefaultValue);
    }
  }, []);

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
          isReachMax,
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
