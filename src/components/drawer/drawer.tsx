import "./drawer.scss";

import React, { ReactNode, useLayoutEffect, useState } from "react";

import { TmPopup } from "../index";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { getEnv } from "@tarojs/taro";
import { getGlobalSystemInfo } from "../_scripts";

interface PropsInterface {
  tmCancel?: string | ReactNode; // 取消按钮
  tmConfirm?: string | ReactNode; // 确认按钮
  tmBodyStyle?: object; // 自定义内容样式
  tmFooter?: ReactNode; // 自定义底部
  tmFooterStyle?: object; // 自定义底部样式
  tmPosition?: "left" | "right" | "bottom"; // 显示位置
  tmShow?: boolean; // 是否显示
  tmTitle?: string | ReactNode; // 自定义头部
  tmTitleStyle?: object; // 自定义头部样式
  onCancel?: () => void; // 取消回调
  onConfirm?: () => void; // 确认回调
  onHide?: () => void; // 完成隐藏回调
  onMaskClick?: () => void; // 点击遮罩回调
  onShow?: () => void; // 完成显示回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDrawer(props: PropsInterface) {
  const {
    tmCancel = null,
    tmConfirm = null,
    tmBodyStyle = {},
    tmFooter = null,
    tmFooterStyle = {},
    tmPosition = "bottom",
    tmShow = false,
    tmTitle = null,
    tmTitleStyle = {},
    onCancel = () => {},
    onConfirm = () => {},
    onHide = () => {},
    onMaskClick = () => {},
    onShow = () => {},
    className = "",
    style = {}
  } = props;

  // 在侧边显示时，考虑到全面屏的情况
  const [fixStyle, setFixStyle] = useState({});
  const [motion, setMotion] = useState<any>("slide-up");

  useLayoutEffect(() => {
    if (tmPosition !== "bottom") {
      setMotion(tmPosition === "left" ? "slide-right" : "slide-left");
      // 小程序模式下，设置到顶部的距离为状态栏的高度
      if (getEnv() !== "WEB") {
        setFixStyle({
          paddingTop: getGlobalSystemInfo().navBarInfo.statusBarHeight + "px"
        });
      }
    }
  }, []);

  return (
    <TmPopup
      tmAppear
      tmPosition={tmPosition}
      tmMotion={motion}
      tmShow={tmShow}
      onHide={onHide}
      onShow={onShow}
      onMaskClick={onMaskClick}
    >
      <View
        className={classNames(
          "tm-drawer",
          `tm-drawer-${tmPosition}`,
          className
        )}
        style={{ ...fixStyle, ...style }}
      >
        {/*区别不同方向的显示方式*/}
        {tmPosition === "bottom"
          ? [
              // 自定义头部
              <View
                className="tm-drawer__head"
                style={tmTitleStyle}
                key={"drawer-head"}
              >
                <View className="tm-drawer__head-cancel" onClick={onCancel}>
                  {tmCancel}
                </View>
                <View className="tm-drawer__head-title">{tmTitle}</View>
                <View className="tm-drawer__head-confirm" onClick={onConfirm}>
                  {tmConfirm}
                </View>
              </View>,
              // 自定义内容
              <View
                className="tm-drawer__slot"
                style={tmBodyStyle}
                key={"drawer-content"}
              >
                {props.children}
              </View>,
              // 自定义底部
              tmFooter && (
                <View
                  className="tm-drawer__footer"
                  style={tmFooterStyle}
                  key={"drawer-footer"}
                >
                  {tmFooter}
                </View>
              )
            ]
          : [
              // 自定义头部
              <View
                className="tm-drawer__head"
                style={tmTitleStyle}
                key={"drawer-head"}
              >
                {tmTitle}
              </View>,
              // 自定义内容
              <View
                className="tm-drawer__slot"
                style={tmBodyStyle}
                key={"drawer-content"}
              >
                {props.children}
              </View>,
              // 自定义底部
              tmFooter || (
                <View
                  className="tm-drawer__footer"
                  style={tmFooterStyle}
                  key={"drawer-footer"}
                >
                  <View className="tm-drawer__footer-cancel" onClick={onCancel}>
                    {tmCancel}
                  </View>
                  <View
                    className="tm-drawer__footer-confirm"
                    onClick={onConfirm}
                  >
                    {tmConfirm}
                  </View>
                </View>
              )
            ]}
      </View>
    </TmPopup>
  );
}

export default TmDrawer;
