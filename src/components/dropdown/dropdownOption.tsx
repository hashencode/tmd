import "./dropdownOption.scss";

import React from "react";
import { TmPickerOption } from "../index";

import classNames from "classnames";

interface PropsInterface {
  tmDisabled?: boolean; // 禁用
  tmText: number | string; // 当前项对应显示的文字
  tmValue: number | string; // 当前项的值
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDropdownOption(props: PropsInterface) {
  const {
    tmDisabled = false,
    tmText = "",
    tmValue = "",
    className = "",
    style = {},
  } = props;

  return (
    <TmPickerOption
      className={classNames("tm-dropdown-option", className)}
      style={style}
      tmText={tmText}
      tmValue={tmValue}
      tmDisabled={tmDisabled}
    >
      {props.children}
    </TmPickerOption>
  );
}

export default TmDropdownOption;
