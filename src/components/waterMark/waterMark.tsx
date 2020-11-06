import React, { ReactNode } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { transformPx } from "../../functions";

export interface waterMarkProps {
  tmOpacity?: number; // 透明度
  tmSpace?: number; // 间距
  tmText?: string | ReactNode; // 水印内容
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmWaterMark(props: waterMarkProps) {
  const {
    tmOpacity = 0.1,
    tmSpace = 100,
    tmText = "",
    className = "",
    style = {},
  } = props;

  return (
    <View className={classNames("tm-water-mark", className)} style={style}>
      <View
        className="tm-water-mark__content"
        style={{
          opacity: tmOpacity,
        }}
      >
        {Array(10)
          .fill("")
          .map((_item, index) => {
            return (
              <View
                className="tm-water-mark__line"
                key={`tm-water-mark-line-index-${index}`}
                style={{ marginBottom: transformPx(tmSpace) }}
              >
                {Array(10)
                  .fill("")
                  .map((_cItem, cIndex) => {
                    return (
                      <View
                        className="tm-water-mark__item"
                        key={`tm-water-mark-item-index-${index}-${cIndex}`}
                        style={{
                          marginLeft:
                            index % 2 === 0 && cIndex === 0
                              ? 0
                              : transformPx(tmSpace),
                        }}
                      >
                        {tmText}
                      </View>
                    );
                  })}
              </View>
            );
          })}
      </View>
      <View className="tm-water-mark__slot">{props.children}</View>
    </View>
  );
}

export default TmWaterMark;
