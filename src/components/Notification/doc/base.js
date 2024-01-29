const { default: Notification } = _Notification;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        ajax: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ data: { code: 0, data: {} } });
            }, 1000);
          });
        },
        apis: {
          notification: {},
        },
        global: {
          notification: {
            list: [
              {
                id: 1,
                level: "high",
                title:
                  "我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知",
                subtitle:
                  "通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题",
                link: "https://www.baidu.com",
                content: [
                  {
                    label: "字段",
                    content: "哈哈哈哈",
                  },
                  {
                    label: "字段",
                    content:
                      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                  },
                  {
                    label: "字段",
                    content: "哈哈哈哈",
                  },
                  {
                    label: "字段",
                    content: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                  },
                  {
                    label: "字段",
                    content: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                  },
                ],
              },
              {
                id: 2,
                level: "high",
                title: "我是一个高级通知2",
                content: [
                  {
                    label: "字段",
                    content: "哈哈哈哈",
                  },
                ],
              },
              {
                id: 3,
                level: "high",
                title: "我是一个高级通知3",
                content: [
                  {
                    label: "字段",
                    content: "哈哈哈哈",
                  },
                ],
              },
              {
                id: 4,
                level: "high",
                title: "我是一个高级通知4",
                content: [
                  {
                    label: "字段",
                    content: "哈哈哈哈",
                  },
                ],
              },
              {
                id: 5,
                level: "low",
                title: "我是一个低级通知",
                content: [
                  {
                    label: "字段",
                    content: "哈哈哈哈",
                  },
                ],
              },
              {
                id: 6,
                level: "low",
                title: "我是一个低级通知2",
                content: [
                  {
                    label: "字段",
                    content: "哈哈哈哈",
                  },
                ],
              },
              {
                id: 7,
                level: "middle",
                title: "我是一个中级通知",
                children: "哈哈哈哈",
              },
            ],
          },
        },
      }}
    >
      <Notification />
    </PureGlobal>
  );
};

render(<BaseExample />);
