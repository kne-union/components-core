
# Navigation


### 概述

### 何时使用

系统的顶部导航，一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

### 特点

* 集成了Permissions权限判断，可以通过权限列表来判断导项是否显示 
* 在屏幕显示不了全部的一级导航时可以自动将后面的导航项收起到更多下拉菜单里面

### 示例(全屏)


#### 示例样式

```scss
.fold-items{
  width: 600px;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

render(
  <PureGlobal>
    <Navigation
      list={menuList}
      isFixed={false}
      permissions={[
        "client:client:look",
        "jd:job:look",
        "cv:cv:look",
        "contract:mgr:look",
        "payment:mgr:look",
        "client:invoice:center",
        "client:invoice:manager",
        "system:permissions:mgr",
      ]}
    />
  </PureGlobal>
);

```

- 这里填写示例标题
- 这里填写示例说明
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

render(
  <PureGlobal>
    <div className="fold-items">
      <Navigation
        isFixed={false}
        list={menuList}
        permissions={[
          "client:client:look",
          "jd:job:look",
          "cv:cv:look",
          "contract:mgr:look",
          "payment:mgr:look",
          "client:invoice:center",
          "client:invoice:manager",
          "system:permissions:mgr",
        ]}
      />
    </div>
  </PureGlobal>
);

```

- 这里填写示例标题
- 这里填写示例说明
- _Navigation(@components/Navigation),antd(antd),global(@components/Global)

```jsx
const { useState } = React;
const { PureGlobal } = global;
const { default: Navigation } = _Navigation;
const { Checkbox, Space } = antd;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

const Example = () => {
  const [permissions, setPermissions] = useState([]);
  return (
    <PureGlobal>
      <Space className="container" direction="vertical" size={32}>
        <Navigation isFixed={false} list={menuList} permissions={permissions} />
        <Checkbox.Group
          value={permissions}
          options={[
            "client:client:look",
            "jd:job:look",
            "cv:cv:look",
            "contract:mgr:look",
            "payment:mgr:look",
            "client:invoice:center",
            "client:invoice:manager",
            "system:permissions:mgr",
          ]}
          onChange={(values) => {
            setPermissions(values);
          }}
        />
      </Space>
    </PureGlobal>
  );
};

render(<Example />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

