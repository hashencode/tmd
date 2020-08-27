import "./tabs.scss";

import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import TabsContext from "./_context";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { createSelectorQuery } from "@tarojs/taro";

interface PropsInterface {
  tmActiveKey?: string; // 当前值
  tmActiveClassname?: string; // 激活类名
  tmBodyStyle?: object; // 底部样式
  tmDefaultKey?: string; // 默认激活子项key值
  tmDefaultClassname?: string; // 默认类名
  tmHeadStyle?: object; // 头部样式
  tmHideUnderline?: boolean; // 隐藏下划线
  tmLazyLoad?: boolean; // 懒加载
  tmUnderlineStyle?: {}; // 下划线样式
  tmVertical?: boolean; // 竖向显示
  onChange?: (key?: string) => void; // 切换回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

interface HeadDataInterface {
  tmTitle?: string | ReactNode;
  tmKey: string;
}

interface HeadItemPositionInterface {
  height?: string;
  top?: string;
  width?: string;
  left?: string;
  tmKey: string;
}

function TmTabs(props: PropsInterface) {
  const {
    tmActiveKey = "",
    tmActiveClassname = "",
    tmBodyStyle = {},
    tmDefaultKey = "",
    tmDefaultClassname = "",
    tmHeadStyle = {},
    tmHideUnderline = false,
    tmLazyLoad = true,
    tmUnderlineStyle = {},
    tmVertical = false,
    onChange = () => {},
    className = "",
    style = {},
  } = props;

  // 头部数据数组
  const [headData, setHeadData] = useState<HeadDataInterface[]>([]);
  // 下划线样式
  const [lineStyle, setLineStyle] = useState({});
  // 当前激活的子项的key值
  const [activeKey, setActiveKey] = useState(tmDefaultKey);
  // 存储已经被激活过的子项的key值
  const [keyCache, setKeyCache] = useState<string[]>([]);
  // 记录每一个子项的位置信息
  const headItemPosition = useRef<HeadItemPositionInterface[]>([]);
  // 生成唯一id，用于querySelect
  const uniqueId = useRef(
    "ID" + Math.random().toString().slice(5, 10) + new Date().getTime()
  );

  // 处理点击事件
  const handleHeadItemClick = ({ key }) => {
    // 如果key值没改变，则不做改变
    if (key !== tmActiveKey) {
      setActiveKey(key);
      onChange(key);
      // 设置线条的位置
      headItemPosition.current.map(({ tmKey, left, width, height, top }) => {
        if (tmKey === key) {
          if (tmVertical) {
            setLineStyle({
              height: `${height}px`,
              top: `${top}px`,
            });
          } else {
            setLineStyle({
              width: `${width}px`,
              left: `${left}px`,
            });
          }
        }
      });
      // 如果切换后不销毁，则在keyCache内加入当前key
      if (!keyCache.includes(key)) {
        setKeyCache([...keyCache, key]);
      }
    }
  };

  // 获取子组件的key和title信息
  useLayoutEffect(() => {
    const childData: any[] = [];
    React.Children.map(props.children, (item) => {
      if (React.isValidElement(item)) {
        const { tmTitle = "", tmKey } = item["props"] as HeadDataInterface;
        childData.push({ tmTitle, tmKey });
      }
    });
    setHeadData(childData);
    // 如果未设置默认key值，则使用第一个子组件的key值
    if (!tmDefaultKey) {
      setActiveKey(childData[0].tmKey);
    }
  }, []);

  // 计算头部元素和子组件的位置信息
  useEffect(() => {
    if (!tmHideUnderline) {
      // @ts-ignore
      const query = createSelectorQuery();
      let headLeft = 0,
        headTop = 0;
      // 获取head元素的left数值
      query
        .select(`#${uniqueId.current}`)
        .boundingClientRect(({ left, top }) => {
          headLeft = left;
          headTop = top;
        })
        .exec(() => {
          // 获取每一项headItem元素的位置信息
          query
            .selectAll(`#${uniqueId.current} .tm-tabs__head-item`)
            .boundingClientRect((res: any) => {
              if (res && res.length > 0 && headData.length > 0) {
                headItemPosition.current = res.map((item, index) => {
                  return {
                    ...item,
                    tmKey: headData[index].tmKey,
                    left: item.left - headLeft,
                    top: item.top - headTop,
                  };
                });
              }
            })
            .exec(() => {
              if (headData.length > 0) {
                handleHeadItemClick({
                  key: tmActiveKey || tmDefaultKey || headData[0].tmKey,
                });
              }
            });
        });
    } else {
      if (headData.length > 0) {
        handleHeadItemClick({
          key: tmActiveKey || tmDefaultKey || headData[0].tmKey,
        });
      }
    }
  }, [headData]);

  useLayoutEffect(() => {
    if (tmActiveKey) handleHeadItemClick({ key: tmActiveKey });
  }, [tmActiveKey]);

  return (
    <View
      id={uniqueId.current}
      className={classNames(
        "tm-tabs",
        tmVertical ? "tm-tabs-vertical" : "tm-tabs-horizon",
        className
      )}
      style={style}
    >
      {/*头部按钮*/}
      <View className="tm-tabs__head" style={tmHeadStyle}>
        {headData.map((item) => {
          return (
            <View
              className={classNames("tm-tabs__head-item", {
                "tm-tabs__head-item-active": activeKey === item.tmKey,
                [tmDefaultClassname]: true,
                [tmActiveClassname]: activeKey === item.tmKey,
              })}
              key={item.tmKey}
              onClick={() => {
                handleHeadItemClick({ key: item.tmKey });
              }}
            >
              {item.tmTitle}
            </View>
          );
        })}
        {/*下划线*/}
        <View
          className="tm-tabs__head-underline"
          style={{ ...tmUnderlineStyle, ...lineStyle }}
        />
      </View>
      {/*主要内容*/}
      <View className="tm-tabs__body" style={tmBodyStyle}>
        <TabsContext.Provider
          value={{
            activeKey: activeKey,
            keyCache: keyCache,
            tmLazyLoad,
          }}
        >
          {props.children}
        </TabsContext.Provider>
      </View>
    </View>
  );
}

export default TmTabs;
