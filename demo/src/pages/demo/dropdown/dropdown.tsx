import "../demoStyle.scss";

import { TmDropdown, TmNavBar, TmSelect, TmSelectOption } from "tmdesign";

import React, { useState } from "react";
import { View } from "@tarojs/components";

function DemoDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("未选择");
  const [style, setStyle] = useState("");

  const handleClick = () => {
    setIsOpen(!isOpen);
    setStyle(!isOpen ? "position: fixed;width: 100vw;height: 100vh" : "");
  };

  const handleSelect = (event) => {
    setIsOpen(false);
    setText(event.text);
  };

  return (
    <View className={"demo"} style={style}>
      <TmNavBar tmTitle={"下拉菜单"} />
      <TmDropdown
        tmMaskClosable
        tmTitle={text}
        tmShow={isOpen}
        onMaskClick={handleClick}
        onHeadClick={handleClick}
      >
        <View style={{ height: "30vh" }}>
          <TmSelect onChange={handleSelect} tmOutputWithText>
            {Array(20)
              .fill("")
              .map((_item, index) => {
                return (
                  <TmSelectOption
                    key={index}
                    tmText={`选项${index}`}
                    tmValue={index}
                  />
                );
              })}
          </TmSelect>
        </View>
      </TmDropdown>

      <View style={{ height: "200vh" }} />
    </View>
  );
}

export default DemoDropdown;
