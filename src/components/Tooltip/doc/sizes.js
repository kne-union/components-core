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
