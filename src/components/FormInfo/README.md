# FormInfo

### 概述

功能强大的表单组件，提供完整的数据管理、校验和样式解决方案

FormInfo 是一个全功能的表单解决方案，集成了数据录入、校验规则管理、样式布局等功能，适用于各种复杂场景的表单需求。

### 核心特性

**分层校验规则管理**
- 支持默认级、preset 级、Form 级三层校验规则覆盖
- 字符串形式规则调用，简洁直观（如 `REQ LEN-3-10 EMAIL`）
- 支持异步校验规则，满足复杂业务场景需求
- 规则参数化支持，灵活可配置

**丰富的表单组件**
- 提供基础组件：Input、TextArea、Select、DatePicker、RadioGroup、Checkbox、Switch 等
- 提供业务组件：地址选择、行业选择、职能选择、用户选择、级联选择等
- 提供高级组件：头像上传、文件上传、签名、薪资输入、电话号码输入、金额输入等
- 所有组件统一封装，使用体验一致

**灵活的布局方式**
- FormInfo 支持分组展示和分栏布局
- List 组件实现多段式列表表单，支持动态添加删除
- TableList 组件提供表格形式的列表展示
- 支持无限嵌套，轻松实现复杂表单结构

**多种表单形态**
- Form：基础表单组件
- FormModal：弹窗表单，配合 Modal 使用
- FormDrawer：抽屉表单，配合 Drawer 使用
- FormStepModal：分步表单，支持多步骤数据收集
- 提供 useFormModal、useFormDrawer、useFormStepModal Hooks

**事件驱动架构**
- 完善的事件机制，支持表单生命周期监听
- 可监听字段添加、删除、校验、值变化等事件
- 便于扩展和集成自定义逻辑

**拦截器支持**
- 支持字段值拦截器
- 可实现 Field 值和 Form Data 之间的转换
- 解决日期格式化、数据映射等常见问题

### 适用场景

**数据采集场景**
- 用户注册、信息录入、问卷调查等基础表单
- 个人资料编辑、设置修改等表单场景

**业务流程场景**
- 审批流程中的信息填写
- 订单创建、项目立项等复杂表单
- 多步骤向导式数据收集

**数据管理场景**
- 列表数据的批量编辑
- 动态列表的增删改查
- 复杂嵌套数据结构的录入

**集成场景**
- 配合弹窗、抽屉组件的表单展示
- 与数据加载组件结合的表单编辑
- 自定义业务组件的表单集成

### 技术亮点

**上下文与 Ref 双重 API**
- 提供 useFormContext Hook 在组件内获取表单实例
- 支持 ref 方式在外部访问表单方法
- 灵活的表单操作方式

**多语言支持**
- 内置国际化支持
- 可自定义多语言配置
- 支持字段级别的语言切换

**类型安全**
- 完善的 TypeScript 类型定义
- 编译时类型检查
- 良好的开发体验

**高度可扩展**
- Field 组件实现规范清晰
- 支持自定义 Field 组件
- 选择器组件统一封装模式

**性能优化**
- 按需加载组件
- 优化的重渲染机制
- 支持大规模表单场景


### 示例(全屏)

#### 示例样式

```scss
.input > .ant-row > .ant-col {
  padding: 10px 0;
}

.input .ant-space-item:last-child {
  width: 100%;
}
```

#### 示例代码

- 基础表单
- 最简单的表单示例，包含常用的输入框、日期选择、下拉选择等基础字段，适合快速上手
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space } = antd;

const { Input, TextArea, DatePicker, Select } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "客户信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="客户基本信息"
          list={[
            <Input name="name" label="客户姓名" rule="REQ" />,
            <Input name="phone" label="联系电话" rule="REQ PHONE" />,
            <Input name="email" label="电子邮箱" rule="EMAIL" />,
            <DatePicker name="birthday" label="出生日期" />,
            <Select
              name="gender"
              label="性别"
              rule="REQ"
              options={[
                { label: "男", value: "male" },
                { label: "女", value: "female" },
              ]}
            />,
            <TextArea name="remark" label="备注说明" />,
          ]}
        />
        <SubmitButton type="primary">保存客户信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 字段类型
- 展示FormInfo支持的各种字段类型，包括输入类、选择类、以及其他特殊字段类型
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Divider } = antd;

const {
  Input,
  TextArea,
  InputNumber,
  DatePicker,
  DateRangePicker,
  Select,
  Switch,
  Rate,
  Slider,
  MoneyInput,
  ColorPicker,
} = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "供应商信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={24}>
        <FormInfo
          title="基本资料"
          list={[
            <Input name="companyName" label="供应商名称" rule="REQ LEN-3-50" />,
            <TextArea name="description" label="公司简介" maxLength={500} />,
            <InputNumber name="creditScore" label="信用评分" min={0} max={100} />,
            <MoneyInput name="annualRevenue" label="年营业额" />,
          ]}
        />

        <Divider />

        <FormInfo
          title="合作信息"
          list={[
            <DatePicker name="cooperateDate" label="合作起始日期" />,
            <DateRangePicker name="contractPeriod" label="合同有效期" />,
            <Select
              name="cooperateType"
              label="合作类型"
              rule="REQ"
              options={[
                { label: "独家代理", value: "exclusive" },
                { label: "一般代理", value: "normal" },
                { label: "战略合作伙伴", value: "strategic" },
              ]}
            />,
            <Select
              name="productCategory"
              label="供应产品类别"
              mode="multiple"
              options={[
                { label: "电子元器件", value: "electronics" },
                { label: "机械配件", value: "machinery" },
                { label: "原材料", value: "materials" },
                { label: "包装材料", value: "packaging" },
              ]}
            />,
          ]}
        />

        <Divider />

        <FormInfo
          title="其他配置"
          list={[
            <Switch name="isPreferred" label="是否优先供应商" />,
            <Rate name="qualityRating" label="质量评级" />,
            <Slider name="deliveryScore" label="交付及时性评分" />,
            <ColorPicker name="brandColor" label="品牌标识色" />,
          ]}
        />

        <SubmitButton type="primary">提交供应商信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 表单校验
- 展示表单的校验规则使用，包括内置规则和自定义规则，以及异步校验和错误提示
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, SubmitButton, ErrorTip, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Alert } = antd;

const { Input, Password } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      rules={{
        USERNAME: (value) => {
          // 自定义规则：用户名必须是字母开头，4-16位
          const pattern = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
          return {
            result: pattern.test(value),
            errMsg: "用户名必须以字母开头，4-16位字母或数字",
          };
        },
        PASSWORD_STRENGTH: (value) => {
          // 自定义规则：密码强度校验
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecial = /[!@#$%^&*]/.test(value);
          if (!hasLetter || !hasNumber || !hasSpecial) {
            return {
              result: false,
              errMsg: "密码必须包含字母、数字和特殊字符",
            };
          }
          return { result: true, errMsg: "" };
        },
        USERNAME_EXISTS: (value) => {
          // 异步校验：检查用户名是否已存在
          return new Promise((resolve) => {
            setTimeout(() => {
              const exists = ["admin", "wangming", "zhangwei"].includes(value);
              resolve({
                result: !exists,
                errMsg: exists ? "该用户名已被占用" : "",
              });
            }, 500);
          });
        },
      }}
      onSubmit={(data) => {
        modal({
          title: "管理员账号创建成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <Alert
          message="账号注册规范"
          description="REQ-必填 | LEN-最小-最大 | EMAIL-邮箱 | PHONE-手机号 | URL-网址 | USERNAME-自定义规则"
          type="info"
        />

        <FormInfo
          title="管理员账号信息"
          list={[
            <ErrorTip name="username">
              <Input
                name="username"
                label="用户名"
                rule="REQ LEN-4-16 USERNAME USERNAME_EXISTS"
                tips="4-16位字母或数字，以字母开头（admin、wangming、zhangwei已被占用）"
              />
            </ErrorTip>,
            <Password
              name="password"
              label="登录密码"
              rule="REQ LEN-8-20 PASSWORD_STRENGTH"
              tips="至少8位，包含字母、数字和特殊字符"
            />,
            <Password
              name="confirmPassword"
              label="确认密码"
              rule="REQ"
              tips="请再次输入密码"
            />,
            <Input name="email" label="工作邮箱" rule="REQ EMAIL" />,
            <Input name="phone" label="联系电话" rule="REQ PHONE" />,
          ]}
        />
        <SubmitButton type="primary">创建管理员账号</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 多行字段
- 展示MultiField的使用，可以将多个字段在一行中横向排列
- _FormInfo(@components/FormInfo),_Modal(@components/Modal)

```jsx
const { default: FormInfo, Form, MultiField, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;

const { Input, TextArea, DatePicker } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "采购订单信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <FormInfo
        list={[
          <MultiField
            name="purchaseOrderNo"
            label="采购单号"
            rule="REQ"
            field={Input}
            maxLength={20}
          />,
          <MultiField name="productName" label="采购产品" field={Input} />,
          <MultiField name="quantity" label="采购数量" field={Input} type="number" />,
          <MultiField name="unitPrice" label="单价" field={Input} type="number" />,
          <MultiField name="deliveryDate" label="交付日期" field={DatePicker} />,
          <MultiField name="note" label="备注说明" field={TextArea} />,
        ]}
      />
      <SubmitButton type="primary">提交采购订单</SubmitButton>
    </Form>
  );
};

render(<BaseExample />);

```

- 业务字段
- 展示FormInfo提供的业务字段组件，如手机号、职能选择、行业选择、地址选择等
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),global(@components/Global),antd(antd)

```jsx
const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { PureGlobal } = global;
const { Space } = antd;

const {
  PhoneNumber,
  FunctionSelect,
  IndustrySelect,
  AddressSelect,
  SuperSelectUser,
  Avatar,
  Upload,
  SalaryInput,
  Input,
} = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "候选人信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="候选人基本信息"
          list={[
            <Avatar name="avatar" label="头像照片" />,
            <SuperSelectUser name="userId" label="内部推荐人" rule="REQ" />,
            <PhoneNumber name="phone" label="联系电话" rule="REQ" />,
            <Input name="email" label="电子邮箱" rule="EMAIL" />,
          ]}
        />

        <FormInfo
          title="职业发展信息"
          list={[
            <FunctionSelect name="function" label="职能领域" rule="REQ" />,
            <IndustrySelect name="industry" label="所属行业" rule="REQ" />,
            <SalaryInput
              name="salaryRange"
              label="期望薪资范围"
              rule="REQ"
              showMonth
              remindUnit
            />,
          ]}
        />

        <FormInfo
          title="其他补充信息"
          list={[
            <AddressSelect name="address" label="工作地址" level={3} />,
            <Upload name="resume" label="简历附件" block />,
          ]}
        />

        <SubmitButton type="primary">提交候选人信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- 高级选择组件
- 展示AdvancedSelect高级选择组件的使用，支持从API加载数据、自定义列配置、多选等功能
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, SubmitButton, AdvancedSelect, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space } = antd;

const { Input, TextArea } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "培训计划配置成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="课程选择"
          list={[
            <AdvancedSelect
              name="trainingCourses"
              label="选择培训课程"
              rule="REQ"
              mode="multiple"
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        id: 1,
                        name: "前端架构设计最佳实践",
                        category: "前端技术",
                        duration: 12,
                        description: "深入学习企业级前端架构设计方法",
                      },
                      {
                        id: 2,
                        name: "微服务架构设计与实现",
                        category: "后端技术",
                        duration: 16,
                        description: "掌握微服务架构的核心设计模式",
                      },
                      {
                        id: 3,
                        name: "云原生应用开发",
                        category: "云原生",
                        duration: 20,
                        description: "基于Kubernetes的云原生应用开发",
                      },
                      {
                        id: 4,
                        name: "大数据处理与分析",
                        category: "数据技术",
                        duration: 18,
                        description: "Hadoop/Spark大数据处理技术",
                      },
                      {
                        id: 5,
                        name: "AI与机器学习实战",
                        category: "人工智能",
                        duration: 24,
                        description: "深度学习模型训练与部署",
                      },
                    ],
                  };
                },
              }}
              columns={[
                { title: "课程名称", key: "name" },
                { title: "技术方向", key: "category" },
                { title: "课时", key: "duration" },
              ]}
              nameKey="id"
              labelKey="name"
            />,
          ]}
        />

        <FormInfo
          title="培训计划详情"
          list={[
            <Input name="trainingObjective" label="培训目标" />,
            <TextArea name="trainingRequirements" label="培训要求与说明" block />,
          ]}
        />

        <SubmitButton type="primary">提交培训计划</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 列表字段
- 展示List和TableList多段式列表字段的使用，支持动态添加、删除、最大长度限制等功能
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, List, TableList, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space } = antd;

const { Input, DatePicker, TextArea } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "企业信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="企业基本信息"
          list={[
            <Input name="companyName" label="企业名称" rule="REQ" />,
            <TextArea name="companyDescription" label="企业简介" block />,
          ]}
        />

        <List
          name="productLines"
          title="产品线列表"
          itemTitle={({ index }) => &#96;产品线 ${index + 1}&#96;}
          maxLength={10}
          list={[
            <Input name="lineName" label="产品线名称" rule="REQ" />,
            <Input name="annualSales" label="年销售额(万元)" rule="REQ" />,
            <TextArea name="lineFeatures" label="产品线特点" block />,
          ]}
        />

        <TableList
          name="partnerContacts"
          title="合作伙伴联系人"
          maxLength={5}
          list={[
            <Input name="contactName" label="联系人姓名" rule="REQ" />,
            <DatePicker name="cooperateDate" label="合作起始日期" />,
            <Input name="contactPhone" label="联系电话" rule="REQ" />,
          ]}
        />

        <SubmitButton type="primary">提交企业信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 嵌套列表
- 展示在List中嵌套TableList的使用场景，实现更复杂的多层级数据结构
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, List, TableList, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space } = antd;

const { Input, DatePicker, TextArea, Select } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "研发项目信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="项目基本信息"
          list={[
            <Input name="projectName" label="项目名称" rule="REQ" />,
            <TextArea name="projectDescription" label="项目描述" block />,
          ]}
        />

        <List
          name="releaseMilestones"
          title="发布里程碑"
          itemTitle={({ index }) => &#96;里程碑 ${index + 1}&#96;}
          maxLength={5}
          important
          list={[
            <Input name="milestoneName" label="里程碑名称" rule="REQ" />,
            <DatePicker name="releaseDate" label="发布日期" rule="REQ" />,
            <TableList
              name="deliverables"
              title="交付物清单"
              maxLength={10}
              block
              list={[
                <Input name="deliverableName" label="交付物名称" rule="REQ" />,
                <Select
                  name="deliverableType"
                  label="交付物类型"
                  rule="REQ"
                  options={[
                    { label: "源代码", value: "code" },
                    { label: "文档", value: "doc" },
                    { label: "测试用例", value: "test" },
                  ]}
                />,
              ]}
            />,
          ]}
        />

        <SubmitButton type="primary">提交项目信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 动态字段
- 展示根据选择值动态显示/隐藏字段的使用场景，实现字段联动效果
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Alert } = antd;
const { useState } = React;

const { Input, Select, TextArea } = fields;

const BaseExample = () => {
  const modal = useModal();
  const [employmentType, setEmploymentType] = useState("fulltime");

  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "人才录用信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <Alert
          message="动态字段展示"
          description="根据录用类型显示不同的字段信息，实现字段联动效果"
          type="info"
        />

        <FormInfo
          title="候选人基本信息"
          list={[
            <Input name="candidateName" label="候选人姓名" rule="REQ" />,
            <Select
              name="employmentType"
              label="录用类型"
              rule="REQ"
              onChange={(value) => {
                setEmploymentType(value);
              }}
              options={[
                { label: "全职员工", value: "fulltime" },
                { label: "兼职顾问", value: "parttime" },
                { label: "外包合同", value: "contract" },
              ]}
            />,
          ]}
        />

        {employmentType === "fulltime" && (
          <FormInfo
            title="全职员工信息"
            list={[
              <Input name="employeeId" label="员工工号" rule="REQ" />,
              <Input name="monthlySalary" label="月薪(元)" rule="REQ" />,
              <Input name="socialSecurityNo" label="社保账号" />,
              <Select
                name="benefitLevel"
                label="福利等级"
                options={[
                  { label: "基础福利", value: "basic" },
                  { label: "标准福利", value: "standard" },
                  { label: "优厚福利", value: "premium" },
                ]}
              />,
            ]}
          />
        )}

        {employmentType === "parttime" && (
          <FormInfo
            title="兼职顾问信息"
            list={[
              <Input name="hourlyRate" label="时薪(元/小时)" rule="REQ" />,
              <Input name="maxMonthlyHours" label="最大月工时" rule="REQ" />,
              <TextArea name="serviceScope" label="服务范围" block />,
            ]}
          />
        )}

        {employmentType === "contract" && (
          <FormInfo
            title="外包合同信息"
            list={[
              <Input name="contractPeriod" label="合同期限" rule="REQ" />,
              <Input name="projectFee" label="项目费用(元)" rule="REQ" />,
              <Select
                name="paymentTerm"
                label="付款方式"
                options={[
                  { label: "一次性付款", value: "onetime" },
                  { label: "分期付款", value: "installment" },
                  { label: "按里程碑付款", value: "milestone" },
                ]}
              />,
            ]}
          />
        )}

        <FormInfo
          title="其他备注"
          list={[<TextArea name="remark" label="录用备注说明" block />]}
        />

        <SubmitButton type="primary">提交录用信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 表单弹窗
- 展示FormModal的使用，在弹窗中展示表单，适合数据录入、编辑等场景
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd)

```jsx
const {default: FormInfo, useFormModal, fields} = _FormInfo;
const {PureGlobal} = global;
const {Button, Space} = antd;
const {useState} = React;

const {Input, DatePicker, Select} = fields;

const EmployeeModal = () => {
    const modal = useFormModal();

    const handleAddEmployee = () => {
        const modalApi = modal({
            title: "新建员工档案", formProps: {
                onSubmit: (data) => {
                    console.log("提交数据:", data);
                    modalApi.close();
                },
            }, children: (<FormInfo
                list={[<Input name="name" label="员工姓名" rule="REQ"/>,
                    <Input name="phone" label="联系电话" rule="REQ PHONE"/>,
                    <DatePicker name="joinDate" label="入职日期" rule="REQ"/>, <Select
                        name="department"
                        label="所属部门"
                        rule="REQ"
                        options={[{label: "技术研发中心", value: "tech"}, {
                            label: "产品管理中心",
                            value: "product"
                        }, {label: "市场营销中心", value: "marketing"},]}
                    />, <Select
                        name="position"
                        label="职位名称"
                        rule="REQ"
                        options={[{label: "高级工程师", value: "senior"}, {
                            label: "产品经理",
                            value: "pm"
                        }, {label: "UI设计师", value: "designer"},]}
                    />,]}
            />),
        });
    };

    return (<Space>
        <Button type="primary" onClick={handleAddEmployee}>
            新建员工档案
        </Button>
        <Button onClick={() => modalApi.close()}>关闭</Button>
    </Space>);
};

const BaseExample = () => {
    return (<PureGlobal>
        <EmployeeModal/>
    </PureGlobal>);
};

render(<BaseExample/>);

```

- 表单抽屉
- 展示FormDrawer的使用，在抽屉中展示表单，适合展示更多表单内容的场景
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd)

```jsx
const { default: FormInfo, useFormDrawer, fields } = _FormInfo;
const { PureGlobal } = global;
const { Button, Space } = antd;

const { Input, DatePicker, Select, TextArea } = fields;

const ProjectDrawer = () => {
  const drawer = useFormDrawer();

  const handleCreateProject = () => {
    const drawerApi = drawer({
      title: "发起研发项目",
      width: 600,
      formProps: {
        onSubmit: (data) => {
          console.log("提交数据:", data);
          drawerApi.close();
        },
      },
      children: (
        <FormInfo
          list={[
            <Input name="name" label="项目名称" rule="REQ" />,
            <TextArea name="description" label="项目背景与目标" block />,
            <DatePicker name="startDate" label="计划启动日期" rule="REQ" />,
            <DatePicker name="endDate" label="计划完成日期" rule="REQ" />,
            <Select
              name="projectManager"
              label="项目负责人"
              rule="REQ"
              options={[
                { label: "王建国", value: 1 },
                { label: "李晓华", value: 2 },
                { label: "张思远", value: 3 },
              ]}
            />,
            <Select
              name="projectStatus"
              label="项目阶段"
              rule="REQ"
              options={[
                { label: "需求分析", value: "requirement" },
                { label: "开发实施", value: "development" },
                { label: "测试验收", value: "testing" },
                { label: "上线部署", value: "deployment" },
              ]}
            />,
          ]}
        />
      ),
    });
  };

  return (
    <Space>
      <Button type="primary" onClick={handleCreateProject}>
        发起研发项目
      </Button>
      <Button onClick={() => drawerApi.close()}>关闭</Button>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal>
      <ProjectDrawer />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 分步表单弹窗
- 展示FormStepModal的使用，将表单分为多个步骤，逐步引导用户填写，适合复杂表单场景
- _FormInfo(@components/FormInfo),global(@components/Global),_Modal(@components/Modal),antd(antd)

```jsx
const {default: FormInfo, useFormStepModal, fields} = _FormInfo;
const {PureGlobal} = global;
const {Button, Space, Card, Tag, Divider} = antd;
const {useModal} = _Modal;

const {Input, DatePicker, Select, TextArea, PhoneNumber} = fields;

const RecruitmentStepModal = () => {
    const modal = useFormStepModal();
    const handleOpenRecruitment = () => {
        const modalApi = modal({
            title: "人才招聘流程", items: [{
                title: "基本信息", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("基本信息提交:", data);
                        console.log("步骤缓存:", stepCacheRef.current);
                    }
                }, children: (<FormInfo
                    list={[<Input name="candidateName" label="候选人姓名" rule="REQ"/>,
                        <PhoneNumber name="contactPhone" label="联系电话" rule="REQ"/>,
                        <Input name="email" label="电子邮箱" rule="REQ EMAIL"/>,
                        <DatePicker name="dateOfBirth" label="出生日期"/>,]}
                />),
            }, {
                title: "教育经历", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("教育经历提交:", data);
                        console.log("步骤缓存:", stepCacheRef.current);
                    }
                }, children: (<FormInfo
                    list={[<Input name="university" label="毕业院校" rule="REQ"/>, <Select
                        name="educationDegree"
                        label="最高学历"
                        rule="REQ"
                        options={[{label: "本科", value: "bachelor"}, {
                            label: "硕士研究生", value: "master"
                        }, {label: "博士研究生", value: "doctor"},]}
                    />, <Select
                        name="major"
                        label="专业领域"
                        rule="REQ"
                        options={[{label: "计算机科学与技术", value: "cs"}, {
                            label: "软件工程", value: "se"
                        }, {label: "信息管理与信息系统", value: "im"},]}
                    />,]}
                />),
            }, {
                title: "工作经历", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex, isLastStep}) => {
                        console.log("工作经历提交:", data);
                        console.log("所有步骤缓存数据:", stepCacheRef.current);
                        // 在最后一步合并所有步骤的数据
                        const allData = {};
                        Object.keys(stepCacheRef.current).forEach(key => {
                            Object.assign(allData, stepCacheRef.current[key].data);
                        });
                        console.log("合并后的完整数据:", allData);
                        alert("人才信息提交成功！" + JSON.stringify(allData, null, 2));
                    }
                }, children: (<FormInfo
                    list={[<Input name="lastCompany" label="上家公司名称"/>, <Select
                        name="position"
                        label="职位级别"
                        options={[{label: "初级工程师", value: "junior"}, {
                            label: "中级工程师", value: "mid"
                        }, {label: "高级工程师", value: "senior"},]}
                    />, <TextArea name="workExperience" label="工作经历描述" block/>,]}
                />),
            },],
        });
    };

    return (<Space>
        <Button type="primary" onClick={handleOpenRecruitment}>
            发起人才招聘
        </Button>
        <Button onClick={() => modalApi.close()}>关闭</Button>
    </Space>);
};

// 演示 stepCacheRef 的使用
const StepCacheExample = () => {
    const modal = useFormStepModal();
    const normalModal = useModal();
    const handleOpen = () => {
        const modalApi = modal({
            title: "stepCacheRef 演示", items: [{
                title: "第一步", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("第一步数据:", data);
                        console.log("当前缓存:", stepCacheRef.current);
                    }
                }, children: (<FormInfo
                    list={[<Input name="field1" label="字段1" rule="REQ"/>, <Input name="field2" label="字段2"/>,]}
                />),
            }, {
                title: "第二步", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("第二步数据:", data);
                        console.log("当前缓存:", stepCacheRef.current);
                        console.log("第一步缓存数据:", stepCacheRef.current[0]);
                    }
                }, children: (<FormInfo
                    list={[<Input name="field3" label="字段3" rule="REQ"/>, <Input name="field4" label="字段4"/>,]}
                />),
            }, {
                title: "第三步", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex, isLastStep}) => {
                        console.log("第三步数据:", data);
                        console.log("所有缓存数据:", stepCacheRef.current);

                        // 合并所有步骤的数据
                        const allData = {};
                        Object.keys(stepCacheRef.current).forEach(key => {
                            Object.assign(allData, stepCacheRef.current[key].data);
                        });
                        console.log("完整数据:", allData);

                        // 显示缓存内容
                        const cacheContent = Object.entries(stepCacheRef.current).map(([index, cache]) => ({
                            step: index, data: cache.data, output: cache.output
                        }));

                        normalModal({
                            children: (<Space direction="vertical" size={16} style={{padding: 24}}>
                                <Card title="提交成功" size="small">
                                    <Space direction="vertical" size={8}>
                                        {cacheContent.map((item, idx) => (<Card key={idx} size="small" type="inner"
                                                                                title={&#96;步骤 ${parseInt(item.step) + 1}&#96;}>
                                            <Space direction="vertical" size={4}>
                                                {Object.entries(item.data).map(([key, value]) => (
                                                    <Tag key={key}>{key}: {String(value)}</Tag>))}
                                            </Space>
                                        </Card>))}
                                    </Space>
                                </Card>
                                <Button onClick={() => modalApi.close()}>关闭</Button>
                            </Space>), footerButtons: []
                        });
                    }
                }, children: (<FormInfo
                    list={[<Input name="field5" label="字段5" rule="REQ"/>, <Input name="field6" label="字段6"/>,]}
                />),
            },],
        });
    };

    return (<Button onClick={handleOpen}>stepCacheRef 演示</Button>);
};

const BaseExample = () => {
    return (<PureGlobal>
        <Space direction="vertical">
            <RecruitmentStepModal/>
            <Divider/>
            <Space>
                <StepCacheExample/>
            </Space>
        </Space>
    </PureGlobal>);
};

render(<BaseExample/>);

```

- useFormContext
- 展示如何使用useFormContext Hook访问表单API，实现查看值、设置值、校验、重置等操作
- _FormInfo(@components/FormInfo),antd(antd)

```jsx
const { default: FormInfo, Form, useFormContext, fields } = _FormInfo;
const { Space, Card, Button, Tag, Divider } = antd;
const { useState } = React;

const { Input, DatePicker, Select } = fields;

const FormActions = () => {
  const { openApi, formData } = useFormContext();
  const [showData, setShowData] = useState(false);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Space wrap>
        <Button
          type="primary"
          onClick={() => {
            openApi.setFields(
              [
                { name: "employeeName", value: "王建国" },
                { name: "workEmail", value: "wangjianguo@company.com" },
                { name: "department", value: "tech" },
              ],
              { runValidate: false }
            );
          }}
        >
          填充员工信息
        </Button>
        <Button
          onClick={() => {
            setShowData(!showData);
          }}
        >
          {showData ? "隐藏数据" : "查看数据"}
        </Button>
        <Button
          onClick={() => {
            openApi.validateAll();
          }}
        >
          校验表单
        </Button>
        <Button onClick={openApi.reset}>重置表单</Button>
      </Space>

      {showData && (
        <Card title="当前表单数据" size="small">
          <Space direction="vertical" size={8}>
            {Object.entries(formData).map(([key, value]) => (
              <Tag key={key} color="blue">
                <strong>{key}</strong>:{" "}
                {typeof value === "object" && value !== null
                  ? JSON.stringify(value)
                  : String(value)}
              </Tag>
            ))}
          </Space>
        </Card>
      )}
      <Divider />
    </Space>
  );
};

const BaseExample = () => {
  return (
    <Form
      onSubmit={(data) => {
        console.log("提交数据:", data);
        alert("员工信息保存成功！");
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="员工基本信息"
          list={[
            <Input name="employeeName" label="员工姓名" rule="REQ" />,
            <Input name="workEmail" label="工作邮箱" rule="REQ EMAIL" />,
            <DatePicker name="onboardingDate" label="入职日期" />,
            <Select
              name="department"
              label="所属部门"
              options={[
                { label: "技术研发中心", value: "tech" },
                { label: "产品管理中心", value: "product" },
                { label: "市场营销中心", value: "marketing" },
              ]}
            />,
          ]}
        />

        <FormActions />
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- FormApiButton
- 展示FormApiButton的使用，通过按钮访问表单API，实现各种表单操作
- _FormInfo(@components/FormInfo),antd(antd)

```jsx
const { default: FormInfo, Form, FormApiButton, fields } = _FormInfo;
const { Space, Flex } = antd;

const { Input, DatePicker, Select } = fields;

const BaseExample = () => {
  return (
    <Form
      onSubmit={(data) => {
        console.log("提交数据:", data);
        alert("员工信息保存成功！");
      }}
    >
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <FormInfo
          title="员工基本信息"
          list={[
            <Input name="employeeName" label="员工姓名" rule="REQ" />,
            <Input name="workEmail" label="工作邮箱" rule="REQ EMAIL" />,
            <DatePicker name="onboardingDate" label="入职日期" />,
            <Select
              name="department"
              label="所属部门"
              options={[
                { label: "技术研发中心", value: "tech" },
                { label: "产品管理中心", value: "product" },
                { label: "市场营销中心", value: "marketing" },
              ]}
            />,
          ]}
        />

        <FormInfo
          list={[
            <Flex gap={8} wrap>
              <FormApiButton
                type="default"
                onClick={({ openApi, formData }) => {
                  alert("当前表单数据：" + JSON.stringify(formData, null, 2));
                }}
              >
                查看表单数据
              </FormApiButton>
              <FormApiButton
                type="default"
                onClick={({ openApi }) => {
                  openApi.setFields(
                    [
                      { name: "employeeName", value: "王建国" },
                      { name: "workEmail", value: "wangjianguo@company.com" },
                      { name: "department", value: "tech" },
                    ],
                    { runValidate: false }
                  );
                }}
              >
                填充员工信息
              </FormApiButton>
              <FormApiButton
                type="default"
                onClick={({ openApi }) => {
                    openApi.validateAll();
                }}
              >
                校验表单
              </FormApiButton>
              <FormApiButton
                type="default"
                danger
                onClick={({ openApi }) => {
                  openApi.reset();
                }}
              >
                重置表单
              </FormApiButton>
              <FormApiButton
                type="primary"
                htmlType="submit"
                onClick={({ openApi }) => {
                  openApi.submit();
                }}
              >
                保存员工信息
              </FormApiButton>
            </Flex>,
          ]}
        />
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 自定义校验规则
- 展示如何定义自定义校验规则，包括同步校验、异步校验和字段间联动校验
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd)

```jsx
const { default: FormInfo, Form, SubmitButton, ErrorTip, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Alert } = antd;

const { Input, Password, Select } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      rules={{
        // 自定义规则：密码强度校验
        PASSWORD_STRENGTH: (value) => {
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecial = /[!@#$%^&*]/.test(value);
          if (!hasLetter || !hasNumber || !hasSpecial) {
            return {
              result: false,
              errMsg: "密码必须包含字母、数字和特殊字符",
            };
          }
          return { result: true, errMsg: "" };
        },
        // 自定义规则：异步校验用户名
        USERNAME_EXISTS: (value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const exists = ["wangming", "lihua", "zhangwei"].includes(value);
              resolve({
                result: !exists,
                errMsg: exists ? "该用户名已被占用" : "",
              });
            }, 800);
          });
        },
      }}
      onSubmit={(data) => {
        modal({
          title: "管理员账号创建成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <Alert
          message="自定义校验规则说明"
          description="PASSWORD_STRENGTH-密码强度校验（必须包含字母、数字和特殊字符）| USERNAME_EXISTS-异步校验用户名是否已存在"
          type="info"
        />

        <FormInfo
          title="管理员账号配置"
          list={[
            <ErrorTip name="username">
              <Input
                name="username"
                label="管理员用户名"
                rule="REQ LEN-4-16 USERNAME_EXISTS"
                tips="4-16位，wangming、lihua、zhangwei已被占用"
              />
            </ErrorTip>,
            <Password
              name="password"
              label="设置密码"
              rule="REQ LEN-8-20 PASSWORD_STRENGTH"
              tips="至少8位，包含字母、数字和特殊字符"
            />,
            <Password
              name="confirmPassword"
              label="确认密码"
              rule="REQ"
              tips="请再次输入密码"
            />,
            <Select
              name="adminRole"
              label="管理权限级别"
              rule="REQ"
              options={[
                { label: "系统管理员", value: "superadmin" },
                { label: "部门管理员", value: "department" },
                { label: "内容管理员", value: "content" },
              ]}
            />,
          ]}
        />

        <SubmitButton type="primary">创建管理员账号</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);

```

- 地址选择
- 展示AddressSelect地址选择组件，支持省市区三级联动选择
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const { AddressSelect: _AddressSelect, AddressInput: _AddressInput } =
  _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const AddressSelect = _AddressSelect.Field;
const AddressEnum = _AddressSelect.AddressEnum;
const AddressInput = _AddressInput.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "业务区域多选",
          content: (
            <AddressSelect
              maxLength={3}
              defaultValue={["110"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "业务区域单选",
          content: (
            <AddressSelect
              single
              defaultValue={"110"}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal业务区域多选",
          content: (
            <AddressSelect
              maxLength={3}
              isPopup={false}
              defaultValue={["110"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal业务区域单选",
          content: (
            <AddressSelect
              isPopup={false}
              single
              defaultValue={"110"}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "valueType为all",
          content: (
            <AddressSelect
              valueType="all"
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "地址显示",
          content: <AddressEnum name="270070" />,
        },
        {
          label: "显示父级",
          content: <AddressEnum name="270070" displayParent />,
        },
        {
          label: "详细地址输入",
          content: (
            <AddressInput
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
      ]}
    />
  );
};

render(
  <div className="input">
    <BaseExample />
  </div>
);

```

- 级联选择
- 展示级联选择组件，支持多级联动选择
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const { Cascader: _Cascader } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const Cascader = _Cascader.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "一次性获取数据",
          content: (
            <Cascader
              onlyAllowLastLevel
              single
              api={{
                loader: async () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          id: "client",
                          value: "client",
                          type: "module",
                          name: "客户管理",
                          label: "客户管理",
                          children: [
                            {
                              id: "client-list",
                              value: "client-list",
                              type: "feature",
                              name: "客户列表",
                              label: "客户列表",
                            },
                            {
                              id: "client-detail",
                              value: "client-detail",
                              type: "module",
                              name: "客户详情",
                              label: "客户详情",
                              children: [
                                {
                                  id: "contract",
                                  value: "contract",
                                  type: "module",
                                  name: "合同管理",
                                  label: "合同管理",
                                },
                              ],
                            },
                            {
                              id: "client-form",
                              value: "client-form",
                              type: "feature",
                              name: "客户表单",
                              label: "客户表单",
                              children: [
                                {
                                  id: "taxpayerIdNumber",
                                  value: "taxpayerIdNumber",
                                  type: "feature",
                                  name: "税号",
                                  label: "税号",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "position",
                          value: "position",
                          type: "module",
                          name: "招聘管理",
                          label: "招聘管理",
                          children: [
                            {
                              id: "position-list",
                              value: "position-list",
                              type: "feature",
                              name: "职位列表",
                              label: "职位列表",
                            },
                            {
                              id: "position-detail",
                              value: "position-detail",
                              type: "module",
                              name: "职位详情",
                              label: "职位详情",
                            },
                            {
                              id: "position-form",
                              value: "position-form",
                              type: "feature",
                              name: "职位表单",
                              label: "职位表单",
                              children: [
                                {
                                  id: "industry",
                                  value: "industry",
                                  type: "feature",
                                  name: "行业选择",
                                  label: "行业选择",
                                },
                              ],
                            },
                          ],
                        },
                      ]);
                    }, 1000);
                  });
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "分层加载数据",
          content: (
            <Cascader
              openLoadData
              onSearch={async (searchText) => {
                return range(0, 20).map((key) => {
                  const parentId = "2";
                  return {
                    id: &#96;${parentId ? &#96;${parentId}-&#96; : ""}${key + 1}&#96;,
                    label: &#96;部门-${searchText}-${
                      parentId ? &#96;${parentId}-&#96; : ""
                    }${key + 1}&#96;,
                    parentId,
                  };
                });
              }}
              api={{
                loader: async ({ data }) => {
                  const parentId = get(data, "id", "");
                  const level = parentId.split("-").length;
                  console.log("loadData", parentId, level);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(
                        range(0, 20).map((key) => {
                          return Object.assign(
                            {
                              id: &#96;${parentId ? &#96;${parentId}-&#96; : ""}${key + 1}&#96;,
                              label: &#96;部门-${parentId ? &#96;${parentId}-&#96; : ""}${
                                key + 1
                              }&#96;,
                              parentId,
                            },
                            level >= 3 ? { children: null } : {}
                          );
                        })
                      );
                    }, 1000);
                  });
                },
              }}
            />
          ),
        },
        {
          label: "modal分层加载数据",
          content: (
            <Cascader
              openLoadData
              isPopup={false}
              api={{
                loader: async ({ data }) => {
                  const parentId = get(data, "id", "");
                  const level = parentId.split("-").length;
                  console.log("loadData", parentId, level);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(
                        range(0, 20).map((key) => {
                          return Object.assign(
                            {
                              id: &#96;${parentId ? &#96;${parentId}-&#96; : ""}${key + 1}&#96;,
                              label: &#96;部门-${parentId ? &#96;${parentId}-&#96; : ""}${
                                key + 1
                              }&#96;,
                              parentId,
                            },
                            level >= 3 ? { children: null } : {}
                          );
                        })
                      );
                    }, 1000);
                  });
                },
              }}
            />
          ),
        },
      ]}
    />
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 职能选择
- 展示FunctionSelect职能选择组件，支持多级职能树选择
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const { FunctionSelect: _FunctionSelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const FunctionSelect = _FunctionSelect.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "职能选择",
          content: (
            <FunctionSelect
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal职能选择",
          content: (
            <FunctionSelect
              isPopup={false}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能选择无搜索",
          content: (
            <FunctionSelect
              search={null}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能枚举显示",
          content: <FunctionSelect.Enum name="001" />,
        },
      ]}
    />
  );
};

render(
  <div className="input">
    <BaseExample />
  </div>
);

```

- 行业选择
- 展示IndustrySelect行业选择组件，支持多级行业树选择
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const { IndustrySelect: _IndustrySelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const IndustrySelect = _IndustrySelect.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "所属行业",
          content: (
            <IndustrySelect
              defaultValue={["001"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal所属行业",
          content: (
            <IndustrySelect
              isPopup={false}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "行业枚举显示",
          content: <IndustrySelect.Enum name="004" />,
        },
      ]}
    />
  );
};

render(
  <div className="input">
    <BaseExample />
  </div>
);

```

- 金额输入
- 展示MoneyInput金额输入组件，支持金额格式化和单位选择
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const { MoneyInput: _MoneyInput } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const MoneyInput = _MoneyInput.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "合同金额输入",
          content: <MoneyInput />,
        },
      ]}
    />
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 电话号码
- 展示PhoneNumber手机号输入组件，支持手机号格式化和校验
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const { PhoneNumber: _PhoneNumber } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const PhoneNumber = _PhoneNumber.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "联系电话",
          content: (
            <PhoneNumber
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
      ]}
    />
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 薪资范围
- 展示SalaryInput薪资范围输入组件，支持薪资类型、月薪/年薪选择和范围校验
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const { SalaryInput, Form } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const SalaryInputField = SalaryInput.Field;

const BaseExample = () => {
  return (
    <div>
      <Content
        col={1}
        list={[
          {
            label: "薪资范围",
            content: (
              <SalaryInputField
                onChange={(value) => {
                  console.log(value);
                }}
              />
            ),
          },
        ]}
      />
      <Form
        rules={{
          SALARYRANGE: ({ min, max, type }) => {
            if (type !== 1) {
              if (!min || !max) {
                return {
                  result: false,
                  errMsg: &#96;${!min ? "最低薪资" : "最高薪资"}不能为空&#96;,
                };
              }
              if (min > max) {
                return {
                  result: false,
                  errMsg: "最高薪资应大于最低薪资",
                };
              }
            }
            return {
              result: true,
              errMsg: "",
            };
          },
        }}
        data={{ salaryRange: { type: 5, month: 12 } }}
      >
        <SalaryInput
          name="salaryRange"
          label="薪资范围"
          rule="REQ SALARYRANGE"
          showMonth
          remindUnit
        />
      </Form>
    </div>
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- helperGuideName 和 lang
- 展示 helperGuideName 为字段添加帮助指引功能，以及 lang 配置实现多语言支持
- _FormInfo(@components/FormInfo),_Modal(@components/Modal),antd(antd),global(@components/Global)

```jsx
const {default: FormInfo, Form, SubmitButton, fields, List} = _FormInfo;
const {useModal} = _Modal;
const {PureGlobal} = global;
const {Space, Alert, Radio} = antd;
const {useState} = React;

const {Input, TextArea, Select} = fields;

const BaseExample = () => {
    const modal = useModal();
    const [helperGuideName, setHelperGuideName] = useState("employee-form");
    const [langOpen, setLangOpen] = useState(true);

    return (<Space direction="vertical" size={24} style={{width: "100%"}}>
        <Alert
            message="helperGuideName 和 lang 使用说明"
            description="helperGuideName-为字段添加帮助指引功能 | lang-启用多语言支持，为每个字段生成多语言版本"
            type="info"
        />

        <Space direction="vertical" size={16} style={{width: "100%"}}>
            <div>
                <span style={{marginRight: 12, fontWeight: 500}}>帮助指引名称：</span>
                <Radio.Group
                    value={helperGuideName}
                    onChange={(e) => setHelperGuideName(e.target.value)}
                >
                    <Radio.Button value="employee-form">启用 (employee-form)</Radio.Button>
                    <Radio.Button value="">禁用</Radio.Button>
                </Radio.Group>
            </div>

            <div>
                <span style={{marginRight: 12, fontWeight: 500}}>多语言配置：</span>
                <Radio.Group
                    value={langOpen}
                    onChange={(e) => setLangOpen(e.target.value)}
                >
                    <Radio.Button value={true}>中文+英文</Radio.Button>
                    <Radio.Button value={false}>仅中文</Radio.Button>
                </Radio.Group>
            </div>
        </Space>

        <Form
            helperGuideName={helperGuideName}
            lang={langOpen ? ["cn", {
                name: "EnUS", label: "英文", options: {
                    labelTransform: (label) => label + "(en)",
                    ignore: [{name: "avatar"}, {name: "photo"}],
                    disabled: [{name: "file"}], //fields:[{name:'name'}]
                },
            },] : undefined}
            onSubmit={(data) => {
                modal({
                    title: "员工档案提交成功", children: <pre>{JSON.stringify(data, null, 2)}</pre>,
                });
            }}
        >
            <Space direction="vertical" size={16}>
                <FormInfo
                    title="基本信息"
                    list={[<Input name="name" label="员工姓名" rule="REQ"/>,
                        <Input name="email" label="工作邮箱" rule="REQ EMAIL"/>,
                        <TextArea name="description" label="个人简介" block/>,]}
                />

                <FormInfo
                    title="工作信息"
                    list={[<Select
                        name="department"
                        label="所属部门"
                        rule="REQ"
                        options={[{label: "技术研发中心", value: "tech"}, {
                            label: "产品管理中心", value: "product"
                        }, {label: "市场营销中心", value: "marketing"},]}
                    />, <Select
                        name="position"
                        label="职位名称"
                        rule="REQ"
                        options={[{label: "高级工程师", value: "senior"}, {
                            label: "产品经理", value: "pm"
                        }, {label: "UI设计师", value: "designer"},]}
                    />,]}
                />

                <List
                    name="skills"
                    title="专业技能列表"
                    itemTitle={({index}) => &#96;技能 ${index + 1}&#96;}
                    list={[<Input name="name" label="技能名称" rule="REQ"/>, <Select
                        name="level"
                        label="熟练程度"
                        rule="REQ"
                        options={[{label: "初级", value: "beginner"}, {
                            label: "中级", value: "intermediate"
                        }, {label: "高级", value: "advanced"},]}
                    />,]}
                />

                <SubmitButton type="primary">提交员工档案</SubmitButton>
            </Space>
        </Form>
    </Space>);
};

render(<PureGlobal
    preset={{
        enums: {
            helperGuide: () => [{
                value: "employee-form-name", content: "请输入员工的真实姓名，用于身份识别和档案管理", url: "#",
            }, {
                value: "employee-form-email", content: "请输入有效的电子邮箱地址，用于接收工作通知和系统消息", url: "#",
            }, {
                value: "employee-form-department",
                content: "请选择员工所属的部门，部门决定了员工的汇报关系和权限范围",
                url: "#",
            }, {
                value: "employee-form-position", content: "请选择员工的职位，职位决定了员工的级别和职责范围", url: "#",
            }, {
                value: "employee-form-skills-name", content: "请填写员工掌握的技能名称，如编程语言、专业技能等", url: "#",
            }, {
                value: "employee-form-skills-level",
                content: "请选择员工对该技能的熟练程度，便于合理分配工作任务",
                url: "#",
            },],
        },
    }}
>
    <BaseExample/>
</PureGlobal>);

```

### API

### Form

表单核心组件，提供数据域管理、校验规则、事件驱动等功能。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| data | 表单初始数据 | object | 否 | {} |
| rules | 自定义校验规则，key为规则名，value为校验函数 | object | 否 | - |
| interceptors | 自定义拦截器配置 | object | 否 | - |
| onSubmit | 表单提交成功的回调，接收表单数据 | function | 否 | - |
| onError | 表单校验失败的回调 | function | 否 | - |
| onPrevSubmit | 提交前回调，校验前触发 | function | 否 | - |
| debug | 是否开启调试模式，打印表单状态 | boolean | 否 | false |
| noFilter | 是否禁用数据过滤 | boolean | 否 | false |
| helperGuideName | 帮助指引配置名称 | string | 否 | - |
| lang | 语言配置，支持多语言 | array | 否 | - |

### FormInfo

表单信息分组组件，用于组织和管理表单字段的布局。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 分组标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 否 | - |
| column | 分栏数量，响应式布局 | number | 否 | - |
| gap | 字段间距 | number | 否 | - |
| extra | 额外内容，显示在标题右侧 | ReactNode | 否 | - |

### List

多段式列表表单组件，支持动态添加和删除表单项。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名，对应表单数据中的 key | string | 是 | - |
| title | 列表标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 是 | - |
| maxLength | 最大数量，达到后隐藏添加按钮 | number | 否 | - |
| minLength | 最小数量，达到后隐藏删除按钮 | number | 否 | 0 |
| addText | 添加按钮文本 | string | 否 | - |
| itemTitle | 单项标题，可以是字符串或函数 | string | 否 | - |
| important | 是否标记为重要项，样式区分 | boolean | 否 | false |
| block | 是否占满一行 | boolean | 否 | false |
| outer | 外层容器组件 | ReactNode | 否 | Outer |
| renderChildren | 子项渲染函数 | function | 否 | - |
| deleteButtonProps | 删除按钮属性 | object | 否 | - |

### TableList

表格形式的列表表单组件，继承自 List，提供表格展示方式。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| title | 列表标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 是 | - |
| maxLength | 最大数量 | number | 否 | - |
| minLength | 最小数量 | number | 否 | 0 |
| isUnshift | 新增项是否添加到开头 | boolean | 否 | true |

### FormModal

弹窗表单组件，将 Form 和 Modal 组合使用。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| open | 是否显示弹窗 | boolean | 否 | - |
| title | 弹窗标题 | ReactNode | 否 | - |
| onClose | 关闭回调 | function | 否 | - |
| formProps | Form 组件属性 | object | 否 | - |
| children | 表单内容 | ReactNode | 是 | - |
| footerButtons | 底部按钮配置 | array | 否 | - |
| width | 弹窗宽度 | string | 否 | 520 |
| withDecorator | 装饰器函数，用于包装表单内容 | function | 否 | - |

### FormDrawer

抽屉表单组件，将 Form 和 Drawer 组合使用。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| open | 是否显示抽屉 | boolean | 否 | - |
| title | 抽屉标题 | ReactNode | 否 | - |
| onClose | 关闭回调 | function | 否 | - |
| formProps | Form 组件属性 | object | 否 | - |
| children | 表单内容 | ReactNode | 是 | - |
| footerButtons | 底部按钮配置 | array | 否 | - |
| width | 抽屉宽度 | string | 否 | - |
| withDecorator | 装饰器函数 | function | 否 | - |

### FormStepModal

分步表单弹窗组件，支持多步骤数据收集。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| open | 是否显示弹窗 | boolean | 否 | - |
| items | 步骤配置数组 | array | 是 | - |
| onClose | 关闭回调 | function | 否 | - |
| footerButtons | 底部按钮配置 | array | 否 | - |
| withDecorator | 装饰器函数 | function | 否 | - |
| autoClose | 最后一步完成后是否自动关闭 | boolean | 否 | true |
| cancelText | 取消按钮文本 | ReactNode | 否 | - |
| completeText | 完成按钮文本 | ReactNode | 否 | - |
| nextText | 下一步按钮文本 | ReactNode | 否 | - |

#### items 配置说明

items 数组中每个元素为步骤配置对象：

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 步骤标题 | ReactNode | 是 | - |
| formProps | Form 组件属性，可以是对象或函数 | object | 否 | - |
| footerButtons | 步骤底部按钮配置 | array | 否 | - |

### useFormModal

获取表单弹窗 Hook，返回一个可调用函数来弹出表单弹窗。

#### 返回值

返回一个函数，调用该函数弹出 FormModal 弹窗，参数同 FormModal 组件属性。

### useFormDrawer

获取表单抽屉 Hook，返回一个可调用函数来弹出表单抽屉。

#### 返回值

返回一个函数，调用该函数弹出 FormDrawer 抽屉，参数同 FormDrawer 组件属性。

### useFormStepModal

获取分步表单弹窗 Hook，返回一个可调用函数来弹出分步表单弹窗。

#### 返回值

返回一个函数，调用该函数弹出 FormStepModal 弹窗，参数同 FormStepModal 组件属性。

### FormModalButton

按钮触发表单弹窗组件，支持加载数据后弹出。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置，参考 @kne/react-fetch | object | 否 | - |
| modalProps | FormModal 弹窗属性，可以是对象或函数 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

#### modalProps 函数形式参数

当 modalProps 为函数时，接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| data | 加载的数据 | any |
| fetchApi | fetch 实例 | object |
| close | 关闭弹窗方法 | function |

### FormStepModalButton

按钮触发的分步表单弹窗组件。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置 | object | 否 | - |
| modalProps | FormStepModal 弹窗属性 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

### FormDrawerButton

按钮触发的表单抽屉组件。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置 | object | 否 | - |
| drawerProps | FormDrawer 抽屉属性 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

### SubmitButton

提交按钮组件，点击后触发表单校验和提交。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| autoClose | 提交成功后是否自动关闭弹窗 | boolean | 否 | true |
| children | 按钮内容 | ReactNode | 是 | - |

### CancelButton

取消按钮组件，点击后重置表单或关闭弹窗。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮内容 | ReactNode | 是 | - |

### FormApiButton

表单 API 按钮组件，可执行表单操作。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| onClick | 点击回调，接收表单 API 对象 | function | 是 | - |
| autoClose | 点击后是否自动关闭弹窗 | boolean | 否 | true |
| children | 按钮内容 | ReactNode | 是 | - |

#### onClick 回调参数

onClick 回调接收包含表单操作 API 的对象：

| 属性名 | 说明 | 类型 |
|--------|------|------|
| openApi | 表单 API 对象 | object |
| submit | 触发表单提交方法 | function |
| reset | 重置表单方法 | function |
| validate | 校验表单方法 | function |
| setFields | 设置字段值方法 | function |
| getFields | 获取字段值方法 | function |

### useFormContext

表单上下文 Hook，在 Form 内部获取表单实例和方法。

#### 返回值

返回表单 API 对象，包含以下属性和方法：

| 属性名/方法名 | 说明 | 类型 |
|-----------|------|------|
| openApi | 表单 API 对象 | object |
| formData | 表单数据 | object |

openApi 包含以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| submit | 提交表单 | - | Promise |
| reset | 重置表单 | - | void |
| validate | 校验表单 | - | Promise |
| setFields | 设置字段值 | fields: array, options: object | void |
| getFields | 获取字段值 | names: array | object |

### MultiField

多字段组件，支持在单个 Field 中包含多个子字段。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| children | 子字段组件 | ReactNode | 是 | - |

### ErrorTip

错误提示组件，可自定义字段错误信息的展示方式。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| errorRender | 自定义错误渲染函数 | function | 否 | - |
| children | 字段组件 | ReactNode | 是 | - |

#### errorRender 回调参数

errorRender 回调接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| validateData | 字段校验数据 | object |
| hasError | 是否有错误 | boolean |
| errorMsg | 错误信息 | string |

### FormItem

表单项容器组件，用于包装表单字段。

#### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 否 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| tips | 提示信息 | ReactNode | 否 | - |
| labelHidden | 是否隐藏标签 | boolean | 否 | false |
| children | 字段组件 | ReactNode | 是 | - |

### Field 类型：基础组件

以下为基础表单字段组件，请参考 antd 文档：

**Input** - 文本输入框

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| placeholder | 占位符 | string | 否 | 请输入{label} |
| tips | 提示信息，显示问号图标 | ReactNode | 否 | - |

**TextArea** - 多行文本输入框

**InputNumber** - 数字输入框

**Select** - 下拉选择框

**DatePicker** - 日期选择器

- DatePicker.MonthPicker
- DatePicker.RangePicker
- DatePicker.WeekPicker

**TimePicker** - 时间选择器

- TimePicker.RangePicker

**RadioGroup** - 单选按钮组

**Checkbox** - 复选框

**CheckboxGroup** - 复选框组

**Switch** - 开关

**Rate** - 评分

**Slider** - 滑块

**TreeSelect** - 树选择

### Field 类型：业务组件

**AddressSelect** - 地址选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| isPopup | 是否使用弹窗形式 | boolean | 否 | - |

**FunctionSelect** - 职能选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**IndustrySelect** - 行业选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**Cascader** - 级联选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| options | 选项数据 | array | 是 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**Avatar** - 头像上传组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| border | 裁剪边框 | number | 否 | - |
| width | 宽度 | number | 否 | - |
| height | 高度 | number | 否 | - |
| dropModalSize | 弹窗尺寸 | string | 否 | small |
| block | 是否占满一行 | boolean | 否 | false |

**PhoneNumber** - 电话号码输入组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**MoneyInput** - 金额输入组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**SalaryInput** - 薪资范围输入组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**Upload** - 文件上传组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| maxCount | 最大上传数量 | number | 否 | - |
| block | 是否占满一行 | boolean | 否 | false |

**ColorPicker** - 颜色选择器

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |

**Signature** - 签名组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |

### Field 类型：高级选择组件

**AdvancedSelect** - 高级选择组件，支持列表和表格两种形态

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| api | 数据加载 API 配置 | object | 是 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| isPopup | 是否使用弹窗形式 | boolean | 否 | - |
| getSearchProps | 搜索框配置 | function | 否 | - |

#### api 配置说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| loader | 数据加载函数 | function | 是 | - |
| params | 加载参数 | object | 否 | - |

**SuperSelect** - 超级选择组件

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| api | 数据加载 API 配置 | object | 是 | - |
| rule | 校验规则 | string | 否 | - |
| single | 是否单选 | boolean | 否 | false |

**SuperSelectTableList** - 表格列表选择组件

**SuperSelectUser** - 用户选择组件

**SuperSelectTree** - 树选择组件

### Field 类型：特殊组件

**TypeDateRangePicker** - 类型日期范围选择器

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |

**DatePickerToday** - 至今日期选择器

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| soFarText | 至今文本 | string | 否 | 至今 |

### fieldDecorator

字段装饰器工具，用于创建自定义 Field 组件。

#### 属性说明

| 属性名 | 说明 | 类型 |
|--------|------|------|
| createWithFieldDecorator | 创建带装饰器的字段组件 | function |
| withInputDefaultPlaceholder | 添加输入框默认占位符 | function |
| withSelectDefaultPlaceholder | 添加选择器默认占位符 | function |
| withLang | 添加多语言支持 | function |

### hooks

表单相关 Hooks 集合。

#### 常用 Hooks

| Hook 名 | 说明 |
|---------|------|
| useField | 获取字段 API |
| useReset | 获取重置方法 |
| useSubmit | 获取提交方法 |

### widget

表单组件工具集。

### utils

表单工具函数集。

### formUtils

表单实用工具集。

### RULES

内置校验规则。

#### 常用规则

| 规则名 | 说明 | 参数 |
|--------|------|------|
| REQ | 必填 | - |
| LEN | 长度限制 | MIN-MAX |
| EMAIL | 邮箱格式 | - |
| TEL | 电话号码 | - |
| NUM | 数字 | - |
| INT | 整数 | - |

### interceptors

内置拦截器。

#### 使用方式

```javascript
// 注册拦截器
interceptors.input.use("date-string", (value) => {
  return value ? new Date(value) : null;
});

interceptors.output.use("date-string", (value) => {
  return value ? dayjs(value).format("YYYY-MM-DD") : "";
});

// 在字段中使用
<Input name="date" label="日期" interceptor="date-string"/>
```

### SelectInnerInput

选择器内部输入框组件，用于自定义选择器开发。

### FormSteps

表单步骤组件，用于 FormStepModal 中显示步骤条。

### formModule

表单模块，导出所有表单相关的组件和工具。
