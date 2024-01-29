import style from "./style.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import Tooltip from "@components/Tooltip";
import { Divider } from "antd";
import classnames from "classnames";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";
import dayjs from "dayjs";
import merge from "lodash/merge";
import flatten from "lodash/flatten";

const Calendar = (props) => {
  return <FullCalendar {...props} />;
};

const showStrLength = 6;

const getByteLen = function (str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    str.charCodeAt(i) < 256 ? (len += 1) : (len += 2);
  }
  return len;
};

const ContentComponent = ({ main, title }) => {
  const { disabled, date, candidateName, start, end, onClick } = main || {};
  const _start = dayjs(start).format("HH:mm");
  const _end = dayjs(end).format("HH:mm");
  const _end_tooltip =
    dayjs(start).format("YYYY-MM-DD") === dayjs(end).format("YYYY-MM-DD")
      ? dayjs(end).format("HH:mm")
      : dayjs(end).format("YYYY-MM-DD HH:mm");
  const timeText = `${_start}-${_end}`;
  const _timeTextTooltip = `${_start} - ${_end_tooltip}`;

  const contentHtml = (
    <div
      className={style["row"]}
      onClick={() => {
        if (disabled) return;
        onClick && onClick(main);
      }}
    >
      <span className={classnames("select-dot", style["dot"])}></span>
      <span className={classnames("select-time", style["time"])}>
        {timeText}
      </span>
      <span className={classnames("select-title", style["title"])}>
        {getByteLen(title) > showStrLength
          ? title.slice(0, showStrLength - 3) + "..."
          : title}
      </span>
    </div>
  );

  return (
    <div
      className={classnames(
        style["select-date-box"],
        disabled ? style["selected"] : style["not-selected"]
      )}
    >
      {disabled ? (
        <Tooltip
          overlayClassName={style["calendar-tooltip"]}
          content={
            <div className={style["tooltip"]}>
              <div className={style["tooltip-header"]}>客户面试</div>
              <Divider />
              <div className={style["tooltip-body"]}>
                <div className={style["tooltip-box"]}>
                  <label>候选人：</label>
                  <div>{candidateName}</div>
                </div>
                <div className={style["tooltip-box"]}>
                  <label>面试时间：</label>
                  <div>
                    {date} {_timeTextTooltip}
                  </div>
                </div>
              </div>
            </div>
          }
          placement={"rightTop"}
        >
          {contentHtml}
        </Tooltip>
      ) : (
        <Tooltip
          overlayClassName={style["calendar-tooltip"]}
          content={
            <div className={style["tooltip"]}>
              <div className={style["tooltip-header"]}>日程</div>
              <Divider />
              <div className={style["tooltip-body"]}>
                <div className={style["tooltip-box"]}>
                  <label>日程标题：</label>
                  <div>{title || "-"}</div>
                </div>
                <div className={style["tooltip-box"]}>
                  <label>日程时间：</label>
                  <div>
                    {date} {_timeTextTooltip}
                  </div>
                </div>
              </div>
            </div>
          }
          placement={"rightTop"}
        >
          {contentHtml}
        </Tooltip>
      )}
    </div>
  );
};

const renderEventContent = (eventInfo = {}) => {
  const { event } = eventInfo || {};
  const title = event._def.title || "";
  const main = get(event, "_def.extendedProps.main") || {};
  const { showOther } = main;
  const { num, content } = showOther || {};

  return (
    <>
      <ContentComponent title={title} main={main} />
      {showOther && (
        <div
          className={style["other"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Tooltip
            overlayClassName={style["calendar-tooltip"]}
            content={
              <div className={style["other-tooltip"]}>
                {(content || []).map((item) => {
                  return (
                    <ContentComponent
                      key={item.id}
                      main={item.main}
                      title={item.title}
                    />
                  );
                })}
              </div>
            }
            placement={"rightTop"}
          >
            <div>还有{num}项…</div>
          </Tooltip>
        </div>
      )}
    </>
  );
};

Calendar.defaultProps = {
  timezone: "UTC",
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, scrollGridPlugin],
  initialView: "dayGridMonth",
  aspectRatio: 1.6,
  weekends: true,
  slotEventOverlap: false,
  displayEventEnd: true,
  editable: false,
  firstDay: 1,
  buttonText: {
    today: "今天",
    month: "月",
  },
  dayMinWidth: 100,
  locale: "zh-cn",
  headerToolbar: {
    center: "",
    left: "prev title next",
    right: "today",
  },
  height: "auto",
  handleWindowResize: false,
  eventContent: renderEventContent,
  dateClick: () => {},
  eventClick: () => {},
  initialDate: dayjs().format("YYYY-MM-DD"),
};

export const transformEvents = (events, onClickOtherItem) => {
  if (events.length === 0) return [];

  const arr = events.map((item, index) => ({
    ...item,
    title: Boolean(item?.bookable === 0) ? "已预约" : item.title,
    main: {
      id: index,
      title: Boolean(item?.bookable === 0) ? "已预约" : item.title,
      candidateName: item.title || "-",
      disabled: Boolean(item?.bookable === 0),
      date: dayjs(item.start).format("YYYY-MM-DD"),
      start: dayjs(item.start).format("YYYY-MM-DD HH:mm"),
      end: dayjs(item.end).format("YYYY-MM-DD HH:mm"),
    },
  }));
  const groupList = groupBy(arr, (item) => {
    return dayjs(item.start).startOf("day").format("YYYY-MM-DD");
  });

  let newEvents = [];
  Object.keys(groupList).forEach((key) => {
    let _newEvents = [];
    const orderTimeArr = orderBy(
      groupList[key],
      ["start", "end"],
      ["asc", "desc"]
    );

    if (orderTimeArr.length > 4) {
      _newEvents = orderTimeArr.slice(0, 3);
      _newEvents[2] = merge({}, orderTimeArr[2], {
        main: {
          showOther: {
            num: orderTimeArr.length - 3,
            disabled: true,
            content: orderTimeArr.slice(3, orderTimeArr.length).map((item) => ({
              ...item,
              main: {
                ...item.main,
                onClick: onClickOtherItem || (() => {}),
              },
            })),
          },
        },
      });
    } else {
      _newEvents = orderTimeArr.slice(0, orderTimeArr.length);
    }
    newEvents.push(_newEvents);
  });
  console.log(">>>>> newEvents", flatten(newEvents));
  return flatten(newEvents);
};

export default Calendar;
