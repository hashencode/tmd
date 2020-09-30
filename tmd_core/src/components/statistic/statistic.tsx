import React, { useLayoutEffect, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import nzhcn from "nzh/cn";

interface PropsInterface {
  tmChinese?: "lower" | "upper" | "money"; // 大写中文
  tmThousandth?: boolean; // 千分位
  tmValue?: number; // 数值
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmStatistic(props: PropsInterface) {
  const {
    tmChinese = null,
    tmThousandth = false,
    tmValue = 0,
    className = "",
    style = {},
  } = props;

  const [formatValue, setFormatValue] = useState<number | string>(0);

  useLayoutEffect(() => {
    let newValue: number | string = tmValue;
    if (tmThousandth) {
      // 千分位
      if (newValue.toString().indexOf(".") !== -1) {
        newValue = Number(newValue).toLocaleString();
      } else {
        newValue = newValue.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      }
    } else if (tmChinese) {
      // 数字转中文
      switch (tmChinese) {
        case "lower":
          newValue = nzhcn.encodeS(newValue);
          break;
        case "upper":
          newValue = nzhcn.encodeB(newValue);
          break;
        case "money":
          newValue = nzhcn.toMoney(newValue);
          break;
      }
    }
    setFormatValue(newValue);
  }, [tmValue, tmChinese, tmThousandth]);

  return (
    <View className={classNames("tm-statistic", className)} style={style}>
      {props.children || formatValue}
    </View>
  );
}

export default TmStatistic;
