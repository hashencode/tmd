import "./popup.scss";

import { CSSTransition } from "react-transition-group";
import React from "react";
import { TmTransition } from "../index";
import { View } from "@tarojs/components";
import { backgroundMask } from "../_style/theme";
import classNames from "classnames";

interface PropsInterface {
  tmAppear?: boolean; // 初次加载时执行动画
  tmDelay?: number; // 延迟显示时间（毫秒）
  tmDestroyAfterHide?: boolean; // 退出后清除dom
  tmFullScreen?: boolean; // 是否全屏
  tmMask?: boolean; // 是否有蒙层
  tmMaskColor?: string; // 遮罩颜色
  tmMotion?:
    | "bounce"
    | "zoom"
    | "punch"
    | "fade"
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right";
  tmPosition?: "center" | "left" | "right" | "top" | "bottom"; // 显示位置
  tmShow?: boolean; // 是否显示
  onHide?: () => void; // 完成隐藏回调
  onMaskClick?: () => void; // 点击遮罩事件回调
  onShow?: () => void; // 完成显示回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmPopup(props: PropsInterface) {
  const {
    tmAppear = false,
    tmDelay = 0,
    tmDestroyAfterHide = false,
    tmFullScreen = true,
    tmMask = true,
    tmMaskColor = backgroundMask,
    tmMotion = "fade",
    tmPosition = "center",
    tmShow = false,
    onHide = () => {},
    onMaskClick = () => {},
    onShow = () => {},
    className = "",
    style = {}
  } = props;

  // 点击遮罩
  const handleMaskClick = () => {
    onMaskClick();
  };

  return (
    <CSSTransition
      in={tmShow}
      timeout={tmDelay}
      appear={tmAppear}
      classNames={`tm-popup`}
      className={classNames(
        "tm-popup",
        tmFullScreen ? "tm-popup-full-screen" : "tm-popup-flow",
        `tm-popup-align-${tmPosition}`,
        { "tm-popup-no-mask": !tmMask },
        className
      )}
      style={style}
      onEntered={onShow}
      onExited={onHide}
    >
      <View>
        {/*显示遮罩*/}
        {tmMask && (
          <TmTransition
            tmAppear={tmAppear}
            tmDelay={tmDelay}
            tmShow={tmShow}
            className="tm-popup__mask"
            onClick={handleMaskClick}
            style={{
              backgroundColor: tmMaskColor
            }}
          />
        )}
        {/*显示子元素*/}
        <TmTransition
          tmAppear={tmAppear}
          tmDelay={tmDelay}
          tmDestroyAfterHide={tmDestroyAfterHide}
          tmMotion={tmMotion}
          tmShow={tmShow}
          onClick={event => {
            event.stopPropagation();
          }}
        >
          {props.children}
        </TmTransition>
      </View>
    </CSSTransition>
  );
}

export default TmPopup;
