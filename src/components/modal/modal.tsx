import "./modal.scss";

import React, { ReactNode } from "react";
import { TmIcon, TmPopup } from "../index";
import {
  colorDanger,
  colorPrimary,
  colorSuccess,
  colorWarning
} from "../_style/theme";

import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmCancelText?: string | ReactNode; // 取消按钮文字
  tmClosable?: boolean; // 显示关闭按钮
  tmConfirmText?: string | ReactNode; // 确认按钮文字
  tmDesc?: string | ReactNode; // 自定义描述
  tmFooter?: string | ReactNode; // 自定义底部
  tmHead?: string | ReactNode; // 自定义头部
  tmIcon?: ReactNode; // 自定义图标
  tmMaskClosable?: boolean; // 可通过蒙层关闭
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
  style?: object; // 自定义行内样式
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
    tmMaskClosable = false,
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
    style = {}
  } = props;

  // 如果允许点击遮罩关闭，则调用onClose事件
  const handleMaskClick = () => {
    if (tmMaskClosable) onClose();
  };

  // 内置图标
  const buildInIconObj = {
    default: "",
    info: <TmIcon tmValue={"tanhao_fill"} tmColor={colorPrimary} />,
    success: <TmIcon tmValue={"chenggong_fill"} tmColor={colorSuccess} />,
    warning: <TmIcon tmValue={"tanhao_fill"} tmColor={colorWarning} />,
    error: <TmIcon tmValue={"shibai_fill"} tmColor={colorDanger} />
  };

  return (
    <TmPopup
      tmAppear
      tmMotion={tmMotion}
      tmShow={tmShow}
      onHide={onHide}
      onShow={onShow}
      onMaskClick={handleMaskClick}
    >
      <View
        className={classNames("tm-modal", `tm-modal-${tmType}`, className)}
        style={style}
      >
        {/*自定义头部*/}
        {tmHead}
        {/*关闭按钮*/}
        {tmClosable && (
          <TmIcon
            className="tm-modal__close"
            tmValue={"guanbi"}
            onClick={onClose}
          />
        )}
        {/*主要内容*/}
        <View className="tm-modal__body">
          <View className="tm-modal__icon">
            {tmIcon || buildInIconObj[tmType]}
          </View>
          <View className="tm-modal__title">{tmTitle}</View>
          <View className="tm-modal__desc">{tmDesc}</View>
        </View>
        {/*确认与取消按钮*/}
        <View className="tm-modal__btn">
          {tmCancelText && (
            <View className="tm-modal__btn-cancel" onClick={onCancel}>
              {tmCancelText}
            </View>
          )}
          {tmConfirmText && (
            <View className="tm-modal__btn-confirm" onClick={onConfirm}>
              {tmConfirmText}
            </View>
          )}
        </View>
        {/*自定义底部*/}
        {tmFooter && <View className="tm-modal__footer">{tmFooter}</View>}
      </View>
    </TmPopup>
  );
}

export default TmModal;
