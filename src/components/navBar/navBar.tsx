import * as raf from "raf";

import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import Taro, {
  createSelectorQuery,
  getEnv,
  navigateBack,
  switchTab,
  getCurrentPages,
} from "@tarojs/taro";

import { View } from "@tarojs/components";
import classNames from "classnames";
import throttle from "lodash/throttle";
import { TmDivider, TmIcon, useStore } from "../../index";
import { observer } from "mobx-react-lite";

interface PropsInterface {
  tmBackground?: string; // 背景色
  tmDynamicOpacity?: boolean; // 根据滚动距离设置透明度
  tmFilling?: boolean; // 是否填充高度
  tmHideBtn?: boolean; // 隐藏返回按钮
  tmHideMenu?: boolean; // 隐藏菜单按钮
  tmTheme?: "light" | "dark"; // 按钮风格
  tmTitle?: string | ReactNode; // 页面标题
  tmShadow?: boolean; // 显示阴影
  children?: any; // 客制slot，若已设置title，slot无效
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
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

const TmNavBar = observer((props: PropsInterface) => {
  const {
    tmBackground = "white",
    tmDynamicOpacity = false,
    tmFilling = true,
    tmHideBtn = false,
    tmHideMenu = false,
    tmTheme = "light",
    tmTitle = "",
    tmShadow = false,
    className = "",
    style = {},
  } = props;

  let prevScrollTop: number = 0; // 前一次滚动距离
  let scrollListener: any = null; // 存储定时器id

  // 读取 store
  const { navBarStore, systemStore } = useStore();

  // 整体样式
  const [navBarStyle, setNavBarStyle] = useState<navBarStyleInterface>({
    fixedPartStyle: {},
    navBtnStyle: {},
    contentStyle: {},
    staticPartStyle: {},
  });

  // 背景色
  const [background, setBackground] = useState(
    `background:${tmBackground || "transparent"};opacity:${
      tmDynamicOpacity ? 0 : 1
    }`
  );

  // 计算navBar样式
  const calcStyle = (systemInfo: SystemInfoInterface) => {
    const {
      pageInfo: { windowWidth }, // 可视宽度
      navBarInfo: {
        statusBarHeight, // 状态栏高度
        navBarHeight, // 胶囊高度
        navBarExtendHeight, // 导航底部到胶囊的内间距
      },
      capsuleInfo: {
        marginRight, // 胶囊右外边距
        width: capsuleWidth, // 胶囊宽度
        height: capsuleHeight, // 胶囊高度
      },
    } = systemInfo;

    // 主体样式
    const fixedPartStyle = {
      // 高度=基础高度+拓展条高度
      height: `${navBarHeight + navBarExtendHeight}px`,
      // 内间距：状态栏高度、胶囊宽度+胶囊右外边距、拓展条高度、胶囊右外边距（为与右侧间隙保持一致）
      padding: `${statusBarHeight}px ${
        marginRight + capsuleWidth
      }px ${navBarExtendHeight}px ${marginRight}px`,
    };

    // 操作按钮样式
    const navBtnStyle = {
      height: `${capsuleHeight}px`,
      width: `${tmHideMenu ? capsuleWidth / 2 : capsuleWidth}px`,
    };

    // 内容区域样式
    const contentStyle = {
      height: `${navBarHeight - statusBarHeight}px`,
      width: `${windowWidth - (marginRight * 4 + capsuleWidth) * 2}px`,
      top: `${statusBarHeight}px`,
    };

    // 高度填充物样式
    const staticPartStyle = {
      height: `${tmFilling ? navBarHeight + navBarExtendHeight : 0}px`,
    };

    return {
      fixedPartStyle,
      navBtnStyle,
      contentStyle,
      staticPartStyle,
    };
  };

  // 点击返回按钮
  const handleBackBtnClick = throttle(
    () => {
      // 判断是否是首次载入

      navBarStore.isFirstLoad
        ? switchTab({
            // @ts-ignore
            url: `/${Taro.Current["app"]["config"].pages[0]}`,
          }).then()
        : navigateBack({ delta: 1 }).then();
    },
    500,
    { trailing: false }
  );

  // 点击菜单按钮
  const handleMenuClick = throttle(() => {}, 500, { trailing: false });

  // 根据滚动距离设置背景透明度
  const updateOpacity = (scrollTop) => {
    const percent = tmDynamicOpacity ? Number((scrollTop / 140).toFixed(2)) : 1;
    setBackground(
      `background:${tmBackground};opacity:${percent >= 1 ? 1 : percent}`
    );
  };

  // 设置滚动监听
  const setOpacityTimer = () => {
    if (getEnv() === "WEB") {
      const { scrollTop } = document.querySelector(".taro-tabbar__panel")!;
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
    // 如果当前的页面栈的长度大于0，说明已经不是首次载入
    if (getCurrentPages().length > 0) {
      navBarStore.setNotFirstLoad();
    }
    // 设置导航条样式
    setNavBarStyle(calcStyle(systemStore.systemInfo));
  }, []);

  // 监听页面滚动
  useEffect(() => {
    if (tmDynamicOpacity) {
      raf(setOpacityTimer);
    }
    return () => {
      cancelAnimationFrame(scrollListener);
    };
  }, []);

  return (
    <View
      className={classNames(
        "tm-nav-bar",
        {
          "tm-nav-bar-shadow": tmShadow,
        },
        className
      )}
      style={{ ...navBarStyle.staticPartStyle, ...style }}
    >
      <View className="tm-nav-bar__content" style={navBarStyle.fixedPartStyle}>
        {!tmHideBtn && (
          <View
            className={classNames(
              "tm-nav-bar__action",
              `tm-nav-bar__${tmTheme}`
            )}
            style={navBarStyle.navBtnStyle}
          >
            {/* 返回按钮 */}
            <TmIcon
              tmValue={navBarStore.isFirstLoad ? "home" : "arrow_left"}
              onClick={handleBackBtnClick}
              className={classNames("tm-nav-bar__action-btn", {
                "tm-nav-bar__action-btn-single": tmHideMenu,
              })}
            />
            {!tmHideMenu && [
              // 分割线
              <TmDivider key={"tm-nav-bar__divider"} tmVertical tmSpace={12} />,
              // 菜单按钮
              <TmIcon
                className={"tm-nav-bar__action-btn"}
                tmValue="list"
                onClick={handleMenuClick}
                key={"tm-nav-bar__menu-btn"}
              />,
            ]}
          </View>
        )}
        {/* 显示插槽或者自定义标题 */}
        <View className="tm-nav-bar__slot" style={navBarStyle.contentStyle}>
          {tmTitle && <View className="tm-nav-bar__title">{tmTitle}</View>}
          {props.children}
        </View>
        {/* 背景填充 */}
        <View className="tm-nav-bar__background" style={background} />
      </View>
    </View>
  );
});

export default TmNavBar;
