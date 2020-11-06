import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmDrawer, TmIcon } from "../../index";
import throttle from "lodash/throttle";
import { colorPrimary } from "../../functions/theme";
import { isEmpty } from "../../functions";
import * as dayjs from "dayjs";

export interface datePickerProps {
  tmAllowClear?: boolean; // 显示取消选择
  tmDefaultValue?: Date | string; // 默认值
  tmDisabled?: boolean; // 禁用
  tmFormat?: string; // 触发器字符串格式化
  tmHideHead?: boolean; // 显示头部
  tmHideMonthBtn?: boolean; // 禁止更改月份
  tmHideYearBtn?: boolean; // 禁止更改年份
  tmPickedStyle?: Object; // 选中样式
  tmPlaceholder?: string; // 占位符
  tmTitle?: string | ReactNode; // 标题
  tmTriggerClassName?: string; // 触发器类名
  tmValue?: Date | string; // 当前选中的值
  onCancel?: () => void; // 取消回调
  onChange?: (value: dateValueInterface) => void; // 选项变动回调
  onConfirm?: (value: dateValueInterface) => void; // 选项变动回调
  onHide?: () => void; // 抽屉隐藏回调
  onShow?: () => void; // 抽屉显示回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

interface configInterface {
  currentMonthDays: number[];
  prevMonthDays: number[];
  nextMonthDays: number[];
}

interface dateValueInterface {
  date: any;
  dateString: string;
}

function TmDatePicker(props: datePickerProps) {
  const {
    tmAllowClear = false,
    tmDefaultValue = null,
    tmDisabled = false,
    tmFormat = "YYYY-MM-DD",
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
    tmValue = "",
    onCancel = () => {},
    onChange = () => {},
    onConfirm = () => {},
    onHide = () => {},
    onShow = () => {},
    className = "",
    style = {},
  } = props;

  // 抽屉的开合
  const [isDrawerShow, setIsDrawerShow] = useState(false);

  // 触发器显示文字
  const [triggerText, setTriggerText] = useState("");

  // 用于显示日历的数据
  const [calenderDisplayData, setCalenderConfig] = useState<configInterface>({
    currentMonthDays: [],
    prevMonthDays: [],
    nextMonthDays: [],
  });

  // 当前面板显示年月
  const panelDate = useRef<any>(dayjs());

  // 已确定激活的选项
  const [pickedDate, setPickedDate] = useState<any>(null);

  // 当前操作的未确定的激活选项
  const [tempPickedDate, setTempPickedDate] = useState<any>(null);

  // 打开抽屉
  const openDrawer = () => {
    if (tmDisabled) return;
    setIsDrawerShow(true);
  };

  // 关闭抽屉
  const handleCancel = () => {
    // 取消回调
    onCancel();
    // 关闭抽屉
    setIsDrawerShow(false);
    // 重置临时选中的值为确认选中的值
    setTempPickedDate(pickedDate);
  };

  const outputValueFormat = (date) => {
    return {
      date: date,
      dateString: date ? date.format(tmFormat) : "",
    };
  };

  // 确认回调
  const handleConfirm = () => {
    // 确认回调
    onConfirm(outputValueFormat(tempPickedDate));
    // 关闭抽屉
    setIsDrawerShow(false);
    // 当设置有 tmValue 值时，视作完全控制，用户行为不会触发更新操作
    if ("tmValue" in props) return;
    // 更新当前被选中的值
    setPickedDate(tempPickedDate);
    // 更新触发器文字
    updateTriggerText(tempPickedDate);
  };

  // 更新触发器文字
  const updateTriggerText = (date) => {
    setTriggerText(outputValueFormat(date).dateString);
  };

  // 创造指定长度的数组
  const createArray = (sum) => Array.from(Array(sum).keys());

  // 计算日历展示信息
  const calcDisplayData = (date) => {
    // 当月日期信息
    const monthFirstDay = date.startOf("month").day();
    const monthDaySum = date.daysInMonth();
    // 前一月份日期信息
    let prevMonthDaySum = date.subtract(1, "year").daysInMonth();
    // 用于循环上月部分的数组
    let prevMonthDays = [] as number[];
    if (monthFirstDay === 0) {
      // 若当月的第一天为周日
      prevMonthDays = createArray(prevMonthDaySum).slice(-6);
    } else if (monthFirstDay > 1) {
      // 若当月的第一天大于周一
      prevMonthDays = createArray(prevMonthDaySum).slice(
        (monthFirstDay - 1) * -1
      );
    }
    // 用于循环当月部分的数组
    const currentMonthDays = createArray(monthDaySum);
    const nextMonthSum =
      42 - monthDaySum - (monthFirstDay < 1 ? 6 : monthFirstDay - 1);
    // 用于循环下月部分的数组
    const nextMonthDays = nextMonthSum > 0 ? createArray(nextMonthSum) : [];
    // 修改显示数据
    setCalenderConfig({
      prevMonthDays,
      currentMonthDays,
      nextMonthDays,
    });
  };

  // 修改年份或月份
  const handlePanelChange = throttle(
    ({ event, type = "month" }) => {
      let newDate;
      if (event === "decrease") {
        newDate = panelDate.current.subtract(1, type);
      } else {
        newDate = panelDate.current.add(1, type);
      }
      panelDate.current = newDate;
      calcDisplayData(newDate);
    },
    500,
    { trailing: false }
  );

  // 处理日期点击
  const handleDayClick = ({ currentDay, type = "current" }) => {
    let newDate = panelDate.current;
    // 判断是当月、上月还是下月
    if (type === "current") {
      newDate = newDate.date(currentDay);
    } else {
      if (type === "prev") {
        newDate = newDate.subtract(1, "month").date(currentDay);
        // 切换月份
        handlePanelChange({ event: "decrease" });
      } else {
        newDate = newDate.add(1, "month").date(currentDay);
        handlePanelChange({ event: "increase" });
      }
    }
    // 如果点击同一日期，且允许清空
    if (newDate.isSame(tempPickedDate, "day") && tmAllowClear) newDate = null;
    // 通知回调
    if (newDate) {
      onChange(outputValueFormat(newDate));
    }
    if ("tmValue" in props) return;
    setTempPickedDate(newDate);
  };

  // 计算是否被选中
  const isPicked = useCallback(
    (currentDay) => {
      const currentDate = panelDate.current.date(currentDay);
      return currentDate.isSame(tempPickedDate, "day");
    },
    [tempPickedDate, panelDate]
  );

  const valueFormat = (dateValue) => {
    // 对输入的值进行格式的检查
    const date = dayjs(dateValue);
    if (!date.isValid())
      return console.warn(
        "DatePicker, the value of tmValue should be a date or date string"
      );
    // 设定被选中的值
    setPickedDate(date);
    // 设定临时被选中的值
    setTempPickedDate(date);
    // 设定当前年月
    panelDate.current = date;
    calcDisplayData(date);
    updateTriggerText(date);
  };

  // 监听 tmValue 的改变
  useLayoutEffect(() => {
    valueFormat(tmValue);
  }, [tmValue]);

  // 初次渲染时设置 tmDefaultValue
  useLayoutEffect(() => {
    // 在 tmValue 为空且 tmDefaultValue 不为空时，设置默认值
    if ("tmValue" in props) return;
    if (isEmpty(tmDefaultValue)) {
      const date = dayjs();
      panelDate.current = date;
      calcDisplayData(date);
    } else {
      valueFormat(tmDefaultValue);
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
        onShow={onShow}
        onHide={onHide}
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
                      handlePanelChange({ event: "decrease", type: "year" });
                    }}
                  />
                )}
                {/* 月份减少按钮 */}
                {!tmHideMonthBtn && (
                  <TmIcon
                    tmValue="arrow_left"
                    onClick={() => {
                      handlePanelChange({ event: "decrease" });
                    }}
                  />
                )}
              </View>
              <View className="tm-calendar__info">
                {panelDate.current.year()}年{panelDate.current.month() + 1}月
              </View>
              <View className="tm-calendar__next-btn">
                {/* 月份增加按钮 */}
                {!tmHideMonthBtn && (
                  <TmIcon
                    tmValue="arrow_right"
                    onClick={() => {
                      handlePanelChange({ event: "increase" });
                    }}
                  />
                )}
                {/* 年份增加按钮 */}
                {!tmHideYearBtn && (
                  <TmIcon
                    tmValue="double_arrow_right"
                    onClick={() => {
                      handlePanelChange({ event: "increase", type: "year" });
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
                        handleDayClick({
                          currentDay: item + 1,
                          type: "prev",
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
                        handleDayClick({
                          currentDay: item + 1,
                          type: "current",
                        });
                      }}
                    >
                      <View className="tm-calendar__day-item-inner">
                        <View
                          className={classNames("tm-calendar__day-item-text", {
                            "tm-calendar__day-item-text-picked": isPicked(
                              item + 1
                            ),
                          })}
                          style={isPicked(item + 1) ? tmPickedStyle : ""}
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
                        handleDayClick({
                          currentDay: item + 1,
                          type: "next",
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
