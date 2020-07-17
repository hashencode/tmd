import "../demoStyle.scss";

import {TmCard, TmDivider, TmNavBar} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoGrid() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"分割线"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"横向"}>
        <TmDivider tmSpace={10}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"带文字"}>
        <TmDivider tmSpace={10} tmText={"左侧"}/>
        <TmDivider tmSpace={10} tmText={"中间"} tmTextPosition={"center"}/>
        <TmDivider tmSpace={10} tmText={"右侧"} tmTextPosition={"right"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"竖向"}>
        分<TmDivider tmVertical/>割
      </TmCard>
    </View>
  );
}

export default DemoGrid;
