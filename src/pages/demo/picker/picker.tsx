import "../demoStyle.scss";

import {
  TmButton,
  TmCard,
  TmNavBar,
  TmPicker,
  TmPickerOption
} from "../../../components";

import React, { useState } from "react";
import { View } from "@tarojs/components";

function DemoPicker() {
  const [currentValue, setCurrentValue] = useState([1, 2]);

  const handleSwitch = () => {
    const valueArray = [[0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]];
    setCurrentValue(valueArray[Math.floor(Math.random() * 7)]);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"选择列表"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"单选"}>
        <TmPicker onChange={event => console.log(event)}>
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
        <TmPicker tmMultiple onChange={event => console.log(event)}>
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
      <TmCard tmRound className={"demo__card"} tmTitle={"单选默认选项"}>
        <TmPicker onChange={event => console.log(event)} tmDefaultValue={0}>
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
      <TmCard tmRound className={"demo__card"} tmTitle={"多选默认选项"}>
        <TmPicker
          onChange={event => console.log(event)}
          tmMultiple
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
                  tmDisabled={index === 1}
                >
                  选项_{index}
                </TmPickerOption>
              );
            })}
        </TmPicker>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmPicker
          onChange={event => console.log(event)}
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
        tmTitle={"手动指定选中条目"}
        tmAction={
          <TmButton tmType={"primary"} onClick={handleSwitch}>
            切换
          </TmButton>
        }
      >
        <TmPicker
          onChange={event => console.log(event)}
          tmMultiple
          tmDefaultValue={currentValue}
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
