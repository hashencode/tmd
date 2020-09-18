import "./textarea.scss";

import React, { ReactNode, useLayoutEffect, useState } from "react";
import { Textarea, View } from "@tarojs/components";
import classNames from "classnames";
import { CommonEventFunction } from "@tarojs/components/types/common";
import { TmIcon } from "../index";

interface PropsInterface {
  tmAllowClear?: boolean; // 允许清空
  tmBorder?: boolean; // 显示边框
  tmDisabled?: boolean; // 禁用
  tmFooter?: string | ReactNode; // 自定义底部
  tmHeader?: string | ReactNode; // 自定义头部
  tmId: string; // 唯一id，用于表单校验
  tmMaxlength?: number; // 最大字符数
  tmPlaceholder?: string; // placeholder 值
  tmShowCount?: boolean; // 显示统计
  tmValue?: string; // value值
  tmWxAdjustPosition?: boolean; // 键盘弹起时，是否自动上推页面
  tmWxAutoHeight?: boolean; // 自动高度
  tmWxCursor?: number; // 指定focus时的光标位置
  tmWxCursorSpacing?: 0; // 指定光标与键盘的距离
  tmWxDisableDefaultPadding?: boolean; // 是否去掉 iOS 下的默认内边距
  tmWxFixed?: boolean; // 在fixed区域内时设置
  tmWxFocus?: boolean; // 聚焦
  tmWxHoldKeyboard?: boolean; // focus时，点击页面的时候不收起键盘
  tmWxPlaceholderClass?: string; // placeholder类名
  tmWxPlaceholderStyle?: string; // placeholder样式
  tmWxSelectionEnd?: number; // 光标结束位置，自动聚集时有效
  tmWxSelectionStart?: number; // 光标起始位置，自动聚集时有效
  tmWxShowConfirmBar?: boolean; //显示键盘上方带有”完成“按钮那一栏
  onFocus?: CommonEventFunction; // 聚焦回调
  onBlur?: CommonEventFunction; // 失焦事件回调
  onLineChange?: CommonEventFunction; // 输入框行数变化时回调
  onChange?: (value?: string) => void; // 输入变化回调
  onConfirm?: CommonEventFunction; // 确认回调
  onWxKeyboardHeightChange?: CommonEventFunction; // 键盘高度发生变化回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmTextarea(props: PropsInterface) {
  const {
    tmAllowClear = false,
    tmBorder = false,
    tmDisabled = false,
    tmFooter = null,
    tmHeader = null,
    tmId = "",
    tmMaxlength = -1,
    tmPlaceholder = "",
    tmShowCount = false,
    tmValue = "",
    tmWxAdjustPosition = true,
    tmWxAutoHeight = false,
    tmWxCursor = 0,
    tmWxCursorSpacing = 0,
    tmWxDisableDefaultPadding = true,
    tmWxFixed = false,
    tmWxFocus = false,
    tmWxHoldKeyboard = true,
    tmWxPlaceholderClass = "",
    tmWxPlaceholderStyle = "",
    tmWxSelectionEnd = -1,
    tmWxSelectionStart = -1,
    tmWxShowConfirmBar = true,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onLineChange = () => {},
    onConfirm = () => {},
    onWxKeyboardHeightChange = () => {},
    className = "",
    style = {},
  } = props;

  const [stringLength, setStringLength] = useState(0);
  const [valueCache, setValueCache] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  // 清空输入
  const handleClear = () => {
    setValueCache("");
    setStringLength(0);
    setIsFocus(true);
    onChange("");
  };

  // 输入时回调
  const handleInput = (event) => {
    const value = event.detail.value;
    setValueCache(value);
    setStringLength(value.length);
    onChange(value);
  };

  useLayoutEffect(() => {
    setValueCache(tmValue);
    setStringLength(tmValue.length);
  }, [tmValue]);

  useLayoutEffect(() => {
    setIsFocus(tmWxFocus);
  }, [tmWxFocus]);

  return (
    <View
      className={classNames(
        "tm-textarea",
        { "tm-textarea-bordered": tmBorder },
        className
      )}
      style={style}
    >
      {/*头部*/}
      {tmHeader}
      {/*输入主体*/}
      <Textarea
        id={tmId}
        maxlength={tmMaxlength}
        disabled={tmDisabled}
        adjustPosition={tmWxAdjustPosition}
        cursor={tmWxCursor}
        cursorSpacing={tmWxCursorSpacing}
        holdKeyboard={tmWxHoldKeyboard}
        placeholder={tmPlaceholder}
        placeholderClass={tmWxPlaceholderClass}
        placeholderStyle={tmWxPlaceholderStyle}
        selectionEnd={tmWxSelectionEnd}
        selectionStart={tmWxSelectionStart}
        showConfirmBar={tmWxShowConfirmBar}
        autoHeight={tmWxAutoHeight}
        disableDefaultPadding={tmWxDisableDefaultPadding}
        focus={isFocus}
        value={valueCache}
        fixed={tmWxFixed}
        onInput={handleInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onLineChange={onLineChange}
        onConfirm={onConfirm}
        onKeyboardHeightChange={onWxKeyboardHeightChange}
      />
      {/*底部*/}
      <View className="tm-textarea__footer">
        {/*清空按钮*/}
        {tmAllowClear && valueCache.length > 0 && (
          <TmIcon
            className="tm-textarea__clear-btn"
            tmValue={"error_fill"}
            onClick={handleClear}
          />
        )}
        {/*自定义内容*/}
        <View className="tm-textarea__footer-content">{tmFooter}</View>
        {/*计数显示*/}
        {tmShowCount && (
          <View className="tm-textarea__count">
            {stringLength}
            {tmMaxlength > 0 ? `/${tmMaxlength}` : ""}
          </View>
        )}
      </View>
    </View>
  );
}

export default TmTextarea;
