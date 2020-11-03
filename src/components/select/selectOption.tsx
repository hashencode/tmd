import React, {
  MouseEventHandler,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react";
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

  const {
    isReachMax,
    optionInit,
    tempSelectedValues,
    updateSelectValues,
  } = useContext(SelectContext);

  const handleClick = (event) => {
    if (tmDisabled) return;
    updateSelectValues({
      currentValue: tmValue,
    });
    onClick(event);
  };

  const isSelected = useMemo(() => {
    return tempSelectedValues.includes(tmValue);
  }, [tmValue, tempSelectedValues]);

  useLayoutEffect(() => {
    optionInit({ tmText, tmValue });
  }, []);

  return (
    <TmListItem
      tmDisabled={tmDisabled || (isReachMax && !isSelected)}
      className={classNames(
        "tm-select-option",
        {
          "tm-select-option-selected": isSelected,
        },
        className
      )}
      tmAction={
        <TmIcon className="tm-select-option__selected-icon" tmValue="check" />
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
