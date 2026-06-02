const {
  default: Filter,
  InputFilterItem,
  CityFilterItem,
  SuperSelectFilterItem,
  filterToUrlParams,
  parseFilterEntry,
  takeFilterEntry,
  createUrlFilterReader,
  getFilterValue,
  createFilterValueMapper,
  pickSelectValues,
  useUrlFilterValue,
} = _Filter;
const { useState, useMemo } = React;
const { Space, Card, Divider, Typography, Button, Alert, Tag } = antd;

const { Text, Title, Paragraph } = Typography;

// ========== 示例数据 ==========
const sampleFilterValue = [
  { name: 'keyword', label: '关键词', value: { label: '前端开发', value: '前端开发' } },
  { name: 'city', label: '城市', value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }] },
  { name: 'status', label: '状态', value: { label: '招聘中', value: 'active', id: 'active' } },
];

// 声明式创建 mapFilterValue，配合 URL 参数使用
const mapFilterValue = createFilterValueMapper({
  keyword: 'string',
  city: 'multi',
  status: 'single',
});

const BaseExample = () => {
  const [value, onChange] = useState([]);

  // ===== 1. filterToUrlParams：筛选值 → URL 参数 =====
  const sampleUrlParams = useMemo(() => filterToUrlParams(sampleFilterValue), []);
  const liveUrlParams = useMemo(() => filterToUrlParams(value), [value]);

  // ===== 2. parseFilterEntry：解析单个值 =====
  const parsedEntries = useMemo(() => [
    { input: "'前端开发'", output: parseFilterEntry('前端开发') },
    { input: "'招聘中:active'", output: parseFilterEntry('招聘中:active') },
    { input: "'上海:010'", output: parseFilterEntry('上海:010') },
  ], []);

  // ===== 3. 从 URL 参数反序列化还原筛选状态 =====
  const roundTripResult = useMemo(() => {
    const urlStr = sampleUrlParams.toString();
    const searchParams = new URLSearchParams(urlStr);

    // 使用 createUrlFilterReader 读取
    const reader = createUrlFilterReader(searchParams);
    const keyword = reader.takeFilterEntry('keyword');
    const city = reader.takeFilterEntry('city', { multi: true });
    const status = reader.takeFilterEntry('status');
    const consumedKeys = reader.getConsumedKeys();

    // 还原为 filter 数组
    const restored = [];
    if (keyword) restored.push({ name: 'keyword', label: '关键词', value: keyword });
    if (city) restored.push({ name: 'city', label: '城市', value: city });
    if (status) restored.push({ name: 'status', label: '状态', value: status });

    return { urlStr, keyword, city, status, consumedKeys, restored };
  }, [sampleUrlParams]);

  // ===== 4. takeFilterEntry 直接读取 =====
  const takeResults = useMemo(() => {
    const sp = sampleUrlParams;
    return [
      { input: "takeFilterEntry(params, 'keyword')", output: takeFilterEntry(sp, 'keyword') },
      { input: "takeFilterEntry(params, 'city', { multi: true })", output: takeFilterEntry(sp, 'city', { multi: true }) },
      { input: "takeFilterEntry(params, 'status')", output: takeFilterEntry(sp, 'status') },
    ];
  }, [sampleUrlParams]);

  // ===== 5. 映射后筛选值 =====
  const mappedSample = mapFilterValue(sampleFilterValue, getFilterValue);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert
        message="URL 筛选参数工具"
        description="展示筛选值与 URL 参数之间的序列化/反序列化转换流程，以及 createFilterValueMapper 值映射工具"
        type="info"
        showIcon
      />

      {/* ===== 交互式 Filter ===== */}
      <Card title="交互式筛选器" size="small">
        <Paragraph type="secondary">选择筛选条件后，下方 URL 参数会实时更新</Paragraph>
        <Filter
          value={value}
          onChange={onChange}
          list={[
            [
              <InputFilterItem label="关键词" name="keyword" />,
              <CityFilterItem label="城市" name="city" />,
              <SuperSelectFilterItem
                label="状态"
                name="status"
                options={[
                  { label: '招聘中', value: 'active' },
                  { label: '已暂停', value: 'paused' },
                  { label: '已结束', value: 'closed' },
                ]}
              />,
            ],
          ]}
        />
        {value.length > 0 && (
          <>
            <Divider />
            <Title level={5}>当前筛选值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(value, null, 2)}
            </pre>
            <Title level={5}>序列化后的 URL 参数</Title>
            <pre style={{ background: '#fff3cd', padding: 8, borderRadius: 4, fontSize: 12, wordBreak: 'break-all' }}>
              {liveUrlParams.toString() || '（无）'}
            </pre>
          </>
        )}
      </Card>

      {/* ===== filterToUrlParams ===== */}
      <Card title="filterToUrlParams — 筛选值 → URL 参数" size="small">
        <Paragraph type="secondary">
          将筛选值数组序列化为 URLSearchParams，保留 label 信息以便反序列化还原
        </Paragraph>
        <Title level={5}>输入：筛选值数组</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{JSON.stringify(sampleFilterValue, null, 2)}
        </pre>
        <Title level={5}>输出：URL 参数字符串</Title>
        <pre style={{ background: '#d4edda', padding: 8, borderRadius: 4, fontSize: 12, wordBreak: 'break-all' }}>
          {roundTripResult.urlStr}
        </pre>
      </Card>

      {/* ===== parseFilterEntry ===== */}
      <Card title="parseFilterEntry — 解析单个筛选值项" size="small">
        <Paragraph type="secondary">
          将 URL 参数中的字符串反序列化为 {`{ label, value }`} 对象
        </Paragraph>
        {parsedEntries.map(({ input, output }, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <Text code>{`parseFilterEntry(${input})`}</Text>
            {' → '}
            <Tag color="green">{JSON.stringify(output)}</Tag>
          </div>
        ))}
      </Card>

      {/* ===== takeFilterEntry ===== */}
      <Card title="takeFilterEntry — 从 URL 参数读取筛选值" size="small">
        <Paragraph type="secondary">
          直接从 URLSearchParams 中读取并反序列化指定 key 的筛选值
        </Paragraph>
        {takeResults.map(({ input, output }, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <Text code>{input}</Text>
            <br />
            <Text>结果：</Text>
            <Tag color="blue">{JSON.stringify(output)}</Tag>
          </div>
        ))}
      </Card>

      {/* ===== createUrlFilterReader + 完整还原流程 ===== */}
      <Card title="createUrlFilterReader — 完整还原流程" size="small">
        <Paragraph type="secondary">
          使用 createUrlFilterReader 从 URL 参数读取并还原完整的筛选状态，同时追踪已消费的 key
        </Paragraph>
        <Title level={5}>步骤1：从 URL 参数读取各字段值</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{`const reader = createUrlFilterReader(searchParams);
const keyword = reader.takeFilterEntry('keyword');     // → ${JSON.stringify(roundTripResult.keyword)}
const city    = reader.takeFilterEntry('city', { multi: true }); // → ${JSON.stringify(roundTripResult.city)}
const status  = reader.takeFilterEntry('status');      // → ${JSON.stringify(roundTripResult.status)}
reader.getConsumedKeys();                               // → ${JSON.stringify(roundTripResult.consumedKeys)}`}
        </pre>
        <Title level={5}>步骤2：还原为筛选值数组</Title>
        <pre style={{ background: '#d4edda', padding: 8, borderRadius: 4, fontSize: 12 }}>
          {JSON.stringify(roundTripResult.restored, null, 2)}
        </pre>
        <Divider />
        <Title level={5}>验证：还原后的数据与原始数据一致</Title>
        <Space>
          <Tag color="success">还原成功</Tag>
          <Text type="secondary">
            keyword: {roundTripResult.keyword?.value} | city: [{roundTripResult.city?.map(c => c.value).join(', ')}] | status: {roundTripResult.status?.value}
          </Text>
        </Space>
      </Card>

      {/* ===== createFilterValueMapper ===== */}
      <Card title="createFilterValueMapper + filterToUrlParams 配合使用" size="small">
        <Paragraph type="secondary">
          实际业务中，先用 createFilterValueMapper 将筛选值映射为接口参数格式，再用 filterToUrlParams 序列化到 URL
        </Paragraph>
        <Title level={5}>映射后的筛选值（用于接口请求）</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{`const mapFilterValue = createFilterValueMapper({
  keyword: 'string',   // 确保字符串
  city: 'multi',       // 多选 → string[]
  status: 'single',    // 单选 → string
});

mapFilterValue(filterValue, getFilterValue);
// →`}
{'  ' + JSON.stringify(mappedSample, null, 2)}
        </pre>
      </Card>

      {/* ===== useUrlFilterValue ===== */}
      <Card title="useUrlFilterValue — 简化版 URL 筛选初始化" size="small">
        <Paragraph type="secondary">
          基于 useUrlFilter 封装的简化版 Hook，使用 createUrlFilterReader 解析 filterParams[key] 格式，自动解析 label:value，支持单选和多选
        </Paragraph>

        <Title level={5}>1. 数组形式 — 默认单选</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{`const [filter, setFilter] = useUrlFilterValue(['keyword', 'status']);

// URL: ?filterParams[keyword]=前端开发&filterParams[status]=招聘中:active
// → filter: [
//     { name: 'keyword', value: { label: '前端开发', value: '前端开发' } },
//     { name: 'status', value: { label: '招聘中', value: 'active' } }
//   ]`}
        </pre>

        <Divider />

        <Title level={5}>2. 对象形式 — 多选 + 自定义转换</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{`// { multi: true } 表示多选，value 为数组
// 函数接收解析后的值，返回 filter 项或 null 跳过
const [filter, setFilter] = useUrlFilterValue({
  keyword: true,                   // 单选，默认转换
  city: { multi: true },           // 多选
  status: (parsed) => parsed       // 自定义：直接用解析值
    ? { name: 'status', value: parsed }
    : null
});

// URL: ?filterParams[city]=上海:010,北京:020
// → city 的 value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]`}
        </pre>

        <Divider />

        <Title level={5}>对比 useUrlFilter</Title>
        <pre style={{ background: '#fff3cd', padding: 8, borderRadius: 4, fontSize: 12 }}>
{`// useUrlFilter（完整控制，需手动解析）
const [filter, setFilter] = useUrlFilter({
  readUrlParams: (searchParams) => {
    const { takeFilterEntry, getConsumedKeys } = createUrlFilterReader(searchParams);
    const keyword = takeFilterEntry('keyword');
    const city = takeFilterEntry('city', { multi: true });
    return { consumedKeys: getConsumedKeys(), keyword, city };
  },
  buildFilter: ({ keyword, city }) => [
    ...(keyword ? [{ name: 'keyword', value: keyword }] : []),
    ...(city ? [{ name: 'city', value: city }] : []),
  ]
});

// useUrlFilterValue（等价简化写法）
const [filter, setFilter] = useUrlFilterValue({
  keyword: true,
  city: { multi: true }
});`}
        </pre>
      </Card>
    </Space>
  );
};

render(<BaseExample />);
