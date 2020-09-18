import "../demoStyle.scss";

import { TmCard, TmIcon, TmNavBar, TmResult } from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoResult() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"结果页"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"无内容"}>
        <TmResult tmType={"empty"} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"网络错误"}>
        <TmResult tmType={500} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"404"}>
        <TmResult tmType={404} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义内容"}>
        <TmResult
          tmText={"自定义标题"}
          tmImage={<TmIcon tmValue={"microphone"} tmSize={150} />}
        />
      </TmCard>
    </View>
  );
}

export default DemoResult;
