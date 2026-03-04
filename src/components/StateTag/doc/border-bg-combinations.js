const { default: StateTag } = _StateTag;
const { Card, Divider, Space, Table, message } = antd;

const BorderBgCombinationsExample = () => {
  const types = [
    { key: "default", label: "默认", business: "已取消/已关闭" },
    { key: "skill", label: "技能", business: "技能标签" },
    { key: "result", label: "结果", business: "筛选结果" },
    { key: "filterResult", label: "筛选结果", business: "筛选条件" },
    { key: "success", label: "成功", business: "已通过/已完成" },
    { key: "progress", label: "进行中", business: "审核中/处理中" },
    { key: "danger", label: "危险", business: "已拒绝/已失败" },
    { key: "info", label: "信息", business: "待处理/待审核" },
    { key: "other", label: "其他", business: "其他状态" },
  ];

  const columns = [
    {
      title: "状态类型",
      dataIndex: "type",
      render: (_, record) => (
        <Space>
          <StateTag text={record.label} type={record.key} />
          <span>{record.label}</span>
        </Space>
      ),
    },
    {
      title: "无边框有背景（默认）",
      dataIndex: "noBorder",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={false} 
          showBackground={true} 
        />
      ),
    },
    {
      title: "有边框有背景",
      dataIndex: "withBorder",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={true} 
          showBackground={true} 
        />
      ),
    },
    {
      title: "有边框无背景",
      dataIndex: "borderNoBg",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={true} 
          showBackground={false} 
        />
      ),
    },
    {
      title: "业务场景示例",
      dataIndex: "businessExample",
      render: (_, record) => {
        const examples = {
          default: "已取消开票",
          skill: "React, Vue, JavaScript",
          result: "已选择: 5项",
          filterResult: "BD: 张三, 李四",
          success: "审核已通过",
          progress: "审核进行中",
          danger: "审核已拒绝",
          info: "待提交审核",
          other: "其他状态标签",
        };
        return (
          <StateTag 
            text={examples[record.key]} 
            type={record.key} 
            filterName={record.key === "filterResult" ? "BD" : undefined}
          />
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="状态标签边框与背景组合效果">
        <p>展示不同状态下边框和背景的组合效果，帮助选择最适合业务场景的配置。</p>
        <Table
          columns={columns}
          dataSource={types}
          rowKey="key"
          pagination={false}
          bordered
        />
      </Card>
      
      <Divider />
      
      <Card title="Ant Design Tag 其他属性展示">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <h4>可关闭标签:</h4>
            <Space wrap>
              <StateTag 
                text="可关闭的成功标签" 
                type="success" 
                closable 
                onClose={() => console.log("关闭了成功标签")}
              />
              <StateTag 
                text="可关闭的筛选结果" 
                type="filterResult" 
                filterName="部门"
                closable 
                onClose={() => console.log("关闭了筛选结果")}
              />
            </Space>
          </div>
          
          <div>
            <h4>可点击标签（带事件）:</h4>
            <Space wrap>
              <StateTag 
                text="点击查看详情" 
                type="info" 
                onClick={() => message.info("点击了信息标签")}
                style={{ cursor: "pointer" }}
              />
              <StateTag 
                text="查看进度" 
                type="progress" 
                onClick={() => message.info("点击了进度标签")}
                style={{ cursor: "pointer" }}
              />
            </Space>
          </div>
          
          <div>
            <h4>自定义样式:</h4>
            <Space wrap>
              <StateTag 
                text="圆角标签" 
                type="success" 
                style={{ borderRadius: 20 }}
              />
              <StateTag 
                text="大字号标签" 
                type="danger" 
                style={{ fontSize: 16, padding: "4px 12px" }}
              />
            </Space>
          </div>
        </Space>
      </Card>
      
      <Card title="实际业务场景示例">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <strong>项目状态:</strong>
            <Space>
              <StateTag text="项目立项" type="info" />
              <StateTag text="开发中" type="progress" />
              <StateTag text="测试阶段" type="progress" />
              <StateTag text="已上线" type="success" />
              <StateTag text="已暂停" type="default" />
            </Space>
          </div>
          
          <div>
            <strong>审批流程:</strong>
            <Space>
              <StateTag text="待提交" type="info" />
              <StateTag text="部门审核中" type="progress" />
              <StateTag text="财务审核中" type="progress" />
              <StateTag text="总经理审批中" type="progress" />
              <StateTag text="已通过" type="success" />
              <StateTag text="已拒绝" type="danger" />
            </Space>
          </div>
          
          <div>
            <strong>筛选条件:</strong>
            <Space>
              <StateTag text="北京分公司, 上海分公司" type="filterResult" filterName="分公司" />
              <StateTag text="技术部, 产品部" type="filterResult" filterName="部门" />
              <StateTag text="2024-01-01 至 2024-12-31" type="filterResult" filterName="日期范围" />
            </Space>
          </div>
          
          <div>
            <strong>技能标签:</strong>
            <Space>
              <StateTag text="React" type="skill" showBorder showBackground={false} />
              <StateTag text="Vue.js" type="skill" showBorder showBackground={false} />
              <StateTag text="JavaScript" type="skill" showBorder showBackground={false} />
              <StateTag text="TypeScript" type="skill" showBorder showBackground={false} />
              <StateTag text="Node.js" type="skill" showBorder showBackground={false} />
            </Space>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

render(<BorderBgCombinationsExample />);
