### InfoPage

同 [`Ant Design Card`](https://ant.design/components/Card#api)

新增参数：

| 属性名       | 说明                       | 类型        | 默认值 |
|-----------|--------------------------|-----------|-----|
| subtitle  | 副标题                      | ReactNode | -   |
| className | `InfoPage` 的 `className` | string    | -   |

#### InfoPage.Part

同 [`Ant Design Card`](https://ant.design/components/Card#api)

新增参数：

| 属性名       | 说明                   | 类型        | 默认值 |
|-----------|----------------------|-----------|-----|
| subtitle  | 副标题                  | ReactNode | -   |
| className | `Part` 的 `className` | string    | -   |

#### InfoPage.Collapse

同 [`Ant Design Collapse`](https://ant.design/components/Collapse#collapse)

新增参数：

| 属性名       | 说明                   | 类型     | 默认值 |
|-----------|----------------------|--------|-----|
| className | `Part` 的 `className` | string | -   |

### Content

| 属性名        | 说明                                                                                  | 类型                | 默认值  |
|------------|-------------------------------------------------------------------------------------|-------------------|------|
| list       | `Content` 的内容列表                                                                     | `listItemProps[]` | []   |
| labelAlign | `label` 的对齐方式可以传入的值 `left,right,center,auto`,为 `auto` 时 `label` 不计算最小宽度             | string            | left |
| col        | 列数                                                                                  | number            | 1    |
| size       | 默认为 `14px`，可以传值为 `small`，`size` 为 `small` 时字号为 `12px`                               | string            | -    |
| gutter     | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 `{ xs: 8, sm: 16, md: 24}`。或者使用数组形式同时设置 [水平间距, 垂直间距] | number            | 0    |
| className  | `Content` 的 `className`                                                             | string            | -    |
| itemRender | 接收 `Content Inner` 和 `Inner` 的 `label, content, index`，可以根据数据信息返回想要渲染的内容            | function          | -    |

#### listItemProps

| 属性名     | 说明                                                                                            | 类型                  | 默认值  |
|---------|-----------------------------------------------------------------------------------------------|---------------------|------|
| display | 数据是否展示，当为 `function` 时可以接收到 `item, list` 参数，`item` 为当前项配置，`dataSource` 为整个组件的 `dataSource` 配置 | boolean \| function | true |
| block   | 是否单行显示该条信息                                                                                    | ReactNode \| string | -    |
| label   | 标题                                                                                            | ReactNode \| string | -    |
| content | 内容                                                                                            | ReactNode \| string | -    |

### Descriptions

| 属性名        | 说明                                                                                      | 类型                      | 默认值 |
|------------|-----------------------------------------------------------------------------------------|-------------------------|-----|
| dataSource | 详情数据源，内部每个数组为一行数据，每行数据中每个对象为一列数据，每行最多包含 `2` 列内容，多余的会被丢弃                                 | `dataSourceItemProps[]` | -   |
| itemRender | 接收 `Descriptions Inner` 和 `Inner` 的 `label, content, displaty, index`，可以根据数据信息返回想要渲染的内容 | function                | -   |

#### dataSourceItemProps

| 属性名     | 说明                                                                                                  | 类型                  | 默认值  |
|---------|-----------------------------------------------------------------------------------------------------|---------------------|------|
| display | 数据是否展示，当为 `function` 时可以接收到 `item, dataSource` 参数，`item` 为当前项配置，`dataSource` 为整个组件的 `dataSource` 配置 | boolean \| function | true |
| label   | 数据展示的标题                                                                                             | ReactNode \| string | -    |
| content | 数据展示的内容                                                                                             | ReactNode \| string | -    |
