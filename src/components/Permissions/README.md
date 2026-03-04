# Permissions

### 概述

### 概述

Permissions 是一个权限控制组件，用于根据用户权限控制页面内容的显示。支持多种权限控制方式和展示形式，适用于各种需要权限控制的场景。

### 何时使用

在系统中存在一些功能和操作只允许某些角色用户使用，使用该组件可以让其包裹的组件或者区域根据系统的权限列表配置展示不同的状态

### 特点

通过在Global中的preset中设置permissions作为当前用户的权限列表，在Permissions组件配置permissions作为该功能要求具备的权限项，当要求具备的权限项全部在用户的权限列表中找到时为权限通过状态否则为权限不通过状态

当权限不通过时，Permissions组件可以有三种方式呈现：

1. 用户可以看到操作功能的组件显示，但是不能进行操作，在鼠标移入时会以ToolTip提示错误原因，一般用在按钮等需要用户交互的功能位置
2. 用户不能看到操作功能或者数据呈现，对应区域显示错误原因，一般用在要数据展示等场景
3. 隐藏内部组件，一般用在不需要干扰到用户或用户不需要了解其没有权限的功能或数据等场景

### 高级特性

* 支持权限数组、权限函数和权限组合等多种权限验证方式
* 提供权限判断的 Hook，方便在组件外部进行权限判断
* 支持函数式子组件，可以获取权限验证结果并自定义渲染内容

### 示例

#### 示例样式

```scss
.box {
  padding: 20px;
  background: #f8f8f8;
}
```

#### 示例代码

- 基础权限控制
- 展示Permissions组件的基本用法，包括不同类型的权限控制方式
- _Permissions(@components/Permissions),global(@components/Global),antd(antd)

```jsx
const { default: Permissions } = _Permissions;
const { PureGlobal } = global;
const { Button, Radio, Space } = antd;
const { useState } = React;

const BaseExample = () => {
  const [type, setType] = useState("tooltip");
  return (
    <PureGlobal
      preset={{
        permissions: ["permission_1", "permission_2"],
      }}
    >
      <Space direction="vertical">
        <Radio.Group
          value={type}
          options={[
            { label: "tooltip", value: "tooltip" },
            {
              label: "error",
              value: "error",
            },
            { label: "hidden", value: "hidden" },
          ]}
          onChange={(e) => {
            setType(e.target.value);
          }}
          optionType="button"
          buttonStyle="solid"
        />
        <Permissions type={type} request={["permission_2"]}>
          <div className="box">
            <Button onClick={() => console.log("执行操作")}>有权限操作</Button>
          </div>
        </Permissions>
        <Permissions type={type} request={["permission_3"]}>
          <div className="box">
            <Button onClick={() => console.log("执行操作")}>无权限操作</Button>
          </div>
        </Permissions>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 高级权限控制
- 展示Permissions组件的高级用法，包括权限函数控制、多重权限控制和函数式子组件
- _Permissions(@components/Permissions),global(@components/Global),antd(antd)

```jsx
const { default: Permissions } = _Permissions;
const { PureGlobal } = global;
const { Button, Card, Space, Table, Switch, Alert, Tag } = antd;
const { useState } = React;

// 权限函数控制示例
const FunctionPermissionsExample = () => {
  const [userRole, setUserRole] = useState('user');
  
  const hasPermission = (permission) => {
    const rolePermissions = {
      admin: ['user:create', 'user:edit', 'user:delete', 'user:view', 'system:manage'],
      manager: ['user:create', 'user:edit', 'user:view', 'report:view'],
      user: ['user:view', 'profile:edit']
    };
    return rolePermissions[userRole] && rolePermissions[userRole].includes(permission);
  };
  
  const checkUserPermissions = (permissions) => {
    return permissions.some(p => hasPermission(p));
  };
  
  const roleSwitchItems = [
    { key: 'admin', label: '管理员' },
    { key: 'manager', label: '经理' },
    { key: 'user', label: '普通用户' },
  ];
  
  return (
    <Card title="权限函数控制" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <span>用户角色:</span>
          <Button.Group>
            {roleSwitchItems.map(item => (
              <Button 
                key={item.key}
                type={userRole === item.key ? 'primary' : 'default'}
                onClick={() => setUserRole(item.key)}
              >
                {item.label}
              </Button>
            ))}
          </Button.Group>
        </Space>
        
        <Alert 
          message={&#96;当前角色: ${userRole === 'admin' ? '管理员' : userRole === 'manager' ? '经理' : '普通用户'}&#96;}
          type="info"
        />
        
        <Permissions 
          request={['user:create']} 
          type="hidden"
        >
          <Button type="primary">创建用户</Button>
        </Permissions>
        
        <Permissions 
          request={checkUserPermissions} 
          type="hidden"
        >
          <Button>编辑用户</Button>
        </Permissions>
        
        <Permissions 
          request={() => hasPermission('user:delete')} 
          type="hidden"
        >
          <Button danger>删除用户</Button>
        </Permissions>
      </Space>
    </Card>
  );
};

// 多重权限控制示例
const MultiplePermissionsExample = () => {
  const [permissions, setPermissions] = useState([
    'user:view',
    'order:view',
    'product:view'
  ]);
  
  const permissionOptions = [
    { key: 'user:view', label: '查看用户' },
    { key: 'user:edit', label: '编辑用户' },
    { key: 'user:delete', label: '删除用户' },
    { key: 'order:view', label: '查看订单' },
    { key: 'order:edit', label: '编辑订单' },
    { key: 'product:view', label: '查看产品' },
    { key: 'product:edit', label: '编辑产品' },
    { key: 'system:manage', label: '系统管理' },
  ];
  
  const togglePermission = (permission) => {
    setPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };
  
  return (
    <Card title="多重权限控制" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <span>当前权限: </span>
          <Space wrap>
            {permissionOptions.map(option => (
              <Tag 
                key={option.key}
                color={permissions.includes(option.key) ? 'blue' : 'default'}
                onClick={() => togglePermission(option.key)}
                style={{ cursor: 'pointer' }}
              >
                {option.label}
              </Tag>
            ))}
          </Space>
        </div>
        
        <Space wrap>
          <Permissions 
            request={['user:view', 'user:edit']} 
            type="hidden"
          >
            <Button>用户管理</Button>
          </Permissions>
          
          <Permissions 
            request={['order:view', 'order:edit']} 
            type="hidden"
          >
            <Button>订单管理</Button>
          </Permissions>
          
          <Permissions 
            request={['product:view', 'product:edit']} 
            type="hidden"
          >
            <Button>产品管理</Button>
          </Permissions>
          
          <Permissions 
            request={['system:manage']} 
            type="hidden"
          >
            <Button type="primary" danger>系统管理</Button>
          </Permissions>
        </Space>
      </Space>
    </Card>
  );
};

// 函数式子组件示例
const FunctionChildrenExample = () => {
  const [permissions] = useState(['user:view', 'order:view']);
  
  return (
    <Card title="函数式子组件" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert 
          message="函数式子组件允许根据权限状态自定义渲染内容"
          type="info"
        />
        
        <Permissions 
          request={['user:view']} 
          type="hidden"
        >
          {({ isPass, type, request }) => (
            <div>
              <p>权限状态: {isPass ? '有权限' : '无权限'}</p>
              <p>权限类型: {type}</p>
              <p>所需权限: {request.join(', ')}</p>
              <Button type={isPass ? 'primary' : 'default'} disabled={!isPass}>
                {isPass ? '可以访问用户页面' : '无权访问用户页面'}
              </Button>
            </div>
          )}
        </Permissions>
        
        <Permissions 
          request={['order:view']} 
          type="tooltip"
          message="您没有查看订单的权限"
        >
          {({ isPass }) => (
            <div>
              <Button type={isPass ? 'primary' : 'default'}>
                {isPass ? '查看订单' : '查看订单(无权限)'}
              </Button>
            </div>
          )}
        </Permissions>
      </Space>
    </Card>
  );
};

// 权限表格控制示例
const TablePermissionsExample = () => {
  const [permissions] = useState(['user:view', 'user:edit']);
  const [permissionType, setPermissionType] = useState('hidden');
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Permissions 
            request={['user:edit']} 
            type={permissionType}
          >
            <Button type="link" size="small">编辑</Button>
          </Permissions>
          <Permissions 
            request={['user:delete']} 
            type={permissionType}
          >
            <Button type="link" size="small" danger>删除</Button>
          </Permissions>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: '张三',
      email: 'zhangsan@example.com',
    },
    {
      key: '2',
      name: '李四',
      email: 'lisi@example.com',
    },
    {
      key: '3',
      name: '王五',
      email: 'wangwu@example.com',
    },
  ];
  
  return (
    <Card title="权限表格控制" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <span>权限类型: </span>
          <Switch 
            checked={permissionType === 'hidden'}
            onChange={(checked) => setPermissionType(checked ? 'hidden' : 'tooltip')}
          />
          <span>{permissionType === 'hidden' ? '隐藏' : '提示'}</span>
        </div>
        
        <Table columns={columns} dataSource={data} pagination={false} />
      </Space>
    </Card>
  );
};

const AdvancedPermissionsExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <FunctionPermissionsExample />
      <MultiplePermissionsExample />
      <FunctionChildrenExample />
      <TablePermissionsExample />
    </Space>
  );
};

render(<AdvancedPermissionsExample />);
```

- Hooks使用
- 展示Permissions组件的Hooks使用，包括usePermissions、usePermissionsPass和computedIsPass工具函数
- _Permissions(@components/Permissions),global(@components/Global),antd(antd)

```jsx
const { default: Permissions, usePermissions, usePermissionsPass, computedIsPass } = _Permissions;
const { PureGlobal } = global;
const { Card, Space, Tag, Typography } = antd;

const PermissionsInfo = () => {
  const { permissions } = usePermissions();
  const hasUserPermission = usePermissionsPass({ request: ["user:view"] });
  const hasOrderPermission = usePermissionsPass({ request: ["order:view"] });
  
  const manualCheck = computedIsPass({
    permissions,
    request: ["user:edit", "user:delete"]
  });

  return (
    <Card title="权限信息展示" style={{ width: 600 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <Typography.Text strong>当前用户权限列表: </Typography.Text>
          <Space wrap>
            {permissions.map((perm) => (
              <Tag key={perm} color="blue">{perm}</Tag>
            ))}
          </Space>
        </div>
        
        <div>
          <Typography.Text strong>用户查看权限: </Typography.Text>
          <Tag color={hasUserPermission ? "green" : "red"}>
            {hasUserPermission ? "有权限" : "无权限"}
          </Tag>
        </div>
        
        <div>
          <Typography.Text strong>订单查看权限: </Typography.Text>
          <Tag color={hasOrderPermission ? "green" : "red"}>
            {hasOrderPermission ? "有权限" : "无权限"}
          </Tag>
        </div>
        
        <div>
          <Typography.Text strong>手动权限检查(用户编辑/删除): </Typography.Text>
          <Tag color={manualCheck ? "green" : "red"}>
            {manualCheck ? "有权限" : "无权限"}
          </Tag>
        </div>
      </Space>
    </Card>
  );
};

const HooksUsageExample = () => {
  return (
    <PureGlobal
      preset={{
        permissions: ["user:view", "user:edit", "dashboard:view", "report:view"],
      }}
    >
      <Space direction="vertical" size="large">
        <PermissionsInfo />
        
        <Permissions request={["user:view"]} type="tooltip">
          <Card title="用户信息" style={{ width: 600 }}>
            <Space direction="vertical">
              <div>用户名: 张三</div>
              <div>部门: 技术部</div>
              <div>职位: 前端开发工程师</div>
            </Space>
          </Card>
        </Permissions>
        
        <Permissions request={["order:view"]} type="error" message="您没有订单查看权限，请联系部门管理员">
          <Card title="订单信息" style={{ width: 600 }}>
            <div>订单列表内容...</div>
          </Card>
        </Permissions>
      </Space>
    </PureGlobal>
  );
};

render(<HooksUsageExample />);

```

- 自定义标签
- 展示Permissions组件的tagName属性，使用不同的HTML标签包裹无权限内容
- _Permissions(@components/Permissions),global(@components/Global),antd(antd)

```jsx
const { default: Permissions } = _Permissions;
const { PureGlobal } = global;
const { Space, Button } = antd;

const CustomTagExample = () => {
  return (
    <PureGlobal
      preset={{
        permissions: ["document:view", "document:edit"],
      }}
    >
      <Space direction="vertical">
        <div>
          <h4>默认 span 标签:</h4>
          <Permissions request={["document:view"]} type="tooltip">
            <Button>查看文档</Button>
          </Permissions>
        </div>
        
        <div>
          <h4>自定义 div 标签:</h4>
          <Permissions
            request={["document:delete"]}
            type="tooltip"
            tagName="div"
            className="permission-wrapper"
          >
            <Button danger>删除文档（无权限）</Button>
          </Permissions>
        </div>
        
        <div>
          <h4>自定义 section 标签:</h4>
          <Permissions
            request={["document:edit"]}
            type="tooltip"
            tagName="section"
            className="permission-section"
          >
            <Button type="primary">编辑文档</Button>
          </Permissions>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<CustomTagExample />);

```

### API

| 属性名      | 说明                                                                                                      | 类型            | 默认值          |
|----------|---------------------------------------------------------------------------------------------------------|---------------|--------------|
| type     | 类型，可选值为hidden，tooltip，error，分别为隐藏，气泡提示，错误提示三种形式                                                         | string        | hidden       |
| tagName  | 当前组件的tagName，同React.createElement的type参数，默认为span                                                        | string        | span         |
| message  | 提示文案                                                                                                    | string        | 您暂无权限，请联系管理员 |
| request  | 权限列表可以为字符串数组、函数或混合类型，每个item为一项权限的key，所有权限在全局的permissions中存在则判断为权限通过                          | array,function | []           |
| children | 该参数可以传function类型，children({isPass, type, request})，isPass为权限校验是否通过，type为提示类型，request为所需权限列表，可以自行实现权限的展示 | jsx,function  | -            |

### Hooks

#### usePermissions

获取当前用户的权限列表

```javascript
const { permissions } = usePermissions();
```

#### usePermissionsPass

检查是否拥有指定权限

```javascript
const isPass = usePermissionsPass({ request: ['user:view'] });
```

### 工具函数

#### computedIsPass

计算权限验证结果

```javascript
const isPass = computedIsPass({ 
  permissions: ['user:view', 'user:edit'], 
  request: ['user:view'] 
});
```
