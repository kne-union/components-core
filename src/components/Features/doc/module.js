const {default: Features} = _Features;
const {default: Layout, PermissionsPage} = layout;
const {PureGlobal} = global;
const {Route, Routes} = Router;

const ModuleExample = () => {
    return (<PureGlobal
            preset={{
                features: {
                    debug: true, profile: {
                        id: "crm-system", type: "system", name: "客户关系管理系统", children: [{
                            id: "dashboard", type: "module", name: "数据看板", children: [{
                                id: "sales-chart", type: "feature", name: "销售趋势图",
                            }, {
                                id: "customer-chart", type: "feature", name: "客户增长图",
                            },],
                        }, {
                            id: "customer", type: "module", name: "客户管理", children: [{
                                id: "advanced-filter",
                                type: "feature",
                                name: "高级筛选",
                                dependencies: ["crm-system:dashboard"],
                            },],
                        },],
                    },
                },
            }}
        >
            <Layout
                navigation={{
                    isFixed: false, showIndex: false, base: '/Features', list: [{
                        key: "dashboard", title: "数据看板", path: "/Features",
                    }, {
                        key: "customer", title: "客户管理", path: "/Features/customer",
                    },],
                }}
            >
                <Routes>
                    <Route
                        path="/Features"
                        element={<PermissionsPage name="dashboard" openFeatures>
                            <div>
                                <h2>数据看板</h2>
                                <div style={{
                                    padding: '16px',
                                    marginBottom: '16px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px'
                                }}>
                                    <Features id="sales-chart">
                                        <h3>销售趋势分析</h3>
                                        <p>展示最近30天销售数据变化趋势</p>
                                    </Features>
                                </div>
                                <div style={{padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
                                    <Features id="customer-chart">
                                        <h3>客户增长分析</h3>
                                        <p>展示客户数量变化趋势</p>
                                    </Features>
                                </div>
                            </div>
                        </PermissionsPage>}
                    />
                    <Route
                        path="/Features/customer"
                        element={<PermissionsPage name="customer" openFeatures>
                            <div>
                                <h2>客户管理</h2>
                                <div style={{padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
                                    <Features id="advanced-filter">
                                        <h3>高级筛选功能</h3>
                                        <p>支持多维度组合筛选客户数据</p>
                                    </Features>
                                </div>
                            </div>
                        </PermissionsPage>}
                    />
                </Routes>
            </Layout>
        </PureGlobal>);
};

render(<ModuleExample/>);
