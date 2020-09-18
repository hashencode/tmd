import "../demoStyle.scss";

import {
  TmButton,
  TmCard,
  TmNavBar,
  TmPicker,
  TmPickerOption,
} from "../../../components";

import React, { useState } from "react";
import { View } from "@tarojs/components";

function DemoPicker() {
  const [controlValue, setControlValue] = useState(0);

  const handleValueChange = () => {
    setControlValue(controlValue === 0 ? 1 : 0);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"选择列表"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"单选"}>
        <TmPicker onChange={(event) => console.log(event)} tmDefaultValue={0}>
          {Array(3)
            .fill("")
            .map((_item, index) => {
              return (
                <TmPickerOption
                  key={index}
                  tmValue={index}
                  tmText={`选项_${index}`}
                >
                  选项_{index}
                </TmPickerOption>
              );
            })}
        </TmPicker>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"单选允许清空"}>
        <TmPicker
          onChange={(event) => console.log(event)}
          tmDefaultValue={0}
          tmAllowClear
        >
          {Array(3)
            .fill("")
            .map((_item, index) => {
              return (
                <TmPickerOption
                  key={index}
                  tmValue={index}
                  tmText={`选项_${index}`}
                >
                  选项_{index}
                </TmPickerOption>
              );
            })}
        </TmPicker>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"多选"}>
        <TmPicker
          tmMultiple
          onChange={(event) => console.log(event)}
          tmDefaultValue={[1, 2]}
        >
          {Array(3)
            .fill("")
            .map((_item, index) => {
              return (
                <TmPickerOption
                  key={index}
                  tmValue={index}
                  tmText={`选项_${index}`}
                >
                  选项_{index}
                </TmPickerOption>
              );
            })}
        </TmPicker>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"可选最大值"}>
        <TmPicker
          onChange={(event) => console.log(event)}
          tmMultiple
          tmDefaultValue={[1, 0]}
          tmMax={3}
        >
          {Array(5)
            .fill("")
            .map((_item, index) => {
              return (
                <TmPickerOption
                  key={index}
                  tmValue={index}
                  tmText={`选项_${index}`}
                >
                  选项_{index}
                </TmPickerOption>
              );
            })}
        </TmPicker>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmPicker
          onChange={(event) => console.log(event)}
          tmMultiple
          tmDefaultValue={[1, 2]}
          tmDisabled
        >
          {Array(3)
            .fill("")
            .map((_item, index) => {
              return (
                <TmPickerOption
                  key={index}
                  tmValue={index}
                  tmText={`选项_${index}`}
                >
                  选项_{index}
                </TmPickerOption>
              );
            })}
        </TmPicker>
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
        <TmPicker
          onChange={(event) => console.log(event)}
          tmMultiple
          tmValue={controlValue}
        >
          {Array(3)
            .fill("")
            .map((_item, index) => {
              return (
                <TmPickerOption
                  key={index}
                  tmValue={index}
                  tmText={`选项_${index}`}
                >
                  选项_{index}
                </TmPickerOption>
              );
            })}
        </TmPicker>
      </TmCard>
    </View>
  );
}

export default DemoPicker;
