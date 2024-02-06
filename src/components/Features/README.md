
# Features


### 概述

### 何时使用

在系统中需要通过一些条件，系统性地让整个系统的某些功能屏蔽或者有另外的一些展现方式，可以用该组件来实现

### 特点

* 全局性配置，一次性声明，避免将各种判断语句散落在项目各处造成难以维护
* 具有特征判断和依赖性判断，即当系统描述性文件中含有某个模块且含有所有依赖项模块则判断该组件为正常状态，其他情况为关闭状态
* 可以通过配置文件给正常状态和关闭状态的组件传递不同的props来控制两种状态下组件的不同逻辑
* 在配置文件中，组件的id是简写，只需要保证同一层级的组件id不重复就可以了，它的真实id会通过其所在的上下级关系，通过冒号将每一层的组件id链接起来组成其真实的id，你可以打开调试模式查看每一个组件实际运行时的id和判断状态
* 组件的type可以设置为三种：system,module,feature。system为配置文件最顶级组件，module为功能模块，默认Layout的Page组件openFeatures为true时它的name会被设置成module，feature为具体的功能项

### 示例(全屏)

#### 示例代码

- 展示了一个系统中功能一开启功能二关闭的情况
- 展示了一个系统中功能一开启功能二关闭的情况
- _Features(@components/Features),global(@components/Global),layout(@components/Layout)

```jsx
const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "erc",
            type: "system",
            name: "业务系统",
            children: [
              {
                id: "home",
                type: "module",
                name: "首页",
                children: [
                  {
                    id: "test",
                    type: "feature",
                    name: "测试功能",
                    dependencies: ["erc:client"],
                  },
                ],
              },
              {
                id: "position",
                type: "module",
                name: "职位",
                children: [
                  {
                    id: "position-list",
                    type: "feature",
                    options: [],
                    rejectedOptions: [],
                  },
                ],
              },
              {
                id: "client",
                type: "module",
                name: "客户",
              },
            ],
          },
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <PermissionsPage name="home" openFeatures>
          <Features id="test">功能模块一</Features>
          <Features id="test2">功能模块二</Features>
        </PermissionsPage>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 展示了打开页面特性配置开启和关闭的情况
- 展示了打开页面特性配置开启和关闭的情况
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),Router(react-router-dom)

```jsx
const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
const { Route, Routes } = Router;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "erc",
            type: "system",
            name: "业务系统",
            children: [
              {
                id: "home",
                type: "module",
                name: "首页",
                children: [
                  {
                    id: "test",
                    type: "feature",
                    name: "测试功能",
                  },
                  {
                    id: "test2",
                    type: "feature",
                    name: "测试功能2",
                    dependencies: ["erc:client"],
                  },
                ],
              },
            ],
          },
        },
      }}
    >
      <Layout
        navigation={{
          isFixed: false,
          list: [
            {
              key: "position",
              title: "职位",
              path: "/position",
            },
            {
              key: "client",
              title: "客户",
              path: "/client",
            },
          ],
        }}
      >
        <Routes>
          <Route
            index
            element={
              <PermissionsPage name="home" openFeatures>
                home页面模块
                <div>
                  <Features id="test">开启模块</Features>
                  <Features id="test2">关闭模块</Features>
                </div>
              </PermissionsPage>
            }
          />
          <Route
            path="/position"
            element={
              <PermissionsPage name="position" openFeatures>
                position页面模块
              </PermissionsPage>
            }
          />
          <Route
            path="/client"
            element={
              <PermissionsPage name="client">
                client页面模块,未打开features
              </PermissionsPage>
            }
          />
        </Routes>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 展示了一个系统中功能开启和关闭参数获取
- 展示了一个系统中功能开启和关闭参数获取
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),antd(antd)

```jsx
const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
const { useState } = React;
const { Button, Space } = antd;
const BaseExample = () => {
  const [close, setClose] = useState(false);
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "erc",
            type: "system",
            name: "业务系统",
            children: [
              {
                id: "home",
                type: "module",
                name: "首页",
                children: [
                  {
                    id: "test",
                    type: "feature",
                    name: "测试功能",
                    options: {
                      state: "开启",
                    },
                    rejectedOptions: {
                      state: "关闭",
                    },
                    close: close,
                  },
                ],
              },
            ],
          },
        },
      }}
    >
      <Space direction="vertical">
        <Button
          onClick={() => {
            setClose((value) => !value);
          }}
        >
          切换
        </Button>
        <Layout navigation={{ isFixed: false }}>
          <PermissionsPage name="home" openFeatures>
            <Features id="test">
              {({ isPass, options }) => {
                return isPass
                  ? "模块开启,options:" + JSON.stringify(options)
                  : "模块关闭,options:" + JSON.stringify(options);
              }}
            </Features>
          </PermissionsPage>
        </Layout>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```


### API

| 属性名 | 说明                                              | 类型     | 默认值 |
|-----|-------------------------------------------------|--------|-----|
| id  | 模块或功能id，通过Global里面的preset的features配置确定该模块开启或者关闭 | string | -   |

* features 参数设置

| 属性名     | 说明                             | 类型      | 默认值   |
|---------|--------------------------------|---------|-------|
| debug   | 是否开启调试模式，开启后控制台会打印所有模块的id和判断结果 | boolean | false |
| profile | 模块配置列表，具体参考下面profile参数说明       | object  | -     |

* profile参数说明

| 属性名             | 说明                                                                                                                                                          | 类型            | 默认值   |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------|
| id              | 模块的唯一标识符，需要保证在当前一级中不重复，实际id为所有父级的id用’:‘链接的字符串                                                                                                               | string        | -     |
| type            | 可能取值为system,module,feature，注意最外层的type必须为system                                                                                                              | string        | -     |
| name            | 模块的中文名称，不参与判断，只标识模块名帮助开发者识别                                                                                                                                 | string        | -     |
| close           | 模块是否关闭，可以缺省该值，缺省时profile里面存在某id的模块即为模块开启，不存在即为关闭。在特殊情况下，在profile存在该模块配置但是希望其关闭时可以显示指定该参数为true来关闭模块                                                          | boolean       | false |
| dependencies    | 依赖模块列表，每一项为一个模块id（该id必须为完整的id串，即带有所有父级id的用’:‘链接起来的字符串）,当所有id的指代模块都被判断开启时，该模块被判断为开启                                                                          | array[string] | -     |
| options         | 模块开启时获取的参数                                                                                                                                                  | any           | -     |
| rejectedOptions | 模块关闭时获取的参数                                                                                                                                                  | any           | -     |
| children        | 被控制的模块，为function时可以接收到({isPass,options})参数 isPass为模块是否开启，options在模块开启时为options参数，在模块关闭时为rejectedOptions参数，其不为function类型时当模块关闭则不显示children，模块开启时正常显示children | jsx,function  | -     |
