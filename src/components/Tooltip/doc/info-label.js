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
