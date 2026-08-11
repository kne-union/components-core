![npm version](https://img.shields.io/npm/v/@kne-components/components-core.svg?logo=react)
![Auto Assign](https://github.com/kne-union/components-core/actions/workflows/publish.yml/badge.svg)
![antd version](https://img.shields.io/badge/antd-5.x-blue?logo=antdesign)


提供了一个使用于tob业务场景的增强组件库，依赖了 antd


<!--START_SECTION:DOC_MD-->

# button-group

### 描述

实现了一个按钮组,loading按钮,确认按钮和加载按钮.

### 安装

```shell
npm i --save @kne/button-group
```

### 概述

@kne/button-group 是一个 React 按钮组件库，提供了一系列功能丰富的按钮组件，用于简化常见的按钮交互场景。该库专注于提供自适应布局、加载状态管理、确认操作和数据请求等功能，使开发者能够快速实现各种复杂的按钮交互需求。

### ButtonGroup

自适应按钮组组件，能够根据容器宽度自动调整显示的按钮数量。当容器宽度不足以显示所有按钮时，会自动将多余的按钮放入下拉菜单中，确保界面布局美观且功能完整。

**主要特性：**
- 自动适应容器宽度
- 支持紧凑模式（Space.Compact）
- 支持链接样式（适用于表格操作列）
- 可指定显示的按钮数量
- 支持禁用、隐藏状态
- 支持自定义按钮渲染
- 支持禁用按钮的工具提示

**适用场景：**
- 操作栏、工具栏
- 表格操作列
- 面板标题栏
- 任何需要自适应按钮布局的场景

### LoadingButton

封装了加载状态的按钮组件，简化了异步操作的处理。通过内置的状态管理，在异步操作执行期间自动显示加载状态，提升用户体验。同时提供了 useLoading hook，方便在其他组件中复用加载状态管理逻辑。

**主要特性：**
- 自动管理加载状态
- 支持自定义加载文案
- 自动处理错误情况
- 支持 loading 属性手动控制
- 提供的 useLoading Hook 可在其他组件使用

**适用场景：**
- 表单提交按钮
- 数据导出按钮
- 任何需要异步操作的按钮
- 非按钮组件的异步状态管理

### ConfirmButton

带有确认功能的按钮组件，支持弹窗确认（Popconfirm）和模态框确认（Modal）两种模式。适用于需要用户二次确认的操作，如删除、提交等重要操作。同时提供了 ConfirmLink 和 ConfirmText 变体，以及 withConfirm 高阶组件，满足不同场景的确认需求。

**主要特性：**
- 支持 Popconfirm 和 Modal 两种确认模式
- 支持危险操作样式（红色按钮）
- 可自定义确认和取消按钮文案
- 提供 ConfirmLink 和 ConfirmText 变体
- 确认时自动显示加载状态

**适用场景：**
- 删除操作
- 数据提交
- 审核操作
- 表格行操作（使用 ConfirmLink/ConfirmText）
- 任何需要用户二次确认的操作

### FetchButton

集成了数据请求功能的按钮组件，基于 @kne/react-fetch 库实现。可以直接处理 API 请求，并在请求过程中自动管理加载状态，简化了数据交互的实现。

**主要特性：**
- 自动管理请求加载状态
- 支持请求成功/失败回调
- 支持参数传递
- 支持请求拦截（beforeFetch）
- 基于 @kne/react-fetch 实现

**适用场景：**
- 数据刷新按钮
- 文件导出按钮
- API 请求按钮
- 任何按钮触发的数据请求场景

### ButtonFooter

页面底部按钮区域组件，可以自动计算高度并设置 CSS 变量，方便页面布局和样式调整。在小屏幕下，会自动将内容渲染到 body，确保按钮始终可见。

**主要特性：**
- 自动计算高度并设置 CSS 变量
- 响应式设计，小屏幕下固定到底部
- 支持多种布局方式（居中、左右分布等）
- 适用于表单页面的底部操作区

**适用场景：**
- 表单页面底部操作按钮
- 详情页面底部操作按钮
- 对话框底部按钮
- 任何需要固定在底部的操作按钮区域

## 组件关系

```
ButtonGroup (自适应布局)
  ├── LoadingButton (加载状态)
  ├── ConfirmButton (确认功能)
  │   ├── ConfirmLink (链接变体)
  │   └── ConfirmText (文本变体)
  └── FetchButton (数据请求)
      └── 基于 LoadingButton

ButtonFooter (底部固定区域)
```

## 设计理念

该组件库的设计理念是通过封装常见的按钮交互模式，提供开箱即用的解决方案，同时保持足够的灵活性和可扩展性：

1. **关注点分离**：每个组件专注于解决特定的问题，如 ButtonGroup 专注于布局，LoadingButton 专注于状态管理。

2. **组合优于继承**：通过组合不同的功能组件，可以实现复杂的交互需求，如 FetchButton 就是 LoadingButton 与数据请求功能的组合。

3. **声明式 API**：提供简洁明了的 API，使开发者能够以声明式的方式描述 UI 和交互行为。

4. **渐进式增强**：基础组件可以独立使用，也可以与其他组件组合使用，实现更复杂的功能。

5. **用户体验优先**：注重细节，如自适应布局、加载状态反馈等，提升最终用户的使用体验。

## 特性总结

- **自适应布局**：根据容器宽度自动调整按钮显示方式
- **加载状态管理**：简化异步操作的加载状态处理
- **操作确认**：提供多种确认模式，增强用户操作安全性
- **数据请求集成**：简化按钮与后端 API 的交互
- **国际化支持**：内置中英文语言包
- **高度可定制**：组件提供丰富的配置选项
- **响应式设计**：适配不同屏幕尺寸
- **TypeScript 友好**：完整的类型定义


### 示例

#### 示例代码

- ButtonGroup 基础用法
- ButtonGroup 能够根据容器宽度自动调整显示的按钮数量，并将多余的按钮放入下拉菜单中。适用于操作栏、工具栏等场景。
- _ButtonGroup(@kne/button-group)[import * as _ButtonGroup from "@kne/button-group"],antd(antd)

```jsx
const { default: ButtonGroup } = _ButtonGroup;
const { Flex, Button, Space, Typography } = antd;
const { useState } = React;
const { Text } = Typography;

// 基础用法 - 自动适应容器宽度
const BasicExample = () => {
  const [width, setWidth] = useState(300);
  return (
    <Flex gap={16} vertical>
      <Text type="secondary">调整容器宽度查看自适应效果</Text>
      <Flex gap={8}>
        <div style={{ width: &#96;${width}px&#96;, padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
          <ButtonGroup
            list={[
              { type: 'primary', children: '新建' },
              { type: 'default', children: '编辑' },
              { type: 'default', children: '导出' },
              { type: 'default', children: '打印' },
              { children: '更多操作1', isDelete: false, message: '确定执行吗？' },
              { children: '更多操作2', message: '确定执行吗？' },
              { children: '删除', isDelete: true }
            ]}
          />
        </div>
      </Flex>
      <Space>
        <Button onClick={() => setWidth(w => Math.max(200, w - 50))}>减少宽度</Button>
        <Button onClick={() => setWidth(w => Math.min(600, w + 50))}>增加宽度</Button>
      </Space>
    </Flex>
  );
};

// 紧凑模式
const CompactExample = () => {
  return (
    <Flex gap={16} vertical>
      <Text type="secondary">紧凑模式（适用于工具栏）</Text>
      <ButtonGroup compact list={[{ type: 'primary', children: '保存' }, { children: '撤销' }, { children: '重做' }, { children: '删除', isDelete: true }]} />
    </Flex>
  );
};

// 链接样式 - 更多按钮
const LinkStyleExample = () => {
  const [width, setWidth] = useState(200);
  return (
    <Flex gap={16} vertical>
      <Text type="secondary">链接样式（适用于表格操作栏）</Text>
      <div style={{ width: &#96;${width}px&#96; }}>
        <ButtonGroup
          moreType="link"
          list={[
            { children: '查看', type: 'link' },
            { children: '编辑', type: 'link' },
            { children: '删除', type: 'link', isDelete: true, message: '确定删除吗？' },
            { children: '审核', type: 'link' },
            { children: '驳回', type: 'link' }
          ]}
        />
      </div>
      <Space>
        <Button onClick={() => setWidth(w => Math.max(150, w - 30))}>-</Button>
        <Button onClick={() => setWidth(w => Math.min(400, w + 30))}>+</Button>
      </Space>
    </Flex>
  );
};

// 指定显示数量
const FixedLengthExample = () => {
  const [showLength, setShowLength] = useState(2);
  return (
    <Flex gap={16} vertical>
      <Text type="secondary">指定显示按钮数量（showLength）</Text>
      <Space>
        <Button type={showLength === 1 ? 'primary' : 'default'} onClick={() => setShowLength(1)}>
          显示1个
        </Button>
        <Button type={showLength === 2 ? 'primary' : 'default'} onClick={() => setShowLength(2)}>
          显示2个
        </Button>
        <Button type={showLength === 3 ? 'primary' : 'default'} onClick={() => setShowLength(3)}>
          显示3个
        </Button>
      </Space>
      <ButtonGroup showLength={showLength} list={[{ type: 'primary', children: '主要操作' }, { children: '次要操作1' }, { children: '次要操作2' }, { children: '次要操作3' }, { children: '次要操作4' }]} />
    </Flex>
  );
};

// 自定义渲染函数
const CustomRenderExample = () => {
  const CustomButton = props => (
    <Button {...props} style={{ borderRadius: '4px' }}>
      {props.children}
    </Button>
  );

  return (
    <Flex gap={16} vertical>
      <Text type="secondary">自定义渲染（支持函数式配置）</Text>
      <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '8px', width: '280px' }}>
        <ButtonGroup
          moreType="link"
          list={[
            props => (
              <CustomButton {...props} type="primary">
                自定义按钮
              </CustomButton>
            ),
            props => <CustomButton {...props}>按钮2</CustomButton>,
            props => <CustomButton {...props}>按钮3</CustomButton>,
            props => <CustomButton {...props}>按钮4</CustomButton>
          ]}
        />
      </div>
    </Flex>
  );
};

// 禁用状态与隐藏
const StateExample = () => {
  const [disabled, setDisabled] = useState(true);
  const [hidden, setHidden] = useState(true);

  return (
    <Flex gap={16} vertical>
      <Text type="secondary">禁用与隐藏状态</Text>
      <Space>
        <Button onClick={() => setDisabled(!disabled)}>{disabled ? '启用' : '禁用'}操作3</Button>
        <Button onClick={() => setHidden(!hidden)}>{hidden ? '显示' : '隐藏'}操作4</Button>
      </Space>
      <ButtonGroup list={[{ type: 'primary', children: '操作1' }, { children: '操作2' }, { children: '操作3', disabled }, { children: '操作4', hidden }, { children: '操作5', message: '确定吗？' }]} />
    </Flex>
  );
};

// 工具提示
const TooltipExample = () => {
  return (
    <Flex gap={16} vertical>
      <Text type="secondary">禁用按钮提示（tooltipProps）</Text>
      <ButtonGroup
        list={[
          { type: 'primary', children: '可用操作' },
          {
            children: '已禁用操作',
            disabled: true,
            tooltipProps: {
              title: '此操作暂时不可用，请先完成前置步骤',
              placement: 'bottom'
            }
          },
          {
            children: '需要权限',
            disabled: true,
            tooltipProps: {
              title: '您没有执行此操作的权限',
              placement: 'bottom'
            }
          }
        ]}
      />
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={3}>ButtonGroup 自适应按钮组</Typography.Title>
      <Typography.Paragraph>ButtonGroup 是一个自适应按钮组组件，能够根据容器宽度自动调整显示的按钮数量， 多余的按钮会放入下拉菜单中。适用于操作栏、工具栏、表格操作列等场景。</Typography.Paragraph>

      <Flex vertical gap={32}>
        <div>
          <Typography.Title level={4}>基础用法</Typography.Title>
          <BasicExample />
        </div>

        <div>
          <Typography.Title level={4}>紧凑模式</Typography.Title>
          <CompactExample />
        </div>

        <div>
          <Typography.Title level={4}>链接样式</Typography.Title>
          <LinkStyleExample />
        </div>

        <div>
          <Typography.Title level={4}>指定显示数量</Typography.Title>
          <FixedLengthExample />
        </div>

        <div>
          <Typography.Title level={4}>自定义渲染</Typography.Title>
          <CustomRenderExample />
        </div>

        <div>
          <Typography.Title level={4}>禁用与隐藏</Typography.Title>
          <StateExample />
        </div>

        <div>
          <Typography.Title level={4}>禁用提示</Typography.Title>
          <TooltipExample />
        </div>
      </Flex>
    </Space>
  );
};

render(<BaseExample />);

```

- LoadingButton 加载按钮
- LoadingButton 封装了加载状态，简化异步操作的处理。点击按钮时自动显示加载状态，避免重复提交。
- _ButtonGroup(@kne/button-group)[import * as _ButtonGroup from "@kne/button-group"],antd(antd)

```jsx
const { LoadingButton, useLoading } = _ButtonGroup;
const { Space, Button, Typography, message, Card, Alert, Flex } = antd;
const { useState } = React;

// 基础用法 - 自动加载状态
const BasicExample = () => {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('操作成功！');
        resolve();
      }, 1500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">点击按钮，自动管理加载状态</Typography.Text>
      <Space wrap>
        <LoadingButton type="primary" onClick={handleClick}>
          保存数据
        </LoadingButton>
        <LoadingButton onClick={handleClick}>提交审核</LoadingButton>
        <LoadingButton danger onClick={handleClick}>删除</LoadingButton>
      </Space>
    </Space>
  );
};

// 自定义加载文案
const CustomTextExample = () => {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('上传完成');
        resolve();
      }, 2000);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">使用函数自定义加载时的文案</Typography.Text>
      <Space>
        <LoadingButton onClick={handleClick}>
          {(isLoading) => (isLoading ? '正在上传...' : '上传文件')}
        </LoadingButton>
        <LoadingButton onClick={handleClick} type="primary">
          {(isLoading) => (isLoading ? '提交中...' : '提交订单')}
        </LoadingButton>
      </Space>
    </Space>
  );
};

// 错误处理
const ErrorExample = () => {
  const [shouldFail, setShouldFail] = useState(false);

  const handleClick = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          message.error('操作失败，请重试');
          reject(new Error('操作失败'));
        } else {
          message.success('操作成功');
          resolve();
        }
      }, 1000);
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text type="secondary">
        演示错误处理：加载状态会自动解除
      </Typography.Text>
      <Space>
        <Button onClick={() => setShouldFail(!shouldFail)}>
          {shouldFail ? '切换为成功' : '切换为失败'}
        </Button>
      </Space>
      <Space>
        <LoadingButton onClick={handleClick}>
          {shouldFail ? '会失败的操作' : '会成功的操作'}
        </LoadingButton>
      </Space>
      {shouldFail && <Alert message="当前设置为失败模式" type="warning" />}
    </Space>
  );
};

// 手动控制加载状态
const ManualExample = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('手动控制加载完成');
    }, 2000);
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">通过 loading 属性手动控制加载状态</Typography.Text>
      <LoadingButton loading={loading} onClick={handleClick}>
        手动控制加载
      </LoadingButton>
    </Space>
  );
};

// useLoading Hook 示例
const UseLoadingExample = () => {
  const { isLoading, callback } = useLoading(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('Hook 模式操作完成');
        resolve();
      }, 1500);
    });
  });

  return (
    <Card title="useLoading Hook" style={{ width: 400 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text type="secondary">
          在非按钮组件中使用 useLoading 管理异步状态
        </Typography.Text>
        <Space>
          <Button onClick={callback} loading={isLoading}>
            使用 Hook
          </Button>
          <Button onClick={() => {}}>
            独立按钮（不受影响）
          </Button>
        </Space>
        {isLoading && (
          <Alert message="当前状态：加载中" type="info" showIcon />
        )}
      </Space>
    </Card>
  );
};

// 不同按钮类型
const ButtonTypesExample = () => {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('完成');
        resolve();
      }, 1000);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">支持所有 Ant Design Button 类型</Typography.Text>
      <Space wrap>
        <LoadingButton type="primary" onClick={handleClick}>Primary</LoadingButton>
        <LoadingButton type="default" onClick={handleClick}>Default</LoadingButton>
        <LoadingButton type="dashed" onClick={handleClick}>Dashed</LoadingButton>
        <LoadingButton type="link" onClick={handleClick}>Link</LoadingButton>
        <LoadingButton type="text" onClick={handleClick}>Text</LoadingButton>
      </Space>
      <Space wrap>
        <LoadingButton type="primary" ghost onClick={handleClick}>Primary Ghost</LoadingButton>
        <LoadingButton type="default" ghost onClick={handleClick}>Default Ghost</LoadingButton>
      </Space>
    </Space>
  );
};

// 图标按钮
const IconExample = () => {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('操作完成');
        resolve();
      }, 1200);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">支持图标</Typography.Text>
      <Space>
        <LoadingButton type="primary" icon={<span>⬆️</span>} onClick={handleClick}>
          上传
        </LoadingButton>
        <LoadingButton icon={<span>⬇️</span>} onClick={handleClick}>
          下载
        </LoadingButton>
        <LoadingButton danger icon={<span>🗑️</span>} onClick={handleClick}>
          删除
        </LoadingButton>
      </Space>
    </Space>
  );
};

// 实际应用场景 - 表单提交
const FormSubmitExample = () => {
  const handleSubmit = async () => {
    // 模拟表单验证
    await new Promise(resolve => setTimeout(resolve, 500));
    // 模拟 API 请求
    await new Promise((resolve) => {
      setTimeout(() => {
        message.success('表单提交成功！');
        resolve();
      }, 1500);
    });
  };

  return (
    <Card title="表单提交场景" style={{ width: 400 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text type="secondary">
          点击提交按钮，自动防止重复提交
        </Typography.Text>
        <Space>
          <LoadingButton type="primary" onClick={handleSubmit}>
            提交表单
          </LoadingButton>
          <Button onClick={() => message.info('已取消')}>取消</Button>
        </Space>
      </Space>
    </Card>
  );
};

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={3}>LoadingButton 加载按钮</Typography.Title>
      <Typography.Paragraph>
        LoadingButton 封装了加载状态，简化异步操作的处理。点击按钮时自动显示加载状态，
        避免重复提交，同时提供 useLoading Hook 供其他组件使用。
      </Typography.Paragraph>

      <Flex vertical gap={32}>
        <div>
          <Typography.Title level={4}>基础用法</Typography.Title>
          <BasicExample />
        </div>

        <div>
          <Typography.Title level={4}>自定义加载文案</Typography.Title>
          <CustomTextExample />
        </div>

        <div>
          <Typography.Title level={4}>错误处理</Typography.Title>
          <ErrorExample />
        </div>

        <div>
          <Typography.Title level={4}>手动控制加载状态</Typography.Title>
          <ManualExample />
        </div>

        <div>
          <Typography.Title level={4}>useLoading Hook</Typography.Title>
          <UseLoadingExample />
        </div>

        <div>
          <Typography.Title level={4}>不同按钮类型</Typography.Title>
          <ButtonTypesExample />
        </div>

        <div>
          <Typography.Title level={4}>图标按钮</Typography.Title>
          <IconExample />
        </div>

        <div>
          <Typography.Title level={4}>实际应用场景</Typography.Title>
          <FormSubmitExample />
        </div>
      </Flex>
    </Space>
  );
};

render(<BaseExample />);

```

- ConfirmButton 确认按钮
- ConfirmButton 带有确认功能，支持弹窗确认和模态框确认两种模式。适用于删除、提交等重要操作。
- _ButtonGroup(@kne/button-group)[import * as _ButtonGroup from "@kne/button-group"],antd(antd)

```jsx
const { ConfirmButton, ConfirmLink, ConfirmText } = _ButtonGroup;
const { Flex, Space, Typography, message, Card, List, Tag, Button } = antd;
const { useState } = React;

// 基础用法 - Popconfirm 模式
const BasicExample = () => {
  const handleDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('删除成功');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">
        Popconfirm 模式（气泡确认框），适用于快速确认
      </Typography.Text>
      <Space>
        <ConfirmButton message="确定要删除吗？" onClick={handleDelete}>
          删除
        </ConfirmButton>
        <ConfirmButton message="确定要提交吗？" onClick={handleDelete}>
          提交
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// Modal 模式
const ModalExample = () => {
  const handleSubmit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('提交成功');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">
        Modal 模式（模态框），适用于重要操作或长内容提示
      </Typography.Text>
      <Space>
        <ConfirmButton
          isModal
          message="此操作将永久删除该数据，删除后无法恢复。确定要继续吗？"
          onClick={handleSubmit}
        >
          删除数据
        </ConfirmButton>
        <ConfirmButton
          isModal
          title="提交确认"
          message="提交后数据将进入审核流程，确认要提交吗？"
          onClick={handleSubmit}
        >
          提交审核
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// 危险操作样式
const DangerExample = () => {
  const handleDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('已删除');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">
        使用 isDelete 标识危险操作（红色按钮）
      </Typography.Text>
      <Space>
        <ConfirmButton
          danger
          message="确定删除吗？"
          onClick={handleDelete}
        >
          普通按钮
        </ConfirmButton>
        <ConfirmButton
          isDelete
          message="确定删除吗？"
          onClick={handleDelete}
        >
          删除按钮
        </ConfirmButton>
        <ConfirmButton
          isDelete
          isModal
          message="此操作无法撤销，确定要继续吗？"
          onClick={handleDelete}
        >
          删除（Modal）
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// 自定义确认文案
const CustomTextExample = () => {
  const handleAction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('操作完成');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">自定义确认和取消按钮文案</Typography.Text>
      <Space>
        <ConfirmButton
          message="确定要执行此操作吗？"
          okText="确认执行"
          cancelText="暂不执行"
          onClick={handleAction}
        >
          自定义文案
        </ConfirmButton>
        <ConfirmButton
          isModal
          title="操作确认"
          message="请确认是否继续执行此操作"
          okText="是，继续"
          cancelText="否，取消"
          onClick={handleAction}
        >
          Modal 自定义文案
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// ConfirmLink 和 ConfirmText
const LinkAndTextExample = () => {
  const handleAction = () => {
    message.success('操作成功');
    return Promise.resolve();
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text type="secondary">
        ConfirmLink 和 ConfirmText 变体，适用于表格行操作等场景
      </Typography.Text>
      <List
        bordered
        style={{ width: 400 }}
        dataSource={[
          { id: 1, name: '数据项 A', status: '已提交' },
          { id: 2, name: '数据项 B', status: '草稿' },
          { id: 3, name: '数据项 C', status: '已审核' }
        ]}
        renderItem={(item) => (
          <List.Item
            actions={[
              <ConfirmLink key="edit" message="确定编辑吗？" onClick={handleAction}>
                编辑
              </ConfirmLink>,
              <ConfirmLink key="delete" isDelete message="确定删除吗？" onClick={handleAction}>
                删除
              </ConfirmLink>
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={<Tag color={item.status === '已提交' ? 'blue' : 'default'}>{item.status}</Tag>}
            />
          </List.Item>
        )}
      />
      <Space>
        <ConfirmText onClick={handleAction}>纯文本确认</ConfirmText>
        <Typography.Text type="secondary">|</Typography.Text>
        <ConfirmText isDelete onClick={handleAction}>删除</ConfirmText>
      </Space>
    </Space>
  );
};

// 禁用状态
const DisabledExample = () => {
  const [disabled, setDisabled] = useState(true);
  const handleDelete = () => {
    message.success('已删除');
    return Promise.resolve();
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">禁用状态下不会触发确认</Typography.Text>
      <Space>
        <Button onClick={() => setDisabled(!disabled)}>
          {disabled ? '启用' : '禁用'}
        </Button>
      </Space>
      <Space>
        <ConfirmButton disabled={disabled} message="确定删除吗？" onClick={handleDelete}>
          删除
        </ConfirmButton>
        <ConfirmLink disabled={disabled} message="确定删除吗？" onClick={handleDelete}>
          删除
        </ConfirmLink>
      </Space>
    </Space>
  );
};

// 实际应用场景 - 表格操作
const TableActionExample = () => {
  const handleEdit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('进入编辑模式');
        resolve();
      }, 300);
    });
  };

  const handleDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('已删除');
        resolve();
      }, 300);
    });
  };

  const handleAudit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('审核通过');
        resolve();
      }, 300);
    });
  };

  return (
    <Card title="实际应用：表格操作栏" style={{ width: 500 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text type="secondary">
          模拟表格中的操作按钮，包含不同的确认方式
        </Typography.Text>
        <List
          bordered
          dataSource={[
            { id: 1, name: '产品 A', price: '¥99.00' },
            { id: 2, name: '产品 B', price: '¥199.00' }
          ]}
          renderItem={(item) => (
            <List.Item
              actions={[
                <ConfirmButton key="edit" type="link" message={&#96;确定编辑 ${item.name} 吗？&#96;} onClick={handleEdit}>
                  编辑
                </ConfirmButton>,
                <ConfirmButton key="audit" type="link" message={&#96;确定通过 ${item.name} 的审核吗？&#96;} onClick={handleAudit}>
                  审核
                </ConfirmButton>,
                <ConfirmButton
                  key="delete"
                  type="link"
                  danger
                  message={&#96;确定删除 ${item.name} 吗？此操作无法撤销。&#96;}
                  onClick={handleDelete}
                >
                  删除
                </ConfirmButton>
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={item.price}
              />
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
};

// 批量操作
const BatchExample = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const handleBatchDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success(&#96;已删除 ${selectedCount} 条数据&#96;);
        setSelectedCount(0);
        resolve();
      }, 500);
    });
  };

  return (
    <Card title="批量操作场景" style={{ width: 450 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Typography.Text type="secondary">已选择：</Typography.Text>
          <Typography.Text strong>{selectedCount} 项</Typography.Text>
          <Button size="small" onClick={() => setSelectedCount(Math.floor(Math.random() * 10))}>
            随机选择
          </Button>
        </Space>
        <Space>
          <ConfirmButton
            type="primary"
            disabled={selectedCount === 0}
            isModal
            title="批量删除确认"
            message={&#96;确定要删除选中的 ${selectedCount} 条数据吗？此操作无法撤销。&#96;}
            onClick={handleBatchDelete}
          >
            批量删除
          </ConfirmButton>
          <ConfirmButton
            disabled={selectedCount === 0}
            message={&#96;确定导出选中的 ${selectedCount} 条数据吗？&#96;}
            onClick={() => {
              message.success(&#96;正在导出 ${selectedCount} 条数据&#96;);
              return Promise.resolve();
            }}
          >
            导出
          </ConfirmButton>
        </Space>
      </Space>
    </Card>
  );
};

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={3}>ConfirmButton 确认按钮</Typography.Title>
      <Typography.Paragraph>
        ConfirmButton 提供确认功能，支持 Popconfirm（气泡确认框）和 Modal（模态框）两种模式。
        还提供 ConfirmLink 和 ConfirmText 变体，以及 withConfirm 高阶组件。
      </Typography.Paragraph>

      <Flex vertical gap={32}>
        <div>
          <Typography.Title level={4}>Popconfirm 模式</Typography.Title>
          <BasicExample />
        </div>

        <div>
          <Typography.Title level={4}>Modal 模式</Typography.Title>
          <ModalExample />
        </div>

        <div>
          <Typography.Title level={4}>危险操作样式</Typography.Title>
          <DangerExample />
        </div>

        <div>
          <Typography.Title level={4}>自定义文案</Typography.Title>
          <CustomTextExample />
        </div>

        <div>
          <Typography.Title level={4}>Link 和 Text 变体</Typography.Title>
          <LinkAndTextExample />
        </div>

        <div>
          <Typography.Title level={4}>禁用状态</Typography.Title>
          <DisabledExample />
        </div>

        <div>
          <Typography.Title level={4}>实际应用场景</Typography.Title>
          <TableActionExample />
        </div>

        <div>
          <Typography.Title level={4}>批量操作</Typography.Title>
          <BatchExample />
        </div>
      </Flex>
    </Space>
  );
};

render(<BaseExample />);

```

- FetchButton 请求按钮
- FetchButton 集成了数据请求功能，自动管理加载状态和请求流程。适用于按钮触发 API 请求的场景。
- _ButtonGroup(@kne/button-group)[import * as _ButtonGroup from "@kne/button-group"],(@kne/button-group/dist/index.css),antd(antd)

```jsx
const { FetchButton } = _ButtonGroup;
const { Space, Typography, message, Card, Alert, Form, Input, Select, Button, Flex } = antd;
const { useState } = React;

// 基础用法
const BasicExample = () => {
  const handleSuccess = ({ data }) => {
    message.success(&#96;获取数据成功: ${data}&#96;);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text type="secondary">
        点击按钮触发 API 请求，自动管理加载状态
      </Typography.Text>
      <FetchButton
        type="primary"
        api={{
          loader: async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ data: '用户信息数据' });
              }, 1500);
            });
          }
        }}
        onClick={handleSuccess}
      >
        获取用户信息
      </FetchButton>
    </Space>
  );
};

// 带参数请求
const WithParamsExample = () => {
  const [userId, setUserId] = useState('1');

  const handleSuccess = ({ data }) => {
    message.success(&#96;获取成功: ${JSON.stringify(data)}&#96;);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text type="secondary">传递参数到 API 请求</Typography.Text>
      <Space>
        <Select
          value={userId}
          onChange={setUserId}
          style={{ width: 120 }}
          options={[
            { value: '1', label: '用户1' },
            { value: '2', label: '用户2' },
            { value: '3', label: '用户3' }
          ]}
        />
        <FetchButton
          params={{ userId }}
          api={{
            loader: async ({ params }) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ data: { userId: params.userId, name: &#96;用户${params.userId}&#96;, role: '管理员' } });
                }, 1000);
              });
            }
          }}
          onClick={handleSuccess}
        >
          获取用户详情
        </FetchButton>
      </Space>
    </Space>
  );
};

// 成功和失败回调
const CallbackExample = () => {
  const [status, setStatus] = useState('');
  const [shouldFail, setShouldFail] = useState(false);

  const handleSuccess = ({ data }) => {
    setStatus('success');
    message.success('数据加载成功');
    console.log('成功数据:', data);
  };

  const handleError = (error) => {
    setStatus('error');
    message.error('数据加载失败');
    console.error('错误信息:', error);
  };

  return (
    <Card title="成功与失败回调" style={{ width: 450 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Button onClick={() => setShouldFail(!shouldFail)} size="small">
            {shouldFail ? '切换为成功' : '切换为失败'}
          </Button>
        </Space>
        <FetchButton
          type="primary"
          api={{
            loader: async () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (shouldFail) {
                    reject(new Error('模拟的请求失败'));
                  } else {
                    resolve({ data: { message: '请求成功', timestamp: Date.now() } });
                  }
                }, 1000);
              });
            }
          }}
          onSuccess={handleSuccess}
          onError={handleError}
        >
          {shouldFail ? '失败请求' : '成功请求'}
        </FetchButton>
        {status === 'success' && <Alert message="上次请求：成功" type="success" />}
        {status === 'error' && <Alert message="上次请求：失败" type="error" />}
      </Space>
    </Card>
  );
};

// 导出文件场景
const ExportExample = () => {
  const handleExport = ({ data }) => {
    message.success(&#96;导出成功: ${data.url}&#96;);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text type="secondary">模拟文件导出场景</Typography.Text>
      <Space>
        <FetchButton
          api={{
            loader: async () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ data: { url: '/download/report.xlsx', size: '2.5MB' } });
                }, 2000);
              });
            }
          }}
          onClick={handleExport}
        >
          导出报表
        </FetchButton>
        <FetchButton
          type="primary"
          api={{
            loader: async () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ data: { url: '/download/data.csv', size: '1.2MB' } });
                }, 1500);
              });
            }
          }}
          onClick={handleExport}
        >
          导出 CSV
        </FetchButton>
      </Space>
    </Space>
  );
};

// 表单提交场景
const FormSubmitExample = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = ({ data }) => {
    setSubmittedData(data);
    message.success('表单提交成功');
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // 使用 FetchButton 内部处理，这里只是演示
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      message.success('验证通过');
    } catch (error) {
      message.error('请检查表单内容');
    }
  };

  return (
    <Card title="表单提交场景" style={{ width: 450 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
        <Space>
          <FetchButton
            type="primary"
            api={{
              loader: async ({ params }) => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({ data: { id: 123, ...params, createTime: new Date().toISOString() } });
                  }, 1500);
                });
              }
            }}
            beforeFetch={() => {
              const values = form.getFieldsValue();
              if (!values.username || !values.email) {
                message.error('请填写完整信息');
                return false;
              }
              return true;
            }}
            onClick={handleSubmit}
          >
            提交表单
          </FetchButton>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
        {submittedData && (
          <Alert
            message="提交成功"
            description={JSON.stringify(submittedData, null, 2)}
            type="success"
          />
        )}
      </Space>
    </Card>
  );
};

// 刷新数据场景
const RefreshExample = () => {
  const [data, setData] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const handleRefresh = ({ data: newData }) => {
    console.log(newData);
    setData(newData);
    setLastRefresh(new Date().toLocaleTimeString());
    message.success('数据已更新');
  };

  return (
    <Card title="刷新数据场景" style={{ width: 450 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Typography.Text type="secondary">上次刷新：</Typography.Text>
          <Typography.Text>{lastRefresh || '从未刷新'}</Typography.Text>
        </Space>
        <FetchButton
          api={{
            loader: async () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve({
                    users: [
                      { id: 1, name: '用户A', status: '在线' },
                      { id: 2, name: '用户B', status: '离线' },
                      { id: 3, name: '用户C', status: '在线' }
                    ],
                    total: 3
                  });
                }, 1000);
              });
            }
          }}
          onClick={handleRefresh}
        >
          刷新数据
        </FetchButton>
        {data && (
          <Alert
            message={&#96;当前数据：${data.users?.length} 个用户在线&#96;}
            type="info"
          />
        )}
      </Space>
    </Card>
  );
};

// beforeFetch 拦截
const BeforeFetchExample = () => {
  const [allowed, setAllowed] = useState(true);

  const handleFetch = ({ data }) => {
    message.success('请求通过');
  };

  const beforeFetch = () => {
    if (!allowed) {
      message.warning('请求被 beforeFetch 拦截');
      return false;
    }
    return true;
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">beforeFetch 可以拦截请求</Typography.Text>
      <Space>
        <Button onClick={() => setAllowed(!allowed)} size="small">
          {allowed ? '拦截请求' : '允许请求'}
        </Button>
      </Space>
      <FetchButton
        api={{
          loader: async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ data: '请求成功' });
              }, 800);
            });
          }
        }}
        beforeFetch={beforeFetch}
        onClick={handleFetch}
      >
        {allowed ? '发送请求' : '请求已拦截'}
      </FetchButton>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={3}>FetchButton 请求按钮</Typography.Title>
      <Typography.Paragraph>
        FetchButton 集成了数据请求功能，基于 @kne/react-fetch 库实现。
        自动管理加载状态，支持成功/失败回调、参数传递、请求拦截等功能。
      </Typography.Paragraph>

      <Flex vertical gap={32}>
        <div>
          <Typography.Title level={4}>基础用法</Typography.Title>
          <BasicExample />
        </div>

        <div>
          <Typography.Title level={4}>带参数请求</Typography.Title>
          <WithParamsExample />
        </div>

        <div>
          <Typography.Title level={4}>成功与失败回调</Typography.Title>
          <CallbackExample />
        </div>

        <div>
          <Typography.Title level={4}>文件导出场景</Typography.Title>
          <ExportExample />
        </div>

        <div>
          <Typography.Title level={4}>表单提交场景</Typography.Title>
          <FormSubmitExample />
        </div>

        <div>
          <Typography.Title level={4}>刷新数据场景</Typography.Title>
          <RefreshExample />
        </div>

        <div>
          <Typography.Title level={4}>请求拦截</Typography.Title>
          <BeforeFetchExample />
        </div>
      </Flex>
    </Space>
  );
};

render(<BaseExample />);

```

- ButtonFooter 底部按钮区(全屏)
- ButtonFooter 是页面底部按钮区域组件。请切换到手机模式预览：移动端会将操作栏固定到可视区域底部。
- _ButtonGroup(@kne/button-group)[import * as _ButtonGroup from "@kne/button-group"],(@kne/button-group/dist/index.css),antd(antd)

```jsx
const { ButtonFooter } = _ButtonGroup;
const { Flex, Button, Card, Form, Input, Typography, Alert, message } = antd;

const BaseExample = () => {
  const [form] = Form.useForm();

  return (
    <Flex vertical gap={16} style={{ width: '100%', minHeight: 360 }}>
      <Alert
        type="info"
        showIcon
        message="请切换到手机模式预览"
        description="ButtonFooter 在移动端会将操作栏固定到底部。请点击示例预览工具栏中的「手机」图标，切换为手机模式后查看效果。"
      />
      <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
        桌面端按钮跟随文档流排列；移动端会将下方操作栏 Portal 到可视区域底部并固定显示。
      </Typography.Paragraph>
      <Card title="用户信息编辑" style={{ flex: 1 }}>
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="用户名">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="phone" label="手机号">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="department" label="部门">
            <Input placeholder="请输入部门" />
          </Form.Item>
          <Form.Item name="position" label="职位">
            <Input placeholder="请输入职位" />
          </Form.Item>
          <Form.Item name="company" label="公司">
            <Input placeholder="请输入公司名称" />
          </Form.Item>
          <Form.Item name="address" label="联系地址">
            <Input placeholder="请输入联系地址" />
          </Form.Item>
          <Form.Item name="emergencyContact" label="紧急联系人">
            <Input placeholder="请输入紧急联系人" />
          </Form.Item>
          <Form.Item name="emergencyPhone" label="紧急联系电话">
            <Input placeholder="请输入紧急联系电话" />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea placeholder="请输入备注" rows={6} />
          </Form.Item>
        </Form>
      </Card>
      <ButtonFooter>
        <Flex justify="flex-end" gap={8} style={{ padding: '16px 24px' }}>
          <Button onClick={() => form.resetFields()}>重置</Button>
          <Button type="primary" onClick={() => message.success('保存成功')}>
            保存
          </Button>
        </Flex>
      </ButtonFooter>
    </Flex>
  );
};

render(<BaseExample />);

```

### API

自适应按钮组组件，能够根据容器宽度自动调整显示的按钮数量，并将多余的按钮放入下拉菜单中。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| list | Array\<object \| function\> | [] | 按钮列表，可以是配置对象或渲染函数 |
| compact | boolean | false | 是否使用紧凑模式（Space.Compact） |
| showLength | number | - | 固定外露按钮数；传入后为受控模式，根节点宽度变为 fit-content |
| className | string | - | 根节点额外 className |
| more | ReactNode | - | 自定义"更多"按钮 |
| moreType | 'default' \| 'link' | 'default' | 更多按钮类型 |
| placement | string | 'bottomLeft' | 更多下拉菜单位置（antd Dropdown placement） |
| menuClassName | string | - | 更多下拉菜单额外 className |
| getPopupContainer | function | - | 下拉菜单渲染父节点 |
| trigger | string | - | 下拉菜单触发方式 |
| itemClassName | string | - | 按钮项的自定义类名 |
| ...SpaceProps | - | - | Space 组件的其他属性（size、split、align、style等） |

### list 配置项

当 list 项为对象时，支持以下属性：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 按钮内容 |
| type | string | - | 按钮类型（primary、default、dashed、link、text） |
| disabled | boolean | false | 是否禁用 |
| hidden | boolean | false | 是否隐藏 |
| confirm | boolean | false | 是否需要确认 |
| message | string \| ReactNode | - | 确认提示内容（设置后会自动使用 ConfirmButton） |
| isDelete | boolean | false | 是否为删除操作（红色按钮） |
| isModal | boolean | false | 是否使用模态框确认（在下拉菜单中自动启用） |
| buttonComponent | ReactComponent | - | 自定义按钮组件 |
| tooltipProps | object | - | Tooltip 组件属性（禁用时显示提示） |
| ...ButtonProps | - | - | Button 组件的其他属性 |

当 list 项为函数时，函数签名为：

```typescript
(props: { key: number; className: string }, context: { isDropdown: boolean }) => ReactNode
```

---

## LoadingButton

封装了加载状态的按钮组件，简化异步操作的处理。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| onClick | function \| Promise | - | 点击按钮时的回调函数，可以返回 Promise |
| loading | boolean | false | 是否显示加载状态 |
| disabled | boolean | false | 是否禁用按钮 |
| children | ReactNode \| function | - | 按钮内容，可以是函数接收 loading 状态 |
| ...ButtonProps | - | - | Button 组件的其他属性 |

### useLoading Hook

用于管理异步操作加载状态的 Hook。

#### 参数

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| callback | function | - | 异步回调函数 |

#### 返回值

| 名称 | 类型 | 说明 |
|------|------|------|
| isLoading | boolean | 当前加载状态 |
| setIsLoading | function | 设置加载状态的函数 |
| callback | function | 包装后的回调函数 |

---

## ConfirmButton

带有确认功能的按钮组件，支持弹窗确认和模态框确认两种模式。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 按钮内容 |
| onClick | function \| Promise | - | 确认后的回调函数，可以返回 Promise |
| title | string \| ReactNode | - | 确认框标题 |
| message | string \| ReactNode | - | 确认框内容 |
| okText | string | - | 确认按钮文字（默认根据 isDelete 动态显示） |
| cancelText | string | - | 取消按钮文字 |
| isModal | boolean | false | 是否使用模态框确认（默认为 Popconfirm） |
| isDelete | boolean | true | 是否为删除操作（红色按钮、确认按钮） |
| showCancel | boolean | true | 是否显示取消按钮 |
| placement | string | - | Popconfirm 的位置 |
| getContainer | function | - | 确认框渲染容器 |
| renderModal | function | - | 自定义 Modal 渲染函数 |
| onCancel | function | - | 取消按钮的回调 |
| ...ButtonProps | - | - | Button 组件的其他属性 |

### ConfirmLink

ConfirmButton 的链接样式变体。

### ConfirmText

ConfirmButton 的纯文本样式变体。

### withConfirm

高阶组件，用于为任意组件添加确认功能。

> ⚠️ 该 API 已标记为废弃，后续版本可能删除，建议不要使用。

---

## FetchButton

集成了数据请求功能的按钮组件，基于 @kne/react-fetch 库实现。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| api | object \| function | - | 请求 API 配置 |
| params | object | - | 请求参数 |
| onSuccess | function | - | 请求成功回调，参数为 `{ data }` |
| onError | function | - | 请求失败回调 |
| beforeFetch | function | - | 请求前处理函数，返回 false 可阻止请求 |
| afterFetch | function | - | 请求后处理函数 |
| fetchOptions | object | - | 传递给 fetch 函数的选项 |
| onClick | function | - | 请求成功后的回调（与 onSuccess 相同） |
| ...LoadingButtonProps | - | - | LoadingButton 组件的其他属性 |

### api 配置

api 可以是对象或函数：

```typescript
// 对象形式
api: {
  loader: async ({ params }) => {
    return { data: 'response data' };
  }
}

// 函数形式
api: async ({ params }) => {
  return { data: 'response data' };
}
```

---

## ButtonFooter

页面底部按钮区域组件，可以自动计算高度并设置 CSS 变量。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 按钮区域内容 |
| className | string | - | 容器的自定义类名 |
| innerClassName | string | - | 内部容器的自定义类名 |
| target | HTMLElement | document.body | 移动端渲染的目标容器 |

### 特性

- 在小屏幕（≤768px）下，会将内容使用 Portal 渲染到 body
- 自动计算高度并设置 CSS 变量
- 适用于固定在页面底部的操作按钮区域

# Common

### 概述

为组件库提供通用的组件、方法、hooks

#### 组件

1. **FetchButton** - Button触发加载数据，支持弹窗展示加载结果
2. **ScrollLoader** - 下拉滚动加载组件，配合 Fetch 实现分页加载
3. **SearchInput** - 提供防抖的查询输入框
4. **SimpleBarBox** - 自定义滚动条容器（已废弃，请勿使用）
5. **TreeField** - 树形选择组件，支持单选和多选
6. **CascaderField** - 级联选择组件，支持多级联动选择
7. **TypeDateRangePickerField** - 类型日期范围选择器，支持按日、周、月选择
8. **SuperSelectField** - 新版高级选择组件，提供更强的自定义能力
9. **SuperSelectUserField** - 用户选择组件，展示用户头像和描述
10. **SuperSelectTableListField** - 表格列表选择组件
11. **SuperSelectTreeField** - 树形选择组件
12. **AdvancedSelectField** - 高级选择组件，支持用户选择、列表选择
13. **UserField** - 用户选择组件（旧版）
14. **TableField** - 表格选择组件
15. **AddressSelectField** - 地址选择组件
16. **AddressInputField** - 地址输入组件
17. **AddressEnum** - 地址枚举展示
18. **FunctionSelectField** - 职能选择组件
19. **FunctionEnum** - 职能枚举展示
20. **IndustrySelectField** - 行业选择组件
21. **IndustryEnum** - 行业枚举展示

#### 方法

1. **changeMoneyToChinese** - 将金额转化为大写的人民币金额
2. **getPopupContainer** - 获取弹窗容器
3. **getContainerBody** - 获取 body 容器
4. **accept** - 文件类型验证
5. **createDeferred** - 创建延迟对象
6. **isNotEmpty** - 非空判断
7. **pxToNumber** - px 转数字
8. **numberToPx** - 数字转 px
9. **validateIDCard** - 身份证号验证

#### HOC (高阶组件)

1. **withInputFile** - 文件上传高阶组件
2. **useFileUpload** - 文件上传 Hook
3. **InputFileButton** - 文件上传按钮组件
4. **InputFileLink** - 文件上传链接组件
5. **InputFileText** - 文件上传文本组件
6. **withOSSFile** - OSS 文件上传高阶组件

#### Hooks

1. **useResize** - 监听元素尺寸变化
2. **usePreset** - 获取预设配置

#### 其他工具

1. **createTreeUtils** - 创建树形数据工具函数
2. **getScrollEl** - 获取滚动元素
3. **Scroller** - 横向滚动组件
4. **SelectInnerInput** - 内部选择输入框基础组件

### 示例

#### 示例样式

```scss
.scroll-list {
  max-height: 300px;
}
```

#### 示例代码

- FetchButton
- Button触发加载数据，加载数据后在弹窗中展示
- _Common(@components/Common),_Modal(@components/Modal),_antd(antd)

```jsx
const {FetchButton} = _Common;
const {Typography, App} = _antd;

const {useModal} = _Modal;

const BaseExample = () => {
    const modal = useModal();

    return (<FetchButton
        api={{
            loader: () => {
                return [{id: 1, name: "前端开发组", count: 8, description: "负责所有前端页面开发"}, {
                    id: 2,
                    name: "后端开发组",
                    count: 12,
                    description: "负责 API 和服务器开发"
                }, {id: 3, name: "测试组", count: 5, description: "负责功能测试和质量保证"}, {
                    id: 4,
                    name: "运维组",
                    count: 3,
                    description: "负责系统部署和维护"
                },];
            },
        }}
        modalProps={(contextProps) => {
            const {data, fetchApi} = contextProps;
            return {
                title: "团队信息", children: (<div>
                    <Typography.Paragraph>当前项目团队构成：</Typography.Paragraph>
                    {data.map((item) => (<div key={item.id} style={{marginBottom: 16}}>
                        <Typography.Text strong style={{fontSize: 15}}>
                            {item.name}
                        </Typography.Text>
                        <div style={{marginTop: 4, color: '#666'}}>
                            <Typography.Text>人数：{item.count} 人</Typography.Text>
                            <Typography.Text style={{marginLeft: 16}}>
                                说明：{item.description}
                            </Typography.Text>
                        </div>
                    </div>))}
                </div>),
            };
        }}
        modalFunc={modal}
    >
        查看团队信息
    </FetchButton>);
};

render(<BaseExample/>);

```

- Enum
- 枚举展示组件，展示地址、职能、行业等枚举信息
- _Common(@components/Common),_antd(antd)

```jsx
const Common = _Common;
const { Space } = _antd;

const { AddressEnum, FunctionEnum, IndustryEnum } = Common;

const BaseExample = () => {
  return (
    <Space direction={"vertical"}>
      <AddressEnum name={"010"} />
      <FunctionEnum name={"010"} />
      <IndustryEnum name={"010"} />
    </Space>
  );
};

render(<BaseExample />);

```

- ScrollLoader
- 下拉滚动加载组件，配合 Fetch 实现分页加载
- _Common(@components/Common),_reactFetch(@kne/react-fetch),lodash(lodash),_antd(antd)

```jsx
const { get, merge, range } = lodash;
const { ScrollLoader } = _Common;
const { default: Fetch } = _reactFetch;
const { Card, List, Avatar, Typography, Space, Tag } = _antd;

const BaseExample = () => {
  const mockUsers = [
    { name: "张三", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang", role: "产品经理" },
    { name: "李四", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=li", role: "UI设计师" },
    { name: "王五", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang", role: "前端开发" },
    { name: "赵六", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao", role: "后端开发" },
    { name: "孙七", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sun", role: "测试工程师" },
    { name: "周八", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhou", role: "运维工程师" },
  ];

  const mockComments = [
    "这个功能很实用，期待上线！",
    "界面设计简洁美观，用户体验不错。",
    "建议增加批量操作功能。",
    "加载速度很快，性能很好。",
    "文档清晰，上手容易。",
  ];

  return (
    <Card title="团队评论列表" style={{ maxWidth: 600 }}>
      <Fetch
        loader={({ data }) => {
          const params = Object.assign(
            {
              perPage: 10,
              currentPage: 1,
            },
            data
          );
          return new Promise((resolve) => {
            const start = (params.currentPage - 1) * params.perPage;
            setTimeout(() => {
              resolve({
                totalCount: 50,
                pageData: range(start, start + params.perPage).map((key) => {
                  const user = mockUsers[key % mockUsers.length];
                  const comment = mockComments[key % mockComments.length];
                  const hours = Math.floor(key / 3);
                  return {
                    id: key + 1,
                    user: user.name,
                    avatar: user.avatar,
                    role: user.role,
                    content: comment,
                    time: &#96;${hours}小时前&#96;,
                    likes: Math.floor(Math.random() * 50) + 1,
                  };
                }),
              });
            }, 500);
          });
        }}
        render={(fetchApi) => {
          const pagination = {
            paramsType: "data",
            current: "currentPage",
            pageSize: "perPage",
            defaultPageSize: 10,
          };
          const current = get(
              fetchApi.requestParams,
              [pagination.paramsType, pagination.current],
              1
            ),
            pageSize =
              get(fetchApi.requestParams, [
                pagination.paramsType,
                pagination.pageSize,
              ]) || pagination.defaultPageSize;

          const formatData = {
            list: fetchApi.data.pageData || [],
            total: fetchApi.data.totalCount || 0,
          };
          return (
            <ScrollLoader
              completeTips=""
              className="scroll-list"
              isLoading={!fetchApi.isComplete}
              noMore={!formatData.total || current * pageSize >= formatData.total}
              onLoader={async () => {
                await fetchApi.loadMore(
                  merge({
                    data: {
                      [pagination.pageSize]: pageSize,
                      [pagination.current]: current + 1,
                    },
                  }),
                  (data, newData) => {
                    return Object.assign({}, newData, {
                      pageData: data.pageData.concat(newData.pageData),
                    });
                  }
                );
              }}
            >
              <List
                dataSource={formatData.list}
                renderItem={(item) => (
                  <List.Item style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={
                        <Space>
                          <Typography.Text strong>{item.user}</Typography.Text>
                          <Tag color="blue" style={{ fontSize: 12 }}>{item.role}</Tag>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Typography.Text>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={4}>
                          <Typography.Text>{item.content}</Typography.Text>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                            👍 {item.likes} 人赞同
                          </Typography.Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </ScrollLoader>
          );
        }}
      />
    </Card>
  );
};

render(<BaseExample />);

```

- SearchInput
- 提供防抖的查询输入框组件
- _Common(@components/Common)

```jsx
const Common = _Common;

const { SearchInput } = Common;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onSearch={(value) => {
        setValue(value);
        console.log(value);
      }}
    />
  );
};

render(<BaseExample />);

```

- AdvancedSelect
- 高级选择组件，支持用户选择、列表选择等功能
- _Common(@components/Common),_antd(antd)

```jsx
const { UserField } = _Common;
const { Space, Typography } = _antd;

const BaseExample = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text>
        已选择 {value.length} 人
      </Typography.Text>
      <UserField
        value={value}
        onChange={setValue}
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        allowSelectAll
        showSelectedCount
        countUnit="人"
        allLabel="所有人"
        placeholder="选择团队成员"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "张三",
                  value: 1,
                  avatar: "avatar-001",
                  description: "前端工程师",
                },
                {
                  label: "李四",
                  value: 2,
                  avatar: "avatar-002",
                  description: "后端工程师",
                },
                {
                  label: "王五",
                  value: 3,
                  avatar: "avatar-003",
                  description: "产品经理",
                },
                {
                  label: "赵六",
                  value: 4,
                  avatar: "avatar-004",
                  description: "UI设计师",
                },
                {
                  label: "钱七",
                  value: 5,
                  avatar: "avatar-005",
                  description: "测试工程师",
                },
              ],
            };
          },
        }}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- SuperSelect
- 新版高级选择组件，提供更强的自定义能力
- _Common(@components/Common),_antd(antd)

```jsx
const { SuperSelectField, SuperSelectTableListField, SuperSelectUserField } = _Common;
const { Space, Typography } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [userValue, setUserValue] = useState([]);
  const [deptValue, setDeptValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>用户选择</Typography.Text>
      <SuperSelectUserField
        value={userValue}
        onChange={setUserValue}
        allowSelectedAll
        placeholder="选择用户"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "张三",
                  value: 1,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang" },
                  description: "高级前端工程师",
                },
                {
                  label: "李四",
                  value: 2,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=li" },
                  description: "资深后端工程师",
                },
                {
                  label: "王五",
                  value: 3,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang" },
                  description: "产品经理",
                },
                {
                  label: "赵六",
                  value: 4,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao" },
                  description: "UI设计师",
                },
                {
                  label: "钱七",
                  value: 5,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=qian" },
                  description: "测试工程师",
                },
              ],
            };
          },
        }}
      />

      <Typography.Text strong>部门选择</Typography.Text>
      <SuperSelectField
        isPopup={false}
        value={deptValue}
        onChange={setDeptValue}
        allowSelectedAll
        placeholder="选择部门"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "技术部",
                  value: "tech",
                  description: "负责产品技术实现",
                },
                {
                  label: "产品部",
                  value: "product",
                  description: "负责产品规划和设计",
                },
                {
                  label: "设计部",
                  value: "design",
                  description: "负责 UI/UX 设计",
                },
                {
                  label: "市场部",
                  value: "marketing",
                  description: "负责市场推广和运营",
                },
              ],
            };
          },
        }}
      />

      <Typography.Text strong>项目列表选择</Typography.Text>
      <SuperSelectTableListField
        isPopup={false}
        labelKey="name"
        valueKey="id"
        placeholder="选择项目"
        getSearchCallback={(searchProps, item, contextProps) => {
          const { props } = contextProps;
          const { labelKey } = props;
          if (!searchProps.searchText) {
            return true;
          }
          return item[labelKey].indexOf(searchProps.searchText) > -1;
        }}
        options={[
          { id: 1, name: "电商平台", count: 15, description: "在线购物平台", disabled: false },
          { id: 2, name: "OA系统", count: 8, description: "办公自动化系统", disabled: true },
          { id: 3, name: "CRM系统", count: 10, description: "客户关系管理", disabled: false },
          { id: 4, name: "数据大屏", count: 5, description: "数据可视化展示", disabled: false },
          { id: 5, name: "移动APP", count: 12, description: "移动端应用", disabled: false },
          { id: 6, name: "小程序", count: 6, description: "微信小程序", disabled: false },
        ]}
        columns={[
          {
            name: "name",
            title: "项目名称",
            span: 8,
          },
          {
            name: "count",
            title: "团队人数",
            span: 8,
          },
          {
            name: "description",
            title: "项目描述",
            span: 8,
          },
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- TreeField
- 树形选择组件，支持单选和多选
- _Common(@components/Common),_antd(antd)

```jsx
const { TreeField } = _Common;
const { Space, Typography, Button } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>组织架构选择（多选）</Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        已选择: {value.length} 个部门
      </Typography.Text>
      <TreeField
        api={{
          loader: () => {
            return [
              {
                key: 'tech',
                title: '技术部',
                children: [
                  {
                    key: 'frontend',
                    title: '前端组',
                    children: [
                      { key: 'fe-web', title: 'Web前端' },
                      { key: 'fe-mobile', title: '移动端' },
                    ],
                  },
                  {
                    key: 'backend',
                    title: '后端组',
                    children: [
                      { key: 'be-java', title: 'Java后端' },
                      { key: 'be-node', title: 'Node.js后端' },
                    ],
                  },
                ],
              },
              {
                key: 'product',
                title: '产品部',
                children: [
                  { key: 'pm-web', title: 'Web产品' },
                  { key: 'pm-mobile', title: '移动产品' },
                ],
              },
              {
                key: 'design',
                title: '设计部',
                children: [
                  { key: 'ui', title: 'UI设计' },
                  { key: 'ux', title: 'UX设计' },
                ],
              },
              {
                key: 'marketing',
                title: '市场部',
                children: [
                  { key: 'market', title: '市场推广' },
                  { key: 'operation', title: '运营' },
                ],
              },
            ];
          },
        }}
        value={value}
        onChange={setValue}
        placeholder="请选择部门"
        single={false}
      />
      <Button onClick={() => setValue([])}>清空选择</Button>
    </Space>
  );
};

render(<BaseExample />);

```

- CascaderField
- 级联选择组件，支持多级联动选择
- _Common(@components/Common),_antd(antd)

```jsx
const { CascaderField } = _Common;
const { Space, Typography, Button } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>省市区级联选择（最多3个）</Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        已选择: {value.length} 个区域
      </Typography.Text>
      <CascaderField
        api={{
          loader: () => {
            return [
              {
                id: 'zhejiang',
                label: '浙江省',
                children: [
                  {
                    id: 'hangzhou',
                    label: '杭州市',
                    children: [
                      { id: 'xihu', label: '西湖区' },
                      { id: 'gongshu', label: '拱墅区' },
                      { id: 'jianggan', label: '江干区' },
                      { id: 'binjiang', label: '滨江区' },
                    ],
                  },
                  {
                    id: 'ningbo',
                    label: '宁波市',
                    children: [
                      { id: 'haishu', label: '海曙区' },
                      { id: 'jiangbei', label: '江北区' },
                      { id: 'yinzhou', label: '鄞州区' },
                    ],
                  },
                ],
              },
              {
                id: 'jiangsu',
                label: '江苏省',
                children: [
                  {
                    id: 'nanjing',
                    label: '南京市',
                    children: [
                      { id: 'xuanwu', label: '玄武区' },
                      { id: 'jianye', label: '建邺区' },
                      { id: 'gulou', label: '鼓楼区' },
                    ],
                  },
                  {
                    id: 'suzhou',
                    label: '苏州市',
                    children: [
                      { id: 'gusu', label: '姑苏区' },
                      { id: 'wuzhong', label: '吴中区' },
                    ],
                  },
                ],
              },
              {
                id: 'guangdong',
                label: '广东省',
                children: [
                  {
                    id: 'guangzhou',
                    label: '广州市',
                    children: [
                      { id: 'yuexiu', label: '越秀区' },
                      { id: 'tianhe', label: '天河区' },
                      { id: 'baiyun', label: '白云区' },
                    ],
                  },
                  {
                    id: 'shenzhen',
                    label: '深圳市',
                    children: [
                      { id: 'futian', label: '福田区' },
                      { id: 'nanshan', label: '南山区' },
                      { id: 'baoan', label: '宝安区' },
                    ],
                  },
                ],
              },
            ];
          },
        }}
        value={value}
        onChange={setValue}
        placeholder="请选择省市区"
        maxLength={3}
        isPopup={true}
      />
      <Button onClick={() => setValue([])}>清空选择</Button>
    </Space>
  );
};

render(<BaseExample />);

```

- TypeDateRangePicker
- 类型日期范围选择器，支持按日、周、月选择
- _Common(@components/Common),_antd(antd)

```jsx
const { TypeDateRangePickerField } = _Common;
const { Space, Typography } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState({
    type: 'date',
    value: [],
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text>当前值: {JSON.stringify(value)}</Typography.Text>
      <TypeDateRangePickerField
        value={value}
        onChange={setValue}
        placeholder={['开始日期', '结束日期']}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- InputFile
- 文件上传组件，支持按钮、链接、文本等多种形式
- _Common(@components/Common),_antd(antd)

```jsx
const { InputFileButton, InputFileLink, InputFileText } = _Common;
const { Space, Typography, message, Alert } = _antd;

const BaseExample = () => {
  const handleFileChange = (file) => {
    console.log('选择的文件:', file);
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
    message.success(&#96;已选择文件: ${file.name} (${sizeInMB}MB)&#96;);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>文件上传组件示例</Typography.Text>
      <Alert
        message="支持上传图片（JPG、PNG）和 PDF 文档，单个文件不超过 10MB"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Typography.Text>按钮形式上传：</Typography.Text>
      <InputFileButton
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        点击上传文件
      </InputFileButton>

      <Typography.Text style={{ marginTop: 8 }}>链接形式上传：</Typography.Text>
      <InputFileLink
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        选择要上传的文件
      </InputFileLink>

      <Typography.Text style={{ marginTop: 8 }}>文本形式上传：</Typography.Text>
      <InputFileText
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        浏览文件
      </InputFileText>
    </Space>
  );
};

render(<BaseExample />);

```

- changeMoneyToChinese
- 金额转大写中文工具函数
- _Common(@components/Common),_antd(antd)

```jsx
const { changeMoneyToChinese } = _Common;
const { Space, Typography, Input, Button, Card } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [amount, setAmount] = useState('');
  const chineseAmount = changeMoneyToChinese(amount);

  return (
    <Space direction="vertical" style={{ width: '400px' }}>
      <Typography.Text strong style={{ fontSize: 16 }}>
        金额转大写中文
      </Typography.Text>
      <Input
        placeholder="请输入金额"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        prefix="¥"
        size="large"
        addonAfter="元"
      />
      <Card size="small" style={{ marginTop: 8 }}>
        <Typography.Text strong style={{ fontSize: 14 }}>
          大写金额：
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginLeft: 8,
            color: '#1890ff'
          }}
        >
          {chineseAmount || '等待输入...'}
        </Typography.Text>
      </Card>
      <Space wrap>
        <Button onClick={() => setAmount('123456.78')}>
          常用金额：123,456.78
        </Button>
        <Button onClick={() => setAmount('10000')}>
          整数：10,000
        </Button>
        <Button onClick={() => setAmount('0')}>
          零值：0
        </Button>
        <Button onClick={() => setAmount('')}>
          清空
        </Button>
      </Space>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        * 最大支持金额：999,999,999,999,999.999999
      </Typography.Text>
    </Space>
  );
};

render(<BaseExample />);

```

### API

#### FetchButton

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象，包含loader等接口方法 | `{ loader: Function }` | - |
| modalProps | 弹窗属性配置函数，接收 contextProps 参数 | `(contextProps) => ModalProps` | - |
| modalFunc | 弹窗功能函数，接收 modalApi 参数 | `(modalApi) => void` | - |
| onError | 错误处理函数 | `(error) => void` | - |
| ...ButtonProps | 继承 Button 组件所有属性 | - | - |

#### ScrollLoader

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isLoading | 是否正在加载 | `boolean` | false |
| noMore | 是否已加载完毕 | `boolean` | false |
| onLoader | 加载更多回调函数 | `() => Promise<void>` | - |
| completeTips | 完成提示文本 | `string` | "没有更多了" |
| className | 样式类名 | `string` | - |
| children | 子元素 | `ReactNode` | - |

#### SearchInput

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入框值 | `string` | - |
| onSearch | 搜索回调函数，已防抖 | `(value: string) => void` | - |
| debounce | 防抖延迟时间（毫秒） | `number` | 500 |
| placeholder | 占位符 | `string` | "请输入" |
| isPopup | 是否在弹窗中使用 | `boolean` | false |
| ...InputProps | 继承 Input.Search 组件所有属性 | - | - |

#### TreeField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: Array<any>) => void` | - |
| fieldNames | 字段名称映射 | `{ key, title, children }` | - |
| placeholder | 占位符 | `string` | "请选择" |
| single | 是否单选 | `boolean` | false |
| maxLength | 最大选择数量 | `number` | MAX_VALUE |
| isPopup | 是否弹窗展示 | `boolean` | true |
| checkStrictly | 父子节点是否不关联 | `boolean` | false |
| searchPlaceholder | 搜索框占位符 | `string` | "搜索" |

#### CascaderField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: Array<any>) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| maxLength | 最大选择数量 | `number` | MAX_VALUE |
| isPopup | 是否弹窗展示 | `boolean` | true |
| overlayWidth | 弹窗宽度 | `string` | "460px" |
| menuItemWidth | 菜单项宽度 | `string` | "180px" |
| openLoadData | 是否开启懒加载 | `boolean` | false |
| onlyAllowLastLevel | 是否只允许选择最后一级 | `boolean` | false |
| parentIdKey | 父级ID字段名 | `string` | "id" |
| selectLevel | 选择层级 | `number` | - |
| searchPlaceholder | 搜索框占位符 | `string` | "搜索" |
| onSearch | 搜索回调函数 | `(text: string, options) => Array` | - |
| dataFormat | 数据格式化函数 | `(data) => object` | - |
| nodeFormat | 节点格式化函数 | `(node) => object` | - |

#### TypeDateRangePickerField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值，格式为 `{ type: string, value: [Date, Date] }` | `object` | - |
| onChange | 变化回调 | `(value: object) => void` | - |
| placeholder | 占位符数组 | `[string, string]` | - |
| ...RangePickerProps | 继承 DatePicker.RangePicker 组件所有属性 | - | - |

#### SuperSelectField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectedAll | 是否允许全选 | `boolean` | false |
| isPopup | 是否弹窗展示 | `boolean` | true |
| showSelectedTag | 是否显示已选中标签 | `boolean` | true |
| onConfirm | 确认回调 | `(value) => void` | - |

#### SuperSelectUserField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择用户" |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectedAll | 是否允许全选 | `boolean` | false |
| labelKey | 标签字段名 | `string` | "label" |
| avatarKey | 头像字段名 | `string` | "avatar" |
| descriptionKey | 描述字段名 | `string` | "description" |

#### SuperSelectTableListField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数据数组 | `Array<object>` | - |
| columns | 表格列配置 | `Array<object>` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| labelKey | 标签字段名 | `string` | - |
| valueKey | 值字段名 | `string` | - |
| isPopup | 是否弹窗展示 | `boolean` | true |
| getSearchCallback | 搜索回调函数 | `(searchProps, item, contextProps) => boolean` | - |

#### SuperSelectTreeField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| ...TreeProps | 继承 Tree 组件所有属性 | - | - |

#### AdvancedSelectField

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| value | 当前选中的值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| placeholder | 占位符 | `string` | "请选择" |
| allowSelectAll | 是否允许全选 | `boolean` | false |
| showSelectedCount | 是否显示选中数量 | `boolean` | false |
| countUnit | 数量单位 | `string` | "个" |
| allLabel | 全选项标签 | `string` | "全部" |
| showSelectedTag | 是否显示选中标签 | `boolean` | true |
| single | 是否单选 | `boolean` | false |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |

#### UserField (AdvancedSelect)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | API配置对象 | `{ loader: Function }` | - |
| defaultValue | 默认值 | `Array<any>` | - |
| onChange | 变化回调 | `(value: any) => void` | - |
| getSearchProps | 获取搜索属性 | `(text: string) => object` | - |
| allowSelectAll | 是否允许全选 | `boolean` | false |
| showSelectedCount | 是否显示选中数量 | `boolean` | false |
| countUnit | 数量单位 | `string` | "人" |
| allLabel | 全选项标签 | `string` | "所有人" |
| showSelectedTag | 是否显示选中标签 | `boolean` | true |

#### AddressEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 地址编码 | `string` | - |

#### FunctionEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 职能编码 | `string` | - |

#### IndustryEnum

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 行业编码 | `string` | - |

#### InputFileButton / InputFileLink / InputFileText

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受的文件类型 | `string` | - |
| multiple | 是否多选 | `boolean` | false |
| onChange | 文件选择回调 | `(file: File) => void` | - |
| ...TypographyProps | 继承 Typography 组件所有属性 | - | - |

#### changeMoneyToChinese

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| money | 金额数值 | `number \| string` |

| 返回值 | 说明 | 类型 |
| --- | --- | --- |
| chineseStr | 大写金额字符串 | `string` |

最大处理数字：999999999999999.999999

# ConfirmButton

### 概述

ConfirmButton 从 `@kne/button-group` 重新导出，提供带确认功能的按钮组件，支持 Popconfirm 与 Modal 两种确认模式，并包含 `ConfirmLink`、`ConfirmText`、`withConfirm` 等能力。

本组件文档仅展示常用示例。完整概述、使用说明与 API 请前往 **ButtonGroup** 组件文档查看。


### 示例

#### 示例代码

- ConfirmButton 确认按钮
- ConfirmButton 带有确认功能，支持弹窗确认和模态框确认两种模式。适用于删除、提交等重要操作。
- _ButtonGroup(@kne/button-group)[import * as _ButtonGroup from "@kne/button-group"],antd(antd)

```jsx
const { ConfirmButton, ConfirmLink, ConfirmText } = _ButtonGroup;
const { Flex, Space, Typography, message, Card, List, Tag, Button } = antd;
const { useState } = React;

// 基础用法 - Popconfirm 模式
const BasicExample = () => {
  const handleDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('删除成功');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">
        Popconfirm 模式（气泡确认框），适用于快速确认
      </Typography.Text>
      <Space>
        <ConfirmButton message="确定要删除吗？" onClick={handleDelete}>
          删除
        </ConfirmButton>
        <ConfirmButton message="确定要提交吗？" onClick={handleDelete}>
          提交
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// Modal 模式
const ModalExample = () => {
  const handleSubmit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('提交成功');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">
        Modal 模式（模态框），适用于重要操作或长内容提示
      </Typography.Text>
      <Space>
        <ConfirmButton
          isModal
          message="此操作将永久删除该数据，删除后无法恢复。确定要继续吗？"
          onClick={handleSubmit}
        >
          删除数据
        </ConfirmButton>
        <ConfirmButton
          isModal
          title="提交确认"
          message="提交后数据将进入审核流程，确认要提交吗？"
          onClick={handleSubmit}
        >
          提交审核
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// 危险操作样式
const DangerExample = () => {
  const handleDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('已删除');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">
        使用 isDelete 标识危险操作（红色按钮）
      </Typography.Text>
      <Space>
        <ConfirmButton
          danger
          message="确定删除吗？"
          onClick={handleDelete}
        >
          普通按钮
        </ConfirmButton>
        <ConfirmButton
          isDelete
          message="确定删除吗？"
          onClick={handleDelete}
        >
          删除按钮
        </ConfirmButton>
        <ConfirmButton
          isDelete
          isModal
          message="此操作无法撤销，确定要继续吗？"
          onClick={handleDelete}
        >
          删除（Modal）
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// 自定义确认文案
const CustomTextExample = () => {
  const handleAction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('操作完成');
        resolve();
      }, 500);
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">自定义确认和取消按钮文案</Typography.Text>
      <Space>
        <ConfirmButton
          message="确定要执行此操作吗？"
          okText="确认执行"
          cancelText="暂不执行"
          onClick={handleAction}
        >
          自定义文案
        </ConfirmButton>
        <ConfirmButton
          isModal
          title="操作确认"
          message="请确认是否继续执行此操作"
          okText="是，继续"
          cancelText="否，取消"
          onClick={handleAction}
        >
          Modal 自定义文案
        </ConfirmButton>
      </Space>
    </Space>
  );
};

// ConfirmLink 和 ConfirmText
const LinkAndTextExample = () => {
  const handleAction = () => {
    message.success('操作成功');
    return Promise.resolve();
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text type="secondary">
        ConfirmLink 和 ConfirmText 变体，适用于表格行操作等场景
      </Typography.Text>
      <List
        bordered
        style={{ width: 400 }}
        dataSource={[
          { id: 1, name: '数据项 A', status: '已提交' },
          { id: 2, name: '数据项 B', status: '草稿' },
          { id: 3, name: '数据项 C', status: '已审核' }
        ]}
        renderItem={(item) => (
          <List.Item
            actions={[
              <ConfirmLink key="edit" message="确定编辑吗？" onClick={handleAction}>
                编辑
              </ConfirmLink>,
              <ConfirmLink key="delete" isDelete message="确定删除吗？" onClick={handleAction}>
                删除
              </ConfirmLink>
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={<Tag color={item.status === '已提交' ? 'blue' : 'default'}>{item.status}</Tag>}
            />
          </List.Item>
        )}
      />
      <Space>
        <ConfirmText onClick={handleAction}>纯文本确认</ConfirmText>
        <Typography.Text type="secondary">|</Typography.Text>
        <ConfirmText isDelete onClick={handleAction}>删除</ConfirmText>
      </Space>
    </Space>
  );
};

// 禁用状态
const DisabledExample = () => {
  const [disabled, setDisabled] = useState(true);
  const handleDelete = () => {
    message.success('已删除');
    return Promise.resolve();
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">禁用状态下不会触发确认</Typography.Text>
      <Space>
        <Button onClick={() => setDisabled(!disabled)}>
          {disabled ? '启用' : '禁用'}
        </Button>
      </Space>
      <Space>
        <ConfirmButton disabled={disabled} message="确定删除吗？" onClick={handleDelete}>
          删除
        </ConfirmButton>
        <ConfirmLink disabled={disabled} message="确定删除吗？" onClick={handleDelete}>
          删除
        </ConfirmLink>
      </Space>
    </Space>
  );
};

// 实际应用场景 - 表格操作
const TableActionExample = () => {
  const handleEdit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('进入编辑模式');
        resolve();
      }, 300);
    });
  };

  const handleDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('已删除');
        resolve();
      }, 300);
    });
  };

  const handleAudit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('审核通过');
        resolve();
      }, 300);
    });
  };

  return (
    <Card title="实际应用：表格操作栏" style={{ width: 500 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text type="secondary">
          模拟表格中的操作按钮，包含不同的确认方式
        </Typography.Text>
        <List
          bordered
          dataSource={[
            { id: 1, name: '产品 A', price: '¥99.00' },
            { id: 2, name: '产品 B', price: '¥199.00' }
          ]}
          renderItem={(item) => (
            <List.Item
              actions={[
                <ConfirmButton key="edit" type="link" message={&#96;确定编辑 ${item.name} 吗？&#96;} onClick={handleEdit}>
                  编辑
                </ConfirmButton>,
                <ConfirmButton key="audit" type="link" message={&#96;确定通过 ${item.name} 的审核吗？&#96;} onClick={handleAudit}>
                  审核
                </ConfirmButton>,
                <ConfirmButton
                  key="delete"
                  type="link"
                  danger
                  message={&#96;确定删除 ${item.name} 吗？此操作无法撤销。&#96;}
                  onClick={handleDelete}
                >
                  删除
                </ConfirmButton>
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={item.price}
              />
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
};

// 批量操作
const BatchExample = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const handleBatchDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success(&#96;已删除 ${selectedCount} 条数据&#96;);
        setSelectedCount(0);
        resolve();
      }, 500);
    });
  };

  return (
    <Card title="批量操作场景" style={{ width: 450 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Typography.Text type="secondary">已选择：</Typography.Text>
          <Typography.Text strong>{selectedCount} 项</Typography.Text>
          <Button size="small" onClick={() => setSelectedCount(Math.floor(Math.random() * 10))}>
            随机选择
          </Button>
        </Space>
        <Space>
          <ConfirmButton
            type="primary"
            disabled={selectedCount === 0}
            isModal
            title="批量删除确认"
            message={&#96;确定要删除选中的 ${selectedCount} 条数据吗？此操作无法撤销。&#96;}
            onClick={handleBatchDelete}
          >
            批量删除
          </ConfirmButton>
          <ConfirmButton
            disabled={selectedCount === 0}
            message={&#96;确定导出选中的 ${selectedCount} 条数据吗？&#96;}
            onClick={() => {
              message.success(&#96;正在导出 ${selectedCount} 条数据&#96;);
              return Promise.resolve();
            }}
          >
            导出
          </ConfirmButton>
        </Space>
      </Space>
    </Card>
  );
};

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={3}>ConfirmButton 确认按钮</Typography.Title>
      <Typography.Paragraph>
        ConfirmButton 提供确认功能，支持 Popconfirm（气泡确认框）和 Modal（模态框）两种模式。
        还提供 ConfirmLink 和 ConfirmText 变体，以及 withConfirm 高阶组件。
      </Typography.Paragraph>

      <Flex vertical gap={32}>
        <div>
          <Typography.Title level={4}>Popconfirm 模式</Typography.Title>
          <BasicExample />
        </div>

        <div>
          <Typography.Title level={4}>Modal 模式</Typography.Title>
          <ModalExample />
        </div>

        <div>
          <Typography.Title level={4}>危险操作样式</Typography.Title>
          <DangerExample />
        </div>

        <div>
          <Typography.Title level={4}>自定义文案</Typography.Title>
          <CustomTextExample />
        </div>

        <div>
          <Typography.Title level={4}>Link 和 Text 变体</Typography.Title>
          <LinkAndTextExample />
        </div>

        <div>
          <Typography.Title level={4}>禁用状态</Typography.Title>
          <DisabledExample />
        </div>

        <div>
          <Typography.Title level={4}>实际应用场景</Typography.Title>
          <TableActionExample />
        </div>

        <div>
          <Typography.Title level={4}>批量操作</Typography.Title>
          <BatchExample />
        </div>
      </Flex>
    </Space>
  );
};

render(<BaseExample />);


```

### API

ConfirmButton 的 API 与 `@kne/button-group` 保持一致。

请前往 **ButtonGroup** 组件文档中的 **ConfirmButton** 章节查看完整属性说明，包括 `ConfirmButton`、`ConfirmLink`、`ConfirmText` 与 `withConfirm`。

# Content

### 概述

Content 从 `@kne/info-page` 重新导出，用于详情页中的多列内容展示，支持标签对齐、列数配置、数据格式化等能力。

本组件文档仅展示常用示例。完整概述、使用说明与 API 请前往 **InfoPage** 组件文档查看。


### 示例

#### 示例代码

- 内容列表
- 支持多列布局和标签对齐的灵活内容展示组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Content } = _InfoPage;
const { Space, Radio, Tag } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 2,
    size: 'default',
    labelAlign: 'left'
  });

  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps(prevState => Object.assign({}, prevState, { [name]: val }));
  };

  return (
    <Space direction='vertical' size={16}>
      {/* 控制面板 */}
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <div>
            <span style={{ marginRight: 8 }}>列数：</span>
            <Radio.Group onChange={(e) => onChange(e, 'col')} value={listProps.col}>
              <Radio.Button value={1}>单列</Radio.Button>
              <Radio.Button value={2}>两列</Radio.Button>
              <Radio.Button value={3}>三列</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>标签对齐：</span>
            <Radio.Group onChange={(e) => onChange(e, 'labelAlign')} value={listProps.labelAlign}>
              <Radio.Button value='left'>左对齐</Radio.Button>
              <Radio.Button value='center'>居中</Radio.Button>
              <Radio.Button value='right'>右对齐</Radio.Button>
              <Radio.Button value='auto'>自适应</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>尺寸：</span>
            <Radio.Group onChange={(e) => onChange(e, 'size')} value={listProps.size}>
              <Radio.Button value='default'>默认</Radio.Button>
              <Radio.Button value='small'>小尺寸</Radio.Button>
            </Radio.Group>
          </div>
        </Space>
      </div>

      {/* Content 组件展示 */}
      <Content
        {...listProps}
        list={[
          { label: '客户名称', content: '深圳市腾讯计算机系统有限公司' },
          { label: '统一社会信用代码', content: '914403007109410773' },
          { label: '法定代表人', content: '马化腾' },
          { label: '企业类型', content: <Tag color="blue">有限责任公司</Tag> },
          { label: '成立日期', content: '1998-11-11' },
          { label: '注册资本', content: '500万美元' },
          { label: '经营状态', content: <Tag color="success">存续</Tag> },
          { label: '注册地址', content: '深圳市南山区高新科技园科技中一路腾讯大厦' },
          {
            label: '经营范围',
            content: '计算机软硬件的技术开发、销售；计算机网络工程；系统集成；软件开发及技术服务；信息咨询；网络设备、通讯设备、电子产品的技术开发与销售；国内贸易。',
            block: true
          }
        ]}
        itemRender={(inner, other) => {
          return other?.index === 8 ? <div style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
            * 以上信息仅供展示，不代表真实数据
          </div> : inner;
        }}
      />
    </Space>
  );
};

render(<BaseExample />);


```

- 内容展示
- 展示Content组件的各种配置和用法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Content } = _InfoPage;
const { Flex, Radio, Space, Tag, Avatar } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 2,
    size: 'default',
    labelAlign: 'auto',
    gutter: 16
  });

  const [showDisabled, setShowDisabled] = useState(false);

  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps(prevState => ({ ...prevState, [name]: val }));
  };

  const dataList = [
    { label: '客户姓名', content: <Flex align="center" gap={8}><Avatar size="small">张</Avatar>张三</Flex>, block: true },
    { label: '客户编号', content: 'C20240115001' },
    { label: '联系电话', content: '138-0013-8000' },
    { label: '电子邮箱', content: 'zhangsan@example.com' },
    { label: '客户类型', content: <Tag color="blue">VIP客户</Tag> },
    { label: '信用等级', content: <Tag color="green">A级</Tag> },
    { label: '所属公司', content: '深圳市腾讯计算机系统有限公司', block: true },
    { label: '所在部门', content: '技术部', display: !showDisabled },
    { label: '职位', content: '高级前端工程师', display: !showDisabled },
    { label: '注册时间', content: '2020-03-15' },
    { label: '最后登录', content: '2024-01-15 10:30:00' },
    { label: '账户状态', content: <Tag color="success">正常</Tag> },
    { label: '备注信息', content: '该客户为公司长期合作伙伴，合作期间表现优秀，建议继续保持良好合作关系。', block: true }
  ];

  return (
    <Flex vertical gap={16}>
      {/* 控制面板 */}
      <Space direction="vertical" size={12} style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <div>
          <span style={{ marginRight: 8 }}>列数：</span>
          <Radio.Group onChange={(e) => onChange(e, 'col')} value={listProps.col}>
            <Radio.Button value={1}>单列</Radio.Button>
            <Radio.Button value={2}>两列</Radio.Button>
            <Radio.Button value={3}>三列</Radio.Button>
            <Radio.Button value={4}>四列</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>标签对齐：</span>
          <Radio.Group onChange={(e) => onChange(e, 'labelAlign')} value={listProps.labelAlign}>
            <Radio.Button value='left'>左对齐</Radio.Button>
            <Radio.Button value='center'>居中</Radio.Button>
            <Radio.Button value='right'>右对齐</Radio.Button>
            <Radio.Button value='auto'>自适应</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>尺寸：</span>
          <Radio.Group onChange={(e) => onChange(e, 'size')} value={listProps.size}>
            <Radio.Button value='default'>默认</Radio.Button>
            <Radio.Button value='small'>小尺寸</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>显示隐藏：</span>
          <Radio.Group onChange={(e) => setShowDisabled(e.target.value)} value={showDisabled}>
            <Radio.Button value={false}>显示全部</Radio.Button>
            <Radio.Button value={true}>隐藏部分</Radio.Button>
          </Radio.Group>
        </div>
      </Space>

      {/* Content 组件展示 */}
      <Content
        {...listProps}
        list={dataList.map(item => ({
          ...item,
          display: typeof item.display === 'boolean' ? item.display : undefined
        }))}
      />
    </Flex>
  );
};

render(<BaseExample />);


```

### API

Content 的 API 与 `@kne/info-page` 保持一致。

请前往 **InfoPage** 组件文档中的 **Content / InfoList** 章节查看完整属性说明。

# Descriptions

### 概述

Descriptions 从 `@kne/info-page` 重新导出，用于详情页中的描述列表展示，适合以二维数组结构呈现分组字段信息。

本组件文档仅展示常用示例。完整概述、使用说明与 API 请前往 **InfoPage** 组件文档查看。


### 示例

#### 示例代码

- 描述列表
- 二维数组结构的详情信息展示，适合表单数据展示
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Descriptions } = _InfoPage;
const { Tag, Space } = antd;

const BaseExample = () => {
  return (
    <Descriptions
      dataSource={[
        // 基本信息分组
        [
          { label: "订单编号", content: <strong style={{ color: '#1890ff' }}>ORD20240115001</strong> },
          { label: "订单类型", content: <Tag color="blue">普通订单</Tag> },
        ],
        [
          { label: "下单时间", content: "2024-01-15 10:30:25" },
          { label: "支付时间", content: "2024-01-15 10:32:18" },
        ],
        [
          { label: "客户名称", content: "深圳市腾讯计算机系统有限公司" },
          { label: "客户类型", content: <Tag color="gold">VIP客户</Tag> },
        ],
        // 收货信息分组
        [
          { label: "收货人", content: "张三" },
          { label: "联系电话", content: "138-0013-8000" },
        ],
        [
          { label: "收货地址", content: "广东省深圳市南山区科技园科技中一路腾讯大厦A座18层" },
        ],
        // 商品信息分组
        [
          {
            label: "商品清单",
            content: (
              <Space direction="vertical" size={4}>
                <div>1. 腾讯云服务器（2核4G）× 1台 - ¥3000.00</div>
                <div>2. 云数据库 MySQL（50GB）× 1个 - ¥1200.00</div>
                <div>3. 对象存储（500GB）× 1个 - ¥800.00</div>
              </Space>
            ),
          },
        ],
        // 金额信息分组
        [
          { label: "商品总额", content: <strong>¥5,000.00</strong> },
          { label: "运费", content: "¥0.00" },
        ],
        [
          { label: "优惠金额", content: <span style={{ color: '#52c41a' }}>-¥750.00</span> },
          { label: "实付金额", content: <strong style={{ color: '#f5222d', fontSize: '16px' }}>¥4,250.00</strong> },
        ],
        // 发票信息分组
        [
          { label: "发票类型", content: "增值税专用发票" },
          { label: "发票抬头", content: "深圳市腾讯计算机系统有限公司" },
        ],
        [
          { label: "纳税人识别号", content: "914403007109410773" },
          { label: "发票状态", content: <Tag color="success">已开具</Tag> },
        ],
        // 售后信息分组
        [
          { label: "退款状态", content: "无退款" },
          { label: "发票抬头", content: "未申请" },
        ],
        [
          { label: "订单状态", content: <Tag color="processing">处理中</Tag> },
          {
            label: "预计送达",
            content: "2024-01-17",
          },
        ],
        // 备注信息
        [
          {
            label: "订单备注",
            content: "请务必在工作日配送，配送前请提前电话联系收货人。收到商品后请当面验货，确认无误后再签收。",
            block: true
          },
        ],
        // 操作记录
        [
          { label: "创建时间", content: "2024-01-15 10:30:25" },
          { label: "创建人", content: "张三（客户）" },
        ],
      ]}
    />
  );
};

render(<BaseExample />);


```

### API

Descriptions 的 API 与 `@kne/info-page` 保持一致。

请前往 **InfoPage** 组件文档中的 **Descriptions / DetailList** 章节查看完整属性说明。

# Drawer

### 概述

屏幕边缘滑出的浮层面板，适用于展示详细信息、表单编辑、数据查看等场景。支持三种使用方式：受控组件、Hook 调用、按钮触发。

核心特性包括：
- **灵活的打开方式**：支持受控模式、函数调用和按钮触发三种方式
- **多种尺寸规格**：提供 small（600px）、default（1000px）、large（全屏-64px）三种预设尺寸
- **丰富的自定义能力**：支持自定义底部按钮、装饰器修饰、异步操作等
- **数据加载集成**：DrawerButton 组件结合数据加载，自动在加载完成后打开抽屉
- **优雅的交互体验**：内置滚动条美化、加载状态支持、异步操作反馈

适用于用户详情查看、表单编辑、信息展示、操作确认等多种业务场景。


### 示例

#### 示例代码

- 基础用法
- 展示 Drawer 组件的三种使用方式：受控组件、Hook调用、按钮触发
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { default: Drawer, useDrawer, DrawerButton } = _Drawer;
const { Button, Space, Typography, Descriptions, Avatar, Tag } = _antd;
const { useState } = React;
const {PureGlobal} = _Global;

const BasicExample = () => {
  const [open, setOpen] = useState(false);
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>方式一：受控组件</Typography.Text>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开详情抽屉
      </Button>
      <Drawer
        title="用户信息"
        open={open}
        onClose={() => setOpen(false)}
        width={600}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="姓名">张三</Descriptions.Item>
          <Descriptions.Item label="部门">技术部</Descriptions.Item>
          <Descriptions.Item label="职位">高级前端工程师</Descriptions.Item>
          <Descriptions.Item label="邮箱">zhangsan@example.com</Descriptions.Item>
        </Descriptions>
      </Drawer>

      <Typography.Text strong>方式二：Hook调用</Typography.Text>
      <Button
        onClick={() => {
          drawer({
            title: "项目信息",
            children: (
              <div>
                <Typography.Paragraph>项目名称：电商平台</Typography.Paragraph>
                <Typography.Paragraph>项目负责人：李四</Typography.Paragraph>
                <Typography.Paragraph>开发周期：6个月</Typography.Paragraph>
                <Typography.Paragraph>团队成员：12人</Typography.Paragraph>
              </div>
            ),
          });
        }}
      >
        使用Hook打开
      </Button>
    </Space>
  );
};

render(<PureGlobal><BasicExample /></PureGlobal>);

```

- 用户详情
- 使用 DrawerButton 加载数据后展示用户详细信息，模拟真实业务场景
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd),lodash(lodash)

```jsx
const { DrawerButton } = _Drawer;
const { Card, Avatar, Typography, Tag, Space, Divider, Descriptions, Timeline } = _antd;
const { range } = lodash;
const {PureGlobal} = _Global;

const UserDetailExample = () => {
  const mockUserData = {
    id: 1,
    name: "张三",
    avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang" },
    role: "高级前端工程师",
    department: "技术部-前端组",
    email: "zhangsan@company.com",
    phone: "138****8888",
    joinDate: "2020-03-15",
    skills: ["React", "Vue", "TypeScript", "Node.js"],
    projects: [
      { name: "电商平台重构", role: "负责人", status: "进行中", date: "2024-01" },
      { name: "OA系统开发", role: "核心开发", status: "已完成", date: "2023-08" },
      { name: "数据大屏", role: "参与", status: "已完成", date: "2023-03" },
    ],
    performance: [
      { quarter: "2024 Q1", score: 95, comment: "工作表现优异，项目交付及时" },
      { quarter: "2023 Q4", score: 92, comment: "技术能力强，团队协作好" },
      { quarter: "2023 Q3", score: 88, comment: "稳步提升，建议加强文档能力" },
    ],
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DrawerButton
        type="primary"
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(mockUserData);
              }, 800);
            });
          },
        }}
        modalProps={(contextProps) => {
          const { data } = contextProps;
          return {
            title: "员工档案详情",
            size: "large",
            children: (
              <div>
                <Card style={{ marginBottom: 16 }}>
                  <Space align="start" size="large">
                    <Avatar size={80} src={data.avatar.src} />
                    <Space direction="vertical" size={4}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        {data.name}
                      </Typography.Title>
                      <Space>
                        <Tag color="blue">{data.role}</Tag>
                        <Tag color="green">{data.department}</Tag>
                      </Space>
                      <Typography.Text type="secondary">
                        入职时间：{data.joinDate}
                      </Typography.Text>
                    </Space>
                  </Space>
                </Card>

                <Descriptions title="基本信息" column={2} bordered style={{ marginBottom: 16 }}>
                  <Descriptions.Item label="工号">EMP{String(data.id).padStart(4, '0')}</Descriptions.Item>
                  <Descriptions.Item label="姓名">{data.name}</Descriptions.Item>
                  <Descriptions.Item label="部门">{data.department}</Descriptions.Item>
                  <Descriptions.Item label="职位">{data.role}</Descriptions.Item>
                  <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
                  <Descriptions.Item label="电话">{data.phone}</Descriptions.Item>
                </Descriptions>

                <Typography.Title level={5}>技术栈</Typography.Title>
                <Space wrap style={{ marginBottom: 16 }}>
                  {data.skills.map((skill) => (
                    <Tag key={skill} color="processing">{skill}</Tag>
                  ))}
                </Space>

                <Typography.Title level={5}>项目经历</Typography.Title>
                <Card size="small" style={{ marginBottom: 16 }}>
                  {data.projects.map((project, index) => (
                    <div key={index}>
                      <Space>
                        <Typography.Text strong>{project.name}</Typography.Text>
                        <Tag color={project.status === "进行中" ? "processing" : "success"}>
                          {project.status}
                        </Tag>
                      </Space>
                      <Typography.Text type="secondary" style={{ marginLeft: 16 }}>
                        {project.role} · {project.date}
                      </Typography.Text>
                      {index < data.projects.length - 1 && <Divider style={{ margin: "8px 0" }} />}
                    </div>
                  ))}
                </Card>

                <Typography.Title level={5}>绩效考核</Typography.Title>
                <Timeline
                  items={data.performance.map((item) => ({
                    children: (
                      <Space direction="vertical" size={2}>
                        <Space>
                          <Typography.Text strong>{item.quarter}</Typography.Text>
                          <Tag color={item.score >= 90 ? "success" : "warning"}>
                            {item.score}分
                          </Tag>
                        </Space>
                        <Typography.Text type="secondary">{item.comment}</Typography.Text>
                      </Space>
                    ),
                  }))}
                />
              </div>
            ),
          };
        }}
      >
        查看员工档案
      </DrawerButton>
    </Space>
  );
};

render(<PureGlobal><UserDetailExample /></PureGlobal>);

```

- 表单编辑
- 在 Drawer 中展示表单进行编辑，支持确认和取消操作
- _Drawer(@components/Drawer),_FormInfo(@components/FormInfo),_Global(@components/Global),_antd(antd)

```jsx
const {useFormDrawer, FormDrawerButton, default: FormInfo} = _FormInfo;
const {Button, Space, Typography, message, Divider} = _antd;
const {PureGlobal} = _Global;

const FormDrawerExample = () => {
    const formDrawer = useFormDrawer();
    const {Form} = FormInfo;
    const {Input} = FormInfo.fields;

    const handleEdit = (userData) => {
        formDrawer({
            title: "编辑员工信息", size: "small", formProps: {
                data: userData, onSubmit: async (data) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    message.success(&#96;已更新员工信息：${data.name}&#96;);
                }
            }, children: (<FormInfo
                column={1}
                list={[<Input
                    name="name"
                    label="姓名"
                    rule="REQ"
                    tips="请输入员工姓名"
                />, <Input
                    name="department"
                    label="部门"
                    rule="REQ"
                    options={[{label: "技术部", value: "tech"}, {
                        label: "产品部",
                        value: "product"
                    }, {label: "设计部", value: "design"}, {label: "市场部", value: "marketing"}]}
                    single
                    tips="请选择所属部门"
                />, <Input
                    name="position"
                    label="职位"
                    rule="REQ"
                    tips="请输入职位名称"
                />, <Input
                    name="email"
                    label="邮箱"
                    rule="REQ EMAIL"
                    tips="请输入有效的邮箱地址"
                />, <Input
                    name="phone"
                    label="电话"
                    rule="REQ TEL"
                    tips="请输入有效的手机号码"
                />]}
            />)
        });
    };

    return (<Space direction="vertical" style={{width: '100%'}}>
        <Typography.Text strong>使用 useFormDrawer 编辑员工信息</Typography.Text>
        <Typography.Text type="secondary" style={{fontSize: 12}}>
            FormDrawer 结合了 Drawer 和 FormInfo 的功能，提供了更便捷的表单抽屉体验，支持校验规则和自动数据加载
        </Typography.Text>

        <Divider/>

        <Button
            type="primary"
            onClick={() => {
                handleEdit({
                    name: "张三",
                    department: "tech",
                    position: "高级前端工程师",
                    email: "zhangsan@example.com",
                    phone: "13888888888",
                });
            }}
        >
            编辑员工信息
        </Button>
        <Button
            onClick={() => {
                handleEdit({
                    name: "李四",
                    department: "product",
                    position: "产品经理",
                    email: "lisi@example.com",
                    phone: "13999999999",
                });
            }}
        >
            编辑另一位员工
        </Button>
    </Space>);
};

render(<PureGlobal><FormDrawerExample/></PureGlobal>);

```

- 不同尺寸
- 展示 small、default、large 三种不同尺寸的 Drawer
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { useDrawer } = _Drawer;
const { Button, Space, Typography, Descriptions, Timeline, Card } = _antd;
const {PureGlobal} = _Global;

const SizesExample = () => {
  const drawer = useDrawer();

  const content1 = (
    <Descriptions column={1} bordered>
      <Descriptions.Item label="项目名称">OA系统</Descriptions.Item>
      <Descriptions.Item label="负责人">张三</Descriptions.Item>
      <Descriptions.Item label="开始时间">2024-01-01</Descriptions.Item>
      <Descriptions.Item label="状态">进行中</Descriptions.Item>
      <Descriptions.Item label="进度">60%</Descriptions.Item>
    </Descriptions>
  );

  const content2 = (
    <div>
      <Typography.Paragraph>
        <strong>项目概述：</strong>
        这是一个企业办公自动化系统，提供包括审批流程、日程管理、文档协作等功能。
      </Typography.Paragraph>
      <Descriptions column={2} bordered style={{ marginTop: 16 }}>
        <Descriptions.Item label="项目经理">李四</Descriptions.Item>
        <Descriptions.Item label="技术负责人">王五</Descriptions.Item>
        <Descriptions.Item label="开发周期">6个月</Descriptions.Item>
        <Descriptions.Item label="团队规模">12人</Descriptions.Item>
        <Descriptions.Item label="预算">50万</Descriptions.Item>
        <Descriptions.Item label="截止时间">2024-06-30</Descriptions.Item>
      </Descriptions>
      <Typography.Title level={5} style={{ marginTop: 24 }}>
        项目里程碑
      </Typography.Title>
      <Timeline
        items={[
          {
            children: "需求分析与设计完成",
            color: "green",
          },
          {
            children: "前端框架搭建完成",
            color: "green",
          },
          {
            children: "后端接口开发进行中",
            color: "blue",
          },
          {
            children: "系统联调测试",
            color: "gray",
          },
          {
            children: "上线部署",
            color: "gray",
          },
        ]}
      />
    </div>
  );

  const content3 = (
    <div>
      <Card title="项目基本信息" style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered>
          <Descriptions.Item label="项目名称">电商平台重构</Descriptions.Item>
          <Descriptions.Item label="项目编号">PRJ-2024-001</Descriptions.Item>
          <Descriptions.Item label="项目类型">重构升级</Descriptions.Item>
          <Descriptions.Item label="负责人">赵六</Descriptions.Item>
          <Descriptions.Item label="开发团队">技术部</Descriptions.Item>
          <Descriptions.Item label="优先级">P0</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="团队成员" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {[
            { name: "张三", role: "技术负责人", count: 8 },
            { name: "李四", role: "前端组长", count: 12 },
            { name: "王五", role: "后端组长", count: 15 },
            { name: "赵六", role: "测试负责人", count: 6 },
            { name: "钱七", role: "UI设计师", count: 3 },
          ].map((member) => (
            <div key={member.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span><strong>{member.name}</strong> - {member.role}</span>
              <span>{member.count} 人</span>
            </div>
          ))}
        </Space>
      </Card>

      <Card title="技术架构">
        <Space wrap>
          {["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"].map((tech) => (
            <span key={tech} style={{ padding: '4px 12px', background: '#e6f7ff', borderRadius: '4px', color: '#1890ff' }}>
              {tech}
            </span>
          ))}
        </Space>
      </Card>

      <Card title="开发计划" style={{ marginTop: 16 }}>
        <Timeline
          items={[
            {
              children: <><strong>第一阶段（1-2月）：</strong>技术调研与架构设计</>,
              color: "green",
            },
            {
              children: <><strong>第二阶段（3-4月）：</strong>核心功能开发</>,
              color: "green",
            },
            {
              children: <><strong>第三阶段（5月）：</strong>联调测试与优化</>,
              color: "blue",
            },
            {
              children: <><strong>第四阶段（6月）：</strong>灰度发布与上线</>,
              color: "gray",
            },
          ]}
        />
      </Card>
    </div>
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>选择不同尺寸的抽屉</Typography.Text>
      <Button
        onClick={() => {
          drawer({
            title: "Small 尺寸",
            size: "small",
            children: content1,
          });
        }}
      >
        Small (600px)
      </Button>
      <Button
        onClick={() => {
          drawer({
            title: "Default 尺寸",
            size: "default",
            children: content2,
          });
        }}
      >
        Default (1000px)
      </Button>
      <Button
        onClick={() => {
          drawer({
            title: "Large 尺寸",
            size: "large",
            children: content3,
          });
        }}
      >
        Large (全屏-64px)
      </Button>
    </Space>
  );
};

render(<PureGlobal><SizesExample /></PureGlobal>);

```

- 自定义操作
- 自定义底部按钮、添加额外功能按钮，支持异步操作
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { useDrawer, DrawerButton } = _Drawer;
const { Button, Space, Typography, message, Popconfirm, Tag, Descriptions } = _antd;
const {PureGlobal} = _Global;

const CustomActionsExample = () => {
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>自定义底部按钮和额外操作</Typography.Text>

      <Button
        onClick={() => {
          drawer({
            title: "自定义按钮",
            size: "small",
            children: (
              <div>
                <Typography.Paragraph>这个示例展示了如何自定义底部按钮。</Typography.Paragraph>
                <Typography.Paragraph>自定义了三个按钮：预览、取消、保存。</Typography.Paragraph>
              </div>
            ),
            footerButtons: [
              {
                children: "预览",
                onClick: () => {
                  message.info("预览功能");
                },
              },
              {
                children: "取消",
                onClick: () => {
                  message.info("已取消");
                },
              },
              {
                type: "primary",
                children: "保存",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("保存成功！");
                  return true;
                },
              },
            ],
          });
        }}
      >
        自定义按钮示例
      </Button>

      <DrawerButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  id: 1,
                  name: "张三",
                  role: "高级前端工程师",
                  department: "技术部",
                  status: "在职",
                  joinDate: "2020-03-15",
                });
              }, 500);
            });
          },
        }}
        modalProps={(contextProps) => {
          const { data } = contextProps;
          return {
            title: "员工档案操作",
            size: "small",
            children: (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="姓名">{data.name}</Descriptions.Item>
                <Descriptions.Item label="职位">{data.role}</Descriptions.Item>
                <Descriptions.Item label="部门">{data.department}</Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color="green">{data.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="入职时间">{data.joinDate}</Descriptions.Item>
              </Descriptions>
            ),
            footerButtons: [
              {
                children: "查看详情",
                onClick: () => {
                  message.info("查看更多详情");
                },
              },
              {
                children: "导出档案",
                onClick: () => {
                  message.info("正在导出档案...");
                },
              },
              {
                children: "编辑",
                type: "default",
                onClick: () => {
                  message.info("打开编辑模式");
                },
              },
              {
                type: "primary",
                children: "确认",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("操作成功！");
                  return true;
                },
              },
            ],
          };
        }}
      >
        加载数据并自定义操作
      </DrawerButton>

      <Button
        danger
        onClick={() => {
          drawer({
            title: "删除确认",
            size: "small",
            children: (
              <div>
                <Typography.Paragraph>
                  <Typography.Text type="warning">⚠️ 警告：</Typography.Text>
                  此操作将永久删除该员工档案，删除后无法恢复。
                </Typography.Paragraph>
                <Typography.Paragraph>是否继续删除？</Typography.Paragraph>
              </div>
            ),
            footerButtons: [
              {
                children: "取消",
                onClick: () => {
                  message.info("已取消删除");
                },
              },
              {
                danger: true,
                type: "primary",
                children: "确认删除",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("已删除员工档案");
                  return true;
                },
              },
            ],
          });
        }}
      >
        危险操作示例
      </Button>
    </Space>
  );
};

render(<PureGlobal><CustomActionsExample /></PureGlobal>);

```

### API

#### Drawer

屏幕边缘滑出的浮层面板，用于展示详细信息、表单编辑等场景。

##### 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 抽屉标题 | ReactNode | - |
| size | 抽屉尺寸，可选值：`small`(600px)、`default`(1000px)、`large`(calc(100vw-64px)) | string | `small` |
| children | 抽屉内容，可以是 JSX 或函数，函数时可接收 close 方法和 props | ReactNode \| function | - |
| footer | 抽屉底部内容，设为 null 且 footerButtons 未设置时不显示底部，函数时可接收 close 方法和 props | ReactNode \| function | - |
| footerButtons | 底部按钮配置数组，默认显示"取消"和"确定"按钮 | array | - |
| onConfirm | 点击确认按钮触发的回调，返回 Promise 时按钮显示 loading 状态，返回 false 时不关闭抽屉 | function | - |
| onCancel | 点击取消按钮触发的回调 | function | - |
| onClose | 抽屉关闭时的回调 | function | - |
| closable | 是否显示关闭按钮 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | false |
| disabledScroller | 是否禁用滚动条美化 | boolean | false |
| withDecorator | 抽屉内容修饰器，可在内容外层添加装饰 | function | - |
| open | 受控模式下抽屉的显示状态 | boolean | - |
| width | 自定义抽屉宽度 | string \| number | - |

**注意**：其他未列出的属性可参考 Ant Design Drawer 组件

##### footerButtons 数组项说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| children | 按钮文字 | ReactNode | - |
| type | 按钮类型，参考 Ant Design Button | string | - |
| danger | 是否为危险按钮 | boolean | false |
| ButtonComponent | 自定义按钮组件 | Component | LoadingButton |
| onClick | 点击事件回调 | function | - |
| autoClose | 点击后是否自动关闭抽屉 | boolean | true |
| display | 是否显示该按钮 | boolean \| function | true |

#### useDrawer

用于获取一个可以调用 Drawer 的 Hook 函数，配合 AppDrawer 使用。

##### 返回值

返回一个数组：`[drawer, DrawerContextHolder]`

- **drawer**: 函数，执行后可打开一个 Drawer，参数同 Drawer 组件属性
  - 返回对象包含 `destroy` 方法用于关闭 Drawer
  - 返回对象包含 `update` 方法用于更新 Drawer 配置

- **DrawerContextHolder**: 必须渲染在组件树中，用于承载 Drawer 实例

#### DrawerButton

结合 FetchButton 功能的按钮组件，点击后加载数据，加载完成后自动打开 Drawer。

##### 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| api | FetchButton 的 API 配置对象 | `{ loader: Function }` | - |
| modalProps | Drawer 属性配置，可以是对象或函数 | object \| function({ data, fetchApi, close }) | - |
| onError | 数据加载错误回调 | function | - |

**注意**：其他属性同 Ant Design Button 组件

##### modalProps 为函数时的参数说明

| 参数名 | 说明 | 类型 |
|--------|------|------|
| data | 加载的数据 | any |
| fetchApi | Fetch API 对象 | object |
| close | 关闭 Drawer 的方法 | function |

#### AppDrawer

全局 Drawer 提供者组件，为内部使用 useDrawer 的组件提供上下文环境。

##### 使用方式

在应用最外层包裹 AppDrawer，即可在任意组件中使用 useDrawer：

```javascript
import { AppDrawer } from '@components/Drawer';

function App() {
  return (
    <AppDrawer>
      <YourAppContent />
    </AppDrawer>
  );
}
```

# react-enum


### 描述

管理和获取枚举值.


### 安装

```shell
npm i --save @kne/react-enum
```


### 概述

枚举值管理和展示组件，用于统一管理应用中的枚举数据，如性别、状态、类型等选项列表。

## 何时使用

- 需要展示枚举值的描述文本时
- 需要将枚举列表渲染为下拉框、单选框等表单组件时
- 需要统一管理应用中的枚举数据时
- 需要支持多语言的枚举描述时

## 特性

- 📦 统一的枚举数据管理
- 🔄 支持同步/异步加载
- 📡 内置LRU缓存机制
- 🌍 支持多语言
- 🎨 多种格式化方式
- 🔧 灵活的渲染函数


### 示例

#### 示例代码

- EnumLegacy
- 兼容老版本Enum的API
- _ReactEnum(@kne/react-enum)[import * as _ReactEnum from "@kne/react-enum"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: Enum, preset } = _ReactEnum;
const { createWithRemoteLoader } = remoteLoader;
const { Divider } = antd;

preset({
  base: {
    confirm: () => [{ description: '是', value: 'Y' }, {
      description: '否', value: 'N'
    }]
  }
});

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    enums: {
      gender: [{ value: 'M', description: '男' }, {
        value: 'F', description: '女'
      }], marital: async () => [{ description: '已婚', value: 'Y' }, {
        description: '未婚', value: 'N'
      }]
    }
  }}>
    <Enum moduleName="gender" name="M" />
    <Divider />
    <Enum moduleName="gender">{(data) => {
      return data.map((data) => `${data.value}:${data.description}`).join(',');
    }}</Enum>
    <Divider />
    <Enum moduleName={['gender', 'marital']}>{([gender, marital]) => {
      return <div>
        <div>{gender.map((data) => `${data.value}:${data.description}`).join(',')}</div>
        <div>{marital.map((data) => `${data.value}:${data.description}`).join(',')}</div>
      </div>;
    }}</Enum>
    <Divider />
    <Enum moduleName="confirm" name="Y" />
    <Enum moduleName="confirm" name="N">{(data) => data.description}</Enum>
  </PureGlobal>;
});

render(<BaseExample />);

```

- 基础用法
- 展示枚举的基本使用，包括获取单个枚举值和枚举列表
- _Enum(@kne/react-enum)[import * as _ReactEnum from "@kne/react-enum"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: Enum } = _Enum;
const { createWithRemoteLoader } = remoteLoader;
const { Space, Select, Divider } = antd;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          // 同步加载的枚举
          gender: [
            { value: "M", description: "男" },
            { value: "F", description: "女" },
          ],
          // 异步加载的枚举
          status: async ({ locale }) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "1", description: "启用" },
                  { value: "0", description: "禁用" },
                ]);
              }, 500);
            });
          },
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>获取单个枚举值</h4>
          <Space>
            <span>性别：</span>
            <Enum moduleName="gender" name="M" />
            <Divider type="vertical" />
            <span>自定义渲染：</span>
            <Enum moduleName="gender" name="F">
              {(data) => <strong style={{ color: "#f5222d" }}>{data.description}</strong>}
            </Enum>
          </Space>
        </div>
        
        <div>
          <h4>获取枚举列表</h4>
          <Enum moduleName="gender">
            {(list) => {
              return (
                <Space>
                  <span>可选项：</span>
                  {list.map((item, index) => (
                    <span key={item.value}>
                      {item.description}
                      {index < list.length - 1 && "、"}
                    </span>
                  ))}
                </Space>
              );
            }}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为下拉框</h4>
          <Enum moduleName="status">
            {(list) => {
              return (
                <Select
                  style={{ width: 150 }}
                  placeholder="请选择状态"
                  options={list.map((item) => ({
                    value: item.value,
                    label: item.description,
                  }))}
                />
              );
            }}
          </Enum>
        </div>
        
        <div>
          <h4>占位符和加载状态</h4>
          <Space>
            <span>状态：</span>
            <Enum 
              moduleName="status" 
              name="1"
              placeholder="加载中..."
            />
          </Space>
        </div>
        
        <div>
          <h4>使用format="option"直接获取选项格式</h4>
          <Enum moduleName="gender" format="option">
            {(list) => (
              <Select
                style={{ width: 150 }}
                placeholder="请选择性别"
                options={list}
              />
            )}
          </Enum>
        </div>
      </Space>
    </PureGlobal>
  );
});

render(<BaseExample />);
```

- 异步加载与缓存
- 展示异步加载枚举数据、Loading状态和强制刷新缓存
- _Enum(@kne/react-enum)[import * as _ReactEnum from "@kne/react-enum"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: Enum } = _Enum;
const { Space, Button, message } = antd;
const { useState } = React;
const { createWithRemoteLoader } = remoteLoader;

const AsyncEnumExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  const [refreshKey, setRefreshKey] = useState(0);
  
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          // 异步加载枚举数据
          userStatus: async ({ language }) => {
            // 模拟从服务器获取数据
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "active", description: "活跃" },
                  { value: "inactive", description: "非活跃" },
                  { value: "pending", description: "待审核" },
                  { value: "banned", description: "已禁用" },
                ]);
              }, 1500);
            });
          },
          // 同步枚举数据
          priority: [
            { value: "low", description: "低优先级" },
            { value: "medium", description: "中优先级" },
            { value: "high", description: "高优先级" },
            { value: "urgent", description: "紧急" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>异步加载枚举（带Loading状态）</h4>
          <Enum 
            key={refreshKey}
            moduleName="userStatus" 
            name="active"
            loading={<span>正在加载用户状态...</span>}
            placeholder="--"
          >
            {(data) => <div>当前状态：{data.description}</div>}
          </Enum>
        </div>
        
        <div>
          <h4>强制刷新缓存</h4>
          <Space>
            <Enum 
              moduleName="userStatus" 
              name="banned"
              force={refreshKey > 0}
            >
              {(data) => data.description}
            </Enum>
            <Button 
              onClick={() => {
                setRefreshKey(prev => prev + 1);
                message.info("已刷新缓存");
              }}
            >
              刷新缓存
            </Button>
          </Space>
        </div>
        
        <div>
          <h4>同步枚举数据（立即显示）</h4>
          <Space>
            <Enum moduleName="priority" name="high" />
            <Enum moduleName="priority" name="urgent">
              {(data) => <span style={{ color: "red" }}>{data.description}</span>}
            </Enum>
          </Space>
        </div>
      </Space>
    </PureGlobal>
  );
});

render(<AsyncEnumExample />);

```

- 格式化方式
- 展示不同的格式化方式和自定义渲染
- _Enum(@kne/react-enum)[import * as _ReactEnum from "@kne/react-enum"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: Enum } = _Enum;
const { createWithRemoteLoader } = remoteLoader;
const { Space, Divider, Card } = antd;

const FormatEnumExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          orderStatus: [
            { value: "created", description: "已创建", color: "#666" },
            { value: "paid", description: "已支付", color: "#1890ff" },
            { value: "shipped", description: "已发货", color: "#52c41a" },
            { value: "completed", description: "已完成", color: "#52c41a" },
            { value: "cancelled", description: "已取消", color: "#f5222d" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="不同格式化方式" size="small">
          <Space direction="vertical">
            <div>
              <strong>默认格式（format="default"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="default" />
            </div>
            
            <Divider />
            
            <div>
              <strong>原始对象（format="origin"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="origin">
                {(data) => (
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
              </Enum>
            </div>
            
            <Divider />
            
            <div>
              <strong>选项格式（format="option"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="option">
                {(data) => {
                  return (
                    <span>label: {data.description}, value: {data.value}</span>
                  )
                }}
              </Enum>
            </div>
          </Space>
        </Card>
        
        <Card title="自定义渲染" size="small">
          <Space>
            <Enum moduleName="orderStatus" name="shipped" format="origin">
              {(data) => (
                <span style={{ color: data.color }}>
                  ● {data.description}
                </span>
              )}
            </Enum>
            
            <Enum moduleName="orderStatus" name="cancelled" format="origin">
              {(data) => (
                <span style={{ 
                  padding: "2px 8px",
                  backgroundColor: data.color,
                  color: "#fff",
                  borderRadius: "4px"
                }}>
                  {data.description}
                </span>
              )}
            </Enum>
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
});

render(<FormatEnumExample />);

```

- 渲染枚举列表
- 将枚举列表渲染为各种表单组件
- _Enum(@kne/react-enum)[import * as _ReactEnum from "@kne/react-enum"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: Enum } = _Enum;
const { createWithRemoteLoader } = remoteLoader;
const { Space, Select, Radio, Checkbox, Table } = antd;

const ListEnumExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          department: [
            { value: "tech", description: "技术部" },
            { value: "product", description: "产品部" },
            { value: "design", description: "设计部" },
            { value: "marketing", description: "市场部" },
            { value: "hr", description: "人力资源部" },
            { value: "finance", description: "财务部" },
          ],
          role: [
            { value: "admin", description: "管理员", level: 1 },
            { value: "manager", description: "经理", level: 2 },
            { value: "employee", description: "员工", level: 3 },
            { value: "intern", description: "实习生", level: 4 },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>渲染为 Select 下拉框</h4>
          <Enum moduleName="department">
            {(list) => (
              <Select
                style={{ width: 200 }}
                placeholder="请选择部门"
                options={list.map((item) => ({
                  value: item.value,
                  label: item.description,
                }))}
              />
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Radio 单选组</h4>
          <Enum moduleName="role">
            {(list) => (
              <Radio.Group>
                {list.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.description}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Checkbox 多选组</h4>
          <Enum moduleName="department">
            {(list) => (
              <Checkbox.Group>
                {list.slice(0, 4).map((item) => (
                  <Checkbox key={item.value} value={item.value}>
                    {item.description}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Table 表格</h4>
          <Enum moduleName="role" format="origin">
            {(list) => (
              <Table
                size="small"
                pagination={false}
                columns={[
                  { title: "编码", dataIndex: "value", key: "value" },
                  { title: "名称", dataIndex: "description", key: "description" },
                  { title: "级别", dataIndex: "level", key: "level" },
                ]}
                dataSource={list.map(item => ({ ...item, key: item.value }))}
              />
            )}
          </Enum>
        </div>
      </Space>
    </PureGlobal>
  );
});

render(<ListEnumExample />);

```

- 多枚举模块
- 同时获取多个枚举模块和错误处理
- _Enum(@kne/react-enum)[import * as _ReactEnum from "@kne/react-enum"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: Enum } = _Enum;
const { createWithRemoteLoader } = remoteLoader;
const { Space, Card, Tag } = antd;

const MultiEnumExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          country: [
            { value: "CN", description: "中国" },
            { value: "US", description: "美国" },
            { value: "UK", description: "英国" },
            { value: "JP", description: "日本" },
          ],
          language: [
            { value: "zh-CN", description: "简体中文" },
            { value: "en-US", description: "英语" },
            { value: "ja-JP", description: "日语" },
            { value: "ko-KR", description: "韩语" },
          ],
          timezone: [
            { value: "UTC+8", description: "北京时间" },
            { value: "UTC+0", description: "格林威治时间" },
            { value: "UTC-5", description: "纽约时间" },
            { value: "UTC+9", description: "东京时间" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="同时获取多个枚举模块" size="small">
          <Enum moduleName={["country", "language", "timezone"]}>
            {([countries, languages, timezones]) => (
              <Space direction="vertical">
                <div>
                  <strong>国家列表：</strong>
                  <Space>
                    {countries.map(item => (
                      <Tag key={item.value}>{item.description}</Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <strong>语言列表：</strong>
                  <Space>
                    {languages.map(item => (
                      <Tag key={item.value} color="blue">{item.description}</Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <strong>时区列表：</strong>
                  <Space>
                    {timezones.map(item => (
                      <Tag key={item.value} color="green">{item.description}</Tag>
                    ))}
                  </Space>
                </div>
              </Space>
            )}
          </Enum>
        </Card>
        
        <Card title="组合使用多个枚举" size="small">
          <Space>
            <span>用户来自</span>
            <Enum moduleName="country" name="CN">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
            <span>，使用</span>
            <Enum moduleName="language" name="zh-CN">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
            <span>，时区为</span>
            <Enum moduleName="timezone" name="UTC+8">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
          </Space>
        </Card>
        
        <Card title="错误处理" size="small">
          <Space direction="vertical">
            <div>
              <strong>不存在的枚举模块：</strong>
              <Enum 
                moduleName="notExist" 
                name="test"
                error={<span style={{ color: "red" }}>枚举加载失败</span>}
              />
            </div>
            <div>
              <strong>不存在的枚举值（显示占位符）：</strong>
              <Enum 
                moduleName="country" 
                name="XX"
                placeholder="未知国家"
              />
            </div>
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
});

render(<MultiEnumExample />);

```


### API

## Enum 组件 API

### Enum（默认导出）

用于获取单个或多个枚举值的展示内容。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| moduleName | 枚举模块名称，对应预设中配置的枚举名称 | string \| string[] | - |
| name | 枚举值，当提供时获取单个枚举项；不提供时获取整个枚举列表 | string \| number | - |
| format | 格式化方式：'default'返回描述文本，'origin'返回原始对象，'option'返回{label, value}格式 | 'default' \| 'origin' \| 'option' | 'default' |
| force | 是否强制刷新缓存，跳过缓存直接请求 | boolean | false |
| children | 子元素或渲染函数。函数接收(data, fetchApi)参数 | ReactNode \| Function | - |
| placeholder | 数据加载中时的占位内容 | ReactNode | '--' |
| error | 加载失败时的展示内容 | ReactNode \| Function | - |
| loading | 自定义加载中状态的展示 | ReactNode | - |

### EnumResource

用于获取完整的枚举列表资源。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| moduleName | 枚举模块名称，支持数组以同时获取多个枚举 | string \| string[] | - |
| format | 格式化方式 | 'origin' \| 'option' \| 'default' | 'origin' |
| children | 渲染函数，接收枚举列表作为参数 | Function | - |
| placeholder | 数据加载中时的占位内容 | ReactNode | '--' |
| error | 加载失败时的展示内容 | ReactNode \| Function | - |
| loading | 自定义加载中状态的展示 | ReactNode | - |

### 枚举配置

枚举数据通过 `preset` 函数或 `PureGlobal/Global` 组件的 `preset.enums` 配置：

```javascript
// 全局配置
preset({
  base: {
    gender: () => [
      { value: 'M', description: '男' },
      { value: 'F', description: '女' }
    ]
  }
});

// 或通过 Global 组件配置
<PureGlobal preset={{
  enums: {
    status: async ({ language }) => {
      // 支持异步加载
      return [
        { value: '1', description: '启用' },
        { value: '0', description: '禁用' }
      ];
    }
  }
}}>
```

### 枚举项数据结构

| 字段名 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| value | 枚举值 | string \| number | 是 |
| description | 枚举描述文本 | string | 是 |
| translation | 多语言翻译对象 | object | 否 |

# Features

### 概述

Features 是一个功能开关管理组件，用于在系统中通过条件控制功能的开启或关闭，实现系统功能的灵活配置。

通过全局配置的方式，Features 组件可以统一管理系统功能的可见性和可访问性，避免在代码中散落大量判断逻辑。它支持基于依赖关系的智能判断，只有当功能及其依赖项都满足条件时才会被标记为可用状态。同时，该组件还支持为功能的开启和关闭状态传递不同的配置参数，实现更精细的交互控制。

核心特性：
- **集中配置管理**：通过 Global preset 统一声明，避免判断语句散落在代码各处
- **依赖关系支持**：智能判断功能是否可用，只有满足所有依赖条件才开启
- **双状态参数**：可为开启和关闭状态分别配置不同的参数（options/rejectedOptions）
- **调试模式**：提供 debug 模式方便开发时查看功能状态和真实 ID
- **嵌套功能管理**：支持 system/module/feature 三级结构，通过冒号连接完整 ID

适用于企业级管理系统、SaaS 平台、多租户应用等需要精细化功能控制的场景。

### 示例(全屏)

#### 示例代码

- 基础用法 - 依赖关系控制功能开关
- 展示如何通过依赖关系控制功能模块的开启与关闭，批量导入功能依赖编辑模块
- _Features(@components/Features),global(@components/Global),layout(@components/Layout)

```jsx
const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "hr-system",
            type: "system",
            name: "人力资源管理系统",
            children: [
              {
                id: "employee",
                type: "module",
                name: "员工管理",
                children: [
                  {
                    id: "import",
                    type: "feature",
                    name: "批量导入",
                    dependencies: ["hr-system:employee:edit"],
                  },
                  {
                    id: "export",
                    type: "feature",
                    name: "数据导出",
                  },
                ],
              },
              {
                id: "attendance",
                type: "module",
                name: "考勤管理",
                children: [
                  {
                    id: "check-in",
                    type: "feature",
                    name: "签到打卡",
                  },
                ],
              },
              {
                id: "edit",
                type: "module",
                name: "编辑模块",
              },
            ],
          },
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <PermissionsPage name="employee" openFeatures>
          <Features id="import">
            <div>
              <h3>批量导入员工数据</h3>
              <p>支持 Excel 文件批量导入，一次性添加多名员工</p>
            </div>
          </Features>
          <Features id="export">
            <div>
              <h3>导出员工数据</h3>
              <p>导出员工列表到 Excel，支持自定义筛选条件</p>
            </div>
          </Features>
          <Features id="analytics">
            <div>
              <h3>数据分析</h3>
              <p>统计分析员工数据，生成可视化报表</p>
            </div>
          </Features>
        </PermissionsPage>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 页面级功能控制
- 展示如何在多页面应用中使用 Features 控制不同页面的功能模块，销售趋势图、客户增长图等功能展示
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),Router(react-router-dom)

```jsx
const {default: Features} = _Features;
const {default: Layout, PermissionsPage} = layout;
const {PureGlobal} = global;
const {Route, Routes} = Router;

const ModuleExample = () => {
    return (<PureGlobal
            preset={{
                features: {
                    debug: true, profile: {
                        id: "crm-system", type: "system", name: "客户关系管理系统", children: [{
                            id: "dashboard", type: "module", name: "数据看板", children: [{
                                id: "sales-chart", type: "feature", name: "销售趋势图",
                            }, {
                                id: "customer-chart", type: "feature", name: "客户增长图",
                            },],
                        }, {
                            id: "customer", type: "module", name: "客户管理", children: [{
                                id: "advanced-filter",
                                type: "feature",
                                name: "高级筛选",
                                dependencies: ["crm-system:dashboard"],
                            },],
                        },],
                    },
                },
            }}
        >
            <Layout
                navigation={{
                    isFixed: false, showIndex: false, base: '/Features', list: [{
                        key: "dashboard", title: "数据看板", path: "/Features",
                    }, {
                        key: "customer", title: "客户管理", path: "/Features/customer",
                    },],
                }}
            >
                <Routes>
                    <Route
                        path="/Features"
                        element={<PermissionsPage name="dashboard" openFeatures>
                            <div>
                                <h2>数据看板</h2>
                                <div style={{
                                    padding: '16px',
                                    marginBottom: '16px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px'
                                }}>
                                    <Features id="sales-chart">
                                        <h3>销售趋势分析</h3>
                                        <p>展示最近30天销售数据变化趋势</p>
                                    </Features>
                                </div>
                                <div style={{padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
                                    <Features id="customer-chart">
                                        <h3>客户增长分析</h3>
                                        <p>展示客户数量变化趋势</p>
                                    </Features>
                                </div>
                            </div>
                        </PermissionsPage>}
                    />
                    <Route
                        path="/Features/customer"
                        element={<PermissionsPage name="customer" openFeatures>
                            <div>
                                <h2>客户管理</h2>
                                <div style={{padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
                                    <Features id="advanced-filter">
                                        <h3>高级筛选功能</h3>
                                        <p>支持多维度组合筛选客户数据</p>
                                    </Features>
                                </div>
                            </div>
                        </PermissionsPage>}
                    />
                </Routes>
            </Layout>
        </PureGlobal>);
};

render(<ModuleExample/>);

```

- 动态参数传递
- 展示如何根据功能开启/关闭状态传递不同的配置参数（options/rejectedOptions），薪资可见性和绩效考核功能
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),antd(antd)

```jsx
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

```

### API

#### Features 组件

Features 是一个功能开关组件，用于根据配置控制子组件的显示或隐藏。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | 功能标识符，对应 preset.features.profile 中定义的 id | string | 是 | - |
| children | 子内容，可以是 JSX 或函数。为函数时接收 {isPass, options, currentId} 参数 | ReactNode \| Function | 是 | - |

##### children 函数参数

当 children 为函数时，接收的参数对象包含以下属性：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| isPass | 功能是否通过（开启） | boolean |
| options | 开启或关闭状态对应的配置参数 | any |
| currentId | 当前功能的完整 ID（包含父级路径） | string |

#### features 配置

features 配置在 Global preset 中定义。

##### features 配置属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| debug | 是否开启调试模式，开启后会在控制台打印所有功能的 ID 和判断状态 | boolean | 否 | false |
| profile | 功能配置树结构 | object | 是 | - |

#### profile 配置结构

profile 采用树形结构配置系统的功能模块。

##### profile 节点属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | 当前节点的标识符，同级节点中需唯一，完整 ID 由父级 ID 和当前 ID 通过冒号连接 | string | 是 | - |
| type | 节点类型，可选值为：system（系统根节点）、module（功能模块）、feature（具体功能） | string | 是 | - |
| name | 节点中文名称，仅用于标识和说明 | string | 否 | - |
| close | 是否强制关闭该功能。true 表示关闭，false 或不配置表示开启（存在该节点配置时） | boolean | 否 | false |
| dependencies | 依赖的功能列表，数组中的 ID 必须是完整的功能 ID。只有所有依赖功能都开启时，当前功能才会被标记为开启 | array\<string\> | 否 | - |
| options | 功能开启时传递给 children 的参数 | any | 否 | - |
| rejectedOptions | 功能关闭时传递给 children 的参数 | any | 否 | - |
| children | 子功能节点数组 | array\<object\> | 否 | - |

##### 功能判断规则

1. 功能开启条件：profile 中存在该节点配置，且 close 不为 true，且所有 dependencies 依赖的功能都已开启
2. 功能关闭条件：profile 中不存在该节点配置，或 close 为 true，或存在依赖项功能关闭
3. 根节点 type 必须为 system

# react-file

### 描述

React文件操作组件库，提供文件上传、多格式预览、下载、列表管理及文件系统浏览，支持i18n

### 安装

```shell
npm i --save @kne/react-file
```

### 概述

React文件操作组件库，提供文件上传、多格式预览、下载、列表管理及文件系统浏览的完整解决方案，支持国际化。

### 主要特性

- **文件上传** - 支持单文件/多文件上传，可自定义文件类型、大小限制和并发数
- **文件预览** - 根据文件类型自动选择预览方式，支持图片、音频、视频、PDF、Office文档、HTML、Markdown、JSON、ZIP、文本等
- **文件下载** - 支持OSS文件ID下载、直接URL下载和Blob数据下载
- **文件列表** - 展示已上传文件列表，支持上传中状态、预览、下载、删除操作
- **文件系统** - 提供文件系统浏览组件，支持图标、列表、分栏、画廊四种视图模式
- **图片处理** - 支持默认头像、性别区分头像、加载骨架屏和失败占位图
- **打印功能** - 内置打印按钮组件，支持打印前/后回调
- **国际化** - 内置中英文语言包，支持多语言切换

### 组件概览

#### File
文件组件，通过OSS文件ID获取文件URL，使用render props模式。

#### FileUpload
文件上传组件，支持单文件和多文件上传，可自定义接受的文件类型和上传限制。

#### FilePreview
文件预览组件，根据文件类型自动选择合适的预览方式。支持本地URL和OSS文件ID两种方式。

#### FileList
文件列表组件，用于展示和管理已上传的文件，支持上传中状态、预览、下载和删除操作。

#### FileButton
文件操作按钮组件，点击后弹出文件预览弹窗，支持下载和打印。

#### Download
文件下载按钮组件，支持OSS文件ID下载和直接URL下载。

#### Image
图片组件，支持默认头像、性别区分的头像显示，以及加载失败时的占位图。

#### FileSystem
文件系统浏览组件，提供图标、列表、分栏、画廊四种视图，支持导航历史、搜索与异步分页虚拟滚动（大数据目录）。

#### PrintButton
打印按钮组件，用于触发浏览器打印功能。


### 示例

#### 示例代码

- File
- 从oss获取文件地址
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { default: File } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('/logo192.png');
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <File id="123">{({ url }) => {
      return url;
    }}</File>
  </PureGlobal>;
});

render(<BaseExample />);

```

- Image
- 显示图片
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { Image } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Divider } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('/mock/avatar.png');
              }, 2000);
            });
          }
        }
      }
    }
  }}>
    <InfoPage>
      <InfoPage.Part title="图片">
        <Image src="xxxxxx" />
        <Image id="xxxxxx" style={{ width: 200, height: 200 }} />
      </InfoPage.Part>
      <InfoPage.Part title="头像">
        <Image.Avatar gender="F" />
        <Image.Avatar gender="M" />
        <Image.Avatar />
        <Image.Avatar gender="F" id="xxxxxx" />
        <Divider />
        <Image.Avatar gender="F" shape="square" />
        <Image.Avatar gender="M" shape="square" />
        <Image.Avatar shape="square" />
        <Image.Avatar gender="F" id="xxxxxx" shape="square" />
        <Divider />
        <Image.Avatar gender="F" size={30} />
        <Image.Avatar gender="M" size={50} />
        <Image.Avatar size={80} />
        <Image.Avatar gender="F" id="xxxxxx" size={100} />
      </InfoPage.Part>
    </InfoPage>
  </PureGlobal>;
});

render(<BaseExample />);

```

- Download
- 文件下载
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { Download } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Flex } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('/logo192.png');
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <Flex gap={8}>
      <Download id="123">下载文件</Download>
      <Download id="123" filename="图片">下载文件并设置名称</Download>
      <Download src="/logo192.png" filename="图片">直接通过src链接下载</Download>
    </Flex>
  </PureGlobal>;
});

render(<BaseExample />);

```

- PrintButton
- 打印按钮
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd)

```jsx
const { PrintButton } = _ReactFile;
const { useRef } = React;
const { Flex, Typography } = antd;

const { Title, Paragraph } = Typography;

const BaseExample = () => {
  const contentRef = useRef(null);

  return (
    <Flex vertical gap={16}>
      <div
        ref={contentRef}
        style={{
          padding: 24,
          border: '1px solid #f0f0f0',
          borderRadius: 8,
          background: '#fff'
        }}
      >
        <Title level={4} style={{ marginTop: 0 }}>
          打印内容示例
        </Title>
        <Paragraph>
          这是一段将被打印的内容。点击下方「打印」按钮会打开浏览器打印对话框，仅打印该区域内容。
        </Paragraph>
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          支持传入 onBeforePrint / onSuccess / onError 回调，以及 printProps 透传给 react-to-print。
        </Paragraph>
      </div>
      <PrintButton contentRef={contentRef} type="primary">
        打印
      </PrintButton>
    </Flex>
  );
};

render(<BaseExample />);

```

- FileButton
- 预览文件按钮
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileButton } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            const urlMap = {
              1: '/mock/resume.png',
              2: '/mock/resume.pdf',
              3: '/mock/resume.html',
              4: '/mock/resume.txt',
              5: '/mock/audio.wav',
              6: '/mock/resume.docx'
            };
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urlMap[params.id]);
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <FileButton id="1" filename="demo.jpg" openPrint modalProps={{ width: 800 }}>预览demo.jpg</FileButton>
    <FileButton id="2" filename="demo2.pdf" openPrint modalProps={{ width: 800 }}>预览demo2.pdf</FileButton>
    <FileButton id="3" filename="demo2.html" openPrint modalProps={{ width: 800 }}>预览demo2.html</FileButton>
    <FileButton id="6" filename="resume.docx" openPrint modalProps={{ width: 800 }} type="link">resume.docx</FileButton>
  </PureGlobal>;
});

render(<BaseExample />);

```

- FileList
- 文件列表
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileList } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Divider } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            const urlMap = {
              1: '/mock/resume.png',
              2: '/mock/resume.pdf',
              3: '/mock/resume.html',
              4: '/mock/resume.txt',
              5: '/mock/audio.wav',
              6: '/mock/resume.docx'
            };
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urlMap[params.id]);
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <FileList dataSource={[{
      uuid: '121233',
      type: 'uploading',
      filename: '张三的简历.doc'
    },
      {
        id: '2',
        filename: '我是一份简历.pdf',
        date: '2022-07-15T11:09:15.000+08:00',
        userName: '用户名'
      }]} />
    <Divider />
    <FileList dataSource={[]} />
  </PureGlobal>;
});

render(<BaseExample />);

```

- FileUpload
- 文件上传
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileUpload } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const urls = {};

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urls[params.id]);
              }, 1000);
            });
          }
        }, upload: ({ file }) => {
          urls[file.name] = URL.createObjectURL(file);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 0, data: {
                    id: file.name, filename: file.name
                  }
                }
              });
            }, 1000);
          });
        }
      }
    }
  }}>
    <FileUpload />
  </PureGlobal>;
});

render(<BaseExample />);

```

- FilePreview
- 文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FilePreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return (
    <PureGlobal
      preset={{
        ajax: async api => {
          return { data: { code: 0, data: api.loader() } };
        },
        apis: {
          file: {
            staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
            getUrl: {
              loader: async ({ params }) => {
                const urlMap = {
                  1: '/mock/resume.png',
                  2: '/mock/resume.pdf',
                  3: '/mock/resume.html',
                  4: '/mock/resume.txt',
                  5: '/mock/audio.wav',
                  6: '/mock/resume.docx',
                  7: '/mock/example.zip',
                  8: '/mock/resume.xlsx'
                };
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve(urlMap[params.id]);
                  }, 1000);
                });
              }
            }
          }
        }
      }}>
      <InfoPage>
        <InfoPage.Part title="预览图片">
          <FilePreview id="1" />
        </InfoPage.Part>
        <InfoPage.Part title="预览PDF">
          <FilePreview id="2" />
        </InfoPage.Part>
        <InfoPage.Part title="预览HTML">
          <FilePreview id="3" />
        </InfoPage.Part>
        <InfoPage.Part title="预览TXT">
          <FilePreview id="4" />
        </InfoPage.Part>
        <InfoPage.Part title="预览AUDIO">
          <FilePreview id="5" />
        </InfoPage.Part>
        <InfoPage.Part title="预览OFFICE">
          <FilePreview id="6" filename="resume.docx" />
          <FilePreview id="8" filename="resume.xlsx" />
        </InfoPage.Part>
        <InfoPage.Part title="预览ZIP">
          <FilePreview id="7" />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- MarkdownPreview
- Markdown文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { MarkdownPreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules }) => {
  const [InfoPage] = remoteModules;
  return (
    <InfoPage>
      <InfoPage.Part title="基础用法">
        <MarkdownPreview url={&#96;${getPublicPath('react-file')}/mock/example.md&#96;} />
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<BaseExample />);

```

- JsonPreview
- JSON文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { JsonPreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: api.loader() } };
      },
      apis: {
        file: {
          staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
        }
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="JSON文件预览 - 默认黑色主题">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            collapsedFrom={0}
          />
        </InfoPage.Part>
        <InfoPage.Part title="JSON文件预览 - 白色主题">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            theme="light"
            collapsedFrom={0}
          />
        </InfoPage.Part>
        <InfoPage.Part title="JSON文件预览 - 从第2级开始收起">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            collapsedFrom={2}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- FileSystem
- 文件系统浏览；选中后右侧属性面板（可关闭），也可传 function 自定义内容
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileSystem } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { useState } = React;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  const [items] = useState([
    { kind: 'folder', path: 'documents/', name: 'Documents' },
    { kind: 'folder', path: 'documents/reports/', name: 'Reports' },
    { kind: 'file', path: 'documents/reports/Q3-report.pdf', name: 'Q3-report.pdf', size: 1024000 },
    { kind: 'file', path: 'documents/reports/Q4-report.xlsx', name: 'Q4-report.xlsx', size: 512000 },
    { kind: 'file', path: 'documents/meeting-notes.docx', name: 'meeting-notes.docx', size: 256000 },
    {
      kind: 'file',
      path: 'documents/超长文件名-2024年度第一季度产品规划评审会会议纪要与行动项跟踪清单-最终版-v3.2.1-已确认.pdf',
      name: '超长文件名-2024年度第一季度产品规划评审会会议纪要与行动项跟踪清单-最终版-v3.2.1-已确认.pdf',
      size: 1048576
    },
    {
      kind: 'folder',
      path: '超长文件夹名称-客户交付资料归档-华东区-2024Q1-Q2合并备份/',
      name: '超长文件夹名称-客户交付资料归档-华东区-2024Q1-Q2合并备份'
    },
    {
      kind: 'file',
      path: 'very-very-long-english-filename-without-spaces-product-requirements-document-final-review-copy-v12.docx',
      name: 'very-very-long-english-filename-without-spaces-product-requirements-document-final-review-copy-v12.docx',
      size: 256000
    },
    { kind: 'folder', path: 'images/', name: 'Images' },
    { kind: 'file', path: 'images/logo.png', name: 'logo.png', size: 45000 },
    { kind: 'file', path: 'images/banner.jpg', name: 'banner.jpg', size: 89000 },
    { kind: 'folder', path: 'archives/', name: 'Archives' },
    { kind: 'file', path: 'archives/project-backup.zip', name: 'project-backup.zip', size: 15728640 },
    { kind: 'file', path: 'readme.md', name: 'readme.md', size: 3200 },
    { kind: 'file', path: 'config.json', name: 'config.json', size: 1200 }
  ]);

  return (
    <PureGlobal
      preset={{
        ajax: async api => {
          return { data: { code: 0, data: api.loader() } };
        },
        apis: {
          file: {
            staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
          }
        }
      }}
    >
      <InfoPage>
        <InfoPage.Part title="文件系统浏览（含属性面板）">
          <FileSystem
            items={items}
            title="My Files"
            defaultView="icons"
            onFileOpen={entry => {
              console.log('Open file:', entry);
            }}
            onSelectionChange={entries => {
              console.log('Selection changed:', entries);
            }}
            propertiesPanel={({ selectedEntries, index }) => (
              <FileSystem.PropertiesPanel.Default
                selectedEntries={selectedEntries}
                index={index}
                extraInfo={({ entry }) =>
                  entry ? <FileSystem.PropertiesPanel.InfoRow label="扩展字段" value={entry.id || entry.path} /> : null
                }
              />
            )}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- FileSystem 虚拟滚动
- 开启异步分页虚拟滚动：模拟 40 个文件夹 + 960 个文件，按可视区域延迟加载并占位
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { FileSystem, calcPageSize } = _ReactFile;
const { createWithRemoteLoader } = remoteLoader;
const { useCallback, useRef, useState } = React;

const FOLDER_COUNT = 40;
const FILE_COUNT = 960;
const NEST_FILE_COUNT = 12;

const pad = (n, width = 4) => String(n).padStart(width, '0');

/** 按 parentPath 索引的子节点（含多层） */
const childrenByPath = new Map();

const addChild = (parentPath, entry) => {
  const key = parentPath || '';
  if (!childrenByPath.has(key)) {
    childrenByPath.set(key, []);
  }
  childrenByPath.get(key).push(entry);
};

const folderItems = [];

const registerFolder = ({ id, path, name, parentId, parentPath }) => {
  const item = { kind: 'folder', path, name, id, parentId, parentPath };
  folderItems.push(item);
  addChild(parentPath || '', { ...item });
  return item;
};

registerFolder({ id: 'folder-bulk', path: 'bulk/', name: 'bulk', parentPath: '' });

for (let i = 0; i < FOLDER_COUNT; i += 1) {
  const n = pad(i + 1, 2);
  const folderId = &#96;folder-${n}&#96;;
  const folderPath = &#96;bulk/folder-${n}/&#96;;
  registerFolder({
    id: folderId,
    path: folderPath,
    name: &#96;folder-${n}&#96;,
    parentId: 'folder-bulk',
    parentPath: 'bulk/'
  });

  // 前 5 个文件夹挂二级 / 三级，方便测分栏
  if (i < 5) {
    for (let j = 1; j <= 3; j += 1) {
      const midId = &#96;folder-${n}-mid-${j}&#96;;
      const midPath = &#96;${folderPath}mid-${j}/&#96;;
      registerFolder({
        id: midId,
        path: midPath,
        name: &#96;mid-${j}&#96;,
        parentId: folderId,
        parentPath: folderPath
      });
      for (let k = 1; k <= 4; k += 1) {
        addChild(midPath, {
          kind: 'file',
          path: &#96;${midPath}file-${k}.txt&#96;,
          name: &#96;file-${k}.txt&#96;,
          id: &#96;file-${n}-mid-${j}-${k}&#96;,
          parentId: midId,
          parentPath: midPath,
          size: 2048 + k,
          mimetype: 'text/plain'
        });
      }
      if (j === 1) {
        const deepId = &#96;folder-${n}-deep&#96;;
        const deepPath = &#96;${midPath}deep/&#96;;
        registerFolder({
          id: deepId,
          path: deepPath,
          name: 'deep',
          parentId: midId,
          parentPath: midPath
        });
        for (let k = 1; k <= NEST_FILE_COUNT; k += 1) {
          addChild(deepPath, {
            kind: 'file',
            path: &#96;${deepPath}deep-${pad(k, 2)}.txt&#96;,
            name: &#96;deep-${pad(k, 2)}.txt&#96;,
            id: &#96;file-${n}-deep-${k}&#96;,
            parentId: deepId,
            parentPath: deepPath,
            size: 4096 + k,
            mimetype: 'text/plain'
          });
        }
      }
    }
    for (let k = 1; k <= 6; k += 1) {
      addChild(folderPath, {
        kind: 'file',
        path: &#96;${folderPath}local-${k}.txt&#96;,
        name: &#96;local-${k}.txt&#96;,
        id: &#96;file-${n}-local-${k}&#96;,
        parentId: folderId,
        parentPath: folderPath,
        size: 1536 + k,
        mimetype: 'text/plain'
      });
    }
  }
}

for (let i = 0; i < FILE_COUNT; i += 1) {
  const n = pad(i + 1);
  addChild('bulk/', {
    kind: 'file',
    path: &#96;bulk/file-${n}.txt&#96;,
    name: &#96;file-${n}.txt&#96;,
    id: &#96;file-${n}&#96;,
    parentId: 'folder-bulk',
    parentPath: 'bulk/',
    size: 1024 + i,
    mimetype: 'text/plain'
  });
}

/** 独立多层树：设计稿 / 交付物 */
registerFolder({ id: 'folder-nest', path: 'nest/', name: 'nest', parentPath: '' });
['design', 'delivery', 'archive'].forEach((level1, li) => {
  const level1Id = &#96;folder-nest-${level1}&#96;;
  const level1Path = &#96;nest/${level1}/&#96;;
  registerFolder({
    id: level1Id,
    path: level1Path,
    name: level1,
    parentId: 'folder-nest',
    parentPath: 'nest/'
  });
  addChild(level1Path, {
    kind: 'file',
    path: &#96;${level1Path}readme.md&#96;,
    name: 'readme.md',
    id: &#96;file-nest-${level1}-readme&#96;,
    parentId: level1Id,
    parentPath: level1Path,
    size: 256,
    mimetype: 'text/markdown'
  });
  const level2Names = li === 0 ? ['mobile', 'desktop'] : li === 1 ? ['client-a', 'client-b'] : ['2024', '2025'];
  level2Names.forEach((level2, lj) => {
    const level2Id = &#96;folder-nest-${level1}-${level2}&#96;;
    const level2Path = &#96;${level1Path}${level2}/&#96;;
    registerFolder({
      id: level2Id,
      path: level2Path,
      name: level2,
      parentId: level1Id,
      parentPath: level1Path
    });
    for (let k = 1; k <= 5; k += 1) {
      addChild(level2Path, {
        kind: 'file',
        path: &#96;${level2Path}shot-${k}.png&#96;,
        name: &#96;shot-${k}.png&#96;,
        id: &#96;file-nest-${level1}-${level2}-${k}&#96;,
        parentId: level2Id,
        parentPath: level2Path,
        size: 8192 + k,
        mimetype: 'image/png'
      });
    }
    if (li === 0 && lj === 0) {
      const level3Id = 'folder-nest-design-mobile-icons';
      const level3Path = &#96;${level2Path}icons/&#96;;
      registerFolder({
        id: level3Id,
        path: level3Path,
        name: 'icons',
        parentId: level2Id,
        parentPath: level2Path
      });
      for (let k = 1; k <= NEST_FILE_COUNT; k += 1) {
        addChild(level3Path, {
          kind: 'file',
          path: &#96;${level3Path}icon-${pad(k, 2)}.svg&#96;,
          name: &#96;icon-${pad(k, 2)}.svg&#96;,
          id: &#96;file-nest-icon-${k}&#96;,
          parentId: level3Id,
          parentPath: level3Path,
          size: 512 + k,
          mimetype: 'image/svg+xml'
        });
      }
    }
  });
});

const getSourceByPath = path => {
  const list = childrenByPath.get(path || '') || [];
  return list.slice().sort((left, right) => {
    const leftFolder = left.kind === 'folder' ? 0 : 1;
    const rightFolder = right.kind === 'folder' ? 0 : 1;
    if (leftFolder !== rightFolder) {
      return leftFolder - rightFolder;
    }
    return String(left.name).localeCompare(String(right.name), undefined, { numeric: true, sensitivity: 'base' });
  });
};

const emptyListing = total => ({
  entries: new Array(Math.max(0, total || 0)),
  totalCount: Math.max(0, total || 0),
  loadingIndexes: new Set(),
  ready: false
});

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  const [currentPath, setCurrentPath] = useState('bulk/');
  /** 按目录 path 隔离的稀疏分页；分栏展开列靠 columnPath 写入这里 */
  const [columnListings, setColumnListings] = useState(() => {
    const source = getSourceByPath('bulk/');
    return { 'bulk/': emptyListing(source.length) };
  });
  const cacheRef = useRef(new Map());
  const inflightRef = useRef(new Map());
  const perPageRef = useRef(new Map());
  const pathRef = useRef('bulk/');

  const currentListing = columnListings[currentPath] || emptyListing(0);
  const entries = currentListing.entries;
  const totalCount = currentListing.totalCount;
  const loadingIndexes = currentListing.loadingIndexes;
  const ready = currentListing.ready;

  const updateListing = useCallback((path, patch) => {
    const key = path || '';
    setColumnListings(previous => {
      const current = previous[key] || emptyListing(0);
      // 禁止把已有数据的列写成空（展开其它列时绝不能误伤）
      const nextTotal = patch.totalCount !== undefined ? patch.totalCount : current.totalCount;
      const nextEntries = patch.entries !== undefined ? patch.entries : current.entries;
      if (current.ready && current.totalCount > 0 && nextTotal === 0) {
        return previous;
      }
      return {
        ...previous,
        [key]: {
          entries: nextEntries,
          totalCount: nextTotal,
          loadingIndexes: patch.loadingIndexes !== undefined ? patch.loadingIndexes : current.loadingIndexes,
          ready: patch.ready !== undefined ? patch.ready : current.ready
        }
      };
    });
  }, []);

  const rebuildSparse = useCallback(
    (path, source, perPage) => {
      const key = path || '';
      const pageMap = cacheRef.current.get(key) || new Map();
      const next = new Array(source.length);
      pageMap.forEach((pageData, page) => {
        const start = (page - 1) * perPage;
        pageData.forEach((entry, offset) => {
          next[start + offset] = entry;
        });
      });
      updateListing(key, { entries: next, totalCount: source.length, ready: true });
    },
    [updateListing]
  );

  const clearLoadingForPages = useCallback(
    (path, pages, perPage, total) => {
      const key = path || '';
      setColumnListings(previous => {
        const current = previous[key] || emptyListing(total);
        const nextLoading = new Set(current.loadingIndexes || []);
        pages.forEach(page => {
          const start = (page - 1) * perPage;
          for (let i = 0; i < perPage; i += 1) {
            if (total <= 0 || start + i < total) {
              nextLoading.delete(start + i);
            }
          }
        });
        return {
          ...previous,
          [key]: { ...current, loadingIndexes: nextLoading }
        };
      });
    },
    []
  );

  const loadPages = useCallback(
    ({ path, pages, perPage }) => {
      const key = path || '';
      const source = getSourceByPath(key);
      const total = source.length;

      if (!cacheRef.current.has(key)) {
        cacheRef.current.set(key, new Map());
      }
      if (!inflightRef.current.has(key)) {
        inflightRef.current.set(key, new Set());
      }
      const pageMap = cacheRef.current.get(key);
      const inflight = inflightRef.current.get(key);

      const maxPage = Math.max(1, Math.ceil(total / perPage) || 1);
      const needed = [...new Set(pages)].filter(
        page => page >= 1 && page <= maxPage && !pageMap.has(page) && !inflight.has(page)
      );

      if (!needed.length) {
        // 仍有请求在途：不要把未完成缓存标成 ready
        if (inflight.size > 0) {
          return;
        }
        // 缓存已命中：仅在尚未 ready 时回填，避免每次 emit 都 setState 死循环
        setColumnListings(previous => {
          const listing = previous[key];
          if (listing?.ready && listing.totalCount === total && listing.entries?.length === total) {
            return previous;
          }
          if (pageMap.size === 0) {
            return previous;
          }
          const next = new Array(total);
          pageMap.forEach((pageData, page) => {
            const start = (page - 1) * perPage;
            pageData.forEach((entry, offset) => {
              next[start + offset] = entry;
            });
          });
          return {
            ...previous,
            [key]: {
              entries: next,
              totalCount: total,
              loadingIndexes: listing?.loadingIndexes || new Set(),
              ready: true
            }
          };
        });
        return;
      }

      setColumnListings(previous => {
        const current = previous[key] || emptyListing(total);
        // 只更新当前 path，其它列原样保留
        if (current.ready && current.totalCount > 0 && total === 0) {
          return previous;
        }
        const nextLoading = new Set(current.loadingIndexes || []);
        needed.forEach(page => {
          const start = (page - 1) * perPage;
          for (let i = 0; i < perPage; i += 1) {
            if (start + i < total) {
              nextLoading.add(start + i);
            }
          }
        });
        return {
          ...previous,
          [key]: {
            ...current,
            totalCount: total,
            loadingIndexes: nextLoading,
            entries: current.entries?.length === total ? current.entries : new Array(total)
          }
        };
      });

      needed.forEach(page => {
        inflight.add(page);
        window.setTimeout(() => {
          if (perPageRef.current.get(key) !== perPage) {
            inflight.delete(page);
            clearLoadingForPages(key, [page], perPage, total);
            return;
          }
          const start = (page - 1) * perPage;
          pageMap.set(page, source.slice(start, start + perPage));
          inflight.delete(page);
          rebuildSparse(key, source, perPage);
          clearLoadingForPages(key, [page], perPage, total);
        }, 100 + Math.random() * 200);
      });
    },
    [clearLoadingForPages, rebuildSparse]
  );

  const resetForPath = useCallback(path => {
    const key = path || '';
    pathRef.current = key;
    setCurrentPath(key);
    // 切目录时保留其它列缓存，只重置当前目录拉取状态
    if (!cacheRef.current.has(key)) {
      cacheRef.current.set(key, new Map());
    }
    inflightRef.current.set(key, new Set());
    perPageRef.current.delete(key);
    const source = getSourceByPath(key);
    updateListing(key, emptyListing(source.length));
  }, [updateListing]);

  const handleVisibleRangeChange = useCallback(
    ({ startIndex, endIndex, pageSize, path, columnPath, currentPath: rangePath, view }) => {
      // 分栏展开列：用 columnPath / path；其它视图用当前目录
      const listPath =
        path != null ? path : columnPath != null ? columnPath : rangePath != null ? rangePath : pathRef.current;

      if (view !== 'columns' && listPath !== pathRef.current) {
        return;
      }

      let perPage = perPageRef.current.get(listPath);
      if (!perPage) {
        perPage = Math.max(20, Number(pageSize) || calcPageSize({ view: view || 'icons', width: 800, height: 500 }) || 60);
        perPageRef.current.set(listPath, perPage);
      }

      const start = Math.max(0, Number(startIndex) || 0);
      const end = Math.max(start, Number(endIndex) || 0);
      const startPage = Math.floor(start / perPage) + 1;
      const endPage = Math.floor(end / perPage) + 1;
      const pages = [];
      for (let page = startPage; page <= endPage; page += 1) {
        pages.push(page);
      }
      if (startPage > 1) {
        pages.push(startPage - 1);
      }
      pages.push(endPage + 1);
      loadPages({ path: listPath, pages, perPage });
    },
    [loadPages]
  );

  return (
    <PureGlobal
      preset={{
        ajax: async api => ({ data: { code: 0, data: api.loader?.() } }),
        apis: { file: { staticUrl: '' } }
      }}
    >
      <InfoPage>
        <InfoPage.Part title={&#96;虚拟滚动（bulk 大目录 + nest 多层目录，共 ${folderItems.length} 个文件夹节点）&#96;}>
          <p style={{ marginBottom: 12, color: 'rgba(0,0,0,0.45)' }}>
            进入 <code>bulk/folder-01</code> 可测二级/三级。分栏：单击文件夹展开下一列，双击进入目录；每列纵向虚拟滚动。
          </p>
          <div style={{ height: 560 }}>
            <FileSystem
              title="Virtual Scroll Demo"
              defaultView="columns"
              defaultPath="bulk/"
              items={folderItems}
              entries={entries}
              totalCount={totalCount}
              loadingIndexes={loadingIndexes}
              ready={ready}
              columnListings={columnListings}
              onVisibleRangeChange={handleVisibleRangeChange}
              onPathChange={resetForPath}
              onFileOpen={entry => console.log('Open file:', entry)}
              onSelectionChange={selected => console.log('Selection:', selected.length)}
              propertiesPanel
            />
          </div>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- FileSystem 扩展顶部菜单
- 通过 toolbarExtra 在导航栏追加上传、新建文件夹、刷新、删除选中等自定义操作
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),icons(@ant-design/icons),remoteLoader(@kne/remote-loader)

```jsx
const { FileSystem } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Button, message, Space } = antd;
const { DeleteOutlined, ReloadOutlined, UploadOutlined, FolderAddOutlined } = icons;
const { useState } = React;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [items] = useState([
    { kind: 'folder', path: 'documents/', name: 'Documents' },
    { kind: 'file', path: 'documents/Q3-report.pdf', name: 'Q3-report.pdf', size: 1024000 },
    { kind: 'file', path: 'documents/notes.md', name: 'notes.md', size: 3200 },
    { kind: 'file', path: 'readme.txt', name: 'readme.txt', size: 1200 }
  ]);

  return (
    <PureGlobal
      preset={{
        ajax: async api => ({ data: { code: 0, data: api.loader?.() } }),
        apis: {
          file: {
            staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
          }
        }
      }}
    >
      <InfoPage>
        <InfoPage.Part title="扩展顶部菜单（toolbarExtra）">
          <FileSystem
            items={items}
            title="My Files"
            defaultView="list"
            toolbarExtra={
              <Space size={8}>
                <Button size="small" icon={<UploadOutlined />} onClick={() => message.info('自定义上传')}>
                  上传
                </Button>
                <Button size="small" icon={<FolderAddOutlined />} onClick={() => message.info('自定义新建文件夹')}>
                  新建文件夹
                </Button>
                <Button
                  size="small"
                  icon={<ReloadOutlined />}
                  onClick={() => message.success('已刷新')}
                >
                  刷新
                </Button>
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={!selectedEntries.length}
                  onClick={() => message.info(&#96;已选择 ${selectedEntries.length} 项&#96;)}
                >
                  删除选中
                </Button>
              </Space>
            }
            onSelectionChange={entries => {
              setSelectedEntries(entries || []);
            }}
            onFileOpen={entry => {
              console.log('Open file:', entry);
            }}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- FileSystem 扩展预览类型
- 通过 preset({ previewExtensions, previewMapping }) 扩展 .log / .dwg 等预览类型（对齐 table-view）
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { FileSystem, FilePreview, preset } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { useState } = React;

const CadPreview = ({ filename, url }) => {
  return (
    <div style={{ padding: 24, background: '#fafafa', height: '100%' }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>自定义 CAD 预览</div>
      <div>文件名：{filename || '-'}</div>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginTop: 4 }}>地址：{url || '-'}</div>
    </div>
  );
};

// 对齐 @kne/table-view：通过 preset 扩展预览类型
preset({
  previewExtensions: {
    log: 'txt',
    dwg: 'cad'
  },
  previewMapping: {
    cad: CadPreview
  }
});

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  const [items] = useState([
    { kind: 'folder', path: 'docs/', name: 'docs' },
    { kind: 'file', path: 'docs/readme.txt', name: 'readme.txt', size: 128 },
    { kind: 'file', path: 'docs/app.log', name: 'app.log', size: 256 },
    { kind: 'file', path: 'docs/plan.dwg', name: 'plan.dwg', size: 1024 },
    { kind: 'file', path: 'docs/report.pdf', name: 'report.pdf', size: 2048 }
  ]);

  return (
    <PureGlobal
      preset={{
        ajax: async api => ({ data: { code: 0, data: api.loader?.() } }),
        apis: {
          file: {
            staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
          }
        }
      }}
    >
      <InfoPage>
        <InfoPage.Part title="扩展预览类型（preset）">
          <FileSystem
            items={items}
            title="Preview Ext"
            defaultView="gallery"
            canPreviewFile={entry => /\.(log|dwg|txt|pdf)$/i.test(entry.name || '')}
            renderFilePreview={entry => <FilePreview src={entry.path} filename={entry.name} originName={entry.name} />}
            onFileOpen={entry => {
              console.log('Open file:', entry);
            }}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- FileSystem 状态徽标
- 文件/文件夹右上角状态徽标：sync / processing / success / error / cancelled，以及自定义 JSX；支持 entry.status、options.status、getEntryStatus
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),icons(@ant-design/icons),remoteLoader(@kne/remote-loader)

```jsx
const { FileSystem, EntryIcon } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Space, Tag } = antd;
const { StarFilled } = icons;
const { useState } = React;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  const [items] = useState([
    { kind: 'folder', path: 'syncing/', name: '同步中的文件夹', status: 'sync' },
    { kind: 'folder', path: 'done/', name: '已完成文件夹', status: 'success' },
    { kind: 'file', path: 'report-processing.pdf', name: 'report-processing.pdf', size: 1024000, status: 'processing' },
    { kind: 'file', path: 'report-error.xlsx', name: 'report-error.xlsx', size: 512000, status: 'error' },
    { kind: 'file', path: 'notes-done.md', name: 'notes-done.md', size: 3200, status: 'complete' },
    { kind: 'file', path: 'draft-cancelled.docx', name: 'draft-cancelled.docx', size: 256000, status: 'cancelled' },
    { kind: 'file', path: 'logo.png', name: 'logo.png', size: 45000, status: '同步' },
    { kind: 'file', path: 'readme.md', name: 'readme.md', size: 1200, options: { status: '进行中' } },
    { kind: 'file', path: 'custom-star.txt', name: 'custom-star.txt', size: 800, status: 'custom' }
  ]);

  return (
    <PureGlobal
      preset={{
        ajax: async api => ({ data: { code: 0, data: api.loader?.() } }),
        apis: {
          file: {
            staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
          }
        }
      }}
    >
      <InfoPage>
        <InfoPage.Part title="内置状态徽标（entry.status / options.status）">
          <Space wrap size={16} style={{ marginBottom: 16 }}>
            {[
              ['sync', '同步'],
              ['processing', '进行中'],
              ['success', '完成'],
              ['error', '错误'],
              ['cancelled', '已取消']
            ].map(([status, label]) => (
              <Space key={status} direction="vertical" align="center" size={4}>
                <EntryIcon entry={{ kind: 'file', name: 'demo.pdf' }} size="lg" status={status} />
                <Tag>{label}</Tag>
              </Space>
            ))}
            <Space direction="vertical" align="center" size={4}>
              <EntryIcon
                entry={{ kind: 'folder', name: 'folder' }}
                size="lg"
                status={<StarFilled style={{ color: '#faad14', fontSize: 7.2 }} />}
              />
              <Tag>自定义 JSX</Tag>
            </Space>
          </Space>
        </InfoPage.Part>
        <InfoPage.Part title="文件系统中的徽标展示">
          <FileSystem
            items={items}
            title="Status Badges"
            defaultView="icons"
            getEntryStatus={entry => {
              if (entry.status === 'custom') {
                return <StarFilled style={{ color: '#faad14', fontSize: 7.2 }} />;
              }
              return entry.status ?? entry.options?.status;
            }}
            onFileOpen={entry => {
              console.log('Open file:', entry);
            }}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- FileSystem.PropertiesPanel
- 使用 FileSystem.PropertiesPanel.Default / InfoRow / Section 扩展属性面板显示字段
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileSystem } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  const { PropertiesPanel } = FileSystem;
  const items = [
    { kind: 'folder', path: 'documents/', name: 'Documents', createdAt: '2024-10-09T11:44:00' },
    { kind: 'folder', path: 'documents/reports/', name: 'Reports' },
    { kind: 'file', path: 'documents/reports/Q3-report.pdf', name: 'Q3-report.pdf', size: 1024000, author: 'Alice' },
    { kind: 'file', path: 'documents/meeting-notes.docx', name: 'meeting-notes.docx', size: 256000, author: 'Bob' },
    {
      kind: 'file',
      path: '超长文件名-2024年度第一季度产品规划评审会会议纪要与行动项跟踪清单-最终版-v3.2.1-已确认.pdf',
      name: '超长文件名-2024年度第一季度产品规划评审会会议纪要与行动项跟踪清单-最终版-v3.2.1-已确认.pdf',
      size: 1048576,
      author: 'Alice'
    },
    {
      kind: 'folder',
      path: '超长文件夹名称-客户交付资料归档-华东区-2024Q1-Q2合并备份/',
      name: '超长文件夹名称-客户交付资料归档-华东区-2024Q1-Q2合并备份'
    },
    {
      kind: 'file',
      path: 'very-very-long-english-filename-without-spaces-product-requirements-document-final-review-copy-v12.docx',
      name: 'very-very-long-english-filename-without-spaces-product-requirements-document-final-review-copy-v12.docx',
      size: 256000,
      author: 'Bob'
    },
    { kind: 'file', path: 'readme.md', name: 'readme.md', size: 3200, author: 'Alice' },
    { kind: 'file', path: 'config.json', name: 'config.json', size: 1200 }
  ];

  return (
    <PureGlobal
      preset={{
        ajax: async api => {
          return { data: { code: 0, data: api.loader() } };
        },
        apis: {
          file: {
            staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
          }
        }
      }}
    >
      <InfoPage>
        <InfoPage.Part title="默认 PropertiesPanel">
          <FileSystem items={items} title="My Files" defaultView="icons" propertiesPanel />
        </InfoPage.Part>
        <InfoPage.Part title="扩展 PropertiesPanel.Default / InfoRow / Section">
          <FileSystem
            items={items}
            title="My Files"
            defaultView="icons"
            propertiesPanel={({ selectedEntries, index }) => (
              <PropertiesPanel.Default
                selectedEntries={selectedEntries}
                index={index}
                extraInfo={({ entry }) =>
                  entry?.kind === 'file' ? <PropertiesPanel.InfoRow label="作者" value={entry.author} /> : null
                }
                extraSections={({ entry }) =>
                  entry ? (
                    <PropertiesPanel.Section title="更多">
                      <PropertiesPanel.InfoRow label="路径" value={entry.path} />
                    </PropertiesPanel.Section>
                  ) : null
                }
              />
            )}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

### API

### File

文件组件，通过OSS文件ID获取文件URL，使用render props模式。内部使用`withOSSFile` HOC获取文件URL。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID，必填 |
| children | function({ url, ...props }) | - | render props函数，参数包含获取到的文件URL |
| apis | object | - | 自定义API配置，会与全局preset.apis合并 |
| loading | ReactNode | null | 加载中显示的内容 |
| error | ReactNode | - | 加载失败显示的内容 |
| ttl | number | 6000000 | 缓存过期时间（毫秒） |
| cacheName | string | 'file-cache' | 缓存名称 |

---

### FileUpload

文件上传组件，支持单文件和多文件上传。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| value | array | [] | 已上传文件列表（受控） |
| defaultValue | array | [] | 默认文件列表 |
| onChange | function(list) | - | 文件列表变化回调 |
| accept | string[] | ['.pdf','.jpg','.png','.jpeg','.doc','.docx','.xls','.xlsx','.html','.msg','.eml','.zip'] | 接受的文件类型 |
| multiple | boolean | true | 是否支持多文件上传 |
| fileSize | number | 100 | 单个文件最大尺寸（MB） |
| maxLength | number | 10 | 最大文件数量 |
| concurrentCount | number | 10 | 上传并发数 |
| size | string | - | 按钮尺寸，同antd Button的size |
| showUploadList | boolean | true | 是否显示已上传文件列表 |
| children | ReactNode | '文件上传' | 上传按钮文字 |
| renderTips | function(defaultTips, { fileSize, maxLength, accept }) | v => v | 自定义提示信息渲染 |
| onSave | function(data, file, uuid) | - | 上传成功后数据处理回调，返回值将作为新的文件对象 |
| onUpload | function({ file, path? }) | - | 自定义上传函数；优先于 `ossUpload` / preset `apis.file.upload` |
| ossUpload | function | - | 自定义上传函数（兼容旧写法，等价于 `onUpload`） |
| directory | string | - | 上传目录；内部映射为后端 `path` 传给上传接口 |
| getPermission | function(type) | - | 文件列表操作权限控制函数，type为'preview'/'delete'等 |
| apis | object | - | API配置对象 |
| renderModal | function(modalProps) | props => Modal | 自定义弹窗渲染函数 |

---

### FileInput

文件输入组件，提供文件选择按钮。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| accept | string[] | defaultAccept | 接受的文件类型 |
| multiple | boolean | true | 是否支持多选 |
| buttonText | string | '文件上传' | 按钮文字 |
| onChange | function(fileList) | - | 文件选择后的回调，参数为File数组 |
| children | function({ children, ...props }) | - | 自定义按钮渲染函数 |
| disabled | boolean | false | 是否禁用 |

---

### FilePreview

文件预览组件，根据文件类型自动选择合适的预览方式。提供`src`时使用`TypePreview`，提供`id`时使用`OSSFilePreview`。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID |
| src | string | - | 文件URL |
| filename | string | - | 文件名，用于确定文件类型 |
| originName | string | - | 原始文件名，作为filename的备选 |
| apis | object | - | API配置对象 |

#### 预览子组件

以下子组件均可单独使用：

| 子组件 | 描述 |
|--------|------|
| ImagePreview | 图片预览 |
| AudioPreview | 音频预览 |
| VideoPreview | 视频预览 |
| PdfPreview | PDF预览 |
| DocxPreview | Word文档预览 |
| XlsxPreview | Excel预览 |
| OfficePreview | Office文档预览（根据文件类型选择DocxPreview或XlsxPreview） |
| HtmlPreview | HTML预览 |
| MarkdownPreview | Markdown预览 |
| JsonPreview | JSON预览 |
| ZipPreview | ZIP压缩包预览 |
| TextPreview | 文本文件预览 |
| UnknownPreview | 未知类型文件预览 |
| OSSFilePreview | OSS文件预览（通过ID获取URL后自动选择预览方式） |

---

### MarkdownPreview

Markdown文件预览组件。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| url | string | - | Markdown文件的URL地址 |
| className | string | - | 自定义容器类名 |
| maxWidth | string/number | - | 容器最大宽度 |

---

### JsonPreview

JSON文件预览组件，使用@kne/json-view提供友好的JSON数据展示。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| url | string | - | JSON文件的URL地址 |
| className | string | - | 自定义容器类名 |
| maxWidth | string/number | - | 容器最大宽度 |
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| collapsedFrom | number | - | 从第几级开始收起，默认全部展开 |
| searchable | boolean | true | 是否开启搜索功能 |
| collapsable | boolean | true | 是否显示展开/收起全部按钮 |
| indentWidth | number | 20 | 缩进宽度（像素） |
| showLineNumbers | boolean | true | 是否显示行号 |

---

### ZipPreview

ZIP压缩包文件预览组件，支持查看压缩包内部的文件列表和目录结构。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| url | string | - | ZIP文件的URL地址 |
| className | string | - | 自定义容器类名 |
| maxWidth | string/number | - | 容器最大宽度 |

---

### FileList

文件列表组件，用于展示和管理文件。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| dataSource | array | [] | 文件列表数据，每项包含 id/filename/date/userName/type 等 |
| getPermission | function(type, item) | () => true | 操作权限控制函数，type为'preview'/'edit'/'download'/'delete' |
| infoItemRenders | array | [用户名, 日期] | 信息列渲染函数数组 |
| onDelete | function(item) | - | 删除文件的回调函数 |
| onEdit | function(item) | - | 编辑文件的回调函数 |
| apis | object | - | API配置对象 |
| renderModal | function(modalProps) | props => Modal | 自定义弹窗渲染函数 |

#### dataSource 数据项

| 字段 | 类型 | 描述 |
|------|------|------|
| id | string | 文件ID |
| filename | string | 文件名 |
| src | string | 文件URL |
| date | string | 上传日期（ISO格式） |
| userName | string | 上传用户名 |
| type | string | 'uploading'表示上传中 |
| uuid | string | 上传中的临时标识 |

---

### FileListOptionButtons

文件列表操作按钮组件，提供预览、编辑、下载、删除操作。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| item | object | - | 文件数据项 |
| hasPreview | boolean | true | 是否显示预览按钮 |
| getPermission | function(type, item) | () => true | 操作权限控制函数 |
| apis | object | {} | API配置对象 |
| onDelete | function(item) | - | 删除回调 |
| onEdit | function(item) | - | 编辑回调 |
| onPreview | function(item) | - | 预览回调 |
| renderModal | function(modalProps) | props => Modal | 自定义弹窗渲染函数 |

---

### Download

文件下载按钮组件，基于antd Button封装。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID，通过API获取下载URL |
| src | string | - | 直接的下载URL |
| filename | string | '未命名下载文件' | 下载后的文件名 |
| api | object | - | 自定义API配置 |
| onSuccess | function | - | 下载成功的回调函数 |
| onError | function | - | 下载失败的回调函数 |
| onClick | function | - | 点击按钮的回调函数 |
| ...antd Button props | - | - | 支持所有antd Button属性 |

#### 静态方法

| 方法 | 描述 |
|------|------|
| Download.useDownload | useDownload Hook |
| Download.download | download(url, filename) 下载工具函数 |
| Download.downloadBlobFile | downloadBlobFile(input, filename, locale) Blob下载函数 |

---

### FileButton

文件操作按钮组件，点击后弹出文件预览弹窗。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID |
| src | string | - | 文件URL |
| filename | string | - | 文件名 |
| originName | string | - | 原始文件名，作为filename的备选 |
| title | string | - | 弹窗标题，默认使用filename |
| modalProps | object | - | 传递给弹窗的属性，如{ width: 800 } |
| openDownload | boolean | false | 弹窗中是否显示下载按钮 |
| openPrint | boolean | false | 弹窗中是否显示打印按钮（仅txt/pdf/image/html类型支持） |
| children | ReactNode \| function(filename) | - | 按钮内容，支持函数返回 |
| ...antd Button props | - | - | 支持所有antd Button属性（默认icon为LinkOutlined） |

---

### FileModal

文件预览弹窗组件。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID |
| src | string | - | 文件URL |
| filename | string | - | 文件名 |
| title | string | - | 弹窗标题 |
| open | boolean | - | 是否显示（受控） |
| defaultOpen | boolean | - | 默认是否显示 |
| onOpenChange | function(open) | - | 显示状态变化回调 |
| openDownload | boolean | false | 是否显示下载按钮 |
| openPrint | boolean | false | 是否显示打印按钮 |
| footer | ReactNode | null | 弹窗底部内容 |
| apis | object | - | API配置对象 |

---

### Image

图片组件，支持默认头像和加载失败处理。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID，通过ID获取图片URL |
| src | string | - | 图片源URL |
| alt | string | - | 图片替代文本 |
| loading | ReactNode | Skeleton.Avatar | 加载中显示的内容 |
| error | ReactNode | PhotoFail图标 | 加载失败显示的内容 |
| className | string | - | 自定义类名 |
| apis | object | - | API配置对象 |
| staticUrl | string | - | 静态资源URL前缀 |
| onClick | function | - | 点击事件 |
| children | function({ alt, className, src }) | - | 自定义渲染函数 |

#### Image.Avatar

头像子组件。

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID |
| src | string | - | 图片源URL |
| gender | string | - | 性别，'F'/'female'显示女性头像，'M'/'male'显示男性头像 |
| shape | 'circle' \| 'square' | 'circle' | 头像形状 |
| size | number | 100 | 头像大小 |
| width | number | - | 自定义宽度（与height一起使用时shape自动变为square） |
| height | number | - | 自定义高度 |
| gap | number | - | 头像与边框的间距 |
| icon | ReactNode | - | 自定义图标 |
| defaultAvatar | ReactNode | AvatarDefault图标 | 默认头像SVG |
| loading | ReactNode | Skeleton.Avatar | 加载中显示的内容 |
| error | ReactNode | PhotoFail图标 | 加载失败显示的内容 |
| apis | object | - | API配置对象 |

---

### FileSystem

文件系统浏览组件，提供图标、列表、分栏、画廊四种视图模式。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| items | array | - | 文件系统条目数组 |
| title | string | 'Files' | 标题，当路径为根目录时显示 |
| defaultView | 'icons' \| 'list' \| 'columns' \| 'gallery' | 'list' | 默认视图模式 |
| defaultPath | string | '' | 默认路径 |
| className | string | - | 自定义类名 |
| toolbarExtra | ReactNode \| (ctx) => ReactNode | - | 工具栏扩展；函数时接收 `{ selectedEntries, clearSelection, currentPath }` |
| propertiesPanel | boolean \| ReactNode \| (ctx) => ReactNode | true | 右侧属性面板；`false` 关闭；函数时接收 `{ selectedEntries, index, currentPath, close, actions, onAction, defaultActions }` |
| propertiesActions | false \| ActionItem[] \| (ctx) => ActionItem[] \| object | 内置默认 | 属性面板操作；`false` 关闭；数组按 key 合并；函数完全自定义；`{ list, replace?, ...ButtonGroupProps }` 可替换或合并 |
| onPropertiesAction | (key, ctx) => void | - | 操作点击回调；`ctx` 含 `entry` / `selectedEntries` / `clearSelection` / `currentPath` |
| onSelectionChange | function(entries) | - | 选中项变化回调，参数为选中条目数组 |
| onPathChange | function(path) | - | 当前文件夹路径变化回调 |
| onFileOpen | function(entry) | - | 打开文件回调 |
| renderFilePreview | function(entry) | - | 画廊视图中的文件预览渲染函数 |
| canPreviewFile | function(entry) | - | 判断文件是否可预览的函数 |
| getEntryStatus | function(entry) => string \| ReactNode | - | 返回右上角状态徽标；优先于 `entry.status` / `entry.options.status` |
| entries | array | - | 异步分页：当前目录稀疏数组（`length === totalCount`，未加载为 empty） |
| totalCount | number | - | 异步分页：当前目录总数量；与 `onVisibleRangeChange` 同时传入即开启虚拟滚动 |
| loadingIndexes | Set \| array | - | 异步分页：正在加载的下标，显示骨架占位 |
| ready | boolean | - | 异步分页：当前目录是否已确认首屏数据；`false` 时即使 `totalCount === 0` 仍挂载虚拟列表以测量视口；未传时保持旧逻辑 |
| columnListings | object | - | 异步分页（分栏）：按目录 path 隔离的列表数据，形如 `{ [path]: { entries, totalCount, loadingIndexes?, ready? } }`；展开列从这里读，避免只靠当前目录 `entries` |
| onRegisterFolder | function(path, id) | - | 分栏单击文件夹展开下一列时回调；用于业务侧登记 folderId 与 path 的映射 |
| onVisibleRangeChange | function(range) | - | 异步分页：可视范围变化。`range` 含：`startIndex` / `endIndex` / `view` / `viewport` / `pageSize` / `currentPath` / `keyword` / `path` / `columnPath`。分栏展开列以 `columnPath`（或合并后的 `path`）为准拉目录；其它视图 `path` 等于 `currentPath` |

`calcPageSize({ view, width, height, buffer? })` 可按视口估算建议 `perPage`（也可写作 `FileSystem.calcPageSize`）。`view` 为 `icons` / `list` / `columns` / `gallery`；`buffer` 默认 `2`，结果夹在 20–200。

#### FileSystem.PropertiesPanel

| 成员 | 说明 |
|------|------|
| Default | 默认属性内容；支持 `extraInfo` / `extraSections`（节点或 `({ entry, selectedEntries, index }) => node`）追加信息行/区块；支持 `actions` / `onAction` |
| InfoRow | 信息行（`label` / `value`，value 为空不渲染） |
| Section | 信息区块（`title` / `children`） |
| Actions | 操作按钮组（接收 `actions` / `onAction`，语义同 `propertiesActions`） |
| getDefaultActions | 生成默认操作列表 |

可用 `FileSystem.PropertiesPanel.Default / InfoRow / Section / Actions` 扩展属性显示。

多选逻辑与 Windows / macOS 文件管理器一致：普通点击单选；Ctrl（Windows）/ Command（macOS）+ 点击切换选中；Shift + 点击按当前目录顺序区间选中；在空白处拖拽可框选（Ctrl/Command + 框选为追加）；点击空白取消选中。树形列表视图暂不支持框选。

#### items 数据项

| 字段 | 类型 | 描述 |
|------|------|------|
| kind | 'file' \| 'folder' | 条目类型 |
| path | string | 条目路径 |
| name | string | 显示名称（可选，默认从路径提取） |
| size | number | 文件大小（字节，仅file类型） |
| parentPath | string | 父路径（可选，默认从path提取） |
| status | string \| ReactNode | 右上角状态徽标；内置：`sync` / `processing` / `success`（`complete`） / `error` / `cancelled`，及中文别名；也可传自定义 JSX |
| options.status | string \| ReactNode | 同上，当 `status` 未设置时读取 |

#### EntryIcon

文件/文件夹图标组件，支持右上角状态徽标（圆形；相对 20px 规格缩至 60%：约 12px 外径、1.2px 白边与 padding、7.2px 图标）。

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| entry | object | - | 含 `kind` / `name`（或 `path`）的条目 |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 图标尺寸 |
| status | string \| ReactNode | - | 徽标；不传时读 `entry.status` / `entry.options.status` |

---

### PrintButton

打印按钮组件，触发浏览器打印功能。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| contentRef | Ref | - | 需要打印内容的ref引用 |
| content | ReactNode | - | 打印内容（备用） |
| onBeforePrint | function | - | 打印前的回调函数 |
| onSuccess | function | - | 打印成功的回调函数 |
| onError | function | - | 打印失败的回调函数 |
| printProps | object | - | 传递给react-to-print的属性 |
| ...antd Button props | - | - | 支持所有antd Button属性 |

---

### withOSSFile

高阶组件，通过OSS文件ID获取文件URL并注入到被包裹组件。

#### 用法

```jsx
const MyComponent = withOSSFile(({ data, id, ...props }) => {
  // data 为获取到的文件URL
  return <div>{data}</div>;
});
```

#### 被注入的属性

| 属性 | 类型 | 描述 |
|------|------|------|
| data | string | 获取到的文件URL |
| fetchApi | object | react-fetch的API对象 |
| id | string | 格式化后的文件ID（去除了查询参数） |

---

### uploadFile

统一上传入口。库内上传应走此 API；会解析自定义 `onUpload` 或 preset `apis.file.upload` / `ossUpload` / `upload`，并将 `directory` 映射为后端 `path`。

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| file | File | - | 待上传文件 |
| directory | string | - | 上传目录，映射为请求体 `path` |
| onUpload | function({ file, path? }) | - | 自定义上传函数；不传则读 `apis` |
| apis | object | - | API 配置；默认取自 preset |

#### 返回值

上传接口的原始返回值（通常为 `{ data: { code, data, msg } }` 形态，由业务 `apis.file.upload` 决定）。

```jsx
import { uploadFile } from '@kne/react-file';

await uploadFile({ file, directory: 'docs/2026' });
```

---

### useUploadFile

返回绑定当前 preset `apis` 的 `uploadFile` 函数，便于在组件内直接调用。

#### 返回值

| 类型 | 描述 |
|------|------|
| function(params) | 同 `uploadFile`；可再传 `apis` 覆盖 preset |

```jsx
import { useUploadFile } from '@kne/react-file';

const upload = useUploadFile();
await upload({ file, directory: 'avatars' });
```

---

### useFileUpload

文件上传Hook，处理文件上传逻辑。

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| multiple | boolean | true | 是否支持多文件 |
| fileSize | number | 100 | 单个文件最大尺寸（MB） |
| maxLength | number | 10 | 最大文件数量 |
| value | array | [] | 已上传文件列表 |
| concurrentCount | number | 1 | 上传并发数 |
| onAdd | function(file) | - | 文件添加后回调（上传前） |
| onError | function({ file, error, errMsg }) | - | 上传失败回调 |
| onSave | function(data, file, uuid) | - | 上传成功后数据处理回调 |
| onChange | function(list) | - | 文件列表变化回调 |
| onUpload | function({ file, path? }) | - | 自定义上传函数 |
| directory | string | - | 上传目录；内部映射为后端 `path` |

#### 返回值

| 字段 | 类型 | 描述 |
|------|------|------|
| fileList | array | 正在上传中的文件列表 |
| onFileSelected | function(fileList) | 文件选择处理函数 |

---

### useDownload

文件下载Hook。

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | OSS文件ID |
| src | string | - | 直接的下载URL |
| filename | string | - | 下载后的文件名 |
| staticUrl | string | - | 静态资源URL前缀 |
| apis | object | - | 自定义API配置 |
| onError | function(error) | - | 下载失败回调 |
| onSuccess | function | - | 下载成功回调 |

#### 返回值

| 字段 | 类型 | 描述 |
|------|------|------|
| isLoading | boolean | 是否正在下载 |
| download | function() | 触发下载 |
| ...react-fetch返回值 | - | 包含refresh等其他属性 |

---

### downloadBlobFile

Blob文件下载工具函数，支持URL字符串、Blob对象和远程URL下载。

#### 参数

```javascript
downloadBlobFile(input, filename, locale)
```

| 参数 | 类型 | 描述 |
|------|------|------|
| input | string \| Blob | 下载源，支持blob URL、Blob对象或远程URL |
| filename | string | 下载后的文件名，默认'file' |
| locale | string | 国际化语言标识 |

---

### download

文件下载工具函数，通过创建a标签触发下载。

#### 参数

```javascript
download(url, filename)
```

| 参数 | 类型 | 描述 |
|------|------|------|
| url | string | 下载URL |
| filename | string | 下载后的文件名 |

---

### computedAccept

计算接受的文件类型，将文件类型数组转为浏览器accept属性值。

#### 参数

```javascript
computedAccept(accept)
```

| 参数 | 类型 | 描述 |
|------|------|------|
| accept | string \| string[] | 文件类型，如'.jpg,.png'或['.jpg', '.png'] |

#### 返回值

| 类型 | 描述 |
|------|------|
| string | 浏览器accept属性值 |

---

### typeFormat

根据文件扩展名获取文件类型标识。

#### 参数

```javascript
typeFormat(filename)
```

| 参数 | 类型 | 描述 |
|------|------|------|
| filename | string | 文件名 |

#### 返回值

| 类型 | 描述 |
|------|------|
| string | 文件类型标识，如'image'/'pdf'/'docx'等 |

---

### preset / globalParams

全局参数预设（对齐 `@kne/table-view`），用于扩展或覆盖文件预览类型。

```jsx
import { preset, TextPreview } from '@kne/react-file';

preset({
  // 扩展名 -> 预览类型 key（内置识别不到时生效）
  previewExtensions: {
    log: 'txt',
    dwg: 'cad'
  },
  // 预览类型 key -> 预览组件（可新增或覆盖内置）
  previewMapping: {
    cad: CadPreview // 自定义组件，props 含 url / filename 等
  }
});
```

| 属性 | 类型 | 说明 |
|------|------|------|
| previewMapping | object | 合并到内置 `typeComponentMapping`，如 `{ pdf, image, cad: Comp }` |
| previewExtensions | object | 扩展名（不含点）到类型 key 的映射，如 `{ dwg: 'cad' }` |

也可通过 `components-core:File@preset` 在宿主初始化时调用。

---

### typeFormatComponent

根据文件名获取对应的预览组件。

#### 参数

```javascript
typeFormatComponent(filename)
```

| 参数 | 类型 | 描述 |
|------|------|------|
| filename | string | 文件名 |

#### 返回值

| 类型 | 描述 |
|------|------|
| React.ComponentType | 对应的预览组件 |

# FileList

### 概述

FileList 组件提供了一套完整的文件管理解决方案，集成了文件列表展示、文件预览、文件上传等功能。

该组件支持拖拽上传、点击上传两种方式，提供了列表和预览两种视图模式。列表视图展示文件详细信息并支持编辑、删除、预览等操作，预览视图直接展示文件内容。组件内置了文件类型识别、上传进度管理、权限控制等功能，可以轻松集成到各种业务场景中。

核心特性：
- **多视图模式**：支持列表视图和预览视图切换，满足不同使用需求
- **拖拽上传**：支持拖拽文件到指定区域进行上传，提升用户体验
- **文件预览**：内置预览功能，支持多种文件格式的在线预览
- **权限控制**：支持细粒度的权限控制，可控制添加、编辑、删除、预览等操作
- **灵活配置**：支持自定义文件类型、文件大小限制、最大上传数量等参数
- **受控/非受控**：同时支持受控和非受控模式，适应不同的使用场景

适用于文档管理系统、人力资源系统、项目管理工具等需要文件处理的应用场景。


### 示例(全屏)

#### 示例代码

- FileButton
- 预览文件按钮
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileButton } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            const urlMap = {
              1: '/mock/resume.png',
              2: '/mock/resume.pdf',
              3: '/mock/resume.html',
              4: '/mock/resume.txt',
              5: '/mock/audio.wav',
              6: '/mock/resume.docx'
            };
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urlMap[params.id]);
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <FileButton id="1" filename="demo.jpg" openPrint modalProps={{ width: 800 }}>预览demo.jpg</FileButton>
    <FileButton id="2" filename="demo2.pdf" openPrint modalProps={{ width: 800 }}>预览demo2.pdf</FileButton>
    <FileButton id="3" filename="demo2.html" openPrint modalProps={{ width: 800 }}>预览demo2.html</FileButton>
    <FileButton id="6" filename="resume.docx" openPrint modalProps={{ width: 800 }} type="link">resume.docx</FileButton>
  </PureGlobal>;
});

render(<BaseExample />);


```

- FileList
- 文件列表
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileList } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Divider } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            const urlMap = {
              1: '/mock/resume.png',
              2: '/mock/resume.pdf',
              3: '/mock/resume.html',
              4: '/mock/resume.txt',
              5: '/mock/audio.wav',
              6: '/mock/resume.docx'
            };
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urlMap[params.id]);
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <FileList dataSource={[{
      uuid: '121233',
      type: 'uploading',
      filename: '张三的简历.doc'
    },
      {
        id: '2',
        filename: '我是一份简历.pdf',
        date: '2022-07-15T11:09:15.000+08:00',
        userName: '用户名'
      }]} />
    <Divider />
    <FileList dataSource={[]} />
  </PureGlobal>;
});

render(<BaseExample />);


```

- JsonPreview
- JSON文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { JsonPreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: api.loader() } };
      },
      apis: {
        file: {
          staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
        }
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="JSON文件预览 - 默认黑色主题">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            collapsedFrom={0}
          />
        </InfoPage.Part>
        <InfoPage.Part title="JSON文件预览 - 白色主题">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            theme="light"
            collapsedFrom={0}
          />
        </InfoPage.Part>
        <InfoPage.Part title="JSON文件预览 - 从第2级开始收起">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            collapsedFrom={2}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);


```

### API

#### FileList 组件

文件列表组件，提供文件展示、预览、上传等完整功能。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 文件列表数据 | array | 否 | [] |
| setList | 更新文件列表的函数 | function | 否* | - |
| defaultPreviewFileId | 默认预览的文件 ID | string | 否 | - |
| defaultTab | 默认显示的标签页，可选值为 `"list"` 或 `"preview"` | string | 否 | `"list"` |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| getPermission | 权限控制函数，接收参数 `(type, itemData)`，返回 `false` 表示无权限 | function | 否 | `() => true` |
| infoItemRenders | 自定义列渲染配置 | array | 否 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onSave | 保存文件回调，接收参数 `(response, ...args)` | function | 否 | - |
| apis.onEdit | 编辑文件名称回调，接收参数 `({formData, item})` | function | 否 | - |
| apis.onPreview | 预览文件回调，接收参数 `(item)` | function | 否 | - |
| apis.onDelete | 删除文件回调，接收参数 `(item)` | function | 否 | - |
| apis.onUpload | 文件上传回调 | function | 否 | - |
| titleExtra | 标题额外内容，可以是 ReactNode 或函数 | ReactNode \| function | 否 | - |
| getPopupContainer | 指定下拉菜单挂载的父节点 | function | 否 | - |

**注意**：使用受控模式时需要同时提供 `list` 和 `setList` 属性。

##### list 数据结构

| 属性名 | 说明 | 类型 |
|--------|------|------|
| id | 文件唯一标识符 | string |
| ossId | OSS 文件标识符 | string |
| filename | 文件名称 | string |
| date | 上传日期（时间戳或 Date 对象） | Date \| string |
| userName | 上传人姓名 | string |

#### FileUpload 组件

简化的文件上传组件，专注于文件上传和列表展示功能。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 文件列表数据 | array | 否 | - |
| defaultList | 默认文件列表数据 | array | 否 | [] |
| setList | 更新文件列表的函数 | function | 否 | - |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| getPermission | 权限控制函数，接收参数 `(type, itemData)`，返回 `false` 表示无权限 | function | 否 | `() => true` |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onSave | 保存文件回调 | function | 否 | - |
| apis.onEdit | 编辑文件名称回调 | function | 否 | - |
| apis.onPreview | 预览文件回调 | function | 否 | - |
| apis.onDelete | 删除文件回调 | function | 否 | - |

#### DragArea 组件

拖拽上传区域组件。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 拖拽区域内显示的内容 | ReactNode | 否 | `<UploadTips />` |
| className | 自定义类名 | string | 否 | - |

#### DragAreaOuter 组件

拖拽上传区域外层容器组件。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 标题内容 | ReactNode | 否 | - |
| children | 子内容 | ReactNode | 是 | - |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| onFileSelected | 文件选择回调，接收参数 `(fileList)` | function | 否 | - |
| defaultOpen | 默认是否打开拖拽区域 | boolean | 否 | false |
| className | 自定义类名 | string | 否 | - |

#### DragButton 组件

拖拽上传按钮组件。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮文字内容 | ReactNode | 否 | - |

#### UploadButton 组件

点击上传按钮组件。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮文字内容 | ReactNode | 否 | - |

#### UploadTips 组件

上传提示组件，显示上传说明信息。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| icon | 自定义图标 | ReactNode | 否 | - |
| title | 提示标题 | ReactNode | 否 | - |
| renderTips | 自定义提示内容渲染函数，接收参数 `(defaultTips, {fileSize, maxLength, accept})` | function | 否 | - |

# FilePreview

### 概述

FilePreview 是一个功能全面的文件预览组件库，支持多种常见文件格式的在线预览。该组件基于 @kne/react-file 封装，提供了统一的 API 接口，可根据文件类型自动选择合适的预览方式，极大简化了文件预览功能的集成。

核心特性包括：支持图片、音频、视频、PDF、HTML、文本和 Office 文档等多种格式；提供 OSS 文件预览能力，通过文件 ID 自动获取预览地址；响应式设计，自动适配容器宽度；完善的加载状态和错误提示；支持自定义 PDF 渲染参数和 Office 预览配置。

适用于文档管理系统、在线办公平台、内容管理系统等需要文件预览功能的场景，特别适合需要处理多种文件类型的企业级应用。组件采用模块化设计，可以独立使用各个预览组件，也可使用统一的 FilePreview 组件自动判断文件类型。


### 示例(全屏)

#### 示例代码

- FileUpload
- 文件上传
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileUpload } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const urls = {};

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urls[params.id]);
              }, 1000);
            });
          }
        }, upload: ({ file }) => {
          urls[file.name] = URL.createObjectURL(file);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 0, data: {
                    id: file.name, filename: file.name
                  }
                }
              });
            }, 1000);
          });
        }
      }
    }
  }}>
    <FileUpload />
  </PureGlobal>;
});

render(<BaseExample />);


```

- FilePreview
- 文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FilePreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return (
    <PureGlobal
      preset={{
        ajax: async api => {
          return { data: { code: 0, data: api.loader() } };
        },
        apis: {
          file: {
            staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
            getUrl: {
              loader: async ({ params }) => {
                const urlMap = {
                  1: '/mock/resume.png',
                  2: '/mock/resume.pdf',
                  3: '/mock/resume.html',
                  4: '/mock/resume.txt',
                  5: '/mock/audio.wav',
                  6: '/mock/resume.docx',
                  7: '/mock/example.zip',
                  8: '/mock/resume.xlsx'
                };
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve(urlMap[params.id]);
                  }, 1000);
                });
              }
            }
          }
        }
      }}>
      <InfoPage>
        <InfoPage.Part title="预览图片">
          <FilePreview id="1" />
        </InfoPage.Part>
        <InfoPage.Part title="预览PDF">
          <FilePreview id="2" />
        </InfoPage.Part>
        <InfoPage.Part title="预览HTML">
          <FilePreview id="3" />
        </InfoPage.Part>
        <InfoPage.Part title="预览TXT">
          <FilePreview id="4" />
        </InfoPage.Part>
        <InfoPage.Part title="预览AUDIO">
          <FilePreview id="5" />
        </InfoPage.Part>
        <InfoPage.Part title="预览OFFICE">
          <FilePreview id="6" filename="resume.docx" />
          <FilePreview id="8" filename="resume.xlsx" />
        </InfoPage.Part>
        <InfoPage.Part title="预览ZIP">
          <FilePreview id="7" />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);


```

- MarkdownPreview
- Markdown文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { MarkdownPreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules }) => {
  const [InfoPage] = remoteModules;
  return (
    <InfoPage>
      <InfoPage.Part title="基础用法">
        <MarkdownPreview url={&#96;${getPublicPath('react-file')}/mock/example.md&#96;} />
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<BaseExample />);


```

### API

#### FilePreview 组件

智能文件预览组件，根据文件类型自动选择对应的预览方式。支持直接传入文件 URL 或 OSS 文件 ID 两种方式。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| src | 文件预览地址，优先使用该参数 | string | 否 | - |
| id | OSS 文件标识符，当 src 未提供时使用 | string | 否 | - |
| originName | 原始文件名，用于判断文件类型 | string | 否 | - |
| filename | 文件名，用于判断文件类型 | string | 否 | - |
| apis | API 配置对象 | object | 否 | - |

#### OSSFilePreview 组件

OSS 文件预览组件，通过文件 ID 从服务器获取文件地址后进行预览。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件标识符 | string | 是 | - |
| filename | 文件名，用于判断文件类型 | string | 否 | - |
| staticUrl | 静态文件地址前缀 | string | 否 | - |
| render | 自定义渲染函数 | function | 否 | - |
| apis | API 配置对象 | object | 否 | - |

#### HtmlPreview 组件

HTML 文件预览组件，支持在 iframe 中展示 HTML 内容。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | HTML 文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| ignoreContent | 是否忽略内容检查，直接使用 iframe | boolean | 否 | false |
| className | 自定义类名 | string | 否 | - |

#### PdfPreview 组件

PDF 文件预览组件，基于 react-pdf 实现，支持缩放和旋转。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | PDF 文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| scale | 缩放比例（100 为原始大小） | number | 否 | 100 |
| rotate | 旋转角度 | number | 否 | 0 |
| pdfjsUrl | pdf.js CDN 地址 | string | 否 | https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296 |
| className | 自定义类名 | string | 否 | - |

#### TextPreview 组件

文本文件预览组件，支持纯文本文件的在线展示。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 文本文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| className | 自定义类名 | string | 否 | - |

#### ImagePreview 组件

图片预览组件，支持常见图片格式的展示。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 图片地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| scale | 缩放比例 | number | 否 | 1 |
| rotate | 旋转角度 | number | 否 | 0 |
| origin | 是否使用原生 img 标签，不带容器和加载状态 | boolean | 否 | false |
| className | 自定义类名 | string | 否 | - |

#### AudioPreview 组件

音频预览组件，使用原生 audio 标签进行音频播放。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 音频文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| className | 自定义类名 | string | 否 | - |

#### VideoPreview 组件

视频预览组件，使用原生 video 标签进行视频播放。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 视频文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| controls | 是否显示播放控件 | boolean | 否 | true |
| origin | 是否使用原生 video 标签，不带容器 | boolean | 否 | false |
| getElement | 获取 video 元素的回调函数 | function | 否 | - |
| className | 自定义类名 | string | 否 | - |

#### OfficePreview 组件

Office 文件预览组件，使用 Office Online Viewer 进行预览。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | Office 文件地址 | string | 是 | - |
| className | 自定义类名 | string | 否 | - |
| apis | API 配置对象，可配置自定义预览服务 | object | 否 | - |

#### UnknownPreview 组件

未知类型文件预览组件，用于不支持预览的文件类型。

##### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| maxWidth | 最大显示宽度 | number | 否 | 1200 |

# react-filter

### 描述

A React filter component library with multiple filter types, flexible layouts, and searchParams-based filter seeding.

### 安装

```shell
npm i --save @kne/react-filter
```

### 概述

### React Filter

一个功能强大的 React 筛选组件库，支持多种筛选字段类型、灵活的布局方式，以及从 searchParams 种子化筛选初始值的能力。

### 主要特性

- **多种筛选字段类型**：支持输入框、数字区间、日期选择、日期范围、下拉选择等常用筛选类型，以及职能、行业、城市等业务选择器
- **灵活布局**：支持普通筛选（横向布局）和高级筛选（垂直布局）两种模式
- **展开收起**：筛选行支持展开收起功能，优化页面空间利用
- **已选值展示**：自动展示已选筛选条件，支持单独删除和清空全部
- **弹出层交互**：支持弹出层形式的筛选交互，确认后才生效
- **searchParams 种子**：`useSearchParamsValue` 从 URL 平铺参数解析筛选初始值，可选清理已消费 key
- **稳定全局类名**：根 `react-filter`，内部短类名；用 `.react-filter .xxx` / `FILTER_CLASS` 定制
- **数据格式拦截器**：内置 `{id, name}` ↔ `{label, value}` 格式转换拦截器，适配 SuperSelect 场景
- **声明式值映射**：提供 `createFilterValueMapper` 按字段声明转换规则，简化 `getFilterValue` 结果处理
- **国际化支持**：内置中英文语言包，支持多语言切换
- **高阶组件**：提供 `withFilterValue` 和 `withFieldItem` 高阶组件，便于扩展自定义字段

### 适用场景

- 数据列表页面的筛选功能
- 复杂表单的筛选条件配置
- 多条件组合查询场景
- 需要展示已选筛选条件的场景
- 需要从 URL 参数带入初始筛选条件的页面

### 快速开始

```javascript
import Filter, { fields } from '@kne/react-filter';
import '@kne/react-filter/dist/index.css';

const { InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem } = fields;

function MyComponent() {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = Filter.getFilterValue(filterValue);
    console.log('筛选参数:', params);
  };

  return (
    <Filter
      value={filterValue}
      onChange={setFilterValue}
      list={[
        [
          { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } },
          { type: NumberRangeFilterItem, props: { name: 'amount', label: '金额' } }
        ],
        [
          { type: DatePickerFilterItem, props: { name: 'date', label: '日期' } }
        ]
      ]}
      displayLine={1}
      extra={<Button type="primary" onClick={handleSearch}>搜索</Button>}
    />
  );
}
```

### 核心组件

| 组件 | 说明 |
|------|------|
| `Filter` | 主筛选组件，横向布局，支持展开收起 |
| `AdvancedFilter` | 高级筛选组件，垂直布局 |
| `FilterValueDisplay` | 已选值展示组件 |
| `PopoverItem` | 弹出层筛选项组件 |
| `FilterItem` | 筛选项容器组件 |
| `FilterLines` | 筛选行组件 |
| `FilterProvider` | 状态管理组件 |

### 筛选字段

| 字段组件 | 说明 |
|----------|------|
| `InputFilterItem` | 输入框筛选 |
| `NumberRangeFilterItem` | 数字区间筛选 |
| `DatePickerFilterItem` | 日期选择筛选 |
| `DateRangePickerFilterItem` | 日期范围筛选 |
| `TypeDateRangePickerFilterItem` | 类型日期范围筛选（日/周/月切换） |
| `SuperSelectFilterItem` | 通用选择器筛选（单选/多选/搜索/全选） |
| `SelectTableListFilterItem` | 表格选择器筛选（多列数据展示） |
| `SelectTreeFilterItem` | 树形选择器筛选（层级数据） |
| `SelectCascaderFilterItem` | 级联选择器筛选（父子关联、搜索过滤） |
| `SelectFunctionFilterItem` | 职能筛选（多级数据、拼音搜索） |
| `SelectIndustryFilterItem` | 行业筛选（多级数据、拼音搜索） |
| `SelectAddressFilterItem` | 城市筛选（国内外城市搜索） |

### searchParams 工具

| 工具 | 说明 |
|------|------|
| `useSearchParamsValue` | 从 searchParams 解析筛选初始值数组；可选 strip 已消费 key |


### 其他工具

| 工具 | 说明 |
|------|------|
| `FILTER_CLASS` | 稳定全局类名常量（根 `react-filter` + 内部短类名（无 `filter-` 前缀）），见 api.md |
| `pickSelectValues` | 从筛选值中提取原始值数组 |
| `createFilterValueMapper` | 声明式创建 mapFilterValue 函数 |
| `filterInterceptors` | `{single, multi}` 拦截器集合 |
| `singleSelectInterceptor` | 单选格式转换拦截器 |
| `multiSelectInterceptor` | 多选格式转换拦截器 |


### 示例

#### 示例代码

- 基础筛选
- 使用 Filter 主组件，展示关键词、金额、日期、部门等多种筛选字段的组合使用
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { default: Filter, fields } = _ReactFilter;
const {
  InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem,
  DateRangePickerFilterItem, TypeDateRangePickerFilterItem,
  SuperSelectFilterItem, SelectFunctionFilterItem,
  SelectIndustryFilterItem, SelectAddressFilterItem
} = fields;
const { Flex, Button, message } = antd;
const { useState, useRef, useEffect } = React;

const departmentOptions = [
  { value: 'tech', label: '技术研发部' },
  { value: 'product', label: '产品设计部' },
  { value: 'operation', label: '运营管理部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'marketing', label: '市场营销部' }
];

const filterList = [
  {
    type: InputFilterItem,
    props: { name: 'keyword', label: '关键词', placeholder: '请输入关键词搜索' }
  },
  {
    type: NumberRangeFilterItem,
    props: { name: 'amount', label: '金额', unit: '元', min: 0, max: 999999 }
  },
  {
    type: DatePickerFilterItem,
    props: { name: 'createTime', label: '创建时间', format: 'YYYY-MM-DD' }
  },
  {
    type: DateRangePickerFilterItem,
    props: { name: 'dateRange', label: '日期范围', format: 'YYYY-MM-DD' }
  },
  {
    type: TypeDateRangePickerFilterItem,
    props: { name: 'typeDateRange', label: '快捷日期' }
  },
  {
    type: SuperSelectFilterItem,
    props: { name: 'department', label: '部门', options: departmentOptions }
  },
  {
    type: SelectFunctionFilterItem,
    props: { name: 'function', label: '职能' }
  },
  {
    type: SelectIndustryFilterItem,
    props: { name: 'industry', label: '行业' }
  },
  {
    type: SelectAddressFilterItem,
    props: { name: 'city', label: '城市' }
  }
];

const ContainerWidthIndicator = ({ containerRef }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const update = () => setWidth(Math.round(el.clientWidth));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return (
    <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
      中间容器宽度: {width}px（观察收起/更多时是否持续增大或跳动）
    </div>
  );
};

const BaseExample = () => {
  const [filterValue, setFilterValue] = useState([]);
  const filterContainerRef = useRef(null);

  const handleSearch = () => {
    const params = Filter.getFilterValue(filterValue);
    message.info(&#96;搜索参数: ${JSON.stringify(params, null, 2)}&#96;);
    console.log('筛选参数:', params);
  };

  return (
    <Flex vertical gap={16} style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <ContainerWidthIndicator containerRef={filterContainerRef} />
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8
          }}
        >
          <Button>左侧操作</Button>
          <div
            ref={filterContainerRef}
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              border: '1px dashed #d9d9d9',
              borderRadius: 4
            }}
          >
            <Filter value={filterValue} onChange={setFilterValue} list={filterList} />
          </div>
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </div>
      </div>
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>{JSON.stringify(filterValue, null, 2)}</pre>
      </Flex>
    </Flex>
  );
};

render(<BaseExample />);

```

- searchParamsValue
- useSearchParamsValue 从平铺 URL 参数解析筛选初始值，可选清理已消费 key；Filter value/onChange 由业务自行 seed
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { default: Filter, fields, useSearchParamsValue, getFilterValue } = _ReactFilter;
const { InputFilterItem } = fields;
const { Flex, Typography, Card } = antd;
const { useState, useMemo } = React;

/**
 * 示例：用 mock URLSearchParams 演示 useSearchParamsValue。
 * 真实环境请使用 react-router 的 useSearchParams。
 *
 * hook 只在首次挂载时解析一次；传入 setSearchParams 后会清理已消费 key。
 * Filter 的 value/onChange 由业务自行 seed / 管理。
 */
const BaseExample = () => {
  const initialSearch = useMemo(() => {
    const params = new URLSearchParams();
    params.set('userId', 'u-1001');
    params.set('tenantOrgId', 'org-1');
    params.set('tenantOrgName', '技术部');
    return params;
  }, []);

  const [searchParams, setSearchParams] = useState(initialSearch);

  const searchParamsValue = useSearchParamsValue({
    searchParams,
    setSearchParams,
    fields: [
      { name: 'userId', label: '用户Id' },
      { name: 'tenantOrgId', label: '部门', labelKey: 'tenantOrgName' }
    ]
  });

  const [filter, setFilter] = useState(searchParamsValue);

  return (
    <Flex vertical gap={16}>
      <Card size="small" title="说明">
        <Typography.Paragraph style={{ marginBottom: 8 }}>
          模拟进入页时 URL 为{' '}
          <Typography.Text code>
            ?userId=u-1001&amp;tenantOrgId=org-1&amp;tenantOrgName=技术部
          </Typography.Text>
          。hook 同步解析为 <Typography.Text code>searchParamsValue</Typography.Text>，并用{' '}
          <Typography.Text code>useState(searchParamsValue)</Typography.Text> seed 到 Filter。
          配置了 <Typography.Text code>labelKey</Typography.Text> 的字段会用对应 URL 参数作为选中值展示文案。
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          传入 <Typography.Text code>setSearchParams</Typography.Text> 后，mount 会以 replace
          清掉已消费 key（含 labelKey，下方 URL 应变空）；之后改 URL 不会再次解析，需自行重新挂载或业务侧处理。
        </Typography.Text>
      </Card>
      <Card size="small" title="当前 URL search（模拟，strip 后）">
        <Typography.Text code>?{searchParams.toString() || '(已清空已消费参数)'}</Typography.Text>
      </Card>
      <Card size="small" title="searchParamsValue（仅首次解析，用于 seed）">
        <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(searchParamsValue, null, 2)}</pre>
      </Card>
      <Filter
        value={filter}
        onChange={value => {
          setFilter(value);
          console.log('filter onChange', getFilterValue(value));
        }}
        list={[
          [
            { type: InputFilterItem, props: { name: 'userId', label: '用户Id' } },
            { type: InputFilterItem, props: { name: 'tenantOrgId', label: '部门' } },
            { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } }
          ]
        ]}
        displayLine={1}
      />
    </Flex>
  );
};

render(<BaseExample />);

```

- 定制 className
- 通过稳定全局类名（根 react-filter + 内部短类名）用 CSS 选择器定制 Filter 内部样式；可用 FILTER_CLASS 引用类名
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { default: Filter, fields, FILTER_CLASS, getFilterValue } = _ReactFilter;
const { InputFilterItem, SuperSelectFilterItem } = fields;
const { Flex, Button, Typography, Card, Space } = antd;
const { useState, useEffect } = React;

const statusOptions = [
  { value: 'open', label: '开启' },
  { value: 'closed', label: '关闭' }
];

/**
 * 用稳定全局类名定制 Filter 内部样式。
 * 根：react-filter；内部短类名；选择器写 .react-filter .xxx
 */
const CUSTOM_CSS = &#96;
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.title} {
  padding: 12px 16px;
  background: #f7f9fc;
  border-bottom-color: #d6e4ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.label} {
  color: #1d39c4;
  font-weight: 600;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.item} {
  border-radius: 6px;
  border-color: #adc6ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.item}.${FILTER_CLASS.itemActive} {
  color: #1d39c4;
  border-color: #2f54eb;
  background: #f0f5ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueDisplay} {
  background: #fcfcff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueTag} {
  border-radius: 4px;
  border-color: #adc6ff;
  background: #f0f5ff;
  color: #1d39c4;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueClear} {
  border-radius: 4px;
  color: #1d39c4;
  border-color: #adc6ff;
}
&#96;;

const BaseExample = () => {
  const [filter, setFilter] = useState([
    { name: 'status', label: '状态', value: { label: '开启', value: 'open' } }
  ]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-demo', 'filter-classname');
    styleEl.textContent = CUSTOM_CSS;
    document.head.appendChild(styleEl);
    return () => {
      styleEl.remove();
    };
  }, []);

  return (
    <Flex vertical gap={16}>
      <Card size="small" title="说明">
        <Typography.Paragraph style={{ marginBottom: 8 }}>
          根挂 <Typography.Text code>{FILTER_CLASS.root}</Typography.Text>
          ，内部短类名如 <Typography.Text code>{FILTER_CLASS.title}</Typography.Text> /{' '}
          <Typography.Text code>{FILTER_CLASS.item}</Typography.Text>。用{' '}
          <Typography.Text code>.{FILTER_CLASS.root} .{FILTER_CLASS.item}</Typography.Text> 定制。
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          本示例额外加了 <Typography.Text code>demo-filter-skin</Typography.Text> 作为页面作用域，避免污染其他示例。
        </Typography.Text>
      </Card>
      <Filter
        className="demo-filter-skin"
        value={filter}
        onChange={setFilter}
        list={[
          [
            { type: InputFilterItem, props: { name: 'keyword', label: '关键词', placeholder: '搜索' } },
            {
              type: SuperSelectFilterItem,
              props: {
                name: 'status',
                label: '状态',
                single: true,
                isPopup: true,
                options: statusOptions
              }
            },
            { type: InputFilterItem, props: { name: 'owner', label: '负责人' } }
          ]
        ]}
        displayLine={1}
        extra={
          <Button
            type="primary"
            onClick={() => {
              console.log(getFilterValue(filter));
            }}
          >
            搜索
          </Button>
        }
      />
      <Space>
        <Typography.Text type="secondary">当前筛选参数：</Typography.Text>
        <Typography.Text code>{JSON.stringify(getFilterValue(filter))}</Typography.Text>
      </Space>
    </Flex>
  );
};

render(<BaseExample />);

```

- 高级筛选
- 使用 AdvancedFilter 组件实现更复杂的筛选布局
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { AdvancedFilter } = _ReactFilter;
const { InputFilterItem, ListFilterItem, CityFilterItem } = AdvancedFilter.fields;
const { Flex, Button, message } = antd;
const { useState } = React;

const AdvancedFilterExample = () => {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = {};
    filterValue.forEach(item => {
      params[item.name] = Array.isArray(item.value)
        ? item.value.map(v => v.value)
        : item.value?.value;
    });
    message.info(&#96;搜索参数: ${JSON.stringify(params, null, 2)}&#96;);
    console.log('筛选参数:', params);
  };

  return (
    <Flex vertical gap={16}>
      <AdvancedFilter
        value={filterValue}
        onChange={setFilterValue}
        list={[
          [
            {
              type: InputFilterItem,
              props: {
                name: 'name',
                label: '姓名'
              }
            },
            {
              type: InputFilterItem,
              props: {
                name: 'phone',
                label: '手机号'
              }
            }
          ],
          [
            {
              type: ListFilterItem,
              props: {
                name: 'status',
                label: '状态',
                single: true,
                items: [
                  { label: '待处理', value: 'pending' },
                  { label: '处理中', value: 'processing' },
                  { label: '已完成', value: 'completed' },
                  { label: '已取消', value: 'cancelled' }
                ]
              }
            }
          ],
          [
            {
              type: ListFilterItem,
              props: {
                name: 'tags',
                label: '标签',
                single: false,
                maxLength: 3,
                items: [
                  { label: '前端', value: 'frontend' },
                  { label: '后端', value: 'backend' },
                  { label: '全栈', value: 'fullstack' },
                  { label: 'UI设计', value: 'ui' },
                  { label: '产品', value: 'product' }
                ]
              }
            }
          ],
          [
            {
              type: CityFilterItem,
              props: {
                name: 'city',
                label: '城市',
                maxLength: 3
              }
            }
          ]
        ]}
      />
      <Flex justify="end">
        <Button type="primary" onClick={handleSearch}>
          查询
        </Button>
      </Flex>
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(filterValue, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<AdvancedFilterExample />);

```

- 筛选字段组件
- 展示所有筛选字段组件类型，包括输入框筛选、数字区间、日期选择、下拉选择以及 SuperSelect 选择器（列表/表格/树形/级联）和业务选择器（职能/行业/城市）
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { fields, PopoverItem } = _ReactFilter;
const {
  InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem,
  DateRangePickerFilterItem, TypeDateRangePickerFilterItem,
  SuperSelectFilterItem, SelectTableListFilterItem, SelectTreeFilterItem, SelectCascaderFilterItem,
  SelectFunctionFilterItem, SelectIndustryFilterItem, SelectAddressFilterItem
} = fields;
const { Input, InputNumber, Space, Flex, Select, Divider, Tag } = antd;
const { useState } = React;

// 自定义下拉选择筛选项
const SelectFilterItem = ({ label, value, onChange, options = [] }) => {
  return (
    <PopoverItem
      label={label}
      value={value}
      onChange={onChange}
    >
      {({ value, onChange }) => (
        <Select
          style={{ width: 200 }}
          placeholder={&#96;请选择${label}&#96;}
          value={value?.value}
          onChange={(val, option) => {
            onChange({
              value: val,
              label: option?.label || val
            });
          }}
          options={options}
        />
      )}
    </PopoverItem>
  );
};

const FilterFieldsExample = () => {
  const [values, setValues] = useState({});

  const fieldConfigs = [
    {
      name: 'input',
      label: '输入筛选',
      component: InputFilterItem,
      props: {}
    },
    {
      name: 'numberRange',
      label: '数字区间',
      component: NumberRangeFilterItem,
      props: { unit: '万', min: 0 }
    },
    {
      name: 'date',
      label: '日期选择',
      component: DatePickerFilterItem,
      props: { picker: 'date' }
    },
    {
      name: 'month',
      label: '月份选择',
      component: DatePickerFilterItem,
      props: { picker: 'month' }
    },
    {
      name: 'dateRange',
      label: '日期范围',
      component: DateRangePickerFilterItem,
      props: {}
    },
    {
      name: 'typeDateRange',
      label: '类型日期范围',
      component: TypeDateRangePickerFilterItem,
      props: {}
    },
    {
      name: 'select',
      label: '下拉选择',
      component: SelectFilterItem,
      props: {
        options: [
          { value: 'pending', label: '待处理' },
          { value: 'processing', label: '处理中' },
          { value: 'completed', label: '已完成' },
          { value: 'cancelled', label: '已取消' }
        ]
      }
    }
  ];

  return (
    <Flex vertical gap={24}>
      <h4>筛选字段组件展示</h4>
      <Flex wrap gap={16}>
        {fieldConfigs.map(({ name, label, component: Component, props }) => (
          <Component
            key={name}
            label={label}
            value={values[name]}
            onChange={(val) => setValues(prev => ({ ...prev, [name]: val }))}
            {...props}
          />
        ))}
      </Flex>
      <Flex gap={8}>
        <span>当前值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

// SuperSelect 业务选择器示例
const departmentOptions = [
  { value: 'tech', label: '技术研发部' },
  { value: 'product', label: '产品设计部' },
  { value: 'operation', label: '运营管理部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'marketing', label: '市场营销部' }
];

const SuperSelectExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>SuperSelect 业务选择器</h4>
        <Tag color="blue">单选/多选</Tag>
        <Tag color="blue">搜索</Tag>
        <Tag color="blue">全选</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select 的通用选择器筛选项，支持单选/多选、搜索、全选等功能
      </p>
      <Flex wrap gap={16}>
        <SuperSelectFilterItem
          label="部门（多选）"
          value={values.dept}
          onChange={(val) => setValues(prev => ({ ...prev, dept: val }))}
          options={departmentOptions}
        />
        <SuperSelectFilterItem
          label="状态（单选）"
          single
          value={values.status}
          onChange={(val) => setValues(prev => ({ ...prev, status: val }))}
          options={[
            { value: 'active', label: '启用' },
            { value: 'inactive', label: '停用' }
          ]}
        />
        <SuperSelectFilterItem
          label="角色（全选）"
          value={values.role}
          onChange={(val) => setValues(prev => ({ ...prev, role: val }))}
          options={[
            { value: 'admin', label: '管理员' },
            { value: 'editor', label: '编辑者' },
            { value: 'viewer', label: '查看者' }
          ]}
          allowSelectedAll
        />
      </Flex>
      <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
        {JSON.stringify(values, null, 2)}
      </pre>
    </Flex>
  );
};

// SuperSelect 其他选择组件示例（表格/树形/级联）
const employeeOptions = [
  { id: 'emp_1', name: '张三', department: '技术研发部', position: '工程师' },
  { id: 'emp_2', name: '李四', department: '产品设计部', position: '设计师' },
  { id: 'emp_3', name: '王五', department: '运营部', position: '经理' },
  { id: 'emp_4', name: '赵六', department: '市场部', position: '专员' },
  { id: 'emp_5', name: '钱七', department: '技术研发部', position: '工程师' }
];

const employeeColumns = [
  { name: 'name', title: '姓名', span: 8 },
  { name: 'department', title: '部门', span: 8 },
  { name: 'position', title: '职位', span: 8 }
];

const organizationTree = [
  { id: 'root', parentId: null, name: '集团总部' },
  { id: 'tech', parentId: 'root', name: '技术中心' },
  { id: 'tech-fe', parentId: 'tech', name: '前端开发组' },
  { id: 'tech-be', parentId: 'tech', name: '后端开发组' },
  { id: 'product', parentId: 'root', name: '产品中心' },
  { id: 'product-design', parentId: 'product', name: '产品设计组' }
];

const regionData = [
  {
    id: 'beijing',
    name: '北京市',
    children: [
      { id: 'haidian', name: '海淀区' },
      { id: 'chaoyang', name: '朝阳区' }
    ]
  },
  {
    id: 'guangdong',
    name: '广东省',
    children: [
      {
        id: 'guangzhou',
        name: '广州市',
        children: [
          { id: 'tianhe', name: '天河区' },
          { id: 'yuexiu', name: '越秀区' }
        ]
      },
      {
        id: 'shenzhen',
        name: '深圳市',
        children: [
          { id: 'nanshan', name: '南山区' },
          { id: 'futian', name: '福田区' }
        ]
      }
    ]
  }
];

const SuperSelectVariantsExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>SuperSelect 其他选择组件</h4>
        <Tag color="blue">表格</Tag>
        <Tag color="blue">树形</Tag>
        <Tag color="blue">级联</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select 的表格、树形、级联选择器筛选项，适用于多列数据、层级结构、级联数据等场景
      </p>
      <Flex wrap gap={16}>
        <SelectTableListFilterItem
          label="员工（表格多选）"
          value={values.employee}
          onChange={(val) => setValues(prev => ({ ...prev, employee: val }))}
          options={employeeOptions}
          columns={employeeColumns}
          valueKey="id"
          labelKey="name"
        />
        <SelectTreeFilterItem
          label="部门（树形多选）"
          value={values.department}
          onChange={(val) => setValues(prev => ({ ...prev, department: val }))}
          options={organizationTree}
          valueKey="id"
          labelKey="name"
        />
        <SelectCascaderFilterItem
          label="地区（级联多选）"
          value={values.region}
          onChange={(val) => setValues(prev => ({ ...prev, region: val }))}
          options={regionData}
          valueKey="id"
          labelKey="name"
        />
        <SelectCascaderFilterItem
          label="地区（级联单选）"
          single
          value={values.singleRegion}
          onChange={(val) => setValues(prev => ({ ...prev, singleRegion: val }))}
          options={regionData}
          valueKey="id"
          labelKey="name"
        />
      </Flex>
      <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
        {JSON.stringify(values, null, 2)}
      </pre>
    </Flex>
  );
};

// 业务选择器示例（职能/行业/城市）
const BusinessSelectExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>业务选择器筛选项</h4>
        <Tag color="blue">多级数据</Tag>
        <Tag color="blue">拼音搜索</Tag>
        <Tag color="blue">国际化</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select-plus 的职能、行业、城市选择器，支持多级数据、拼音搜索、国际化
      </p>
      <Flex wrap gap={16}>
        <SelectFunctionFilterItem
          label="职能"
          value={values.function}
          onChange={(val) => setValues(prev => ({ ...prev, function: val }))}
        />
        <SelectIndustryFilterItem
          label="行业"
          value={values.industry}
          onChange={(val) => setValues(prev => ({ ...prev, industry: val }))}
        />
        <SelectAddressFilterItem
          label="城市（多选）"
          value={values.city}
          onChange={(val) => setValues(prev => ({ ...prev, city: val }))}
        />
        <SelectAddressFilterItem
          label="城市（单选）"
          single
          value={values.singleCity}
          onChange={(val) => setValues(prev => ({ ...prev, singleCity: val }))}
        />
      </Flex>
    </Flex>
  );
};

const FilterFieldsDemo = () => (
  <Flex vertical>
    <FilterFieldsExample />
    <Divider />
    <SuperSelectExample />
    <Divider />
    <SuperSelectVariantsExample />
    <Divider />
    <BusinessSelectExample />
  </Flex>
);

render(<FilterFieldsDemo />);

```

- 搜索输入
- 使用 SearchInput 实现顶部关键词搜索，输入停止 500ms 后自动提交筛选值，输入法组合输入完成后才开始触发搜索
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { SearchInput, FilterProvider, getFilterValue } = _ReactFilter;
const { Flex, Button, Typography, message } = antd;
const { useState } = React;

const SearchInputExample = () => {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = getFilterValue(filterValue);
    message.info(&#96;搜索参数: ${JSON.stringify(params)}&#96;);
    console.log('搜索参数:', params);
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={4}>SearchInput 搜索输入</Typography.Title>
      <Typography.Paragraph style={{ margin: 0 }}>
        输入停止 500ms 后自动写入筛选值并触发搜索；中文等输入法组合输入期间不会触发搜索，确认文本后才开始计时。按回车或点击搜索按钮会立即提交。 清空后也会在 500ms 后移除该筛选条件。
      </Typography.Paragraph>
      <FilterProvider value={filterValue} onChange={setFilterValue}>
        <Flex gap={8} align="center">
          <SearchInput name="keyword" label="关键词" placeholder="请输入关键词" style={{ width: 320 }} allowClear />
          <Button type="primary" onClick={handleSearch}>
            查看搜索参数
          </Button>
        </Flex>
      </FilterProvider>
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>{JSON.stringify(filterValue, null, 2)}</pre>
      </Flex>
    </Flex>
  );
};

render(<SearchInputExample />);

```

- 已选值展示
- 使用 FilterValueDisplay 组件展示已选择的筛选条件，支持单独删除和清空全部
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { FilterValueDisplay } = _ReactFilter;
const { Flex } = antd;
const { useState } = React;

const FilterValueDisplayExample = () => {
  const [filterValue, setFilterValue] = useState([
    { name: 'keyword', label: '关键词', value: { label: 'React', value: 'React' } },
    { name: 'status', label: '状态', value: { label: '已完成', value: 'completed' } },
    { name: 'amount', label: '金额', value: { label: '100-500万', value: [100, 500] } },
    {
      name: 'tags',
      label: '标签',
      value: [
        { label: '前端', value: 'frontend' },
        { label: 'React', value: 'react' }
      ]
    }
  ]);

  return (
    <Flex vertical gap={16}>
      <h4>已选筛选条件展示</h4>
      <FilterValueDisplay
        value={filterValue}
        onChange={setFilterValue}
        extraExpand={
          <span style={{ fontSize: 12, color: '#999' }}>
            共 {filterValue.length} 项
          </span>
        }
      />
      <Flex gap={8}>
        <span>当前值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(filterValue, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<FilterValueDisplayExample />);

```

- 弹出层筛选
- 使用 PopoverItem 组件实现弹出层形式的筛选项，支持文本输入、数字输入、下拉选择和数值范围等多种交互形式
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { PopoverItem } = _ReactFilter;
const { Input, InputNumber, Space, Select, Radio, Flex } = antd;
const { useState } = React;

const PopoverItemExample = () => {
  const [inputValue, setInputValue] = useState(null);
  const [numberValue, setNumberValue] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
  const [rangeValue, setRangeValue] = useState(null);

  return (
    <Flex vertical gap={24}>
      <h4>弹出层筛选组件示例</h4>
      <Flex wrap gap={16}>
        {/* 输入框筛选 */}
        <PopoverItem
          label="文本输入"
          value={inputValue}
          onChange={setInputValue}
        >
          {({ value, onChange }) => (
            <Input
              style={{ width: 240 }}
              placeholder="请输入文本"
              value={value?.value || ''}
              onChange={(e) => onChange(
                e.target.value ? { label: e.target.value, value: e.target.value } : null
              )}
            />
          )}
        </PopoverItem>

        {/* 数字输入筛选 */}
        <PopoverItem
          label="数字输入"
          value={numberValue}
          onChange={setNumberValue}
          onValidate={(val) => val?.value !== undefined}
        >
          {({ value, onChange }) => (
            <InputNumber
              style={{ width: 240 }}
              placeholder="请输入数字"
              value={value?.value}
              onChange={(val) => onChange(
                val !== null ? { label: String(val), value: val } : null
              )}
            />
          )}
        </PopoverItem>

        {/* 下拉选择筛选 */}
        <PopoverItem
          label="状态选择"
          value={selectValue}
          onChange={setSelectValue}
        >
          {({ value, onChange }) => (
            <Select
              style={{ width: 240 }}
              placeholder="请选择状态"
              value={value?.value}
              onChange={(val, option) => onChange({
                value: val,
                label: option?.label || val
              })}
              options={[
                { value: 'active', label: '激活' },
                { value: 'inactive', label: '未激活' },
                { value: 'pending', label: '待处理' }
              ]}
            />
          )}
        </PopoverItem>

        {/* 数字范围筛选 */}
        <PopoverItem
          label="数值范围"
          value={rangeValue}
          onChange={setRangeValue}
          onValidate={(val) => {
            const range = val?.value;
            return !(range && range[0] !== undefined && range[1] !== undefined && range[1] < range[0]);
          }}
        >
          {({ value, onChange }) => (
            <Space.Compact>
              <InputNumber
                style={{ width: 100 }}
                placeholder="最小值"
                value={value?.value?.[0]}
                onChange={(val) => onChange({
                  label: &#96;${val || '?'}-${value?.value?.[1] || '?'}&#96;,
                  value: [val, value?.value?.[1]]
                })}
              />
              <Input
                style={{ width: 30, textAlign: 'center', borderLeft: 0, borderRight: 0 }}
                placeholder="~"
                disabled
              />
              <InputNumber
                style={{ width: 100 }}
                placeholder="最大值"
                value={value?.value?.[1]}
                onChange={(val) => onChange({
                  label: &#96;${value?.value?.[0] || '?'}-${val || '?'}&#96;,
                  value: [value?.value?.[0], val]
                })}
              />
            </Space.Compact>
          )}
        </PopoverItem>
      </Flex>

      <Flex vertical gap={8}>
        <h5>当前值:</h5>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {JSON.stringify({
            文本输入: inputValue,
            数字输入: numberValue,
            状态选择: selectValue,
            数值范围: rangeValue
          }, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<PopoverItemExample />);

```

### API

### Filter 主组件

筛选组件，用于展示筛选项和处理筛选条件。

#### 属性

| 属性         | 类型                                                 | 默认值   | 说明                           |
| ------------ | ---------------------------------------------------- | -------- | ------------------------------ |
| value        | `Array<{ name: string, label: string, value: any }>` | -        | 筛选值数组                     |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]`     | 默认筛选值                     |
| onChange     | `(value: Array) => void`                             | -        | 筛选值变化回调                 |
| list         | `Array<Array>`                                       | `[]`     | 筛选项配置数组，支持多行       |
| displayLine  | `number`                                             | `1`      | 默认展示的行数，超出部分折叠   |
| label        | `string`                                             | `'筛选'` | 筛选区域标题                   |
| extra        | `ReactNode`                                          | -        | 额外操作区域，通常放置搜索按钮 |
| extraExpand  | `ReactNode`                                          | -        | 已选区域额外内容               |
| className    | `string`                                             | -        | 挂到根容器的自定义类名；内部节点见「稳定全局类名」 |

#### 静态方法

| 方法                                                        | 说明                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| `Filter.getFilterValue(filterValue)`                        | 将筛选值数组转换为参数对象，如 `{ name: value }`                    |
| `Filter.useFilter()`                                        | 获取 Filter Context，返回 `{ value, onChange }`                     |
| `Filter.pickSelectValues(value)`                            | 从筛选值中提取原始值数组，支持 `{ value }`、`{ id }` 格式           |
| `Filter.createFilterValueMapper(fieldMappers)`              | 声明式创建 mapFilterValue 函数，按字段映射转换规则                  |
| `Filter.useSearchParamsValue(options)`                      | 从 searchParams 解析筛选初始值数组；可选 strip 已消费 URL key       |
| `Filter.filterInterceptors.single`                          | 单选拦截器：`{id, name}` ↔ `{label, value}` 数据格式转换            |
| `Filter.filterInterceptors.multi`                           | 多选拦截器：`[{id, name}]` ↔ `[{label, value}]` 数据格式转换        |
| `Filter.FILTER_CLASS`                                       | 稳定全局类名常量对象，见下方「稳定全局类名」                         |

#### 稳定全局类名

根节点挂 `react-filter`；内部节点挂短类名（与 CSS Modules 默认样式并行）。调用方用 **`.react-filter .xxx`** 限定作用域定制；`className` 仍只挂根。命名可通过 `FILTER_CLASS` / `Filter.FILTER_CLASS` 引用。

| 常量键 | 类名 | 节点 |
|--------|------|------|
| `root` | `react-filter` | 根容器 |
| `isMobile` | `is-mobile` | 移动端根修饰 |
| `title` | `title` | 筛选项标题行 |
| `label` | `label` | 行标题文案（筛选 / 已选 / 更多） |
| `list` | `list` | 筛选项列表区 |
| `listScrollWrap` | `list-scroll-wrap` | 列表滚动外层 |
| `listScroll` | `list-scroll` | 列表滚动容器 |
| `line` | `line` | 筛选项行 |
| `extra` | `extra` | 行右侧 extra |
| `more` | `more` | 「更多」按钮 |
| `moreRow` | `more-row` | 展开后的更多行 |
| `children` | `children` | FilterLines children 行 |
| `itemWrap` | `item-wrap` | 筛选项外层 |
| `item` | `item` | 筛选项 |
| `itemActive` | `is-active` | 筛选项激活（挂在 item 上） |
| `itemVisited` | `is-visited` | 筛选项打开中（挂在 item 上） |
| `itemLabel` | `item-label` | 筛选项标签 |
| `itemIcon` | `item-icon` | 筛选项箭头 |
| `itemField` | `item-field` | 筛选项字段区 |
| `valueDisplay` | `value-display` | 已选值展示根 |
| `valueTag` | `value-tag` | 已选 Tag |
| `valueTagLabel` | `value-tag-label` | Tag 字段名 |
| `valueTagContent` | `value-tag-content` | Tag 值文案 |
| `valueActions` | `value-actions` | 已选操作区 |
| `valueClear` | `value-clear` | 清空按钮 |
| `valueToggle` | `value-toggle` | 展开/收起按钮 |
| `advanced` | `advanced` | AdvancedFilter 内容区 |

**迁移：** 根由裸 `filter` 改为 `react-filter`；内部类名去掉 `filter-` / `react-filter-` 前缀（如原 `filter-title` → `title`，在 `.react-filter` 下使用）。

```css
.react-filter .title { padding: 12px 0; }
.react-filter .item.is-active { color: var(--primary-color); }
.react-filter .value-tag { border-radius: 4px; }
```

```javascript
import { FILTER_CLASS } from '@kne/react-filter';
// `.${FILTER_CLASS.root} .${FILTER_CLASS.item}`
```

#### 使用示例

```javascript
import Filter, { fields } from '@kne/react-filter';

const { InputFilterItem, NumberRangeFilterItem } = fields;

<Filter
  value={filterValue}
  onChange={setFilterValue}
  list={[
    [
      { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } },
      { type: NumberRangeFilterItem, props: { name: 'amount', label: '金额' } }
    ]
  ]}
  displayLine={1}
  extra={<Button type="primary">搜索</Button>}
/>;
```

---

### AdvancedFilter 高级筛选组件

高级筛选组件，用于更复杂的筛选场景，采用垂直布局。

#### 属性

| 属性         | 类型                                                 | 默认值 | 说明             |
| ------------ | ---------------------------------------------------- | ------ | ---------------- |
| value        | `Array<{ name: string, label: string, value: any }>` | -      | 筛选值数组       |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]`   | 默认筛选值       |
| onChange     | `(value: Array) => void`                             | -      | 筛选值变化回调   |
| list         | `Array<Array>`                                       | `[]`   | 筛选项配置数组   |
| more         | `Array`                                              | -      | 额外折叠的筛选项 |
| className    | `string`                                             | -      | 自定义类名       |

#### 使用示例

```javascript
import { AdvancedFilter, fields } from '@kne/react-filter';

<AdvancedFilter value={filterValue} onChange={setFilterValue} list={[[{ type: InputFilterItem, props: { name: 'name', label: '姓名' } }]]} />;
```

---

### FilterValueDisplay 已选值展示

展示已选择的筛选条件，支持单独删除和清空全部。

#### 属性

| 属性        | 类型                                                 | 默认值 | 说明           |
| ----------- | ---------------------------------------------------- | ------ | -------------- |
| value       | `Array<{ name: string, label: string, value: any }>` | -      | 筛选值数组     |
| onChange    | `(value: Array) => void`                             | -      | 筛选值变化回调 |
| extraExpand | `ReactNode`                                          | -      | 额外展示内容   |

---

### PopoverItem 弹出层筛选项

弹出层形式的筛选项，支持确认取消操作。

#### 属性

| 属性             | 类型                                        | 默认值         | 说明               |
| ---------------- | ------------------------------------------- | -------------- | ------------------ |
| label            | `string`                                    | -              | 筛选项标签         |
| value            | `{ label: string, value: any }`             | -              | 当前值             |
| onChange         | `(value: object) => void`                   | -              | 值变化回调         |
| onValidate       | `(value: object) => boolean`                | -              | 确认按钮校验函数   |
| onOpenChange     | `(open: boolean) => void`                   | -              | 弹出层状态变化回调 |
| placement        | `string`                                    | `'bottomLeft'` | 弹出层位置         |
| overlayClassName | `string`                                    | -              | 弹出层自定义类名   |
| children         | `(props: { value, onChange }) => ReactNode` | -              | 内容渲染函数       |

#### 使用示例

```javascript
import { PopoverItem } from '@kne/react-filter';

<PopoverItem label="文本输入" value={inputValue} onChange={setInputValue}>
  {({ value, onChange }) => <Input value={value?.value} onChange={e => onChange({ label: e.target.value, value: e.target.value })} />}
</PopoverItem>;
```

---

### FilterItem 筛选项容器

筛选项的基础容器组件。

#### 属性

| 属性     | 类型        | 默认值 | 说明                 |
| -------- | ----------- | ------ | -------------------- |
| label    | `string`    | -      | 筛选项标签           |
| open     | `boolean`   | -      | 是否展开状态         |
| active   | `boolean`   | -      | 是否激活状态（有值） |
| children | `ReactNode` | -      | 子元素               |

---

### FilterLines 筛选行

筛选行组件，支持多行展开收起。

#### 属性

| 属性        | 类型           | 默认值   | 说明           |
| ----------- | -------------- | -------- | -------------- |
| list                 | `Array`                  | `[]`      | 筛选项配置数组，默认支持单层数组，也兼容双层数组 |
| displayLine          | `number`                 | `1`       | 双层数组模式下默认展示行数 |
| visibleCountStrategy | `'asc' \| 'desc'`        | `'asc'`   | 单层数组模式下可见项计算策略，`asc` 从少往多累加，`desc` 从多往少递减 |
| label                | `string`                 | `'筛选'`  | 标题 |
| extra                | `ReactNode`              | -         | 额外操作区域 |
| className            | `string`                 | -         | 自定义类名 |

---

### FilterProvider 状态管理

Filter 状态管理组件，用于自定义 Filter 结构。

#### 属性

| 属性         | 类型                                  | 默认值 | 说明             |
| ------------ | ------------------------------------- | ------ | ---------------- |
| value        | `Array`                               | -      | 筛选值数组       |
| defaultValue | `Array`                               | `[]`   | 默认筛选值       |
| onChange     | `(value: Array) => void`              | -      | 筛选值变化回调   |
| children     | `ReactNode \| (context) => ReactNode` | -      | 子元素或渲染函数 |

---

### 高阶组件

#### withFilterValue

为组件注入筛选值和变更函数。

```javascript
import { withFilterValue } from '@kne/react-filter';

const MyFilterItem = withFilterValue(({ name, label, value, onChange, ...props }) => {
  return <Component value={value} onChange={onChange} />;
});
```

#### withFieldItem

为组件包装 FilterItem 样式。

```javascript
import { withFieldItem } from '@kne/react-filter';

const MyFieldItem = withFieldItem(MyComponent);
```

---

### 筛选字段组件

#### InputFilterItem 输入筛选

弹出层形式的输入框筛选组件。

| 属性        | 类型                 | 默认值 | 说明         |
| ----------- | -------------------- | ------ | ------------ |
| name        | `string`             | -      | 字段名称     |
| label       | `string`             | -      | 标签         |
| placeholder | `string`             | -      | 占位符       |
| onValidate  | `(value) => boolean` | -      | 确认校验函数 |

#### NumberRangeFilterItem 数字区间筛选

数字区间输入筛选组件。

| 属性        | 类型     | 默认值 | 说明     |
| ----------- | -------- | ------ | -------- |
| name        | `string` | -      | 字段名称 |
| label       | `string` | -      | 标签     |
| unit        | `string` | -      | 单位     |
| min         | `number` | -      | 最小值   |
| max         | `number` | -      | 最大值   |
| placeholder | `string` | -      | 占位符   |

#### DatePickerFilterItem 日期筛选

日期选择筛选组件。

| 属性   | 类型                                                 | 默认值         | 说明       |
| ------ | ---------------------------------------------------- | -------------- | ---------- |
| name   | `string`                                             | -              | 字段名称   |
| label  | `string`                                             | -              | 标签       |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'date'`       | 选择器类型 |
| format | `string`                                             | `'YYYY-MM-DD'` | 日期格式   |

#### DateRangePickerFilterItem 日期范围筛选

日期范围选择筛选组件。

| 属性   | 类型                                | 默认值         | 说明     |
| ------ | ----------------------------------- | -------------- | -------- |
| name   | `string`                            | -              | 字段名称 |
| label  | `string`                            | -              | 标签     |
| format | `string`                            | `'YYYY-MM-DD'` | 日期格式 |
| header | `ReactNode \| (props) => ReactNode` | -              | 头部内容 |

#### TypeDateRangePickerFilterItem 类型日期范围筛选

支持按日/周/月切换的日期范围选择筛选组件。

| 属性   | 类型     | 默认值         | 说明     |
| ------ | -------- | -------------- | -------- |
| name   | `string` | -              | 字段名称 |
| label  | `string` | -              | 标签     |
| format | `string` | `'YYYY-MM-DD'` | 日期格式 |

#### SuperSelectFilterItem 通用选择器筛选

基于 `@kne/super-select` 的通用选择器筛选项，支持单选/多选、搜索、全选等功能。

| 属性             | 类型                      | 默认值  | 说明         |
| ---------------- | ------------------------- | ------- | ------------ |
| name             | `string`                  | -       | 字段名称     |
| label            | `string`                  | -       | 标签         |
| options          | `Array<{ value, label }>` | -       | 选项数据     |
| single           | `boolean`                 | `false` | 是否单选     |
| allowSelectedAll | `boolean`                 | `false` | 是否支持全选 |
| maxLength        | `number`                  | -       | 最多可选数量 |

**使用示例：**

```javascript
import { SuperSelectFilterItem } from '@kne/react-filter';

// 多选
<SuperSelectFilterItem
  label="部门"
  options={[
    { value: 'tech', label: '技术研发部' },
    { value: 'product', label: '产品设计部' }
  ]}
/>

// 单选
<SuperSelectFilterItem
  label="状态"
  single
  options={[
    { value: 'active', label: '启用' },
    { value: 'inactive', label: '停用' }
  ]}
/>
```

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectTableListFilterItem 表格选择器筛选

基于 `@kne/super-select` 的 `SelectTableList` 组件，适用于需要展示多列数据的筛选场景。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 选项数据     |
| columns   | `Array`    | -       | 表格列配置   |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectTreeFilterItem 树形选择器筛选

基于 `@kne/super-select` 的 `SelectTree` 组件，适用于组织架构、分类等层级数据筛选。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 树形数据（含 `parentId`） |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectCascaderFilterItem 级联选择器筛选

基于 `@kne/super-select` 的 `SelectCascader` 组件，支持多列菜单展示、父子关联选择、搜索过滤。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 级联数据（含 `children`） |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectFunctionFilterItem 职能筛选

基于 `@kne/super-select-plus` 的职能选择器筛选项，支持多级职能数据选择、拼音搜索。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### SelectIndustryFilterItem 行业筛选

基于 `@kne/super-select-plus` 的行业选择器筛选项，支持多级行业数据选择、拼音搜索。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### SelectAddressFilterItem 城市筛选

基于 `@kne/super-select-plus` 的城市选择器筛选项，支持国内外城市搜索选择。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### CityFilterItem（高级筛选）

城市选择器的高级筛选版本，用于 `AdvancedFilter` 组件的 `list` 配置中。展示热门城市标签，支持搜索选择其他城市。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | `5`     | 最多可选数量 |

**在高级筛选中使用：**

```javascript
import { AdvancedFilter } from '@kne/react-filter';
import { CityFilterItem } from './AdvancedFilter/fields';

<AdvancedFilter list={[[{ type: CityFilterItem, props: { label: '城市', single: true } }]]} />;
```

---

### TypeDateRangePickerField 类型日期范围选择器

支持按日/周/月切换的日期范围选择器基础组件。

| 属性            | 类型                                                       | 默认值                          | 说明             |
| --------------- | ---------------------------------------------------------- | ------------------------------- | ---------------- |
| value           | `{ type: string, value: [Date, Date] }`                    | -                               | 当前值           |
| defaultValue    | `{ type: string, value: [Date, Date] }`                    | `{ type: 'date', value: null }` | 默认值           |
| onChange        | `(value: object) => void`                                  | -                               | 值变化回调       |
| shortcuts       | `boolean`                                                  | `true`                          | 是否显示快捷选项 |
| shortcutOptions | `Array<{ label: string, getValue: () => [Dayjs, Dayjs] }>` | -                               | 自定义快捷选项   |

**value 结构：**

```typescript
interface TypeDateRangeValue {
  type: 'date' | 'week' | 'month'; // 日期类型
  value: [Date, Date] | null; // 日期范围 [开始时间, 结束时间]
}
```

**默认快捷选项：**

- 近7天：`dayjs().subtract(7, 'day')` 至今天
- 本月：本月第一天至最后一天
- 近三个月：`dayjs().subtract(3, 'month')` 至今天
- 当年：本年第一天至最后一天

**自定义快捷选项示例：**

```javascript
import { TypeDateRangePickerField } from '@kne/react-filter';

<TypeDateRangePickerField
  shortcuts={true}
  shortcutOptions={[
    {
      label: '最近一周',
      getValue: () => [dayjs().subtract(7, 'day').startOf('day'), dayjs().endOf('day')]
    },
    {
      label: '最近一月',
      getValue: () => [dayjs().subtract(1, 'month').startOf('day'), dayjs().endOf('day')]
    }
  ]}
/>;
```

---

### SearchInput 搜索输入

搜索输入组件，适合放在列表顶部做关键词搜索。输入过程中维护本地输入值，停止输入 500ms 后自动提交筛选值；中文等输入法组合输入期间不会触发搜索，确认文本后才开始计时。按回车或点击搜索按钮会立即提交。清空后搜索会提交 `null`，用于移除该筛选条件。

| 属性        | 类型                               | 默认值 | 说明                                 |
| ----------- | ---------------------------------- | ------ | ------------------------------------ |
| name        | `string`                           | -      | 字段名称，用于写入筛选值             |
| label       | `string`                           | -      | 标签，用于展示已选筛选条件           |
| value       | `{ label: string, value: string }` | -      | 当前搜索值                           |
| onChange    | `(value: object \| null) => void`  | -      | 搜索提交回调，清空搜索时返回 `null`  |
| placeholder | `string`                           | -      | 占位符                               |
| searchDelay | `number`                           | `500`  | 自动提交搜索的防抖等待时间，单位毫秒 |

#### 使用示例

```javascript
import { SearchInput, FilterProvider, getFilterValue } from '@kne/react-filter';

const [filterValue, setFilterValue] = useState([]);

<FilterProvider value={filterValue} onChange={setFilterValue}>
  <SearchInput name="keyword" label="关键词" placeholder="请输入关键词" searchDelay={500} allowClear />
</FilterProvider>;

const params = getFilterValue(filterValue);
// { keyword: 'React' }
```

---

### 工具方法

#### getFilterValue

将筛选值数组转换为参数对象。

```javascript
import { getFilterValue } from '@kne/react-filter';

const filterValue = [
  { name: 'keyword', value: { label: 'test', value: 'test' } },
  { name: 'status', value: [{ label: '已完成', value: 'done' }] }
];

const params = getFilterValue(filterValue);
// { keyword: 'test', status: ['done'] }
```

---

### 筛选值结构

筛选值数组中的每一项结构：

```typescript
interface FilterValueItem {
  name: string; // 字段名称
  label: string; // 字段标签（用于展示）
  value:
    | {
        // 单个值
        label: string; // 显示文本
        value: any; // 实际值
      }
    | Array<{
        // 或多个值
        label: string;
        value: any;
      }>
    | null; // 或空值
}
```

---

### searchParams 相关

#### useSearchParamsValue

从 `searchParams` 同步解析筛选初始值数组。不管理 Filter 的 `value` / `defaultValue` / `onChange`，由调用方自行 seed。若传入 `setSearchParams`（function），mount 后会以 `replace: true` 清除已消费的 URL key。

**函数签名：**
```javascript
useSearchParamsValue(options): array
```

**参数：**

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| options.searchParams | URL 查询参数 | URLSearchParams | 是 |
| options.setSearchParams | 清理已消费 key；非 function 则只读 | function | 否 |
| options.fields | `[{ name, label, labelKey? }]`。`name` 为 URL key 与筛选 name；`label` 为筛选项标题；可选 `labelKey` 为选中值展示文案的 URL key | array | 是 |

**返回值：** `searchParamsValue` 筛选值数组（可能为 `[]`）。每项形如 `{ name, label, value: { label, value } }`；有 `labelKey` 时 `value.label` 取自对应 URL 参数，否则等于 `value.value`。

**示例：**
```javascript
import { useSearchParamsValue } from '@kne/react-filter';
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();
const searchParamsValue = useSearchParamsValue({
  searchParams,
  setSearchParams,
  fields: [
    { name: 'status', label: '状态' },
    { name: 'tenantOrgId', label: '部门', labelKey: 'tenantOrgName' }
  ]
});
// ?tenantOrgId=org-1&tenantOrgName=技术部
// → { name: 'tenantOrgId', label: '部门', value: { label: '技术部', value: 'org-1' } }
const [filter, setFilter] = useState(searchParamsValue);
// 或 <Filter defaultValue={searchParamsValue} ... />
```


#### singleSelectInterceptor

单选拦截器：`{id, name}` ↔ `{label, value}`。

| 属性   | 类型       | 说明                                   |
| ------ | ---------- | -------------------------------------- |
| input  | `Function` | `{id, name}` → `{label, value}` 的转换 |
| output | `Function` | `{label, value}` → `{id, name}` 的转换 |

#### multiSelectInterceptor

多选拦截器：`[{id, name}]` ↔ `[{label, value}]`。

| 属性   | 类型       | 说明                                       |
| ------ | ---------- | ------------------------------------------ |
| input  | `Function` | `[{id, name}]` → `[{label, value}]` 的转换 |
| output | `Function` | `[{label, value}]` → `[{id, name}]` 的转换 |

#### filterInterceptors

拦截器集合对象。

```javascript
import { filterInterceptors, singleSelectInterceptor, multiSelectInterceptor } from '@kne/react-filter';

// 两种引用方式等价
filterInterceptors.single === singleSelectInterceptor; // true
filterInterceptors.multi === multiSelectInterceptor; // true
```

**使用示例：**

```javascript
import { filterInterceptors } from '@kne/react-filter';

// 在 SuperSelect 组件中使用单选拦截
<SuperSelect
  valueKey="id"
  labelKey="name"
  interceptor={filterInterceptors.single}
  /* ... */
/>

// 多选拦截
<SuperSelect
  valueKey="id"
  labelKey="name"
  interceptor={filterInterceptors.multi}
  /* ... */
/>
```

---

### 工具方法

#### pickSelectValues

从筛选值中提取原始值数组。支持原始值、`{ value }` 对象、`{ id }` 对象以及它们的数组。

| 参数  | 类型  | 说明                 |
| ----- | ----- | -------------------- |
| value | `any` | 筛选值，支持多种格式 |

```javascript
import { pickSelectValues } from '@kne/react-filter';

pickSelectValues([{ value: 1 }, { id: 2 }, '3']);
// => ['1', '2', '3']

pickSelectValues({ value: 'open' });
// => ['open']

pickSelectValues(null);
// => []
```

#### createFilterValueMapper

声明式创建 mapFilterValue 函数。`Filter.getFilterValue` 默认只读取 `{ value }`，而 SuperSelectFilterItem 等组件使用 `{ id, name }` 格式，需要额外处理。此工具通过声明字段映射规则，自动生成转换函数。

| 参数         | 类型     | 说明                   |
| ------------ | -------- | ---------------------- |
| fieldMappers | `Object` | 字段名到映射规则的映射 |

**映射规则类型：**

| 规则       | 说明                                                    |
| ---------- | ------------------------------------------------------- |
| `'string'` | 确保值为字符串类型                                      |
| `'multi'`  | 多选，从 filter entry 提取值数组                        |
| `'single'` | 单选，从 filter entry 提取第一个值                      |
| `Function` | 自定义转换，接收 `(rawValue, { entry, filter, value })` |

```javascript
import { createFilterValueMapper } from '@kne/react-filter';

const mapFilterValue = createFilterValueMapper({
  id: 'string',
  roles: 'multi',
  tenantOrgId: 'single',
  status: rawValue => normalizeStatus(rawValue)
});

const filterValue = mapFilterValue(filter, Filter.getFilterValue);
```

# flex-box


### 描述

通过外部容器尺寸来确定内部容器的列


### 安装

```shell
npm i --save @kne/flex-box
```

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@kne/flex-box),antd(antd)

```jsx
const {default:FlexBox} = _FlexBox;
const { Card } = antd;

const BaseExample = () => {
    return (
        <FlexBox
            dataSource={[
                {
                    title: "Title 1",
                },
                {
                    title: "Title 2",
                },
                {
                    title: "Title 3",
                },
                {
                    title: "Title 4",
                },
                {
                    title: "Title 5",
                },
                {
                    title: "Title 6",
                },
            ]}
            renderItem={(item) => (
                <FlexBox.Item>
                    <Card title={item.title}>Card content</Card>
                </FlexBox.Item>
            )}
        />
    );
};

render(<BaseExample />);


```

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@kne/flex-box),antd(antd)

```jsx
const {FlexBoxFetch} = _FlexBox;
const {Card, Button} = antd;
const {useRef} = React;
const BaseExample = () => {
    const ref = useRef();
    return (<div>
        <FlexBoxFetch
            ref={ref}
            pagination={{ position: 'bottom', align: 'center' }}
            getFetchApi={({size}) => {
                return {
                    data: {
                        pageSize: size,
                    }, loader: ({data}) => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve({
                                    pageData: Array.from({length: data.pageSize}).map((item, index) => {
                                        return {
                                            key: index, title: `第${index}项`,
                                        };
                                    }),
                                });
                            }, 1000);
                        });
                    },
                };
            }}
            renderItem={(item) => (<FlexBoxFetch.Item>
                <Card title={item.title}>Card content</Card>
            </FlexBoxFetch.Item>)}
        />
        <Button
            onClick={() => {
                console.log(ref.current);
            }}
        >
            获取FetchApi
        </Button>
    </div>);
};

render(<BaseExample/>);

```


### API

### useFlexBox

const {ref, column} = useFlexBox(props);

注意：返回的 ref 必须传给一个 dom 的 ref

继承了[Ant Design List props](https://ant.design/components/list-cn#list)的参数，同时也新增了两个参数：

| 属性名      | 说明                   | 类型                     | 默认值              |
|----------|----------------------|------------------------|------------------|
| columns  | 实际用于 `List` 的 `grid` | `columnProps[]`        | `defaultColumns` |
| onChange | 设置 `column`          | (column) => onChange() | -                |

#### columnProps

默认值：

| 属性名   | 说明                    | 类型     | 默认值 |
|-------|-----------------------|--------|-----|
| width | 视口宽度                  | number | -   |
| col   | 列数                    | number | -   |
| size  | 根据 `col` 列数填每页数据加载多少条 | number | -   |

```text
  defaultColumns = [
    {width: 576, col: 1, size: 15},
    {width: 768, col: 2, size: 12},
    {width: 1200, col: 4, size: 12},
    {width: 1600, col: 5, size: 15}
  ]
```

### FlexBox

同 `useFlexBox` 参数

| 属性名            | 说明                         | 类型     | 默认值 |
|----------------|----------------------------|--------|-----|
| outerClassName | `FlexBox` 父元素的 `className` | string | -   |
| gutter         | 栅格间隔                       | number | 16  |


#### FlexBox.Item

同 [Ant Design List.Item](https://ant.design/components/list-cn#listitem)

# FormInfo

### 概述

功能强大的表单组件，提供完整的数据管理、校验和样式解决方案

FormInfo 是一个全功能的表单解决方案，集成了数据录入、校验规则管理、样式布局等功能，适用于各种复杂场景的表单需求。

#### 核心特性

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

#### 适用场景

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

#### 技术亮点

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

#### Form

表单核心组件，提供数据域管理、校验规则、事件驱动等功能。

##### 属性说明

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

#### FormInfo

表单信息分组组件，用于组织和管理表单字段的布局。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 分组标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 否 | - |
| column | 分栏数量，响应式布局 | number | 否 | - |
| gap | 字段间距 | number | 否 | - |
| extra | 额外内容，显示在标题右侧 | ReactNode | 否 | - |

#### List

多段式列表表单组件，支持动态添加和删除表单项。

##### 属性说明

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

#### TableList

表格形式的列表表单组件，继承自 List，提供表格展示方式。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| title | 列表标题 | ReactNode | 否 | - |
| list | 字段数组 | array | 是 | - |
| maxLength | 最大数量 | number | 否 | - |
| minLength | 最小数量 | number | 否 | 0 |
| isUnshift | 新增项是否添加到开头 | boolean | 否 | true |

#### FormModal

弹窗表单组件，将 Form 和 Modal 组合使用。

##### 属性说明

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

#### FormDrawer

抽屉表单组件，将 Form 和 Drawer 组合使用。

##### 属性说明

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

#### FormStepModal

分步表单弹窗组件，支持多步骤数据收集。

##### 属性说明

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

##### items 配置说明

items 数组中每个元素为步骤配置对象：

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 步骤标题 | ReactNode | 是 | - |
| formProps | Form 组件属性，可以是对象或函数 | object | 否 | - |
| footerButtons | 步骤底部按钮配置 | array | 否 | - |

#### useFormModal

获取表单弹窗 Hook，返回一个可调用函数来弹出表单弹窗。

##### 返回值

返回一个函数，调用该函数弹出 FormModal 弹窗，参数同 FormModal 组件属性。

#### useFormDrawer

获取表单抽屉 Hook，返回一个可调用函数来弹出表单抽屉。

##### 返回值

返回一个函数，调用该函数弹出 FormDrawer 抽屉，参数同 FormDrawer 组件属性。

#### useFormStepModal

获取分步表单弹窗 Hook，返回一个可调用函数来弹出分步表单弹窗。

##### 返回值

返回一个函数，调用该函数弹出 FormStepModal 弹窗，参数同 FormStepModal 组件属性。

#### FormModalButton

按钮触发表单弹窗组件，支持加载数据后弹出。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置，参考 @kne/react-fetch | object | 否 | - |
| modalProps | FormModal 弹窗属性，可以是对象或函数 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

##### modalProps 函数形式参数

当 modalProps 为函数时，接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| data | 加载的数据 | any |
| fetchApi | fetch 实例 | object |
| close | 关闭弹窗方法 | function |

#### FormStepModalButton

按钮触发的分步表单弹窗组件。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置 | object | 否 | - |
| modalProps | FormStepModal 弹窗属性 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

#### FormDrawerButton

按钮触发的表单抽屉组件。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| api | 数据加载配置 | object | 否 | - |
| drawerProps | FormDrawer 抽屉属性 | object | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

#### SubmitButton

提交按钮组件，点击后触发表单校验和提交。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| autoClose | 提交成功后是否自动关闭弹窗 | boolean | 否 | true |
| children | 按钮内容 | ReactNode | 是 | - |

#### CancelButton

取消按钮组件，点击后重置表单或关闭弹窗。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮内容 | ReactNode | 是 | - |

#### FormApiButton

表单 API 按钮组件，可执行表单操作。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| onClick | 点击回调，接收表单 API 对象 | function | 是 | - |
| autoClose | 点击后是否自动关闭弹窗 | boolean | 否 | true |
| children | 按钮内容 | ReactNode | 是 | - |

##### onClick 回调参数

onClick 回调接收包含表单操作 API 的对象：

| 属性名 | 说明 | 类型 |
|--------|------|------|
| openApi | 表单 API 对象 | object |
| submit | 触发表单提交方法 | function |
| reset | 重置表单方法 | function |
| validate | 校验表单方法 | function |
| setFields | 设置字段值方法 | function |
| getFields | 获取字段值方法 | function |

#### useFormContext

表单上下文 Hook，在 Form 内部获取表单实例和方法。

##### 返回值

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

#### MultiField

多字段组件，支持在单个 Field 中包含多个子字段。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| children | 子字段组件 | ReactNode | 是 | - |

#### ErrorTip

错误提示组件，可自定义字段错误信息的展示方式。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 是 | - |
| errorRender | 自定义错误渲染函数 | function | 否 | - |
| children | 字段组件 | ReactNode | 是 | - |

##### errorRender 回调参数

errorRender 回调接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| validateData | 字段校验数据 | object |
| hasError | 是否有错误 | boolean |
| errorMsg | 错误信息 | string |

#### FormItem

表单项容器组件，用于包装表单字段。

##### 属性说明

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 否 | - |
| label | 字段标签 | ReactNode | 否 | - |
| rule | 校验规则 | string | 否 | - |
| tips | 提示信息 | ReactNode | 否 | - |
| labelHidden | 是否隐藏标签 | boolean | 否 | false |
| children | 字段组件 | ReactNode | 是 | - |

#### Field 类型：基础组件

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

#### Field 类型：业务组件

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

#### Field 类型：高级选择组件

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

##### api 配置说明

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

#### Field 类型：特殊组件

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

#### fieldDecorator

字段装饰器工具，用于创建自定义 Field 组件。

##### 属性说明

| 属性名 | 说明 | 类型 |
|--------|------|------|
| createWithFieldDecorator | 创建带装饰器的字段组件 | function |
| withInputDefaultPlaceholder | 添加输入框默认占位符 | function |
| withSelectDefaultPlaceholder | 添加选择器默认占位符 | function |
| withLang | 添加多语言支持 | function |

#### hooks

表单相关 Hooks 集合。

##### 常用 Hooks

| Hook 名 | 说明 |
|---------|------|
| useField | 获取字段 API |
| useReset | 获取重置方法 |
| useSubmit | 获取提交方法 |

#### widget

表单组件工具集。

#### utils

表单工具函数集。

#### formUtils

表单实用工具集。

#### RULES

内置校验规则。

##### 常用规则

| 规则名 | 说明 | 参数 |
|--------|------|------|
| REQ | 必填 | - |
| LEN | 长度限制 | MIN-MAX |
| EMAIL | 邮箱格式 | - |
| TEL | 电话号码 | - |
| NUM | 数字 | - |
| INT | 整数 | - |

#### interceptors

内置拦截器。

##### 使用方式

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

#### SelectInnerInput

选择器内部输入框组件，用于自定义选择器开发。

#### FormSteps

表单步骤组件，用于 FormStepModal 中显示步骤条。

#### formModule

表单模块，导出所有表单相关的组件和工具。

# Global

### 概述

Global 是 components-core 组件库的全局配置组件，负责为整个应用提供统一的上下文环境、样式主题和全局配置。它集成了 Antd ConfigProvider、国际化支持、字体加载、主题定制等功能，是使用 components-core 组件库时必须包含的最外层组件。

**核心特性**

- **统一的主题管理**：支持自定义主题色，自动生成主题色透明度渐变，提供丰富的 CSS 变量用于全局样式控制
- **国际化支持**：内置中文和英文两种语言，支持 Antd 组件库的国际化以及第三方组件的本地化
- **全局上下文管理**：通过 preset 参数统一配置权限、API、枚举等全局资源，所有子组件都可以通过 usePreset Hook 访问
- **错误边界处理**：自动捕获页面错误并展示友好的错误提示，提升用户体验
- **字体资源管理**：自动加载图标字体，支持自定义字体配置
- **响应式设计**：提供多种尺寸的文字、颜色和行高变量，适配不同场景

**适用场景**

在使用 components-core 组件库的任何业务系统中，都需要将 Global 组件放置在应用根位置，并按照要求配置 preset 参数。这样所有 components-core 的组件才能正确获取全局配置并正常工作。

**Preset 配置说明**

preset 是一个对象，包含 components-core 组件系统所需的全局配置，以下是常用的配置项：

| 名称                | 说明                                                          | 类型       | 使用组件                            |
|-------------------|-------------------------------------------------------------|----------|---------------------------------|
| permissions       | 配置功能权限列表，Permissions根据该列表里面是否存在某权限名称判断用户是否具有该功能权限，来控制对应操作行为 | array    | Permissions                     |
| ajax              | 用于发送ajax请求的方法，一般情况下其应该是一个axios对象                            | object   | Image                           |
| apis              | 用于和后端进行一些交互行为的接口集合                                          | object   | Image                           |
| apis.oss          | 用于通过一个ossId向后端oss服务获取一个可以访问到指定文件的url                        | object   | Image                           |
| apis.ossUpload    | 用于向oss服务上传一个文件                                              | object   | FormInfo.Upload,FormInfo.Avatar |
| features          | 用于配置系统的特性参数                                                 | object   | Features                        |
| features.profile  | 系统的特性列表参考组件Features                                         | object   | Features                        |
| features.debug    | 特性的调试模式，可以在控制台打印Features的id和状态                              | boolean  | Features                        |
| enums             | 公共枚举值，详情参看Enum组件                                            | object   | Enum                            |
| enums.helperGuide | 帮助文档枚举配置                                                    | function | HelperGuide                     |
| formInfo          | 表单配置                                                        | object   | FormInfo.formModule             |
| formInfo.rules    | 表单规则配置                                                      | object   | FormInfo.formModule             |

**样式管理**

Global 组件提供了全局样式管理功能，所有全局覆盖性的样式、Antd 的样式覆盖都应放置在此组件中。组件内置了丰富的 CSS 变量，包括字体大小、颜色、行高、圆角、背景色等，开发者可以通过这些变量快速定制应用风格。

**字体配置**

如需自定义图标字体，请按照以下步骤操作：
1. 将 iconfont 上下载的字体包解压后放在 public 文件夹下
2. 更新 src/common/params.js 中的变量 iconfontBase
3. 修改后构建项目并发布到对应环境

**组件位置**

Global 组件必须放置在应用的最外层，包裹所有其他组件，确保全局配置能够正确传递到所有子组件。


### 示例

#### 示例样式

```scss
.label{
  font-weight: bold;
}
```

#### 示例代码

- 基本示例
- 展示了文字大小颜色行高的设置
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Space, Divider } = antd;
const BaseExample = () => {
    return (
        <PureGlobal>
            <Space direction="vertical">
                <div className="label">文字大小:</div>
                <div style={{ fontSize: 'var(--font-size-large)' }}>大号文字</div>
                <div>默认大小文字</div>
                <div style={{ fontSize: 'var(--font-size-small)' }}>小号文字</div>
                <Divider />
                <div className="label">文字颜色:</div>
                <div style={{ color: 'var(--font-color)' }}>默认颜色</div>
                <div style={{ color: 'var(--font-color-grey)' }}>灰色</div>
                <div style={{ color: 'var(--font-color-grey-1)' }}>灰色1</div>
                <div style={{ color: 'var(--font-color-grey-2)' }}>灰色2</div>
                <Divider />
                <div className="label">行高:</div>
                <div style={{ lineHeight: 'var(--line-height-large)' }}>
                    宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高
                </div>
                <div>
                    默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高
                </div>
                <div style={{ lineHeight: 'var(--line-height-small)' }}>
                    紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高
                </div>
            </Space>
        </PureGlobal>
    );
};

render(<BaseExample />);

```

- Preset 配置
- 展示了 preset 全局配置的使用方法
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal, usePreset } = _Global;
const { Button, Space, Typography, Card } = antd;

const { Text } = Typography;

// 模拟的 preset 配置
const mockPreset = {
  locale: 'zh-CN',
  permissions: ['user:view', 'user:edit', 'user:delete'],
  apis: {
    getUserList: '/api/users',
    updateUser: '/api/user/update'
  },
  enums: {
    status: {
      active: '启用',
      inactive: '停用'
    }
  },
  features: {
    debug: true,
    profile: 'production'
  }
};

const PresetExample = () => {
  const preset = usePreset();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Preset 配置信息" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>语言设置：</Text>
            <Text>{preset.locale || '未设置'}</Text>
          </div>
          <div>
            <Text strong>权限列表：</Text>
            <Text>{preset.permissions?.join(', ') || '未设置'}</Text>
          </div>
          <div>
            <Text strong>API 接口：</Text>
            <Text code>{preset.apis?.getUserList || '未设置'}</Text>
          </div>
          <div>
            <Text strong>状态枚举：</Text>
            <Text>{JSON.stringify(preset.enums?.status) || '未设置'}</Text>
          </div>
          <div>
            <Text strong>特性配置：</Text>
            <Text>debug: {preset.features?.debug?.toString() || '未设置'}, profile: {preset.features?.profile || '未设置'}</Text>
          </div>
        </Space>
      </Card>
      <Card title="说明" size="small">
        <Text type="secondary">
          preset 是通过 Global 组件传入的全局配置，所有子组件都可以通过 usePreset Hook 访问。
          在实际业务中，preset 通常包含权限列表、API 接口、枚举值等全局配置信息。
        </Text>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal preset={mockPreset}>
      <PresetExample />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 主题配置
- 展示了主题色的自定义和预览效果
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Space, Button, Card, ColorPicker, Typography, Divider } = antd;

const { Text, Title } = Typography;

const ThemeExample = ({ themeToken }) => {
  const primaryColor = themeToken?.colorPrimary || '#4096ff';

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="主题色演示" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>当前主题色：</Text>
            <span style={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              backgroundColor: primaryColor,
              marginLeft: '8px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9'
            }} />
            <Text code style={{ marginLeft: '8px' }}>{primaryColor}</Text>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div>
            <Text strong>主色按钮：</Text>
            <Button type="primary" style={{ marginLeft: '8px' }}>
              主色按钮
            </Button>
          </div>
          <div>
            <Text strong>链接文字：</Text>
            <Typography.Link style={{ marginLeft: '8px' }}>
              链接文字
            </Typography.Link>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div>
            <Text strong>Alert 组件（使用主题色）：</Text>
            <Space direction="vertical" style={{ width: '100%', marginTop: '8px' }}>
              <Button type="primary">Primary 按钮</Button>
              <Button danger>Danger 按钮</Button>
            </Space>
          </div>
        </Space>
      </Card>
      <Card title="说明" size="small">
        <Text type="secondary">
          通过 themeToken 属性可以自定义主题色。Global 组件会自动根据主题色生成透明度渐变，
          并应用到所有使用主题色的组件上，包括按钮、链接、输入框等。
        </Text>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  const [color, setColor] = React.useState('#4096ff');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="主题色选择" size="small">
        <Space>
          <Text>选择主题色：</Text>
          <ColorPicker
            value={color}
            onChange={(color) => setColor(color.toHexString())}
            showText
          />
        </Space>
      </Card>
      <PureGlobal themeToken={{ colorPrimary: color }}>
        <ThemeExample themeToken={{ colorPrimary: color }} />
      </PureGlobal>
    </Space>
  );
};

render(<BaseExample />);

```

- 全局状态管理
- 展示了 useGlobalContext、SetGlobal、GetGlobal 的使用
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal, useGlobalContext, SetGlobal, GetGlobal } = _Global;
const { Space, Button, Input, Card, Typography, Divider } = antd;

const { Text } = Typography;

const GlobalContextExample = () => {
  const { global: userName, setGlobal: setUserName } = useGlobalContext('userName');
  const { global: userCount, setGlobal: setUserCount } = useGlobalContext('userCount');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="全局状态管理 - 用户信息" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户名：</Text>
            <Text>{userName || '未设置'}</Text>
          </div>
          <div>
            <Text strong>用户数量：</Text>
            <Text>{userCount || 0}</Text>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <Space>
            <Button
              onClick={() => setUserName('张三')}
              disabled={userName === '张三'}
            >
              设置用户名为"张三"
            </Button>
            <Button
              onClick={() => setUserName('李四')}
              disabled={userName === '李四'}
            >
              设置用户名为"李四"
            </Button>
            <Button
              onClick={() => setUserName('')}
            >
              清空用户名
            </Button>
          </Space>
          <Space>
            <Button
              onClick={() => setUserCount((userCount || 0) + 1)}
            >
              用户数量 +1
            </Button>
            <Button
              onClick={() => setUserCount(0)}
              disabled={userCount === 0}
            >
              重置用户数量
            </Button>
          </Space>
        </Space>
      </Card>

      <SetGlobal globalKey="appName" value="Components-Core 示例应用">
        {({ global: appName }) => (
          <Card title="使用 SetGlobal 组件" size="small">
            <Text>应用名称：{appName}</Text>
          </Card>
        )}
      </SetGlobal>

      <GetGlobal globalKey="userName">
        {({ value }) => (
          <Card title="使用 GetGlobal 组件" size="small">
            <Text>当前用户名：{value || '未设置'}</Text>
          </Card>
        )}
      </GetGlobal>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            useGlobalContext Hook 提供了全局状态管理功能，状态保存在 Global 组件一级，
            不会随着组件销毁而销毁。适合用于需要在多个组件间共享的状态。
          </Text>
          <Text type="secondary">
            SetGlobal 和 GetGlobal 组件提供了更声明式的方式来设置和获取全局值，
            特别适合在 JSX 中直接使用。
          </Text>
        </Space>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal>
      <GlobalContextExample />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 初始化加载
- 展示了 init 方法的使用，用于系统首次加载时的异步操作
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Space, Card, Typography, Alert, Spin, Button } = antd;

const { Title, Text } = Typography;

const InitExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="初始化加载演示" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            点击下方按钮查看初始化加载效果。init 方法会在系统首次加载时执行，
            可以返回 Promise 来处理异步操作，在加载完成前不会显示页面内容。
          </Text>
          <Space>
            <Button type="primary" onClick={() => window.location.reload()}>
              重新加载页面
            </Button>
          </Space>
        </Space>
      </Card>

      <Card title="模拟的异步数据加载" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户信息：</Text>
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
              <div>用户ID：10001</div>
              <div>用户名：张三</div>
              <div>部门：技术部</div>
            </div>
          </div>
          <div>
            <Text strong>系统配置：</Text>
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
              <div>主题色：#4096ff</div>
              <div>语言：zh-CN</div>
              <div>环境：production</div>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            init 方法会在应用初始化时执行，通常用于加载用户信息、系统配置、权限数据等。
            在 init 方法返回的 Promise resolve 之前，页面会显示加载状态，不会渲染子组件。
          </Text>
          <Text type="secondary">
            这样可以确保在页面显示前，所有必要的全局数据都已经加载完成，
            避免页面出现闪烁或需要数据时的加载等待状态。
          </Text>
          <Alert
            message="注意：实际使用时，init 方法应该返回真实的异步请求 Promise"
            type="info"
            showIcon
          />
        </Space>
      </Card>
    </Space>
  );
};

// 模拟的 init 方法
const mockInit = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('初始化完成：加载用户数据和系统配置');
      resolve();
    }, 1500);
  });
};

const BaseExample = () => {
  return (
    <PureGlobal init={mockInit}>
      <InitExample />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 警告提示
- 展示了警告提示的覆盖样式
- _Global(@components/Global),antd(antd),icon(@components/Icon)

```jsx
const { PureGlobal } = _Global;
const { Alert, Space } = antd;
const { default: Icon } = icon;

const BasicExample = () => {
  return (
    <PureGlobal>
      <Space direction="vertical">
        <Alert message="这是一条操作成功的状态反馈" type="success" showIcon />
        <Alert message="这是一条普通的信息说明" type="info" showIcon />
        <Alert message="这是一条提示信息" type="warning" showIcon />
        <Alert message="这是一条请求失败的状态反馈" type="error" showIcon />
        <Alert
          message="这是一条警示信息"
          type="error"
          showIcon
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />

        <Alert
          message="这是一条操作成功的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="success"
          showIcon
        />
        <Alert
          message="这是一条普通的信息说明"
          description="提示提示提示提示提示提示提示提示提示"
          type="info"
          showIcon
        />
        <Alert
          message="这是一条提示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="warning"
          showIcon
        />
        <Alert
          message="这是一条请求失败的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
        />
        <Alert
          message="这是一条警示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />

        <Alert
          message="这是一条操作成功的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="success"
          showIcon
          closable
        />
        <Alert
          message="这是一条普通的信息说明"
          description="提示提示提示提示提示提示提示提示提示"
          type="info"
          showIcon
          closable
        />
        <Alert
          message="这是一条提示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="warning"
          showIcon
          closable
        />
        <Alert
          message="这是一条请求失败的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          closable
        />
        <Alert
          message="这是一条警示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          closable
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />
      </Space>
    </PureGlobal>
  );
};

render(<BasicExample />);

```

- 按钮
- 展示了按钮的覆盖样式
- _Global(@components/Global),antd(antd),icon(@components/Icon)

```jsx
const { PureGlobal } = _Global;
const { Button, Typography, Space } = antd;
const { default: Icon } = icon;

const BaseExample = () => {
  return (
    <PureGlobal>
      <Space direction="vertical">
        <Space>
          <Button size="large">大按钮</Button>
          <Button>默认按钮</Button>
          <Button size="small">小按钮</Button>
        </Space>
        <Space>
          <Button type="primary">按钮</Button>
          <Button type="link">按钮</Button>
          <Button type="text">按钮</Button>
        </Space>
        <Space>
          <Button danger>危险按钮</Button>
          <Button type="primary" danger>
            危险按钮
          </Button>
          <Button type="link" danger>
            危险按钮
          </Button>
          <Button type="text" danger>
            危险按钮
          </Button>
        </Space>
        <Space>
          <Button disabled>禁用按钮</Button>
          <Button type="primary" danger disabled>
            禁用危险按钮
          </Button>
          <Button type="link" disabled>
            禁用Link按钮
          </Button>
          <Button type="text" disabled>
            禁用Text按钮
          </Button>
        </Space>
        <Space>
          <Button type="text" icon={<Icon type="icon-tianjia" />}>
            图标按钮
          </Button>
          <Button type="text">
            图标按钮右
            <Icon type="icon-arrow-thin-down" />
          </Button>
        </Space>
        <Space>
          <Button type="primary" icon={<Icon type="icon-tianjia" />} />
          <Button icon={<Icon type="icon-tianjia" />} />
          <Button danger icon={<Icon type="icon-tianjia" />} />
          <Button type="link" icon={<Icon type="icon-tianjia" />} />
          <Button type="text" icon={<Icon type="icon-tianjia" />} />
        </Space>
        <Space>
          <Button type="primary" disabled icon={<Icon type="icon-tianjia" />} />
          <Button disabled icon={<Icon type="icon-tianjia" />} />
          <Button disabled danger icon={<Icon type="icon-tianjia" />} />
          <Button disabled type="link" icon={<Icon type="icon-tianjia" />} />
          <Button disabled type="text" icon={<Icon type="icon-tianjia" />} />
        </Space>
        <Space>
          <Typography.Link>Link文字</Typography.Link>
          <Typography.Text className="ant-btn">文字</Typography.Text>
          <Typography.Link>
            <Icon type="icon-tianjia" />
            Link文字
          </Typography.Link>
          <Typography.Text className="ant-btn">
            <Icon type="icon-tianjia" />
            文字
          </Typography.Text>
          <Typography.Link className="ant-btn-dangerous">
            Link文字
          </Typography.Link>
        </Space>
        <Space>
          <Button className="btn-no-padding" type="link" size="large">
            大按钮
          </Button>
          <Button className="btn-no-padding" type="link">
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="small">
            小按钮
          </Button>
          <Button className="btn-no-padding" type="text" size="large">
            大按钮
          </Button>
          <Button className="btn-no-padding" type="text">
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="text" size="small">
            小按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="large" danger>
            大按钮
          </Button>
          <Button className="btn-no-padding" type="link" danger>
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="small" danger>
            小按钮
          </Button>
        </Space>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 无边框标签
- 展示了无边框标签
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Tag, Space } = antd;

const BasicExample = () => {
  return (
    <PureGlobal>
      <Space>
        <Tag className="no-border" closable>
          标签1
        </Tag>
        <Tag className="no-border" closable>
          标签2
        </Tag>
        <Tag className="no-border" closable>
          标签3
        </Tag>
      </Space>
    </PureGlobal>
  );
};

render(<BasicExample />);

```

### API

#### Global

Global 组件是 components-core 的全局配置组件，必须放置在应用最外层。它提供了全局上下文、主题配置、国际化支持、错误边界等功能。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| preset | object | 否 | {} | 全局预设参数，可通过 usePreset 获取，由业务系统设置 |
| themeToken | object | 否 | {} | 主题配置，参考 Antd 的 themeToken，一般只需设置 {colorPrimary} |
| init | function | 否 | - | 初始化方法，在系统首次加载时执行，可返回 Promise，用于放置系统显示前的异步操作 |
| children | ReactNode | 是 | - | 子组件 |
| className | string | 否 | - | 自定义类名 |

#### PureGlobal

纯全局组件，API 与 Global 相同。去除了页面错误捕获和 container-body 类名带来的默认最小宽度等样式设置，主要用于组件库的演示环境和弹窗中。

#### GlobalProvider

全局上下文提供者组件，是 Global 和 PureGlobal 的底层实现，一般不直接使用。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| preset | object | 否 | {locale: "zh-CN", apis: {}} | 全局预设参数 |
| themeToken | object | 否 | - | 主题配置 |
| init | function | 否 | - | 初始化方法 |
| children | ReactNode | 是 | - | 子组件 |

#### usePreset

获取预设的 preset 参数 Hook。已确定的系统需要使用的 key 值包括：permissions、apis、formOptions、modalOptions。

##### 返回值

返回 preset 对象，包含所有通过 Global 组件传入的全局配置。

#### useGlobalContext

获取和设置全局状态的 Hook。该状态保存在 Global 组件一级，不会随着内部组件的销毁而销毁。主要用于组件内部，业务应避免使用该 API 设置新的 global 变量。业务如有需要应自行在顶级组件中设置 context。

##### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 否 | - | 全局参数的 key。当存在 globalKey 时，获取和设置的是 global[key]，否则获取和设置的是整个 global 对象。除非存在多个 key-value，否则不推荐直接使用不存在 globalKey 的情况 |

##### 返回值

返回包含 global 和 setGlobal 的对象：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| global | any | 当前的 global 值 |
| setGlobal | function | 设置当前的 global 值 |

#### useGlobalValue

获取指定 key 的全局值的 Hook，类似 useGlobalContext 的简化版本。

##### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |

##### 返回值

返回指定 key 对应的 global 值。

#### GlobalValue

通过 render props 模式获取指定 global 值的组件。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |
| children | function | 是 | - | 渲染函数，接收 {value} 参数 |

#### containerClassName

Global 组件容器的 CSS 类名常量。当需要使用 CSS 选择器选中 Global 组件容器时，可以使用该常量确保选择器的准确性。

该值是 Global 组件内部使用的 CSS 类名的转义版本，用于处理类名中的特殊字符（如 + 和 /），确保在 CSS 选择器中能够正确匹配。

#### GlobalSetting

设置全局值的组件（文档中未详细说明具体用法）。

#### SetGlobal

设置全局值的组件，支持条件渲染和函数作为 children。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要设置的全局参数的 key |
| value | any | 是 | - | 要设置的值 |
| needReady | boolean | 否 | false | 是否需要等待 global 有值后再渲染 children |
| children | ReactNode \| function | 是 | - | 子组件，当为函数时会接收 {global, setGlobal} 参数 |

#### GetGlobal

获取全局值的组件，通过 render props 模式访问。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |
| children | function | 是 | - | 渲染函数，接收 {value} 参数 |

#### containerClassName

Global 组件容器的 CSS 类名常量。当需要使用 CSS 选择器选中 Global 组件容器时，可以使用该常量确保选择器的准确性。

该值是 Global 组件内部使用的 CSS 类名的转义版本，用于处理类名中的特殊字符（如 + 和 /），确保在 CSS 选择器中能够正确匹配。

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

#### HelperGuide

HelperGuide 组件用于给用户提供帮助文档提示，显示帮助内容和可选的帮助链接。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| name | string | 是 | - | 帮助文档的标识符，用于从枚举中获取对应的帮助信息 |
| className | string | 否 | - | 自定义类名 |

##### 枚举配置

HelperGuide 组件通过 preset.enums.helperGuide 配置帮助文档内容，该配置应该是一个函数，返回帮助文档数组。

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| value | string | 是 | 帮助文档的标识符，对应 HelperGuide 组件的 name 属性 |
| content | string | 是 | 帮助文档的内容文字 |
| url | string | 否 | 帮助文档的链接地址，如果提供则显示"查看帮助"链接 |

# HistoryStore

### 概述

HistoryStore 是一个历史记录管理组件，用于保存和展示用户的操作历史记录（如搜索记录、选择记录等）。它利用 localStorage 持久化存储数据，在用户再次访问时可以快速选择历史记录，提升用户体验。

**核心特性**

- **持久化存储**：基于 localStorage 实现数据持久化，刷新页面后数据不丢失
- **多场景支持**：通过 storeName 属性区分不同场景的历史记录，互不干扰
- **智能去重**：自动去除重复的历史记录，相同值只会保留最新的一次
- **数量限制**：可配置最大保存数量，避免占用过多存储空间
- **灵活触发**：支持通过焦点、点击等多种方式触发历史记录展示
- **Render Props**：通过 render props 模式提供完整的控制能力，可自定义触发逻辑

**适用场景**

- 搜索框历史记录：保存用户的搜索关键词，方便快速重新搜索
- 下拉框选择历史：保存用户选择过的选项，提供快捷选择入口
- 过滤器历史：保存用户设置过的过滤条件，一键应用历史配置
- 其他需要记录用户操作历史的场景


### 示例

#### 示例代码

- 搜索框历史记录
- 展示基础用法，搜索框获取焦点时显示历史记录
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
const { default: HistoryStore } = _HistoryStore;
const { Input, Space, Card, Typography } = antd;

const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="搜索框历史记录" size="small">
        <HistoryStore
          onSelect={(value, item) => {
            console.log('选中历史记录：', value, item);
          }}
        >
          {({ appendHistory, openHistory }) => (
            <Input.Search
              placeholder="输入关键词搜索"
              allowClear
              onFocus={openHistory}
              onSearch={(value) => {
                if (value) {
                  appendHistory({ value, label: value });
                }
              }}
            />
          )}
        </HistoryStore>
      </Card>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            基础用法：搜索框获取焦点时显示历史记录，点击历史记录标签或回车搜索后，
            该记录会被保存到历史记录中。
          </Text>
          <Text type="secondary">
            历史记录使用 localStorage 持久化存储，刷新页面后仍然可用。
          </Text>
        </Space>
      </Card>
    </Space>
  );
};

render(<BaseExample />);

```

- 自定义配置
- 展示 maxLength、label 等配置属性的用法
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
const { default: HistoryStore } = _HistoryStore;
const { Input, Space, Card, Typography, Divider } = antd;

const { Text } = Typography;

const CustomConfigExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="自定义配置示例" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>默认配置（最多5条，标题"最近搜索"）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore>
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '16px 0' }} />

          <div>
            <Text strong>自定义最大数量（最多10条）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore maxLength={10}>
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '16px 0' }} />

          <div>
            <Text strong>自定义标题（"搜索历史"）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore label="搜索历史">
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '16px 0' }} />

          <div>
            <Text strong>不限制数量（maxLength={0}）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore maxLength={0}>
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Text type="secondary">
          通过 maxLength、label 等属性可以自定义历史记录的配置。
          maxLength 为 0 时不限制保存数量，但建议设置合理的最大值以避免占用过多存储空间。
        </Text>
      </Card>
    </Space>
  );
};

render(<CustomConfigExample />);

```

- Select 组件历史记录
- 展示与 Select 组件结合使用，记录选择历史
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
const { default: HistoryStore } = _HistoryStore;
const { Select, Space, Card, Typography, Input } = antd;

const { Text } = Typography;

const SelectExample = () => {
  const departmentOptions = [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '运营部', value: 'operation' },
    { label: '市场部', value: 'marketing' },
    { label: '人力资源部', value: 'hr' },
    { label: '财务部', value: 'finance' }
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Select 组件历史记录" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>部门选择：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="department_history"
                label="最近选择的部门"
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择部门"
                    style={{ width: '100%' }}
                    options={departmentOptions}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onSelect={(value, option) => {
                      appendHistory({
                        value,
                        label: option.label
                      });
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Text strong>城市选择：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="city_history"
                label="最近选择的城市"
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    mode="tags"
                    placeholder="选择或输入城市"
                    style={{ width: '100%' }}
                    options={[
                      { label: '北京', value: 'beijing' },
                      { label: '上海', value: 'shanghai' },
                      { label: '广州', value: 'guangzhou' },
                      { label: '深圳', value: 'shenzhen' }
                    ]}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onChange={(values) => {
                      if (values.length > 0) {
                        const lastValue = values[values.length - 1];
                        const option = [
                          { label: '北京', value: 'beijing' },
                          { label: '上海', value: 'shanghai' },
                          { label: '广州', value: 'guangzhou' },
                          { label: '深圳', value: 'shenzhen' }
                        ].find(opt => opt.value === lastValue);
                        if (option) {
                          appendHistory({
                            value: lastValue,
                            label: option.label
                          });
                        }
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Text type="secondary">
          HistoryStore 可以与 Select 组件结合使用，记录用户的选择历史。
          通过 storeName 区分不同的历史记录场景，互不干扰。
          使用 onDropdownVisibleChange 控制下拉框的打开状态，实现历史记录和选项列表的切换。
        </Text>
      </Card>
    </Space>
  );
};

render(<SelectExample />);

```

- 多个独立存储
- 展示通过不同 storeName 创建多个独立的历史记录
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
const { default: HistoryStore } = _HistoryStore;
const { Input, Select, Space, Card, Typography, Divider } = antd;

const { Text } = Typography;

const MultipleStoresExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="多个独立的历史记录存储" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户搜索（storeName: user_search）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="user_search"
                label="最近搜索的用户"
                maxLength={5}
              >
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="搜索用户名或手机号"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <div>
            <Text strong>订单搜索（storeName: order_search）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="order_search"
                label="最近搜索的订单"
                maxLength={5}
              >
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="搜索订单号或商品名称"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <div>
            <Text strong>部门筛选（storeName: department_filter）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="department_filter"
                label="最近筛选的部门"
                maxLength={3}
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择部门"
                    style={{ width: '100%' }}
                    options={[
                      { label: '技术部', value: 'tech' },
                      { label: '产品部', value: 'product' },
                      { label: '运营部', value: 'operation' }
                    ]}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onSelect={(value, option) => {
                      appendHistory({ value, label: option.label });
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <div>
            <Text strong>状态筛选（storeName: status_filter）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="status_filter"
                label="最近筛选的状态"
                maxLength={3}
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择状态"
                    style={{ width: '100%' }}
                    options={[
                      { label: '待处理', value: 'pending' },
                      { label: '处理中', value: 'processing' },
                      { label: '已完成', value: 'completed' },
                      { label: '已取消', value: 'cancelled' }
                    ]}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onSelect={(value, option) => {
                      appendHistory({ value, label: option.label });
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Text type="secondary">
          通过不同的 storeName 可以创建多个独立的历史记录存储，每个存储互不干扰。
          这样可以在同一个页面中使用多个 HistoryStore 组件，分别记录不同操作的历史记录。
          常用于多个搜索框、多个筛选器等场景。
        </Text>
      </Card>
    </Space>
  );
};

render(<MultipleStoresExample />);

```

- 真实业务场景
- 展示在订单管理页面中的实际应用
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
const { default: HistoryStore } = _HistoryStore;
const { Input, Select, Button, Space, Table, Card, Typography, Tag } = antd;

const { Text } = Typography;

const RealScenarioExample = () => {
  const [filters, setFilters] = React.useState({});

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo'
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => &#96;¥${amount}&#96;
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          pending: <Tag color="orange">待处理</Tag>,
          processing: <Tag color="blue">处理中</Tag>,
          completed: <Tag color="green">已完成</Tag>,
          cancelled: <Tag color="red">已取消</Tag>
        };
        return statusMap[status] || status;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }
  ];

  const mockData = [
    {
      key: '1',
      orderNo: 'ORD202401001',
      customerName: '张三',
      amount: 1200.00,
      status: 'completed',
      createTime: '2024-01-15 10:30:00'
    },
    {
      key: '2',
      orderNo: 'ORD202401002',
      customerName: '李四',
      amount: 3500.00,
      status: 'processing',
      createTime: '2024-01-15 11:20:00'
    },
    {
      key: '3',
      orderNo: 'ORD202401003',
      customerName: '王五',
      amount: 890.00,
      status: 'pending',
      createTime: '2024-01-15 14:45:00'
    }
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="订单管理页面" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space wrap>
            <div>
              <Text>订单搜索：</Text>
              <HistoryStore
                storeName="order_search"
                label="最近搜索的订单"
                maxLength={5}
              >
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="搜索订单号或客户姓名"
                    style={{ width: 280 }}
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        setFilters({ ...filters, keyword: value });
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>

            <div>
              <Text>状态：</Text>
              <HistoryStore
                storeName="order_status_filter"
                label="最近筛选的状态"
                maxLength={3}
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择状态"
                    style={{ width: 150 }}
                    allowClear
                    options={[
                      { label: '待处理', value: 'pending' },
                      { label: '处理中', value: 'processing' },
                      { label: '已完成', value: 'completed' },
                      { label: '已取消', value: 'cancelled' }
                    ]}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onSelect={(value, option) => {
                      setFilters({ ...filters, status: value });
                      appendHistory({ value, label: option.label });
                    }}
                    onClear={() => {
                      setFilters({ ...filters, status: undefined });
                    }}
                  />
                )}
              </HistoryStore>
            </div>

            <Button type="primary">查询</Button>
            <Button>重置</Button>
          </Space>

          <div style={{ marginTop: 16 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              当前筛选条件：{Object.keys(filters).length > 0 ? JSON.stringify(filters) : '无'}
            </Text>
          </div>

          <Table
            columns={columns}
            dataSource={mockData}
            pagination={false}
            size="small"
          />
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Text type="secondary">
          真实业务场景示例：在订单管理页面中，使用两个独立的 HistoryStore 组件，
          分别记录订单搜索历史和状态筛选历史。这样用户可以快速选择之前的搜索条件，
          提高操作效率。通过不同的 storeName 确保两个历史记录互不干扰。
        </Text>
      </Card>
    </Space>
  );
};

render(<RealScenarioExample />);

```

### API

#### HistoryStore

HistoryStore 组件用于管理用户的历史记录，支持将搜索、选择等操作保存到 localStorage，并在需要时展示历史记录列表供用户快速选择。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| className | string | 否 | - | 自定义类名 |
| overlayClassName | string | 否 | - | 弹窗内容的自定义类名 |
| storeName | string | 否 | 'HISTORY_STORE_KEY' | localStorage 的键名，用于区分不同场景的历史记录 |
| maxLength | number | 否 | 5 | 最多保存的历史记录数量，为 0 时不限制 |
| label | string | 否 | '最近搜索' | 历史记录列表的标题文字 |
| children | function | 是 | - | 子组件，接收 render props |
| onSelect | function | 否 | - | 选中历史记录时的回调函数，接收参数：(value, item) |
| zIndex | number | 否 | - | 弹窗的 z-index 层级 |
| getPopupContainer | function | 否 | - | 获取弹窗容器的函数 |

##### Render Props

children 是一个函数，接收以下参数：

| 参数名 | 类型 | 说明 |
|--------|------|------|
| open | boolean | 弹窗是否打开 |
| openHistory | function | 打开历史记录弹窗的方法 |
| appendHistory | function | 添加历史记录的方法，参数：{value, label} |
| setOnSelect | function | 设置选中回调的方法，参数：callback |
| close | function | 关闭弹窗的方法 |

##### 历史记录数据格式

每条历史记录是一个对象，包含以下字段：

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| value | string | 是 | 历史记录的值 |
| label | string | 是 | 历史记录的显示文本 |

# react-icon


### 描述

用于将一个font或svg展示为一个图标组件.


### 安装

```shell
npm i --save @kne/react-icon
```


### 概述

### Iconfont

`Iconfont` 是一个基于字体图标的 React 组件，支持两种模式：

- **单色模式**：使用传统字体图标渲染
- **多彩模式**：通过 SVG 方式渲染彩色图标

#### 基础图标
```jsx
<Iconfont type="user" />
```

#### 指定尺寸
```jsx
<Iconfont type="search" size={24} />
```

#### 多彩图标模式
```jsx
<Iconfont type="feedback" colorful />
```

#### 注意事项

1. 需要预先引入对应的字体文件/CSS
2. 多彩模式需要确保 SVG 资源可用
3. 组件会自动处理 `icon-` 前缀（无需手动添加）

**以上资源可以通过`FontLoader`进行加载**

### FontLoader

`FontLoader` 是一个用于动态加载/卸载字体资源的 React 组件，具有以下特性：

- 按需加载字体文件
- 自动卸载机制（组件卸载时）
- 纯逻辑组件（无UI渲染）

#### 加载本地字体
```jsx
<FontLoader 
  path="../assets/fonts/iconfont.woff" 
  name="app-iconfont"
/>
```

#### 加载CDN字体
```jsx
<FontLoader
  path="https://cdn.example.com/fonts/iconfont.woff2"
  name="cdn-iconfont"
/>
```

#### 注意事项

1. 需要配合 `@font-face` CSS 规则使用
2. 字体名称(`name`)需与CSS定义保持一致
3. 建议在应用根组件或路由组件中使用
4. 多次加载同名字体时会自动去重

### loadFont

该函数提供了动态加载字体资源的功能，主要包含两个实用函数：

1. **路径处理函数** - `getLastFolderName`
    - 从文件路径中提取最后一个非空文件夹名
    - 自动处理路径末尾的冗余斜杠

2. **字体加载函数** - `loadFont`
    - 智能避免重复加载相同字体
    - 支持通过JS脚本方式加载字体资源
    - 自动使用路径最后一段作为默认字体名称

#### 基本用法
```javascript
import { loadFont } from './loadFont';

// 加载字体（自动使用路径最后一段作为名称）
await loadFont('/assets/fonts/roboto/roboto.js');

// 指定字体名称
await loadFont('/assets/fonts/roboto/main.js', 'Roboto');
```

#### 实现特点
1. **防重复加载**：通过检查head中是否已存在相同href的script标签
2. **路径标准化**：自动处理路径末尾的冗余斜杠
3. **容错处理**：过滤路径中的空字符串部分

#### 注意事项
1. 当前仅支持通过.js文件加载字体
2. 需要确保字体JS文件符合标准格式
3. 在浏览器环境中使用，依赖document对象

### 示例(全屏)


#### 示例样式

```scss
.item {
  width: 150px;
  word-break: break-all;
  .ant-typography {
    position: relative;
  }
  .ant-typography-copy {
    visibility: hidden;
    position: absolute;
    right: -20px;
  }
  &:hover {
    .ant-typography-copy {
      visibility: visible;
    }
  }
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@kne/react-icon),antd(antd),ReactFetch(@kne/react-fetch),_axios(axios),remoteLoader(@kne/remote-loader)

```jsx
const {default: Icon} = _Icon;
const {Slider, Space, Typography} = antd;
const {useState} = React;
const {createWithFetch} = ReactFetch;
const {default: axios} = _axios;
const {createWithRemoteLoader} = remoteLoader;

const BaseExample = createWithRemoteLoader({
    modules: ["components-iconfont:Font"],
})(({remoteModules}) => {
    const [Font] = remoteModules;
    const [value, setValue] = useState(30);
    return (
        <Space direction="vertical">
            <Space>
                <div>调整大小:</div>
                <Slider
                    style={{width: 100}}
                    max={60}
                    min={12}
                    value={value}
                    onChange={setValue}
                />
                <div>{value}px</div>
            </Space>
            {
                <Font>
                    {({list}) => {
                        return (
                            <Space wrap align="top" size="large">
                                {list.map(({name, font_class}) => {
                                    return (
                                        <Space
                                            className="item"
                                            direction="vertical"
                                            align="center"
                                            key={name}
                                        >
                                            <Icon type={font_class} size={value}/>
                                            <Typography.Text
                                                copyable={{
                                                    text:
                                                        '<Icon type="' +
                                                        font_class +
                                                        '" size={' +
                                                        value +
                                                        "} />",
                                                }}
                                            >
                                                {font_class}
                                            </Typography.Text>
                                            <div>{name}</div>
                                        </Space>
                                    );
                                })}
                            </Space>
                        );
                    }}
                </Font>
            }
        </Space>
    );
});

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@kne/react-icon),antd(antd),ReactFetch(@kne/react-fetch),_axios(axios),remoteLoader(@kne/remote-loader)

```jsx
const { default: Icon } = _Icon;
const { Space, Slider, Typography } = antd;
const { useState } = React;
const { createWithFetch } = ReactFetch;
const { createWithRemoteLoader } = remoteLoader;
const { default: axios } = _axios;

const BaseExample = createWithRemoteLoader({
  modules: ["components-iconfont:ColorfulFont"],
})(({ remoteModules }) => {
  const [ColorfulFont] = remoteModules;
  const [value, setValue] = useState(30);
  return (
    <Space direction="vertical">
      <Space>
        <div>调整大小:</div>
        <Slider
          style={{ width: 100 }}
          max={60}
          min={12}
          value={value}
          onChange={setValue}
        />
        <div>{value}px</div>
      </Space>
      <ColorfulFont>
        {({ list }) => (
          <Space wrap align="top" size="large">
            {list.map(({ name }) => {
              return (
                <Space
                  className="item"
                  direction="vertical"
                  align="center"
                  key={name}
                >
                  <Icon colorful type={name} size={value} />
                  <Typography.Text
                    copyable={{
                      text:
                        '<Icon colorful type="' +
                        name +
                        '" size={' +
                        value +
                        "} />",
                    }}
                  >
                    {name}
                  </Typography.Text>
                </Space>
              );
            })}
          </Space>
        )}
      </ColorfulFont>
    </Space>
  );
});

render(<BaseExample />);

```


### API

### Iconfont

| 属性              | 类型            | 默认值          | 说明                     |
|-----------------|---------------|--------------|------------------------|
| `type`          | string        | **必填**       | 图标名称（如 `'home'`）       |
| `colorful`      | boolean       | `false`      | 是否启用多彩模式               |
| `className`     | string        | -            | 自定义 CSS 类名             |
| `fontClassName` | string        | `'iconfont'` | 字体图标基础类名               |
| `size`          | number/string | -            | 图标尺寸（如 `20` 或 `'2em'`） |
| `style`         | object        | -            | 行内样式对象                 |
| `prefix`        | string        | `''`         | 图标名前缀（自动处理 `icon-` 前缀） |
| `...other`      | any           | -            | 其他透传的 DOM 属性           |

### FontLoader

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `path` | string | 是 | 字体文件路径（支持相对/绝对路径） |
| `name` | string | 是 | 注册的字体名称（用于CSS引用） |

### `getLastFolderName(path)`
```javascript
/**
 * 从文件路径中提取最后一个文件夹名
 * @param {string} path - 文件路径
 * @return {string} 最后一个非空文件夹名
 */
```

### `loadFont(path, name)`
```javascript
/**
 * 动态加载字体资源
 * @param {string} path - 字体资源路径(.js)
 * @param {string} [name] - 可选字体名称，未提供时使用路径最后一段
 */
```

# Image

### 概述

Image 组件是一个增强的图片显示组件，支持两种加载方式：

1. 通过 src 属性直接加载图片URL
2. 通过 id 属性从 OSS 服务器加载图片

组件特性：
- 自动加载状态显示和错误处理
- 支持 Avatar 头像模式，可显示默认性别图标
- 支持自定义加载状态和错误状态组件
- 完全兼容原生 img 标签的基本属性

主要应用场景：
- 用户头像展示
- 商品图片展示
- 文档预览
- 需要加载状态的图片显示


### 示例

#### 示例样式

```scss
/* Image 组件示例样式 */
.product-card {
  .ant-card-cover {
    height: 180px;
    overflow: hidden;
  }
}

.user-avatar {
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
  }
}

.image-preview {
  text-align: center;
  
  img {
    max-width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
```

#### 示例代码

- 基础图片加载
- 通过src属性直接加载图片
- _Image(@components/Image),antd(antd)

```jsx
const { default: Image } = _Image;
const { Space, Card, Typography } = antd;

const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="基础图片加载" size="small">
        <Space direction="vertical">
          <div>
            <Text strong>通过 src 属性加载图片：</Text>
            <div style={{ marginTop: 8 }}>
              <Image src={window.PUBLIC_URL + "/logo512.png"} style={{ width: '100px', height: '100px' }} alt="Logo图片" />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <Text strong>通过 URL 加载网络图片：</Text>
            <div style={{ marginTop: 8 }}>
              <Image src="https://picsum.photos/seed/example/200/200.jpg" style={{ width: '100px', height: '100px' }} alt="示例图片" />
            </div>
          </div>
        </Space>
      </Card>
      
      <Card title="说明" size="small">
        <Text>
          <div>1. Image 组件通过 src 属性直接加载图片URL。</div>
          <div>2. 支持本地图片和网络图片加载。</div>
          <div>3. 可以通过 style 属性设置图片大小。</div>
          <div>4. 自动处理加载状态和错误状态。</div>
        </Text>
      </Card>
    </Space>
  );
};

render(<BaseExample />);

```

- OSS图片加载
- 通过id从OSS服务器加载图片，展示加载中和失败状态
- _Image(@components/Image),global(@components/Global),antd(antd)

```jsx
const {default: Image} = _Image;
const {PureGlobal} = global;
const {Space} = antd;
const BaseExample = () => {
    return <PureGlobal preset={{
        apis: {
            file: {
                getUrl: {
                    loader: ({params}) => {
                        if (params.id === 'logo513.png') {
                            return new Promise(() => {

                            });
                        }
                        return new Promise((resolve) => {
                            resolve(window.PUBLIC_URL + '/' + params.id);
                        });

                    }
                }
            }
        }
    }}>
        <Space>
            <Image id="logo512.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo513.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo511.png" style={{width: '100px', height: '100px'}}/>
        </Space>
    </PureGlobal>;
};

render(<BaseExample/>);

```

- 头像组件
- 展示Image.Avatar头像组件的各种用法
- _Image(@components/Image),antd(antd)

```jsx
const { default: Image } = _Image;
const { Space } = antd;
const BaseExample = () => {
  return (
    <Space>
      <Image.Avatar src={window.PUBLIC_URL + "/avatar.png"} shape="circle" />
      <Image.Avatar
        src={window.PUBLIC_URL + "/avatar.png"}
        shape="circle"
        size={80}
      />
      <Image.Avatar
        src={window.PUBLIC_URL + "/avatar.png"}
        shape="circle"
        size={50}
      />

      <Image.Avatar shape="circle" />
      <Image.Avatar gender="M" shape="circle" size={80} />
      <Image.Avatar gender="female" shape="circle" size={50} />
      <Image.Avatar gender="m" shape="circle" size={50} />
    </Space>
  );
};

render(<BaseExample />);

```

- 自定义状态组件
- 自定义加载中和错误状态的显示组件
- _Image(@components/Image),antd(antd),icon(@components/Icon)

```jsx
const { default: Image } = _Image;
const { Space, Card, Spin, Alert } = antd;
const { default: Icon } = icon;

const CustomStatesExample = () => {
  const customLoading = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px' }}>
      <Spin size="large" />
    </div>
  );
  
  const customError = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px', background: '#f5f5f5' }}>
      <Icon type="icon-exclamation-circle" style={{ fontSize: 24, color: '#ff4d4f' }} />
    </div>
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="自定义加载状态" size="small">
        <Space>
          <div>
            <div style={{ marginBottom: 8 }}>默认加载状态:</div>
            <Image src="https://picsum.photos/seed/loading1/100/100.jpg" style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>自定义加载状态:</div>
            <Image 
              src="https://picsum.photos/seed/loading2/100/100.jpg" 
              loading={customLoading}
              style={{ width: '100px', height: '100px' }} 
            />
          </div>
        </Space>
      </Card>
      
      <Card title="自定义错误状态" size="small">
        <Space>
          <div>
            <div style={{ marginBottom: 8 }}>默认错误状态:</div>
            <Image src="https://invalid-url.example.com/image.jpg" style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>自定义错误状态:</div>
            <Image 
              src="https://invalid-url2.example.com/image.jpg" 
              error={customError}
              style={{ width: '100px', height: '100px' }} 
            />
          </div>
        </Space>
      </Card>
      
      <Card title="说明" size="small">
        <Alert 
          message="自定义状态组件" 
          description="Image 组件支持自定义加载中和错误状态的显示组件，可以通过 loading 和 error 属性传入自定义的 ReactNode。"
          type="info" 
        />
      </Card>
    </Space>
  );
};

render(<CustomStatesExample />);
```

- 图片交互
- 展示图片点击事件和图片预览功能
- _Image(@components/Image),antd(antd)

```jsx
const { default: Image } = _Image;
const { Space, Card, Modal, Typography, Button } = antd;
const { useState } = React;

const { Text } = Typography;

const ImageInteractionExample = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleImageClick = (src) => {
    setPreviewImage(src);
    setPreviewVisible(true);
  };

  const handlePreviewClose = () => {
    setPreviewVisible(false);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="图片点击事件" size="small">
        <Space direction="vertical">
          <Text type="secondary">点击图片查看大图：</Text>
          <Space wrap>
            <Image
              src="https://picsum.photos/seed/product1/150/150.jpg"
              style={{ 
                width: '150px', 
                height: '150px', 
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
              }}
              onClick={() => handleImageClick('https://picsum.photos/seed/product1/600/600.jpg')}
              alt="产品图片1"
            />
            <Image
              src="https://picsum.photos/seed/product2/150/150.jpg"
              style={{ 
                width: '150px', 
                height: '150px', 
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
              }}
              onClick={() => handleImageClick('https://picsum.photos/seed/product2/600/600.jpg')}
              alt="产品图片2"
            />
            <Image
              src="https://picsum.photos/seed/product3/150/150.jpg"
              style={{ 
                width: '150px', 
                height: '150px', 
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
              }}
              onClick={() => handleImageClick('https://picsum.photos/seed/product3/600/600.jpg')}
              alt="产品图片3"
            />
          </Space>
        </Space>
      </Card>
      
      <Card title="可点击头像" size="small">
        <Space>
          <div style={{ textAlign: 'center' }}>
            <Image.Avatar
              src="https://picsum.photos/seed/user1/100/100.jpg"
              size={80}
              shape="circle"
              onClick={() => console.log('点击了用户头像')}
              style={{ cursor: 'pointer' }}
              alt="用户头像"
            />
            <div style={{ marginTop: 8, fontSize: 12 }}>用户头像</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Image.Avatar
              gender="female"
              size={80}
              shape="circle"
              onClick={() => console.log('点击了默认女性头像')}
              style={{ cursor: 'pointer' }}
            />
            <div style={{ marginTop: 8, fontSize: 12 }}>默认女性头像</div>
          </div>
        </Space>
      </Card>
      
      <Card title="说明" size="small">
        <Text>
          <div>1. Image 和 Image.Avatar 组件都支持 onClick 事件，可以添加交互功能。</div>
          <div>2. 结合 Modal 组件可以实现图片预览功能。</div>
          <div>3. 通过设置 cursor: 'pointer' 样式可以提示用户图片是可点击的。</div>
        </Text>
      </Card>
      
      <Modal
        open={previewVisible}
        title="图片预览"
        footer={[
          <Button key="close" onClick={handlePreviewClose}>
            关闭
          </Button>
        ]}
        width={700}
        onCancel={handlePreviewClose}
      >
        <div style={{ textAlign: 'center' }}>
          <img src={previewImage} alt="预览" style={{ maxWidth: '100%' }} />
        </div>
      </Modal>
    </Space>
  );
};

render(<ImageInteractionExample />);
```

- 真实业务场景
- 用户信息卡片中的头像和商品列表中的图片展示
- _Image(@components/Image),antd(antd)

```jsx
const { default: Image } = _Image;
const { Space, Card, Typography, List, Avatar, Tag } = antd;

const { Title, Text, Paragraph } = Typography;

const RealScenarioExample = () => {
  // 模拟用户数据
  const users = [
    {
      id: 1,
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
      position: '前端开发工程师',
      department: '技术部'
    },
    {
      id: 2,
      name: '李四',
      avatar: '',
      gender: 'male',
      position: '产品经理',
      department: '产品部'
    },
    {
      id: 3,
      name: '王五',
      avatar: '',
      gender: 'female',
      position: 'UI设计师',
      department: '设计部'
    }
  ];

  // 模拟商品数据
  const products = [
    {
      id: 1,
      name: '高端笔记本电脑',
      image: 'https://picsum.photos/seed/laptop/200/200.jpg',
      price: 8999,
      status: '在售'
    },
    {
      id: 2,
      name: '无线蓝牙耳机',
      image: 'https://picsum.photos/seed/earphone/200/200.jpg',
      price: 499,
      status: '在售'
    },
    {
      id: 3,
      name: '智能手表',
      image: 'https://picsum.photos/seed/watch/200/200.jpg',
      price: 1299,
      status: '缺货'
    }
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="用户信息卡片" size="small">
        <List
          dataSource={users}
          renderItem={(user) => (
            <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
              <List.Item.Meta
                avatar={
                  user.avatar ? (
                    <Image.Avatar
                      src={user.avatar}
                      size={50}
                      shape="circle"
                      alt={user.name}
                    />
                  ) : (
                    <Image.Avatar
                      gender={user.gender}
                      size={50}
                      shape="circle"
                    />
                  )
                }
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text strong>{user.name}</Text>
                    <Tag color="blue" style={{ marginLeft: 8 }}>
                      {user.department}
                    </Tag>
                  </div>
                }
                description={user.position}
              />
            </List.Item>
          )}
        />
      </Card>
      
      <Card title="商品展示列表" size="small">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <Card
                size="small"
                hoverable
                cover={
                  <Image
                    src={product.image}
                    style={{ 
                      width: '100%', 
                      height: 180, 
                      objectFit: 'cover' 
                    }}
                    alt={product.name}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ color: '#f5222d' }}>
                        ¥{product.price}
                      </Text>
                      <Tag color={product.status === '在售' ? 'green' : 'red'}>
                        {product.status}
                      </Tag>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
      
      <Card title="说明" size="small">
        <Paragraph>
          本示例展示了 Image 组件在真实业务场景中的应用：
        </Paragraph>
        <ul>
          <li>用户信息卡片中的头像展示，支持图片头像和默认性别图标头像</li>
          <li>商品展示列表中的图片展示，支持加载状态和错误处理</li>
          <li>结合其他组件（List、Card、Tag等）实现完整的功能页面</li>
        </ul>
      </Card>
    </Space>
  );
};

render(<RealScenarioExample />);
```

### API

#### Image 基础图片组件

| 属性名     | 说明         | 类型     | 默认值 |
|---------|------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| loading | 加载时显示的组件   | ReactNode | `<Skeleton.Avatar shape="square" active/>` |
| error   | 加载错误时显示的组件 | ReactNode | `<Icon role="error-icon" colorful type="icon-color-touxiang-nan"/>` |
| alt     | 图片的alt属性   | string | -   |
| className | 自定义类名     | string | -   |
| onClick | 点击图片的回调函数 | function | -   |
| apis    | API配置，用于加载OSS图片 | object | -   |

#### Image.Avatar 头像组件

基于Antd的Avatar组件，支持图片头像和默认性别图标头像，其他参数参考Antd的Avatar组件

| 属性名    | 说明                  | 类型     | 默认值 |
|--------|---------------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| gender  | 性别 F，female，f为女其他为男 | string | -   |
| size    | 头像大小 | number | 100   |
| width   | 头像宽度 | number | -   |
| height  | 头像高度 | number | -   |
| shape   | 头像形状，可选 'circle' | string | -   |
| gap     | 头像与图标之间的间距 | number | -   |
| icon    | 自定义图标 | ReactNode | -   |
| defaultAvatar | 默认头像 | string | 默认头像SVG |
| className | 自定义类名 | string | -   |
| apis    | API配置，用于加载OSS图片 | object | -   |

# info-page

### 描述

一般用在复杂的详情展示页面，InfoPage提供了一个标准的展示信息的格式

### 安装

```shell
npm i --save @kne/info-page
```

### 概述

info-page 是一个专为复杂详情展示页面设计的 React 组件库，提供标准化的信息展示格式和丰富的布局选项。

## 核心特性

- **统一的信息展示标准**：提供一致的详情页面展示格式，确保用户体验的连贯性
- **灵活的布局组件**：包含多种布局方式，支持网格、表格、分栏等多种展示形式
- **强大的数据处理能力**：内置数据格式化、空值处理、条件显示等实用功能
- **高度可定制化**：支持自定义渲染、样式定制和扩展配置
- **现代化设计**：基于 Ant Design 构建，支持响应式布局

## 适用场景

- **管理系统详情页**：用户信息、订单详情、产品信息等复杂展示场景
- **数据报告页面**：需要结构化展示多维度数据的报表和统计页面  
- **工作流展示**：流程审批记录、操作历史等时序信息展示
- **数据对比页面**：多列对比展示、评分系统等
- **打印友好设计**：支持分页打印的报告生成

## 技术亮点

- **组件化设计**：提供 InfoPage、Content、TableView、Flow 等独立组件，可单独使用也可组合使用
- **智能列计算**：自动计算列宽、响应式布局适配，支持固定列和自适应列混合使用
- **丰富的格式化选项**：内置日期、数字、货币、布尔值等多种数据格式化器
- **条件渲染机制**：支持基于数据动态控制字段显示状态
- **TypeScript 友好**：完整的类型定义支持，提供良好的开发体验

### 示例

#### 示例代码

- 基础布局
- 展示InfoPage容器组件和Part区块组件的基本使用方法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { default: InfoPage } = _InfoPage;
const { Button, Space, Flex, Tag } = antd;

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Space direction="vertical" size={16}>
        {/* 基础 Part 使用 */}
        <InfoPage.Part title="个人信息" subtitle="展示基础 Part 用法">
          <Space direction="vertical" size={8}>
            <div><strong>姓名：</strong>张三</div>
            <div><strong>性别：</strong>男</div>
            <div><strong>年龄：</strong>28岁</div>
          </Space>
        </InfoPage.Part>

        {/* 带 extra 的 Part */}
        <InfoPage.Part 
          title="联系方式" 
          subtitle="展示标题和额外操作区"
          extra={<Button type="primary" size="small">编辑</Button>}
        >
          <Space direction="vertical" size={8}>
            <div><strong>手机：</strong>138-0013-8000</div>
            <div><strong>邮箱：</strong>zhangsan@example.com</div>
            <div><strong>地址：</strong>深圳市南山区科技园</div>
          </Space>
        </InfoPage.Part>

        {/* 嵌套 Part */}
        <InfoPage.Part title="工作经历">
          <p>以下展示了 Part 的嵌套使用：</p>
          <InfoPage.Part subtitle="现任职位" style={{ background: '#f5f5f5', padding: '12px' }}>
            <Space direction="vertical" size={8}>
              <div><strong>公司：</strong>腾讯科技</div>
              <div><strong>职位：</strong>高级前端工程师</div>
              <div><strong>入职时间：</strong>2020年3月</div>
            </Space>
          </InfoPage.Part>
        </InfoPage.Part>

        {/* 带 bordered 的 Part */}
        <InfoPage.Part title="项目经验" bordered>
          <Space direction="vertical" size={8}>
            <div><strong>项目名称：</strong>企业级管理系统</div>
            <div><strong>技术栈：</strong>React、TypeScript、Ant Design</div>
            <div><strong>职责：</strong>负责前端架构设计与核心功能开发</div>
          </Space>
        </InfoPage.Part>

        {/* Collapse 折叠面板 */}
        <InfoPage.Collapse
          items={[
            { 
              key: '1', 
              label: '教育背景', 
              children: (
                <Space direction="vertical" size={8}>
                  <div><strong>学校：</strong>深圳大学</div>
                  <div><strong>专业：</strong>计算机科学与技术</div>
                  <div><strong>学历：</strong>本科</div>
                  <div><strong>毕业时间：</strong>2018年6月</div>
                </Space>
              )
            },
            { 
              key: '2', 
              label: '技能证书', 
              children: (
                <Space wrap>
                  <Tag color="blue">PMP项目管理</Tag>
                  <Tag color="green">阿里云ACP认证</Tag>
                  <Tag color="purple">AWS解决方案架构师</Tag>
                </Space>
              )
            }
          ]}
        />

        {/* 无标题 Part */}
        <InfoPage.Part>
          <div style={{ color: '#666', padding: '12px', background: '#fafafa' }}>
            <strong>备注：</strong>以上信息仅供示例展示，不代表真实数据
          </div>
        </InfoPage.Part>
      </Space>
    </Flex>
  );
};

render(<BaseExample />);

```

- 内容列表
- 支持多列布局和标签对齐的灵活内容展示组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Content } = _InfoPage;
const { Space, Radio, Tag } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 2,
    size: 'default',
    labelAlign: 'left'
  });

  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps(prevState => Object.assign({}, prevState, { [name]: val }));
  };

  return (
    <Space direction='vertical' size={16}>
      {/* 控制面板 */}
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <div>
            <span style={{ marginRight: 8 }}>列数：</span>
            <Radio.Group onChange={(e) => onChange(e, 'col')} value={listProps.col}>
              <Radio.Button value={1}>单列</Radio.Button>
              <Radio.Button value={2}>两列</Radio.Button>
              <Radio.Button value={3}>三列</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>标签对齐：</span>
            <Radio.Group onChange={(e) => onChange(e, 'labelAlign')} value={listProps.labelAlign}>
              <Radio.Button value='left'>左对齐</Radio.Button>
              <Radio.Button value='center'>居中</Radio.Button>
              <Radio.Button value='right'>右对齐</Radio.Button>
              <Radio.Button value='auto'>自适应</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>尺寸：</span>
            <Radio.Group onChange={(e) => onChange(e, 'size')} value={listProps.size}>
              <Radio.Button value='default'>默认</Radio.Button>
              <Radio.Button value='small'>小尺寸</Radio.Button>
            </Radio.Group>
          </div>
        </Space>
      </div>

      {/* Content 组件展示 */}
      <Content
        {...listProps}
        list={[
          { label: '客户名称', content: '深圳市腾讯计算机系统有限公司' },
          { label: '统一社会信用代码', content: '914403007109410773' },
          { label: '法定代表人', content: '马化腾' },
          { label: '企业类型', content: <Tag color="blue">有限责任公司</Tag> },
          { label: '成立日期', content: '1998-11-11' },
          { label: '注册资本', content: '500万美元' },
          { label: '经营状态', content: <Tag color="success">存续</Tag> },
          { label: '注册地址', content: '深圳市南山区高新科技园科技中一路腾讯大厦' },
          {
            label: '经营范围',
            content: '计算机软硬件的技术开发、销售；计算机网络工程；系统集成；软件开发及技术服务；信息咨询；网络设备、通讯设备、电子产品的技术开发与销售；国内贸易。',
            block: true
          }
        ]}
        itemRender={(inner, other) => {
          return other?.index === 8 ? <div style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
            * 以上信息仅供展示，不代表真实数据
          </div> : inner;
        }}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- 内容展示
- 展示Content组件的各种配置和用法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Content } = _InfoPage;
const { Flex, Radio, Space, Tag, Avatar } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 2,
    size: 'default',
    labelAlign: 'auto',
    gutter: 16
  });

  const [showDisabled, setShowDisabled] = useState(false);

  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps(prevState => ({ ...prevState, [name]: val }));
  };

  const dataList = [
    { label: '客户姓名', content: <Flex align="center" gap={8}><Avatar size="small">张</Avatar>张三</Flex>, block: true },
    { label: '客户编号', content: 'C20240115001' },
    { label: '联系电话', content: '138-0013-8000' },
    { label: '电子邮箱', content: 'zhangsan@example.com' },
    { label: '客户类型', content: <Tag color="blue">VIP客户</Tag> },
    { label: '信用等级', content: <Tag color="green">A级</Tag> },
    { label: '所属公司', content: '深圳市腾讯计算机系统有限公司', block: true },
    { label: '所在部门', content: '技术部', display: !showDisabled },
    { label: '职位', content: '高级前端工程师', display: !showDisabled },
    { label: '注册时间', content: '2020-03-15' },
    { label: '最后登录', content: '2024-01-15 10:30:00' },
    { label: '账户状态', content: <Tag color="success">正常</Tag> },
    { label: '备注信息', content: '该客户为公司长期合作伙伴，合作期间表现优秀，建议继续保持良好合作关系。', block: true }
  ];

  return (
    <Flex vertical gap={16}>
      {/* 控制面板 */}
      <Space direction="vertical" size={12} style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <div>
          <span style={{ marginRight: 8 }}>列数：</span>
          <Radio.Group onChange={(e) => onChange(e, 'col')} value={listProps.col}>
            <Radio.Button value={1}>单列</Radio.Button>
            <Radio.Button value={2}>两列</Radio.Button>
            <Radio.Button value={3}>三列</Radio.Button>
            <Radio.Button value={4}>四列</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>标签对齐：</span>
          <Radio.Group onChange={(e) => onChange(e, 'labelAlign')} value={listProps.labelAlign}>
            <Radio.Button value='left'>左对齐</Radio.Button>
            <Radio.Button value='center'>居中</Radio.Button>
            <Radio.Button value='right'>右对齐</Radio.Button>
            <Radio.Button value='auto'>自适应</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>尺寸：</span>
          <Radio.Group onChange={(e) => onChange(e, 'size')} value={listProps.size}>
            <Radio.Button value='default'>默认</Radio.Button>
            <Radio.Button value='small'>小尺寸</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <span style={{ marginRight: 8 }}>显示隐藏：</span>
          <Radio.Group onChange={(e) => setShowDisabled(e.target.value)} value={showDisabled}>
            <Radio.Button value={false}>显示全部</Radio.Button>
            <Radio.Button value={true}>隐藏部分</Radio.Button>
          </Radio.Group>
        </div>
      </Space>

      {/* Content 组件展示 */}
      <Content
        {...listProps}
        list={dataList.map(item => ({
          ...item,
          display: typeof item.display === 'boolean' ? item.display : undefined
        }))}
      />
    </Flex>
  );
};

render(<BaseExample />);

```

- 描述列表
- 二维数组结构的详情信息展示，适合表单数据展示
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Descriptions } = _InfoPage;
const { Tag, Space } = antd;

const BaseExample = () => {
  return (
    <Descriptions
      dataSource={[
        // 基本信息分组
        [
          { label: "订单编号", content: <strong style={{ color: '#1890ff' }}>ORD20240115001</strong> },
          { label: "订单类型", content: <Tag color="blue">普通订单</Tag> },
        ],
        [
          { label: "下单时间", content: "2024-01-15 10:30:25" },
          { label: "支付时间", content: "2024-01-15 10:32:18" },
        ],
        [
          { label: "客户名称", content: "深圳市腾讯计算机系统有限公司" },
          { label: "客户类型", content: <Tag color="gold">VIP客户</Tag> },
        ],
        // 收货信息分组
        [
          { label: "收货人", content: "张三" },
          { label: "联系电话", content: "138-0013-8000" },
        ],
        [
          { label: "收货地址", content: "广东省深圳市南山区科技园科技中一路腾讯大厦A座18层" },
        ],
        // 商品信息分组
        [
          {
            label: "商品清单",
            content: (
              <Space direction="vertical" size={4}>
                <div>1. 腾讯云服务器（2核4G）× 1台 - ¥3000.00</div>
                <div>2. 云数据库 MySQL（50GB）× 1个 - ¥1200.00</div>
                <div>3. 对象存储（500GB）× 1个 - ¥800.00</div>
              </Space>
            ),
          },
        ],
        // 金额信息分组
        [
          { label: "商品总额", content: <strong>¥5,000.00</strong> },
          { label: "运费", content: "¥0.00" },
        ],
        [
          { label: "优惠金额", content: <span style={{ color: '#52c41a' }}>-¥750.00</span> },
          { label: "实付金额", content: <strong style={{ color: '#f5222d', fontSize: '16px' }}>¥4,250.00</strong> },
        ],
        // 发票信息分组
        [
          { label: "发票类型", content: "增值税专用发票" },
          { label: "发票抬头", content: "深圳市腾讯计算机系统有限公司" },
        ],
        [
          { label: "纳税人识别号", content: "914403007109410773" },
          { label: "发票状态", content: <Tag color="success">已开具</Tag> },
        ],
        // 售后信息分组
        [
          { label: "退款状态", content: "无退款" },
          { label: "发票抬头", content: "未申请" },
        ],
        [
          { label: "订单状态", content: <Tag color="processing">处理中</Tag> },
          {
            label: "预计送达",
            content: "2024-01-17",
          },
        ],
        // 备注信息
        [
          {
            label: "订单备注",
            content: "请务必在工作日配送，配送前请提前电话联系收货人。收到商品后请当面验货，确认无误后再签收。",
            block: true
          },
        ],
        // 操作记录
        [
          { label: "创建时间", content: "2024-01-15 10:30:25" },
          { label: "创建人", content: "张三（客户）" },
        ],
      ]}
    />
  );
};

render(<BaseExample />);

```

- 智能布局
- 支持数据格式化和自动栅格优化的高级内容展示组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { CentralContent } = _InfoPage;
const { Tag, Space } = antd;

const BaseExample = () => {
  return (
    <CentralContent
      dataSource={{
        id: 'RC20240115001',
        name: '张三',
        department: '技术研发部',
        position: '高级前端工程师',
        email: 'zhangsan@tencent.com',
        phone: '138-0013-8000',
        entryDate: '2020-03-15',
        workYears: 4,
        performanceScore: 92.5,
        salary: 35000,
        bonus: 50000,
        leaveDays: 5,
        projectCount: 8,
        description: &#96;负责公司核心产品的前端架构设计与开发工作，主导了多个重要项目的技术方案设计。精通React、Vue等主流前端框架，对TypeScript有深入理解。在性能优化方面有丰富经验，成功将项目加载时间减少40%。&#96;,
        skills: &#96;React, Vue, TypeScript, Node.js, Webpack, Vite, Jenkins, Docker, Kubernetes&#96;
      }}
      col={3}
      columns={[
        { name: 'id', title: '员工编号', block: true },
        { name: 'name', title: '姓名', span: 8 },
        { name: 'department', title: '部门' },
        { name: 'position', title: '职位', span: 10 },
        { name: 'email', title: '电子邮箱' },
        { name: 'phone', title: '联系电话' },
        { name: 'entryDate', title: '入职日期', format: 'date' },
        { name: 'workYears', title: '工作年限', format: 'number-suffix:年' },
        { name: 'performanceScore', title: '绩效评分', format: 'number-maximumFractionDigits:1-suffix:分' },
        { name: 'salary', title: '月薪', format: 'number-useGrouping:true-suffix:元' },
        { name: 'bonus', title: '年终奖金', format: 'number-useGrouping:true-suffix:元' },
        { name: 'leaveDays', title: '年度剩余年假', format: 'number-suffix:天' },
        { name: 'projectCount', title: '参与项目数', format: 'number-suffix:个' },
        { name: 'empty', title: '公积金账号' },
        { name: 'empty2', title: '社保卡号', placeholder: '未办理' },
        { name: 'description', title: '工作描述', block: true },
        { name: 'skills', title: '技能标签', render: (value) => (
          <Space wrap>
            {value.split(',').map(skill => (
              <Tag key={skill} color="blue" style={{ marginBottom: 4 }}>{skill.trim()}</Tag>
            ))}
          </Space>
        )}
      ]}
    />
  );
};

render(<BaseExample />);

```

- 边框区块
- 展示InfoPage.Part的bordered属性配合CentralContent使用
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { default: InfoPage, CentralContent } = _InfoPage;
const { Tag, Avatar, Space, Modal, Button } = antd;
const { useState } = React;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const baseInfo = (
    <InfoPage.Part bordered title="员工档案" subtitle="基本信息">
      <CentralContent
        type="compact"
        dataSource={{
          id: 'RC20240115001',
          name: '张三',
          gender: '男',
          birthday: '1992-03-15',
          idCard: '440301199203154512',
          maritalStatus: '已婚',
          education: '本科',
          graduationSchool: '深圳大学',
          major: '计算机科学与技术',
          entryDate: '2020-03-15',
          workYears: 4,
          phone: '138-0013-8000',
          email: 'zhangsan@tencent.com',
          address: '广东省深圳市南山区科技园科技中一路腾讯大厦',
          emergencyContact: '李四',
          emergencyPhone: '139-0014-9000',
          emergencyRelation: '配偶'
        }}
        col={3}
        columns={[
          {
            name: 'id',
            title: '员工编号',
            block: true
          },
          {
            name: 'name',
            title: '姓名',
            render: value => (
              <Space align="center">
                <Avatar style={{ backgroundColor: '#1890ff' }}>{value[0]}</Avatar>
                <strong>{value}</strong>
              </Space>
            ),
            span: 10
          },
          {
            name: 'gender',
            title: '性别'
          },
          {
            name: 'birthday',
            title: '出生日期',
            format: 'date'
          },
          {
            name: 'idCard',
            title: '身份证号',
            render: value => value.replace(/(\d{6})(\d{8})(\d{4})/, '$1********$3')
          },
          {
            name: 'maritalStatus',
            title: '婚姻状况'
          },
          {
            name: 'education',
            title: '学历'
          },
          {
            name: 'graduationSchool',
            title: '毕业院校'
          },
          {
            name: 'major',
            title: '专业'
          },
          {
            name: 'entryDate',
            title: '入职日期',
            format: 'date'
          },
          {
            name: 'workYears',
            title: '工作年限',
            format: 'number-suffix:年'
          },
          {
            name: 'phone',
            title: '联系电话',
            render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
          },
          {
            name: 'email',
            title: '电子邮箱'
          },
          {
            name: 'address',
            title: '家庭住址',
            block: true
          },
          {
            name: 'emergencyContact',
            title: '紧急联系人'
          },
          {
            name: 'emergencyPhone',
            title: '紧急联系电话',
            render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
          },
          {
            name: 'emergencyRelation',
            title: '与本人关系'
          }
        ]}
      />
    </InfoPage.Part>
  );
  return (
    <InfoPage>
      {baseInfo}
      <InfoPage.Part bordered title="工作信息" subtitle="部门与职位">
        <CentralContent
          type="compact"
          dataSource={{
            department: '技术研发部',
            position: '高级前端工程师',
            level: 'T4-2',
            supervisor: '王总监',
            team: '前端开发组',
            workLocation: '深圳总部',
            office: '腾讯大厦A座18层',
            workStatus: '在职',
            contractType: '正式员工',
            contractStartDate: '2023-03-15',
            contractEndDate: '2026-03-14',
            probationPeriod: '已转正'
          }}
          col={2}
          columns={[
            { name: 'department', title: '所属部门', span: 12 },
            { name: 'position', title: '职位', span: 12 },
            { name: 'level', title: '职级' },
            { name: 'supervisor', title: '直属主管' },
            { name: 'team', title: '所属团队' },
            { name: 'workLocation', title: '工作地点' },
            { name: 'office', title: '办公室位置' },
            { name: 'workStatus', title: '工作状态', render: value => <Tag color="success">{value}</Tag> },
            { name: 'contractType', title: '合同类型' },
            { name: 'contractStartDate', title: '合同开始日期', format: 'date' },
            { name: 'contractEndDate', title: '合同结束日期', format: 'date' },
            { name: 'probationPeriod', title: '试用期状态', render: value => <Tag color="success">{value}</Tag> }
          ]}
        />
      </InfoPage.Part>

      <InfoPage.Part bordered title="福利待遇" subtitle="薪资与福利">
        <CentralContent
          type="compact"
          dataSource={{
            baseSalary: 30000,
            performanceBonus: 5000,
            annualBonus: 50000,
            socialInsurance: '已缴纳（五险一金）',
            housingFund: 3600,
            medicalInsurance: '已包含',
            mealAllowance: 1500,
            transportAllowance: 800,
            stockOptions: 5000,
            otherBenefits: '年度体检、节日礼品、团建活动'
          }}
          col={2}
          columns={[
            { name: 'baseSalary', title: '基本月薪', format: 'number-useGrouping:true-suffix:元', span: 12 },
            { name: 'performanceBonus', title: '绩效奖金', format: 'number-useGrouping:true-suffix:元/月', span: 12 },
            { name: 'annualBonus', title: '年终奖金', format: 'number-useGrouping:true-suffix:元', block: true },
            { name: 'socialInsurance', title: '社会保险', render: value => <Tag color="success">{value}</Tag> },
            { name: 'housingFund', title: '公积金', format: 'number-useGrouping:true-suffix:元/月' },
            { name: 'medicalInsurance', title: '医疗保险', render: value => <Tag color="success">{value}</Tag> },
            { name: 'mealAllowance', title: '餐补', format: 'number-useGrouping:true-suffix:元/月' },
            { name: 'transportAllowance', title: '交通补贴', format: 'number-useGrouping:true-suffix:元/月' },
            { name: 'stockOptions', title: '股票期权', format: 'number-useGrouping:true-suffix:股', block: true },
            { name: 'otherBenefits', title: '其他福利', block: true }
          ]}
        />
      </InfoPage.Part>

      <InfoPage.Part bordered title="放在Modal中">
        <Button
          onClick={() => {
            setOpen(true);
          }}>
          打开Modal
        </Button>
        <Modal title="员工档案" open={open} onCancel={()=>setOpen(false)}>{baseInfo}</Modal>
      </InfoPage.Part>
    </InfoPage>
  );
};

render(<BaseExample />);

```

- Modal中展示
- 展示InfoPage在Modal弹窗中的典型用法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { default: InfoPage, Content, TableView } = _InfoPage;
const { Button, Flex, Modal } = antd;
const { useState } = React;

const ModalExample = () => {
  const [open, setOpen] = useState(false);

  const data = {
    id: '10001',
    name: '产品详情',
    category: '电子产品',
    price: 2999,
    stock: 500,
    status: '在售',
    description: '这是一款高性能的智能设备，支持多种功能和应用场景。',
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-03-20 14:22:00',
  };

  const logDataSource = [
    { id: '1', action: '创建', operator: '管理员', time: data.createTime },
    { id: '2', action: '更新', operator: '管理员', time: data.updateTime },
  ];

  const logColumns = [
    { name: 'action', title: '操作' },
    { name: 'operator', title: '操作人' },
    { name: 'time', title: '时间' },
  ];

  return (
    <Flex vertical gap={24}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开Modal详情
      </Button>

      <Modal
        title="详情信息"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            关闭
          </Button>,
          <Button key="edit" type="primary">
            编辑
          </Button>,
        ]}
        width={720}
      >
        <InfoPage>
          <InfoPage.Part title="价格库存" bordered>
            <Content
              list={[
                { label: '价格', content: &#96;¥${data.price}&#96; },
                { label: '库存', content: &#96;${data.stock} 件&#96; },
              ]}
            />
          </InfoPage.Part>

          <InfoPage.Part title="基本信息">
            <Content
              list={[
                { label: '编号', content: data.id },
                { label: '名称', content: data.name },
                { label: '分类', content: data.category },
                { label: '状态', content: data.status },
              ]}
            />
          </InfoPage.Part>

          <InfoPage.Part title="详细描述">
            <p style={{ margin: 0, lineHeight: 1.8 }}>{data.description}</p>
          </InfoPage.Part>

          <InfoPage.Part title="操作日志">
            <TableView dataSource={logDataSource} columns={logColumns} />
          </InfoPage.Part>
        </InfoPage>
      </Modal>
    </Flex>
  );
};

render(<ModalExample />);

```

- 表格视图
- 支持行选择、固定表头和多数据展示的表格组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { TableView } = _InfoPage;
const { Flex, Tag, Badge } = antd;
const { useState } = React;

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '138-0013-8000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '139-0014-9000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '137-0015-7000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '136-0016-6000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    phone: '135-0017-5000',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12',
    deliveryDate: ''
  }
];

const columns = [
  { name: 'id', title: '订单编号' },
  { name: 'customerName', title: '客户名称', span: 4 },
  { name: 'contact', title: '联系人' },
  { name: 'phone', title: '联系电话', render: (value) => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  { name: 'amount', title: '订单金额(元)', render: (value) => <strong style={{ color: '#f5222d' }}>¥{value.toLocaleString()}</strong> },
  { name: 'orderDate', title: '下单日期', format: 'date' },
  { name: 'deliveryDate', title: '预计送达', format: 'date' },
  { name: 'status', title: '订单状态', render: (value) => {
    const config = {
      '已完成': { color: 'success', text: '已完成' },
      '处理中': { color: 'processing', text: '处理中' },
      '待发货': { color: 'warning', text: '待发货' },
      '已取消': { color: 'default', text: '已取消' }
    };
    const { color, text } = config[value] || { color: 'default', text: value };
    return <Badge status={color} text={text} />;
  }}
];

const WithCheckbox = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong></span>
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'checkbox', allowSelectedAll: true, selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const WithSelected = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const selectedOrder = dataSource.find(d => d.id === selectKeys[0]);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选订单：{selectedOrder ? &#96;${selectedOrder.id} (${selectedOrder.customerName})&#96; : '无'}</span>
        {selectedOrder && <Tag color="blue">¥{selectedOrder.amount.toLocaleString()}</Tag>}
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'radio', selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
        订单列表 - 共 <strong>{dataSource.length}</strong> 个订单
      </div>
      <TableView dataSource={dataSource} columns={columns} />
      <WithCheckbox />
      <WithSelected />
      <div style={{ padding: '16px', background: '#fafafa', border: '1px dashed #d9d9d9', borderRadius: '8px' }}>
        暂无订单数据
      </div>
      <TableView
        style={{ height: '250px', overflowY: 'scroll' }}
        dataSource={dataSource}
        columns={columns}
        sticky
        headerStyle={{ position: 'sticky', top: 0, zIndex: 1, background: '#fafafa' }}
      />
    </Flex>
  );
};

render(<BaseExample />);

```

- 表格选择
- 展示TableView组件的各种选择模式
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { TableView } = _InfoPage;
const { Flex, Radio, Space, Button, Tag, Avatar } = antd;
const { useState } = React;

const dataSource = [
  { id: 'C20240115001', name: '张三', company: '腾讯科技', contact: '138-0013-8000', amount: 50000, status: '已签约' },
  { id: 'C20240115002', name: '李四', company: '华为技术', contact: '139-0014-9000', amount: 85000, status: '跟进中' },
  { id: 'C20240115003', name: '王五', company: '阿里巴巴', contact: '137-0015-7000', amount: 120000, status: '已签约' },
  { id: 'C20240115004', name: '赵六', company: '字节跳动', contact: '136-0016-6000', amount: 65000, status: '待跟进' },
  { id: 'C20240115005', name: '钱七', company: '百度在线', contact: '135-0017-5000', amount: 95000, status: '已签约' }
];

const columns = [
  { name: 'id', title: '客户编号' },
  { name: 'name', title: '联系人' },
  { name: 'company', title: '所属公司' },
  { name: 'contact', title: '联系电话' },
  { name: 'amount', title: '签约金额(元)' },
  { name: 'status', title: '状态' }
];

const BaseExample = () => {
  const [selectionType, setSelectionType] = useState('none');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 复选框选择示例
  const CheckboxExample = () => {
    const [keys, setKeys] = useState([]);
    const totalAmount = keys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
    return (
      <div>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <span>已选 <strong style={{ color: '#1890ff' }}>{keys.length}</strong> 位客户，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong></span>
          <Space>
            <Button size="small" onClick={() => setKeys(dataSource.filter(d => d.status === '已签约').map(d => d.id))}>
              选已签约
            </Button>
            <Button size="small" onClick={() => setKeys([])}>清空</Button>
          </Space>
        </Flex>
        <TableView
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: keys,
            onChange: setKeys
          }}
        />
      </div>
    );
  };

  // 全选状态示例
  const SelectAllExample = () => {
    const [keys, setKeys] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);

    const handleSelectAll = () => {
      if (isSelectedAll) {
        setKeys([]);
      } else {
        setKeys(dataSource.map(d => d.id));
      }
      setIsSelectedAll(!isSelectedAll);
    };

    return (
      <div>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <span>{isSelectedAll ? <Tag color="green">已全选所有客户</Tag> : <Tag>未全选</Tag>}</span>
          <Button size="small" onClick={handleSelectAll}>
            {isSelectedAll ? '取消全选' : '全选客户'}
          </Button>
        </Flex>
        <TableView
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            isSelectedAll,
            allowSelectedAll: true,
            selectedRowKeys: keys,
            onChange: (keys) => {
              setKeys(keys);
              setIsSelectedAll(keys.length === dataSource.length);
            }
          }}
        />
      </div>
    );
  };

  // 单选框示例
  const RadioExample = () => {
    const [key, setKey] = useState(null);
    const selectedCustomer = dataSource.find(d => d.id === key);
    return (
      <div>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <span>已选客户：{selectedCustomer ? &#96;${selectedCustomer.name} (${selectedCustomer.company})&#96; : '无'}</span>
          <Tag color={selectedCustomer ? 'blue' : 'default'}>{selectedCustomer ? &#96;¥${selectedCustomer.amount.toLocaleString()}&#96; : '-'}</Tag>
        </Flex>
        <TableView
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: key ? [key] : [],
            onChange: (keys) => setKey(keys.length > 0 ? keys[0] : null)
          }}
        />
      </div>
    );
  };

  // 无选择模式
  const NoSelectionExample = () => (
    <div>
      <div style={{ marginBottom: 12 }}>客户列表 - 共 {dataSource.length} 位</div>
      <TableView dataSource={dataSource} columns={columns} />
    </div>
  );

  // 自定义渲染示例
  const CustomRenderExample = () => {
    const [keys, setKeys] = useState([]);
    return (
      <div>
        <div style={{ marginBottom: 12 }}>自定义渲染客户列表</div>
        <TableView
          dataSource={dataSource}
          columns={[
            { name: 'id', title: '客户编号' },
            { name: 'name', title: '联系人', render: (value) => <Flex align="center" gap={8}><Avatar size="small">{value[0]}</Avatar>{value}</Flex> },
            { name: 'company', title: '所属公司' },
            { name: 'contact', title: '联系电话' },
            { name: 'amount', title: '签约金额', render: (value) => <strong style={{ color: '#52c41a' }}>¥{value.toLocaleString()}</strong> },
            { name: 'status', title: '状态', render: (value) => {
              const config = {
                '已签约': { color: 'success', text: '已签约' },
                '跟进中': { color: 'processing', text: '跟进中' },
                '待跟进': { color: 'warning', text: '待跟进' }
              };
              const { color, text } = config[value] || { color: 'default', text: value };
              return <Tag color={color}>{text}</Tag>;
            }}
          ]}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: keys,
            onChange: setKeys
          }}
        />
      </div>
    );
  };

  const renderExample = () => {
    switch (selectionType) {
      case 'checkbox':
        return <CheckboxExample />;
      case 'selectAll':
        return <SelectAllExample />;
      case 'radio':
        return <RadioExample />;
      case 'custom':
        return <CustomRenderExample />;
      default:
        return <NoSelectionExample />;
    }
  };

  return (
    <Flex vertical gap={16}>
      {/* 控制面板 */}
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <span style={{ marginRight: 12 }}>选择模式：</span>
        <Radio.Group value={selectionType} onChange={(e) => setSelectionType(e.target.value)}>
          <Radio.Button value="none">无选择</Radio.Button>
          <Radio.Button value="checkbox">复选框</Radio.Button>
          <Radio.Button value="selectAll">全选状态</Radio.Button>
          <Radio.Button value="radio">单选框</Radio.Button>
          <Radio.Button value="custom">自定义渲染</Radio.Button>
        </Radio.Group>
      </div>

      {/* 示例展示区 */}
      {renderExample()}
    </Flex>
  );
};

render(<BaseExample />);

```

- 分割线展示
- 支持图标和垂直/横向布局的紧凑信息展示
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader),antdIcons(@ant-design/icons)

```jsx
const { SplitLine } = _InfoPage;
const { Flex, Tag, Avatar } = antd;
const { MobileOutlined, CompassOutlined, MailOutlined, TeamOutlined, CalendarOutlined, EnvironmentOutlined } = antdIcons;

const BaseExample = () => {
  return (
    <Flex vertical gap={20}>
      {/* 个人信息展示 - 水平布局 */}
      <div>
        <h4 style={{ marginBottom: 12, color: '#333' }}>员工卡片</h4>
        <SplitLine wrap
          dataSource={{
            name: '张三',
            position: '高级前端工程师',
            department: '技术研发部',
            phone: '138-0013-8000',
            email: 'zhangsan@tencent.com',
            workYears: 4,
            entryDate: '2020-03-15',
            status: '在职'
          }}
          columns={[
            {
              name: 'name',
              title: '姓名',
              render: (value) => (
                <Flex align="center" gap={8}>
                  <Avatar style={{ backgroundColor: '#1890ff' }}>{value[0]}</Avatar>
                  <strong>{value}</strong>
                </Flex>
              )
            },
            {
              name: 'position',
              title: '职位',
              render: (value) => <Tag color="blue">{value}</Tag>
            },
            {
              name: 'department',
              title: '部门',
              render: (value) => <Tag color="cyan">{value}</Tag>
            },
            {
              name: 'phone',
              title: '联系电话',
              icon: <MobileOutlined />,
              render: (value) => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            },
            {
              name: 'email',
              title: '电子邮箱',
              icon: <MailOutlined />
            },
            {
              name: 'workYears',
              title: '工作年限',
              icon: <CalendarOutlined />,
              render: (value) => &#96;${value}年&#96;
            },
            {
              name: 'entryDate',
              title: '入职日期',
              icon: <CalendarOutlined />,
              render: (value) => value
            },
            {
              name: 'status',
              title: '状态',
              render: (value) => <Tag color="success">{value}</Tag>
            }
          ]}
        />
      </div>

      {/* 公司信息展示 - 垂直布局 */}
      <div>
        <h4 style={{ marginBottom: 12, color: '#333' }}>公司信息</h4>
        <SplitLine wrap
          labelMode="vertical"
          dataSource={{
            companyName: '深圳市腾讯计算机系统有限公司',
            creditCode: '914403007109410773',
            legalPerson: '马化腾',
            registerDate: '1998-11-11',
            capital: '500万美元',
            address: '深圳市南山区高新科技园科技中一路腾讯大厦',
            businessScope: '计算机软硬件的技术开发、销售；计算机网络工程；系统集成；软件开发及技术服务；信息咨询；网络设备、通讯设备、电子产品的技术开发与销售；国内贸易。'
          }}
          columns={[
            {
              name: 'companyName',
              title: '企业名称'
            },
            {
              name: 'creditCode',
              title: '统一社会信用代码',
              icon: <TeamOutlined />
            },
            {
              name: 'legalPerson',
              title: '法定代表人'
            },
            {
              name: 'registerDate',
              title: '成立日期',
              icon: <CalendarOutlined />
            },
            {
              name: 'capital',
              title: '注册资本'
            },
            {
              name: 'address',
              title: '注册地址',
              icon: <EnvironmentOutlined />
            },
            {
              name: 'businessScope',
              title: '经营范围'
            }
          ]}
        />
      </div>

      {/* 项目信息展示 */}
      <div>
        <h4 style={{ marginBottom: 12, color: '#333' }}>项目详情</h4>
        <SplitLine wrap
          dataSource={{
            projectName: '企业级管理系统重构',
            projectCode: 'PRJ-2024-001',
            manager: '张三',
            teamSize: 12,
            startDate: '2024-01-01',
            endDate: '2024-06-30',
            progress: 35,
            budget: 1500000,
            spent: 525000
          }}
          columns={[
            {
              name: 'projectName',
              title: '项目名称'
            },
            {
              name: 'projectCode',
              title: '项目编号'
            },
            {
              name: 'manager',
              title: '项目经理',
              icon: <TeamOutlined />
            },
            {
              name: 'teamSize',
              title: '团队规模',
              render: (value) => &#96;${value}人&#96;
            },
            {
              name: 'startDate',
              title: '开始日期',
              icon: <CalendarOutlined />
            },
            {
              name: 'endDate',
              title: '结束日期',
              icon: <CalendarOutlined />
            },
            {
              name: 'progress',
              title: '项目进度',
              render: (value) => <Tag color={value >= 100 ? 'success' : 'processing'}>{value}%</Tag>
            },
            {
              name: 'budget',
              title: '项目预算',
              render: (value) => &#96;¥${value.toLocaleString()}&#96;
            },
            {
              name: 'spent',
              title: '已投入',
              render: (value) => &#96;¥${value.toLocaleString()}&#96;
            }
          ]}
        />
      </div>
    </Flex>
  );
};

render(<BaseExample />);

```

- 流程步骤
- 支持自定义渲染和多种状态的流程时序展示组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Flex, Space, Divider, Tag } = antd;
const { Flow } = _InfoPage;

const BaseExample = () => {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      {/* 基础流程示例 */}
      <div>
        <Divider orientation="left">请假审批流程</Divider>
        <Flow
          current={1}
          dataSource={[
            { title: '提交申请', description: '2024-01-15 09:00 张三提交请假申请', status: 'finish' },
            { title: '部门审批', description: '等待李经理审批', status: 'process' },
            { title: '人事审核', description: '待人事部审核', status: 'wait' },
            { title: '流程结束', description: '审批流程完成', status: 'wait' }
          ]}
        />
      </div>

      {/* 带副标题的流程 */}
      <div>
        <Divider orientation="left">订单处理流程</Divider>
        <Flow
          current={2}
          dataSource={[
            { title: '创建订单', subTitle: '2024-01-15 09:30', status: 'finish' },
            { title: '支付成功', subTitle: '2024-01-15 10:15', status: 'finish' },
            { title: '仓库发货', subTitle: '2024-01-15 14:00', status: 'finish' },
            { title: '配送中', subTitle: '2024-01-16 08:30', status: 'process' },
            { title: '已签收', subTitle: '待确认', status: 'wait' }
          ]}
        />
      </div>

      {/* 使用 columns 自定义渲染 */}
      <div>
        <Divider orientation="left">项目审批流程</Divider>
        <Flow
          dataSource={[
            {
              title: '需求评审',
              description: '通过',
              operator: '张产品',
              time: '2024-01-15 09:00',
              logs: [
                { name: '张产品', action: '提交需求文档', time: '2024-01-15 09:00', content: '包含功能列表、技术方案、时间计划' },
                { name: '李技术', action: '技术评审通过', time: '2024-01-15 11:00', content: '技术方案可行，资源充足' }
              ]
            },
            {
              title: '开发实施',
              description: '进行中',
              operator: '王开发',
              time: '2024-01-16 09:00',
              logs: [
                { name: '王开发', action: '开始开发', time: '2024-01-16 09:00', content: '前端和后端并行开发' }
              ]
            },
            {
              title: '测试验收',
              description: '待处理',
              operator: '赵测试',
              time: '2024-01-20 00:00',
              logs: []
            }
          ]}
          columns={[
            { name: 'title' },
            { name: 'description', render: (value) => <Tag color={value === '通过' ? 'success' : value === '进行中' ? 'processing' : 'default'}>{value}</Tag> },
            { type: 'subTitle', name: 'time', format: 'datetime' },
            {
              type: 'actionList',
              name: 'logs',
              children: [
                { name: 'name' },
                { name: 'action' },
                { type: 'options', name: 'time', format: 'datetime' },
                { name: 'content' }
              ]
            }
          ]}
        />
      </div>

      {/* 点状步骤条 */}
      <div>
        <Divider orientation="left">项目里程碑</Divider>
        <Flex gap={16}>
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: 8, color: '#666' }}>垂直时间轴</p>
            <Flow
              direction="vertical"
              progressDot
              dataSource={[
                { title: '项目启动', description: '2024-01-01', status: 'finish' },
                { title: '需求分析', description: '2024-01-15', status: 'finish' },
                { title: '系统设计', description: '2024-02-01', status: 'process' },
                { title: '开发实施', description: '2024-03-01', status: 'wait' },
                { title: '测试上线', description: '2024-04-01', status: 'wait' }
              ]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: 8, color: '#666' }}>水平进度条</p>
            <Flow
              direction="horizontal"
              progressDot
              dataSource={[
                { title: '注册', description: '完成', status: 'finish' },
                { title: '验证', description: '完成', status: 'finish' },
                { title: '审核', description: '进行中', status: 'process' },
                { title: '通过', description: '待办', status: 'wait' }
              ]}
            />
          </div>
        </Flex>
      </div>

      {/* 使用 content 类型自定义内容 */}
      <div>
        <Divider orientation="left">合同审批流程</Divider>
        <Flow
          dataSource={[
            {
              title: '草拟阶段',
              description: '法务部',
              content: '合同条款已草拟完成，包含保密协议、付款条款、违约责任等内容。',
              status: 'finish'
            },
            {
              title: '业务审核',
              description: '业务部门',
              content: '业务部门已确认合同内容，符合业务需求。',
              status: 'finish'
            },
            {
              title: '财务审核',
              description: '财务部',
              content: '财务部正在审核付款条款和预算安排，预计2个工作日完成。',
              status: 'process'
            },
            {
              title: '最终签署',
              description: '等待',
              content: '',
              status: 'wait'
            }
          ]}
          columns={[
            {
              type: 'content',
              name: 'content',
              render: (item) => (
                <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6' }}>
                  {item}
                </div>
              )
            }
          ]}
        />
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 报告页面
- 完整的测评报告生成组件，支持评分、表格和详细描述
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Report } = _InfoPage;
const { Space } = antd;
const BaseExample = () => {
    return (
        <div className="outer">
            <Space direction="vertical" size={24}>
                <Report title="报告概述">
                    <Report.List
                        report={{
                            list: [
                                {
                                    label: '目的',
                                    content: '本报告旨在评估招聘顾问使用AI工具进行候选人初次沟通的能力，特别是在理解候选人需求、传达职位信息以及建立初步信任关系的效果。'
                                },
                                {
                                    label: '测评对象',
                                    content: '姓名：张伟'
                                },
                                {
                                    label: '测评工具',
                                    content: &#96;AI模拟系统：提供基于语音和文本的交互模拟环境。\n评分标准：沟通技巧、信息传达清晰度、候选人反馈、建立关系的能力。&#96;
                                },
                                {
                                    label: '任务目标',
                                    content: (
                                        <ul>
                                            <li>完整呈现初次沟通话术，展现每个关键动作和沟通顺序。</li>
                                            <li>收集候选人信息：了解候选人工作背景，技术能力及其薪资要求。</li>
                                            <li>挖掘需求：全面了解候选人求职动态和需求，从而掌握候选人存在的顾虑及。</li>
                                            <li>有效推荐：根据候选人求职需求链接职位优势，强化技术吸引点，妥善处理候选人疑虑。</li>
                                            <li>建立信任关系：使用沟通技巧，态度诚恳，和候选人站在一起，而非“博弈”关系。</li>
                                        </ul>
                                    )
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="测评结果">
                    <Report.Result
                        report={{
                            total: {
                                score: '81.8',
                                label: '综合得分'
                            },
                            list: [
                                {
                                    label: '沟通程序指引及话术',
                                    score: '86',
                                    content:
                                        '张伟在这一部分的表现总体上是专业且有条理的，能够按照一定的流程顺利开展对话。他表现出的礼貌和专业性在询问是否方便通话时得到了完美的体现，得到了满分。然而，他在介绍职位时未能充分利用机会强调职位的吸引点，可能影响候选人的兴趣。'
                                },
                                {
                                    label: '收集信息（现状$&$期望）',
                                    score: '90',
                                    content: '张伟在收集候选人的现状和期望方面做得相对完善，能够获得关于候选人当前工作和技术栈的重要信息。但对于候选人的项目经验和薪资结构的探讨不够深入，这可能会影响到后续的职位匹配和期望管理。'
                                },
                                {
                                    label: '挖掘需求',
                                    score: '70',
                                    content: '张伟在挖掘候选人需求方面还有提升空间。虽然基本了解了候选人的职业期望，但在探索候选人的非薪酬动机和深层次需求方面表现不够充分，这是建立有效推荐和深度关系的关键。'
                                },
                                {
                                    label: '有效推荐',
                                    score: '73',
                                    content: '在有效推荐职位方面，张伟需要加强与候选人需求的匹配度和说服力。虽然提到了职位的技术优势，但未根据候选人的具体技术背景进行个性化强调，可能减少候选人的兴趣。'
                                },
                                {
                                    label: '建立信任关系',
                                    score: '84',
                                    content: '张伟能够通过有效的沟通建立信任关系，使用开放性问题和积极肯定候选人的表现。然而，需要提高在换位思考和理解候选人深层需求方面的能力，确保信任关系的深度和真实性。'
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="评分细节">
                    <Report.Table
                        report={{
                            columns: [
                                {
                                    title: '评估维度',
                                    name: 'group',
                                    isSubTitle: true
                                },
                                {
                                    title: '评分项',
                                    name: 'item',
                                    span: 10
                                },
                                {
                                    title: '得分',
                                    name: 'score',
                                    span: 4,
                                    valueOf: value => <div className="score">{value}</div>
                                },
                                {
                                    title: '描述',
                                    name: 'description',
                                    span: 10
                                }
                            ],
                            group: [
                                {
                                    name: 'group1',
                                    label: '沟通程序指引及话术'
                                },
                                {
                                    name: 'group2',
                                    label: '收集信息（现状&期望）'
                                },
                                {
                                    name: 'group3',
                                    label: '挖掘需求'
                                },
                                {
                                    name: 'group4',
                                    label: '有效推荐'
                                },
                                {
                                    name: 'group5',
                                    label: '建立信任关系'
                                }
                            ],
                            list: [
                                {
                                    group: 'group1',
                                    item: '专业开场',
                                    score: <Report.Score value={4}/>,
                                    description: '开场专业，语气友好，略显急促。'
                                },
                                {
                                    group: 'group1',
                                    item: '询问是否方便通话',
                                    score: <Report.Score value={5}/>,
                                    description: '表现出极好的礼貌和考虑。'
                                },
                                {
                                    group: 'group1',
                                    item: '先了解候选人整体情况',
                                    score: <Report.Score value={3}/>,
                                    description: '详细询问了技术和动机，未深入个人发展。'
                                },
                                {
                                    group: 'group1',
                                    item: '后介绍推荐OD职位',
                                    score: <Report.Score value={4}/>,
                                    description: '介绍清晰，未充分突出职位吸引力。'
                                },
                                {
                                    group: 'group1',
                                    item: '介绍整体面试流程',
                                    score: <Report.Score value={1}/>,
                                    description: '详尽介绍流程，缺少机考准备细节说明。'
                                },
                                {
                                    group: 'group1',
                                    item: '交换联系方式',
                                    score: <Report.Score value={5}/>,
                                    description: '有效且自然，确保双方畅通无阻。'
                                },
                                {
                                    group: 'group2',
                                    item: '了解候选人目前就业状态',
                                    score: <Report.Score value={5}/>,
                                    description: '详尽了解候选人的当前就业状况。'
                                },
                                {
                                    group: 'group2',
                                    item: '了解候选人技术栈及项目经验',
                                    score: <Report.Score value={4}/>,
                                    description: '详细询问技术栈，对项目经验探讨不足。'
                                },
                                {
                                    group: 'group2',
                                    item: '了解候选人薪资情况与结构',
                                    score: <Report.Score value={4}/>,
                                    description: '了解薪资期望清晰，未详细探讨薪资构成。'
                                },
                                {
                                    group: 'group3',
                                    item: '了解候选人对下一份工作的期望',
                                    score: <Report.Score value={3}/>,
                                    description: '探讨了职业规划，但未深挖发展意愿。'
                                },
                                {
                                    group: 'group3',
                                    item: '探索非薪资求职动机',
                                    score: <Report.Score value={2}/>,
                                    description: '基本了解求职动机，缺乏深度和细节。'
                                },
                                {
                                    group: 'group3',
                                    item: '识别并处理顾虑',
                                    score: <Report.Score value={4}/>,
                                    description: '识别了顾虑，回应稍显模糊。'
                                },
                                {
                                    group: 'group4',
                                    item: '链接职位优势与求职动机',
                                    score: <Report.Score value={3}/>,
                                    description: '提及职位相关性，缺乏说服力。'
                                },
                                {
                                    group: 'group4',
                                    item: '强化项目技术吸引点',
                                    score: <Report.Score value={3}/>,
                                    description: '提及技术优势，未针对候选人背景定制。'
                                },
                                {
                                    group: 'group4',
                                    item: '关注并处理候选人顾虑',
                                    score: <Report.Score value={4}/>,
                                    description: '正面回应顾虑，但解决方案不具体。'
                                },
                                {
                                    group: 'group5',
                                    item: '应用开放性提问',
                                    score: <Report.Score value={0}/>,
                                    description: '使用开放性问题促进了对话深入。'
                                },
                                {
                                    group: 'group5',
                                    item: '换位思考与表达同理心',
                                    score: <Report.Score value={1}/>,
                                    description: '表达了同理心，但部分回答未完全站在候选人角度。'
                                },
                                {
                                    group: 'group5',
                                    item: '表达肯定和欣赏',
                                    score: <Report.Score value={5}/>,
                                    description: '非常好地肯定了候选人的能力和经验。'
                                },
                                {
                                    group: 'group5',
                                    item: '清晰表达观点',
                                    score: <Report.Score value={2}/>,
                                    description: '观点主要清晰，偶有不够准确的情况。'
                                },
                                {
                                    group: 'group5',
                                    item: '有效倾听与理解',
                                    score: <Report.Score value={3}/>,
                                    description: '倾听良好，但有时未能完全抓住候选人的意图。'
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="结论与建议">
                    <Report.Part
                        report={{
                            list: [
                                {
                                    label: '结论',
                                    hasBgColor: true,
                                    content:
                                        '在此次AI情景模拟测评中，李四表现出了较强的沟通能力和专业性，尤其是在程序指引及话术方面。他成功地收集了候选人的基本信息并建立了初步的信任关系。然而，他在深入挖掘候选人需求和个性化推荐职位方面的表现还有待提高。总体而言，李四的表现良好，显示出了他作为招聘顾问的潜力。'
                                },
                                {
                                    label: '建议',
                                    style: { '--marker-color': '#027A48', '--label-bg-color': '#027A481a' },
                                    content: (
                                        <ol>
                                            <li>增强职位介绍的吸引力，特别是将职位优势与候选人的需求直接关联，突出表现职位的独特之处。</li>
                                            <li>对候选人的项目经验进行更详细的询问，尤其是关于如何在项目中解决问题和技术应用的具体情况。</li>
                                            <li>在讨论薪资时，应详细了解候选人的薪资构成和期望，确保提供的职位与候选人的薪资期望相匹配。</li>
                                            <li>在交流中穿插探讨候选人的个人兴趣和长期职业目标，以便更好地理解其动机。</li>
                                            <li>根据候选人的技术能力和职业兴趣定制职位推荐，突出职位的技术挑战和成长机会。</li>
                                            <li>加强同理心的表达，尤其在讨论候选人关切的问题时，从其角度出发提供解决方案。</li>
                                        </ol>
                                    )
                                }
                            ]
                        }}
                    />
                </Report>
                <Report title="结论与建议">自定义 area</Report>
            </Space>
        </div>
    );
};

render(<BaseExample />);

```

- 报告组件
- 展示Report的各子组件：List、Result、Table、Part
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Report, Score } = _InfoPage;
const { Flex, Radio, Space } = antd;
const { useState } = React;

const reportData = {
  total: {
    score: '88.5',
    label: '综合评分'
  },
  list: [
    {
      label: '代码质量',
      score: '95',
      content: '代码风格规范，注释清晰完整，遵循ESLint和Prettier规范。组件拆分合理，复用性强，单元测试覆盖率达到85%。代码审查中提出的修改意见响应及时，整改完成率高。'
    },
    {
      label: '技术深度',
      score: '90',
      content: '深入理解React源码原理，熟悉Hooks工作机制和性能优化技巧。对前端工程化、微前端架构有实践经验。在项目中成功实现SSR方案，提升首屏渲染速度60%。'
    },
    {
      label: '团队协作',
      score: '85',
      content: '积极参与代码评审和技术讨论，乐于分享技术心得。与产品、设计、测试团队沟通顺畅，能够准确理解需求并给出合理的技术建议。协助新同事快速融入团队。'
    },
    {
      label: '创新意识',
      score: '82',
      content: '主动探索新技术，将AI辅助开发工具引入团队，提升开发效率约20%。提出多个优化方案并被采纳，为业务增长做出了贡献。持续关注行业动态，技术敏感度高。'
    }
  ]
};

const tableReportData = {
  columns: [
    { title: '评估维度', name: 'group', isSubTitle: true, span: 24 },
    { title: '评估项', name: 'item', span: 12 },
    { title: '得分', name: 'score', span: 4 },
    { title: '说明', name: 'description', span: 8 }
  ],
  group: [
    { name: 'group1', label: '📌 核心技术能力' },
    { name: 'group2', label: '💼 工作业绩' },
    { name: 'group3', label: '🎯 职业素养' }
  ],
  list: [
    { group: 'group1', item: '前端框架', score: <Score value={5} total={5} />, description: 'React/Vue熟练掌握' },
    { group: 'group1', item: 'TypeScript', score: <Score value={5} total={5} />, description: '类型定义规范完整' },
    { group: 'group1', item: '性能优化', score: <Score value={4} total={5} />, description: 'SSR首屏优化显著' },
    { group: 'group1', item: '工程化', score: <Score value={4} total={5} />, description: 'CI/CD流程完善' },
    { group: 'group2', item: '需求交付', score: <Score value={5} total={5} />, description: '按时交付率98%' },
    { group: 'group2', item: '质量保障', score: <Score value={4} total={5} />, description: '线上故障率低' },
    { group: 'group2', item: '文档输出', score: <Score value={3} total={5} />, description: 'API文档需完善' },
    { group: 'group3', item: '团队协作', score: <Score value={5} total={5} />, description: '沟通顺畅主动' },
    { group: 'group3', item: '学习成长', score: <Score value={4} total={5} />, description: '技术分享积极' },
    { group: 'group3', item: '责任意识', score: <Score value={5} total={5} />, description: '工作认真负责' }
  ],
  footer: (item, index) => (
    <div style={{ padding: '4px 0', color: '#999', fontSize: '12px' }}>
      第 {index + 1} 项
    </div>
  )
};

const listReportData = {
  list: [
    { label: '👤 评估对象', content: '王明远' },
    { label: '🏢 所属部门', content: '技术研发中心 - 前端架构组' },
    { label: '💼 职级职位', content: '资深前端工程师（P6+）' },
    { label: '📅 入职时间', content: '2021年3月15日' },
    { label: '📊 评估周期', content: '2024年度' },
    { label: '🔍 评估日期', content: '2025年1月10日' },
    { label: '👨‍💼 评估人', content: '技术总监 - 陈思远' },
    { label: '📋 评估维度', content: '核心技能、项目绩效、职业素养' },
    { label: '🔧 评估方法', content: '代码审查 + 绩效数据 + 360度评估 + 技术面试' }
  ]
};

const partReportData = {
  list: [
    {
      label: '✨ 核心优势',
      hasBgColor: true,
      content: '1. 技术视野开阔，对前端技术栈有系统性理解，能够从架构层面思考问题。2. 学习能力强，快速掌握新技术并转化为生产力，AI工具应用效果显著。3. 代码质量意识强，注重可维护性和扩展性，推动团队代码规范落地。4. 工作积极主动，主动承担复杂任务，多次解决关键技术难题。'
    },
    {
      label: '📈 成长空间',
      content: '1. 在技术管理和团队带领方面需要更多历练。2. 跨部门协作时的商业思维有待提升，需要更好地理解业务价值。3. 技术成果的可视化展示和影响力打造可以进一步加强。'
    },
    {
      label: '🎯 发展建议',
      content: '1. 争取担任小型项目的Tech Lead，积累团队管理经验。2. 加强对后端、运维相关技术的学习，建立全栈技术视角。3. 每季度组织至少一次技术分享，提升团队技术氛围。4. 参与技术面试和人才评估，锻炼识人用人能力。5. 关注行业前沿趋势，定期输出技术文章或开源贡献。'
    },
    {
      label: '📚 培养计划',
      content: '1. Q2参加技术管理进阶培训。2. Q3参与微服务架构专项学习。3. Q4承担新人导师角色。4. 全年参与至少3个技术峰会或工作坊。5. 建立个人技术博客，每月至少输出1篇技术文章。'
    }
  ]
};

const BaseExample = () => {
  const [componentType, setComponentType] = useState('list');

  const renderComponent = () => {
    switch (componentType) {
      case 'list':
        return <Report.List report={listReportData} />;
      case 'result':
        return <Report.Result report={reportData} />;
      case 'table':
        return <Report.Table report={tableReportData} />;
      case 'part':
        return <Report.Part report={partReportData} />;
      default:
        return <Report.List report={listReportData} />;
    }
  };

  return (
    <Flex vertical gap={16}>
      {/* 控制面板 */}
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <span style={{ marginRight: 12 }}>子组件类型：</span>
        <Radio.Group value={componentType} onChange={(e) => setComponentType(e.target.value)}>
          <Radio.Button value="list">Report.List</Radio.Button>
          <Radio.Button value="result">Report.Result</Radio.Button>
          <Radio.Button value="table">Report.Table</Radio.Button>
          <Radio.Button value="part">Report.Part</Radio.Button>
        </Radio.Group>
      </div>

      {/* 组件展示区 */}
      <Space direction="vertical" size={24}>
        <Report title="📄 员工年度绩效评估报告" subtitle="2024年度 | 技术研发中心 | 前端架构组">
          {renderComponent()}
        </Report>
      </Space>
    </Flex>
  );
};

render(<BaseExample />);

```

- 评分展示
- 支持自定义总分和间距的星级评分组件
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Score } = _InfoPage;
const { Flex, Badge, Card, Divider, Tag, Space } = antd;

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      {/* 基础用法 */}
      <Card title="基础评分" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={24} align="center">
            <span>产品评分：</span>
            <Score value={5} />
          </Flex>
          <Flex gap={24} align="center">
            <span>服务质量：</span>
            <Score value={4} />
          </Flex>
          <Flex gap={24} align="center">
            <span>物流速度：</span>
            <Score value={3} />
          </Flex>
          <Flex gap={24} align="center">
            <span>性价比：</span>
            <Score value={2} />
          </Flex>
          <Flex gap={24} align="center">
            <span>用户满意：</span>
            <Score value={1} />
          </Flex>
        </Space>
      </Card>

      <Divider />

      {/* 自定义总分 */}
      <Card title="自定义总分" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={24} align="center">
            <span>3分制：</span>
            <Score value={0} total={3} />
            <Score value={1} total={3} />
            <Score value={2} total={3} />
            <Score value={3} total={3} />
          </Flex>
          <Flex gap={24} align="center">
            <span>4分制：</span>
            <Score value={1} total={4} />
            <Score value={2} total={4} />
            <Score value={3} total={4} />
            <Score value={4} total={4} />
          </Flex>
          <Flex gap={24} align="center">
            <span>5分制：</span>
            <Score value={2} total={5} />
            <Score value={3} total={5} />
            <Score value={4} total={5} />
            <Score value={5} total={5} />
          </Flex>
        </Space>
      </Card>

      <Divider />

      {/* 无间距 */}
      <Card title="紧凑模式（gap=0）" size="small">
        <Flex gap={24} align="center">
          <Score value={1} total={5} gap={0} />
          <Score value={2} total={5} gap={0} />
          <Score value={3} total={5} gap={0} />
          <Score value={4} total={5} gap={0} />
          <Score value={5} total={5} gap={0} />
        </Flex>
      </Card>

      <Divider />

      {/* 业务场景 */}
      <Card title="业务场景示例" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ padding: '8px 0' }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
              <span>商品名称</span>
              <Tag color="blue">新品上市</Tag>
            </Flex>
            <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
              <span style={{ color: '#999', fontSize: 12 }}>用户评价</span>
              <Badge count={128} showZero />
            </Flex>
            <Flex justify="space-between" align="center">
              <span style={{ fontSize: 14, fontWeight: 500 }}>Apple iPhone 15 Pro</span>
              <Score value={5} />
            </Flex>
          </div>

          <div style={{ padding: '8px 0', borderTop: '1px solid #f0f0f0' }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
              <span style={{ color: '#999', fontSize: 12 }}>商品评分</span>
              <span style={{ fontSize: 12, color: '#ff4d4f' }}>4.8/5.0</span>
            </Flex>
            <Flex justify="space-between" align="center">
              <span style={{ fontSize: 14 }}>综合得分</span>
              <Score value={4} total={5} />
            </Flex>
          </div>
        </Space>
      </Card>

      <Divider />

      {/* 所有评分展示 */}
      <Card title="完整评分展示" size="small">
        <Flex wrap="wrap" gap={16}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Flex key={index} vertical align="center" gap={4}>
              <Score value={index} />
              <span style={{ fontSize: 12, color: '#999' }}>{index}分</span>
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
};

render(<BaseExample />);

```

- 格式化视图
- 展示formatView工具函数的各种格式化用法
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { formatView } = _InfoPage;
const { Flex, Space, Tag, Badge } = antd;

// 演示 formatView 工具函数的使用
const FormatDemo = () => {
  const demoData = {
    orderDate: '2024-01-15T10:30:00',
    deliveryDate: '2024-01-20',
    serviceDateRange: ['2024-01-01', '2024-12-31'],
    isVip: true,
    isActivated: false,
    userCount: 15678,
    totalAmount: 99999.99,
    discountRate: 0.085,
    completionRate: 85.67,
    phoneNumber: '13800138000'
  };

  // 自定义格式化函数
  const formatPhone = (val) => {
    if (!val) return '-';
    return val.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>formatView 工具函数演示</h4>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Flex justify="space-between" align="center">
            <span><strong>datetime:</strong></span>
            <span>{formatView(demoData.orderDate, 'datetime')} → {formatView(demoData.orderDate, 'datetime-YYYY年MM月DD日 HH:mm')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>date:</strong></span>
            <span>{formatView(demoData.deliveryDate, 'date')} → {formatView(demoData.deliveryDate, 'date-YYYY/MM/DD')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>dateRange:</strong></span>
            <span>{formatView(demoData.serviceDateRange, 'dateRange')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>boolean:</strong></span>
            <Flex gap={8}>
              <span>VIP客户: {formatView(demoData.isVip, 'boolean-是/否')}</span>
              <span>已激活: {formatView(demoData.isActivated, 'boolean-是/否')}</span>
            </Flex>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>number:</strong></span>
            <span>{formatView(demoData.userCount, 'number-useGrouping:true')} 用户</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>money:</strong></span>
            <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{formatView(demoData.totalAmount, 'money-元')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>discount:</strong></span>
            <span>折扣: {formatView(demoData.discountRate * 100, 'number-maximumFractionDigits:1-suffix:折')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>percent:</strong></span>
            <span>完成率: {formatView(demoData.completionRate, 'number-maximumFractionDigits:2-suffix:%')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span><strong>custom:</strong></span>
            <span>{formatPhone(demoData.phoneNumber)}</span>
          </Flex>
        </Space>
      </div>

      {/* 实际应用场景演示 */}
      <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e8e8e8' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>实际应用场景：订单详情</h4>
        <Flex vertical gap={8}>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>订单编号</span>
            <span>ORD20240115001</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>下单时间</span>
            <span>{formatView(demoData.orderDate, 'datetime')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>预计送达</span>
            <span>{formatView(demoData.deliveryDate, 'date-YYYY年MM月DD日')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>服务期限</span>
            <span>{formatView(demoData.serviceDateRange, 'dateRange')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>客户类型</span>
            <Tag color={demoData.isVip ? 'gold' : 'default'}>{formatView(demoData.isVip, 'boolean-VIP/普通')}</Tag>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>订单金额</span>
            <span style={{ color: '#f5222d', fontSize: '18px', fontWeight: 'bold' }}>
              {formatView(demoData.totalAmount, 'money-元')}
            </span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>优惠折扣</span>
            <span style={{ color: '#52c41a' }}>{formatView(demoData.discountRate * 100, 'number-maximumFractionDigits:1-suffix:折')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>订单状态</span>
            <Badge status={demoData.completionRate >= 100 ? 'success' : 'processing'} text={demoData.completionRate >= 100 ? '已完成' : '处理中'} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>完成进度</span>
            <span>{formatView(demoData.completionRate, 'number-maximumFractionDigits:2-suffix:%')}</span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span style={{ color: '#666' }}>联系电话</span>
            <span>{formatPhone(demoData.phoneNumber)}</span>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <FormatDemo />
    </Flex>
  );
};

render(<BaseExample />);

```

### API

### InfoPage

信息展示页面容器组件，提供统一的页面布局和间距控制

#### 属性说明

| 属性名       | 类型        | 必填 | 默认值 | 说明      |
|-----------|-----------|----|-----|---------|
| className | string    | 否  | -   | 自定义样式类名 |
| children  | ReactNode | 否  | -   | 子组件内容   |

### InfoPage.Part

信息展示区块组件，用于包装具体的信息内容

#### 属性说明

| 属性名       | 类型        | 必填 | 默认值   | 说明         |
|-----------|-----------|----|-------|------------|
| className | string    | 否  | -     | 自定义样式类名    |
| title     | ReactNode | 否  | -     | 区块标题       |
| subtitle  | ReactNode | 否  | -     | 区块副标题      |
| extra     | ReactNode | 否  | -     | 区块额外操作区域   |
| children  | ReactNode | 否  | -     | 区块内容       |
| bordered  | boolean   | 否  | false | 是否显示额外边框样式 |

### Content / InfoList

通用内容展示组件，支持标签-内容的灵活布局

#### 属性说明

| 属性名        | 类型       | 必填 | 默认值    | 说明                                       |
|------------|----------|----|--------|------------------------------------------|
| list       | array    | 否  | []     | 展示数据列表                                   |
| labelAlign | string   | 否  | 'left' | 标签对齐方式，可选 'left'、'center'、'right'、'auto' |
| col        | number   | 否  | 1      | 每行显示的列数                                  |
| gutter     | number   | 否  | 0      | 栅格间隔                                     |
| className  | string   | 否  | -      | 自定义样式类名                                  |
| size       | string   | 否  | -      | 尺寸大小，可选 'small'                          |
| itemRender | function | 否  | -      | 自定义列表项渲染函数                               |

#### 列表项数据结构

| 属性名     | 类型               | 必填 | 默认值   | 说明     |
|---------|------------------|----|-------|--------|
| label   | ReactNode        | 否  | -     | 标签内容   |
| content | ReactNode        | 否  | -     | 内容区域   |
| block   | boolean          | 否  | false | 是否占据整行 |
| display | boolean/function | 否  | true  | 是否显示该项 |

### Descriptions / DetailList

描述列表组件，类似于 Ant Design 的 Descriptions，专为详情页设计

#### 属性说明

| 属性名        | 类型       | 必填 | 默认值   | 说明                |
|------------|----------|----|-------|-------------------|
| dataSource | array    | 是  | -     | 二维数组数据源，每个子数组代表一行 |
| isFull     | boolean  | 否  | false | 标签是否占据更大空间        |
| className  | string   | 否  | -     | 自定义样式类名           |
| itemRender | function | 否  | -     | 自定义项渲染函数          |

### CentralContent / FieldView

居中内容展示组件，支持列定义和自动布局

#### 属性说明

| 属性名                | 类型        | 必填 | 默认值     | 说明                      |
|--------------------|-----------|----|---------|-------------------------|
| dataSource         | object    | 否  | {}      | 数据源对象                   |
| columns            | array     | 否  | []      | 列定义数组                   |
| col                | number    | 否  | 2       | 展示列数                    |
| type               | string    | 否  | -       | 组件类型，可选 'compact'（紧凑模式） |
| valueIsEmpty       | function  | 否  | isEmpty | 值为空的判断函数                |
| emptyIsPlaceholder | boolean   | 否  | true    | 空值是否显示占位符               |
| placeholder        | ReactNode | 否  | '-'     | 空值占位符                   |
| className          | string    | 否  | -       | 自定义样式类名                 |
| context            | object    | 否  | -       | 上下文数据                   |

#### 列定义数据结构

| 属性名    | 类型              | 必填 | 默认值   | 说明      |
|--------|-----------------|----|-------|---------|
| name   | string          | 是  | -     | 字段名称    |
| title  | ReactNode       | 否  | -     | 显示标题    |
| format | string/function | 否  | -     | 格式化规则   |
| render | function        | 否  | -     | 自定义渲染函数 |
| span   | number          | 否  | -     | 栅格占位格数  |
| block  | boolean         | 否  | false | 是否占据整行  |

### TableView

表格视图组件，支持行选择和自定义列配置

#### 属性说明

| 属性名                | 类型              | 必填 | 默认值       | 说明        |
|--------------------|-----------------|----|-----------|-----------|
| dataSource         | array           | 否  | []        | 表格数据源     |
| columns            | array           | 是  | -         | 列定义数组     |
| rowKey             | string/function | 否  | 'id'      | 行数据的唯一标识  |
| rowSelection       | object          | 否  | -         | 行选择配置     |
| valueIsEmpty       | function        | 否  | isEmpty   | 值为空的判断函数  |
| emptyIsPlaceholder | boolean         | 否  | true      | 空值是否显示占位符 |
| placeholder        | ReactNode       | 否  | '-'       | 空值占位符     |
| empty              | ReactNode       | 否  | <Empty /> | 空数据展示内容   |
| onRowSelect        | function        | 否  | -         | 行选择回调函数   |
| render             | function        | 否  | -         | 自定义渲染函数   |
| context            | object          | 否  | -         | 上下文数据     |
| sticky             | boolean         | 否  | false     | 表头是否固定    |
| className          | string          | 否  | -         | 自定义样式类名   |

#### 行选择配置

| 属性名              | 类型       | 必填 | 默认值        | 说明                          |
|------------------|----------|----|------------|-----------------------------|
| type             | string   | 否  | 'checkbox' | 选择类型，可选 'checkbox'、'radio'  |
| selectedRowKeys  | array    | 否  | []         | 已选中行的key数组                  |
| onChange         | function | 否  | -          | 选择变化回调函数                    |
| isSelectedAll    | boolean  | 否  | false      | 是否全选状态                      |
| allowSelectedAll | boolean  | 否  | false      | 是否允许全选（配合 isSelectedAll 使用） |

### Flow

流程展示组件，基于 Ant Design Steps 组件扩展

#### 属性说明

| 属性名                | 类型        | 必填 | 默认值        | 说明                               |
|--------------------|-----------|----|------------|----------------------------------|
| dataSource         | array     | 否  | []         | 流程数据源                            |
| columns            | array     | 否  | []         | 列定义数组                            |
| size               | string    | 否  | 'small'    | 步骤条大小                            |
| current            | number    | 否  | -          | 当前步骤（从0开始）                       |
| direction          | string    | 否  | 'vertical' | 步骤条方向，可选 'vertical'、'horizontal' |
| progressDot        | boolean   | 否  | false      | 是否使用点状步骤条                        |
| labelPlacement     | string    | 否  | 'vertical' | 标签位置，可选 'vertical'、'horizontal'  |
| empty              | ReactNode | 否  | <Empty />  | 空数据展示内容                          |
| valueIsEmpty       | function  | 否  | isEmpty    | 值为空的判断函数                         |
| placeholder        | ReactNode | 否  | '-'        | 空值占位符                            |
| emptyIsPlaceholder | boolean   | 否  | false      | 空值是否显示占位符                        |
| className          | string    | 否  | -          | 自定义样式类名                          |

#### columns 列定义支持的 type 类型

| type        | 说明   | 特殊处理              |
|-------------|------|-------------------|
| title       | 标题   | -                 |
| subTitle    | 副标题  | -                 |
| description | 描述   | -                 |
| status      | 状态   | -                 |
| content     | 额外内容 | 渲染为独立区块           |
| actionList  | 操作列表 | 唯一支持 children 的类型 |

### SplitLine

分割线展示组件，用于横向展示多个字段

#### 属性说明

| 属性名                | 类型        | 必填 | 默认值                         | 说明                              |
|--------------------|-----------|----|-----------------------------|---------------------------------|
| dataSource         | object    | 否  | -                           | 数据源对象                           |
| columns            | array     | 是  | -                           | 列定义数组                           |
| valueIsEmpty       | function  | 否  | isEmpty                     | 值为空的判断函数                        |
| placeholder        | ReactNode | 否  | '-'                         | 空值占位符                           |
| emptyIsPlaceholder | boolean   | 否  | false                       | 空值是否显示占位符                       |
| size               | number    | 否  | 0                           | 分割线间距                           |
| labelGap           | number    | 否  | 4                           | 标签与内容的间距                        |
| labelMode          | string    | 否  | 'horizontal'                | 标签模式，可选 'horizontal'、'vertical' |
| split              | ReactNode | 否  | <Divider type="vertical" /> | 分割线组件                           |
| context            | object    | 否  | -                           | 上下文数据                           |
| className          | string    | 否  | -                           | 自定义样式类名                         |

#### columns 列定义特殊属性

| 属性名  | 类型        | 必填 | 默认值 | 说明   |
|------|-----------|----|-----|------|
| icon | ReactNode | 否  | -   | 图标元素 |

### Report

报告容器组件，用于生成打印友好的报告页面

#### 属性说明

| 属性名       | 类型        | 必填 | 默认值  | 说明      |
|-----------|-----------|----|------|---------|
| title     | ReactNode | 否  | -    | 报告标题    |
| subtitle  | ReactNode | 否  | -    | 报告副标题   |
| extra     | ReactNode | 否  | -    | 标题额外内容  |
| border    | boolean   | 否  | true | 是否显示边框  |
| children  | ReactNode | 否  | -    | 子组件内容   |
| className | string    | 否  | -    | 自定义样式类名 |

### Report.List

报告列表子组件，展示键值对形式的报告内容

#### 属性说明

| 属性名         | 类型     | 必填 | 默认值 | 说明                         |
|-------------|--------|----|-----|----------------------------|
| report      | object | 是  | -   | 报告数据对象，包含 list 数组          |
| report.list | array  | 是  | -   | 列表项数组，每项包含 label、content 等 |

### Report.Result

报告结果子组件，展示评分结果和详细描述

#### 属性说明

| 属性名          | 类型     | 必填 | 默认值 | 说明                              |
|--------------|--------|----|-----|---------------------------------|
| report       | object | 是  | -   | 报告数据对象，包含 total 和 list          |
| report.total | object | 是  | -   | 总分信息，包含 score、label             |
| report.list  | array  | 是  | -   | 评分明细列表，每项包含 label、score、content |

### Report.Table

报告表格子组件，展示分组评分表格

#### 属性说明

| 属性名            | 类型     | 必填 | 默认值 | 说明                     |
|----------------|--------|----|-----|------------------------|
| report         | object | 是  | -   | 报告数据对象                 |
| report.columns | array  | 是  | -   | 表格列定义                  |
| report.group   | array  | 是  | -   | 分组定义数组，每项包含 name、label |
| report.list    | array  | 是  | -   | 表格数据列表                 |

### Report.Part

报告内容区块子组件，展示段落形式的内容

#### 属性说明

| 属性名         | 类型     | 必填 | 默认值 | 说明                         |
|-------------|--------|----|-----|----------------------------|
| report      | object | 是  | -   | 报告数据对象，包含 list 数组          |
| report.list | array  | 是  | -   | 内容项数组，每项包含 label、content 等 |

### Report.Score

报告评分展示子组件

#### 属性说明

| 属性名   | 类型     | 必填 | 默认值 | 说明    |
|-------|--------|----|-----|-------|
| value | number | 是  | -   | 当前评分值 |

### Score

评分展示组件，以星形图标展示评分

#### 属性说明

| 属性名       | 类型     | 必填 | 默认值 | 说明       |
|-----------|--------|----|-----|----------|
| value     | number | 是  | -   | 当前评分值    |
| gap       | number | 否  | 4   | 评分项之间的间距 |
| total     | number | 否  | 5   | 总评分项数    |
| className | string | 否  | -   | 自定义样式类名  |

### formatView

数据格式化工具函数，提供多种常用格式化规则

#### 方法说明

| 方法名     | 参数                       | 返回值           | 说明          |
|---------|--------------------------|---------------|-------------|
| default | (value, format, context) | string/object | 根据格式规则格式化数据 |

#### 支持的格式化规则

| 格式名       | 说明      | 参数                             |
|-----------|---------|--------------------------------|
| date      | 日期格式化   | 模板字符串，默认 'YYYY-MM-DD'          |
| datetime  | 日期时间格式化 | 模板字符串，默认 'YYYY-MM-DD HH:mm:ss' |
| dateRange | 日期范围格式化 | 模板字符串、是否允许空值                   |
| boolean   | 布尔值格式化  | true值对应的文本，默认 'true'           |
| number    | 数字格式化   | 样式、单位、小数位数等                    |
| money     | 金额格式化   | 单位，默认 '元'                      |

### computeColumnsValue

列值计算工具函数，用于统一处理列数据的显示逻辑

#### 方法说明

| 方法名                   | 参数       | 返回值       | 说明         |
|-----------------------|----------|-----------|------------|
| default               | (config) | array     | 计算列的显示值    |
| computeDisplay        | (config) | ReactNode | 计算单个列的显示内容 |
| computeColumnsDisplay | (config) | array     | 计算所有列的显示内容 |

#### 配置参数

| 参数名                | 类型           | 必填 | 默认值     | 说明        |
|--------------------|--------------|----|---------|-----------|
| columns            | array        | 是  | -       | 列定义数组     |
| dataSource         | object/array | 是  | -       | 数据源       |
| context            | object       | 否  | -       | 上下文数据     |
| valueIsEmpty       | function     | 否  | isEmpty | 值为空的判断函数  |
| emptyIsPlaceholder | boolean      | 否  | true    | 空值是否显示占位符 |
| removeEmpty        | boolean      | 否  | true    | 是否移除空值列   |
| placeholder        | ReactNode    | 否  | '-'     | 空值占位符     |

# Layout

### 概述

Layout 是一个完整的页面布局框架，为登录后的系统页面提供统一的布局结构和样式规范。它将页面划分为多个区域，包括导航区、内容区、左菜单区、右操作区、页头区、页头信息区、页面标题区等，通过灵活的配置可以组合出不同布局风格的页面。

**核心特性**

- **统一布局**：提供标准化的页面布局结构，确保系统页面风格统一
- **灵活配置**：通过 Page 组件的参数配置不同区域的显示和样式
- **性能优化**：页面参数通过 Context 保存，页面跳转时非页面区域走更新周期而非挂载周期，提升渲染速度
- **区域划分**：支持导航区、内容区、左菜单区、右操作区、页头区、页头信息区、页面标题区等多种区域
- **权限集成**：内置权限判断，支持 PermissionsPage 快速实现权限控制
- **组件丰富**：提供 Page、Menu、PageHeader、TablePage、StateBarPage 等多个子组件满足不同需求

**适用场景**

- **基础页面**：简单的上下布局，导航栏+内容区
- **左侧菜单页**：带有左侧导航菜单的页面，支持多级菜单
- **筛选列表页**：顶部带筛选器的列表页面
- **详情页**：带有页面头和额外信息的详情页面
- **表格页**：快速集成 Table 组件的列表页面
- **状态栏页**：带有状态栏的状态展示页面

**重要说明**

- Page 组件的 `name` 参数必须传递，用于页面跳转时判断是否为同一页面，决定是否走挂载周期
- 请尽量通过 Page 提供的参数配置页面布局，避免自定义 CSS，以便 Layout 组件统一控制页面形式和样式
- Page 组件参数通过 Context 保存，页面跳转时非页面区域会走更新周期，提升性能

### 示例(全屏)

#### 示例样式

```scss
.layout-content {
  color: #fff;
  background: var(--primary-color-4);
  height: 100%;
  text-align: center;
  line-height: 300px;
}

.with-title-layout-content {
  height: 100%;
  //height: calc(100% - 49px);
}

.layout-menu {
  background: #ff9c6e;
  color: #fff;
  height: 110vh;
  text-align: center;
  line-height: 300px;
}

.header {
  background: #ff9c6e;
  height: 100px;
  padding: 10px;
  color: #fff;
}

.right-options {
  background: var(--primary-color-4);
  height: 110vh;
  color: #fff;
}

.header-info {
  padding: 10px;
  height: 100px;
  background: var(--primary-color-4);
  color: #fff;
}
```

#### 示例代码

- 基础上下布局
- 展示最基础的上导航栏，下内容的布局
- _Layout(@components/Layout),global(@components/Global)

```jsx
const { default: Layout, Page } = _Layout;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "base-detail",
              content: "测试帮助文档",
              url: "/",
            },
          ],
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <Page name="base" helperGuideName="base-detail">
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 带有左侧菜单布局
- 展示带有左侧菜单布局；默认 menuFixed=true，滚动内容区时左侧菜单保持固定
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page, Menu } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="left-menu"
        menu={
          <Menu
            items={[
              {
                label: "父级标题1",
                key: "p-0",
                iconType: "icon-zhanghaodenglu",
                children: [
                  {
                    label: "子标题1",
                    key: "s-0",
                    path: "/link1",
                  },
                  {
                    label: "子标题2",
                    key: "s-1",
                    path: "/link2",
                  },
                ],
              },
              {
                label: "父级标题2",
                key: "p-1",
                iconType: "icon-zhanghaodenglu",
                children: [
                  {
                    label: "子标题1",
                    key: "s-2",
                    path: "/link3",
                  },
                  {
                    label: "子标题2",
                    key: "s-3",
                    path: "/link4",
                  },
                ],
              },
              {
                label: "父级标题3",
                key: "p-2",
                iconType: "icon-zhanghaodenglu",
                path: "/link5",
              },
            ]}
          />
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        backUrl={"/"}
        title="标题"
      >
        <div className="layout-content with-title-layout-content">
          {Array.from({length: 40}).map((_, index) => (
            <p key={index}>滚动内容区第 {index + 1} 行 —— 左侧菜单默认 menuFixed=true，应保持固定</p>
          ))}
        </div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);

```

- 左侧固定带Header
- 展示带有header的左侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Space className="container" direction="vertical">
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="with-header"
          helperGuideName="base-detail"
          menu={<div className="layout-menu">左侧菜单区</div>}
          titleExtra={
            <Space>
              <Button type="primary">新建</Button>
            </Space>
          }
          title="标题"
          hideCloseSvg={true}
          headerHeight="40px"
          menuFixed={false}
          header={<div className="header">header</div>}
          headerFixed={false}
          headerInfo={<div className="header-info">header info区域</div>}
        >
          <div>内容区</div>
        </Page>
      </Layout>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      enums: {
        helperGuide: () => [
          {
            value: "base-detail",
            content: "测试帮助文档",
            url: "/",
          },
        ],
      },
    }}
  >
    <Example />
  </PureGlobal>
);

```

- 右侧固定
- 展示带有header的右侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="fix-right-menu"
        optionFixed={false}
        option={<div className="right-options">右侧操作区域</div>}
        optionFooter={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        title="标题"
        header={<div className="header">header</div>}
        headerFixed={false}
        menuFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);

```

- 带有filter的列表页
- 展示带有filter的列表页
- layout(@components/Layout),antd(antd),global(@components/Global),filter(@components/Filter)

```jsx
const { default: Layout, Page } = layout;
const {
  InputFilterItem,
  CityFilterItem,
  AdvancedSelectFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
  getFilterValue,
} = filter;
const { useState } = React;
const { Space, Button } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const [filter, setFilter] = useState([]);
  return (
    <PureGlobal preset={{}}>
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="base"
          helperGuideName="base-detail"
          titleExtra={
            <Space>
              <Button type="primary">添加</Button>
            </Space>
          }
          filter={{
            extraExpand: (
              <Button type="primary" size="small">
                订阅筛选项
              </Button>
            ),
            value: filter,
            onChange: (value) => {
              setFilter(value);
              console.log(getFilterValue(value));
            },
            list: [
              [
                <InputFilterItem label="文字" name="text" />,
                <CityFilterItem label="城市" name="city" />,
                <AdvancedSelectFilterItem
                  label="高级选择"
                  name="select"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          { label: "第一项", value: 1 },
                          { label: "第二项", value: 2, disabled: true },
                          {
                            label: "第三项",
                            value: 3,
                          },
                        ],
                      };
                    },
                  }}
                />,
                <UserFilterItem
                  label="用户选择"
                  name="user"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          {
                            label: "用户一",
                            value: 1,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户二",
                            value: 2,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户三",
                            value: 3,
                            description: "我是用户描述",
                          },
                        ],
                      };
                    },
                  }}
                />,
                <FunctionSelectFilterItem
                  label="职能选择"
                  name="function"
                  onlyAllowLastLevel
                  single
                />,
                <IndustrySelectFilterItem
                  label="行业选择"
                  name="industry"
                  onlyAllowLastLevel
                />,
              ],
              [
                <UserFilterItem
                  label="职位协助人"
                  name="position_user"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          {
                            label: "用户一",
                            value: 1,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户二",
                            value: 2,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户三",
                            value: 3,
                            description: "我是用户描述",
                          },
                        ],
                      };
                    },
                  }}
                />,
              ],
            ],
          }}
        >
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 左侧导航菜单
- 展示一个左侧导航菜单
- layout(@components/Layout),antd(antd)

```jsx
const { Menu } = layout;
const { Space } = antd;
const { useState } = React;

const ControlMenu = () => {
  const [current, setCurrent] = useState();
  return (
    <Menu
      currentKey={current}
      onChange={setCurrent}
      items={[
        {
          label: "父级标题1",
          key: "p-0",
          iconType: "icon-zhanghaodenglu",
          children: [
            {
              label: "子标题1",
              key: "s-0",
            },
            {
              label: "子标题2",
              key: "s-1",
            },
          ],
        },
        {
          label: "父级标题2",
          key: "p-1",
          iconType: "icon-zhanghaodenglu",
          children: [
            {
              label: "子标题1",
              key: "s-2",
            },
            {
              label: "子标题2",
              key: "s-3",
            },
          ],
        },
        {
          label: "父级标题3",
          key: "p-2",
          iconType: "icon-zhanghaodenglu",
        },
      ]}
    />
  );
};

const Example = () => {
  return (
    <Space size={10}>
      <Menu
        items={[
          {
            label: "父级标题1",
            key: "p-0",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-0",
                path: "/link1",
              },
              {
                label: "子标题2",
                key: "s-1",
                path: "/link2",
              },
            ],
          },
          {
            label: "父级标题2",
            key: "p-1",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-2",
                path: "/link3",
              },
              {
                label: "子标题2",
                key: "s-3",
                path: "/link4",
              },
            ],
          },
          {
            label: "父级标题3",
            key: "p-2",
            iconType: "icon-zhanghaodenglu",
            path: "/link5",
          },
        ]}
      />
      <Menu
        items={[
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题1",
            key: "s-0",
            path: "/link1",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题2",
            key: "s-1",
            path: "/link2",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题1",
            key: "s-2",
            path: "/link3",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题2",
            key: "s-3",
            path: "/link4",
          },
        ]}
      />
      <Menu
        allowCollapsed={false}
        items={[
          {
            label: "父级标题1",
            key: "p-0",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-0",
                path: "/link1",
              },
              {
                label: "子标题2",
                key: "s-1",
                path: "/link2",
              },
            ],
          },
          {
            label: "父级标题2",
            key: "p-1",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-2",
                path: "/link3",
              },
              {
                label: "子标题2",
                key: "s-3",
                path: "/link4",
              },
            ],
          },
          {
            label: "父级标题3",
            key: "p-2",
            iconType: "icon-zhanghaodenglu",
            path: "/link5",
          },
        ]}
      />
      <ControlMenu />
    </Space>
  );
};

render(<Example />);

```

- PageHeader
- 页面头基础用法：标题、编号、标签与操作按钮
- layout(@components/Layout),antd(antd)

```jsx
const { default: Layout, Page, PageHeader } = layout;
const { Button, Space } = antd;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        menu={<div className="layout-menu">左侧菜单区</div>}
        title="标题"
        hideCloseSvg={true}
        menuFixed={false}
        name="pageHeaderLayout"
        header={
          <PageHeader
            iconType="icon-color-shenpi-biaoti"
            title="详情页名称"
            info="编号:85767"
            buttonOptions={
              <Space wrap>
                <Button type="primary">新建</Button>
                <Button>操作1</Button>
                <Button>操作2</Button>
              </Space>
            }
            tags={['辅助信息', '辅助信息', '辅助信息', '辅助信息']}
          />
        }
        headerFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(<Example />);

```

- PageHeader 超长内容
- 覆盖超长中英文标题、超长编号、超多标签与多操作按钮等场景，便于验证桌面端与移动端换行/堆叠
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, PageHeader } = layout;
const { PureGlobal } = global;
const { Button, Space, Typography, Tag } = antd;

const { Title, Paragraph, Text } = Typography;

const shortActions = (
  <Space wrap>
    <Button type="primary">编辑</Button>
    <Button>更多</Button>
  </Space>
);

const manyActions = (
  <Space wrap>
    <Button type="primary">编辑</Button>
    <Button>开启</Button>
    <Button>关闭</Button>
    <Button danger>删除</Button>
    <Button>导出</Button>
    <Button>复制链接</Button>
  </Space>
);

const Section = ({ title, description, children }) => (
  <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
    <div style={{ padding: '12px 16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
      <Title level={5} style={{ margin: 0 }}>
        {title}
      </Title>
      {description ? (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {description}
        </Text>
      ) : null}
    </div>
    {children}
  </div>
);

const Example = () => {
  return (
    <PureGlobal>
      <Layout navigation={{ isFixed: false }}>
        <div style={{ padding: 16, background: '#f5f5f5', minHeight: '100%' }}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <div>
              <Title level={4} style={{ marginBottom: 4 }}>
                PageHeader 超长内容场景
              </Title>
              <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                覆盖超长标题、编号、标签与操作按钮组合。可用手机预览查看移动端换行与堆叠效果。
              </Paragraph>
            </div>

            <Section title="1. 基础短内容" description="对照基准：短标题 + 短编号 + 少量标签">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="科技创新有限公司"
                info="ID: tenant-001"
                buttonOptions={shortActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2024-01-01~2025-12-31',
                  '账号数:50'
                ]}
              />
            </Section>

            <Section title="2. 超长中文标题" description="模拟租户/公司全称，标题应自动换行且不被按钮挤出">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="北京中关村科技创新与产业升级综合服务平台运营管理有限责任公司"
                info="ID: tenant-001"
                buttonOptions={shortActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2024-01-01~2025-12-31',
                  '账号数:50'
                ]}
              />
            </Section>

            <Section title="3. 超长英文 / 无空格字符串" description="验证 overflow-wrap / word-break 对连续长串的处理">
              <PageHeader
                title="SuperLongEnterpriseNameWithoutSpacesForMobileLayoutTestingABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                info="ID: very-long-tenant-id-2024-abcdef-9876543210"
                buttonOptions={shortActions}
                tags={['Region:Asia-Pacific', 'Plan:Enterprise-Plus', 'Seats:1000']}
              />
            </Section>

            <Section title="4. 超长标题 + 超长 info" description="标题与编号在移动端应上下排列，编号可断行">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="上海浦东新区临港新片区智能制造与数字经济产业协同创新中心（筹）"
                info="编号: TN-2024-SH-PD-LG-SMART-MFG-DIGITAL-ECONOMY-001-FINAL"
                buttonOptions={shortActions}
                tags={['辅助信息A', '辅助信息B']}
              />
            </Section>

            <Section title="5. 超多 / 超长 tags" description="标签区应自动换行，移动端去掉竖线分隔">
              <PageHeader
                title="租户详情"
                info="ID: tenant-002"
                buttonOptions={shortActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2024-01-01~2026-12-31',
                  '账号数:9999',
                  '所属行业:人工智能 / 云计算 / 大数据分析',
                  '联系人:张三丰-产品运营中心-华北大区',
                  '备注:本租户为演示环境，请勿用于生产数据写入与正式合同签署流程'
                ]}
              />
            </Section>

            <Section title="6. 超长标题 + 多个操作按钮" description="移动端按钮应换行到标题下方并左对齐">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="深圳前海深港现代服务业合作区跨境电子商务综合试验区运营主体有限公司"
                info="ID: tenant-003"
                buttonOptions={manyActions}
                tags={[
                  <Tag color="error" key="status">
                    关闭
                  </Tag>,
                  '服务时间:2023-06-01~2024-06-01',
                  '账号数:12'
                ]}
              />
            </Section>

            <Section title="7. 极端组合" description="标题、编号、标签、按钮全部超长，用于回归移动端布局">
              <PageHeader
                iconType="icon-color-shenpi-biaoti"
                title="中国（上海）自由贸易试验区临港新片区科技创新与先进制造业高质量发展示范园区管理服务有限公司（集团）"
                info="ID: tenant-extreme-long-id-2024-07-10-shanghai-lingang-free-trade-zone-demo-001"
                buttonOptions={manyActions}
                tags={[
                  <Tag color="success" key="status">
                    开启
                  </Tag>,
                  '服务时间:2020-01-01~2030-12-31',
                  '账号数:100000',
                  '套餐:旗舰版旗舰版旗舰版旗舰版旗舰版',
                  '地址:上海市浦东新区临港新片区环湖西二路888号某某大厦A座1801-1808室',
                  '说明:这是一条用于验证 PageHeader tags 在窄屏下换行与可读性的超长辅助文案'
                ]}
              />
            </Section>
          </Space>
        </div>
      </Layout>
    </PureGlobal>
  );
};

render(<Example />);

```

- Affix 固定布局
- 展示 Affix 组件的固定布局功能
- _Layout(@components/Layout),antd(antd)

```jsx
const { default: Layout, Affix } = _Layout;
const { Space, Card, Button, Typography } = antd;

const { Text } = Typography;

const AffixExample = () => {
  const [fixed, setFixed] = React.useState(false);

  return (
    <Layout navigation={{ isFixed: false }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Affix 固定布局组件" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>固定到顶部（offsetTop: 100）：</Text>
              <div style={{ marginTop: 16 }}>
                <Affix offsetTop={100} onChange={(fixed) => setFixed(fixed)}>
                  <div style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    width: '200px'
                  }}>
                    我会在距离顶部 100px 时固定
                    {fixed && ' (已固定)'}
                  </div>
                </Affix>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Text strong>不固定（isFixed: false）：</Text>
              <div style={{ marginTop: 16 }}>
                <Affix isFixed={false}>
                  <div style={{
                    background: 'var(--state-warning-color)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    width: '200px'
                  }}>
                    我不会被固定
                  </div>
                </Affix>
              </div>
            </div>
          </Space>
        </Card>

        <Card title="说明" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text type="secondary">
              Affix 组件用于控制内容的固定布局行为，基于 Antd 的 Affix 组件进行了封装。
            </Text>
            <Text type="secondary">
              当 isFixed 为 true 时，内容会在滚动到指定位置后固定显示；
              当 isFixed 为 false 时，内容固定行为被禁用。
            </Text>
          </Space>
        </Card>

        <div style={{ height: 800 }}>
          <Text type="secondary">（向下滚动查看 Affix 固定效果）</Text>
        </div>
      </Space>
    </Layout>
  );
};

render(<AffixExample />);

```

- TablePage 表格页面
- 展示 TablePage 组件快速创建表格列表页
- _Layout(@components/Layout),global(@components/Global),antd(antd)

```jsx
const {default: Layout, TablePage} = _Layout;
const {PureGlobal} = global;
const {Button} = antd;

const TablePageExample = () => {
    const columns = [{
        title: '订单号', name: 'orderNo'
    }, {
        title: '客户姓名', name: 'customerName'
    }, {
        title: '金额', name: 'amount', render: (amount) => &#96;¥${amount.toLocaleString()}&#96;
    }, {
        title: '状态', name: 'status'
    }, {
        title: '创建时间', name: 'createTime'
    }];

    return (<PureGlobal preset={{
        enums: {
            helperGuide: () => [{
                value: 'order-list-help',
                content: '这是一个订单列表页面，可以查看和管理所有订单信息。',
                url: 'https://example.com/help/order-list'
            }]
        }
    }}>
        <Layout navigation={{isFixed: false}}>
            <TablePage
                name="order-list"
                helperGuideName="order-list-help"
                page={{
                    title: '订单列表', titleExtra: <Button type="primary">新建订单</Button>
                }}
                columns={columns}
                loader={() => {
                    return {
                        pageData: [{
                            key: '1',
                            orderNo: 'ORD202401001',
                            customerName: '张三',
                            amount: 1200.00,
                            status: '已完成',
                            createTime: '2024-01-15 10:30:00'
                        }, {
                            key: '2',
                            orderNo: 'ORD202401002',
                            customerName: '李四',
                            amount: 3500.00,
                            status: '处理中',
                            createTime: '2024-01-15 11:20:00'
                        }, {
                            key: '3',
                            orderNo: 'ORD202401003',
                            customerName: '王五',
                            amount: 890.00,
                            status: '待处理',
                            createTime: '2024-01-15 14:45:00'
                        }], total: 3
                    };
                }}
                topArea={(tableData) => (<div style={{padding: '16px', background: '#fafafa', marginBottom: '16px'}}>
                    <div>数据统计：共 {tableData?.pageData?.length || 0} 条记录</div>
                </div>)}
            />
        </Layout>
    </PureGlobal>);
};

render(<TablePageExample/>);

```

- TablePage isNext 新版表格
- 展示 Layout.TablePage 的 isNext 参数：启用后使用 @components/TablePage（@kne/table-page 新 API，如 renderType、getValueOf），默认则使用 @components/Table 内置 legacy TablePage（兼容 type 列配置）。
- _Layout(@components/Layout),global(@components/Global),antd(antd)

```jsx
const { default: Layout, TablePage } = _Layout;
const { PureGlobal } = global;
const { Button, Flex, Tag } = antd;

const statusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待处理: { type: 'warning', text: '待处理' }
};

const columns = [
  { name: 'orderNo', title: '订单号', width: 160, renderType: 'small', fixed: 'left' },
  { name: 'customerName', title: '客户姓名', width: 140, renderType: 'main' },
  {
    name: 'amount',
    title: '金额',
    width: 120,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:2-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'createTime', title: '创建时间', width: 180, format: 'datetime' }
];

const loader = () =>
  Promise.resolve({
    pageData: [
      {
        id: '1',
        orderNo: 'ORD202401001',
        customerName: '张三',
        amount: 1200,
        status: '已完成',
        createTime: '2024-01-15 10:30:00'
      },
      {
        id: '2',
        orderNo: 'ORD202401002',
        customerName: '李四',
        amount: 3500,
        status: '处理中',
        createTime: '2024-01-15 11:20:00'
      },
      {
        id: '3',
        orderNo: 'ORD202401003',
        customerName: '王五',
        amount: 890,
        status: '待处理',
        createTime: '2024-01-15 14:45:00'
      }
    ],
    totalCount: 3
  });

const TablePageNextExample = () => (
  <PureGlobal
    preset={{
      enums: {
        helperGuide: () => [
          {
            value: 'order-list-next-help',
            content: 'isNext 模式下使用 @components/TablePage，列配置采用 renderType / getValueOf 等新 API。',
            url: 'https://example.com/help/order-list'
          }
        ]
      }
    }}
  >
    <Layout navigation={{ isFixed: false }}>
      <Flex vertical gap={16}>
        <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
          <div>
            <Tag color="blue" style={{ marginRight: 8 }}>
              isNext
            </Tag>
            设置 <code>isNext</code> 后，内部使用 <code>@components/TablePage</code>（基于{' '}
            <code>@kne/table-page</code>）；未设置时默认使用 <code>@components/Table</code> 内置的 legacy TablePage（兼容旧版{' '}
            <code>type</code> 列配置）。
          </div>
        </div>
        <TablePage
          isNext
          name="order-list-next"
          helperGuideName="order-list-next-help"
          page={{
            title: '订单列表（isNext）',
            titleExtra: <Button type="primary">新建订单</Button>
          }}
          dataFormat={data => ({
            list: data.pageData,
            total: data.totalCount,
            data
          })}
          pagination={{
            open: true,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }}
          columns={columns}
          loader={loader}
          topArea={tableData => (
            <div style={{ padding: '16px', background: '#fafafa', marginBottom: '16px' }}>
              <div>数据统计：共 {tableData?.pageData?.length || 0} 条记录</div>
            </div>
          )}
        />
      </Flex>
    </Layout>
  </PureGlobal>
);

render(<TablePageNextExample />);

```

- StateBarPage 状态栏页面
- 展示 StateBarPage 组件创建带状态栏的页面
- _Layout(@components/Layout),global(@components/Global),antd(antd)

```jsx
const { default: Layout, StateBarPage } = _Layout;
const { PureGlobal } = global;
const { Card, Descriptions, Button, Space, Typography } = antd;

const { Text } = Typography;

const StateBarPageExample = () => {
  return (
    <PureGlobal preset={{
        enums: {
            helperGuide: () => [{
                value: 'order-detail-help',
                content: '这是一个订单详情页面，可以查看和管理订单详情信息。',
                url: 'https://example.com/help/order-detail'
            }]
        }
    }}>
      <Layout navigation={{ isFixed: false }}>
        <StateBarPage
          name="order-detail"
          helperGuideName="order-detail-help"
          page={{
            title: '订单详情',
            titleExtra: (
              <Space>
                <Button>编辑</Button>
                <Button type="primary">导出</Button>
              </Space>
            )
          }}
          stateBar={{
            list: [
              {
                label: '全部',
                value: 'all',
                count: 100
              },
              {
                label: '待处理',
                value: 'pending',
                count: 25
              },
              {
                label: '处理中',
                value: 'processing',
                count: 30
              },
              {
                label: '已完成',
                value: 'completed',
                count: 40
              },
              {
                label: '已取消',
                value: 'cancelled',
                count: 5
              }
            ],
            onChange: (value) => {
              console.log('状态切换：', value);
            }
          }}
        >
          <Card title="订单信息" size="small">
            <Descriptions column={2} bordered>
              <Descriptions.Item label="订单号">ORD202401001</Descriptions.Item>
              <Descriptions.Item label="客户姓名">张三</Descriptions.Item>
              <Descriptions.Item label="订单金额">¥1,200.00</Descriptions.Item>
              <Descriptions.Item label="创建时间">2024-01-15 10:30:00</Descriptions.Item>
              <Descriptions.Item label="收货地址" span={2}>
                北京市朝阳区某某街道123号
              </Descriptions.Item>
              <Descriptions.Item label="订单备注" span={2}>
                用户要求尽快发货
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </StateBarPage>
      </Layout>
    </PureGlobal>
  );
};

render(<StateBarPageExample />);

```

- PermissionsPage 权限页面
- 展示 PermissionsPage 组件的权限控制功能
- _Layout(@components/Layout),global(@components/Global),antd(antd)

```jsx
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

```

- 移动端适配
- 展示 Layout 组件的移动端响应式适配功能，菜单在移动端以Drawer形式显示
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page, Menu } = layout;
const { Flex, Space, Button, Typography, Card, Descriptions } = antd;
const { PureGlobal } = global;
const { useState } = React;
const { Title, Paragraph } = Typography;

const MobileExample = () => {
    const [isMobile, setIsMobile] = useState(true);

    return (
        <Layout
            navigation={{
                isFixed: false,
                list: [
                    {key: 'dashboard', title: '首页', path: '/dashboard'},
                    {key: 'users', title: '用户管理', path: '/users'},
                    {key: 'settings', title: '系统设置', path: '/settings'}
                ]
            }}
            isMobile={isMobile}
        >
            <Page
                name="mobile-example"
                menu={
                  <Menu
                    items={[
                      {
                        label: "组织架构",
                        key: "org",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                          {
                            label: "部门管理",
                            key: "dept",
                            path: "/dept",
                          },
                          {
                            label: "员工管理",
                            key: "employee",
                            path: "/employee",
                          },
                        ],
                      },
                      {
                        label: "业务管理",
                        key: "business",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                          {
                            label: "订单管理",
                            key: "order",
                            path: "/order",
                          },
                          {
                            label: "客户管理",
                            key: "customer",
                            path: "/customer",
                          },
                          {
                            label: "产品管理",
                            key: "product",
                            path: "/product",
                          },
                        ],
                      },
                      {
                        label: "数据报表",
                        key: "report",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                          {
                            label: "销售报表",
                            key: "sales-report",
                            path: "/sales-report",
                          },
                          {
                            label: "财务报表",
                            key: "finance-report",
                            path: "/finance-report",
                          },
                        ],
                      },
                    ]}
                  />
                }
                title="组织管理"
                titleExtra={
                    <Space>
                        <Button
                            type={isMobile ? 'primary' : 'default'}
                            onClick={() => setIsMobile(true)}
                        >
                            移动端
                        </Button>
                        <Button
                            type={!isMobile ? 'primary' : 'default'}
                            onClick={() => setIsMobile(false)}
                        >
                            桌面端
                        </Button>
                    </Space>
                }
            >
                <Card>
                    <Descriptions title="移动端特性说明" bordered column={1}>
                        <Descriptions.Item label="当前模式">
                            {isMobile ? '移动端模式' : '桌面端模式'}
                        </Descriptions.Item>
                        <Descriptions.Item label="自动检测">
                            当窗口宽度小于768px时自动切换为移动端模式
                        </Descriptions.Item>
                        <Descriptions.Item label="菜单展示">
                            {isMobile ? '左侧菜单隐藏，显示"菜单"按钮，点击后以Drawer形式展示' : '左侧固定菜单显示'}
                        </Descriptions.Item>
                        <Descriptions.Item label="默认收起">
                            Drawer默认关闭，点击按钮后打开
                        </Descriptions.Item>
                        <Descriptions.Item label="强制控制">
                            可通过isMobile属性强制指定为移动端或桌面端模式
                        </Descriptions.Item>
                        <Descriptions.Item label="布局调整">
                            移动端模式下内容区边距和圆角会自动调整
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="示例数据" style={{marginTop: 16}}>
                    <Paragraph>
                        这是移动端适配的示例内容。在实际业务中,这里会显示具体的业务数据和操作界面。
                    </Paragraph>
                    <Space direction="vertical" style={{width: '100%'}}>
                        <Button block>操作按钮1</Button>
                        <Button block>操作按钮2</Button>
                        <Button block type="primary">主要操作</Button>
                    </Space>
                </Card>
            </Page>
        </Layout>
    );
};

render(
    <PureGlobal>
        <MobileExample />
    </PureGlobal>
);

```

### API

#### Layout

Layout 组件是页面布局的容器组件，包裹所有页面内容并提供统一的布局结构。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| navigation | object | 否 | {} | 导航参数，参考 Navigation 组件参数 |
| children | ReactNode | 是 | - | 子组件，一般放置 Page 组件 |
| className | string | 否 | - | 自定义类名 |
| theme | object | 否 | - | 主题样式配置 |

#### Page

| 属性名             | 说明                                                                  | 类型         | 默认值   |
|-----------------|--------------------------------------------------------------------|------------|-------|
| menu            | 左菜单区内容                                                              | jsx        | -     |
| filter          | 页面标题位置筛选器参数,参考 Filter 组件参数                                          | object     | -     |
| menuOpen        | 左菜单是否默认打开                                                           | boolean    | true  |
| menuWidth       | 左菜单宽度                                                               | string     | 240px |
| menuFixed       | 左菜单是否fixed布局                                                        | boolean    | true  |
| menuCloseButton | 控制左菜单显示隐藏的按钮是否显示                                                    | boolean    | true  |
| header          | 页头区内容                                                               | jsx        | -     |
| headerFixed     | 页头区是否fixed布局                                                        | boolean    | true  |
| headerInfo      | 页头信息区内容                                                             | jsx        | -     |
| backUrl         | 右侧内容区的标题前展示返回按钮，并返回到该url                                   | 参考 useNavigate     | -       |
| title           | 页面标题                                                                | string,jsx | -     |
| titleExtra      | 页面标题区右侧位置内容                                                         | jsx        | -     |
| titleLeftExtra  | 页面标题区左侧位置内容                                                         | jsx        | -     |
| noMargin        | 页面内容区是否去掉Margin                                                     | boolean    | false |
| noPadding       | 页面内容区是否去掉Padding                                                    | boolean    | false |
| option          | 右操作区内容                                                              | jsx        | -     |
| optionWidth     | 右操作区宽度                                                              | string     | 400px |
| optionNoPadding | 右操作区是否去掉Padding                                                     | boolean    | false |
| optionFixed     | 右操作区是否fixed布局                                                       | boolean    | false |
| optionFooter    | 右操作区底部内容                                                            | jsx        | -     |
| openFeatures    | Page是否启用Features，启用时如果配置文件中没有该模块id则判断为模块关闭，会将name作为Features的id进行设置  | boolean    | false |

#### Affix

可以控制其中的内容是否是fixed布局

| 属性名          | 说明               | 类型       | 默认值  |
|--------------|------------------|----------|------|
| isFixed      | 内容是否fixed布局      | boolean  | true |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发 | number   | 0    |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number   | -    |
| onChange     | 固定状态改变时触发的回调函数   | function | -    |

#### Menu

显示一个菜单，最多支持两级，支持第一级展开收起，支持路径匹配自动高亮

| 属性名              | 说明                                                          | 类型            | 默认值  |
|------------------|-------------------------------------------------------------|---------------|------|
| items            | 菜单项                                                         | array[object] | []   |
| items[].label    | 菜单项显示内容                                                     | jsx           | -    |
| items[].key      | 菜单项的key要求必须唯一                                               | string        | -    |
| items[].iconType | 菜单项前面的icon类型参考 Icon组件的type参数                                | string        | -    |
| items[].path     | 菜单项的路径                                                      | string        | -    |
| items[].onClick  | 菜单项点击触发事件，注意：如果菜单项已经传入path参数则该参数不生效                         | function      | -    |
| items[].children | 菜单项的第二级项列表，参考items参数。注意该组件只支持两级菜单，所以该参数内部的菜单项不再支持children参数 | array[object] | -    |
| currentKey       | 当前被选中的菜单项的key，如果菜单项又path参数，不需要传递该参数，组件会根据路由自动判断选中项          | string        | -    |
| onChange         | currentKey产生修改时触发函数，注意：如果菜单项已经传入path参数则该参数不生效               | function      | -    |
| allowCollapsed   | 是否允许一级菜单收起                                                  | boolean       | true |
| defaultOpenKeys   | 初始展开的 SubMenu 菜单项 key 数组                                                  | string[]      | -    |

#### PermissionsPage

加入权限判断的 Page 组件，错误类型默认为 error，即在该页面没有权限时显示错误。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| permissions | object | 否 | - | 权限配置，参考 Permissions 组件参数 |
| name | string | 是 | - | 页面名称，必填 |
| openFeatures | boolean | 否 | false | 是否启用 Features 功能特性 |

注意：PermissionsPage 继承了 Page 的所有属性。

#### TablePage

快速集成 Table 组件的列表页面，内置了权限控制和帮助文档支持。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| helperGuideName | string | 否 | - | 帮助文档的名称 |
| permissions | object | 否 | - | 权限配置，参考 Permissions 组件参数 |
| page | object | 否 | - | Page 组件的配置参数 |
| openFeatures | boolean | 否 | false | 是否启用 Features 功能特性 |
| name | string | 是 | - | 页面名称，必填 |
| topArea | ReactNode \| function | 否 | - | 顶部额外内容区，可以是组件或函数（接收 tableData 参数） |
| isNext | boolean | 否 | false | 为 `true` 时使用 `@components/TablePage`（`@kne/table-page` 新 API）；默认使用 `@components/Table` 内置 legacy TablePage（兼容旧版 `type` 列配置） |

注意：除了以上属性，TablePage 还支持内部表格组件的所有属性（如 `columns`、`loader`、`pagination` 等）。`isNext` 为 `true` 时列配置遵循 `@kne/table-page` 规范（`renderType`、`getValueOf`、`format` 等）；默认模式下遵循 legacy Table 列配置（`type`、`valueOf` 等）。

#### StateBarPage

带有状态栏的状态展示页面，内置了权限控制和帮助文档支持。

##### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| helperGuideName | string | 否 | - | 帮助文档的名称 |
| permissions | object | 否 | - | 权限配置，参考 Permissions 组件参数 |
| page | object | 否 | - | Page 组件的配置参数 |
| stateBar | object | 否 | - | StateBar 组件的配置参数 |
| children | ReactNode | 否 | - | 页面内容区 |

注意：除了以上属性，StateBarPage 还继承了 Page 的所有属性。

# Menu

### 概述

Menu 是一个功能丰富的菜单导航组件，支持多级菜单、远程数据加载、权限控制和路径匹配。适用于各种侧边栏导航、顶部导航和下拉菜单场景。


### 示例

#### 示例代码

- 基础菜单
- 展示菜单的基本用法，包括多级菜单、无图标菜单、不可折叠菜单和单级菜单
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space, Card, Typography } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 基础多级菜单示例
const BaseMenuExample = () => {
  return (
    <Card title="基础多级菜单" size="small">
      <Menu
        defaultItems={[
          {
            label: "用户管理",
            iconType: "icon-yonghuguanli",
            children: [
              {
                label: "用户列表",
                path: "/users",
              },
              {
                label: "角色管理",
                path: "/roles",
              },
            ],
          },
          {
            label: "系统设置",
            iconType: "icon-shezhi",
            children: [
              {
                label: "基础配置",
                path: "/settings/basic",
              },
              {
                label: "权限配置",
                path: "/settings/permissions",
              },
            ],
          },
          {
            label: "数据统计",
            iconType: "icon-tongji",
            path: "/statistics",
          },
        ]}
      />
    </Card>
  );
};

// 无图标菜单示例
const NoIconMenuExample = () => {
  return (
    <Card title="无图标菜单" size="small">
      <Menu
        defaultItems={[
          {
            label: "首页",
            path: "/home",
          },
          {
            label: "产品",
            children: [
              {
                label: "产品列表",
                path: "/products/list",
              },
              {
                label: "产品分类",
                path: "/products/categories",
              },
            ],
          },
          {
            label: "关于我们",
            path: "/about",
          },
        ]}
      />
    </Card>
  );
};

// 不可折叠菜单示例
const NoCollapsedMenuExample = () => {
  return (
    <Card title="不可折叠菜单" size="small">
      <Menu
        allowCollapsed={false}
        defaultItems={[
          {
            label: "订单管理",
            iconType: "icon-dingdanguanli",
            children: [
              {
                label: "所有订单",
                path: "/orders/all",
              },
              {
                label: "待处理",
                path: "/orders/pending",
              },
              {
                label: "已完成",
                path: "/orders/completed",
              },
            ],
          },
          {
            label: "客户管理",
            iconType: "icon-kehuguanli",
            children: [
              {
                label: "客户列表",
                path: "/customers/list",
              },
              {
                label: "客户分组",
                path: "/customers/groups",
              },
            ],
          },
        ]}
      />
    </Card>
  );
};

// 单级菜单示例
const SingleLevelMenuExample = () => {
  return (
    <Card title="单级菜单" size="small">
      <Menu
        defaultItems={[
          {
            label: "仪表盘",
            iconType: "icon-yibiaopan",
            path: "/dashboard",
          },
          {
            label: "文档",
            iconType: "icon-wendang",
            path: "/documents",
          },
          {
            label: "消息中心",
            iconType: "icon-xiaoxizhongxin",
            path: "/messages",
          },
          {
            label: "个人设置",
            iconType: "icon-gerenshezhi",
            path: "/profile",
          },
        ]}
      />
    </Card>
  );
};

// 受控菜单示例
const ControlledMenuExample = () => {
  const [currentKey, setCurrentKey] = useState("products");
  
  return (
    <Card title="受控菜单" size="small">
      <Text type="secondary">当前选中项: {currentKey}</Text>
      <Menu
        currentKey={currentKey}
        onChange={setCurrentKey}
        items={[
          {
            label: "产品",
            key: "products",
            iconType: "icon-chanpin",
            path: "/products",
          },
          {
            label: "订单",
            key: "orders",
            iconType: "icon-dingdan",
            path: "/orders",
          },
          {
            label: "客户",
            key: "customers",
            iconType: "icon-kehu",
            path: "/customers",
          },
          {
            label: "财务",
            key: "finance",
            iconType: "icon-caiwu",
            path: "/finance",
          },
        ]}
      />
    </Card>
  );
};

const BasicExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <BaseMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <NoIconMenuExample />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <NoCollapsedMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <SingleLevelMenuExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <ControlledMenuExample />
      </div>
    </Space>
  );
};

render(<BasicExample />);
```

- 远程数据加载
- 展示菜单的远程数据加载功能，包括嵌套远程加载和自定义加载状态
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space, Card, Typography } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 远程加载数据的菜单示例
const RemoteDataMenuExample = () => {
  return (
    <Card title="远程加载数据" size="small">
      <Text type="secondary">点击"动态部门"菜单项，会异步加载子菜单数据</Text>
      <Menu
        defaultItems={[
          {
            label: "静态菜单",
            iconType: "icon-jingtai",
            children: [
              {
                label: "子菜单项1",
                path: "/static/item1",
              },
              {
                label: "子菜单项2",
                path: "/static/item2",
              },
            ],
          },
          {
            label: "动态部门",
            iconType: "icon-bumen",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "技术部",
                        path: "/dept/tech",
                      },
                      {
                        label: "产品部",
                        path: "/dept/product",
                      },
                      {
                        label: "市场部",
                        path: "/dept/marketing",
                      },
                      {
                        label: "人力资源部",
                        path: "/dept/hr",
                      },
                    ]);
                  }, 1000);
                });
              },
            },
          },
          {
            label: "动态项目",
            iconType: "icon-xiangmu",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "进行中项目",
                        children: [
                          {
                            label: "网站改版",
                            path: "/projects/website",
                          },
                          {
                            label: "APP开发",
                            path: "/projects/app",
                          },
                        ],
                      },
                      {
                        label: "已完成项目",
                        path: "/projects/completed",
                      },
                    ]);
                  }, 1500);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

// 嵌套远程加载的菜单示例
const NestedRemoteMenuExample = () => {
  return (
    <Card title="嵌套远程加载" size="small">
      <Text type="secondary">多级菜单可以嵌套远程加载，点击后逐级加载数据</Text>
      <Menu
        defaultItems={[
          {
            label: "数据中心",
            iconType: "icon-shujuzhongxin",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "数据报表",
                        fetchOptions: {
                          loader: () => {
                            return new Promise((resolve) => {
                              setTimeout(() => {
                                resolve([
                                  {
                                    label: "日报表",
                                    path: "/data/daily",
                                  },
                                  {
                                    label: "周报表",
                                    path: "/data/weekly",
                                  },
                                  {
                                    label: "月报表",
                                    path: "/data/monthly",
                                  },
                                ]);
                              }, 800);
                            });
                          },
                        },
                      },
                      {
                        label: "数据源管理",
                        path: "/data/sources",
                      },
                    ]);
                  }, 1000);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

// 自定义加载内容示例
const CustomLoadingMenuExample = () => {
  return (
    <Card title="自定义加载状态" size="small">
      <Text type="secondary">可以通过fetchOptions配置自定义加载状态</Text>
      <Menu
        defaultItems={[
          {
            label: "快速操作",
            iconType: "icon-kuaisucaozuo",
            children: [
              {
                label: "新建文档",
                path: "/quick/new-doc",
              },
              {
                label: "上传文件",
                path: "/quick/upload",
              },
            ],
          },
          {
            label: "云存储",
            iconType: "icon-yuncunchu",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "我的文档",
                        path: "/cloud/docs",
                      },
                      {
                        label: "共享文档",
                        path: "/cloud/shared",
                      },
                      {
                        label: "回收站",
                        path: "/cloud/trash",
                      },
                    ]);
                  }, 2000);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

const RemoteDataExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <RemoteDataMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <NestedRemoteMenuExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <CustomLoadingMenuExample />
      </div>
    </Space>
  );
};

render(<RemoteDataExample />);
```

- 自定义交互
- 展示菜单的交互功能，包括菜单项点击、动态菜单控制和展开状态控制
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space, Card, Typography, Button, message } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 菜单项点击交互示例
const MenuInteractionExample = () => {
  const [currentKey, setCurrentKey] = useState("dashboard");
  
  const handleMenuClick = (key, props) => {
    setCurrentKey(key);
    message.info(&#96;点击了菜单项: ${props.label}&#96;);
  };
  
  return (
    <Card title="菜单项点击交互" size="small">
      <Text type="secondary">点击菜单项触发自定义交互和消息提示</Text>
      <Menu
        currentKey={currentKey}
        onChange={setCurrentKey}
        items={[
          {
            label: "仪表盘",
            key: "dashboard",
            iconType: "icon-yibiaopan",
            onClick: handleMenuClick,
          },
          {
            label: "用户管理",
            key: "users",
            iconType: "icon-yonghuguanli",
            onClick: handleMenuClick,
            children: [
              {
                label: "用户列表",
                key: "user-list",
                onClick: handleMenuClick,
              },
              {
                label: "角色管理",
                key: "roles",
                onClick: handleMenuClick,
              },
            ],
          },
          {
            label: "系统设置",
            key: "settings",
            iconType: "icon-shezhi",
            onClick: handleMenuClick,
            children: [
              {
                label: "基础配置",
                key: "basic-settings",
                onClick: handleMenuClick,
              },
              {
                label: "安全设置",
                key: "security-settings",
                onClick: handleMenuClick,
              },
            ],
          },
        ]}
      />
    </Card>
  );
};

// 动态菜单控制示例
const DynamicMenuExample = () => {
  const [menuItems, setMenuItems] = useState([
    {
      label: "任务管理",
      iconType: "icon-renwuguanli",
      key: "tasks",
      children: [
        {
          label: "我的任务",
          key: "my-tasks",
          path: "/tasks/my",
        },
        {
          label: "团队任务",
          key: "team-tasks",
          path: "/tasks/team",
        },
      ],
    },
    {
      label: "文档管理",
      iconType: "icon-wendangguanli",
      key: "docs",
      path: "/docs",
    },
  ]);
  
  const addMenuItem = () => {
    const newItem = {
      label: &#96;新菜单项 ${menuItems.length + 1}&#96;,
      iconType: "icon-xinjian",
      key: &#96;new-${Date.now()}&#96;,
      path: &#96;/new/${menuItems.length}&#96;,
    };
    setMenuItems([...menuItems, newItem]);
    message.success("已添加新菜单项");
  };
  
  const removeLastMenuItem = () => {
    if (menuItems.length > 0) {
      setMenuItems(menuItems.slice(0, -1));
      message.success("已移除最后一个菜单项");
    }
  };
  
  return (
    <Card title="动态菜单控制" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary">通过代码动态添加和删除菜单项</Text>
        <Space>
          <Button type="primary" size="small" onClick={addMenuItem}>
            添加菜单项
          </Button>
          <Button size="small" onClick={removeLastMenuItem}>
            移除最后一项
          </Button>
        </Space>
        <Menu
          items={menuItems}
        />
      </Space>
    </Card>
  );
};

// 展开状态控制示例
const ExpandControlExample = () => {
  const [openKeys, setOpenKeys] = useState(["product", "orders"]);
  
  const expandAll = () => {
    setOpenKeys(["product", "orders", "users", "settings"]);
    message.success("已展开所有菜单");
  };
  
  const collapseAll = () => {
    setOpenKeys([]);
    message.success("已收起所有菜单");
  };
  
  return (
    <Card title="展开状态控制" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary">通过代码控制菜单的展开和收起状态</Text>
        <Space>
          <Button type="primary" size="small" onClick={expandAll}>
            展开全部
          </Button>
          <Button size="small" onClick={collapseAll}>
            收起全部
          </Button>
        </Space>
        <Menu
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          defaultItems={[
            {
              label: "产品管理",
              key: "product",
              iconType: "icon-chanpin",
              children: [
                {
                  label: "产品列表",
                  path: "/products/list",
                },
                {
                  label: "产品分类",
                  path: "/products/categories",
                },
              ],
            },
            {
              label: "订单管理",
              key: "orders",
              iconType: "icon-dingdan",
              children: [
                {
                  label: "订单列表",
                  path: "/orders/list",
                },
                {
                  label: "订单统计",
                  path: "/orders/stats",
                },
              ],
            },
            {
              label: "用户管理",
              key: "users",
              iconType: "icon-yonghuguanli",
              children: [
                {
                  label: "用户列表",
                  path: "/users/list",
                },
                {
                  label: "权限设置",
                  path: "/users/permissions",
                },
              ],
            },
            {
              label: "系统设置",
              key: "settings",
              iconType: "icon-shezhi",
              children: [
                {
                  label: "基础设置",
                  path: "/settings/basic",
                },
                {
                  label: "安全设置",
                  path: "/settings/security",
                },
              ],
            },
          ]}
        />
      </Space>
    </Card>
  );
};

const CustomInteractionExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <MenuInteractionExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <DynamicMenuExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <ExpandControlExample />
      </div>
    </Space>
  );
};

render(<CustomInteractionExample />);
```

- 权限控制与路由匹配
- 展示菜单的权限控制和路由匹配功能，包括自定义路径匹配和嵌套路由
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space, Card, Typography, Switch, Alert } = antd;
const { useState, useMemo } = React;

const { Title, Text } = Typography;

// 权限控制菜单示例
const PermissionMenuExample = () => {
  const [hasAdminPermission, setHasAdminPermission] = useState(true);
  const [hasUserPermission, setUserPermission] = useState(true);
  
  const menuItems = useMemo(() => [
    {
      label: "首页",
      iconType: "icon-shouye",
      path: "/home",
    },
    {
      label: "用户管理",
      iconType: "icon-yonghuguanli",
      request: {
        permission: "user:view",
      },
      children: [
        {
          label: "用户列表",
          path: "/users/list",
          request: {
            permission: "user:list",
          },
        },
        {
          label: "用户详情",
          path: "/users/detail",
          request: {
            permission: "user:detail",
          },
        },
        {
          label: "用户操作",
          path: "/users/actions",
          request: {
            permission: ["user:create", "user:edit", "user:delete"],
          },
        },
      ],
    },
    {
      label: "系统管理",
      iconType: "icon-xitongguanli",
      request: {
        permission: ["admin:view", "admin:full"],
      },
      children: [
        {
          label: "系统配置",
          path: "/system/config",
          request: {
            permission: "admin:config",
          },
        },
        {
          label: "权限管理",
          path: "/system/permission",
          request: {
            permission: "admin:permission",
          },
        },
      ],
    },
    {
      label: "数据统计",
      iconType: "icon-shujutongji",
      path: "/statistics",
    },
  ], []);
  
  return (
    <Card title="权限控制菜单" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Text>用户管理权限:</Text>
          <Switch checked={hasUserPermission} onChange={setUserPermission} />
          <Text>管理员权限:</Text>
          <Switch checked={hasAdminPermission} onChange={setHasAdminPermission} />
        </Space>
        <Alert
          message="权限说明"
          description="根据用户权限控制菜单项的显示，无权限的菜单项将不会显示"
          type="info"
          showIcon
        />
        <Menu
          defaultItems={menuItems}
        />
      </Space>
    </Card>
  );
};

// 自定义路径匹配示例
const PathMatchExample = () => {
  const [matchType, setMatchType] = useState("exact");
  
  const customPathMatch = (path, location) => {
    if (matchType === "exact") {
      // 精确匹配
      return location.pathname === path;
    } else if (matchType === "startsWith") {
      // 前缀匹配
      return location.pathname.startsWith(path);
    } else if (matchType === "custom") {
      // 自定义匹配逻辑 - 包含特定标识符
      return location.pathname.includes(path.split("/").pop());
    }
    return false;
  };
  
  return (
    <Card title="自定义路径匹配" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Text>匹配类型:</Text>
          <Switch 
            checked={matchType === "exact"} 
            onChange={(checked) => setMatchType(checked ? "exact" : "startsWith")}
          />精确匹配
          <Switch 
            checked={matchType === "custom"} 
            onChange={(checked) => setMatchType(checked ? "custom" : "startsWith")}
          />自定义匹配
        </Space>
        <Alert
          message="匹配说明"
          description="精确匹配要求路径完全相同，前缀匹配要求路径以指定路径开头，自定义匹配使用特殊规则"
          type="info"
          showIcon
        />
        <Menu
          pathMatch={customPathMatch}
          defaultItems={[
            {
              label: "用户管理",
              iconType: "icon-yonghuguanli",
              path: "/users",
              children: [
                {
                  label: "用户列表",
                  path: "/users/list",
                },
                {
                  label: "用户详情",
                  path: "/users/detail",
                },
              ],
            },
            {
              label: "产品管理",
              iconType: "icon-chanpin",
              path: "/products",
              children: [
                {
                  label: "产品列表",
                  path: "/products/list",
                },
                {
                  label: "产品详情",
                  path: "/products/detail",
                },
              ],
            },
          ]}
        />
      </Space>
    </Card>
  );
};

// 嵌套路由匹配示例
const NestedRouteExample = () => {
  return (
    <Card title="嵌套路由匹配" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="嵌套路由说明"
          description="当访问子菜单路径时，父菜单也会自动高亮显示"
          type="info"
          showIcon
        />
        <Menu
          defaultItems={[
            {
              label: "用户中心",
              iconType: "icon-yonghuzhongxin",
              path: "/user",
              children: [
                {
                  label: "基本信息",
                  path: "/user/profile",
                },
                {
                  label: "账户安全",
                  path: "/user/security",
                },
                {
                  label: "通知设置",
                  path: "/user/notifications",
                },
              ],
            },
            {
              label: "项目管理",
              iconType: "icon-xiangmuguanli",
              path: "/project",
              children: [
                {
                  label: "进行中项目",
                  path: "/project/active",
                },
                {
                  label: "已完成项目",
                  path: "/project/completed",
                },
                {
                  label: "项目详情",
                  path: "/project/detail",
                },
              ],
            },
          ]}
        />
      </Space>
    </Card>
  );
};

const PermissionRoutingExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <PermissionMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <PathMatchExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <NestedRouteExample />
      </div>
    </Space>
  );
};

render(<PermissionRoutingExample />);
```

### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|allowCollapsed|是否允许子菜单折叠|boolean|true|
|className|自定义类名|string|-|
|currentKey|当前选中的菜单项key|string|-|
|defaultCurrentKey|默认选中的菜单项key|string|-|
|defaultItems|默认菜单项数组|MenuItemProps[]|-|
|defaultOpenKeys|默认展开的菜单项key数组|string[]|-|
|items|菜单项数组|MenuItemProps[]|-|
|onChange|选中项改变时的回调函数|(key: string) => void|-|
|onItemsChange|菜单项改变时的回调函数|(items: MenuItemProps[]) => void|-|
|onOpenChange|展开项改变时的回调函数|(openKeys: string[]) => void|-|
|openKeys|当前展开的菜单项key数组|string[]|-|
|pathMatch|路径匹配函数|(path: string, location: { pathname: string, search: string }) => boolean|-|

#### MenuItemProps

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|children|子菜单项|MenuItemProps[]|-|
|fetchOptions|远程加载子菜单的配置|FetchOptions|-|
|icon|菜单项图标React节点|ReactNode|-|
|iconType|菜单项图标类型|string|-|
|label|菜单项标签|string|ReactNode|-|
|onClick|点击菜单项的回调函数|(key: string, props: MenuItemProps) => void|-|
|path|菜单项对应的路径|string|-|
|request|权限请求配置|object|-|

#### FetchOptions

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|loader|数据加载函数|() => Promise<MenuItemProps[]>|-|

# Modal

### 概述

#### 概述

Modal 是一个基于 Ant Design Modal 组件的增强型弹窗组件，提供了更丰富的功能和更简洁的API。支持多种弹窗形式，适用于需要弹窗交互的各种场景。

#### 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以在当前页面正中打开一个浮层，承载相应的操作。

#### 特点

该组件是antd Modal组件的再封装：

* 修改了footer部分的设置逻辑,能更加简单的定义footer区域的功能
* 添加了withDecorator可以更加方便的处理Modal外层的显示逻辑
* 扩展了用于方法调用的useModal的hooks，可以通过hooks获得一个Modal的调用方法，并且保证其和Modal组件式调用有相同的UI表现和行为
* 扩展了ModalButton组件，可以在点击该按钮时执行加载数据，并且Button的状态变为loading，在数据加载完成之后再弹出弹窗
* 扩展了TabsModal组件，它是一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

#### 组件构成

Modal 组件家族包含以下组件：
- **Modal**: 基础弹窗组件
- **useModal**: Hook，用于命令式调用弹窗
- **TabsModal**: 带选项卡的弹窗组件
- **useTabsModal**: Hook，用于命令式调用选项卡弹窗
- **ModalButton**: 可加载数据的弹窗按钮
- **TabsModalButton**: 可加载数据的选项卡弹窗按钮

### 示例

#### 示例代码

- 基础弹窗
- 展示Modal组件的基本用法，包括不同尺寸、异步确认、自定义按钮和命令式调用等
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),antd(antd)

```jsx
const { default: Modal, useModal } = _Modal;
const { default: FormInfo, useFormModal, fields } = _FormInfo;
const { useState } = React;
const { Button, Space, message, Radio, Input } = antd;

// 基础弹窗示例
const BasicModalExample = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开基础弹窗
      </Button>
      
      <Modal
        title="基础弹窗"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        <p>这是一个基础弹窗的内容</p>
        <p>弹窗支持确认和取消操作</p>
      </Modal>
    </Space>
  );
};

// 不同尺寸的弹窗示例
const SizeModalExample = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("default");
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Radio.Group
        value={size}
        options={[
          { label: "小号", value: "small" },
          { label: "默认", value: "default" },
          { label: "大号", value: "large" },
        ]}
        onChange={(e) => setSize(e.target.value)}
      />
      <Button type="primary" onClick={() => setOpen(true)}>
        打开{size === "small" ? "小号" : size === "large" ? "大号" : "默认"}弹窗
      </Button>
      
      <Modal
        title={&#96;${size === "small" ? "小号" : size === "large" ? "大号" : "默认"}尺寸弹窗&#96;}
        size={size}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <p>这是一个{size}尺寸的弹窗</p>
        {size === "large" && (
          <div>
            <p>大号弹窗可以容纳更多内容</p>
            <p>适合展示复杂的表单或数据</p>
            <p>可以根据实际需求选择合适的尺寸</p>
            <p>内容会根据弹窗大小自动调整布局</p>
          </div>
        )}
      </Modal>
    </Space>
  );
};

// 异步确认的弹窗示例
const AsyncModalExample = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开异步确认弹窗
      </Button>
      
      <Modal
        title="异步确认弹窗"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          return new Promise((resolve) => {
            message.loading("正在处理，请稍候...", 0);
            setTimeout(() => {
              message.destroy();
              message.success("处理成功！");
              resolve();
            }, 2000);
          });
        }}
      >
        <p>点击确认按钮后，将执行异步操作</p>
        <p>在操作完成前，确认按钮将显示为加载状态</p>
        <p>操作完成后，弹窗将自动关闭</p>
      </Modal>
    </Space>
  );
};

// 自定义按钮的弹窗示例
const CustomButtonModalExample = () => {
  const [open, setOpen] = useState(false);
  
  const handleSave = () => {
    return new Promise((resolve) => {
      message.loading("正在保存...", 0);
      setTimeout(() => {
        message.destroy();
        message.success("保存成功！");
        resolve();
      }, 1500);
    });
  };
  
  const handleCancel = () => {
    message.info("已取消操作");
    setOpen(false);
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开自定义按钮弹窗
      </Button>
      
      <Modal
        title="自定义按钮弹窗"
        open={open}
        onClose={() => setOpen(false)}
        footerButtons={[
          {
            children: "取消",
            onClick: handleCancel,
          },
          {
            children: "保存",
            type: "primary",
            onClick: handleSave,
          },
          {
            children: "保存并新建",
            onClick: () => {
              handleSave().then(() => {
                message.info("可以继续添加新内容");
              });
            },
          },
        ]}
      >
        <p>这个弹窗有自定义的底部按钮</p>
        <p>每个按钮都可以有自己的点击处理逻辑</p>
      </Modal>
    </Space>
  );
};

// 命令式调用的弹窗示例
const CommandModalExample = () => {
  const modal = useModal();
  
  const openModal = () => {
    modal({
      title: "命令式弹窗",
      children: <div>
        <p>这是通过 useModal Hook 命令式打开的弹窗</p>
        <p>无需管理弹窗的显示状态</p>
        <p>适合在事件处理中直接使用</p>
      </div>,
      onConfirm: () => {
        message.success("确认操作");
      },
    });
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={openModal}>
        打开命令式弹窗
      </Button>
    </Space>
  );
};

// 表单弹窗示例
const FormModalExample = () => {
  const formModal = useFormModal();
  
  const handleOpenForm = () => {
    formModal({
      title: "用户信息表单",
      formProps: {
        onSubmit: (data) => {
          console.log("表单值:", data);
          message.success("保存成功");
        },
      },
      children: (
        <FormInfo
          list={[
            <fields.Input name="name" label="姓名" rule="REQ" />,
            <fields.Input name="email" label="邮箱" rule="EMAIL" />,
            <fields.TextArea name="remark" label="备注" />,
          ]}
        />
      ),
    });
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={handleOpenForm}>
        打开表单弹窗
      </Button>
    </Space>
  );
};

const BasicModalExamples = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <BasicModalExample />
      <SizeModalExample />
      <AsyncModalExample />
      <CustomButtonModalExample />
      <CommandModalExample />
      <FormModalExample />
    </Space>
  );
};

render(<BasicModalExamples />);
```

- 高级功能
- 展示Modal组件的高级功能，包括withDecorator装饰器、rightOptions右侧选项和高级命令式调用
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),antd(antd)

```jsx
const { default: Modal, useModal, TabsModal, useTabsModal, ModalButton, TabsModalButton } = _Modal;
const { default: FormInfo, fields } = _FormInfo;
const { useState, useCallback, useRef } = React;
const { Button, Space, message, Table, Input, Tabs, Badge, Switch, Avatar, Descriptions, List, Timeline, Tag, Divider } = antd;

// 使用 withDecorator 的弹窗示例
const WithDecoratorModalExample = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开带装饰器的弹窗
      </Button>
      
      <Modal
        title="带装饰器的弹窗"
        open={open}
        onClose={() => setOpen(false)}
        withDecorator={(render) => {
          return (
            <div>
              <div style={{ background: '#f0f2f5', padding: '16px', marginBottom: '16px' }}>
                <p>这是通过 withDecorator 添加的外部装饰内容</p>
                <Space>
                  <Button size="small" onClick={() => setLoading(!loading)}>
                    {loading ? '停止' : '开始'}加载
                  </Button>
                  <Badge status={loading ? 'processing' : 'default'} text={loading ? '加载中' : '空闲'} />
                </Space>
              </div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  加载中，请稍候...
                </div>
              ) : (
                render({
                  decoratorData: { loading, message: "装饰器传递的数据" }
                })
              )}
            </div>
          );
        }}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        {({ decoratorData }) => (
          <div>
            <p>这是弹窗的主体内容</p>
            <p>从装饰器接收的数据: {JSON.stringify(decoratorData)}</p>
          </div>
        )}
      </Modal>
    </Space>
  );
};

// 使用 rightOptions 的弹窗示例
const RightOptionsModalExample = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ views: 0, likes: 0 });
  
  const rightOptions = (
    <div style={{ padding: '8px 16px', background: '#f5f5f5' }}>
      <Space direction="vertical" size="small">
        <div>浏览量: {info.views}</div>
        <div>点赞数: {info.likes}</div>
        <Button size="small" type="primary" onClick={() => {
          setInfo({ views: info.views + 1, likes: info.likes + 1 });
        }}>
          更新数据
        </Button>
      </Space>
    </div>
  );
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开带右侧选项的弹窗
      </Button>
      
      <Modal
        title="带右侧选项的弹窗"
        open={open}
        onClose={() => setOpen(false)}
        rightOptions={rightOptions}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        <p>这是弹窗的主体内容</p>
        <p>右侧区域显示了额外的信息</p>
        <p>右侧区域通常用于显示辅助信息或操作</p>
      </Modal>
    </Space>
  );
};

// 命令式调用的高级弹窗示例
const AdvancedCommandModalExample = () => {
  const modal = useModal();
  const [data, setData] = useState(null);
  const modalApiRef = useRef(null);
  
  const openDataModal = useCallback(() => {
    const api = modal({
      title: "数据详情弹窗",
      width: 600,
      withDecorator: (render) => {
        return (
          <div>
            <Button 
              style={{ marginBottom: 16 }} 
              onClick={() => {
                setData([
                  { key: '1', name: '张三', age: 28, address: '北京市朝阳区' },
                  { key: '2', name: '李四', age: 32, address: '北京市海淀区' },
                ]);
              }}
            >
              加载数据
            </Button>
            {render()}
          </div>
        );
      },
      children: () => (
        <div>
          {data ? (
            <Table
              dataSource={data}
              columns={[
                { title: '姓名', dataIndex: 'name', key: 'name' },
                { title: '年龄', dataIndex: 'age', key: 'age' },
                { title: '地址', dataIndex: 'address', key: 'address' },
              ]}
              pagination={false}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              暂无数据，请点击"加载数据"按钮
            </div>
          )}
        </div>
      ),
      footerButtons: [
        {
          children: '刷新',
          onClick: () => {
            if (data) {
              setData([...data]);
              message.success("数据已刷新");
            }
          },
        },
        {
          children: '关闭',
          onClick: () => {
            message.info("已关闭");
          },
        },
      ],
    });
    modalApiRef.current = api;
  }, [modal, data]);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={openDataModal}>
        打开数据详情弹窗
      </Button>
    </Space>
  );
};

// TabsModal 示例
const TabsModalExample = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // 模拟数据
  const userData = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    department: '技术部',
    joinDate: '2020-05-15',
    projects: ['项目A', '项目B', '项目C'],
    skills: ['JavaScript', 'React', 'Node.js'],
    achievements: ['优秀员工', '技术创新奖', '团队协作奖'],
  };
  
  const items = [
    {
      key: 'basic',
      label: '基本信息',
      withDecorator: (render) => {
        return (
          <div>
            <p style={{ marginBottom: 16 }}>这是基本信息标签的装饰内容</p>
            {render()}
          </div>
        );
      },
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar size={64} src={userData.avatar} />
              <div>
                <h3>{userData.name}</h3>
                <p>{userData.email}</p>
              </div>
            </div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="部门">{userData.department}</Descriptions.Item>
              <Descriptions.Item label="入职日期">{userData.joinDate}</Descriptions.Item>
            </Descriptions>
          </Space>
        </div>
      ),
    },
    {
      key: 'projects',
      label: '项目经验',
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <List
            header={<div>参与项目</div>}
            bordered
            dataSource={userData.projects}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 1}</Avatar>}
                  title={item}
                  description={&#96;这是${item}的描述信息，展示了项目的主要内容和成果。&#96;}
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: 'skills',
      label: '技能特长',
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <Space wrap>
            {userData.skills.map((skill, index) => (
              <Tag key={index} color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                {skill}
              </Tag>
            ))}
          </Space>
          <Divider />
          <p>技能掌握程度评估：</p>
          <Space direction="vertical" style={{ width: '100%' }}>
            {userData.skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 80 }}>{skill}:</div>
                <div style={{ flex: 1, backgroundColor: '#f0f0f0', borderRadius: 4, height: 8, position: 'relative' }}>
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: 0, 
                      height: '100%', 
                      backgroundColor: '#1890ff',
                      borderRadius: 4,
                      width: &#96;${80 - index * 10}%&#96;
                    }} 
                  />
                </div>
                <span>{90 - index * 10}%</span>
              </div>
            ))}
          </Space>
        </div>
      ),
    },
    {
      key: 'achievements',
      label: '成就荣誉',
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <Timeline>
            {userData.achievements.map((achievement, index) => (
              <Timeline.Item 
                key={index} 
                color={index === 0 ? 'green' : index === 1 ? 'blue' : 'red'}
              >
                <p style={{ fontWeight: 'bold', marginBottom: 4 }}>{achievement}</p>
                <p style={{ color: '#666', fontSize: '12px' }}>
                  {index === 0 ? '2023年度评选' : index === 1 ? '2022年度评选' : '2021年度评选'}
                </p>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      ),
    },
  ];
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开选项卡弹窗
      </Button>
      
      <TabsModal
        open={open}
        onClose={() => setOpen(false)}
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        onConfirm={() => {
          return new Promise((resolve) => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              message.success("操作成功");
              resolve();
            }, 1500);
          });
        }}
      />
    </Space>
  );
};

// ModalButton 示例
const ModalButtonExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <p>ModalButton 可以在点击后加载数据，然后弹出弹窗</p>
      
      <ModalButton
        type="primary"
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  userInfo: {
                    name: '张三',
                    email: 'zhangsan@example.com',
                    department: '技术部',
                    position: '高级工程师',
                    joinDate: '2020-05-15',
                  }
                });
              }, 1500);
            });
          },
        }}
        modalProps={({ data }) => ({
          title: "用户详情",
          children: (
            <div>
              {data && data.userInfo ? (
                <>
                  <p><strong>姓名:</strong> {data.userInfo.name || '未知'}</p>
                  <p><strong>邮箱:</strong> {data.userInfo.email || '未知'}</p>
                  <p><strong>部门:</strong> {data.userInfo.department || '未知'}</p>
                  <p><strong>职位:</strong> {data.userInfo.position || '未知'}</p>
                  <p><strong>入职日期:</strong> {data.userInfo.joinDate || '未知'}</p>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>加载用户信息失败</p>
                </div>
              )}
            </div>
          ),
        })}
      >
        查看用户详情
      </ModalButton>
      
      <ModalButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { key: '1', name: '张三', age: 28, department: '技术部' },
                  { key: '2', name: '李四', age: 32, department: '产品部' },
                  { key: '3', name: '王五', age: 26, department: '设计部' },
                ]);
              }, 1000);
            });
          },
        }}
        modalProps={({ data }) => ({
          title: "员工列表",
          children: (
            <>
              {data && Array.isArray(data) && data.length > 0 ? (
                <Table
                  dataSource={data}
                  columns={[
                    { title: '姓名', dataIndex: 'name', key: 'name' },
                    { title: '年龄', dataIndex: 'age', key: 'age' },
                    { title: '部门', dataIndex: 'department', key: 'department' },
                  ]}
                  pagination={false}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>加载员工列表失败</p>
                </div>
              )}
            </>
          ),
        })}
      >
        查看员工列表
      </ModalButton>
    </Space>
  );
};

// TabsModalButton 示例
const TabsModalButtonExample = () => {
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <p>TabsModalButton 结合了 TabsModal 和数据加载功能</p>
      
      <TabsModalButton
        type="primary"
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  profile: {
                    name: '李四',
                    email: 'lisi@example.com',
                    phone: '13800138000',
                  },
                  settings: {
                    theme: 'dark',
                    language: 'zh-CN',
                    notifications: true,
                  },
                });
              }, 1500);
            });
          },
        }}
        modalProps={({ data }) => ({
          title: "用户设置",
          items: [
            {
              key: 'profile',
              label: '个人信息',
              children: () => (
                <FormInfo 
                  ref={formRef1}
                  data={data.profile}
                  list={[
                    <fields.Input name="name" label="姓名" />,
                    <fields.Input name="email" label="邮箱" />,
                    <fields.Input name="phone" label="电话" />,
                  ]}
                />
              ),
            },
            {
              key: 'settings',
              label: '系统设置',
              children: () => (
                <FormInfo 
                  ref={formRef2}
                  data={data.settings}
                  list={[
                    <fields.Input name="theme" label="主题" />,
                    <fields.Input name="language" label="语言" />,
                    <fields.Switch name="notifications" label="通知" />,
                  ]}
                />
              ),
            },
          ],
          onConfirm: async () => {
            try {
              // 获取表单数据
              const form1Data = formRef1.current ? await formRef1.current.getData() : {};
              const form2Data = formRef2.current ? await formRef2.current.getData() : {};
              
              console.log('表单数据:', { ...form1Data, ...form2Data });
              return Promise.resolve();
            } catch (error) {
              console.error('表单验证失败:', error);
              throw error;
            }
          },
        })}
      >
        打开用户设置
      </TabsModalButton>
    </Space>
  );
};

const AdvancedModalExamples = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <WithDecoratorModalExample />
      <RightOptionsModalExample />
      <AdvancedCommandModalExample />
      <TabsModalExample />
      <ModalButtonExample />
      <TabsModalButtonExample />
    </Space>
  );
};

render(<AdvancedModalExamples />);
```

- FormModal表单弹窗
- 展示FormModal组件的用法，在弹窗中展示表单，适合数据录入、编辑等场景
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),global(@components/Global),antd(antd)

```jsx
const { FormModal, useFormModal } = _FormInfo;
const { Space, Button } = antd;
const { PureGlobal } = global;
const { default: FormInfo, List, Input, TextArea } = _FormInfo;
const { useState } = React;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const formModal = useFormModal();
  return (
    <Space wrap>
      <FormModal
        open={open}
        title="表单弹窗"
        onClose={() => {
          setOpen(false);
        }}
        formProps={{
          data: {
            productName: "示例产品",
          },
          onSubmit: async (data) => {
            console.log(data);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            });
            setOpen(false);
          },
        }}
      >
        <FormInfo
          title="基本信息"
          list={[
            <Input name="productName" label="产品名称" rule="REQ LEN-0-50" />,
            <Input name="productCode" label="产品编码" rule="REQ LEN-0-20" />,
            <TextArea name="description" label="产品描述" />,
          ]}
        />
        <List
          title="规格列表"
          name="specifications"
          maxLength={3}
          list={[
            <Input name="specName" label="规格名称" rule="REQ LEN-0-20" />,
            <Input name="specValue" label="规格值" rule="REQ LEN-0-20" />,
            <TextArea name="specRemark" label="备注" />,
          ]}
        />
      </FormModal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "员工信息表单",
            formProps: {
              data: {
                employeeName: "张三",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="employeeName" label="员工姓名" rule="REQ LEN-0-20" />,
                    <Input name="employeeEmail" label="邮箱" rule="EMAIL" />,
                    <TextArea name="workExperience" label="工作经历" />,
                  ]}
                />
                <List
                  title="教育背景"
                  name="education"
                  maxLength={3}
                  list={[
                    <Input name="schoolName" label="学校名称" rule="REQ LEN-0-30" />,
                    <Input name="major" label="专业" rule="REQ LEN-0-20" />,
                    <TextArea name="degree" label="学历学位" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            footerButtons: [
              { buttonType: "CancelButton", children: "取消" },
              {
                buttonType: "FormApiButton",
                autoClose: false,
                onClick: (context) => {
                  console.log(context);
                },
                children: "FormApiButton",
              },
              {
                buttonType: "SubmitButton",
                autoClose: false,
                children: "提交",
              },
            ],
            formProps: {
              data: {
                projectName: "新项目",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="项目信息"
                  list={[
                    <Input name="projectName" label="项目名称" rule="REQ LEN-0-30" />,
                    <Input name="projectManager" label="项目经理" rule="REQ LEN-0-20" />,
                    <TextArea name="projectDescription" label="项目描述" />,
                  ]}
                />
                <List
                  title="项目成员"
                  name="members"
                  maxLength={3}
                  list={[
                    <Input name="memberName" label="成员姓名" rule="REQ LEN-0-20" />,
                    <Input name="memberRole" label="成员角色" rule="REQ LEN-0-20" />,
                    <TextArea name="memberRemark" label="备注" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        自定义footerButtons
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- TabsModal选项卡弹窗
- 展示TabsModal组件的用法，包括选项卡内容和装饰器功能
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { TabsModal, useTabsModal } = _Modal;
const { useState } = React;
const { default: Fetch } = fetch;
const { Button, Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const tabsModal = useTabsModal();
  return <Space wrap>
    <TabsModal open={open} onClose={() => {
      setOpen(false);
    }} items={[{
      label: "项目概述", key: "overview", children: <div>项目基本信息、目标、时间计划和关键里程碑，帮助团队了解项目全貌</div>
    }, {
      label: "任务分配", key: "tasks", children: <div>项目任务分解、责任人分配、进度跟踪和优先级管理，确保项目按计划推进</div>
    }]} rightOptions={<div>快速操作面板：常用功能的快捷入口，提高操作效率</div>}>
      <div>选项卡弹窗主内容区域：展示多标签页的详细信息，支持在不同标签间切换查看</div>
    </TabsModal>
    <Button onClick={() => {
      setOpen(true);
    }}>组件调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        rightOptions: <div>快捷操作：创建任务、分配成员、设置提醒</div>, items: [{
          label: "项目文档", key: "documents", children: <div>项目相关文档、合同、技术资料等文件的管理和查看</div>
        }, {
          label: "团队协作", key: "collaboration", children: <div>团队成员沟通记录、会议纪要、讨论内容等协作信息</div>
        }]
      });
    }}>hooks调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        title: "此title不展示",
        rightOptions: ({ data }) => <Content list={data} />,
        withDecorator: (render) => <Fetch loader={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([{ label: "任务列表", content: "项目任务清单、完成状态、负责人和截止日期" }, {
                label: "进度报告", content: "项目进度百分比、已完成的任务、待办事项和风险提示"
              }]);
            }, 1000);
          });
        }} render={({ data }) => render({ data })} />,
        items: [{
          label: "任务管理", key: "tasks", children: ({ data }) => <Content list={data} col={2} />
        }, {
          withDecorator: (render) => <Fetch loader={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([{ label: "资源分配", content: "项目资源使用情况、预算消耗、人力配置" }, {
                  label: "风险跟踪", content: "项目风险列表、影响程度、应对措施和负责人"
                }]);
              }, 1000);
            });
          }} render={({ data }) => render({ tabData: data })} />,
          label: "资源与风险",
          key: "resources",
          children: ({ data, tabData }) => <Content list={[...data, ...tabData]} col={2} />
        }]
      });
    }}>复杂数据加载</Button>
  </Space>;
};

render(<PureGlobal><BaseExample /></PureGlobal>);
```

- ModalButton数据加载弹窗
- 展示ModalButton组件的用法，点击按钮加载数据后弹出弹窗
- _Modal(@components/Modal),global(@components/Global),antd(antd),_Content(@components/Content),_FormInfo(@components/FormInfo)

```jsx
const { ModalButton, TabsModalButton } = _Modal;
const { Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;
const { default: FormInfo, Input, TextArea } = _FormInfo;

const api = {
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: "客户基本信息", content: "客户公司名称、联系人、联系电话、地址等基础信息" },
          {
            label: "合作记录",
            content: "历史合作项目、合作金额、合作状态、合同到期时间等合作相关信息",
          },
        ]);
      }, 1000);
    });
  },
};

const BaseExample = () => {
  return (
    <Space wrap>
      <ModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            title: "加载数据的弹窗",
            children: <Content list={data} col={2} />,
          };
        }}
      >
        点击加载数据
      </ModalButton>
      <TabsModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            items: data.map(({ label, content }, index) => {
              return {
                key: index,
                children: content,
                label,
              };
            }),
          };
        }}
      >
        点击加载数据的Tabs弹窗
      </TabsModalButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- 业务场景示例
- 展示Modal组件在真实业务场景中的应用，包括用户管理、订单详情、产品多标签页和审批流程
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),antd(antd)

```jsx
const {default: Modal, useModal, TabsModal, useTabsModal, ModalButton, TabsModalButton} = _Modal;
const {default: FormInfo, useFormModal, fields} = _FormInfo;
const {useState, useCallback} = React;
const {
    Button,
    Space,
    message,
    Table,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Descriptions,
    Tag,
    Avatar,
    Card,
    List,
    Divider
} = antd;

// 用户管理弹窗示例
const UserManagementModalExample = () => {
    const formModal = useFormModal();

    const handleAddUser = () => {
        const modalApi = formModal({
            title: "添加用户",
            size: "large",
            formProps: {
                onSubmit: (data) => {
                    console.log("保存用户信息:", data);
                    
                    // 模拟API调用
                    message.success("用户信息保存成功");
                    modalApi.close();
                },
            },
            children: (<FormInfo
                list={[
                    <fields.Input name="username" label="用户名" rule="REQ"/>,
                    <fields.Input name="realName" label="真实姓名" rule="REQ"/>,
                    <fields.Input name="email" label="邮箱" rule="EMAIL"/>,
                    <fields.Input name="phone" label="手机号" rule="PHONE"/>,
                    <fields.Select 
                        name="department" 
                        label="部门" 
                        rule="REQ"
                        options={[
                            { label: "技术部", value: "tech" },
                            { label: "产品部", value: "product" },
                            { label: "设计部", value: "design" },
                            { label: "人力资源部", value: "hr" },
                        ]}
                    />,
                    <fields.DatePicker name="joinDate" label="入职日期" rule="REQ"/>,
                    <fields.TextArea name="remark" label="备注" />,
                ]}
            />),
        });
    };

    return (<Space direction="vertical" style={{width: '100%'}}>
        <Button type="primary" onClick={handleAddUser}>
            添加新用户
        </Button>
    </Space>);
};

// 订单详情弹窗示例
const OrderDetailModalExample = () => {
    const modal = useModal();

    const showOrderDetail = useCallback((orderId) => {
        // 模拟加载订单数据
        modal({
            title: &#96;订单详情 - #${orderId}&#96;, width: 800, withDecorator: (render) => {
                return (<div>
                    <div style={{background: '#f5f5f5', padding: '12px 16px', marginBottom: '16px'}}>
                        <Space>
                            <Tag color="blue">待发货</Tag>
                            <span>下单时间: 2023-06-15 14:30:22</span>
                        </Space>
                    </div>
                    {render()}
                </div>);
            }, children: () => {
                const orderData = {
                    id: orderId,
                    customer: '张三',
                    phone: '13800138000',
                    address: '北京市朝阳区xxx街道xxx号',
                    products: [{id: 1, name: '商品A', price: 299, quantity: 2}, {
                        id: 2, name: '商品B', price: 199, quantity: 1
                    }, {id: 3, name: '商品C', price: 99, quantity: 3},],
                    totalAmount: 994,
                    paymentMethod: '在线支付',
                    deliveryMethod: '快递配送',
                    remark: '请在工作日送达',
                };

                return (<div>
                    <Descriptions title="订单信息" bordered column={2}>
                        <Descriptions.Item label="订单号">{orderData.id}</Descriptions.Item>
                        <Descriptions.Item label="下单时间">2023-06-15 14:30:22</Descriptions.Item>
                        <Descriptions.Item label="收货人">{orderData.customer}</Descriptions.Item>
                        <Descriptions.Item label="联系电话">{orderData.phone}</Descriptions.Item>
                        <Descriptions.Item label="收货地址" span={2}>{orderData.address}</Descriptions.Item>
                        <Descriptions.Item label="支付方式">{orderData.paymentMethod}</Descriptions.Item>
                        <Descriptions.Item label="配送方式">{orderData.deliveryMethod}</Descriptions.Item>
                    </Descriptions>

                    <div style={{marginTop: 16}}>
                        <h4>商品清单</h4>
                        <Table
                            dataSource={orderData.products}
                            pagination={false}
                            columns={[{title: '商品名称', dataIndex: 'name', key: 'name'}, {
                                title: '单价(元)', dataIndex: 'price', key: 'price'
                            }, {title: '数量', dataIndex: 'quantity', key: 'quantity'}, {
                                title: '小计(元)',
                                key: 'subtotal',
                                render: (_, record) => record.price * record.quantity
                            },]}
                            summary={() => (<Table.Summary>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={3}>
                                        <strong>总计</strong>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        <strong>{orderData.totalAmount}元</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>)}
                        />
                    </div>

                    <div style={{marginTop: 16}}>
                        <h4>备注</h4>
                        <p>{orderData.remark}</p>
                    </div>
                </div>);
            }, footerButtons: [{
                children: '打印订单', onClick: () => message.info("打印功能待实现"),
            }, {
                children: '发货', type: 'primary', onClick: async () => {
                    try {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        message.success("订单已发货");
                    } catch (error) {
                        message.error("发货失败，请重试");
                    }
                },
            },],
        });
    }, [modal]);

    const orders = [{id: 'ORD20230615001', customer: '张三', amount: 299, status: 'pending'}, {
        id: 'ORD20230615002', customer: '李四', amount: 598, status: 'shipped'
    }, {id: 'ORD20230615003', customer: '王五', amount: 398, status: 'completed'},];

    const statusMap = {
        pending: {text: '待发货', color: 'orange'},
        shipped: {text: '已发货', color: 'blue'},
        completed: {text: '已完成', color: 'green'},
    };

    return (<Card title="订单列表" size="small">
        <Table
            dataSource={orders}
            pagination={false}
            columns={[{title: '订单号', dataIndex: 'id', key: 'id'}, {
                title: '客户', dataIndex: 'customer', key: 'customer'
            }, {title: '金额', dataIndex: 'amount', key: 'amount'}, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (<Tag color={statusMap[status]?.color}>
                    {statusMap[status]?.text}
                </Tag>),
            }, {
                title: '操作',
                key: 'action',
                render: (_, record) => (<Button type="link" onClick={() => showOrderDetail(record.id)}>
                    查看详情
                </Button>),
            },]}
        />
    </Card>);
};

// 审批流程弹窗示例
const ApprovalProcessModalExample = () => {
    const modal = useModal();

    const showApprovalModal = useCallback((requestId) => {
        modal({
            title: "审批申请", width: 700, withDecorator: (render) => {
                return (<div>
                    <div style={{
                        background: '#f0f8ff', padding: '12px 16px', marginBottom: '16px', border: '1px solid #91d5ff'
                    }}>
                        <Space direction="vertical" size="small">
                            <div><strong>申请编号:</strong> {requestId}</div>
                            <div><strong>申请时间:</strong> 2023-06-15 09:30:00</div>
                            <div><strong>申请人:</strong> 张三 (技术部)</div>
                        </Space>
                    </div>
                    {render()}
                </div>);
            }, children: () => {
                return (<div>
                    <Descriptions title="申请信息" bordered column={2}>
                        <Descriptions.Item label="申请类型">费用报销</Descriptions.Item>
                        <Descriptions.Item label="申请金额">¥2,580.00</Descriptions.Item>
                        <Descriptions.Item label="费用类型">差旅费</Descriptions.Item>
                        <Descriptions.Item label="发生时间">2023-06-10 至 2023-06-12</Descriptions.Item>
                        <Descriptions.Item label="费用明细" span={2}>
                            <div>交通费: ¥800.00</div>
                            <div>住宿费: ¥1,200.00</div>
                            <div>餐饮费: ¥580.00</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="申请原因" span={2}>
                            前往上海参加技术交流会议，包含交通、住宿和餐饮费用。
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider/>

                    <div>
                        <h4>审批流程</h4>
                        <List
                            dataSource={[{
                                title: '部门经理审批',
                                name: '李经理',
                                status: 'completed',
                                time: '2023-06-15 10:15:00',
                                remark: '同意申请'
                            }, {
                                title: '财务审批',
                                name: '王会计',
                                status: 'completed',
                                time: '2023-06-15 14:30:00',
                                remark: '费用明细清晰，同意报销'
                            }, {
                                title: '总经理审批', name: '赵总', status: 'pending', time: '-', remark: '待审批'
                            },]}
                            renderItem={(item) => (<List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        style={{backgroundColor: item.status === 'completed' ? '#52c41a' : '#faad14'}}>
                                        {item.name[0]}
                                    </Avatar>}
                                    title={<Space>
                                        {item.title}
                                        <Tag color={item.status === 'completed' ? 'green' : 'orange'}>
                                            {item.status === 'completed' ? '已完成' : '待审批'}
                                        </Tag>
                                    </Space>}
                                    description={<div>
                                        <div>审批人: {item.name}</div>
                                        <div>审批时间: {item.time}</div>
                                        <div>审批意见: {item.remark}</div>
                                    </div>}
                                />
                            </List.Item>)}
                        />
                    </div>
                </div>);
            }, footerButtons: [{
                children: '打印申请', onClick: () => message.info("打印功能待实现"),
            }, {
                children: '驳回', onClick: () => message.success("申请已驳回"),
            }, {
                children: '批准', type: 'primary', onClick: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            message.success("申请已批准");
                            resolve();
                        }, 1000);
                    });
                },
            },],
        });
    }, [modal]);

    return (<Card title="审批列表" size="small">
        <Space direction="vertical" style={{width: '100%'}}>
            {[{
                id: 'REQ20230615001', type: '费用报销', applicant: '张三', amount: 2580, status: 'pending'
            }, {
                id: 'REQ20230615002', type: '请假申请', applicant: '李四', days: 3, status: 'approved'
            }, {
                id: 'REQ20230615003', type: '采购申请', applicant: '王五', amount: 15000, status: 'rejected'
            },].map((request) => (<Card key={request.id} size="small" style={{marginBottom: 8}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <div style={{fontWeight: 'bold', marginBottom: 4}}>{request.type}</div>
                        <div>申请人: {request.applicant}</div>
                        {request.amount && <div>金额: ¥{request.amount}</div>}
                        {request.days && <div>天数: {request.days}天</div>}
                        <div>
                            状态:
                            <Tag
                                color={request.status === 'pending' ? 'orange' : request.status === 'approved' ? 'green' : 'red'}>
                                {request.status === 'pending' ? '待审批' : request.status === 'approved' ? '已批准' : '已驳回'}
                            </Tag>
                        </div>
                    </div>
                    <Button type="primary" onClick={() => showApprovalModal(request.id)}>
                        处理审批
                    </Button>
                </div>
            </Card>))}
        </Space>
    </Card>);
};

const BusinessScenarioExamples = () => {
    return (<Space direction="vertical" style={{width: '100%'}} size="large">
        <UserManagementModalExample/>
        <OrderDetailModalExample/>
        <ApprovalProcessModalExample/>
    </Space>);
};

render(<BusinessScenarioExamples/>);
```

- 数据加载弹窗
- 展示使用withDecorator实现弹窗加载数据或加载远程组件的逻辑
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { default: Modal, useModal } = _Modal;
const { useState } = React;
const { Button, Space } = antd;
const { default: Fetch } = fetch;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  const modal = useModal();
  const [open, setOpen] = useState(false);
  return (
    <Space wrap>
      <Modal
        title="组件调用方式"
        withDecorator={(render) => (
          <Fetch
            loader={() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    {
                      label: "用户基本信息",
                      content: "展示用户的姓名、邮箱、部门等基础信息，用于身份识别和管理",
                    },
                    {
                      label: "联系信息",
                      content: "电话号码、地址、紧急联系人等通讯信息，便于工作沟通和紧急联络",
                    },
                  ]);
                }, 1000);
              });
            }}
            render={({ data }) => render({ data })}
          />
        )}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {({ data }) => <Content list={data} col={2} />}
      </Modal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用方式
      </Button>
      <Button
        onClick={() => {
          modal({
            title: "hooks调用方式",
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "订单详情",
                          content: "订单编号、下单时间、客户信息、订单状态等订单基本信息",
                        },
                        {
                          label: "支付信息",
                          content: "支付方式、支付时间、支付金额、交易流水号等支付相关信息",
                        },
                      ]);
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: ({ data }) => <Content list={data} col={2} />,
          });
        }}
      >
        hooks调用方式
      </Button>
      <Button
        onClick={() => {
          modal({
            title: (props) => {
              return "hooks调用方式";
            },
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "订单详情",
                          content: "订单编号、下单时间、客户信息、订单状态等订单基本信息",
                        },
                        {
                          label: "支付信息",
                          content: "支付方式、支付时间、支付金额、交易流水号等支付相关信息",
                        },
                      ]);
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: ({ data }) => <Content list={data} col={2} />,
          });
        }}
      >
        hooks title调用方式
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- 消息确认和提示
- 展示命令式调用的消息确认和提示功能
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { default: Modal, useConfirmModal } = _Modal;
const { useState } = React;
const { Button, Space, message } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const confirmModal = useConfirmModal();
  return (
    <Space wrap>
      <Button
        onClick={() => {
          confirmModal({
            danger: true,
            type: "confirm",
            title: "确定要删除该记录吗？",
            message:
              "此操作将永久删除该记录，相关数据将无法恢复。请确认是否继续删除操作？",
          });
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "confirm",
            confirmType: "warning",
            title: "确定要编辑此内容吗？",
            message:
              "编辑后需要重新提交审核，未保存的修改将丢失。请确认是否继续编辑？",
          });
        }}
      >
        confirm 警告
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            title: "操作提示",
            message:
              "该操作将更新系统配置，可能影响其他用户的使用。建议在非工作时间进行此操作。",
          });
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            message:
              "数据已保存成功，系统将在后台进行同步处理，请稍候查看处理结果。",
          });
        }}
      >
        info无标题
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "success",
            title: "操作成功",
            message:
              "恭喜！您的操作已成功完成。系统已发送通知邮件给相关团队成员。",
          });
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "warning",
            title: "操作警告",
            message:
              "检测到数据异常，继续操作可能导致数据不一致。建议先备份数据或联系技术支持。",
          });
        }}
      >
        warning
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "error",
            title: "操作失败",
            message:
              "系统处理出错，请检查网络连接或联系系统管理员。错误代码：ERR-500",
          });
        }}
      >
        error
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- childrenRef的使用
- 展示如何使用childrenRef获取弹窗内容的引用
- _Modal(@components/Modal),antd(antd)

```jsx
const { default: Modal, useModal } = _Modal;
const { Button } = antd;
const BaseExample = () => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        modal({
          title: "示例弹框",
          children: ({ childrenRef }) => {
            return (
              <div ref={childrenRef}>
                这是使用childrenRef的示例弹窗内容，展示了如何通过ref获取子组件的DOM引用。
              </div>
            );
          },
          onConfirm: (e, { childrenRef }) => {
            console.log(childrenRef.current);
          },
        });
      }}
    >
      点击弹出弹框
    </Button>
  );
};

render(<BaseExample />);

```

- 去掉内容区内边距
- 通过 noPadding 去掉 Modal Content 默认 padding，由内容区自行控制内边距
- _Modal(@components/Modal),antd(antd)

```jsx
const { default: Modal } = _Modal;
const { useState } = React;
const { Button, Space, message } = antd;

const NoPaddingModalExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开无内边距弹窗
      </Button>

      <Modal
        title="自定义内容区内边距"
        open={open}
        noPadding
        onClose={() => setOpen(false)}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        <div
          style={{
            padding: "16px 32px",
            background: "linear-gradient(180deg, #f5f7fa 0%, #ffffff 120px)",
          }}
        >
          <p>已通过 noPadding 去掉默认 Content 内边距。</p>
          <p>可在内容区内部自行控制 padding、背景和布局。</p>
        </div>
      </Modal>
    </Space>
  );
};

render(<NoPaddingModalExample />);

```

### API

#### Modal

| 属性名           | 说明                                                                                                                                      | 类型           | 默认值   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------|-------|
| footer        | 弹窗的footer，当其被显式设置成null且footerButtons没有设置过时弹窗不显示footer。当它类型为function时可以得到close方法和withDecorator设置的 props                                   | jsx,function | -     |
| footerButtons | 弹窗footer的按钮区，默认为确认和取消按钮，默认按钮分别响应onConfirm和onCancel方法，如果自定义设置footerButtons则需要自行传入onClick参数，onConfirm和onCancel方法将不生效                      | array        | -     |
| onClose       | 弹窗关闭时调用，弹窗受控时由该方法将外部open状态修改                                                                                                            | function     | -     |
| onConfirm     | 当footerButtons未自定义设置时点击确认按钮触发执行该方法，当其返回Promise点击后Promise，resolve之前确认按钮显示为loading状态，返回值为false或者Promise的resolve值为false时弹窗不会被关闭，其他情况弹窗默认关闭 | function     | -     |
| onCancel      | 和onConfirm类似，其为点击取消按钮触发                                                                                                                 | function     | -     |
| children      | 弹窗内容，可以为jsx或者function，为function时可以接收到close和withDecorator设置的 props                                                                        | jsx,function | -     |
| withDecorator | 弹窗修饰器，会接收到弹窗children的render方法，可以在其外部添加修饰内容后执行render方法，给render方法传入的值可以在children,footer,rightOptions类型为function时接收到对应的参数                  | function     | -     |
| rightOptions  | 弹窗右侧区域，和children类似可以为jsx或者function类型                                                                                                    | jsx,function | -     |
| maskClosable  | 点击蒙层是否允许关闭                                                                                                  | boolean      | false |
| noPadding     | 是否去掉 Modal Content（modal-body-inner）默认 padding，为 true 时可在内容区内部自行控制内边距                            | boolean      | false |

其他参数参考antd Modal组件

##### useModal

获取一个执行后可以弹出一个Modal组件的方法

###### 返回值:modal

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| modal | 执行后可以弹出一个Modal弹窗，参数同Modal组件参数 | function |

##### TabsModal

一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

| 属性名              | 说明                                                                                   | 类型           | 默认值 |
|------------------|--------------------------------------------------------------------------------------|--------------|-----|
| items            | 同antd Tabs的items参数                                                                   | array        | -   |
| items[].label    | 选项卡头显示文字                                                                             | string       | -   |
| items[].children | 选项卡头显示内容，和antd Tabs不同的是它可以是一个function和Modal的children类似可以接收items[].withDecorator传入的参数 | jsx,function | -   |
| items[].key      | 对应activeKey值                                                                         | string       | -   |
| items[].withDecorator | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| activeKey        | 当前激活 tab 面板的 key                                                                     | string       |     |
| withDecorator    | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey                                                        | string       |     |
| onChange         | 切换面板的回调                                                                              | function     |     |

##### useTabsModal

获取一个执行后可以弹出一个TabsModal组件的方法

###### 返回值:tabsModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| tabsModal | 执行后可以弹出一个TabsModal弹窗，参数同TabsModal组件参数 | function |

##### ModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Modal弹窗

| 属性名        | 说明                                                | 类型                                     | 默认值 |
|------------|---------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                             | object                                 | -   |
| modalProps | 同Modal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

##### TabsModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出TabsModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同TabsModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

##### useModal

获取一个执行后可以弹出一个Modal组件的方法

###### return:modal

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| modal | 执行后可以弹出一个Modal弹窗，参数同Modal组件参数 | function |

##### TabsModal

一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

| 属性名              | 说明                                                                                   | 类型           | 默认值 |
|------------------|--------------------------------------------------------------------------------------|--------------|-----|
| items            | 同antd Tabs的items参数                                                                   | array        | -   |
| items[].label    | 选项卡头显示文字                                                                             | string       | -   |
| items[].children | 选项卡头显示内容，和antd Tabs不同的是它可以是一个function和Modal的children类似可以接收items[].withDecorator传入的参数 | jsx,function | -   |
| items[].key      | 对应activeKey值                                                                         | string       | -   |
| activeKey        | 当前激活 tab 面板的 key                                                                     | string       |     |
| withDecorator    | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey                                                        | string       |     |
| onChange         | 切换面板的回调                                                                              | function     |     |

##### useTabsModal

获取一个执行后可以弹出一个TabsModal组件的方法

###### return:tabsModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| tabsModal | 执行后可以弹出一个TabsModal弹窗，参数同TabsModal组件参数 | function |

##### ModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Modal弹窗

| 属性名        | 说明                                                | 类型                                     | 默认值 |
|------------|---------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                             | object                                 | -   |
| modalProps | 同Modal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

##### TabsModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出TabsModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同TabsModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

# Navigation

### 概述

#### 概述

Navigation 是一个基于 Ant Design Menu 组件的顶部导航栏组件，支持权限控制、响应式布局和自定义配置。适用于需要顶部导航的各种应用场景。

#### 何时使用

系统的顶部导航，一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

#### 特点

* 集成了Permissions权限判断，可以通过权限列表来判断导航项是否显示 
* 在屏幕显示不了全部的一级导航时可以自动将后面的导航项收起到更多下拉菜单里面
* 支持自定义导航项点击处理和路由跳转
* 自动更新页面标题，基于当前导航项配置

### 示例(全屏)

#### 示例样式

```scss
.fold-items{
  width: 600px;
}
```

#### 示例代码

- 基础导航
- 展示Navigation组件的基本用法，包括基础导航和权限控制
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

render(
  <PureGlobal>
    <Navigation
      list={menuList}
      isFixed={false}
      permissions={[
        "client:client:look",
        "jd:job:look",
        "cv:cv:look",
        "contract:mgr:look",
        "payment:mgr:look",
        "client:invoice:center",
        "client:invoice:manager",
        "system:permissions:mgr",
      ]}
    />
  </PureGlobal>
);

```

- 导航功能特性
- 展示Navigation组件的各种功能特性，包括权限控制、自定义右侧选项、图标和标题
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Card, Space, Avatar, Button, Dropdown, Badge } = antd;
const { UserOutlined, SettingOutlined, BellOutlined, DownOutlined } = antd.icons;
const { useState } = React;

// 基础导航示例
const BasicNavigationExample = () => {
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
    },
    {
      key: "customers",
      title: "客户管理",
      path: "/customers",
    },
  ];

  return (
    <Card title="基础导航" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
      />
    </Card>
  );
};

// 带权限控制的导航示例
const PermissionNavigationExample = () => {
  const [userPermissions, setUserPermissions] = useState([
    "dashboard:view",
    "products:view",
    "orders:view"
  ]);
  
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
      permission: "dashboard:view",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
      permission: "products:view",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
      permission: "orders:view",
    },
    {
      key: "customers",
      title: "客户管理",
      path: "/customers",
      permission: "customers:view",
    },
    {
      key: "settings",
      title: "系统设置",
      path: "/settings",
      permission: (permissions) => permissions.some(p => p.includes("admin")),
    },
  ];

  const userMenuItems = [
    {
      key: "admin-permissions",
      label: "管理员权限",
      onClick: () => {
        setUserPermissions([
          "dashboard:view",
          "products:view",
          "orders:view",
          "customers:view",
          "admin:full"
        ]);
      },
    },
    {
      key: "user-permissions",
      label: "普通用户权限",
      onClick: () => {
        setUserPermissions([
          "dashboard:view",
          "products:view",
          "orders:view"
        ]);
      },
    },
  ];

  return (
    <Card title="权限控制导航" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft">
          <Button>切换用户权限</Button>
        </Dropdown>
        <Navigation
          list={menuList}
          isFixed={false}
          permissions={userPermissions}
        />
      </Space>
    </Card>
  );
};

// 自定义右侧选项的导航示例
const CustomOptionsNavigationExample = () => {
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
    },
  ];

  const rightOptions = (
    <Space size="middle">
      <Badge count={5} size="small">
        <Button type="text" icon={<BellOutlined />} />
      </Badge>
      <Avatar icon={<UserOutlined />} />
      <Dropdown menu={{ 
        items: [
          { key: 'profile', label: '个人资料' },
          { key: 'settings', label: '系统设置' },
          { key: 'logout', label: '退出登录' },
        ]
      }}>
        <Button type="text" icon={<DownOutlined />} />
      </Dropdown>
    </Space>
  );

  return (
    <Card title="自定义右侧选项" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
        rightOptions={rightOptions}
      />
    </Card>
  );
};

// 带图标的导航示例
const IconNavigationExample = () => {
  const { DashboardOutlined, ShoppingOutlined, FileTextOutlined, TeamOutlined } = antd.icons;
  
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
      icon: <ShoppingOutlined />,
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
      icon: <FileTextOutlined />,
    },
    {
      key: "customers",
      title: "客户管理",
      path: "/customers",
      icon: <TeamOutlined />,
    },
  ];

  return (
    <Card title="带图标导航" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
      />
    </Card>
  );
};

// 自定义标题的导航示例
const CustomTitleNavigationExample = () => {
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
    },
  ];

  return (
    <Card title="自定义标题" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
        defaultTitle="企业管理系统"
      />
    </Card>
  );
};

const NavigationFeaturesExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <BasicNavigationExample />
      <PermissionNavigationExample />
      <CustomOptionsNavigationExample />
      <IconNavigationExample />
      <CustomTitleNavigationExample />
    </Space>
  );
};

render(<NavigationFeaturesExample />);
```

- 折叠导航
- 展示Navigation组件在空间不足时的折叠功能
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

render(
  <PureGlobal>
    <div className="fold-items">
      <Navigation
        isFixed={false}
        list={menuList}
        permissions={[
          "client:client:look",
          "jd:job:look",
          "cv:cv:look",
          "contract:mgr:look",
          "payment:mgr:look",
          "client:invoice:center",
          "client:invoice:manager",
          "system:permissions:mgr",
        ]}
      />
    </div>
  </PureGlobal>
);

```

- 权限控制
- 展示Navigation组件的权限控制功能
- _Navigation(@components/Navigation),antd(antd),global(@components/Global)

```jsx
const { useState } = React;
const { PureGlobal } = global;
const { default: Navigation } = _Navigation;
const { Checkbox, Space } = antd;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

const Example = () => {
  const [permissions, setPermissions] = useState([]);
  return (
    <PureGlobal>
      <Space className="container" direction="vertical" size={32}>
        <Navigation isFixed={false} list={menuList} permissions={permissions} />
        <Checkbox.Group
          value={permissions}
          options={[
            "client:client:look",
            "jd:job:look",
            "cv:cv:look",
            "contract:mgr:look",
            "payment:mgr:look",
            "client:invoice:center",
            "client:invoice:manager",
            "system:permissions:mgr",
          ]}
          onChange={(values) => {
            setPermissions(values);
          }}
        />
      </Space>
    </PureGlobal>
  );
};

render(<Example />);

```

- 自定义配置
- 展示Navigation组件的自定义基础配置，包括base、headerLogo、indexLabel、rightOptions等属性
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Avatar, Badge, Dropdown, Space } = antd;

const menuList = [
  {
    key: "dashboard",
    title: "数据概览",
    path: "/dashboard",
    icon: <span style={{ fontSize: 16 }}>📊</span>,
  },
  {
    key: "project",
    title: "项目管理",
    path: "/project",
    icon: <span style={{ fontSize: 16 }}>📁</span>,
  },
  {
    key: "contract",
    title: "合同管理",
    path: "/contract",
    icon: <span style={{ fontSize: 16 }}>📄</span>,
  },
  {
    key: "invoice",
    title: "发票管理",
    path: "/invoice",
    icon: <span style={{ fontSize: 16 }}>🧾</span>,
  },
  {
    key: "approval",
    title: "审批中心",
    path: "/approval",
    icon: <span style={{ fontSize: 16 }}>✅</span>,
  },
  {
    key: "report",
    title: "报表分析",
    path: "/report",
    icon: <span style={{ fontSize: 16 }}>📈</span>,
  },
];

const CustomConfigExample = () => {
  return (
    <PureGlobal>
      <Navigation
        base="/app"
        className="custom-navigation"
        defaultTitle="企业管理系统"
        headerLogo={{
          src: "https://api.dicebear.com/7.x/icons/svg?seed=company",
          width: 32,
          height: 32,
        }}
        indexLabel="🏠 首页"
        isFixed={false}
        list={menuList}
        showIndex={true}
        permissions={[
          "dashboard:view",
          "project:view",
          "contract:view",
          "invoice:view",
          "approval:view",
          "report:view",
        ]}
        rightOptions={
          <Space size="middle">
            <Badge count={5}>
              <span style={{ fontSize: 18, cursor: "pointer" }}>🔔</span>
            </Badge>
            <Dropdown
              menu={{
                items: [
                  { key: "profile", label: "个人设置" },
                  { key: "logout", label: "退出登录" },
                ],
              }}
            >
              <Avatar
                size="small"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=manager"
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </Space>
        }
      />
    </PureGlobal>
  );
};

render(<CustomConfigExample />);

```

- 导航事件
- 展示Navigation组件的导航事件处理，包括onChange回调和navigateTo自定义导航函数
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { message } = antd;

const menuList = [
  {
    key: "home",
    title: "首页",
    path: "/",
  },
  {
    key: "client",
    title: "客户管理",
    path: "/client",
    permission: "client:view",
  },
  {
    key: "project",
    title: "项目管理",
    path: "/project",
    permission: "project:view",
  },
  {
    key: "talent",
    title: "人才库",
    path: "/talent",
    permission: ["talent:view", "resume:view"],
  },
];

const NavigationEventsExample = () => {
  return (
    <PureGlobal>
      <Navigation
        list={menuList}
        isFixed={false}
        permissions={["client:view", "project:view", "talent:view", "resume:view"]}
        onChange={(path) => {
          message.success(&#96;导航到路径: ${path}&#96;);
        }}
        navigateTo={(path) => {
          message.info(&#96;自定义导航: ${path}&#96;);
        }}
      />
    </PureGlobal>
  );
};

render(<NavigationEventsExample />);

```

- 溢出指示器
- 展示Navigation组件的自定义溢出指示器和大量菜单项的处理
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Space } = antd;

const menuList = [
  { key: "home", title: "首页", path: "/" },
  { key: "module1", title: "业务模块一", path: "/module1" },
  { key: "module2", title: "业务模块二", path: "/module2" },
  { key: "module3", title: "业务模块三", path: "/module3" },
  { key: "module4", title: "业务模块四", path: "/module4" },
  { key: "module5", title: "业务模块五", path: "/module5" },
  { key: "module6", title: "业务模块六", path: "/module6" },
  { key: "module7", title: "业务模块七", path: "/module7" },
  { key: "module8", title: "业务模块八", path: "/module8" },
  { key: "module9", title: "业务模块九", path: "/module9" },
  { key: "module10", title: "业务模块十", path: "/module10" },
  { key: "module11", title: "业务模块十一", path: "/module11" },
  { key: "module12", title: "业务模块十二", path: "/module12" },
  { key: "module13", title: "业务模块十三", path: "/module13" },
  { key: "module14", title: "业务模块十四", path: "/module14" },
  { key: "module15", title: "业务模块十五", path: "/module15" },
];

const OverflowIndicatorExample = () => {
  return (
    <PureGlobal>
      <Navigation
        list={menuList}
        isFixed={false}
        showIndex={false}
        overflowedIndicator={
          <Space size={4}>
            <span>更多菜单</span>
            <span style={{ fontSize: 12 }}>▼</span>
          </Space>
        }
      />
    </PureGlobal>
  );
};

render(<OverflowIndicatorExample />);

```

- 移动端适配
- 展示Navigation组件在移动端设备上的响应式布局
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Space, Switch, Divider } = antd;

const menuList = [
  {
    key: "dashboard",
    title: "仪表盘",
    path: "/dashboard",
    icon: <span style={{ fontSize: 16 }}>📊</span>,
  },
  {
    key: "products",
    title: "产品管理",
    path: "/products",
    icon: <span style={{ fontSize: 16 }}>📦</span>,
  },
  {
    key: "orders",
    title: "订单管理",
    path: "/orders",
    icon: <span style={{ fontSize: 16 }}>📋</span>,
  },
  {
    key: "customers",
    title: "客户管理",
    path: "/customers",
    icon: <span style={{ fontSize: 16 }}>👥</span>,
  },
  {
    key: "settings",
    title: "系统设置",
    path: "/settings",
    icon: <span style={{ fontSize: 16 }}>⚙️</span>,
  },
];

const MobileResponsiveExample = () => {
  const [forceMobile, setForceMobile] = React.useState(undefined);

  return (
    <PureGlobal>
      <div style={{ maxWidth: '100%' }}>
        <div style={{ marginBottom: 16, padding: 16, background: '#f0f5ff' }}>
          <Space direction="vertical" size={12}>
            <div style={{ fontSize: 14, color: '#666' }}>
              <strong>移动端模式控制：</strong>
            </div>
            <Space>
              <span>自动检测（根据窗口宽度）</span>
              <Switch
                checked={forceMobile === true}
                onChange={(checked) => setForceMobile(checked)}
                checkedChildren="强制移动端"
                unCheckedChildren="自动"
              />
            </Space>
            <div style={{ fontSize: 12, color: '#999' }}>
              开启开关可强制切换到移动端布局，关闭则根据窗口宽度自动检测
            </div>
          </Space>
        </div>

        <Navigation
          list={menuList}
          isFixed={false}
          defaultTitle="企业管理系统"
          isMobile={forceMobile}
        />

        <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5' }}>
          <p>1. 调整浏览器窗口宽度至小于 768px，导航将自动切换为移动端模式</p>
          <p>2. 或者使用上方开关强制指定为移动端模式</p>
          <p>3. 在移动端模式下，导航菜单将显示为汉堡菜单，点击后从右侧滑出</p>
        </div>
      </div>
    </PureGlobal>
  );
};

render(<MobileResponsiveExample />);

```

- 强制移动端模式
- 展示如何通过isMobile属性强制指定导航栏的显示模式
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Space, Switch } = antd;
const { useState } = React;

const menuList = [
  {
    key: "dashboard",
    title: "仪表盘",
    path: "/dashboard",
    icon: <span style={{ fontSize: 16 }}>📊</span>,
  },
  {
    key: "products",
    title: "产品管理",
    path: "/products",
    icon: <span style={{ fontSize: 16 }}>📦</span>,
  },
  {
    key: "orders",
    title: "订单管理",
    path: "/orders",
    icon: <span style={{ fontSize: 16 }}>📋</span>,
  },
  {
    key: "customers",
    title: "客户管理",
    path: "/customers",
    icon: <span style={{ fontSize: 16 }}>👥</span>,
  },
  {
    key: "settings",
    title: "系统设置",
    path: "/settings",
    icon: <span style={{ fontSize: 16 }}>⚙️</span>,
  },
];

const ForceMobileExample = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <PureGlobal>
      <div style={{ maxWidth: '100%' }}>
        <div style={{ marginBottom: 16, padding: 16, background: '#f0f5ff' }}>
          <Space direction="vertical" size={12}>
            <div style={{ fontSize: 14, color: '#666' }}>
              <strong>强制移动端模式：</strong>
            </div>
            <Switch
              checked={isMobile}
              onChange={setIsMobile}
              checkedChildren="开启移动端"
              unCheckedChildren="桌面端"
            />
            <div style={{ fontSize: 12, color: '#999' }}>
              通过 <code>isMobile</code> 属性可以强制指定导航栏的显示模式
            </div>
          </Space>
        </div>

        <Navigation
          list={menuList}
          isFixed={false}
          defaultTitle="企业管理系统"
          isMobile={isMobile}
        />

        <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5' }}>
          <p>点击上方开关可以强制切换导航栏的显示模式：</p>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>关闭开关：显示桌面端水平菜单</li>
            <li>打开开关：显示移动端汉堡菜单（点击后显示下拉菜单）</li>
          </ul>
          <p style={{ marginTop: 8, color: '#666' }}>
            注意：当不指定 <code>isMobile</code> 属性时，组件会根据窗口宽度自动检测
          </p>
        </div>
      </div>
    </PureGlobal>
  );
};

render(<ForceMobileExample />);

```

### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|base|导航基础路径|string|-|
|className|自定义类名|string|-|
|defaultTitle|默认页面标题|string|-|
|headerLogo|导航栏Logo配置|object|内置logo|
|indexLabel|首页导航标签|string|ReactNode|首页|
|isFixed|是否固定在页面顶部|boolean|true|
|list|导航菜单项配置|array|-|
|navigateTo|自定义导航函数|function|-|
|onChange|导航切换回调|function|-|
|overflowedIndicator|导航项溢出时的指示器|ReactNode|默认"更多"下拉|
|permissions|当前用户的权限列表|array|-|
|rightOptions|导航栏右侧区域内容|ReactNode|-|
|showIndex|是否显示首页导航|boolean|true|

#### list项配置

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|key|导航项唯一标识|string|-|
|title|导航项显示标题|string|ReactNode|-|
|path|导航项路径|string|function|-|
|permission|权限控制，可以是字符串、数组或函数|string|array|function|-|
|icon|导航项图标|ReactNode|-|

# Permissions

### 概述

#### 概述

Permissions 是一个权限控制组件，用于根据用户权限控制页面内容的显示。支持多种权限控制方式和展示形式，适用于各种需要权限控制的场景。

#### 何时使用

在系统中存在一些功能和操作只允许某些角色用户使用，使用该组件可以让其包裹的组件或者区域根据系统的权限列表配置展示不同的状态

#### 特点

通过在Global中的preset中设置permissions作为当前用户的权限列表，在Permissions组件配置permissions作为该功能要求具备的权限项，当要求具备的权限项全部在用户的权限列表中找到时为权限通过状态否则为权限不通过状态

当权限不通过时，Permissions组件可以有三种方式呈现：

1. 用户可以看到操作功能的组件显示，但是不能进行操作，在鼠标移入时会以ToolTip提示错误原因，一般用在按钮等需要用户交互的功能位置
2. 用户不能看到操作功能或者数据呈现，对应区域显示错误原因，一般用在要数据展示等场景
3. 隐藏内部组件，一般用在不需要干扰到用户或用户不需要了解其没有权限的功能或数据等场景

#### 高级特性

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

#### Hooks

##### usePermissions

获取当前用户的权限列表

```javascript
const { permissions } = usePermissions();
```

##### usePermissionsPass

检查是否拥有指定权限

```javascript
const isPass = usePermissionsPass({ request: ['user:view'] });
```

#### 工具函数

##### computedIsPass

计算权限验证结果

```javascript
const isPass = computedIsPass({ 
  permissions: ['user:view', 'user:edit'], 
  request: ['user:view'] 
});
```

# StateBar

### 概述

#### 概述

StateBar 是一个基于 Ant Design Tabs 组件的状态栏组件，支持多种展示类型（tab、radio、step），适用于需要状态切换和流程展示的场景。

#### 何时使用

当需要在页面中展示不同状态的选项卡或步骤流程时使用，例如：
- 数据列表的状态筛选（全部、待处理、已完成等）
- 表单或流程的步骤展示
- 选项卡切换界面

#### 特点

* 支持三种展示类型：tab（标签页）、radio（单选）、step（步骤）
* 可自定义样式和尺寸（small、default、large）
* 支持底部线条延展效果（isInner 属性）
* 可添加额外内容在状态栏右侧
* 基于 Ant Design Tabs，兼容其大部分属性


### 示例

#### 示例代码

- 基础状态栏
- 展示StateBar组件的基础用法，包括不同类型和尺寸的配置
- _StateBar(@components/StateBar),antd(antd)

```jsx
const { default: StateBar } = _StateBar;
const { Button, Radio, Space } = antd;
const { useState } = React;

const BaseExample = () => {
  const [size, setSize] = useState("default");
  const [isInner, setIsInner] = useState(false);
  return (
    <Space direction="vertical">
      <Radio.Group
        value={isInner}
        options={[
          { label: "inner", value: true },
          { label: "normal", value: false },
        ]}
        onChange={(e) => {
          setIsInner(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
      />
      <Radio.Group
        value={size}
        options={[
          { label: "small", value: "small" },
          { label: "default", value: "default" },
          { label: "large", value: "large" },
        ]}
        onChange={(e) => {
          setSize(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
      />
      <StateBar
        size={size}
        isInner={isInner}
        stateOption={[
          { tab: "全部", key: "1" },
          { tab: "科目一", key: "2" },
          {
            tab: "科目二",
            key: "3",
          },
          { tab: "科目三", key: "4" },
          { tab: "科目四", key: "5" },
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- Radio类型状态栏
- 展示StateBar组件的radio类型，适合选项较多的场景
- _StateBar(@components/StateBar),antd(antd)

```jsx
const { default: StateBar } = _StateBar;
const { Radio, Space } = antd;
const { useState } = React;

const BaseStateExample = () => {
  const [size, setSize] = useState("default");
  return (
    <Space direction="vertical">
      <Radio.Group
        value={size}
        options={[
          { label: "small", value: "small" },
          { label: "default", value: "default" },
          { label: "large", value: "large" },
        ]}
        onChange={(e) => {
          setSize(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
      />
      <StateBar
        size={size}
        type="radio"
        stateOption={[
          { tab: "全部", key: "1" },
          { tab: "科目一", key: "2" },
          { tab: "科目二", key: "3" },
          { tab: "科目三", key: "4" },
          { tab: "科目四", key: "5" },
          { tab: "科目一1", key: "22" },
          { tab: "科目二2", key: "33" },
          { tab: "科目三3", key: "44" },
          { tab: "科目四4", key: "55", style: { cursor: "copy" } },
        ]}
      />
    </Space>
  );
};

render(<BaseStateExample />);

```

- Step类型状态栏
- 展示StateBar组件的step类型，适合展示流程步骤
- _StateBar(@components/StateBar)

```jsx
const { default: StateBar } = _StateBar;

const BaseStateExample = () => {
  return (
    <StateBar
      type="step"
      stateOption={[
        { tab: "全部", key: "1" },
        { tab: "科目一", key: "2" },
        { tab: "科目二", key: "3" },
        { tab: "科目三", key: "4" },
        { tab: "科目四", key: "5" },
        { tab: "科目一1", key: "22" },
        { tab: "科目二2", key: "33" },
        { tab: "科目三3", key: "44" },
        { tab: "科目四4", key: "55", className: "last" },
      ]}
      tabBarExtraContent={<div>测试</div>}
    />
  );
};

render(<BaseStateExample />);

```

- 受控模式
- 展示StateBar组件的受控模式，包括activeKey和onChange事件的使用
- _StateBar(@components/StateBar),antd(antd)

```jsx
const { default: StateBar } = _StateBar;
const { Button, Card, Space, Tag } = antd;
const { useState } = React;

const ControlledModeExample = () => {
  const [activeKey, setActiveKey] = useState("1");
  
  const stateOption = [
    { key: "1", tab: "待处理" },
    { key: "2", tab: "处理中" },
    { key: "3", tab: "待审核" },
    { key: "4", tab: "已完成" },
    { key: "5", tab: "已拒绝" },
  ];
  
  const statusData = {
    "1": { count: 15, color: "orange", description: "等待处理的工单" },
    "2": { count: 8, color: "blue", description: "正在处理的工单" },
    "3": { count: 5, color: "purple", description: "等待审核的工单" },
    "4": { count: 128, color: "green", description: "已完成的工单" },
    "5": { count: 3, color: "red", description: "已拒绝的工单" },
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="工单状态管理" style={{ width: "100%" }}>
        <StateBar
          type="tab"
          activeKey={activeKey}
          stateOption={stateOption}
          onChange={handleTabChange}
          tabBarExtraContent={
            <Button type="primary" size="small">
              新建工单
            </Button>
          }
        />
        
        <Card style={{ marginTop: 20 }}>
          <Space direction="vertical" size="middle">
            <div>
              <Tag color={statusData[activeKey].color}>
                {stateOption.find(item => item.key === activeKey)?.tab}
              </Tag>
              <span style={{ marginLeft: 8 }}>数量: {statusData[activeKey].count} 个</span>
            </div>
            <div>
              <strong>状态描述:</strong> {statusData[activeKey].description}
            </div>
            <div>
              <strong>当前选中:</strong> {activeKey}
            </div>
          </Space>
        </Card>
      </Card>
      
      <Card title="快速切换" style={{ width: "100%" }}>
        <Space wrap>
          {stateOption.map(item => (
            <Button
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              type={activeKey === item.key ? "primary" : "default"}
            >
              切换到: {item.tab}
            </Button>
          ))}
        </Space>
      </Card>
    </Space>
  );
};

render(<ControlledModeExample />);

```

### API

| 属性名                | 说明               | 类型                      | 默认值                             |
|--------------------|------------------|-------------------------|---------------------------------|
| stateOption        | state操作列表        | string                  | {key: string, tab: ReactNode}[] |
| activeKey          | 当前激活 tab 面板的 key | string                  | -                               |
| type               | 当前tab展示样式        | 'tab'、'radio'、'step'    | 'tab'                           |
| onChange           | 事件返回选中的key       | (value: string) => void |                                 |
| tabBarExtraContent | 展示在state bar右侧   | ReactNode               | null                            |
| isInner            | 底部线延展至总长         | boolean                 | false                           |

#### Mapping
##### stateOption

| 属性名                 | 说明                | 类型                     | 默认值                |
|-----------------------|--------------------|-------------------------|-----------------------|
| key           | 对应 activeKey            | string                  | -                  |
| tab           | 	选项卡头显示文字            | ReactNode                 | -                  |

# StateTag

### 概述

#### 概述

StateTag 是一个状态标签组件，用于展示不同状态的数据。支持多种预设类型和自定义样式，适用于列表、详情页等场景的状态展示。

#### 何时使用

当需要展示数据的状态时使用，例如：
- 列表页表格中的状态列
- 详情页中的状态信息
- 筛选结果展示
- 技能标签展示

#### 特点

* 提供多种预设状态类型（info、success、progress、danger、default 等）
* 支持自定义边框和背景色
* 支持筛选结果标签（filterResult 类型）
* 可显示前置筛选名称（filterName 属性）
* 基于 Ant Design Tag，兼容其大部分属性

#### 使用场景

* **info**（蓝色 #155ACF）：待处理、待审核等状态
* **progress**（橙色 #F09700）：进行中、审核中等状态
* **success**（绿色 #027A48）：已完成、已通过等状态
* **danger**（红色 #D14343）：失败、拒绝、异常等状态
* **default**（灰色 #666666）：已取消、已关闭等状态
* **filterResult**（青色 #5CB8B2）：筛选结果标签
* **skill**（灰色 #666666）：技能标签，带特殊边框
* **result**（灰色 #666666）：下拉菜单、弹窗中的已选结果标签


### 示例(全屏)

#### 示例代码

- 基本示例
- 状态标签
- _StateTag(@components/StateTag),_Descriptions(@components/Descriptions),lodash(lodash),antd(antd)

```jsx
const { default: StateTag } = _StateTag;
const { default: Descriptions } = _Descriptions;
const { range } = lodash;
const { Space, Typography } = antd;

const BaseExample = () => {
  return (
    <div>
      <div>使用场景: 列表页Table,简历详情页</div>
      <br />
      <Descriptions
        dataSource={[
          [
            { label: "使用规则", content: "待XX，暂停" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "info", text: "待提交开票" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="info" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "XX中，正在XX中" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "progress", text: "退票审核中" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="progress" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "通过，成功，完成" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "success", text: "标签内容" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="success" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "不通过，失败，淘汰，缺席，拒绝" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "danger", text: "退票拒绝" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="danger" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "取消，撤销，停止" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "default", text: "撤销开票审核" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="default" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "（暂时还未用到）" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "other", text: "标签内容" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="other" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
        ]}
      />
      <br />
      <br />
      <div>个别特殊场景（需要单独询问UI):</div>
      <br />
      <Descriptions
        dataSource={[
          [
            { label: "使用规则", content: "待XX，暂停" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已推荐简历" }} />
                  <StateTag {...{ type: "success", text: "已退票" }} />
                </div>
              ),
            },
          ],
          [
            { label: "使用规则", content: "已XX待XX" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已开票待寄出" }} />
                  <StateTag {...{ type: "success", text: "已待寄待收款" }} />
                </div>
              ),
            },
          ],
          [
            {
              label: "使用规则",
              content: "已XX+词语：根据后面的词语语义进行判断",
            },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已成功" }} />
                  <StateTag {...{ type: "default", text: "已取消" }} />
                  <StateTag {...{ type: "danger", text: "已失败" }} />
                  <StateTag {...{ type: "progress", text: "已暂停" }} />
                </div>
              ),
            },
          ],
          [
            { label: "使用规则", content: "完全根据语义语境判断" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "全部到款" }} />
                  <StateTag {...{ type: "success", text: "部分到款" }} />
                  <StateTag {...{ type: "success", text: "简历亮点" }} />
                  <StateTag {...{ type: "danger", text: "简历风险点" }} />
                </div>
              ),
            },
          ],
        ]}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 技能标签示例
- 展示技能标签的使用，包括边框和背景的配置
- _StateTag(@components/StateTag)

```jsx
const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        text={"技能标签"}
        type={"skill"}
        showBorder
        showBackground={false}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 结果标签示例
- 展示下拉菜单、弹窗中已选结果标签的使用
- _StateTag(@components/StateTag)

```jsx
const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        text={"技能标签"}
        type={"result"}
        showBackground={false}
        closable
        onClose={() => console.log("close")}
      />
      <StateTag
        text={"技能标签"}
        type={"result"}
        closable
        onClose={() => console.log("close")}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 筛选结果标签
- 展示筛选组件中筛选结果标签的使用，包括filterName属性
- _StateTag(@components/StateTag)

```jsx
const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        filterName={"BD"}
        text={"陈枫林，王晓晨"}
        type={"filterResult"}
        closable
        onClose={() => console.log("close")}
      />
      <br />
      <StateTag
        filterName={"添加人"}
        text={"陈枫林，王晓晨，陈路，张力"}
        type={"filterResult"}
        closable
        onClose={() => console.log("close")}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 枚举状态标签
- 展示StateTagEnum组件的使用，从枚举数据自动生成状态标签
- _StateTag(@components/StateTag),antd(antd),global(@components/Global)

```jsx
const { StateTagEnum } = _StateTag;
const { PureGlobal } = global;
const { Space } = antd;

const BaseExample = ()=>{
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          testEnums: async ({ locale }) => {
            console.log(locale);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "1", description: "第一项", type: 'success' },
                  { value: "2", description: "第二项", type: 'danger' },
                  { value: "3", description: "第三项", type: 'info'},
                ]);
              }, 1000);
            });
          },
        },
      }}
    >
      <Space>
        <StateTagEnum moduleName="testEnums" name="1" />
        <StateTagEnum moduleName="testEnums" name="2" />
        <StateTagEnum moduleName="testEnums" name="3" />
      </Space>
    </PureGlobal>
  )
};

render(<BaseExample />);

```

- 边框背景组合
- 展示StateTag组件不同type下showBorder和showBackground属性的组合效果，以及Antd Tag的其他属性
- _StateTag(@components/StateTag),antd(antd)

```jsx
const { default: StateTag } = _StateTag;
const { Card, Divider, Space, Table, message } = antd;

const BorderBgCombinationsExample = () => {
  const types = [
    { key: "default", label: "默认", business: "已取消/已关闭" },
    { key: "skill", label: "技能", business: "技能标签" },
    { key: "result", label: "结果", business: "筛选结果" },
    { key: "filterResult", label: "筛选结果", business: "筛选条件" },
    { key: "success", label: "成功", business: "已通过/已完成" },
    { key: "progress", label: "进行中", business: "审核中/处理中" },
    { key: "danger", label: "危险", business: "已拒绝/已失败" },
    { key: "info", label: "信息", business: "待处理/待审核" },
    { key: "other", label: "其他", business: "其他状态" },
  ];

  const columns = [
    {
      title: "状态类型",
      dataIndex: "type",
      render: (_, record) => (
        <Space>
          <StateTag text={record.label} type={record.key} />
          <span>{record.label}</span>
        </Space>
      ),
    },
    {
      title: "无边框有背景（默认）",
      dataIndex: "noBorder",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={false} 
          showBackground={true} 
        />
      ),
    },
    {
      title: "有边框有背景",
      dataIndex: "withBorder",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={true} 
          showBackground={true} 
        />
      ),
    },
    {
      title: "有边框无背景",
      dataIndex: "borderNoBg",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={true} 
          showBackground={false} 
        />
      ),
    },
    {
      title: "业务场景示例",
      dataIndex: "businessExample",
      render: (_, record) => {
        const examples = {
          default: "已取消开票",
          skill: "React, Vue, JavaScript",
          result: "已选择: 5项",
          filterResult: "BD: 张三, 李四",
          success: "审核已通过",
          progress: "审核进行中",
          danger: "审核已拒绝",
          info: "待提交审核",
          other: "其他状态标签",
        };
        return (
          <StateTag 
            text={examples[record.key]} 
            type={record.key} 
            filterName={record.key === "filterResult" ? "BD" : undefined}
          />
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="状态标签边框与背景组合效果">
        <p>展示不同状态下边框和背景的组合效果，帮助选择最适合业务场景的配置。</p>
        <Table
          columns={columns}
          dataSource={types}
          rowKey="key"
          pagination={false}
          bordered
        />
      </Card>
      
      <Divider />
      
      <Card title="Ant Design Tag 其他属性展示">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <h4>可关闭标签:</h4>
            <Space wrap>
              <StateTag 
                text="可关闭的成功标签" 
                type="success" 
                closable 
                onClose={() => console.log("关闭了成功标签")}
              />
              <StateTag 
                text="可关闭的筛选结果" 
                type="filterResult" 
                filterName="部门"
                closable 
                onClose={() => console.log("关闭了筛选结果")}
              />
            </Space>
          </div>
          
          <div>
            <h4>可点击标签（带事件）:</h4>
            <Space wrap>
              <StateTag 
                text="点击查看详情" 
                type="info" 
                onClick={() => message.info("点击了信息标签")}
                style={{ cursor: "pointer" }}
              />
              <StateTag 
                text="查看进度" 
                type="progress" 
                onClick={() => message.info("点击了进度标签")}
                style={{ cursor: "pointer" }}
              />
            </Space>
          </div>
          
          <div>
            <h4>自定义样式:</h4>
            <Space wrap>
              <StateTag 
                text="圆角标签" 
                type="success" 
                style={{ borderRadius: 20 }}
              />
              <StateTag 
                text="大字号标签" 
                type="danger" 
                style={{ fontSize: 16, padding: "4px 12px" }}
              />
            </Space>
          </div>
        </Space>
      </Card>
      
      <Card title="实际业务场景示例">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <strong>项目状态:</strong>
            <Space>
              <StateTag text="项目立项" type="info" />
              <StateTag text="开发中" type="progress" />
              <StateTag text="测试阶段" type="progress" />
              <StateTag text="已上线" type="success" />
              <StateTag text="已暂停" type="default" />
            </Space>
          </div>
          
          <div>
            <strong>审批流程:</strong>
            <Space>
              <StateTag text="待提交" type="info" />
              <StateTag text="部门审核中" type="progress" />
              <StateTag text="财务审核中" type="progress" />
              <StateTag text="总经理审批中" type="progress" />
              <StateTag text="已通过" type="success" />
              <StateTag text="已拒绝" type="danger" />
            </Space>
          </div>
          
          <div>
            <strong>筛选条件:</strong>
            <Space>
              <StateTag text="北京分公司, 上海分公司" type="filterResult" filterName="分公司" />
              <StateTag text="技术部, 产品部" type="filterResult" filterName="部门" />
              <StateTag text="2024-01-01 至 2024-12-31" type="filterResult" filterName="日期范围" />
            </Space>
          </div>
          
          <div>
            <strong>技能标签:</strong>
            <Space>
              <StateTag text="React" type="skill" showBorder showBackground={false} />
              <StateTag text="Vue.js" type="skill" showBorder showBackground={false} />
              <StateTag text="JavaScript" type="skill" showBorder showBackground={false} />
              <StateTag text="TypeScript" type="skill" showBorder showBackground={false} />
              <StateTag text="Node.js" type="skill" showBorder showBackground={false} />
            </Space>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

render(<BorderBgCombinationsExample />);

```

### API

#### StateTag 属性

| 属性名            | 说明                            | 类型                                                                                                                                                                                             | 默认值       |
|----------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| type           | tag的类型，类型决定显示的颜色              | 'default'(#666666)、'skill'(#666666)(此时边框颜色为 #EEEEEE)、'success'(#027A48)、'progress'(#F09700)、'danger'(#D14343)、'info'(#155ACF)、'other'(#6740C3)(待定颜色)、'result'(#666666)、'filterResult'(#5CB8B2) | 'default' |
| showBorder     | 是否展示边框                        | boolean                                                                                                                                                                                        | false     |
| showBackground | 是否展示背景色                       | boolean                                                                                                                                                                                        | true      |
| text           | tag文案                         | string                                                                                                                                                                                         | ''        |
| filterName     | tag类型为"filterResult"时显示在前边的文案 | string                                                                                                                                                                                         | ''        |

其他参数参考 [antd Tag.Tag](https://ant.design/components/tag-cn)

#### StateTagEnum 属性

StateTagEnum 是基于 Enum 组件和 StateTag 组件的封装，用于从枚举数据中自动获取状态标签。

| 属性名        | 说明     | 类型     | 默认值 |
|------------|--------|--------|-----|
| moduleName | 枚举模块名称 | string | -   |
| name       | 枚举项名称  | string | -   |

其他属性继承自 StateTag 组件

# Table

### 概述

Table 组件是一个功能强大的数据表格组件，基于 Ant Design Table 二次封装，提供了丰富的列类型、列配置、排序、分组表头、操作列等高级功能。

组件支持两种使用方式：
- **Table**: 基础表格组件，适用于静态数据展示
- **TablePage**: 集成数据加载、分页、权限控制的完整表格解决方案

主要特性：
- 内置 16+ 种列类型（日期、编号、用户、标签、头像等）
- 支持列拖拽调整宽度、列显示/隐藏、列排序
- 支持分组表头
- 支持行选择（checkbox）
- 支持操作列（options）
- 支持本地存储列配置
- 支持自定义列渲染


### 示例(全屏)

#### 示例代码

- 基础表格 - 所有列类型展示
- 展示 Table 组件的 16+ 种列类型（日期、日期时间、短日期、日期范围、编号、短编号、用户、用户名、联系人、头像、标签、隐藏信息、敏感信息、单行文本、描述、其他等），演示 primary、hover、ellipsis、onClick 等常用列属性。业务场景：候选人面试管理系统。
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: {
            code: 0,
            data: &#96;{"date":{"visible":false},"serialNumber":{"width":400}}&#96;,
          },
        });
      } else if (config.url === "/api/v1/user/user/user_key_set") {
        console.log(config.data);
        resolve({
          data: {
            code: 0,
            data: "",
          },
        });
      }
    }, 100);
  });
};

preset({
  ajax,
});

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Table
        name="candidate-list"
        controllerOpen={true}
        dataSource={[
          {
            id: "CAND001",
            date: "2024-01-15",
            dateShort: "2024-01",
            dateRange: ["2024-01-15", "2024-03-20"],
            datetime: "2024-01-15 14:30:00",
            serialNumber: "CAND-2024-001-A001",
            serialNumberShort: "C001",
            userName: "张明",
            enUserName: "Zhang Ming",
            title: "高级前端工程师",
            department: "技术研发部",
            tagEnum: "Y",
            phoneNumber: "+86 13800138001",
            email: "zhangming@example.com",
            count: 5,
            description:
              "拥有8年前端开发经验，精通React、Vue等主流框架，曾主导多个大型项目的技术架构设计，具备优秀的团队协作能力和问题解决能力。",
            salary: "35K-45K",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZhangMing",
            gender: "M",
            age: 28,
            education: "硕士",
          },
          {
            id: "CAND002",
            date: "2024-01-18",
            dateShort: "2024-01",
            dateRange: ["2024-01-18", "2024-04-15"],
            datetime: "2024-01-18 09:15:00",
            serialNumber: "CAND-2024-002-B002",
            serialNumberShort: "C002",
            userName: "李婷",
            enUserName: "Li Ting",
            title: "产品经理",
            department: "产品设计部",
            tagEnum: null,
            phoneNumber: "+86 13900139002",
            email: "liting@example.com",
            count: 3,
            description: "资深产品经理，专注于B端产品设计和用户体验优化。",
            salary: "30K-40K",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LiTing",
            gender: "F",
            age: 26,
            education: "本科",
          },
          {
            id: "CAND003",
            date: "",
            dateShort: "2023-12",
            dateRange: null,
            datetime: "2024-01-20 16:45:00",
            serialNumber: "CAND-2024-003-C003",
            serialNumberShort: "C003",
            userName: "王强",
            enUserName: "Wang Qiang",
            title: "后端架构师",
            department: "技术研发部",
            tagEnum: "Y",
            phoneNumber: null,
            email: "wangqiang@example.com",
            count: 8,
            description: "10年后端开发经验，擅长微服务架构和分布式系统设计。",
            salary: "45K-60K",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WangQiang",
            gender: "M",
            age: 32,
            education: "博士",
          },
        ]}
        columns={[
          {
            name: "avatar",
            title: "头像",
            type: "avatar",
            valueOf: (item) => ({
              src: item.avatar,
              gender: item.gender,
            }),
          },
          {
            name: "serialNumber",
            title: "候选人编号",
            type: "serialNumber",
            primary: true,
            onClick: async (item) => {
              console.log("查看候选人详情:", item);
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true);
                }, 500);
              });
            },
          },
          {
            name: "serialNumberShort",
            title: "短编号",
            type: "serialNumberShort",
          },
          {
            name: "userName",
            title: "姓名",
            type: "userName",
          },
          {
            name: "user",
            title: "完整姓名",
            type: "user",
            valueOf: (item) => &#96;${item.enUserName} ${item.userName}&#96;,
          },
          {
            name: "title",
            title: "职位",
            type: "mainInfo",
          },
          {
            name: "department",
            title: "部门",
            type: "other",
          },
          {
            name: "date",
            title: "面试日期",
            type: "date",
            hover: true,
          },
          {
            name: "dateShort",
            title: "入职月份",
            type: "dateShort",
          },
          {
            name: "dateRange",
            title: "期望入职时间",
            type: "dateRange",
          },
          {
            name: "datetime",
            title: "面试时间",
            type: "datetime",
          },
          {
            name: "tagEnum",
            title: "状态",
            type: "tag",
            valueOf: (item) =>
              item.tagEnum
                ? {
                    type: "success",
                    isEnum: true,
                    moduleName: "marital",
                    name: item.tagEnum,
                  }
                : { type: "warning", text: "待审核" },
          },
          {
            name: "contacts",
            title: "联系方式",
            type: "contacts",
            valueOf: (item) =>
              item.phoneNumber
                ? &#96;${item.userName} ${item.phoneNumber}&#96;
                : item.email,
          },
          {
            name: "hideInfo",
            title: "手机号",
            type: "hideInfo",
            valueOf: (item) =>
              item.phoneNumber
                ? {
                    loader: () => {
                      return item.phoneNumber;
                    },
                  }
                : null,
          },
          {
            name: "salary",
            title: "期望薪资",
            type: "hideInfo",
            valueOf: (item) =>
              item.salary
                ? {
                    loader: () => {
                      return item.salary;
                    },
                  }
                : null,
          },
          {
            name: "count",
            title: "面试轮次",
            type: "singleRow",
          },
          {
            name: "age",
            title: "年龄",
            type: "otherSmall",
          },
          {
            name: "education",
            title: "学历",
            type: "otherSmall",
          },
          {
            name: "description",
            title: "简介",
            type: "description",
            ellipsis: true,
          },
          {
            name: "other",
            title: "备注",
            type: "otherLarge",
            render: ({ target }) => {
              return {
                children: &#96;候选人: ${target.userName}, ${target.title}&#96;,
              };
            },
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            valueOf: (item) => [
              {
                onClick: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      console.log("通过:", item.userName);
                      resolve();
                    }, 1000);
                  });
                },
                children: "通过",
                isDelete: false,
              },
              {
                onClick: () => {
                  console.log("安排面试:", item.userName);
                },
                children: "安排面试",
              },
              {
                onClick: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      console.log("淘汰:", item.userName);
                      resolve();
                    }, 500);
                  });
                },
                children: "淘汰",
                confirm: true,
                message: &#96;确定要淘汰候选人 ${item.userName} 吗？&#96;,
              },
            ],
          },
        ]}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 列配置详解
- 详细展示列配置的各种属性，包括 width、min、max 控制列宽，hidden 隐藏列，fixed 固定列，primary 主要字段标识，hover 效果，ellipsis 省略号等。业务场景：项目管理列表。
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: {
            code: 0,
            data: "{}",
          },
        });
      } else if (config.url === "/api/v1/user/user/user_key_set") {
        resolve({
          data: { code: 0, data: "" },
        });
      }
    }, 100);
  });
};

preset({ ajax });

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Table
        name="project-list"
        controllerOpen={true}
        dataSource={[
          {
            id: "PRJ001",
            projectName: "智慧城市管理平台",
            projectCode: "SMART-CITY-2024",
            department: "技术研发部",
            pm: "陈伟",
            status: "progress",
            budget: 1500000,
            progress: 65,
            startDate: "2024-01-01",
            endDate: "2024-06-30",
            priority: "high",
            teamSize: 12,
            description:
              "基于物联网和大数据技术的智慧城市综合管理平台，包含交通、环保、安防等多个子系统，实现城市运行状态的实时监控和智能调度。",
            tags: ["物联网", "大数据", "微服务"],
          },
          {
            id: "PRJ002",
            projectName: "电商营销活动系统",
            projectCode: "E-COMMERCE-MKT",
            department: "产品设计部",
            pm: "赵敏",
            status: "completed",
            budget: 800000,
            progress: 100,
            startDate: "2023-09-01",
            endDate: "2024-01-31",
            priority: "medium",
            teamSize: 8,
            description: "支持多种营销活动的配置和执行，包括优惠券、满减、秒杀等功能。",
            tags: ["电商", "营销", "活动"],
          },
          {
            id: "PRJ003",
            projectName: "移动端OA办公系统",
            projectCode: "MOBILE-OA",
            department: "技术研发部",
            pm: "刘洋",
            status: "pending",
            budget: 500000,
            progress: 0,
            startDate: "2024-03-01",
            endDate: "2024-08-31",
            priority: "low",
            teamSize: 6,
            description: "企业移动办公应用，支持审批、考勤、公告等日常办公功能。",
            tags: ["移动端", "OA", "审批"],
          },
          {
            id: "PRJ004",
            projectName: "数据中台建设",
            projectCode: "DATA-PLATFORM",
            department: "数据平台部",
            pm: "孙磊",
            status: "progress",
            budget: 2000000,
            progress: 45,
            startDate: "2024-02-01",
            endDate: "2024-12-31",
            priority: "high",
            teamSize: 15,
            description: "构建企业级数据中台，实现数据采集、存储、处理和分析的统一平台。",
            tags: ["数据中台", "数据治理", "BI"],
          },
        ]}
        columns={[
          {
            name: "projectCode",
            title: "项目编号",
            type: "serialNumber",
            primary: true,
            width: 200,
            min: 150,
            max: 300,
            fixed: "left",
          },
          {
            name: "projectName",
            title: "项目名称",
            type: "mainInfo",
            width: 280,
            hover: true,
            fixed: "left",
          },
          {
            name: "department",
            title: "所属部门",
            type: "other",
            width: 150,
            hidden: false,
          },
          {
            name: "pm",
            title: "项目经理",
            type: "userName",
            width: 120,
            min: 100,
            max: 200,
          },
          {
            name: "status",
            title: "状态",
            type: "tag",
            width: 120,
            valueOf: (item) => {
              const statusMap = {
                progress: { type: "processing", text: "进行中" },
                completed: { type: "success", text: "已完成" },
                pending: { type: "warning", text: "待启动" },
              };
              return statusMap[item.status];
            },
          },
          {
            name: "priority",
            title: "优先级",
            type: "tag",
            width: 100,
            valueOf: (item) => {
              const priorityMap = {
                high: { type: "error", text: "高" },
                medium: { type: "warning", text: "中" },
                low: { type: "default", text: "低" },
              };
              return priorityMap[item.priority];
            },
          },
          {
            name: "progress",
            title: "进度",
            type: "singleRow",
            width: 100,
            render: ({ target }) => {
              return {
                children: &#96;${target.progress}%&#96;,
                style: {
                  color:
                    target.progress === 100
                      ? "#52c41a"
                      : target.progress >= 50
                      ? "#1890ff"
                      : "#faad14",
                },
              };
            },
          },
          {
            name: "budget",
            title: "预算",
            type: "hideInfo",
            width: 150,
            valueOf: (item) => ({
              loader: () => {
                return &#96;¥${(item.budget / 10000).toFixed(1)}万&#96;;
              },
            }),
          },
          {
            name: "teamSize",
            title: "团队规模",
            type: "otherSmall",
            width: 100,
            hover: true,
          },
          {
            name: "startDate",
            title: "开始日期",
            type: "date",
            width: 160,
          },
          {
            name: "endDate",
            title: "结束日期",
            type: "date",
            width: 160,
          },
          {
            name: "dateRange",
            title: "项目周期",
            type: "dateRange",
            width: 280,
            valueOf: (item) => [item.startDate, item.endDate],
          },
          {
            name: "description",
            title: "项目描述",
            type: "description",
            width: 400,
            min: 200,
            max: 600,
            ellipsis: { showTitle: true },
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            width: 180,
            fixed: "right",
            valueOf: (item) => [
              {
                onClick: () => {
                  console.log("查看项目:", item.projectName);
                },
                children: "查看",
              },
              {
                onClick: () => {
                  console.log("编辑项目:", item.projectName);
                },
                children: "编辑",
                disabled: item.status === "completed",
                tooltipProps: {
                  title:
                    item.status === "completed" ? "已完成项目不可编辑" : "",
                },
              },
              {
                onClick: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      console.log("删除项目:", item.projectName);
                      resolve();
                    }, 500);
                  });
                },
                children: "删除",
                confirm: true,
                message: &#96;确定要删除项目 ${item.projectName} 吗？&#96;,
              },
            ],
          },
        ]}
        onTablePropsReady={({ columns, dataSource }) => {
          console.log("表格配置就绪:", { columns, dataSource });
        }}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- Table 高级功能
- 展示 Table 组件的高级功能：sticky 固定表头、stickyOffset 表头偏移、pagination 分页、summary 总结栏、scroll 滚动配置、controllerOpen 列控制开关、rowKey 自定义行键、className 自定义样式等。业务场景：订单管理系统。
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch),antd(antd)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;
const { Button, Space } = antd;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: { code: 0, data: "{}" },
        });
      } else if (config.url === "/api/v1/user/user/user_key_set") {
        resolve({
          data: { code: 0, data: "" },
        });
      }
    }, 100);
  });
};

preset({ ajax });

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h3>固定表头 + 分页 + 总结栏</h3>
          <Table
            name="order-management"
            sticky={true}
            stickyOffset="60px"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => &#96;共 ${total} 条记录&#96;,
            }}
            scroll={{ y: 400 }}
            controllerOpen={true}
            rowKey="orderId"
            className="custom-table-class"
            columnRenderProps={{
              currentUserId: "user_001",
            }}
            summary={(current) => {
              const { pageData } = current;
              const totalAmount = pageData.reduce(
                (sum, item) => sum + item.amount,
                0
              );
              return (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5}>
                      <strong>本页合计</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      <strong>¥{totalAmount.toFixed(2)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6} colSpan={2}>
                      <strong>
                        {pageData.length} 笔订单
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              );
            }}
            dataSource={[
              {
                orderId: "ORD202401150001",
                orderNo: "ORD-2024-0115-001",
                customer: "北京科技有限公司",
                product: "企业版SaaS订阅服务",
                quantity: 50,
                amount: 125000.0,
                status: "paid",
                createTime: "2024-01-15 10:30:00",
              },
              {
                orderId: "ORD202401150002",
                orderNo: "ORD-2024-0115-002",
                customer: "上海创新科技",
                product: "高级API调用套餐",
                quantity: 100000,
                amount: 89000.5,
                status: "paid",
                createTime: "2024-01-15 11:20:00",
              },
              {
                orderId: "ORD202401150003",
                orderNo: "ORD-2024-0115-003",
                customer: "深圳智能制造",
                product: "物联网设备管理平台",
                quantity: 1,
                amount: 350000.0,
                status: "pending",
                createTime: "2024-01-15 14:15:00",
              },
              {
                orderId: "ORD202401150004",
                orderNo: "ORD-2024-0115-004",
                customer: "广州贸易集团",
                product: "数据分析平台",
                quantity: 20,
                amount: 68000.0,
                status: "shipped",
                createTime: "2024-01-15 15:40:00",
              },
              {
                orderId: "ORD202401160001",
                orderNo: "ORD-2024-0116-001",
                customer: "杭州电商公司",
                product: "营销自动化工具",
                quantity: 30,
                amount: 45000.0,
                status: "paid",
                createTime: "2024-01-16 09:00:00",
              },
            ]}
            columns={[
              {
                name: "orderNo",
                title: "订单号",
                type: "serialNumber",
                primary: true,
                width: 200,
              },
              {
                name: "customer",
                title: "客户名称",
                type: "mainInfo",
                width: 200,
              },
              {
                name: "product",
                title: "产品",
                type: "other",
                width: 200,
              },
              {
                name: "quantity",
                title: "数量",
                type: "singleRow",
                width: 100,
              },
              {
                name: "amount",
                title: "金额",
                type: "other",
                width: 150,
                render: ({ target }) => ({
                  children: &#96;¥${target.amount.toFixed(2)}&#96;,
                }),
              },
              {
                name: "status",
                title: "状态",
                type: "tag",
                width: 120,
                valueOf: (item) => {
                  const statusMap = {
                    paid: { type: "success", text: "已支付" },
                    pending: { type: "warning", text: "待支付" },
                    shipped: { type: "processing", text: "已发货" },
                    cancelled: { type: "error", text: "已取消" },
                  };
                  return statusMap[item.status];
                },
              },
              {
                name: "createTime",
                title: "创建时间",
                type: "datetime",
                width: 190,
              },
            ]}
          />
        </div>

        <div>
          <h3>自定义行键 + 禁用列控制</h3>
          <Table
            name="simple-list"
            controllerOpen={false}
            rowKey={(record) => &#96;custom-key-${record.id}&#96;}
            dataSource={[
              { id: 1, name: "张三", role: "管理员", email: "zhangsan@example.com" },
              { id: 2, name: "李四", role: "编辑", email: "lisi@example.com" },
              { id: 3, name: "王五", role: "访客", email: "wangwu@example.com" },
            ]}
            columns={[
              { name: "name", title: "姓名", type: "userName" },
              { name: "role", title: "角色", type: "other", width: 120 },
              { name: "email", title: "邮箱", type: "other" },
            ]}
          />
        </div>

        <div>
          <h3>横向滚动表格</h3>
          <Table
            name="inventory-table"
            scroll={{ x: 1800 }}
            dataSource={[
              {
                id: "INV001",
                productCode: "SKU-2024-A001",
                productName: "智能手表Pro版",
                category: "智能穿戴",
                brand: "华为",
                spec: "42mm/午夜黑",
                color: "黑色",
                stockQty: 1250,
                inTransit: 300,
                warningQty: 200,
                costPrice: 899,
                retailPrice: 1299,
                supplier: "深圳华为供应链",
                warehouse: "A区-3层-15号",
                updateTime: "2024-01-15 14:30:00",
              },
              {
                id: "INV002",
                productCode: "SKU-2024-B002",
                productName: "无线降噪耳机",
                category: "音频设备",
                brand: "索尼",
                spec: "头戴式/银色",
                color: "银色",
                stockQty: 856,
                inTransit: 150,
                warningQty: 100,
                costPrice: 1599,
                retailPrice: 2299,
                supplier: "广州索尼授权经销商",
                warehouse: "B区-2层-08号",
                updateTime: "2024-01-15 12:20:00",
              },
              {
                id: "INV003",
                productCode: "SKU-2024-C003",
                productName: "机械键盘RGB版",
                category: "电脑配件",
                brand: "罗技",
                spec: "87键/青轴",
                color: "黑色",
                stockQty: 2340,
                inTransit: 500,
                warningQty: 300,
                costPrice: 399,
                retailPrice: 599,
                supplier: "东莞罗技工厂直供",
                warehouse: "C区-1层-22号",
                updateTime: "2024-01-15 16:45:00",
              },
            ]}
            columns={[
              {
                name: "productCode",
                title: "产品编号",
                type: "serialNumber",
                primary: true,
                fixed: "left",
                width: 150,
              },
              {
                name: "productName",
                title: "产品名称",
                type: "mainInfo",
                fixed: "left",
                width: 180,
              },
              {
                name: "category",
                title: "类别",
                type: "tag",
                width: 120,
                valueOf: (item) => {
                  const categoryMap = {
                    智能穿戴: { type: "processing", text: "智能穿戴" },
                    音频设备: { type: "success", text: "音频设备" },
                    电脑配件: { type: "warning", text: "电脑配件" },
                  };
                  return categoryMap[item.category];
                },
              },
              {
                name: "brand",
                title: "品牌",
                type: "other",
                width: 120,
              },
              {
                name: "spec",
                title: "规格",
                type: "other",
                width: 150,
              },
              {
                name: "color",
                title: "颜色",
                type: "otherSmall",
                width: 100,
              },
              {
                name: "stockQty",
                title: "库存数量",
                type: "singleRow",
                width: 120,
                render: ({ target }) => ({
                  children: target.stockQty,
                  style: {
                    color: target.stockQty < target.warningQty ? "#f5222d" : "#52c41a",
                    fontWeight: "bold",
                  },
                }),
              },
              {
                name: "inTransit",
                title: "在途数量",
                type: "singleRow",
                width: 120,
              },
              {
                name: "warningQty",
                title: "预警值",
                type: "singleRow",
                width: 100,
              },
              {
                name: "costPrice",
                title: "成本价",
                type: "other",
                width: 120,
                render: ({ target }) => ({
                  children: &#96;¥${target.costPrice}&#96;,
                }),
              },
              {
                name: "retailPrice",
                title: "零售价",
                type: "other",
                width: 120,
                render: ({ target }) => ({
                  children: &#96;¥${target.retailPrice}&#96;,
                }),
              },
              {
                name: "supplier",
                title: "供应商",
                type: "other",
                width: 180,
              },
              {
                name: "warehouse",
                title: "仓库位置",
                type: "other",
                width: 150,
              },
              {
                name: "updateTime",
                title: "更新时间",
                type: "datetime",
                width: 180,
              },
              {
                name: "options",
                title: "操作",
                type: "options",
                fixed: "right",
                width: 150,
                valueOf: (item) => [
                  {
                    onClick: () => {
                      console.log("查看详情:", item.productName);
                    },
                    children: "查看",
                  },
                  {
                    onClick: () => {
                      console.log("调整库存:", item.productName);
                    },
                    children: "调库",
                  },
                ],
              },
            ]}
          />
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- TablePage 分页表格
- 展示 TablePage 组件的完整功能：loader 数据加载（支持分页参数）、featureId 权限控制（自动隐藏指定列）、pagination 详细配置、dataFormat 数据格式化、columns 列配置、columnRenderProps 列渲染属性、summary 总结栏。业务场景：员工管理系统。
- _Table(@components/Table),lodash(lodash),_Global(@components/Global)

```jsx
const {PureGlobal} = _Global;
const {default: Table, TablePage} = _Table;
const {range} = lodash;

const BaseExample = () => {
    return (<PureGlobal
        preset={{
            features: {
                debug: true, profile: {
                    id: "employee-management", type: "system", name: "员工管理系统", children: [{
                        id: "employee-list", type: "feature", name: "员工列表", options: {
                            hiddenColumns: ["workYears", "education"],
                        },
                    },],
                },
            },
        }}
    >
        <TablePage
            featureId="employee-list"
            name="employee-table"
            pagination={{
                open: true,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showTotal: (total) => &#96;共 ${total} 名员工&#96;,
            }}
            dataFormat={(data) => {
                return {
                    list: data.pageData, total: data.totalCount, data,
                };
            }}
            loader={({data}) => {
                const {currentPage = 1, perPage = 20} = data || {};
                const startIndex = (currentPage - 1) * perPage;

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            pageData: range(startIndex, Math.min(startIndex + perPage, 156)).map((index) => ({
                                id: &#96;EMP${String(index + 1).padStart(4, "0")}&#96;,
                                employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, "0")}&#96;,
                                name: index % 3 === 0 ? &#96;张${["伟", "强", "敏", "磊", "杰"][index % 5]}&#96; : index % 3 === 1 ? &#96;李${["婷", "娜", "静", "丽", "娟"][index % 5]}&#96; : &#96;王${["刚", "磊", "勇", "涛", "鹏"][index % 5]}&#96;,
                                enName: index % 3 === 0 ? &#96;Zhang ${["Wei", "Qiang", "Min", "Lei", "Jie"][index % 5]}&#96; : index % 3 === 1 ? &#96;Li ${["Ting", "Na", "Jing", "Li", "Juan"][index % 5]}&#96; : &#96;Wang ${["Gang", "Lei", "Yong", "Tao", "Peng"][index % 5]}&#96;,
                                department: ["技术研发部", "产品设计部", "市场营销部", "人力资源部", "财务部"][index % 5],
                                position: ["工程师", "高级工程师", "经理", "总监", "专员"][index % 5],
                                status: index % 4 === 0 ? "active" : index % 4 === 1 ? "vacation" : index % 4 === 2 ? "resigned" : "probation",
                                email: &#96;employee${index + 1}@company.com&#96;,
                                phone: &#96;+86 138${String(index).padStart(8, "0")}&#96;,
                                joinDate: &#96;2023-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}&#96;,
                                workYears: Math.floor(index / 12) + 1,
                                salary: &#96;${15 + (index % 20)}K-${20 + (index % 20)}K&#96;,
                                education: ["本科", "硕士", "博士", "大专"][index % 4],
                                performance: ["A", "B", "C", "S"][index % 4],
                            })), totalCount: 156,
                        });
                    }, 300);
                });
            }}
            columns={[{
                name: "employeeNo", title: "工号", type: "serialNumber", primary: true, fixed: "left", width: 180,
            }, {
                name: "name", title: "姓名", type: "userName", fixed: "left", width: 120,
            }, {
                name: "enName", title: "英文名", type: "otherSmall", width: 120,
            }, {
                name: "department", title: "部门", type: "other", width: 150,
            }, {
                name: "position", title: "职位", type: "mainInfo", width: 180,
            }, {
                name: "status", title: "状态", type: "tag", width: 120, valueOf: (item) => {
                    const statusMap = {
                        active: {type: "success", text: "在职"},
                        vacation: {type: "warning", text: "休假"},
                        resigned: {type: "error", text: "离职"},
                        probation: {type: "processing", text: "试用期"},
                    };
                    return statusMap[item.status];
                },
            }, {
                name: "performance", title: "绩效", type: "tag", width: 100, valueOf: (item) => {
                    const perfMap = {
                        S: {type: "success", text: "S"},
                        A: {type: "processing", text: "A"},
                        B: {type: "warning", text: "B"},
                        C: {type: "error", text: "C"},
                    };
                    return perfMap[item.performance];
                },
            }, {
                name: "phone", title: "手机号", type: "hideInfo", width: 150, valueOf: (item) => ({
                    loader: () => item.phone,
                }),
            }, {
                name: "email",
                title: "邮箱",
                type: "contacts",
                width: 200,
                valueOf: (item) => &#96;${item.name} ${item.email}&#96;,
            }, {
                name: "joinDate", title: "入职日期", type: "date", width: 160,
            }, {
                name: "workYears", title: "工龄", type: "singleRow", width: 100, render: ({target}) => ({
                    children: &#96;${target.workYears}年&#96;,
                }),
            }, {
                name: "salary", title: "薪资范围", type: "hideInfo", width: 150, valueOf: (item) => ({
                    loader: () => item.salary,
                }),
            }, {
                name: "education", title: "学历", type: "otherSmall", width: 100,
            }, {
                name: "options", title: "操作", type: "options", fixed: "right", width: 200, valueOf: (item) => [{
                    onClick: () => {
                        console.log("查看员工:", item.name);
                    }, children: "查看",
                }, {
                    onClick: () => {
                        console.log("编辑员工:", item.name);
                    }, children: "编辑", disabled: item.status === "resigned", tooltipProps: {
                        title: item.status === "resigned" ? "离职员工不可编辑" : "",
                    },
                }, {
                    onClick: () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                console.log("导出数据:", item.name);
                                resolve();
                            }, 500);
                        });
                    }, children: "导出",
                },],
            },]}
            columnRenderProps={{
                currentUserId: "admin_001",
            }}
            summary={(current) => {
                const {pageData, data} = current;
                return (<Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={5}>
                            <strong>当前页统计</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5}>
                            <strong>{pageData.length} 人</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={6} colSpan={8}>
                            <strong>总员工数: {data?.totalCount || 0} 人</strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>);
            }}
        />
    </PureGlobal>);
};

render(<BaseExample/>);

```

- 行选择与批量操作
- 展示 useSelectedRow Hook 配合 getRowSelection、clearSelectedRows 实现多选与批量操作（批量审批、批量拒绝、批量导出、清空选择）。业务场景：请假审批系统。
- _Table(@components/Table),_Global(@components/Global),antd(antd)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { Button, Space, Typography, message } = antd;
const { Text } = Typography;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { code: 0, data: "{}" },
      });
    }, 100);
  });
};

const dataSource = [
  {
    id: "LEAVE001",
    employeeNo: "EMP-0001",
    employeeName: "张明",
    department: "技术研发部",
    leaveType: "年假",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    days: 5,
    reason: "春节回家探亲，需要提前返乡准备",
    status: "pending",
    applyTime: "2024-01-20 10:30:00",
  },
  {
    id: "LEAVE002",
    employeeNo: "EMP-0002",
    employeeName: "李婷",
    department: "产品设计部",
    leaveType: "事假",
    startDate: "2024-02-10",
    endDate: "2024-02-10",
    days: 1,
    reason: "个人事务处理",
    status: "pending",
    applyTime: "2024-01-22 14:15:00",
  },
  {
    id: "LEAVE003",
    employeeNo: "EMP-0003",
    employeeName: "王强",
    department: "技术研发部",
    leaveType: "病假",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    days: 2,
    reason: "身体不适，需要休息治疗",
    status: "approved",
    applyTime: "2024-01-24 09:00:00",
  },
  {
    id: "LEAVE004",
    employeeNo: "EMP-0004",
    employeeName: "赵敏",
    department: "市场营销部",
    leaveType: "婚假",
    startDate: "2024-03-01",
    endDate: "2024-03-10",
    days: 10,
    reason: "结婚典礼及蜜月旅行",
    status: "pending",
    applyTime: "2024-01-25 16:20:00",
  },
  {
    id: "LEAVE005",
    employeeNo: "EMP-0005",
    employeeName: "陈伟",
    department: "人力资源部",
    leaveType: "年假",
    startDate: "2024-02-15",
    endDate: "2024-02-16",
    days: 2,
    reason: "家庭事务处理",
    status: "rejected",
    applyTime: "2024-01-23 11:00:00",
  },
];

const columns = [
  {
    name: "employeeNo",
    title: "工号",
    type: "serialNumber",
    width: 150,
  },
  {
    name: "employeeName",
    title: "姓名",
    type: "userName",
    width: 120,
  },
  {
    name: "department",
    title: "部门",
    type: "other",
    width: 150,
  },
  {
    name: "leaveType",
    title: "假期类型",
    type: "tag",
    width: 120,
    valueOf: (item) => {
      const typeMap = {
        年假: { type: "success", text: "年假" },
        事假: { type: "warning", text: "事假" },
        病假: { type: "error", text: "病假" },
        婚假: { type: "processing", text: "婚假" },
      };
      return typeMap[item.leaveType];
    },
  },
  {
    name: "dateRange",
    title: "请假时间",
    type: "dateRange",
    width: 280,
    valueOf: (item) => [item.startDate, item.endDate],
  },
  {
    name: "days",
    title: "天数",
    type: "singleRow",
    width: 80,
  },
  {
    name: "reason",
    title: "请假原因",
    type: "description",
    width: 300,
    ellipsis: true,
  },
  {
    name: "status",
    title: "状态",
    type: "tag",
    width: 100,
    valueOf: (item) => {
      const statusMap = {
        pending: { type: "warning", text: "待审批" },
        approved: { type: "success", text: "已通过" },
        rejected: { type: "error", text: "已拒绝" },
      };
      return statusMap[item.status];
    },
  },
  {
    name: "applyTime",
    title: "申请时间",
    type: "datetime",
    width: 180,
  },
  {
    name: "options",
    title: "操作",
    type: "options",
    width: 150,
    valueOf: (item) =>
      item.status === "pending"
        ? [
            {
              onClick: () => {
                message.success(&#96;已通过 ${item.employeeName} 的请假申请&#96;);
              },
              children: "通过",
            },
            {
              onClick: () => {
                message.info(&#96;已拒绝 ${item.employeeName} 的请假申请&#96;);
              },
              children: "拒绝",
            },
          ]
        : [
            {
              onClick: () => {
                console.log("查看详情:", item);
              },
              children: "查看",
            },
          ],
  },
];

const BaseExample = () => {
  const { selectedRowKeys, getRowSelection, clearSelectedRows } = Table.useSelectedRow({
    rowKey: "id",
  });

  const handleBatchApprove = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要审批的记录");
      return;
    }
    message.success(&#96;已批量审批 ${selectedRowKeys.length} 条记录&#96;);
    clearSelectedRows();
  };

  const handleBatchReject = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要拒绝的记录");
      return;
    }
    message.info(&#96;已批量拒绝 ${selectedRowKeys.length} 条记录&#96;);
    clearSelectedRows();
  };

  const handleBatchExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要导出的记录");
      return;
    }
    message.info(&#96;正在导出 ${selectedRowKeys.length} 条记录&#96;);
  };

  return (
    <PureGlobal preset={{ ajax }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div style={{ padding: "12px", background: "#f5f5f5", borderRadius: "4px" }}>
          <Space>
            <Text strong>已选择: {selectedRowKeys.length} 项</Text>
            <Button
              type="primary"
              size="small"
              onClick={handleBatchApprove}
              disabled={selectedRowKeys.length === 0}
            >
              批量通过
            </Button>
            <Button
              size="small"
              onClick={handleBatchReject}
              disabled={selectedRowKeys.length === 0}
            >
              批量拒绝
            </Button>
            <Button
              size="small"
              onClick={handleBatchExport}
              disabled={selectedRowKeys.length === 0}
            >
              批量导出
            </Button>
            <Button
              size="small"
              onClick={clearSelectedRows}
              disabled={selectedRowKeys.length === 0}
            >
              清空选择
            </Button>
          </Space>
        </div>

        <Table
          name="leave-approval"
          controllerOpen={false}
          rowSelection={getRowSelection(dataSource)}
          dataSource={dataSource}
          columns={columns}
        />
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 分组表头与排序
- 展示分组表头（groupHeader）功能，实现多级表头结构。演示 sort 排序功能（单列排序、多列排序）和 onSortChange 排序变更回调。同时展示 disableColItem 禁用 ColItem 包装，实现自定义编辑组件。业务场景：销售数据报表。
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch),antd(antd)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;
const { Input } = antd;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { code: 0, data: "{}" },
      });
    }, 100);
  });
};

preset({ ajax });

const ValueEdit = ({ value, targetRender }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  return (
    <span
      onClick={() => {
        setIsEdit(true);
      }}
    >
      {isEdit ? (
        <Input
          type="text"
          size="small"
          defaultValue={value}
          onBlur={() => {
            setIsEdit(false);
          }}
          style={{ width: 150 }}
        />
      ) : (
        targetRender(value)
      )}
    </span>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Table
        name="sales-report"
        controllerOpen={true}
        dataSource={[
          {
            id: "SALE001",
            region: "华北区",
            province: "北京",
            city: "北京",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1250000.0,
            salesVolume: 50,
            growthRate: 23.5,
            marketShare: 18.2,
            customerCount: 128,
            newCustomerCount: 32,
            repurchaseRate: 85.5,
            avgOrderValue: 9765.6,
            targetCompletion: 92.5,
          },
          {
            id: "SALE002",
            region: "华北区",
            province: "天津",
            city: "天津",
            productName: "专业版SaaS",
            productCode: "SAAS-PRO",
            salesAmount: 890000.0,
            salesVolume: 120,
            growthRate: 15.8,
            marketShare: 12.5,
            customerCount: 95,
            newCustomerCount: 18,
            repurchaseRate: 78.2,
            avgOrderValue: 7416.7,
            targetCompletion: 88.3,
          },
          {
            id: "SALE003",
            region: "华东区",
            province: "上海",
            city: "上海",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1680000.0,
            salesVolume: 68,
            growthRate: 35.2,
            marketShare: 22.8,
            customerCount: 156,
            newCustomerCount: 45,
            repurchaseRate: 88.6,
            avgOrderValue: 24705.9,
            targetCompletion: 105.2,
          },
          {
            id: "SALE004",
            region: "华东区",
            province: "浙江",
            city: "杭州",
            productName: "专业版SaaS",
            productCode: "SAAS-PRO",
            salesAmount: 980000.0,
            salesVolume: 95,
            growthRate: 28.6,
            marketShare: 16.3,
            customerCount: 112,
            newCustomerCount: 28,
            repurchaseRate: 82.4,
            avgOrderValue: 10315.8,
            targetCompletion: 95.8,
          },
          {
            id: "SALE005",
            region: "华南区",
            province: "广东",
            city: "深圳",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1420000.0,
            salesVolume: 58,
            growthRate: 19.3,
            marketShare: 19.6,
            customerCount: 138,
            newCustomerCount: 35,
            repurchaseRate: 86.2,
            avgOrderValue: 24482.8,
            targetCompletion: 89.5,
          },
        ]}
        columns={[
          {
            name: "region",
            title: "大区",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "province",
            title: "省份",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "city",
            title: "城市",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "productName",
            title: "产品名称",
            type: "mainInfo",
            width: 150,
            groupHeader: [
              { name: "product", title: "产品信息" },
            ],
          },
          {
            name: "productCode",
            title: "产品编码",
            type: "serialNumber",
            width: 150,
            groupHeader: [
              { name: "product", title: "产品信息" },
            ],
          },
          {
            name: "salesAmount",
            title: "销售金额",
            type: "other",
            width: 150,
            sort: { single: true },
            render: ({ target }) => ({
              children: &#96;¥${(target.salesAmount / 10000).toFixed(2)}万&#96;,
            }),
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "salesVolume",
            title: "销售数量",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "growthRate",
            title: "增长率",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.growthRate}%&#96;,
              style: {
                color: target.growthRate > 20 ? "#52c41a" : target.growthRate > 10 ? "#1890ff" : "#faad14",
              },
            }),
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "marketShare",
            title: "市场份额",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.marketShare}%&#96;,
            }),
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "customerCount",
            title: "客户总数",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "newCustomerCount",
            title: "新增客户",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "repurchaseRate",
            title: "复购率",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.repurchaseRate}%&#96;,
            }),
            groupHeader: [
              { name: "customer", title: "客户指标" },
            ],
          },
          {
            name: "avgOrderValue",
            title: "客单价",
            type: "other",
            width: 130,
            sort: true,
            render: ({ target }) => ({
              children: &#96;¥${target.avgOrderValue.toFixed(2)}&#96;,
            }),
            groupHeader: [
              { name: "customer", title: "客户指标" },
            ],
          },
          {
            name: "targetCompletion",
            title: "目标完成率",
            type: "singleRow",
            width: 140,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.targetCompletion}%&#96;,
              style: {
                color: target.targetCompletion >= 100 ? "#52c41a" : target.targetCompletion >= 90 ? "#1890ff" : "#faad14",
              },
            }),
            groupHeader: [
              { name: "target", title: "目标达成" },
            ],
          },
          {
            name: "editableField",
            title: "备注",
            type: "other",
            width: 150,
            disableColItem: true,
            valueOf: (item, { targetRender }) => (
              <ValueEdit value="点击编辑备注" targetRender={targetRender} />
            ),
            groupHeader: [
              { name: "target", title: "目标达成" },
            ],
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            fixed: "right",
            width: 150,
            valueOf: (item) => [
              {
                onClick: () => {
                  console.log("查看详情:", item.city);
                },
                children: "查看详情",
              },
              {
                onClick: () => {
                  console.log("生成报告:", item.city);
                },
                children: "生成报告",
              },
            ],
          },
        ]}
        onSortChange={(sort) => {
          console.log("排序变更:", sort);
        }}
        onTablePropsReady={({ columns, dataSource }) => {
          console.log("表格就绪:", { columns, dataSource });
        }}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

### API

#### Table 组件
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| columns | 列配置 | array | - |
| className | 自定义类名 | string | - |
| getScrollEl | 获取滚动容器 | function | getScrollElDefault |
| sticky | 是否固定表头 | boolean | false |
| stickyOffset | 固定表头偏移量 | string | "var(--nav-height)" |
| pagination | 分页配置 | boolean/object | false |
| columnRenderProps | 列渲染属性 | object | {} |
| rowKey | 行key | string/function | "id" |
| dataSource | 数据源 | array | - |
| controllerOpen | 是否开启列控制 | boolean | true |
| name | 表格名称（用于存储配置） | string | - |
| summary | 总结栏 | function | - |
| scroll | 滚动配置 | object | - |
| scroller | 滚动器配置 | object | - |
| onTablePropsReady | 表格属性就绪回调 | function | - |

#### TablePage 组件
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| loader | 数据加载函数 | function | - |
| featureId | 功能ID（用于权限控制） | string | - |
| pagination | 分页配置 | object | {open: true, ...} |
| name | 表格名称 | string | - |
| dataFormat | 数据格式化函数 | function | (data) => ({list, total}) |
| className | 自定义类名 | string | - |
| columnRenderProps | 列渲染属性 | object | {} |
| summary | 总结栏 | function | - |
| sticky | 是否固定表头 | boolean | true |
| columns | 列配置 | array/function | - |
| getColumns | 获取列配置的函数 | function | - |

#### useSelectedRow Hook

与 `@kne/table-page` 保持一致，推荐通过 `getRowSelection(dataSource)` 生成 `rowSelection` 配置。

**参数**

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| rowKey | 行唯一标识 | string/function | `'id'` |
| type | 选择类型 | `'checkbox'` / `'radio'` | `'checkbox'` |

**返回值**

| 属性名 | 说明 | 类型 |
| ------ | ---- | ---- |
| selectedRowKeys | 已选行 key 列表 | array |
| selectedRows | 已选行数据 | array |
| getRowSelection | 生成 `rowSelection` 配置 | `(dataSource, extra?) => object` |
| clearSelectedRows | 清空选择 | function |
| setSelectedRowKeys | 按 key 设置选中行 | `(keys, dataSource) => void` |

#### 列配置（Column）
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| name | 列名称（唯一标识） | string | - |
| title | 列标题 | string | - |
| type | 列类型 | string | 'other' |
| width | 列宽度 | number | - |
| min | 最小宽度 | number | - |
| max | 最大宽度 | number | - |
| hidden | 是否隐藏 | boolean | false |
| fixed | 固定列 | 'left'/'right' | - |
| primary | 是否为主要字段 | boolean | false |
| hover | 是否显示hover效果 | boolean | false |
| ellipsis | 是否省略 | boolean/object | false |
| sort | 是否支持排序 | boolean/object | false |
| valueOf | 值转换函数 | function | - |
| render | 自定义渲染函数 | function | - |
| groupHeader | 分组表头配置 | array | - |
| disableColItem | 是否禁用ColItem包装 | boolean | false |

#### 列类型（Type）
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| date | 日期（YYYY-MM-DD） | width: 160, min: 120, max: 400 |
| dateShort | 短日期（YYYY-MM） | width: 120, min: 100, max: 400 |
| dateRange | 日期范围 | width: 240, min: 120, max: 400 |
| datetime | 日期时间 | width: 190, min: 190, max: 400 |
| serialNumber | 编号 | width: 190, min: 100, max: 400 |
| serialNumberShort | 短编号 | width: 120, min: 100, max: 400 |
| user | 用户 | width: 200, min: 120, max: 400 |
| userName | 用户名 | width: 100, min: 100, max: 400 |
| contacts | 联系人 | width: 240, min: 160, max: 400 |
| tag | 标签 | width: 140, min: 100, max: 400 |
| avatar | 头像 | width: 80, min: 64, max: 200 |
| singleRow | 单行文本 | width: 70, min: 70, max: 400 |
| hideInfo | 隐藏信息 | width: 120, min: 80, max: 400 |
| mainInfo | 主要信息 | width: 300, min: 160, max: 500 |
| description | 描述 | width: 400, min: 160, max: 600 |
| options | 操作列 | width: 180, min: 120, max: 400 |
| sensitiveInfo | 敏感信息 | width: 200, min: 100, max: 400 |
| other | 其他 | width: 200, min: 120, max: 400 |
| otherSmall | 其他（小） | width: 100, min: 70, max: 400 |
| otherLarge | 其他（大） | width: 300, min: 120, max: 500 |

# table-page

### 描述

A React table page component based on Ant Design, supporting column config, filter, sort and batch operations.

### 安装

```shell
npm i --save @kne/table-page
```

### 概述

`@kne/table-page` 是一个基于 React 和 Ant Design 的表格页面组件库，提供开箱即用的数据表格解决方案。组件库围绕表格的常见业务场景，封装了数据加载、分页、排序、行选择、列配置、筛选搜索、批量操作等能力，帮助开发者快速构建功能完善的表格管理页面。

### 核心组件

#### TablePage

表格页面主组件，基于 `@kne/react-fetch` 封装数据请求与分页逻辑。内置两种渲染模式：

- **`Table` 模式**（默认）：基于 antd `Table`，支持列宽拖动、字段显示/隐藏、分组表头、粘性表头等
- **`TableView` 模式**：基于 `@kne/table-view` CSS Grid，适合移动端或卡片式表格场景

通过 `loader` 或 `url` 配置数据源，通过 `dataFormat` 适配不同的接口数据结构。分页器渲染在表格外侧，翻页默认采用 `reload` 方式（不显示全屏 loading）。在 `pagination` 上同时传入 `searchParams` 与 `setSearchParams` 可将当前页、每页条数同步到 URL（参数名复用 `currentName` / `pageSizeName`）。

同时内置了顶部工具栏（`TableToolbar`），整合筛选、搜索、Tab 分类、批量操作等能力：

- **筛选（filter）**：基于 `@kne/react-filter` 的 `FilterLines`，支持多行多字段组合筛选，筛选值变化时自动 `reload` 并回到第 1 页；可通过 `filter.searchParamsValue`（与 `useSearchParamsValue` 同参）从 URL 平铺参数合并初始筛选并保证首包请求带上对应参数
- **分页 URL 状态**：`pagination.searchParams` + `pagination.setSearchParams` 开启后，当前页与每页条数与 URL 双向同步（筛选重置页码时也会写回；`loadMore` 不写回）
- **搜索（search）**：基于 `@kne/react-filter` 的 `SearchInput`，支持关键词搜索与防抖自动提交，与筛选器共享筛选值状态；移动端开启 `renderMobile` 时，SearchInput 与下方卡片列表之间保留间距
- **操作按钮（buttonGroup）**：透传 `@kne/button-group` 参数；桌面端显示在 SearchInput 右侧（small、至少 1 个外露），移动端与筛选同行两端对齐（筛选靠左、按钮组靠右，small、外露 1 个），批量操作显示在「全选/排序」行的排序后面
- **Tab（tab）**：顶部分类切换，默认「全部」，选中值写入 filter value 参与请求但不在已选标签中重复展示；桌面端在表格边框外侧，移动端显示在 SearchInput 下方；可通过 `tabProps` 透传 antd Tabs 属性
- **批量操作（batchActions）**：配合 `rowSelection` 和 `useSelectedRow`，提供下拉菜单形式的批量操作（如批量导出、批量通知），未选中时自动禁用
- **PC 卡片视图（renderCard）**：取值同 `renderMobile`（true / function / preset 字符串），生效后 PC 端可切换表格/卡片（状态按 `name` 存 localStorage）；`forceCard` 强制卡片并不显示切换按钮；卡片模式下外框透明、默认触底下拉加载；移动端忽略
- **树形数据**：透传 `dataType`（`tree` / `treeList`）、`expandedKeys`、`onLoadChildren`、`rowSelection.checkRelation` 等给内部 Table / TableView
- **已选筛选值展示**：工具栏下方展示当前生效的筛选条件标签，支持快速清除

#### Table

基于 antd `Table` 的表格组件，与 `TableView` 共享相同的 `columns`、`rowSelection` 等 API。额外提供以下增强能力：

- **列宽拖动**：悬停表头列右侧拖动手柄可调整列宽，支持 `min`/`max` 限制
- **列配置面板**：通过表头最后一列的设置图标，可显示/隐藏字段、拖拽排序
- **配置持久化**：设置 `name` 后，列宽和显示状态自动保存到 localStorage
- **分组表头**：通过 `groupHeader` 配置实现多级表头结构
- **浮动横向滚动条**：当表格宽度超出容器时，底部自动显示横向滚动条（通过 `horizontalScroller` 控制）
- **树形数据**：支持与 `TableView` 相同的 `dataType`（`tree` / `treeList`），映射为 antd Table 树形展开，含懒加载与 `checkRelation` 勾选关联

#### TableView

基于 `@kne/table-view` 的 CSS Grid 表格视图组件。相比于 `Table`，它更轻量灵活，适合需要自定义渲染、移动端卡片展示的场景。支持：

- 基于 24 栅格的列宽分配（`span` 属性）
- CSS Grid 自动布局，内容超出时自动撑开
- 行选择（checkbox 多选 / radio 单选）
- 行点击事件
- 通过 `render` 属性自定义渲染，可拆分表头和表体
- 树形数据（`dataType: 'tree' | 'treeList'`）：展开收起、懒加载、移动端面包屑卡片

### 核心 Hooks

#### useSelectedRow

行选择 Hook，支持多选（checkbox）和单选（radio）两种模式。提供：

- `getRowSelection(dataSource)` 生成标准 `rowSelection` 配置，可直接传入 `Table` 或 `TableView`
- `selectedRowKeys` 和 `selectedRows` 追踪选中状态
- `setSelectedRowKeys(keys, dataSource)` 从 key 列表反查完整行数据
- `clearSelectedRows()` 一键清空选择

适用于批量操作（批量删除、批量导出等）和单选场景（详情查看、关联选择等）。

#### useSort

排序 Hook，配合 `Table`/`TableView` 的 `sortRender` 实现表头排序交互。支持：

- **单列排序**（`sort: true` 或 `sort: { single: true }`）：切换列时自动清除其他列的排序
- **多列排序**（`sort: { single: false }`）：允许多列同时排序
- 排序状态循环切换：DESC → ASC → 取消
- `sortDataSource(dataSource, sort, columns)` 工具函数，支持本地排序（包含中文排序）

### 渲染逻辑

#### 双模式：Table / TableView

`TablePage` 通过 `type` 切换底层表格实现：

| 模式 | 底层 | 适用场景 |
|------|------|----------|
| `Table`（默认） | antd `Table` | 桌面端完整表格能力：列宽拖动、列配置、分组表头、粘性表头、总结栏 |
| `TableView` | `@kne/table-view` CSS Grid | 轻量栅格表格、移动端、卡片式展示 |

两种模式共享 `columns`、`rowSelection`、`sortRender`、`renderType` 等 API，列渲染管线统一来自 `@kne/table-view`。

#### 列单元格渲染管线

无论 `Table` 还是 `TableView`，单元格内容均走同一套流程（`Table` 在 antd `columns[].render` 内调用）：

1. **`resolveColumns`**：解析 `renderType`，注入内置 `render` 与 `width` / `min` / `max` / `ellipsis`
2. **`computeColumnsValue`**：`getValueOf` 取值 → `format` 格式化 → 按 `display` / 空值规则过滤
3. **`computeDisplay`**：空值占位；非空调用列 `render`
4. **`renderCellContent`**：按 `ellipsis` / `cellFullWidth` 输出最终节点

列渲染优先级：`column.render`（最高）> `renderType` 内置渲染 > 原始格式化值。`render` 与 `renderType` 共存时，后者仅提供列宽等布局维度。

#### 桌面端：antd Table

`Table` 将解析后的列映射为 antd `columns`，在 `render` 回调中复用上述管线。额外能力：

- `useTableConfig` 管理列宽拖动、显示/隐藏、localStorage 持久化
- `useGroupHeader` 生成分组表头
- `rowSelection` 映射为 antd 行选择（含 `allowSelectedAll` 全选；树形下支持 `checkRelation`）
- `dataType` 为 `tree` / `treeList` 时归一化为嵌套数据并接入 antd `expandable`
- `render={({ header, renderBody }) => ...}` 可自定义表格外层，`renderBody()` 返回完整 antd Table

#### 移动端：`renderMobile`

`Table` 与 `TableView` 均支持 `renderMobile`，移动端判断使用 `useIsMobile()`（768px）。激活后 `Table` **不再渲染 antd Table**，委托 `TableView` 处理：

| `renderMobile` 值 | 行为 |
|-------------------|------|
| `true` | 默认卡片 List：每行一张卡片，字段列「标题 + 内容」纵向排列，`options` 操作列靠右（紧凑「⋯」入口） |
| `function` | 完全接管移动端渲染；回调含 `renderToolbar` / `getSelectionProps` / `getRowKey` 等，见 TableView API |
| `string` | 从 `preset({ renderMobile: { [name]: fn } })` 查找；未注册则视为未开启，回退普通表格 |

桌面端不受 `renderMobile` 影响：`Table` 仍走 antd Table，`TableView` 仍走 CSS Grid 或 `render`。

### 列渲染类型系统

通过 `renderType` 属性，可以用声明式的方式定义列的渲染样式，无需手写 `render` 函数。内置以下 render 类型：

| 类型 | 说明 |
|------|------|
| `main` | 主要内容列，自动省略号，较大宽度 |
| `options` | 操作列，铺满单元格 |
| `enum` | 枚举值渲染，自动映射 color/text |
| `tag` | 标签渲染，单个 Tag 组件 |
| `status` | 状态渲染，antd Badge 组件 |
| `tagList` | 标签列表渲染，多个 Tag 组件 |
| `amount` | 金额列，右对齐，自动省略号 |
| `list` | 列表渲染，自动省略号 |
| `description` | 描述文本，大宽度，自动省略号 |

支持尺寸修饰符：

- `short`：缩小宽度（约 120px）
- `small`：最小宽度（约 100px）
- `large`：放大宽度（约 300px）

例如 `renderType: "enum-small"` 表示枚举值 + 小尺寸列。维度（width、min、max、ellipsis）可通过 `globalParams.renderTypeSize` 全局定制。

默认导出 `getTagColor`、`renderTagItem`、`renderTagList`、`getStatusType`、`renderStatusItem` 工具函数，用于 Tag / Status 相关渲染。

### 其他导出

| 导出项 | 说明 |
|--------|------|
| `tableLocalApis` | 基于 localStorage 的列配置存取 API，可替换为服务端存储 |
| `useTableConfig` | 列配置 Hook，提供列宽、显示状态的管理能力 |
| `preset` / `globalParams` | 全局参数预设，用于设置 renderType 映射和标签颜色等全局配置 |
| `Ellipsis` | 超出省略组件，基于 antd Typography |
| `label` | 标签组件 |
| `sortDataSource` | 客户端排序工具函数 |

### 使用场景

- **后台管理系统**：订单管理、用户列表、商品管理等 CRUD 页面
- **数据报表**：配合排序、分页、总结栏展示统计数据
- **列表配置页**：需要用户自定义列宽、显示字段的表格场景
- **移动端适配**：`renderMobile` 启用卡片 List，或 `TableView` 模式做栅格式展示


### 示例

#### 示例样式

```scss
@use '~@kne/responsive-utils/scss' as resp;

// 手机预览下给示例内容左右留白，便于观察表格/卡片边框
@include resp.mobile-container {
  .example-driver-runner {
    padding-inline: 16px;
    box-sizing: border-box;
  }
}
```

#### 示例代码

- TablePage
- 表格页面组件，基于 @kne/react-fetch 实现数据加载与分页，支持 sticky 固定表头、useSort 服务端排序、renderMobile 移动端卡片、renderCard PC 卡片视图切换、tab 分类切换、列配置、总结栏、树形 dataType（含筛选/批量/操作列/卡片切换/懒加载）；空数据（total 为 0）时不显示分页器。文末含仅 SearchInput + renderMobile 自定义卡片示例（验证工具栏与卡片间距）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd),_ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css)

```jsx
const { default: TablePage, Table, mergeTreeChildren } = _TablePage;
const { fields } = _ReactFilter;
const { SuperSelectFilterItem } = fields;
const { Table: AntTable, Col, Flex, Row, Tag, Button, Space, Switch, Radio, message } = antd;
const { useMemo, useState, useRef } = React;

const TOTAL = 156;

const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

const surnames = ['张', '李', '王', '刘', '陈'];
const givenNames = ['伟', '强', '敏', '磊', '杰', '婷', '娜', '静', '丽', '娟'];
const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];
const positions = ['工程师', '高级工程师', '经理', '总监', '专员'];
const educations = ['本科', '硕士', '博士', '大专'];
const performances = ['A', 'B', 'C', 'S'];

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  resigned: { type: 'default', text: '离职' },
  probation: { type: 'processing', text: '试用期' }
};

const perfMap = {
  S: { type: 'success', text: 'S' },
  A: { type: 'processing', text: 'A' },
  B: { type: 'warning', text: 'B' },
  C: { type: 'error', text: 'C' }
};

const departmentOptions = departments.map(item => ({ value: item, label: item }));
const statusOptions = Object.entries(statusMap).map(([value, { text }]) => ({ value, label: text }));
const positionOptions = positions.map(item => ({ value: item, label: item }));
const educationOptions = educations.map(item => ({ value: item, label: item }));
const performanceOptions = performances.map(item => ({ value: item, label: item }));
const workYearsOptions = [
  { value: '1', label: '1年以内' },
  { value: '1-3', label: '1-3年' },
  { value: '3-5', label: '3-5年' },
  { value: '5+', label: '5年以上' }
];
const salaryOptions = [
  { value: '15-20', label: '15-20K' },
  { value: '20-30', label: '20-30K' },
  { value: '30-50', label: '30-50K' },
  { value: '50+', label: '50K以上' }
];
const locationOptions = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' },
  { value: 'hangzhou', label: '杭州' }
];
const contractOptions = [
  { value: 'fulltime', label: '全职' },
  { value: 'parttime', label: '兼职' },
  { value: 'intern', label: '实习' },
  { value: 'outsource', label: '外包' }
];
const genderOptions = [
  { value: 'male', label: '男' },
  { value: 'female', label: '女' }
];
const levelOptions = [
  { value: 'p5', label: 'P5' },
  { value: 'p6', label: 'P6' },
  { value: 'p7', label: 'P7' },
  { value: 'p8', label: 'P8' },
  { value: 'p9', label: 'P9' }
];

const buildEmployee = index => {
  const statusKeys = ['active', 'vacation', 'resigned', 'probation'];
  return {
    id: &#96;EMP${String(index + 1).padStart(4, '0')}&#96;,
    employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, '0')}&#96;,
    name: &#96;${surnames[index % surnames.length]}${givenNames[index % givenNames.length]}&#96;,
    department: departments[index % departments.length],
    position: positions[index % positions.length],
    status: statusKeys[index % statusKeys.length],
    email: &#96;employee${index + 1}@company.com&#96;,
    phone: &#96;138${String(index).padStart(8, '0')}&#96;,
    joinDate: &#96;2023-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}&#96;,
    workYears: Math.floor(index / 12) + 1,
    salary: &#96;${15 + (index % 20)}K-${20 + (index % 20)}K&#96;,
    education: educations[index % educations.length],
    performance: performances[index % performances.length]
  };
};

const columns = [
  {
    name: 'employeeNo',
    title: '工号',
    width: 180,
    min: 120,
    max: 240,
    fixed: 'left',
    sort: { single: true },
    renderType: 'main',
    primary: true,
    onClick: ({ item, colItem }) => {
      message.info(&#96;查看员工：${colItem.name}（${item}）&#96;);
    }
  },
  {
    name: 'name',
    title: '姓名',
    width: 100,
    min: 80,
    max: 160,
    sort: true,
    renderType: 'main',
    onClick: ({ item, colItem }) =>
      new Promise(resolve => {
        const hide = message.loading(&#96;正在加载 ${item} 的详情…&#96;, 0);
        setTimeout(() => {
          hide();
          message.success(&#96;${colItem.department} · ${colItem.position}&#96;);
          resolve();
        }, 600);
      })
  },
  { name: 'department', title: '部门', width: 150, min: 120, max: 240, sort: true },
  { name: 'position', title: '职位', width: 120, min: 100, max: 200 },
  {
    name: 'status',
    title: '状态',
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'performance', title: '绩效', width: 80, min: 70, max: 120, renderType: 'tag', getValueOf: item => perfMap[item.performance] || { type: 'default', text: item.performance } },
  { name: 'phone', title: '手机号', width: 140, min: 120, max: 180, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  { name: 'email', title: '邮箱', width: 200, min: 160, max: 320, ellipsis: true },
  { name: 'joinDate', title: '入职日期', width: 120, min: 100, max: 160, format: 'date', sort: true },
  { name: 'workYears', title: '工龄', width: 90, min: 70, max: 120, sort: true, render: value => &#96;${value}年&#96; },
  { name: 'salary', title: '薪资范围', width: 120, min: 100, max: 180, hidden: true },
  { name: 'education', title: '学历', width: 90, min: 70, max: 120, hidden: true },
  {
    name: 'options',
    title: '操作',
    renderType: 'options',
    fixed: 'right',
    width: 160,
    min: 120,
    max: 200,
    getValueOf: item => {
      const actions = [
        { children: '查看', onClick: () => message.info(&#96;查看 ${item.name}&#96;) },
        { children: '编辑', onClick: () => message.info(&#96;编辑 ${item.name}&#96;) }
      ];
      if (item.status !== 'resigned') {
        actions.push({
          children: '离职办理',
          onClick: () => message.warning(&#96;办理离职 ${item.name}&#96;)
        });
      }
      return actions;
    }
  }
];

const sortFieldLabels = {
  employeeNo: '工号',
  name: '姓名',
  department: '部门',
  joinDate: '入职日期',
  workYears: '工龄'
};

const normalizeFilterValue = value => {
  if (value == null) {
    return value;
  }
  return Array.isArray(value) ? value[0] : value;
};

const applyFilters = (employees, data, requestParams) => {
  const params = Object.assign({}, requestParams?.data, data);
  let result = employees;

  if (params.keyword) {
    const keyword = String(params.keyword).toLowerCase();
    result = result.filter(item => item.employeeNo.toLowerCase().includes(keyword) || item.name.includes(params.keyword));
  }

  const department = normalizeFilterValue(params.department);
  if (department) {
    result = result.filter(item => item.department === department);
  }

  const status = normalizeFilterValue(params.status);
  if (status) {
    result = result.filter(item => item.status === status);
  }

  const position = normalizeFilterValue(params.position);
  if (position) {
    result = result.filter(item => item.position === position);
  }

  return result;
};

const SortState = ({ sort }) => (
  <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: 8, fontSize: 13 }}>
    当前排序：
    {sort.length ? (
      sort.map(item => (
        <Tag key={item.name} color="blue" style={{ marginLeft: 8 }}>
          {sortFieldLabels[item.name] || item.name} {item.sort}
        </Tag>
      ))
    ) : (
      <span style={{ marginLeft: 8, color: '#999' }}>无</span>
    )}
  </div>
);

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="geekblue">渲染组件</Tag>
      通过 <code>renderType</code> 在 <code>Table</code>（antd）与 <code>TableView</code>（纯 CSS Grid）间切换；点下方切换可对比表头、选择列与骨架屏表现。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">数据加载</Tag>
      通过 <code>loader</code> 模拟分页接口，请求参数为 <code>data.currentPage</code>、<code>data.perPage</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="processing">蒙层 Loading</Tag>
      <code>reload</code> 切换数据时保留旧表格，叠加半透明蒙层与 spinner，加载完成后再替换为新数据；<code>refresh</code> 会卸载表格并显示全屏 loading。点下方「演示蒙层 Loading」可观察效果。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">分页</Tag>
      分页器渲染在表格外侧，翻页时以 <code>reload</code> 方式请求；<code>pageSize</code> 会持久化到 localStorage；当 <code>total</code> 为 0（无数据）时不显示分页器。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="gold">筛选</Tag>
      顶部工具栏集成 <code>filter</code>、<code>search</code>、<code>batchActions</code>、<code>buttonGroup</code>；筛选变化自动 <code>reload</code> 并回到第 1 页；移动端 <code>buttonGroup</code> 与筛选同行两端对齐（筛选靠左、按钮组靠右），批量操作显示在「全选/排序」行的排序后面。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="lime">Tab</Tag>
      通过 <code>tab</code> 配置顶部分类切换（默认「全部」），选中值写入 filter value 参与请求，但不在已选筛选标签中重复展示；桌面端在表格边框外，移动端在 SearchInput 下方；可用 <code>tabProps</code> 透传 Tabs 属性（如 <code>tabBarExtraContent</code>）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">列配置</Tag>
      设置 <code>name</code> 开启列宽拖动与显示/隐藏，「薪资范围」「学历」默认隐藏；状态列使用 <code>renderType="status"</code>，绩效列使用 <code>renderType="tag"</code>，操作列使用 <code>renderType="options"</code> 且 <code>fixed="right"</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="cyan">排序</Tag>
      配合 <code>Table.useSort</code> 与 <code>sortRender</code>、<code>mobileSortToolbar</code>，在 <code>onSortChange</code> 中调用 <code>reload</code> 传排序参数，与翻页一样不闪烁。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="volcano">移动端</Tag>
      设置 <code>renderMobile</code> 后，手机预览下启用卡片 List（含全选、排序工具栏）；桌面端仍为 antd Table。下方另有「仅 SearchInput + 自定义卡片」示例，用于确认 SearchInput 与卡片列表间距。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="geekblue">固定表头</Tag>
      设置 <code>sticky</code> 与 <code>scroll.y</code>，表体在固定高度内滚动时表头保持可见；横向滚动配合 <code>scroll.x</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="magenta">单元格点击</Tag>
      列配置 <code>onClick</code>（配合 <code>renderType="main"</code>、<code>primary</code> / <code>hover</code>），仅可点击单元格 hover 时显示手型；工号列同步演示异步点击 loading。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="purple">总结栏</Tag>
      <code>summary</code> 回调可拿到 <code>data</code>、<code>requestParams</code> 等 fetch 上下文。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="red">PC 卡片</Tag>
      传入 <code>renderCard</code>（签名同 <code>renderMobile</code>）后，工具栏 <code>buttonGroup</code> 前出现表格/卡片切换按钮，状态按 <code>name</code> 持久化到 localStorage；卡片模式下外框透明、默认触底下拉加载（<code>pagination.forcePagination</code> 可改回分页）；<code>forceCard</code> 强制卡片并隐藏切换按钮；移动端忽略。
    </div>
  </div>
);

const EmployeeCard = ({ item }) => (
  <div
    style={{
      boxSizing: 'border-box',
      border: '1px solid #f0f0f0',
      borderRadius: 8,
      padding: 16,
      background: '#fff'
    }}
  >
    <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
      <strong>{item.name}</strong>
      <Tag color={statusMap[item.status]?.type}>{statusMap[item.status]?.text || item.status}</Tag>
    </Flex>
    <Flex align="center" gap={8} wrap style={{ marginBottom: 4, fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
      <span>{item.department}</span>
      <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
      <span>{item.position}</span>
    </Flex>
    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
      {item.employeeNo} · 入职 {item.joinDate} · 薪资 {item.salary}
    </div>
    <Flex justify="flex-end" gap={4} style={{ marginTop: 12, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
      <Button type="link" size="small" onClick={() => message.info(&#96;查看 ${item.name}&#96;)}>
        查看
      </Button>
      <Button type="link" size="small" onClick={() => message.info(&#96;编辑 ${item.name}&#96;)}>
        编辑
      </Button>
      {item.status !== 'resigned' && (
        <Button type="link" size="small" danger onClick={() => message.warning(&#96;办理离职 ${item.name}&#96;)}>
          离职办理
        </Button>
      )}
    </Flex>
  </div>
);

const renderEmployeeCard = ({ dataSource = [] }) => (
  <Row gutter={[12, 12]}>
    {dataSource.map(item => (
      <Col span={12} key={item.id}>
        <EmployeeCard item={item} />
      </Col>
    ))}
  </Row>
);

const BaseExample = () => {
  const tableRef = React.useRef();
  const [empty, setEmpty] = useState(false);
  const [cardForcePagination, setCardForcePagination] = useState(false);
  const [renderType, setRenderType] = useState('Table');
  const emptyRef = React.useRef(false);
  const slowReloadRef = React.useRef(false);
  const allEmployees = useMemo(() => range(0, TOTAL).map(buildEmployee), []);
  const { selectedRows, getRowSelection } = Table.useSelectedRow({ rowKey: 'id' });
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({
    defaultSort: [{ name: 'joinDate', sort: 'DESC' }],
    onSortChange: newSort => {
      tableRef.current?.reload({
        data: { currentPage: 1, sort: newSort }
      });
    }
  });

  return (
    <Flex vertical gap={16}>
      <Tips />
      <SortState sort={sort} />
      <Space wrap>
        <Flex align="center" gap={8}>
          <span>表格组件：</span>
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            size="small"
            value={renderType}
            onChange={e => setRenderType(e.target.value)}
            options={[
              { label: 'Table', value: 'Table' },
              { label: 'TableView', value: 'TableView' }
            ]}
          />
        </Flex>
        <Flex align="center" gap={8}>
          <Switch
            checked={empty}
            onChange={checked => {
              emptyRef.current = checked;
              setEmpty(checked);
              tableRef.current?.reload({ data: { currentPage: 1 } });
            }}
          />
          <span>{empty ? '空数据（无分页）' : '有数据（显示分页）'}</span>
        </Flex>
        <Button
          type="primary"
          onClick={() => {
            slowReloadRef.current = true;
            Promise.resolve(
              tableRef.current?.reload({
                data: { currentPage: 1 }
              })
            ).finally(() => {
              slowReloadRef.current = false;
            });
          }}
        >
          演示蒙层 Loading
        </Button>
        <Button
          onClick={() => {
            tableRef.current?.reload({
              data: { currentPage: 1 }
            });
          }}
        >
          重新加载（回到第 1 页）
        </Button>
        <Button
          onClick={() => {
            tableRef.current?.refresh();
          }}
        >
          刷新当前页（全屏 loading）
        </Button>
        <Flex align="center" gap={8}>
          <span>卡片模式数据加载：</span>
          <Switch checkedChildren="分页" unCheckedChildren="下拉加载" checked={cardForcePagination} onChange={setCardForcePagination} />
        </Flex>
      </Space>
      <TablePage
        ref={tableRef}
        name="demo-employee-table"
        renderType={renderType}
        sticky={renderType === 'Table'}
        scroll={renderType === 'Table' ? { x: 1600, y: 400 } : undefined}
        size="large"
        renderMobile
        renderCard={renderEmployeeCard}
        sortRender={sortRender}
        mobileSortToolbar={mobileSortToolbar}
        rowSelection={getRowSelection(allEmployees)}
        selectedRows={selectedRows}
        search={{ name: 'keyword', label: '关键词', placeholder: '搜索工号/姓名', style: { width: 180 } }}
        buttonGroup={{
          list: [
            {
              type: 'primary',
              children: '新建员工',
              onClick: () => message.success('打开新建员工')
            },
            {
              children: '导出全部',
              onClick: () => message.info('正在导出全部员工')
            }
          ]
        }}
        tab={{
          name: 'position',
          label: '职位',
          list: positionOptions
        }}
        tabProps={{
          tabBarExtraContent: (
            <Button type="link" size="small" onClick={() => message.info('新增职位')}>
              新增职位
            </Button>
          )
        }}
        filter={{
          // 扁平 list：桌面端按容器宽度自动收起到「更多」
          list: [
            {
              type: SuperSelectFilterItem,
              props: { name: 'department', label: '部门', single: true, options: departmentOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'status', label: '状态', single: true, options: statusOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'education', label: '学历', single: true, options: educationOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'performance', label: '绩效', single: true, options: performanceOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'workYears', label: '工龄', single: true, options: workYearsOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'salary', label: '薪资', single: true, options: salaryOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'location', label: '工作城市', single: true, options: locationOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'contract', label: '合同类型', single: true, options: contractOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'gender', label: '性别', single: true, options: genderOptions }
            },
            {
              type: SuperSelectFilterItem,
              props: { name: 'level', label: '职级', single: true, options: levelOptions }
            }
          ]
        }}
        batchActions={[
          {
            key: 'export',
            label: '批量导出',
            onClick: ({ selectedRowKeys }) => {
              message.info(&#96;正在导出 ${selectedRowKeys.length} 名员工&#96;);
            }
          },
          {
            key: 'notify',
            label: '批量通知',
            onClick: ({ selectedRowKeys }) => {
              message.success(&#96;已通知 ${selectedRowKeys.length} 名员工&#96;);
            }
          }
        ]}
        pagination={{
          open: true,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          forcePagination: cardForcePagination
        }}
        dataFormat={data => ({
          list: data.pageData,
          total: data.totalCount,
          data
        })}
        loader={({ data, requestParams }) => {
          const delay = slowReloadRef.current ? 1600 : 400;
          if (emptyRef.current) {
            return new Promise(resolve => {
              setTimeout(() => resolve({ pageData: [], totalCount: 0 }), delay);
            });
          }
          const currentPage = Number(data?.currentPage ?? requestParams?.data?.currentPage) || 1;
          const perPage = Number(data?.perPage ?? requestParams?.data?.perPage) || 20;
          const sortParams = data?.sort ?? requestParams?.data?.sort ?? [{ name: 'joinDate', sort: 'DESC' }];
          const filteredEmployees = applyFilters(allEmployees, data, requestParams);
          const sortedEmployees = sortParams.length ? Table.sortDataSource(filteredEmployees, sortParams, columns) : filteredEmployees;
          const startIndex = (currentPage - 1) * perPage;

          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                pageData: sortedEmployees.slice(startIndex, startIndex + perPage),
                totalCount: filteredEmployees.length
              });
            }, delay);
          });
        }}
        columns={columns}
        summary={({ pageData, data }) => {
          const totalCount = data?.totalCount || 0;
          return (
            <AntTable.Summary fixed>
              <AntTable.Summary.Row>
                <AntTable.Summary.Cell index={0} colSpan={5}>
                  <strong>当前页统计</strong>
                </AntTable.Summary.Cell>
                <AntTable.Summary.Cell index={5}>
                  <strong>{pageData.length} 人</strong>
                </AntTable.Summary.Cell>
                <AntTable.Summary.Cell index={6} colSpan={7}>
                  <strong>总员工数: {totalCount} 人</strong>
                </AntTable.Summary.Cell>
              </AntTable.Summary.Row>
            </AntTable.Summary>
          );
        }}
        />
    </Flex>
  );
};

const sharedGroups = [
  {
    id: 1,
    name: '华北销售共享组',
    description: '覆盖华北区销售线索与客户跟进数据，成员可按只读或读写权限访问。',
    members: [{ id: 'u1' }, { id: 'u2' }, { id: 'u3' }],
    dataSources: [{ id: 'd1' }, { id: 'd2' }],
    sharedModules: [{ id: 'm1' }]
  },
  {
    id: 2,
    name: '产品研发协作组',
    description: '产品与研发跨部门协作，共享需求池与缺陷跟踪模块。',
    members: [{ id: 'u4' }, { id: 'u5' }],
    dataSources: [{ id: 'd3' }],
    sharedModules: [{ id: 'm2' }, { id: 'm3' }]
  },
  {
    id: 3,
    name: '财务审计只读组',
    description: '审计人员只读访问财务相关模块与导出记录。',
    members: [{ id: 'u6' }],
    dataSources: [{ id: 'd4' }, { id: 'd5' }, { id: 'd6' }],
    sharedModules: [{ id: 'm4' }]
  }
];

const sharedGroupColumns = [
  { name: 'id', title: 'ID', width: 80, renderType: 'small' },
  { name: 'name', title: '共享组名称', width: 180, renderType: 'main' },
  { name: 'description', title: '描述', width: 320, renderType: 'description', ellipsis: true },
  {
    name: 'options',
    title: '操作',
    width: 140,
    renderType: 'options',
    getValueOf: item => [
      { children: '编辑', type: 'link', onClick: () => console.log('edit', item.id) },
      { children: '删除', type: 'link', isDelete: true, message: &#96;确定删除 ${item.name} 吗？&#96;, onClick: () => console.log('remove', item.id) }
    ]
  }
];

const SharedGroupMobileCard = ({ item }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '14px 16px',
      background: '#fff',
      border: '1px solid #f0f0f0',
      borderRadius: 12,
      boxSizing: 'border-box'
    }}
  >
    <div>
      <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: 'rgba(0,0,0,0.88)' }}>
        {item.name}
      </div>
      <Flex align="center" gap={8} wrap="wrap" style={{ marginBottom: 6, fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
        <span>成员 {item.members.length}</span>
        <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
        <span>数据来源 {item.dataSources.length}</span>
        <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
        <span>模块 {item.sharedModules.length}</span>
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>#{item.id}</span>
      </Flex>
      <div
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          fontSize: 13,
          lineHeight: 1.5,
          color: 'rgba(0,0,0,0.45)'
        }}
      >
        {item.description}
      </div>
    </div>
  </div>
);

/** 仅 SearchInput + renderMobile：确认工具栏与卡片列表有间距、不紧贴 */
const SearchMobileExample = () => (
  <Flex vertical gap={12}>
    <div style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
      <Tag color="blue" style={{ marginRight: 8 }}>
        search only
      </Tag>
      仅配置 <code>search</code>（无 filter / batch / tab），移动端开启 <code>renderMobile</code> 自定义卡片时，
      SearchInput 与下方卡片列表应有间距，不可紧挨。请切换手机预览查看。
    </div>
    <TablePage
      name="demo-search-mobile-gap"
      pagination={{ open: false }}
      search={{ name: 'keyword', label: '关键词', placeholder: '搜索共享组名称' }}
      columns={sharedGroupColumns}
      loader={() =>
        Promise.resolve({
          pageData: sharedGroups,
          totalCount: sharedGroups.length
        })
      }
      renderMobile={({ dataSource }) => (
        <Flex vertical gap={12} className="info-page-table-mobile-card-list">
          {(dataSource || []).map(item => (
            <SharedGroupMobileCard key={item.id} item={item} />
          ))}
        </Flex>
      )}
    />
  </Flex>
);



const orgStatusMap = {
  active: { type: 'success', text: '启用' },
  paused: { type: 'warning', text: '停用' }
};

const orgRegionOptions = [
  { value: 'east', label: '华东' },
  { value: 'north', label: '华北' },
  { value: 'south', label: '华南' }
];

const orgStatusOptions = Object.entries(orgStatusMap).map(([value, { text }]) => ({ value, label: text }));

const treeColumns = [
  { name: 'name', title: '名称', width: 200, renderType: 'main' },
  { name: 'code', title: '编码', width: 120 },
  { name: 'owner', title: '负责人', width: 100 },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orgStatusMap[item.status] || { type: 'default', text: item.status }
  },
  {
    name: 'options',
    title: '操作',
    width: 160,
    renderType: 'options',
    fixed: 'right',
    getValueOf: item => [
      { children: '查看', onClick: () => message.info(&#96;查看 ${item.name}&#96;) },
      { children: '编辑', onClick: () => message.info(&#96;编辑 ${item.name}&#96;) },
      {
        children: '删除',
        isDelete: true,
        message: &#96;确定删除 ${item.name} 吗？&#96;,
        onClick: () => message.warning(&#96;已删除 ${item.name}&#96;)
      }
    ]
  }
];

const orgTreeData = [
  {
    id: '1',
    name: '华东区',
    code: 'EAST',
    owner: '张三',
    region: 'east',
    status: 'active',
    children: [
      {
        id: '1-1',
        name: '上海',
        code: 'SH',
        owner: '李四',
        region: 'east',
        status: 'active',
        children: [
          { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五', region: 'east', status: 'active' },
          { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六', region: 'east', status: 'paused' }
        ]
      },
      { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七', region: 'east', status: 'active' }
    ]
  },
  {
    id: '2',
    name: '华北区',
    code: 'NORTH',
    owner: '孙八',
    region: 'north',
    status: 'active',
    children: [{ id: '2-1', name: '北京', code: 'BJ', owner: '周九', region: 'north', status: 'paused' }]
  }
];

const orgTreeListData = [
  { id: '1', name: '华东区', code: 'EAST', owner: '张三', parentId: null, region: 'east', status: 'active' },
  { id: '1-1', name: '上海', code: 'SH', owner: '李四', parentId: '1', region: 'east', status: 'active' },
  { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五', parentId: '1-1', region: 'east', status: 'active' },
  { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六', parentId: '1-1', region: 'east', status: 'paused' },
  { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七', parentId: '1', region: 'east', status: 'active' },
  { id: '2', name: '华北区', code: 'NORTH', owner: '孙八', parentId: '', region: 'north', status: 'active' },
  { id: '2-1', name: '北京', code: 'BJ', owner: '周九', parentId: '2', region: 'north', status: 'paused' }
];

const lazyOrgRoot = [
  { id: 'org-1', name: '集团总部', code: 'HQ', owner: '张三', parentId: null, region: 'east', status: 'active', hasChildren: true },
  { id: 'org-2', name: '分公司', code: 'BR', owner: '李四', parentId: null, region: 'south', status: 'active', hasChildren: true }
];

const lazyOrgChildrenMap = {
  'org-1': [
    { id: 'org-1-1', name: '研发中心', code: 'RD', owner: '王五', region: 'east', status: 'active', hasChildren: true },
    { id: 'org-1-2', name: '市场部', code: 'MKT', owner: '赵六', region: 'east', status: 'paused', hasChildren: false }
  ],
  'org-1-1': [
    { id: 'org-1-1-1', name: '前端组', code: 'FE', owner: '钱七', region: 'east', status: 'active', hasChildren: false },
    { id: 'org-1-1-2', name: '后端组', code: 'BE', owner: '孙八', region: 'east', status: 'active', hasChildren: false }
  ],
  'org-2': [{ id: 'org-2-1', name: '华南办', code: 'SC', owner: '周九', region: 'south', status: 'active', hasChildren: false }]
};

const OrgTreeCard = ({ item }) => (
  <div
    style={{
      boxSizing: 'border-box',
      border: '1px solid #f0f0f0',
      borderRadius: 8,
      padding: 16,
      background: '#fff'
    }}
  >
    <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
      <strong>{item.name}</strong>
      <Tag color={orgStatusMap[item.status]?.type}>{orgStatusMap[item.status]?.text || item.status}</Tag>
    </Flex>
    <Flex align="center" gap={8} wrap style={{ marginBottom: 4, fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
      <span>编码 {item.code}</span>
      <span style={{ color: 'rgba(0,0,0,0.25)' }}>·</span>
      <span>负责人 {item.owner}</span>
    </Flex>
    <Flex justify="flex-end" gap={4} style={{ marginTop: 12, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
      <Button type="link" size="small" onClick={() => message.info(&#96;查看 ${item.name}&#96;)}>
        查看
      </Button>
      <Button type="link" size="small" onClick={() => message.info(&#96;编辑 ${item.name}&#96;)}>
        编辑
      </Button>
    </Flex>
  </div>
);

const renderOrgTreeCard = ({ displayDataSource, dataSource = [] }) => {
  const list = displayDataSource || dataSource;
  return (
    <Row gutter={[12, 12]}>
      {list.map(item => (
        <Col span={12} key={item.id}>
          <OrgTreeCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

const applyOrgTreeFilters = (list, data, requestParams) => {
  const params = Object.assign({}, requestParams?.data, data);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const region = normalizeFilterValue(params.region);
  const status = normalizeFilterValue(params.status);
  return (list || []).filter(item => {
    if (keyword) {
      const hit = [item.name, item.code, item.owner].some(v => String(v || '').toLowerCase().includes(keyword));
      if (!hit) return false;
    }
    if (region && item.region !== region) return false;
    if (status && item.status !== status) return false;
    return true;
  });
};

/** TablePage 树形：筛选 / 搜索 / 批量 / 操作列 / 卡片切换 / 懒加载 */
const TreePageExample = () => {
  const treePageRef = useRef(null);
  const { selectedRowKeys, selectedRows, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });
  const [checkRelation, setCheckRelation] = useState('parent');
  const lazyDataRef = useRef(lazyOrgRoot);
  const lazyPageRef = useRef(null);

  const handleLoadChildren = (item, { key }) =>
    new Promise(resolve => {
      setTimeout(() => {
        lazyDataRef.current = mergeTreeChildren(lazyDataRef.current, lazyOrgChildrenMap[key] || [], {
          parentKeyValue: key,
          dataType: 'treeList',
          rowKey: 'id',
          parentKey: 'parentId',
          hasChildrenKey: 'hasChildren'
        });
        lazyPageRef.current?.reload?.();
        resolve();
      }, 800);
    });

  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        <Tag color="blue" style={{ marginRight: 8 }}>
          tree
        </Tag>
        树形 TablePage：支持 <code>dataType</code>、<code>checkRelation</code>，并演示筛选 / 搜索 / 批量操作 / 行操作 / <code>renderCard</code> 卡片切换 / 懒加载。
      </div>

      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>treeList + 工具栏（筛选 / 批量 / 操作 / 卡片切换）</div>
        <Space style={{ marginBottom: 8 }} wrap>
          <span style={{ color: '#666' }}>checkRelation：</span>
          <Radio.Group
            value={checkRelation}
            optionType="button"
            options={[
              { label: 'parent', value: 'parent' },
              { label: 'all', value: 'all' },
              { label: 'independent', value: 'independent' }
            ]}
            onChange={e => {
              setCheckRelation(e.target.value);
              clearSelectedRows();
            }}
          />
        </Space>
        <TablePage
          ref={treePageRef}
          name="demo-table-page-tree-list"
          pagination={{ open: false }}
          columns={treeColumns}
          dataType="treeList"
          defaultExpandedKeys
          controllerOpen={false}
          renderMobile
          renderCard={renderOrgTreeCard}
          rowSelection={getRowSelection(orgTreeListData, { type: 'checkbox', allowSelectedAll: true, checkRelation })}
          selectedRows={selectedRows}
          search={{ name: 'keyword', label: '关键词', placeholder: '搜索名称/编码/负责人', style: { width: 240 } }}
          buttonGroup={{
            list: [
              {
                type: 'primary',
                children: '新建组织',
                onClick: () => message.success('打开新建组织')
              },
              {
                children: '导出组织树',
                onClick: () => message.info('正在导出组织树')
              }
            ]
          }}
          tab={{
            name: 'region',
            label: '大区',
            list: orgRegionOptions
          }}
          filter={{
            list: [
              [
                {
                  type: SuperSelectFilterItem,
                  props: { name: 'status', label: '状态', single: true, options: orgStatusOptions }
                }
              ]
            ],
            displayLine: 1
          }}
          batchActions={[
            {
              key: 'export',
              label: '批量导出',
              onClick: ({ selectedRowKeys: keys }) => {
                message.info(&#96;正在导出 ${keys.length} 个节点&#96;);
              }
            },
            {
              key: 'enable',
              label: '批量启用',
              onClick: ({ selectedRowKeys: keys }) => {
                message.success(&#96;已启用 ${keys.length} 个节点&#96;);
              }
            },
            {
              key: 'disable',
              label: '批量停用',
              danger: true,
              onClick: ({ selectedRowKeys: keys }) => {
                message.warning(&#96;已停用 ${keys.length} 个节点&#96;);
              }
            }
          ]}
          loader={({ data, requestParams }) => {
            const filtered = applyOrgTreeFilters(orgTreeListData, data, requestParams);
            return Promise.resolve({
              pageData: filtered,
              totalCount: filtered.length
            });
          }}
        />
        <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>已选 key：{selectedRowKeys.join(', ') || '无'}</div>
      </div>

      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>dataType="tree"（嵌套 children）</div>
        <TablePage
          name="demo-table-page-tree"
          pagination={{ open: false }}
          columns={treeColumns}
          dataType="tree"
          defaultExpandedKeys
          controllerOpen={false}
          renderMobile
          renderCard={renderOrgTreeCard}
          buttonGroup={{
            list: [{ type: 'primary', children: '新建', onClick: () => message.success('新建') }]
          }}
          loader={() =>
            Promise.resolve({
              pageData: orgTreeData,
              totalCount: orgTreeData.length
            })
          }
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>懒加载：hasChildren + onLoadChildren + mergeTreeChildren</div>
        <TablePage
          ref={lazyPageRef}
          name="demo-table-page-tree-lazy"
          pagination={{ open: false }}
          columns={treeColumns}
          dataType="treeList"
          controllerOpen={false}
          onLoadChildren={handleLoadChildren}
          loader={() =>
            Promise.resolve({
              pageData: lazyDataRef.current,
              totalCount: lazyDataRef.current.length
            })
          }
        />
      </div>
    </Flex>
  );
};


render(
  <Flex vertical gap={32}>
    <BaseExample />
    <TreePageExample />
    <SearchMobileExample />
  </Flex>
);


```

- filter reload 一致性
- 验证已选筛选与 reload 查询条件一致：选筛选项后，批量操作 / ref 裸调 reload（含 reload({ data: { currentPage: 1 } })）仍必须带上当前筛选；页面展示最近一次请求参数便于核对
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd),_ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css)

```jsx
const { default: TablePage, Table } = _TablePage;
const { fields } = _ReactFilter;
const { SuperSelectFilterItem } = fields;
const { Flex, Tag, Button, Space, message, Alert } = antd;
const { useMemo, useState, useRef, useCallback } = React;

const TOTAL = 80;
const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];
const statuses = [
  { value: 'active', label: '在职' },
  { value: 'vacation', label: '休假' },
  { value: 'probation', label: '试用期' },
  { value: 'resigned', label: '离职' }
];
const positions = ['工程师', '高级工程师', '经理', '总监', '专员'];

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  probation: { type: 'processing', text: '试用期' },
  resigned: { type: 'default', text: '离职' }
};

const normalizeFilterValue = value => {
  if (value == null) {
    return value;
  }
  return Array.isArray(value) ? value[0] : value;
};

const pickQueryFilters = data => {
  const keys = ['department', 'status', 'position', 'keyword'];
  const next = {};
  keys.forEach(key => {
    const value = normalizeFilterValue(data?.[key]);
    if (value != null && value !== '') {
      next[key] = value;
    }
  });
  return next;
};

const buildEmployee = index => ({
  id: index + 1,
  name: &#96;员工${index + 1}&#96;,
  department: departments[index % departments.length],
  position: positions[index % positions.length],
  status: statuses[index % statuses.length].value
});

const applyFilters = (list, data) => {
  let result = list;
  const department = normalizeFilterValue(data?.department);
  if (department) {
    result = result.filter(item => item.department === department);
  }
  const status = normalizeFilterValue(data?.status);
  if (status) {
    result = result.filter(item => item.status === status);
  }
  const position = normalizeFilterValue(data?.position);
  if (position) {
    result = result.filter(item => item.position === position);
  }
  if (data?.keyword) {
    const keyword = String(data.keyword).toLowerCase();
    result = result.filter(item => item.name.toLowerCase().includes(keyword));
  }
  return result;
};

/**
 * 验证：已选筛选 UI 与 reload 查询条件必须一致。
 *
 * 复现步骤：
 * 1. 选择「部门 / 状态」等筛选项，确认列表已过滤、上方已选标签有值
 * 2. 勾选若干行，点「批量操作」完成业务后 reload
 * 3. 期望：已选标签不变；列表仍按筛选过滤；「最近一次请求参数」仍含筛选字段
 */
const FilterReloadExample = () => {
  const tableRef = useRef();
  const employeesRef = useRef(Array.from({ length: TOTAL }, (_, i) => buildEmployee(i)));
  const [dataVersion, setDataVersion] = useState(0);
  const { selectedRowKeys, selectedRows, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });
  const [lastQuery, setLastQuery] = useState({});
  const [lastTrigger, setLastTrigger] = useState('首包');
  const triggerRef = useRef('首包');

  const allEmployees = employeesRef.current;
  const queryText = JSON.stringify(lastQuery, null, 2);
  const hasFilterInQuery = Object.keys(lastQuery).length > 0;

  const runAfterBatch = useCallback(
    (label, mutate) => {
      mutate(employeesRef.current);
      setDataVersion(v => v + 1);
      clearSelectedRows();
      triggerRef.current = label;
      // 故意裸调：只重置页码，不应丢掉当前已选筛选
      tableRef.current?.reload({ data: { currentPage: 1 } });
    },
    [clearSelectedRows]
  );

  return (
    <Flex vertical gap={12}>
      <Alert
        type="info"
        showIcon
        message="筛选 + 选择 + 批量操作 + reload 一致性"
        description={
          <div style={{ lineHeight: 1.7 }}>
            1. 先选筛选项（部门/状态等）
            <br />
            2. 勾选若干行（支持表头全选当前可勾选行）
            <br />
            3. 点「批量操作」执行业务（会改本地数据并 <code>reload</code>）
            <br />
            通过标准：已选筛选标签不变；列表仍是过滤结果；下方请求参数仍含筛选字段
          </div>
        }
      />

      <div
        style={{
          padding: 12,
          background: hasFilterInQuery ? '#f6ffed' : '#fff7e6',
          border: &#96;1px solid ${hasFilterInQuery ? '#b7eb8f' : '#ffd591'}&#96;,
          borderRadius: 8,
          fontSize: 13
        }}
      >
        <Space wrap style={{ marginBottom: 8 }}>
          <Tag color={hasFilterInQuery ? 'success' : 'warning'}>{hasFilterInQuery ? '请求含筛选' : '请求无筛选字段'}</Tag>
          <Tag>触发方式：{lastTrigger}</Tag>
          <Tag color="blue">已选 {selectedRowKeys.length} 条</Tag>
          <Tag>数据版本 {dataVersion}</Tag>
        </Space>
        <div style={{ color: '#666', marginBottom: 4 }}>最近一次请求参数（从 loader 的 data 提取）：</div>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{queryText === '{}' ? '{ }（无 department / status / position / keyword）' : queryText}</pre>
        {selectedRows.length > 0 ? (
          <div style={{ marginTop: 8, color: '#666' }}>
            当前选中：{selectedRows.map(item => item.name).join('、')}
          </div>
        ) : null}
      </div>

      <Space wrap>
        <Button
          onClick={() => {
            triggerRef.current = 'ref.reload({ data: { currentPage: 1 } })';
            tableRef.current?.reload({ data: { currentPage: 1 } });
          }}
        >
          ref.reload（裸调）
        </Button>
        <Button
          onClick={() => {
            triggerRef.current = 'ref.reload()';
            tableRef.current?.reload();
          }}
        >
          ref.reload() 无参
        </Button>
        <Button disabled={!selectedRowKeys.length} onClick={() => clearSelectedRows()}>
          清空选择
        </Button>
      </Space>

      <TablePage
        ref={tableRef}
        name="demo-filter-reload"
        rowKey="id"
        rowSelection={getRowSelection(allEmployees)}
        selectedRows={selectedRows}
        search={{ name: 'keyword', label: '关键词', placeholder: '搜姓名' }}
        filter={{
          list: [
            {
              type: SuperSelectFilterItem,
              props: {
                name: 'department',
                label: '部门',
                single: true,
                options: departments.map(item => ({ value: item, label: item }))
              }
            },
            {
              type: SuperSelectFilterItem,
              props: {
                name: 'status',
                label: '状态',
                single: true,
                options: statuses
              }
            },
            {
              type: SuperSelectFilterItem,
              props: {
                name: 'position',
                label: '职位',
                single: true,
                options: positions.map(item => ({ value: item, label: item }))
              }
            }
          ]
        }}
        batchActions={[
          {
            key: 'set-active',
            label: '批量设为在职',
            onClick: ({ selectedRowKeys: keys }) => {
              const idSet = new Set(keys);
              runAfterBatch('batch:设为在职 → reload', list => {
                list.forEach(item => {
                  if (idSet.has(item.id)) {
                    item.status = 'active';
                  }
                });
              });
              message.success(&#96;已将 ${keys.length} 人设为在职并 reload&#96;);
            }
          },
          {
            key: 'set-vacation',
            label: '批量设为休假',
            onClick: ({ selectedRowKeys: keys }) => {
              const idSet = new Set(keys);
              runAfterBatch('batch:设为休假 → reload', list => {
                list.forEach(item => {
                  if (idSet.has(item.id)) {
                    item.status = 'vacation';
                  }
                });
              });
              message.success(&#96;已将 ${keys.length} 人设为休假并 reload&#96;);
            }
          },
          {
            key: 'remove',
            label: '批量删除',
            danger: true,
            onClick: ({ selectedRowKeys: keys }) => {
              const idSet = new Set(keys);
              runAfterBatch('batch:删除 → reload', list => {
                employeesRef.current = list.filter(item => !idSet.has(item.id));
              });
              message.success(&#96;已删除 ${keys.length} 人并 reload&#96;);
            }
          },
          {
            key: 'reload-only',
            label: '仅 reload（不改数据）',
            onClick: ({ selectedRowKeys: keys, reload }) => {
              message.info(&#96;已选 ${keys.length} 条，仅触发 reload&#96;);
              triggerRef.current = 'batchActions.reload({ data: { currentPage: 1 } })';
              reload({ data: { currentPage: 1 } });
            }
          }
        ]}
        pagination={{
          open: true,
          pageSize: 10,
          showSizeChanger: true
        }}
        dataFormat={data => ({
          list: data.pageData,
          total: data.totalCount,
          data
        })}
        loader={({ data }) => {
          const query = pickQueryFilters(data);
          const trigger = triggerRef.current;
          const currentPage = Number(data?.currentPage) || 1;
          const perPage = Number(data?.perPage) || 10;
          const source = employeesRef.current;
          const filtered = applyFilters(source, data);
          const start = (currentPage - 1) * perPage;

          return new Promise(resolve => {
            setTimeout(() => {
              setLastQuery(query);
              setLastTrigger(trigger);
              triggerRef.current = '筛选/翻页等内部 reload';
              resolve({
                pageData: filtered.slice(start, start + perPage).map(item => ({ ...item })),
                totalCount: filtered.length
              });
            }, 300);
          });
        }}
        columns={[
          { name: 'id', title: 'ID', width: 70 },
          { name: 'name', title: '姓名', width: 120 },
          { name: 'department', title: '部门', width: 140 },
          { name: 'position', title: '职位', width: 120 },
          {
            name: 'status',
            title: '状态',
            width: 100,
            renderType: 'status',
            getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
          }
        ]}
      />
    </Flex>
  );
};

render(<FilterReloadExample />);


```

- searchParamsValue
- filter.searchParamsValue 与 useSearchParamsValue 同参：从 URL 平铺参数合并进 defaultValue（URL 同名覆盖），保证首包请求已带筛选；可选 setSearchParams 清理已消费 key
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd),_ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css)

```jsx
const { default: TablePage } = _TablePage;
const { fields } = _ReactFilter;
const { InputFilterItem } = fields;
const { Flex, Typography, Card } = antd;
const { useMemo, useState } = React;

const mockUsers = [
  { id: '1', name: 'Alice', userId: 'u-1001', tenantId: 't-88' },
  { id: '2', name: 'Bob', userId: 'u-1002', tenantId: 't-88' },
  { id: '3', name: 'Carol', userId: 'u-2002', tenantId: 't-99' }
];

/**
 * TablePage filter.searchParamsValue：与 useSearchParamsValue 同参。
 * 非受控 defaultValue 与 URL 按 name 合并（URL 同名覆盖）；首包请求参数已含合并结果。
 */
const BaseExample = () => {
  const [lastRequest, setLastRequest] = useState(null);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set('userId', 'u-1001');
    return params;
  }, []);

  const [liveSearch, setLiveSearch] = useState(searchParams);

  return (
    <Flex vertical gap={16}>
      <Card size="small" title="说明">
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          模拟 URL <Typography.Text code>?userId=u-1001</Typography.Text>，并配置 defaultValue 含 status。合并后首包应同时带上 status 与 userId。
        </Typography.Paragraph>
      </Card>
      {lastRequest ? (
        <Card size="small" title="首次/最近请求 data 参数">
          <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(lastRequest, null, 2)}</pre>
        </Card>
      ) : null}
      <TablePage
        name="search-params-value-demo"
        data={{ currentPage: 1, perPage: 10 }}
        pagination={{ paramsType: 'data' }}
        filter={{
          defaultValue: [{ name: 'status', label: '状态', value: { label: '开启', value: 'open' } }],
          searchParamsValue: {
            searchParams: liveSearch,
            setSearchParams: next => setLiveSearch(next),
            fields: [
              { name: 'userId', label: '用户Id' },
              { name: 'tenantId', label: '租户Id' }
            ]
          },
          list: [
            [
              { type: InputFilterItem, props: { name: 'userId', label: '用户Id' } },
              { type: InputFilterItem, props: { name: 'tenantId', label: '租户Id' } },
              { type: InputFilterItem, props: { name: 'status', label: '状态' } }
            ]
          ]
        }}
        loader={({ data }) => {
          setLastRequest(data);
          const list = mockUsers.filter(row => {
            if (data.userId && row.userId !== data.userId) return false;
            if (data.tenantId && row.tenantId !== data.tenantId) return false;
            return true;
          });
          return Promise.resolve({
            pageData: list,
            totalCount: list.length
          });
        }}
        columns={[
          { name: 'name', title: '姓名', type: 'main' },
          { name: 'userId', title: '用户Id' },
          { name: 'tenantId', title: '租户Id' }
        ]}
      />
      <Typography.Text type="secondary">当前 search：?{liveSearch.toString() || '(已清理)'}</Typography.Text>
    </Flex>
  );
};

render(<BaseExample />);


```

- pagination searchParams
- pagination.searchParams + setSearchParams：当前页与每页条数写入 URL（默认 currentPage / perPage）；落地 URL 决定首包分页，翻页与改 pageSize 以 replace 写回
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { default: TablePage } = _TablePage;
const { Flex, Typography, Card } = antd;
const { useMemo, useState } = React;

const TOTAL = 56;
const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

/**
 * pagination.searchParams + setSearchParams：当前页 / 每页条数与 URL 双向同步。
 * 模拟落地 ?currentPage=2&perPage=10，翻页或改 pageSize 后 URL 会 replace 更新。
 */
const BaseExample = () => {
  const initialSearchParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set('currentPage', '2');
    params.set('perPage', '10');
    return params;
  }, []);

  const [liveSearch, setLiveSearch] = useState(initialSearchParams);
  const [lastRequest, setLastRequest] = useState(null);

  return (
    <Flex vertical gap={16}>
      <Card size="small" title="说明">
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          模拟 URL <Typography.Text code>?currentPage=2&perPage=10</Typography.Text>
          。首包应请求第 2 页、每页 10 条；翻页或切换每页条数后下方 search 同步更新（replace）。
        </Typography.Paragraph>
      </Card>
      {lastRequest ? (
        <Card size="small" title="最近请求 data 参数">
          <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(lastRequest, null, 2)}</pre>
        </Card>
      ) : null}
      <TablePage
        name="pagination-search-params-demo"
        pagination={{
          paramsType: 'data',
          searchParams: liveSearch,
          setSearchParams: next => setLiveSearch(next),
          pageSizeOptions: ['10', '20', '50'],
          showSizeChanger: true,
          hideOnSinglePage: false,
          cachePageSize: false
        }}
        loader={({ data }) => {
          setLastRequest(data);
          const currentPage = Number(data.currentPage) || 1;
          const perPage = Number(data.perPage) || 10;
          const start = (currentPage - 1) * perPage;
          const pageData = range(start, Math.min(start + perPage, TOTAL)).map(index => ({
            id: String(index + 1),
            name: &#96;用户 ${index + 1}&#96;,
            no: &#96;NO-${String(index + 1).padStart(3, '0')}&#96;
          }));
          return Promise.resolve({
            pageData,
            totalCount: TOTAL
          });
        }}
        columns={[
          { name: 'no', title: '编号', type: 'main' },
          { name: 'name', title: '姓名' }
        ]}
      />
      <Typography.Text type="secondary">当前 search：?{liveSearch.toString() || '(空)'}</Typography.Text>
    </Flex>
  );
};

render(<BaseExample />);


```

- TablePage sticky scroll
- 自包含演示区：sticky + getScrollContainer 由区内页面滚动触发表头吸顶（非 scroll.y）；模拟导航在区内 sticky，不遮挡文档站顶栏
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd),_ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css)

```jsx
const { default: TablePage } = _TablePage;
const { fields } = _ReactFilter;
const { SuperSelectFilterItem } = fields;
const { Flex, Tag } = antd;
const { useRef, useMemo } = React;

const NAV_HEIGHT = 56;
const DEMO_HEIGHT = 600;
const TOTAL = 80;

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  resigned: { type: 'default', text: '离职' },
  probation: { type: 'processing', text: '试用期' }
};

const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];

const departmentOptions = departments.map(item => ({ value: item, label: item }));
const statusOptions = Object.entries(statusMap).map(([value, { text }]) => ({ value, label: text }));

const normalizeFilterValue = value => {
  if (value == null) {
    return value;
  }
  return Array.isArray(value) ? value[0] : value;
};

const applyFilters = (employees, data, requestParams) => {
  const params = Object.assign({}, requestParams?.data, data);
  let result = employees;

  if (params.keyword) {
    const keyword = String(params.keyword).toLowerCase();
    result = result.filter(item => item.employeeNo.toLowerCase().includes(keyword) || item.name.includes(params.keyword));
  }

  const department = normalizeFilterValue(params.department);
  if (department) {
    result = result.filter(item => item.department === department);
  }

  const status = normalizeFilterValue(params.status);
  if (status) {
    result = result.filter(item => item.status === status);
  }

  return result;
};

const buildEmployee = index => {
  const statusKeys = ['active', 'vacation', 'resigned', 'probation'];
  return {
    id: &#96;EMP${String(index + 1).padStart(4, '0')}&#96;,
    employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, '0')}&#96;,
    name: &#96;员工${index + 1}&#96;,
    department: departments[index % departments.length],
    position: ['工程师', '经理', '专员'][index % 3],
    status: statusKeys[index % statusKeys.length],
    joinDate: &#96;2024-${String((index % 12) + 1).padStart(2, '0')}-15&#96;
  };
};

const allEmployees = Array.from({ length: TOTAL }, (_, index) => buildEmployee(index));

const columns = [
  { name: 'employeeNo', title: '工号', width: 160, min: 120, max: 220, fixed: 'left', renderType: 'small' },
  { name: 'name', title: '姓名', width: 100, renderType: 'main' },
  { name: 'department', title: '部门', width: 150 },
  { name: 'position', title: '职位', width: 120 },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'joinDate', title: '入职日期', width: 120, format: 'date' }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">页面滚动</Tag>
      在下方<strong>灰色边框演示区</strong>内滚动（非 <code>scroll.y</code>）；表头通过 <code>sticky</code> + <code>getScrollContainer</code> 吸顶。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">getScrollContainer</Tag>
      指向演示区滚动容器；<code>scrollTopInset</code> 传入顶部导航占位高度（<code>{NAV_HEIGHT}px</code>），用于吸顶表头偏移与翻页滚回。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="gold">筛选栏</Tag>
      顶部工具栏含 <code>search</code> 与 <code>filter</code>；筛选变化会 <code>reload</code> 并回到第 1 页，翻页后滚回工具栏顶部。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="purple">横向 Scroller</Tag>
      表格底部未完全露出时，会在滚动容器底部显示横向滚动条（<code>horizontalScroller</code> 默认开启）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">操作提示</Tag>
      在演示区内向下滚动，蓝色导航条会吸顶，表格表头应固定在其下方；翻页后滚回表格顶部。
    </div>
  </div>
);

const BaseExample = () => {
  const scrollRef = useRef(null);

  const loader = useMemo(
    () =>
      ({ data, requestParams }) => {
        const currentPage = Number(data?.currentPage) || 1;
        const perPage = Number(data?.perPage) || 50;
        const filteredEmployees = applyFilters(allEmployees, data, requestParams);
        const start = (currentPage - 1) * perPage;
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              pageData: filteredEmployees.slice(start, start + perPage),
              totalCount: filteredEmployees.length
            });
          }, 200);
        });
      },
    []
  );

  return (
    <Flex vertical gap={16}>
      <Tips />
      <div
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#fff'
        }}
      >
        <div
          ref={scrollRef}
          style={{
            height: DEMO_HEIGHT,
            overflow: 'auto',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              height: NAV_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              color: '#fff',
              fontWeight: 500,
              background: '#1677ff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)'
            }}
          >
            模拟顶部导航（{NAV_HEIGHT}px）
          </div>
          <Flex vertical gap={16} style={{ padding: 16 }}>
            <div
              style={{
                padding: '20px 24px',
                background: '#f5f5f5',
                borderRadius: 8,
                color: '#666',
                fontSize: 13
              }}
            >
              在演示区内继续向下滚动 ↓
            </div>
            <div
              style={{
                height: 520,
                borderRadius: 8,
                background: 'linear-gradient(180deg, #f0f5ff 0%, #fff 100%)',
                border: '1px dashed #d9d9d9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999'
              }}
            >
              占位区域（模拟页面上方内容）
            </div>
            <TablePage
              name="demo-table-page-sticky-scroll"
              sticky
              scrollTopInset={NAV_HEIGHT}
              getScrollContainer={() => scrollRef.current}
              scroll={{ x: 900 }}
              search={{ name: 'keyword', label: '关键词', placeholder: '搜索工号/姓名', style: { width: 200 } }}
              filter={{
                list: [
                  [
                    {
                      type: SuperSelectFilterItem,
                      props: { name: 'department', label: '部门', single: true, options: departmentOptions }
                    },
                    {
                      type: SuperSelectFilterItem,
                      props: { name: 'status', label: '状态', single: true, options: statusOptions }
                    }
                  ]
                ],
                displayLine: 1
              }}
              pagination={{
                open: true,
                pageSize: 50,
                cachePageSize: false,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              dataFormat={data => ({
                list: data.pageData,
                total: data.totalCount
              })}
              loader={loader}
              columns={columns}
            />
            <div style={{ height: 80, color: '#999', fontSize: 13, textAlign: 'center' }}>演示区底部留白</div>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- TableView
- 表格视图组件，支持行选择、列宽设置等
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { TableView } = _TablePage;
const { Flex, Tag } = antd;
const { useState } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '138-0013-8000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '139-0014-9000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '137-0015-7000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '136-0016-6000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    phone: '135-0017-5000',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12',
    deliveryDate: ''
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
  { name: 'customerName', title: '客户名称', span: 10, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 80 },
  { name: 'phone', title: '联系电话', width: '130px', render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额(元)',
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', format: 'date' },
  { name: 'deliveryDate', title: '预计送达', format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const WithCheckbox = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong></span>
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'checkbox', allowSelectedAll: true, selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const WithSelected = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const selectedOrder = dataSource.find(d => d.id === selectKeys[0]);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选订单：{selectedOrder ? &#96;${selectedOrder.id} (${selectedOrder.customerName})&#96; : '无'}</span>
        {selectedOrder && <Tag color="blue">¥{selectedOrder.amount.toLocaleString()}</Tag>}
      </Flex>
      <TableView dataSource={dataSource} columns={columns} rowSelection={{
        type: 'radio', selectedRowKeys: selectKeys, onChange: setSelectKeys
      }} />
    </div>
  );
};

const WithColumnWidth = () => {
  const widthColumns = [
    { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
    { name: 'customerName', title: '客户名称', width: '200px', renderType: 'main' },
    {
      name: 'amount',
      title: '订单金额(元)',
      width: 120,
      renderType: 'amount',
      format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
    },
    {
      name: 'status',
      title: '订单状态',
      width: '100px',
      renderType: 'status',
      getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
    }
  ];
  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        通过 columns 的 <code>width</code> 设置列最小宽度，支持数字（如 <code>180</code>）或字符串（如 <code>'100px'</code>），内容超出时会自动撑开
      </div>
      <TableView dataSource={dataSource.slice(0, 3)} columns={widthColumns} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
        订单列表 - 共 <strong>{dataSource.length}</strong> 个订单
      </div>
      <WithColumnWidth />
      <TableView dataSource={dataSource} columns={columns} />
      <WithCheckbox />
      <WithSelected />
      <div style={{ padding: '16px', background: '#fafafa', border: '1px dashed #d9d9d9', borderRadius: '8px' }}>
        暂无订单数据
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- Table
- 基于 antd Table 的表格组件，支持列宽拖动、字段显示/隐藏，与 TableView 使用一致的 columns、rowSelection 等 API
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table } = _TablePage;
const { Flex, Tag } = antd;
const { useState } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

  const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '13800138000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '13900149000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '13700157000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '13600166000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    phone: '13500175000',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12',
    deliveryDate: '',
    disabled: true
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 200, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 80 },
  { name: 'phone', title: '联系电话', width: 130, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 120,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 110, format: 'date' },
  { name: 'deliveryDate', title: '预计送达', width: 110, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

  const WithCheckbox = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>
        多选 + 全选 — 最后一行「已取消」为 <code>disabled</code>，全选勾选态与选中结果都会跳过该行
      </div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
        </span>
      </Flex>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          allowSelectedAll: true,
          selectedRowKeys: selectKeys,
          onChange: setSelectKeys
        }}
      />
    </div>
  );
};

const WithSelected = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const selectedOrder = dataSource.find(d => d.id === selectKeys[0]);
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>已选订单：{selectedOrder ? &#96;${selectedOrder.id} (${selectedOrder.customerName})&#96; : '无'}</span>
        {selectedOrder && <Tag color="blue">¥{selectedOrder.amount.toLocaleString()}</Tag>}
      </Flex>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectKeys,
          onChange: setSelectKeys
        }}
      />
    </div>
  );
};

const WithScroll = () => {
  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        基于 antd Table 渲染，支持 <code>scroll</code>、<code>sticky</code> 等原生表格能力
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        sticky
        scroll={{ x: 1200, y: 240 }}
      />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
        订单列表（antd Table）- 共 <strong>{dataSource.length}</strong> 个订单，与 TableView 使用相同的 columns / rowSelection API
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <WithCheckbox />
      <WithSelected />
      <Table dataSource={[]} columns={columns} />
      <WithScroll />
    </Flex>
  );
};

render(<BaseExample />);


```

- tree
- 树状数据：Table / TableView 支持 dataType 为 tree / treeList，含展开收起、懒加载、checkRelation 勾选关联
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView, mergeTreeChildren } = _TablePage;
const { Space, Button, Radio } = antd;
const { useState } = React;

const columns = [
  { name: 'name', title: '名称', renderType: 'main' },
  { name: 'code', title: '编码', width: 120 },
  { name: 'owner', title: '负责人', width: 100 }
];

const treeData = [
  {
    id: '1',
    name: '华东区',
    code: 'EAST',
    owner: '张三',
    children: [
      {
        id: '1-1',
        name: '上海',
        code: 'SH',
        owner: '李四',
        children: [
          { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五' },
          { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六' }
        ]
      },
      { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七' }
    ]
  },
  {
    id: '2',
    name: '华北区',
    code: 'NORTH',
    owner: '孙八',
    children: [{ id: '2-1', name: '北京', code: 'BJ', owner: '周九' }]
  }
];

const treeListData = [
  { id: '1', name: '华东区', code: 'EAST', owner: '张三', parentId: null },
  { id: '1-1', name: '上海', code: 'SH', owner: '李四', parentId: '1' },
  { id: '1-1-1', name: '浦东分部', code: 'SH-PD', owner: '王五', parentId: '1-1' },
  { id: '1-1-2', name: '徐汇分部', code: 'SH-XH', owner: '赵六', parentId: '1-1' },
  { id: '1-2', name: '杭州', code: 'HZ', owner: '钱七', parentId: '1' },
  { id: '2', name: '华北区', code: 'NORTH', owner: '孙八', parentId: '' },
  { id: '2-1', name: '北京', code: 'BJ', owner: '周九', parentId: '2' }
];

const lazyRootData = [
  { id: 'org-1', name: '集团总部', code: 'HQ', owner: '张三', parentId: null, hasChildren: true },
  { id: 'org-2', name: '分公司', code: 'BR', owner: '李四', parentId: null, hasChildren: true }
];

const lazyChildrenMap = {
  'org-1': [
    { id: 'org-1-1', name: '研发中心', code: 'RD', owner: '王五', hasChildren: true },
    { id: 'org-1-2', name: '市场部', code: 'MKT', owner: '赵六', hasChildren: false }
  ],
  'org-1-1': [
    { id: 'org-1-1-1', name: '前端组', code: 'FE', owner: '钱七', hasChildren: false },
    { id: 'org-1-1-2', name: '后端组', code: 'BE', owner: '孙八', hasChildren: false }
  ],
  'org-2': [{ id: 'org-2-1', name: '华南办', code: 'SC', owner: '周九', hasChildren: false }]
};

const TreeExample = () => {
  const { selectedRowKeys, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });
  const treeListSelection = Table.useSelectedRow({ rowKey: 'id' });
  const [expandedKeys, setExpandedKeys] = useState(false);
  const [checkRelation, setCheckRelation] = useState('parent');
  const [lazyData, setLazyData] = useState(lazyRootData);

  const handleLoadChildren = (item, { key }) =>
    new Promise(resolve => {
      setTimeout(() => {
        const children = lazyChildrenMap[key] || [];
        setLazyData(prev =>
          mergeTreeChildren(prev, children, {
            parentKeyValue: key,
            dataType: 'treeList',
            rowKey: 'id',
            parentKey: 'parentId',
            hasChildrenKey: 'hasChildren'
          })
        );
        resolve();
      }, 800);
    });

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <div style={{ marginBottom: 8 }}>Table：dataType="tree"（嵌套 children）</div>
        <Table dataSource={treeData} columns={columns} dataType="tree" defaultExpandedKeys controllerOpen={false} />
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>Table：dataType="treeList" + 勾选（checkRelation）</div>
        <Space style={{ marginBottom: 8 }} wrap>
          <Radio.Group
            value={checkRelation}
            optionType="button"
            options={[
              { label: 'parent', value: 'parent' },
              { label: 'all', value: 'all' },
              { label: 'independent', value: 'independent' }
            ]}
            onChange={e => {
              setCheckRelation(e.target.value);
              clearSelectedRows();
            }}
          />
        </Space>
        <Table dataSource={treeListData} columns={columns} dataType="treeList" defaultExpandedKeys controllerOpen={false} rowSelection={getRowSelection(treeListData, { allowSelectedAll: true, checkRelation })} />
        <div style={{ marginTop: 8 }}>已选 key：{selectedRowKeys.join(', ') || '无'}</div>
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>Table：懒加载（hasChildren + onLoadChildren + mergeTreeChildren）</div>
        <Table dataSource={lazyData} columns={columns} dataType="treeList" onLoadChildren={handleLoadChildren} controllerOpen={false} />
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>Table：受控展开 true / false / key 数组</div>
        <Space style={{ marginBottom: 8 }}>
          <Button size="small" onClick={() => setExpandedKeys(true)}>
            全部展开
          </Button>
          <Button size="small" onClick={() => setExpandedKeys(false)}>
            全部收起
          </Button>
          <Button size="small" onClick={() => setExpandedKeys(['1', '1-1'])}>
            展开指定节点
          </Button>
        </Space>
        <Table dataSource={treeData} columns={columns} dataType="tree" expandedKeys={expandedKeys} onExpandedKeysChange={setExpandedKeys} controllerOpen={false} />
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>TableView：同样 API（CSS Grid 树形）</div>
        <TableView dataSource={treeListData} columns={columns} dataType="treeList" defaultExpandedKeys rowSelection={treeListSelection.getRowSelection(treeListData, { allowSelectedAll: true, checkRelation: 'parent' })} />
      </div>
    </Space>
  );
};

render(<TreeExample />);


```

- useSelectedRow
- 行选择 Hook，配合 Table / TableView 实现多选、全选、批量操作与单选
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Button, Flex, Space, message } = antd;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    amount: 42500,
    status: '待发货',
    orderDate: '2024-01-15'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13'
  },
  {
    id: 'ORD20240115005',
    customerName: '百度在线网络技术（北京）有限公司',
    contact: '钱七',
    amount: 95000,
    status: '已取消',
    orderDate: '2024-01-12'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 180, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 220, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 100 },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 130,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 120, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const BatchToolbar = ({ selectedRowKeys, selectedRows, clearSelectedRows, onBatchShip, onBatchExport }) => {
  const totalAmount = selectedRows.reduce((sum, item) => sum + (item.amount || 0), 0);
  return (
    <Flex justify="space-between" align="center" style={{ marginBottom: 12, padding: '12px', background: '#f5f5f5', borderRadius: 8 }}>
      <Space>
        <span>
          已选 <strong>{selectedRowKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
        </span>
        <Button type="primary" size="small" disabled={!selectedRowKeys.length} onClick={onBatchShip}>
          批量发货
        </Button>
        <Button size="small" disabled={!selectedRowKeys.length} onClick={onBatchExport}>
          批量导出
        </Button>
        <Button size="small" disabled={!selectedRowKeys.length} onClick={clearSelectedRows}>
          清空选择
        </Button>
      </Space>
    </Flex>
  );
};

const TableExample = () => {
  const { selectedRowKeys, selectedRows, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>Table + useSelectedRow</div>
      <BatchToolbar
        selectedRowKeys={selectedRowKeys}
        selectedRows={selectedRows}
        clearSelectedRows={clearSelectedRows}
        onBatchShip={() => {
          message.success(&#96;已批量发货 ${selectedRowKeys.length} 个订单&#96;);
          clearSelectedRows();
        }}
        onBatchExport={() => message.info(&#96;正在导出 ${selectedRowKeys.length} 个订单&#96;)}
      />
      <Table dataSource={dataSource} columns={columns} rowSelection={getRowSelection(dataSource)} />
    </div>
  );
};

const TableViewExample = () => {
  const { selectedRowKeys, selectedRows, getRowSelection, clearSelectedRows } = TableView.useSelectedRow({ rowKey: 'id' });

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>TableView + useSelectedRow</div>
      <BatchToolbar
        selectedRowKeys={selectedRowKeys}
        selectedRows={selectedRows}
        clearSelectedRows={clearSelectedRows}
        onBatchShip={() => {
          message.success(&#96;已批量发货 ${selectedRowKeys.length} 个订单&#96;);
          clearSelectedRows();
        }}
        onBatchExport={() => message.info(&#96;正在导出 ${selectedRowKeys.length} 个订单&#96;)}
      />
      <TableView dataSource={dataSource} columns={columns} rowSelection={getRowSelection(dataSource)} />
    </div>
  );
};

const RadioExample = () => {
  const { selectedRowKeys, selectedRows, getRowSelection } = Table.useSelectedRow({ rowKey: 'id', type: 'radio' });
  const selectedOrder = selectedRows[0];

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>单选模式 type: 'radio'</div>
      <div style={{ marginBottom: 12 }}>
        当前选中：{selectedOrder ? &#96;${selectedOrder.id}（${selectedOrder.customerName}）&#96; : '无'}
      </div>
      <Table dataSource={dataSource} columns={columns} rowSelection={getRowSelection(dataSource)} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <TableExample />
      <TableViewExample />
      <RadioExample />
    </Flex>
  );
};

render(<BaseExample />);


```

- useSort
- 排序 Hook，配合 Table / TableView 实现表头排序、单列/多列排序与 sortDataSource 本地排序
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Tag } = antd;
const { useMemo } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  { id: 'ORD001', customerName: '深圳市腾讯计算机系统有限公司', amount: 42500, status: '已完成', orderDate: '2024-01-15' },
  { id: 'ORD002', customerName: '华为技术有限公司', amount: 85000, status: '处理中', orderDate: '2024-01-14' },
  { id: 'ORD003', customerName: '阿里巴巴集团控股有限公司', amount: 120000, status: '待发货', orderDate: '2024-01-16' },
  { id: 'ORD004', customerName: '北京字节跳动科技有限公司', amount: 65000, status: '已完成', orderDate: '2024-01-13' },
  { id: 'ORD005', customerName: '百度在线网络技术（北京）有限公司', amount: 95000, status: '已取消', orderDate: '2024-01-12' }
];

const columns = [
  { name: 'id', title: '订单编号', width: 140, sort: { single: true }, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 240, sort: true, renderType: 'main' },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 130,
    sort: true,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 120, sort: true, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const SortState = ({ sort }) => (
  <div style={{ marginBottom: 12, padding: '12px', background: '#f5f5f5', borderRadius: 8 }}>
    当前排序：
    {sort.length ? (
      <span>
        {sort.map(item => (
          <Tag key={item.name} color="blue" style={{ marginLeft: 8 }}>
            {item.name} {item.sort}
          </Tag>
        ))}
      </span>
    ) : (
      <span style={{ marginLeft: 8, color: '#999' }}>无</span>
    )}
  </div>
);

const TableExample = () => {
  const { sort, sortRender } = Table.useSort({
    onSortChange: value => console.log('Table 排序变更:', value)
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>Table + useSort（金额、日期支持多列排序）</div>
      <SortState sort={sort} />
      <Table dataSource={sortedData} columns={columns} sortRender={sortRender} />
    </div>
  );
};

const TableViewExample = () => {
  const { sort, sortRender } = TableView.useSort({
    defaultSort: [{ name: 'orderDate', sort: 'DESC' }],
    onSortChange: value => console.log('TableView 排序变更:', value)
  });
  const sortedData = useMemo(() => TableView.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>TableView + useSort（默认按下单日期降序）</div>
      <SortState sort={sort} />
      <TableView dataSource={sortedData} columns={columns} sortRender={sortRender} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13 }}>
        列配置 <code>sort: true</code> 开启排序，<code>sort: {'{ single: true }'}</code> 为单列排序。点击表头三角切换 DESC → ASC → 取消。
      </div>
      <TableExample />
      <TableViewExample />
    </Flex>
  );
};

render(<BaseExample />);


```

- column ellipsis
- 表头 title 超出列宽自动省略、悬停 tooltip；单元格 ellipsis 配置基于 antd Typography 实现内容省略
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Tag } = antd;
const { useMemo } = React;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司深圳总部研发中心',
    remark: '客户要求春节前完成交付，需协调物流加急处理，并同步更新合同附件与验收标准说明文档。',
    amount: 42500,
    status: '待发货'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司坂田基地采购中心',
    remark: '项目处于需求评审阶段，待客户确认最终配置清单后安排发货。',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司滨江园区',
    remark: '已完成付款，仓库正在拣货，预计两个工作日内发出第一批货物。',
    amount: 120000,
    status: '待发货'
  }
];

const columns = [
  { name: 'id', title: '订单编号（系统流水号）', width: 110, renderType: 'small' },
  {
    name: 'customerName',
    title: '客户名称（签约主体全称）',
    width: 140,
    renderType: 'main',
    ellipsis: true
  },
  {
    name: 'remark',
    title: '备注说明（内部流转备注）',
    width: 160,
    renderType: 'description',
    ellipsis: { showTitle: true }
  },
  {
    name: 'amount',
    title: '订单应付金额（含税，单位：元）',
    width: 120,
    sort: true,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '订单履约状态（业务状态）',
    width: 100,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">表头省略</Tag>
      列 <code>title</code> 超出列宽时自动单行省略，悬停 tooltip 显示完整标题；带排序的列同样生效（<code>Table</code> / <code>TableView</code> 均支持，无需额外配置）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">单元格省略</Tag>
      列配置 <code>ellipsis: true</code> 或 <code>ellipsis: {'{ showTitle: true }'}</code>，单元格内容超出时省略，悬停显示完整内容（基于 antd Typography）。
    </div>
    <div style={{ color: '#999' }}>
      本示例刻意使用较长表头与较窄列宽，便于观察省略与 tooltip 效果；可将鼠标悬停在表头或单元格上查看。
    </div>
  </div>
);

const TableExample = () => {
  const { sort, sortRender } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>Table（含排序表头省略）</div>
      <Table dataSource={sortedData} columns={columns} sortRender={sortRender} scroll={{ x: 700 }} />
    </div>
  );
};

const TableViewExample = () => {
  const { sort, sortRender } = TableView.useSort({});
  const sortedData = useMemo(() => TableView.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#666' }}>TableView（含排序表头省略）</div>
      <TableView dataSource={sortedData} columns={columns} sortRender={sortRender} />
    </div>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Tips />
      <TableExample />
      <TableViewExample />
    </Flex>
  );
};

render(<BaseExample />);


```

- renderType
- 列 renderType 配置：main / amount / tag / status / tagList / list / options / description / enum，支持与 short / small / large 尺寸修饰组合；配合 getValueOf、format、onClick 等列属性
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex } = antd;

const statusMap = {
  待发货: { type: 'warning', text: '待发货' },
  处理中: { type: 'processing', text: '处理中' },
  已完成: { type: 'success', text: '已完成' }
};

const categoryMap = {
  企业客户: { type: 'default', text: '企业客户' },
  战略客户: { type: 'processing', text: '战略客户' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    category: '企业客户',
    tags: ['物流', '加急'],
    keywords: ['合同', '附件', '春节前'],
    remark: '客户要求春节前完成交付，需协调物流加急处理，并同步更新合同附件。',
    amount: 42500,
    status: '待发货'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    category: '战略客户',
    tags: ['评审', '配置清单'],
    keywords: ['需求评审', '配置清单'],
    remark: '项目处于需求评审阶段，待客户确认最终配置清单后安排发货。',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    category: '企业客户',
    tags: ['拣货', '付款完成'],
    keywords: ['付款', '拣货', '发货'],
    remark: '已完成付款，仓库正在拣货，预计两个工作日内发出第一批货物。',
    amount: 120000,
    status: '已完成'
  }
];

const columns = [
  { name: 'id', title: '编号', renderType: 'small' },
  { name: 'customerName', title: '客户名称', renderType: 'main' },
  {
    name: 'category',
    title: '分类',
    renderType: 'tag-short',
    getValueOf: item => categoryMap[item.category]
  },
  {
    name: 'tags',
    title: '标签',
    renderType: 'tagList',
    getValueOf: item =>
      (item.tags || []).map(text => ({
        type: text === '加急' ? 'error' : 'processing',
        text
      }))
  },
  {
    name: 'keywords',
    title: '关键词',
    renderType: 'list',
    split: '、',
    getValueOf: item => item.keywords
  },
  { name: 'remark', title: '备注', renderType: 'description' },
  {
    name: 'amount',
    title: '金额',
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态',
    renderType: 'status',
    getValueOf: item => statusMap[item.status]
  },
  {
    name: 'options',
    title: '操作',
    renderType: 'options',
    fixed: 'right',
    getValueOf: item => {
      const actions = [
        { children: '查看', onClick: () => console.log('查看', item.id) },
        { children: '编辑', onClick: () => console.log('编辑', item.id) }
      ];
      if (item.status !== '已完成') {
        actions.push({
          children: '删除',
          isDelete: true,
          message: &#96;确定删除 ${item.id} 吗？&#96;,
          onClick: () => console.log('删除', item.id)
        });
      }
      return actions;
    }
  }
];

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
        <p>
          列配置 <code>renderType</code> 声明列的渲染方式，无需手写 <code>render</code>。内置类型：
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li><code>main</code> — 主信息列，支持 <code>primary</code> / <code>hover</code> / <code>onClick</code></li>
          <li><code>amount</code> — 金额列，右对齐，配合 <code>format</code> 格式化</li>
          <li><code>tag</code> — 单个 Tag，<code>getValueOf</code> 返回 <code>{'{ type, text }'}</code></li>
          <li><code>status</code> — 状态 Badge，<code>getValueOf</code> 返回 <code>{'{ type, text }'}</code></li>
          <li><code>tagList</code> — 多个 Tag 列表</li>
          <li><code>list</code> — 文本列表，可用 <code>split</code> 指定分隔符</li>
          <li><code>options</code> — 操作列，<code>getValueOf</code> 返回按钮配置数组</li>
          <li><code>description</code> — 长文本描述列</li>
          <li><code>enum</code> — 枚举值映射渲染</li>
        </ul>
        <p>
          可与尺寸修饰词组合：<code>short</code> / <code>small</code> / <code>large</code>（如 <code>tag-short</code>、<code>status-small</code>、<code>main-large</code>）。
          通过 <code>getValueOf</code> 传入 render 所需数据结构，通过 <code>format</code> 做日期、金额等展示格式化。
        </p>
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>Table</div>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1800 }} />
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>TableView</div>
        <TableView dataSource={dataSource} columns={columns} />
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- column render
- 列同时配置 render 与 renderType 时，render 优先级最高，覆盖内置 renderType 的单元格渲染（Table / TableView 一致）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Tag } = antd;

const statusMap = {
  待发货: { type: 'warning', text: '待发货' },
  处理中: { type: 'processing', text: '处理中' },
  已完成: { type: 'success', text: '已完成' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    amount: 42500,
    status: '待发货'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    amount: 120000,
    status: '已完成'
  }
];

const columns = [
  { name: 'id', title: '编号', renderType: 'small' },
  { name: 'customerName', title: '客户名称', renderType: 'main' },
  {
    name: 'amount',
    title: '金额',
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态（仅 renderType）',
    renderType: 'status',
    getValueOf: item => statusMap[item.status]
  },
  {
    name: 'statusRender',
    title: '状态（render 优先）',
    renderType: 'status',
    getValueOf: item => statusMap[item.status],
    render: (value, { dataSource }) => (
      <span style={{ color: '#1677ff' }}>
        自定义渲染：{dataSource.status}（未走 status Badge）
      </span>
    )
  }
];

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
        <p>
          列同时配置 <code>render</code> 与 <code>renderType</code> 时，
          <Tag color="blue" style={{ margin: '0 4px' }}>render 优先级最高</Tag>
          ，会直接使用自定义 <code>render</code>，不再走内置 renderType。
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>「状态（仅 renderType）」列：走内置 <code>status</code>，渲染 Badge</li>
          <li>「状态（render 优先）」列：同样写了 <code>renderType: 'status'</code>，但因存在 <code>render</code>，最终显示自定义内容</li>
          <li>renderType 仍可提供列宽等维度（width / min / max），仅单元格内容渲染被 <code>render</code> 覆盖</li>
        </ul>
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>Table</div>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>TableView</div>
        <TableView dataSource={dataSource} columns={columns} />
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- renderMobile
- 移动端专用渲染：true 为默认卡片 List；function 完全接管；string 从 preset 按名称查找；支持 mobileSortToolbar 排序工具栏
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView, preset } = _TablePage;
const { Flex, Tag, Card, Button, Dropdown, Tabs, Checkbox, Radio } = antd;
const { useState, useMemo } = React;

const statusMap = {
  已完成: { color: 'success', text: '已完成' },
  处理中: { color: 'processing', text: '处理中' },
  待发货: { color: 'warning', text: '待发货' }
};

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '13800138000',
    amount: 42500,
    status: '已完成'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '13900149000',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '13700157000',
    amount: 120000,
    status: '待发货'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 120, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 220, renderType: 'main', sort: true },
  { name: 'contact', title: '联系人', width: 80 },
  { name: 'phone', title: '联系电话', width: 130, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额',
    width: 120,
    sort: true,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => ({ type: statusMap[item.status]?.color || 'default', text: item.status })
  },
  {
    name: 'options',
    title: '操作',
    width: 140,
    renderType: 'options',
    getValueOf: item => [
      { children: '查看', onClick: () => console.log('查看', item.id) },
      { children: '编辑', onClick: () => console.log('编辑', item.id) },
      { children: '删除', isDelete: true, message: &#96;确定删除 ${item.id} 吗？&#96;, onClick: () => console.log('删除', item.id) }
    ]
  }
];

preset({
  renderMobile: {
    orderCard: ({ renderBody, dataSource = [] }) => {
      const totalAmount = dataSource.reduce((sum, item) => sum + item.amount, 0);
      return (
        <div
          className="preset-order-card-example"
          style={{
            borderRadius: 12,
            background: '#f5f7fa',
            padding: 16
          }}
        >
          <style>{&#96;
            .preset-order-card-example .info-page-table-mobile-card:not(.is-mobile-card-selected):not(.is-mobile-card-selected-all) {
              background: linear-gradient(135deg, #ffffff 0%, #f9f0ff 52%, #eef2ff 100%) !important;
              border-color: #e8dfff !important;
            }
            .preset-order-card-example .info-page-table-mobile-card:not(.is-mobile-card-selected):not(.is-mobile-card-selected-all):hover {
              background: linear-gradient(135deg, #fafafa 0%, #f3ebff 52%, #e8eeff 100%) !important;
            }
          &#96;}</style>
          <div style={{ marginBottom: 16 }}>
            <Flex justify="space-between" align="center" gap={8} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>近期订单</div>
              <Tag color="purple" style={{ margin: 0, flexShrink: 0 }}>
                preset: orderCard
              </Tag>
            </Flex>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
              {dataSource.length} 笔 · 合计 ¥{totalAmount.toLocaleString()}
            </div>
          </div>
          <div
            className="info-page-table"
            style={{
              '--kne-table-cell-padding': '14px 8px'
            }}
          >
            {renderBody()}
          </div>
        </div>
      );
    }
  }
});

const formatPhone = phone => phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

const getOrderActions = item => [
  { key: 'view', label: '查看', onClick: () => console.log('查看', item.id) },
  { key: 'edit', label: '编辑', onClick: () => console.log('编辑', item.id) },
  { key: 'delete', label: '删除', danger: true, onClick: () => console.log('删除', item.id) }
];

const OrderMobileCard = ({ item, checked, disabled, onCheckChange, selectionType = 'checkbox' }) => {
  const status = statusMap[item.status] || { color: 'default', text: item.status };
  const actionItems = getOrderActions(item);
  const isSelected = checked;
  const SelectionControl = selectionType === 'radio' ? Radio : Checkbox;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        background: isSelected ? 'var(--primary-color-1, #e6f4ff)' : '#fff',
        borderRadius: 12,
        padding: 16,
        border: &#96;1px solid ${isSelected ? 'var(--primary-color-2, var(--primary-color, #1677ff))' : 'transparent'}&#96;,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        color: isSelected ? 'var(--primary-color, #1677ff)' : undefined,
        boxSizing: 'border-box'
      }}
    >
      <SelectionControl checked={checked} disabled={disabled} onChange={onCheckChange} style={{ marginTop: 2, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Flex justify="space-between" align="center" gap={8} style={{ marginBottom: 10 }}>
          <Flex align="center" gap={8} wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
            <Tag color={status.color} style={{ margin: 0 }}>
              {status.text}
            </Tag>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{item.id}</span>
          </Flex>
          <Dropdown
            trigger={['click']}
            menu={{
              items: actionItems.map(({ key, label, danger, onClick }) => ({
                key,
                label,
                danger,
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  onClick();
                }
              }))
            }}
          >
            <Button type="text" size="small" style={{ padding: '0 4px' }} onClick={e => e.stopPropagation()}>
              ···
            </Button>
          </Dropdown>
        </Flex>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'rgba(0,0,0,0.88)',
            lineHeight: 1.5,
            marginBottom: 6
          }}
        >
          {item.customerName}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
          {item.contact} · {formatPhone(item.phone)}
        </div>
        <Flex
          justify="space-between"
          align="center"
          gap={12}
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px solid #f0f0f0'
          }}
        >
          <Flex align="baseline" gap={6} style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', flexShrink: 0 }}>订单金额</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#1677ff' }}>¥{item.amount.toLocaleString()}</span>
          </Flex>
          <Flex gap={4} align="center" style={{ flexShrink: 0 }}>
            {actionItems.slice(0, 2).map(({ key, label, onClick }) => (
              <Button
                key={key}
                type="link"
                size="small"
                style={{ padding: '0 4px', height: 'auto' }}
                onClick={e => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                {label}
              </Button>
            ))}
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

const DefaultMobileCards = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const totalAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);
  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        <code>renderMobile={'{true}'}</code>：移动端启用默认卡片 List，不再渲染 antd Table；
        开启 <code>allowSelectedAll</code> 后顶部工具栏左侧显示全选。请用示例预览的手机模式查看效果。
      </div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          已选 <strong>{selectKeys.length}</strong> 个订单，总金额 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
        </span>
      </Flex>
      <Component
        dataSource={dataSource}
        columns={columns}
        size="large"
        controllerOpen={false}
        renderMobile
        rowSelection={{
          type: 'checkbox',
          allowSelectedAll: true,
          selectedRowKeys: selectKeys,
          onChange: keys => setSelectKeys(keys)
        }}
      />
    </div>
  );
};

const SortState = ({ sort }) => (
  <div style={{ marginBottom: 12, padding: '10px 12px', background: '#f5f5f5', borderRadius: 8, fontSize: 13 }}>
    当前排序：
    {sort.length ? (
      <span>
        {sort.map(item => (
          <Tag key={item.name} color="blue" style={{ marginLeft: 8 }}>
            {item.name} {item.sort}
          </Tag>
        ))}
      </span>
    ) : (
      <span style={{ marginLeft: 8, color: '#999' }}>无</span>
    )}
  </div>
);

const MobileSortWithSelectAll = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Component
      dataSource={sortedData}
      columns={columns}
      size="large"
      controllerOpen={false}
      renderMobile
      sortRender={sortRender}
      mobileSortToolbar={mobileSortToolbar}
      rowSelection={{
        type: 'checkbox',
        allowSelectedAll: true,
        selectedRowKeys: selectKeys,
        onChange: keys => setSelectKeys(keys)
      }}
    />
  );
};

const MobileSortExample = ({ Component }) => {
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({
    defaultSort: [{ name: 'amount', sort: 'DESC' }],
    onSortChange: value => console.log('移动端排序变更:', value)
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Flex vertical gap={24}>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          移动端排序：列配置 <code>sort: true</code>，配合 <code>Table.useSort</code> 传入 <code>mobileSortToolbar</code>。
          工具栏居右，可选择排序列并切换升序 / 降序；再次点击当前方向或下拉选「取消排序」可清除。数据需自行用 <code>sortDataSource</code> 排序。
        </div>
        <SortState sort={sort} />
        <Component
          dataSource={sortedData}
          columns={columns}
          size="large"
          controllerOpen={false}
          renderMobile
          sortRender={sortRender}
          mobileSortToolbar={mobileSortToolbar}
        />
      </div>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          排序与全选同时开启：工具栏左侧全选、右侧排序。
        </div>
        <MobileSortWithSelectAll Component={Component} />
      </div>
    </Flex>
  );
};

const CustomMobileRender = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);
  const totalAmount = dataSource.reduce((sum, item) => sum + item.amount, 0);
  const selectedAmount = selectKeys.reduce((sum, id) => sum + (dataSource.find(d => d.id === id)?.amount || 0), 0);

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        <code>renderMobile</code> 为 function 时完全接管渲染，可自定义卡片内容；
        全选 / 排序请用回调里的 <code>renderToolbar()</code>（与默认 MobileCard 同一套实现），
        行勾选用 <code>getSelectionProps(item)</code>，不必自己维护全选状态或排序 UI。
        桌面端仍走 <code>render</code>。
      </div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          已选 <strong>{selectKeys.length}</strong> 个订单，金额 <strong style={{ color: '#52c41a' }}>¥{selectedAmount.toLocaleString()}</strong>
        </span>
      </Flex>
      <Card size="small" title="近期订单" extra={<Tag>桌面 render</Tag>} styles={{ body: { padding: 0 } }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ padding: '12px 16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}
        >
          <Flex gap={8} align="center">
            <Tag color="blue">{dataSource.length} 笔</Tag>
            <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: 13 }}>
              合计 <strong style={{ color: '#52c41a' }}>¥{totalAmount.toLocaleString()}</strong>
            </span>
          </Flex>
          <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>桌面端 render 自定义外层</span>
        </Flex>
        <Component
          dataSource={sortedData}
          columns={columns}
          controllerOpen={false}
          sortRender={sortRender}
          mobileSortToolbar={mobileSortToolbar}
          rowSelection={{
            type: 'checkbox',
            allowSelectedAll: true,
            selectedRowKeys: selectKeys,
            onChange: keys => setSelectKeys(keys)
          }}
          render={({ renderBody }) => <div style={{ overflowX: 'auto' }}>{renderBody()}</div>}
          renderMobile={({ dataSource: mobileList = [], renderToolbar, getSelectionProps, getRowKey }) => (
            <div
              style={{
                borderRadius: 12,
                background: '#f5f7fa',
                padding: 16
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <Flex justify="space-between" align="center" gap={8} style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>近期订单</div>
                  <Tag color="processing" style={{ margin: 0, flexShrink: 0 }}>
                    renderMobile
                  </Tag>
                </Flex>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                  {mobileList.length} 笔 · 合计 ¥{mobileList.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </div>
              </div>
              {renderToolbar()}
              <Flex vertical gap={12} style={{ marginTop: 12 }}>
                {mobileList.map(item => {
                  const selection = getSelectionProps(item);
                  return (
                    <OrderMobileCard
                      key={getRowKey(item)}
                      item={item}
                      checked={selection.checked}
                      disabled={selection.disabled}
                      onCheckChange={selection.onChange}
                    />
                  );
                })}
              </Flex>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

const CustomMobileRadioRender = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({});
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);
  const selectedOrder = dataSource.find(item => item.id === selectKeys[0]);

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
        自定义 <code>renderMobile</code> 单选：<code>rowSelection.type</code> 设为 <code>radio</code>，
        卡片上的 Radio 直接绑 <code>getSelectionProps(item)</code>，选中态与切换逻辑由 TableView 管理；
        工具栏 <code>renderToolbar()</code> 此时仅显示排序（单选无全选）。
      </div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <span>
          当前选中：
          {selectedOrder ? (
            <strong>
              {selectedOrder.id} · ¥{selectedOrder.amount.toLocaleString()}
            </strong>
          ) : (
            <span style={{ color: '#999' }}>未选择</span>
          )}
        </span>
      </Flex>
      <Component
        dataSource={sortedData}
        columns={columns}
        controllerOpen={false}
        sortRender={sortRender}
        mobileSortToolbar={mobileSortToolbar}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectKeys,
          onChange: keys => setSelectKeys(keys)
        }}
        renderMobile={({ dataSource: mobileList = [], renderToolbar, getSelectionProps, getRowKey }) => (
          <div
            style={{
              borderRadius: 12,
              background: '#f5f7fa',
              padding: 16
            }}
          >
            {renderToolbar()}
            <Flex vertical gap={12} style={{ marginTop: 12 }}>
              {mobileList.map(item => {
                const selection = getSelectionProps(item);
                return (
                  <OrderMobileCard
                    key={getRowKey(item)}
                    item={item}
                    selectionType="radio"
                    checked={selection.checked}
                    disabled={selection.disabled}
                    onCheckChange={selection.onChange}
                  />
                );
              })}
            </Flex>
          </div>
        )}
      />
    </div>
  );
};

const PresetStringRender = ({ Component }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const { sort, sortRender, mobileSortToolbar } = Table.useSort({
    defaultSort: [{ name: 'amount', sort: 'DESC' }]
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Flex vertical gap={24}>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          <code>renderMobile="orderCard"</code>：通过 <code>preset({'{ renderMobile }'})</code> 注册名称对应的渲染函数；
          仅移动端生效，支持全选与选中样式。可配合 <code>mobileSortToolbar</code> 开启排序。
        </div>
        <Component
          dataSource={sortedData}
          columns={columns}
          controllerOpen={false}
          size="large"
          renderMobile="orderCard"
          sortRender={sortRender}
          mobileSortToolbar={mobileSortToolbar}
          rowSelection={{
            type: 'checkbox',
            allowSelectedAll: true,
            selectedRowKeys: selectKeys,
            onChange: keys => setSelectKeys(keys)
          }}
        />
      </div>
      <div>
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          <code>renderMobile="notRegistered"</code>：preset 中未注册时视为未开启，移动端仍显示普通表格。
        </div>
        <Component dataSource={dataSource} columns={columns} controllerOpen={false} renderMobile="notRegistered" />
      </div>
    </Flex>
  );
};

const Examples = ({ Component }) => (
  <Flex vertical gap={32}>
    <DefaultMobileCards Component={Component} />
    <MobileSortExample Component={Component} />
    <CustomMobileRender Component={Component} />
    <CustomMobileRadioRender Component={Component} />
    <PresetStringRender Component={Component} />
  </Flex>
);

const BaseExample = () => {
  return (
    <Tabs
      items={[
        { key: 'table', label: 'Table', children: <Examples Component={Table} /> },
        { key: 'table-view', label: 'TableView', children: <Examples Component={TableView} /> }
      ]}
    />
  );
};

render(<BaseExample />);


```

- column config
- 列宽拖动调整、显示/隐藏字段、列排序与 localStorage 持久化（仅 Table）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table } = _TablePage;
const { Flex, Tag } = antd;

const orderStatusMap = {
  已完成: { type: 'success', text: '已完成' },
  处理中: { type: 'processing', text: '处理中' },
  待发货: { type: 'warning', text: '待发货' },
  已取消: { type: 'default', text: '已取消' }
};

const dataSource = [
  {
    id: 'ORD20240115001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    phone: '13800138000',
    amount: 42500,
    status: '已完成',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    remark: '客户要求春节前完成交付，需协调物流加急处理。'
  },
  {
    id: 'ORD20240115002',
    customerName: '华为技术有限公司',
    contact: '李四',
    phone: '13900149000',
    amount: 85000,
    status: '处理中',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20',
    remark: '项目处于需求评审阶段，待客户确认最终配置清单。'
  },
  {
    id: 'ORD20240115003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    phone: '13700157000',
    amount: 120000,
    status: '待发货',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-22',
    remark: '已完成付款，仓库正在拣货。'
  },
  {
    id: 'ORD20240115004',
    customerName: '北京字节跳动科技有限公司',
    contact: '赵六',
    phone: '13600166000',
    amount: 65000,
    status: '已完成',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-16',
    remark: '常规订单，按标准流程处理。'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 160, min: 120, max: 240, fixed: 'left', renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 200, min: 140, max: 360, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 90, min: 70, max: 160 },
  { name: 'phone', title: '联系电话', width: 130, min: 110, max: 180, render: value => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') },
  {
    name: 'amount',
    title: '订单金额(元)',
    width: 130,
    min: 100,
    max: 200,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'orderDate', title: '下单日期', width: 110, min: 90, max: 160, format: 'date' },
  { name: 'deliveryDate', title: '预计送达', width: 110, min: 90, max: 160, format: 'date' },
  {
    name: 'status',
    title: '订单状态',
    width: 100,
    min: 80,
    max: 140,
    renderType: 'status',
    getValueOf: item => orderStatusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'remark', title: '备注', width: 200, min: 120, max: 400, hidden: true, renderType: 'description' }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">列宽拖动</Tag>
      鼠标悬停表头列右侧，出现拖动手柄后可左右拖动调整列宽（受 <code>min</code> / <code>max</code> 约束）。仅 <code>Table</code> 组件支持。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">显示/隐藏</Tag>
      点击最后一列表头的 <strong>设置图标</strong>，可勾选显示或隐藏列、拖拽排序；配置通过 <code>name</code> 持久化到 localStorage。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">默认隐藏</Tag>
      本示例中「备注」列设置了 <code>hidden: true</code>，可在列配置面板中重新显示。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="purple">固定列</Tag>
      「订单编号」设置了 <code>fixed: 'left'</code>，固定显示且不可隐藏。
    </div>
  </div>
);

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Tips />
      <Table name="demo-table-column-config" controllerOpen dataSource={dataSource} columns={columns} />
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>关闭列配置（controllerOpen=false）</div>
        <Table dataSource={dataSource.slice(0, 2)} columns={columns} controllerOpen={false} />
      </div>
    </Flex>
  );
};

render(<BaseExample />);


```

- group header
- 分组表头（groupHeader），实现多级表头结构，可与 useSort 配合使用（仅 Table）
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table } = _TablePage;
const { Flex, Tag } = antd;
const { useMemo } = React;

const dataSource = [
  {
    id: 'SALE001',
    region: '华北区',
    province: '北京',
    city: '北京',
    productName: '企业版 SaaS',
    productCode: 'SAAS-ENT',
    salesAmount: 1250000,
    salesVolume: 50,
    growthRate: 23.5,
    marketShare: 18.2,
    customerCount: 128,
    newCustomerCount: 32,
    repurchaseRate: 85.5,
    avgOrderValue: 9765.6,
    targetCompletion: 92.5
  },
  {
    id: 'SALE002',
    region: '华东区',
    province: '上海',
    city: '上海',
    productName: '企业版 SaaS',
    productCode: 'SAAS-ENT',
    salesAmount: 1680000,
    salesVolume: 68,
    growthRate: 35.2,
    marketShare: 22.8,
    customerCount: 156,
    newCustomerCount: 45,
    repurchaseRate: 88.6,
    avgOrderValue: 24705.9,
    targetCompletion: 105.2
  },
  {
    id: 'SALE003',
    region: '华南区',
    province: '广东',
    city: '深圳',
    productName: '专业版 SaaS',
    productCode: 'SAAS-PRO',
    salesAmount: 980000,
    salesVolume: 95,
    growthRate: 28.6,
    marketShare: 16.3,
    customerCount: 112,
    newCustomerCount: 28,
    repurchaseRate: 82.4,
    avgOrderValue: 10315.8,
    targetCompletion: 95.8
  }
];

const growthRateRender = value => (
  <span style={{ color: value > 20 ? '#52c41a' : value > 10 ? '#1677ff' : '#faad14' }}>{value}%</span>
);

const columns = [
  {
    name: 'region',
    title: '大区',
    width: 100,
    groupHeader: [{ name: 'area', title: '区域信息' }]
  },
  {
    name: 'province',
    title: '省份',
    width: 100,
    groupHeader: [{ name: 'area', title: '区域信息' }]
  },
  {
    name: 'city',
    title: '城市',
    width: 100,
    groupHeader: [{ name: 'area', title: '区域信息' }]
  },
  {
    name: 'productName',
    title: '产品名称',
    width: 150,
    renderType: 'main',
    groupHeader: [{ name: 'product', title: '产品信息' }]
  },
  {
    name: 'productCode',
    title: '产品编码',
    width: 130,
    groupHeader: [{ name: 'product', title: '产品信息' }]
  },
  {
    name: 'salesAmount',
    title: '销售金额',
    width: 130,
    sort: { single: true },
    render: value => <strong style={{ color: '#f5222d' }}>¥{(value / 10000).toFixed(2)}万</strong>,
    groupHeader: [{ name: 'sales', title: '销售业绩' }]
  },
  {
    name: 'salesVolume',
    title: '销售数量',
    width: 110,
    sort: true,
    groupHeader: [{ name: 'sales', title: '销售业绩' }]
  },
  {
    name: 'growthRate',
    title: '增长率',
    width: 110,
    sort: true,
    render: growthRateRender,
    groupHeader: [{ name: 'sales', title: '销售业绩' }]
  },
  {
    name: 'marketShare',
    title: '市场份额',
    width: 110,
    sort: true,
    render: value => &#96;${value}%&#96;,
    groupHeader: [{ name: 'market', title: '市场分析' }]
  },
  {
    name: 'customerCount',
    title: '客户总数',
    width: 110,
    sort: true,
    groupHeader: [{ name: 'market', title: '市场分析' }]
  },
  {
    name: 'newCustomerCount',
    title: '新增客户',
    width: 110,
    sort: true,
    groupHeader: [{ name: 'market', title: '市场分析' }]
  },
  {
    name: 'repurchaseRate',
    title: '复购率',
    width: 110,
    render: value => &#96;${value}%&#96;,
    groupHeader: [{ name: 'customer', title: '客户指标' }]
  },
  {
    name: 'avgOrderValue',
    title: '客单价',
    width: 120,
    render: value => &#96;¥${value.toLocaleString()}&#96;,
    groupHeader: [{ name: 'customer', title: '客户指标' }]
  },
  {
    name: 'targetCompletion',
    title: '目标完成率',
    width: 130,
    sort: true,
    render: value => (
      <span style={{ color: value >= 100 ? '#52c41a' : value >= 90 ? '#1677ff' : '#faad14' }}>{value}%</span>
    ),
    groupHeader: [{ name: 'target', title: '目标达成' }]
  }
];

const TIP_TAG_STYLE = { marginRight: 8 };

const Tips = () => (
  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
    <div>
      <Tag style={TIP_TAG_STYLE} color="blue">groupHeader</Tag>
      在列配置中通过 <code>groupHeader</code> 声明所属分组，相同 <code>name</code> 的列会自动合并为多级表头（仅 <code>Table</code> 支持）。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="green">多级分组</Tag>
      <code>groupHeader</code> 为数组，按层级嵌套，例如{' '}
      <code>{&#96;[{ name: 'sales', title: '销售业绩' }, { name: 'detail', title: '明细' }]&#96;}</code>。
    </div>
    <div>
      <Tag style={TIP_TAG_STYLE} color="orange">排序</Tag>
      分组表头可与 <code>useSort</code> 配合，排序按钮显示在叶子列表头。
    </div>
  </div>
);

const BaseExample = () => {
  const { sort, sortRender } = Table.useSort({
    onSortChange: value => console.log('排序变更:', value)
  });
  const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort]);

  return (
    <Flex vertical gap={24}>
      <Tips />
      <Table dataSource={sortedData} columns={columns} sortRender={sortRender} scroll={{ x: 1600 }} />
    </Flex>
  );
};

render(<BaseExample />);


```

- size
- 单元格 padding 尺寸：默认 8px，small 为 4px，large 为 14px 8px；Table / TableView 均支持，可用 CSS 变量 --kne-table-cell-padding-* 覆盖
- _TablePage(@kne/table-page)[import * as _TablePage from "@kne/table-page"],(@kne/table-page/dist/index.css),antd(antd)

```jsx
const { Table, TableView } = _TablePage;
const { Flex, Radio, Tabs } = antd;
const { useState } = React;

const dataSource = [
  {
    id: 'ORD001',
    customerName: '深圳市腾讯计算机系统有限公司',
    contact: '张三',
    amount: 42500,
    status: '已完成'
  },
  {
    id: 'ORD002',
    customerName: '华为技术有限公司',
    contact: '李四',
    amount: 85000,
    status: '处理中'
  },
  {
    id: 'ORD003',
    customerName: '阿里巴巴集团控股有限公司',
    contact: '王五',
    amount: 120000,
    status: '待发货'
  }
];

const columns = [
  { name: 'id', title: '订单编号', width: 120, renderType: 'small' },
  { name: 'customerName', title: '客户名称', width: 220, renderType: 'main' },
  { name: 'contact', title: '联系人', width: 80 },
  {
    name: 'amount',
    title: '订单金额',
    width: 120,
    renderType: 'amount',
    format: 'number-style:decimal-maximumFractionDigits:0-useGrouping:true-suffix:元'
  },
  { name: 'status', title: '状态', width: 100 }
];

const SizeDemo = ({ Component, title, description, size }) => (
  <div>
    <div style={{ marginBottom: 8 }}>
      <strong>{title}</strong>
      <span style={{ marginLeft: 8, color: '#666', fontSize: 13 }}>{description}</span>
    </div>
    <Component dataSource={dataSource} columns={columns} size={size} controllerOpen={false} />
  </div>
);

const InteractiveSize = ({ Component }) => {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Flex align="center" gap={12} style={{ marginBottom: 12 }}>
        <strong>切换 size</strong>
        <Radio.Group
          optionType="button"
          value={size}
          onChange={e => setSize(e.target.value)}
          options={[
            { label: 'default (8px)', value: 'default' },
            { label: 'small (4px)', value: 'small' },
            { label: 'large (14px 8px)', value: 'large' }
          ]}
        />
      </Flex>
      <Component dataSource={dataSource} columns={columns} size={size === 'default' ? undefined : size} controllerOpen={false} />
    </div>
  );
};

const SizeExamples = ({ Component }) => (
  <Flex vertical gap={24}>
    <InteractiveSize Component={Component} />
    <SizeDemo Component={Component} title="default" description="padding: 8px" />
    <SizeDemo Component={Component} title='size="small"' description="padding: 4px" size="small" />
    <SizeDemo Component={Component} title='size="large"' description="padding: 14px 8px" size="large" />
    <div>
      <div style={{ marginBottom: 8 }}>
        <strong>CSS 变量覆盖</strong>
        <span style={{ marginLeft: 8, color: '#666', fontSize: 13 }}>
          --kne-table-cell-padding-default: 12px 16px
        </span>
      </div>
      <div style={{ '--kne-table-cell-padding-default': '12px 16px' }}>
        <Component dataSource={dataSource} columns={columns} controllerOpen={false} />
      </div>
    </div>
  </Flex>
);

const BaseExample = () => {
  return (
    <Flex vertical gap={16}>
      <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: 8, fontSize: 13 }}>
        <div>
          <code>size</code> 控制单元格 padding：默认 <code>8px</code>，<code>small</code> 为 <code>4px</code>，
          <code>large</code> 为 <code>14px 8px</code>
        </div>
        <div style={{ marginTop: 4, color: '#666' }}>
          可通过 CSS 变量覆盖：
          <code>--kne-table-cell-padding-default</code> /
          <code>--kne-table-cell-padding-small</code> /
          <code>--kne-table-cell-padding-large</code>，或直接设
          <code>--kne-table-cell-padding</code>
        </div>
      </div>

      <Tabs
        items={[
          {
            key: 'table',
            label: 'Table',
            children: <SizeExamples Component={Table} />
          },
          {
            key: 'tableView',
            label: 'TableView',
            children: <SizeExamples Component={TableView} />
          }
        ]}
      />
    </Flex>
  );
};

render(<BaseExample />);


```

- 扩展 renderType
- 展示 TablePage 通过 preset 扩展的列渲染类型：enum / enumList（Enum 组件）、avatar / avatarList（Image.Avatar、Avatar.Group）、file / fileList（FileLink）。配合 getValueOf 与 moduleName 声明式配置列展示。
- _TablePage(@components/TablePage),_Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { default: TablePage } = _TablePage;
const { Flex, Typography, Divider } = antd;

const avatar = seed => &#96;https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&#96;;

const dataSource = [
  {
    id: '333930522600276992',
    name: '客户门户改版',
    status: 'active',
    tagIds: ['urgent', 'design', 'frontend'],
    ownerName: '张明',
    ownerAvatar: avatar('ZhangMing'),
    members: [
      { name: '张明', avatar: avatar('ZhangMing') },
      { name: '李婷', avatar: avatar('LiTing') },
      { name: '王强', avatar: avatar('WangQiang') },
      { name: '赵敏', avatar: avatar('ZhaoMin') },
      { name: '孙杰', avatar: avatar('SunJie') }
    ],
    contractName: '服务合同-2024.pdf',
    contractUrl: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
    attachments: [
      {
        id: 'file-001',
        filename: '需求说明.docx',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-01-10',
        userName: '张明'
      },
      {
        id: 'file-002',
        filename: '原型稿.fig',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-01-12',
        userName: '李婷'
      }
    ]
  },
  {
    id: '333930522600276993',
    name: '移动端性能优化',
    status: 'draft',
    tagIds: ['backend', 'performance'],
    ownerName: '李婷',
    ownerAvatar: avatar('LiTing'),
    members: [
      { name: '李婷', avatar: avatar('LiTing') },
      { name: '王强', avatar: avatar('WangQiang') }
    ],
    contractName: '技术优化协议.pdf',
    contractUrl: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
    attachments: [
      {
        id: 'file-003',
        filename: '性能报告.xlsx',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-02-01',
        userName: '王强'
      }
    ]
  },
  {
    id: '333930522600276994',
    name: '数据中台建设',
    status: 'done',
    tagIds: ['backend', 'data'],
    ownerName: '王强',
    ownerAvatar: avatar('WangQiang'),
    members: [
      { name: '王强', avatar: avatar('WangQiang') },
      { name: '赵敏', avatar: avatar('ZhaoMin') },
      { name: '孙杰', avatar: avatar('SunJie') }
    ],
    contractName: '数据平台合同.pdf',
    contractUrl: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
    attachments: [
      {
        id: 'file-004',
        filename: '架构设计.pdf',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-03-05',
        userName: '王强'
      },
      {
        id: 'file-005',
        filename: '接口清单.csv',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-03-08',
        userName: '赵敏'
      },
      {
        id: 'file-006',
        filename: '验收标准.docx',
        url: &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;,
        date: '2024-03-10',
        userName: '孙杰'
      }
    ]
  }
];

const columns = [
  { name: 'id', title: '项目编号', renderType: 'id', fixed: 'left' },
  {
    name: 'name',
    title: '项目名称',
    width: 200,
    renderType: 'main',
    onClick: ({ colItem }) => {
      console.log('open project', colItem.id);
    }
  },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'enum',
    moduleName: 'projectStatus',
    getValueOf: item => item.status
  },
  {
    name: 'tagIds',
    title: '标签',
    width: 220,
    renderType: 'enumList',
    moduleName: 'projectTags',
    getValueOf: item => item.tagIds
  },
  {
    name: 'owner',
    title: '负责人',
    width: 80,
    renderType: 'avatar',
    avatarSize: 32,
    getValueOf: item => ({
      src: item.ownerAvatar,
      alt: item.ownerName
    })
  },
  {
    name: 'members',
    title: '成员',
    width: 160,
    renderType: 'avatarList',
    avatarSize: 28,
    getValueOf: item => ({
      list: item.members.map(member => ({
        src: member.avatar,
        alt: member.name
      })),
      maxCount: 4
    })
  },
  {
    name: 'contract',
    title: '合同',
    width: 180,
    renderType: 'file',
    getValueOf: item => ({
      url: item.contractUrl,
      filename: item.contractName
    })
  },
  {
    name: 'attachments',
    title: '附件',
    width: 320,
    renderType: 'fileList',
    getValueOf: item => item.attachments
  }
];

const BaseExample = () => (
  <PureGlobal
    preset={{
      locale: 'zh-CN',
      enums: {
        projectStatus: [
          { value: 'draft', description: '草稿', type: 'default' },
          { value: 'active', description: '进行中', type: 'processing' },
          { value: 'done', description: '已完成', type: 'success' }
        ],
        projectTags: [
          { value: 'urgent', description: '紧急', type: 'error' },
          { value: 'design', description: '设计', type: 'processing' },
          { value: 'frontend', description: '前端', type: 'success' },
          { value: 'backend', description: '后端', type: 'warning' },
          { value: 'performance', description: '性能', type: 'default' },
          { value: 'data', description: '数据', type: 'processing' }
        ]
      },
      apis: {
        file: {
          staticUrl: window.PUBLIC_URL || '/',
          getUrl: {
            loader: async ({ params }) => {
              return &#96;${window.PUBLIC_URL || ''}/logo192.png&#96;;
            }
          }
        }
      }
    }}
  >
    <Flex vertical gap={16}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          TablePage 扩展 renderType
        </Typography.Title>
        <p>
          通过 <code>preset</code> 扩展列渲染类型，结合 <code>getValueOf</code> 声明数据结构即可渲染，无需手写{' '}
          <code>render</code>：
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>
            <code>enum</code> — 使用 <code>Enum</code> + <code>StateTag</code>，列配置 <code>moduleName</code>
          </li>
          <li>
            <code>enumList</code> — 多个枚举标签列表
          </li>
          <li>
            <code>avatar</code> — 使用 <code>Image.Avatar</code>
          </li>
          <li>
            <code>avatarList</code> — 使用 <code>Avatar.Group</code> + <code>Image.Avatar</code>
          </li>
          <li>
            <code>file</code> — 使用 <code>FileLink</code> 展示单个文件
          </li>
          <li>
            <code>fileList</code> — 使用多个 <code>FileLink</code> 展示附件列表
          </li>
        </ul>
      </div>
      <Divider style={{ margin: 0 }} />
      <TablePage
        name="demo-table-page-render-types"
        controllerOpen={false}
        scroll={{ x: 1500 }}
        pagination={false}
        dataFormat={data => ({
          list: data.pageData,
          total: data.totalCount,
          data
        })}
        loader={() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve({
                pageData: dataSource,
                totalCount: dataSource.length
              });
            }, 200);
          })
        }
        columns={columns}
      />
    </Flex>
  </PureGlobal>
);

render(<BaseExample />);

```

- Features 权限控制
- 展示 TablePage 的 featureId 与 Features 配合：通过配置面板切换功能开关、调整 options/rejectedOptions.hiddenColumns，表格列会实时响应变化。业务场景：员工管理系统中不同角色看到不同字段。
- _TablePage(@components/TablePage),_Global(@components/Global),_Features(@components/Features),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { useFeatureCall } = _Features;
const { default: TablePage } = _TablePage;
const { Flex, Tag, Alert, Card, Switch, Checkbox, Space, Typography, Divider } = antd;
const { useMemo, useState } = React;

const TOTAL = 80;

const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

const surnames = ['张', '李', '王', '刘', '陈'];
const givenNames = ['伟', '强', '敏', '磊', '杰', '婷', '娜', '静', '丽', '娟'];
const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];
const positions = ['工程师', '高级工程师', '经理', '总监', '专员'];
const educations = ['本科', '硕士', '博士', '大专'];

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  resigned: { type: 'default', text: '离职' },
  probation: { type: 'processing', text: '试用期' }
};

const COLUMN_OPTIONS = [
  { label: '入职日期', value: 'joinDate' },
  { label: '工龄', value: 'workYears' },
  { label: '学历', value: 'education' },
  { label: '薪资范围', value: 'salary' }
];

const buildEmployee = index => {
  const statusKeys = ['active', 'vacation', 'resigned', 'probation'];
  return {
    id: &#96;EMP${String(index + 1).padStart(4, '0')}&#96;,
    employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, '0')}&#96;,
    name: &#96;${surnames[index % surnames.length]}${givenNames[index % givenNames.length]}&#96;,
    department: departments[index % departments.length],
    position: positions[index % positions.length],
    status: statusKeys[index % statusKeys.length],
    joinDate: &#96;2023-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}&#96;,
    workYears: Math.floor(index / 12) + 1,
    salary: &#96;${15 + (index % 20)}K-${20 + (index % 20)}K&#96;,
    education: educations[index % educations.length]
  };
};

const allEmployees = range(0, TOTAL).map(buildEmployee);

const columns = [
  { name: 'employeeNo', title: '工号', width: 160, min: 120, max: 220, fixed: 'left', renderType: 'small' },
  { name: 'name', title: '姓名', width: 100, renderType: 'main' },
  { name: 'department', title: '部门', width: 150 },
  { name: 'position', title: '职位', width: 120 },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'joinDate', title: '入职日期', width: 120, format: 'date' },
  { name: 'workYears', title: '工龄', width: 90, render: value => &#96;${value}年&#96; },
  { name: 'education', title: '学历', width: 90 },
  { name: 'salary', title: '薪资范围', width: 120 }
];

const columnTitleMap = columns.reduce((result, column) => {
  result[column.name] = column.title;
  return result;
}, {});

const FeatureRuntimeStatus = () => {
  const { isPass, feature, currentId } = useFeatureCall('employee-list');
  const runtimeOptions = isPass ? feature?.options : feature?.rejectedOptions;
  const runtimeHiddenColumns = runtimeOptions?.hiddenColumns || [];

  return (
    <Alert
      type={isPass ? 'success' : 'warning'}
      showIcon
      message={&#96;Features 运行时：${isPass ? '功能已开启，展示 TablePage' : '功能已关闭，TablePage 显示 403'}&#96;}
      description={
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <div>
            <Typography.Text type="secondary">currentId：</Typography.Text>
            <Typography.Text code style={{ marginLeft: 8 }}>
              {currentId}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">hiddenColumns：</Typography.Text>
            {runtimeHiddenColumns.length ? (
              runtimeHiddenColumns.map(name => (
                <Tag key={name} color="orange" style={{ marginLeft: 8 }}>
                  {columnTitleMap[name] || name}
                </Tag>
              ))
            ) : (
              <Tag color="green" style={{ marginLeft: 8 }}>
                无
              </Tag>
            )}
          </div>
        </Space>
      }
    />
  );
};

const FeatureControls = ({
  featureEnabled,
  onFeatureEnabledChange,
  hiddenColumns,
  onHiddenColumnsChange
}) => (
  <Card title="Features 配置面板" size="small">
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Flex align="center" gap={12}>
        <Switch checked={featureEnabled} onChange={onFeatureEnabledChange} />
        <span>
          员工列表功能：
          <Tag color={featureEnabled ? 'success' : 'error'} style={{ marginLeft: 8 }}>
            {featureEnabled ? '开启' : '关闭（TablePage 不可见）'}
          </Tag>
        </span>
      </Flex>

      <div>
        <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
          options.hiddenColumns — 功能开启时隐藏无权限列：
        </Typography.Text>
        <Checkbox.Group
          options={COLUMN_OPTIONS}
          value={hiddenColumns}
          disabled={!featureEnabled}
          onChange={onHiddenColumnsChange}
        />
      </div>

      <Divider style={{ margin: 0 }} />

      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
        关闭功能开关后，下方 TablePage 区域将显示 403；开启后按 hiddenColumns 隐藏对应列（默认隐藏工龄、学历）。
      </Typography.Text>
    </Space>
  </Card>
);

const BaseExample = () => {
  const [featureEnabled, setFeatureEnabled] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState(['workYears', 'education']);

  const preset = useMemo(
    () => ({
      features: {
        debug: true,
        profile: {
          id: 'employee-management',
          type: 'system',
          name: '员工管理系统',
          children: [
            {
              id: 'employee-list',
              type: 'feature',
              name: '员工列表',
              close: !featureEnabled,
              options: {
                hiddenColumns: [...hiddenColumns]
              },
              rejectedOptions: {
                hiddenColumns: ['joinDate', 'workYears', 'education', 'salary']
              }
            }
          ]
        }
      }
    }),
    [featureEnabled, hiddenColumns]
  );

  return (
    <PureGlobal preset={preset}>
      <Flex vertical gap={16}>
        <FeatureControls
          featureEnabled={featureEnabled}
          onFeatureEnabledChange={setFeatureEnabled}
          hiddenColumns={hiddenColumns}
          onHiddenColumnsChange={setHiddenColumns}
        />
        <FeatureRuntimeStatus />
        <TablePage
          featureId="employee-list"
          featureRejectedText="暂无员工列表访问权限"
          name="demo-table-page-features"
          controllerOpen={false}
          scroll={{ x: 1000 }}
          pagination={{
            open: true,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '50']
          }}
          dataFormat={data => ({
            list: data.pageData,
            total: data.totalCount,
            data
          })}
          loader={({ data }) => {
            const currentPage = Number(data?.currentPage) || 1;
            const perPage = Number(data?.perPage) || 10;
            const startIndex = (currentPage - 1) * perPage;

            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  pageData: allEmployees.slice(startIndex, startIndex + perPage),
                  totalCount: allEmployees.length
                });
              }, 300);
            });
          }}
          columns={columns}
        />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

### API

### TablePage

表格页面组件，基于 `@kne/react-fetch` 的 `withFetch` 封装数据请求逻辑，内部使用 `Table` 渲染列表，并内置分页能力。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loader | function | - | 数据加载函数，参数为 fetch 请求上下文，需返回 `{ pageData, totalCount }` 或自定义结构（配合 `dataFormat`） |
| url | string | - | 请求地址，与 `loader` 二选一，透传给 `@kne/react-fetch` |
| data | object | - | POST 请求体，默认分页参数挂在 `data.currentPage`、`data.perPage` |
| dataFormat | function | `(data) => ({ list: data.pageData, total: data.totalCount })` | 将接口数据转为 `{ list, total }` 供表格使用 |
| pagination | object | 见下方 | 分页配置 |
| name | string | - | 表格唯一标识，用于列配置持久化，同 `Table` 的 `name` |
| columns | array \| function | - | 列配置，见 TableView 的 columns 说明；也可传入函数 `(data) => columns` |
| getColumns | function | - | 根据接口数据动态生成列配置 |
| sticky | boolean | - | 是否启用粘性表头，仅 `renderType="Table"` 时生效 |
| scrollTopInset | number \| string | - | 滚动容器顶部占位高度（如固定导航高度），用于吸顶表头 `top` 偏移、`scroll-margin-top` 与翻页滚回；支持 `56` / `'56px'` |
| getScrollContainer | function | - | 页面级滚动容器；用于吸顶表头 `getContainer`、浮动横向滚动条定位与翻页滚回 |
| renderType | `'Table'` \| `'TableView'` | `'Table'` | 表格渲染类型 |
| horizontalScroller | boolean | `true` | 是否启用底部浮动横向滚动条（仅 `renderType="Table"` 且表格存在横向滚动时生效） |
| summary | function | - | 总结栏，回调参数包含 `data`、`requestParams`、`refresh`、`reload` 等 fetch 上下文 |
| columnRenderProps | object | `{}` | 列渲染扩展属性，会合并进列 `render` 的 context |
| filter | object | - | 顶部筛选器配置，基于 `@kne/react-filter` 的 `FilterLines`，见下方 |
| search | object | - | 顶部搜索框配置，基于 `@kne/react-filter` 的 `SearchInput`，见下方；移动端 `renderMobile` 激活时，工具栏与下方卡片列表保留间距（勿紧贴） |
| tab | object | - | 顶部 Tab 分类切换，选中值写入 filter value，见下方 |
| tabProps | object | - | 透传给 antd `Tabs` 的额外属性（如 `tabBarExtraContent`） |
| batchActions | array | - | 批量操作下拉菜单项，需配合 `rowSelection` 使用，见下方 |
| buttonGroup | object | - | 操作按钮组，透传 `@kne/button-group` 的 `ButtonGroup` 属性；桌面端显示在 `SearchInput` 右侧，移动端与筛选同行（筛选靠左、按钮组靠右） |
| renderCard | boolean \| function \| string | - | PC 端卡片渲染，取值与 `renderMobile` 一致：`true` 使用默认卡片 List；function 完全接管渲染（签名同 `renderMobile`）；string 从 `preset({ renderCard })` 按名称取渲染函数，未注册则视为未开启。生效后可在表格/卡片间切换，切换状态按 `name` 存 localStorage（未传 `name` 则不持久化）；卡片模式下外框透明，数据默认触底下拉加载；移动端忽略 |
| forceCard | boolean | `false` | 与 `renderCard` 配合：为 `true` 时强制卡片模式，不显示切换按钮 |
| selectedRows | array | - | 已选行数据，传给 `batchActions` 的 `onClick` 上下文 |
| className | string | - | 自定义类名 |
| ...fetchProps | - | - | 其余属性透传给 `@kne/react-fetch`（如 `url`、`params`、`auto` 等） |
| ...tableProps | - | - | 其余属性透传给内部 `Table` / `TableView`（如 `rowKey`、`rowSelection`、`scroll`、`size`、`renderMobile`、`sortRender`、`mobileSortToolbar`、`dataType`、`expandedKeys`、`onLoadChildren` 等树形属性） |

#### pagination

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | boolean | `true` | 是否开启分页 |
| paramsType | string | `'data'` | 分页参数挂载的请求参数类型 |
| currentName | string | `'currentPage'` | 当前页参数字段名 |
| pageSizeName | string | `'perPage'` | 每页条数字段名 |
| requestType | `'reload'` \| `'refresh'` | `'reload'` | 翻页时的请求方式，`reload` 不切换 loading，`refresh` 会重新 loading |
| showSizeChanger | boolean | `true` | 是否展示每页条数切换 |
| showQuickJumper | boolean | `true` | 是否展示快速跳转 |
| hideOnSinglePage | boolean | `true` | 仅一页时是否隐藏分页器 |
| pageSizeOptions | array | - | 每页条数选项 |
| pageSize | number | `20` | 默认每页条数，会持久化到 localStorage |
| showTotal | function | - | 自定义总数展示 `(total) => ReactNode` |
| onChange | function | - | 自定义翻页回调 `(page, size) => void`，传入后覆盖默认请求逻辑 |
| onShowSizeChange | function | - | 每页条数变化回调，组件内部已处理持久化 |
| forcePagination | boolean | `false` | 移动端（`renderMobile` 激活时）与 PC 卡片模式（`renderCard` 生效且切到卡片视图时）默认改为触底下拉加载；设为 `true` 时强制仍使用分页器 |
| mergeList | function | 合并 `pageData` | 下拉加载时合并新旧数据 `(prev, next) => data`，需与 `loader` 返回结构一致 |
| loadMore | object | - | 透传给 `@kne/scroll-loader` 的额外配置（如 `completeTips`、`maxFullCount`） |
| mobile | object | - | 强制分页时的移动端分页器微调（如 `showSizeChanger`、`showLessItems`） |
| searchParams | `URLSearchParams` | - | 与 `setSearchParams` 同时传入时开启分页 URL 状态同步；参数名复用 `currentName` / `pageSizeName`（默认 `currentPage`、`perPage`） |
| setSearchParams | function | - | `(next: URLSearchParams, opts?) => void`；翻页、改每页条数、筛选重置到第 1 页时以 `replace: true` 写回 URL。触底下拉 `loadMore` 不写回。可与 `filter.searchParamsValue` 共用同一对实例 |

#### filter

顶部筛选器配置，传入后会在表格上方渲染筛选行（中间区域宽度撑满）。筛选值变化时自动 `reload` 并回到第 1 页，参数通过 `getFilterValue` 合并进 `data`。通过 `ref` / `batchActions` / `summary` 调用的 `reload`、`refresh`、`send`、`loadMore` 也会自动带上当前已选筛选，保证 UI 与查询条件一致。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | `Array<Array>` | - | 传给 `FilterLines` 的筛选项配置 |
| displayLine | number | `1` | 默认展示行数 |
| value | array | - | 受控筛选值（传入则受控，同时用于 UI 与首次请求；由 `@kne/use-control-value` 管理） |
| defaultValue | array | `[]` | 非受控初始筛选值，会合并进首次请求参数 |
| onChange | function | - | 筛选值变化回调 `(value) => void` |
| mapFilterValue | function | - | 自定义参数转换，默认 `getFilterValue` |
| searchParamsValue | object | - | 与 `@kne/react-filter` 的 `useSearchParamsValue` **同参** `{ searchParams, setSearchParams?, fields }`。`fields` 项为 `{ name, label, labelKey? }`，可选 `labelKey` 为选中值展示文案的 URL key。同步解析 URL 作初始筛选种子：非受控时 `mergeByName(defaultValue, fromUrl)`（同名 URL 覆盖）并写入 `defaultValue` + 首包参数；受控时不改写 `value`/`onChange`，首包用 `mergeByName(value, fromUrl)`。有 `setSearchParams` 时清理已消费 key（含 labelKey）。勿与外层 `useSearchParamsValue` 同时使用 |

#### search

顶部关键词搜索配置，基于 `SearchInput`，与 `filter` 共享筛选值状态。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | - | 必填，写入筛选值的字段名 |
| label | string | - | 已选展示标签 |
| placeholder | string | - | 占位符 |
| searchDelay | number | `500` | 自动提交防抖时间（毫秒） |

#### buttonGroup

操作按钮组配置，透传给 `@kne/button-group` 的 `ButtonGroup`（如 `list`、`compact` 等）。

- 桌面端：显示在工具栏右侧（`SearchInput` 右侧）；默认 `size="small"`、至少展示 1 个按钮（`showLength` 默认 `1`）、「更多」为三点图标（`moreType="link"`）
- 移动端：与筛选同行两端对齐（筛选靠左、按钮组靠右），同样为 `size="small"`、外露 1 个主要按钮，其余收入「更多」；批量操作显示在「全选/排序」行的排序后面

```jsx
<TablePage
  search={{ name: 'keyword', label: '关键词' }}
  buttonGroup={{
    list: [
      { type: 'primary', children: '新建', onClick: () => {} },
      { children: '导出', onClick: () => {} }
    ]
  }}
  loader={...}
  columns={...}
/>
```

#### tab

顶部 Tab 分类切换。默认选中「全部」（不写入筛选值）；切换到具体项时，将 `{ name, label, value: { value, label } }` 写入 filter value，并触发 `reload` 回到第 1 页。桌面端显示在表格边框外侧上方；移动端（含 `renderMobile`）显示在 `SearchInput` 下方。选中值参与请求参数，但 Tab 本身已有选中态，不在已选筛选标签中重复展示。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | - | 必填，写入筛选值的字段名 |
| label | string | - | 筛选字段标签 |
| list | `Array<{ label, value }>` | - | Tab 选项列表 |

#### tabProps

透传给 antd `Tabs` 的额外属性。内部会覆盖 `activeKey`、`onChange`、`items`，其余如 `tabBarExtraContent`、`type` 等可自由传入。

```jsx
<TablePage
  tab={{
    name: 'position',
    label: '职位',
    list: [
      { label: '工程师', value: '工程师' },
      { label: '经理', value: '经理' }
    ]
  }}
  tabProps={{
    tabBarExtraContent: <Button type="link">新增职位</Button>
  }}
  search={{ name: 'keyword', label: '关键词' }}
  loader={...}
  columns={...}
/>
```

#### batchActions

批量操作下拉菜单，需配合 `rowSelection`（通常来自 `Table.useSelectedRow`）使用。

| 属性 | 类型 | 说明 |
|------|------|------|
| key | string | 菜单项 key |
| label | string | 菜单文案 |
| disabled | boolean | 是否禁用，默认无选中行时禁用 |
| danger | boolean | 危险操作样式 |
| onClick | function | `({ selectedRowKeys, selectedRows, reload, refresh, requestParams, ... }) => void` |

#### ref 方法

通过 `ref` 可调用 `@kne/react-fetch` 暴露的方法：

| 方法 | 说明 |
|------|------|
| reload | 重新请求，请求完成前保留当前内容；会自动合并当前已选筛选条件，与筛选 UI 保持一致 |
| refresh | 重新请求，请求期间显示 loading；同样会自动合并当前已选筛选条件 |
| setData | 直接修改当前数据 |
| send | 发送自定义请求 |

#### 与 Table 分页的差异

`TablePage` 的分页器渲染在表格外侧（`antd Pagination`），不会出现在 `Table` 边框内部。表格本身始终设置 `pagination={false}`。当 `dataFormat` 返回的 `total` 为 0（无数据）时，分页器不会渲染。

移动端（`renderMobile` 激活）默认使用触底下拉加载（`@kne/scroll-loader` + `react-fetch` 的 `loadMore`），不再展示分页器。若需移动端仍使用分页，请设置 `pagination.forcePagination: true`。

#### renderType

通过 `renderType` 选择内部使用的表格组件，默认为 `Table`：

```jsx
<TablePage renderType="TableView" loader={...} columns={...} />
```

#### 示例

```jsx
<TablePage
  name="order-list"
  loader={({ data }) => {
    const { currentPage = 1, perPage = 20 } = data || {};
    return fetchOrders({ currentPage, perPage });
  }}
  dataFormat={data => ({
    list: data.pageData,
    total: data.totalCount
  })}
  columns={[
    { name: 'id', title: '订单编号', width: 160 },
    { name: 'customerName', title: '客户名称', width: 200 }
  ]}
  pagination={{
    open: true,
    pageSizeOptions: ['10', '20', '50', '100']
  }}
/>
```

完整示例见文档 `TablePage`。

### TableView

表格视图组件，基于 Ant Design 的 Row/Col 布局实现，支持列配置、行选择等能力。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dataSource | array | - | 表格数据源 |
| columns | array | - | 列配置，见下方 columns 说明 |
| rowKey | string \| function | `'id'` | 行唯一标识字段名或取值函数 |
| rowSelection | object | - | 行选择配置，见下方 rowSelection 说明 |
| placeholder | string | `'-'` | 空值占位符 |
| emptyIsPlaceholder | boolean | `true` | 空值是否显示占位符 |
| empty | ReactNode | `<Empty />` | 无数据时的展示内容 |
| headerStyle | object | - | 表头自定义样式，仅在 `render` 自定义渲染时作用于 `header` |
| onRowSelect | function | - | 行点击回调 `(item, { columns, dataSource }) => void` |
| render | function | - | 自定义渲染 `(props) => ReactNode`，可获取 `header` 和 `renderBody` |
| renderMobile | boolean \| function \| string | `true` | 仅移动端生效。`true` 使用默认卡片 List；为 function 时完全接管渲染（见下方回调参数）；为 string 时从 `preset({ renderMobile })` 按名称取渲染函数，未注册则视为未开启 |
| sortRender | function | - | 排序按钮渲染，由 `useSort` 提供（桌面端表头） |
| mobileSortToolbar | function | - | 移动端排序工具栏，由 `useSort` 提供；传入 TableView 后由 `renderToolbar` / 默认卡片复用 |
| size | `'small'` \| `'large'` | - | 单元格内边距：默认 `8px`，`small` 为 `4px`，`large` 为 `14px 8px`；可通过 CSS 变量覆盖 |
| dataType | `'list'` \| `'tree'` \| `'treeList'` | `'list'` | 数据形态。`list` 扁平；`tree` 使用 `childrenKey` 嵌套；`treeList` 按 `parentKey` 组装为树 |
| parentKey | string | `'parentId'` | `treeList` 父子关联字段 |
| childrenKey | string | `'children'` | 子节点字段名 |
| hasChildrenKey | string | `'hasChildren'` | 懒加载标记；为 `true` 时即使尚无子节点也显示展开图标 |
| treeTitleKey | string \| function | `'name'` | 移动端树形面包屑文案字段（委托 TableView） |
| onLoadChildren | function | - | 懒加载：`(item, { key }) => void \| Promise`；请用 `mergeTreeChildren` 合并回 dataSource |
| expandedKeys | `true` \| `false` \| `Array` | - | 受控展开。`true` 全开，`false` 全关，数组为展开 key |
| defaultExpandedKeys | `true` \| `false` \| `Array` | `false` | 非受控初始展开 |
| onExpandedKeysChange | function | - | 展开变化回调 `(keys) => void` |
| indentSize | number | `16` | 树形每层缩进（px），映射 antd `expandable.indentSize` |

`renderMobile` 为 function 时，TableView 会传入已接好 `rowSelection` / `mobileSortToolbar` 的能力，自定义布局只需选用：

| 回调参数 | 说明 |
|------|------|
| `dataSource` | 当前页数据 |
| `columns` | 布局后的列配置 |
| `rowKey` / `rowSelection` / `context` / `empty` | 与 TableView 一致 |
| `renderBody` | 渲染默认移动端卡片 List（含顶部工具栏） |
| `renderToolbar` | 渲染组件级工具栏（全选居左、排序居右）；可自由决定摆放位置 |
| `getRowKey(item)` | 按 `rowKey` 取行 key |
| `getSelectionProps(item)` | 返回 `{ checked, disabled, onChange }`，可直接绑到卡片上的 Checkbox / Radio |
| `onSelectionChange` | 行选择切换，签名与内部逻辑一致 |

```jsx
renderMobile={({ dataSource, renderToolbar, getSelectionProps, getRowKey }) => (
  <>
    {renderToolbar()}
    {dataSource.map(item => {
      const selection = getSelectionProps(item);
      return <MyCard key={getRowKey(item)} item={item} {...selection} />;
    })}
  </>
)}
```

单元格 padding 由 CSS 变量控制，可在外层覆盖：

```css
.info-page-table {
  --kne-table-cell-padding-default: 8px;
  --kne-table-cell-padding-small: 4px;
  --kne-table-cell-padding-large: 14px 8px;
  /* 或直接覆盖当前生效值：--kne-table-cell-padding: 10px; */
}
```

#### columns

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | - | 字段名，对应 dataSource 中的属性 |
| title | ReactNode | - | 列标题 |
| width | number \| string | - | 列最小宽度，支持数字（如 `50`，视为 50px）或字符串（如 `'50px'`），参与列宽计算，内容超出时会自动撑开 |
| span | number | - | 列占比（基于 24 栅格），未设置时自动均分剩余栅格 |
| align | string | `'top'` | 垂直对齐方式 |
| justify | string | `'flex-start'` | 水平对齐方式 |
| format | string \| function | - | 值格式化 |
| render | function | - | 自定义单元格渲染 `(value, { column, dataSource, context }) => ReactNode`；与 `renderType` 同时存在时优先级最高 |
| renderType | string | - | 声明式列渲染类型；存在 `render` 时仅保留列宽等维度，不参与单元格渲染 |
| sort | boolean \| object | - | 是否支持排序，`{ single: true }` 为单列排序 |
| ellipsis | boolean \| object | `false` | 超出省略，基于 antd Typography；`true` 开启省略与 tooltip，`{ showTitle: false }` 关闭 tooltip |
| display | boolean \| function | - | 是否显示该列 |
| emptyIsPlaceholder | boolean | - | 该列空值是否显示占位符 |
| placeholder | string | - | 该列空值占位符 |
| renderPlaceholder | function | - | 自定义空值渲染 |

#### rowSelection

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'checkbox'` \| `'radio'` | - | 选择类型 |
| selectedRowKeys | array | - | 已选中的行 key 列表 |
| onChange | function | - | 选中变化回调 `(selectedRowKeys, id, { context, checked }) => void` |
| allowSelectedAll | boolean | - | 是否允许全选（仅 checkbox 模式） |
| isSelectedAll | boolean | - | 是否全选状态 |
| onIsSelectAllChange | function | - | 全选状态变化回调 |
| checkRelation | `'parent'` \| `'all'` \| `'independent'` | `'parent'` | 树形 checkbox 父子勾选关联（仅 `dataType` 为 `tree` / `treeList`）：`parent` 勾父级时子级 UI 全勾但值只留父级；`all` 值含父级与子孙；`independent` 互不影响 |

### useSelectedRow

行选择 Hook，用于配合 `Table` / `TableView` 的 `rowSelection`，API 参考 `@kne/components-core` 同名 Hook。

#### 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| rowKey | string \| function | `'id'` | 行唯一标识 |
| type | `'checkbox'` \| `'radio'` | `'checkbox'` | 选择类型 |

#### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| selectedRowKeys | array | 已选行 key 列表 |
| selectedRows | array | 已选行数据 |
| onSelect | function | `(item, checked) => void` |
| onSelectAll | function | `(checked, selected, items) => void` |
| setSelectedRows | function | 直接设置已选行数据 |
| setSelectedRowKeys | function | `(keys, dataSource) => void` |
| clearSelectedRows | function | 清空选择 |
| getRowSelection | function | `(dataSource, extra?) => rowSelection` 生成 `rowSelection` 配置 |

#### 示例

```jsx
const { selectedRowKeys, getRowSelection, clearSelectedRows } = Table.useSelectedRow({ rowKey: 'id' });

<Table
  dataSource={dataSource}
  columns={columns}
  rowSelection={getRowSelection(dataSource)}
/>;
```

### useSort

排序 Hook，配合 `Table` / `TableView` 的 `sortRender` 实现表头排序。

#### 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| sort | array | - | 受控排序值 `[{ name, sort: 'ASC' \| 'DESC' }]` |
| defaultSort | array | `[]` | 默认排序 |
| onSortChange | function | - | 排序变化回调 `(sort) => void` |

#### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| sort | array | 当前排序配置 |
| setSort | function | 设置排序 |
| sortRender | function | `({ name, single }) => ReactNode`，传给 Table / TableView 表头 |
| mobileSortToolbar | function | `({ columns }) => ReactNode`，传给 Table / TableView 移动端工具栏右侧 |

#### columns.sort

| 值 | 说明 |
|----|------|
| `true` | 开启排序，默认单列模式 |
| `{ single: true }` | 单列排序，切换列时清除其他列 |
| `{ single: false }` | 多列排序 |

#### sortDataSource

本地排序工具函数：`sortDataSource(dataSource, sort, columns)`。

#### 示例

```jsx
const { sort, sortRender, mobileSortToolbar } = Table.useSort({ onSortChange: console.log });
const sortedData = useMemo(() => Table.sortDataSource(dataSource, sort, columns), [sort, dataSource]);

<Table dataSource={sortedData} columns={columns} sortRender={sortRender} mobileSortToolbar={mobileSortToolbar} />;
```

### Table

表格组件，以 antd `Table` 作为展示层，外层 API 与 `TableView` 保持一致，可直接复用相同的 `columns`、`rowSelection` 等配置。此外支持透传 antd Table 的原生属性（如 `scroll`、`pagination`、`bordered` 等）。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dataSource | array | - | 表格数据源 |
| columns | array | - | 列配置，见 TableView 的 columns 说明 |
| rowKey | string \| function | `'id'` | 行唯一标识字段名或取值函数 |
| rowSelection | object | - | 行选择配置，见 TableView 的 rowSelection 说明 |
| placeholder | string | `'-'` | 空值占位符 |
| emptyIsPlaceholder | boolean | `true` | 空值是否显示占位符 |
| empty | ReactNode | `<Empty />` | 无数据时的展示内容 |
| sticky | boolean | - | 是否启用粘性表头 |
| scrollTopInset | number \| string | - | 滚动容器顶部占位高度，用于吸顶表头偏移与滚回定位；`stickyOffset` 为兼容别名 |
| stickyOffset | number \| string | - | **已废弃**，请使用 `scrollTopInset` |
| getStickyContainer | function | - | 页面级滚动容器，等同 TablePage 的 `getScrollContainer` |
| headerStyle | object | - | 表头自定义样式 |
| onRowSelect | function | - | 行点击回调 `(item, { columns, dataSource }) => void` |
| render | function | - | 自定义渲染 `(props) => ReactNode`，`header` 为 `null`，`renderBody` 返回 antd Table |
| renderMobile | boolean \| function \| string | `true` | 仅移动端生效，委托 `@kne/table-view` 处理；`true` 为默认卡片 List；为 function 时回调参数同 TableView（见 TableView 文档 `renderMobile` 回调参数）；为 string 时从 preset 按名称查找 |
| sortRender | function | - | 排序按钮渲染，由 `useSort` 提供（桌面端表头） |
| mobileSortToolbar | function | - | 移动端排序工具栏，由 `useSort` 提供 |
| pagination | boolean \| object | `false` | 分页配置，默认不显示；传入对象时使用 antd 分页 |
| name | string | - | 表格唯一标识，用于持久化列配置 |
| controllerOpen | boolean | `true` | 是否开启列宽拖动与列配置面板 |
| tableServerApis | object | - | 自定义列配置存储 API，默认使用 `localStorage` |
| size | `'small'` \| `'large'` | - | 单元格内边距：默认 `8px`，`small` 为 `4px`，`large` 为 `14px 8px`；可通过 CSS 变量覆盖（同 TableView） |
| dataType | `'list'` \| `'tree'` \| `'treeList'` | `'list'` | 同 TableView；`tree` / `treeList` 时使用与 TableView 一致的自绘展开列（三角 + 缩进），并隐藏 antd 默认展开列 |
| parentKey / childrenKey / hasChildrenKey | string | 见 TableView | 同 TableView |
| onLoadChildren | function | - | 同 TableView；展开时触发懒加载，三角显示 loading |
| expandedKeys / defaultExpandedKeys / onExpandedKeysChange | - | - | 同 TableView |
| indentSize | number | `16` | 同 TableView；作用于自绘展开列缩进 |
| ...antdTableProps | - | - | 其余属性透传给 antd `Table`（如 `scroll`、`bordered`）；树形下内部会合并 `expandable`（`showExpandColumn: false`） |

#### 与 TableView 的差异

| 项目 | TableView | Table |
|------|-----------|-------|
| 展示层 | Row/Col 自定义布局 | antd `Table` |
| `columns.span` | 基于 24 栅格分配列宽 | 不生效，请使用 `width` |
| 单选展示 | 右侧勾选图标 | antd 左侧 radio 列 |
| 列宽拖动 / 字段显示隐藏 | 不支持 | 支持，见下方说明 |
| 扩展能力 | 自定义 `render` 拆分表头/表体 | 支持 antd 原生 `scroll`、`pagination` 等 |

#### columns 扩展（仅 Table）

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| hidden | boolean | `false` | 默认隐藏该列，可在列配置面板中重新显示 |
| min | number | `80` | 列最小宽度（px），拖动调整列宽时的下限，无需手动配置 |
| max | number | `600` | 列最大宽度（px），拖动调整列宽时的上限，无需手动配置 |
| fixed | `'left'` \| `'right'` \| boolean | - | 固定列，固定列不可隐藏或拖动排序 |
| groupHeader | array | - | 分组表头配置，见下方 groupHeader 说明 |

#### groupHeader

在列配置中通过 `groupHeader` 声明该列所属的分组表头，支持多级嵌套。相同分组路径的列会自动合并为 antd 嵌套表头（仅 `Table` 支持，`TableView` 不生效）。

| 属性 | 类型 | 说明 |
|------|------|------|
| name | string | 分组唯一标识 |
| title | ReactNode | 分组标题 |

完整示例见文档 `group header`。

#### 列宽拖动与字段显示/隐藏

设置 `name` 开启列配置持久化；`controllerOpen` 控制是否显示拖动手柄与设置面板（默认 `true`）。列只需配置 `width`，`min` / `max` 有默认值（80 / 600），一般无需手动指定。

```jsx
<Table
  name="order-list"
  dataSource={dataSource}
  columns={[
    { name: 'id', title: '订单编号', width: 160, min: 120, max: 240, fixed: 'left' },
    { name: 'customerName', title: '客户名称', width: 200, min: 140, max: 360 },
    { name: 'remark', title: '备注', width: 200, hidden: true }
  ]}
/>
```

- 悬停表头列右侧拖动手柄可调整列宽
- 点击最后一列表头设置图标可显示/隐藏列、拖拽排序
- `hidden: true` 的列默认隐藏，可在面板中重新显示
- `fixed` 列固定显示且不可隐藏

完整示例见文档 `column config`。

# Tooltip

### 概述

Tooltip 组件是一个功能强大的文字提示气泡框，基于 Ant Design Tooltip 二次封装，提供了丰富的内容展示能力。

组件支持三种使用方式：
- **Tooltip**: 基础提示组件，支持标题、内容、重要信息、副标题等多种内容组合
- **TooltipFetch**: 集成远程数据加载的提示组件，适用于需要动态获取数据的场景
- **TooltipInfoLabel**: 带信息图标的标签组件，常用于表单字段标签

主要特性：
- 支持多种内容组合（标题、内容、重要信息、副标题）
- 支持 3 种尺寸（small、默认、large）
- 支持重要信息类型（success、warning、error）
- 支持嵌入自定义内容（如表单、图表等）
- 支持远程数据加载和缓存
- 支持多种触发方式（hover、click、focus 等）


### 示例

#### 示例代码

- 基础用法
- 展示 Tooltip 组件的基础用法，包括纯文本提示、带标题的提示、带副标题的提示、点击触发方式以及自定义位置等常用场景。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { default: Tooltip } = _Tooltip;
const { Space, Button, Tag, Typography } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>基础用法 - 纯文本提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip content="这是一段简单的提示文本，用于解释说明。">
            <Tag color="blue">简单提示</Tag>
          </Tooltip>
          <Tooltip content="审批流程需要经过部门主管、财务部门、总经理三级审批，整个流程预计需要3-5个工作日完成。">
            <Tag color="green">流程说明</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>带标题的提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            title="数据统计规则"
            content="统计范围：2024年1月1日至当前日期的所有有效订单数据。"
          >
            <Tag color="purple">销售额统计</Tag>
          </Tooltip>
          <Tooltip
            title="权限说明"
            content="仅系统管理员和部门主管可以查看完整的员工薪资信息，普通用户只能看到薪资范围。"
          >
            <Tag color="orange">薪资权限</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>带副标题的提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            title="候选人推荐指数"
            subtitle="计算规则："
            content="根据候选人的面试评分、项目经验、技能匹配度、薪资期望等多个维度综合计算得出。"
          >
            <Tag color="cyan">推荐算法</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>点击触发</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            trigger="click"
            title="操作指南"
            content='点击"编辑"按钮可以修改订单信息，点击"取消"按钮可以撤销订单，点击"导出"按钮可以导出订单详情。'
          >
            <Button size="small">查看操作说明</Button>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>自定义位置</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip placement="top" content="顶部提示 Top">
            <Button size="small">Top</Button>
          </Tooltip>
          <Tooltip placement="bottom" content="底部提示 Bottom">
            <Button size="small">Bottom</Button>
          </Tooltip>
          <Tooltip placement="left" content="左侧提示 Left">
            <Button size="small">Left</Button>
          </Tooltip>
          <Tooltip placement="right" content="右侧提示 Right">
            <Button size="small">Right</Button>
          </Tooltip>
        </Space>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 不同尺寸
- 展示 Tooltip 组件的三种尺寸（small 240px、默认 360px、large 480px），以及在实际业务场景中如何选择合适的尺寸。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { default: Tooltip } = _Tooltip;
const { Space, Typography } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>小尺寸提示框 (240px)</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            size="small"
            title="快速筛选"
            content="支持按状态、时间、部门等维度进行数据筛选。"
          >
            <Text code style={{ cursor: "pointer" }}>
              小尺寸提示
            </Text>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>默认尺寸提示框 (360px)</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="项目进度说明"
            content="项目进度根据已完成任务数占总任务数的比例计算。进度低于30%显示红色，30%-70%显示黄色，高于70%显示绿色。"
          >
            <Text code style={{ cursor: "pointer" }}>
              默认尺寸提示
            </Text>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>大尺寸提示框 (480px)</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            size="large"
            title="绩效评估规则"
            content="绩效评估采用360度评估法，包括自评（20%）、上级评分（40%）、同事评分（20%）、下属评分（20%）四个维度。评估周期为每季度一次，年度绩效为四个季度的平均值。评估等级分为：S（卓越）、A（优秀）、B（良好）、C（合格）、D（待改进）。"
          >
            <Text code style={{ cursor: "pointer" }}>
              大尺寸提示
            </Text>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>实际应用场景对比</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            size="small"
            title="快捷操作"
            content="双击行可快速编辑"
          >
            <a href="#">编辑提示</a>
          </Tooltip>
          <Tooltip
            title="数据说明"
            content="本月销售额为1,256,800元，环比增长15.3%，同比增长28.7%。主要增长来源为新客户开发和老客户复购。"
          >
            <a href="#">销售数据</a>
          </Tooltip>
          <Tooltip
            size="large"
            title="系统更新日志"
            content="v2.3.0 (2024-01-15): 1. 新增批量导入功能；2. 优化搜索性能，响应速度提升50%；3. 修复已知bug 12个；4. 升级UI设计，提升用户体验。v2.2.0 (2024-01-01): 1. 新增数据导出功能；2. 支持多语言切换。"
          >
            <a href="#">版本记录</a>
          </Tooltip>
        </Space>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 重要信息提示
- 展示如何使用 importantInfo 属性突出显示重要信息，支持 success、warning、error 三种类型，适用于审核状态、库存预警、支付结果等业务场景。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { default: Tooltip } = _Tooltip;
const { Space, Typography, Tag } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>成功类型的重要信息</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="审核通过"
            importantInfo="恭喜！您的项目申请已通过审核，可以进行下一步操作。"
            importantInfoType="success"
            content="审核意见：项目方案合理，预算充足，团队成员配置得当，同意立项。请于3个工作日内完成项目启动准备工作。"
          >
            <Tag color="success" style={{ cursor: "pointer" }}>
              审核状态
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>警告类型的重要信息</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="库存预警"
            importantInfo="当前库存量已低于安全库存线，请及时补货！"
            importantInfoType="warning"
            content="商品【华为Mate 60 Pro】当前库存：156台，安全库存：200台。建议立即联系供应商补充库存，避免出现缺货情况。"
          >
            <Tag color="warning" style={{ cursor: "pointer" }}>
              库存状态
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>错误类型的重要信息</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="付款失败"
            importantInfo="订单付款失败，请检查支付信息后重试！"
            importantInfoType="error"
            subtitle="失败原因："
            content="银行卡余额不足。订单金额：¥15,680.00，银行卡余额：¥12,350.00。请更换支付方式或充值后重试。"
          >
            <Tag color="error" style={{ cursor: "pointer" }}>
              支付状态
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>复杂信息展示</Text>
        <div style={{ marginTop: 12 }}>
          <Tooltip
            title="候选人评估报告"
            importantInfo="综合评分：A级（强烈推荐）"
            importantInfoType="success"
            subtitle="评分详情："
            content={
              <div>
                <div>• 技术能力：90分（优秀）</div>
                <div>• 项目经验：85分（良好）</div>
                <div>• 沟通能力：88分（良好）</div>
                <div>• 团队协作：92分（优秀）</div>
                <div>• 学习能力：95分（卓越）</div>
              </div>
            }
          >
            <Tag color="blue" style={{ cursor: "pointer" }}>
              查看评估
            </Tag>
          </Tooltip>
        </div>
      </div>

      <div>
        <Text strong>实际业务场景 - 数据统计说明</Text>
        <div style={{ marginTop: 12 }}>
          <Space>
            <Tooltip
              title="客户转化率"
              importantInfo="本月转化率较上月提升5.2%，表现优异！"
              importantInfoType="success"
              content="潜在客户：1,256人 → 初步接触：892人 → 深度沟通：456人 → 成交：287人。转化漏斗各环节转化率分别为：71%、51%、63%。"
            >
              <a href="#">转化漏斗</a>
            </Tooltip>
            <Tooltip
              title="异常数据提醒"
              importantInfo="检测到3条异常数据，请及时处理！"
              importantInfoType="warning"
              content="订单#202401150001：金额异常（超出历史平均值的5倍）；订单#202401150002：收货地址异常（无法定位）；订单#202401150003：支付时间异常（耗时过长）。"
            >
              <a href="#">异常监控</a>
            </Tooltip>
          </Space>
        </div>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 嵌入表单内容
- 展示如何在 Tooltip 中嵌入表单组件（如筛选表单、审批表单），实现快速操作功能，适用于批量操作、数据导出等复杂交互场景。
- _Tooltip(@components/Tooltip),remoteLoader(@kne/remote-loader),antd(antd)

```jsx
const {default: Tooltip} = _Tooltip;
const {createWithRemoteLoader} = remoteLoader;
const {Space, Typography, Button} = antd;
const {Text} = Typography;

const BaseExample = createWithRemoteLoader({
    modules: ["components-core:FormInfo", "components-core:Global@PureGlobal"],
})(({remoteModules}) => {
    const [FormInfo, PureGlobal] = remoteModules;
    const {Form, SubmitButton, CancelButton} = FormInfo;
    const {Input, TextArea} = FormInfo.fields;

    const FilterForm = () => {
        return (<Form
                onSubmit={(data) => {
                    console.log("筛选条件:", data);
                }}
            >
                <Space direction="vertical" size="small">
                    <Input
                        name="productName"
                        label="产品名称"
                        placeholder="请输入产品名称"
                    />
                    <Input
                        name="productCode"
                        label="产品编号"
                        placeholder="请输入产品编号"
                    />
                    <TextArea
                        name="description"
                        label="备注说明"
                        placeholder="请输入备注说明"
                        rows={3}
                    />
                    <Space style={{width: "100%", justifyContent: "flex-end"}}>
                        <CancelButton>取消</CancelButton>
                        <SubmitButton>确定</SubmitButton>
                    </Space>
                </Space>
            </Form>);
    };

    const ApprovalForm = () => {
        return (<Form
                onSubmit={(data) => {
                    console.log("审批意见:", data);
                }}
            >
                <Space direction="vertical" size="small">
                    <Input
                        name="approver"
                        label="审批人"
                        placeholder="请输入审批人姓名"
                    />
                    <TextArea
                        name="comment"
                        label="审批意见"
                        placeholder="请输入审批意见"
                        rows={4}
                    />
                    <Space style={{width: "100%", justifyContent: "flex-end"}}>
                        <CancelButton>拒绝</CancelButton>
                        <SubmitButton type="primary">通过</SubmitButton>
                    </Space>
                </Space>
            </Form>);
    };

    return (<PureGlobal>
            <Space direction="vertical" size="large" style={{width: "100%"}}>
                <div>
                    <Text strong>快速筛选功能</Text>
                    <div style={{marginTop: 12}}>
                        <Tooltip
                            trigger="click"
                            size="large"
                            title="高级筛选"
                            moreInfo={<FilterForm/>}
                        >
                            <Button type="primary">打开筛选面板</Button>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <Text strong>快速审批功能</Text>
                    <div style={{marginTop: 12}}>
                        <Tooltip
                            trigger="click"
                            size="large"
                            title="快速审批"
                            content="请填写审批意见后提交："
                            moreInfo={<ApprovalForm/>}
                        >
                            <Button type="primary" danger>
                                快速审批
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <Text strong>实际应用场景</Text>
                    <div style={{marginTop: 12}}>
                        <Space>
                            <Tooltip
                                trigger="click"
                                title="批量操作"
                                content="已选择 12 条记录"
                                moreInfo={<Space direction="vertical" style={{marginTop: 12}}>
                                    <Button size="small" block>
                                        批量删除
                                    </Button>
                                    <Button size="small" block>
                                        批量导出
                                    </Button>
                                    <Button size="small" block>
                                        批量修改状态
                                    </Button>
                                </Space>}
                            >
                                <Button>批量操作</Button>
                            </Tooltip>

                            <Tooltip
                                trigger="click"
                                size="large"
                                title="数据导出设置"
                                content="请选择导出字段和格式："
                                moreInfo={<Space direction="vertical" size="small" style={{marginTop: 12}}>
                                    <Text>导出字段：</Text>
                                    <Space wrap>
                                        <Text code>订单号</Text>
                                        <Text code>客户名称</Text>
                                        <Text code>金额</Text>
                                        <Text code>状态</Text>
                                        <Text code>创建时间</Text>
                                    </Space>
                                    <Text>导出格式：</Text>
                                    <Space>
                                        <Button size="small">Excel</Button>
                                        <Button size="small">CSV</Button>
                                        <Button size="small">PDF</Button>
                                    </Space>
                                </Space>}
                            >
                                <Button>导出数据</Button>
                            </Tooltip>
                        </Space>
                    </div>
                </div>
            </Space>
        </PureGlobal>);
});

render(<BaseExample/>);

```

- TooltipInfoLabel 标签组件
- 展示 TooltipInfoLabel 组件的使用方法，该组件结合了标签和提示功能，常用于表单字段标签，可以快速为字段添加帮助说明和重要提示。
- _Tooltip(@components/Tooltip),antd(antd)

```jsx
const { TooltipInfoLabel } = _Tooltip;
const { Space, Typography, Divider } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>基础用法 - 带提示的标签</Text>
        <div style={{ marginTop: 12 }}>
          <Space direction="vertical" size="small">
            <TooltipInfoLabel
              title="客户名称"
              tooltipTitle={{
                content: "请填写客户的全称，用于合同签署和发票开具。",
              }}
            />
            <TooltipInfoLabel
              title="联系人"
              tooltipTitle={{
                content: "客户方的主要联系人，建议填写项目负责人。",
              }}
            />
            <TooltipInfoLabel
              title="联系电话"
              tooltipTitle={{
                content: "联系人电话，支持手机号和座机号，格式：区号-座机号或手机号。",
              }}
            />
          </Space>
        </div>
      </div>

      <Divider />

      <div>
        <Text strong>带重要信息的标签</Text>
        <div style={{ marginTop: 12 }}>
          <Space direction="vertical" size="small">
            <TooltipInfoLabel
              title="销售额统计周期"
              tooltipTitle={{
                importantInfo: "统计周期为自然月，每月1日0点至月末23:59:59。",
                importantInfoType: "success",
                content: "例如：2024年1月的统计周期为2024-01-01 00:00:00至2024-01-31 23:59:59。",
              }}
            />
            <TooltipInfoLabel
              title="库存预警阈值"
              tooltipTitle={{
                importantInfo: "库存低于此值时系统将自动发送补货提醒。",
                importantInfoType: "warning",
                content: "建议根据历史销量和补货周期设置合理的预警阈值，一般设置为安全库存的80%。",
              }}
            />
            <TooltipInfoLabel
              title="审批截止时间"
              tooltipTitle={{
                importantInfo: "超过截止时间未审批将自动流转至上一级审批人！",
                importantInfoType: "error",
                content: "普通审批：24小时内；紧急审批：4小时内；特急审批：1小时内。",
              }}
            />
          </Space>
        </div>
      </div>

      <Divider />

      <div>
        <Text strong>复杂信息标签</Text>
        <div style={{ marginTop: 12 }}>
          <Space direction="vertical" size="small">
            <TooltipInfoLabel
              title="候选人评分规则"
              tooltipTitle={{
                title: "评分维度说明",
                importantInfo: "综合评分由技术能力、项目经验、沟通能力、团队协作四个维度组成。",
                subtitle: "权重分配：",
                content: "技术能力(40%)、项目经验(30%)、沟通能力(15%)、团队协作(15%)。评分采用百分制，90分以上为A级，80-89分为B级，60-79分为C级，60分以下为D级。",
              }}
            />
            <TooltipInfoLabel
              title="项目优先级"
              tooltipTitle={{
                title: "优先级判定规则",
                importantInfo: "P0级项目：公司战略项目，需最高优先级处理",
                importantInfoType: "error",
                subtitle: "优先级定义：",
                content: "P0：战略级（影响公司业务发展）；P1：重要级（影响部门KPI）；P2：普通级（常规业务需求）；P3：优化级（体验优化类）。",
              }}
            />
            <TooltipInfoLabel
              title="数据权限说明"
              tooltipTitle={{
                title: "权限范围",
                content: "系统管理员：全部数据；部门主管：本部门数据；普通员工：个人数据；只读用户：仅可查看，不可编辑。",
              }}
            />
          </Space>
        </div>
      </div>

      <Divider />

      <div>
        <Text strong>实际应用场景 - 表单字段标签</Text>
        <div
          style={{
            marginTop: 12,
            padding: 16,
            background: "#f5f5f5",
            borderRadius: 4,
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <TooltipInfoLabel
                title="订单编号"
                tooltipTitle={{
                  content: "系统自动生成，格式：ORD-YYYYMMDD-序号",
                }}
              />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                ORD-20240115-001
              </Text>
            </div>
            <div>
              <TooltipInfoLabel
                title="预计交付日期"
                tooltipTitle={{
                  importantInfo: "请在交付日期前至少3天完成生产准备！",
                  importantInfoType: "warning",
                  content: "交付日期考虑了生产周期、质检时间和物流时间，请务必按时完成。",
                }}
              />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                2024-02-15
              </Text>
            </div>
            <div>
              <TooltipInfoLabel
                title="付款方式"
                tooltipTitle={{
                  title: "付款方式说明",
                  content: "支持：全款预付、分期付款、货到付款三种方式。分期付款需签订补充协议。",
                }}
              />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                分期付款（30%预付款）
              </Text>
            </div>
          </Space>
        </div>
      </div>
    </Space>
  );
};

render(<BaseExample />);

```

- 远程数据加载
- 展示 TooltipFetch 组件的使用方法，该组件支持从远程接口加载数据并动态展示，适用于员工信息、订单详情、库存信息等需要实时数据的场景。支持数据缓存和强制刷新。
- _Tooltip(@components/Tooltip),reactFetch(@kne/react-fetch),_Descriptions(@components/Descriptions),antd(antd)

```jsx
const {TooltipFetch} = _Tooltip;
const {preset} = reactFetch;
const {Space, Tag, Typography, Card, Avatar} = antd;
const {Text, Title} = Typography;
const {default: Descriptions} = _Descriptions;

preset({
    ajax: (config) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (config.url === "/api/employee/detail") {
                    resolve({
                        data: {
                            code: 0, data: {
                                employeeId: "EMP-2024-001",
                                name: "张明",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZhangMing",
                                department: "技术研发部",
                                position: "高级前端工程师",
                                email: "zhangming@company.com",
                                phone: "+86 138-0001-2345",
                                joinDate: "2022-03-15",
                                performance: "A",
                                skills: ["React", "Vue", "TypeScript", "Node.js"],
                            },
                        },
                    });
                } else if (config.url === "/api/order/detail") {
                    resolve({
                        data: {
                            code: 0, data: {
                                orderId: "ORD-2024-001",
                                customer: "腾讯科技有限公司",
                                product: "企业版SaaS订阅服务",
                                amount: 125000.0,
                                status: "已完成",
                                createDate: "2024-01-10",
                                salesPerson: "李婷",
                                paymentMethod: "分期付款",
                                completionRate: 100,
                            },
                        },
                    });
                } else if (config.url === "/api/product/inventory") {
                    resolve({
                        data: {
                            code: 0, data: {
                                productId: "SKU-001",
                                productName: "华为Mate 60 Pro",
                                stock: 156,
                                inTransit: 50,
                                reserved: 20,
                                available: 86,
                                warningLevel: 200,
                                lastUpdate: "2024-01-15 10:30:00",
                            },
                        },
                    });
                }
            }, 800);
        });
    },
});

const BaseExample = () => {
    return (<Space direction="vertical" size="large" style={{width: "100%"}}>
        <div>
            <Text strong>员工信息快速查看</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/employee/detail"}}
                    size="large"
                    fetchContent={(data) => {
                        return ({
                            content: (<div style={{width: '500px'}}><Space direction="vertical" size="small">
                                <div style={{display: "flex", alignItems: "center", gap: 12}}>
                                    <Avatar src={data.avatar} size={48}/>
                                    <div>
                                        <Text strong style={{fontSize: 16}}>
                                            {data.name}
                                        </Text>
                                        <br/>
                                        <Text type="secondary">
                                            {data.department} · {data.position}
                                        </Text>
                                    </div>
                                </div>
                                <Descriptions
                                    size="small"
                                    dataSource={[[{label: "工号", content: data.employeeId}, {
                                        label: "邮箱", content: data.email
                                    }], [{label: "电话", content: data.phone}, {
                                        label: "入职日期", content: data.joinDate
                                    }], [{label: "绩效", content: data.performance}, {
                                        label: "技能", content: data.skills.join("、")
                                    }]]}
                                />
                            </Space></div>),
                        });
                    }}
                >
                    <Tag color="blue" style={{cursor: "pointer"}}>
                        张明 - 高级前端工程师
                    </Tag>
                </TooltipFetch>
            </div>
        </div>

        <div>
            <Text strong>订单详情快速查看</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/order/detail"}}
                    size="large"
                    fetchContent={(data) => ({
                        title: "订单详情", content: (<div style={{width: '500px'}}><Descriptions
                            size="small"
                            dataSource={[[{label: "订单号", content: data.orderId}, {
                                label: "客户", content: data.customer
                            }], [{label: "产品", content: data.product}, {
                                label: "金额", content: &#96;¥${data.amount.toLocaleString()}&#96;
                            }], [{
                                label: "状态", content: <Tag color="success">{data.status}</Tag>
                            }, {label: "完成率", content: &#96;${data.completionRate}%&#96;}, {
                                label: "创建日期", content: data.createDate
                            }], [{label: "销售", content: data.salesPerson}, {
                                label: "付款方式", content: data.paymentMethod
                            }]]}
                        /></div>),
                    })}
                >
                    <Tag color="green" style={{cursor: "pointer"}}>
                        ORD-2024-001 - 腾讯科技
                    </Tag>
                </TooltipFetch>
            </div>
        </div>

        <div>
            <Text strong>库存信息快速查看</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/product/inventory"}}
                    size="large"
                    fetchContent={(data) => ({
                        title: "库存详情",
                        importantInfo: data.available < data.warningLevel ? "库存不足！当前可用库存低于预警线。" : null,
                        importantInfoType: "warning",
                        content: (<div style={{width: '500px'}}>
                            <Descriptions
                                size="small"
                                dataSource={[[{label: "产品编号", content: data.productId}, {
                                    label: "产品名称", content: data.productName
                                }, {label: "库存总数", content: data.stock}], [{
                                    label: "在途数量", content: data.inTransit
                                }], [{label: "已预留", content: data.reserved}, {
                                    label: "可用库存", content: data.available
                                }], [{label: "预警线", content: data.warningLevel}, {
                                    label: "最后更新", content: data.lastUpdate
                                }]]}
                            />
                        </div>),
                    })}
                >
                    <Tag color="orange" style={{cursor: "pointer"}}>
                        华为Mate 60 Pro - 库存:156
                    </Tag>
                </TooltipFetch>
            </div>
        </div>

        <div>
            <Text strong>强制刷新数据</Text>
            <div style={{marginTop: 12}}>
                <TooltipFetch
                    api={{url: "/api/employee/detail"}}
                    size="large"
                    force={true}
                    fetchContent={(data) => ({
                        title: "员工信息（实时数据）", content: (<div>
                            <Text>姓名：{data.name}</Text>
                            <br/>
                            <Text>部门：{data.department}</Text>
                            <br/>
                            <Text type="secondary">
                                每次打开都会重新加载数据
                            </Text>
                        </div>),
                    })}
                >
                    <Tag color="purple" style={{cursor: "pointer"}}>
                        张明（实时数据）
                    </Tag>
                </TooltipFetch>
            </div>
        </div>
    </Space>);
};

render(<BaseExample/>);

```

### API

#### Tooltip 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| size | 提示框宽度，可选值：small(240px)、默认(360px)、large(480px) | string | - |
| title | 标题内容 | string/ReactNode | - |
| content | 主要内容 | string/ReactNode | - |
| subtitle | 副标题内容 | string/ReactNode | - |
| importantInfo | 重要提示信息 | string/ReactNode | - |
| importantInfoType | 重要信息类型，可选值：success、warning、error | string | - |
| showInfo | 是否显示标题旁的提示图标 | boolean | false |
| moreInfo | 扩展内容区域，可嵌入表单、图表等 | ReactNode | - |
| trigger | 触发方式，可选值：hover、click、focus | string | 'hover' |
| placement | 气泡框位置 | string | 'top' |
| overlayClassName | 自定义气泡框类名 | string | - |

#### TooltipFetch 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| api | 数据接口配置，参考 @kne/react-fetch | object | - |
| fetchContent | 数据转换函数，接收接口返回数据，返回 Tooltip 的 props | function | - |
| showLoading | 是否显示加载状态 | boolean | true |
| loadingClassName | 加载动画的自定义类名 | string | - |
| force | 是否每次显示都重新加载数据 | boolean | false |

#### TooltipInfoLabel 组件

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| title | 标签文字 | string | - |
| tooltipTitle | Tooltip 的属性对象，会传递给 Tooltip 组件 | object | - |

<!--END_SECTION:DOC_MD-->
