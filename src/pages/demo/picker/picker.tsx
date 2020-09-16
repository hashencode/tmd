import "../demoStyle.scss";

import {
  TmCard,
  TmNavBar,
  TmPicker,
  TmPickerOption,
} from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoPicker() {
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
    </View>
  );
}

export default DemoPicker;
