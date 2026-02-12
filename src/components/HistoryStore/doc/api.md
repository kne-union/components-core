### HistoryStore

HistoryStore 组件用于管理用户的历史记录，支持将搜索、选择等操作保存到 localStorage，并在需要时展示历史记录列表供用户快速选择。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| className | string | 否 | - | 自定义类名 |
| overlayClassName | string | 否 | - | 弹窗内容的自定义类名 |
| storeName | string | 否 | 'HISTORY_STORE_KEY' | localStorage 的键名，用于区分不同场景的历史记录 |
| maxLength | number | 否 | 5 | 最多保存的历史记录数量，为 0 时不限制 |
| label | string | 否 | '最近搜索' | 历史记录列表的标题文字 |
| children | function | 是 | - | 子组件，接收 render props |
| onSelect | function | 否 | - | 选中历史记录时的回调函数，接收参数：(value, item) |
| zIndex | number | 否 | - | 弹窗的 z-index 层级 |
| getPopupContainer | function | 否 | - | 获取弹窗容器的函数 |

#### Render Props

children 是一个函数，接收以下参数：

| 参数名 | 类型 | 说明 |
|--------|------|------|
| open | boolean | 弹窗是否打开 |
| openHistory | function | 打开历史记录弹窗的方法 |
| appendHistory | function | 添加历史记录的方法，参数：{value, label} |
| setOnSelect | function | 设置选中回调的方法，参数：callback |
| close | function | 关闭弹窗的方法 |

#### 历史记录数据格式

每条历史记录是一个对象，包含以下字段：

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| value | string | 是 | 历史记录的值 |
| label | string | 是 | 历史记录的显示文本 |
