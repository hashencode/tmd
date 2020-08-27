import "./navGridItem.scss";

import React, {ReactNode, useContext} from "react";

import NavGridContext from "./_context";
import {View} from "@tarojs/components";
import classNames from "classnames";
import {transformPx} from "../_scripts";

interface PropsInterface {
  tmImage: ReactNode; // 图片
  tmText?: string | ReactNode; // 文字
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmNavGridItem(props: PropsInterface) {
  const {tmImage = null, tmText = "", className = "", style = {}} = props;

  const parentContext = useContext(NavGridContext);

  const calcImageStyle = () => {
    const {tmSpace} = parentContext;
    if (tmSpace) {
      // 如果是横向显示
      return {
        padding: transformPx(tmSpace)
      };
    }
  };

  const calcStyle = () => {
    const {tmTextSpace, tmHorizon} = parentContext;
    if (tmTextSpace) {
      const spaceValue = transformPx(tmTextSpace);
      // 如果是横向显示
      return tmHorizon
        ? {
          marginLeft: spaceValue
        }
        : {
          marginTop: spaceValue
        };
    }
  };

  return (
    <View
      className={classNames(
        "tm-nav-grid-item",
        `tm-nav-grid-item-${parentContext.tmHorizon ? "horizon" : "vertical"}`,
        className
      )}
      style={{...calcImageStyle(), ...style}}
    >
      {/*图片*/}
      {tmImage}
      {/*文字*/}
      {tmText && (
        <View className="tm-nav-grid-item__text" style={calcStyle()}>
          {tmText}
        </View>
      )}
    </View>
  );
}

export default TmNavGridItem;
