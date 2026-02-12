const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
const { useState } = React;
const { Button, Space, Card, Tag, Alert } = antd;

const OptionsExample = () => {
  const [featureEnabled, setFeatureEnabled] = useState(true);

  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "hr-system",
            type: "system",
            name: "人力资源系统",
            children: [
              {
                id: "employee",
                type: "module",
                name: "员工管理",
                children: [
                  {
                    id: "salary-visibility",
                    type: "feature",
                    name: "薪资可见性",
                    options: {
                      permission: "full",
                      canEdit: true,
                      maxViewLevel: "all"
                    },
                    rejectedOptions: {
                      permission: "limited",
                      canEdit: false,
                      maxViewLevel: "self"
                    },
                    close: !featureEnabled,
                  },
                  {
                    id: "performance",
                    type: "feature",
                    name: "绩效考核",
                    options: {
                      scoreRange: "0-100",
                      hasReview: true,
                      allowAppeal: true
                    },
                    rejectedOptions: {
                      scoreRange: "0-10",
                      hasReview: false,
                      allowAppeal: false
                    }
                  }
                ],
              },
            ],
          },
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Button
            type="primary"
            onClick={() => {
              setFeatureEnabled((value) => !value);
            }}
          >
            {featureEnabled ? "关闭薪资功能" : "开启薪资功能"}
          </Button>
          <p style={{ marginTop: 12 }}>
            点击按钮切换薪资可见性功能，观察不同状态下传递的参数变化
          </p>
        </Card>

        <Layout navigation={{ isFixed: false }}>
          <PermissionsPage name="employee" openFeatures>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Card title="薪资可见性功能" size="small">
                <Features id="salary-visibility">
                  {({ isPass, options }) => (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Alert
                        message={isPass ? "功能已开启" : "功能已关闭"}
                        type={isPass ? "success" : "warning"}
                        showIcon
                      />
                      <div>
                        <strong>权限级别：</strong>
                        <Tag color={isPass ? "green" : "orange"}>
                          {options.permission}
                        </Tag>
                      </div>
                      <div>
                        <strong>编辑权限：</strong>
                        <Tag color={options.canEdit ? "blue" : "default"}>
                          {options.canEdit ? "允许编辑" : "只读"}
                        </Tag>
                      </div>
                      <div>
                        <strong>查看范围：</strong>
                        <Tag>{options.maxViewLevel}</Tag>
                      </div>
                    </Space>
                  )}
                </Features>
              </Card>

              <Card title="绩效考核功能" size="small">
                <Features id="performance">
                  {({ isPass, options }) => (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Alert
                        message={isPass ? "功能已开启" : "功能已关闭"}
                        type="success"
                        showIcon
                      />
                      <div>
                        <strong>评分范围：</strong>
                        <Tag>{options.scoreRange}</Tag>
                      </div>
                      <div>
                        <strong>绩效复核：</strong>
                        <Tag color={options.hasReview ? "blue" : "default"}>
                          {options.hasReview ? "启用" : "禁用"}
                        </Tag>
                      </div>
                      <div>
                        <strong>申诉功能：</strong>
                        <Tag color={options.allowAppeal ? "blue" : "default"}>
                          {options.allowAppeal ? "允许" : "禁止"}
                        </Tag>
                      </div>
                    </Space>
                  )}
                </Features>
              </Card>
            </Space>
          </PermissionsPage>
        </Layout>
      </Space>
    </PureGlobal>
  );
};

render(<OptionsExample />);
