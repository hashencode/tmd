import React, { useLayoutEffect, useRef, useState, ReactNode } from "react";

import classNames from "classnames";
import SelectContext from "./_context";
import { View, ScrollView } from "@tarojs/components";
import { TmDrawer, TmList } from "../../index";

import { isEmpty } from "../../functions";

export interface TmSelectProps {
  tmAllowClear?: boolean; // 单选模式下是否允许双击取消
  tmDisabled?: boolean; // 禁用
  tmMax?: number; // 最大可选中数量
  tmMultiple?: boolean; // 多选模式
  tmOutputWithText?: boolean; // 值的输出附带描述文字
  tmPlaceholder?: string; // 占位符
  tmTitle?: string | ReactNode; // 标题
  tmTriggerClassName?: string; // 触发器类名
  tmValue: number | string | (number | string)[] | undefined; // 当前选中的值
  onChange?: (
    value:
      | string
      | number
      | { text: string; value: number | string }[]
      | { text: string; value: number | string }
      | undefined
  ) => void; // 选项变动回调
  onConfirm?: (
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

function TmSelect(props: TmSelectProps) {
  const {
    tmAllowClear = false,
    tmDisabled = false,
    tmMax = -1,
    tmMultiple = false,
    tmOutputWithText = false,
    tmPlaceholder = "",
    tmTitle = "",
    tmTriggerClassName = "",
    tmValue = "",
    onChange = () => {},
    onConfirm = () => {},
    className = "",
    style = {},
  } = props;

  // 当前激活的选项
  const [activeKeys, setActiveKeys] = useState<(number | string)[]>([]);
  // 是否达到可选择的最大数量
  const [isReachMax, setIsReachMax] = useState<boolean>(false);
  // 抽屉的开合
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  // 用于存储当前操作产生的临时值
  const tempValue = useRef(undefined);
  // 触发器显示文字
  const [triggerText, setTriggerText] = useState("");

  // 哈希表
  const hashMap = useRef(new Map());

  // 初始化选项，读取子组件的 text 和 value
  const optionInit = ({ tmText, tmValue }) => {
    hashMap.current.set(tmValue, tmText);
  };

  // 更新当前激活值
  const updateActiveKeys = ({ currentValue }) => {
    let _newActiveKeys;
    // 判断是否已经有选中
    // 判断单选和多选
    if (tmMultiple) {
      // 多选时
      // 已选中的选项再次点击则取消选择
      if (activeKeys.includes(currentValue)) {
        _newActiveKeys = activeKeys.filter((item) => item !== currentValue);
      } else {
        _newActiveKeys = [...activeKeys, currentValue];
      }
      // 更新激活项和可选最大值
      setActiveKeys(_newActiveKeys);
      updateIsReachMax(_newActiveKeys);
      // 在无任何选中的情况下，返回 undefined
      if (_newActiveKeys.length > 0) {
        const _value = _newActiveKeys.map((value) => {
          return tmOutputWithText
            ? {
                text: hashMap.current.get(value),
                value,
              }
            : value;
        });
        onChange(_value);
        tempValue.current = _value;
      } else {
        onChange(undefined);
        tempValue.current = undefined;
      }
    } else if (activeKeys.indexOf(currentValue) > -1) {
      // 如果是单选，且已经被选中
      if (tmAllowClear) {
        // 如果允许清空，则取消选择
        setActiveKeys([]);
        updateIsReachMax([]);
        onChange(undefined);
        tempValue.current = undefined;
      }
    } else {
      // 单选时
      setActiveKeys([currentValue]);
      updateIsReachMax([currentValue]);
      const _value = tmOutputWithText
        ? {
            text: hashMap.current.get(currentValue),
            value: currentValue,
          }
        : currentValue;
      onChange(_value);
      tempValue.current = _value;
    }
  };

  // 更新是否达到可选择的最大数量
  const updateIsReachMax = (activeKeys) => {
    if (tmMax > 0 && tmMultiple) {
      setIsReachMax(activeKeys.length >= tmMax);
    }
  };

  // 打开抽屉
  const openDrawer = () => {
    if (tmDisabled) return;
    setIsDrawerShow(true);
    // 判断是否存在
    if (isEmpty(tmValue)) {
      // 清空显示数据
      setActiveKeys([]);
      updateIsReachMax([]);
    } else {
      const _value = Array.isArray(tmValue) ? tmValue : [tmValue];
      // 判断传入的值是否为数组，如果不是，则转换成数组
      setActiveKeys(_value);
      updateIsReachMax(_value);
    }
  };

  // 关闭抽屉
  const closeDrawer = () => {
    setIsDrawerShow(false);
  };

  // 确认回调
  const handleConfirm = () => {
    onConfirm(tempValue.current);
    closeDrawer();
  };

  useLayoutEffect(() => {
    // tmValue 变更时更新触发器文字
    const value = Array.isArray(tmValue) ? tmValue : [tmValue];
    const text: string[] = [];
    value.map((item) => {
      const _text = hashMap.current.get(item);
      if (_text) {
        text.push(_text);
      }
    });
    setTriggerText(text.length > 0 ? text.join(",") : "");
  }, [tmValue]);

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
        onMaskClick={closeDrawer}
        onCancel={closeDrawer}
        onConfirm={handleConfirm}
      >
        <ScrollView className={"tm-select__scroll-view"} scrollY>
          <TmList
            tmInnerBorder
            tmIndent
            className={classNames("tm-select__picker")}
          >
            <SelectContext.Provider
              value={{ isReachMax, activeKeys, updateActiveKeys, optionInit }}
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
