import "../demoStyle.scss";

import {
  TmCard,
  TmIcon,
  TmInput,
  TmNavBar,
  TmSpace,
} from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoInput() {
  const alert = (event) => {
    console.log(event);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"输入框"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace tmVertical>
          <TmInput tmBorder tmValue={"默认"} tmId={"默认"} onChange={alert} />
          <TmInput tmBorder tmValue={"大尺寸"} tmBig tmId={"大尺寸"} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"类型"}>
        <TmSpace tmVertical>
          <TmInput tmBorder tmPrefix={"文字:"} tmId={"文字"} />
          <TmInput
            tmBorder
            tmPrefix={"数字:"}
            tmId={"数字"}
            tmType={"number"}
          />
          <TmInput
            tmBorder
            tmPrefix={"身份证:"}
            tmId={"身份证"}
            tmType={"idcard"}
          />
          <TmInput tmBorder tmPrefix={"小数:"} tmId={"小数"} tmType={"digit"} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"前后缀"}>
        <TmSpace tmVertical>
          <TmInput
            tmBorder
            tmPrefix={<TmIcon tmValue={"send"} />}
            tmSuffix={"发送"}
            tmId={"send"}
          />
          <TmInput
            tmBorder
            tmPrefix={"￥"}
            tmSuffix={"RMB"}
            tmBig
            tmId={"money"}
          />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"边框有无"}>
        <TmSpace tmVertical>
          <TmInput tmBorder tmValue={"有边框"} tmId={"有边框"} />
          <TmInput tmValue={"无边框"} tmId={"无边框"} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"可清空"}>
        <TmInput
          tmBorder
          tmAllowClear
          tmSuffix={"搜索"}
          tmId={"可清空"}
          onChange={alert}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"密码输入"}>
        <TmInput
          tmBorder
          tmPassword
          tmPrefix={"密码"}
          tmValue={"12345"}
          tmId={"密码输入"}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmInput tmBorder tmDisabled tmSuffix={"搜索"} tmId={"禁用"} />
      </TmCard>
    </View>
  );
}

export default DemoInput;
