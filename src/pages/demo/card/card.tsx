import "../demoStyle.scss";

import {TmCard, TmIcon, TmNavBar} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoGrid() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"卡片"}/>
      <TmCard className={"demo__card"} tmTitle={"显示边框"}/>
      <TmCard className={"demo__card"} tmTitle={"显示阴影"} tmShadow/>
      <TmCard className={"demo__card"} tmTitle={"圆角边框"} tmRound/>
      <TmCard
        tmRound
        className={"demo__card"}
        tmTitle={"操作按钮"}
        tmAction={<TmIcon tmValue={"bianji"}/>}
      />
      <TmCard className={"demo__card"} tmTitle={"显示底部"} tmFooter={"底部"}/>
    </View>
  );
}

export default DemoGrid;
