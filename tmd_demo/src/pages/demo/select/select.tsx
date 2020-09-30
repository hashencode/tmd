import "../demoStyle.scss";

import { TmCard, TmNavBar } from "tmdesign";

import React, { useState } from "react";
import { View } from "@tarojs/components";
import { TmSelect, TmSelectOption } from "tmdesign";

function DemoSelect() {
  const [selectNo1Value, setSelectNo1Value] = useState("");
  const [selectNo2Value, setSelectNo2Value] = useState("");
  const [selectNo3Value, setSelectNo3Value] = useState("");
  const [selectNo4Value, setSelectNo4Value] = useState("选项1");
  const [selectNo5Value, setSelectNo5Value] = useState(["选项1", "选项2"]);

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"选择器"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"单选"}>
        <TmSelect
          tmValue={selectNo1Value}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
            // @ts-ignore
            setSelectNo1Value(e);
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
          tmValue={selectNo2Value}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
            // @ts-ignore
            setSelectNo2Value(e);
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
          tmValue={selectNo3Value}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
            // @ts-ignore
            setSelectNo3Value(e);
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
          tmValue={selectNo4Value}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
            // @ts-ignore
            setSelectNo4Value(e);
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
          tmValue={selectNo5Value}
          tmPlaceholder={"请选择"}
          onChange={(e) => console.log(`onChange:${e}`)}
          onConfirm={(e) => {
            console.log(`onConfirm:${e}`);
            // @ts-ignore
            setSelectNo5Value(e);
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
            // @ts-ignore
            setSelectNo5Value(e);
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
