### Form

表单核心组件，提供数据域管理、校验规则、事件驱动等功能。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| data | 表单初始数据 | object | 否 | {} |
| rules | 自定义校验规则，key为规则名，value为校验函数 | object | 否 | - |
| interceptors | 自定义拦截器配置 | object | 否 | - |
| onSubmit | 表单提交成功的回调，接收表单数据 | function | 否 | - |
| onError | 表单校验失败的回调 | function | 否 | - |
| onPrevSubmit | 提交前回调，校验前触发 | function | 否 | - |
| debug | 是否开启调试模式，打印表单状态 | boolean | 否 | false |
| noFilter | 是否禁用数据过滤 | boolean | 否 | false |
| helperGuideName | 帮助指引配置名称 | string | 否 | - |
| lang | 语言配置，支持多语言 | array | 否 | - |

### FormInfo

表单信息分组组件，用于组织和管理表单字段的布局。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 分组标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 否 | - |
| column | 分栏数量，响应式布局 | number | 否 | - |
| gap | 字段间距 | number | 否 | - |
| extra | 额外内容，显示在标题右侧 | ReactNode | 否 | - |

### List

多段式列表表单组件，支持动态添加和删除表单项。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名，对应表单数据中的 key | string | 是 | - |
| title | 列表标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 是 | - |
| maxLength | 最大数量，达到后隐藏添加按钮 | number | 否 | - |
| minLength | 最小数量，达到后隐藏删除按钮 | number | 否 | 0 |
| addText | 添加按钮文本 | string | 否 | - |
| itemTitle | 单项标题，可以是字符串或函数 | string | 否 | - |
| important | 是否标记为重要项，样式区分 | boolean | 否 | false |
| block | 是否占满一行 | boolean | 否 | false |
| outer | 外层容器组件 | ReactNode | 否 | Outer |
| renderChildren | 子项渲染函数 | function | 否 | - |
| deleteButtonProps | 删除按钮属性 | object | 否 | - |

### TableList

表格形式的列表表单组件，继承自 List，提供表格展示方式。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| title | 列表标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 是 | - |
| maxLength | 最大数量 | number | 否 | - |
| minLength | 最小数量 | number | 否 | 0 |
| isUnshift | 新增项是否添加到开头 | boolean | 否 | true |

### FormModal

弹窗表单组件，将 Form 和 Modal 组合使用。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| open | 是否显示弹窗 | boolean | 否 | - |
| title | 弹窗标题 | ReactNode | 否 | - |
| onClose | 关闭回调 | function | 否 | - |
| formProps | Form 组件属性 | object | 否 | - |
| children | 表单内容 | ReactNode | 是 | - |
| footerButtons | 底部按钮配置 | array | 否 | - |
| width | 弹窗宽度 | string | 否 | 520 |
| withDecorator | 装饰器函数，用于包装表单内容 | function | 否 | - |

### FormDrawer

抽屉表单组件，将 Form 和 Drawer 组合使用。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| open | 是否显示抽屉 | boolean | 否 | - |
| title | 抽屉标题 | ReactNode | 否 | - |
| onClose | 关闭回调 | function | 否 | - |
| formProps | Form 组件属性 | object | 否 | - |
| children | 表单内容 | ReactNode | 是 | - |
| footerButtons | 底部按钮配置 | array | 否 | - |
| width | 抽屉宽度 | string | 否 | - |
| withDecorator | 装饰器函数 | function | 否 | - |

### FormStepModal

分步表单弹窗组件，支持多步骤数据收集。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| open | 是否显示弹窗 | boolean | 否 | - |
| items | 步骤配置数组 | array | 是 | - |
| onClose | 关闭回调 | function | 否 | - |
| footerButtons | 底部按钮配置 | array | 否 | - |
| withDecorator | 装饰器函数 | function | 否 | - |
| autoClose | 最后一步完成后是否自动关闭 | boolean | 否 | true |
| cancelText | 取消按钮文本 | ReactNode | 否 | - |
| completeText | 完成按钮文本 | ReactNode | 否 | - |
| nextText | 下一步按钮文本 | ReactNode | 否 | - |

#### items 配置说明

items 数组中每个元素为步骤配置对象：

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 步骤标题 | ReactNode | 是 | - |
| formProps | Form 组件属性，可以是对象或函数 | object | 否 | - |
| footerButtons | 步骤底部按钮配置 | array | 否 | - |

### useFormModal

获取表单弹窗 Hook，返回一个可调用函数来弹出表单弹窗。

#### 返回值

返回一个函数，调用该函数弹出 FormModal 弹窗，参数同 FormModal 组件属性。

### useFormDrawer

获取表单抽屉 Hook，返回一个可调用函数来弹出表单抽屉。

#### 返回值

返回一个函数，调用该函数弹出 FormDrawer 抽屉，参数同 FormDrawer 组件属性。

### useFormStepModal

获取分步表单弹窗 Hook，返回一个可调用函数来弹出分步表单弹窗。

#### 返回值

返回一个函数，调用该函数弹出 FormStepModal 弹窗，参数同 FormStepModal 组件属性。

### FormModalButton

按钮触发表单弹窗组件，支持加载数据后弹出。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置，参考 @kne/react-fetch | object | 否 | - |
| modalProps | FormModal 弹窗属性，可以是对象或函数 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

#### modalProps 函数形式参数

当 modalProps 为函数时，接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| data | 加载的数据 | any |
| fetchApi | fetch 实例 | object |
| close | 关闭弹窗方法 | function |

### FormStepModalButton

按钮触发的分步表单弹窗组件。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置 | object | 否 | - |
| modalProps | FormStepModal 弹窗属性 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

### FormDrawerButton

按钮触发的表单抽屉组件。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置 | object | 否 | - |
| drawerProps | FormDrawer 抽屉属性 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

### SubmitButton

提交按钮组件，点击后触发表单校验和提交。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| autoClose | 提交成功后是否自动关闭弹窗 | boolean | 否 | true |
| children | 按钮内容 | ReactNode | 是 | - |

### CancelButton

取消按钮组件，点击后重置表单或关闭弹窗。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮内容 | ReactNode | 是 | - |

### FormApiButton

表单 API 按钮组件，可执行表单操作。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| onClick | 点击回调，接收表单 API 对象 | function | 是 | - |
| autoClose | 点击后是否自动关闭弹窗 | boolean | 否 | true |
| children | 按钮内容 | ReactNode | 是 | - |

#### onClick 回调参数

onClick 回调接收包含表单操作 API 的对象：

| 属性名 | 说明 | 类型 |
|--------|------|------|
| openApi | 表单 API 对象 | object |
| submit | 触发表单提交方法 | function |
| reset | 重置表单方法 | function |
| validate | 校验表单方法 | function |
| setFields | 设置字段值方法 | function |
| getFields | 获取字段值方法 | function |

### useFormContext

表单上下文 Hook，在 Form 内部获取表单实例和方法。

#### 返回值

返回表单 API 对象，包含以下属性和方法：

| 属性名/方法名 | 说明 | 类型 |
|-----------|------|------|
| openApi | 表单 API 对象 | object |
| formData | 表单数据 | object |

openApi 包含以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| submit | 提交表单 | - | Promise |
| reset | 重置表单 | - | void |
| validate | 校验表单 | - | Promise |
| setFields | 设置字段值 | fields: array, options: object | void |
| getFields | 获取字段值 | names: array | object |

### MultiField

多字段组件，支持在单个 Field 中包含多个子字段。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| children | 子字段组件 | ReactNode | 是 | - |

### ErrorTip

错误提示组件，可自定义字段错误信息的展示方式。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| errorRender | 自定义错误渲染函数 | function | 否 | - |
| children | 字段组件 | ReactNode | 是 | - |

#### errorRender 回调参数

errorRender 回调接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| validateData | 字段校验数据 | object |
| hasError | 是否有错误 | boolean |
| errorMsg | 错误信息 | string |

### FormItem

表单项容器组件，用于包装表单字段。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 否 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| tips | 提示信息 | ReactNode | 否 | - |
| labelHidden | 是否隐藏标签 | boolean | 否 | false |
| children | 字段组件 | ReactNode | 是 | - |

### Field 类型：基础组件

以下为基础表单字段组件，请参考 antd 文档：

**Input** - 文本输入框

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| placeholder | 占位符 | string | 否 | 请输入{label} |
| tips | 提示信息，显示问号图标 | ReactNode | 否 | - |

**TextArea** - 多行文本输入框

**InputNumber** - 数字输入框

**Select** - 下拉选择框

**DatePicker** - 日期选择器

- DatePicker.MonthPicker
- DatePicker.RangePicker
- DatePicker.WeekPicker

**TimePicker** - 时间选择器

- TimePicker.RangePicker

**RadioGroup** - 单选按钮组

**Checkbox** - 复选框

**CheckboxGroup** - 复选框组

**Switch** - 开关

**Rate** - 评分

**Slider** - 滑块

**TreeSelect** - 树选择

### Field 类型：业务组件

**AddressSelect** - 地址选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| isPopup | 是否使用弹窗形式 | boolean | 否 | - |

**FunctionSelect** - 职能选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**IndustrySelect** - 行业选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**Cascader** - 级联选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| options | 选项数据 | array | 是 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**Avatar** - 头像上传组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| border | 裁剪边框 | number | 否 | - |
| width | 宽度 | number | 否 | - |
| height | 高度 | number | 否 | - |
| dropModalSize | 弹窗尺寸 | string | 否 | small |
| block | 是否占满一行 | boolean | 否 | false |

**PhoneNumber** - 电话号码输入组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**MoneyInput** - 金额输入组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**SalaryInput** - 薪资范围输入组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**Upload** - 文件上传组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| maxCount | 最大上传数量 | number | 否 | - |
| block | 是否占满一行 | boolean | 否 | false |

**ColorPicker** - 颜色选择器

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |

**Signature** - 签名组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |

### Field 类型：高级选择组件

**AdvancedSelect** - 高级选择组件，支持列表和表格两种形态

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| api | 数据加载 API 配置 | object | 是 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| isPopup | 是否使用弹窗形式 | boolean | 否 | - |
| getSearchProps | 搜索框配置 | function | 否 | - |

#### api 配置说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| loader | 数据加载函数 | function | 是 | - |
| params | 加载参数 | object | 否 | - |

**SuperSelect** - 超级选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| api | 数据加载 API 配置 | object | 是 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**SuperSelectTableList** - 表格列表选择组件

**SuperSelectUser** - 用户选择组件

**SuperSelectTree** - 树选择组件

### Field 类型：特殊组件

**TypeDateRangePicker** - 类型日期范围选择器

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**DatePickerToday** - 至今日期选择器

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| soFarText | 至今文本 | string | 否 | 至今 |

### fieldDecorator

字段装饰器工具，用于创建自定义 Field 组件。

#### 属性说明

| 属性名 | 说明 | 类型 |
|--------|------|------|
| createWithFieldDecorator | 创建带装饰器的字段组件 | function |
| withInputDefaultPlaceholder | 添加输入框默认占位符 | function |
| withSelectDefaultPlaceholder | 添加选择器默认占位符 | function |
| withLang | 添加多语言支持 | function |

### hooks

表单相关 Hooks 集合。

#### 常用 Hooks

| Hook 名 | 说明 |
|---------|------|
| useField | 获取字段 API |
| useReset | 获取重置方法 |
| useSubmit | 获取提交方法 |

### widget

表单组件工具集。

### utils

表单工具函数集。

### formUtils

表单实用工具集。

### RULES

内置校验规则。

#### 常用规则

| 规则名 | 说明 | 参数 |
|--------|------|------|
| REQ | 必填 | - |
| LEN | 长度限制 | MIN-MAX |
| EMAIL | 邮箱格式 | - |
| TEL | 电话号码 | - |
| NUM | 数字 | - |
| INT | 整数 | - |

### interceptors

内置拦截器。

#### 使用方式

```javascript
// 注册拦截器
interceptors.input.use("date-string", (value) => {
  return value ? new Date(value) : null;
});

interceptors.output.use("date-string", (value) => {
  return value ? dayjs(value).format("YYYY-MM-DD") : "";
});

// 在字段中使用
<Input name="date" label="日期" interceptor="date-string"/>
```

### SelectInnerInput

选择器内部输入框组件，用于自定义选择器开发。

### FormSteps

表单步骤组件，用于 FormStepModal 中显示步骤条。

### formModule

表单模块，导出所有表单相关的组件和工具。
