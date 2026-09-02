# flex-box


### 描述

通过外部容器尺寸来确定内部容器的列


### 安装

```shell
npm i --save @kne/flex-box
```


### 概述

根据容器宽度自动计算栅格列数，并用 antd 6 的 `Row` / `Col` 排布卡片。同一行卡片会拉齐高度，适合候选人列表、项目卡片、数字人封面等需要随侧栏或窗口缩放换列的场景。

### 主要特性

- 按容器宽度（不是视口）匹配 `columns` 断点，侧栏折叠时列数也会变
- 基于 antd 6 Grid，`Row` 使用 `align="stretch"`，同一行卡片等高
- `FlexBox.Item` 铺满格子高度，同一行卡片对齐
- `FlexBoxFetch` 按当前列配置的 `size` 拉数，并支持分页
- `useFlexBox` 可单独使用，把 `ref` 绑到任意 DOM 上即可拿到当前 `column`

### 使用场景

- 管理后台的卡片列表（面试邀请、项目、数字人）
- 需要随容器宽度在 1/2/4/5 列之间切换的陈列布局
- 远程分页列表，每页条数随列数变化


### 示例

#### 示例代码

- FlexBox 响应式卡片栅格
- 按容器宽度切换列数，同一行卡片拉齐高度。示例覆盖基础列表、自定义断点、间距，以及列变化回调。
- _FlexBox(@kne/flex-box)[import * as _FlexBox from "@kne/flex-box"],antd(antd)

```jsx
const { default: FlexBox } = _FlexBox;
const { Flex, Card, Tag, Typography, Button, Space } = antd;
const { useState } = React;
const { Text, Title, Paragraph } = Typography;

const candidates = [
  {
    id: '327708204249121792',
    code: 'EC8901',
    name: 'luna.zhang',
    email: 'luna.zhang@leapin.io',
    phone: '+86 17621655346',
    status: 'pending',
    invitedAt: '2026-06-23 15:14'
  },
  {
    id: '327708204249121801',
    code: 'EC8902',
    name: 'wei.chen',
    email: 'wei.chen@leapin.io',
    phone: '+86 13800138000',
    status: 'running',
    invitedAt: '2026-06-22 09:40',
    remark: '已进入面试间，当前正在回答第二题。候选人补充了项目经历，卡片内容比「未开始」状态更长。'
  },
  {
    id: '327708204249121810',
    code: 'EC8903',
    name: 'ming.li',
    email: 'ming.li@leapin.io',
    phone: '+86 13912345678',
    status: 'ended',
    invitedAt: '2026-06-20 11:02',
    score: 86
  },
  {
    id: '327708204249121819',
    code: 'EC8904',
    name: 'yan.wu',
    email: 'yan.wu@leapin.io',
    phone: '+86 18600001111',
    status: 'pending',
    invitedAt: '2026-06-19 18:20'
  },
  {
    id: '327708204249121828',
    code: 'EC8905',
    name: 'hao.zhou',
    email: 'hao.zhou@leapin.io',
    phone: '+86 15012344321',
    status: 'check',
    invitedAt: '2026-06-18 10:05',
    remark: '报告待复核：疑似切屏，需要面试官确认后再发 offer。'
  },
  {
    id: '327708204249121837',
    code: 'EC8906',
    name: 'qing.sun',
    email: 'qing.sun@leapin.io',
    phone: '+86 13188886666',
    status: 'ended',
    invitedAt: '2026-06-17 14:33',
    score: 72
  }
];

const statusMap = {
  pending: { color: 'default', text: '未开始' },
  running: { color: 'processing', text: '进行中' },
  check: { color: 'error', text: '待复核' },
  ended: { color: 'success', text: '已完成' }
};

const CandidateCard = ({ item }) => {
  const status = statusMap[item.status] || statusMap.pending;
  return (
    <Card size="small" title={item.code} extra={<Tag color={status.color}>{status.text}</Tag>}>
      <Flex vertical gap={8}>
        <Text strong>{item.name}</Text>
        <Text type="secondary">{item.email}</Text>
        <Text type="secondary">{item.phone}</Text>
        <Text type="secondary">邀请时间 {item.invitedAt}</Text>
        {item.score != null ? <Text>综合分 {item.score}</Text> : null}
        {item.remark ? <Paragraph type="secondary" style={{ marginBottom: 0 }}>{item.remark}</Paragraph> : null}
      </Flex>
    </Card>
  );
};

const BasicExample = () => {
  return (
    <Flex vertical gap={8}>
      <Text type="secondary">长短内容混排时，同一行卡片高度对齐。拖动窗口或侧栏，列数会按容器宽度变化。</Text>
      <FlexBox dataSource={candidates} rowKey="id" gutter={12} renderItem={item => (
        <FlexBox.Item>
          <CandidateCard item={item} />
        </FlexBox.Item>
      )} />
    </Flex>
  );
};

const ColumnsExample = () => {
  const [column, setColumn] = useState(null);
  return (
    <Flex vertical gap={8}>
      <Space wrap>
        <Text type="secondary">自定义断点，并用 onChange 读取当前列配置（首次量宽不回调）</Text>
        {column ? (
          <Tag color="blue">
            col={column.col} / size={column.size} / width≤{column.width}
          </Tag>
        ) : (
          <Tag>等待容器量宽</Tag>
        )}
      </Space>
      <FlexBox
        columns={[
          { width: 480, col: 1, size: 8 },
          { width: 800, col: 2, size: 10 },
          { width: 1200, col: 3, size: 12 }
        ]}
        gutter={[16, 16]}
        dataSource={candidates}
        rowKey={item => item.id}
        onChange={setColumn}
        renderItem={item => (
          <FlexBox.Item>
            <CandidateCard item={item} />
          </FlexBox.Item>
        )}
      />
    </Flex>
  );
};

const GutterExample = () => {
  const [gutter, setGutter] = useState(8);
  return (
    <Flex vertical gap={8}>
      <Space>
        <Text type="secondary">gutter 间距（同 antd Row）</Text>
        <Button type={gutter === 8 ? 'primary' : 'default'} onClick={() => setGutter(8)}>
          8
        </Button>
        <Button type={gutter === 16 ? 'primary' : 'default'} onClick={() => setGutter(16)}>
          16
        </Button>
        <Button type={gutter === 24 ? 'primary' : 'default'} onClick={() => setGutter(24)}>
          24
        </Button>
      </Space>
      <FlexBox dataSource={candidates.slice(0, 4)} rowKey="id" gutter={gutter} renderItem={item => (
        <FlexBox.Item>
          <CandidateCard item={item} />
        </FlexBox.Item>
      )} />
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={32}>
      <div>
        <Title level={4}>基础用法</Title>
        <Paragraph>默认断点：容器 ≤576 一列，≤768 两列，≤1200 四列，更宽五列。请把卡片放在 FlexBox.Item 里。</Paragraph>
        <BasicExample />
      </div>
      <div>
        <Title level={4}>自定义 columns / onChange</Title>
        <ColumnsExample />
      </div>
      <div>
        <Title level={4}>gutter</Title>
        <GutterExample />
      </div>
    </Flex>
  );
};

render(<BaseExample />);

```

- FlexBoxFetch 远程列表
- 按当前列配置的 size 请求数据，支持底部分页。缩小容器会换列并重新请求。
- _FlexBox(@kne/flex-box)[import * as _FlexBox from "@kne/flex-box"],antd(antd)

```jsx
const { FlexBoxFetch } = _FlexBox;
const { Flex, Card, Tag, Typography, Button, Space } = antd;
const { useRef, useState } = React;
const { Text, Title, Paragraph } = Typography;

const statusList = [
  { color: 'default', text: '未开始' },
  { color: 'processing', text: '进行中' },
  { color: 'success', text: '已完成' },
  { color: 'error', text: '待复核' }
];

const mockPage = ({ pageSize, keyword }) => {
  return Array.from({ length: pageSize }).map((_, index) => {
    const status = statusList[index % statusList.length];
    const seq = index + 1;
    return {
      id: `invite-${seq}`,
      code: `EC${String(8900 + seq).padStart(4, '0')}`,
      name: `候选人 ${seq}`,
      email: `user${seq}@leapin.io`,
      phone: `+86 1380000${String(seq).padStart(4, '0')}`,
      status,
      invitedAt: `2026-06-${String((seq % 28) + 1).padStart(2, '0')} 10:00`,
      remark: index % 3 === 1 ? `${keyword || '面试'}进展说明：当前题目较多，卡片会被拉高，同一行其它卡片应对齐。` : ''
    };
  });
};

const InviteCard = ({ item }) => {
  return (
    <Card size="small" title={item.code} extra={<Tag color={item.status.color}>{item.status.text}</Tag>}>
      <Flex vertical gap={8}>
        <Text strong>{item.name}</Text>
        <Text type="secondary">{item.email}</Text>
        <Text type="secondary">{item.phone}</Text>
        <Text type="secondary">邀请时间 {item.invitedAt}</Text>
        {item.remark ? <Paragraph type="secondary" style={{ marginBottom: 0 }}>{item.remark}</Paragraph> : null}
      </Flex>
    </Card>
  );
};

const BaseFetchExample = () => {
  const fetchRef = useRef(null);
  return (
    <Flex vertical gap={8}>
      <Space>
        <Text type="secondary">getFetchApi 使用 column.size 作为 pageSize；底部分页、居中对齐</Text>
        <Button
          onClick={() => {
            console.log(fetchRef.current);
          }}>
          打印 Fetch 实例
        </Button>
      </Space>
      <FlexBoxFetch
        ref={fetchRef}
        rowKey="id"
        gutter={12}
        columns={[
          { width: 480, col: 1, size: 8 },
          { width: 800, col: 2, size: 10 },
          { width: 1100, col: 3, size: 12 },
          { width: 1600, col: 4, size: 12 }
        ]}
        pagination={{ position: 'bottom', align: 'center' }}
        getFetchApi={({ size }) => {
          return {
            data: { pageSize: size, keyword: '面试' },
            loader: ({ data }) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({
                    pageData: mockPage(data)
                  });
                }, 400);
              });
            }
          };
        }}
        renderItem={item => (
          <FlexBoxFetch.Item>
            <InviteCard item={item} />
          </FlexBoxFetch.Item>
        )}
      />
    </Flex>
  );
};

const FormatAndPaginationExample = () => {
  const [position, setPosition] = useState('both');
  return (
    <Flex vertical gap={8}>
      <Space wrap>
        <Text type="secondary">dataFormat 从 list 取值；分页位置</Text>
        <Button type={position === 'top' ? 'primary' : 'default'} onClick={() => setPosition('top')}>
          top
        </Button>
        <Button type={position === 'bottom' ? 'primary' : 'default'} onClick={() => setPosition('bottom')}>
          bottom
        </Button>
        <Button type={position === 'both' ? 'primary' : 'default'} onClick={() => setPosition('both')}>
          both
        </Button>
      </Space>
      <FlexBoxFetch
        rowKey="id"
        gutter={12}
        columns={[
          { width: 480, col: 1, size: 8 },
          { width: 800, col: 2, size: 10 },
          { width: 1100, col: 3, size: 12 },
          { width: 1600, col: 4, size: 12 }
        ]}
        pagination={{ position, align: 'end', defaultPageSize: 6 }}
        dataFormat={data => data.list}
        getFetchApi={({ size }) => {
          return {
            data: { pageSize: size },
            loader: ({ data }) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({
                    list: mockPage({ pageSize: data.pageSize, keyword: '复核' })
                  });
                }, 300);
              });
            }
          };
        }}
        renderItem={item => (
          <FlexBoxFetch.Item>
            <InviteCard item={item} />
          </FlexBoxFetch.Item>
        )}
      />
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={32}>
      <div>
        <Title level={4}>按列数请求</Title>
        <Paragraph>缩小示例容器或窗口，列数变化后会用新的 size 重新请求。ref 指向 Fetch 实例。</Paragraph>
        <BaseFetchExample />
      </div>
      <div>
        <Title level={4}>dataFormat 与分页位置</Title>
        <FormatAndPaginationExample />
      </div>
    </Flex>
  );
};

render(<BaseExample />);

```

- useFlexBox 单独使用
- 把 ref 绑到任意容器上，根据宽度得到当前 col / size，可用来驱动自己的布局。
- _FlexBox(@kne/flex-box)[import * as _FlexBox from "@kne/flex-box"],antd(antd)

```jsx
const { useFlexBox } = _FlexBox;
const { Flex, Card, Tag, Typography, Button, Space } = antd;
const { useState } = React;
const { Text, Title, Paragraph } = Typography;

const columns = [
  { width: 360, col: 1, size: 6 },
  { width: 640, col: 2, size: 8 },
  { width: 960, col: 3, size: 12 },
  { width: 1280, col: 4, size: 16 }
];

const Demo = () => {
  const [history, setHistory] = useState([]);
  const { ref, column } = useFlexBox({
    columns,
    onChange: next => {
      setHistory(list => [`col=${next.col}, size=${next.size}`, ...list].slice(0, 6));
    }
  });

  return (
    <Flex vertical gap={12}>
      <Text type="secondary">拖动下方卡片右下角，或点按钮改宽度。column 来自容器 clientWidth，不是窗口宽度。</Text>
      <Space wrap>
        {column ? (
          <Tag color="blue">
            当前 col={column.col}，size={column.size}，width≤{column.width}
          </Tag>
        ) : (
          <Tag>尚未量到宽度</Tag>
        )}
      </Space>
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: 960,
          minWidth: 240,
          resize: 'horizontal',
          overflow: 'auto',
          padding: 12,
          border: '1px dashed #d9d9d9',
          borderRadius: 8,
          background: '#fafafa'
        }}>
        <Card size="small" title="被测量的容器">
          <Paragraph style={{ marginBottom: 8 }}>把 useFlexBox 返回的 ref 绑在这一层。内部可以用 column.col 自己做布局。</Paragraph>
          <Flex gap={8} wrap>
            {Array.from({ length: column?.col || 1 }).map((_, index) => (
              <Card key={index} size="small" style={{ flex: '1 1 80px' }}>
                列 {index + 1}/{column?.col || '-'}
              </Card>
            ))}
          </Flex>
        </Card>
      </div>
      <Space wrap>
        <Text type="secondary">onChange 记录（不含首次量宽）</Text>
        {history.length === 0 ? <Text type="secondary">尚无切换</Text> : history.map((item, index) => <Tag key={`${item}-${index}`}>{item}</Tag>)}
      </Space>
    </Flex>
  );
};

const PresetWidthExample = () => {
  const [width, setWidth] = useState(720);
  const { ref, column } = useFlexBox({ columns });
  return (
    <Flex vertical gap={8}>
      <Space wrap>
        <Button type={width === 320 ? 'primary' : 'default'} onClick={() => setWidth(320)}>
          320（1 列）
        </Button>
        <Button type={width === 500 ? 'primary' : 'default'} onClick={() => setWidth(500)}>
          500（2 列）
        </Button>
        <Button type={width === 720 ? 'primary' : 'default'} onClick={() => setWidth(720)}>
          720（3 列）
        </Button>
        <Button type={width === 1100 ? 'primary' : 'default'} onClick={() => setWidth(1100)}>
          1100（4 列）
        </Button>
        {column ? <Tag color="blue">col={column.col}</Tag> : null}
      </Space>
      <div ref={ref} style={{ width, maxWidth: '100%', padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
        <Text>
          容器 {width}px → {column ? `${column.col} 列 / 每页 ${column.size} 条` : '测量中'}
        </Text>
      </div>
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={32}>
      <div>
        <Title level={4}>绑定 ref</Title>
        <Paragraph>不要把 ref 丢在组件实例上，必须是 DOM。列配置取第一个 width ≥ 容器宽度的项。</Paragraph>
        <Demo />
      </div>
      <div>
        <Title level={4}>指定容器宽度</Title>
        <PresetWidthExample />
      </div>
    </Flex>
  );
};

render(<BaseExample />);

```


### API

根据容器宽度自动计算列数，并用 antd 6 [`Grid`](https://ant.design/components/grid) 的 `Row` / `Col` 排布列表。同一行卡片会拉齐高度。

导出：`FlexBox`（默认）、`FlexBoxFetch`、`useFlexBox`。

### useFlexBox

监听容器宽度，返回应对应绑到 DOM 上的 `ref`，以及当前命中的 `column`。

```js
const { ref, column } = useFlexBox({ columns, onChange });
```

`ref` 必须传给真实 DOM（或 `forwardRef` 到 DOM）。`column` 在首次量到宽度前为 `null`。

#### 参数

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | `columnProps[]` | 见下方默认值 | 按 `width` 升序排列的断点。取**第一个** `width >= 容器宽度` 的项；都大于容器时用最后一项 |
| onChange | `(column) => void` | - | 列配置变化时回调。首次量宽不会触发，之后每次切换才会调用 |

#### 返回值

| 名称 | 类型 | 说明 |
|------|------|------|
| ref | Ref | 绑到被测量的容器 DOM |
| column | `columnProps` \| `null` | 当前断点；尚未量到宽度时为 `null` |

#### columnProps

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| width | number | - | 容器宽度上限（px）。容器宽度小于等于该值时可以命中本项 |
| col | number | - | 栅格列数，传给 `Col` 的宽度百分比 `100 / col` |
| size | number | - | 建议的每页条数，给 `FlexBoxFetch` 的 `getFetchApi` 使用 |

默认 `columns`：

```js
[
  { width: 576, col: 1, size: 15 },
  { width: 768, col: 2, size: 12 },
  { width: 1200, col: 4, size: 12 },
  { width: 1600, col: 5, size: 15 }
]
```

---

### FlexBox

静态数据源的响应式卡片栅格。内部调用 `useFlexBox`，量到宽度后再渲染 `Row`。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | `columnProps[]` | 同 `useFlexBox` | 列断点 |
| onChange | `(column) => void` | - | 列配置变化回调，行为同 `useFlexBox` |
| dataSource | array | `[]` | 列表数据 |
| renderItem | `(item, index) => ReactNode` | - | 渲染每一项，建议返回 `FlexBox.Item` |
| rowKey | string \| `(item) => string \| number` | `item.key`，否则用 `index` | 行 key。传字符串时取 `item[rowKey]` |
| gutter | number \| array | `16` | 栅格间隔。数字时横纵都用该值；数组同 antd `Row.gutter` |
| outerClassName | string | - | 最外层测量容器的 `className` |
| className | string | - | 栅格 `Row` 的 `className` |
| children | ReactNode | - | 额外插入 `Row` 的节点（需自行保证是合法的栅格子项） |

#### FlexBox.Item

铺满当前格子高度的卡片容器。请把 `Card` 或自定义卡片包在里面。格子用 grid 拉齐子节点，不要求子组件转发 `style`。

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 容器 class |
| style | CSSProperties | - | 与内置铺满样式合并，后传入的会覆盖 |
| children | ReactNode | - | 卡片内容 |

---

### FlexBoxFetch

在 `FlexBox` 之上用 `@kne/react-fetch` 拉数。`getFetchApi` 会收到当前 `column`（含 `size`），便于按列数调整 `pageSize`。

`ref` 指向 Fetch 实例，不是测量容器。

#### 属性

除 `dataSource` 由接口返回外，其余同 `FlexBox`（`columns`、`onChange`、`renderItem`、`rowKey`、`gutter`、`outerClassName`、`className`、`children`）。另增：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| api | object | - | 直接传给 `@kne/react-fetch` 的请求配置。与 `getFetchApi` 二选一 |
| getFetchApi | `(column) => object` | - | 按当前列配置生成 Fetch `api`。`column` 未就绪时不请求 |
| dataFormat | `(data) => array` | `data => data.pageData` | 把接口结果转成 `dataSource` |
| pagination | boolean \| object | - | `false`/`undefined` 不分页。`true` 或对象时按客户端切片分页 |

#### pagination

在 antd 6 [`Pagination`](https://ant.design/components/pagination) 的属性之外，额外支持：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| position | `'top'` \| `'bottom'` \| `'both'` | `'bottom'` | 分页器位置 |
| align | `'start'` \| `'center'` \| `'end'` | `'end'` | 分页器对齐，传给 antd `Pagination.align` |
| defaultCurrent | number | `1` | 默认页码 |
| defaultPageSize | number | `10` | 默认每页条数 |
| current | number | - | 受控页码 |
| pageSize | number | - | 受控每页条数 |
| total | number | `dataSource.length` | 总数，不传则用格式化后的列表长度 |
| onChange | `(page, pageSize) => void` | - | 页码或 pageSize 变化 |

其余字段会展开到 `Pagination`。

加载中会在 `Row` 上加上 `loading-container is-loading`，可与业务里的全局 loading 样式配合。
