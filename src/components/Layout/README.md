
# Layout


### 概述

### 何时使用

每个登录后的系统页面都应该在Layout的框架之下，它定义了页面的基本框架。根据设计对于页面的不同要求，适当选择不同的组合

### 特点

Layout将整个页面划分成以下几个区域

1. 导航区
2. 内容区
3. 左菜单区
4. 右操作区
5. 页头区
6. 页头信息区
7. 页面标题区

通过给Page配置不同的参数实现不同区域的显示

### 注意

* Page的name参数必须要传，用来在页面跳转时确定Page是不是同一个，决定着Page是否走install周期
* Page组件的参数是通过Context保存在Layout中的，这样做的目的是为了让页面跳转时，除页面区以外的区域在前后俩页面差别不大的情况下走更新周期而不是install周期，以此带来更快的渲染速度避免不必要的重复安装和卸载
* 请尽量通过Page提供的参数来配置出设计要求的页面，不要自行用css实现，以便于Layout组件能从整体控制页面的基本形式和不同区域的padding和margin，让系统更加统一化标准化

### 示例(全屏)


#### 示例样式

```scss
.layout-content {
  color: #fff;
  background: var(--primary-color-4);
  height: 100%;
  text-align: center;
  line-height: 300px;
}

.with-title-layout-content {
  height: 100%;
  //height: calc(100% - 49px);
}

.layout-menu {
  background: #ff9c6e;
  color: #fff;
  height: 110vh;
  text-align: center;
  line-height: 300px;
}

.header {
  background: #ff9c6e;
  height: 100px;
  padding: 10px;
  color: #fff;
}

.right-options {
  background: var(--primary-color-4);
  height: 110vh;
  color: #fff;
}

.header-info {
  padding: 10px;
  height: 100px;
  background: var(--primary-color-4);
  color: #fff;
}
```

#### 示例代码

- 基础上下布局
- 展示最基础的上导航栏，下内容的布局
- _Layout(@components/Layout),global(@components/Global)

```jsx
const { default: Layout, Page } = _Layout;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "base-detail",
              content: "测试帮助文档",
              url: "/",
            },
          ],
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <Page name="base" helperGuideName="base-detail">
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 带有左侧菜单布局
- 展示带有左侧菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page, Menu } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="left-menu"
        menuFixed={false}
        menu={
          <Menu
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
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        backUrl={"/"}
        title="标题"
      >
        <div className="layout-content with-title-layout-content">内容区</div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);

```

- 左侧固定带Header
- 展示带有header的左侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Space className="container" direction="vertical">
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="with-header"
          helperGuideName="base-detail"
          menu={<div className="layout-menu">左侧菜单区</div>}
          titleExtra={
            <Space>
              <Button type="primary">新建</Button>
            </Space>
          }
          title="标题"
          hideCloseSvg={true}
          headerHeight="40px"
          menuFixed={false}
          header={<div className="header">header</div>}
          headerFixed={false}
          headerInfo={<div className="header-info">header info区域</div>}
        >
          <div>内容区</div>
        </Page>
      </Layout>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      enums: {
        helperGuide: () => [
          {
            value: "base-detail",
            content: "测试帮助文档",
            url: "/",
          },
        ],
      },
    }}
  >
    <Example />
  </PureGlobal>
);

```

- 右侧固定
- 展示带有header的右侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="fix-right-menu"
        optionFixed={false}
        option={<div className="right-options">右侧操作区域</div>}
        optionFooter={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        title="标题"
        header={<div className="header">header</div>}
        headerFixed={false}
        menuFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);

```

- 带有filter的列表页
- 展示带有filter的列表页
- layout(@components/Layout),antd(antd),global(@components/Global),filter(@components/Filter)

```jsx
const { default: Layout, Page } = layout;
const {
  InputFilterItem,
  CityFilterItem,
  AdvancedSelectFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
  getFilterValue,
} = filter;
const { useState } = React;
const { Space, Button } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const [filter, setFilter] = useState([]);
  return (
    <PureGlobal preset={{}}>
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="base"
          helperGuideName="base-detail"
          titleExtra={
            <Space>
              <Button type="primary">添加</Button>
            </Space>
          }
          filter={{
            extraExpand: (
              <Button type="primary" size="small">
                订阅筛选项
              </Button>
            ),
            value: filter,
            onChange: (value) => {
              setFilter(value);
              console.log(getFilterValue(value));
            },
            list: [
              [
                <InputFilterItem label="文字" name="text" />,
                <CityFilterItem label="城市" name="city" />,
                <AdvancedSelectFilterItem
                  label="高级选择"
                  name="select"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          { label: "第一项", value: 1 },
                          { label: "第二项", value: 2, disabled: true },
                          {
                            label: "第三项",
                            value: 3,
                          },
                        ],
                      };
                    },
                  }}
                />,
                <UserFilterItem
                  label="用户选择"
                  name="user"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          {
                            label: "用户一",
                            value: 1,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户二",
                            value: 2,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户三",
                            value: 3,
                            description: "我是用户描述",
                          },
                        ],
                      };
                    },
                  }}
                />,
                <FunctionSelectFilterItem
                  label="职能选择"
                  name="function"
                  onlyAllowLastLevel
                  single
                />,
                <IndustrySelectFilterItem
                  label="行业选择"
                  name="industry"
                  onlyAllowLastLevel
                />,
              ],
              [
                <UserFilterItem
                  label="职位协助人"
                  name="position_user"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          {
                            label: "用户一",
                            value: 1,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户二",
                            value: 2,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户三",
                            value: 3,
                            description: "我是用户描述",
                          },
                        ],
                      };
                    },
                  }}
                />,
              ],
            ],
          }}
        >
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 左侧导航菜单
- 展示一个左侧导航菜单
- layout(@components/Layout),antd(antd)

```jsx
const { Menu } = layout;
const { Space } = antd;
const { useState } = React;

const ControlMenu = () => {
  const [current, setCurrent] = useState();
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

const Example = () => {
  return (
    <Space size={10}>
      <Menu
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
      <ControlMenu />
    </Space>
  );
};

render(<Example />);

```

- PageHeader
- 页面头
- layout(@components/Layout),antd(antd)

```jsx
const { default: Layout, Page, Menu, PageHeader } = layout;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        menu={<div className="layout-menu">左侧菜单区</div>}
        title="标题"
        hideCloseSvg={true}
        menuFixed={false}
        name="pageHeaderLayout"
        header={
          <PageHeader
            iconType="icon-color-shenpi-biaoti"
            title="详情页名称"
            info="编号:85767"
            options={[
              {
                children: "新建",
              },
              {
                children: "操作1",
              },
              {
                children: "操作2",
              },
              {
                children: "操作3",
              },
              {
                children: "操作4",
              },
            ]}
            tags={["辅助信息", "辅助信息", "辅助信息", "辅助信息"]}
          />
        }
        headerFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(<Example />);

```


### API

| 属性名        | 说明                     | 类型     | 默认值 |
|------------|------------------------|--------|-----|
| navigation | 导航参数参考 Navigation 组件参数 | object | -   |
| children   | 一般放置Page组件             | jsx    | -   |

### Page

| 属性名             | 说明                                                                  | 类型         | 默认值   |
|-----------------|--------------------------------------------------------------------|------------|-------|
| menu            | 左菜单区内容                                                              | jsx        | -     |
| filter          | 页面标题位置筛选器参数,参考 Filter 组件参数                                          | object     | -     |
| menuOpen        | 左菜单是否默认打开                                                           | boolean    | true  |
| menuWidth       | 左菜单宽度                                                               | string     | 240px |
| menuFixed       | 左菜单是否fixed布局                                                        | boolean    | true  |
| menuCloseButton | 控制左菜单显示隐藏的按钮是否显示                                                    | boolean    | true  |
| header          | 页头区内容                                                               | jsx        | -     |
| headerFixed     | 页头区是否fixed布局                                                        | boolean    | true  |
| headerInfo      | 页头信息区内容                                                             | jsx        | -     |
| backUrl         | 右侧内容区的标题前展示返回按钮，并返回到该url                                   | 参考 useNavigate     | -       |
| title           | 页面标题                                                                | string,jsx | -     |
| titleExtra      | 页面标题区右侧位置内容                                                         | jsx        | -     |
| titleLeftExtra  | 页面标题区左侧位置内容                                                         | jsx        | -     |
| noMargin        | 页面内容区是否去掉Margin                                                     | boolean    | false |
| noPadding       | 页面内容区是否去掉Padding                                                    | boolean    | false |
| option          | 右操作区内容                                                              | jsx        | -     |
| optionWidth     | 右操作区宽度                                                              | string     | 400px |
| optionNoPadding | 右操作区是否去掉Padding                                                     | boolean    | false |
| optionFixed     | 右操作区是否fixed布局                                                       | boolean    | false |
| optionFooter    | 右操作区底部内容                                                            | jsx        | -     |
| openFeatures    | Page是否启用Features，启用时如果配置文件中没有该模块id则判断为模块关闭，会将name作为Features的id进行设置  | boolean    | false |

### Affix

可以控制其中的内容是否是fixed布局

| 属性名          | 说明               | 类型       | 默认值  |
|--------------|------------------|----------|------|
| isFixed      | 内容是否fixed布局      | boolean  | true |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发 | number   | 0    |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number   | -    |
| onChange     | 固定状态改变时触发的回调函数   | function | -    |

### Menu

显示一个菜单，最多支持两级，支持第一级展开收起，支持路径匹配自动高亮

| 属性名              | 说明                                                          | 类型            | 默认值  |
|------------------|-------------------------------------------------------------|---------------|------|
| items            | 菜单项                                                         | array[object] | []   |
| items[].label    | 菜单项显示内容                                                     | jsx           | -    |
| items[].key      | 菜单项的key要求必须唯一                                               | string        | -    |
| items[].iconType | 菜单项前面的icon类型参考 Icon组件的type参数                                | string        | -    |
| items[].path     | 菜单项的路径                                                      | string        | -    |
| items[].onClick  | 菜单项点击触发事件，注意：如果菜单项已经传入path参数则该参数不生效                         | function      | -    |
| items[].children | 菜单项的第二级项列表，参考items参数。注意该组件只支持两级菜单，所以该参数内部的菜单项不再支持children参数 | array[object] | -    |
| currentKey       | 当前被选中的菜单项的key，如果菜单项又path参数，不需要传递该参数，组件会根据路由自动判断选中项          | string        | -    |
| onChange         | currentKey产生修改时触发函数，注意：如果菜单项已经传入path参数则该参数不生效               | function      | -    |
| allowCollapsed   | 是否允许一级菜单收起                                                  | boolean       | true |
| defaultOpenKeys   | 初始展开的 SubMenu 菜单项 key 数组                                                  | string[]      | -    |

### PermissionsPage

加入权限判断的Page，错误类型默认为error，即在该页面没有权限时显示错误

| 属性名         | 说明                      | 类型     | 默认值 |
|-------------|-------------------------|--------|-----|
| permissions | 权限列表参考 Permissions 组件参数 | object | -   |
