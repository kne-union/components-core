### Table 组件
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| columns | 列配置 | array | - |
| className | 自定义类名 | string | - |
| getScrollEl | 获取滚动容器 | function | getScrollElDefault |
| sticky | 是否固定表头 | boolean | false |
| stickyOffset | 固定表头偏移量 | string | "var(--nav-height)" |
| pagination | 分页配置 | boolean/object | false |
| columnRenderProps | 列渲染属性 | object | {} |
| rowKey | 行key | string/function | "id" |
| dataSource | 数据源 | array | - |
| controllerOpen | 是否开启列控制 | boolean | true |
| name | 表格名称（用于存储配置） | string | - |
| summary | 总结栏 | function | - |
| scroll | 滚动配置 | object | - |
| scroller | 滚动器配置 | object | - |
| onTablePropsReady | 表格属性就绪回调 | function | - |

### TablePage 组件
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| loader | 数据加载函数 | function | - |
| featureId | 功能ID（用于权限控制） | string | - |
| pagination | 分页配置 | object | {open: true, ...} |
| name | 表格名称 | string | - |
| dataFormat | 数据格式化函数 | function | (data) => ({list, total}) |
| className | 自定义类名 | string | - |
| columnRenderProps | 列渲染属性 | object | {} |
| summary | 总结栏 | function | - |
| sticky | 是否固定表头 | boolean | true |
| columns | 列配置 | array/function | - |
| getColumns | 获取列配置的函数 | function | - |

### useSelectedRow Hook
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| options.rowKey | 行key | string/function | 'id' |
| selectedRowKeys | 选中行的keys | array | [] |
| onSelectAll | 全选回调 | function | - |
| onSelect | 单选回调 | function | - |
| setSelectedRowKeys | 设置选中行 | function | - |

### 列配置（Column）
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| name | 列名称（唯一标识） | string | - |
| title | 列标题 | string | - |
| type | 列类型 | string | 'other' |
| width | 列宽度 | number | - |
| min | 最小宽度 | number | - |
| max | 最大宽度 | number | - |
| hidden | 是否隐藏 | boolean | false |
| fixed | 固定列 | 'left'/'right' | - |
| primary | 是否为主要字段 | boolean | false |
| hover | 是否显示hover效果 | boolean | false |
| ellipsis | 是否省略 | boolean/object | false |
| sort | 是否支持排序 | boolean/object | false |
| valueOf | 值转换函数 | function | - |
| render | 自定义渲染函数 | function | - |
| groupHeader | 分组表头配置 | array | - |
| disableColItem | 是否禁用ColItem包装 | boolean | false |

### 列类型（Type）
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| date | 日期（YYYY-MM-DD） | width: 160, min: 120, max: 400 |
| dateShort | 短日期（YYYY-MM） | width: 120, min: 100, max: 400 |
| dateRange | 日期范围 | width: 240, min: 120, max: 400 |
| datetime | 日期时间 | width: 190, min: 190, max: 400 |
| serialNumber | 编号 | width: 190, min: 100, max: 400 |
| serialNumberShort | 短编号 | width: 120, min: 100, max: 400 |
| user | 用户 | width: 200, min: 120, max: 400 |
| userName | 用户名 | width: 100, min: 100, max: 400 |
| contacts | 联系人 | width: 240, min: 160, max: 400 |
| tag | 标签 | width: 140, min: 100, max: 400 |
| avatar | 头像 | width: 80, min: 64, max: 200 |
| singleRow | 单行文本 | width: 70, min: 70, max: 400 |
| hideInfo | 隐藏信息 | width: 120, min: 80, max: 400 |
| mainInfo | 主要信息 | width: 300, min: 160, max: 500 |
| description | 描述 | width: 400, min: 160, max: 600 |
| options | 操作列 | width: 180, min: 120, max: 400 |
| sensitiveInfo | 敏感信息 | width: 200, min: 100, max: 400 |
| other | 其他 | width: 200, min: 120, max: 400 |
| otherSmall | 其他（小） | width: 100, min: 70, max: 400 |
| otherLarge | 其他（大） | width: 300, min: 120, max: 500 |
