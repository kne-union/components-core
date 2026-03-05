const { default: Layout, Page, Menu } = layout;
const { Flex, Space, Button, Typography, Card, Descriptions } = antd;
const { PureGlobal } = global;
const { useState } = React;
const { Title, Paragraph } = Typography;

const MobileExample = () => {
    const [isMobile, setIsMobile] = useState(true);

    return (
        <Layout
            navigation={{
                isFixed: false,
                list: [
                    {key: 'dashboard', title: '首页', path: '/dashboard'},
                    {key: 'users', title: '用户管理', path: '/users'},
                    {key: 'settings', title: '系统设置', path: '/settings'}
                ]
            }}
            isMobile={isMobile}
        >
            <Page
                name="mobile-example"
                menuFixed={false}
                menu={
                    <Menu
                        items={[
                            {
                                label: "组织架构",
                                key: "org",
                                iconType: "icon-zhanghaodenglu",
                                children: [
                                    {
                                        label: "部门管理",
                                        key: "dept",
                                        path: "/dept",
                                    },
                                    {
                                        label: "员工管理",
                                        key: "employee",
                                        path: "/employee",
                                    },
                                ],
                            },
                            {
                                label: "业务管理",
                                key: "business",
                                iconType: "icon-zhanghaodenglu",
                                children: [
                                    {
                                        label: "订单管理",
                                        key: "order",
                                        path: "/order",
                                    },
                                    {
                                        label: "客户管理",
                                        key: "customer",
                                        path: "/customer",
                                    },
                                    {
                                        label: "产品管理",
                                        key: "product",
                                        path: "/product",
                                    },
                                ],
                            },
                            {
                                label: "数据报表",
                                key: "report",
                                iconType: "icon-zhanghaodenglu",
                                children: [
                                    {
                                        label: "销售报表",
                                        key: "sales-report",
                                        path: "/sales-report",
                                    },
                                    {
                                        label: "财务报表",
                                        key: "finance-report",
                                        path: "/finance-report",
                                    },
                                ],
                            },
                        ]}
                    />
                }
                title="组织管理"
                titleExtra={
                    <Space>
                        <Button
                            type={isMobile ? 'primary' : 'default'}
                            onClick={() => setIsMobile(true)}
                        >
                            移动端
                        </Button>
                        <Button
                            type={!isMobile ? 'primary' : 'default'}
                            onClick={() => setIsMobile(false)}
                        >
                            桌面端
                        </Button>
                    </Space>
                }
            >
                <Card>
                    <Descriptions title="移动端特性说明" bordered column={1}>
                        <Descriptions.Item label="当前模式">
                            {isMobile ? '移动端模式' : '桌面端模式'}
                        </Descriptions.Item>
                        <Descriptions.Item label="自动检测">
                            当窗口宽度小于768px时自动切换为移动端模式
                        </Descriptions.Item>
                        <Descriptions.Item label="菜单展示">
                            {isMobile ? '左侧菜单隐藏，显示"菜单"按钮，点击后以Drawer形式展示' : '左侧固定菜单显示'}
                        </Descriptions.Item>
                        <Descriptions.Item label="默认收起">
                            Drawer默认关闭，点击按钮后打开
                        </Descriptions.Item>
                        <Descriptions.Item label="强制控制">
                            可通过isMobile属性强制指定为移动端或桌面端模式
                        </Descriptions.Item>
                        <Descriptions.Item label="布局调整">
                            移动端模式下内容区边距和圆角会自动调整
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="示例数据" style={{marginTop: 16}}>
                    <Paragraph>
                        这是移动端适配的示例内容。在实际业务中,这里会显示具体的业务数据和操作界面。
                    </Paragraph>
                    <Space direction="vertical" style={{width: '100%'}}>
                        <Button block>操作按钮1</Button>
                        <Button block>操作按钮2</Button>
                        <Button block type="primary">主要操作</Button>
                    </Space>
                </Card>
            </Page>
        </Layout>
    );
};

render(
    <PureGlobal>
        <MobileExample />
    </PureGlobal>
);
