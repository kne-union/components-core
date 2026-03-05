
# info-page


### 描述

一般用在复杂的详情展示页面，InfoPage提供了一个标准的展示信息的格式


### 安装

```shell
npm i --save @kne/info-page
```


### 概述

info-page 是一个专为复杂详情展示页面设计的 React 组件库，提供标准化的信息展示格式和丰富的布局选项。

## 核心特性

- **统一的信息展示标准**：提供一致的详情页面展示格式，确保用户体验的连贯性
- **灵活的布局组件**：包含多种布局方式，支持网格、表格、分栏等多种展示形式
- **强大的数据处理能力**：内置数据格式化、空值处理、条件显示等实用功能
- **高度可定制化**：支持自定义渲染、样式定制和扩展配置
- **现代化设计**：基于 Ant Design 构建，支持响应式布局

## 适用场景

- **管理系统详情页**：用户信息、订单详情、产品信息等复杂展示场景
- **数据报告页面**：需要结构化展示多维度数据的报表和统计页面  
- **工作流展示**：流程审批记录、操作历史等时序信息展示
- **数据对比页面**：多列对比展示、评分系统等
- **打印友好设计**：支持分页打印的报告生成

## 技术亮点

- **组件化设计**：提供 InfoPage、Content、TableView、Flow 等独立组件，可单独使用也可组合使用
- **智能列计算**：自动计算列宽、响应式布局适配，支持固定列和自适应列混合使用
- **丰富的格式化选项**：内置日期、数字、货币、布尔值等多种数据格式化器
- **条件渲染机制**：支持基于数据动态控制字段显示状态
- **TypeScript 友好**：完整的类型定义支持，提供良好的开发体验

### 示例

#### 示例代码

- 基础布局
- 展示InfoPage容器组件和Part区块组件的基本使用方法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { default: InfoPage } = _InfoPage;
const { Button, Space, Flex, Tag } = antd;

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Space direction="vertical" size={16}>
        {/* 基础 Part 使用 */}
        <InfoPage.Part title="个人信息" subtitle="展示基础 Part 用法">
          <Space direction="vertical" size={8}>
            <div><strong>姓名：</strong>张三</div>
            <div><strong>性别：</strong>男</div>
            <div><strong>年龄：</strong>28岁</div>
          </Space>
        </InfoPage.Part>

        {/* 带 extra 的 Part */}
        <InfoPage.Part 
          title="联系方式" 
          subtitle="展示标题和额外操作区"
          extra={<Button type="primary" size="small">编辑</Button>}
        >
          <Space direction="vertical" size={8}>
            <div><strong>手机：</strong>138-0013-8000</div>
            <div><strong>邮箱：</strong>zhangsan@example.com</div>
            <div><strong>地址：</strong>深圳市南山区科技园</div>
          </Space>
        </InfoPage.Part>

        {/* 嵌套 Part */}
        <InfoPage.Part title="工作经历">
          <p>以下展示了 Part 的嵌套使用：</p>
          <InfoPage.Part subtitle="现任职位" style={{ background: '#f5f5f5', padding: '12px' }}>
            <Space direction="vertical" size={8}>
              <div><strong>公司：</strong>腾讯科技</div>
              <div><strong>职位：</strong>高级前端工程师</div>
              <div><strong>入职时间：</strong>2020年3月</div>
            </Space>
          </InfoPage.Part>
        </InfoPage.Part>

        {/* 带 bordered 的 Part */}
        <InfoPage.Part title="项目经验" bordered>
          <Space direction="vertical" size={8}>
            <div><strong>项目名称：</strong>企业级管理系统</div>
            <div><strong>技术栈：</strong>React、TypeScript、Ant Design</div>
            <div><strong>职责：</strong>负责前端架构设计与核心功能开发</div>
          </Space>
        </InfoPage.Part>

        {/* Collapse 折叠面板 */}
        <InfoPage.Collapse
          items={[
            { 
              key: '1', 
              label: '教育背景', 
              children: (
                <Space direction="vertical" size={8}>
                  <div><strong>学校：</strong>深圳大学</div>
                  <div><strong>专业：</strong>计算机科学与技术</div>
                  <div><strong>学历：</strong>本科</div>
                  <div><strong>毕业时间：</strong>2018年6月</div>
                </Space>
              )
            },
            { 
              key: '2', 
              label: '技能证书', 
              children: (
                <Space wrap>
                  <Tag color="blue">PMP项目管理</Tag>
                  <Tag color="green">阿里云ACP认证</Tag>
                  <Tag color="purple">AWS解决方案架构师</Tag>
                </Space>
              )
            }
          ]}
        />

        {/* 无标题 Part */}
        <InfoPage.Part>
          <div style={{ color: '#666', padding: '12px', background: '#fafafa' }}>
            <strong>备注：</strong>以上信息仅供示例展示，不代表真实数据
          </div>
        </InfoPage.Part>
      </Space>
    </Flex>
  );
};

render(<BaseExample />);

```

- 内容列表
- 支持多列布局和标签对齐的灵活内容展示组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Content } = _InfoPage;
const { Space, Radio, Tag } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 2,
    size: 'default',
    labelAlign: 'left'
  });

  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps(prevState => Object.assign({}, prevState, { [name]: val }));
  };

  return (
    <Space direction='vertical' size={16}>
      {/* 控制面板 */}
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <div>
            <span style={{ marginRight: 8 }}>列数：</span>
            <Radio.Group onChange={(e) => onChange(e, 'col')} value={listProps.col}>
              <Radio.Button value={1}>单列</Radio.Button>
              <Radio.Button value={2}>两列</Radio.Button>
              <Radio.Button value={3}>三列</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>标签对齐：</span>
            <Radio.Group onChange={(e) => onChange(e, 'labelAlign')} value={listProps.labelAlign}>
              <Radio.Button value='left'>左对齐</Radio.Button>
              <Radio.Button value='center'>居中</Radio.Button>
              <Radio.Button value='right'>右对齐</Radio.Button>
              <Radio.Button value='auto'>自适应</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>尺寸：</span>
            <Radio.Group onChange={(e) => onChange(e, 'size')} value={listProps.size}>
              <Radio.Button value='default'>默认</Radio.Button>
              <Radio.Button value='small'>小尺寸</Radio.Button>
            </Radio.Group>
          </div>
        </Space>
      </div>

      {/* Content 组件展示 */}
      <Content
        {...listProps}
        list={[
          { label: '客户名称', content: '深圳市腾讯计算机系统有限公司' },
          { label: '统一社会信用代码', content: '914403007109410773' },
          { label: '法定代表人', content: '马化腾' },
          { label: '企业类型', content: <Tag color="blue">有限责任公司</Tag> },
          { label: '成立日期', content: '1998-11-11' },
          { label: '注册资本', content: '500万美元' },
          { label: '经营状态', content: <Tag color="success">存续</Tag> },
          { label: '注册地址', content: '深圳市南山区高新科技园科技中一路腾讯大厦' },
          {
            label: '经营范围',
            content: '计算机软硬件的技术开发、销售；计算机网络工程；系统集成；软件开发及技术服务；信息咨询；网络设备、通讯设备、电子产品的技术开发与销售；国内贸易。',
            block: true
          }
        ]}
        itemRender={(inner, other) => {
          return other?.index === 8 ? <div style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
            * 以上信息仅供展示，不代表真实数据
          </div> : inner;
        }}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- 内容展示
- 展示Content组件的各种配置和用法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Content } = _InfoPage;
const { Flex, Radio, Space, Tag, Avatar } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 2,
    size: 'default',
    labelAlign: 'auto',
    gutter: 16
  });

  const [showDisabled, setShowDisabled] = useState(false);

  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps(prevState => ({ ...prevState, [name]: val }));
  };

  const dataList = [
    { label: '客户姓名', content: <Flex align="center" gap={8}><Avatar size="small">张</Avatar>张三</Flex>, block: true },
    { label: '客户编号', content: 'C20240115001' },
    { label: '联系电话', content: '138-0013-8000' },
    { label: '电子邮箱', content: 'zhangsan@example.com' },
    { label: '客户类型', content: <Tag color="blue">VIP客户</Tag> },
    { label: '信用等级', content: <Tag color="green">A级</Tag> },
    { label: '所属公司', content: '深圳市腾讯计算机系统有限公司', block: true },
    { label: '所在部门', content: '技术部', display: !showDisabled },
    { label: '职位', content: '高级前端工程师', display: !showDisabled },
    { label: '注册时间', content: '2020-03-15' },
    { label: '最后登录', content: '2024-01-15 10:30:00' },
    { label: '账户状态', content: <Tag color="success">正常</Tag> },
    { label: '备注信息', content: '该客户为公司长期合作伙伴，合作期间表现优秀，建议继续保持良好合作关系。', block: true }
  ];

  return (
    <Flex vertical gap={16}>
      {/* 控制面板 */}
      <Space direction="vertical" size={12} style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <div>
          <span style={{ marginRight: 8 }}>列数：</span>
          <Radio.Group onChange={(e) => onChange(e, 'col')} value={listProps.col}>
            <Radio.Button value={1}>单列</Radio.Button>
            <Radio.Button value={2}>两列</Radio.Button>
            <Radio.Button value={3}>三列</Radio.Button>
            <Radio.Button value={4}>四列</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>标签对齐：</span>
          <Radio.Group onChange={(e) => onChange(e, 'labelAlign')} value={listProps.labelAlign}>
            <Radio.Button value='left'>左对齐</Radio.Button>
            <Radio.Button value='center'>居中</Radio.Button>
            <Radio.Button value='right'>右对齐</Radio.Button>
            <Radio.Button value='auto'>自适应</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>尺寸：</span>
          <Radio.Group onChange={(e) => onChange(e, 'size')} value={listProps.size}>
            <Radio.Button value='default'>默认</Radio.Button>
            <Radio.Button value='small'>小尺寸</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>显示隐藏：</span>
          <Radio.Group onChange={(e) => setShowDisabled(e.target.value)} value={showDisabled}>
            <Radio.Button value={false}>显示全部</Radio.Button>
            <Radio.Button value={true}>隐藏部分</Radio.Button>
          </Radio.Group>
        </div>
      </Space>

      {/* Content 组件展示 */}
      <Content
        {...listProps}
        list={dataList.map(item => ({
          ...item,
          display: typeof item.display === 'boolean' ? item.display : undefined
        }))}
      />
    </Flex>
  );
};

render(<BaseExample />);

```

- 描述列表
- 二维数组结构的详情信息展示，适合表单数据展示
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Descriptions } = _InfoPage;
const { Tag, Space } = antd;

const BaseExample = () => {
  return (
    <Descriptions
      dataSource={[
        // 基本信息分组
        [
          { label: "订单编号", content: <strong style={{ color: '#1890ff' }}>ORD20240115001</strong> },
          { label: "订单类型", content: <Tag color="blue">普通订单</Tag> },
        ],
        [
          { label: "下单时间", content: "2024-01-15 10:30:25" },
          { label: "支付时间", content: "2024-01-15 10:32:18" },
        ],
        [
          { label: "客户名称", content: "深圳市腾讯计算机系统有限公司" },
          { label: "客户类型", content: <Tag color="gold">VIP客户</Tag> },
        ],
        // 收货信息分组
        [
          { label: "收货人", content: "张三" },
          { label: "联系电话", content: "138-0013-8000" },
        ],
        [
          { label: "收货地址", content: "广东省深圳市南山区科技园科技中一路腾讯大厦A座18层" },
        ],
        // 商品信息分组
        [
          {
            label: "商品清单",
            content: (
              <Space direction="vertical" size={4}>
                <div>1. 腾讯云服务器（2核4G）× 1台 - ¥3000.00</div>
                <div>2. 云数据库 MySQL（50GB）× 1个 - ¥1200.00</div>
                <div>3. 对象存储（500GB）× 1个 - ¥800.00</div>
              </Space>
            ),
          },
        ],
        // 金额信息分组
        [
          { label: "商品总额", content: <strong>¥5,000.00</strong> },
          { label: "运费", content: "¥0.00" },
        ],
        [
          { label: "优惠金额", content: <span style={{ color: '#52c41a' }}>-¥750.00</span> },
          { label: "实付金额", content: <strong style={{ color: '#f5222d', fontSize: '16px' }}>¥4,250.00</strong> },
        ],
        // 发票信息分组
        [
          { label: "发票类型", content: "增值税专用发票" },
          { label: "发票抬头", content: "深圳市腾讯计算机系统有限公司" },
        ],
        [
          { label: "纳税人识别号", content: "914403007109410773" },
          { label: "发票状态", content: <Tag color="success">已开具</Tag> },
        ],
        // 售后信息分组
        [
          { label: "退款状态", content: "无退款" },
          { label: "发票抬头", content: "未申请" },
        ],
        [
          { label: "订单状态", content: <Tag color="processing">处理中</Tag> },
          {
            label: "预计送达",
            content: "2024-01-17",
          },
        ],
        // 备注信息
        [
          {
            label: "订单备注",
            content: "请务必在工作日配送，配送前请提前电话联系收货人。收到商品后请当面验货，确认无误后再签收。",
            block: true
          },
        ],
        // 操作记录
        [
          { label: "创建时间", content: "2024-01-15 10:30:25" },
          { label: "创建人", content: "张三（客户）" },
        ],
      ]}
    />
  );
};

render(<BaseExample />);

```

- 智能布局
- 支持数据格式化和自动栅格优化的高级内容展示组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { CentralContent } = _InfoPage;
const { Tag, Space } = antd;

const BaseExample = () => {
  return (
    <CentralContent
      dataSource={{
        id: 'RC20240115001',
        name: '张三',
        department: '技术研发部',
        position: '高级前端工程师',
        email: 'zhangsan@tencent.com',
        phone: '138-0013-8000',
        entryDate: '2020-03-15',
        workYears: 4,
        performanceScore: 92.5,
        salary: 35000,
        bonus: 50000,
        leaveDays: 5,
        projectCount: 8,
        description: `负责公司核心产品的前端架构设计与开发工作，主导了多个重要项目的技术方案设计。精通React、Vue等主流前端框架，对TypeScript有深入理解。在性能优化方面有丰富经验，成功将项目加载时间减少40%。`,
        skills: `React, Vue, TypeScript, Node.js, Webpack, Vite, Jenkins, Docker, Kubernetes`
      }}
      col={3}
      columns={[
        { name: 'id', title: '员工编号', block: true },
        { name: 'name', title: '姓名', span: 8 },
        { name: 'department', title: '部门' },
        { name: 'position', title: '职位', span: 10 },
        { name: 'email', title: '电子邮箱' },
        { name: 'phone', title: '联系电话' },
        { name: 'entryDate', title: '入职日期', format: 'date' },
        { name: 'workYears', title: '工作年限', format: 'number-suffix:年' },
        { name: 'performanceScore', title: '绩效评分', format: 'number-maximumFractionDigits:1-suffix:分' },
        { name: 'salary', title: '月薪', format: 'number-useGrouping:true-suffix:元' },
        { name: 'bonus', title: '年终奖金', format: 'number-useGrouping:true-suffix:元' },
        { name: 'leaveDays', title: '年度剩余年假', format: 'number-suffix:天' },
        { name: 'projectCount', title: '参与项目数', format: 'number-suffix:个' },
        { name: 'empty', title: '公积金账号' },
        { name: 'empty2', title: '社保卡号', placeholder: '未办理' },
        { name: 'description', title: '工作描述', block: true },
        { name: 'skills', title: '技能标签', render: (value) => (
          <Space wrap>
            {value.split(',').map(skill => (
              <Tag key={skill} color="blue" style={{ marginBottom: 4 }}>{skill.trim()}</Tag>
            ))}
          </Space>
        )}
      ]}
    />
  );
};

render(<BaseExample />);

```

- 边框区块
- 展示InfoPage.Part的bordered属性配合CentralContent使用
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { default: InfoPage, CentralContent } = _InfoPage;
const { Tag, Avatar, Space, Modal, Button } = antd;
const { useState } = React;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const baseInfo = (
    <InfoPage.Part bordered title="员工档案" subtitle="基本信息">
      <CentralContent
        type="compact"
        dataSource={{
          id: 'RC20240115001',
          name: '张三',
          gender: '男',
          birthday: '1992-03-15',
          idCard: '440301199203154512',
          maritalStatus: '已婚',
          education: '本科',
          graduationSchool: '深圳大学',
          major: '计算机科学与技术',
          entryDate: '2020-03-15',
          workYears: 4,
          phone: '138-0013-8000',
          email: 'zhangsan@tencent.com',
          address: '广东省深圳市南山区科技园科技中一路腾讯大厦',
          emergencyContact: '李四',
          emergencyPhone: '139-0014-9000',
          emergencyRelation: '配偶'
        }}
        col={3}
        columns={[
          {
            name: 'id',
            title: '员工编号',
            block: true
          },
          {
            name: 'name',
            title: '姓名',
            render: value => (
              <Space align="center">
                <Avatar style={{ backgroundColor: '#1890ff' }}>{value[0]}</Avatar>
                <strong>{value}</strong>
              </Space>
            ),
            span: 10
          },
          {
            name: 'gender',
            title: '性别'
          },
          {
            name: 'birthday',
            title: '出生日期',
            format: 'date'
          },
          {
            name: 'idCard',
            title: '身份证号',
            render: value => value.replace(/(\d{6})(\d{8})(\d{4})/, '$1********$3')
          },
          {
            name: 'maritalStatus',
            title: '婚姻状况'
          },
          {
            name: 'education',
            title: '学历'
          },
          {
            name: 'graduationSchool',
            title: '毕业院校'
          },
          {
            name: 'major',
            title: '专业'
          },
          {
            name: 'entryDate',
            title: '入职日期',
            format: 'date'
          },
          {
            name: 'workYears',
            title: '工作年限',
            format: 'number-suffix:年'
          },
          {
            name: 'phone',
            title: '联系电话',
            render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
          },
          {
            name: 'email',
            title: '电子邮箱'
          },
          {
            name: 'address',
            title: '家庭住址',
            block: true
          },
          {
            name: 'emergencyContact',
            title: '紧急联系人'
          },
          {
            name: 'emergencyPhone',
            title: '紧急联系电话',
            render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
          },
          {
            name: 'emergencyRelation',
            title: '与本人关系'
          }
        ]}
      />
    </InfoPage.Part>
  );
  return (
    <InfoPage>
      {baseInfo}
      <InfoPage.Part bordered title="工作信息" subtitle="部门与职位">
        <CentralContent
          type="compact"
          dataSource={{
            department: '技术研发部',
            position: '高级前端工程师',
            level: 'T4-2',
            supervisor: '王总监',
            team: '前端开发组',
            workLocation: '深圳总部',
            office: '腾讯大厦A座18层',
            workStatus: '在职',
            contractType: '正式员工',
            contractStartDate: '2023-03-15',
            contractEndDate: '2026-03-14',
            probationPeriod: '已转正'
          }}
          col={2}
          columns={[
            { name: 'department', title: '所属部门', span: 12 },
            { name: 'position', title: '职位', span: 12 },
            { name: 'level', title: '职级' },
            { name: 'supervisor', title: '直属主管' },
            { name: 'team', title: '所属团队' },
            { name: 'workLocation', title: '工作地点' },
            { name: 'office', title: '办公室位置' },
            { name: 'workStatus', title: '工作状态', render: value => <Tag color="success">{value}</Tag> },
            { name: 'contractType', title: '合同类型' },
            { name: 'contractStartDate', title: '合同开始日期', format: 'date' },
            { name: 'contractEndDate', title: '合同结束日期', format: 'date' },
            { name: 'probationPeriod', title: '试用期状态', render: value => <Tag color="success">{value}</Tag> }
          ]}
        />
      </InfoPage.Part>

      <InfoPage.Part bordered title="福利待遇" subtitle="薪资与福利">
        <CentralContent
          type="compact"
          dataSource={{
            baseSalary: 30000,
            performanceBonus: 5000,
            annualBonus: 50000,
            socialInsurance: '已缴纳（五险一金）',
            housingFund: 3600,
            medicalInsurance: '已包含',
            mealAllowance: 1500,
            transportAllowance: 800,
            stockOptions: 5000,
            otherBenefits: '年度体检、节日礼品、团建活动'
          }}
          col={2}
          columns={[
            { name: 'baseSalary', title: '基本月薪', format: 'number-useGrouping:true-suffix:元', span: 12 },
            { name: 'performanceBonus', title: '绩效奖金', format: 'number-useGrouping:true-suffix:元/月', span: 12 },
            { name: 'annualBonus', title: '年终奖金', format: 'number-useGrouping:true-suffix:元', block: true },
            { name: 'socialInsurance', title: '社会保险', render: value => <Tag color="success">{value}</Tag> },
            { name: 'housingFund', title: '公积金', format: 'number-useGrouping:true-suffix:元/月' },
            { name: 'medicalInsurance', title: '医疗保险', render: value => <Tag color="success">{value}</Tag> },
            { name: 'mealAllowance', title: '餐补', format: 'number-useGrouping:true-suffix:元/月' },
            { name: 'transportAllowance', title: '交通补贴', format: 'number-useGrouping:true-suffix:元/月' },
            { name: 'stockOptions', title: '股票期权', format: 'number-useGrouping:true-suffix:股', block: true },
            { name: 'otherBenefits', title: '其他福利', block: true }
          ]}
        />
      </InfoPage.Part>

      <InfoPage.Part bordered title="放在Modal中">
        <Button
          onClick={() => {
            setOpen(true);
          }}>
          打开Modal
        </Button>
        <Modal title="员工档案" open={open} onCancel={()=>setOpen(false)}>{baseInfo}</Modal>
      </InfoPage.Part>
    </InfoPage>
  );
};

render(<BaseExample />);

```

- 表格视图
- 支持行选择、固定表头和多数据展示的表格组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { TableView } = _InfoPage;
const { Flex, Tag, Badge } = antd;
const { useState } = React;

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '138-0013-8000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '139-0014-9000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '137-0015-7000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '136-0016-6000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    phone: '135-0017-5000',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12',
    deliveryDate: ''
  }
];

const columns = [
  { name: 'id', title: '订单编号' },
  { name: 'customerName', title: '客户名称', span: 10 },
  { name: 'contact', title: '联系人' },
  { name: 'phone', title: '联系电话', render: (value) => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  { name: 'amount', title: '订单金额(元)', render: (value) => <strong style={{ color: '#f5222d' }}>¥{value.toLocaleString()}</strong> },
  { name: 'orderDate', title: '下单日期', format: 'date' },
  { name: 'deliveryDate', title: '预计送达', format: 'date' },
  { name: 'status', title: '订单状态', render: (value) => {
    const config = {
      '已完成': { color: 'success', text: '已完成' },
      '处理中': { color: 'processing', text: '处理中' },
      '待发货': { color: 'warning', text: '待发货' },
      '已取消': { color: 'default', text: '已取消' }
    };
    const { color, text } = config[value] || { color: 'default', text: value };
    return <Badge status={color} text={text} />;
  }}
];

const WithCheckbox = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong></span>
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'checkbox', allowSelectedAll: true, selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const WithSelected = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const selectedOrder = dataSource.find(d => d.id === selectKeys[0]);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选订单：{selectedOrder ? `${selectedOrder.id} (${selectedOrder.customerName})` : '无'}</span>
        {selectedOrder && <Tag color="blue">¥{selectedOrder.amount.toLocaleString()}</Tag>}
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'radio', selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
        订单列表 - 共 <strong>{dataSource.length}</strong> 个订单
      </div>
      <TableView dataSource={dataSource} columns={columns} />
      <WithCheckbox />
      <WithSelected />
      <div style={{ padding: '16px', background: '#fafafa', border: '1px dashed #d9d9d9', borderRadius: '8px' }}>
        暂无订单数据
      </div>
      <TableView
        style={{ height: '250px', overflowY: 'scroll' }}
        dataSource={dataSource}
        columns={columns}
        sticky
        headerStyle={{ position: 'sticky', top: 0, zIndex: 1, background: '#fafafa' }}
      />
    </Flex>
  );
};

render(<BaseExample />);

```

- 表格选择
- 展示TableView组件的各种选择模式
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { TableView } = _InfoPage;
const { Flex, Radio, Space, Button, Tag, Avatar } = antd;
const { useState } = React;

const dataSource = [
  { id: 'C20240115001', name: '张三', company: '腾讯科技', contact: '138-0013-8000', amount: 50000, status: '已签约' },
  { id: 'C20240115002', name: '李四', company: '华为技术', contact: '139-0014-9000', amount: 85000, status: '跟进中' },
  { id: 'C20240115003', name: '王五', company: '阿里巴巴', contact: '137-0015-7000', amount: 120000, status: '已签约' },
  { id: 'C20240115004', name: '赵六', company: '字节跳动', contact: '136-0016-6000', amount: 65000, status: '待跟进' },
  { id: 'C20240115005', name: '钱七', company: '百度在线', contact: '135-0017-5000', amount: 95000, status: '已签约' }
];

const columns = [
  { name: 'id', title: '客户编号' },
  { name: 'name', title: '联系人' },
  { name: 'company', title: '所属公司' },
  { name: 'contact', title: '联系电话' },
  { name: 'amount', title: '签约金额(元)' },
  { name: 'status', title: '状态' }
];

const BaseExample = () => {
  const [selectionType, setSelectionType] = useState('none');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 复选框选择示例
  const CheckboxExample = () => {
    const [keys, setKeys] = useState([]);
    const totalAmount = keys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
    return (
      <div>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <span>已选 <strong style={{ color: '#1890ff' }}>{keys.length}</strong> 位客户，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong></span>
          <Space>
            <Button size="small" onClick={() => setKeys(dataSource.filter(d => d.status === '已签约').map(d => d.id))}>
              选已签约
            </Button>
            <Button size="small" onClick={() => setKeys([])}>清空</Button>
          </Space>
        </Flex>
        <TableView
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: keys,
            onChange: setKeys
          }}
        />
      </div>
    );
  };

  // 全选状态示例
  const SelectAllExample = () => {
    const [keys, setKeys] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);

    const handleSelectAll = () => {
      if (isSelectedAll) {
        setKeys([]);
      } else {
        setKeys(dataSource.map(d => d.id));
      }
      setIsSelectedAll(!isSelectedAll);
    };

    return (
      <div>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <span>{isSelectedAll ? <Tag color="green">已全选所有客户</Tag> : <Tag>未全选</Tag>}</span>
          <Button size="small" onClick={handleSelectAll}>
            {isSelectedAll ? '取消全选' : '全选客户'}
          </Button>
        </Flex>
        <TableView
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            isSelectedAll,
            allowSelectedAll: true,
            selectedRowKeys: keys,
            onChange: (keys) => {
              setKeys(keys);
              setIsSelectedAll(keys.length === dataSource.length);
            }
          }}
        />
      </div>
    );
  };

  // 单选框示例
  const RadioExample = () => {
    const [key, setKey] = useState(null);
    const selectedCustomer = dataSource.find(d => d.id === key);
    return (
      <div>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <span>已选客户：{selectedCustomer ? `${selectedCustomer.name} (${selectedCustomer.company})` : '无'}</span>
          <Tag color={selectedCustomer ? 'blue' : 'default'}>{selectedCustomer ? `¥${selectedCustomer.amount.toLocaleString()}` : '-'}</Tag>
        </Flex>
        <TableView
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: key ? [key] : [],
            onChange: (keys) => setKey(keys.length > 0 ? keys[0] : null)
          }}
        />
      </div>
    );
  };

  // 无选择模式
  const NoSelectionExample = () => (
    <div>
      <div style={{ marginBottom: 12 }}>客户列表 - 共 {dataSource.length} 位</div>
      <TableView dataSource={dataSource} columns={columns} />
    </div>
  );

  // 自定义渲染示例
  const CustomRenderExample = () => {
    const [keys, setKeys] = useState([]);
    return (
      <div>
        <div style={{ marginBottom: 12 }}>自定义渲染客户列表</div>
        <TableView
          dataSource={dataSource}
          columns={[
            { name: 'id', title: '客户编号' },
            { name: 'name', title: '联系人', render: (value) => <Flex align="center" gap={8}><Avatar size="small">{value[0]}</Avatar>{value}</Flex> },
            { name: 'company', title: '所属公司' },
            { name: 'contact', title: '联系电话' },
            { name: 'amount', title: '签约金额', render: (value) => <strong style={{ color: '#52c41a' }}>¥{value.toLocaleString()}</strong> },
            { name: 'status', title: '状态', render: (value) => {
              const config = {
                '已签约': { color: 'success', text: '已签约' },
                '跟进中': { color: 'processing', text: '跟进中' },
                '待跟进': { color: 'warning', text: '待跟进' }
              };
              const { color, text } = config[value] || { color: 'default', text: value };
              return <Tag color={color}>{text}</Tag>;
            }}
          ]}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: keys,
            onChange: setKeys
          }}
        />
      </div>
    );
  };

  const renderExample = () => {
    switch (selectionType) {
      case 'checkbox':
        return <CheckboxExample />;
      case 'selectAll':
        return <SelectAllExample />;
      case 'radio':
        return <RadioExample />;
      case 'custom':
        return <CustomRenderExample />;
      default:
        return <NoSelectionExample />;
    }
  };

  return (
    <Flex vertical gap={16}>
      {/* 控制面板 */}
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <span style={{ marginRight: 12 }}>选择模式：</span>
        <Radio.Group value={selectionType} onChange={(e) => setSelectionType(e.target.value)}>
          <Radio.Button value="none">无选择</Radio.Button>
          <Radio.Button value="checkbox">复选框</Radio.Button>
          <Radio.Button value="selectAll">全选状态</Radio.Button>
          <Radio.Button value="radio">单选框</Radio.Button>
          <Radio.Button value="custom">自定义渲染</Radio.Button>
        </Radio.Group>
      </div>

      {/* 示例展示区 */}
      {renderExample()}
    </Flex>
  );
};

render(<BaseExample />);

```

- 分割线展示
- 支持图标和垂直/横向布局的紧凑信息展示
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader),antdIcons(@ant-design/icons)

```jsx
const { SplitLine } = _InfoPage;
const { Flex, Tag, Avatar } = antd;
const { MobileOutlined, CompassOutlined, MailOutlined, TeamOutlined, CalendarOutlined, EnvironmentOutlined } = antdIcons;

const BaseExample = () => {
  return (
    <Flex vertical gap={20}>
      {/* 个人信息展示 - 水平布局 */}
      <div>
        <h4 style={{ marginBottom: 12, color: '#333' }}>员工卡片</h4>
        <SplitLine wrap
          dataSource={{
            name: '张三',
            position: '高级前端工程师',
            department: '技术研发部',
            phone: '138-0013-8000',
            email: 'zhangsan@tencent.com',
            workYears: 4,
            entryDate: '2020-03-15',
            status: '在职'
          }}
          columns={[
            {
              name: 'name',
              title: '姓名',
              render: (value) => (
                <Flex align="center" gap={8}>
                  <Avatar style={{ backgroundColor: '#1890ff' }}>{value[0]}</Avatar>
                  <strong>{value}</strong>
                </Flex>
              )
            },
            {
              name: 'position',
              title: '职位',
              render: (value) => <Tag color="blue">{value}</Tag>
            },
            {
              name: 'department',
              title: '部门',
              render: (value) => <Tag color="cyan">{value}</Tag>
            },
            {
              name: 'phone',
              title: '联系电话',
              icon: <MobileOutlined />,
              render: (value) => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            },
            {
              name: 'email',
              title: '电子邮箱',
              icon: <MailOutlined />
            },
            {
              name: 'workYears',
              title: '工作年限',
              icon: <CalendarOutlined />,
              render: (value) => `${value}年`
            },
            {
              name: 'entryDate',
              title: '入职日期',
              icon: <CalendarOutlined />,
              render: (value) => value
            },
            {
              name: 'status',
              title: '状态',
              render: (value) => <Tag color="success">{value}</Tag>
            }
          ]}
        />
      </div>

      {/* 公司信息展示 - 垂直布局 */}
      <div>
        <h4 style={{ marginBottom: 12, color: '#333' }}>公司信息</h4>
        <SplitLine wrap
          labelMode="vertical"
          dataSource={{
            companyName: '深圳市腾讯计算机系统有限公司',
            creditCode: '914403007109410773',
            legalPerson: '马化腾',
            registerDate: '1998-11-11',
            capital: '500万美元',
            address: '深圳市南山区高新科技园科技中一路腾讯大厦',
            businessScope: '计算机软硬件的技术开发、销售；计算机网络工程；系统集成；软件开发及技术服务；信息咨询；网络设备、通讯设备、电子产品的技术开发与销售；国内贸易。'
          }}
          columns={[
            {
              name: 'companyName',
              title: '企业名称'
            },
            {
              name: 'creditCode',
              title: '统一社会信用代码',
              icon: <TeamOutlined />
            },
            {
              name: 'legalPerson',
              title: '法定代表人'
            },
            {
              name: 'registerDate',
              title: '成立日期',
              icon: <CalendarOutlined />
            },
            {
              name: 'capital',
              title: '注册资本'
            },
            {
              name: 'address',
              title: '注册地址',
              icon: <EnvironmentOutlined />
            },
            {
              name: 'businessScope',
              title: '经营范围'
            }
          ]}
        />
      </div>

      {/* 项目信息展示 */}
      <div>
        <h4 style={{ marginBottom: 12, color: '#333' }}>项目详情</h4>
        <SplitLine wrap
          dataSource={{
            projectName: '企业级管理系统重构',
            projectCode: 'PRJ-2024-001',
            manager: '张三',
            teamSize: 12,
            startDate: '2024-01-01',
            endDate: '2024-06-30',
            progress: 35,
            budget: 1500000,
            spent: 525000
          }}
          columns={[
            {
              name: 'projectName',
              title: '项目名称'
            },
            {
              name: 'projectCode',
              title: '项目编号'
            },
            {
              name: 'manager',
              title: '项目经理',
              icon: <TeamOutlined />
            },
            {
              name: 'teamSize',
              title: '团队规模',
              render: (value) => `${value}人`
            },
            {
              name: 'startDate',
              title: '开始日期',
              icon: <CalendarOutlined />
            },
            {
              name: 'endDate',
              title: '结束日期',
              icon: <CalendarOutlined />
            },
            {
              name: 'progress',
              title: '项目进度',
              render: (value) => <Tag color={value >= 100 ? 'success' : 'processing'}>{value}%</Tag>
            },
            {
              name: 'budget',
              title: '项目预算',
              render: (value) => `¥${value.toLocaleString()}`
            },
            {
              name: 'spent',
              title: '已投入',
              render: (value) => `¥${value.toLocaleString()}`
            }
          ]}
        />
      </div>
    </Flex>
  );
};

render(<BaseExample />);

```

- 流程步骤
- 支持自定义渲染和多种状态的流程时序展示组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Flex, Space, Divider, Tag } = antd;
const { Flow } = _InfoPage;

const BaseExample = () => {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      {/* 基础流程示例 */}
      <div>
        <Divider orientation="left">请假审批流程</Divider>
        <Flow
          current={1}
          dataSource={[
            { title: '提交申请', description: '2024-01-15 09:00 张三提交请假申请', status: 'finish' },
            { title: '部门审批', description: '等待李经理审批', status: 'process' },
            { title: '人事审核', description: '待人事部审核', status: 'wait' },
            { title: '流程结束', description: '审批流程完成', status: 'wait' }
          ]}
        />
      </div>

      {/* 带副标题的流程 */}
      <div>
        <Divider orientation="left">订单处理流程</Divider>
        <Flow
          current={2}
          dataSource={[
            { title: '创建订单', subTitle: '2024-01-15 09:30', status: 'finish' },
            { title: '支付成功', subTitle: '2024-01-15 10:15', status: 'finish' },
            { title: '仓库发货', subTitle: '2024-01-15 14:00', status: 'finish' },
            { title: '配送中', subTitle: '2024-01-16 08:30', status: 'process' },
            { title: '已签收', subTitle: '待确认', status: 'wait' }
          ]}
        />
      </div>

      {/* 使用 columns 自定义渲染 */}
      <div>
        <Divider orientation="left">项目审批流程</Divider>
        <Flow
          dataSource={[
            {
              title: '需求评审',
              description: '通过',
              operator: '张产品',
              time: '2024-01-15 09:00',
              logs: [
                { name: '张产品', action: '提交需求文档', time: '2024-01-15 09:00', content: '包含功能列表、技术方案、时间计划' },
                { name: '李技术', action: '技术评审通过', time: '2024-01-15 11:00', content: '技术方案可行，资源充足' }
              ]
            },
            {
              title: '开发实施',
              description: '进行中',
              operator: '王开发',
              time: '2024-01-16 09:00',
              logs: [
                { name: '王开发', action: '开始开发', time: '2024-01-16 09:00', content: '前端和后端并行开发' }
              ]
            },
            {
              title: '测试验收',
              description: '待处理',
              operator: '赵测试',
              time: '2024-01-20 00:00',
              logs: []
            }
          ]}
          columns={[
            { name: 'title' },
            { name: 'description', render: (value) => <Tag color={value === '通过' ? 'success' : value === '进行中' ? 'processing' : 'default'}>{value}</Tag> },
            { type: 'subTitle', name: 'time', format: 'datetime' },
            {
              type: 'actionList',
              name: 'logs',
              children: [
                { name: 'name' },
                { name: 'action' },
                { type: 'options', name: 'time', format: 'datetime' },
                { name: 'content' }
              ]
            }
          ]}
        />
      </div>

      {/* 点状步骤条 */}
      <div>
        <Divider orientation="left">项目里程碑</Divider>
        <Flex gap={16}>
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: 8, color: '#666' }}>垂直时间轴</p>
            <Flow
              direction="vertical"
              progressDot
              dataSource={[
                { title: '项目启动', description: '2024-01-01', status: 'finish' },
                { title: '需求分析', description: '2024-01-15', status: 'finish' },
                { title: '系统设计', description: '2024-02-01', status: 'process' },
                { title: '开发实施', description: '2024-03-01', status: 'wait' },
                { title: '测试上线', description: '2024-04-01', status: 'wait' }
              ]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: 8, color: '#666' }}>水平进度条</p>
            <Flow
              direction="horizontal"
              progressDot
              dataSource={[
                { title: '注册', description: '完成', status: 'finish' },
                { title: '验证', description: '完成', status: 'finish' },
                { title: '审核', description: '进行中', status: 'process' },
                { title: '通过', description: '待办', status: 'wait' }
              ]}
            />
          </div>
        </Flex>
      </div>

      {/* 使用 content 类型自定义内容 */}
      <div>
        <Divider orientation="left">合同审批流程</Divider>
        <Flow
          dataSource={[
            {
              title: '草拟阶段',
              description: '法务部',
              content: '合同条款已草拟完成，包含保密协议、付款条款、违约责任等内容。',
              status: 'finish'
            },
            {
              title: '业务审核',
              description: '业务部门',
              content: '业务部门已确认合同内容，符合业务需求。',
              status: 'finish'
            },
            {
              title: '财务审核',
              description: '财务部',
              content: '财务部正在审核付款条款和预算安排，预计2个工作日完成。',
              status: 'process'
            },
            {
              title: '最终签署',
              description: '等待',
              content: '',
              status: 'wait'
            }
          ]}
          columns={[
            {
              type: 'content',
              name: 'content',
              render: (item) => (
                <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6' }}>
                  {item}
                </div>
              )
            }
          ]}
        />
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 报告页面
- 完整的测评报告生成组件，支持评分、表格和详细描述
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Report } = _InfoPage;
const { Space } = antd;
const BaseExample = () => {
    return (
        <div className="outer">
            <Space direction="vertical" size={24}>
                <Report title="报告概述">
                    <Report.List
                        report={{
                            list: [
                                {
                                    label: '目的',
                                    content: '本报告旨在评估招聘顾问使用AI工具进行候选人初次沟通的能力，特别是在理解候选人需求、传达职位信息以及建立初步信任关系的效果。'
                                },
                                {
                                    label: '测评对象',
                                    content: '姓名：张伟'
                                },
                                {
                                    label: '测评工具',
                                    content: `AI模拟系统：提供基于语音和文本的交互模拟环境。\n评分标准：沟通技巧、信息传达清晰度、候选人反馈、建立关系的能力。`
                                },
                                {
                                    label: '任务目标',
                                    content: (
                                        <ul>
                                            <li>完整呈现初次沟通话术，展现每个关键动作和沟通顺序。</li>
                                            <li>收集候选人信息：了解候选人工作背景，技术能力及其薪资要求。</li>
                                            <li>挖掘需求：全面了解候选人求职动态和需求，从而掌握候选人存在的顾虑及。</li>
                                            <li>有效推荐：根据候选人求职需求链接职位优势，强化技术吸引点，妥善处理候选人疑虑。</li>
                                            <li>建立信任关系：使用沟通技巧，态度诚恳，和候选人站在一起，而非“博弈”关系。</li>
                                        </ul>
                                    )
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="测评结果">
                    <Report.Result
                        report={{
                            total: {
                                score: '81.8',
                                label: '综合得分'
                            },
                            list: [
                                {
                                    label: '沟通程序指引及话术',
                                    score: '86',
                                    content:
                                        '张伟在这一部分的表现总体上是专业且有条理的，能够按照一定的流程顺利开展对话。他表现出的礼貌和专业性在询问是否方便通话时得到了完美的体现，得到了满分。然而，他在介绍职位时未能充分利用机会强调职位的吸引点，可能影响候选人的兴趣。'
                                },
                                {
                                    label: '收集信息（现状$&$期望）',
                                    score: '90',
                                    content: '张伟在收集候选人的现状和期望方面做得相对完善，能够获得关于候选人当前工作和技术栈的重要信息。但对于候选人的项目经验和薪资结构的探讨不够深入，这可能会影响到后续的职位匹配和期望管理。'
                                },
                                {
                                    label: '挖掘需求',
                                    score: '70',
                                    content: '张伟在挖掘候选人需求方面还有提升空间。虽然基本了解了候选人的职业期望，但在探索候选人的非薪酬动机和深层次需求方面表现不够充分，这是建立有效推荐和深度关系的关键。'
                                },
                                {
                                    label: '有效推荐',
                                    score: '73',
                                    content: '在有效推荐职位方面，张伟需要加强与候选人需求的匹配度和说服力。虽然提到了职位的技术优势，但未根据候选人的具体技术背景进行个性化强调，可能减少候选人的兴趣。'
                                },
                                {
                                    label: '建立信任关系',
                                    score: '84',
                                    content: '张伟能够通过有效的沟通建立信任关系，使用开放性问题和积极肯定候选人的表现。然而，需要提高在换位思考和理解候选人深层需求方面的能力，确保信任关系的深度和真实性。'
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="评分细节">
                    <Report.Table
                        report={{
                            columns: [
                                {
                                    title: '评估维度',
                                    name: 'group',
                                    isSubTitle: true
                                },
                                {
                                    title: '评分项',
                                    name: 'item',
                                    span: 10
                                },
                                {
                                    title: '得分',
                                    name: 'score',
                                    span: 4,
                                    valueOf: value => <div className="score">{value}</div>
                                },
                                {
                                    title: '描述',
                                    name: 'description',
                                    span: 10
                                }
                            ],
                            group: [
                                {
                                    name: 'group1',
                                    label: '沟通程序指引及话术'
                                },
                                {
                                    name: 'group2',
                                    label: '收集信息（现状&期望）'
                                },
                                {
                                    name: 'group3',
                                    label: '挖掘需求'
                                },
                                {
                                    name: 'group4',
                                    label: '有效推荐'
                                },
                                {
                                    name: 'group5',
                                    label: '建立信任关系'
                                }
                            ],
                            list: [
                                {
                                    group: 'group1',
                                    item: '专业开场',
                                    score: <Report.Score value={4}/>,
                                    description: '开场专业，语气友好，略显急促。'
                                },
                                {
                                    group: 'group1',
                                    item: '询问是否方便通话',
                                    score: <Report.Score value={5}/>,
                                    description: '表现出极好的礼貌和考虑。'
                                },
                                {
                                    group: 'group1',
                                    item: '先了解候选人整体情况',
                                    score: <Report.Score value={3}/>,
                                    description: '详细询问了技术和动机，未深入个人发展。'
                                },
                                {
                                    group: 'group1',
                                    item: '后介绍推荐OD职位',
                                    score: <Report.Score value={4}/>,
                                    description: '介绍清晰，未充分突出职位吸引力。'
                                },
                                {
                                    group: 'group1',
                                    item: '介绍整体面试流程',
                                    score: <Report.Score value={1}/>,
                                    description: '详尽介绍流程，缺少机考准备细节说明。'
                                },
                                {
                                    group: 'group1',
                                    item: '交换联系方式',
                                    score: <Report.Score value={5}/>,
                                    description: '有效且自然，确保双方畅通无阻。'
                                },
                                {
                                    group: 'group2',
                                    item: '了解候选人目前就业状态',
                                    score: <Report.Score value={5}/>,
                                    description: '详尽了解候选人的当前就业状况。'
                                },
                                {
                                    group: 'group2',
                                    item: '了解候选人技术栈及项目经验',
                                    score: <Report.Score value={4}/>,
                                    description: '详细询问技术栈，对项目经验探讨不足。'
                                },
                                {
                                    group: 'group2',
                                    item: '了解候选人薪资情况与结构',
                                    score: <Report.Score value={4}/>,
                                    description: '了解薪资期望清晰，未详细探讨薪资构成。'
                                },
                                {
                                    group: 'group3',
                                    item: '了解候选人对下一份工作的期望',
                                    score: <Report.Score value={3}/>,
                                    description: '探讨了职业规划，但未深挖发展意愿。'
                                },
                                {
                                    group: 'group3',
                                    item: '探索非薪资求职动机',
                                    score: <Report.Score value={2}/>,
                                    description: '基本了解求职动机，缺乏深度和细节。'
                                },
                                {
                                    group: 'group3',
                                    item: '识别并处理顾虑',
                                    score: <Report.Score value={4}/>,
                                    description: '识别了顾虑，回应稍显模糊。'
                                },
                                {
                                    group: 'group4',
                                    item: '链接职位优势与求职动机',
                                    score: <Report.Score value={3}/>,
                                    description: '提及职位相关性，缺乏说服力。'
                                },
                                {
                                    group: 'group4',
                                    item: '强化项目技术吸引点',
                                    score: <Report.Score value={3}/>,
                                    description: '提及技术优势，未针对候选人背景定制。'
                                },
                                {
                                    group: 'group4',
                                    item: '关注并处理候选人顾虑',
                                    score: <Report.Score value={4}/>,
                                    description: '正面回应顾虑，但解决方案不具体。'
                                },
                                {
                                    group: 'group5',
                                    item: '应用开放性提问',
                                    score: <Report.Score value={0}/>,
                                    description: '使用开放性问题促进了对话深入。'
                                },
                                {
                                    group: 'group5',
                                    item: '换位思考与表达同理心',
                                    score: <Report.Score value={1}/>,
                                    description: '表达了同理心，但部分回答未完全站在候选人角度。'
                                },
                                {
                                    group: 'group5',
                                    item: '表达肯定和欣赏',
                                    score: <Report.Score value={5}/>,
                                    description: '非常好地肯定了候选人的能力和经验。'
                                },
                                {
                                    group: 'group5',
                                    item: '清晰表达观点',
                                    score: <Report.Score value={2}/>,
                                    description: '观点主要清晰，偶有不够准确的情况。'
                                },
                                {
                                    group: 'group5',
                                    item: '有效倾听与理解',
                                    score: <Report.Score value={3}/>,
                                    description: '倾听良好，但有时未能完全抓住候选人的意图。'
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="结论与建议">
                    <Report.Part
                        report={{
                            list: [
                                {
                                    label: '结论',
                                    hasBgColor: true,
                                    content:
                                        '在此次AI情景模拟测评中，李四表现出了较强的沟通能力和专业性，尤其是在程序指引及话术方面。他成功地收集了候选人的基本信息并建立了初步的信任关系。然而，他在深入挖掘候选人需求和个性化推荐职位方面的表现还有待提高。总体而言，李四的表现良好，显示出了他作为招聘顾问的潜力。'
                                },
                                {
                                    label: '建议',
                                    style: { '--marker-color': '#027A48', '--label-bg-color': '#027A481a' },
                                    content: (
                                        <ol>
                                            <li>增强职位介绍的吸引力，特别是将职位优势与候选人的需求直接关联，突出表现职位的独特之处。</li>
                                            <li>对候选人的项目经验进行更详细的询问，尤其是关于如何在项目中解决问题和技术应用的具体情况。</li>
                                            <li>在讨论薪资时，应详细了解候选人的薪资构成和期望，确保提供的职位与候选人的薪资期望相匹配。</li>
                                            <li>在交流中穿插探讨候选人的个人兴趣和长期职业目标，以便更好地理解其动机。</li>
                                            <li>根据候选人的技术能力和职业兴趣定制职位推荐，突出职位的技术挑战和成长机会。</li>
                                            <li>加强同理心的表达，尤其在讨论候选人关切的问题时，从其角度出发提供解决方案。</li>
                                        </ol>
                                    )
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="结论与建议">自定义 area</Report>
            </Space>
        </div>
    );
};

render(<BaseExample />);

```

- 报告组件
- 展示Report的各子组件：List、Result、Table、Part
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Report, Score } = _InfoPage;
const { Flex, Radio, Space } = antd;
const { useState } = React;

const reportData = {
  total: {
    score: '88.5',
    label: '综合评分'
  },
  list: [
    {
      label: '代码质量',
      score: '95',
      content: '代码风格规范，注释清晰完整，遵循ESLint和Prettier规范。组件拆分合理，复用性强，单元测试覆盖率达到85%。代码审查中提出的修改意见响应及时，整改完成率高。'
    },
    {
      label: '技术深度',
      score: '90',
      content: '深入理解React源码原理，熟悉Hooks工作机制和性能优化技巧。对前端工程化、微前端架构有实践经验。在项目中成功实现SSR方案，提升首屏渲染速度60%。'
    },
    {
      label: '团队协作',
      score: '85',
      content: '积极参与代码评审和技术讨论，乐于分享技术心得。与产品、设计、测试团队沟通顺畅，能够准确理解需求并给出合理的技术建议。协助新同事快速融入团队。'
    },
    {
      label: '创新意识',
      score: '82',
      content: '主动探索新技术，将AI辅助开发工具引入团队，提升开发效率约20%。提出多个优化方案并被采纳，为业务增长做出了贡献。持续关注行业动态，技术敏感度高。'
    }
  ]
};

const tableReportData = {
  columns: [
    { title: '评估维度', name: 'group', isSubTitle: true, span: 24 },
    { title: '评估项', name: 'item', span: 12 },
    { title: '得分', name: 'score', span: 4 },
    { title: '说明', name: 'description', span: 8 }
  ],
  group: [
    { name: 'group1', label: '📌 核心技术能力' },
    { name: 'group2', label: '💼 工作业绩' },
    { name: 'group3', label: '🎯 职业素养' }
  ],
  list: [
    { group: 'group1', item: '前端框架', score: <Score value={5} total={5} />, description: 'React/Vue熟练掌握' },
    { group: 'group1', item: 'TypeScript', score: <Score value={5} total={5} />, description: '类型定义规范完整' },
    { group: 'group1', item: '性能优化', score: <Score value={4} total={5} />, description: 'SSR首屏优化显著' },
    { group: 'group1', item: '工程化', score: <Score value={4} total={5} />, description: 'CI/CD流程完善' },
    { group: 'group2', item: '需求交付', score: <Score value={5} total={5} />, description: '按时交付率98%' },
    { group: 'group2', item: '质量保障', score: <Score value={4} total={5} />, description: '线上故障率低' },
    { group: 'group2', item: '文档输出', score: <Score value={3} total={5} />, description: 'API文档需完善' },
    { group: 'group3', item: '团队协作', score: <Score value={5} total={5} />, description: '沟通顺畅主动' },
    { group: 'group3', item: '学习成长', score: <Score value={4} total={5} />, description: '技术分享积极' },
    { group: 'group3', item: '责任意识', score: <Score value={5} total={5} />, description: '工作认真负责' }
  ],
  footer: (item, index) => (
    <div style={{ padding: '4px 0', color: '#999', fontSize: '12px' }}>
      第 {index + 1} 项
    </div>
  )
};

const listReportData = {
  list: [
    { label: '👤 评估对象', content: '王明远' },
    { label: '🏢 所属部门', content: '技术研发中心 - 前端架构组' },
    { label: '💼 职级职位', content: '资深前端工程师（P6+）' },
    { label: '📅 入职时间', content: '2021年3月15日' },
    { label: '📊 评估周期', content: '2024年度' },
    { label: '🔍 评估日期', content: '2025年1月10日' },
    { label: '👨‍💼 评估人', content: '技术总监 - 陈思远' },
    { label: '📋 评估维度', content: '核心技能、项目绩效、职业素养' },
    { label: '🔧 评估方法', content: '代码审查 + 绩效数据 + 360度评估 + 技术面试' }
  ]
};

const partReportData = {
  list: [
    {
      label: '✨ 核心优势',
      hasBgColor: true,
      content: '1. 技术视野开阔，对前端技术栈有系统性理解，能够从架构层面思考问题。2. 学习能力强，快速掌握新技术并转化为生产力，AI工具应用效果显著。3. 代码质量意识强，注重可维护性和扩展性，推动团队代码规范落地。4. 工作积极主动，主动承担复杂任务，多次解决关键技术难题。'
    },
    {
      label: '📈 成长空间',
      content: '1. 在技术管理和团队带领方面需要更多历练。2. 跨部门协作时的商业思维有待提升，需要更好地理解业务价值。3. 技术成果的可视化展示和影响力打造可以进一步加强。'
    },
    {
      label: '🎯 发展建议',
      content: '1. 争取担任小型项目的Tech Lead，积累团队管理经验。2. 加强对后端、运维相关技术的学习，建立全栈技术视角。3. 每季度组织至少一次技术分享，提升团队技术氛围。4. 参与技术面试和人才评估，锻炼识人用人能力。5. 关注行业前沿趋势，定期输出技术文章或开源贡献。'
    },
    {
      label: '📚 培养计划',
      content: '1. Q2参加技术管理进阶培训。2. Q3参与微服务架构专项学习。3. Q4承担新人导师角色。4. 全年参与至少3个技术峰会或工作坊。5. 建立个人技术博客，每月至少输出1篇技术文章。'
    }
  ]
};

const BaseExample = () => {
  const [componentType, setComponentType] = useState('list');

  const renderComponent = () => {
    switch (componentType) {
      case 'list':
        return <Report.List report={listReportData} />;
      case 'result':
        return <Report.Result report={reportData} />;
      case 'table':
        return <Report.Table report={tableReportData} />;
      case 'part':
        return <Report.Part report={partReportData} />;
      default:
        return <Report.List report={listReportData} />;
    }
  };

  return (
    <Flex vertical gap={16}>
      {/* 控制面板 */}
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <span style={{ marginRight: 12 }}>子组件类型：</span>
        <Radio.Group value={componentType} onChange={(e) => setComponentType(e.target.value)}>
          <Radio.Button value="list">Report.List</Radio.Button>
          <Radio.Button value="result">Report.Result</Radio.Button>
          <Radio.Button value="table">Report.Table</Radio.Button>
          <Radio.Button value="part">Report.Part</Radio.Button>
        </Radio.Group>
      </div>

      {/* 组件展示区 */}
      <Space direction="vertical" size={24}>
        <Report title="📄 员工年度绩效评估报告" subtitle="2024年度 | 技术研发中心 | 前端架构组">
          {renderComponent()}
        </Report>
      </Space>
    </Flex>
  );
};

render(<BaseExample />);

```

- 评分展示
- 支持自定义总分和间距的星级评分组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Score } = _InfoPage;
const { Flex, Badge, Card, Divider, Tag, Space } = antd;

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      {/* 基础用法 */}
      <Card title="基础评分" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={24} align="center">
            <span>产品评分：</span>
            <Score value={5} />
          </Flex>
          <Flex gap={24} align="center">
            <span>服务质量：</span>
            <Score value={4} />
          </Flex>
          <Flex gap={24} align="center">
            <span>物流速度：</span>
            <Score value={3} />
          </Flex>
          <Flex gap={24} align="center">
            <span>性价比：</span>
            <Score value={2} />
          </Flex>
          <Flex gap={24} align="center">
            <span>用户满意：</span>
            <Score value={1} />
          </Flex>
        </Space>
      </Card>

      <Divider />

      {/* 自定义总分 */}
      <Card title="自定义总分" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={24} align="center">
            <span>3分制：</span>
            <Score value={0} total={3} />
            <Score value={1} total={3} />
            <Score value={2} total={3} />
            <Score value={3} total={3} />
          </Flex>
          <Flex gap={24} align="center">
            <span>4分制：</span>
            <Score value={1} total={4} />
            <Score value={2} total={4} />
            <Score value={3} total={4} />
            <Score value={4} total={4} />
          </Flex>
          <Flex gap={24} align="center">
            <span>5分制：</span>
            <Score value={2} total={5} />
            <Score value={3} total={5} />
            <Score value={4} total={5} />
            <Score value={5} total={5} />
          </Flex>
        </Space>
      </Card>

      <Divider />

      {/* 无间距 */}
      <Card title="紧凑模式（gap=0）" size="small">
        <Flex gap={24} align="center">
          <Score value={1} total={5} gap={0} />
          <Score value={2} total={5} gap={0} />
          <Score value={3} total={5} gap={0} />
          <Score value={4} total={5} gap={0} />
          <Score value={5} total={5} gap={0} />
        </Flex>
      </Card>

      <Divider />

      {/* 业务场景 */}
      <Card title="业务场景示例" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ padding: '8px 0' }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
              <span>商品名称</span>
              <Tag color="blue">新品上市</Tag>
            </Flex>
            <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
              <span style={{ color: '#999', fontSize: 12 }}>用户评价</span>
              <Badge count={128} showZero />
            </Flex>
            <Flex justify="space-between" align="center">
              <span style={{ fontSize: 14, fontWeight: 500 }}>Apple iPhone 15 Pro</span>
              <Score value={5} />
            </Flex>
          </div>

          <div style={{ padding: '8px 0', borderTop: '1px solid #f0f0f0' }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
              <span style={{ color: '#999', fontSize: 12 }}>商品评分</span>
              <span style={{ fontSize: 12, color: '#ff4d4f' }}>4.8/5.0</span>
            </Flex>
            <Flex justify="space-between" align="center">
              <span style={{ fontSize: 14 }}>综合得分</span>
              <Score value={4} total={5} />
            </Flex>
          </div>
        </Space>
      </Card>

      <Divider />

      {/* 所有评分展示 */}
      <Card title="完整评分展示" size="small">
        <Flex wrap="wrap" gap={16}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Flex key={index} vertical align="center" gap={4}>
              <Score value={index} />
              <span style={{ fontSize: 12, color: '#999' }}>{index}分</span>
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
};

render(<BaseExample />);

```

- 格式化视图
- 展示formatView工具函数的各种格式化用法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { formatView } = _InfoPage;
const { Flex, Space, Tag, Badge } = antd;

// 演示 formatView 工具函数的使用
const FormatDemo = () => {
  const demoData = {
    orderDate: '2024-01-15T10:30:00',
    deliveryDate: '2024-01-20',
    serviceDateRange: ['2024-01-01', '2024-12-31'],
    isVip: true,
    isActivated: false,
    userCount: 15678,
    totalAmount: 99999.99,
    discountRate: 0.085,
    completionRate: 85.67,
    phoneNumber: '13800138000'
  };

  // 自定义格式化函数
  const formatPhone = (val) => {
    if (!val) return '-';
    return val.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>formatView 工具函数演示</h4>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Flex justify="space-between" align="center">
            <span><strong>datetime:</strong></span>
            <span>{formatView(demoData.orderDate, 'datetime')} → {formatView(demoData.orderDate, 'datetime-YYYY年MM月DD日 HH:mm')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>date:</strong></span>
            <span>{formatView(demoData.deliveryDate, 'date')} → {formatView(demoData.deliveryDate, 'date-YYYY/MM/DD')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>dateRange:</strong></span>
            <span>{formatView(demoData.serviceDateRange, 'dateRange')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>boolean:</strong></span>
            <Flex gap={8}>
              <span>VIP客户: {formatView(demoData.isVip, 'boolean-是/否')}</span>
              <span>已激活: {formatView(demoData.isActivated, 'boolean-是/否')}</span>
            </Flex>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>number:</strong></span>
            <span>{formatView(demoData.userCount, 'number-useGrouping:true')} 用户</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>money:</strong></span>
            <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{formatView(demoData.totalAmount, 'money-元')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>discount:</strong></span>
            <span>折扣: {formatView(demoData.discountRate * 100, 'number-maximumFractionDigits:1-suffix:折')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>percent:</strong></span>
            <span>完成率: {formatView(demoData.completionRate, 'number-maximumFractionDigits:2-suffix:%')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>custom:</strong></span>
            <span>{formatPhone(demoData.phoneNumber)}</span>
          </Flex>
        </Space>
      </div>

      {/* 实际应用场景演示 */}
      <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e8e8e8' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>实际应用场景：订单详情</h4>
        <Flex vertical gap={8}>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>订单编号</span>
            <span>ORD20240115001</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>下单时间</span>
            <span>{formatView(demoData.orderDate, 'datetime')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>预计送达</span>
            <span>{formatView(demoData.deliveryDate, 'date-YYYY年MM月DD日')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>服务期限</span>
            <span>{formatView(demoData.serviceDateRange, 'dateRange')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>客户类型</span>
            <Tag color={demoData.isVip ? 'gold' : 'default'}>{formatView(demoData.isVip, 'boolean-VIP/普通')}</Tag>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>订单金额</span>
            <span style={{ color: '#f5222d', fontSize: '18px', fontWeight: 'bold' }}>
              {formatView(demoData.totalAmount, 'money-元')}
            </span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>优惠折扣</span>
            <span style={{ color: '#52c41a' }}>{formatView(demoData.discountRate * 100, 'number-maximumFractionDigits:1-suffix:折')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>订单状态</span>
            <Badge status={demoData.completionRate >= 100 ? 'success' : 'processing'} text={demoData.completionRate >= 100 ? '已完成' : '处理中'} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>完成进度</span>
            <span>{formatView(demoData.completionRate, 'number-maximumFractionDigits:2-suffix:%')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>联系电话</span>
            <span>{formatPhone(demoData.phoneNumber)}</span>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <FormatDemo />
    </Flex>
  );
};

render(<BaseExample />);

```


### API

### InfoPage

信息展示页面容器组件，提供统一的页面布局和间距控制

#### 属性说明

| 属性名       | 类型        | 必填 | 默认值 | 说明      |
|-----------|-----------|----|-----|---------|
| className | string    | 否  | -   | 自定义样式类名 |
| children  | ReactNode | 否  | -   | 子组件内容   |

### InfoPage.Part

信息展示区块组件，用于包装具体的信息内容

#### 属性说明

| 属性名       | 类型        | 必填 | 默认值   | 说明         |
|-----------|-----------|----|-------|------------|
| className | string    | 否  | -     | 自定义样式类名    |
| title     | ReactNode | 否  | -     | 区块标题       |
| subtitle  | ReactNode | 否  | -     | 区块副标题      |
| extra     | ReactNode | 否  | -     | 区块额外操作区域   |
| children  | ReactNode | 否  | -     | 区块内容       |
| bordered  | boolean   | 否  | false | 是否显示额外边框样式 |

### Content / InfoList

通用内容展示组件，支持标签-内容的灵活布局

#### 属性说明

| 属性名        | 类型       | 必填 | 默认值    | 说明                                       |
|------------|----------|----|--------|------------------------------------------|
| list       | array    | 否  | []     | 展示数据列表                                   |
| labelAlign | string   | 否  | 'left' | 标签对齐方式，可选 'left'、'center'、'right'、'auto' |
| col        | number   | 否  | 1      | 每行显示的列数                                  |
| gutter     | number   | 否  | 0      | 栅格间隔                                     |
| className  | string   | 否  | -      | 自定义样式类名                                  |
| size       | string   | 否  | -      | 尺寸大小，可选 'small'                          |
| itemRender | function | 否  | -      | 自定义列表项渲染函数                               |

#### 列表项数据结构

| 属性名     | 类型               | 必填 | 默认值   | 说明     |
|---------|------------------|----|-------|--------|
| label   | ReactNode        | 否  | -     | 标签内容   |
| content | ReactNode        | 否  | -     | 内容区域   |
| block   | boolean          | 否  | false | 是否占据整行 |
| display | boolean/function | 否  | true  | 是否显示该项 |

### Descriptions / DetailList

描述列表组件，类似于 Ant Design 的 Descriptions，专为详情页设计

#### 属性说明

| 属性名        | 类型       | 必填 | 默认值   | 说明                |
|------------|----------|----|-------|-------------------|
| dataSource | array    | 是  | -     | 二维数组数据源，每个子数组代表一行 |
| isFull     | boolean  | 否  | false | 标签是否占据更大空间        |
| className  | string   | 否  | -     | 自定义样式类名           |
| itemRender | function | 否  | -     | 自定义项渲染函数          |

### CentralContent / FieldView

居中内容展示组件，支持列定义和自动布局

#### 属性说明

| 属性名                | 类型        | 必填 | 默认值     | 说明                      |
|--------------------|-----------|----|---------|-------------------------|
| dataSource         | object    | 否  | {}      | 数据源对象                   |
| columns            | array     | 否  | []      | 列定义数组                   |
| col                | number    | 否  | 2       | 展示列数                    |
| type               | string    | 否  | -       | 组件类型，可选 'compact'（紧凑模式） |
| valueIsEmpty       | function  | 否  | isEmpty | 值为空的判断函数                |
| emptyIsPlaceholder | boolean   | 否  | true    | 空值是否显示占位符               |
| placeholder        | ReactNode | 否  | '-'     | 空值占位符                   |
| className          | string    | 否  | -       | 自定义样式类名                 |
| context            | object    | 否  | -       | 上下文数据                   |

#### 列定义数据结构

| 属性名    | 类型              | 必填 | 默认值   | 说明      |
|--------|-----------------|----|-------|---------|
| name   | string          | 是  | -     | 字段名称    |
| title  | ReactNode       | 否  | -     | 显示标题    |
| format | string/function | 否  | -     | 格式化规则   |
| render | function        | 否  | -     | 自定义渲染函数 |
| span   | number          | 否  | -     | 栅格占位格数  |
| block  | boolean         | 否  | false | 是否占据整行  |

### TableView

表格视图组件，支持行选择和自定义列配置

#### 属性说明

| 属性名                | 类型              | 必填 | 默认值       | 说明        |
|--------------------|-----------------|----|-----------|-----------|
| dataSource         | array           | 否  | []        | 表格数据源     |
| columns            | array           | 是  | -         | 列定义数组     |
| rowKey             | string/function | 否  | 'id'      | 行数据的唯一标识  |
| rowSelection       | object          | 否  | -         | 行选择配置     |
| valueIsEmpty       | function        | 否  | isEmpty   | 值为空的判断函数  |
| emptyIsPlaceholder | boolean         | 否  | true      | 空值是否显示占位符 |
| placeholder        | ReactNode       | 否  | '-'       | 空值占位符     |
| empty              | ReactNode       | 否  | <Empty /> | 空数据展示内容   |
| onRowSelect        | function        | 否  | -         | 行选择回调函数   |
| render             | function        | 否  | -         | 自定义渲染函数   |
| context            | object          | 否  | -         | 上下文数据     |
| sticky             | boolean         | 否  | false     | 表头是否固定    |
| className          | string          | 否  | -         | 自定义样式类名   |

#### 行选择配置

| 属性名              | 类型       | 必填 | 默认值        | 说明                          |
|------------------|----------|----|------------|-----------------------------|
| type             | string   | 否  | 'checkbox' | 选择类型，可选 'checkbox'、'radio'  |
| selectedRowKeys  | array    | 否  | []         | 已选中行的key数组                  |
| onChange         | function | 否  | -          | 选择变化回调函数                    |
| isSelectedAll    | boolean  | 否  | false      | 是否全选状态                      |
| allowSelectedAll | boolean  | 否  | false      | 是否允许全选（配合 isSelectedAll 使用） |

### Flow

流程展示组件，基于 Ant Design Steps 组件扩展

#### 属性说明

| 属性名                | 类型        | 必填 | 默认值        | 说明                               |
|--------------------|-----------|----|------------|----------------------------------|
| dataSource         | array     | 否  | []         | 流程数据源                            |
| columns            | array     | 否  | []         | 列定义数组                            |
| size               | string    | 否  | 'small'    | 步骤条大小                            |
| current            | number    | 否  | -          | 当前步骤（从0开始）                       |
| direction          | string    | 否  | 'vertical' | 步骤条方向，可选 'vertical'、'horizontal' |
| progressDot        | boolean   | 否  | false      | 是否使用点状步骤条                        |
| labelPlacement     | string    | 否  | 'vertical' | 标签位置，可选 'vertical'、'horizontal'  |
| empty              | ReactNode | 否  | <Empty />  | 空数据展示内容                          |
| valueIsEmpty       | function  | 否  | isEmpty    | 值为空的判断函数                         |
| placeholder        | ReactNode | 否  | '-'        | 空值占位符                            |
| emptyIsPlaceholder | boolean   | 否  | false      | 空值是否显示占位符                        |
| className          | string    | 否  | -          | 自定义样式类名                          |

#### columns 列定义支持的 type 类型

| type        | 说明   | 特殊处理              |
|-------------|------|-------------------|
| title       | 标题   | -                 |
| subTitle    | 副标题  | -                 |
| description | 描述   | -                 |
| status      | 状态   | -                 |
| content     | 额外内容 | 渲染为独立区块           |
| actionList  | 操作列表 | 唯一支持 children 的类型 |

### SplitLine

分割线展示组件，用于横向展示多个字段

#### 属性说明

| 属性名                | 类型        | 必填 | 默认值                         | 说明                              |
|--------------------|-----------|----|-----------------------------|---------------------------------|
| dataSource         | object    | 否  | -                           | 数据源对象                           |
| columns            | array     | 是  | -                           | 列定义数组                           |
| valueIsEmpty       | function  | 否  | isEmpty                     | 值为空的判断函数                        |
| placeholder        | ReactNode | 否  | '-'                         | 空值占位符                           |
| emptyIsPlaceholder | boolean   | 否  | false                       | 空值是否显示占位符                       |
| size               | number    | 否  | 0                           | 分割线间距                           |
| labelGap           | number    | 否  | 4                           | 标签与内容的间距                        |
| labelMode          | string    | 否  | 'horizontal'                | 标签模式，可选 'horizontal'、'vertical' |
| split              | ReactNode | 否  | <Divider type="vertical" /> | 分割线组件                           |
| context            | object    | 否  | -                           | 上下文数据                           |
| className          | string    | 否  | -                           | 自定义样式类名                         |

#### columns 列定义特殊属性

| 属性名  | 类型        | 必填 | 默认值 | 说明   |
|------|-----------|----|-----|------|
| icon | ReactNode | 否  | -   | 图标元素 |

### Report

报告容器组件，用于生成打印友好的报告页面

#### 属性说明

| 属性名       | 类型        | 必填 | 默认值  | 说明      |
|-----------|-----------|----|------|---------|
| title     | ReactNode | 否  | -    | 报告标题    |
| subtitle  | ReactNode | 否  | -    | 报告副标题   |
| extra     | ReactNode | 否  | -    | 标题额外内容  |
| border    | boolean   | 否  | true | 是否显示边框  |
| children  | ReactNode | 否  | -    | 子组件内容   |
| className | string    | 否  | -    | 自定义样式类名 |

### Report.List

报告列表子组件，展示键值对形式的报告内容

#### 属性说明

| 属性名         | 类型     | 必填 | 默认值 | 说明                         |
|-------------|--------|----|-----|----------------------------|
| report      | object | 是  | -   | 报告数据对象，包含 list 数组          |
| report.list | array  | 是  | -   | 列表项数组，每项包含 label、content 等 |

### Report.Result

报告结果子组件，展示评分结果和详细描述

#### 属性说明

| 属性名          | 类型     | 必填 | 默认值 | 说明                              |
|--------------|--------|----|-----|---------------------------------|
| report       | object | 是  | -   | 报告数据对象，包含 total 和 list          |
| report.total | object | 是  | -   | 总分信息，包含 score、label             |
| report.list  | array  | 是  | -   | 评分明细列表，每项包含 label、score、content |

### Report.Table

报告表格子组件，展示分组评分表格

#### 属性说明

| 属性名            | 类型     | 必填 | 默认值 | 说明                     |
|----------------|--------|----|-----|------------------------|
| report         | object | 是  | -   | 报告数据对象                 |
| report.columns | array  | 是  | -   | 表格列定义                  |
| report.group   | array  | 是  | -   | 分组定义数组，每项包含 name、label |
| report.list    | array  | 是  | -   | 表格数据列表                 |

### Report.Part

报告内容区块子组件，展示段落形式的内容

#### 属性说明

| 属性名         | 类型     | 必填 | 默认值 | 说明                         |
|-------------|--------|----|-----|----------------------------|
| report      | object | 是  | -   | 报告数据对象，包含 list 数组          |
| report.list | array  | 是  | -   | 内容项数组，每项包含 label、content 等 |

### Report.Score

报告评分展示子组件

#### 属性说明

| 属性名   | 类型     | 必填 | 默认值 | 说明    |
|-------|--------|----|-----|-------|
| value | number | 是  | -   | 当前评分值 |

### Score

评分展示组件，以星形图标展示评分

#### 属性说明

| 属性名       | 类型     | 必填 | 默认值 | 说明       |
|-----------|--------|----|-----|----------|
| value     | number | 是  | -   | 当前评分值    |
| gap       | number | 否  | 4   | 评分项之间的间距 |
| total     | number | 否  | 5   | 总评分项数    |
| className | string | 否  | -   | 自定义样式类名  |

### formatView

数据格式化工具函数，提供多种常用格式化规则

#### 方法说明

| 方法名     | 参数                       | 返回值           | 说明          |
|---------|--------------------------|---------------|-------------|
| default | (value, format, context) | string/object | 根据格式规则格式化数据 |

#### 支持的格式化规则

| 格式名       | 说明      | 参数                             |
|-----------|---------|--------------------------------|
| date      | 日期格式化   | 模板字符串，默认 'YYYY-MM-DD'          |
| datetime  | 日期时间格式化 | 模板字符串，默认 'YYYY-MM-DD HH:mm:ss' |
| dateRange | 日期范围格式化 | 模板字符串、是否允许空值                   |
| boolean   | 布尔值格式化  | true值对应的文本，默认 'true'           |
| number    | 数字格式化   | 样式、单位、小数位数等                    |
| money     | 金额格式化   | 单位，默认 '元'                      |

### computeColumnsValue

列值计算工具函数，用于统一处理列数据的显示逻辑

#### 方法说明

| 方法名                   | 参数       | 返回值       | 说明         |
|-----------------------|----------|-----------|------------|
| default               | (config) | array     | 计算列的显示值    |
| computeDisplay        | (config) | ReactNode | 计算单个列的显示内容 |
| computeColumnsDisplay | (config) | array     | 计算所有列的显示内容 |

#### 配置参数

| 参数名                | 类型           | 必填 | 默认值     | 说明        |
|--------------------|--------------|----|---------|-----------|
| columns            | array        | 是  | -       | 列定义数组     |
| dataSource         | object/array | 是  | -       | 数据源       |
| context            | object       | 否  | -       | 上下文数据     |
| valueIsEmpty       | function     | 否  | isEmpty | 值为空的判断函数  |
| emptyIsPlaceholder | boolean      | 否  | true    | 空值是否显示占位符 |
| removeEmpty        | boolean      | 否  | true    | 是否移除空值列   |
| placeholder        | ReactNode    | 否  | '-'     | 空值占位符     |

