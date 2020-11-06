import React, { ReactNode, useLayoutEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon, TmPopup, useStore } from "../../index";
import { observer } from "mobx-react-lite";

export interface messageProps {
  tmIcon?: ReactNode; // 自定义图标
  tmPosition?: "center" | "left" | "right" | "top" | "bottom"; // 显示位置
  tmShow?: boolean; // 是否显示
  tmType?: "default" | "success" | "warning" | "loading" | "error"; // 内置状态
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

const TmMessage = observer((props: messageProps) => {
  const {
    tmIcon = null,
    tmPosition = "center",
    tmShow = false,
    tmType = "default",
    className = "",
    style = {},
  } = props;

  const buildInIconObj = {
    success: "success_fill",
    warning: "warning_fill",
    loading: "loading",
    error: "error_fill",
  };

  const [fixStyle, setFixStyle] = useState({});

  // 读取 store
  const { systemStore } = useStore();

  useLayoutEffect(() => {
    if (tmPosition === "top") {
      setFixStyle({
        paddingTop: `${
          systemStore.systemInfo["navBarInfo"].navBarHeight + 20
        }px`,
      });
    }
  }, []);

  return (
    <TmPopup
      tmMask={false}
      tmPosition={tmPosition}
      tmShow={tmShow}
      tmMotion="fade"
      className="tm-message__popup"
      style={fixStyle}
    >
      {/* 主体内容 */}
      <View
        className={classNames(
          "tm-message",
          `tm-message-${tmPosition}`,
          className
        )}
        style={style}
      >
        {/* 自定义图标 */}
        {tmIcon}
        {/* 内置图标 */}
        {buildInIconObj[tmType] && (
          <TmIcon
            tmValue={buildInIconObj[tmType]}
            tmSpin={tmType === "loading"}
          />
        )}
        {/* 自定义内容 */}
        {props.children}
      </View>
    </TmPopup>
  );
});

export default TmMessage;
