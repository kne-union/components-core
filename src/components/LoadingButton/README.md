
# LoadingButton


### 概述

### 何时使用

当点击按钮时，需要显示loading状态，当然你可以使用antd Button的loading属性，但是这样你需要自己声明一个state来控制，LoadingButton组件可以帮你做好这件事情

### 特点

通过onClick返回的Promise来控制Button的loading状态

children除了可以传正常的jsx以外还接受function参数，可以接收到loading状态以便根据loading状态显示不同文案

### 示例

#### 示例代码

- 带有加载状态按钮
- 点击按钮切换到加载状态，加载方法完成后自动切换为普通状态
- _LoadingButton(@components/LoadingButton),antd(antd)

```jsx
const { default: LoadingButton } = _LoadingButton;
const { Space, message } = antd;

const clickHandler = () => {
  message.success("点击按钮1s后完成加载");
  return new Promise((resolve) => {
    setTimeout(() => {
      message.success("完成");
      resolve();
    }, 1000);
  });
};
const BaseExample = () => {
  return (
    <Space wrap>
      <LoadingButton onClick={clickHandler}>按钮</LoadingButton>
      <LoadingButton onClick={clickHandler}>
        {(isLoading) => (isLoading ? "正在加载中..." : "切换加载文案")}
      </LoadingButton>
    </Space>
  );
};

render(<BaseExample />);

```


### API

| 属性名      | 说明                                                                                            | 类型           | 默认值 |
|----------|-----------------------------------------------------------------------------------------------|--------------|-----|
| onClick  | 点击按钮触发函数，可以返回一个Promise，当Promise再pending状态时Button将自动处于loading状态，当Promise返回结果会自动从loading切换回普通状态 | function     | -   |
| children | Button的子元素，可以为jsx或者function，为function时可以接收到loading状态用来切换显示内容                                  | jsx,function | -   |
