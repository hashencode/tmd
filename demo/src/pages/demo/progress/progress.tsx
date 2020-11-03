import "../demoStyle.scss";

import { TmCard, TmNavBar, TmProgress } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoProgress() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"进度条"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"圆形"}>
        <TmProgress tmValue={30} tmShape={"circle"} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"条形"}>
        <TmProgress tmValue={30} tmShape={"line"} />
      </TmCard>
    </View>
  );
}

export default DemoProgress;
