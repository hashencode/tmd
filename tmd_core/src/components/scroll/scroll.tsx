import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ScrollView, View } from "@tarojs/components";

import classNames from "classnames";
import { BaseEventOrigFunction } from "@tarojs/components/types/common";

interface PropsInterface {
  tmLowerThreshold?: number; // 触发加载事件距离
  tmTriggerDistance?: number; // 下拉刷新激活高度
  tmRefresher?: string | ReactNode;
  onScrollToLower?: BaseEventOrigFunction<any>; // 触底回调
  onRefresh?: ({}: { status: string }) => void; // 下拉刷新回调
  onScroll?: BaseEventOrigFunction<any>; // 滚动事件监听
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmScroll(props: PropsInterface, ref) {
  const {
    tmLowerThreshold = 100,
    tmTriggerDistance = 50,
    tmRefresher = "",
    onScrollToLower = () => {},
    onRefresh = () => {},
    onScroll = () => {},
    className = "",
    style = {},
  } = props;

  // 配置项
  const config = useRef({
    isPending: false, // 触发下拉刷新
    isUpper: true, // 是否触顶
    // 刷新或加载结果类型，有4中状态：
    // pending：未触发刷新；
    // ready：已触发未释放；
    // doing：正在刷新；
    // done：已完成刷新；
    refreshStatus: "pending",
    startY: 0, // 滑动开始时的位置
  });
  // 页面滚动数值
  const [scrollTopValue, setScrollTopValue] = useState(0);
  // 正在刷新状态
  const [isPending, setIsPending] = useState(false);
  // 偏移样式
  const [scrollViewStyle, setScrollViewStyle] = useState("");

  const handleScroll = (event) => {
    if (event.detail.scrollTop > 0) config.current.isUpper = false;
    onScroll(event);
  };

  // 触顶
  const handleScrollToUpper = () => {
    config.current.isUpper = true;
  };

  // 触控开始
  const handleTouchStart = (event) => {
    // 记录初始Y值
    config.current.startY = event.touches[0].pageY;
  };

  // 触控中
  const handleTouchMove = (event) => {
    // 首先判断滚动方向
    const vector = event.touches[0].pageY - config.current.startY;
    // 判断是否为向下滑动
    if (vector > 0) {
      // 向下滑动
      // 判断是否已经触顶，如果触顶，则视作开始下拉刷新
      // 如果未触顶，则视作正常滚动
      if (config.current.isUpper) {
        // isPadding:视为开始下拉刷新
        config.current.isPending = true;
        setIsPending(true);
      }
      // 下面的代码只有在处于刷新状态中才会触发，用于设置样式
      // 如果是在刷新过程中 或 不允许下拉刷新，不对scrollView进行操作
      if (
        config.current.isPending &&
        config.current.refreshStatus !== "doing"
      ) {
        event.preventDefault();
        event.stopPropagation();
        // 清空scrollView样式，如果translate属性，滚动会不流畅
        setScrollViewStyle("");
        // 计算偏移量，缓动效果
        const translateY = Math.pow(10, Math.log10(Math.abs(vector)) / 1.3);
        // 当滑动距离超过触发距离3倍时，停止增加偏移量
        if (translateY < tmTriggerDistance * 3) {
          // 设置 scrollView 的样式
          setScrollViewStyle(`transform:translateY(${translateY}px)`);
        }
        // 设置是否准备刷新
        const status = translateY >= tmTriggerDistance ? "ready" : "pending";
        config.current.refreshStatus = status;
        onRefresh({ status });
      }
    }
  };

  // 触控结束
  const handleTouchEnd = () => {
    // 判断当前刷新状态，如果是未达到触发刷新的距离，即refreshStatus!=ready，则直接收缩0
    // 如果已经达到或大于触发的距离，即refreshStatus==ready，则收缩到触发刷新的距离
    if (!config.current.isPending) return;
    if (config.current.refreshStatus === "pending") {
      shrinkMotion({ aimY: 0 }).then(() => {
        config.current.isPending = false;
        setIsPending(false);
      });
    } else if (config.current.refreshStatus === "ready") {
      config.current.refreshStatus = "doing";
      shrinkMotion({ aimY: tmTriggerDistance }).then(() => {
        onRefresh({ status: "doing" });
      });
    }
  };

  // 设置区域收缩动画
  const shrinkMotion = ({
    aimY, // 目标Y值
    delay = 0, // 完成时，收起时间延迟
  }) => {
    return new Promise((resolve) => {
      setScrollViewStyle(
        `transform:translateY(${aimY}px);transition:all .3s;transition-delay:${
          delay / 1000
        }s`
      );
      resolve();
    });
  };

  // 开始刷新
  const startRefreshing = () => {
    // 如果当前未触顶触发刷新（代码调用刷新）则需要先将scrollTop设置为0
    if (!config.current.isUpper) {
      setScrollTopValue(1);
      setScrollTopValue(0);
    }
    config.current = {
      ...config.current,
      isPending: true,
      refreshStatus: "doing",
      isUpper: true,
    };
    setIsPending(true);
    onRefresh({ status: "doing" });
    shrinkMotion({ aimY: tmTriggerDistance }).then();
  };

  // 停止刷新
  const stopRefreshing = () => {
    config.current = {
      ...config.current,
      isPending: false,
      refreshStatus: "done",
    };
    setIsPending(false);
    onRefresh({ status: "done" });
    shrinkMotion({ aimY: 0 }).then();
  };

  // 向父组件传递内部方法
  useImperativeHandle(ref, () => ({
    startRefreshing,
    stopRefreshing,
  }));

  return (
    <View className={classNames("tm-scroll", className)} style={style}>
      {/* 刷新提示文字 */}
      <View className="tm-scroll__refresher" style={scrollViewStyle}>
        {tmRefresher}
      </View>
      {/* 滚动容器 */}
      <ScrollView
        lowerThreshold={tmLowerThreshold}
        onScroll={handleScroll}
        onScrollToLower={onScrollToLower}
        onScrollToUpper={handleScrollToUpper}
        onTouchCancel={handleTouchEnd}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        scrollTop={scrollTopValue}
        scrollY={!isPending}
        scrollWithAnimation
        className="tm-scroll__slot"
        style={scrollViewStyle}
      >
        {props.children}
      </ScrollView>
    </View>
  );
}

export default forwardRef(TmScroll);
