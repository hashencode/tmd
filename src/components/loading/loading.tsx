import "./loading.scss";

import React, { ReactNode, useMemo } from "react";
import { TmIcon, TmImage, TmPopup } from "../index";

import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmDelay?: number; // 延迟显示时间
  tmIconStyle?: object; // 自定义图标样式
  tmShape?: "circle" | "quarter"; // 加载样式
  tmShow?: boolean; // 是否为加载中
  tmText?: string | ReactNode; // 提示文字
  tmVertical?: boolean; // 是否垂直显示
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmLoading(props: PropsInterface) {
  const {
    tmDelay = 0,
    tmIconStyle = {},
    tmShape = "quarter",
    tmShow = true,
    tmText = "",
    tmVertical = false,
    className = "",
    style = {},
  } = props;

  // 渲染公共内容部分
  const renderContent = useMemo(() => {
    return (
      <View
        className={classNames("tm-loading__content", {
          "tm-loading__content-vertical": tmVertical,
        })}
      >
        {/*显示图标*/}
        <View className="tm-loading__icon">
          {tmShape === "quarter" ? (
            <TmIcon style={tmIconStyle} tmValue={"loading"} tmSpin />
          ) : (
            <TmImage
              style={tmIconStyle}
              tmSrc={"/assets/image/component-loading/loading.svg"}
            />
          )}
        </View>
        {/*显示提示文字*/}
        {tmText && <View className="tm-loading__text">{tmText}</View>}
      </View>
    );
  }, [tmVertical, tmShape, tmIconStyle, tmText]);

  return (
    <View className={classNames("tm-loading", className)} style={style}>
      {props.children ? (
        <View>
          <TmPopup
            tmAppear
            tmDelay={tmDelay}
            tmFullScreen={false}
            tmMaskColor={"rgba(255,255,255,.9)"}
            tmShow={tmShow}
          >
            {renderContent}
          </TmPopup>
          {props.children}
        </View>
      ) : (
        renderContent
      )}
    </View>
  );
}

export default TmLoading;
