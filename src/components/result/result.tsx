import "./result.scss";

import React, { ReactNode } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmImage } from "../index";

interface PropsInterface {
  tmImage?: ReactNode; // 自定义图标
  tmText?: ReactNode; // 自定义标题
  tmType?: "empty" | 500 | 404; // 处理状态
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmResult(props: PropsInterface) {
  const {
    tmImage = "",
    tmText = "",
    tmType = "",
    className = "",
    style = {},
  } = props;

  const textObj = {
    empty: "暂无数据",
    500: "网络连接异常",
    404: "您要访问的页面不存在",
  };

  return (
    <View className={classNames("tm-result", className)} style={style}>
      <View className="tm-result__image">
        {tmImage ||
          (tmType && (
            <TmImage
              className={"tm-result__image-default"}
              tmSrc={`/assets/image/component-result/${tmType}.png`}
            />
          ))}
      </View>
      <View className="tm-result__text">
        {tmText || (tmType && textObj[tmType])}
      </View>
      {props.children && (
        <View className="tm-result__slot">{props.children}</View>
      )}
    </View>
  );
}

export default TmResult;
