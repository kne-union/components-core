# Tooltip

### 概述

Tooltip 组件是一个功能强大的文字提示气泡框，基于 Ant Design Tooltip 二次封装，提供了丰富的内容展示能力。

组件支持三种使用方式：
- **Tooltip**: 基础提示组件，支持标题、内容、重要信息、副标题等多种内容组合
- **TooltipFetch**: 集成远程数据加载的提示组件，适用于需要动态获取数据的场景
- **TooltipInfoLabel**: 带信息图标的标签组件，常用于表单字段标签

主要特性：
- 支持多种内容组合（标题、内容、重要信息、副标题）
- 支持 3 种尺寸（small、默认、large）
- 支持重要信息类型（success、warning、error）
- 支持嵌入自定义内容（如表单、图表等）
- 支持远程数据加载和缓存
- 支持多种触发方式（hover、click、focus 等）


### 示例

#### 示例代码

- 基础用法
- 展示 Tooltip 组件的基础用法，包括纯文本提示、带标题的提示、带副标题的提示、点击触发方式以及自定义位置等常用场景。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { default: Tooltip } = _Tooltip;
const { Space, Button, Tag, Typography } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>基础用法 - 纯文本提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip content="这是一段简单的提示文本，用于解释说明。">
            <Tag color="blue">简单提示</Tag>
          </Tooltip>
          <Tooltip content="审批流程需要经过部门主管、财务部门、总经理三级审批，整个流程预计需要3-5个工作日完成。">
            <Tag color="green">流程说明</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>带标题的提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            title="数据统计规则"
            content="统计范围：2024年1月1日至当前日期的所有有效订单数据。"
          >
            <Tag color="purple">销售额统计</Tag>
          </Tooltip>
          <Tooltip
            title="权限说明"
            content="仅系统管理员和部门主管可以查看完整的员工薪资信息，普通用户只能看到薪资范围。"
          >
            <Tag color="orange">薪资权限</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>带副标题的提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            title="候选人推荐指数"
            subtitle="计算规则："
            content="根据候选人的面试评分、项目经验、技能匹配度、薪资期望等多个维度综合计算得出。"
          >
            <Tag color="cyan">推荐算法</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>点击触发</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            trigger="click"
            title="操作指南"
            content='点击"编辑"按钮可以修改订单信息，点击"取消"按钮可以撤销订单，点击"导出"按钮可以导出订单详情。'
          >
            <Button size="small">查看操作说明</Button>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>自定义位置</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip placement="top" content="顶部提示 Top">
            <Button size="small">Top</Button>
          </Tooltip>
          <Tooltip placement="bottom" content="底部提示 Bottom">
            <Button size="small">Bottom</Button>
          </Tooltip>
          <Tooltip placement="left" content="左侧提示 Left">
            <Button size="small">Left</Button>
          </Tooltip>
          <Tooltip placement="right" content="右侧提示 Right">
            <Button size="small">Right</Button>
          </Tooltip>
        </Space>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 不同尺寸
- 展示 Tooltip 组件的三种尺寸（small 240px、默认 360px、large 480px），以及在实际业务场景中如何选择合适的尺寸。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { default: Tooltip } = _Tooltip;
const { Space, Typography } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>小尺寸提示框 (240px)</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            size="small"
            title="快速筛选"
            content="支持按状态、时间、部门等维度进行数据筛选。"
          >
            <Text code style={{ cursor: "pointer" }}>
              小尺寸提示
            </Text>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>默认尺寸提示框 (360px)</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="项目进度说明"
            content="项目进度根据已完成任务数占总任务数的比例计算。进度低于30%显示红色，30%-70%显示黄色，高于70%显示绿色。"
          >
            <Text code style={{ cursor: "pointer" }}>
              默认尺寸提示
            </Text>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>大尺寸提示框 (480px)</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            size="large"
            title="绩效评估规则"
            content="绩效评估采用360度评估法，包括自评（20%）、上级评分（40%）、同事评分（20%）、下属评分（20%）四个维度。评估周期为每季度一次，年度绩效为四个季度的平均值。评估等级分为：S（卓越）、A（优秀）、B（良好）、C（合格）、D（待改进）。"
          >
            <Text code style={{ cursor: "pointer" }}>
              大尺寸提示
            </Text>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>实际应用场景对比</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            size="small"
            title="快捷操作"
            content="双击行可快速编辑"
          >
            <a href="#">编辑提示</a>
          </Tooltip>
          <Tooltip
            title="数据说明"
            content="本月销售额为1,256,800元，环比增长15.3%，同比增长28.7%。主要增长来源为新客户开发和老客户复购。"
          >
            <a href="#">销售数据</a>
          </Tooltip>
          <Tooltip
            size="large"
            title="系统更新日志"
            content="v2.3.0 (2024-01-15): 1. 新增批量导入功能；2. 优化搜索性能，响应速度提升50%；3. 修复已知bug 12个；4. 升级UI设计，提升用户体验。v2.2.0 (2024-01-01): 1. 新增数据导出功能；2. 支持多语言切换。"
          >
            <a href="#">版本记录</a>
          </Tooltip>
        </Space>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 重要信息提示
- 展示如何使用 importantInfo 属性突出显示重要信息，支持 success、warning、error 三种类型，适用于审核状态、库存预警、支付结果等业务场景。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { default: Tooltip } = _Tooltip;
const { Space, Typography, Tag } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>成功类型的重要信息</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="审核通过"
            importantInfo="恭喜！您的项目申请已通过审核，可以进行下一步操作。"
            importantInfoType="success"
            content="审核意见：项目方案合理，预算充足，团队成员配置得当，同意立项。请于3个工作日内完成项目启动准备工作。"
          >
            <Tag color="success" style={{ cursor: "pointer" }}>
              审核状态
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>警告类型的重要信息</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="库存预警"
            importantInfo="当前库存量已低于安全库存线，请及时补货！"
            importantInfoType="warning"
            content="商品【华为Mate 60 Pro】当前库存：156台，安全库存：200台。建议立即联系供应商补充库存，避免出现缺货情况。"
          >
            <Tag color="warning" style={{ cursor: "pointer" }}>
              库存状态
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>错误类型的重要信息</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="付款失败"
            importantInfo="订单付款失败，请检查支付信息后重试！"
            importantInfoType="error"
            subtitle="失败原因："
            content="银行卡余额不足。订单金额：¥15,680.00，银行卡余额：¥12,350.00。请更换支付方式或充值后重试。"
          >
            <Tag color="error" style={{ cursor: "pointer" }}>
              支付状态
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>复杂信息展示</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="候选人评估报告"
            importantInfo="综合评分：A级（强烈推荐）"
            importantInfoType="success"
            subtitle="评分详情："
            content={
              <div>
                <div>• 技术能力：90分（优秀）</div>
                <div>• 项目经验：85分（良好）</div>
                <div>• 沟通能力：88分（良好）</div>
                <div>• 团队协作：92分（优秀）</div>
                <div>• 学习能力：95分（卓越）</div>
              </div>
            }
          >
            <Tag color="blue" style={{ cursor: "pointer" }}>
              查看评估
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>实际业务场景 - 数据统计说明</Text>
        <div style={{ marginTop: 12 }}>
          <Space>
            <Tooltip
              title="客户转化率"
              importantInfo="本月转化率较上月提升5.2%，表现优异！"
              importantInfoType="success"
              content="潜在客户：1,256人 → 初步接触：892人 → 深度沟通：456人 → 成交：287人。转化漏斗各环节转化率分别为：71%、51%、63%。"
            >
              <a href="#">转化漏斗</a>
            </Tooltip>
            <Tooltip
              title="异常数据提醒"
              importantInfo="检测到3条异常数据，请及时处理！"
              importantInfoType="warning"
              content="订单#202401150001：金额异常（超出历史平均值的5倍）；订单#202401150002：收货地址异常（无法定位）；订单#202401150003：支付时间异常（耗时过长）。"
            >
              <a href="#">异常监控</a>
            </Tooltip>
          </Space>
        </div>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 嵌入表单内容
- 展示如何在 Tooltip 中嵌入表单组件（如筛选表单、审批表单），实现快速操作功能，适用于批量操作、数据导出等复杂交互场景。
- _Tooltip(@components/Tooltip),remoteLoader(@kne/remote-loader),antd(antd)

```jsx
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

```

- TooltipInfoLabel 标签组件
- 展示 TooltipInfoLabel 组件的使用方法，该组件结合了标签和提示功能，常用于表单字段标签，可以快速为字段添加帮助说明和重要提示。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { TooltipInfoLabel } = _Tooltip;
const { Space, Typography, Divider } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>基础用法 - 带提示的标签</Text>
        <div style={{ marginTop: 12 }}>
          <Space direction="vertical" size="small">
            <TooltipInfoLabel
              title="客户名称"
              tooltipTitle={{
                content: "请填写客户的全称，用于合同签署和发票开具。",
              }}
            />
            <TooltipInfoLabel
              title="联系人"
              tooltipTitle={{
                content: "客户方的主要联系人，建议填写项目负责人。",
              }}
            />
            <TooltipInfoLabel
              title="联系电话"
              tooltipTitle={{
                content: "联系人电话，支持手机号和座机号，格式：区号-座机号或手机号。",
              }}
            />
          </Space>
        </div>
      </div>

      <Divider />

      <div>
        <Text strong>带重要信息的标签</Text>
        <div style={{ marginTop: 12 }}>
          <Space direction="vertical" size="small">
            <TooltipInfoLabel
              title="销售额统计周期"
              tooltipTitle={{
                importantInfo: "统计周期为自然月，每月1日0点至月末23:59:59。",
                importantInfoType: "success",
                content: "例如：2024年1月的统计周期为2024-01-01 00:00:00至2024-01-31 23:59:59。",
              }}
            />
            <TooltipInfoLabel
              title="库存预警阈值"
              tooltipTitle={{
                importantInfo: "库存低于此值时系统将自动发送补货提醒。",
                importantInfoType: "warning",
                content: "建议根据历史销量和补货周期设置合理的预警阈值，一般设置为安全库存的80%。",
              }}
            />
            <TooltipInfoLabel
              title="审批截止时间"
              tooltipTitle={{
                importantInfo: "超过截止时间未审批将自动流转至上一级审批人！",
                importantInfoType: "error",
                content: "普通审批：24小时内；紧急审批：4小时内；特急审批：1小时内。",
              }}
            />
          </Space>
        </div>
      </div>

      <Divider />

      <div>
        <Text strong>复杂信息标签</Text>
        <div style={{ marginTop: 12 }}>
          <Space direction="vertical" size="small">
            <TooltipInfoLabel
              title="候选人评分规则"
              tooltipTitle={{
                title: "评分维度说明",
                importantInfo: "综合评分由技术能力、项目经验、沟通能力、团队协作四个维度组成。",
                subtitle: "权重分配：",
                content: "技术能力(40%)、项目经验(30%)、沟通能力(15%)、团队协作(15%)。评分采用百分制，90分以上为A级，80-89分为B级，60-79分为C级，60分以下为D级。",
              }}
            />
            <TooltipInfoLabel
              title="项目优先级"
              tooltipTitle={{
                title: "优先级判定规则",
                importantInfo: "P0级项目：公司战略项目，需最高优先级处理",
                importantInfoType: "error",
                subtitle: "优先级定义：",
                content: "P0：战略级（影响公司业务发展）；P1：重要级（影响部门KPI）；P2：普通级（常规业务需求）；P3：优化级（体验优化类）。",
              }}
            />
            <TooltipInfoLabel
              title="数据权限说明"
              tooltipTitle={{
                title: "权限范围",
                content: "系统管理员：全部数据；部门主管：本部门数据；普通员工：个人数据；只读用户：仅可查看，不可编辑。",
              }}
            />
          </Space>
        </div>
      </div>

      <Divider />

      <div>
        <Text strong>实际应用场景 - 表单字段标签</Text>
        <div
          style={{
            marginTop: 12,
            padding: 16,
            background: "#f5f5f5",
            borderRadius: 4,
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <TooltipInfoLabel
                title="订单编号"
                tooltipTitle={{
                  content: "系统自动生成，格式：ORD-YYYYMMDD-序号",
                }}
              />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                ORD-20240115-001
              </Text>
            </div>
            <div>
              <TooltipInfoLabel
                title="预计交付日期"
                tooltipTitle={{
                  importantInfo: "请在交付日期前至少3天完成生产准备！",
                  importantInfoType: "warning",
                  content: "交付日期考虑了生产周期、质检时间和物流时间，请务必按时完成。",
                }}
              />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                2024-02-15
              </Text>
            </div>
            <div>
              <TooltipInfoLabel
                title="付款方式"
                tooltipTitle={{
                  title: "付款方式说明",
                  content: "支持：全款预付、分期付款、货到付款三种方式。分期付款需签订补充协议。",
                }}
              />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                分期付款（30%预付款）
              </Text>
            </div>
          </Space>
        </div>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 远程数据加载
- 展示 TooltipFetch 组件的使用方法，该组件支持从远程接口加载数据并动态展示，适用于员工信息、订单详情、库存信息等需要实时数据的场景。支持数据缓存和强制刷新。
- _Tooltip(@components/Tooltip),reactFetch(@kne/react-fetch),_Descriptions(@components/Descriptions),antd(antd)

```jsx
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
                                label: "金额", content: &#96;¥${data.amount.toLocaleString()}&#96;
                            }], [{
                                label: "状态", content: <Tag color="success">{data.status}</Tag>
                            }, {label: "完成率", content: &#96;${data.completionRate}%&#96;}, {
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

```

### API

### Tooltip 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| size | 提示框宽度，可选值：small(240px)、默认(360px)、large(480px) | string | - |
| title | 标题内容 | string/ReactNode | - |
| content | 主要内容 | string/ReactNode | - |
| subtitle | 副标题内容 | string/ReactNode | - |
| importantInfo | 重要提示信息 | string/ReactNode | - |
| importantInfoType | 重要信息类型，可选值：success、warning、error | string | - |
| showInfo | 是否显示标题旁的提示图标 | boolean | false |
| moreInfo | 扩展内容区域，可嵌入表单、图表等 | ReactNode | - |
| trigger | 触发方式，可选值：hover、click、focus | string | 'hover' |
| placement | 气泡框位置 | string | 'top' |
| overlayClassName | 自定义气泡框类名 | string | - |

### TooltipFetch 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| api | 数据接口配置，参考 @kne/react-fetch | object | - |
| fetchContent | 数据转换函数，接收接口返回数据，返回 Tooltip 的 props | function | - |
| showLoading | 是否显示加载状态 | boolean | true |
| loadingClassName | 加载动画的自定义类名 | string | - |
| force | 是否每次显示都重新加载数据 | boolean | false |

### TooltipInfoLabel 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| title | 标签文字 | string | - |
| tooltipTitle | Tooltip 的属性对象，会传递给 Tooltip 组件 | object | - |
