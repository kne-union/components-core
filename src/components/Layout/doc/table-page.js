const {default: Layout, TablePage} = _Layout;
const {PureGlobal} = global;
const {Button} = antd;

const TablePageExample = () => {
    const columns = [{
        title: '订单号', name: 'orderNo'
    }, {
        title: '客户姓名', name: 'customerName'
    }, {
        title: '金额', name: 'amount', render: (amount) => `¥${amount.toLocaleString()}`
    }, {
        title: '状态', name: 'status'
    }, {
        title: '创建时间', name: 'createTime'
    }];

    return (<PureGlobal preset={{
        enums: {
            helperGuide: () => [{
                value: 'order-list-help',
                content: '这是一个订单列表页面，可以查看和管理所有订单信息。',
                url: 'https://example.com/help/order-list'
            }]
        }
    }}>
        <Layout navigation={{isFixed: false}}>
            <TablePage
                name="order-list"
                helperGuideName="order-list-help"
                page={{
                    title: '订单列表', titleExtra: <Button type="primary">新建订单</Button>
                }}
                columns={columns}
                loader={() => {
                    return {
                        pageData: [{
                            key: '1',
                            orderNo: 'ORD202401001',
                            customerName: '张三',
                            amount: 1200.00,
                            status: '已完成',
                            createTime: '2024-01-15 10:30:00'
                        }, {
                            key: '2',
                            orderNo: 'ORD202401002',
                            customerName: '李四',
                            amount: 3500.00,
                            status: '处理中',
                            createTime: '2024-01-15 11:20:00'
                        }, {
                            key: '3',
                            orderNo: 'ORD202401003',
                            customerName: '王五',
                            amount: 890.00,
                            status: '待处理',
                            createTime: '2024-01-15 14:45:00'
                        }], total: 3
                    };
                }}
                topArea={(tableData) => (<div style={{padding: '16px', background: '#fafafa', marginBottom: '16px'}}>
                    <div>数据统计：共 {tableData?.pageData?.length || 0} 条记录</div>
                </div>)}
            />
        </Layout>
    </PureGlobal>);
};

render(<TablePageExample/>);
