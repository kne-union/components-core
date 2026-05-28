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
| interceptor | 值转换拦截器，用于在组件内部格式和筛选上下文格式之间转换 | object | 否 | - |
| interceptor.input | 输入拦截器，将上下文值转为组件内部格式 | function | 否 | - |
| interceptor.output | 输出拦截器，将组件内部值转为上下文格式 | function | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### SuperSelectTableListFilterItem 组件

超级表格列表选择筛选项组件，以表格形式展示选项，支持展示多列信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| interceptor | 值转换拦截器 | object | 否 | - |
| interceptor.input | 输入拦截器 | function | 否 | - |
| interceptor.output | 输出拦截器 | function | 否 | - |
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

#### pickSelectValues

从筛选值中提取原始值数组。支持 `null`/`undefined`、原始值、`{ value }` 对象、`{ id }` 对象、以及它们的数组。

**函数签名：**
```javascript
pickSelectValues(value): string[]
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| value | 筛选值，支持多种格式 | any |

**返回值：**

提取后的字符串值数组，空值会被过滤。

**示例：**
```javascript
pickSelectValues([{ value: 1 }, { id: 2 }, '3'])
// => ['1', '2', '3']

pickSelectValues({ value: 'open' })
// => ['open']

pickSelectValues(null)
// => []
```

#### createFilterValueMapper

声明式创建 `mapFilterValue` 函数。`Filter.getFilterValue` 默认只读取 `{ value }` 格式，而 SuperSelectFilterItem 等组件使用 `{ id, name }` 格式，需要额外处理。此工具通过声明字段映射规则，自动生成符合 `(filter, getFilterValue) => value` 签名的函数。

**函数签名：**
```javascript
createFilterValueMapper(fieldMappers): function
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| fieldMappers | 字段名到映射规则的映射 | object | 是 |
| fieldMappers[fieldName] | 映射规则，支持字符串或函数 | string \| function | 是 |

**映射规则类型：**

| 类型值 | 说明 | 输出格式 |
|--------|------|----------|
| `'string'` | 确保值为字符串类型 | `string` |
| `'multi'` | 多选，从 filter entry 提取值数组 | `string[]` |
| `'single'` | 单选，从 filter entry 提取第一个值 | `string` |
| `function` | 自定义转换函数，接收 `(rawValue, { entry, filter, value })` 返回新值 | any |

**返回值：**

返回一个 `mapFilterValue` 函数，签名为 `(filter, getFilterValue) => object`，可直接传给 BizUnit 等组件的 `mapFilterValue` 选项。

**示例：**
```javascript
const mapFilterValue = createFilterValueMapper({
  id: 'string',
  roles: 'multi',
  tenantOrgId: 'single',
  status: (rawValue) => normalizeStatus(rawValue)
});
const filterValue = mapFilterValue(filter, Filter.getFilterValue);
```

#### useUrlFilter

从 URL 参数初始化 Filter 状态的 Hook。读取 URL 参数构建初始筛选值，并在挂载后自动清除已消费的 URL 参数。

**函数签名：**
```javascript
useUrlFilter(options): [array, function]
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| options | 配置对象 | object | 是 |
| options.readUrlParams | 读取 URL 参数的函数，返回包含 `consumedKeys` 的对象 | function | 是 |
| options.buildFilter | 根据 readUrlParams 返回值构建初始 filter 数组 | function | 是 |

**返回值：**

| 返回值 | 说明 | 类型 |
|--------|------|------|
| [0] | 初始筛选值数组 | array |
| [1] | 设置筛选值的函数 | function |

**示例：**
```javascript
const [filter, setFilter] = useUrlFilter({
  readUrlParams: (searchParams) => {
    const { take, getConsumedKeys } = createUrlParamsReader(searchParams);
    const orgId = take('tenantOrgId');
    return { consumedKeys: getConsumedKeys(), orgId };
  },
  buildFilter: ({ orgId }) => [
    ...(orgId ? [{ name: 'tenantOrgId', value: { label: orgId, value: orgId } }] : [])
  ]
});
```

#### createUrlParamsReader

创建 URL 参数读取器，自动追踪已消费的参数 key。

**函数签名：**
```javascript
createUrlParamsReader(searchParams): { take, getConsumedKeys }
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| searchParams | React Router 的 searchParams 对象 | URLSearchParams | 是 |

**返回值：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| take | 读取指定 key 的值并标记为已消费 | function |
| getConsumedKeys | 获取所有已消费的 key 列表 | function |

#### stripConsumedUrlParams

从 URL 参数中移除已消费的 key，返回新的 URLSearchParams。无变化时返回 `null`。

**函数签名：**
```javascript
stripConsumedUrlParams(searchParams, consumedKeys): URLSearchParams | null
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| searchParams | 当前 URL 参数 | URLSearchParams | 是 |
| consumedKeys | 需要移除的 key 列表 | string[] | 是 |

**返回值：**

移除后的新 URLSearchParams 对象，无变化返回 `null`。

#### filterToUrlParams

将筛选值数组序列化为 URLSearchParams，保留 label 信息以便反序列化还原完整筛选状态。参数以 `prefix[key]` 格式存入 URL，避免与其他查询参数冲突。

**序列化格式**（使用冒号分隔 label 和 value，逗号分隔多值）：
- 单值且 label === value：`prefix[name]=value`（如输入框）
- 单值且 label !== value：`prefix[name]=label:value`
- 多值：`prefix[name]=label1:value1,label2:value2`

**函数签名：**
```javascript
filterToUrlParams(filterValue, options?): URLSearchParams
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| filterValue | 筛选值数组，格式为 `[{ name, label, value }, ...]` | array | 是 | - |
| options.prefix | URL 参数前缀 | string | 否 | `'filterParams'` |

**示例：**
```javascript
const params = filterToUrlParams([
  { name: 'keyword', label: '关键词', value: { label: '测试', value: '测试' } },
  { name: 'city', label: '城市', value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }] },
  { name: 'status', label: '状态', value: { label: '启用', value: 'active' } },
]);
// params.toString() => 'filterParams[keyword]=测试&filterParams[city]=上海:010,北京:020&filterParams[status]=启用:active'
```

#### createUrlFilterReader

创建 URL 筛选参数读取器，自动追踪已消费的参数 key。配合 `useUrlFilter` 使用，读取后返回的 `consumedKeys` 可被自动从 URL 中清除。

**函数签名：**
```javascript
createUrlFilterReader(searchParams, options?): { takeFilterEntry, getConsumedKeys }
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| searchParams | React Router 的 searchParams 对象 | URLSearchParams | 是 | - |
| options.prefix | URL 参数前缀，需与 `filterToUrlParams` 使用的前缀一致 | string | 否 | `'filterParams'` |

**返回值：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| takeFilterEntry | 读取指定 key 的筛选值并标记为已消费 | function |
| getConsumedKeys | 获取所有已消费的 key 列表（含前缀） | function |

**takeFilterEntry 签名：**
```javascript
takeFilterEntry(key, options?): { label: string, value: string } | { label: string, value: string }[] | null
```

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| key | 参数名（不含前缀） | string | 是 | - |
| options.multi | 是否多选，多选返回数组 | boolean | 否 | false |

**示例：**
```javascript
const [filter, setFilter] = useUrlFilter({
  readUrlParams: (searchParams) => {
    const { takeFilterEntry, getConsumedKeys } = createUrlFilterReader(searchParams);
    const keyword = takeFilterEntry('keyword');
    const city = takeFilterEntry('city', { multi: true });
    return { consumedKeys: getConsumedKeys(), keyword, city };
  },
  buildFilter: ({ keyword, city }) => [
    ...(keyword ? [{ name: 'keyword', label: '关键词', value: keyword }] : []),
    ...(city ? [{ name: 'city', label: '城市', value: city }] : []),
  ],
});
```

#### parseFilterEntry

解析 URL 参数中的单个筛选值项，反序列化为 `{ label, value }` 对象。

**解析规则：**
- 无冒号：label 和 value 相同，如 `"测试"` → `{ label: '测试', value: '测试' }`
- 有冒号：冒号前为 label，冒号后为 value，如 `"启用:active"` → `{ label: '启用', value: 'active' }`

**函数签名：**
```javascript
parseFilterEntry(str): { label: string, value: string }
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| str | URL 参数中的原始字符串 | string | 是 |

**示例：**
```javascript
parseFilterEntry('测试')
// => { label: '测试', value: '测试' }

parseFilterEntry('启用:active')
// => { label: '启用', value: 'active' }
```

#### takeFilterEntry

从 URL 参数中读取筛选值项（低级 API）。推荐使用 `createUrlFilterReader` 代替，可自动追踪已消费的 key。

**函数签名：**
```javascript
takeFilterEntry(searchParams, key, options?): { label: string, value: string } | { label: string, value: string }[] | null
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| searchParams | URL 参数对象 | URLSearchParams | 是 | - |
| key | 参数名（不含前缀） | string | 是 | - |
| options.multi | 是否多选，多选返回数组 | boolean | 否 | false |
| options.prefix | URL 参数前缀 | string | 否 | `'filterParams'` |

**示例：**
```javascript
// URL: ?filterParams[city]=上海:010,北京:020
takeFilterEntry(searchParams, 'city', { multi: true })
// => [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]
```

#### filterInterceptors

预设拦截器集合，提供用于 SuperSelect 系列组件的值格式转换拦截器。SuperSelect 等组件使用 `{ id, name }` 格式，而 Filter 上下文使用 `{ label, value }` 格式，需要通过拦截器进行自动转换。

**导出成员：**

|| 名称 | 说明 |
||------|------|
|| filterInterceptors | 拦截器集合对象，包含 `single` 和 `multi` 两个拦截器 |
|| singleSelectInterceptor | 单选拦截器，用于 valueKey="id" labelKey="name" 的单选场景 |
|| multiSelectInterceptor | 多选拦截器，用于 valueKey="id" labelKey="name" 的多选场景 |

**filterInterceptors 结构：**

|| 属性名 | 说明 | 类型 |
||--------|------|------|
|| single | 单选拦截器，等价于 singleSelectInterceptor | object |
|| multi | 多选拦截器，等价于 multiSelectInterceptor | object |

**拦截器结构：**

每个拦截器包含 `input` 和 `output` 两个函数：

|| 属性名 | 说明 | 转换方向 |
||--------|------|----------|
|| input | 输入拦截器 | 将上下文值 `{ label, value }` 转为组件内部格式 `{ id, name }` |
|| output | 输出拦截器 | 将组件内部值 `{ id, name }` 转回上下文格式 `{ label, value }` |

**使用方式：**

配合 `SuperSelectFilterItem` 的 `interceptor` 属性使用：

```javascript
import { SuperSelectFilterItem, singleSelectInterceptor, multiSelectInterceptor } from '@components/Filter';

// 单选场景
<SuperSelectFilterItem interceptor={singleSelectInterceptor} ... />

// 多选场景
<SuperSelectFilterItem interceptor={multiSelectInterceptor} ... />

// 或通过 filterInterceptors 解构
const { single, multi } = filterInterceptors;
<SuperSelectFilterItem interceptor={single} ... />
```
