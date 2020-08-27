import "../demoStyle.scss";

import {TmBill, TmBillItem, TmCard, TmNavBar} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoBill() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"账单"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"基础"}>
        <TmBill>
          <TmBillItem tmName={"借款金额"} tmValue={"￥30000"}/>
          <TmBillItem tmName={"收款账户"} tmValue={"招商银行(尾号xxxx)"}/>
          <TmBillItem tmName={"借款期数"} tmValue={"12期"}/>
          <TmBillItem tmName={"正常还款总息"} tmValue={"¥140.50"}/>
          <TmBillItem tmName={"还款"} tmValue={"¥404.50 (9月22日)"}/>
        </TmBill>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"带标题和编号"}>
        <TmBill tmTitle={"借款单据"} tmNo={"NO.2343454"}>
          <TmBillItem tmName={"借款金额"} tmValue={"￥30000"}/>
          <TmBillItem tmName={"收款账户"} tmValue={"招商银行(尾号xxxx)"}/>
          <TmBillItem tmName={"借款期数"} tmValue={"12期"}/>
          <TmBillItem tmName={"正常还款总息"} tmValue={"¥140.50"}/>
          <TmBillItem tmName={"还款"} tmValue={"¥404.50 (9月22日)"}/>
        </TmBill>
      </TmCard>
    </View>
  );
}

export default DemoBill;
