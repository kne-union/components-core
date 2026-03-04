const {default: Modal, useModal, TabsModal, useTabsModal, ModalButton, TabsModalButton} = _Modal;
const {default: FormInfo, useFormModal, fields} = _FormInfo;
const {useState, useCallback} = React;
const {
    Button,
    Space,
    message,
    Table,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Descriptions,
    Tag,
    Avatar,
    Card,
    List,
    Divider
} = antd;

// 用户管理弹窗示例
const UserManagementModalExample = () => {
    const formModal = useFormModal();

    const handleAddUser = () => {
        const modalApi = formModal({
            title: "添加用户",
            size: "large",
            formProps: {
                onSubmit: (data) => {
                    console.log("保存用户信息:", data);
                    
                    // 模拟API调用
                    message.success("用户信息保存成功");
                    modalApi.close();
                },
            },
            children: (<FormInfo
                list={[
                    <fields.Input name="username" label="用户名" rule="REQ"/>,
                    <fields.Input name="realName" label="真实姓名" rule="REQ"/>,
                    <fields.Input name="email" label="邮箱" rule="EMAIL"/>,
                    <fields.Input name="phone" label="手机号" rule="PHONE"/>,
                    <fields.Select 
                        name="department" 
                        label="部门" 
                        rule="REQ"
                        options={[
                            { label: "技术部", value: "tech" },
                            { label: "产品部", value: "product" },
                            { label: "设计部", value: "design" },
                            { label: "人力资源部", value: "hr" },
                        ]}
                    />,
                    <fields.DatePicker name="joinDate" label="入职日期" rule="REQ"/>,
                    <fields.TextArea name="remark" label="备注" />,
                ]}
            />),
        });
    };

    return (<Space direction="vertical" style={{width: '100%'}}>
        <Button type="primary" onClick={handleAddUser}>
            添加新用户
        </Button>
    </Space>);
};

// 订单详情弹窗示例
const OrderDetailModalExample = () => {
    const modal = useModal();

    const showOrderDetail = useCallback((orderId) => {
        // 模拟加载订单数据
        modal({
            title: `订单详情 - #${orderId}`, width: 800, withDecorator: (render) => {
                return (<div>
                    <div style={{background: '#f5f5f5', padding: '12px 16px', marginBottom: '16px'}}>
                        <Space>
                            <Tag color="blue">待发货</Tag>
                            <span>下单时间: 2023-06-15 14:30:22</span>
                        </Space>
                    </div>
                    {render()}
                </div>);
            }, children: () => {
                const orderData = {
                    id: orderId,
                    customer: '张三',
                    phone: '13800138000',
                    address: '北京市朝阳区xxx街道xxx号',
                    products: [{id: 1, name: '商品A', price: 299, quantity: 2}, {
                        id: 2, name: '商品B', price: 199, quantity: 1
                    }, {id: 3, name: '商品C', price: 99, quantity: 3},],
                    totalAmount: 994,
                    paymentMethod: '在线支付',
                    deliveryMethod: '快递配送',
                    remark: '请在工作日送达',
                };

                return (<div>
                    <Descriptions title="订单信息" bordered column={2}>
                        <Descriptions.Item label="订单号">{orderData.id}</Descriptions.Item>
                        <Descriptions.Item label="下单时间">2023-06-15 14:30:22</Descriptions.Item>
                        <Descriptions.Item label="收货人">{orderData.customer}</Descriptions.Item>
                        <Descriptions.Item label="联系电话">{orderData.phone}</Descriptions.Item>
                        <Descriptions.Item label="收货地址" span={2}>{orderData.address}</Descriptions.Item>
                        <Descriptions.Item label="支付方式">{orderData.paymentMethod}</Descriptions.Item>
                        <Descriptions.Item label="配送方式">{orderData.deliveryMethod}</Descriptions.Item>
                    </Descriptions>

                    <div style={{marginTop: 16}}>
                        <h4>商品清单</h4>
                        <Table
                            dataSource={orderData.products}
                            pagination={false}
                            columns={[{title: '商品名称', dataIndex: 'name', key: 'name'}, {
                                title: '单价(元)', dataIndex: 'price', key: 'price'
                            }, {title: '数量', dataIndex: 'quantity', key: 'quantity'}, {
                                title: '小计(元)',
                                key: 'subtotal',
                                render: (_, record) => record.price * record.quantity
                            },]}
                            summary={() => (<Table.Summary>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={3}>
                                        <strong>总计</strong>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        <strong>{orderData.totalAmount}元</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>)}
                        />
                    </div>

                    <div style={{marginTop: 16}}>
                        <h4>备注</h4>
                        <p>{orderData.remark}</p>
                    </div>
                </div>);
            }, footerButtons: [{
                children: '打印订单', onClick: () => message.info("打印功能待实现"),
            }, {
                children: '发货', type: 'primary', onClick: async () => {
                    try {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        message.success("订单已发货");
                    } catch (error) {
                        message.error("发货失败，请重试");
                    }
                },
            },],
        });
    }, [modal]);

    const orders = [{id: 'ORD20230615001', customer: '张三', amount: 299, status: 'pending'}, {
        id: 'ORD20230615002', customer: '李四', amount: 598, status: 'shipped'
    }, {id: 'ORD20230615003', customer: '王五', amount: 398, status: 'completed'},];

    const statusMap = {
        pending: {text: '待发货', color: 'orange'},
        shipped: {text: '已发货', color: 'blue'},
        completed: {text: '已完成', color: 'green'},
    };

    return (<Card title="订单列表" size="small">
        <Table
            dataSource={orders}
            pagination={false}
            columns={[{title: '订单号', dataIndex: 'id', key: 'id'}, {
                title: '客户', dataIndex: 'customer', key: 'customer'
            }, {title: '金额', dataIndex: 'amount', key: 'amount'}, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (<Tag color={statusMap[status]?.color}>
                    {statusMap[status]?.text}
                </Tag>),
            }, {
                title: '操作',
                key: 'action',
                render: (_, record) => (<Button type="link" onClick={() => showOrderDetail(record.id)}>
                    查看详情
                </Button>),
            },]}
        />
    </Card>);
};

// 审批流程弹窗示例
const ApprovalProcessModalExample = () => {
    const modal = useModal();

    const showApprovalModal = useCallback((requestId) => {
        modal({
            title: "审批申请", width: 700, withDecorator: (render) => {
                return (<div>
                    <div style={{
                        background: '#f0f8ff', padding: '12px 16px', marginBottom: '16px', border: '1px solid #91d5ff'
                    }}>
                        <Space direction="vertical" size="small">
                            <div><strong>申请编号:</strong> {requestId}</div>
                            <div><strong>申请时间:</strong> 2023-06-15 09:30:00</div>
                            <div><strong>申请人:</strong> 张三 (技术部)</div>
                        </Space>
                    </div>
                    {render()}
                </div>);
            }, children: () => {
                return (<div>
                    <Descriptions title="申请信息" bordered column={2}>
                        <Descriptions.Item label="申请类型">费用报销</Descriptions.Item>
                        <Descriptions.Item label="申请金额">¥2,580.00</Descriptions.Item>
                        <Descriptions.Item label="费用类型">差旅费</Descriptions.Item>
                        <Descriptions.Item label="发生时间">2023-06-10 至 2023-06-12</Descriptions.Item>
                        <Descriptions.Item label="费用明细" span={2}>
                            <div>交通费: ¥800.00</div>
                            <div>住宿费: ¥1,200.00</div>
                            <div>餐饮费: ¥580.00</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="申请原因" span={2}>
                            前往上海参加技术交流会议，包含交通、住宿和餐饮费用。
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider/>

                    <div>
                        <h4>审批流程</h4>
                        <List
                            dataSource={[{
                                title: '部门经理审批',
                                name: '李经理',
                                status: 'completed',
                                time: '2023-06-15 10:15:00',
                                remark: '同意申请'
                            }, {
                                title: '财务审批',
                                name: '王会计',
                                status: 'completed',
                                time: '2023-06-15 14:30:00',
                                remark: '费用明细清晰，同意报销'
                            }, {
                                title: '总经理审批', name: '赵总', status: 'pending', time: '-', remark: '待审批'
                            },]}
                            renderItem={(item) => (<List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        style={{backgroundColor: item.status === 'completed' ? '#52c41a' : '#faad14'}}>
                                        {item.name[0]}
                                    </Avatar>}
                                    title={<Space>
                                        {item.title}
                                        <Tag color={item.status === 'completed' ? 'green' : 'orange'}>
                                            {item.status === 'completed' ? '已完成' : '待审批'}
                                        </Tag>
                                    </Space>}
                                    description={<div>
                                        <div>审批人: {item.name}</div>
                                        <div>审批时间: {item.time}</div>
                                        <div>审批意见: {item.remark}</div>
                                    </div>}
                                />
                            </List.Item>)}
                        />
                    </div>
                </div>);
            }, footerButtons: [{
                children: '打印申请', onClick: () => message.info("打印功能待实现"),
            }, {
                children: '驳回', onClick: () => message.success("申请已驳回"),
            }, {
                children: '批准', type: 'primary', onClick: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            message.success("申请已批准");
                            resolve();
                        }, 1000);
                    });
                },
            },],
        });
    }, [modal]);

    return (<Card title="审批列表" size="small">
        <Space direction="vertical" style={{width: '100%'}}>
            {[{
                id: 'REQ20230615001', type: '费用报销', applicant: '张三', amount: 2580, status: 'pending'
            }, {
                id: 'REQ20230615002', type: '请假申请', applicant: '李四', days: 3, status: 'approved'
            }, {
                id: 'REQ20230615003', type: '采购申请', applicant: '王五', amount: 15000, status: 'rejected'
            },].map((request) => (<Card key={request.id} size="small" style={{marginBottom: 8}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <div style={{fontWeight: 'bold', marginBottom: 4}}>{request.type}</div>
                        <div>申请人: {request.applicant}</div>
                        {request.amount && <div>金额: ¥{request.amount}</div>}
                        {request.days && <div>天数: {request.days}天</div>}
                        <div>
                            状态:
                            <Tag
                                color={request.status === 'pending' ? 'orange' : request.status === 'approved' ? 'green' : 'red'}>
                                {request.status === 'pending' ? '待审批' : request.status === 'approved' ? '已批准' : '已驳回'}
                            </Tag>
                        </div>
                    </div>
                    <Button type="primary" onClick={() => showApprovalModal(request.id)}>
                        处理审批
                    </Button>
                </div>
            </Card>))}
        </Space>
    </Card>);
};

const BusinessScenarioExamples = () => {
    return (<Space direction="vertical" style={{width: '100%'}} size="large">
        <UserManagementModalExample/>
        <OrderDetailModalExample/>
        <ApprovalProcessModalExample/>
    </Space>);
};

render(<BusinessScenarioExamples/>);