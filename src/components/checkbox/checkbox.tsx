import React, { useLayoutEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import CheckboxContext from "./_context";
import { isEmpty } from "../../functions";
import { typeCheck } from "../../functions";

export interface checkboxProps {
  tmAllowClear?: boolean; // 单选模式下是否允许双击取消
  tmDefaultValue?: number | string | (number | string)[]; // 默认值
  tmDisabled?: boolean; // 禁用
  tmMax?: number; // 最大可选中数量
  tmOutputWithText?: boolean; // 值的输出附带描述文字
  tmRadio?: boolean; // 单选模式
  tmSize?: "sm" | "mid" | "lg"; // 尺寸
  tmValue?: number | string | (number | string)[]; // 当前选中的值
  onChange?: (
    value:
      | string
      | number
      | { text: string; value: number | string }[]
      | { text: string; value: number | string }
  ) => void; // 选项变动回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmCheckbox(props: checkboxProps) {
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

  // 当前选中的值
  const [checkedValues, setCheckedValues] = useState<(number | string)[]>([]);
  // 是否达到最大可选数量
  const [isReachMax, setIsReachMax] = useState<boolean>(false);
  // 用于存储选项信息的哈希表
  const hashMap = useRef(new Map());

  // 选项初始化，读取子组件的 text 和 value
  const optionInit = ({ tmText, tmValue }) => {
    hashMap.current.set(tmValue, tmText);
  };

  // 更新当前选中的值
  const updateCheckedValues = ({ currentValue }) => {
    let _newCheckedValues;
    // 判断单选和多选
    if (tmRadio) {
      if (checkedValues.indexOf(currentValue) > -1) {
        if (tmAllowClear) {
          onChange("");
          // 当设置有 tmValue 值时，视作完全控制，用户行为不会触发更新操作，只会触发 onChange 回调
          if ("tmValue" in props) return;
          setCheckedValues([]);
          updateIsReachMax([]);
        }
      } else {
        onChange(
          tmOutputWithText
            ? {
                text: hashMap.current.get(currentValue),
                value: currentValue,
              }
            : currentValue
        );
        if ("tmValue" in props) return;
        setCheckedValues([currentValue]);
        updateIsReachMax([currentValue]);
      }
    } else {
      // 多选模式
      if (checkedValues.includes(currentValue)) {
        const _checkedValues = [...checkedValues];
        _checkedValues.splice(_checkedValues.indexOf(currentValue), 1);
        _newCheckedValues = _checkedValues;
      } else {
        _newCheckedValues = [...checkedValues, currentValue];
      }
      // 在无任何选中的情况下，返回空数组
      if (_newCheckedValues.length > 0) {
        onChange(
          _newCheckedValues.map((value) => {
            return tmOutputWithText
              ? {
                  text: hashMap.current.get(value),
                  value,
                }
              : value;
          })
        );
      } else {
        onChange([]);
      }
      if ("tmValue" in props) return;
      // 更新激活项和可选最大值
      setCheckedValues(_newCheckedValues);
      updateIsReachMax(_newCheckedValues);
    }
  };

  // 更新是否达到最大值的状态
  const updateIsReachMax = (currentCheckedValues) => {
    // 设置了最大可选项且不为单选
    if (tmMax > 0 && !tmRadio) {
      setIsReachMax(currentCheckedValues.length >= tmMax);
    }
  };

  // 处理传入的 tmValue 值和 tmDefaultValue
  const valueFormat = (value) => {
    // 判断是否存在
    if (isEmpty(value)) {
      setCheckedValues([]);
      updateIsReachMax([]);
    } else {
      if (tmRadio) {
        // 单选模式
        if (typeCheck({ value, type: "Array" })) {
          console.warn(
            "Checkbox, in single-select mode, the value of tmValue or tmDefaultValue should be a string or number"
          );
        } else {
          setCheckedValues([value]);
          updateIsReachMax([value]);
        }
      } else {
        // 多选模式
        if (typeCheck({ value, type: "Array" })) {
          setCheckedValues(value);
          updateIsReachMax(value);
        } else {
          console.warn(
            "Checkbox, in multi-select mode, the value of tmValue or tmDefaultValue should be an array"
          );
        }
      }
    }
  };

  // 监听 tmValue 的改变
  useLayoutEffect(() => {
    valueFormat(tmValue);
  }, [tmValue]);

  // 初次渲染时设置 tmDefaultValue
  useLayoutEffect(() => {
    // 在 tmValue 为空且 tmDefaultValue 不为空时，设置默认值
    if ("tmValue" in props || isEmpty(tmDefaultValue)) return;
    valueFormat(tmDefaultValue);
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
          checkedValues,
          updateCheckedValues,
          optionInit,
        }}
      >
        {props.children}
      </CheckboxContext.Provider>
    </View>
  );
}

export default TmCheckbox;
