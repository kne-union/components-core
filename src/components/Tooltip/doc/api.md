### Tooltip 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| size | 提示框宽度，可选值：small(240px)、默认(360px)、large(480px) | string | - |
| title | 标题内容 | string/ReactNode | - |
| content | 主要内容 | string/ReactNode | - |
| subtitle | 副标题内容 | string/ReactNode | - |
| importantInfo | 重要提示信息 | string/ReactNode | - |
| importantInfoType | 重要信息类型，可选值：success、warning、error | string | - |
| showInfo | 是否显示标题旁的提示图标 | boolean | false |
| moreInfo | 扩展内容区域，可嵌入表单、图表等 | ReactNode | - |
| trigger | 触发方式，可选值：hover、click、focus | string | 'hover' |
| placement | 气泡框位置 | string | 'top' |
| overlayClassName | 自定义气泡框类名 | string | - |

### TooltipFetch 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| api | 数据接口配置，参考 @kne/react-fetch | object | - |
| fetchContent | 数据转换函数，接收接口返回数据，返回 Tooltip 的 props | function | - |
| showLoading | 是否显示加载状态 | boolean | true |
| loadingClassName | 加载动画的自定义类名 | string | - |
| force | 是否每次显示都重新加载数据 | boolean | false |

### TooltipInfoLabel 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| title | 标签文字 | string | - |
| tooltipTitle | Tooltip 的属性对象，会传递给 Tooltip 组件 | object | - |
