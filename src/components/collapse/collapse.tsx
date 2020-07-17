import "./collapse.scss";

import React, {useState} from "react";

import CollapseContext from "./_context";
import {View} from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmInnerBorder?: boolean; // 显示内边框
  tmOuterBorder?: boolean; // 显示外边框
  tmAccordion?: boolean; // 手风琴模式
  tmDefaultKey?: number | string; // 默认展开的项目key值
  tmHideArrow?: boolean; // 显示箭头
  tmRound?: boolean; // 圆角边框
  tmShadow?: boolean; // 阴影
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

function TmCollapse(props: PropsInterface) {
  const {
    tmInnerBorder = false,
    tmOuterBorder = false,
    tmAccordion = false,
    tmDefaultKey = -1,
    tmRound = false,
    tmHideArrow = false,
    tmShadow = false,
    className = "",
    style = {},
  } = props;

  const [active, setActiveKey] = useState(tmDefaultKey);

  return (
    <View
      className={classNames(
        "tm-collapse",
        {
          "tm-collapse-bordered": tmOuterBorder,
          "tm-collapse-round": tmRound,
          "tm-collapse-shadow": tmShadow,
        },
        className
      )}
      style={style}
    >
      <CollapseContext.Provider
        value={{
          activeKey: active,
          onIndexChange: (key) => {
            setActiveKey(key === active ? -1 : key);
          },
          isAccordion: tmAccordion,
          tmInnerBorder,
          tmHideArrow,
        }}
      >
        {props.children}
      </CollapseContext.Provider>
    </View>
  );
}

export default TmCollapse;
