import "./navBar.scss";

import * as raf from "raf";

import React, { ReactNode, useLayoutEffect, useState } from "react";
import {
  getEnv,
  useDidHide,
  useDidShow,
  redirectTo,
  navigateBack,
  createSelectorQuery,
  getStorageSync,
  setStorageSync
} from "@tarojs/taro";
import { TmDivider, TmIcon } from "../index";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { getGlobalSystemInfo } from "../_scripts";
import throttle from "lodash/throttle";

interface PropsInterface {
  tmBackground?: string; // 背景色
  tmDynamicOpacity?: boolean; // 根据滚动距离设置透明度
  tmFilling?: boolean; // 是否填充高度
  tmHideBtn?: boolean; // 隐藏返回按钮
  tmTheme?: "light" | "dark"; // 按钮风格
  tmTitle?: ReactNode; // 页面标题
  children?: any; // 客制slot，若已设置title，slot无效
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

interface navBarStyleInterface {
  fixedPartStyle: object;
  navBtnStyle: object;
  staticPartStyle: object;
  contentStyle: object;
}

interface SystemInfoInterface {
  capsuleInfo: any;
  pageInfo: any;
  navBarInfo: any;
}

function TmNavBar(props: PropsInterface) {
  const {
    tmBackground = "white",
    tmDynamicOpacity = false,
    tmFilling = true,
    tmHideBtn = false,
    tmTheme = "light",
    tmTitle = "",
    className = "",
    style = {}
  } = props;

  let prevScrollTop: number = 0; // 前一次滚动距离
  let scrollListener: any = null; // 存储定时器id

  const [navBarStyle, setNavBarStyle] = useState<navBarStyleInterface>({
    fixedPartStyle: {},
    navBtnStyle: {},
    contentStyle: {},
    staticPartStyle: {}
  });
  const [background, setBackground] = useState(
    `background:${tmBackground ? tmBackground : "transparent"};opacity:${
      tmDynamicOpacity ? 0 : 1
    }`
  );
  const [isFirstLoad, setIsFirstLoad] = useState(false); // 是否是第一次载入页面

  // 计算navBar样式
  const calcStyle = (systemInfo: SystemInfoInterface) => {
    const {
      pageInfo: { windowWidth }, // 可视宽度
      navBarInfo: {
        statusBarHeight, // 状态栏高度
        navBarHeight, // 胶囊高度
        navBarExtendHeight // 导航底部到胶囊的内间距
      },
      capsuleInfo: {
        marginRight, // 胶囊右外边距
        width: capsuleWidth, // 胶囊宽度
        height: capsuleHeight // 胶囊高度
      }
    } = systemInfo;

    // 主体样式
    const fixedPartStyle = {
      // 高度=基础高度+拓展条高度
      height: `${navBarHeight + navBarExtendHeight}px`,
      // 内间距：状态栏高度、胶囊宽度+胶囊右外边距、拓展条高度、胶囊右外边距（为与右侧间隙保持一致）
      padding: `${statusBarHeight}px ${marginRight +
        capsuleWidth}px ${navBarExtendHeight}px ${marginRight}px`
    };

    // 操作按钮样式
    const navBtnStyle = {
      height: `${capsuleHeight}px`,
      width: `${capsuleWidth}px`
    };

    // 内容区域样式
    const contentStyle = {
      height: `${navBarHeight - statusBarHeight}px`,
      width: `${windowWidth - (marginRight * 4 + capsuleWidth) * 2}px`,
      top: `${statusBarHeight}px`
    };

    // 高度填充物样式
    const staticPartStyle = {
      height: `${tmFilling ? navBarHeight + navBarExtendHeight : 0}px`
    };

    return {
      fixedPartStyle,
      navBtnStyle,
      contentStyle,
      staticPartStyle
    };
  };

  // 点击返回按钮
  const handleBackBtnClick = throttle(
    () => {
      if (isFirstLoad) {
        redirectTo({ url: "/pages/index/index" });
      } else {
        navigateBack({ delta: 1 });
      }
    },
    500,
    { trailing: false }
  );

  // 根据滚动距离设置背景透明度
  const updateOpacity = scrollTop => {
    const percent = tmDynamicOpacity ? Number((scrollTop / 140).toFixed(2)) : 1;
    setBackground(
      `background:${tmBackground};opacity:${percent >= 1 ? 1 : percent}`
    );
  };

  // 设置滚动监听
  const setOpacityTimer = () => {
    if (getEnv() === "WEB") {
      const scrollTop = document.querySelector(".taro-tabbar__panel")!
        .scrollTop;
      if (prevScrollTop !== scrollTop) {
        prevScrollTop = scrollTop;
        updateOpacity(scrollTop > 0 ? scrollTop : 0);
      }
    } else {
      createSelectorQuery()
        .selectViewport()
        .scrollOffset(({ scrollTop }: any) => {
          if (prevScrollTop !== scrollTop) {
            prevScrollTop = scrollTop;
            updateOpacity(scrollTop > 0 ? scrollTop : 0);
          }
        })
        .exec();
    }
    scrollListener = raf(setOpacityTimer);
  };

  useLayoutEffect(() => {
    // 设置导航条样式
    setNavBarStyle(calcStyle(getGlobalSystemInfo()));
  }, []);

  useDidShow(() => {
    // 判断显示返回或者主页按钮
    if (getStorageSync("firstLoad") === "1") {
      setIsFirstLoad(true);
      setStorageSync("firstLoad", "0");
    } else {
      setIsFirstLoad(false);
    }
    // 监听页面滚动
    if (tmDynamicOpacity) {
      raf(setOpacityTimer);
    }
  });

  useDidHide(() => {
    cancelAnimationFrame(scrollListener);
  });

  return (
    <View
      className={classNames("tm-nav-bar", className)}
      style={{ ...navBarStyle.staticPartStyle, ...style }}
    >
      <View className="tm-nav-bar__content" style={navBarStyle.fixedPartStyle}>
        {!tmHideBtn && (
          <View
            className={classNames(
              "tm-nav-bar__back-btn",
              `tm-nav-bar__${tmTheme}`
            )}
            style={navBarStyle.navBtnStyle}
          >
            {/*返回按钮*/}
            <TmIcon
              tmValue={isFirstLoad ? "shouye" : "jiantou_zuo"}
              tmSize={40}
              onClick={handleBackBtnClick}
            />
            {/*分割线*/}
            <TmDivider tmVertical tmSpace={12} />
            {/*菜单按钮*/}
            <TmIcon tmValue={"liebiao"} tmSize={40} />
          </View>
        )}
        {/*显示插槽或者自定义标题*/}
        <View className="tm-nav-bar__slot" style={navBarStyle.contentStyle}>
          {tmTitle && <View className="tm-nav-bar__title">{tmTitle}</View>}
          {props.children}
        </View>
        {/*背景填充*/}
        <View className="tm-nav-bar__background" style={background} />
      </View>
    </View>
  );
}

export default TmNavBar;
