import "./input.scss";

import React, { ReactNode, useLayoutEffect, useState } from "react";
import { Input, View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon } from "../index";
import { fontColorDesc } from "../_style/theme";
import { CommonEventFunction } from "@tarojs/components/types/common";

interface PropsInterface {
  tmAllowClear?: boolean; // 显示清空按钮
  tmBig?: boolean; // 大输入框
  tmBorder?: boolean; // 显示边框
  tmDisabled?: boolean; // 禁用
  tmFocus?: boolean; // 获取焦点
  tmId: string; // 唯一id，用于表单校验
  tmMaxlength?: number; // 最大字符数
  tmPassword?: boolean; // 密码输入
  tmPlaceholder?: string; // placeholder 值
  tmPrefix?: string | ReactNode; // 前缀
  tmSuffix?: string | ReactNode; // 后缀
  tmType?: "number" | "text" | "idcard" | "digit"; // 输入项类型
  tmValue?: string; // value 值
  tmWxAdjustPosition?: boolean; // 键盘弹起时，是否自动上推页面
  tmWxConfirmHold?: boolean; // 点击键盘右下角按钮时是否保持键盘不收起
  tmWxConfirmType?: "send" | "search" | "next" | "go" | "done"; // 确认按钮样式
  tmWxCursor?: number; // 指定focus时的光标位置
  tmWxCursorSpacing?: 0; // 指定光标与键盘的距离
  tmWxHoldKeyboard?: boolean; // focus时，点击页面的时候不收起键盘
  tmWxPlaceholderClass?: string; // placeholder类名
  tmWxPlaceholderStyle?: string; // placeholder样式
  tmWxSelectionEnd?: number; // 光标结束位置，自动聚集时有效
  tmWxSelectionStart?: number; // 光标起始位置，自动聚集时有效
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
  onBlur?: CommonEventFunction; // 失焦事件回调
  onChange?: (value?: string) => void; // 输入变化回调
  onConfirm?: CommonEventFunction; // 确认回调
  onFocus?: CommonEventFunction; // 聚焦回调
  onWxKeyboardHeightChange?: (event?: any) => void; // 键盘高度发生变化回调
}

function TmInput(props: PropsInterface) {
  const {
    tmAllowClear = false,
    tmBig = false,
    tmBorder = false,
    tmDisabled = false,
    tmFocus = false,
    tmId = "",
    tmMaxlength = -1,
    tmPassword = false,
    tmPlaceholder = "",
    tmPrefix = "",
    tmSuffix = "",
    tmType = "text",
    tmValue = "",
    tmWxAdjustPosition = true,
    tmWxConfirmHold = false,
    tmWxConfirmType = "done",
    tmWxCursor = 0,
    tmWxCursorSpacing = 0,
    tmWxHoldKeyboard = true,
    tmWxPlaceholderClass = "",
    tmWxPlaceholderStyle = "",
    tmWxSelectionEnd = -1,
    tmWxSelectionStart = -1,
    onBlur = () => {},
    onChange = () => {},
    onConfirm = () => {},
    onFocus = () => {},
    onWxKeyboardHeightChange = () => {},
    className = "",
    style = {},
  } = props;

  const [valueCache, setValueCache] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  // 清空输入
  const handleClear = () => {
    setValueCache("");
    setIsFocus(true);
    onChange("");
  };

  // 输入时回调
  const handleChange = (event) => {
    setValueCache(event.detail.value);
    onChange(event.detail.value);
  };

  useLayoutEffect(() => {
    setValueCache(tmValue);
  }, [tmValue]);

  useLayoutEffect(() => {
    setIsFocus(tmFocus);
  }, [tmFocus]);

  return (
    <View
      className={classNames(
        "tm-input",
        tmBig ? "tm-input-lg" : "tm-input-mid",
        {
          "tm-input-bordered": tmBorder,
          "tm-input-disabled": tmDisabled,
        },
        className
      )}
      style={style}
    >
      {/*主体部分*/}
      {/*前缀*/}
      {tmPrefix && <View className="tm-input__prefix">{tmPrefix}</View>}
      {/*输入框*/}
      <Input
        adjustPosition={tmWxAdjustPosition}
        className="tm-input__content"
        confirmHold={tmWxConfirmHold}
        confirmType={tmWxConfirmType}
        cursor={tmWxCursor}
        cursorSpacing={tmWxCursorSpacing}
        disabled={tmDisabled}
        focus={isFocus}
        holdKeyboard={tmWxHoldKeyboard}
        id={tmId}
        maxlength={tmMaxlength}
        password={tmPassword}
        placeholder={tmPlaceholder}
        placeholderClass={tmWxPlaceholderClass}
        placeholderStyle={tmWxPlaceholderStyle}
        selectionEnd={tmWxSelectionEnd}
        selectionStart={tmWxSelectionStart}
        type={tmType}
        value={valueCache}
        onKeyboardHeightChange={onWxKeyboardHeightChange}
        onBlur={onBlur}
        onInput={handleChange}
        onConfirm={onConfirm}
        onFocus={onFocus}
      />
      {/*清空按钮*/}
      {tmAllowClear && valueCache.length > 0 && (
        <TmIcon
          className="tm-input__clear-btn"
          tmValue={"error_fill"}
          tmSize={"1.3em"}
          tmColor={fontColorDesc}
          onClick={handleClear}
        />
      )}
      {/*后缀*/}
      {tmSuffix && <View className="tm-input__suffix">{tmSuffix}</View>}
    </View>
  );
}

export default TmInput;
