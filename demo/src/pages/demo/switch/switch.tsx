import "../demoStyle.scss";

import React, { useState } from "react";
import { TmButton, TmCard, TmNavBar, TmSpace, TmSwitch } from "tmdesign";

import { View } from "@tarojs/components";

function DemoSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"开关"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace>
          <TmSwitch tmSize={"lg"} onChange={(e) => console.log(e)} />
          <TmSwitch onChange={(e) => console.log(e)} />
          <TmSwitch tmSize={"sm"} onChange={(e) => console.log(e)} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"加载状态"}>
        <TmSpace>
          <TmSwitch tmLoading onChange={(e) => console.log(e)} />
          <TmSwitch
            tmLoading
            tmDefaultChecked
            onChange={(e) => console.log(e)}
          />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmSpace>
          <TmSwitch tmDisabled onChange={(e) => console.log(e)} />
          <TmSwitch
            tmDefaultChecked={true}
            tmDisabled
            onChange={(e) => console.log(e)}
          />
        </TmSpace>
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
        <TmSpace>
          <TmSwitch tmChecked={isChecked} onChange={(e) => console.log(e)} />
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoSwitch;
