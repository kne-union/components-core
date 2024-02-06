
# FullCalendar


### 概述

日程组件


### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _FullCalendar(@components/FullCalendar),_antd(antd),_remoteLoader(@kne/remote-loader),_lodash(lodash),_dayjs(dayjs)

```jsx
const { default: FullCalendar, transformEvents } = _FullCalendar;
const { createWithRemoteLoader } = _remoteLoader;
const { useState } = React;
const { cloneDeep, merge, get } = _lodash;
const dayjs = _dayjs;

const defaultEvents = [
  {
    id: 1,
    title: "我已预约",
    start: "2023-08-22 13:23",
    end: "2023-08-23 14:23",
    bookable: 0,
  },
  {
    id: 2,
    title: "zhangjian",
    bookable: 0,
    start: "2023-08-23 13:23",
    end: "2023-08-23 16:23",
  },
  {
    id: 3,
    title: "sssssadsf",
    start: "2023-08-23 12:23",
    end: "2023-08-23 14:23",
  },
  {
    id: 4,
    title: "我已预约",
    start: "2023-08-23 12:23",
    end: "2023-08-23 14:23",
  },
  {
    id: 5,
    title: "我已预约",
    start: "2023-08-22 12:23",
    end: "2023-08-23 14:23",
  },
];

const Content = ({ remoteModules }) => {
  const [events, setEvents] = useState(defaultEvents);
  const [_, useFormModal] = remoteModules;
  const formModal = useFormModal();

  const onSuccess = ({ start, end, id }) => {
    const obj = {
      title: "已预约",
      start,
      end,
      id: id ? id : null,
    };
    setEvents((events) => {
      const _events = cloneDeep(events);
      const index = _events.findIndex((item) => item.id === id);

      if (index === -1) {
        _events.push(obj);
      } else {
        _events.splice(index, 1, obj);
      }

      return _events;
    });
  };

  const deleteDate = (id) => {
    setEvents((events) => {
      const _events = cloneDeep(events);
      const index = _events.findIndex((item) => item.id === id);

      _events.splice(index, 1);

      return _events;
    });
  };

  return (
    <FullCalendar
      eventSources={[transformEvents(events)]}
      // events={(eventInfo = {}, successCallback) => {
      //   let newData = {};
      //   if (eventInfo.start && eventInfo.end) {
      //     newData = defaultEvents;
      //   }
      //
      //   return successCallback(newData);
      // }}
      dateClick={(eventInfo) => {
        formModal({
          title: "添加",
          children: <div>11111</div>,
        });
      }}
      eventClick={(eventInfo) => {
        const currentData = get(eventInfo, "event._def.extendedProps.main");
        console.log(1111, currentData);

        formModal({
          title: "编辑",
          children: <div>11111</div>,
        });
      }}
    />
  );
};

const BaseExample = createWithRemoteLoader({
  modules: [
    "components-core:Global@PureGlobal",
    "components-core:FormInfo@useFormModal",
  ],
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal>
      <Content remoteModules={remoteModules} />
    </PureGlobal>
  );
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

