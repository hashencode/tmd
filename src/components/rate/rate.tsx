import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon, TmImage } from "../../index";
import { colorWarning } from "../../functions/theme";

interface PropsInterface {
  tmShape?: "star" | "face"; // 外形
  tmIcon?: string; // 未激活图标
  tmActiveIcon?: string; // 激活状态图标
  tmColor?: string; // 自定义激活颜色
  tmValue?: number | string; // 当前值
  onChange?: (value?: number) => void; // 输入变化回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmRate(props: PropsInterface) {
  const {
    tmShape = "star",
    tmIcon = "collect",
    tmActiveIcon = "collect_fill",
    tmColor = colorWarning,
    tmValue = -1,
    onChange = () => {},
    className = "",
    style = {},
  } = props;

  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleItemClick = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      onChange(index);
    }
  };

  useEffect(() => {}, [tmValue]);

  return (
    <View className={classNames("tm-rate", className)} style={style}>
      {Array(5)
        .fill("")
        .map((_item, index) => {
          return tmShape === "star" ? (
            // 星形外观
            // 根据 currentIndex 显示对应的 icon
            currentIndex >= index ? (
              <TmIcon
                className="tm-rate__item-star tm-rate__item-star-active"
                tmValue={tmActiveIcon}
                key={`tm-rate__item-star-active-${index}`}
                onClick={() => {
                  handleItemClick(index);
                }}
                style={{
                  color: tmColor,
                }}
              />
            ) : (
              <TmIcon
                className="tm-rate__item-star"
                tmValue={tmIcon}
                key={`tm-rate__item-star-${index}`}
                onClick={() => {
                  handleItemClick(index);
                }}
              />
            )
          ) : (
            // emojy 外观
            <TmImage
              className={classNames("tm-rate__item-face", {
                "tm-rate__item-face-active": currentIndex === index,
              })}
              tmSrc={`/assets/image/component-rate/rate${index + 1}.png`}
              key={`tm-rate__item-${index}`}
              onClick={() => {
                handleItemClick(index);
              }}
            />
          );
        })}
    </View>
  );
}

export default TmRate;
