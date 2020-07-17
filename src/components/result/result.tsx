import "./result.scss";

import React, {ReactNode, useLayoutEffect, useState} from "react";
import {TmIcon, TmImage} from "../index";
import {colorDanger, colorPrimary, colorSuccess, colorWarning,} from "../_style/theme";

import {View} from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmSubtitle?: ReactNode; // 自定义描述
  tmIcon?: ReactNode; // 自定义图标
  tmTitle?: ReactNode; // 自定义标题
  tmType?:
    | "success"
    | "error"
    | "warning"
    | "waiting"
    | "empty"
    | "network"
    | 404; // 处理状态
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

interface ConfigInterface {
  icon?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
}

function TmResult(props: PropsInterface) {
  const {
    tmSubtitle = "",
    tmIcon = "",
    tmTitle = "",
    tmType = "default",
    className = "",
    style = {},
  } = props;

  const [config, setConfig] = useState<ConfigInterface>({
    icon: null,
    title: null,
    subtitle: null,
  });

  const renderIcon = () => {
    const defaultConfig = {
      default: {},
      success: {
        icon: <TmIcon tmValue={"chenggong_fill"} tmColor={colorSuccess}/>,
      },
      error: {
        icon: <TmIcon tmValue={"shibai_fill"} tmColor={colorDanger}/>,
      },
      warning: {
        icon: <TmIcon tmValue={"jinggao_fill"} tmColor={colorWarning}/>,
      },
      waiting: {
        icon: <TmIcon tmValue={"shijian_fill"} tmColor={colorPrimary}/>,
      },
      empty: {
        icon: (
          <TmImage
            tmSrc={"/assets/image/component-result/empty.png"}
            style={{width: "150px", height: "150px"}}
          />
        ),
        subtitle: "暂无数据",
      },
      network: {
        icon: (
          <TmImage
            tmSrc={"/assets/image/component-result/500.png"}
            style={{width: "150px", height: "150px"}}
          />
        ),
        title: "网络连接异常",
        subtitle: "点击屏幕，重新加载",
      },
      404: {
        icon: (
          <TmImage
            tmSrc={"/assets/image/component-result/404.png"}
            style={{width: "150px", height: "150px"}}
          />
        ),
        title: "404",
        subtitle: "您要访问的页面不存在",
      },
    };
    setConfig(defaultConfig[tmType]);
  };

  useLayoutEffect(() => {
    renderIcon();
  }, [tmType]);

  return (
    <View className={classNames("tm-result", className)} style={style}>
      {(config.icon || tmIcon) && (
        <View className="tm-result__icon">{tmIcon || config.icon}</View>
      )}
      {(config.title || tmTitle) && (
        <View className="tm-result__title">{tmTitle || config.title}</View>
      )}
      {(config.subtitle || tmSubtitle) && (
        <View className="tm-result__subtitle">
          {tmSubtitle || config.subtitle}
        </View>
      )}
      {props.children && (
        <View className="tm-result__slot">{props.children}</View>
      )}
    </View>
  );
}

export default TmResult;
