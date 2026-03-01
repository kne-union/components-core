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
