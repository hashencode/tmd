import "./message.scss";

import React, { ReactNode, useLayoutEffect, useState } from "react";
import { TmIcon, TmPopup } from "../index";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { getGlobalSystemInfo } from "../_scripts";

interface PropsInterface {
  tmIcon?: ReactNode; // 自定义图标
  tmPosition?: "center" | "left" | "right" | "top" | "bottom"; // 显示位置
  tmShow?: boolean; // 是否显示
  tmType?: "default" | "success" | "warning" | "loading" | "error"; // 内置状态
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmMessage(props: PropsInterface) {
  const {
    tmIcon = null,
    tmPosition = "center",
    tmShow = false,
    tmType = "default",
    className = "",
    style = {}
  } = props;

  const buildInIconObj = {
    success: "chenggong_fill",
    warning: "tanhao_fill",
    loading: "jiazai",
    error: "shibai_fill"
  };

  const [fixStyle, setFixStyle] = useState({});

  useLayoutEffect(() => {
    if (tmPosition === "top") {
      setFixStyle({
        paddingTop: getGlobalSystemInfo().navBarInfo.navBarHeight + 20 + "px"
      });
    }
  }, []);

  return (
    <TmPopup
      tmMask={false}
      tmPosition={tmPosition}
      tmShow={tmShow}
      tmMotion={"fade"}
      className={"tm-message__popup"}
      style={fixStyle}
    >
      {/*主体内容*/}
      <View
        className={classNames(
          "tm-message",
          `tm-message-${tmPosition}`,
          className
        )}
        style={style}
      >
        {/*自定义图标*/}
        {tmIcon}
        {/*内置图标*/}
        {buildInIconObj[tmType] && (
          <TmIcon
            tmValue={buildInIconObj[tmType]}
            tmSpin={tmType === "loading"}
          />
        )}
        {/*自定义内容*/}
        {props.children}
      </View>
    </TmPopup>
  );
}

export default TmMessage;
