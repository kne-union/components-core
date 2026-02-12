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

## TreeField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: Array<any>) => void` | - |
| fieldNames | 字段名称映射 | `{ key, title, children }` | - |
| placeholder | 占位符 | `string` | "请选择" |
| single | 是否单选 | `boolean` | false |
| maxLength | 最大选择数量 | `number` | MAX_VALUE |
| isPopup | 是否弹窗展示 | `boolean` | true |
| checkStrictly | 父子节点是否不关联 | `boolean` | false |
| searchPlaceholder | 搜索框占位符 | `string` | "搜索" |

## CascaderField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: Array<any>) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| maxLength | 最大选择数量 | `number` | MAX_VALUE |
| isPopup | 是否弹窗展示 | `boolean` | true |
| overlayWidth | 弹窗宽度 | `string` | "460px" |
| menuItemWidth | 菜单项宽度 | `string` | "180px" |
| openLoadData | 是否开启懒加载 | `boolean` | false |
| onlyAllowLastLevel | 是否只允许选择最后一级 | `boolean` | false |
| parentIdKey | 父级ID字段名 | `string` | "id" |
| selectLevel | 选择层级 | `number` | - |
| searchPlaceholder | 搜索框占位符 | `string` | "搜索" |
| onSearch | 搜索回调函数 | `(text: string, options) => Array` | - |
| dataFormat | 数据格式化函数 | `(data) => object` | - |
| nodeFormat | 节点格式化函数 | `(node) => object` | - |

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

## AdvancedSelectField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| allowSelectAll | 是否允许全选 | `boolean` | false |
| showSelectedCount | 是否显示选中数量 | `boolean` | false |
| countUnit | 数量单位 | `string` | "个" |
| allLabel | 全选项标签 | `string` | "全部" |
| showSelectedTag | 是否显示选中标签 | `boolean` | true |
| single | 是否单选 | `boolean` | false |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |

## UserField (AdvancedSelect)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| defaultValue | 默认值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectAll | 是否允许全选 | `boolean` | false |
| showSelectedCount | 是否显示选中数量 | `boolean` | false |
| countUnit | 数量单位 | `string` | "人" |
| allLabel | 全选项标签 | `string` | "所有人" |
| showSelectedTag | 是否显示选中标签 | `boolean` | true |

## AddressEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 地址编码 | `string` | - |

## FunctionEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 职能编码 | `string` | - |

## IndustryEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 行业编码 | `string` | - |

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

