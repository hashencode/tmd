import "../demoStyle.scss";

import {
  TmButton,
  TmCard,
  TmCoupon,
  TmDivider,
  TmNavBar,
} from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoCoupon() {
  return (
    <View className={"demo demo-button"}>
      <TmNavBar tmTitle={"优惠券"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"外观"}>
        <TmCoupon
          tmTitle={"7折抵扣券"}
          tmSubtitle={"满1000元使用"}
          tmExpiration={"有效期：10/28 - 12/30"}
          tmAmount={50}
          tmPrefix={"￥"}
          tmSuffix={".00"}
          tmVertical
          tmButton={
            <TmButton tmSize={"sm"} tmShape={"round"} tmType={"primary"}>
              立即领取
            </TmButton>
          }
        />
        <TmDivider />
        <TmCoupon
          tmTitle={"7折抵扣券"}
          tmSubtitle={"满1000元使用"}
          tmExpiration={"10/28 - 12/30"}
          tmAmount={500}
          tmPrefix={"￥"}
          tmButton={
            <TmButton tmSize={"sm"} tmShape={"round"} tmType={"primary"}>
              立即领取
            </TmButton>
          }
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"显示规则"}>
        <TmCoupon
          tmTitle={"7折抵扣券"}
          tmSubtitle={"满1000元使用"}
          tmExpiration={"有效期：10/28 - 12/30"}
          tmAmount={50}
          tmPrefix={"￥"}
          tmSuffix={".00"}
          tmVertical
        >
          <View>1.sjdhbcsdc</View>
          <View>2.sdikcjhbsd</View>
          <View>3.sdkchbsjdhcb</View>
        </TmCoupon>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"修改颜色"}>
        <TmCoupon
          tmTitle={"7折抵扣券"}
          tmSubtitle={"满1000元使用"}
          tmExpiration={"有效期：10/28 - 12/30"}
          tmAmount={50}
          tmPrefix={"￥"}
          tmSuffix={".00"}
          tmVertical
          tmButton={
            <TmButton tmSize={"sm"} tmShape={"round"} tmDanger>
              立即领取
            </TmButton>
          }
          tmColor={"#ff4d4f"}
        />
        <TmDivider />
        <TmCoupon
          tmTitle={"7折抵扣券"}
          tmSubtitle={"满1000元使用"}
          tmExpiration={"10/28 - 12/30"}
          tmAmount={500}
          tmPrefix={"￥"}
          tmButton={
            <TmButton tmSize={"sm"} tmShape={"round"} tmDanger>
              立即领取
            </TmButton>
          }
          tmColor={"#ff4d4f"}
        />
      </TmCard>
    </View>
  );
}

export default DemoCoupon;
