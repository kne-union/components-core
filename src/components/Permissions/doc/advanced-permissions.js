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
          message={`当前角色: ${userRole === 'admin' ? '管理员' : userRole === 'manager' ? '经理' : '普通用户'}`}
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