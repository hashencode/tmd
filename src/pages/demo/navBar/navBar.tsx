import "../demoStyle.scss";

import {TmCard, TmNavBar} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoNavBar() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"导航"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"标题"}>
        <View style={{transform: "translateX(0)"}}>
          <TmNavBar tmTitle={"标题"}/>
        </View>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"背景色"}>
        <View style={{transform: "translateX(0)"}}>
          <TmNavBar
            tmTitle={<View style={{color: "white"}}>背景色</View>}
            tmBackground={"#1890ff"}
          />
        </View>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"隐藏按钮"}>
        <View style={{transform: "translateX(0)"}}>
          <TmNavBar tmTitle={"隐藏按钮"} tmHideBtn/>
        </View>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"暗色按钮"}>
        <View style={{transform: "translateX(0)"}}>
          <TmNavBar tmTitle={"暗色按钮"} tmTheme={"dark"}/>
        </View>
      </TmCard>
    </View>
  );
}

export default DemoNavBar;
