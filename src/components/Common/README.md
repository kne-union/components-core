# Common

### 概述

为组件库提供通用的组件、方法、hooks

### 组件

1. **FetchButton** - Button触发加载数据，支持弹窗展示加载结果
2. **ScrollLoader** - 下拉滚动加载组件，配合 Fetch 实现分页加载
3. **SearchInput** - 提供防抖的查询输入框
4. **SimpleBarBox** - 自定义滚动条容器（已废弃，请勿使用）
5. **TreeField** - 树形选择组件，支持单选和多选
6. **CascaderField** - 级联选择组件，支持多级联动选择
7. **TypeDateRangePickerField** - 类型日期范围选择器，支持按日、周、月选择
8. **SuperSelectField** - 新版高级选择组件，提供更强的自定义能力
9. **SuperSelectUserField** - 用户选择组件，展示用户头像和描述
10. **SuperSelectTableListField** - 表格列表选择组件
11. **SuperSelectTreeField** - 树形选择组件
12. **AdvancedSelectField** - 高级选择组件，支持用户选择、列表选择
13. **UserField** - 用户选择组件（旧版）
14. **TableField** - 表格选择组件
15. **AddressSelectField** - 地址选择组件
16. **AddressInputField** - 地址输入组件
17. **AddressEnum** - 地址枚举展示
18. **FunctionSelectField** - 职能选择组件
19. **FunctionEnum** - 职能枚举展示
20. **IndustrySelectField** - 行业选择组件
21. **IndustryEnum** - 行业枚举展示

### 方法

1. **changeMoneyToChinese** - 将金额转化为大写的人民币金额
2. **getPopupContainer** - 获取弹窗容器
3. **getContainerBody** - 获取 body 容器
4. **accept** - 文件类型验证
5. **createDeferred** - 创建延迟对象
6. **isNotEmpty** - 非空判断
7. **pxToNumber** - px 转数字
8. **numberToPx** - 数字转 px
9. **validateIDCard** - 身份证号验证

### HOC (高阶组件)

1. **withInputFile** - 文件上传高阶组件
2. **useFileUpload** - 文件上传 Hook
3. **InputFileButton** - 文件上传按钮组件
4. **InputFileLink** - 文件上传链接组件
5. **InputFileText** - 文件上传文本组件
6. **withOSSFile** - OSS 文件上传高阶组件

### Hooks

1. **useResize** - 监听元素尺寸变化
2. **usePreset** - 获取预设配置

### 其他工具

1. **createTreeUtils** - 创建树形数据工具函数
2. **getScrollEl** - 获取滚动元素
3. **Scroller** - 横向滚动组件
4. **SelectInnerInput** - 内部选择输入框基础组件

### 示例

#### 示例样式

```scss
.scroll-list {
  max-height: 300px;
}
```

#### 示例代码

- FetchButton
- Button触发加载数据，加载数据后在弹窗中展示
- _Common(@components/Common),_Modal(@components/Modal),_antd(antd)

```jsx
const {FetchButton} = _Common;
const {Typography, App} = _antd;

const {useModal} = _Modal;

const BaseExample = () => {
    const modal = useModal();

    return (<FetchButton
        api={{
            loader: () => {
                return [{id: 1, name: "前端开发组", count: 8, description: "负责所有前端页面开发"}, {
                    id: 2,
                    name: "后端开发组",
                    count: 12,
                    description: "负责 API 和服务器开发"
                }, {id: 3, name: "测试组", count: 5, description: "负责功能测试和质量保证"}, {
                    id: 4,
                    name: "运维组",
                    count: 3,
                    description: "负责系统部署和维护"
                },];
            },
        }}
        modalProps={(contextProps) => {
            const {data, fetchApi} = contextProps;
            return {
                title: "团队信息", children: (<div>
                    <Typography.Paragraph>当前项目团队构成：</Typography.Paragraph>
                    {data.map((item) => (<div key={item.id} style={{marginBottom: 16}}>
                        <Typography.Text strong style={{fontSize: 15}}>
                            {item.name}
                        </Typography.Text>
                        <div style={{marginTop: 4, color: '#666'}}>
                            <Typography.Text>人数：{item.count} 人</Typography.Text>
                            <Typography.Text style={{marginLeft: 16}}>
                                说明：{item.description}
                            </Typography.Text>
                        </div>
                    </div>))}
                </div>),
            };
        }}
        modalFunc={modal}
    >
        查看团队信息
    </FetchButton>);
};

render(<BaseExample/>);

```

- Enum
- 枚举展示组件，展示地址、职能、行业等枚举信息
- _Common(@components/Common),_antd(antd)

```jsx
const Common = _Common;
const { Space } = _antd;

const { AddressEnum, FunctionEnum, IndustryEnum } = Common;

const BaseExample = () => {
  return (
    <Space direction={"vertical"}>
      <AddressEnum name={"010"} />
      <FunctionEnum name={"010"} />
      <IndustryEnum name={"010"} />
    </Space>
  );
};

render(<BaseExample />);

```

- ScrollLoader
- 下拉滚动加载组件，配合 Fetch 实现分页加载
- _Common(@components/Common),_reactFetch(@kne/react-fetch),lodash(lodash),_antd(antd)

```jsx
const { get, merge, range } = lodash;
const { ScrollLoader } = _Common;
const { default: Fetch } = _reactFetch;
const { Card, List, Avatar, Typography, Space, Tag } = _antd;

const BaseExample = () => {
  const mockUsers = [
    { name: "张三", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang", role: "产品经理" },
    { name: "李四", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=li", role: "UI设计师" },
    { name: "王五", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang", role: "前端开发" },
    { name: "赵六", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao", role: "后端开发" },
    { name: "孙七", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sun", role: "测试工程师" },
    { name: "周八", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhou", role: "运维工程师" },
  ];

  const mockComments = [
    "这个功能很实用，期待上线！",
    "界面设计简洁美观，用户体验不错。",
    "建议增加批量操作功能。",
    "加载速度很快，性能很好。",
    "文档清晰，上手容易。",
  ];

  return (
    <Card title="团队评论列表" style={{ maxWidth: 600 }}>
      <Fetch
        loader={({ data }) => {
          const params = Object.assign(
            {
              perPage: 10,
              currentPage: 1,
            },
            data
          );
          return new Promise((resolve) => {
            const start = (params.currentPage - 1) * params.perPage;
            setTimeout(() => {
              resolve({
                totalCount: 50,
                pageData: range(start, start + params.perPage).map((key) => {
                  const user = mockUsers[key % mockUsers.length];
                  const comment = mockComments[key % mockComments.length];
                  const hours = Math.floor(key / 3);
                  return {
                    id: key + 1,
                    user: user.name,
                    avatar: user.avatar,
                    role: user.role,
                    content: comment,
                    time: &#96;${hours}小时前&#96;,
                    likes: Math.floor(Math.random() * 50) + 1,
                  };
                }),
              });
            }, 500);
          });
        }}
        render={(fetchApi) => {
          const pagination = {
            paramsType: "data",
            current: "currentPage",
            pageSize: "perPage",
            defaultPageSize: 10,
          };
          const current = get(
              fetchApi.requestParams,
              [pagination.paramsType, pagination.current],
              1
            ),
            pageSize =
              get(fetchApi.requestParams, [
                pagination.paramsType,
                pagination.pageSize,
              ]) || pagination.defaultPageSize;

          const formatData = {
            list: fetchApi.data.pageData || [],
            total: fetchApi.data.totalCount || 0,
          };
          return (
            <ScrollLoader
              completeTips=""
              className="scroll-list"
              isLoading={!fetchApi.isComplete}
              noMore={!formatData.total || current * pageSize >= formatData.total}
              onLoader={async () => {
                await fetchApi.loadMore(
                  merge({
                    data: {
                      [pagination.pageSize]: pageSize,
                      [pagination.current]: current + 1,
                    },
                  }),
                  (data, newData) => {
                    return Object.assign({}, newData, {
                      pageData: data.pageData.concat(newData.pageData),
                    });
                  }
                );
              }}
            >
              <List
                dataSource={formatData.list}
                renderItem={(item) => (
                  <List.Item style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={
                        <Space>
                          <Typography.Text strong>{item.user}</Typography.Text>
                          <Tag color="blue" style={{ fontSize: 12 }}>{item.role}</Tag>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Typography.Text>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={4}>
                          <Typography.Text>{item.content}</Typography.Text>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                            👍 {item.likes} 人赞同
                          </Typography.Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </ScrollLoader>
          );
        }}
      />
    </Card>
  );
};

render(<BaseExample />);

```

- SearchInput
- 提供防抖的查询输入框组件
- _Common(@components/Common)

```jsx
const Common = _Common;

const { SearchInput } = Common;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onSearch={(value) => {
        setValue(value);
        console.log(value);
      }}
    />
  );
};

render(<BaseExample />);

```

- AdvancedSelect
- 高级选择组件，支持用户选择、列表选择等功能
- _Common(@components/Common),_antd(antd)

```jsx
const { UserField } = _Common;
const { Space, Typography } = _antd;

const BaseExample = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text>
        已选择 {value.length} 人
      </Typography.Text>
      <UserField
        value={value}
        onChange={setValue}
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        allowSelectAll
        showSelectedCount
        countUnit="人"
        allLabel="所有人"
        placeholder="选择团队成员"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "张三",
                  value: 1,
                  avatar: "avatar-001",
                  description: "前端工程师",
                },
                {
                  label: "李四",
                  value: 2,
                  avatar: "avatar-002",
                  description: "后端工程师",
                },
                {
                  label: "王五",
                  value: 3,
                  avatar: "avatar-003",
                  description: "产品经理",
                },
                {
                  label: "赵六",
                  value: 4,
                  avatar: "avatar-004",
                  description: "UI设计师",
                },
                {
                  label: "钱七",
                  value: 5,
                  avatar: "avatar-005",
                  description: "测试工程师",
                },
              ],
            };
          },
        }}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- SuperSelect
- 新版高级选择组件，提供更强的自定义能力
- _Common(@components/Common),_antd(antd)

```jsx
const { SuperSelectField, SuperSelectTableListField, SuperSelectUserField } = _Common;
const { Space, Typography } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [userValue, setUserValue] = useState([]);
  const [deptValue, setDeptValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>用户选择</Typography.Text>
      <SuperSelectUserField
        value={userValue}
        onChange={setUserValue}
        allowSelectedAll
        placeholder="选择用户"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "张三",
                  value: 1,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang" },
                  description: "高级前端工程师",
                },
                {
                  label: "李四",
                  value: 2,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=li" },
                  description: "资深后端工程师",
                },
                {
                  label: "王五",
                  value: 3,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang" },
                  description: "产品经理",
                },
                {
                  label: "赵六",
                  value: 4,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao" },
                  description: "UI设计师",
                },
                {
                  label: "钱七",
                  value: 5,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=qian" },
                  description: "测试工程师",
                },
              ],
            };
          },
        }}
      />

      <Typography.Text strong>部门选择</Typography.Text>
      <SuperSelectField
        isPopup={false}
        value={deptValue}
        onChange={setDeptValue}
        allowSelectedAll
        placeholder="选择部门"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "技术部",
                  value: "tech",
                  description: "负责产品技术实现",
                },
                {
                  label: "产品部",
                  value: "product",
                  description: "负责产品规划和设计",
                },
                {
                  label: "设计部",
                  value: "design",
                  description: "负责 UI/UX 设计",
                },
                {
                  label: "市场部",
                  value: "marketing",
                  description: "负责市场推广和运营",
                },
              ],
            };
          },
        }}
      />

      <Typography.Text strong>项目列表选择</Typography.Text>
      <SuperSelectTableListField
        isPopup={false}
        labelKey="name"
        valueKey="id"
        placeholder="选择项目"
        getSearchCallback={(searchProps, item, contextProps) => {
          const { props } = contextProps;
          const { labelKey } = props;
          if (!searchProps.searchText) {
            return true;
          }
          return item[labelKey].indexOf(searchProps.searchText) > -1;
        }}
        options={[
          { id: 1, name: "电商平台", count: 15, description: "在线购物平台", disabled: false },
          { id: 2, name: "OA系统", count: 8, description: "办公自动化系统", disabled: true },
          { id: 3, name: "CRM系统", count: 10, description: "客户关系管理", disabled: false },
          { id: 4, name: "数据大屏", count: 5, description: "数据可视化展示", disabled: false },
          { id: 5, name: "移动APP", count: 12, description: "移动端应用", disabled: false },
          { id: 6, name: "小程序", count: 6, description: "微信小程序", disabled: false },
        ]}
        columns={[
          {
            name: "name",
            title: "项目名称",
            span: 8,
          },
          {
            name: "count",
            title: "团队人数",
            span: 8,
          },
          {
            name: "description",
            title: "项目描述",
            span: 8,
          },
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- TreeField
- 树形选择组件，支持单选和多选
- _Common(@components/Common),_antd(antd)

```jsx
const { TreeField } = _Common;
const { Space, Typography, Button } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>组织架构选择（多选）</Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        已选择: {value.length} 个部门
      </Typography.Text>
      <TreeField
        api={{
          loader: () => {
            return [
              {
                key: 'tech',
                title: '技术部',
                children: [
                  {
                    key: 'frontend',
                    title: '前端组',
                    children: [
                      { key: 'fe-web', title: 'Web前端' },
                      { key: 'fe-mobile', title: '移动端' },
                    ],
                  },
                  {
                    key: 'backend',
                    title: '后端组',
                    children: [
                      { key: 'be-java', title: 'Java后端' },
                      { key: 'be-node', title: 'Node.js后端' },
                    ],
                  },
                ],
              },
              {
                key: 'product',
                title: '产品部',
                children: [
                  { key: 'pm-web', title: 'Web产品' },
                  { key: 'pm-mobile', title: '移动产品' },
                ],
              },
              {
                key: 'design',
                title: '设计部',
                children: [
                  { key: 'ui', title: 'UI设计' },
                  { key: 'ux', title: 'UX设计' },
                ],
              },
              {
                key: 'marketing',
                title: '市场部',
                children: [
                  { key: 'market', title: '市场推广' },
                  { key: 'operation', title: '运营' },
                ],
              },
            ];
          },
        }}
        value={value}
        onChange={setValue}
        placeholder="请选择部门"
        single={false}
      />
      <Button onClick={() => setValue([])}>清空选择</Button>
    </Space>
  );
};

render(<BaseExample />);

```

- CascaderField
- 级联选择组件，支持多级联动选择
- _Common(@components/Common),_antd(antd)

```jsx
const { CascaderField } = _Common;
const { Space, Typography, Button } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>省市区级联选择（最多3个）</Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        已选择: {value.length} 个区域
      </Typography.Text>
      <CascaderField
        api={{
          loader: () => {
            return [
              {
                id: 'zhejiang',
                label: '浙江省',
                children: [
                  {
                    id: 'hangzhou',
                    label: '杭州市',
                    children: [
                      { id: 'xihu', label: '西湖区' },
                      { id: 'gongshu', label: '拱墅区' },
                      { id: 'jianggan', label: '江干区' },
                      { id: 'binjiang', label: '滨江区' },
                    ],
                  },
                  {
                    id: 'ningbo',
                    label: '宁波市',
                    children: [
                      { id: 'haishu', label: '海曙区' },
                      { id: 'jiangbei', label: '江北区' },
                      { id: 'yinzhou', label: '鄞州区' },
                    ],
                  },
                ],
              },
              {
                id: 'jiangsu',
                label: '江苏省',
                children: [
                  {
                    id: 'nanjing',
                    label: '南京市',
                    children: [
                      { id: 'xuanwu', label: '玄武区' },
                      { id: 'jianye', label: '建邺区' },
                      { id: 'gulou', label: '鼓楼区' },
                    ],
                  },
                  {
                    id: 'suzhou',
                    label: '苏州市',
                    children: [
                      { id: 'gusu', label: '姑苏区' },
                      { id: 'wuzhong', label: '吴中区' },
                    ],
                  },
                ],
              },
              {
                id: 'guangdong',
                label: '广东省',
                children: [
                  {
                    id: 'guangzhou',
                    label: '广州市',
                    children: [
                      { id: 'yuexiu', label: '越秀区' },
                      { id: 'tianhe', label: '天河区' },
                      { id: 'baiyun', label: '白云区' },
                    ],
                  },
                  {
                    id: 'shenzhen',
                    label: '深圳市',
                    children: [
                      { id: 'futian', label: '福田区' },
                      { id: 'nanshan', label: '南山区' },
                      { id: 'baoan', label: '宝安区' },
                    ],
                  },
                ],
              },
            ];
          },
        }}
        value={value}
        onChange={setValue}
        placeholder="请选择省市区"
        maxLength={3}
        isPopup={true}
      />
      <Button onClick={() => setValue([])}>清空选择</Button>
    </Space>
  );
};

render(<BaseExample />);

```

- TypeDateRangePicker
- 类型日期范围选择器，支持按日、周、月选择
- _Common(@components/Common),_antd(antd)

```jsx
const { TypeDateRangePickerField } = _Common;
const { Space, Typography } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState({
    type: 'date',
    value: [],
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text>当前值: {JSON.stringify(value)}</Typography.Text>
      <TypeDateRangePickerField
        value={value}
        onChange={setValue}
        placeholder={['开始日期', '结束日期']}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- InputFile
- 文件上传组件，支持按钮、链接、文本等多种形式
- _Common(@components/Common),_antd(antd)

```jsx
const { InputFileButton, InputFileLink, InputFileText } = _Common;
const { Space, Typography, message, Alert } = _antd;

const BaseExample = () => {
  const handleFileChange = (file) => {
    console.log('选择的文件:', file);
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
    message.success(&#96;已选择文件: ${file.name} (${sizeInMB}MB)&#96;);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>文件上传组件示例</Typography.Text>
      <Alert
        message="支持上传图片（JPG、PNG）和 PDF 文档，单个文件不超过 10MB"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Typography.Text>按钮形式上传：</Typography.Text>
      <InputFileButton
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        点击上传文件
      </InputFileButton>

      <Typography.Text style={{ marginTop: 8 }}>链接形式上传：</Typography.Text>
      <InputFileLink
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        选择要上传的文件
      </InputFileLink>

      <Typography.Text style={{ marginTop: 8 }}>文本形式上传：</Typography.Text>
      <InputFileText
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        浏览文件
      </InputFileText>
    </Space>
  );
};

render(<BaseExample />);

```

- changeMoneyToChinese
- 金额转大写中文工具函数
- _Common(@components/Common),_antd(antd)

```jsx
const { changeMoneyToChinese } = _Common;
const { Space, Typography, Input, Button, Card } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [amount, setAmount] = useState('');
  const chineseAmount = changeMoneyToChinese(amount);

  return (
    <Space direction="vertical" style={{ width: '400px' }}>
      <Typography.Text strong style={{ fontSize: 16 }}>
        金额转大写中文
      </Typography.Text>
      <Input
        placeholder="请输入金额"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        prefix="¥"
        size="large"
        addonAfter="元"
      />
      <Card size="small" style={{ marginTop: 8 }}>
        <Typography.Text strong style={{ fontSize: 14 }}>
          大写金额：
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginLeft: 8,
            color: '#1890ff'
          }}
        >
          {chineseAmount || '等待输入...'}
        </Typography.Text>
      </Card>
      <Space wrap>
        <Button onClick={() => setAmount('123456.78')}>
          常用金额：123,456.78
        </Button>
        <Button onClick={() => setAmount('10000')}>
          整数：10,000
        </Button>
        <Button onClick={() => setAmount('0')}>
          零值：0
        </Button>
        <Button onClick={() => setAmount('')}>
          清空
        </Button>
      </Space>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        * 最大支持金额：999,999,999,999,999.999999
      </Typography.Text>
    </Space>
  );
};

render(<BaseExample />);

```

### API

## FetchButton

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象，包含loader等接口方法 | `{ loader: Function }` | - |
| modalProps | 弹窗属性配置函数，接收 contextProps 参数 | `(contextProps) => ModalProps` | - |
| modalFunc | 弹窗功能函数，接收 modalApi 参数 | `(modalApi) => void` | - |
| onError | 错误处理函数 | `(error) => void` | - |
| ...ButtonProps | 继承 Button 组件所有属性 | - | - |

## ScrollLoader

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isLoading | 是否正在加载 | `boolean` | false |
| noMore | 是否已加载完毕 | `boolean` | false |
| onLoader | 加载更多回调函数 | `() => Promise<void>` | - |
| completeTips | 完成提示文本 | `string` | "没有更多了" |
| className | 样式类名 | `string` | - |
| children | 子元素 | `ReactNode` | - |

## SearchInput

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入框值 | `string` | - |
| onSearch | 搜索回调函数，已防抖 | `(value: string) => void` | - |
| debounce | 防抖延迟时间（毫秒） | `number` | 500 |
| placeholder | 占位符 | `string` | "请输入" |
| isPopup | 是否在弹窗中使用 | `boolean` | false |
| ...InputProps | 继承 Input.Search 组件所有属性 | - | - |

## TreeField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: Array<any>) => void` | - |
| fieldNames | 字段名称映射 | `{ key, title, children }` | - |
| placeholder | 占位符 | `string` | "请选择" |
| single | 是否单选 | `boolean` | false |
| maxLength | 最大选择数量 | `number` | MAX_VALUE |
| isPopup | 是否弹窗展示 | `boolean` | true |
| checkStrictly | 父子节点是否不关联 | `boolean` | false |
| searchPlaceholder | 搜索框占位符 | `string` | "搜索" |

## CascaderField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: Array<any>) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| maxLength | 最大选择数量 | `number` | MAX_VALUE |
| isPopup | 是否弹窗展示 | `boolean` | true |
| overlayWidth | 弹窗宽度 | `string` | "460px" |
| menuItemWidth | 菜单项宽度 | `string` | "180px" |
| openLoadData | 是否开启懒加载 | `boolean` | false |
| onlyAllowLastLevel | 是否只允许选择最后一级 | `boolean` | false |
| parentIdKey | 父级ID字段名 | `string` | "id" |
| selectLevel | 选择层级 | `number` | - |
| searchPlaceholder | 搜索框占位符 | `string` | "搜索" |
| onSearch | 搜索回调函数 | `(text: string, options) => Array` | - |
| dataFormat | 数据格式化函数 | `(data) => object` | - |
| nodeFormat | 节点格式化函数 | `(node) => object` | - |

## TypeDateRangePickerField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值，格式为 `{ type: string, value: [Date, Date] }` | `object` | - |
| onChange | 变化回调 | `(value: object) => void` | - |
| placeholder | 占位符数组 | `[string, string]` | - |
| ...RangePickerProps | 继承 DatePicker.RangePicker 组件所有属性 | - | - |

## SuperSelectField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectedAll | 是否允许全选 | `boolean` | false |
| isPopup | 是否弹窗展示 | `boolean` | true |
| showSelectedTag | 是否显示已选中标签 | `boolean` | true |
| onConfirm | 确认回调 | `(value) => void` | - |

## SuperSelectUserField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择用户" |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectedAll | 是否允许全选 | `boolean` | false |
| labelKey | 标签字段名 | `string` | "label" |
| avatarKey | 头像字段名 | `string` | "avatar" |
| descriptionKey | 描述字段名 | `string` | "description" |

## SuperSelectTableListField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数据数组 | `Array<object>` | - |
| columns | 表格列配置 | `Array<object>` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| labelKey | 标签字段名 | `string` | - |
| valueKey | 值字段名 | `string` | - |
| isPopup | 是否弹窗展示 | `boolean` | true |
| getSearchCallback | 搜索回调函数 | `(searchProps, item, contextProps) => boolean` | - |

## SuperSelectTreeField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| ...TreeProps | 继承 Tree 组件所有属性 | - | - |

## AdvancedSelectField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| allowSelectAll | 是否允许全选 | `boolean` | false |
| showSelectedCount | 是否显示选中数量 | `boolean` | false |
| countUnit | 数量单位 | `string` | "个" |
| allLabel | 全选项标签 | `string` | "全部" |
| showSelectedTag | 是否显示选中标签 | `boolean` | true |
| single | 是否单选 | `boolean` | false |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |

## UserField (AdvancedSelect)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| defaultValue | 默认值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectAll | 是否允许全选 | `boolean` | false |
| showSelectedCount | 是否显示选中数量 | `boolean` | false |
| countUnit | 数量单位 | `string` | "人" |
| allLabel | 全选项标签 | `string` | "所有人" |
| showSelectedTag | 是否显示选中标签 | `boolean` | true |

## AddressEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 地址编码 | `string` | - |

## FunctionEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 职能编码 | `string` | - |

## IndustryEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 行业编码 | `string` | - |

## InputFileButton / InputFileLink / InputFileText

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受的文件类型 | `string` | - |
| multiple | 是否多选 | `boolean` | false |
| onChange | 文件选择回调 | `(file: File) => void` | - |
| ...TypographyProps | 继承 Typography 组件所有属性 | - | - |

## changeMoneyToChinese

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| money | 金额数值 | `number \| string` |

| 返回值 | 说明 | 类型 |
| --- | --- | --- |
| chineseStr | 大写金额字符串 | `string` |

最大处理数字：999999999999999.999999

