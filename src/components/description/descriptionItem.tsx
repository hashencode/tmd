import "./descriptionItem.scss";

import React, { ReactNode, useContext } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import DescriptionContext from "./_context";

interface PropsInterface {
  tmTitle?: string | ReactNode; // 左侧标题
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

function TmDescriptionItem(props: PropsInterface) {
  const { tmTitle = "", className = "", style = {} } = props;

  const parentContext = useContext(DescriptionContext);

  return (
    <View
      className={classNames("tm-description-item", className)}
      style={style}
    >
      <View
        className="tm-description-item__title"
        style={parentContext.tmTitleStyle}
      >
        {tmTitle}
      </View>
      <View
        className="m-description-item__desc"
        style={parentContext.tmDescStyle}
      >
        {props.children}
      </View>
    </View>
  );
}

export default TmDescriptionItem;
