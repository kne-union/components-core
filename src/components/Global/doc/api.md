### Global

Global 组件是 components-core 的全局配置组件，必须放置在应用最外层。它提供了全局上下文、主题配置、国际化支持、错误边界等功能。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| preset | object | 否 | {} | 全局预设参数，可通过 usePreset 获取，由业务系统设置 |
| themeToken | object | 否 | {} | 主题配置，参考 Antd 的 themeToken，一般只需设置 {colorPrimary} |
| init | function | 否 | - | 初始化方法，在系统首次加载时执行，可返回 Promise，用于放置系统显示前的异步操作 |
| children | ReactNode | 是 | - | 子组件 |
| className | string | 否 | - | 自定义类名 |

### PureGlobal

纯全局组件，API 与 Global 相同。去除了页面错误捕获和 container-body 类名带来的默认最小宽度等样式设置，主要用于组件库的演示环境和弹窗中。

### GlobalProvider

全局上下文提供者组件，是 Global 和 PureGlobal 的底层实现，一般不直接使用。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| preset | object | 否 | {locale: "zh-CN", apis: {}} | 全局预设参数 |
| themeToken | object | 否 | - | 主题配置 |
| init | function | 否 | - | 初始化方法 |
| children | ReactNode | 是 | - | 子组件 |

### usePreset

获取预设的 preset 参数 Hook。已确定的系统需要使用的 key 值包括：permissions、apis、formOptions、modalOptions。

#### 返回值

返回 preset 对象，包含所有通过 Global 组件传入的全局配置。

### useGlobalContext

获取和设置全局状态的 Hook。该状态保存在 Global 组件一级，不会随着内部组件的销毁而销毁。主要用于组件内部，业务应避免使用该 API 设置新的 global 变量。业务如有需要应自行在顶级组件中设置 context。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 否 | - | 全局参数的 key。当存在 globalKey 时，获取和设置的是 global[key]，否则获取和设置的是整个 global 对象。除非存在多个 key-value，否则不推荐直接使用不存在 globalKey 的情况 |

#### 返回值

返回包含 global 和 setGlobal 的对象：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| global | any | 当前的 global 值 |
| setGlobal | function | 设置当前的 global 值 |

### useGlobalValue

获取指定 key 的全局值的 Hook，类似 useGlobalContext 的简化版本。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |

#### 返回值

返回指定 key 对应的 global 值。

### GlobalValue

通过 render props 模式获取指定 global 值的组件。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |
| children | function | 是 | - | 渲染函数，接收 {value} 参数 |

### containerClassName

Global 组件容器的 CSS 类名常量。当需要使用 CSS 选择器选中 Global 组件容器时，可以使用该常量确保选择器的准确性。

该值是 Global 组件内部使用的 CSS 类名的转义版本，用于处理类名中的特殊字符（如 + 和 /），确保在 CSS 选择器中能够正确匹配。

### GlobalSetting

设置全局值的组件（文档中未详细说明具体用法）。

### SetGlobal

设置全局值的组件，支持条件渲染和函数作为 children。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要设置的全局参数的 key |
| value | any | 是 | - | 要设置的值 |
| needReady | boolean | 否 | false | 是否需要等待 global 有值后再渲染 children |
| children | ReactNode \| function | 是 | - | 子组件，当为函数时会接收 {global, setGlobal} 参数 |

### GetGlobal

获取全局值的组件，通过 render props 模式访问。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |
| children | function | 是 | - | 渲染函数，接收 {value} 参数 |

### containerClassName

Global 组件容器的 CSS 类名常量。当需要使用 CSS 选择器选中 Global 组件容器时，可以使用该常量确保选择器的准确性。

该值是 Global 组件内部使用的 CSS 类名的转义版本，用于处理类名中的特殊字符（如 + 和 /），确保在 CSS 选择器中能够正确匹配。



