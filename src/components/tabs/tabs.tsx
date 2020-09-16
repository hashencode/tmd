import "./tabs.scss";

import React, { ReactNode, useLayoutEffect, useState } from "react";

import TabsContext from "./_context";
import { Swiper, View } from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmActiveIndex?: string; // 当前索引
  tmBodyStyle?: object; // 底部样式
  tmDefaultIndex?: number; // 默认激活子项index值
  tmDuration?: number; // 滑动动画时长
  tmHeadItemActiveClassName?: string; // 激活类名
  tmHeadItemClassName?: string; // 默认类名
  tmHeadStyle?: object; // 头部样式
  tmHideUnderline?: boolean; // 隐藏下划线
  tmTransition?:
    | "default"
    | "linear"
    | "easeInCubic"
    | "easeOutCubic"
    | "easeInOutCubic";
  tmLazyLoad?: boolean; // 懒加载
  tmVertical?: boolean; // 竖向显示
  onChange?: (index?: number) => void; // 切换回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

interface HeadDataInterface {
  tmTitle: string | ReactNode;
  index: number;
}

function TmTabs(props: PropsInterface) {
  const {
    tmActiveIndex = "-1",
    tmBodyStyle = {},
    tmDefaultIndex = -1,
    tmDuration = 300,
    tmHeadItemActiveClassName = "",
    tmHeadItemClassName = "",
    tmHeadStyle = {},
    tmHideUnderline = false,
    tmLazyLoad = false,
    tmTransition = "default",
    tmVertical = false,
    onChange = () => {},
    className = "",
    style = {},
  } = props;

  // 头部数据数组
  const [headData, setHeadData] = useState<HeadDataInterface[]>([]);
  // 当前激活的子项index值
  const [activeIndex, setActiveIndex] = useState("0");
  // 存储已经被激活过的子项的index值
  const [indexCache, setIndexCache] = useState<string[]>([]);

  // 处理点击事件
  const handleHeadItemClick = ({ index }) => {
    const indexString = index.toString();
    // 如果index值没改变，则不做改变
    if (indexString !== tmActiveIndex) {
      setActiveIndex(indexString);
      onChange(index);
      // 如果切换后不销毁，则在keyCache内加入当前key
      if (!indexCache.includes(indexString)) {
        setIndexCache([...indexCache, indexString]);
      }
    }
  };

  const handleSwiperChange = (event) => {
    handleHeadItemClick({ index: event.detail.current });
  };

  // 获取子组件的title信息
  useLayoutEffect(() => {
    const childData: any[] = [];
    React.Children.map(props.children, (item) => {
      if (React.isValidElement(item)) {
        const { tmTitle = "" } = item["props"] as HeadDataInterface;
        childData.push({ tmTitle });
      }
    });
    setHeadData(childData);
    handleHeadItemClick({
      index: tmDefaultIndex || 0,
    });
  }, []);

  useLayoutEffect(() => {
    if (tmActiveIndex) handleHeadItemClick({ index: tmActiveIndex });
  }, [tmActiveIndex]);

  return (
    <View
      className={classNames(
        "tm-tabs",
        tmVertical ? "tm-tabs-vertical" : "tm-tabs-horizon",
        className
      )}
      style={style}
    >
      {/*头部按钮*/}
      <View className="tm-tabs__head" style={tmHeadStyle}>
        {headData.map((item, index) => {
          return (
            <View
              className={classNames("tm-tabs__head-item", tmHeadItemClassName, {
                "tm-tabs__head-item-has-underline": !tmHideUnderline,
                "tm-tabs__head-item-active": Number(activeIndex) === index,
                [tmHeadItemActiveClassName]: Number(activeIndex) === index,
              })}
              key={`tm-tabs__head-item-${item.tmTitle}-${index}`}
              onClick={() => {
                handleHeadItemClick({ index });
              }}
            >
              {item.tmTitle}
            </View>
          );
        })}
      </View>
      {/*主要内容*/}
      <View className="tm-tabs__body" style={tmBodyStyle}>
        <TabsContext.Provider
          value={{
            activeIndex,
            indexCache,
            tmLazyLoad,
          }}
        >
          <Swiper
            easingFunction={tmTransition}
            duration={tmDuration}
            onChange={handleSwiperChange}
            current={Number(activeIndex)}
          >
            {props.children}
          </Swiper>
        </TabsContext.Provider>
      </View>
    </View>
  );
}

export default TmTabs;
