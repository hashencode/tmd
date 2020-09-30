import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmCalendar, TmDrawer } from "../../index";

interface PropsInterface {
  tmDisabled?: boolean; // 禁用
  tmPlaceholder?: string; // 占位符
  tmTitle?: string | ReactNode; // 标题
  tmTriggerClassName?: string; // 触发器类名
  tmValue?: string | undefined; // 当前选中的值
  onChange?: (value: string | undefined) => void; // 选项变动回调
  onConfirm?: (value: string | undefined) => void; // 选项变动回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDatePicker(props: PropsInterface) {
  const {
    tmDisabled = false,
    tmPlaceholder = "",
    tmTitle = "",
    tmTriggerClassName = "",
    tmValue = "",
    onChange = () => {},
    onConfirm = () => {},
    className = "",
    style = {},
  } = props;

  // 抽屉的开合
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  // 用于存储当前操作产生的临时值
  const tempValue = useRef(undefined);
  // 触发器显示文字
  const [triggerText, setTriggerText] = useState("");

  // 打开抽屉
  const openDrawer = () => {
    if (tmDisabled) return;
    setIsDrawerShow(true);
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

  // 处理日历输入变更
  const handleCalendarChange = (e) => {
    tempValue.current = e;
    onChange(e);
  };

  useLayoutEffect(() => {
    // tmValue 变更时更新触发器文字
    if (tmValue) {
      setTriggerText(tmValue);
    }
  }, [tmValue]);

  return (
    <View className={classNames("tm-date-picker", className)} style={style}>
      <View
        className={classNames(
          "tm-date-picker__trigger",
          {
            "tm-date-picker__trigger-disabled": tmDisabled,
            "tm-date-picker__trigger-placeholder": !triggerText,
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
        <TmCalendar onChange={handleCalendarChange} />
      </TmDrawer>
    </View>
  );
}

export default TmDatePicker;
