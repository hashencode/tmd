import "./navGrid.scss";

import NavGridContext from "./_context";
import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmHorizon?: boolean; // 横向显示
  tmSpace?: number | string; // 各子项间的间距
  tmTextSpace?: number | string; // 图片和文字的间距
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmNavGrid(props: PropsInterface) {
  const {
    tmHorizon = false,
    tmSpace = 0,
    tmTextSpace = 0,
    className = "",
    style = {}
  } = props;

  return (
    <View className={classNames("tm-nav-grid", className)} style={style}>
      <NavGridContext.Provider value={{ tmHorizon, tmSpace, tmTextSpace }}>
        {props.children}
      </NavGridContext.Provider>
    </View>
  );
}

export default TmNavGrid;
