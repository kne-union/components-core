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
