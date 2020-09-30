import "../demoStyle.scss";

import { TmCard, TmNavBar, TmTextarea } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoTextarea() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"多行文本"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"显示边框"}>
        <TmTextarea tmBorder tmPlaceholder={"请输入内容"} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"显示统计"}>
        <TmTextarea
          tmValue={"默认字符串"}
          tmShowCount
          tmAllowClear
          tmMaxlength={10}
        />
      </TmCard>
    </View>
  );
}

export default DemoTextarea;
