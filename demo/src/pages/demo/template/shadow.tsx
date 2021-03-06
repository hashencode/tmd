import "../demoStyle.scss";

import { TmCard, TmNavBar } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoRate() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={""} />
      <TmCard tmRound className={"demo__card"} tmTitle={""}></TmCard>
    </View>
  );
}

export default DemoRate;
