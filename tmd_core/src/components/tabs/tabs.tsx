import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";

import { Swiper, View } from "@tarojs/components";
import classNames from "classnames";
import TabsContext from "./_context";

interface PropsInterface {
  tmActiveKey?: string; // 当前索引
  tmBodyStyle?: object; // 底部样式
  tmDefaultKey?: string; // 默认激活子项key值
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
  onChange?: (index?: string) => void; // 切换回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

interface HeadDataInterface {
  tmTitle: string | ReactNode; // 标题
  tmId: string; // 唯一ID
  index: number; // 索引值
}

function TmTabs(props: PropsInterface) {
  const {
    tmActiveKey = "",
    tmBodyStyle = {},
    tmDefaultKey = "",
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
  // 按顺序保存key值
  const [keysArray, setKeysArray] = useState<string[]>([]);
  // 当前激活的子项key值
  const [activeKey, setActiveKey] = useState<string>("");
  // 当前激活的子项index值
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // 存储已经被激活过的子项的index值
  const [keyCache, setKeyCache] = useState<string[]>([]);
  // 判断是否首次渲染
  const isFirstLoad = useRef(true);

  // 处理点击事件
  const handleHeadItemClick = ({ key }) => {
    // 如果key值没改变，则不做改变
    if (activeKey !== key) {
      setActiveKey(key);
      setActiveIndex(keysArray.indexOf(key));
      onChange(key);
      // 如果切换后不销毁，则在keyCache内加入当前key
      if (!keyCache.includes(key)) {
        setKeyCache([...keyCache, key]);
      }
    }
  };

  // 左右滑动回调
  const handleSwiperChange = (event) => {
    handleHeadItemClick({ key: keysArray[event.detail.current] });
  };

  // 获取子组件的title信息
  useLayoutEffect(() => {
    const childData: any[] = [];
    const keysData: string[] = [];
    React.Children.map(props.children, (item, index) => {
      if (React.isValidElement(item)) {
        const { tmTitle, tmId } = item.props as HeadDataInterface;
        childData.push({ tmTitle, tmId, index });
        keysData.push(tmId);
      }
    });
    setHeadData(childData);
    setKeysArray(keysData);
    if (isFirstLoad) {
      // 如果是首次渲染，则设定默认值
      if (tmDefaultKey) {
        setActiveKey(tmDefaultKey);
        setActiveIndex(keysData.indexOf(tmDefaultKey));
        setKeyCache([...keyCache, tmDefaultKey]);
      } else {
        setActiveKey(childData[0].tmId);
        setKeyCache([...keyCache, childData[0].tmId]);
      }
    }
    isFirstLoad.current = false;
  }, [props.children]);

  useLayoutEffect(() => {
    if (tmActiveKey) handleHeadItemClick({ key: tmActiveKey });
  }, [tmActiveKey]);

  return (
    <View
      className={classNames(
        "tm-tabs",
        tmVertical ? "tm-tabs-vertical" : "tm-tabs-horizon",
        className
      )}
      style={style}
    >
      {/* 头部按钮 */}
      <View className="tm-tabs__head" style={tmHeadStyle}>
        {headData.map(({ tmTitle, tmId }) => {
          return (
            <View
              className={classNames("tm-tabs__head-item", tmHeadItemClassName, {
                "tm-tabs__head-item-has-underline": !tmHideUnderline,
                "tm-tabs__head-item-active": tmId === activeKey,
                [tmHeadItemActiveClassName]: tmId === activeKey,
              })}
              key={`tm-tabs__head-item-${tmTitle}-${tmId}`}
              onClick={() => {
                handleHeadItemClick({ key: tmId });
              }}
            >
              {tmTitle}
            </View>
          );
        })}
      </View>
      {/* 主要内容 */}
      <View className="tm-tabs__body" style={tmBodyStyle}>
        <TabsContext.Provider
          value={{
            activeKey,
            keyCache,
            tmLazyLoad,
          }}
        >
          <Swiper
            easingFunction={tmTransition}
            duration={tmDuration}
            onChange={handleSwiperChange}
            current={activeIndex}
          >
            {props.children}
          </Swiper>
        </TabsContext.Provider>
      </View>
    </View>
  );
}

export default TmTabs;
