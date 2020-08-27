import "../demoStyle.scss";

import {TmCard, TmIcon, TmNavBar, TmResult} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoResult() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"分割线"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"成功"}>
        <TmResult tmType={"success"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"失败"}>
        <TmResult tmType={"error"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"警告"}>
        <TmResult tmType={"warning"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"等待"}>
        <TmResult tmType={"waiting"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"空白"}>
        <TmResult tmType={"empty"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"网络错误"}>
        <TmResult tmType={"network"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"404"}>
        <TmResult tmType={404}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义内容"}>
        <TmResult
          tmTitle={"自定义标题"}
          tmSubtitle={"自定义副标题"}
          tmIcon={<TmIcon tmValue={"microphone"}/>}
        />
      </TmCard>
    </View>
  );
}

export default DemoResult;
