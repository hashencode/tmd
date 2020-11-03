import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmDrawer, TmIcon } from "../../index";
import {
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  isDate,
  startOfMonth,
} from "date-fns";
import throttle from "lodash/throttle";
import { colorPrimary } from "../../functions/theme";

interface PropsInterface {
  tmAllowClear?: boolean; // 显示取消选择
  tmDefaultValue?: Date | string; // 默认值
  tmDisabled?: boolean; // 禁用
  tmHideHead?: boolean; // 显示头部
  tmHideMonthBtn?: boolean; // 禁止更改月份
  tmHideYearBtn?: boolean; // 禁止更改年份
  tmPickedStyle?: Object; // 选中样式
  tmPlaceholder?: string; // 占位符
  tmTitle?: string | ReactNode; // 标题
  tmTriggerClassName?: string; // 触发器类名
  tmValue?: Date | string; // 当前选中的值
  onChange?: (value: string) => void; // 选项变动回调
  onConfirm?: (value: string) => void; // 选项变动回调
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

function TmDatePicker(props: PropsInterface) {
  const {
    tmAllowClear = false,
    tmDefaultValue = null,
    tmDisabled = false,
    tmHideHead = false,
    tmHideMonthBtn = false,
    tmHideYearBtn = false,
    tmPickedStyle = {
      backgroundColor: colorPrimary,
      color: "white",
    },
    tmPlaceholder = "",
    tmTitle = "",
    tmTriggerClassName = "",
    // tmValue = "",
    onChange = () => {},
    onConfirm = () => {},
    className = "",
    style = {},
  } = props;

  // 抽屉的开合
  const [isDrawerShow, setIsDrawerShow] = useState(false);

  // 触发器显示文字
  const [triggerText, setTriggerText] = useState("");

  // 当前日期，此处的年月没有0值
  const panelDate = useRef<CurrentDataInterface>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  // 当前被选中的日期的数据
  const [pickedDate, setPickedDate] = useState({
    year: -1,
    month: -1,
    day: -1,
  });

  // 用于显示日历的数据
  const [calenderDisplayData, setCalenderConfig] = useState<ConfigInterface>({
    currentMonthDays: [],
    prevMonthDays: [],
    nextMonthDays: [],
  });

  // 重置选中日期数据
  const pickedDateReset = () => {
    setPickedDate({
      year: -1,
      month: -1,
      day: -1,
    });
  };

  // 打开抽屉
  const openDrawer = () => {
    if (tmDisabled) return;
    setIsDrawerShow(true);
  };

  // 关闭抽屉
  const closeDrawer = () => {
    setIsDrawerShow(false);
  };

  // 点击遮罩关闭或点击取消
  const handleCancel = () => {
    // if(pickedDate.day>-1 && ){
    //
    // }
  };

  // 确认回调
  const handleConfirm = () => {
    // 当设置有 tmValue 值时，视作完全控制，用户行为不会触发更新操作
    if ("tmValue" in props) return;

    // setTriggerText(tempValue.current);
    // onConfirm(tempValue.current);
    closeDrawer();
  };

  // 处理日历输入变更
  const handleCalendarChange = (e) => {
    // tempValue.current = e;
    onChange(e);
  };

  // 创造指定长度的数组
  const createArray = (sum) => Array.from(Array(sum).keys());

  // 计算日历展示信息
  const calcDisplayData = (time) => {
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
      ...calenderDisplayData,
      prevMonthDays,
      currentMonthDays,
      nextMonthDays,
    });
  };

  // 修改年份
  const handleYearChange = throttle(
    (event) => {
      panelDate.current.year -= event === "decrease" ? 1 : -1;
      calcDisplayData(
        new Date(`${panelDate.current.year}/${panelDate.current.month}/1`)
      );
    },
    500,
    { trailing: false }
  );

  // 修改月份
  const handleMonthChange = throttle(
    (event) => {
      // 涉及1月和12月时的年份切换
      if (event === "decrease") {
        if (panelDate.current.month === 1) {
          panelDate.current.month = 12;
          panelDate.current.year -= 1;
        } else {
          panelDate.current.month -= 1;
        }
      } else if (event === "increase") {
        if (panelDate.current.month === 12) {
          panelDate.current.month = 1;
          panelDate.current.year += 1;
        } else {
          panelDate.current.month += 1;
        }
      }
      calcDisplayData(
        new Date(`${panelDate.current.year}/${panelDate.current.month}/1`)
      );
    },
    500,
    { trailing: false }
  );

  // 非当前月份日期点击
  const handleOtherMonthDayClick = ({ currentDay, isPrev = true }) => {
    const { year, month } = panelDate.current;
    const newDate = { year, month: month + (isPrev ? -1 : 1), day: currentDay };
    setPickedDate(newDate);
    handleMonthChange(isPrev ? "decrease" : "increase");
    if (JSON.stringify(pickedDate) !== JSON.stringify(newDate)) {
      handleCalendarChange(`${year}/${month}/${currentDay}`);
    }
  };

  // 当前月份日期点击
  const handleCurrentMonthDayClick = (currentDay) => {
    const { year, month } = panelDate.current;
    if (currentDay === pickedDate.day && tmAllowClear) {
      pickedDateReset();
      handleCalendarChange("");
    } else {
      setPickedDate({
        year,
        month,
        day: currentDay,
      });
      const newDate = { year, month, day: currentDay };
      if (JSON.stringify(pickedDate) !== JSON.stringify(newDate)) {
        handleCalendarChange(`${year}/${month}/${currentDay}`);
      }
    }
  };

  // 计算是否被选中
  const isPicked = (currentDay) => {
    return (
      pickedDate.year === panelDate.current.year &&
      pickedDate.month === panelDate.current.month &&
      pickedDate.day === currentDay + 1
    );
  };

  // 初次渲染时判断是否存在默认值
  useLayoutEffect(() => {
    if (tmDefaultValue && isDate(tmDefaultValue)) {
      const _dateValue = {
        year: getYear(tmDefaultValue),
        month: getMonth(tmDefaultValue) + 1,
      };
      // 设定被选中的值
      setPickedDate({
        ..._dateValue,
        day: getDate(tmDefaultValue),
      });
      // 设定当前年月
      panelDate.current = {
        ..._dateValue,
      };
      calcDisplayData(tmDefaultValue);
    } else {
      const _date = new Date();
      panelDate.current = {
        year: getYear(_date),
        month: getMonth(_date) + 1,
      };
      calcDisplayData(_date);
    }
  }, []);

  return (
    <View className={classNames("tm-date-picker", className)} style={style}>
      <View
        className={classNames(
          "tm-date-picker__trigger",
          {
            "tm-date-picker__trigger-disabled": tmDisabled,
            "tm-date-picker__trigger-placeholder": !triggerText,
          },
          tmTriggerClassName
        )}
        onClick={openDrawer}
      >
        {triggerText || tmPlaceholder || ""}
      </View>
      <TmDrawer
        tmTitle={tmTitle}
        tmShow={isDrawerShow}
        onMaskClick={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <View className="tm-calendar">
          {/* 头部 */}
          {!tmHideHead && (
            <View className="tm-calendar__head">
              <View className="tm-calendar__prev-btn">
                {/* 年份减少按钮 */}
                {!tmHideYearBtn && (
                  <TmIcon
                    tmValue="double_arrow_left"
                    onClick={() => {
                      handleYearChange("decrease");
                    }}
                  />
                )}
                {/* 月份减少按钮 */}
                {!tmHideMonthBtn && (
                  <TmIcon
                    tmValue="arrow_left"
                    onClick={() => {
                      handleMonthChange("decrease");
                    }}
                  />
                )}
              </View>
              <View className="tm-calendar__info">
                {panelDate.current.year}年{panelDate.current.month}月
              </View>
              <View className="tm-calendar__next-btn">
                {/* 月份增加按钮 */}
                {!tmHideMonthBtn && (
                  <TmIcon
                    tmValue="arrow_right"
                    onClick={() => {
                      handleMonthChange("increase");
                    }}
                  />
                )}
                {/* 年份增加按钮 */}
                {!tmHideYearBtn && (
                  <TmIcon
                    tmValue="double_arrow_right"
                    onClick={() => {
                      handleYearChange("increase");
                    }}
                  />
                )}
              </View>
            </View>
          )}

          {/* 主体内容 */}
          <View className="tm-calendar__body">
            {/* 星期 */}
            <View className="tm-calendar__week">
              {["一", "二", "三", "四", "五", "六", "日"].map((item) => {
                return (
                  <View className="tm-calendar__week-item" key={`week-${item}`}>
                    {item}
                  </View>
                );
              })}
            </View>
            <View className="tm-calendar__day">
              {
                // 渲染上一个月的日期
                calenderDisplayData.prevMonthDays.map((item) => {
                  return (
                    <View
                      className="tm-calendar__day-item"
                      key={`prevMonthDat-${item}`}
                      onClick={() => {
                        handleOtherMonthDayClick({
                          currentDay: item + 1,
                        });
                      }}
                    >
                      <View className="tm-calendar__day-item-inner">
                        <View className="tm-calendar__day-item-text">
                          {item + 1}
                        </View>
                      </View>
                    </View>
                  );
                })
              }
              {
                // 渲染当月的日期
                calenderDisplayData.currentMonthDays.map((item) => {
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
                            "tm-calendar__day-item-text-picked": isPicked(item),
                          })}
                          style={isPicked(item) ? tmPickedStyle : ""}
                        >
                          {item + 1}
                        </View>
                      </View>
                    </View>
                  );
                })
              }
              {
                // 渲染下一月的日期
                calenderDisplayData.nextMonthDays.map((item) => {
                  return (
                    <View
                      className="tm-calendar__day-item"
                      key={`current-month-day-${item}`}
                      onClick={() => {
                        handleOtherMonthDayClick({
                          currentDay: item + 1,
                          isPrev: false,
                        });
                      }}
                    >
                      <View className="tm-calendar__day-item-inner">
                        <View className="tm-calendar__day-item-text">
                          {item + 1}
                        </View>
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </View>
        </View>
      </TmDrawer>
    </View>
  );
}

export default TmDatePicker;
