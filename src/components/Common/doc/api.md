## FetchButton

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象，包含loader等接口方法 | `{ loader: Function }` | - |
| modalProps | 弹窗属性配置函数，接收 contextProps 参数 | `(contextProps) => ModalProps` | - |
| modalFunc | 弹窗功能函数，接收 modalApi 参数 | `(modalApi) => void` | - |
| onError | 错误处理函数 | `(error) => void` | - |
| ...ButtonProps | 继承 Button 组件所有属性 | - | - |

## ScrollLoader

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isLoading | 是否正在加载 | `boolean` | false |
| noMore | 是否已加载完毕 | `boolean` | false |
| onLoader | 加载更多回调函数 | `() => Promise<void>` | - |
| completeTips | 完成提示文本 | `string` | "没有更多了" |
| className | 样式类名 | `string` | - |
| children | 子元素 | `ReactNode` | - |

## SearchInput

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入框值 | `string` | - |
| onSearch | 搜索回调函数，已防抖 | `(value: string) => void` | - |
| debounce | 防抖延迟时间（毫秒） | `number` | 500 |
| placeholder | 占位符 | `string` | "请输入" |
| isPopup | 是否在弹窗中使用 | `boolean` | false |
| ...InputProps | 继承 Input.Search 组件所有属性 | - | - |

## SuperSelectCascaderField

基于 `@kne/super-select` 的 `SelectCascader`，其余属性透传给 `SelectCascader`。值为选项对象（单选为对象，多选为对象数组）。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 级联树数据，传入后不再走 api | `Array<object>` | - |
| api | 远程加载配置（`@kne/react-fetch` 参数），加载结果作为 options | `{ loader: Function }` | - |
| dataFormat | 将 api 返回数据转换为 options | `(data) => Array<object>` | - |
| value | 当前选中的值 | `object \| Array<object>` | - |
| onChange | 变化回调 | `(value) => void` | - |
| single | 是否单选 | `boolean` | false |
| valueKey | 选项值字段名 | `string` | "id" |
| labelKey | 选项文本字段名 | `string` | "label" |
| placeholder | 占位符 | `string` | "请选择" |
| maxLength | 最大选择数量 | `number` | MAX_VALUE |
| isPopup | 是否弹窗展示 | `boolean` | true |
| menuItemWidth | 菜单项宽度 | `number` | 180 |
| openLoadData | 是否开启懒加载 | `boolean` | false |
| onLoadMore | 懒加载子节点 | `Function` | - |
| onlyAllowLastLevel | 是否只允许选择最后一级 | `boolean` | false |
| onSearch | 搜索回调函数 | `Function` | - |

## TypeDateRangePickerField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值，格式为 `{ type: string, value: [Date, Date] }` | `object` | - |
| onChange | 变化回调 | `(value: object) => void` | - |
| placeholder | 占位符数组 | `[string, string]` | - |
| ...RangePickerProps | 继承 DatePicker.RangePicker 组件所有属性 | - | - |

## SuperSelectField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectedAll | 是否允许全选 | `boolean` | false |
| isPopup | 是否弹窗展示 | `boolean` | true |
| showSelectedTag | 是否显示已选中标签 | `boolean` | true |
| onConfirm | 确认回调 | `(value) => void` | - |

## SuperSelectUserField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择用户" |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectedAll | 是否允许全选 | `boolean` | false |
| labelKey | 标签字段名 | `string` | "label" |
| avatarKey | 头像字段名 | `string` | "avatar" |
| descriptionKey | 描述字段名 | `string` | "description" |

## SuperSelectTableListField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数据数组 | `Array<object>` | - |
| columns | 表格列配置 | `Array<object>` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| labelKey | 标签字段名 | `string` | - |
| valueKey | 值字段名 | `string` | - |
| isPopup | 是否弹窗展示 | `boolean` | true |
| getSearchCallback | 搜索回调函数 | `(searchProps, item, contextProps) => boolean` | - |

## SuperSelectTreeField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| ...TreeProps | 继承 Tree 组件所有属性 | - | - |

## InputFileButton / InputFileLink / InputFileText

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受的文件类型 | `string` | - |
| multiple | 是否多选 | `boolean` | false |
| onChange | 文件选择回调 | `(file: File) => void` | - |
| ...TypographyProps | 继承 Typography 组件所有属性 | - | - |

## changeMoneyToChinese

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| money | 金额数值 | `number \| string` |

| 返回值 | 说明 | 类型 |
| --- | --- | --- |
| chineseStr | 大写金额字符串 | `string` |

最大处理数字：999999999999999.999999

