### Features 组件

Features 是一个功能开关组件，用于根据配置控制子组件的显示或隐藏。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | 功能标识符，对应 preset.features.profile 中定义的 id | string | 是 | - |
| children | 子内容，可以是 JSX 或函数。为函数时接收 {isPass, options, currentId} 参数 | ReactNode \| Function | 是 | - |

#### children 函数参数

当 children 为函数时，接收的参数对象包含以下属性：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| isPass | 功能是否通过（开启） | boolean |
| options | 开启或关闭状态对应的配置参数 | any |
| currentId | 当前功能的完整 ID（包含父级路径） | string |

### features 配置

features 配置在 Global preset 中定义。

#### features 配置属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| debug | 是否开启调试模式，开启后会在控制台打印所有功能的 ID 和判断状态 | boolean | 否 | false |
| profile | 功能配置树结构 | object | 是 | - |

### profile 配置结构

profile 采用树形结构配置系统的功能模块。

#### profile 节点属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | 当前节点的标识符，同级节点中需唯一，完整 ID 由父级 ID 和当前 ID 通过冒号连接 | string | 是 | - |
| type | 节点类型，可选值为：system（系统根节点）、module（功能模块）、feature（具体功能） | string | 是 | - |
| name | 节点中文名称，仅用于标识和说明 | string | 否 | - |
| close | 是否强制关闭该功能。true 表示关闭，false 或不配置表示开启（存在该节点配置时） | boolean | 否 | false |
| dependencies | 依赖的功能列表，数组中的 ID 必须是完整的功能 ID。只有所有依赖功能都开启时，当前功能才会被标记为开启 | array\<string\> | 否 | - |
| options | 功能开启时传递给 children 的参数 | any | 否 | - |
| rejectedOptions | 功能关闭时传递给 children 的参数 | any | 否 | - |
| children | 子功能节点数组 | array\<object\> | 否 | - |

#### 功能判断规则

1. 功能开启条件：profile 中存在该节点配置，且 close 不为 true，且所有 dependencies 依赖的功能都已开启
2. 功能关闭条件：profile 中不存在该节点配置，或 close 为 true，或存在依赖项功能关闭
3. 根节点 type 必须为 system