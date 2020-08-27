import "../demoStyle.scss";

import {TmCard, TmNavBar, TmSkeleton} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoSkeleton() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"骨架屏"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"纯文字"}>
        <TmSkeleton/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"带图片"}>
        <TmSkeleton tmShowImage tmAmount={3}/>
      </TmCard>
    </View>
  );
}

export default DemoSkeleton;
