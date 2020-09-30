import "../demoStyle.scss";

import { TmCalendar, TmCard, TmNavBar } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoCalendar() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"日历"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"默认"}>
        <TmCalendar onChange={(event) => console.log(event)} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"设置默认年月"}>
        <TmCalendar tmDefaultValue={new Date("2020/5/5 10:00:00")} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"设置默认选中日期"}>
        <TmCalendar tmDefaultPickedValue={new Date("2020/7/5")} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"无边框无阴影"}>
        <TmCalendar tmBorder={false} tmShadow={false} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"隐藏控制按钮"}>
        <TmCalendar tmHideMonthBtn tmHideYearBtn />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"隐藏头部"}>
        <TmCalendar tmHideHead />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义底部"}>
        <TmCalendar tmFooter={"自定义底部"} />
      </TmCard>
    </View>
  );
}

export default DemoCalendar;
