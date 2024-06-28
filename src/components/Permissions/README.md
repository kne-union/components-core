
# Permissions


### 概述

### 何时使用

在系统中存在一些功能和操作只允许某些角色用户使用，使用该组件可以让其包裹的组件或者区域根据系统的权限列表配置展示不同的状态

### 特点

通过在Global中的preset中设置permissions作为当前用户的权限列表，在Permissions组件配置permissions作为该功能要求具备的权限项，当要求具备的权限项全部在用户的权限列表中找到时为权限通过状态否则为权限不通过状态

当权限不通过时，Permissions组件可以有三种方式呈现：

1. 用户可以看到操作功能的组件显示，但是不能进行操作，在鼠标移入时会以ToolTip提示错误原因，一般用在按钮等需要用户交互的功能位置
2. 用户不能看到操作功能或者数据呈现，对应区域显示错误原因，一般用在要数据展示等场景
3. 隐藏内部组件，一般用在不需要干扰到用户或用户不需要了解其没有权限的功能或数据等场景

### 示例


#### 示例样式

```scss
.box {
  padding: 20px;
  background: #f8f8f8;
}
```

#### 示例代码

- 展示权限不通过的几种形式
- 通过切换不同的type，可以预览三种不同type的表现形式
- _Permissions(@components/Permissions),global(@components/Global),antd(antd)

```jsx
const {default: Permissions} = _Permissions;
const {PureGlobal} = global;
const {Button, Radio, Space} = antd;
const {useState} = React;

const BaseExample = () => {
    const [type, setType] = useState("tooltip");
    return (<PureGlobal
            preset={{
                permissions: ["permission_1", "permission_2"],
            }}
        >
            <Space direction="vertical">
                <Radio.Group
                    value={type}
                    options={[{label: "tooltip", value: "tooltip"}, {
                        label: "error", value: "error",
                    }, {label: "hidden", value: "hidden"},]}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    optionType="button"
                    buttonStyle="solid"
                />
                <Permissions type={type} request={["permission_2"]}>
                    <div className="box">
                        <Button onClick={() => console.log("执行操作")}>有权限操作</Button>
                    </div>
                </Permissions>
                <Permissions type={type} request={["permission_3"]}>
                    <div className="box">
                        <Button onClick={() => console.log("执行操作")}>无权限操作</Button>
                    </div>
                </Permissions>
            </Space>
        </PureGlobal>);
};

render(<BaseExample/>);

```


### API

| 属性名      | 说明                                                                                                      | 类型            | 默认值          |
|----------|---------------------------------------------------------------------------------------------------------|---------------|--------------|
| type     | 类型，可选值为hidden，tooltip，error，分别为隐藏，气泡提示，错误提示三种形式                                                         | string        | hidden       |
| tagName  | 当前组件的tagName，同React.createElement的type参数，默认为span                                                        | string        | span         |
| message  | 提示文案                                                                                                    | string        | 您暂无权限，请联系管理员 |
| request  | 权限列表为一个字符串数组，每个item为一项权限的key，所有权限在全局的permissions中存在则判断为权限通过                                             | array[string] | []           |
| children | 该参数可以传function类型，children({isPass, type, request})，isPass为权限校验是否通过，type为提示类型，request为所需权限列表，可以自行实现权限的展示 | jsx,function  | -            |

