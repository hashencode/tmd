import "../demoStyle.scss";

import { TmCard, TmNavBar } from "tmdesign";

import React, { useState } from "react";
import { View } from "@tarojs/components";
import { TmDatePicker } from "tmdesign";

function DemoDatePicker() {
  const [value1, setValue1] = useState("");

  const handleConfirm = (e) => {
    setValue1(e);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"日期选择"} />
      <TmCard tmRound className={"demo__card"} tmTitle={""}>
        <TmDatePicker
          tmValue={value1}
          onConfirm={handleConfirm}
          tmPlaceholder={"请选择"}
        />
      </TmCard>
    </View>
  );
}

export default DemoDatePicker;
