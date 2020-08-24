import "./pickerOption.scss";

import React, { useContext, useLayoutEffect } from "react";
import { TmIcon, TmListItem } from "../index";

import PickerContext from "./_context";
import classNames from "classnames";
import { colorPrimary } from "../_style/theme";

interface PropsInterface {
  tmDisabled?: boolean; // 禁用
  tmText: number | string; // 当前项对应显示的文字
  tmValue: number | string; // 当前项的值
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmPickerOption(props: PropsInterface) {
  const {
    tmDisabled = false,
    tmText = "",
    tmValue = "",
    className = "",
    style = {}
  } = props;

  const parentContext = useContext(PickerContext);

  useLayoutEffect(() => {
    parentContext.optionInit({ tmText, tmValue });
  }, []);

  return (
    <TmListItem
      tmDisabled={tmDisabled}
      className={classNames("tm-dropdown-option", className)}
      tmAction={
        parentContext.activeKeys.includes(tmValue) && (
          <TmIcon tmValue={"check"} tmSize={32} tmColor={colorPrimary} />
        )
      }
      onClick={() => {
        parentContext.updateActiveKeys({
          tmText,
          tmValue
        });
      }}
      style={style}
    >
      {props.children}
    </TmListItem>
  );
}

export default TmPickerOption;
