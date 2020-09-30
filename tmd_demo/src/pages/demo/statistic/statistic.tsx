import "../demoStyle.scss";

import { TmCard, TmNavBar, TmStatistic } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoStatistic() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"统计数值"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"千分位"}>
        <TmStatistic tmValue={12345.6} tmThousandth />
        <TmStatistic tmValue={-123456} tmThousandth />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"金额/大写/小写"}>
        <TmStatistic tmValue={12345.6} tmChinese={"money"} />
        <TmStatistic tmValue={123456} tmChinese={"upper"} />
        <TmStatistic tmValue={123456} tmChinese={"lower"} />
      </TmCard>
    </View>
  );
}

export default DemoStatistic;
