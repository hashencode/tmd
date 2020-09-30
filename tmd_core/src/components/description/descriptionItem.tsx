import React, { ReactNode, useContext, useLayoutEffect, useState } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import DescriptionContext from "./_context";
import { spaceLg, spaceMid, spaceSm, spaceXs } from "../../functions/theme";
import { transformPx } from "../../functions";

interface PropsInterface {
  tmTitle?: string | ReactNode; // 左侧标题
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmDescriptionItem(props: PropsInterface) {
  const { tmTitle = "", className = "", style = {} } = props;

  const { tmTitleStyle, tmDescStyle, tmSpace } = useContext(DescriptionContext);

  const [marginStyle, setMarginStyle] = useState({});

  const calcMarginValue = () => {
    const marginValueObj = {
      xs: spaceXs,
      sm: spaceSm,
      mid: spaceMid,
      lg: spaceLg,
    };
    let marginValue =
      typeof tmSpace === "string"
        ? transformPx(marginValueObj[tmSpace])
        : transformPx(tmSpace);
    setMarginStyle({
      marginBottom: marginValue,
    });
  };

  useLayoutEffect(() => {
    calcMarginValue();
  }, [tmSpace]);

  return (
    <View
      className={classNames("tm-description-item", className)}
      style={{ ...marginStyle, ...style }}
    >
      <View className="tm-description-item__title" style={tmTitleStyle}>
        {tmTitle}
      </View>
      <View className="m-description-item__desc" style={tmDescStyle}>
        {props.children}
      </View>
    </View>
  );
}

export default TmDescriptionItem;
