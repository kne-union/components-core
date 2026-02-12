# FormInfo 组件使用关键提示词

## 一、基础结构

### 1. 导入组件（使用 createWithRemoteLoader）
```jsx
import { createWithRemoteLoader } from '@kne/remote-loader';

const Component = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { Form, SubmitButton } = FormInfo;
  const { Input, TextArea, Upload, Avatar, PhoneNumber } = FormInfo.fields;

  return (
    <Form onSubmit={(data) => console.log(data)}>
      <FormInfo list={[...fields]} />
    </Form>
  );
});

export default Component;
```

### 2. 最小表单结构
```jsx
<Form onSubmit={(data) => console.log(data)}>
  <FormInfo list={[...fields]} />
</Form>
```

### 3. 可用的 FormInfo 导出
- `FormInfo` - 表单信息组件
- `FormInfo.fields` - 字段组件集合
- `FormInfo.Form` - 表单容器组件（或直接解构为 `Form`）
- `FormInfo.SubmitButton` - 提交按钮组件
- `FormInfo.useFormContext` - 获取表单上下文的 Hook
- `FormInfo.useFormModal` - 表单弹窗 Hook

## 二、字段配置核心参数

### 必需参数
- `name`: 字段唯一标识，Form提交时data的key值
- `label`: 字段显示名称，错误提示中也会用到

### 常用参数
- `rule`: 校验规则，支持多个规则用空格分隔，如 `"REQ LEN-3-10"`
- `tips`: 字段提示信息
- `block`: 占满整行
- `disabled`: 禁用状态
- `labelHidden`: 隐藏label
- `value`: 默认值
- `readOnly`: 只读状态（如 TextArea 的 readOnly）
- `display`: 条件渲染函数，接收 `{ formData }` 参数，返回 boolean
- `onChange`: 值变化回调函数
- `defaultValue`: 默认值（如 RadioGroup）
- `options`: 选项数组（用于选择器类组件）

## 三、常用校验规则 (RULE)

### 基础规则
- `REQ`: 必填
- `EMAIL`: 邮箱格式
- `TEL`: 电话格式
- `PHONE`: 手机号格式

### 长度规则
- `LEN-3-10`: 长度3-10位
- `LEN-0-500`: 最大500位

## 四、常用字段类型

### 基础输入
```jsx
<Input name="name" label="姓名" rule="REQ" />
<TextArea name="desc" label="描述" block />
<InputNumber name="count" label="数量" />
```

### 选择器
```jsx
// 单选组
<RadioGroup
  name="type"
  label="类型"
  options={[
    { label: "选项1", value: "value1" },
    { label: "选项2", value: "value2" }
  ]}
  defaultValue="value1"
  rule="REQ"
/>

// 复选框组
<CheckboxGroup
  name="tags"
  label="标签"
  options={[
    { label: "标签1", value: 1 },
    { label: "标签2", value: 2 }
  ]}
/>

// 超级选择器
<SuperSelect
  name="select"
  label="选项"
  options={[...]}
  labelKey="name"
  valueKey="code"
  single  // 单选
/>

// 高级选择器（远程加载）
<AdvancedSelect
  name="select"
  label="选项"
  rule="REQ"
  api={{
    loader: () => {
      return { pageData: [
        { label: "第一项", value: 1 },
        { label: "第二项", value: 2 }
      ]};
    }
  }}
/>
```

### 上传类
```jsx
// 文件上传
<Upload
  name="file"
  label="文件"
  block
  maxLength={1}
  accept={['.xls', '.xlsx']}
  multiple={false}
  interceptor="photo-string-list"  // 转换为字符串列表
/>

// 附件上传
<Upload name="data.options.files" label="附件" interceptor="photo-string-list" />
```

### 日期类
```jsx
// 日期选择器
<DatePicker
  name="expires"
  label="过期时间"
  disabledDate={current => current && current < dayjs().startOf('day')}
/>
```

### 特殊输入
```jsx
// 手机号
<PhoneNumber
  name="phone"
  label="手机号"
  format="string"  // 返回字符串格式
  rule="REQ"
/>

// 评分
<Rate name="score" label="满意度" />
```

### Enum 组件（枚举）
```jsx
import { Enum } from FormInfo;

<Enum moduleName="cheatType" format="option">
  {options => {
    return <CheckboxGroup name="cheatType" label="作弊类型" options={options} />;
  }}
</Enum>
```

## 五、列表字段

### 表格列表 (TableList)
```jsx
<TableList
  name="mappingGroups"
  title="映射列表"
  display={condition}  // 条件显示
  list={[
    <SuperSelect name="origin" label="来源" options={[...]} single />,
    <Input name="target" label="目标" />
  ]}
/>
```

### 列表字段配置
- `name`: 字段名
- `title`: 列表标题
- `display`: 条件显示函数，接收 `{ formData }` 参数
- `list`: 表格列字段数组
- `maxLength`: 最大条数限制
- `minLength`: 最小条数限制

## 六、表单配置

### Form 常用属性
- `onSubmit`: 提交回调，接收表单数据和参数对象
- `onError`: 校验失败回调
- `onPrevSubmit`: 点击提交时触发
- `data`: 初始数据对象
- `rules`: 自定义校验规则对象
- `lang`: 多语言配置
- `size`: 表单尺寸，如 `"large"`

### FormInfo 常用属性
- `title`: 区域标题
- `list`: 字段列表数组
- `column`: 列数，默认为 2
- `block`: 占满整行

### useFormContext Hook
```jsx
const { useFormContext } = FormInfo;
const { formData } = useFormContext();

// 使用 formData 进行条件渲染
display={formData.type === 'candidate'}
```

## 七、表单弹窗

### 使用 useFormModal Hook
```jsx
import { createWithRemoteLoader } from '@kne/remote-loader';

const Component = createWithRemoteLoader({
  modules: ['components-core:FormInfo@useFormModal']
})(({ remoteModules }) => {
  const [useFormModal] = remoteModules;
  const formModal = useFormModal();

  return (
    <Button onClick={() => {
      formModal({
        title: "编辑项目",
        size: "large",
        autoClose: true,
        formProps: {
          data: { field1: "默认值" },
          onSubmit: async (data) => {
            console.log(data);
            // return false 可以阻止关闭弹窗
          }
        },
        children: <FormInner />
      });
    }}>
      打开表单
    </Button>
  );
});
```

### formModal 配置属性
- `title`: 弹窗标题
- `size`: 弹窗尺寸，如 `"large"`
- `autoClose`: 提交成功后自动关闭
- `children`: 表单子组件
- `formProps`: 传递给 Form 的属性对象
  - `data`: 初始表单数据
  - `onSubmit`: 提交回调
- `footer`: 自定义底部，设为 `null` 可隐藏

## 八、完整示例

### 简单表单示例
```jsx
import { createWithRemoteLoader } from '@kne/remote-loader';

const SimpleForm = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { Form, SubmitButton } = FormInfo;
  const { Input, TextArea, RadioGroup } = FormInfo.fields;

  return (
    <Form onSubmit={async (data) => {
      console.log('提交数据:', data);
    }}>
      <FormInfo
        title="基本信息"
        column={1}
        list={[
          <RadioGroup
            name="type"
            label="类型"
            options={[
              { label: "链接", value: "link" },
              { label: "候选人", value: "candidate" }
            ]}
            defaultValue="link"
            rule="REQ"
          />,
          <Input name="name" label="姓名" rule="REQ" />,
          <TextArea name="description" label="描述" rule="LEN-0-500" />
        ]}
      />
      <SubmitButton>提交</SubmitButton>
    </Form>
  );
});

export default SimpleForm;
```

### 条件显示示例
```jsx
import { createWithRemoteLoader } from '@kne/remote-loader';

const ConditionalForm = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { useFormContext } = FormInfo;
  const { formData } = useFormContext();
  const { RadioGroup, Input, TextArea } = FormInfo.fields;

  return (
    <Form>
      <FormInfo column={1} list={[
        <RadioGroup
          name="type"
          label="类型"
          options={[
            { label: "链接", value: "link" },
            { label: "候选人", value: "candidate" }
          ]}
          defaultValue="link"
        />
      ]} />

      {formData.type === 'candidate' && (
        <FormInfo
          title="候选人信息"
          column={1}
          list={[
            <Input name="data.name" label="姓名" rule="REQ" />,
            <Input name="data.email" label="邮箱" rule="EMAIL" />
          ]}
        />
      )}
    </Form>
  );
});
```

### 带日期限制的表单
```jsx
import { createWithRemoteLoader } from '@kne/remote-loader';
import dayjs from 'dayjs';

const DateForm = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { Form } = FormInfo;
  const { DatePicker } = FormInfo.fields;

  return (
    <Form>
      <FormInfo
        column={1}
        list={[
          <DatePicker
            name="expires"
            label="过期时间"
            disabledDate={current => current && current < dayjs().startOf('day')}
          />
        ]}
      />
    </Form>
  );
});
```

### 使用 Enum 组件
```jsx
import { createWithRemoteLoader } from '@kne/remote-loader';

const EnumForm = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Enum']
})(({ remoteModules }) => {
  const [FormInfo, Enum] = remoteModules;
  const { Form } = FormInfo;
  const { RadioGroup, CheckboxGroup } = FormInfo.fields;

  return (
    <Form>
      <FormInfo
        column={1}
        list={[
          <Enum moduleName="cheatType" format="option">
            {options => (
              <CheckboxGroup
                name="cheatType"
                label="作弊类型"
                options={options}
              />
            )}
          </Enum>
        ]}
      />
    </Form>
  );
});
```

## 九、最佳实践

1. **使用 createWithRemoteLoader 导入**: FormInfo 必须通过 `createWithRemoteLoader` 加载
2. **禁止通过 props 传递 FormInfo**: FormInfo 组件不要通过参数传递，如果子组件需要使用 FormInfo，需要在子组件中使用 `createWithRemoteLoader` 自行加载
3. **字段命名**: 使用有意义的 name 作为数据 key，支持嵌套如 `data.name`
4. **校验规则**: 组合使用基础规则，如 `"REQ LEN-0-500"`
5. **布局**: 使用 `column` 控制列数，常用 `column={1}`
6. **条件渲染**: 使用 `display` 属性接收 `{ formData }` 进行条件判断
7. **表单上下文**: 使用 `useFormContext` 获取表单数据进行联动
8. **表单弹窗**: 使用 `useFormModal` Hook 创建表单弹窗
9. **日期选择**: 使用 `dayjs` 进行日期比较，`disabledDate` 禁止过去日期

### 错误示例 ❌

```jsx
// ❌ 错误：通过 props 传递 FormInfo
const Parent = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  
  return <ChildForm FormInfo={FormInfo} />;
});

const ChildForm = ({ FormInfo }) => {
  return (
    <Form>
      <FormInfo list={[...]} />
    </Form>
  );
};
```

### 正确示例 ✅

```jsx
// ✅ 正确：子组件自行加载 FormInfo
const Parent = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  
  return <ChildForm />;
});

const ChildForm = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  
  return (
    <Form>
      <FormInfo list={[...]} />
    </Form>
  );
});
```
