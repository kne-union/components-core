### Filter 组件

筛选组件的主入口，用于构建灵活的筛选条件界面。支持受控和非受控模式，自动管理筛选值状态。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| value | 筛选值数组，受控模式使用 | array | 否 | [] |
| onChange | 筛选值变化回调函数 | function | 否 | - |
| defaultValue | 默认筛选值 | array | 否 | [] |
| list | 筛选项配置数组，支持多行布局 | array | 否 | - |
| displayLine | 默认显示的行数，超过则支持展开/收起 | number | 否 | 1 |
| label | 筛选标题，默认显示"筛选" | ReactNode | 否 | - |
| extra | 额外内容，通常用于放置搜索输入框等 | ReactNode | 否 | - |
| extraExpand | 额外展开内容，显示在已选筛选值右侧 | ReactNode | 否 | - |
| className | 自定义类名 | string | 否 | - |

#### value 数据结构

筛选值数组中每个元素的结构：

```javascript
{
  name: 'city',      // 筛选字段名
  label: '城市',     // 筛选项标签
  value: [           // 筛选值，可以是单个值或数组
    { label: '上海', value: '010' },
    { label: '北京', value: '020' }
  ]
}
```

### AdvancedFilter 组件

高级筛选组件，适用于需要展示多个筛选条件且支持展开/收起的场景。相比普通 Filter 组件，提供更紧凑的布局。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| value | 筛选值数组 | array | 否 | [] |
| onChange | 筛选值变化回调函数 | function | 否 | - |
| defaultValue | 默认筛选值 | array | 否 | [] |
| list | 筛选项配置数组 | array | 否 | - |
| more | 更多筛选项，支持展开/收起 | ReactNode | 否 | - |

### FilterLines 组件

筛选项布局组件，用于按照行展示筛选项，支持展开/收起功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 筛选项配置数组，支持多行布局 | array | 否 | - |
| displayLine | 默认显示的行数 | number | 否 | 1 |
| label | 筛选标题 | ReactNode | 否 | - |
| extra | 额外内容 | ReactNode | 否 | - |
| className | 自定义类名 | string | 否 | - |

### FilterValueDisplay 组件

筛选值展示组件，用于展示已选择的筛选条件，支持单个删除和清空全部。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| value | 筛选值数组 | array | 是 | - |
| onChange | 筛选值变化回调函数 | function | 是 | - |
| extraExpand | 额外展开内容，显示在清空按钮左侧 | ReactNode | 否 | - |

### FilterItem 组件

筛选项容器组件，提供统一的样式和交互效果。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 筛选项标签 | ReactNode | 否 | - |
| open | 是否打开下拉 | boolean | 否 | - |
| active | 是否激活状态（有选中值时自动激活） | boolean | 否 | - |
| children | 筛选项内容 | ReactNode | 否 | - |

### PopoverItem 组件

弹出式筛选项组件，基于 Popover 实现。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 筛选项标签 | ReactNode | 否 | - |
| name | 字段名 | string | 否 | - |
| children | 渲染函数，接收 { value, onChange } 参数 | function | 是 | - |

### SearchInput 组件

搜索输入框组件，通常用于放置在筛选器右侧的搜索功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| placeholder | 输入框占位符 | string | 否 | - |
| value | 输入框值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### FilterItemContainer 组件

筛选项容器组件，用于包装需要传递额外属性的筛选项。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 否 | - |
| label | 字段标签 | string | 否 | - |
| children | 渲染函数，接收筛选项 props | function | 是 | - |

### InputFilterItem 组件

文本输入筛选项组件，用于文本类型的筛选。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| placeholder | 输入框占位符 | string | 否 | 请输入{label} |
| value | 输入框值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### DatePickerFilterItem 组件

日期选择筛选项组件，支持多种日期选择模式。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| picker | 日期选择器类型，可选值：`date`、`week`、`month`、`quarter`、`year` | string | 否 | `date` |
| value | 日期值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### DateRangePickerFilterItem 组件

日期范围选择筛选项组件，用于选择日期范围。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| value | 日期范围值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### TypeDateRangePickerFilterItem 组件

类型化日期范围选择筛选项组件，支持日期类型选择（如创建时间、更新时间等）。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| allowEmpty | 是否允许清空 [开始时间清空, 结束时间清空] | array | 否 | [false, false] |
| value | 日期范围值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### CityFilterItem 组件

城市选择筛选项组件，支持省市区三级联动选择。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| value | 城市值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |
| single | 是否单选 | boolean | 否 | false |

### NumberRangeFilterItem 组件

数值范围筛选项组件，用于选择数值范围。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| unit | 数值单位 | string | 否 | - |
| value | 数值范围值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### AdvancedSelectFilterItem 组件

高级选择筛选项组件，支持远程数据加载、分页、搜索等功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### SuperSelectFilterItem 组件

超级选择筛选项组件，支持展示描述信息、图标等丰富的选项内容。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| options | 选项数据数组 | array | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### UserFilterItem 组件

用户选择筛选项组件，专门用于用户选择场景。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| value | 用户值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### SuperSelectUserFilterItem 组件

超级用户选择筛选项组件，支持展示用户描述信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| value | 用户值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### FunctionSelectFilterItem 组件

职能选择筛选项组件，用于选择职能信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| selectLevel | 选择层级 | number | 否 | - |
| maxLength | 最大选择数量 | number | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| onlyAllowLastLevel | 是否只允许选择最后一级 | boolean | 否 | false |
| value | 职能值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### IndustrySelectFilterItem 组件

行业选择筛选项组件，用于选择行业信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| selectLevel | 选择层级 | number | 否 | - |
| maxLength | 最大选择数量 | number | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| onlyAllowLastLevel | 是否只允许选择最后一级 | boolean | 否 | false |
| value | 行业值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### CascaderFilterItem 组件

级联选择筛选项组件，用于级联数据的选择。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| options | 选项数据数组 | array | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### TreeFilterItem 组件

树形选择筛选项组件，用于树形结构数据的选择。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| fieldNames | 字段名映射 | object | 否 | - |
| fieldNames.title | 标题字段名 | string | 否 | `title` |
| fieldNames.key | 键字段名 | string | 否 | `key` |
| fieldNames.children | 子节点字段名 | string | 否 | `children` |
| single | 是否单选 | boolean | 否 | false |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### 高级字段组件

#### ListFilterItem 组件（AdvancedFilter.fields）

列表选择筛选项组件，以标签形式展示选项，支持单选和多选。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| items | 选项数据数组 | array | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| maxLength | 最大选择数量 | number | 否 | 5 |
| custom | 自定义筛选项 | object | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### 工具函数

#### getFilterValue

将筛选值数组转换为对象格式。

**函数签名：**
```javascript
getFilterValue(filterValue: array): object
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| filterValue | 筛选值数组 | array |

**返回值：**

转换后的对象，格式为 `{ name: value, ... }`，其中 value 是提取的值数组或单个值。

**示例：**
```javascript
const filterValue = [
  { name: 'city', value: [{ label: '上海', value: '010' }] },
  { name: 'text', value: { label: '测试', value: 'test' } }
];
const result = getFilterValue(filterValue);
// result: { city: ['010'], text: 'test' }
```

#### useFilter

获取筛选上下文的 Hook。

**函数签名：**
```javascript
useFilter(): object
```

**返回值：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| value | 筛选值 Map | Map |
| onChange | 筛选值变化函数 | function |

#### withFilterValue

高阶组件，用于自动连接筛选上下文。

**函数签名：**
```javascript
withFilterValue(WrappedComponent): ReactComponent
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| WrappedComponent | 被包装的组件 | ReactComponent |

**新增 Props：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| name | 字段名 | string |
| label | 字段标签 | string |

#### withFieldItem

高阶组件，用于将表单字段组件包装为筛选项组件。

**函数签名：**
```javascript
withFieldItem(WrappedComponent): ReactComponent
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| WrappedComponent | 被包装的组件 | ReactComponent |

**新增 Props：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| name | 字段名 | string |
| label | 字段标签 | string |
| interceptor | 拦截器，用于值转换 | object |
| interceptor.input | 输入拦截器 | function |
| interceptor.output | 输出拦截器 | function |
