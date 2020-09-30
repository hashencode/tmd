import React, { MouseEventHandler, useContext, useLayoutEffect } from "react";
import classNames from "classnames";
import { TmIcon, TmListItem } from "../../index";

import SelectContext from "./_context";

interface PropsInterface {
  tmDisabled?: boolean; // 禁用
  tmText: number | string; // 当前项对应显示的文字
  tmValue: number | string; // 当前项的值
  onClick?: MouseEventHandler; // 点击事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmSelectOption(props: PropsInterface) {
  const {
    tmDisabled = false,
    tmText = "",
    tmValue = "",
    onClick = () => {},
    className = "",
    style = {},
  } = props;

  const { isReachMax, optionInit, activeKeys, updateActiveKeys } = useContext(
    SelectContext
  );

  const handleClick = (event) => {
    if (tmDisabled) return;
    updateActiveKeys({
      currentValue: tmValue,
    });
    onClick(event);
  };

  useLayoutEffect(() => {
    optionInit({ tmText, tmValue });
  }, []);

  return (
    <TmListItem
      tmDisabled={tmDisabled || (isReachMax && !activeKeys.includes(tmValue))}
      className={classNames("tm-select-option", className)}
      tmAction={
        activeKeys.includes(tmValue) && (
          <TmIcon className="tm-select-option__selected-icon" tmValue="check" />
        )
      }
      onClick={handleClick}
      style={style}
    >
      {tmText}
      {props.children}
    </TmListItem>
  );
}

export default TmSelectOption;
