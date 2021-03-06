import "../demoStyle.scss";

import { TmCard, TmIcon, TmNavBar, TmSpace } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoIcon() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"图标"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace>
          <TmIcon tmValue={"like"} tmSize={40} />
          <TmIcon tmValue={"like"} tmSize={80} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"颜色"}>
        <TmSpace>
          <TmIcon tmValue={"like"} tmSize={40} tmColor={"#1890ff"} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"旋转角度"}>
        <TmSpace>
          <TmIcon tmValue={"like"} tmSize={40} tmRotate={90} />
          <TmIcon tmValue={"like"} tmSize={40} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"旋转"}>
        <TmSpace>
          <TmIcon tmValue={"like"} tmSize={40} tmSpin />
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoIcon;
