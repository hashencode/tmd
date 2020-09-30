import React, { ReactNode, useLayoutEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon, TmPopup } from "../../index";

interface PropsInterface {
  tmCancelText?: string | ReactNode; // 取消按钮文字
  tmClosable?: boolean; // 显示关闭按钮
  tmConfirmText?: string | ReactNode; // 确认按钮文字
  tmDesc?: string | ReactNode; // 自定义描述
  tmFooter?: string | ReactNode; // 自定义底部
  tmHead?: string | ReactNode; // 自定义头部
  tmIcon?: ReactNode; // 自定义图标
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
  tmShow?: boolean; // 是否显示
  tmTitle?: string | ReactNode; // 标题
  tmType?: "default" | "info" | "success" | "warning" | "error"; // 类型
  onCancel?: () => void; // 取消事件回调
  onConfirm?: () => void; // 确认事件回调
  onClose?: () => void; // 关闭事件回调
  onHide?: () => void; // 隐藏事件回调
  onShow?: () => void; // 显示事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmModal(props: PropsInterface) {
  const {
    tmCancelText = "取消",
    tmClosable = false,
    tmConfirmText = "确定",
    tmDesc = null,
    tmFooter = null,
    tmHead = null,
    tmIcon = null,
    tmMotion = "bounce",
    tmShow = false,
    tmTitle = "",
    tmType = "default",
    onCancel = () => {},
    onConfirm = () => {},
    onClose = () => {},
    onHide = () => {},
    onShow = () => {},
    className = "",
    style = {},
  } = props;

  const [isShow, setIsShow] = useState(false);

  // 处理取消按钮点击
  const handleCancelClick = () => {
    if ("tmShow" in props) {
      onCancel();
    } else {
      setIsShow(false);
    }
  };

  // 处理确定按钮点击
  const handleConfirmClick = () => {
    if ("tmShow" in props) {
      onConfirm();
    } else {
      setIsShow(true);
    }
  };

  useLayoutEffect(() => {
    setIsShow(tmShow);
  }, [tmShow]);

  return (
    <TmPopup
      tmAppear
      tmMotion={tmMotion}
      tmShow={isShow}
      onHide={onHide}
      onShow={onShow}
      onMaskClick={onClose}
    >
      <View
        className={classNames("tm-modal", `tm-modal-${tmType}`, className)}
        style={style}
      >
        {/* 自定义头部 */}
        {tmHead}
        {/* 关闭按钮 */}
        {tmClosable && (
          <TmIcon
            className="tm-modal__close"
            tmValue="close"
            onClick={onClose}
          />
        )}
        {/* 主要内容 */}
        <View className="tm-modal__body">
          <View className="tm-modal__icon">
            {
              // 自定义图标
              tmIcon ||
                // 内置图标
                (tmType !== "default" && (
                  <TmIcon
                    tmValue={`${tmType}_fill`}
                    className={`tm-modal__icon-${tmType}`}
                  />
                ))
            }
          </View>
          <View className="tm-modal__title">{tmTitle}</View>
          <View className="tm-modal__desc">{tmDesc}</View>
        </View>
        {/* 确认与取消按钮 */}
        <View className="tm-modal__btn">
          {tmCancelText && (
            <View className="tm-modal__btn-cancel" onClick={handleCancelClick}>
              {tmCancelText}
            </View>
          )}
          {tmConfirmText && (
            <View
              className="tm-modal__btn-confirm"
              onClick={handleConfirmClick}
            >
              {tmConfirmText}
            </View>
          )}
        </View>
        {/* 自定义底部 */}
        {tmFooter && <View className="tm-modal__footer">{tmFooter}</View>}
      </View>
    </TmPopup>
  );
}

export default TmModal;
