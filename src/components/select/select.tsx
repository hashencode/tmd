import React, { useLayoutEffect, useRef, useState, ReactNode } from "react";

import classNames from "classnames";
import SelectContext from "./_context";
import { View, ScrollView } from "@tarojs/components";
import { TmDrawer, TmList } from "../../index";

import { isEmpty, typeCheck } from "../../functions";

export interface TmSelectProps {
  tmAllowClear?: boolean; // 单选模式下是否允许双击取消
  tmDefaultValue?: number | string | (number | string)[]; // 默认值
  tmDisabled?: boolean; // 禁用
  tmMax?: number; // 最大可选中数量
  tmMultiple?: boolean; // 多选模式
  tmOutputWithText?: boolean; // 值的输出附带描述文字
  tmPlaceholder?: string; // 占位符
  tmTitle?: string | ReactNode; // 标题
  tmTriggerClassName?: string; // 触发器类名
  tmValue?: number | string | (number | string)[]; // 当前选中的值
  onCancel?: () => void; // 取消回调
  onChange?: (
    value:
      | string
      | number
      | { text: string; value: number | string }[]
      | { text: string; value: number | string }
  ) => void; // 选项变动回调
  onConfirm?: (
    value:
      | string
      | number
      | { text: string; value: number | string }[]
      | { text: string; value: number | string }
  ) => void; // 确认回调
  onShow?: () => void; // 抽屉显示回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmSelect(props: TmSelectProps) {
  const {
    tmAllowClear = false,
    tmDefaultValue = "",
    tmDisabled = false,
    tmMax = -1,
    tmMultiple = false,
    tmOutputWithText = false,
    tmPlaceholder = "",
    tmTitle = "",
    tmTriggerClassName = "",
    tmValue = "",
    onCancel = () => {},
    onChange = () => {},
    onConfirm = () => {},
    onShow = () => {},
    className = "",
    style = {},
  } = props;

  // 已确定激活的选项
  const [selectedValues, setSelectedValues] = useState<(number | string)[]>([]);
  // 当前操作的未确定的激活选项
  const [tempSelectedValues, setTempSelectedValues] = useState<
    (number | string)[]
  >([]);
  // 是否达到可选择的最大数量
  const [isReachMax, setIsReachMax] = useState<boolean>(false);
  // 抽屉的开合
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  // 用于存储当前操作产生的临时值
  const realTimeValue = useRef<any>("");
  // 触发器显示文字
  const [triggerText, setTriggerText] = useState("");
  // 用于存储选项信息的哈希表
  const hashMap = useRef(new Map());

  // 初始化选项，读取子组件的 text 和 value
  const optionInit = ({ tmText, tmValue }) => {
    hashMap.current.set(tmValue, tmText);
  };

  // 更新当前激活值
  const updateSelectValues = ({ currentValue }) => {
    let _newSelectedValues;
    // 判断是否已经有选中
    // 判断单选和多选
    if (tmMultiple) {
      // 多选时
      // 已选中的选项再次点击则取消选择
      if (tempSelectedValues.includes(currentValue)) {
        _newSelectedValues = tempSelectedValues.filter(
          (item) => item !== currentValue
        );
      } else {
        _newSelectedValues = [...tempSelectedValues, currentValue];
      }
      // 在无任何选中的情况下，返回空数组
      if (_newSelectedValues.length > 0) {
        const _value = _newSelectedValues.map((value) => {
          return tmOutputWithText
            ? {
                text: hashMap.current.get(value),
                value,
              }
            : value;
        });
        onChange(_value);
        realTimeValue.current = _value;
      } else {
        onChange([]);
        realTimeValue.current = [];
      }
      // 当设置有 tmValue 值时，视作完全控制，用户行为不会触发更新操作，只会触发 onChange 回调
      if ("tmValue" in props) return;
      setTempSelectedValues(_newSelectedValues);
      // 更新激活项和可选最大值
      updateIsReachMax(_newSelectedValues);
    } else if (tempSelectedValues.indexOf(currentValue) > -1) {
      // 如果是单选，且已经被选中
      if (tmAllowClear) {
        // 如果允许清空，则取消选择
        onChange("");
        realTimeValue.current = "";
        if ("tmValue" in props) return;
        setTempSelectedValues([]);
        updateIsReachMax([]);
      }
    } else {
      // 单选时
      const _value = tmOutputWithText
        ? {
            text: hashMap.current.get(currentValue),
            value: currentValue,
          }
        : currentValue;
      onChange(_value);
      realTimeValue.current = _value;
      if ("tmValue" in props) return;
      setTempSelectedValues([currentValue]);
      updateIsReachMax([currentValue]);
    }
  };

  // 更新是否达到可选择的最大数量
  const updateIsReachMax = (tempSelectedValues) => {
    if (tmMax > 0 && tmMultiple) {
      setIsReachMax(tempSelectedValues.length >= tmMax);
    }
  };

  // 打开抽屉
  const openDrawer = () => {
    if (tmDisabled) return;
    setIsDrawerShow(true);
    onShow();
  };

  // 关闭抽屉
  const handleCancel = () => {
    // 取消回调
    onCancel();
    // 关闭抽屉
    setIsDrawerShow(false);
    // 重置临时选中的值为确认选中的值
    setTempSelectedValues(selectedValues);
  };

  // 确认回调
  const handleConfirm = () => {
    // 确认回调
    onConfirm(realTimeValue.current);
    // 关闭抽屉
    setIsDrawerShow(false);
    if ("tmValue" in props) return;
    // 更新当前被选中的值
    setSelectedValues(realTimeValue.current);
    // 更新触发器文字
    updateTriggerText(realTimeValue.current);
  };

  // 更新触发器文字
  const updateTriggerText = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    const text: string[] = [];
    if (valueArray.length <= 0) return setTriggerText("");
    valueArray.map((item) => {
      const _text = hashMap.current.get(item);
      if (_text) {
        text.push(_text);
      }
    });
    setTriggerText(text.length > 0 ? text.join(",") : "");
  };

  // 处理传入的 tmValue 值和 tmDefaultValue
  const valueFormat = (value) => {
    // 判断是否存在
    if (isEmpty(value)) {
      setSelectedValues([]);
      setTempSelectedValues([]);
      updateIsReachMax([]);
      updateTriggerText("");
    } else {
      if (tmMultiple) {
        // 多选模式
        if (typeCheck({ value, type: "Array" })) {
          setSelectedValues(value);
          setTempSelectedValues(value);
          updateIsReachMax(value);
          updateTriggerText(value);
        } else {
          console.warn(
            "Select, in multi-select mode, the value of tmValue or tmDefaultValue should be an array"
          );
        }
      } else {
        // 单选模式
        if (typeCheck({ value, type: "Array" })) {
          console.warn(
            "Select, in single-select mode, the value of tmValue or tmDefaultValue should be a string or number"
          );
        } else {
          setSelectedValues([value]);
          setTempSelectedValues([value]);
          updateIsReachMax([value]);
          updateTriggerText([value]);
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
    <View className={classNames("tm-select", className)} style={style}>
      <View
        className={classNames(
          "tm-select__trigger",
          {
            "tm-select__trigger-disabled": tmDisabled,
            "tm-select__trigger-placeholder": !triggerText,
          },
          tmTriggerClassName
        )}
        onClick={openDrawer}
      >
        {triggerText || tmPlaceholder || ""}
      </View>
      <TmDrawer
        tmTitle={tmTitle}
        tmShow={isDrawerShow}
        onMaskClick={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <ScrollView className={"tm-select__scroll-view"} scrollY>
          <TmList
            tmInnerBorder
            tmIndent
            className={classNames("tm-select__picker")}
          >
            <SelectContext.Provider
              value={{
                isReachMax,
                tempSelectedValues,
                updateSelectValues,
                optionInit,
              }}
            >
              {props.children}
            </SelectContext.Provider>
          </TmList>
        </ScrollView>
      </TmDrawer>
    </View>
  );
}

export default TmSelect;
