import "../demoStyle.scss";

import { TmCard, TmNavBar } from "tmdesign";

import React, { useState } from "react";
import { View } from "@tarojs/components";
import { TmDatePicker } from "tmdesign";

function DemoDatePicker() {
  const [value1, setValue1] = useState("");

  const handleConfirm = (e) => {
    setValue1(e);
    console.log(e);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"日期选择"} />
      <TmCard tmRound className={"demo__card"} tmTitle={""}>
        <TmDatePicker
          onConfirm={handleConfirm}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(e)}
          tmAllowClear
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"默认值"}>
        <TmDatePicker
          onConfirm={handleConfirm}
          tmPlaceholder={"请选择"}
          tmDefaultValue={new Date()}
          onChange={(e) => console.log(e)}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={""}>
        <TmDatePicker
          onConfirm={handleConfirm}
          tmPlaceholder={"可取消"}
          onChange={(e) => console.log(e)}
        />
      </TmCard>
    </View>
  );
}

export default DemoDatePicker;
