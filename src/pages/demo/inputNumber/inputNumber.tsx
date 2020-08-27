import "../demoStyle.scss";

import {TmCard, TmInputNumber, TmNavBar, TmSpace} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoInputNumber() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"数字输入框"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace tmVertical>
          <TmInputNumber tmSmall tmId={"小"}/>
          <TmInputNumber tmId={"大"}/>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"边框"}>
        <TmInputNumber tmBorder tmId={"边框"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"类型"}>
        <TmSpace tmVertical>
          <View>整数</View>
          <TmInputNumber tmId={"整数"}/>
          <View>带小数</View>
          <TmInputNumber tmId={"带小数"} tmDigit tmValue={1.2}/>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"最大/小值"}>
        <TmInputNumber
          tmMin={0}
          tmMax={10}
          tmStep={2}
          tmBorder
          tmId={"最大/小值"}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"步进值"}>
        <TmInputNumber tmStep={0.1} tmDigit tmId={"步进值"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"精度"}>
        <TmInputNumber tmPrecision={2} tmValue={1.23} tmDigit tmId={"精度"}/>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁止手动输入"}>
        <TmInputNumber tmNotEditable tmId={"禁止手动输入"}/>
      </TmCard>
    </View>
  );
}

export default DemoInputNumber;
