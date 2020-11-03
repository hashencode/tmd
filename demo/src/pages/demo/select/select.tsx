import "../demoStyle.scss";

import { TmCard, TmNavBar } from "tmdesign";

import React, { useState } from "react";
import { View } from "@tarojs/components";
import { TmSelect, TmSelectOption } from "tmdesign";
import { TmButton } from "tmdesign";

function DemoSelect() {
  const [currentValue, setCurrentValue] = useState("");

  const handleSwitch = () => {
    setCurrentValue(currentValue === "选项1" ? "选项2" : "选项1");
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"选择器"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"单选"}>
        <TmSelect
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
          }}
          onShow={() => {
            console.log("onShow");
          }}
          onCancel={() => {
            console.log("onCancel");
          }}
        >
          {Array(10)
            .fill("")
            .map((_item, index) => {
              return (
                <TmSelectOption
                  key={index}
                  tmText={`选项${index}`}
                  tmValue={`选项${index}`}
                />
              );
            })}
        </TmSelect>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"单选允许清空"}>
        <TmSelect
          tmAllowClear
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
          }}
        >
          {Array(10)
            .fill("")
            .map((_item, index) => {
              return (
                <TmSelectOption
                  key={index}
                  tmText={`选项${index}`}
                  tmValue={`选项${index}`}
                />
              );
            })}
        </TmSelect>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"多选"}>
        <TmSelect
          tmMultiple
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
          }}
        >
          {Array(10)
            .fill("")
            .map((_item, index) => {
              return (
                <TmSelectOption
                  key={index}
                  tmText={`选项${index}`}
                  tmValue={`选项${index}`}
                />
              );
            })}
        </TmSelect>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"单选默认值"}>
        <TmSelect
          tmDefaultValue={"选项1"}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
          }}
        >
          {Array(10)
            .fill("")
            .map((_item, index) => {
              return (
                <TmSelectOption
                  key={index}
                  tmText={`选项${index}`}
                  tmValue={`选项${index}`}
                />
              );
            })}
        </TmSelect>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"多选默认值"}>
        <TmSelect
          tmMultiple
          tmDefaultValue={["选项1", "选项2"]}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
          }}
        >
          {Array(10)
            .fill("")
            .map((_item, index) => {
              return (
                <TmSelectOption
                  key={index}
                  tmText={`选项${index}`}
                  tmValue={`选项${index}`}
                />
              );
            })}
        </TmSelect>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmSelect
          tmMultiple
          tmDisabled
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
          }}
        >
          {Array(10)
            .fill("")
            .map((_item, index) => {
              return (
                <TmSelectOption
                  key={index}
                  tmText={`选项${index}`}
                  tmValue={`选项${index}`}
                />
              );
            })}
        </TmSelect>
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
        <TmSelect
          tmValue={currentValue}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
          }}
        >
          {Array(10)
            .fill("")
            .map((_item, index) => {
              return (
                <TmSelectOption
                  key={index}
                  tmText={`选项${index}`}
                  tmValue={`选项${index}`}
                />
              );
            })}
        </TmSelect>
      </TmCard>
    </View>
  );
}

export default DemoSelect;
