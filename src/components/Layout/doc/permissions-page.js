const { default: Layout, PermissionsPage } = _Layout;
const { PureGlobal } = global;
const { Card, Button, Space, Typography, Alert } = antd;

const { Text } = Typography;

const PermissionsPageExample = () => {
  return (
    <PureGlobal
      preset={{
        permissions: ['order:view', 'order:edit', 'order:delete']
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="有权限访问的页面" size="small">
            <PermissionsPage
              name="order-detail-with-perm"
              permissions={{
                permissions: ['order:view']
              }}
              page={{
                title: '订单详情（有权限）'
              }}
            >
              <Alert
                message="您有权限访问此页面"
                description="当前用户拥有 order:view 权限，可以查看订单详情"
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <Card size="small">
                <Text>这里是订单详情内容</Text>
              </Card>
            </PermissionsPage>
          </Card>

          <Card title="无权限访问的页面" size="small">
            <PermissionsPage
              name="order-edit-without-perm"
              permissions={{
                permissions: ['order:edit:advanced']
              }}
              page={{
                title: '订单编辑（无权限）'
              }}
            >
              <Alert
                message="您不会看到这个内容"
                description="因为当前用户没有 order:edit:advanced 权限"
                type="info"
                showIcon
              />
              <Card size="small">
                <Text>这里不会显示，因为缺少权限</Text>
              </Card>
            </PermissionsPage>
          </Card>

          <Card title="说明" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">
                PermissionsPage 组件在 Page 的基础上增加了权限判断功能。
              </Text>
              <Text type="secondary">
                如果用户没有所需权限，会显示错误提示页面，不会渲染页面内容。
              </Text>
              <Text type="secondary">
                权限通过 preset.permissions 配置，组件内部会自动检查是否拥有所需权限。
              </Text>
            </Space>
          </Card>
        </Space>
      </Layout>
    </PureGlobal>
  );
};

render(<PermissionsPageExample />);
