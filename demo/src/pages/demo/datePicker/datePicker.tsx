import "../demoStyle.scss";

import { TmCard, TmNavBar } from "tmdesign";

import React, { useState } from "react";
import { View } from "@tarojs/components";
import { TmDatePicker } from "tmdesign";
import { TmButton } from "tmdesign";

function DemoDatePicker() {
  const [dateValue, setDataValue] = useState(new Date("2019/3/3"));

  const handleSwitch = () => {
    setDataValue(
      dateValue.toString() === new Date("2019/3/3").toString()
        ? new Date("2022/3/10")
        : new Date("2019/3/3")
    );
  };

  const handleConfirm = (e) => {
    console.log(`onConfirm:`, e.date, e.dateString);
  };

  const handleChange = (e) => {
    console.log(`onChange:`, e.date, e.dateString);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"日期选择"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"基础"}>
        <TmDatePicker
          onConfirm={handleConfirm}
          tmPlaceholder={"请选择"}
          onChange={handleChange}
          onHide={() => {
            console.log("onHide");
          }}
          onShow={() => {
            console.log("onShow");
          }}
          onCancel={() => {
            console.log("onCancel");
          }}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"可清空"}>
        <TmDatePicker
          onConfirm={handleConfirm}
          tmPlaceholder={"请选择"}
          onChange={handleChange}
          tmAllowClear
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"默认值"}>
        <TmDatePicker
          onConfirm={handleConfirm}
          tmPlaceholder={"请选择"}
          tmDefaultValue={new Date("2019/3/10")}
          onChange={handleChange}
        />
      </TmCard>
      <TmCard
        tmRound
        className={"demo__card"}
        tmTitle={"完全控制"}
        tmAction={
          <TmButton onClick={handleSwitch} tmType={"primary"} tmSize={"sm"}>
            切换
          </TmButton>
        }
      >
        <TmDatePicker
          onConfirm={handleConfirm}
          tmPlaceholder={"请选择"}
          tmValue={dateValue}
          onChange={handleChange}
        />
      </TmCard>
    </View>
  );
}

export default DemoDatePicker;
