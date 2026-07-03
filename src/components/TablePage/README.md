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
- **`TableView` 模式**：基于 antd Row/Col 栅格布局，适合移动端或卡片式表格场景

通过 `loader` 或 `url` 配置数据源，通过 `dataFormat` 适配不同的接口数据结构。分页器渲染在表格外侧，翻页默认采用 `reload` 方式（不显示全屏 loading）。

同时内置了顶部工具栏（`TableToolbar`），整合筛选、搜索、批量操作三大能力：

- **筛选（filter）**：基于 `@kne/react-filter` 的 `FilterLines`，支持多行多字段组合筛选，筛选值变化时自动 `reload` 并回到第 1 页
- **搜索（search）**：基于 `@kne/react-filter` 的 `SearchInput`，支持关键词搜索与防抖自动提交，与筛选器共享筛选值状态
- **批量操作（batchActions）**：配合 `rowSelection` 和 `useSelectedRow`，提供下拉菜单形式的批量操作（如批量导出、批量通知），未选中时自动禁用
- **已选筛选值展示**：工具栏下方展示当前生效的筛选条件标签，支持快速清除

#### Table

基于 antd `Table` 的表格组件，与 `TableView` 共享相同的 `columns`、`rowSelection` 等 API。额外提供以下增强能力：

- **列宽拖动**：悬停表头列右侧拖动手柄可调整列宽，支持 `min`/`max` 限制
- **列配置面板**：通过表头最后一列的设置图标，可显示/隐藏字段、拖拽排序
- **配置持久化**：设置 `name` 后，列宽和显示状态自动保存到 localStorage
- **分组表头**：通过 `groupHeader` 配置实现多级表头结构
- **浮动横向滚动条**：当表格宽度超出容器时，底部自动显示横向滚动条（通过 `horizontalScroller` 控制）

#### TableView

基于 CSS Grid 的表格视图组件，以 antd Row/Col 布局为基础。相比于 `Table`，它更轻量灵活，适合需要自定义渲染的场景。支持：

- 基于 24 栅格的列宽分配（`span` 属性）
- CSS Grid 自动布局，内容超出时自动撑开
- 行选择（checkbox 多选 / radio 单选）
- 行点击事件
- 通过 `render` 属性自定义渲染，可拆分表头和表体

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
- **移动端适配**：使用 `TableView` 模式实现栅格式数据展示


### 示例

#### 示例代码

- TablePage
- 表格页面组件，基于 @kne/react-fetch 实现数据加载与分页，支持 sticky 固定表头、useSort 服务端排序、列配置、总结栏等
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd),_ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css)

```jsx
const { default: TablePage, Table } = _TablePage;
const { fields } = _ReactFilter;
const { SuperSelectFilterItem } = fields;
const { Table: AntTable, Flex, Tag, Button, Space, message } = antd;
const { useMemo } = React;

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
      分页器渲染在表格外侧，翻页时以 <code>reload</code> 方式请求；<code>pageSize</code> 会持久化到 localStorage。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="gold">筛选</Tag>
      顶部工具栏集成 <code>filter</code>、<code>search</code>、<code>batchActions</code>；筛选变化自动 <code>reload</code> 并回到第 1 页。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">列配置</Tag>
      设置 <code>name</code> 开启列宽拖动与显示/隐藏，「薪资范围」「学历」默认隐藏；状态列使用 <code>renderType="status"</code>，绩效列使用 <code>renderType="tag"</code>，操作列使用 <code>renderType="options"</code> 且 <code>fixed="right"</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="cyan">排序</Tag>
      配合 <code>Table.useSort</code> 与 <code>sortRender</code>，在 <code>onSortChange</code> 中调用 <code>reload</code> 传排序参数，与翻页一样不闪烁。
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
  </div>
);

const BaseExample = () => {
  const tableRef = React.useRef();
  const allEmployees = useMemo(() => range(0, TOTAL).map(buildEmployee), []);
  const { selectedRows, getRowSelection } = Table.useSelectedRow({ rowKey: 'id' });
  const { sort, sortRender } = Table.useSort({
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
      <Space>
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
      </Space>
      <TablePage
        ref={tableRef}
        name="demo-employee-table"
        sticky
        scroll={{ x: 1600, y: 400 }}
        sortRender={sortRender}
        rowSelection={getRowSelection(allEmployees)}
        selectedRows={selectedRows}
        search={{ name: 'keyword', label: '关键词', placeholder: '搜索工号/姓名', style: { width: 220 } }}
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
          pageSizeOptions: ['10', '20', '50', '100']
        }}
        dataFormat={data => ({
          list: data.pageData,
          total: data.totalCount,
          data
        })}
        loader={({ data, requestParams }) => {
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

render(<BaseExample />);

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
      <div style={{ marginBottom: 8, color: '#666' }}>单选模式 type: &apos;radio&apos;</div>
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
| search | object | - | 顶部搜索框配置，基于 `@kne/react-filter` 的 `SearchInput`，见下方 |
| batchActions | array | - | 批量操作下拉菜单项，需配合 `rowSelection` 使用，见下方 |
| selectedRows | array | - | 已选行数据，传给 `batchActions` 的 `onClick` 上下文 |
| className | string | - | 自定义类名 |
| ...fetchProps | - | - | 其余属性透传给 `@kne/react-fetch`（如 `url`、`params`、`auto` 等） |
| ...tableProps | - | - | 其余属性透传给内部 `Table`（如 `rowKey`、`rowSelection`、`scroll`） |

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

`TablePage` 的分页器渲染在表格外侧（`antd Pagination`），不会出现在 `Table` 边框内部。表格本身始终设置 `pagination={false}`。

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
| sortRender | function | - | 排序按钮渲染，由 `useSort` 提供 |

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
| render | function | - | 自定义单元格渲染 `(value, { column, dataSource, context }) => ReactNode` |
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
| sortRender | function | `({ name, single }) => ReactNode`，传给 Table / TableView |

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
const { sort, sortRender } = Table.useSort({ onSortChange: console.log });
const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort, dataSource]);

<Table dataSource={sortedData} columns={columns} sortRender={sortRender} />;
```

### Table

表格组件，以 antd `Table` 作为展示层，外层 API 与 `TableView` 保持一致，可直接复用相同的 `columns`、`rowSelection` 等配置。此外支持透传 antd Table 的原生属性（如 `scroll`、`pagination`、`size` 等）。

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
| sortRender | function | - | 排序按钮渲染，由 `useSort` 提供 |
| pagination | boolean \| object | `false` | 分页配置，默认不显示；传入对象时使用 antd 分页 |
| name | string | - | 表格唯一标识，用于持久化列配置 |
| controllerOpen | boolean | `true` | 是否开启列宽拖动与列配置面板 |
| tableServerApis | object | - | 自定义列配置存储 API，默认使用 `localStorage` |
| ...antdTableProps | - | - | 其余属性透传给 antd `Table`（如 `scroll`、`bordered`） |

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
