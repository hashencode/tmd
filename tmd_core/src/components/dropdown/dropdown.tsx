import React, { ReactNode, useLayoutEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon, TmPopup } from "../../index";

interface PropsInterface {
  tmDisabled?: boolean; // 禁用
  tmMaskClosable?: boolean; // 点击蒙层关闭
  tmShow?: boolean; // 是否展开
  tmTitle?: string | ReactNode; // 按钮文字
  onHeadClick?: () => void; // 头部点击
  onMaskClick?: () => void; // 遮罩点击
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDropdown(props: PropsInterface) {
  const {
    tmDisabled = false,
    tmMaskClosable = false,
    tmShow = false,
    tmTitle = "",
    onHeadClick = () => {},
    onMaskClick = () => {},
    className = "",
    style = {},
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleHeadClick = () => {
    if ("tmShow" in props) {
      onHeadClick();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleMaskClick = () => {
    if (tmMaskClosable) {
      if ("tmShow" in props) {
        onMaskClick();
      } else {
        setIsOpen(false);
      }
    }
  };

  useLayoutEffect(() => {
    setIsOpen(tmShow);
  }, [tmShow]);

  return (
    <View
      className={classNames(
        "tm-dropdown",
        { "tm-dropdown-disabled": tmDisabled },
        className
      )}
      style={style}
    >
      <View className="tm-dropdown__head" onClick={handleHeadClick}>
        <View className="tm-dropdown__text">{tmTitle}</View>
        <View className="tm-dropdown__arrow">
          <TmIcon tmValue={isOpen ? "sort_up" : "sort_down"} />
        </View>
      </View>
      <View className="tm-dropdown__body">
        <TmPopup
          tmAppear
          tmShow={isOpen}
          tmFullScreen={false}
          tmPosition="top"
          tmMotion="slide-down"
          onMaskClick={handleMaskClick}
        >
          <View className="tm-dropdown__content">{props.children}</View>
        </TmPopup>
      </View>
    </View>
  );
}

export default TmDropdown;
