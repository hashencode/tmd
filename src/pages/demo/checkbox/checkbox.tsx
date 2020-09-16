import "../demoStyle.scss";

import {
  TmCard,
  TmNavBar,
  TmCheckbox,
  TmCheckboxOption,
  TmSpace,
} from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoCheckbox() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"多选框"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace tmVertical>
          <TmCheckbox tmSize={"lg"}>
            <TmCheckboxOption tmText={"葡萄"} />
          </TmCheckbox>
          <TmCheckbox>
            <TmCheckboxOption tmText={"香蕉"} />
          </TmCheckbox>
          <TmCheckbox tmSize={"sm"}>
            <TmCheckboxOption tmText={"苹果"} />
          </TmCheckbox>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"默认值"}>
        <TmCheckbox tmValue={1}>
          <TmCheckboxOption tmText={"葡萄"} tmValue={1} />
          <TmCheckboxOption tmText={"香蕉"} tmValue={2} />
        </TmCheckbox>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"单选模式"}>
        <TmCheckbox tmRadio tmValue={1}>
          <TmCheckboxOption tmText={"葡萄"} tmValue={1} />
          <TmCheckboxOption tmText={"香蕉"} tmValue={2} />
        </TmCheckbox>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmSpace tmVertical>
          <TmCheckbox>
            <TmCheckboxOption tmText={"禁用"} tmDisabled />
          </TmCheckbox>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"可选最大值"}>
        <TmSpace tmVertical>
          <TmCheckbox tmMax={2}>
            <TmCheckboxOption tmText={"葡萄"} tmValue={1} />
            <TmCheckboxOption tmText={"香蕉"} tmValue={2} />
            <TmCheckboxOption tmText={"苹果"} tmValue={3} />
            <TmCheckboxOption tmText={"梨子"} tmValue={4} />
          </TmCheckbox>
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoCheckbox;
