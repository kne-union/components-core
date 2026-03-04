const {TooltipFetch} = _Tooltip;
const {preset} = reactFetch;
const {Space, Tag, Typography, Card, Avatar} = antd;
const {Text, Title} = Typography;
const {default: Descriptions} = _Descriptions;

preset({
    ajax: (config) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (config.url === "/api/employee/detail") {
                    resolve({
                        data: {
                            code: 0, data: {
                                employeeId: "EMP-2024-001",
                                name: "张明",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZhangMing",
                                department: "技术研发部",
                                position: "高级前端工程师",
                                email: "zhangming@company.com",
                                phone: "+86 138-0001-2345",
                                joinDate: "2022-03-15",
                                performance: "A",
                                skills: ["React", "Vue", "TypeScript", "Node.js"],
                            },
                        },
                    });
                } else if (config.url === "/api/order/detail") {
                    resolve({
                        data: {
                            code: 0, data: {
                                orderId: "ORD-2024-001",
                                customer: "腾讯科技有限公司",
                                product: "企业版SaaS订阅服务",
                                amount: 125000.0,
                                status: "已完成",
                                createDate: "2024-01-10",
                                salesPerson: "李婷",
                                paymentMethod: "分期付款",
                                completionRate: 100,
                            },
                        },
                    });
                } else if (config.url === "/api/product/inventory") {
                    resolve({
                        data: {
                            code: 0, data: {
                                productId: "SKU-001",
                                productName: "华为Mate 60 Pro",
                                stock: 156,
                                inTransit: 50,
                                reserved: 20,
                                available: 86,
                                warningLevel: 200,
                                lastUpdate: "2024-01-15 10:30:00",
                            },
                        },
                    });
                }
            }, 800);
        });
    },
});

const BaseExample = () => {
    return (<Space direction="vertical" size="large" style={{width: "100%"}}>
        <div>
            <Text strong>员工信息快速查看</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/employee/detail"}}
                    size="large"
                    fetchContent={(data) => {
                        return ({
                            content: (<div style={{width: '500px'}}><Space direction="vertical" size="small">
                                <div style={{display: "flex", alignItems: "center", gap: 12}}>
                                    <Avatar src={data.avatar} size={48}/>
                                    <div>
                                        <Text strong style={{fontSize: 16}}>
                                            {data.name}
                                        </Text>
                                        <br/>
                                        <Text type="secondary">
                                            {data.department} · {data.position}
                                        </Text>
                                    </div>
                                </div>
                                <Descriptions
                                    size="small"
                                    dataSource={[[{label: "工号", content: data.employeeId}, {
                                        label: "邮箱", content: data.email
                                    }], [{label: "电话", content: data.phone}, {
                                        label: "入职日期", content: data.joinDate
                                    }], [{label: "绩效", content: data.performance}, {
                                        label: "技能", content: data.skills.join("、")
                                    }]]}
                                />
                            </Space></div>),
                        });
                    }}
                >
                    <Tag color="blue" style={{cursor: "pointer"}}>
                        张明 - 高级前端工程师
                    </Tag>
                </TooltipFetch>
            </div>
        </div>

        <div>
            <Text strong>订单详情快速查看</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/order/detail"}}
                    size="large"
                    fetchContent={(data) => ({
                        title: "订单详情", content: (<div style={{width: '500px'}}><Descriptions
                            size="small"
                            dataSource={[[{label: "订单号", content: data.orderId}, {
                                label: "客户", content: data.customer
                            }], [{label: "产品", content: data.product}, {
                                label: "金额", content: `¥${data.amount.toLocaleString()}`
                            }], [{
                                label: "状态", content: <Tag color="success">{data.status}</Tag>
                            }, {label: "完成率", content: `${data.completionRate}%`}, {
                                label: "创建日期", content: data.createDate
                            }], [{label: "销售", content: data.salesPerson}, {
                                label: "付款方式", content: data.paymentMethod
                            }]]}
                        /></div>),
                    })}
                >
                    <Tag color="green" style={{cursor: "pointer"}}>
                        ORD-2024-001 - 腾讯科技
                    </Tag>
                </TooltipFetch>
            </div>
        </div>

        <div>
            <Text strong>库存信息快速查看</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/product/inventory"}}
                    size="large"
                    fetchContent={(data) => ({
                        title: "库存详情",
                        importantInfo: data.available < data.warningLevel ? "库存不足！当前可用库存低于预警线。" : null,
                        importantInfoType: "warning",
                        content: (<div style={{width: '500px'}}>
                            <Descriptions
                                size="small"
                                dataSource={[[{label: "产品编号", content: data.productId}, {
                                    label: "产品名称", content: data.productName
                                }, {label: "库存总数", content: data.stock}], [{
                                    label: "在途数量", content: data.inTransit
                                }], [{label: "已预留", content: data.reserved}, {
                                    label: "可用库存", content: data.available
                                }], [{label: "预警线", content: data.warningLevel}, {
                                    label: "最后更新", content: data.lastUpdate
                                }]]}
                            />
                        </div>),
                    })}
                >
                    <Tag color="orange" style={{cursor: "pointer"}}>
                        华为Mate 60 Pro - 库存:156
                    </Tag>
                </TooltipFetch>
            </div>
        </div>

        <div>
            <Text strong>强制刷新数据</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/employee/detail"}}
                    size="large"
                    force={true}
                    fetchContent={(data) => ({
                        title: "员工信息（实时数据）", content: (<div>
                            <Text>姓名：{data.name}</Text>
                            <br/>
                            <Text>部门：{data.department}</Text>
                            <br/>
                            <Text type="secondary">
                                每次打开都会重新加载数据
                            </Text>
                        </div>),
                    })}
                >
                    <Tag color="purple" style={{cursor: "pointer"}}>
                        张明（实时数据）
                    </Tag>
                </TooltipFetch>
            </div>
        </div>
    </Space>);
};

render(<BaseExample/>);
