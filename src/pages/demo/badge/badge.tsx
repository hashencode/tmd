import "../demoStyle.scss";

import {TmAvatar, TmBadge, TmCard, TmNavBar} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoBadge() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"徽标数"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"外观"}>
        <TmBadge tmValue={9} tmMax={24}>
          <TmAvatar
            tmShape={"rect"}
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          />
        </TmBadge>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"最大值"}>
        <TmBadge tmValue={15} tmMax={10}>
          <TmAvatar
            tmShape={"rect"}
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          />
        </TmBadge>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"显示零值"}>
        <TmBadge tmValue={0} tmShowZero>
          <TmAvatar
            tmShape={"rect"}
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          />
        </TmBadge>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"背景色"}>
        <TmBadge tmValue={0} tmShowZero tmColor={"#1890ff"}>
          <TmAvatar
            tmShape={"rect"}
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          />
        </TmBadge>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"设置偏移量"}>
        <TmBadge tmValue={0} tmShowZero tmTranslate={{x: -15, y: 10}}>
          <TmAvatar
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          />
        </TmBadge>
      </TmCard>
    </View>
  );
}

export default DemoBadge;
