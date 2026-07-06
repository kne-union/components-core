# Content

### 概述

Content 从 `@kne/info-page` 重新导出，用于详情页中的多列内容展示，支持标签对齐、列数配置、数据格式化等能力。

本组件文档仅展示常用示例。完整概述、使用说明与 API 请前往 **InfoPage** 组件文档查看。


### 示例

#### 示例代码

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

### API

Content 的 API 与 `@kne/info-page` 保持一致。

请前往 **InfoPage** 组件文档中的 **Content / InfoList** 章节查看完整属性说明。
