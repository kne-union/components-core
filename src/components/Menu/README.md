
# Menu


### 概述

支持远程加载数据的菜单


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space } = antd;
const { useState } = React;

const ControlMenu = () => {
  const [current, setCurrent] = useState("s-0");
  return (
    <Menu
      currentKey={current}
      onChange={setCurrent}
      items={[
        {
          label: "父级标题1",
          key: "p-0",
          iconType: "icon-zhanghaodenglu",
          children: [
            {
              label: "子标题1",
              key: "s-0",
            },
            {
              label: "子标题2",
              key: "s-1",
            },
          ],
        },
        {
          label: "父级标题2",
          key: "p-1",
          iconType: "icon-zhanghaodenglu",
          children: [
            {
              label: "子标题1",
              key: "s-2",
            },
            {
              label: "子标题2",
              key: "s-3",
            },
          ],
        },
        {
          label: "父级标题3",
          key: "p-2",
          iconType: "icon-zhanghaodenglu",
        },
      ]}
    />
  );
};
const BaseExample = () => {
  return (
    <Space>
      <div style={{ maxWidth: "200px" }}>
        <Menu
          defaultItems={[
            {
              label: "父级标题1",
              iconType: "icon-zhanghaodenglu",
              children: [
                {
                  label:
                    "子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级",
                  path: "/link1",
                },
                {
                  label: "子标题2",
                  path: "/link2",
                },
              ],
            },
            {
              label: "父级标题2",
              iconType: "icon-zhanghaodenglu",
              children: [
                {
                  label: "子标题1",
                  path: "/link3",
                },
                {
                  label: "子标题2",
                  path: "/link4",
                },
              ],
            },
            {
              label: "父级标题3",
              iconType: "icon-zhanghaodenglu",
              fetchOptions: {
                loader: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "子标题1",
                          path: "/link5",
                        },
                        {
                          label: "子标题2",
                          path: "/link6",
                        },
                      ]);
                    }, 1000);
                  });
                },
              },
            },
          ]}
        />
      </div>

      <Menu
        items={[
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题1",
            key: "s-0",
            path: "/link1",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题2",
            key: "s-1",
            path: "/link2",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题1",
            key: "s-2",
            path: "/link3",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题2",
            key: "s-3",
            path: "/link4",
          },
        ]}
      />
      <Menu
        allowCollapsed={false}
        items={[
          {
            label: "父级标题1",
            key: "p-0",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-0",
                path: "/link1",
              },
              {
                label: "子标题2",
                key: "s-1",
                path: "/link2",
              },
            ],
          },
          {
            label: "父级标题2",
            key: "p-1",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-2",
                path: "/link3",
              },
              {
                label: "子标题2",
                key: "s-3",
                path: "/link4",
              },
            ],
          },
          {
            label: "父级标题3",
            key: "p-2",
            iconType: "icon-zhanghaodenglu",
            path: "/link5",
          },
        ]}
      />
      <Menu
        allowCollapsed={false}
        defaultItems={[
          {
            label: "父级标题1",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                path: "/link1",
              },
              {
                label: "子标题2",
                path: "/link2",
              },
            ],
          },
          {
            label: "父级标题2",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                path: "/link3",
              },
              {
                label: "子标题2",
                path: "/link4",
              },
            ],
          },
          {
            label: "父级标题3",
            iconType: "icon-zhanghaodenglu",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "子标题1",
                        path: "/link5",
                      },
                      {
                        label: "子标题2",
                        path: "/link6",
                      },
                    ]);
                  }, 1000);
                });
              },
            },
          },
        ]}
      />
      <Menu
        defaultItems={[
          {
            label: "父级标题1",
            children: [
              {
                label: "子标题1",
                path: "/link1",
              },
              {
                label: "子标题2",
                path: "/link2",
              },
            ],
          },
          {
            label: "父级标题2",
            children: [
              {
                label: "子标题1",
                path: "/link3",
              },
              {
                label: "子标题2",
                path: "/link4",
              },
            ],
          },
        ]}
      />
      <ControlMenu />
    </Space>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

