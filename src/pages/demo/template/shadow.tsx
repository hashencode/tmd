import "../demoStyle.scss";

import {TmCard, TmNavBar} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoGrid() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"间距"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={""}></TmCard>
    </View>
  );
}

export default DemoGrid;
