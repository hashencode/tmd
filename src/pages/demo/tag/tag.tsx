import "../demoStyle.scss";

import {TmButton, TmCard, TmIcon, TmNavBar, TmSpace, TmTag} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoTag() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"标签"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"圆角"}>
        <TmSpace>
          <TmTag tmRound>圆角</TmTag>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"状态"}>
        <TmSpace>
          <TmTag>默认</TmTag>
          <TmTag tmType={"info"}>消息</TmTag>
          <TmTag tmType={"success"}>成功</TmTag>
          <TmTag tmType={"danger"}>危险</TmTag>
          <TmTag tmType={"warning"}>警告</TmTag>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"幽灵"}>
        <TmSpace>
          <TmButton tmType={"primary"}>
            <TmTag tmGhost>消息</TmTag>
          </TmButton>
          <TmTag tmType={"info"} tmGhost>
            消息
          </TmTag>
          <TmTag tmType={"success"} tmGhost>
            成功
          </TmTag>
          <TmTag tmType={"danger"} tmGhost>
            危险
          </TmTag>
          <TmTag tmType={"warning"} tmGhost>
            警告
          </TmTag>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"边框"}>
        <TmSpace>
          <TmButton tmType={"primary"}>
            <TmTag tmGhost tmBorder>
              消息
            </TmTag>
          </TmButton>
          <TmTag tmBorder tmType={"info"} tmGhost>
            消息
          </TmTag>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"图标"}>
        <TmSpace>
          <TmTag tmBorder tmIcon={<TmIcon tmValue={"microphone"}/>}>
            默认
          </TmTag>
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoTag;
