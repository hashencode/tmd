import "./calendar.scss";

import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import {
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  isDate,
  startOfMonth
} from "date-fns";

import { TmIcon } from "../index";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { colorPrimary } from "../_style/theme";
import throttle from "lodash/throttle";

export interface PropsInterface {
  tmBorder?: boolean; // 显示边框
  tmDefaultPickedValue?: Date; // 默认选中的值
  tmDefaultValue?: Date; // 默认值
  tmFooter?: ReactNode; // 自定义底部
  tmHideHead?: boolean; // 显示头部
  tmHideMonthBtn?: boolean; // 禁止更改月份
  tmHideYearBtn?: boolean; // 禁止更改年份
  tmPickedStyle?: Object; // 选中样式
  tmShadow?: boolean; // 显示阴影
  onChange?: (date: string) => void; // 时间变化事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

export interface ConfigInterface {
  currentMonthDays: number[];
  prevMonthDays: number[];
  nextMonthDays: number[];
}

interface CurrentDataInterface {
  year: number;
  month: number;
}

function TmCalendar(props: PropsInterface) {
  const {
    tmBorder = true,
    tmDefaultPickedValue = null,
    tmDefaultValue = new Date(),
    tmFooter = null,
    tmHideHead = false,
    tmHideMonthBtn = false,
    tmHideYearBtn = false,
    tmPickedStyle = {
      backgroundColor: colorPrimary,
      color: "white"
    },
    tmShadow = true,
    onChange = () => {},
    className = "",
    style = {}
  } = props;

  // 当前日期，此处的年月没有0值
  const currentDate = useRef<CurrentDataInterface>({
    year: 2020,
    month: 1
  });

  // 当前被选中的日期的数据
  const [pickedDate, setPickedDate] = useState({
    year: -1,
    month: -1,
    day: -1
  });

  const [prevPickedDate, setPrevPickedDate] = useState({
    year: -2,
    month: -2,
    day: -2
  });

  // 用于显示日历的数据
  const [calenderConfig, setCalenderConfig] = useState<ConfigInterface>({
    currentMonthDays: [],
    prevMonthDays: [],
    nextMonthDays: []
  });

  // 创造指定长度的数组
  const createArray = sum => Array.from(Array(sum).keys());

  // 计算日历展示信息
  const calcDisplayData = time => {
    // 当前日期信息
    const currentYear = getYear(time);
    const currentMonth = getMonth(time);
    const currentMonthFirstDayDate = startOfMonth(time).getDay();
    const currentMonthDaySum = getDaysInMonth(time);
    // 前一月份日期信息
    let prevMonthCount = 0;
    // 涉及1月时的年份切换
    if (currentMonth === 0) {
      prevMonthCount = getDaysInMonth(new Date(`${currentYear - 1}/12/1`));
    } else {
      prevMonthCount = getDaysInMonth(
        new Date(`${currentYear}/${currentMonth}/1`)
      );
    }
    let prevMonthDays = [] as number[];
    if (currentMonthFirstDayDate === 0) {
      prevMonthDays = createArray(prevMonthCount).slice(-6);
    } else if (currentMonthFirstDayDate > 1) {
      prevMonthDays = createArray(prevMonthCount).slice(
        (currentMonthFirstDayDate - 1) * -1
      );
    }
    // 当前月份的日期信息
    const currentMonthDays = createArray(currentMonthDaySum);
    // 下一个月的日期信息
    const nextMonthSum =
      42 -
      currentMonthDaySum -
      (currentMonthFirstDayDate < 1 ? 6 : currentMonthFirstDayDate - 1);
    const nextMonthDays = nextMonthSum > 0 ? createArray(nextMonthSum) : [];
    // 修改显示数据
    setCalenderConfig({
      ...calenderConfig,
      prevMonthDays,
      currentMonthDays,
      nextMonthDays
    });
  };

  // 修改年份
  const handleYearChange = throttle(
    event => {
      currentDate.current.year -= event === "decrease" ? 1 : -1;
      calcDisplayData(
        new Date(`${currentDate.current.year}/${currentDate.current.month}/1`)
      );
    },
    500,
    { trailing: false }
  );

  // 前一月份日期点击
  const handleAnotherMonthDayClick = ({ currentDay, isPrev = true }) => {
    const { year, month } = currentDate.current;
    const newDate = { year, month: month + (isPrev ? -1 : 1), day: currentDay };
    setPickedDate(newDate);
    handleMonthChange(isPrev ? "decrease" : "increase");
    if (JSON.stringify(prevPickedDate) !== JSON.stringify(newDate)) {
      setPrevPickedDate(newDate);
      onChange(`${year}/${month}/${currentDay}`);
    }
  };

  // 当前月份日期点击
  const handleCurrentMonthDayClick = currentDay => {
    const { year, month } = currentDate.current;
    setPickedDate({
      year,
      month,
      day: currentDay
    });
    const newDate = { year, month, day: currentDay };
    if (JSON.stringify(prevPickedDate) !== JSON.stringify(newDate)) {
      setPrevPickedDate(newDate);
      onChange(`${year}/${month}/${currentDay}`);
    }
  };

  // 修改月份
  const handleMonthChange = throttle(
    event => {
      // 涉及1月和12月时的年份切换
      if (event === "decrease") {
        if (currentDate.current.month === 1) {
          currentDate.current.month = 12;
          currentDate.current.year -= 1;
        } else {
          currentDate.current.month -= 1;
        }
      } else if (event === "increase") {
        if (currentDate.current.month === 12) {
          currentDate.current.month = 1;
          currentDate.current.year += 1;
        } else {
          currentDate.current.month += 1;
        }
      }
      calcDisplayData(
        new Date(`${currentDate.current.year}/${currentDate.current.month}/1`)
      );
    },
    500,
    { trailing: false }
  );

  // 计算是否被选中
  const isPicked = currentDay => {
    return (
      pickedDate.year === currentDate.current.year &&
      pickedDate.month === currentDate.current.month &&
      pickedDate.day === currentDay + 1
    );
  };

  useLayoutEffect(() => {
    // 如果tmDefaultValue不是日期类型，则抛出错误
    if (!isDate(tmDefaultValue)) throw "Invalid value of tmDefaultValue";
    currentDate.current = {
      year: getYear(tmDefaultValue),
      month: getMonth(tmDefaultValue) + 1
    };
    if (tmDefaultPickedValue) {
      setPickedDate({
        year: getYear(tmDefaultPickedValue),
        month: getMonth(tmDefaultPickedValue) + 1,
        day: getDate(tmDefaultPickedValue)
      });
    }
    calcDisplayData(tmDefaultValue);
  }, []);

  return (
    <View
      className={classNames(
        "tm-calendar",
        { "tm-calendar-bordered": tmBorder, "tm-calendar-shadow": tmShadow },
        className
      )}
      style={style}
    >
      {/*头部*/}
      {!tmHideHead && (
        <View className="tm-calendar__head">
          <View className="tm-calendar__prev-btn">
            {/*年份减少按钮*/}
            {!tmHideYearBtn && (
              <TmIcon
                tmValue={"double_arrow_left"}
                tmSize={30}
                onClick={() => {
                  handleYearChange("decrease");
                }}
              />
            )}
            {/*月份减少按钮*/}
            {!tmHideMonthBtn && (
              <TmIcon
                tmValue={"arrow_left"}
                tmSize={30}
                onClick={() => {
                  handleMonthChange("decrease");
                }}
              />
            )}
          </View>
          <View className="tm-calendar__info">
            {currentDate.current.year}年{currentDate.current.month}月
          </View>
          <View className="tm-calendar__next-btn">
            {/*月份增加按钮*/}
            {!tmHideMonthBtn && (
              <TmIcon
                tmValue={"arrow_right"}
                tmSize={30}
                onClick={() => {
                  handleMonthChange("increase");
                }}
              />
            )}
            {/*年份增加按钮*/}
            {!tmHideYearBtn && (
              <TmIcon
                tmValue={"double_arrow_right"}
                tmSize={30}
                onClick={() => {
                  handleYearChange("increase");
                }}
              />
            )}
          </View>
        </View>
      )}

      {/*主体内容*/}
      <View className="tm-calendar__body">
        {/*星期*/}
        <View className="tm-calendar__week">
          {["一", "二", "三", "四", "五", "六", "日"].map(item => {
            return (
              <View className="tm-calendar__week-item" key={`week-${item}`}>
                {item}
              </View>
            );
          })}
        </View>
        <View className="tm-calendar__day">
          {// 渲染上一个月的日期
          calenderConfig.prevMonthDays.map(item => {
            return (
              <View
                className="tm-calendar__day-item"
                key={`prevMonthDat-${item}`}
                onClick={() => {
                  handleAnotherMonthDayClick({
                    currentDay: item + 1
                  });
                }}
              >
                <View className="tm-calendar__day-item-inner">
                  <View className="tm-calendar__day-item-text">{item + 1}</View>
                </View>
              </View>
            );
          })}
          {// 渲染当月的日期
          calenderConfig.currentMonthDays.map(item => {
            return (
              <View
                className="tm-calendar__day-item tm-calendar__day-item-current-month"
                key={`current-month-day-${item}`}
                onClick={() => {
                  handleCurrentMonthDayClick(item + 1);
                }}
              >
                <View className="tm-calendar__day-item-inner">
                  <View
                    className={classNames("tm-calendar__day-item-text", {
                      "tm-calendar__day-item-text-picked": isPicked(item)
                    })}
                    style={isPicked(item) ? tmPickedStyle : ""}
                  >
                    {item + 1}
                  </View>
                </View>
              </View>
            );
          })}
          {// 渲染下一月的日期
          calenderConfig.nextMonthDays.map(item => {
            return (
              <View
                className="tm-calendar__day-item"
                key={`current-month-day-${item}`}
                onClick={() => {
                  handleAnotherMonthDayClick({
                    currentDay: item + 1,
                    isPrev: false
                  });
                }}
              >
                <View className="tm-calendar__day-item-inner">
                  <View className="tm-calendar__day-item-text">{item + 1}</View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      {tmFooter && <View className="tm-calendar__footer">{tmFooter}</View>}
    </View>
  );
}

export default TmCalendar;
