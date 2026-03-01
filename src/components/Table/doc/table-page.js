const {PureGlobal} = _Global;
const {default: Table, TablePage} = _Table;
const {range} = lodash;

const BaseExample = () => {
    return (<PureGlobal
        preset={{
            features: {
                debug: true, profile: {
                    id: "employee-management", type: "system", name: "员工管理系统", children: [{
                        id: "employee-list", type: "feature", name: "员工列表", options: {
                            hiddenColumns: ["workYears", "education"],
                        },
                    },],
                },
            },
        }}
    >
        <TablePage
            featureId="employee-list"
            name="employee-table"
            pagination={{
                open: true,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showTotal: (total) => `共 ${total} 名员工`,
            }}
            dataFormat={(data) => {
                return {
                    list: data.pageData, total: data.totalCount, data,
                };
            }}
            loader={({data}) => {
                const {currentPage = 1, perPage = 20} = data || {};
                const startIndex = (currentPage - 1) * perPage;

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            pageData: range(startIndex, Math.min(startIndex + perPage, 156)).map((index) => ({
                                id: `EMP${String(index + 1).padStart(4, "0")}`,
                                employeeNo: `EMP-2024-${String(index + 1).padStart(4, "0")}`,
                                name: index % 3 === 0 ? `张${["伟", "强", "敏", "磊", "杰"][index % 5]}` : index % 3 === 1 ? `李${["婷", "娜", "静", "丽", "娟"][index % 5]}` : `王${["刚", "磊", "勇", "涛", "鹏"][index % 5]}`,
                                enName: index % 3 === 0 ? `Zhang ${["Wei", "Qiang", "Min", "Lei", "Jie"][index % 5]}` : index % 3 === 1 ? `Li ${["Ting", "Na", "Jing", "Li", "Juan"][index % 5]}` : `Wang ${["Gang", "Lei", "Yong", "Tao", "Peng"][index % 5]}`,
                                department: ["技术研发部", "产品设计部", "市场营销部", "人力资源部", "财务部"][index % 5],
                                position: ["工程师", "高级工程师", "经理", "总监", "专员"][index % 5],
                                status: index % 4 === 0 ? "active" : index % 4 === 1 ? "vacation" : index % 4 === 2 ? "resigned" : "probation",
                                email: `employee${index + 1}@company.com`,
                                phone: `+86 138${String(index).padStart(8, "0")}`,
                                joinDate: `2023-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
                                workYears: Math.floor(index / 12) + 1,
                                salary: `${15 + (index % 20)}K-${20 + (index % 20)}K`,
                                education: ["本科", "硕士", "博士", "大专"][index % 4],
                                performance: ["A", "B", "C", "S"][index % 4],
                            })), totalCount: 156,
                        });
                    }, 300);
                });
            }}
            columns={[{
                name: "employeeNo", title: "工号", type: "serialNumber", primary: true, fixed: "left", width: 180,
            }, {
                name: "name", title: "姓名", type: "userName", fixed: "left", width: 120,
            }, {
                name: "enName", title: "英文名", type: "otherSmall", width: 120,
            }, {
                name: "department", title: "部门", type: "other", width: 150,
            }, {
                name: "position", title: "职位", type: "mainInfo", width: 180,
            }, {
                name: "status", title: "状态", type: "tag", width: 120, valueOf: (item) => {
                    const statusMap = {
                        active: {type: "success", text: "在职"},
                        vacation: {type: "warning", text: "休假"},
                        resigned: {type: "error", text: "离职"},
                        probation: {type: "processing", text: "试用期"},
                    };
                    return statusMap[item.status];
                },
            }, {
                name: "performance", title: "绩效", type: "tag", width: 100, valueOf: (item) => {
                    const perfMap = {
                        S: {type: "success", text: "S"},
                        A: {type: "processing", text: "A"},
                        B: {type: "warning", text: "B"},
                        C: {type: "error", text: "C"},
                    };
                    return perfMap[item.performance];
                },
            }, {
                name: "phone", title: "手机号", type: "hideInfo", width: 150, valueOf: (item) => ({
                    loader: () => item.phone,
                }),
            }, {
                name: "email",
                title: "邮箱",
                type: "contacts",
                width: 200,
                valueOf: (item) => `${item.name} ${item.email}`,
            }, {
                name: "joinDate", title: "入职日期", type: "date", width: 160,
            }, {
                name: "workYears", title: "工龄", type: "singleRow", width: 100, render: ({target}) => ({
                    children: `${target.workYears}年`,
                }),
            }, {
                name: "salary", title: "薪资范围", type: "hideInfo", width: 150, valueOf: (item) => ({
                    loader: () => item.salary,
                }),
            }, {
                name: "education", title: "学历", type: "otherSmall", width: 100,
            }, {
                name: "options", title: "操作", type: "options", fixed: "right", width: 200, valueOf: (item) => [{
                    onClick: () => {
                        console.log("查看员工:", item.name);
                    }, children: "查看",
                }, {
                    onClick: () => {
                        console.log("编辑员工:", item.name);
                    }, children: "编辑", disabled: item.status === "resigned", tooltipProps: {
                        title: item.status === "resigned" ? "离职员工不可编辑" : "",
                    },
                }, {
                    onClick: () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                console.log("导出数据:", item.name);
                                resolve();
                            }, 500);
                        });
                    }, children: "导出",
                },],
            },]}
            columnRenderProps={{
                currentUserId: "admin_001",
            }}
            summary={(current) => {
                const {pageData, data} = current;
                return (<Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={5}>
                            <strong>当前页统计</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5}>
                            <strong>{pageData.length} 人</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={6} colSpan={8}>
                            <strong>总员工数: {data?.totalCount || 0} 人</strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>);
            }}
        />
    </PureGlobal>);
};

render(<BaseExample/>);
