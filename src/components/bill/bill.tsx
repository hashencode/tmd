import "./bill.scss";

import React, { ReactNode } from "react";

import { TmDivider } from "../index";
import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmTitle?: string | ReactNode; // 标题
  tmNo?: string | ReactNode; // 编号
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmBill(props: PropsInterface) {
  const { tmTitle = "", tmNo = "", className = "", style = {} } = props;

  return (
    <View className={classNames("tm-bill", className)} style={style}>
      {(tmTitle || tmNo) && [
        <View className="tm-bill__head" key={"tm-bill-head"}>
          <View className="tm-bill__title">{tmTitle}</View>
          <View className="tm-bill__no">{tmNo}</View>
        </View>,
        <TmDivider key={"tm-bill-divider"} />,
      ]}
      {props.children}
    </View>
  );
}

export default TmBill;
