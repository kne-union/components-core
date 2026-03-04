# HelperGuide

### 概述

HelperGuide 是一个轻量级的帮助文档提示组件，用于在页面上显示帮助说明和可选的帮助链接。它采用图标+文字的形式，样式简洁，适用于在表单、配置页面等场景中为用户提供操作指引或功能说明。

**核心特性**

- **简洁设计**：采用图标+文字的展示形式，占用空间小，不干扰主要内容
- **可配置性**：通过全局枚举配置帮助内容，支持多语言
- **灵活展示**：支持仅显示帮助内容，或显示帮助内容+链接
- **样式可定制**：支持自定义类名，方便调整样式

**适用场景**

- 表单字段说明：在复杂表单中为特定字段提供帮助提示
- 功能指引：在配置页面或设置页面提供操作说明
- 文档链接：提供相关文档的快速访问入口
- 提示信息：显示注意事项、使用建议等提示信息


### 示例

#### 示例样式

```scss
.helper-guide-custom {
  background: #f0f5ff;
  border: 1px solid #adc6ff;
  
  .inner {
    background: transparent;
    color: #2f54eb;
  }
}

// 添加一些其他可能的样式示例
.helper-guide-warning {
  background: #fffbe6;
  border: 1px solid #ffe58f;
  
  .inner {
    background: transparent;
    color: #faad14;
  }
}

.helper-guide-error {
  background: #fff2f0;
  border: 1px solid #ffccc7;
  
  .inner {
    background: transparent;
    color: #ff4d4f;
  }
}
```

#### 示例代码

- 基础用法
- 展示不带链接的简单帮助提示
- _HelperGuide(@components/HelperGuide),Global(@components/Global),antd(antd)

```jsx
const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card } = antd;

const { Title, Text } = Typography;

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "username",
              content: "请输入有效的用户名，长度为4-20个字符"
            },
            {
              value: "password",
              content: "密码必须包含字母、数字和特殊字符，长度为8-30个字符"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="表单字段说明" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>用户名：</Text>
              <HelperGuide name="username" />
            </div>
            <div>
              <Text strong>密码：</Text>
              <HelperGuide name="password" />
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text type="secondary">
            基础用法：只显示帮助内容，不显示链接。适用于简单的提示信息。
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 带帮助链接
- 展示带帮助链接的提示，可跳转到文档页面
- _HelperGuide(@components/HelperGuide),Global(@components/Global),antd(antd)

```jsx
const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card } = antd;

const { Text } = Typography;

const LinkExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "api-doc",
              content: "查看 API 接口文档，了解详细的接口定义和使用说明",
              url: "https://example.com/api-docs"
            },
            {
              value: "quick-start",
              content: "快速开始指南，帮助您快速上手使用系统",
              url: "https://example.com/quick-start"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="带帮助链接的提示" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>API 文档：</Text>
              <HelperGuide name="api-doc" />
            </div>
            <div>
              <Text strong>快速开始：</Text>
              <HelperGuide name="quick-start" />
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text type="secondary">
            当配置中包含 url 字段时，HelperGuide 会显示"查看帮助"链接，
            点击后可以在新窗口打开对应的帮助文档。
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<LinkExample />);

```

- 多个帮助提示
- 展示在同一页面中使用多个 HelperGuide 组件
- _HelperGuide(@components/HelperGuide),Global(@components/Global),antd(antd)

```jsx
const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card, Divider } = antd;

const { Title, Text } = Typography;

const MultipleExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "user-profile",
              content: "用户个人信息配置，包括基本资料和联系方式",
              url: "https://example.com/docs/user-profile"
            },
            {
              value: "security-settings",
              content: "安全设置包括密码修改、两步验证等安全功能配置"
            },
            {
              value: "notification-preferences",
              content: "通知偏好设置，控制接收哪些类型的通知消息"
            },
            {
              value: "data-privacy",
              content: "数据隐私设置，管理个人数据的访问权限和使用方式",
              url: "https://example.com/docs/privacy"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="用户设置页面" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Title level={5}>个人信息</Title>
              <HelperGuide name="user-profile" />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div>
              <Title level={5}>安全设置</Title>
              <HelperGuide name="security-settings" />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div>
              <Title level={5}>通知设置</Title>
              <HelperGuide name="notification-preferences" />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div>
              <Title level={5}>隐私设置</Title>
              <HelperGuide name="data-privacy" />
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text type="secondary">
            可以在同一个页面中使用多个 HelperGuide 组件，每个组件通过 name 属性
            引用不同的帮助内容。这种方式特别适合在配置页面、设置页面等多字段场景中使用。
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<MultipleExample />);

```

- 自定义样式
- 展示通过 className 属性自定义组件样式
- _HelperGuide(@components/HelperGuide),Global(@components/Global),antd(antd)

```jsx
const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card } = antd;

const { Text } = Typography;

const CustomStyleExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "normal-style",
              content: "默认样式的帮助提示"
            },
            {
              value: "custom-color",
              content: "蓝色背景的自定义帮助提示"
            },
            {
              value: "custom-warning",
              content: "黄色警告样式的帮助提示"
            },
            {
              value: "custom-error",
              content: "红色错误样式的帮助提示"
            },
            {
              value: "custom-spacing",
              content: "自定义间距的帮助提示"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="自定义样式示例" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>默认样式：</Text>
              <HelperGuide name="normal-style" />
            </div>
            <div style={{ marginTop: '16px' }}>
              <Text strong>蓝色自定义样式：</Text>
              <HelperGuide
                name="custom-color"
                className="helper-guide-custom"
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <Text strong>警告样式：</Text>
              <HelperGuide
                name="custom-warning"
                className="helper-guide-warning"
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <Text strong>错误样式：</Text>
              <HelperGuide
                name="custom-error"
                className="helper-guide-error"
              />
            </div>
            <div style={{ marginTop: '24px' }}>
              <Text strong>自定义间距：</Text>
              <HelperGuide
                name="custom-spacing"
                style={{ marginTop: '12px', marginBottom: '8px' }}
              />
              <Text type="secondary">（通过 style 属性添加边距）</Text>
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text>
            <div>1. 通过 <Text code>className</Text> 属性可以自定义 HelperGuide 的样式，样式应用在外层容器上。</div>
            <div>2. 通过 <Text code>style</Text> 属性可以添加行内样式，如调整间距等。</div>
            <div>3. 自定义样式可以覆盖组件的默认背景色、边框、文字颜色等。</div>
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<CustomStyleExample />);

```

- 真实业务场景
- 展示在员工信息录入表单中的实际应用
- _HelperGuide(@components/HelperGuide),_FormInfo(@components/FormInfo),_Modal(@components/Modal),Global(@components/Global),antd(antd)

```jsx
const { default: HelperGuide } = _HelperGuide;
const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { PureGlobal } = Global;
const { Space, Card, Typography } = antd;

const { Input, Select } = fields;

const RealScenarioExample = () => {
  const modal = useModal();

  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "employee-form-employeeId",
              content: "员工ID是员工的唯一标识，由系统自动生成，不可修改"
            },
            {
              value: "employee-form-department",
              content: "请选择员工所属部门，部门决定了员工的权限范围",
              url: "https://example.com/docs/departments"
            },
            {
              value: "employee-form-email",
              content: "邮箱地址用于系统通知和密码找回，请确保邮箱地址有效"
            },
            {
              value: "employee-form-phone",
              content: "手机号码用于接收短信验证码和紧急通知"
            },
            {
              value: "employee-form-hireDate",
              content: "入职日期决定了员工的年假计算和试用期时长"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="员工信息录入" size="small">
          <Form
            helperGuideName="employee-form"
            onSubmit={(data) => {
              modal({
                title: "员工信息提交成功",
                children: <pre>{JSON.stringify(data, null, 2)}</pre>
              });
            }}
          >
            <FormInfo
              list={[
                <Input 
                  name="employeeId" 
                  label="员工ID" 
                  placeholder="自动生成" 
                  disabled 
                />,
                <Select
                  name="department"
                  label="所属部门"
                  rule="REQ"
                  options={[
                    { label: "技术部", value: "tech" },
                    { label: "产品部", value: "product" },
                    { label: "运营部", value: "operation" },
                    { label: "人力资源部", value: "hr" }
                  ]}
                />,
                <Input 
                  name="email" 
                  label="邮箱地址" 
                  rule="REQ EMAIL"
                  placeholder="请输入邮箱地址" 
                />,
                <Input 
                  name="phone" 
                  label="手机号码" 
                  rule="REQ TEL"
                  placeholder="请输入手机号码" 
                />,
                <Input 
                  name="hireDate" 
                  label="入职日期" 
                  rule="REQ"
                  type="date"
                />
              ]}
            />
            <SubmitButton 
              type="primary" 
              style={{ marginRight: 8 }}
            >
              保存
            </SubmitButton>
          </Form>
        </Card>
        <Card title="说明" size="small">
          <Typography.Text type="secondary">
            真实业务场景示例：在员工信息录入表单中，为每个字段提供相应的帮助提示，
            帮助用户理解字段含义和要求。这样可以提高表单填写的准确性和效率。
          </Typography.Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<RealScenarioExample />);

```

### API

### HelperGuide

HelperGuide 组件用于给用户提供帮助文档提示，显示帮助内容和可选的帮助链接。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| name | string | 是 | - | 帮助文档的标识符，用于从枚举中获取对应的帮助信息 |
| className | string | 否 | - | 自定义类名 |

#### 枚举配置

HelperGuide 组件通过 preset.enums.helperGuide 配置帮助文档内容，该配置应该是一个函数，返回帮助文档数组。

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| value | string | 是 | 帮助文档的标识符，对应 HelperGuide 组件的 name 属性 |
| content | string | 是 | 帮助文档的内容文字 |
| url | string | 否 | 帮助文档的链接地址，如果提供则显示"查看帮助"链接 |
