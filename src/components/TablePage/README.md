# table-page

### 描述

A React table page component based on Ant Design, supporting column config, filter, sort and batch operations.

### 安装

```shell
npm i --save @kne/table-page
```

### 概述

`@kne/table-page` 是一个基于 React 和 Ant Design 的表格页面组件库，提供开箱即用的数据表格解决方案。组件库围绕表格的常见业务场景，封装了数据加载、分页、排序、行选择、列配置、筛选搜索、批量操作等能力，帮助开发者快速构建功能完善的表格管理页面。

### 核心组件

#### TablePage

表格页面主组件，基于 `@kne/react-fetch` 封装数据请求与分页逻辑。内置两种渲染模式：

- **`Table` 模式**（默认）：基于 antd `Table`，支持列宽拖动、字段显示/隐藏、分组表头、粘性表头等
- **`TableView` 模式**：基于 `@kne/table-view` CSS Grid，适合移动端或卡片式表格场景

通过 `loader` 或 `url` 配置数据源，通过 `dataFormat` 适配不同的接口数据结构。分页器渲染在表格外侧，翻页默认采用 `reload` 方式（不显示全屏 loading）。

同时内置了顶部工具栏（`TableToolbar`），整合筛选、搜索、Tab 分类、批量操作等能力：

- **筛选（filter）**：基于 `@kne/react-filter` 的 `FilterLines`，支持多行多字段组合筛选，筛选值变化时自动 `reload` 并回到第 1 页
- **搜索（search）**：基于 `@kne/react-filter` 的 `SearchInput`，支持关键词搜索与防抖自动提交，与筛选器共享筛选值状态；移动端开启 `renderMobile` 时，SearchInput 与下方卡片列表之间保留间距
- **操作按钮（buttonGroup）**：透传 `@kne/button-group` 参数；桌面端显示在 SearchInput 右侧（small、至少 1 个外露），移动端与筛选同行两端对齐（筛选靠左、按钮组靠右，small、外露 1 个），批量操作显示在「全选/排序」行的排序后面
- **Tab（tab）**：顶部分类切换，默认「全部」，选中值写入 filter value 参与请求但不在已选标签中重复展示；桌面端在表格边框外侧，移动端显示在 SearchInput 下方；可通过 `tabProps` 透传 antd Tabs 属性
- **批量操作（batchActions）**：配合 `rowSelection` 和 `useSelectedRow`，提供下拉菜单形式的批量操作（如批量导出、批量通知），未选中时自动禁用
- **PC 卡片视图（renderCard）**：取值同 `renderMobile`（true / function / preset 字符串），生效后 PC 端可切换表格/卡片（状态按 `name` 存 localStorage）；`forceCard` 强制卡片并不显示切换按钮；卡片模式下外框透明、默认触底下拉加载；移动端忽略
- **树形数据**：透传 `dataType`（`tree` / `treeList`）、`expandedKeys`、`onLoadChildren`、`rowSelection.checkRelation` 等给内部 Table / TableView
- **已选筛选值展示**：工具栏下方展示当前生效的筛选条件标签，支持快速清除

#### Table

基于 antd `Table` 的表格组件，与 `TableView` 共享相同的 `columns`、`rowSelection` 等 API。额外提供以下增强能力：

- **列宽拖动**：悬停表头列右侧拖动手柄可调整列宽，支持 `min`/`max` 限制
- **列配置面板**：通过表头最后一列的设置图标，可显示/隐藏字段、拖拽排序
- **配置持久化**：设置 `name` 后，列宽和显示状态自动保存到 localStorage
- **分组表头**：通过 `groupHeader` 配置实现多级表头结构
- **浮动横向滚动条**：当表格宽度超出容器时，底部自动显示横向滚动条（通过 `horizontalScroller` 控制）
- **树形数据**：支持与 `TableView` 相同的 `dataType`（`tree` / `treeList`），映射为 antd Table 树形展开，含懒加载与 `checkRelation` 勾选关联

#### TableView

基于 `@kne/table-view` 的 CSS Grid 表格视图组件。相比于 `Table`，它更轻量灵活，适合需要自定义渲染、移动端卡片展示的场景。支持：

- 基于 24 栅格的列宽分配（`span` 属性）
- CSS Grid 自动布局，内容超出时自动撑开
- 行选择（checkbox 多选 / radio 单选）
- 行点击事件
- 通过 `render` 属性自定义渲染，可拆分表头和表体
- 树形数据（`dataType: 'tree' | 'treeList'`）：展开收起、懒加载、移动端面包屑卡片

### 核心 Hooks

#### useSelectedRow

行选择 Hook，支持多选（checkbox）和单选（radio）两种模式。提供：

- `getRowSelection(dataSource)` 生成标准 `rowSelection` 配置，可直接传入 `Table` 或 `TableView`
- `selectedRowKeys` 和 `selectedRows` 追踪选中状态
- `setSelectedRowKeys(keys, dataSource)` 从 key 列表反查完整行数据
- `clearSelectedRows()` 一键清空选择

适用于批量操作（批量删除、批量导出等）和单选场景（详情查看、关联选择等）。

#### useSort

排序 Hook，配合 `Table`/`TableView` 的 `sortRender` 实现表头排序交互。支持：

- **单列排序**（`sort: true` 或 `sort: { single: true }`）：切换列时自动清除其他列的排序
- **多列排序**（`sort: { single: false }`）：允许多列同时排序
- 排序状态循环切换：DESC → ASC → 取消
- `sortDataSource(dataSource, sort, columns)` 工具函数，支持本地排序（包含中文排序）

### 渲染逻辑

#### 双模式：Table / TableView

`TablePage` 通过 `type` 切换底层表格实现：

| 模式 | 底层 | 适用场景 |
|------|------|----------|
| `Table`（默认） | antd `Table` | 桌面端完整表格能力：列宽拖动、列配置、分组表头、粘性表头、总结栏 |
| `TableView` | `@kne/table-view` CSS Grid | 轻量栅格表格、移动端、卡片式展示 |

两种模式共享 `columns`、`rowSelection`、`sortRender`、`renderType` 等 API，列渲染管线统一来自 `@kne/table-view`。

#### 列单元格渲染管线

无论 `Table` 还是 `TableView`，单元格内容均走同一套流程（`Table` 在 antd `columns[].render` 内调用）：

1. **`resolveColumns`**：解析 `renderType`，注入内置 `render` 与 `width` / `min` / `max` / `ellipsis`
2. **`computeColumnsValue`**：`getValueOf` 取值 → `format` 格式化 → 按 `display` / 空值规则过滤
3. **`computeDisplay`**：空值占位；非空调用列 `render`
4. **`renderCellContent`**：按 `ellipsis` / `cellFullWidth` 输出最终节点

列渲染优先级：`column.render`（最高）> `renderType` 内置渲染 > 原始格式化值。`render` 与 `renderType` 共存时，后者仅提供列宽等布局维度。

#### 桌面端：antd Table

`Table` 将解析后的列映射为 antd `columns`，在 `render` 回调中复用上述管线。额外能力：

- `useTableConfig` 管理列宽拖动、显示/隐藏、localStorage 持久化
- `useGroupHeader` 生成分组表头
- `rowSelection` 映射为 antd 行选择（含 `allowSelectedAll` 全选；树形下支持 `checkRelation`）
- `dataType` 为 `tree` / `treeList` 时归一化为嵌套数据并接入 antd `expandable`
- `render={({ header, renderBody }) => ...}` 可自定义表格外层，`renderBody()` 返回完整 antd Table

#### 移动端：`renderMobile`

`Table` 与 `TableView` 均支持 `renderMobile`，移动端判断使用 `useIsMobile()`（768px）。激活后 `Table` **不再渲染 antd Table**，委托 `TableView` 处理：

| `renderMobile` 值 | 行为 |
|-------------------|------|
| `true` | 默认卡片 List：每行一张卡片，字段列「标题 + 内容」纵向排列，`options` 操作列靠右（紧凑「⋯」入口） |
| `function` | 完全接管移动端渲染；回调含 `renderToolbar` / `getSelectionProps` / `getRowKey` 等，见 TableView API |
| `string` | 从 `preset({ renderMobile: { [name]: fn } })` 查找；未注册则视为未开启，回退普通表格 |

桌面端不受 `renderMobile` 影响：`Table` 仍走 antd Table，`TableView` 仍走 CSS Grid 或 `render`。

### 列渲染类型系统

通过 `renderType` 属性，可以用声明式的方式定义列的渲染样式，无需手写 `render` 函数。内置以下 render 类型：

| 类型 | 说明 |
|------|------|
| `main` | 主要内容列，自动省略号，较大宽度 |
| `options` | 操作列，铺满单元格 |
| `enum` | 枚举值渲染，自动映射 color/text |
| `tag` | 标签渲染，单个 Tag 组件 |
| `status` | 状态渲染，antd Badge 组件 |
| `tagList` | 标签列表渲染，多个 Tag 组件 |
| `amount` | 金额列，右对齐，自动省略号 |
| `list` | 列表渲染，自动省略号 |
| `description` | 描述文本，大宽度，自动省略号 |

支持尺寸修饰符：

- `short`：缩小宽度（约 120px）
- `small`：最小宽度（约 100px）
- `large`：放大宽度（约 300px）

例如 `renderType: "enum-small"` 表示枚举值 + 小尺寸列。维度（width、min、max、ellipsis）可通过 `globalParams.renderTypeSize` 全局定制。

默认导出 `getTagColor`、`renderTagItem`、`renderTagList`、`getStatusType`、`renderStatusItem` 工具函数，用于 Tag / Status 相关渲染。

### 其他导出

| 导出项 | 说明 |
|--------|------|
| `tableLocalApis` | 基于 localStorage 的列配置存取 API，可替换为服务端存储 |
| `useTableConfig` | 列配置 Hook，提供列宽、显示状态的管理能力 |
| `preset` / `globalParams` | 全局参数预设，用于设置 renderType 映射和标签颜色等全局配置 |
| `Ellipsis` | 超出省略组件，基于 antd Typography |
| `label` | 标签组件 |
| `sortDataSource` | 客户端排序工具函数 |

### 使用场景

- **后台管理系统**：订单管理、用户列表、商品管理等 CRUD 页面
- **数据报表**：配合排序、分页、总结栏展示统计数据
- **列表配置页**：需要用户自定义列宽、显示字段的表格场景
- **移动端适配**：`renderMobile` 启用卡片 List，或 `TableView` 模式做栅格式展示


### 示例

#### 示例样式

```scss
@use '~@kne/responsive-utils/scss' as resp;

// 手机预览下给示例内容左右留白，便于观察表格/卡片边框
@include resp.mobile-container {
  .example-driver-runner {
    padding-inline: 16px;
    box-sizing: border-box;
  }
}
```

#### 示例代码

- TablePage
- 表格页面组件，基于 @kne/react-fetch 实现数据加载与分页，支持 sticky 固定表头、useSort 服务端排序、renderMobile 移动端卡片、renderCard PC 卡片视图切换、tab 分类切换、列配置、总结栏、树形 dataType（含筛选/批量/操作列/卡片切换/懒加载）；空数据（total 为 0）时不显示分页器。文末含仅 SearchInput + renderMobile 自定义卡片示例（验证工具栏与卡片间距）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd),_ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css)

```jsx
const { default: TablePage, Table, mergeTreeChildren } = _TablePage;
const { fields } = _ReactFilter;
const { SuperSelectFilterItem } = fields;
const { Table: AntTable, Col, Flex, Row, Tag, Button, Space, Switch, Radio, message } = antd;
const { useMemo, useState, useRef } = React;

const TOTAL = 156;

const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

const surnames = ['张', '李', '王', '刘', '陈'];
const givenNames = ['伟', '强', '敏', '磊', '杰', '婷', '娜', '静', '丽', '娟'];
const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];
const positions = ['工程师', '高级工程师', '经理', '总监', '专员'];
const educations = ['本科', '硕士', '博士', '大专'];
const performances = ['A', 'B', 'C', 'S'];

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  resigned: { type: 'default', text: '离职' },
  probation: { type: 'processing', text: '试用期' }
};

const perfMap = {
  S: { type: 'success', text: 'S' },
  A: { type: 'processing', text: 'A' },
  B: { type: 'warning', text: 'B' },
  C: { type: 'error', text: 'C' }
};

const departmentOptions = departments.map(item => ({ value: item, label: item }));
const statusOptions = Object.entries(statusMap).map(([value, { text }]) => ({ value, label: text }));
const positionOptions = positions.map(item => ({ value: item, label: item }));

const buildEmployee = index => {
  const statusKeys = ['active', 'vacation', 'resigned', 'probation'];
  return {
    id: &#96;EMP${String(index + 1).padStart(4, '0')}&#96;,
    employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, '0')}&#96;,
    name: &#96;${surnames[index % surnames.length]}${givenNames[index % givenNames.length]}&#96;,
    department: departments[index % departments.length],
    position: positions[index % positions.length],
    status: statusKeys[index % statusKeys.length],
    email: &#96;employee${index + 1}@company.com&#96;,
    phone: &#96;138${String(index).padStart(8, '0')}&#96;,
    joinDate: &#96;2023-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}&#96;,
    workYears: Math.floor(index / 12) + 1,
    salary: &#96;${15 + (index % 20)}K-${20 + (index % 20)}K&#96;,
    education: educations[index % educations.length],
    performance: performances[index % performances.length]
  };
};

const columns = [
  {
    name: 'employeeNo',
    title: '工号',
    width: 180,
    min: 120,
    max: 240,
    fixed: 'left',
    sort: { single: true },
    renderType: 'main',
    primary: true,
    onClick: ({ item, colItem }) => {
      message.info(&#96;查看员工：${colItem.name}（${item}）&#96;);
    }
  },
  {
    name: 'name',
    title: '姓名',
    width: 100,
    min: 80,
    max: 160,
    sort: true,
    renderType: 'main',
    onClick: ({ item, colItem }) =>
      new Promise(resolve => {
        const hide = message.loading(&#96;正在加载 ${item} 的详情…&#96;, 0);
        setTimeout(() => {
          hide();
          message.success(&#96;${colItem.department} · ${colItem.position}&#96;);
          resolve();
        }, 600);
      })
  },
  { name: 'department', title: '部门', width: 150, min: 120, max: 240, sort: true },
  { name: 'position', title: '职位', width: 120, min: 100, max: 200 },
  {
    name: 'status',
    title: '状态',
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'performance', title: '绩效', width: 80, min: 70, max: 120, renderType: 'tag', getValueOf: item => perfMap[item.performance] || { type: 'default', text: item.performance } },
  { name: 'phone', title: '手机号', width: 140, min: 120, max: 180, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  { name: 'email', title: '邮箱', width: 200, min: 160, max: 320, ellipsis: true },
  { name: 'joinDate', title: '入职日期', width: 120, min: 100, max: 160, format: 'date', sort: true },
  { name: 'workYears', title: '工龄', width: 90, min: 70, max: 120, sort: true, render: value => &#96;${value}年&#96; },
  { name: 'salary', title: '薪资范围', width: 120, min: 100, max: 180, hidden: true },
  { name: 'education', title: '学历', width: 90, min: 70, max: 120, hidden: true },
  {
    name: 'options',
    title: '操作',
    renderType: 'options',
    fixed: 'right',
    width: 160,
    min: 120,
    max: 200,
    getValueOf: item => {
      const actions = [
        { children: '查看', onClick: () => message.info(&#96;查看 ${item.name}&#96;) },
        { children: '编辑', onClick: () => message.info(&#96;编辑 ${item.name}&#96;) }
      ];
      if (item.status !== 'resigned') {
        actions.push({
          children: '离职办理',
          onClick: () => message.warning(&#96;办理离职 ${item.name}&#96;)
        });
      }
      return actions;
    }
  }
];

const sortFieldLabels = {
  employeeNo: '工号',
  name: '姓名',
  department: '部门',
  joinDate: '入职日期',
  workYears: '工龄'
};

const normalizeFilterValue = value => {
  if (value == null) {
    return value;
  }
  return Array.isArray(value) ? value[0] : value;
};

const applyFilters = (employees, data, requestParams) => {
  const params = Object.assign({}, requestParams?.data, data);
  let result = employees;

  if (params.keyword) {
    const keyword = String(params.keyword).toLowerCase();
    result = result.filter(item => item.employeeNo.toLowerCase().includes(keyword) || item.name.includes(params.keyword));
  }

  const department = normalizeFilterValue(params.department);
  if (department) {
    result = result.filter(item => item.department === department);
  }

  const status = normalizeFilterValue(params.status);
  if (status) {
    result = result.filter(item => item.status === status);
  }

  const position = normalizeFilterValue(params.position);
  if (position) {
    result = result.filter(item => item.position === position);
  }

  return result;
};

const SortState = ({ sort }) => (
  <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: 8, fontSize: 13 }}>
    当前排序：
    {sort.length ? (
      sort.map(item => (
        <Tag key={item.name} color="blue" style={{ marginLeft: 8 }}>
          {sortFieldLabels[item.name] || item.name} {item.sort}
        </Tag>
      ))
    ) : (
      <span style={{ marginLeft: 8, color: '#999' }}>无</span>
    )}
  </div>
);

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">数据加载</Tag>
      通过 <code>loader</code> 模拟分页接口，请求参数为 <code>data.currentPage</code>、<code>data.perPage</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">分页</Tag>
      分页器渲染在表格外侧，翻页时以 <code>reload</code> 方式请求；<code>pageSize</code> 会持久化到 localStorage；当 <code>total</code> 为 0（无数据）时不显示分页器。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="gold">筛选</Tag>
      顶部工具栏集成 <code>filter</code>、<code>search</code>、<code>batchActions</code>、<code>buttonGroup</code>；筛选变化自动 <code>reload</code> 并回到第 1 页；移动端 <code>buttonGroup</code> 与筛选同行两端对齐（筛选靠左、按钮组靠右），批量操作显示在「全选/排序」行的排序后面。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="lime">Tab</Tag>
      通过 <code>tab</code> 配置顶部分类切换（默认「全部」），选中值写入 filter value 参与请求，但不在已选筛选标签中重复展示；桌面端在表格边框外，移动端在 SearchInput 下方；可用 <code>tabProps</code> 透传 Tabs 属性（如 <code>tabBarExtraContent</code>）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">列配置</Tag>
      设置 <code>name</code> 开启列宽拖动与显示/隐藏，「薪资范围」「学历」默认隐藏；状态列使用 <code>renderType="status"</code>，绩效列使用 <code>renderType="tag"</code>，操作列使用 <code>renderType="options"</code> 且 <code>fixed="right"</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="cyan">排序</Tag>
      配合 <code>Table.useSort</code> 与 <code>sortRender</code>、<code>mobileSortToolbar</code>，在 <code>onSortChange</code> 中调用 <code>reload</code> 传排序参数，与翻页一样不闪烁。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="volcano">移动端</Tag>
      设置 <code>renderMobile</code> 后，手机预览下启用卡片 List（含全选、排序工具栏）；桌面端仍为 antd Table。下方另有「仅 SearchInput + 自定义卡片」示例，用于确认 SearchInput 与卡片列表间距。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="geekblue">固定表头</Tag>
      设置 <code>sticky</code> 与 <code>scroll.y</code>，表体在固定高度内滚动时表头保持可见；横向滚动配合 <code>scroll.x</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="magenta">单元格点击</Tag>
      列配置 <code>onClick</code>（配合 <code>renderType="main"</code>、<code>primary</code> / <code>hover</code>），仅可点击单元格 hover 时显示手型；工号列同步演示异步点击 loading。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="purple">总结栏</Tag>
      <code>summary</code> 回调可拿到 <code>data</code>、<code>requestParams</code> 等 fetch 上下文。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="red">PC 卡片</Tag>
      传入 <code>renderCard</code>（签名同 <code>renderMobile</code>）后，工具栏 <code>buttonGroup</code> 前出现表格/卡片切换按钮，状态按 <code>name</code> 持久化到 localStorage；卡片模式下外框透明、默认触底下拉加载（<code>pagination.forcePagination</code> 可改回分页）；<code>forceCard</code> 强制卡片并隐藏切换按钮；移动端忽略。
    </div>
  </div>
);

const EmployeeCard = ({ item }) => (
  <div
    style={{
      boxSizing: 'border-box',
      border: '1px solid #f0f0f0',
      borderRadius: 8,
      padding: 16,
      background: '#fff'
    }}
  >
    <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
      <strong>{item.name}</strong>
      <Tag color={statusMap[item.status]?.type}>{statusMap[item.status]?.text || item.status}</Tag>
    </Flex>
    <Flex align="center" gap={8} wrap style={{ marginBottom: 4, fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
      <span>{item.department}</span>
      <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
      <span>{item.position}</span>
    </Flex>
    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
      {item.employeeNo} · 入职 {item.joinDate} · 薪资 {item.salary}
    </div>
    <Flex justify="flex-end" gap={4} style={{ marginTop: 12, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
      <Button type="link" size="small" onClick={() => message.info(&#96;查看 ${item.name}&#96;)}>
        查看
      </Button>
      <Button type="link" size="small" onClick={() => message.info(&#96;编辑 ${item.name}&#96;)}>
        编辑
      </Button>
      {item.status !== 'resigned' && (
        <Button type="link" size="small" danger onClick={() => message.warning(&#96;办理离职 ${item.name}&#96;)}>
          离职办理
        </Button>
      )}
    </Flex>
  </div>
);

const renderEmployeeCard = ({ dataSource = [] }) => (
  <Row gutter={[12, 12]}>
    {dataSource.map(item => (
      <Col span={12} key={item.id}>
        <EmployeeCard item={item} />
      </Col>
    ))}
  </Row>
);

const BaseExample = () => {
  const tableRef = React.useRef();
  const [empty, setEmpty] = useState(false);
  const [cardForcePagination, setCardForcePagination] = useState(false);
  const emptyRef = React.useRef(false);
  const allEmployees = useMemo(() => range(0, TOTAL).map(buildEmployee), []);
  const { selectedRows, getRowSelection } = Table.useSelectedRow({ rowKey: 'id' });
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({
    defaultSort: [{ name: 'joinDate', sort: 'DESC' }],
    onSortChange: newSort => {
      tableRef.current?.reload({
        data: { currentPage: 1, sort: newSort }
      });
    }
  });

  return (
    <Flex vertical gap={16}>
      <Tips />
      <SortState sort={sort} />
      <Space wrap>
        <Flex align="center" gap={8}>
          <Switch
            checked={empty}
            onChange={checked => {
              emptyRef.current = checked;
              setEmpty(checked);
              tableRef.current?.reload({ data: { currentPage: 1 } });
            }}
          />
          <span>{empty ? '空数据（无分页）' : '有数据（显示分页）'}</span>
        </Flex>
        <Button
          onClick={() => {
            tableRef.current?.reload({
              data: { currentPage: 1 }
            });
          }}
        >
          重新加载（回到第 1 页）
        </Button>
        <Button
          onClick={() => {
            tableRef.current?.refresh();
          }}
        >
          刷新当前页
        </Button>
        <Flex align="center" gap={8}>
          <span>卡片模式数据加载：</span>
          <Switch checkedChildren="分页" unCheckedChildren="下拉加载" checked={cardForcePagination} onChange={setCardForcePagination} />
        </Flex>
      </Space>
      <TablePage
        ref={tableRef}
        name="demo-employee-table"
        sticky
        scroll={{ x: 1600, y: 400 }}
        size="large"
        renderMobile
        renderCard={renderEmployeeCard}
        sortRender={sortRender}
        mobileSortToolbar={mobileSortToolbar}
        rowSelection={getRowSelection(allEmployees)}
        selectedRows={selectedRows}
        search={{ name: 'keyword', label: '关键词', placeholder: '搜索工号/姓名', style: { width: 220 } }}
        buttonGroup={{
          list: [
            {
              type: 'primary',
              children: '新建员工',
              onClick: () => message.success('打开新建员工')
            },
            {
              children: '导出全部',
              onClick: () => message.info('正在导出全部员工')
            }
          ]
        }}
        tab={{
          name: 'position',
          label: '职位',
          list: positionOptions
        }}
        tabProps={{
          tabBarExtraContent: (
            <Button type="link" size="small" onClick={() => message.info('新增职位')}>
              新增职位
            </Button>
          )
        }}
        filter={{
          list: [
            [
              {
                type: SuperSelectFilterItem,
                props: { name: 'department', label: '部门', single: true, options: departmentOptions }
              },
              {
                type: SuperSelectFilterItem,
                props: { name: 'status', label: '状态', single: true, options: statusOptions }
              }
            ]
          ],
          displayLine: 1
        }}
        batchActions={[
          {
            key: 'export',
            label: '批量导出',
            onClick: ({ selectedRowKeys }) => {
              message.info(&#96;正在导出 ${selectedRowKeys.length} 名员工&#96;);
            }
          },
          {
            key: 'notify',
            label: '批量通知',
            onClick: ({ selectedRowKeys }) => {
              message.success(&#96;已通知 ${selectedRowKeys.length} 名员工&#96;);
            }
          }
        ]}
        pagination={{
          open: true,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          forcePagination: cardForcePagination
        }}
        dataFormat={data => ({
          list: data.pageData,
          total: data.totalCount,
          data
        })}
        loader={({ data, requestParams }) => {
          if (emptyRef.current) {
            return new Promise(resolve => {
              setTimeout(() => resolve({ pageData: [], totalCount: 0 }), 400);
            });
          }
          const currentPage = Number(data?.currentPage ?? requestParams?.data?.currentPage) || 1;
          const perPage = Number(data?.perPage ?? requestParams?.data?.perPage) || 20;
          const sortParams = data?.sort ?? requestParams?.data?.sort ?? [{ name: 'joinDate', sort: 'DESC' }];
          const filteredEmployees = applyFilters(allEmployees, data, requestParams);
          const sortedEmployees = sortParams.length ? Table.sortDataSource(filteredEmployees, sortParams, columns) : filteredEmployees;
          const startIndex = (currentPage - 1) * perPage;

          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                pageData: sortedEmployees.slice(startIndex, startIndex + perPage),
                totalCount: filteredEmployees.length
              });
            }, 400);
          });
        }}
        columns={columns}
        summary={({ pageData, data }) => {
          const totalCount = data?.totalCount || 0;
          return (
            <AntTable.Summary fixed>
              <AntTable.Summary.Row>
                <AntTable.Summary.Cell index={0} colSpan={5}>
                  <strong>当前页统计</strong>
                </AntTable.Summary.Cell>
                <AntTable.Summary.Cell index={5}>
                  <strong>{pageData.length} 人</strong>
                </AntTable.Summary.Cell>
                <AntTable.Summary.Cell index={6} colSpan={7}>
                  <strong>总员工数: {totalCount} 人</strong>
                </AntTable.Summary.Cell>
              </AntTable.Summary.Row>
            </AntTable.Summary>
          );
        }}
        />
    </Flex>
  );
};

const sharedGroups = [
  {
    id: 1,
    name: '华北销售共享组',
    description: '覆盖华北区销售线索与客户跟进数据，成员可按只读或读写权限访问。',
    members: [{ id: 'u1' }, { id: 'u2' }, { id: 'u3' }],
    dataSources: [{ id: 'd1' }, { id: 'd2' }],
    sharedModules: [{ id: 'm1' }]
  },
  {
    id: 2,
    name: '产品研发协作组',
    description: '产品与研发跨部门协作，共享需求池与缺陷跟踪模块。',
    members: [{ id: 'u4' }, { id: 'u5' }],
    dataSources: [{ id: 'd3' }],
    sharedModules: [{ id: 'm2' }, { id: 'm3' }]
  },
  {
    id: 3,
    name: '财务审计只读组',
    description: '审计人员只读访问财务相关模块与导出记录。',
    members: [{ id: 'u6' }],
    dataSources: [{ id: 'd4' }, { id: 'd5' }, { id: 'd6' }],
    sharedModules: [{ id: 'm4' }]
  }
];

const sharedGroupColumns = [
  { name: 'id', title: 'ID', width: 80, renderType: 'small' },
  { name: 'name', title: '共享组名称', width: 180, renderType: 'main' },
  { name: 'description', title: '描述', width: 320, renderType: 'description', ellipsis: true },
  {
    name: 'options',
    title: '操作',
    width: 140,
    renderType: 'options',
    getValueOf: item => [
      { children: '编辑', type: 'link', onClick: () => console.log('edit', item.id) },
      { children: '删除', type: 'link', isDelete: true, message: &#96;确定删除 ${item.name} 吗？&#96;, onClick: () => console.log('remove', item.id) }
    ]
  }
];

const SharedGroupMobileCard = ({ item }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '14px 16px',
      background: '#fff',
      border: '1px solid #f0f0f0',
      borderRadius: 12,
      boxSizing: 'border-box'
    }}
  >
    <div>
      <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: 'rgba(0,0,0,0.88)' }}>
        {item.name}
      </div>
      <Flex align="center" gap={8} wrap="wrap" style={{ marginBottom: 6, fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
        <span>成员 {item.members.length}</span>
        <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
        <span>数据来源 {item.dataSources.length}</span>
        <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
        <span>模块 {item.sharedModules.length}</span>
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>#{item.id}</span>
      </Flex>
      <div
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          fontSize: 13,
          lineHeight: 1.5,
          color: 'rgba(0,0,0,0.45)'
        }}
      >
        {item.description}
      </div>
    </div>
  </div>
);

/** 仅 SearchInput + renderMobile：确认工具栏与卡片列表有间距、不紧贴 */
const SearchMobileExample = () => (
  <Flex vertical gap={12}>
    <div style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
      <Tag color="blue" style={{ marginRight: 8 }}>
        search only
      </Tag>
      仅配置 <code>search</code>（无 filter / batch / tab），移动端开启 <code>renderMobile</code> 自定义卡片时，
      SearchInput 与下方卡片列表应有间距，不可紧挨。请切换手机预览查看。
    </div>
    <TablePage
      name="demo-search-mobile-gap"
      pagination={{ open: false }}
      search={{ name: 'keyword', label: '关键词', placeholder: '搜索共享组名称' }}
      columns={sharedGroupColumns}
      loader={() =>
        Promise.resolve({
          pageData: sharedGroups,
          totalCount: sharedGroups.length
        })
      }
      renderMobile={({ dataSource }) => (
        <Flex vertical gap={12} className="info-page-table-mobile-card-list">
          {(dataSource || []).map(item => (
            <SharedGroupMobileCard key={item.id} item={item} />
          ))}
        </Flex>
      )}
    />
  </Flex>
);



const orgStatusMap = {
  active: { type: 'success', text: '启用' },
  paused: { type: 'warning', text: '停用' }
};

const orgRegionOptions = [
  { value: 'east', label: '华东' },
  { value: 'north', label: '华北' },
  { value: 'south', label: '华南' }
];

const orgStatusOptions = Object.entries(orgStatusMap).map(([value, { text }]) => ({ value, label: text }));

const treeColumns = [
  { name: 'name', title: '名称', width: 200, renderType: 'main' },
  { name: 'code', title: '编码', width: 120 },
  { name: 'owner', title: '负责人', width: 100 },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orgStatusMap[item.status] || { type: 'default', text: item.status }
  },
  {
    name: 'options',
    title: '操作',
    width: 160,
    renderType: 'options',
    fixed: 'right',
    getValueOf: item => [
      { children: '查看', onClick: () => message.info(&#96;查看 ${item.name}&#96;) },
      { children: '编辑', onClick: () => message.info(&#96;编辑 ${item.name}&#96;) },
      {
        children: '删除',
        isDelete: true,
        message: &#96;确定删除 ${item.name} 吗？&#96;,
        onClick: () => message.warning(&#96;已删除 ${item.name}&#96;)
      }
    ]
  }
];

const orgTreeData = [
  {
    id: '1',
    name: '华东区',
    code: 'EAST',
    owner: '张三',
    region: 'east',
    status: 'active',
    children: [
      {
        id: '1-1',
        name: '上海',
        code: 'SH',
        owner: '李四',
        region: 'east',
        status: 'active',
        children: [
          { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五', region: 'east', status: 'active' },
          { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六', region: 'east', status: 'paused' }
        ]
      },
      { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七', region: 'east', status: 'active' }
    ]
  },
  {
    id: '2',
    name: '华北区',
    code: 'NORTH',
    owner: '孙八',
    region: 'north',
    status: 'active',
    children: [{ id: '2-1', name: '北京', code: 'BJ', owner: '周九', region: 'north', status: 'paused' }]
  }
];

const orgTreeListData = [
  { id: '1', name: '华东区', code: 'EAST', owner: '张三', parentId: null, region: 'east', status: 'active' },
  { id: '1-1', name: '上海', code: 'SH', owner: '李四', parentId: '1', region: 'east', status: 'active' },
  { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五', parentId: '1-1', region: 'east', status: 'active' },
  { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六', parentId: '1-1', region: 'east', status: 'paused' },
  { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七', parentId: '1', region: 'east', status: 'active' },
  { id: '2', name: '华北区', code: 'NORTH', owner: '孙八', parentId: '', region: 'north', status: 'active' },
  { id: '2-1', name: '北京', code: 'BJ', owner: '周九', parentId: '2', region: 'north', status: 'paused' }
];

const lazyOrgRoot = [
  { id: 'org-1', name: '集团总部', code: 'HQ', owner: '张三', parentId: null, region: 'east', status: 'active', hasChildren: true },
  { id: 'org-2', name: '分公司', code: 'BR', owner: '李四', parentId: null, region: 'south', status: 'active', hasChildren: true }
];

const lazyOrgChildrenMap = {
  'org-1': [
    { id: 'org-1-1', name: '研发中心', code: 'RD', owner: '王五', region: 'east', status: 'active', hasChildren: true },
    { id: 'org-1-2', name: '市场部', code: 'MKT', owner: '赵六', region: 'east', status: 'paused', hasChildren: false }
  ],
  'org-1-1': [
    { id: 'org-1-1-1', name: '前端组', code: 'FE', owner: '钱七', region: 'east', status: 'active', hasChildren: false },
    { id: 'org-1-1-2', name: '后端组', code: 'BE', owner: '孙八', region: 'east', status: 'active', hasChildren: false }
  ],
  'org-2': [{ id: 'org-2-1', name: '华南办', code: 'SC', owner: '周九', region: 'south', status: 'active', hasChildren: false }]
};

const OrgTreeCard = ({ item }) => (
  <div
    style={{
      boxSizing: 'border-box',
      border: '1px solid #f0f0f0',
      borderRadius: 8,
      padding: 16,
      background: '#fff'
    }}
  >
    <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
      <strong>{item.name}</strong>
      <Tag color={orgStatusMap[item.status]?.type}>{orgStatusMap[item.status]?.text || item.status}</Tag>
    </Flex>
    <Flex align="center" gap={8} wrap style={{ marginBottom: 4, fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
      <span>编码 {item.code}</span>
      <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
      <span>负责人 {item.owner}</span>
    </Flex>
    <Flex justify="flex-end" gap={4} style={{ marginTop: 12, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
      <Button type="link" size="small" onClick={() => message.info(&#96;查看 ${item.name}&#96;)}>
        查看
      </Button>
      <Button type="link" size="small" onClick={() => message.info(&#96;编辑 ${item.name}&#96;)}>
        编辑
      </Button>
    </Flex>
  </div>
);

const renderOrgTreeCard = ({ displayDataSource, dataSource = [] }) => {
  const list = displayDataSource || dataSource;
  return (
    <Row gutter={[12, 12]}>
      {list.map(item => (
        <Col span={12} key={item.id}>
          <OrgTreeCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

const applyOrgTreeFilters = (list, data, requestParams) => {
  const params = Object.assign({}, requestParams?.data, data);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const region = normalizeFilterValue(params.region);
  const status = normalizeFilterValue(params.status);
  return (list || []).filter(item => {
    if (keyword) {
      const hit = [item.name, item.code, item.owner].some(v => String(v || '').toLowerCase().includes(keyword));
      if (!hit) return false;
    }
    if (region && item.region !== region) return false;
    if (status && item.status !== status) return false;
    return true;
  });
};

/** TablePage 树形：筛选 / 搜索 / 批量 / 操作列 / 卡片切换 / 懒加载 */
const TreePageExample = () => {
  const treePageRef = useRef(null);
  const { selectedRowKeys, selectedRows, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });
  const [checkRelation, setCheckRelation] = useState('parent');
  const lazyDataRef = useRef(lazyOrgRoot);
  const lazyPageRef = useRef(null);

  const handleLoadChildren = (item, { key }) =>
    new Promise(resolve => {
      setTimeout(() => {
        lazyDataRef.current = mergeTreeChildren(lazyDataRef.current, lazyOrgChildrenMap[key] || [], {
          parentKeyValue: key,
          dataType: 'treeList',
          rowKey: 'id',
          parentKey: 'parentId',
          hasChildrenKey: 'hasChildren'
        });
        lazyPageRef.current?.reload?.();
        resolve();
      }, 800);
    });

  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        <Tag color="blue" style={{ marginRight: 8 }}>
          tree
        </Tag>
        树形 TablePage：支持 <code>dataType</code>、<code>checkRelation</code>，并演示筛选 / 搜索 / 批量操作 / 行操作 / <code>renderCard</code> 卡片切换 / 懒加载。
      </div>

      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>treeList + 工具栏（筛选 / 批量 / 操作 / 卡片切换）</div>
        <Space style={{ marginBottom: 8 }} wrap>
          <span style={{ color: '#666' }}>checkRelation：</span>
          <Radio.Group
            value={checkRelation}
            optionType="button"
            options={[
              { label: 'parent', value: 'parent' },
              { label: 'all', value: 'all' },
              { label: 'independent', value: 'independent' }
            ]}
            onChange={e => {
              setCheckRelation(e.target.value);
              clearSelectedRows();
            }}
          />
        </Space>
        <TablePage
          ref={treePageRef}
          name="demo-table-page-tree-list"
          pagination={{ open: false }}
          columns={treeColumns}
          dataType="treeList"
          defaultExpandedKeys
          controllerOpen={false}
          renderMobile
          renderCard={renderOrgTreeCard}
          rowSelection={getRowSelection(orgTreeListData, { type: 'checkbox', allowSelectedAll: true, checkRelation })}
          selectedRows={selectedRows}
          search={{ name: 'keyword', label: '关键词', placeholder: '搜索名称/编码/负责人', style: { width: 240 } }}
          buttonGroup={{
            list: [
              {
                type: 'primary',
                children: '新建组织',
                onClick: () => message.success('打开新建组织')
              },
              {
                children: '导出组织树',
                onClick: () => message.info('正在导出组织树')
              }
            ]
          }}
          tab={{
            name: 'region',
            label: '大区',
            list: orgRegionOptions
          }}
          filter={{
            list: [
              [
                {
                  type: SuperSelectFilterItem,
                  props: { name: 'status', label: '状态', single: true, options: orgStatusOptions }
                }
              ]
            ],
            displayLine: 1
          }}
          batchActions={[
            {
              key: 'export',
              label: '批量导出',
              onClick: ({ selectedRowKeys: keys }) => {
                message.info(&#96;正在导出 ${keys.length} 个节点&#96;);
              }
            },
            {
              key: 'enable',
              label: '批量启用',
              onClick: ({ selectedRowKeys: keys }) => {
                message.success(&#96;已启用 ${keys.length} 个节点&#96;);
              }
            },
            {
              key: 'disable',
              label: '批量停用',
              danger: true,
              onClick: ({ selectedRowKeys: keys }) => {
                message.warning(&#96;已停用 ${keys.length} 个节点&#96;);
              }
            }
          ]}
          loader={({ data, requestParams }) => {
            const filtered = applyOrgTreeFilters(orgTreeListData, data, requestParams);
            return Promise.resolve({
              pageData: filtered,
              totalCount: filtered.length
            });
          }}
        />
        <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>已选 key：{selectedRowKeys.join(', ') || '无'}</div>
      </div>

      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>dataType="tree"（嵌套 children）</div>
        <TablePage
          name="demo-table-page-tree"
          pagination={{ open: false }}
          columns={treeColumns}
          dataType="tree"
          defaultExpandedKeys
          controllerOpen={false}
          renderMobile
          renderCard={renderOrgTreeCard}
          buttonGroup={{
            list: [{ type: 'primary', children: '新建', onClick: () => message.success('新建') }]
          }}
          loader={() =>
            Promise.resolve({
              pageData: orgTreeData,
              totalCount: orgTreeData.length
            })
          }
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>懒加载：hasChildren + onLoadChildren + mergeTreeChildren</div>
        <TablePage
          ref={lazyPageRef}
          name="demo-table-page-tree-lazy"
          pagination={{ open: false }}
          columns={treeColumns}
          dataType="treeList"
          controllerOpen={false}
          onLoadChildren={handleLoadChildren}
          loader={() =>
            Promise.resolve({
              pageData: lazyDataRef.current,
              totalCount: lazyDataRef.current.length
            })
          }
        />
      </div>
    </Flex>
  );
};


render(
  <Flex vertical gap={32}>
    <BaseExample />
    <TreePageExample />
    <SearchMobileExample />
  </Flex>
);


```

- TablePage sticky scroll
- 自包含演示区：sticky + getScrollContainer 由区内页面滚动触发表头吸顶（非 scroll.y）；模拟导航在区内 sticky，不遮挡文档站顶栏
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd),_ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css)

```jsx
const { default: TablePage } = _TablePage;
const { fields } = _ReactFilter;
const { SuperSelectFilterItem } = fields;
const { Flex, Tag } = antd;
const { useRef, useMemo } = React;

const NAV_HEIGHT = 56;
const DEMO_HEIGHT = 600;
const TOTAL = 80;

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  resigned: { type: 'default', text: '离职' },
  probation: { type: 'processing', text: '试用期' }
};

const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];

const departmentOptions = departments.map(item => ({ value: item, label: item }));
const statusOptions = Object.entries(statusMap).map(([value, { text }]) => ({ value, label: text }));

const normalizeFilterValue = value => {
  if (value == null) {
    return value;
  }
  return Array.isArray(value) ? value[0] : value;
};

const applyFilters = (employees, data, requestParams) => {
  const params = Object.assign({}, requestParams?.data, data);
  let result = employees;

  if (params.keyword) {
    const keyword = String(params.keyword).toLowerCase();
    result = result.filter(item => item.employeeNo.toLowerCase().includes(keyword) || item.name.includes(params.keyword));
  }

  const department = normalizeFilterValue(params.department);
  if (department) {
    result = result.filter(item => item.department === department);
  }

  const status = normalizeFilterValue(params.status);
  if (status) {
    result = result.filter(item => item.status === status);
  }

  return result;
};

const buildEmployee = index => {
  const statusKeys = ['active', 'vacation', 'resigned', 'probation'];
  return {
    id: &#96;EMP${String(index + 1).padStart(4, '0')}&#96;,
    employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, '0')}&#96;,
    name: &#96;员工${index + 1}&#96;,
    department: departments[index % departments.length],
    position: ['工程师', '经理', '专员'][index % 3],
    status: statusKeys[index % statusKeys.length],
    joinDate: &#96;2024-${String((index % 12) + 1).padStart(2, '0')}-15&#96;
  };
};

const allEmployees = Array.from({ length: TOTAL }, (_, index) => buildEmployee(index));

const columns = [
  { name: 'employeeNo', title: '工号', width: 160, min: 120, max: 220, fixed: 'left', renderType: 'small' },
  { name: 'name', title: '姓名', width: 100, renderType: 'main' },
  { name: 'department', title: '部门', width: 150 },
  { name: 'position', title: '职位', width: 120 },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'joinDate', title: '入职日期', width: 120, format: 'date' }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">页面滚动</Tag>
      在下方<strong>灰色边框演示区</strong>内滚动（非 <code>scroll.y</code>）；表头通过 <code>sticky</code> + <code>getScrollContainer</code> 吸顶。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">getScrollContainer</Tag>
      指向演示区滚动容器；<code>scrollTopInset</code> 传入顶部导航占位高度（<code>{NAV_HEIGHT}px</code>），用于吸顶表头偏移与翻页滚回。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="gold">筛选栏</Tag>
      顶部工具栏含 <code>search</code> 与 <code>filter</code>；筛选变化会 <code>reload</code> 并回到第 1 页，翻页后滚回工具栏顶部。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="purple">横向 Scroller</Tag>
      表格底部未完全露出时，会在滚动容器底部显示横向滚动条（<code>horizontalScroller</code> 默认开启）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">操作提示</Tag>
      在演示区内向下滚动，蓝色导航条会吸顶，表格表头应固定在其下方；翻页后滚回表格顶部。
    </div>
  </div>
);

const BaseExample = () => {
  const scrollRef = useRef(null);

  const loader = useMemo(
    () =>
      ({ data, requestParams }) => {
        const currentPage = Number(data?.currentPage) || 1;
        const perPage = Number(data?.perPage) || 50;
        const filteredEmployees = applyFilters(allEmployees, data, requestParams);
        const start = (currentPage - 1) * perPage;
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              pageData: filteredEmployees.slice(start, start + perPage),
              totalCount: filteredEmployees.length
            });
          }, 200);
        });
      },
    []
  );

  return (
    <Flex vertical gap={16}>
      <Tips />
      <div
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#fff'
        }}
      >
        <div
          ref={scrollRef}
          style={{
            height: DEMO_HEIGHT,
            overflow: 'auto',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              height: NAV_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              color: '#fff',
              fontWeight: 500,
              background: '#1677ff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)'
            }}
          >
            模拟顶部导航（{NAV_HEIGHT}px）
          </div>
          <Flex vertical gap={16} style={{ padding: 16 }}>
            <div
              style={{
                padding: '20px 24px',
                background: '#f5f5f5',
                borderRadius: 8,
                color: '#666',
                fontSize: 13
              }}
            >
              在演示区内继续向下滚动 ↓
            </div>
            <div
              style={{
                height: 520,
                borderRadius: 8,
                background: 'linear-gradient(180deg, #f0f5ff 0%, #fff 100%)',
                border: '1px dashed #d9d9d9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999'
              }}
            >
              占位区域（模拟页面上方内容）
            </div>
            <TablePage
              name="demo-table-page-sticky-scroll"
              sticky
              scrollTopInset={NAV_HEIGHT}
              getScrollContainer={() => scrollRef.current}
              scroll={{ x: 900 }}
              search={{ name: 'keyword', label: '关键词', placeholder: '搜索工号/姓名', style: { width: 200 } }}
              filter={{
                list: [
                  [
                    {
                      type: SuperSelectFilterItem,
                      props: { name: 'department', label: '部门', single: true, options: departmentOptions }
                    },
                    {
                      type: SuperSelectFilterItem,
                      props: { name: 'status', label: '状态', single: true, options: statusOptions }
                    }
                  ]
                ],
                displayLine: 1
              }}
              pagination={{
                open: true,
                pageSize: 50,
                cachePageSize: false,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              dataFormat={data => ({
                list: data.pageData,
                total: data.totalCount
              })}
              loader={loader}
              columns={columns}
            />
            <div style={{ height: 80, color: '#999', fontSize: 13, textAlign: 'center' }}>演示区底部留白</div>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- TableView
- 表格视图组件，支持行选择、列宽设置等
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { TableView } = _TablePage;
const { Flex, Tag } = antd;
const { useState } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '138-0013-8000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '139-0014-9000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '137-0015-7000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '136-0016-6000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    phone: '135-0017-5000',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12',
    deliveryDate: ''
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
  { name: 'customerName', title: '客户名称', span: 10, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 80 },
  { name: 'phone', title: '联系电话', width: '130px', render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额(元)',
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', format: 'date' },
  { name: 'deliveryDate', title: '预计送达', format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const WithCheckbox = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong></span>
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'checkbox', allowSelectedAll: true, selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const WithSelected = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const selectedOrder = dataSource.find(d => d.id === selectKeys[0]);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选订单：{selectedOrder ? &#96;${selectedOrder.id} (${selectedOrder.customerName})&#96; : '无'}</span>
        {selectedOrder && <Tag color="blue">¥{selectedOrder.amount.toLocaleString()}</Tag>}
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'radio', selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const WithColumnWidth = () => {
  const widthColumns = [
    { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
    { name: 'customerName', title: '客户名称', width: '200px', renderType: 'main' },
    {
      name: 'amount',
      title: '订单金额(元)',
      width: 120,
      renderType: 'amount',
      format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
    },
    {
      name: 'status',
      title: '订单状态',
      width: '100px',
      renderType: 'status',
      getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
    }
  ];
  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        通过 columns 的 <code>width</code> 设置列最小宽度，支持数字（如 <code>180</code>）或字符串（如 <code>'100px'</code>），内容超出时会自动撑开
      </div>
      <TableView dataSource={dataSource.slice(0, 3)} columns={widthColumns} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
        订单列表 - 共 <strong>{dataSource.length}</strong> 个订单
      </div>
      <WithColumnWidth />
      <TableView dataSource={dataSource} columns={columns} />
      <WithCheckbox />
      <WithSelected />
      <div style={{ padding: '16px', background: '#fafafa', border: '1px dashed #d9d9d9', borderRadius: '8px' }}>
        暂无订单数据
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- Table
- 基于 antd Table 的表格组件，支持列宽拖动、字段显示/隐藏，与 TableView 使用一致的 columns、rowSelection 等 API
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table } = _TablePage;
const { Flex, Tag } = antd;
const { useState } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '13800138000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '13900149000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '13700157000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '13600166000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    phone: '13500175000',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12',
    deliveryDate: ''
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 200, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 80 },
  { name: 'phone', title: '联系电话', width: 130, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 120,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 110, format: 'date' },
  { name: 'deliveryDate', title: '预计送达', width: 110, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const WithCheckbox = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
        </span>
      </Flex>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          allowSelectedAll: true,
          selectedRowKeys: selectKeys,
          onChange: setSelectKeys
        }}
      />
    </div>
  );
};

const WithSelected = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const selectedOrder = dataSource.find(d => d.id === selectKeys[0]);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选订单：{selectedOrder ? &#96;${selectedOrder.id} (${selectedOrder.customerName})&#96; : '无'}</span>
        {selectedOrder && <Tag color="blue">¥{selectedOrder.amount.toLocaleString()}</Tag>}
      </Flex>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectKeys,
          onChange: setSelectKeys
        }}
      />
    </div>
  );
};

const WithScroll = () => {
  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        基于 antd Table 渲染，支持 <code>scroll</code>、<code>sticky</code> 等原生表格能力
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        sticky
        scroll={{ x: 1200, y: 240 }}
      />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
        订单列表（antd Table）- 共 <strong>{dataSource.length}</strong> 个订单，与 TableView 使用相同的 columns / rowSelection API
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <WithCheckbox />
      <WithSelected />
      <Table dataSource={[]} columns={columns} />
      <WithScroll />
    </Flex>
  );
};

render(<BaseExample />);


```

- tree
- 树状数据：Table / TableView 支持 dataType 为 tree / treeList，含展开收起、懒加载、checkRelation 勾选关联
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView, mergeTreeChildren } = _TablePage;
const { Space, Button, Radio } = antd;
const { useState } = React;

const columns = [
  { name: 'name', title: '名称', renderType: 'main' },
  { name: 'code', title: '编码', width: 120 },
  { name: 'owner', title: '负责人', width: 100 }
];

const treeData = [
  {
    id: '1',
    name: '华东区',
    code: 'EAST',
    owner: '张三',
    children: [
      {
        id: '1-1',
        name: '上海',
        code: 'SH',
        owner: '李四',
        children: [
          { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五' },
          { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六' }
        ]
      },
      { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七' }
    ]
  },
  {
    id: '2',
    name: '华北区',
    code: 'NORTH',
    owner: '孙八',
    children: [{ id: '2-1', name: '北京', code: 'BJ', owner: '周九' }]
  }
];

const treeListData = [
  { id: '1', name: '华东区', code: 'EAST', owner: '张三', parentId: null },
  { id: '1-1', name: '上海', code: 'SH', owner: '李四', parentId: '1' },
  { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五', parentId: '1-1' },
  { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六', parentId: '1-1' },
  { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七', parentId: '1' },
  { id: '2', name: '华北区', code: 'NORTH', owner: '孙八', parentId: '' },
  { id: '2-1', name: '北京', code: 'BJ', owner: '周九', parentId: '2' }
];

const lazyRootData = [
  { id: 'org-1', name: '集团总部', code: 'HQ', owner: '张三', parentId: null, hasChildren: true },
  { id: 'org-2', name: '分公司', code: 'BR', owner: '李四', parentId: null, hasChildren: true }
];

const lazyChildrenMap = {
  'org-1': [
    { id: 'org-1-1', name: '研发中心', code: 'RD', owner: '王五', hasChildren: true },
    { id: 'org-1-2', name: '市场部', code: 'MKT', owner: '赵六', hasChildren: false }
  ],
  'org-1-1': [
    { id: 'org-1-1-1', name: '前端组', code: 'FE', owner: '钱七', hasChildren: false },
    { id: 'org-1-1-2', name: '后端组', code: 'BE', owner: '孙八', hasChildren: false }
  ],
  'org-2': [{ id: 'org-2-1', name: '华南办', code: 'SC', owner: '周九', hasChildren: false }]
};

const TreeExample = () => {
  const { selectedRowKeys, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });
  const treeListSelection = Table.useSelectedRow({ rowKey: 'id' });
  const [expandedKeys, setExpandedKeys] = useState(false);
  const [checkRelation, setCheckRelation] = useState('parent');
  const [lazyData, setLazyData] = useState(lazyRootData);

  const handleLoadChildren = (item, { key }) =>
    new Promise(resolve => {
      setTimeout(() => {
        const children = lazyChildrenMap[key] || [];
        setLazyData(prev =>
          mergeTreeChildren(prev, children, {
            parentKeyValue: key,
            dataType: 'treeList',
            rowKey: 'id',
            parentKey: 'parentId',
            hasChildrenKey: 'hasChildren'
          })
        );
        resolve();
      }, 800);
    });

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <div style={{ marginBottom: 8 }}>Table：dataType="tree"（嵌套 children）</div>
        <Table dataSource={treeData} columns={columns} dataType="tree" defaultExpandedKeys controllerOpen={false} />
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>Table：dataType="treeList" + 勾选（checkRelation）</div>
        <Space style={{ marginBottom: 8 }} wrap>
          <Radio.Group
            value={checkRelation}
            optionType="button"
            options={[
              { label: 'parent', value: 'parent' },
              { label: 'all', value: 'all' },
              { label: 'independent', value: 'independent' }
            ]}
            onChange={e => {
              setCheckRelation(e.target.value);
              clearSelectedRows();
            }}
          />
        </Space>
        <Table dataSource={treeListData} columns={columns} dataType="treeList" defaultExpandedKeys controllerOpen={false} rowSelection={getRowSelection(treeListData, { allowSelectedAll: true, checkRelation })} />
        <div style={{ marginTop: 8 }}>已选 key：{selectedRowKeys.join(', ') || '无'}</div>
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>Table：懒加载（hasChildren + onLoadChildren + mergeTreeChildren）</div>
        <Table dataSource={lazyData} columns={columns} dataType="treeList" onLoadChildren={handleLoadChildren} controllerOpen={false} />
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>Table：受控展开 true / false / key 数组</div>
        <Space style={{ marginBottom: 8 }}>
          <Button size="small" onClick={() => setExpandedKeys(true)}>
            全部展开
          </Button>
          <Button size="small" onClick={() => setExpandedKeys(false)}>
            全部收起
          </Button>
          <Button size="small" onClick={() => setExpandedKeys(['1', '1-1'])}>
            展开指定节点
          </Button>
        </Space>
        <Table dataSource={treeData} columns={columns} dataType="tree" expandedKeys={expandedKeys} onExpandedKeysChange={setExpandedKeys} controllerOpen={false} />
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>TableView：同样 API（CSS Grid 树形）</div>
        <TableView dataSource={treeListData} columns={columns} dataType="treeList" defaultExpandedKeys rowSelection={treeListSelection.getRowSelection(treeListData, { allowSelectedAll: true, checkRelation: 'parent' })} />
      </div>
    </Space>
  );
};

render(<TreeExample />);


```

- useSelectedRow
- 行选择 Hook，配合 Table / TableView 实现多选、全选、批量操作与单选
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Button, Flex, Space, message } = antd;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    amount: 42500,
    status: '待发货',
    orderDate: '2024-01-15'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 220, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 100 },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 130,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 120, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const BatchToolbar = ({ selectedRowKeys, selectedRows, clearSelectedRows, onBatchShip, onBatchExport }) => {
  const totalAmount = selectedRows.reduce((sum, item) => sum + (item.amount || 0), 0);
  return (
    <Flex justify="space-between" align="center" style={{ marginBottom: 12, padding: '12px', background: '#f5f5f5', borderRadius: 8 }}>
      <Space>
        <span>
          已选 <strong>{selectedRowKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
        </span>
        <Button type="primary" size="small" disabled={!selectedRowKeys.length} onClick={onBatchShip}>
          批量发货
        </Button>
        <Button size="small" disabled={!selectedRowKeys.length} onClick={onBatchExport}>
          批量导出
        </Button>
        <Button size="small" disabled={!selectedRowKeys.length} onClick={clearSelectedRows}>
          清空选择
        </Button>
      </Space>
    </Flex>
  );
};

const TableExample = () => {
  const { selectedRowKeys, selectedRows, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>Table + useSelectedRow</div>
      <BatchToolbar
        selectedRowKeys={selectedRowKeys}
        selectedRows={selectedRows}
        clearSelectedRows={clearSelectedRows}
        onBatchShip={() => {
          message.success(&#96;已批量发货 ${selectedRowKeys.length} 个订单&#96;);
          clearSelectedRows();
        }}
        onBatchExport={() => message.info(&#96;正在导出 ${selectedRowKeys.length} 个订单&#96;)}
      />
      <Table dataSource={dataSource} columns={columns} rowSelection={getRowSelection(dataSource)} />
    </div>
  );
};

const TableViewExample = () => {
  const { selectedRowKeys, selectedRows, getRowSelection, clearSelectedRows } = TableView.useSelectedRow({ rowKey: 'id' });

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>TableView + useSelectedRow</div>
      <BatchToolbar
        selectedRowKeys={selectedRowKeys}
        selectedRows={selectedRows}
        clearSelectedRows={clearSelectedRows}
        onBatchShip={() => {
          message.success(&#96;已批量发货 ${selectedRowKeys.length} 个订单&#96;);
          clearSelectedRows();
        }}
        onBatchExport={() => message.info(&#96;正在导出 ${selectedRowKeys.length} 个订单&#96;)}
      />
      <TableView dataSource={dataSource} columns={columns} rowSelection={getRowSelection(dataSource)} />
    </div>
  );
};

const RadioExample = () => {
  const { selectedRowKeys, selectedRows, getRowSelection } = Table.useSelectedRow({ rowKey: 'id', type: 'radio' });
  const selectedOrder = selectedRows[0];

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>单选模式 type: 'radio'</div>
      <div style={{ marginBottom: 12 }}>
        当前选中：{selectedOrder ? &#96;${selectedOrder.id}（${selectedOrder.customerName}）&#96; : '无'}
      </div>
      <Table dataSource={dataSource} columns={columns} rowSelection={getRowSelection(dataSource)} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <TableExample />
      <TableViewExample />
      <RadioExample />
    </Flex>
  );
};

render(<BaseExample />);


```

- useSort
- 排序 Hook，配合 Table / TableView 实现表头排序、单列/多列排序与 sortDataSource 本地排序
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Tag } = antd;
const { useMemo } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  { id: 'ORD001', customerName: '深圳市腾讯计算机系统有限公司', amount: 42500, status: '已完成', orderDate: '2024-01-15' },
  { id: 'ORD002', customerName: '华为技术有限公司', amount: 85000, status: '处理中', orderDate: '2024-01-14' },
  { id: 'ORD003', customerName: '阿里巴巴集团控股有限公司', amount: 120000, status: '待发货', orderDate: '2024-01-16' },
  { id: 'ORD004', customerName: '北京字节跳动科技有限公司', amount: 65000, status: '已完成', orderDate: '2024-01-13' },
  { id: 'ORD005', customerName: '百度在线网络技术（北京）有限公司', amount: 95000, status: '已取消', orderDate: '2024-01-12' }
];

const columns = [
  { name: 'id', title: '订单编号', width: 140, sort: { single: true }, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 240, sort: true, renderType: 'main' },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 130,
    sort: true,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 120, sort: true, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const SortState = ({ sort }) => (
  <div style={{ marginBottom: 12, padding: '12px', background: '#f5f5f5', borderRadius: 8 }}>
    当前排序：
    {sort.length ? (
      <span>
        {sort.map(item => (
          <Tag key={item.name} color="blue" style={{ marginLeft: 8 }}>
            {item.name} {item.sort}
          </Tag>
        ))}
      </span>
    ) : (
      <span style={{ marginLeft: 8, color: '#999' }}>无</span>
    )}
  </div>
);

const TableExample = () => {
  const { sort, sortRender } = Table.useSort({
    onSortChange: value => console.log('Table 排序变更:', value)
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>Table + useSort（金额、日期支持多列排序）</div>
      <SortState sort={sort} />
      <Table dataSource={sortedData} columns={columns} sortRender={sortRender} />
    </div>
  );
};

const TableViewExample = () => {
  const { sort, sortRender } = TableView.useSort({
    defaultSort: [{ name: 'orderDate', sort: 'DESC' }],
    onSortChange: value => console.log('TableView 排序变更:', value)
  });
  const sortedData = useMemo(() => TableView.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>TableView + useSort（默认按下单日期降序）</div>
      <SortState sort={sort} />
      <TableView dataSource={sortedData} columns={columns} sortRender={sortRender} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13 }}>
        列配置 <code>sort: true</code> 开启排序，<code>sort: {'{ single: true }'}</code> 为单列排序。点击表头三角切换 DESC → ASC → 取消。
      </div>
      <TableExample />
      <TableViewExample />
    </Flex>
  );
};

render(<BaseExample />);


```

- column ellipsis
- 表头 title 超出列宽自动省略、悬停 tooltip；单元格 ellipsis 配置基于 antd Typography 实现内容省略
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Tag } = antd;
const { useMemo } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司深圳总部研发中心',
    remark: '客户要求春节前完成交付，需协调物流加急处理，并同步更新合同附件与验收标准说明文档。',
    amount: 42500,
    status: '待发货'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司坂田基地采购中心',
    remark: '项目处于需求评审阶段，待客户确认最终配置清单后安排发货。',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司滨江园区',
    remark: '已完成付款，仓库正在拣货，预计两个工作日内发出第一批货物。',
    amount: 120000,
    status: '待发货'
  }
];

const columns = [
  { name: 'id', title: '订单编号（系统流水号）', width: 110, renderType: 'small' },
  {
    name: 'customerName',
    title: '客户名称（签约主体全称）',
    width: 140,
    renderType: 'main',
    ellipsis: true
  },
  {
    name: 'remark',
    title: '备注说明（内部流转备注）',
    width: 160,
    renderType: 'description',
    ellipsis: { showTitle: true }
  },
  {
    name: 'amount',
    title: '订单应付金额（含税，单位：元）',
    width: 120,
    sort: true,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '订单履约状态（业务状态）',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">表头省略</Tag>
      列 <code>title</code> 超出列宽时自动单行省略，悬停 tooltip 显示完整标题；带排序的列同样生效（<code>Table</code> / <code>TableView</code> 均支持，无需额外配置）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">单元格省略</Tag>
      列配置 <code>ellipsis: true</code> 或 <code>ellipsis: {'{ showTitle: true }'}</code>，单元格内容超出时省略，悬停显示完整内容（基于 antd Typography）。
    </div>
    <div style={{ color: '#999' }}>
      本示例刻意使用较长表头与较窄列宽，便于观察省略与 tooltip 效果；可将鼠标悬停在表头或单元格上查看。
    </div>
  </div>
);

const TableExample = () => {
  const { sort, sortRender } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>Table（含排序表头省略）</div>
      <Table dataSource={sortedData} columns={columns} sortRender={sortRender} scroll={{ x: 700 }} />
    </div>
  );
};

const TableViewExample = () => {
  const { sort, sortRender } = TableView.useSort({});
  const sortedData = useMemo(() => TableView.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>TableView（含排序表头省略）</div>
      <TableView dataSource={sortedData} columns={columns} sortRender={sortRender} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Tips />
      <TableExample />
      <TableViewExample />
    </Flex>
  );
};

render(<BaseExample />);


```

- renderType
- 列 renderType 配置：main / amount / tag / status / tagList / list / options / description / enum，支持与 short / small / large 尺寸修饰组合；配合 getValueOf、format、onClick 等列属性
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex } = antd;

const statusMap = {
  待发货: { type: 'warning', text: '待发货' },
  处理中: { type: 'processing', text: '处理中' },
  已完成: { type: 'success', text: '已完成' }
};

const categoryMap = {
  企业客户: { type: 'default', text: '企业客户' },
  战略客户: { type: 'processing', text: '战略客户' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    category: '企业客户',
    tags: ['物流', '加急'],
    keywords: ['合同', '附件', '春节前'],
    remark: '客户要求春节前完成交付，需协调物流加急处理，并同步更新合同附件。',
    amount: 42500,
    status: '待发货'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    category: '战略客户',
    tags: ['评审', '配置清单'],
    keywords: ['需求评审', '配置清单'],
    remark: '项目处于需求评审阶段，待客户确认最终配置清单后安排发货。',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    category: '企业客户',
    tags: ['拣货', '付款完成'],
    keywords: ['付款', '拣货', '发货'],
    remark: '已完成付款，仓库正在拣货，预计两个工作日内发出第一批货物。',
    amount: 120000,
    status: '已完成'
  }
];

const columns = [
  { name: 'id', title: '编号', renderType: 'small' },
  { name: 'customerName', title: '客户名称', renderType: 'main' },
  {
    name: 'category',
    title: '分类',
    renderType: 'tag-short',
    getValueOf: item => categoryMap[item.category]
  },
  {
    name: 'tags',
    title: '标签',
    renderType: 'tagList',
    getValueOf: item =>
      (item.tags || []).map(text => ({
        type: text === '加急' ? 'error' : 'processing',
        text
      }))
  },
  {
    name: 'keywords',
    title: '关键词',
    renderType: 'list',
    split: '、',
    getValueOf: item => item.keywords
  },
  { name: 'remark', title: '备注', renderType: 'description' },
  {
    name: 'amount',
    title: '金额',
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态',
    renderType: 'status',
    getValueOf: item => statusMap[item.status]
  },
  {
    name: 'options',
    title: '操作',
    renderType: 'options',
    fixed: 'right',
    getValueOf: item => {
      const actions = [
        { children: '查看', onClick: () => console.log('查看', item.id) },
        { children: '编辑', onClick: () => console.log('编辑', item.id) }
      ];
      if (item.status !== '已完成') {
        actions.push({
          children: '删除',
          isDelete: true,
          message: &#96;确定删除 ${item.id} 吗？&#96;,
          onClick: () => console.log('删除', item.id)
        });
      }
      return actions;
    }
  }
];

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
        <p>
          列配置 <code>renderType</code> 声明列的渲染方式，无需手写 <code>render</code>。内置类型：
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li><code>main</code> — 主信息列，支持 <code>primary</code> / <code>hover</code> / <code>onClick</code></li>
          <li><code>amount</code> — 金额列，右对齐，配合 <code>format</code> 格式化</li>
          <li><code>tag</code> — 单个 Tag，<code>getValueOf</code> 返回 <code>{'{ type, text }'}</code></li>
          <li><code>status</code> — 状态 Badge，<code>getValueOf</code> 返回 <code>{'{ type, text }'}</code></li>
          <li><code>tagList</code> — 多个 Tag 列表</li>
          <li><code>list</code> — 文本列表，可用 <code>split</code> 指定分隔符</li>
          <li><code>options</code> — 操作列，<code>getValueOf</code> 返回按钮配置数组</li>
          <li><code>description</code> — 长文本描述列</li>
          <li><code>enum</code> — 枚举值映射渲染</li>
        </ul>
        <p>
          可与尺寸修饰词组合：<code>short</code> / <code>small</code> / <code>large</code>（如 <code>tag-short</code>、<code>status-small</code>、<code>main-large</code>）。
          通过 <code>getValueOf</code> 传入 render 所需数据结构，通过 <code>format</code> 做日期、金额等展示格式化。
        </p>
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>Table</div>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1800 }} />
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>TableView</div>
        <TableView dataSource={dataSource} columns={columns} />
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- column render
- 列同时配置 render 与 renderType 时，render 优先级最高，覆盖内置 renderType 的单元格渲染（Table / TableView 一致）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Tag } = antd;

const statusMap = {
  待发货: { type: 'warning', text: '待发货' },
  处理中: { type: 'processing', text: '处理中' },
  已完成: { type: 'success', text: '已完成' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    amount: 42500,
    status: '待发货'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    amount: 120000,
    status: '已完成'
  }
];

const columns = [
  { name: 'id', title: '编号', renderType: 'small' },
  { name: 'customerName', title: '客户名称', renderType: 'main' },
  {
    name: 'amount',
    title: '金额',
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态（仅 renderType）',
    renderType: 'status',
    getValueOf: item => statusMap[item.status]
  },
  {
    name: 'statusRender',
    title: '状态（render 优先）',
    renderType: 'status',
    getValueOf: item => statusMap[item.status],
    render: (value, { dataSource }) => (
      <span style={{ color: '#1677ff' }}>
        自定义渲染：{dataSource.status}（未走 status Badge）
      </span>
    )
  }
];

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
        <p>
          列同时配置 <code>render</code> 与 <code>renderType</code> 时，
          <Tag color="blue" style={{ margin: '0 4px' }}>render 优先级最高</Tag>
          ，会直接使用自定义 <code>render</code>，不再走内置 renderType。
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>「状态（仅 renderType）」列：走内置 <code>status</code>，渲染 Badge</li>
          <li>「状态（render 优先）」列：同样写了 <code>renderType: 'status'</code>，但因存在 <code>render</code>，最终显示自定义内容</li>
          <li>renderType 仍可提供列宽等维度（width / min / max），仅单元格内容渲染被 <code>render</code> 覆盖</li>
        </ul>
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>Table</div>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>TableView</div>
        <TableView dataSource={dataSource} columns={columns} />
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- renderMobile
- 移动端专用渲染：true 为默认卡片 List；function 完全接管；string 从 preset 按名称查找；支持 mobileSortToolbar 排序工具栏
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView, preset } = _TablePage;
const { Flex, Tag, Card, Button, Dropdown, Tabs, Checkbox, Radio } = antd;
const { useState, useMemo } = React;

const statusMap = {
  已完成: { color: 'success', text: '已完成' },
  处理中: { color: 'processing', text: '处理中' },
  待发货: { color: 'warning', text: '待发货' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '13800138000',
    amount: 42500,
    status: '已完成'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '13900149000',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '13700157000',
    amount: 120000,
    status: '待发货'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 120, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 220, renderType: 'main', sort: true },
  { name: 'contact', title: '联系人', width: 80 },
  { name: 'phone', title: '联系电话', width: 130, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额',
    width: 120,
    sort: true,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => ({ type: statusMap[item.status]?.color || 'default', text: item.status })
  },
  {
    name: 'options',
    title: '操作',
    width: 140,
    renderType: 'options',
    getValueOf: item => [
      { children: '查看', onClick: () => console.log('查看', item.id) },
      { children: '编辑', onClick: () => console.log('编辑', item.id) },
      { children: '删除', isDelete: true, message: &#96;确定删除 ${item.id} 吗？&#96;, onClick: () => console.log('删除', item.id) }
    ]
  }
];

preset({
  renderMobile: {
    orderCard: ({ renderBody, dataSource = [] }) => {
      const totalAmount = dataSource.reduce((sum, item) => sum + item.amount, 0);
      return (
        <div
          className="preset-order-card-example"
          style={{
            borderRadius: 12,
            background: '#f5f7fa',
            padding: 16
          }}
        >
          <style>{&#96;
            .preset-order-card-example .info-page-table-mobile-card:not(.is-mobile-card-selected):not(.is-mobile-card-selected-all) {
              background: linear-gradient(135deg, #ffffff 0%, #f9f0ff 52%, #eef2ff 100%) !important;
              border-color: #e8dfff !important;
            }
            .preset-order-card-example .info-page-table-mobile-card:not(.is-mobile-card-selected):not(.is-mobile-card-selected-all):hover {
              background: linear-gradient(135deg, #fafafa 0%, #f3ebff 52%, #e8eeff 100%) !important;
            }
          &#96;}</style>
          <div style={{ marginBottom: 16 }}>
            <Flex justify="space-between" align="center" gap={8} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>近期订单</div>
              <Tag color="purple" style={{ margin: 0, flexShrink: 0 }}>
                preset: orderCard
              </Tag>
            </Flex>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
              {dataSource.length} 笔 · 合计 ¥{totalAmount.toLocaleString()}
            </div>
          </div>
          <div
            className="info-page-table"
            style={{
              '--kne-table-cell-padding': '14px 8px'
            }}
          >
            {renderBody()}
          </div>
        </div>
      );
    }
  }
});

const formatPhone = phone => phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

const getOrderActions = item => [
  { key: 'view', label: '查看', onClick: () => console.log('查看', item.id) },
  { key: 'edit', label: '编辑', onClick: () => console.log('编辑', item.id) },
  { key: 'delete', label: '删除', danger: true, onClick: () => console.log('删除', item.id) }
];

const OrderMobileCard = ({ item, checked, disabled, onCheckChange, selectionType = 'checkbox' }) => {
  const status = statusMap[item.status] || { color: 'default', text: item.status };
  const actionItems = getOrderActions(item);
  const isSelected = checked;
  const SelectionControl = selectionType === 'radio' ? Radio : Checkbox;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        background: isSelected ? 'var(--primary-color-1, #e6f4ff)' : '#fff',
        borderRadius: 12,
        padding: 16,
        border: &#96;1px solid ${isSelected ? 'var(--primary-color-2, var(--primary-color, #1677ff))' : 'transparent'}&#96;,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        color: isSelected ? 'var(--primary-color, #1677ff)' : undefined,
        boxSizing: 'border-box'
      }}
    >
      <SelectionControl checked={checked} disabled={disabled} onChange={onCheckChange} style={{ marginTop: 2, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Flex justify="space-between" align="center" gap={8} style={{ marginBottom: 10 }}>
          <Flex align="center" gap={8} wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
            <Tag color={status.color} style={{ margin: 0 }}>
              {status.text}
            </Tag>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{item.id}</span>
          </Flex>
          <Dropdown
            trigger={['click']}
            menu={{
              items: actionItems.map(({ key, label, danger, onClick }) => ({
                key,
                label,
                danger,
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  onClick();
                }
              }))
            }}
          >
            <Button type="text" size="small" style={{ padding: '0 4px' }} onClick={e => e.stopPropagation()}>
              ···
            </Button>
          </Dropdown>
        </Flex>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'rgba(0,0,0,0.88)',
            lineHeight: 1.5,
            marginBottom: 6
          }}
        >
          {item.customerName}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
          {item.contact} · {formatPhone(item.phone)}
        </div>
        <Flex
          justify="space-between"
          align="center"
          gap={12}
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px solid #f0f0f0'
          }}
        >
          <Flex align="baseline" gap={6} style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', flexShrink: 0 }}>订单金额</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#1677ff' }}>¥{item.amount.toLocaleString()}</span>
          </Flex>
          <Flex gap={4} align="center" style={{ flexShrink: 0 }}>
            {actionItems.slice(0, 2).map(({ key, label, onClick }) => (
              <Button
                key={key}
                type="link"
                size="small"
                style={{ padding: '0 4px', height: 'auto' }}
                onClick={e => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                {label}
              </Button>
            ))}
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

const DefaultMobileCards = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        <code>renderMobile={'{true}'}</code>：移动端启用默认卡片 List，不再渲染 antd Table；
        开启 <code>allowSelectedAll</code> 后顶部工具栏左侧显示全选。请用示例预览的手机模式查看效果。
      </div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
        </span>
      </Flex>
      <Component
        dataSource={dataSource}
        columns={columns}
        size="large"
        controllerOpen={false}
        renderMobile
        rowSelection={{
          type: 'checkbox',
          allowSelectedAll: true,
          selectedRowKeys: selectKeys,
          onChange: keys => setSelectKeys(keys)
        }}
      />
    </div>
  );
};

const SortState = ({ sort }) => (
  <div style={{ marginBottom: 12, padding: '10px 12px', background: '#f5f5f5', borderRadius: 8, fontSize: 13 }}>
    当前排序：
    {sort.length ? (
      <span>
        {sort.map(item => (
          <Tag key={item.name} color="blue" style={{ marginLeft: 8 }}>
            {item.name} {item.sort}
          </Tag>
        ))}
      </span>
    ) : (
      <span style={{ marginLeft: 8, color: '#999' }}>无</span>
    )}
  </div>
);

const MobileSortWithSelectAll = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Component
      dataSource={sortedData}
      columns={columns}
      size="large"
      controllerOpen={false}
      renderMobile
      sortRender={sortRender}
      mobileSortToolbar={mobileSortToolbar}
      rowSelection={{
        type: 'checkbox',
        allowSelectedAll: true,
        selectedRowKeys: selectKeys,
        onChange: keys => setSelectKeys(keys)
      }}
    />
  );
};

const MobileSortExample = ({ Component }) => {
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({
    defaultSort: [{ name: 'amount', sort: 'DESC' }],
    onSortChange: value => console.log('移动端排序变更:', value)
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Flex vertical gap={24}>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          移动端排序：列配置 <code>sort: true</code>，配合 <code>Table.useSort</code> 传入 <code>mobileSortToolbar</code>。
          工具栏居右，可选择排序列并切换升序 / 降序；再次点击当前方向或下拉选「取消排序」可清除。数据需自行用 <code>sortDataSource</code> 排序。
        </div>
        <SortState sort={sort} />
        <Component
          dataSource={sortedData}
          columns={columns}
          size="large"
          controllerOpen={false}
          renderMobile
          sortRender={sortRender}
          mobileSortToolbar={mobileSortToolbar}
        />
      </div>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          排序与全选同时开启：工具栏左侧全选、右侧排序。
        </div>
        <MobileSortWithSelectAll Component={Component} />
      </div>
    </Flex>
  );
};

const CustomMobileRender = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);
  const totalAmount = dataSource.reduce((sum, item) => sum + item.amount, 0);
  const selectedAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        <code>renderMobile</code> 为 function 时完全接管渲染，可自定义卡片内容；
        全选 / 排序请用回调里的 <code>renderToolbar()</code>（与默认 MobileCard 同一套实现），
        行勾选用 <code>getSelectionProps(item)</code>，不必自己维护全选状态或排序 UI。
        桌面端仍走 <code>render</code>。
      </div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          已选 <strong>{selectKeys.length}</strong> 个订单，金额 <strong style={{ color: '#52c41a' }}>¥{selectedAmount.toLocaleString()}</strong>
        </span>
      </Flex>
      <Card size="small" title="近期订单" extra={<Tag>桌面 render</Tag>} styles={{ body: { padding: 0 } }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ padding: '12px 16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}
        >
          <Flex gap={8} align="center">
            <Tag color="blue">{dataSource.length} 笔</Tag>
            <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: 13 }}>
              合计 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
            </span>
          </Flex>
          <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>桌面端 render 自定义外层</span>
        </Flex>
        <Component
          dataSource={sortedData}
          columns={columns}
          controllerOpen={false}
          sortRender={sortRender}
          mobileSortToolbar={mobileSortToolbar}
          rowSelection={{
            type: 'checkbox',
            allowSelectedAll: true,
            selectedRowKeys: selectKeys,
            onChange: keys => setSelectKeys(keys)
          }}
          render={({ renderBody }) => <div style={{ overflowX: 'auto' }}>{renderBody()}</div>}
          renderMobile={({ dataSource: mobileList = [], renderToolbar, getSelectionProps, getRowKey }) => (
            <div
              style={{
                borderRadius: 12,
                background: '#f5f7fa',
                padding: 16
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <Flex justify="space-between" align="center" gap={8} style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>近期订单</div>
                  <Tag color="processing" style={{ margin: 0, flexShrink: 0 }}>
                    renderMobile
                  </Tag>
                </Flex>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                  {mobileList.length} 笔 · 合计 ¥{mobileList.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </div>
              </div>
              {renderToolbar()}
              <Flex vertical gap={12} style={{ marginTop: 12 }}>
                {mobileList.map(item => {
                  const selection = getSelectionProps(item);
                  return (
                    <OrderMobileCard
                      key={getRowKey(item)}
                      item={item}
                      checked={selection.checked}
                      disabled={selection.disabled}
                      onCheckChange={selection.onChange}
                    />
                  );
                })}
              </Flex>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

const CustomMobileRadioRender = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);
  const selectedOrder = dataSource.find(item => item.id === selectKeys[0]);

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        自定义 <code>renderMobile</code> 单选：<code>rowSelection.type</code> 设为 <code>radio</code>，
        卡片上的 Radio 直接绑 <code>getSelectionProps(item)</code>，选中态与切换逻辑由 TableView 管理；
        工具栏 <code>renderToolbar()</code> 此时仅显示排序（单选无全选）。
      </div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          当前选中：
          {selectedOrder ? (
            <strong>
              {selectedOrder.id} · ¥{selectedOrder.amount.toLocaleString()}
            </strong>
          ) : (
            <span style={{ color: '#999' }}>未选择</span>
          )}
        </span>
      </Flex>
      <Component
        dataSource={sortedData}
        columns={columns}
        controllerOpen={false}
        sortRender={sortRender}
        mobileSortToolbar={mobileSortToolbar}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectKeys,
          onChange: keys => setSelectKeys(keys)
        }}
        renderMobile={({ dataSource: mobileList = [], renderToolbar, getSelectionProps, getRowKey }) => (
          <div
            style={{
              borderRadius: 12,
              background: '#f5f7fa',
              padding: 16
            }}
          >
            {renderToolbar()}
            <Flex vertical gap={12} style={{ marginTop: 12 }}>
              {mobileList.map(item => {
                const selection = getSelectionProps(item);
                return (
                  <OrderMobileCard
                    key={getRowKey(item)}
                    item={item}
                    selectionType="radio"
                    checked={selection.checked}
                    disabled={selection.disabled}
                    onCheckChange={selection.onChange}
                  />
                );
              })}
            </Flex>
          </div>
        )}
      />
    </div>
  );
};

const PresetStringRender = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({
    defaultSort: [{ name: 'amount', sort: 'DESC' }]
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Flex vertical gap={24}>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          <code>renderMobile="orderCard"</code>：通过 <code>preset({'{ renderMobile }'})</code> 注册名称对应的渲染函数；
          仅移动端生效，支持全选与选中样式。可配合 <code>mobileSortToolbar</code> 开启排序。
        </div>
        <Component
          dataSource={sortedData}
          columns={columns}
          controllerOpen={false}
          size="large"
          renderMobile="orderCard"
          sortRender={sortRender}
          mobileSortToolbar={mobileSortToolbar}
          rowSelection={{
            type: 'checkbox',
            allowSelectedAll: true,
            selectedRowKeys: selectKeys,
            onChange: keys => setSelectKeys(keys)
          }}
        />
      </div>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          <code>renderMobile="notRegistered"</code>：preset 中未注册时视为未开启，移动端仍显示普通表格。
        </div>
        <Component dataSource={dataSource} columns={columns} controllerOpen={false} renderMobile="notRegistered" />
      </div>
    </Flex>
  );
};

const Examples = ({ Component }) => (
  <Flex vertical gap={32}>
    <DefaultMobileCards Component={Component} />
    <MobileSortExample Component={Component} />
    <CustomMobileRender Component={Component} />
    <CustomMobileRadioRender Component={Component} />
    <PresetStringRender Component={Component} />
  </Flex>
);

const BaseExample = () => {
  return (
    <Tabs
      items={[
        { key: 'table', label: 'Table', children: <Examples Component={Table} /> },
        { key: 'table-view', label: 'TableView', children: <Examples Component={TableView} /> }
      ]}
    />
  );
};

render(<BaseExample />);


```

- column config
- 列宽拖动调整、显示/隐藏字段、列排序与 localStorage 持久化（仅 Table）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table } = _TablePage;
const { Flex, Tag } = antd;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '13800138000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    remark: '客户要求春节前完成交付，需协调物流加急处理。'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '13900149000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20',
    remark: '项目处于需求评审阶段，待客户确认最终配置清单。'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '13700157000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22',
    remark: '已完成付款，仓库正在拣货。'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '13600166000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16',
    remark: '常规订单，按标准流程处理。'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 160, min: 120, max: 240, fixed: 'left', renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 200, min: 140, max: 360, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 90, min: 70, max: 160 },
  { name: 'phone', title: '联系电话', width: 130, min: 110, max: 180, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 130,
    min: 100,
    max: 200,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 110, min: 90, max: 160, format: 'date' },
  { name: 'deliveryDate', title: '预计送达', width: 110, min: 90, max: 160, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    min: 80,
    max: 140,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'remark', title: '备注', width: 200, min: 120, max: 400, hidden: true, renderType: 'description' }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">列宽拖动</Tag>
      鼠标悬停表头列右侧，出现拖动手柄后可左右拖动调整列宽（受 <code>min</code> / <code>max</code> 约束）。仅 <code>Table</code> 组件支持。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">显示/隐藏</Tag>
      点击最后一列表头的 <strong>设置图标</strong>，可勾选显示或隐藏列、拖拽排序；配置通过 <code>name</code> 持久化到 localStorage。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">默认隐藏</Tag>
      本示例中「备注」列设置了 <code>hidden: true</code>，可在列配置面板中重新显示。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="purple">固定列</Tag>
      「订单编号」设置了 <code>fixed: 'left'</code>，固定显示且不可隐藏。
    </div>
  </div>
);

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Tips />
      <Table name="demo-table-column-config" controllerOpen dataSource={dataSource} columns={columns} />
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>关闭列配置（controllerOpen=false）</div>
        <Table dataSource={dataSource.slice(0, 2)} columns={columns} controllerOpen={false} />
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- group header
- 分组表头（groupHeader），实现多级表头结构，可与 useSort 配合使用（仅 Table）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table } = _TablePage;
const { Flex, Tag } = antd;
const { useMemo } = React;

const dataSource = [
  {
    id: 'SALE001',
    region: '华北区',
    province: '北京',
    city: '北京',
    productName: '企业版 SaaS',
    productCode: 'SAAS-ENT',
    salesAmount: 1250000,
    salesVolume: 50,
    growthRate: 23.5,
    marketShare: 18.2,
    customerCount: 128,
    newCustomerCount: 32,
    repurchaseRate: 85.5,
    avgOrderValue: 9765.6,
    targetCompletion: 92.5
  },
  {
    id: 'SALE002',
    region: '华东区',
    province: '上海',
    city: '上海',
    productName: '企业版 SaaS',
    productCode: 'SAAS-ENT',
    salesAmount: 1680000,
    salesVolume: 68,
    growthRate: 35.2,
    marketShare: 22.8,
    customerCount: 156,
    newCustomerCount: 45,
    repurchaseRate: 88.6,
    avgOrderValue: 24705.9,
    targetCompletion: 105.2
  },
  {
    id: 'SALE003',
    region: '华南区',
    province: '广东',
    city: '深圳',
    productName: '专业版 SaaS',
    productCode: 'SAAS-PRO',
    salesAmount: 980000,
    salesVolume: 95,
    growthRate: 28.6,
    marketShare: 16.3,
    customerCount: 112,
    newCustomerCount: 28,
    repurchaseRate: 82.4,
    avgOrderValue: 10315.8,
    targetCompletion: 95.8
  }
];

const growthRateRender = value => (
  <span style={{ color: value > 20 ? '#52c41a' : value > 10 ? '#1677ff' : '#faad14' }}>{value}%</span>
);

const columns = [
  {
    name: 'region',
    title: '大区',
    width: 100,
    groupHeader: [{ name: 'area', title: '区域信息' }]
  },
  {
    name: 'province',
    title: '省份',
    width: 100,
    groupHeader: [{ name: 'area', title: '区域信息' }]
  },
  {
    name: 'city',
    title: '城市',
    width: 100,
    groupHeader: [{ name: 'area', title: '区域信息' }]
  },
  {
    name: 'productName',
    title: '产品名称',
    width: 150,
    renderType: 'main',
    groupHeader: [{ name: 'product', title: '产品信息' }]
  },
  {
    name: 'productCode',
    title: '产品编码',
    width: 130,
    groupHeader: [{ name: 'product', title: '产品信息' }]
  },
  {
    name: 'salesAmount',
    title: '销售金额',
    width: 130,
    sort: { single: true },
    render: value => <strong style={{ color: '#f5222d' }}>¥{(value / 10000).toFixed(2)}万</strong>,
    groupHeader: [{ name: 'sales', title: '销售业绩' }]
  },
  {
    name: 'salesVolume',
    title: '销售数量',
    width: 110,
    sort: true,
    groupHeader: [{ name: 'sales', title: '销售业绩' }]
  },
  {
    name: 'growthRate',
    title: '增长率',
    width: 110,
    sort: true,
    render: growthRateRender,
    groupHeader: [{ name: 'sales', title: '销售业绩' }]
  },
  {
    name: 'marketShare',
    title: '市场份额',
    width: 110,
    sort: true,
    render: value => &#96;${value}%&#96;,
    groupHeader: [{ name: 'market', title: '市场分析' }]
  },
  {
    name: 'customerCount',
    title: '客户总数',
    width: 110,
    sort: true,
    groupHeader: [{ name: 'market', title: '市场分析' }]
  },
  {
    name: 'newCustomerCount',
    title: '新增客户',
    width: 110,
    sort: true,
    groupHeader: [{ name: 'market', title: '市场分析' }]
  },
  {
    name: 'repurchaseRate',
    title: '复购率',
    width: 110,
    render: value => &#96;${value}%&#96;,
    groupHeader: [{ name: 'customer', title: '客户指标' }]
  },
  {
    name: 'avgOrderValue',
    title: '客单价',
    width: 120,
    render: value => &#96;¥${value.toLocaleString()}&#96;,
    groupHeader: [{ name: 'customer', title: '客户指标' }]
  },
  {
    name: 'targetCompletion',
    title: '目标完成率',
    width: 130,
    sort: true,
    render: value => (
      <span style={{ color: value >= 100 ? '#52c41a' : value >= 90 ? '#1677ff' : '#faad14' }}>{value}%</span>
    ),
    groupHeader: [{ name: 'target', title: '目标达成' }]
  }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">groupHeader</Tag>
      在列配置中通过 <code>groupHeader</code> 声明所属分组，相同 <code>name</code> 的列会自动合并为多级表头（仅 <code>Table</code> 支持）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">多级分组</Tag>
      <code>groupHeader</code> 为数组，按层级嵌套，例如{' '}
      <code>{&#96;[{ name: 'sales', title: '销售业绩' }, { name: 'detail', title: '明细' }]&#96;}</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">排序</Tag>
      分组表头可与 <code>useSort</code> 配合，排序按钮显示在叶子列表头。
    </div>
  </div>
);

const BaseExample = () => {
  const { sort, sortRender } = Table.useSort({
    onSortChange: value => console.log('排序变更:', value)
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Flex vertical gap={24}>
      <Tips />
      <Table dataSource={sortedData} columns={columns} sortRender={sortRender} scroll={{ x: 1600 }} />
    </Flex>
  );
};

render(<BaseExample />);


```

- size
- 单元格 padding 尺寸：默认 8px，small 为 4px，large 为 14px 8px；Table / TableView 均支持，可用 CSS 变量 --kne-table-cell-padding-* 覆盖
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Radio, Tabs } = antd;
const { useState } = React;

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    amount: 42500,
    status: '已完成'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    contact: '李四',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    amount: 120000,
    status: '待发货'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 120, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 220, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 80 },
  {
    name: 'amount',
    title: '订单金额',
    width: 120,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'status', title: '状态', width: 100 }
];

const SizeDemo = ({ Component, title, description, size }) => (
  <div>
    <div style={{ marginBottom: 8 }}>
      <strong>{title}</strong>
      <span style={{ marginLeft: 8, color: '#666', fontSize: 13 }}>{description}</span>
    </div>
    <Component dataSource={dataSource} columns={columns} size={size} controllerOpen={false} />
  </div>
);

const InteractiveSize = ({ Component }) => {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Flex align="center" gap={12} style={{ marginBottom: 12 }}>
        <strong>切换 size</strong>
        <Radio.Group
          optionType="button"
          value={size}
          onChange={e => setSize(e.target.value)}
          options={[
            { label: 'default (8px)', value: 'default' },
            { label: 'small (4px)', value: 'small' },
            { label: 'large (14px 8px)', value: 'large' }
          ]}
        />
      </Flex>
      <Component dataSource={dataSource} columns={columns} size={size === 'default' ? undefined : size} controllerOpen={false} />
    </div>
  );
};

const SizeExamples = ({ Component }) => (
  <Flex vertical gap={24}>
    <InteractiveSize Component={Component} />
    <SizeDemo Component={Component} title="default" description="padding: 8px" />
    <SizeDemo Component={Component} title='size="small"' description="padding: 4px" size="small" />
    <SizeDemo Component={Component} title='size="large"' description="padding: 14px 8px" size="large" />
    <div>
      <div style={{ marginBottom: 8 }}>
        <strong>CSS 变量覆盖</strong>
        <span style={{ marginLeft: 8, color: '#666', fontSize: 13 }}>
          --kne-table-cell-padding-default: 12px 16px
        </span>
      </div>
      <div style={{ '--kne-table-cell-padding-default': '12px 16px' }}>
        <Component dataSource={dataSource} columns={columns} controllerOpen={false} />
      </div>
    </div>
  </Flex>
);

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: 8, fontSize: 13 }}>
        <div>
          <code>size</code> 控制单元格 padding：默认 <code>8px</code>，<code>small</code> 为 <code>4px</code>，
          <code>large</code> 为 <code>14px 8px</code>
        </div>
        <div style={{ marginTop: 4, color: '#666' }}>
          可通过 CSS 变量覆盖：
          <code>--kne-table-cell-padding-default</code> /
          <code>--kne-table-cell-padding-small</code> /
          <code>--kne-table-cell-padding-large</code>，或直接设
          <code>--kne-table-cell-padding</code>
        </div>
      </div>

      <Tabs
        items={[
          {
            key: 'table',
            label: 'Table',
            children: <SizeExamples Component={Table} />
          },
          {
            key: 'tableView',
            label: 'TableView',
            children: <SizeExamples Component={TableView} />
          }
        ]}
      />
    </Flex>
  );
};

render(<BaseExample />);


```

- 扩展 renderType
- 展示 TablePage 通过 preset 扩展的列渲染类型：enum / enumList（Enum 组件）、avatar / avatarList（Image.Avatar、Avatar.Group）、file / fileList（FileLink）。配合 getValueOf 与 moduleName 声明式配置列展示。
- _TablePage(@components/TablePage),_Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { default: TablePage } = _TablePage;
const { Flex, Typography, Divider } = antd;

const avatar = seed => &#96;https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&#96;;

const dataSource = [
  {
    id: '333930522600276992',
    name: '客户门户改版',
    status: 'active',
    tagIds: ['urgent', 'design', 'frontend'],
    ownerName: '张明',
    ownerAvatar: avatar('ZhangMing'),
    members: [
      { name: '张明', avatar: avatar('ZhangMing') },
      { name: '李婷', avatar: avatar('LiTing') },
      { name: '王强', avatar: avatar('WangQiang') },
      { name: '赵敏', avatar: avatar('ZhaoMin') },
      { name: '孙杰', avatar: avatar('SunJie') }
    ],
    contractName: '服务合同-2024.pdf',
    contractUrl: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
    attachments: [
      {
        id: 'file-001',
        filename: '需求说明.docx',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-01-10',
        userName: '张明'
      },
      {
        id: 'file-002',
        filename: '原型稿.fig',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-01-12',
        userName: '李婷'
      }
    ]
  },
  {
    id: '333930522600276993',
    name: '移动端性能优化',
    status: 'draft',
    tagIds: ['backend', 'performance'],
    ownerName: '李婷',
    ownerAvatar: avatar('LiTing'),
    members: [
      { name: '李婷', avatar: avatar('LiTing') },
      { name: '王强', avatar: avatar('WangQiang') }
    ],
    contractName: '技术优化协议.pdf',
    contractUrl: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
    attachments: [
      {
        id: 'file-003',
        filename: '性能报告.xlsx',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-02-01',
        userName: '王强'
      }
    ]
  },
  {
    id: '333930522600276994',
    name: '数据中台建设',
    status: 'done',
    tagIds: ['backend', 'data'],
    ownerName: '王强',
    ownerAvatar: avatar('WangQiang'),
    members: [
      { name: '王强', avatar: avatar('WangQiang') },
      { name: '赵敏', avatar: avatar('ZhaoMin') },
      { name: '孙杰', avatar: avatar('SunJie') }
    ],
    contractName: '数据平台合同.pdf',
    contractUrl: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
    attachments: [
      {
        id: 'file-004',
        filename: '架构设计.pdf',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-03-05',
        userName: '王强'
      },
      {
        id: 'file-005',
        filename: '接口清单.csv',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-03-08',
        userName: '赵敏'
      },
      {
        id: 'file-006',
        filename: '验收标准.docx',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-03-10',
        userName: '孙杰'
      }
    ]
  }
];

const columns = [
  { name: 'id', title: '项目编号', renderType: 'id', fixed: 'left' },
  {
    name: 'name',
    title: '项目名称',
    width: 200,
    renderType: 'main',
    onClick: ({ colItem }) => {
      console.log('open project', colItem.id);
    }
  },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'enum',
    moduleName: 'projectStatus',
    getValueOf: item => item.status
  },
  {
    name: 'tagIds',
    title: '标签',
    width: 220,
    renderType: 'enumList',
    moduleName: 'projectTags',
    getValueOf: item => item.tagIds
  },
  {
    name: 'owner',
    title: '负责人',
    width: 80,
    renderType: 'avatar',
    avatarSize: 32,
    getValueOf: item => ({
      src: item.ownerAvatar,
      alt: item.ownerName
    })
  },
  {
    name: 'members',
    title: '成员',
    width: 160,
    renderType: 'avatarList',
    avatarSize: 28,
    getValueOf: item => ({
      list: item.members.map(member => ({
        src: member.avatar,
        alt: member.name
      })),
      maxCount: 4
    })
  },
  {
    name: 'contract',
    title: '合同',
    width: 180,
    renderType: 'file',
    getValueOf: item => ({
      url: item.contractUrl,
      filename: item.contractName
    })
  },
  {
    name: 'attachments',
    title: '附件',
    width: 320,
    renderType: 'fileList',
    getValueOf: item => item.attachments
  }
];

const BaseExample = () => (
  <PureGlobal
    preset={{
      locale: 'zh-CN',
      enums: {
        projectStatus: [
          { value: 'draft', description: '草稿', type: 'default' },
          { value: 'active', description: '进行中', type: 'processing' },
          { value: 'done', description: '已完成', type: 'success' }
        ],
        projectTags: [
          { value: 'urgent', description: '紧急', type: 'error' },
          { value: 'design', description: '设计', type: 'processing' },
          { value: 'frontend', description: '前端', type: 'success' },
          { value: 'backend', description: '后端', type: 'warning' },
          { value: 'performance', description: '性能', type: 'default' },
          { value: 'data', description: '数据', type: 'processing' }
        ]
      },
      apis: {
        file: {
          staticUrl: window.PUBLIC_URL || '/',
          getUrl: {
            loader: async ({ params }) => {
              return &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;;
            }
          }
        }
      }
    }}
  >
    <Flex vertical gap={16}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          TablePage 扩展 renderType
        </Typography.Title>
        <p>
          通过 <code>preset</code> 扩展列渲染类型，结合 <code>getValueOf</code> 声明数据结构即可渲染，无需手写{' '}
          <code>render</code>：
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>
            <code>enum</code> — 使用 <code>Enum</code> + <code>StateTag</code>，列配置 <code>moduleName</code>
          </li>
          <li>
            <code>enumList</code> — 多个枚举标签列表
          </li>
          <li>
            <code>avatar</code> — 使用 <code>Image.Avatar</code>
          </li>
          <li>
            <code>avatarList</code> — 使用 <code>Avatar.Group</code> + <code>Image.Avatar</code>
          </li>
          <li>
            <code>file</code> — 使用 <code>FileLink</code> 展示单个文件
          </li>
          <li>
            <code>fileList</code> — 使用多个 <code>FileLink</code> 展示附件列表
          </li>
        </ul>
      </div>
      <Divider style={{ margin: 0 }} />
      <TablePage
        name="demo-table-page-render-types"
        controllerOpen={false}
        scroll={{ x: 1500 }}
        pagination={false}
        dataFormat={data => ({
          list: data.pageData,
          total: data.totalCount,
          data
        })}
        loader={() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve({
                pageData: dataSource,
                totalCount: dataSource.length
              });
            }, 200);
          })
        }
        columns={columns}
      />
    </Flex>
  </PureGlobal>
);

render(<BaseExample />);

```

- Features 权限控制
- 展示 TablePage 的 featureId 与 Features 配合：通过配置面板切换功能开关、调整 options/rejectedOptions.hiddenColumns，表格列会实时响应变化。业务场景：员工管理系统中不同角色看到不同字段。
- _TablePage(@components/TablePage),_Global(@components/Global),_Features(@components/Features),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { useFeatureCall } = _Features;
const { default: TablePage } = _TablePage;
const { Flex, Tag, Alert, Card, Switch, Checkbox, Space, Typography, Divider } = antd;
const { useMemo, useState } = React;

const TOTAL = 80;

const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

const surnames = ['张', '李', '王', '刘', '陈'];
const givenNames = ['伟', '强', '敏', '磊', '杰', '婷', '娜', '静', '丽', '娟'];
const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];
const positions = ['工程师', '高级工程师', '经理', '总监', '专员'];
const educations = ['本科', '硕士', '博士', '大专'];

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  resigned: { type: 'default', text: '离职' },
  probation: { type: 'processing', text: '试用期' }
};

const COLUMN_OPTIONS = [
  { label: '入职日期', value: 'joinDate' },
  { label: '工龄', value: 'workYears' },
  { label: '学历', value: 'education' },
  { label: '薪资范围', value: 'salary' }
];

const buildEmployee = index => {
  const statusKeys = ['active', 'vacation', 'resigned', 'probation'];
  return {
    id: &#96;EMP${String(index + 1).padStart(4, '0')}&#96;,
    employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, '0')}&#96;,
    name: &#96;${surnames[index % surnames.length]}${givenNames[index % givenNames.length]}&#96;,
    department: departments[index % departments.length],
    position: positions[index % positions.length],
    status: statusKeys[index % statusKeys.length],
    joinDate: &#96;2023-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}&#96;,
    workYears: Math.floor(index / 12) + 1,
    salary: &#96;${15 + (index % 20)}K-${20 + (index % 20)}K&#96;,
    education: educations[index % educations.length]
  };
};

const allEmployees = range(0, TOTAL).map(buildEmployee);

const columns = [
  { name: 'employeeNo', title: '工号', width: 160, min: 120, max: 220, fixed: 'left', renderType: 'small' },
  { name: 'name', title: '姓名', width: 100, renderType: 'main' },
  { name: 'department', title: '部门', width: 150 },
  { name: 'position', title: '职位', width: 120 },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'joinDate', title: '入职日期', width: 120, format: 'date' },
  { name: 'workYears', title: '工龄', width: 90, render: value => &#96;${value}年&#96; },
  { name: 'education', title: '学历', width: 90 },
  { name: 'salary', title: '薪资范围', width: 120 }
];

const columnTitleMap = columns.reduce((result, column) => {
  result[column.name] = column.title;
  return result;
}, {});

const FeatureRuntimeStatus = () => {
  const { isPass, feature, currentId } = useFeatureCall('employee-list');
  const runtimeOptions = isPass ? feature?.options : feature?.rejectedOptions;
  const runtimeHiddenColumns = runtimeOptions?.hiddenColumns || [];

  return (
    <Alert
      type={isPass ? 'success' : 'warning'}
      showIcon
      message={&#96;Features 运行时：${isPass ? '功能已开启，展示 TablePage' : '功能已关闭，TablePage 显示 403'}&#96;}
      description={
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <div>
            <Typography.Text type="secondary">currentId：</Typography.Text>
            <Typography.Text code style={{ marginLeft: 8 }}>
              {currentId}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">hiddenColumns：</Typography.Text>
            {runtimeHiddenColumns.length ? (
              runtimeHiddenColumns.map(name => (
                <Tag key={name} color="orange" style={{ marginLeft: 8 }}>
                  {columnTitleMap[name] || name}
                </Tag>
              ))
            ) : (
              <Tag color="green" style={{ marginLeft: 8 }}>
                无
              </Tag>
            )}
          </div>
        </Space>
      }
    />
  );
};

const FeatureControls = ({
  featureEnabled,
  onFeatureEnabledChange,
  hiddenColumns,
  onHiddenColumnsChange
}) => (
  <Card title="Features 配置面板" size="small">
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Flex align="center" gap={12}>
        <Switch checked={featureEnabled} onChange={onFeatureEnabledChange} />
        <span>
          员工列表功能：
          <Tag color={featureEnabled ? 'success' : 'error'} style={{ marginLeft: 8 }}>
            {featureEnabled ? '开启' : '关闭（TablePage 不可见）'}
          </Tag>
        </span>
      </Flex>

      <div>
        <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
          options.hiddenColumns — 功能开启时隐藏无权限列：
        </Typography.Text>
        <Checkbox.Group
          options={COLUMN_OPTIONS}
          value={hiddenColumns}
          disabled={!featureEnabled}
          onChange={onHiddenColumnsChange}
        />
      </div>

      <Divider style={{ margin: 0 }} />

      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
        关闭功能开关后，下方 TablePage 区域将显示 403；开启后按 hiddenColumns 隐藏对应列（默认隐藏工龄、学历）。
      </Typography.Text>
    </Space>
  </Card>
);

const BaseExample = () => {
  const [featureEnabled, setFeatureEnabled] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState(['workYears', 'education']);

  const preset = useMemo(
    () => ({
      features: {
        debug: true,
        profile: {
          id: 'employee-management',
          type: 'system',
          name: '员工管理系统',
          children: [
            {
              id: 'employee-list',
              type: 'feature',
              name: '员工列表',
              close: !featureEnabled,
              options: {
                hiddenColumns: [...hiddenColumns]
              },
              rejectedOptions: {
                hiddenColumns: ['joinDate', 'workYears', 'education', 'salary']
              }
            }
          ]
        }
      }
    }),
    [featureEnabled, hiddenColumns]
  );

  return (
    <PureGlobal preset={preset}>
      <Flex vertical gap={16}>
        <FeatureControls
          featureEnabled={featureEnabled}
          onFeatureEnabledChange={setFeatureEnabled}
          hiddenColumns={hiddenColumns}
          onHiddenColumnsChange={setHiddenColumns}
        />
        <FeatureRuntimeStatus />
        <TablePage
          featureId="employee-list"
          featureRejectedText="暂无员工列表访问权限"
          name="demo-table-page-features"
          controllerOpen={false}
          scroll={{ x: 1000 }}
          pagination={{
            open: true,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '50']
          }}
          dataFormat={data => ({
            list: data.pageData,
            total: data.totalCount,
            data
          })}
          loader={({ data }) => {
            const currentPage = Number(data?.currentPage) || 1;
            const perPage = Number(data?.perPage) || 10;
            const startIndex = (currentPage - 1) * perPage;

            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  pageData: allEmployees.slice(startIndex, startIndex + perPage),
                  totalCount: allEmployees.length
                });
              }, 300);
            });
          }}
          columns={columns}
        />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

### API

### TablePage

表格页面组件，基于 `@kne/react-fetch` 的 `withFetch` 封装数据请求逻辑，内部使用 `Table` 渲染列表，并内置分页能力。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loader | function | - | 数据加载函数，参数为 fetch 请求上下文，需返回 `{ pageData, totalCount }` 或自定义结构（配合 `dataFormat`） |
| url | string | - | 请求地址，与 `loader` 二选一，透传给 `@kne/react-fetch` |
| data | object | - | POST 请求体，默认分页参数挂在 `data.currentPage`、`data.perPage` |
| dataFormat | function | `(data) => ({ list: data.pageData, total: data.totalCount })` | 将接口数据转为 `{ list, total }` 供表格使用 |
| pagination | object | 见下方 | 分页配置 |
| name | string | - | 表格唯一标识，用于列配置持久化，同 `Table` 的 `name` |
| columns | array \| function | - | 列配置，见 TableView 的 columns 说明；也可传入函数 `(data) => columns` |
| getColumns | function | - | 根据接口数据动态生成列配置 |
| sticky | boolean | - | 是否启用粘性表头，仅 `renderType="Table"` 时生效 |
| scrollTopInset | number \| string | - | 滚动容器顶部占位高度（如固定导航高度），用于吸顶表头 `top` 偏移、`scroll-margin-top` 与翻页滚回；支持 `56` / `'56px'` |
| getScrollContainer | function | - | 页面级滚动容器；用于吸顶表头 `getContainer`、浮动横向滚动条定位与翻页滚回 |
| renderType | `'Table'` \| `'TableView'` | `'Table'` | 表格渲染类型 |
| horizontalScroller | boolean | `true` | 是否启用底部浮动横向滚动条（仅 `renderType="Table"` 且表格存在横向滚动时生效） |
| summary | function | - | 总结栏，回调参数包含 `data`、`requestParams`、`refresh`、`reload` 等 fetch 上下文 |
| columnRenderProps | object | `{}` | 列渲染扩展属性，会合并进列 `render` 的 context |
| filter | object | - | 顶部筛选器配置，基于 `@kne/react-filter` 的 `FilterLines`，见下方 |
| search | object | - | 顶部搜索框配置，基于 `@kne/react-filter` 的 `SearchInput`，见下方；移动端 `renderMobile` 激活时，工具栏与下方卡片列表保留间距（勿紧贴） |
| tab | object | - | 顶部 Tab 分类切换，选中值写入 filter value，见下方 |
| tabProps | object | - | 透传给 antd `Tabs` 的额外属性（如 `tabBarExtraContent`） |
| batchActions | array | - | 批量操作下拉菜单项，需配合 `rowSelection` 使用，见下方 |
| buttonGroup | object | - | 操作按钮组，透传 `@kne/button-group` 的 `ButtonGroup` 属性；桌面端显示在 `SearchInput` 右侧，移动端与筛选同行（筛选靠左、按钮组靠右） |
| renderCard | boolean \| function \| string | - | PC 端卡片渲染，取值与 `renderMobile` 一致：`true` 使用默认卡片 List；function 完全接管渲染（签名同 `renderMobile`）；string 从 `preset({ renderCard })` 按名称取渲染函数，未注册则视为未开启。生效后可在表格/卡片间切换，切换状态按 `name` 存 localStorage（未传 `name` 则不持久化）；卡片模式下外框透明，数据默认触底下拉加载；移动端忽略 |
| forceCard | boolean | `false` | 与 `renderCard` 配合：为 `true` 时强制卡片模式，不显示切换按钮 |
| selectedRows | array | - | 已选行数据，传给 `batchActions` 的 `onClick` 上下文 |
| className | string | - | 自定义类名 |
| ...fetchProps | - | - | 其余属性透传给 `@kne/react-fetch`（如 `url`、`params`、`auto` 等） |
| ...tableProps | - | - | 其余属性透传给内部 `Table` / `TableView`（如 `rowKey`、`rowSelection`、`scroll`、`size`、`renderMobile`、`sortRender`、`mobileSortToolbar`、`dataType`、`expandedKeys`、`onLoadChildren` 等树形属性） |

#### pagination

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | boolean | `true` | 是否开启分页 |
| paramsType | string | `'data'` | 分页参数挂载的请求参数类型 |
| currentName | string | `'currentPage'` | 当前页参数字段名 |
| pageSizeName | string | `'perPage'` | 每页条数字段名 |
| requestType | `'reload'` \| `'refresh'` | `'reload'` | 翻页时的请求方式，`reload` 不切换 loading，`refresh` 会重新 loading |
| showSizeChanger | boolean | `true` | 是否展示每页条数切换 |
| showQuickJumper | boolean | `true` | 是否展示快速跳转 |
| hideOnSinglePage | boolean | `false` | 仅一页时是否隐藏分页器 |
| pageSizeOptions | array | - | 每页条数选项 |
| pageSize | number | `50` | 默认每页条数，会持久化到 localStorage |
| showTotal | function | - | 自定义总数展示 `(total) => ReactNode` |
| onChange | function | - | 自定义翻页回调 `(page, size) => void`，传入后覆盖默认请求逻辑 |
| onShowSizeChange | function | - | 每页条数变化回调，组件内部已处理持久化 |
| forcePagination | boolean | `false` | 移动端（`renderMobile` 激活时）与 PC 卡片模式（`renderCard` 生效且切到卡片视图时）默认改为触底下拉加载；设为 `true` 时强制仍使用分页器 |
| mergeList | function | 合并 `pageData` | 下拉加载时合并新旧数据 `(prev, next) => data`，需与 `loader` 返回结构一致 |
| loadMore | object | - | 透传给 `@kne/scroll-loader` 的额外配置（如 `completeTips`、`maxFullCount`） |
| mobile | object | - | 强制分页时的移动端分页器微调（如 `showSizeChanger`、`showLessItems`） |

#### filter

顶部筛选器配置，传入后会在表格上方渲染筛选行（中间区域宽度撑满）。筛选值变化时自动 `reload` 并回到第 1 页，参数通过 `getFilterValue` 合并进 `data`。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | `Array<Array>` | - | 传给 `FilterLines` 的筛选项配置 |
| displayLine | number | `1` | 默认展示行数 |
| value | array | - | 受控筛选值 |
| defaultValue | array | `[]` | 默认筛选值，会合并进首次请求参数 |
| onChange | function | - | 筛选值变化回调 `(value) => void` |
| mapFilterValue | function | - | 自定义参数转换，默认 `getFilterValue` |

#### search

顶部关键词搜索配置，基于 `SearchInput`，与 `filter` 共享筛选值状态。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | - | 必填，写入筛选值的字段名 |
| label | string | - | 已选展示标签 |
| placeholder | string | - | 占位符 |
| searchDelay | number | `500` | 自动提交防抖时间（毫秒） |

#### buttonGroup

操作按钮组配置，透传给 `@kne/button-group` 的 `ButtonGroup`（如 `list`、`compact` 等）。

- 桌面端：显示在工具栏右侧（`SearchInput` 右侧）；默认 `size="small"`、至少展示 1 个按钮（`showLength` 默认 `1`）、「更多」为三点图标（`moreType="link"`）
- 移动端：与筛选同行两端对齐（筛选靠左、按钮组靠右），同样为 `size="small"`、外露 1 个主要按钮，其余收入「更多」；批量操作显示在「全选/排序」行的排序后面

```jsx
<TablePage
  search={{ name: 'keyword', label: '关键词' }}
  buttonGroup={{
    list: [
      { type: 'primary', children: '新建', onClick: () => {} },
      { children: '导出', onClick: () => {} }
    ]
  }}
  loader={...}
  columns={...}
/>
```

#### tab

顶部 Tab 分类切换。默认选中「全部」（不写入筛选值）；切换到具体项时，将 `{ name, label, value: { value, label } }` 写入 filter value，并触发 `reload` 回到第 1 页。桌面端显示在表格边框外侧上方；移动端（含 `renderMobile`）显示在 `SearchInput` 下方。选中值参与请求参数，但 Tab 本身已有选中态，不在已选筛选标签中重复展示。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | - | 必填，写入筛选值的字段名 |
| label | string | - | 筛选字段标签 |
| list | `Array<{ label, value }>` | - | Tab 选项列表 |

#### tabProps

透传给 antd `Tabs` 的额外属性。内部会覆盖 `activeKey`、`onChange`、`items`，其余如 `tabBarExtraContent`、`type` 等可自由传入。

```jsx
<TablePage
  tab={{
    name: 'position',
    label: '职位',
    list: [
      { label: '工程师', value: '工程师' },
      { label: '经理', value: '经理' }
    ]
  }}
  tabProps={{
    tabBarExtraContent: <Button type="link">新增职位</Button>
  }}
  search={{ name: 'keyword', label: '关键词' }}
  loader={...}
  columns={...}
/>
```

#### batchActions

批量操作下拉菜单，需配合 `rowSelection`（通常来自 `Table.useSelectedRow`）使用。

| 属性 | 类型 | 说明 |
|------|------|------|
| key | string | 菜单项 key |
| label | string | 菜单文案 |
| disabled | boolean | 是否禁用，默认无选中行时禁用 |
| danger | boolean | 危险操作样式 |
| onClick | function | `({ selectedRowKeys, selectedRows, reload, refresh, requestParams, ... }) => void` |

#### ref 方法

通过 `ref` 可调用 `@kne/react-fetch` 暴露的方法：

| 方法 | 说明 |
|------|------|
| reload | 重新请求，请求完成前保留当前内容 |
| refresh | 重新请求，请求期间显示 loading |
| setData | 直接修改当前数据 |
| send | 发送自定义请求 |

#### 与 Table 分页的差异

`TablePage` 的分页器渲染在表格外侧（`antd Pagination`），不会出现在 `Table` 边框内部。表格本身始终设置 `pagination={false}`。当 `dataFormat` 返回的 `total` 为 0（无数据）时，分页器不会渲染。

移动端（`renderMobile` 激活）默认使用触底下拉加载（`@kne/scroll-loader` + `react-fetch` 的 `loadMore`），不再展示分页器。若需移动端仍使用分页，请设置 `pagination.forcePagination: true`。

#### renderType

通过 `renderType` 选择内部使用的表格组件，默认为 `Table`：

```jsx
<TablePage renderType="TableView" loader={...} columns={...} />
```

#### 示例

```jsx
<TablePage
  name="order-list"
  loader={({ data }) => {
    const { currentPage = 1, perPage = 20 } = data || {};
    return fetchOrders({ currentPage, perPage });
  }}
  dataFormat={data => ({
    list: data.pageData,
    total: data.totalCount
  })}
  columns={[
    { name: 'id', title: '订单编号', width: 160 },
    { name: 'customerName', title: '客户名称', width: 200 }
  ]}
  pagination={{
    open: true,
    pageSizeOptions: ['10', '20', '50', '100']
  }}
/>
```

完整示例见文档 `TablePage`。

### TableView

表格视图组件，基于 Ant Design 的 Row/Col 布局实现，支持列配置、行选择等能力。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dataSource | array | - | 表格数据源 |
| columns | array | - | 列配置，见下方 columns 说明 |
| rowKey | string \| function | `'id'` | 行唯一标识字段名或取值函数 |
| rowSelection | object | - | 行选择配置，见下方 rowSelection 说明 |
| placeholder | string | `'-'` | 空值占位符 |
| emptyIsPlaceholder | boolean | `true` | 空值是否显示占位符 |
| empty | ReactNode | `<Empty />` | 无数据时的展示内容 |
| headerStyle | object | - | 表头自定义样式，仅在 `render` 自定义渲染时作用于 `header` |
| onRowSelect | function | - | 行点击回调 `(item, { columns, dataSource }) => void` |
| render | function | - | 自定义渲染 `(props) => ReactNode`，可获取 `header` 和 `renderBody` |
| renderMobile | boolean \| function \| string | `true` | 仅移动端生效。`true` 使用默认卡片 List；为 function 时完全接管渲染（见下方回调参数）；为 string 时从 `preset({ renderMobile })` 按名称取渲染函数，未注册则视为未开启 |
| sortRender | function | - | 排序按钮渲染，由 `useSort` 提供（桌面端表头） |
| mobileSortToolbar | function | - | 移动端排序工具栏，由 `useSort` 提供；传入 TableView 后由 `renderToolbar` / 默认卡片复用 |
| size | `'small'` \| `'large'` | - | 单元格内边距：默认 `8px`，`small` 为 `4px`，`large` 为 `14px 8px`；可通过 CSS 变量覆盖 |
| dataType | `'list'` \| `'tree'` \| `'treeList'` | `'list'` | 数据形态。`list` 扁平；`tree` 使用 `childrenKey` 嵌套；`treeList` 按 `parentKey` 组装为树 |
| parentKey | string | `'parentId'` | `treeList` 父子关联字段 |
| childrenKey | string | `'children'` | 子节点字段名 |
| hasChildrenKey | string | `'hasChildren'` | 懒加载标记；为 `true` 时即使尚无子节点也显示展开图标 |
| treeTitleKey | string \| function | `'name'` | 移动端树形面包屑文案字段（委托 TableView） |
| onLoadChildren | function | - | 懒加载：`(item, { key }) => void \| Promise`；请用 `mergeTreeChildren` 合并回 dataSource |
| expandedKeys | `true` \| `false` \| `Array` | - | 受控展开。`true` 全开，`false` 全关，数组为展开 key |
| defaultExpandedKeys | `true` \| `false` \| `Array` | `false` | 非受控初始展开 |
| onExpandedKeysChange | function | - | 展开变化回调 `(keys) => void` |
| indentSize | number | `16` | 树形每层缩进（px），映射 antd `expandable.indentSize` |

`renderMobile` 为 function 时，TableView 会传入已接好 `rowSelection` / `mobileSortToolbar` 的能力，自定义布局只需选用：

| 回调参数 | 说明 |
|------|------|
| `dataSource` | 当前页数据 |
| `columns` | 布局后的列配置 |
| `rowKey` / `rowSelection` / `context` / `empty` | 与 TableView 一致 |
| `renderBody` | 渲染默认移动端卡片 List（含顶部工具栏） |
| `renderToolbar` | 渲染组件级工具栏（全选居左、排序居右）；可自由决定摆放位置 |
| `getRowKey(item)` | 按 `rowKey` 取行 key |
| `getSelectionProps(item)` | 返回 `{ checked, disabled, onChange }`，可直接绑到卡片上的 Checkbox / Radio |
| `onSelectionChange` | 行选择切换，签名与内部逻辑一致 |

```jsx
renderMobile={({ dataSource, renderToolbar, getSelectionProps, getRowKey }) => (
  <>
    {renderToolbar()}
    {dataSource.map(item => {
      const selection = getSelectionProps(item);
      return <MyCard key={getRowKey(item)} item={item} {...selection} />;
    })}
  </>
)}
```

单元格 padding 由 CSS 变量控制，可在外层覆盖：

```css
.info-page-table {
  --kne-table-cell-padding-default: 8px;
  --kne-table-cell-padding-small: 4px;
  --kne-table-cell-padding-large: 14px 8px;
  /* 或直接覆盖当前生效值：--kne-table-cell-padding: 10px; */
}
```

#### columns

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | - | 字段名，对应 dataSource 中的属性 |
| title | ReactNode | - | 列标题 |
| width | number \| string | - | 列最小宽度，支持数字（如 `50`，视为 50px）或字符串（如 `'50px'`），参与列宽计算，内容超出时会自动撑开 |
| span | number | - | 列占比（基于 24 栅格），未设置时自动均分剩余栅格 |
| align | string | `'top'` | 垂直对齐方式 |
| justify | string | `'flex-start'` | 水平对齐方式 |
| format | string \| function | - | 值格式化 |
| render | function | - | 自定义单元格渲染 `(value, { column, dataSource, context }) => ReactNode`；与 `renderType` 同时存在时优先级最高 |
| renderType | string | - | 声明式列渲染类型；存在 `render` 时仅保留列宽等维度，不参与单元格渲染 |
| sort | boolean \| object | - | 是否支持排序，`{ single: true }` 为单列排序 |
| ellipsis | boolean \| object | `false` | 超出省略，基于 antd Typography；`true` 开启省略与 tooltip，`{ showTitle: false }` 关闭 tooltip |
| display | boolean \| function | - | 是否显示该列 |
| emptyIsPlaceholder | boolean | - | 该列空值是否显示占位符 |
| placeholder | string | - | 该列空值占位符 |
| renderPlaceholder | function | - | 自定义空值渲染 |

#### rowSelection

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'checkbox'` \| `'radio'` | - | 选择类型 |
| selectedRowKeys | array | - | 已选中的行 key 列表 |
| onChange | function | - | 选中变化回调 `(selectedRowKeys, id, { context, checked }) => void` |
| allowSelectedAll | boolean | - | 是否允许全选（仅 checkbox 模式） |
| isSelectedAll | boolean | - | 是否全选状态 |
| onIsSelectAllChange | function | - | 全选状态变化回调 |
| checkRelation | `'parent'` \| `'all'` \| `'independent'` | `'parent'` | 树形 checkbox 父子勾选关联（仅 `dataType` 为 `tree` / `treeList`）：`parent` 勾父级时子级 UI 全勾但值只留父级；`all` 值含父级与子孙；`independent` 互不影响 |

### useSelectedRow

行选择 Hook，用于配合 `Table` / `TableView` 的 `rowSelection`，API 参考 `@kne/components-core` 同名 Hook。

#### 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| rowKey | string \| function | `'id'` | 行唯一标识 |
| type | `'checkbox'` \| `'radio'` | `'checkbox'` | 选择类型 |

#### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| selectedRowKeys | array | 已选行 key 列表 |
| selectedRows | array | 已选行数据 |
| onSelect | function | `(item, checked) => void` |
| onSelectAll | function | `(checked, selected, items) => void` |
| setSelectedRows | function | 直接设置已选行数据 |
| setSelectedRowKeys | function | `(keys, dataSource) => void` |
| clearSelectedRows | function | 清空选择 |
| getRowSelection | function | `(dataSource, extra?) => rowSelection` 生成 `rowSelection` 配置 |

#### 示例

```jsx
const { selectedRowKeys, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });

<Table
  dataSource={dataSource}
  columns={columns}
  rowSelection={getRowSelection(dataSource)}
/>;
```

### useSort

排序 Hook，配合 `Table` / `TableView` 的 `sortRender` 实现表头排序。

#### 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| sort | array | - | 受控排序值 `[{ name, sort: 'ASC' \| 'DESC' }]` |
| defaultSort | array | `[]` | 默认排序 |
| onSortChange | function | - | 排序变化回调 `(sort) => void` |

#### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| sort | array | 当前排序配置 |
| setSort | function | 设置排序 |
| sortRender | function | `({ name, single }) => ReactNode`，传给 Table / TableView 表头 |
| mobileSortToolbar | function | `({ columns }) => ReactNode`，传给 Table / TableView 移动端工具栏右侧 |

#### columns.sort

| 值 | 说明 |
|----|------|
| `true` | 开启排序，默认单列模式 |
| `{ single: true }` | 单列排序，切换列时清除其他列 |
| `{ single: false }` | 多列排序 |

#### sortDataSource

本地排序工具函数：`sortDataSource(dataSource, sort, columns)`。

#### 示例

```jsx
const { sort, sortRender, mobileSortToolbar } = Table.useSort({ onSortChange: console.log });
const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort, dataSource]);

<Table dataSource={sortedData} columns={columns} sortRender={sortRender} mobileSortToolbar={mobileSortToolbar} />;
```

### Table

表格组件，以 antd `Table` 作为展示层，外层 API 与 `TableView` 保持一致，可直接复用相同的 `columns`、`rowSelection` 等配置。此外支持透传 antd Table 的原生属性（如 `scroll`、`pagination`、`bordered` 等）。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dataSource | array | - | 表格数据源 |
| columns | array | - | 列配置，见 TableView 的 columns 说明 |
| rowKey | string \| function | `'id'` | 行唯一标识字段名或取值函数 |
| rowSelection | object | - | 行选择配置，见 TableView 的 rowSelection 说明 |
| placeholder | string | `'-'` | 空值占位符 |
| emptyIsPlaceholder | boolean | `true` | 空值是否显示占位符 |
| empty | ReactNode | `<Empty />` | 无数据时的展示内容 |
| sticky | boolean | - | 是否启用粘性表头 |
| scrollTopInset | number \| string | - | 滚动容器顶部占位高度，用于吸顶表头偏移与滚回定位；`stickyOffset` 为兼容别名 |
| stickyOffset | number \| string | - | **已废弃**，请使用 `scrollTopInset` |
| getStickyContainer | function | - | 页面级滚动容器，等同 TablePage 的 `getScrollContainer` |
| headerStyle | object | - | 表头自定义样式 |
| onRowSelect | function | - | 行点击回调 `(item, { columns, dataSource }) => void` |
| render | function | - | 自定义渲染 `(props) => ReactNode`，`header` 为 `null`，`renderBody` 返回 antd Table |
| renderMobile | boolean \| function \| string | `true` | 仅移动端生效，委托 `@kne/table-view` 处理；`true` 为默认卡片 List；为 function 时回调参数同 TableView（见 TableView 文档 `renderMobile` 回调参数）；为 string 时从 preset 按名称查找 |
| sortRender | function | - | 排序按钮渲染，由 `useSort` 提供（桌面端表头） |
| mobileSortToolbar | function | - | 移动端排序工具栏，由 `useSort` 提供 |
| pagination | boolean \| object | `false` | 分页配置，默认不显示；传入对象时使用 antd 分页 |
| name | string | - | 表格唯一标识，用于持久化列配置 |
| controllerOpen | boolean | `true` | 是否开启列宽拖动与列配置面板 |
| tableServerApis | object | - | 自定义列配置存储 API，默认使用 `localStorage` |
| size | `'small'` \| `'large'` | - | 单元格内边距：默认 `8px`，`small` 为 `4px`，`large` 为 `14px 8px`；可通过 CSS 变量覆盖（同 TableView） |
| dataType | `'list'` \| `'tree'` \| `'treeList'` | `'list'` | 同 TableView；`tree` / `treeList` 时使用与 TableView 一致的自绘展开列（三角 + 缩进），并隐藏 antd 默认展开列 |
| parentKey / childrenKey / hasChildrenKey | string | 见 TableView | 同 TableView |
| onLoadChildren | function | - | 同 TableView；展开时触发懒加载，三角显示 loading |
| expandedKeys / defaultExpandedKeys / onExpandedKeysChange | - | - | 同 TableView |
| indentSize | number | `16` | 同 TableView；作用于自绘展开列缩进 |
| ...antdTableProps | - | - | 其余属性透传给 antd `Table`（如 `scroll`、`bordered`）；树形下内部会合并 `expandable`（`showExpandColumn: false`） |

#### 与 TableView 的差异

| 项目 | TableView | Table |
|------|-----------|-------|
| 展示层 | Row/Col 自定义布局 | antd `Table` |
| `columns.span` | 基于 24 栅格分配列宽 | 不生效，请使用 `width` |
| 单选展示 | 右侧勾选图标 | antd 左侧 radio 列 |
| 列宽拖动 / 字段显示隐藏 | 不支持 | 支持，见下方说明 |
| 扩展能力 | 自定义 `render` 拆分表头/表体 | 支持 antd 原生 `scroll`、`pagination` 等 |

#### columns 扩展（仅 Table）

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| hidden | boolean | `false` | 默认隐藏该列，可在列配置面板中重新显示 |
| min | number | `80` | 列最小宽度（px），拖动调整列宽时的下限，无需手动配置 |
| max | number | `600` | 列最大宽度（px），拖动调整列宽时的上限，无需手动配置 |
| fixed | `'left'` \| `'right'` \| boolean | - | 固定列，固定列不可隐藏或拖动排序 |
| groupHeader | array | - | 分组表头配置，见下方 groupHeader 说明 |

#### groupHeader

在列配置中通过 `groupHeader` 声明该列所属的分组表头，支持多级嵌套。相同分组路径的列会自动合并为 antd 嵌套表头（仅 `Table` 支持，`TableView` 不生效）。

| 属性 | 类型 | 说明 |
|------|------|------|
| name | string | 分组唯一标识 |
| title | ReactNode | 分组标题 |

完整示例见文档 `group header`。

#### 列宽拖动与字段显示/隐藏

设置 `name` 开启列配置持久化；`controllerOpen` 控制是否显示拖动手柄与设置面板（默认 `true`）。列只需配置 `width`，`min` / `max` 有默认值（80 / 600），一般无需手动指定。

```jsx
<Table
  name="order-list"
  dataSource={dataSource}
  columns={[
    { name: 'id', title: '订单编号', width: 160, min: 120, max: 240, fixed: 'left' },
    { name: 'customerName', title: '客户名称', width: 200, min: 140, max: 360 },
    { name: 'remark', title: '备注', width: 200, hidden: true }
  ]}
/>
```

- 悬停表头列右侧拖动手柄可调整列宽
- 点击最后一列表头设置图标可显示/隐藏列、拖拽排序
- `hidden: true` 的列默认隐藏，可在面板中重新显示
- `fixed` 列固定显示且不可隐藏

完整示例见文档 `column config`。
