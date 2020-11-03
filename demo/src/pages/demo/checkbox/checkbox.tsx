import "../demoStyle.scss";

import {
  TmCard,
  TmNavBar,
  TmCheckbox,
  TmCheckboxOption,
  TmSpace,
  TmButton,
} from "tmdesign";

import React, { useState } from "react";
import { View } from "@tarojs/components";

function DemoCheckbox() {
  const [controlValue, setControlValue] = useState(0);

  const handleValueChange = () => {
    setControlValue(controlValue === 0 ? 1 : 0);
  };

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
        <TmCheckbox
          tmDefaultValue={[1]}
          onChange={(event) => console.log(event)}
        >
          <TmCheckboxOption tmText={"葡萄"} tmValue={1} />
          <TmCheckboxOption tmText={"香蕉"} tmValue={2} />
        </TmCheckbox>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"单选模式"}>
        <TmCheckbox tmRadio onChange={(event) => console.log(event)}>
          <TmCheckboxOption tmText={"葡萄"} tmValue={1} />
          <TmCheckboxOption tmText={"香蕉"} tmValue={2} />
        </TmCheckbox>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"单选允许清空"}>
        <TmCheckbox
          tmRadio
          tmAllowClear
          onChange={(event) => console.log(event)}
        >
          <TmCheckboxOption tmText={"葡萄"} tmValue={1} />
          <TmCheckboxOption tmText={"香蕉"} tmValue={2} />
        </TmCheckbox>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmCheckbox onChange={(event) => console.log(event)}>
          <TmCheckboxOption tmText={"禁用"} tmDisabled />
        </TmCheckbox>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"可选最大值"}>
        <TmCheckbox tmMax={2} onChange={(event) => console.log(event)}>
          <TmCheckboxOption tmText={"葡萄"} tmValue={1} />
          <TmCheckboxOption tmText={"香蕉"} tmValue={2} />
          <TmCheckboxOption tmText={"苹果"} tmValue={3} />
          <TmCheckboxOption tmText={"梨子"} tmValue={4} />
        </TmCheckbox>
      </TmCard>
      <TmCard
        tmRound
        className={"demo__card"}
        tmTitle={"完全控制"}
        tmAction={
          <TmButton
            tmSize={"sm"}
            tmType={"primary"}
            onClick={handleValueChange}
          >
            变动
          </TmButton>
        }
      >
        <TmCheckbox
          tmValue={controlValue}
          onChange={(event) => console.log(event)}
          tmRadio
        >
          <TmCheckboxOption tmText={"葡萄"} tmValue={0} />
          <TmCheckboxOption tmText={"香蕉"} tmValue={1} />
        </TmCheckbox>
      </TmCard>
    </View>
  );
}

export default DemoCheckbox;
