const { default: Layout, PageHeader } = layout;
const { PureGlobal } = global;
const { Button, Space, Typography, Tag } = antd;

const { Title, Paragraph, Text } = Typography;

const shortActions = (
  <Space wrap>
    <Button type="primary">编辑</Button>
    <Button>更多</Button>
  </Space>
);

const manyActions = (
  <Space wrap>
    <Button type="primary">编辑</Button>
    <Button>开启</Button>
    <Button>关闭</Button>
    <Button danger>删除</Button>
    <Button>导出</Button>
    <Button>复制链接</Button>
  </Space>
);

const Section = ({ title, description, children }) => (
  <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
    <div style={{ padding: '12px 16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
      <Title level={5} style={{ margin: 0 }}>
        {title}
      </Title>
      {description ? (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {description}
        </Text>
      ) : null}
    </div>
    {children}
  </div>
);

const Example = () => {
  return (
    <PureGlobal>
      <Layout navigation={{ isFixed: false }}>
        <div style={{ padding: 16, background: '#f5f5f5', minHeight: '100%' }}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <div>
              <Title level={4} style={{ marginBottom: 4 }}>
                PageHeader 超长内容场景
              </Title>
              <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                覆盖超长标题、编号、标签与操作按钮组合。可用手机预览查看移动端换行与堆叠效果。
              </Paragraph>
            </div>

            <Section title="1. 基础短内容" description="对照基准：短标题 + 短编号 + 少量标签">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="科技创新有限公司"
                info="ID: tenant-001"
                buttonOptions={shortActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2024-01-01~2025-12-31',
                  '账号数:50'
                ]}
              />
            </Section>

            <Section title="2. 超长中文标题" description="模拟租户/公司全称，标题应自动换行且不被按钮挤出">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="北京中关村科技创新与产业升级综合服务平台运营管理有限责任公司"
                info="ID: tenant-001"
                buttonOptions={shortActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2024-01-01~2025-12-31',
                  '账号数:50'
                ]}
              />
            </Section>

            <Section title="3. 超长英文 / 无空格字符串" description="验证 overflow-wrap / word-break 对连续长串的处理">
              <PageHeader
                title="SuperLongEnterpriseNameWithoutSpacesForMobileLayoutTestingABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                info="ID: very-long-tenant-id-2024-abcdef-9876543210"
                buttonOptions={shortActions}
                tags={['Region:Asia-Pacific', 'Plan:Enterprise-Plus', 'Seats:1000']}
              />
            </Section>

            <Section title="4. 超长标题 + 超长 info" description="标题与编号在移动端应上下排列，编号可断行">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="上海浦东新区临港新片区智能制造与数字经济产业协同创新中心（筹）"
                info="编号: TN-2024-SH-PD-LG-SMART-MFG-DIGITAL-ECONOMY-001-FINAL"
                buttonOptions={shortActions}
                tags={['辅助信息A', '辅助信息B']}
              />
            </Section>

            <Section title="5. 超多 / 超长 tags" description="标签区应自动换行，移动端去掉竖线分隔">
              <PageHeader
                title="租户详情"
                info="ID: tenant-002"
                buttonOptions={shortActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2024-01-01~2026-12-31',
                  '账号数:9999',
                  '所属行业:人工智能 / 云计算 / 大数据分析',
                  '联系人:张三丰-产品运营中心-华北大区',
                  '备注:本租户为演示环境，请勿用于生产数据写入与正式合同签署流程'
                ]}
              />
            </Section>

            <Section title="6. 超长标题 + 多个操作按钮" description="移动端按钮应换行到标题下方并左对齐">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="深圳前海深港现代服务业合作区跨境电子商务综合试验区运营主体有限公司"
                info="ID: tenant-003"
                buttonOptions={manyActions}
                tags={[
                  <Tag color="error" key="status">
                    关闭
                  </Tag>,
                  '服务时间:2023-06-01~2024-06-01',
                  '账号数:12'
                ]}
              />
            </Section>

            <Section title="7. 极端组合" description="标题、编号、标签、按钮全部超长，用于回归移动端布局">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="中国（上海）自由贸易试验区临港新片区科技创新与先进制造业高质量发展示范园区管理服务有限公司（集团）"
                info="ID: tenant-extreme-long-id-2024-07-10-shanghai-lingang-free-trade-zone-demo-001"
                buttonOptions={manyActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2020-01-01~2030-12-31',
                  '账号数:100000',
                  '套餐:旗舰版旗舰版旗舰版旗舰版旗舰版',
                  '地址:上海市浦东新区临港新片区环湖西二路888号某某大厦A座1801-1808室',
                  '说明:这是一条用于验证 PageHeader tags 在窄屏下换行与可读性的超长辅助文案'
                ]}
              />
            </Section>
          </Space>
        </div>
      </Layout>
    </PureGlobal>
  );
};

render(<Example />);
