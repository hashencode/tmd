import "./divider.scss";

import React from "react";
import {View} from "@tarojs/components";
import classNames from "classnames";
import {sizeTransform} from "../_scripts";

interface PropsInterface {
  tmSpace?: number; // 分割线外边距大小
  tmText?: string; // 附加文字
  tmTextPosition?: "left" | "center" | "right"; // 附加文字位置
  tmVertical?: boolean; // 竖向显示
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

function TmDivider(props: PropsInterface) {
  const {
    tmSpace = 20,
    tmText = "",
    tmTextPosition = "left",
    tmVertical = false,
    className = "",
    style = {},
  } = props;

  return (
    <View
      className={classNames(
        "tm-divider",
        {"tm-divider-vertical": tmVertical},
        `tm-divider-align-${tmTextPosition}`,
        className
      )}
      style={{
        margin: tmVertical
          ? `0 ${sizeTransform(tmSpace)}`
          : `${sizeTransform(tmSpace)} 0`,
        ...style,
      }}
    >
      {/*自定义插槽*/}
      {tmText && !tmVertical && (
        <View className="tm-divider__text">{tmText}</View>
      )}
    </View>
  );
}

export default TmDivider;
