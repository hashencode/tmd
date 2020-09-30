import "../demoStyle.scss";

import { TmCard, TmIcon, TmNavBar } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoCard() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"卡片"} />
      <TmCard
        className={"demo__card"}
        tmTitle={"圆角边框阴影"}
        tmShadow
        tmRound
      />
      <TmCard
        tmRound
        className={"demo__card"}
        tmTitle={"操作按钮"}
        tmAction={<TmIcon tmValue={"edit"} />}
      />
      <TmCard className={"demo__card"} tmFooter={"卡片底部"} />
    </View>
  );
}

export default DemoCard;
