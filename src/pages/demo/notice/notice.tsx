import "../demoStyle.scss";

import {
  TmCard,
  TmIcon,
  TmNavBar,
  TmNotice,
  TmSpace
} from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoNotice() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"通知栏"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"内置类型"}>
        <TmSpace tmVertical>
          <TmNotice>默认</TmNotice>
          <TmNotice tmType={"info"}>提示</TmNotice>
          <TmNotice tmType={"danger"}>危险</TmNotice>
          <TmNotice tmType={"warning"}>警告</TmNotice>
          <TmNotice tmType={"success"}>成功</TmNotice>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"首尾图标"}>
        <TmNotice
          tmPrefix={<TmIcon tmValue={"sound_on"} />}
          tmSuffix={<TmIcon tmValue={"arrow_right"} />}
        >
          该银行3:00-12:00系统维护，请更换其他银行卡
        </TmNotice>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"圆角显示"}>
        <TmNotice tmRound>该银行3:00-12:00系统维护，请更换其他银行卡</TmNotice>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"可关闭"}>
        <TmNotice tmCloseable>
          该银行3:00-12:00系统维护，请更换其他银行卡
        </TmNotice>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"带动画"}>
        <TmNotice tmMotion>该银行3:00-12:00系统维护，请更换其他银行卡</TmNotice>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自动关闭"}>
        <TmNotice tmAutoClose={5000}>
          该银行3:00-12:00系统维护，请更换其他银行卡
        </TmNotice>
      </TmCard>
    </View>
  );
}

export default DemoNotice;
