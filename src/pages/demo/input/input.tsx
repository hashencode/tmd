import "../demoStyle.scss";

import {
  TmCard,
  TmIcon,
  TmInput,
  TmNavBar,
  TmSpace
} from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoInput() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"输入框"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace tmVertical>
          <TmInput tmBorder tmValue={"默认"} />
          <TmInput tmBorder tmValue={"大尺寸"} tmBig />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"类型"}>
        <TmSpace tmVertical>
          <TmInput tmBorder tmPrefix={"文字："} />
          <TmInput tmBorder tmPrefix={"数字："} tmType={"number"} />
          <TmInput tmBorder tmPrefix={"身份证："} tmType={"idcard"} />
          <TmInput tmBorder tmPrefix={"小数："} tmType={"digit"} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"前后缀"}>
        <TmSpace tmVertical>
          <TmInput
            tmBorder
            tmPrefix={<TmIcon tmValue={"send"} />}
            tmSuffix={"发送"}
          />
          <TmInput tmBorder tmPrefix={"￥"} tmSuffix={"RMB"} tmBig />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"边框有无"}>
        <TmSpace tmVertical>
          <TmInput tmBorder tmValue={"有边框"} />
          <TmInput tmValue={"无边框"} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"可清空"}>
        <TmInput tmBorder tmAllowClear tmSuffix={"搜索"} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"密码输入"}>
        <TmInput tmBorder tmPassword tmPrefix={"密码"} tmValue={"12345"} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmInput tmBorder tmDisabled tmSuffix={"搜索"} />
      </TmCard>
    </View>
  );
}

export default DemoInput;
