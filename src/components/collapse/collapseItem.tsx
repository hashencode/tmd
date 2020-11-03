import React, { ReactNode, useContext, useEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import CollapseItemContext from "./_context";
import { TmIcon } from "../../index";

interface PropsInterface {
  tmTitle?: string | ReactNode; // 标题
  tmId: string; // 唯一值，用于控制展开
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmCollapseItem(props: PropsInterface) {
  const { tmTitle = "", tmId = "", className = "", style = {} } = props;

  const {
    onIndexChange,
    activeKey,
    isAccordion,
    tmInnerBorder,
    tmHideArrow,
  } = useContext(CollapseItemContext);

  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    if (isActive) {
      setIsActive(false);
      onIndexChange(-1);
    } else {
      onIndexChange(tmId);
    }
  };

  useEffect(() => {
    if (tmId === activeKey) {
      setIsActive(true);
    } else if (isAccordion) {
      setIsActive(false);
    }
  }, [tmId, activeKey, isAccordion]);

  return (
    <View
      className={classNames(
        "tm-collapse-item",
        { "tm-collapse-item-bordered": tmInnerBorder },
        className
      )}
      style={style}
    >
      {/* 头部 */}
      <View className="tm-collapse-item__head" onClick={handleClick}>
        {/* 标题 */}
        <View className="tm-collapse-item__title">{tmTitle}</View>
        {/* 箭头图标 */}
        {!tmHideArrow && (
          <TmIcon
            className="tm-collapse-item__arrow"
            tmValue={isActive ? "arrow_up" : "arrow_down"}
          />
        )}
      </View>
      {/* 内容插槽 */}
      {isActive && (
        <View className="tm-collapse-item__slot">{props.children}</View>
      )}
    </View>
  );
}

export default TmCollapseItem;
