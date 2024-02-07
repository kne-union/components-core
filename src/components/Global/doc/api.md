| 属性名        | 说明                                           | 类型       | 默认值 |
|------------|----------------------------------------------|----------|-----|
| preset     | 全局预设参数，可以通过usePreset获取，由业务系统设置               | object   | {}  |
| themeToken | 设置主题，参看antd的themeToken，一般只需要设置{colorPrimary} | object   | {}  |
| init       | 初始化方法，在系统首次加载时执行，可以返回Promise。用来放置系统显示之前的异步操作 | function | -   |

### PureGlobal

api同Global，但是少了页面错误捕获和className:container-body带来的默认最小宽度等样式设置，主要用在组件库的演示环境和弹窗中

### usePreset

获取预设的preset，已经确定为系统需要使用的key值:permissions,apis,formOptions,modalOptions

### useGlobalContext

获取和设置全局状态，该状态保存在Global组件一级，不会随着内部组件本身的销毁而销毁。
主要给组件内部使用，业务应该避免使用该api设置新的global变量。业务如果有需要应当自行在顶级组件中设置context。

#### params:useGlobalContext(globalKey)

| 属性名       | 说明                                                                                                                           | 类型     | 默认值 |
|-----------|------------------------------------------------------------------------------------------------------------------------------|--------|-----|
| globalKey | 全局参数的key，当存在globalKey时，默认获取和设置都是global[key]，当不存在globalKey获取和设置的都是global，除非存在多个获取和设置global的key-value，否则不推荐直接使用不存在globalKey的情况 | string | -   |

#### return:{global,setGlobal}

| 属性名       | 说明           | 类型       |
|-----------|--------------|----------|
| global    | 当前的global值   | any      |
| setGlobal | 设置当前的global值 | function |



