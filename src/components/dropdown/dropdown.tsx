import "./dropdown.scss";

import React, { ReactNode, useRef, useState } from "react";
import { TmIcon, TmPicker, TmPopup } from "../index";

import { ScrollView, View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmOpen?: boolean; //
  tmDefaultValue?: number | string | (number | string)[]; // 默认值
  tmDisabled?: boolean; // 禁用
  tmFooter?: ReactNode; // 自定义底部
  tmMaskClosable?: boolean; // 点击蒙层关闭
  tmMultiple?: boolean; // 多选模式
  tmValue?: number | string | (number | string)[]; // 当前选中的值
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDropdown(props: PropsInterface) {
  const {
    tmDefaultValue = "",
    tmDisabled = false,
    tmFooter = null,
    tmMaskClosable = false,
    tmMultiple = false,
    tmValue = "",
    className = "",
    style = {},
  } = props;

  const [maskVisible, setMaskVisible] = useState<boolean>(false);

  const destroyTimer = useRef<any>(0);

  const headRef = useRef();

  const handleHeadClick = () => {
    clearTimeout(destroyTimer.current);
    setMaskVisible(!maskVisible);
  };

  const handleMaskClick = () => {
    if (tmMaskClosable) setMaskVisible(false);
  };

  return (
    <View
      className={classNames(
        "tm-dropdown",
        { "tm-dropdown-disabled": tmDisabled },
        className
      )}
      style={style}
    >
      <View
        className="tm-dropdown__head"
        onClick={handleHeadClick}
        ref={headRef}
      >
        <View className="tm-dropdown__text">sou</View>
        <View className="tm-dropdown__arrow">
          <TmIcon tmValue={"sort_down"} />
        </View>
      </View>
      <View className="tm-dropdown__body">
        <TmPopup
          tmAppear
          tmShow={maskVisible}
          tmFullScreen={false}
          tmPosition={"top"}
          tmMotion={"slide-down"}
          onMaskClick={handleMaskClick}
        >
          <ScrollView scrollY style={{ height: "30vh" }} scrollWithAnimation>
            <TmPicker
              className="tm-dropdown__options"
              tmMultiple={tmMultiple}
              tmValue={tmValue}
              tmDefaultValue={tmDefaultValue}
            >
              {props.children}
            </TmPicker>
          </ScrollView>
          <View className="tm-dropdown__footer">{tmFooter}</View>
        </TmPopup>
      </View>
    </View>
  );
}

export default TmDropdown;
