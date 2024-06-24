
# ConfirmButton


### 概述

### 何时使用

执行操作前确认后再执行


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ConfirmButton(@components/ConfirmButton),antd(antd),global(@components/Global)

```jsx
const { default: ConfirmButton, ConfirmLink } = _ConfirmButton;
const { Space } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <Space direction={"vertical"}>
      <Space>
        <ConfirmButton
          isDelete={false}
          message="确定要删除吗"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-气泡-正文
        </ConfirmButton>
        <ConfirmButton
          onClick={() => {
            console.log("执行删除");
          }}
        >
          警告-气泡-正文
        </ConfirmButton>
      </Space>
      <Space>
        <ConfirmButton
          title="确定要删除吗？"
          isDelete={false}
          message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-气泡-标题正文
        </ConfirmButton>
        <ConfirmButton
          title="确定要删除吗？"
          message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          警告-气泡-标题正文
        </ConfirmButton>
      </Space>
      <Space>
        <ConfirmButton
          isModal
          isDelete={false}
          message="确定提交XX吗？"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-modal-正文
        </ConfirmButton>
        <ConfirmButton
          isModal
          onClick={() => {
            console.log("执行删除");
          }}
        >
          警告-modal-正文
        </ConfirmButton>
      </Space>
      <Space>
        <ConfirmButton
          isModal
          title="确定提交XX吗？"
          isDelete={false}
          message="这里显示详情说明这里显示详情说明这里显示详情说明这里显示详情说明这里显示详情说明"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-modal-标题正文
        </ConfirmButton>
        <ConfirmButton
          isModal
          title="确定要删除吗？"
          message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          有title的Modal确认删除
        </ConfirmButton>
      </Space>
      <ConfirmLink
        onClick={() => {
          console.log("执行删除");
        }}
      >
        Link-警告-气泡-正文
      </ConfirmLink>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```


### API

| 属性名          | 说明                                  | 类型       | 默认值     |
|--------------|-------------------------------------|----------|---------|
| message      | 删除提示                                | jsx      | 确定要删除吗？ |
| title        | 删除提示标题                              | jsx      | -       |
| isDelete     | 是否为删除操作                             | boolean  | true    |
| onClick      | 点击确认后执行的事件                          | function | -       |
| onCancel     | 点击取消后执行的事件                          | function | -       |
| disabled     | 按钮是否禁用                              | boolean  | -       |
| showCancel   | 是否显示取消按钮                            | boolean  | -       |
| cancelText   | 取消按钮文案                              | string   | 取消      |
| okText       | 确认按钮文案                              | string   | 确认      |
| isModal      | 是否以弹窗方式展示，默认为Popconfirm             | boolean  | false   |
| placement    | 当isModal为false时生效，指定Popconfirm的弹出方向 | string   | -       |
| getContainer | 指定Popconfirm或Modal弹出位置，一般不需要指定      | function | -       |

### ConfirmLink

另外的一种按钮形式参数同ConfirmButton

### withConfirm

高阶组件可以自定义按钮
