import React, { ReactNode } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";

export interface billItemProps {
  tmBold?: boolean; // 加粗
  tmValue?: string | ReactNode; // 描述
  tmName?: string | ReactNode; // 标题
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmBillItem(props: billItemProps) {
  const {
    tmBold = false,
    tmValue = "",
    tmName = "",
    className = "",
    style = {},
  } = props;

  return (
    <View
      className={classNames(
        "tm-bill-item",
        {
          "tm-bill-item-bold": tmBold,
        },
        className
      )}
      style={style}
    >
      <View className="tm-bill-item__title">{tmName}</View>
      <View className="tm-bill-item__desc">{tmValue}</View>
    </View>
  );
}

export default TmBillItem;
