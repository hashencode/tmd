import React, { useMemo } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { colorDanger } from "../../functions/theme";
import { transformPx } from "../../functions";

interface PropsInterface {
  tmColor?: string; // 背景色
  tmDot?: boolean; // 采用点标
  tmMax?: number; // 显示上限
  tmShowZero?: boolean; // 是否显示0
  tmTranslate?: { x: number | string; y: number | string }; // 偏移
  tmValue?: number; // 显示数值
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmBadge(props: PropsInterface) {
  const {
    tmColor = colorDanger,
    tmDot = false,
    tmMax = 999,
    tmShowZero = false,
    tmTranslate = { x: 0, y: 0 },
    tmValue = 0,
    className = "",
    style = {},
  } = props;

  // const [number, setNumber] = useState<number | string>(0);

  const renderBadge = useMemo(() => {
    // 是否显示零值
    if (tmShowZero || (!tmShowZero && tmValue > 0)) {
      // 显示为数字或点标
      if (tmDot) {
        return (
          <View
            className="tm-badge__slot tm-badge__slot-dot"
            style={{
              backgroundColor: tmColor,
            }}
          />
        );
      }
      return (
        <View
          className="tm-badge__slot tm-badge__slot-number"
          style={{
            backgroundColor: tmColor,
            padding: tmValue < 10 ? "0 2px" : "0 5px",
          }}
        >
          {tmValue < tmMax ? (
            tmValue
          ) : (
            <View className="tm-badge__slot-number-has-plus">
              {tmMax}
              <View className="tm-badge__slot-number-plus">+</View>
            </View>
          )}
        </View>
      );
    }
  }, [tmShowZero, tmValue, tmDot, tmColor]);

  return (
    <View className={classNames("tm-badge", className)} style={style}>
      <View
        className="tm-badge__content"
        style={{
          transform: `translate3d(${transformPx(tmTranslate.x)},${transformPx(
            tmTranslate.y
          )},0)`,
        }}
      >
        {renderBadge}
      </View>
      {/* 自定义元素撑开 */}
      {props.children}
    </View>
  );
}

export default TmBadge;
