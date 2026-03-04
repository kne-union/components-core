const {default: Tooltip} = _Tooltip;
const {createWithRemoteLoader} = remoteLoader;
const {Space, Typography, Button} = antd;
const {Text} = Typography;

const BaseExample = createWithRemoteLoader({
    modules: ["components-core:FormInfo", "components-core:Global@PureGlobal"],
})(({remoteModules}) => {
    const [FormInfo, PureGlobal] = remoteModules;
    const {Form, SubmitButton, CancelButton} = FormInfo;
    const {Input, TextArea} = FormInfo.fields;

    const FilterForm = () => {
        return (<Form
                onSubmit={(data) => {
                    console.log("筛选条件:", data);
                }}
            >
                <Space direction="vertical" size="small">
                    <Input
                        name="productName"
                        label="产品名称"
                        placeholder="请输入产品名称"
                    />
                    <Input
                        name="productCode"
                        label="产品编号"
                        placeholder="请输入产品编号"
                    />
                    <TextArea
                        name="description"
                        label="备注说明"
                        placeholder="请输入备注说明"
                        rows={3}
                    />
                    <Space style={{width: "100%", justifyContent: "flex-end"}}>
                        <CancelButton>取消</CancelButton>
                        <SubmitButton>确定</SubmitButton>
                    </Space>
                </Space>
            </Form>);
    };

    const ApprovalForm = () => {
        return (<Form
                onSubmit={(data) => {
                    console.log("审批意见:", data);
                }}
            >
                <Space direction="vertical" size="small">
                    <Input
                        name="approver"
                        label="审批人"
                        placeholder="请输入审批人姓名"
                    />
                    <TextArea
                        name="comment"
                        label="审批意见"
                        placeholder="请输入审批意见"
                        rows={4}
                    />
                    <Space style={{width: "100%", justifyContent: "flex-end"}}>
                        <CancelButton>拒绝</CancelButton>
                        <SubmitButton type="primary">通过</SubmitButton>
                    </Space>
                </Space>
            </Form>);
    };

    return (<PureGlobal>
            <Space direction="vertical" size="large" style={{width: "100%"}}>
                <div>
                    <Text strong>快速筛选功能</Text>
                    <div style={{marginTop: 12}}>
                        <Tooltip
                            trigger="click"
                            size="large"
                            title="高级筛选"
                            moreInfo={<FilterForm/>}
                        >
                            <Button type="primary">打开筛选面板</Button>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <Text strong>快速审批功能</Text>
                    <div style={{marginTop: 12}}>
                        <Tooltip
                            trigger="click"
                            size="large"
                            title="快速审批"
                            content="请填写审批意见后提交："
                            moreInfo={<ApprovalForm/>}
                        >
                            <Button type="primary" danger>
                                快速审批
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <Text strong>实际应用场景</Text>
                    <div style={{marginTop: 12}}>
                        <Space>
                            <Tooltip
                                trigger="click"
                                title="批量操作"
                                content="已选择 12 条记录"
                                moreInfo={<Space direction="vertical" style={{marginTop: 12}}>
                                    <Button size="small" block>
                                        批量删除
                                    </Button>
                                    <Button size="small" block>
                                        批量导出
                                    </Button>
                                    <Button size="small" block>
                                        批量修改状态
                                    </Button>
                                </Space>}
                            >
                                <Button>批量操作</Button>
                            </Tooltip>

                            <Tooltip
                                trigger="click"
                                size="large"
                                title="数据导出设置"
                                content="请选择导出字段和格式："
                                moreInfo={<Space direction="vertical" size="small" style={{marginTop: 12}}>
                                    <Text>导出字段：</Text>
                                    <Space wrap>
                                        <Text code>订单号</Text>
                                        <Text code>客户名称</Text>
                                        <Text code>金额</Text>
                                        <Text code>状态</Text>
                                        <Text code>创建时间</Text>
                                    </Space>
                                    <Text>导出格式：</Text>
                                    <Space>
                                        <Button size="small">Excel</Button>
                                        <Button size="small">CSV</Button>
                                        <Button size="small">PDF</Button>
                                    </Space>
                                </Space>}
                            >
                                <Button>导出数据</Button>
                            </Tooltip>
                        </Space>
                    </div>
                </div>
            </Space>
        </PureGlobal>);
});

render(<BaseExample/>);
