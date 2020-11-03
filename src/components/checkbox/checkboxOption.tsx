import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useLayoutEffect,
} from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon } from "../../index";
import CheckboxContext from "./_context";

interface PropsInterface {
  tmDisabled?: boolean; // 禁用
  tmText?: string | ReactNode; // 标题
  tmValue?: string | number; // 值
  onClick?: MouseEventHandler; // 点击事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmCheckboxOption(props: PropsInterface) {
  const {
    tmDisabled = false,
    tmText = "",
    tmValue = "",
    onClick = () => {},
    className = "",
    style = {},
  } = props;

  const {
    isRadio,
    isReachMax,
    tmSize,
    checkedValues,
    updateCheckedValues,
    optionInit,
  } = useContext(CheckboxContext);

  const handleClick = (event) => {
    // 禁用或者达到最大可选个数时无反馈
    if (tmDisabled) return;
    if (!isReachMax || checkedValues.indexOf(tmValue) > -1) {
      updateCheckedValues({
        currentValue: tmValue,
      });
      onClick(event);
    }
  };

  useLayoutEffect(() => {
    optionInit({ tmText, tmValue });
  }, []);

  return (
    <View
      className={classNames(
        "tm-checkboxOption",
        `tm-checkboxOption-${tmSize}`,
        {
          "tm-checkboxOption-disabled":
            tmDisabled || (isReachMax && !checkedValues.includes(tmValue)),
          "tm-checkboxOption-checked": checkedValues.includes(tmValue),
          "tm-checkboxOption-radio": isRadio,
        },
        className
      )}
      style={style}
      onClick={handleClick}
    >
      <View className="tm-checkboxOption__selector">
        <View className="tm-checkboxOption__selector-icon">
          <TmIcon tmValue="check" />
        </View>
      </View>
      {tmText && <View className="tm-checkboxOption__title">{tmText}</View>}
    </View>
  );
}

export default TmCheckboxOption;
