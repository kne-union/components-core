const { default: Layout, TablePage } = _Layout;
const { PureGlobal } = global;
const { Button, Flex, Tag } = antd;

const statusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待处理: { type: 'warning', text: '待处理' }
};

const columns = [
  { name: 'orderNo', title: '订单号', width: 160, renderType: 'small', fixed: 'left' },
  { name: 'customerName', title: '客户姓名', width: 140, renderType: 'main' },
  {
    name: 'amount',
    title: '金额',
    width: 120,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:2-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'createTime', title: '创建时间', width: 180, format: 'datetime' }
];

const loader = () =>
  Promise.resolve({
    pageData: [
      {
        id: '1',
        orderNo: 'ORD202401001',
        customerName: '张三',
        amount: 1200,
        status: '已完成',
        createTime: '2024-01-15 10:30:00'
      },
      {
        id: '2',
        orderNo: 'ORD202401002',
        customerName: '李四',
        amount: 3500,
        status: '处理中',
        createTime: '2024-01-15 11:20:00'
      },
      {
        id: '3',
        orderNo: 'ORD202401003',
        customerName: '王五',
        amount: 890,
        status: '待处理',
        createTime: '2024-01-15 14:45:00'
      }
    ],
    totalCount: 3
  });

const TablePageNextExample = () => (
  <PureGlobal
    preset={{
      enums: {
        helperGuide: () => [
          {
            value: 'order-list-next-help',
            content: 'isNext 模式下使用 @components/TablePage，列配置采用 renderType / getValueOf 等新 API。',
            url: 'https://example.com/help/order-list'
          }
        ]
      }
    }}
  >
    <Layout navigation={{ isFixed: false }}>
      <Flex vertical gap={16}>
        <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
          <div>
            <Tag color="blue" style={{ marginRight: 8 }}>
              isNext
            </Tag>
            设置 <code>isNext</code> 后，内部使用 <code>@components/TablePage</code>（基于{' '}
            <code>@kne/table-page</code>）；未设置时默认使用 <code>@components/Table</code> 内置的 legacy TablePage（兼容旧版{' '}
            <code>type</code> 列配置）。
          </div>
        </div>
        <TablePage
          isNext
          name="order-list-next"
          helperGuideName="order-list-next-help"
          page={{
            title: '订单列表（isNext）',
            titleExtra: <Button type="primary">新建订单</Button>
          }}
          dataFormat={data => ({
            list: data.pageData,
            total: data.totalCount,
            data
          })}
          pagination={{
            open: true,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }}
          columns={columns}
          loader={loader}
          topArea={tableData => (
            <div style={{ padding: '16px', background: '#fafafa', marginBottom: '16px' }}>
              <div>数据统计：共 {tableData?.pageData?.length || 0} 条记录</div>
            </div>
          )}
        />
      </Flex>
    </Layout>
  </PureGlobal>
);

render(<TablePageNextExample />);
