# react-modal

### 描述

基于 antd 的 React 弹层组件，提供 Modal/Drawer、useModal/useDrawer/useConfirmModal、共用 TabsLayout/ScrollRegion 布局与 createModalRender/createDrawerRender，支持 SimpleBar 与移动端适配。

### 关键词

react, modal, drawer, antd, dialog, simplebar, use-modal, use-drawer, use-confirm-modal, footer-buttons, tabs-layout, mobile, form, component, i18n

### 安装

```shell
npm i --save @kne/react-modal
```

### 概述

#### 概述

`@kne/react-modal` 是基于 Ant Design 的弹层组件库，提供声明式 / 命令式 **Modal** 与 **Drawer**，兼容 `footerButtons` 体系，内置 SimpleBar 滚动与移动端适配。

#### 主要特性

- 声明式 / 命令式同一套 props 与 UI（Modal `useModal`；Drawer `useDrawer` + `DrawerContextHolder`；确认框 `useConfirmModal`）
- `footer` + `footerButtons`（`ButtonComponent` / `display` / `autoClose`）
- title / footer 固定在滚动外，body 默认 SimpleBar
- `--kne-modal-*` / `--kne-drawer-*` CSS 变量管理高度链
- Modal 移动端全屏；Drawer 移动端侧滑全宽
- **示例**：各场景示例顶部提供 **Modal / Drawer** 切换，同一套 props 与内容对比两种弹层
- **共用布局**：`TabsLayout`、`ColumnsLayout`、`ScrollRegion`；`createModalRender` / `createDrawerRender` 对接 renderModal 宿主

#### 使用场景

列表快览、表单确认、侧滑详情、Tabs / 分栏复杂内容区均可通过布局组件组合，无需业务侧手写 SCSS。


### 示例

#### 示例样式

```scss
/* 示例业务 UI（布局滚动等仍用 @kne/react-modal/dist/index.css）
 * Modal/Drawer 挂到 body，demo 类名须 @at-root 逃出 md-doc scope 包裹 */
@at-root {
.candidate-list-toolbar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.candidate-list-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s ease;

  &:hover:not(.is-active) {
    background: #fafafa;
  }

  &.is-active {
    background: #e6f4ff;
    box-shadow: inset 3px 0 0 #1677ff;
  }
}

.candidate-list-item-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.candidate-list-item-body {
  flex: 1;
  min-width: 0;
}

.candidate-list-item-title {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.4;
}

.candidate-list-item-meta {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.candidate-detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.candidate-detail-name {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
}

.candidate-detail-sub {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.candidate-score-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px;
  margin-bottom: 20px;
}

.candidate-score-item-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
}

.candidate-note-block {
  padding: 12px 14px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.candidate-note-block-title {
  font-weight: 600;
  margin-bottom: 6px;
  color: rgba(0, 0, 0, 0.88);
}

.candidate-overview-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.candidate-stat-card {
  padding: 12px 14px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.candidate-stat-value {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.88);
}

.candidate-stat-label {
  margin-top: 4px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.candidate-overview-section {
  padding: 16px 20px 20px;
}

.candidate-schedule-row {
  display: grid;
  grid-template-columns: 72px 1fr 88px 72px;
  gap: 12px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }
}

.candidate-schedule-time {
  color: rgba(0, 0, 0, 0.45);
}

.demo-panel-hint {
  margin: 0;
  padding: 10px 16px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  background: #fffbe6;
  border-bottom: 1px solid #ffe58f;
}

.demo-job-preview {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  background: #fff;
}

.demo-job-preview-header {
  padding: 16px 20px;
  background: linear-gradient(135deg, #f6ffed 0%, #fff 100%);
  border-bottom: 1px solid #f0f0f0;
}

.demo-job-preview-body {
  padding: 16px 20px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.7;
}

.demo-modal-height-limited-panel {
  min-height: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  background: linear-gradient(180deg, #fff7e6 0%, #fff 48px);
  border: 2px dashed #fa8c16;
  border-radius: 6px;
}

.demo-modal-height-limited-panel-title {
  margin: 0 0 8px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
}

.demo-modal-height-limited-line {
  margin: 6px 0;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
}
}
```

#### 示例代码

- 基础弹层
- Modal / Drawer 切换：受控打开与异步 onConfirm（loading / 成功提示）
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { default: Modal, Drawer, DrawerContextHolder } = _ReactModal;
const { Button, Space, message, Typography, Radio, App } = antd;
const { useState, useEffect } = React;

const { Text, Paragraph } = Typography;

const BasicExample = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [mode]);

  const overlayProps = {
    title: '保存评估备注',
    open,
    onClose: () => setOpen(false),
    onConfirm: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      message.success('备注已保存至候选人档案');
    },
    confirmText: '保存'
  };

  const content = (
    <>
      <Paragraph style={{ marginBottom: 8 }}>
        将把当前页面的筛选条件与评估摘要一并写入 <Text strong>陈思远</Text> 的档案备注。
      </Paragraph>
      <Paragraph type="secondary" style={{ marginBottom: 0 }}>
        保存后可在「候选人详情 → 操作记录」中查看历史版本。
      </Paragraph>
    </>
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        保存评估备注
      </Button>
      <Text type="secondary">
        最简受控弹层：切换 Modal / Drawer 对比同一套 props；异步 onConfirm 带 loading。
      </Text>
      {isDrawer ? (
        <Drawer {...overlayProps} size="default">
          {content}
        </Drawer>
      ) : (
        <Modal {...overlayProps}>{content}</Modal>
      )}
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <BasicExample />
  </App>
);


```

- footerButtons 与尺寸
- Modal / Drawer 切换：size / footerButtons / 左侧 footer 插槽 / noPadding 预览
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { default: Modal, Drawer, DrawerContextHolder } = _ReactModal;
const { Button, Space, Radio, Tag, message, Typography, App } = antd;
const { useState, useEffect } = React;

const { Text, Title, Paragraph } = Typography;

const FooterButtonsExample = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('default');
  const [noPadding, setNoPadding] = useState(false);
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [mode]);

  const overlayProps = {
    title: '确认发布岗位',
    size,
    noPadding,
    open,
    onClose: () => setOpen(false),
    footer: <Text type="secondary">发布后将同步至招聘官网与内推渠道</Text>,
    footerButtons: [
      {
        children: '存草稿',
        onClick: () => message.info('已保存草稿')
      },
      {
        children: '预览',
        display: () => size !== 'small',
        onClick: () => message.info('打开预览页')
      },
      {
        type: 'primary',
        children: '立即发布',
        onClick: async () => {
          await new Promise(resolve => setTimeout(resolve, 600));
          message.success('岗位已发布');
        }
      }
    ]
  };

  const content = (
    <div className="demo-job-preview">
      <div className="demo-job-preview-header">
        <Title level={5} style={{ margin: 0 }}>
          高级前端工程师
        </Title>
        <Space size={8} style={{ marginTop: 8 }}>
          <Tag color="blue">上海</Tag>
          <Tag>25K–40K · 15 薪</Tag>
          <Tag color="green">急招</Tag>
        </Space>
      </div>
      <div className="demo-job-preview-body">
        <Paragraph style={{ marginTop: 0 }}>
          负责招聘中台、候选人评估等 B 端产品的前端交付；要求熟悉 React、工程化与组件库协作。
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          {noPadding
            ? 'noPadding=true：预览卡片应贴齐内容区边缘。'
            : 'noPadding=false：预览卡片四周保留默认内边距。'}
        </Paragraph>
      </div>
    </div>
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <div>
        <Text type="secondary">切换 Modal / Drawer、尺寸与 noPadding，观察预览卡片与 footer 按钮区布局。</Text>
      </div>
      <Radio.Group
        value={size}
        optionType="button"
        options={[
          { label: '小号', value: 'small' },
          { label: '默认', value: 'default' },
          { label: '大号', value: 'large' }
        ]}
        onChange={e => setSize(e.target.value)}
      />
      <Space wrap>
        <Button type="primary" onClick={() => setOpen(true)}>
          发布岗位确认
        </Button>
        <Button type={noPadding ? 'primary' : 'default'} onClick={() => setNoPadding(v => !v)}>
          noPadding={String(noPadding)}
        </Button>
      </Space>
      {isDrawer ? (
        <Drawer {...overlayProps}>{content}</Drawer>
      ) : (
        <Modal {...overlayProps}>{content}</Modal>
      )}
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <FooterButtonsExample />
  </App>
);


```

- 命令式打开（useModal / useDrawer）
- 切换 Modal / Drawer：命令式快览，children 函数内可 close()
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { useModal, useDrawer, DrawerContextHolder } = _ReactModal;
const { Button, Space, message, Descriptions, Tag, Typography, Radio, App } = antd;
const { useState } = React;

const { Text, Paragraph } = Typography;

const CommandExample = () => {
  const modal = useModal();
  const drawer = useDrawer();
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  const openDetail = () => {
    const api = isDrawer ? drawer : modal;
    api({
      title: isDrawer ? '候选人快览（侧滑）' : '候选人快览',
      size: 'small',
      confirmText: '加入待评估',
      children: ({ close }) => (
        <div>
          <Descriptions column={1} size="small" bordered style={{ marginBottom: 12 }}>
            <Descriptions.Item label="姓名">李雨桐</Descriptions.Item>
            <Descriptions.Item label="岗位">前端工程师 · 4 年</Descriptions.Item>
            <Descriptions.Item label="来源">内推 · 张三</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color="processing">简历通过</Tag>
            </Descriptions.Item>
          </Descriptions>
          <Paragraph type="secondary" style={{ marginBottom: 12 }}>
            命令式 {isDrawer ? 'Drawer' : 'Modal'} 适用于列表页「快速查看」；children 为函数时可调用{' '}
            <Text code>close()</Text> 主动关闭。
          </Paragraph>
          <Button size="small" onClick={() => close()}>
            关闭
          </Button>
        </div>
      ),
      onConfirm: () => {
        message.success('已加入待评估队列');
      }
    });
  };

  return (
    <Space direction="vertical">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Button type="primary" onClick={openDetail}>
        从列表打开候选人快览
      </Button>
      <Text type="secondary">
        Drawer 模式需挂载 DrawerContextHolder；Modal 使用 antd App 内置 useModal。
      </Text>
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <CommandExample />
  </App>
);


```

- useConfirmModal 确认框
- confirm / info / success / warning / error 命令式确认与提示（仅 Modal）
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { useConfirmModal } = _ReactModal;
const { Button, Space, App } = antd;

const CommandExample = () => {
  const confirmModal = useConfirmModal();

  return (
    <Space wrap>
      <Button
        onClick={() => {
          confirmModal({
            danger: true,
            type: 'confirm',
            title: '确定要删除该记录吗？',
            message: '此操作将永久删除该记录，相关数据将无法恢复。请确认是否继续删除操作？'
          });
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: 'confirm',
            confirmType: 'warning',
            title: '确定要编辑此内容吗？',
            message: '编辑后需要重新提交审核，未保存的修改将丢失。请确认是否继续编辑？'
          });
        }}
      >
        confirm 警告
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: 'info',
            title: '操作提示',
            message: '该操作将更新系统配置，可能影响其他用户的使用。建议在非工作时间进行此操作。'
          });
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: 'info',
            message: '数据已保存成功，系统将在后台进行同步处理，请稍候查看处理结果。'
          });
        }}
      >
        info 无标题
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: 'success',
            title: '操作成功',
            message: '恭喜！您的操作已成功完成。系统已发送通知邮件给相关团队成员。'
          });
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: 'warning',
            title: '操作警告',
            message: '检测到数据异常，继续操作可能导致数据不一致。建议先备份数据或联系技术支持。'
          });
        }}
      >
        warning
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: 'error',
            title: '操作失败',
            message: '系统处理出错，请检查网络连接或联系系统管理员。错误代码：ERR-500'
          });
        }}
      >
        error
      </Button>
    </Space>
  );
};

const BaseExample = () => (
  <App>
    <CommandExample />
  </App>
);

render(<BaseExample />);


```

- 长内容滚动
- Modal / Drawer 切换：SimpleBar vs bodyScroll=false 自管滚动
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { default: Modal, Drawer, DrawerContextHolder } = _ReactModal;
const { Button, Space, Typography, Divider, Radio, App } = antd;
const { useState, useEffect } = React;

const { Title, Paragraph, Text } = Typography;

const EVAL_SECTIONS = [
  {
    title: '沟通表达',
    items: [
      '表达结构清晰，能准确复述业务目标与技术约束。',
      '对追问能够给出有层次的回答，而非堆砌名词。'
    ]
  },
  {
    title: '专业深度',
    items: [
      '熟悉 React 渲染机制，能说明列表虚拟化方案选型理由。',
      '了解前端监控与错误边界在生产环境的实践。'
    ]
  },
  {
    title: '项目复杂度',
    items: [
      '参与过多团队协同的中台项目，承担核心模块 Owner。',
      '能描述需求变更下的架构演进与风险控制。'
    ]
  },
  {
    title: '协作推进',
    items: ['主动同步风险，推动联调与验收节点按时完成。']
  }
];

const EvaluationContent = () => (
  <>
    {EVAL_SECTIONS.map(section => (
      <div key={section.title} style={{ marginBottom: 20 }}>
        <Title level={5} style={{ marginTop: 0 }}>
          {section.title}
        </Title>
        {section.items.map(item => (
          <Paragraph key={item} style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>
            · {item}
          </Paragraph>
        ))}
      </div>
    ))}
    <Divider />
    <Text type="secondary">以下为填充内容，用于验证长文滚动。</Text>
    {Array.from({ length: 12 }, (_, i) => (
      <Paragraph key={i} style={{ color: 'rgba(0,0,0,0.45)' }}>
        补充记录 {i + 1}：候选人对团队文化、工作方式与交付节奏均表示认可。
      </Paragraph>
    ))}
  </>
);

const LongContentExample = () => {
  const [open, setOpen] = useState(false);
  const [openSelfScroll, setOpenSelfScroll] = useState(false);
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
    if (openSelfScroll) {
      setOpenSelfScroll(false);
    }
  }, [mode]);

  const contentHeightVar = isDrawer ? '--kne-drawer-content-height' : '--kne-modal-content-height';
  const Overlay = isDrawer ? Drawer : Modal;

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Paragraph type="secondary" style={{ margin: 0 }}>
        对比默认 SimpleBar 与 bodyScroll=false 自管滚动；切换 Modal / Drawer 观察高度链一致。
      </Paragraph>
      <Space wrap>
        <Button type="primary" onClick={() => setOpen(true)}>
          打开评估详情（SimpleBar）
        </Button>
        <Button onClick={() => setOpenSelfScroll(true)}>自管滚动（bodyScroll=false）</Button>
      </Space>
      <Overlay
        title="陈思远 · 面试评估纪要"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        confirmText="保存纪要"
        size={isDrawer ? 'default' : undefined}
      >
        <EvaluationContent />
      </Overlay>
      <Overlay
        title="自管滚动示例"
        open={openSelfScroll}
        onClose={() => setOpenSelfScroll(false)}
        bodyScroll={false}
        footer={null}
        size={isDrawer ? 'large' : undefined}
      >
        <div
          style={{
            height: &#96;var(${contentHeightVar})&#96;,
            minHeight: 0,
            overflow: 'auto',
            boxSizing: 'border-box',
            background: '#fafafa'
          }}
        >
          <div style={{ padding: 20 }}>
            <Paragraph style={{ marginTop: 0 }}>
              内容区高度绑定 <Text code>{contentHeightVar}</Text>，Tabs / 分栏场景同样适用。
            </Paragraph>
            <EvaluationContent />
          </div>
        </div>
      </Overlay>
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <LongContentExample />
  </App>
);


```

- 高度 CSS 变量
- Modal / Drawer 切换：默认/自定义 CSS 变量；色块绑定 content-height，探针显示变量与 clientHeight
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { default: Modal, Drawer, DrawerContextHolder } = _ReactModal;
const { Button, Space, Switch, Tag, Descriptions, Radio, Typography, App } = antd;
const { useState, useEffect } = React;

const { Text } = Typography;

const readCssVar = (el, name) => {
  if (!el) {
    return '-';
  }
  return getComputedStyle(el).getPropertyValue(name).trim() || '-';
};

const getOverlayChrome = mode => {
  const isDrawer = mode === 'drawer';
  return {
    isDrawer,
    testId: isDrawer ? 'react-drawer' : 'react-modal',
    bodyClass: isDrawer ? 'drawer-body' : 'modal-body',
    innerClass: isDrawer ? 'drawer-body-inner' : 'modal-body-inner',
    contentHeightVar: isDrawer ? '--kne-drawer-content-height' : '--kne-modal-content-height',
    bodyHeightVar: isDrawer ? '--kne-drawer-body-height' : '--kne-modal-body-height',
    varPrefix: isDrawer ? '--kne-drawer' : '--kne-modal'
  };
};

const HeightProbe = ({ open, revision, mode }) => {
  const [metrics, setMetrics] = useState(null);
  const chrome = getOverlayChrome(mode);

  useEffect(() => {
    if (!open) {
      setMetrics(null);
      return undefined;
    }
    const timer = setTimeout(() => {
      const outer = document.querySelector(&#96;[data-testid="${chrome.testId}"]&#96;);
      const body = outer && outer.querySelector(&#96;.${chrome.bodyClass}&#96;);
      const inner = outer && outer.querySelector(&#96;.${chrome.innerClass}&#96;);
      const fill = outer && outer.querySelector('[data-vars-fill]');
      setMetrics({
        gutter: readCssVar(outer, &#96;${chrome.varPrefix}-viewport-gutter&#96;),
        bodyHeightVar: readCssVar(body || outer, chrome.bodyHeightVar),
        contentHeightVar: readCssVar(inner || body || outer, chrome.contentHeightVar),
        bodyMin: readCssVar(outer, &#96;${chrome.varPrefix}-body-min-height&#96;),
        paddingV: readCssVar(outer, &#96;${chrome.varPrefix}-body-padding-vertical&#96;),
        bodyClient: body ? &#96;${body.clientHeight}px&#96; : '-',
        fillClient: fill ? &#96;${fill.clientHeight}px&#96; : '-'
      });
    }, 80);
    return () => clearTimeout(timer);
  }, [open, revision, mode, chrome]);

  if (!metrics) {
    return <Tag>打开弹层后显示变量与实测高度</Tag>;
  }

  return (
    <Descriptions size="small" bordered column={1} style={{ maxWidth: 640 }}>
      <Descriptions.Item label={&#96;${chrome.varPrefix}-viewport-gutter&#96;}>{metrics.gutter}</Descriptions.Item>
      <Descriptions.Item label={&#96;${chrome.varPrefix}-body-min-height&#96;}>{metrics.bodyMin}</Descriptions.Item>
      <Descriptions.Item label={&#96;${chrome.varPrefix}-body-padding-vertical&#96;}>{metrics.paddingV}</Descriptions.Item>
      <Descriptions.Item label={chrome.bodyHeightVar}>{metrics.bodyHeightVar}</Descriptions.Item>
      <Descriptions.Item label={chrome.contentHeightVar}>{metrics.contentHeightVar}</Descriptions.Item>
      <Descriptions.Item label="body.clientHeight">{metrics.bodyClient}</Descriptions.Item>
      <Descriptions.Item label="色块 clientHeight（应≈ content-height）">{metrics.fillClient}</Descriptions.Item>
    </Descriptions>
  );
};

const fillLines = Array.from({ length: 18 }, (_, i) => &#96;填充行 ${i + 1} · 用于验证 content-height 滚动&#96;);

const HeightVarsExample = () => {
  const [open, setOpen] = useState(false);
  const [customVars, setCustomVars] = useState(true);
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [mode]);

  const chrome = getOverlayChrome(mode);
  const revision = &#96;${mode}|${customVars}|${open}&#96;;
  const Overlay = isDrawer ? Drawer : Modal;

  const overlayStyle = customVars
    ? isDrawer
      ? {
          '--kne-drawer-body-min-height': '180px',
          '--kne-drawer-body-padding-vertical': '64px'
        }
      : {
          '--kne-modal-viewport-gutter': '240px',
          '--kne-modal-body-min-height': '180px',
          '--kne-modal-body-padding-vertical': '64px'
        }
    : undefined;

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Space wrap align="center">
        <Switch
          checked={customVars}
          onChange={setCustomVars}
          checkedChildren="自定义变量"
          unCheckedChildren="默认变量"
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          打开弹层对比高度
        </Button>
        <Tag color={customVars ? 'blue' : 'default'}>{customVars ? '已覆盖 CSS 变量' : '库内默认值'}</Tag>
      </Space>
      <div style={{ color: 'rgba(0,0,0,0.45)', maxWidth: 640 }}>
        通过 <code>style</code> 覆盖 {chrome.varPrefix}-* 变量。Drawer 无 viewport-gutter；Modal 可加大 gutter
        使 body 明显变矮。色块绑定 <code>{chrome.contentHeightVar}</code>。
      </div>
      <HeightProbe open={open} revision={revision} mode={mode} />
      <Overlay
        title={customVars ? '自定义高度 CSS 变量' : '默认高度 CSS 变量'}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        bodyScroll={false}
        noPadding={false}
        style={overlayStyle}
        size={isDrawer ? 'default' : undefined}
      >
        <div
          data-vars-fill
          style={{
            height: &#96;var(${chrome.contentHeightVar})&#96;,
            minHeight: 0,
            overflow: 'auto',
            boxSizing: 'border-box',
            background: customVars ? '#fff1f0' : '#e6f4ff',
            border: customVars ? '2px solid #ff4d4f' : '2px solid #1677ff'
          }}
        >
          <div style={{ padding: 12 }}>
            <p style={{ marginTop: 0, fontWeight: 600 }}>
              色块 height = var({chrome.contentHeightVar})。切换「自定义/默认」与 Modal/Drawer 后重新打开对比。
            </p>
            {fillLines.map(text => (
              <p key={text} style={{ margin: '4px 0' }}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </Overlay>
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <HeightVarsExample />
  </App>
);


```

- title / footer / noPadding 高度探针
- Modal / Drawer 切换：title、footer、noPadding、bodyScroll 组合实测高度变量
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { default: Modal, Drawer, DrawerContextHolder } = _ReactModal;
const { Button, Space, Switch, Radio, Tag, Descriptions, Typography, App } = antd;
const { useState, useEffect } = React;

const { Text } = Typography;

const readCssVar = (el, name) => {
  if (!el) {
    return '-';
  }
  return getComputedStyle(el).getPropertyValue(name).trim() || '-';
};

const getOverlayChrome = mode => {
  const isDrawer = mode === 'drawer';
  return {
    isDrawer,
    testId: isDrawer ? 'react-drawer' : 'react-modal',
    bodyClass: isDrawer ? 'drawer-body' : 'modal-body',
    innerClass: isDrawer ? 'drawer-body-inner' : 'modal-body-inner',
    contentHeightVar: isDrawer ? '--kne-drawer-content-height' : '--kne-modal-content-height',
    bodyHeightVar: isDrawer ? '--kne-drawer-body-height' : '--kne-modal-body-height',
    varPrefix: isDrawer ? '--kne-drawer' : '--kne-modal'
  };
};

const HeightProbe = ({ open, revision, mode }) => {
  const [metrics, setMetrics] = useState(null);
  const chrome = getOverlayChrome(mode);

  useEffect(() => {
    if (!open) {
      setMetrics(null);
      return undefined;
    }
    const timer = setTimeout(() => {
      const outer = document.querySelector(&#96;[data-testid="${chrome.testId}"]&#96;);
      const body = outer && outer.querySelector(&#96;.${chrome.bodyClass}&#96;);
      const inner = outer && outer.querySelector(&#96;.${chrome.innerClass}&#96;);
      const scrollHost = outer && outer.querySelector('[data-height-scroll-host]');
      setMetrics({
        outerClass: outer ? outer.className : '-',
        bodyHeightVar: readCssVar(body || outer, chrome.bodyHeightVar),
        contentHeightVar: readCssVar(inner || body || outer, chrome.contentHeightVar),
        paddingV: readCssVar(outer, &#96;${chrome.varPrefix}-body-padding-vertical&#96;),
        paddingH: readCssVar(outer, &#96;${chrome.varPrefix}-body-padding-horizontal&#96;),
        titleH: readCssVar(outer, &#96;${chrome.varPrefix}-title-height&#96;),
        footerH: readCssVar(outer, &#96;${chrome.varPrefix}-footer-height&#96;),
        bodyClient: body ? &#96;${body.clientHeight}px&#96; : '-',
        innerClient: inner ? &#96;${inner.clientHeight}px&#96; : '-',
        scrollClient: scrollHost ? &#96;${scrollHost.clientHeight}px&#96; : '-'
      });
    }, 80);
    return () => clearTimeout(timer);
  }, [open, revision, mode, chrome]);

  if (!metrics) {
    return <Tag>打开弹层后显示实测高度</Tag>;
  }

  return (
    <Descriptions size="small" bordered column={1} style={{ maxWidth: 640 }}>
      <Descriptions.Item label="outer class">{metrics.outerClass}</Descriptions.Item>
      <Descriptions.Item label={&#96;${chrome.varPrefix}-title-height&#96;}>{metrics.titleH}</Descriptions.Item>
      <Descriptions.Item label={&#96;${chrome.varPrefix}-footer-height&#96;}>{metrics.footerH}</Descriptions.Item>
      <Descriptions.Item label={&#96;${chrome.varPrefix}-body-padding-vertical&#96;}>{metrics.paddingV}</Descriptions.Item>
      <Descriptions.Item label={&#96;${chrome.varPrefix}-body-padding-horizontal&#96;}>{metrics.paddingH}</Descriptions.Item>
      <Descriptions.Item label={chrome.bodyHeightVar}>{metrics.bodyHeightVar}</Descriptions.Item>
      <Descriptions.Item label={chrome.contentHeightVar}>{metrics.contentHeightVar}</Descriptions.Item>
      <Descriptions.Item label="body.clientHeight">{metrics.bodyClient}</Descriptions.Item>
      <Descriptions.Item label="body-inner.clientHeight">{metrics.innerClient}</Descriptions.Item>
      <Descriptions.Item label="scrollHost.clientHeight">{metrics.scrollClient}</Descriptions.Item>
    </Descriptions>
  );
};

const ChromeHeightExample = () => {
  const [open, setOpen] = useState(false);
  const [hasTitle, setHasTitle] = useState(true);
  const [footerMode, setFooterMode] = useState('default');
  const [bodyScroll, setBodyScroll] = useState(false);
  const [noPaddingMode, setNoPaddingMode] = useState('auto');
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [mode]);

  const chrome = getOverlayChrome(mode);
  const Overlay = isDrawer ? Drawer : Modal;
  const revision = [mode, hasTitle, footerMode, bodyScroll, noPaddingMode, open].join('|');

  const noPaddingProp = noPaddingMode === 'auto' ? undefined : noPaddingMode === 'true';

  const overlayProps = {
    open,
    onClose: () => setOpen(false),
    bodyScroll,
    ...(hasTitle ? { title: '候选人评估 · 高度调试' } : {}),
    ...(noPaddingProp === undefined ? {} : { noPadding: noPaddingProp }),
    size: isDrawer ? 'default' : undefined
  };

  if (footerMode === 'null') {
    overlayProps.footer = null;
  } else if (footerMode === 'emptyButtons') {
    overlayProps.footer = <span>仅左侧 footer，按钮为空数组</span>;
    overlayProps.footerButtons = [];
  } else {
    overlayProps.onConfirm = () => {};
  }

  const lines = Array.from({ length: 24 }, (_, i) => &#96;行 ${i + 1} · 用于观察滚动与高度是否贴齐&#96;);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Space wrap align="center">
        <span>title</span>
        <Switch checked={hasTitle} onChange={setHasTitle} checkedChildren="有" unCheckedChildren="空" />
        <span>bodyScroll</span>
        <Switch
          checked={bodyScroll}
          onChange={setBodyScroll}
          checkedChildren="true"
          unCheckedChildren="false"
        />
      </Space>
      <div>
        <div style={{ marginBottom: 8 }}>footer</div>
        <Radio.Group
          value={footerMode}
          optionType="button"
          options={[
            { label: '默认按钮', value: 'default' },
            { label: 'footer=null（无 footer 区）', value: 'null' },
            { label: 'footerButtons=[]', value: 'emptyButtons' }
          ]}
          onChange={e => setFooterMode(e.target.value)}
        />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>noPadding</div>
        <Radio.Group
          value={noPaddingMode}
          optionType="button"
          options={[
            { label: '未传（auto）', value: 'auto' },
            { label: 'true', value: 'true' },
            { label: 'false', value: 'false' }
          ]}
          onChange={e => setNoPaddingMode(e.target.value)}
        />
      </div>
      <Space wrap>
        <Button type="primary" onClick={() => setOpen(true)}>
          打开并测量
        </Button>
        <Tag>mode={mode}</Tag>
        <Tag>footerMode={footerMode}</Tag>
      </Space>
      <HeightProbe open={open} revision={revision} mode={mode} />
      <Overlay {...overlayProps}>
        {bodyScroll === false ? (
          <div
            data-height-scroll-host
            style={{
              height: &#96;var(${chrome.contentHeightVar})&#96;,
              minHeight: 0,
              overflow: 'auto',
              boxSizing: 'border-box',
              background: noPaddingProp === false ? '#fff7e6' : '#e6f4ff',
              border: noPaddingProp === false ? '2px dashed #fa8c16' : '2px dashed #1677ff'
            }}
          >
            <div style={{ padding: 12 }}>
              <p style={{ marginTop: 0, fontWeight: 600 }}>
                滚动宿主 height: var({chrome.contentHeightVar})。footer=null 时 footer 变量应为 0。
              </p>
              {lines.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        ) : (
          <div
            data-height-scroll-host
            style={{
              background: noPaddingProp ? '#e6f4ff' : '#fff7e6',
              border: noPaddingProp ? '2px dashed #1677ff' : '2px dashed #fa8c16',
              minHeight: 120
            }}
          >
            <div style={{ padding: 12 }}>
              <p style={{ marginTop: 0, fontWeight: 600 }}>SimpleBar 模式：看色块是否贴边判断 noPadding。</p>
              {lines.slice(0, 8).map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        )}
      </Overlay>
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <ChromeHeightExample />
  </App>
);


```

- 高度受限 · 居中弹窗
- kne-modal-height-limited 压低 body 高度；声明式 / useModal 对比居中与 confirm-paragraph 宽度
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { default: Modal, useModal, DrawerContextHolder } = _ReactModal;
const { Button, Space, Radio, Typography, App } = antd;
const { useState } = React;

const { Text, Paragraph } = Typography;

const fillLines = Array.from({ length: 20 }, (_, i) => &#96;填充行 ${i + 1} · 用于观察高度受限时 body 内滚动&#96;);

const LimitedHeightExample = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('declarative');
  const modal = useModal();

  const content = (
    <div className="demo-modal-height-limited-panel">
      <p className="demo-modal-height-limited-panel-title">高度受限弹窗（kne-modal-height-limited）</p>
      <Paragraph type="secondary" style={{ marginBottom: 12 }}>
        默认从视口垂直居中弹出；body 高度被 CSS 变量压到约 420px，长内容在 SimpleBar 内滚动。
      </Paragraph>
      {fillLines.map(text => (
        <p key={text} className="demo-modal-height-limited-line">
          {text}
        </p>
      ))}
    </div>
  );

  const overlayProps = {
    title: '高度受限 · 居中弹窗',
    className: 'kne-modal-height-limited',
    onClose: () => setOpen(false),
    onConfirm: () => setOpen(false),
    confirmText: '知道了'
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: '声明式 Modal', value: 'declarative' },
            { label: 'useModal（info）', value: 'imperative' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Button
        type="primary"
        onClick={() => {
          if (mode === 'imperative') {
            modal({
              ...overlayProps,
              children: content
            });
            return;
          }
          setOpen(true);
        }}
      >
        打开高度受限弹窗
      </Button>
      <Text type="secondary">
        useModal 走 antd modal.info，已覆盖 <code>.ant-modal-confirm-paragraph</code> 的 12px 宽度扣减。
      </Text>
      {mode === 'declarative' ? (
        <Modal {...overlayProps} open={open}>
          {content}
        </Modal>
      ) : null}
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <LimitedHeightExample />
  </App>
);


```

- 批量候选人评估（Tabs + 分栏）
- Modal / Drawer 切换：Tabs 分栏 / Splitter / 批次概览
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const {
  default: Modal,
  Drawer,
  DrawerContextHolder,
  TabsLayout,
  ColumnsLayout,
  ScrollRegion,
  modalClassNames
} = _ReactModal;
const {
  Button,
  Space,
  Splitter,
  Input,
  Avatar,
  Tag,
  Descriptions,
  Progress,
  Typography,
  Divider,
  App,
  message,
  Radio
} = antd;
const { useState, useMemo, useEffect } = React;

const { Text, Title, Paragraph } = Typography;

const STATUS_MAP = {
  pending: { label: '待评估', color: 'orange' },
  passed: { label: '已通过', color: 'success' },
  hold: { label: '待定', color: 'processing' }
};

const CANDIDATES = [
  {
    key: '1',
    name: '陈思远',
    role: '高级前端工程师',
    years: 6,
    city: '上海',
    edu: '浙江大学 · 本科',
    status: 'pending',
    interviewer: '王面试官',
    scores: { comm: 4, tech: 5, project: 4, collab: 4 },
    summary: '主导过设计系统与性能治理，对 React 生态和工程化有较深实践。',
    notes: [
      { title: '技术深度', body: '能清晰描述虚拟列表、并发特性在项目中的落地方式，并给出可量化的性能收益。' },
      { title: '协作推进', body: '跨端联调经验充足，曾推动组件库在 3 条业务线统一接入。' },
      { title: '待确认', body: '对 Node 中间层经验相对薄弱，需二面补充后端协作场景。' }
    ]
  },
  {
    key: '2',
    name: '李雨桐',
    role: '前端工程师',
    years: 4,
    city: '上海',
    edu: '同济大学 · 硕士',
    status: 'passed',
    interviewer: '赵面试官',
    scores: { comm: 5, tech: 4, project: 4, collab: 5 },
    summary: '表达结构清晰，B 端复杂表单与权限场景经验丰富。',
    notes: [
      { title: '项目经验', body: '负责过审批流配置平台，熟悉动态表单、状态机与低代码接入。' },
      { title: '综合评价', body: '建议通过，可安排 HR 谈薪。' }
    ]
  },
  {
    key: '3',
    name: '周亦凡',
    role: '资深前端',
    years: 8,
    city: '杭州',
    edu: '华中科技大学 · 本科',
    status: 'hold',
    interviewer: '王面试官',
    scores: { comm: 3, tech: 5, project: 5, collab: 3 },
    summary: '技术栈匹配度高，但管理岗预期与当前编制不完全一致。',
    notes: [
      { title: '优势', body: '架构视野好，有微前端与监控体系从 0 到 1 经验。' },
      { title: '风险', body: '期望职级偏高，需与部门负责人对齐编制与职责范围。' }
    ]
  },
  {
    key: '4',
    name: '张可欣',
    role: 'React 开发',
    years: 3,
    city: '上海',
    edu: '华东师范大学 · 本科',
    status: 'pending',
    interviewer: '待分配',
    scores: { comm: 4, tech: 3, project: 3, collab: 4 },
    summary: '基础扎实，学习意愿强，适合参与组件库与文档建设。',
    notes: [{ title: '初面印象', body: 'Coding 完成度较好，需进一步考察复杂状态管理与性能排查。' }]
  },
  {
    key: '5',
    name: '刘浩然',
    role: '全栈工程师',
    years: 5,
    city: '深圳',
    edu: '中山大学 · 本科',
    status: 'passed',
    interviewer: '陈面试官',
    scores: { comm: 4, tech: 4, project: 4, collab: 4 },
    summary: '前后端均可独立交付，适合业务闭环小团队。',
    notes: [{ title: '备注', body: '可优先推进 offer，期望 4 月到岗。' }]
  },
  {
    key: '6',
    name: '赵一鸣',
    role: '前端工程师',
    years: 2,
    city: '上海',
    edu: '上海大学 · 本科',
    status: 'pending',
    interviewer: '待分配',
    scores: { comm: 3, tech: 3, project: 2, collab: 3 },
    summary: '初级候选人，项目复杂度一般，建议放入人才池观察。',
    notes: [{ title: '初筛', body: '基础题通过，项目细节描述不够深入。' }]
  },
  {
    key: '7',
    name: '孙雅琪',
    role: '高级前端',
    years: 7,
    city: '北京',
    edu: '北京邮电大学 · 硕士',
    status: 'hold',
    interviewer: '王面试官',
    scores: { comm: 4, tech: 5, project: 4, collab: 4 },
    summary: '技术匹配，但地域需确认是否接受 base 上海。',
    notes: [{ title: '跟进', body: '已发送 relocate 意愿确认邮件。' }]
  },
  {
    key: '8',
    name: '吴承泽',
    role: '前端架构师',
    years: 10,
    city: '上海',
    edu: '上海交通大学 · 硕士',
    status: 'passed',
    interviewer: '总监面',
    scores: { comm: 5, tech: 5, project: 5, collab: 5 },
    summary: '综合表现优秀，建议进入终面委员会评审。',
    notes: [
      { title: '架构能力', body: '对团队工程规范、发布流程、质量门禁有体系化方法论。' },
      { title: '下一步', body: '安排与研发负责人终面。' }
    ]
  }
];

const EXTRA_CANDIDATES = Array.from({ length: 12 }, (_, i) => ({
  key: String(i + 9),
  name: &#96;候选人 ${i + 9}&#96;,
  role: i % 2 === 0 ? '前端工程师' : '高级前端',
  years: 2 + (i % 6),
  city: ['上海', '杭州', '深圳'][i % 3],
  edu: '本科',
  status: ['pending', 'passed', 'hold'][i % 3],
  interviewer: '待分配',
  scores: { comm: 3 + (i % 3), tech: 3 + (i % 2), project: 3, collab: 3 },
  summary: '批量导入的待评估候选人，用于验证左侧列表滚动与选中切换。',
  notes: [{ title: '系统备注', body: '暂无详细评估记录，请安排初面后补充。' }]
}));

const ALL_CANDIDATES = [...CANDIDATES, ...EXTRA_CANDIDATES];

const SCORE_LABELS = {
  comm: '沟通表达',
  tech: '专业深度',
  project: '项目复杂度',
  collab: '协作推进'
};

const CandidateList = ({ items, activeKey, onSelect, search, onSearchChange }) => (
  <>
    <div className="modal-scroll-region-sticky candidate-list-toolbar">
      <Input
        allowClear
        placeholder="搜索姓名、岗位、城市…"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      <Text type="secondary">本批 {items.length} 人 · 点击切换右侧详情</Text>
    </div>
    {items.map(item => {
      const status = STATUS_MAP[item.status] || STATUS_MAP.pending;
      return (
        <div
          key={item.key}
          className={&#96;candidate-list-item${item.key === activeKey ? ' is-active' : ''}&#96;}
          onClick={() => onSelect(item.key)}
        >
          <div className="candidate-list-item-main">
            <Avatar style={{ backgroundColor: item.key === activeKey ? '#1677ff' : '#87d068' }}>
              {item.name.slice(-2)}
            </Avatar>
            <div className="candidate-list-item-body">
              <div className="candidate-list-item-title">{item.name}</div>
              <div className="candidate-list-item-meta">
                {item.role} · {item.years} 年 · {item.city}
              </div>
            </div>
            <Tag color={status.color} style={{ margin: 0 }}>
              {status.label}
            </Tag>
          </div>
        </div>
      );
    })}
  </>
);

const CandidateDetail = ({ candidate }) => {
  if (!candidate) {
    return null;
  }
  const status = STATUS_MAP[candidate.status] || STATUS_MAP.pending;
  const avgScore =
    Object.values(candidate.scores).reduce((a, b) => a + b, 0) / Object.values(candidate.scores).length;

  return (
    <div className="candidate-detail">
      <div className="candidate-detail-header">
        <div>
          <Title level={4} className="candidate-detail-name">
            {candidate.name}
          </Title>
          <div className="candidate-detail-sub">
            <Tag>{candidate.role}</Tag>
            <Tag>{candidate.years} 年经验</Tag>
            <Tag>{candidate.city}</Tag>
            <Tag color={status.color}>{status.label}</Tag>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Text type="secondary">综合</Text>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#1677ff', lineHeight: 1.2 }}>
            {avgScore.toFixed(1)}
          </div>
        </div>
      </div>

      <Descriptions size="small" bordered column={2} style={{ marginBottom: 20 }}>
        <Descriptions.Item label="学历">{candidate.edu}</Descriptions.Item>
        <Descriptions.Item label="面试官">{candidate.interviewer}</Descriptions.Item>
        <Descriptions.Item label="摘要" span={2}>
          {candidate.summary}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left" plain style={{ margin: '0 0 12px' }}>
        维度评分
      </Divider>
      <div className="candidate-score-grid">
        {Object.entries(candidate.scores).map(([key, value]) => (
          <div key={key}>
            <div className="candidate-score-item-label">
              <span>{SCORE_LABELS[key]}</span>
              <span>{value} / 5</span>
            </div>
            <Progress percent={value * 20} showInfo={false} strokeColor="#1677ff" size="small" />
          </div>
        ))}
      </div>

      <Divider orientation="left" plain style={{ margin: '0 0 12px' }}>
        面试记录
      </Divider>
      {candidate.notes.map(note => (
        <div key={note.title} className="candidate-note-block">
          <div className="candidate-note-block-title">{note.title}</div>
          <Paragraph style={{ margin: 0, color: 'rgba(0,0,0,0.65)' }}>{note.body}</Paragraph>
        </div>
      ))}
    </div>
  );
};

const useCandidatePanel = () => {
  const [active, setActive] = useState(ALL_CANDIDATES[0].key);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return ALL_CANDIDATES;
    }
    return ALL_CANDIDATES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
    );
  }, [search]);

  const current = filtered.find(item => item.key === active) || filtered[0];

  return { active, setActive, search, setSearch, filtered, current };
};

const ColumnsPane = () => {
  const { setActive, search, setSearch, filtered, current } = useCandidatePanel();

  return (
    <ColumnsLayout widths={['34%', '1fr']}>
      <ScrollRegion>
        <CandidateList
          items={filtered}
          activeKey={current?.key}
          onSelect={setActive}
          search={search}
          onSearchChange={setSearch}
        />
      </ScrollRegion>
      <ScrollRegion inset>
        <CandidateDetail candidate={current} />
      </ScrollRegion>
    </ColumnsLayout>
  );
};

const SplitterPane = () => {
  const { setActive, search, setSearch, filtered, current } = useCandidatePanel();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <p className="demo-panel-hint">可拖拽中间分隔条调整列表宽度，左右列仍各自 SimpleBar 滚动。</p>
      <Splitter
        className={modalClassNames.splitter}
        style={{ flex: 1, minHeight: 0 }}
        defaultSize="34%"
        min="240"
        max="52%"
      >
        <Splitter.Panel>
          <ScrollRegion>
            <CandidateList
              items={filtered}
              activeKey={current?.key}
              onSelect={setActive}
              search={search}
              onSearchChange={setSearch}
            />
          </ScrollRegion>
        </Splitter.Panel>
        <Splitter.Panel>
          <ScrollRegion inset>
            <CandidateDetail candidate={current} />
          </ScrollRegion>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

const OverviewPane = () => {
  const stats = useMemo(() => {
    const pending = ALL_CANDIDATES.filter(c => c.status === 'pending').length;
    const passed = ALL_CANDIDATES.filter(c => c.status === 'passed').length;
    const hold = ALL_CANDIDATES.filter(c => c.status === 'hold').length;
    return { total: ALL_CANDIDATES.length, pending, passed, hold };
  }, []);

  const schedule = [
    { time: '09:30', name: '陈思远', role: '高级前端', room: 'A301', status: 'pending' },
    { time: '10:30', name: '李雨桐', role: '前端', room: 'A301', status: 'passed' },
    { time: '14:00', name: '周亦凡', role: '资深前端', room: 'B208', status: 'hold' },
    { time: '15:30', name: '张可欣', role: 'React', room: 'B208', status: 'pending' },
    { time: '16:30', name: '吴承泽', role: '架构师', room: '总监室', status: 'passed' }
  ];

  return (
    <ScrollRegion>
      <div className="candidate-overview-stats">
        {[
          { label: '本批人数', value: stats.total },
          { label: '待评估', value: stats.pending },
          { label: '已通过', value: stats.passed },
          { label: '待定', value: stats.hold }
        ].map(item => (
          <div key={item.label} className="candidate-stat-card">
            <div className="candidate-stat-value">{item.value}</div>
            <div className="candidate-stat-label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="candidate-overview-section">
        <Title level={5} style={{ marginTop: 0 }}>
          今日面试安排
        </Title>
        <div className="candidate-schedule-row" style={{ fontWeight: 600, color: 'rgba(0,0,0,0.45)' }}>
          <span>时间</span>
          <span>候选人</span>
          <span>会议室</span>
          <span>状态</span>
        </div>
        {schedule.map(row => {
          const status = STATUS_MAP[row.status];
          return (
            <div key={row.time + row.name} className="candidate-schedule-row">
              <span className="candidate-schedule-time">{row.time}</span>
              <span>
                {row.name}
                <Text type="secondary"> · {row.role}</Text>
              </span>
              <span>{row.room}</span>
              <Tag color={status.color} style={{ margin: 0, justifySelf: 'start' }}>
                {status.label}
              </Tag>
            </div>
          );
        })}
        <Divider />
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          概览 Tab 同样使用 ScrollRegion：批次统计与日程较长时在本面板内滚动，不影响 Tabs 顶栏与底部操作区。
        </Paragraph>
        {Array.from({ length: 6 }, (_, i) => (
          <Paragraph key={i} style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)' }}>
            备注 {i + 1}：终面委员会会议安排在周五 15:00，需提前汇总已通过候选人材料。
          </Paragraph>
        ))}
      </div>
    </ScrollRegion>
  );
};

const ExtendLayoutExample = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('columns');
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [mode]);

  const Overlay = isDrawer ? Drawer : Modal;

  const layout = (
    <TabsLayout
      activeKey={tab}
      onChange={setTab}
      items={[
        { key: 'columns', label: '候选人', children: <ColumnsPane /> },
        { key: 'split', label: '可调分栏', children: <SplitterPane /> },
        { key: 'overview', label: '批次概览', children: <OverviewPane /> }
      ]}
    />
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <div>
        <Button type="primary" onClick={() => setOpen(true)}>
          打开批量评估弹层
        </Button>
        <Paragraph type="secondary" style={{ margin: '8px 0 0' }}>
          模拟 HR 批量面试评估：Tabs 占 title 位，左列表右详情；切换 Modal / Drawer 对比布局高度链。
        </Paragraph>
      </div>
      <Overlay
        open={open}
        onClose={() => setOpen(false)}
        bodyScroll={false}
        size="large"
        onConfirm={async () => {
          await new Promise(r => setTimeout(r, 400));
          message.success('本批评估已保存');
        }}
        confirmText="保存本批评估"
        cancelText="稍后处理"
      >
        {layout}
      </Overlay>
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <ExtendLayoutExample />
  </App>
);


```

- 嵌套弹层（外层命令式 + 内层 Modal）
- Modal / Drawer 切换外层；内层声明式 Modal 嵌套 hoist
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),antd(antd)

```jsx
const { default: Modal, useModal, useDrawer, DrawerContextHolder } = _ReactModal;
const { Button, Space, Typography, Tag, message, Checkbox, Radio, App } = antd;
const { useState, useEffect } = React;
const { Text, Paragraph } = Typography;

const EXPORT_FIELDS = [
  { label: '基本信息', value: 'basic' },
  { label: '维度评分', value: 'scores' },
  { label: '面试记录', value: 'notes' },
  { label: '附件简历', value: 'resume' }
];

const NestProbe = ({ open, isDrawer }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!open) {
      setInfo(null);
      return;
    }
    const id = window.setTimeout(() => {
      const outerRootClass = isDrawer ? '.ant-drawer-root' : '.ant-modal-root';
      const titleClass = isDrawer ? '.drawer-title' : '.modal-title';
      const titles = Array.from(document.querySelectorAll(&#96;${outerRootClass} ${titleClass}&#96;));
      const outerTitle = titles.find(el => el.textContent === (isDrawer ? '导出评估报告（侧滑）' : '导出评估报告'));
      const innerTitle = titles.find(el => el.textContent === '选择导出字段');
      const outerRoot = outerTitle?.closest(outerRootClass.slice(1));
      const innerRoot = innerTitle?.closest('.ant-modal-root');
      const outerBody = outerRoot?.querySelector(isDrawer ? '.ant-drawer-body' : '.ant-modal-body');
      const hoisted = !!(innerRoot && outerBody && !outerBody.contains(innerRoot));
      setInfo({ hoisted });
    }, 50);
    return () => window.clearTimeout(id);
  }, [open, isDrawer]);

  if (!info) {
    return <Text type="secondary">打开内层后显示挂载探针</Text>;
  }

  return (
    <Tag color={info.hoisted ? 'success' : 'error'}>
      内层 Modal {info.hoisted ? '已 hoist 到外层外侧' : '挂载异常'}
    </Tag>
  );
};

const ExportFieldPicker = ({ isDrawer }) => {
  const [innerOpen, setInnerOpen] = useState(false);
  const [checked, setChecked] = useState(['basic', 'scores', 'notes']);

  return (
    <div>
      <Paragraph>
        已选择本批 <Text strong>8</Text> 位候选人。内层始终为声明式 Modal；外层当前为{' '}
        <Text code>{isDrawer ? 'Drawer' : 'Modal'}</Text>。
      </Paragraph>
      <Space>
        <Button type="primary" onClick={() => setInnerOpen(true)}>
          配置导出字段
        </Button>
        <Text type="secondary">已选 {checked.length} 项</Text>
      </Space>
      <div style={{ marginTop: 12 }}>
        <NestProbe open={innerOpen} isDrawer={isDrawer} />
      </div>
      <Modal
        title="选择导出字段"
        open={innerOpen}
        size="small"
        onClose={() => setInnerOpen(false)}
        onConfirm={() => {
          message.success(&#96;将导出：${checked.join('、')}&#96;);
          setInnerOpen(false);
        }}
        confirmText="确认字段"
      >
        <Checkbox.Group
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          options={EXPORT_FIELDS}
          value={checked}
          onChange={setChecked}
        />
      </Modal>
    </div>
  );
};

const NestedModalExample = () => {
  const modal = useModal();
  const drawer = useDrawer();
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Button
        type="primary"
        onClick={() => {
          const api = isDrawer ? drawer : modal;
          api({
            title: isDrawer ? '导出评估报告（侧滑）' : '导出评估报告',
            size: 'default',
            children: <ExportFieldPicker isDrawer={isDrawer} />,
            onConfirm: () => message.success('报告已进入生成队列'),
            confirmText: '开始导出'
          });
        }}
      >
        导出本批评估（嵌套弹层）
      </Button>
      <Text type="secondary">外层 Modal / Drawer 命令式 + 内层声明式 Modal 嵌套 hoist。</Text>
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <NestedModalExample />
  </App>
);


```

- FormModal + renderModal
- Modal / Drawer 切换：超长表单，createModalRender / createDrawerRender
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),_FormInfo(@kne/form-info)[import * as _FormInfo from "@kne/form-info"],(@kne/form-info/dist/index.css),antd(antd)

```jsx
const { createModalRender, createDrawerRender, DrawerContextHolder } = _ReactModal;
const { default: FormInfo, FormModal, Input, TextArea } = _FormInfo;
const { Button, Space, Typography, App, message, Switch, Flex, Radio } = antd;
const { useState, useMemo, useEffect } = React;
const { Text, Paragraph } = Typography;

const SECTION_DEFS = [
  {
    key: 'basic',
    title: '基本信息',
    fields: [
      ['name', '姓名', 'REQ'],
      ['employeeNo', '工号', 'REQ'],
      ['department', '部门', 'REQ'],
      ['position', '职位', 'REQ'],
      ['phone', '手机号', 'REQ TEL'],
      ['email', '邮箱', 'EMAIL'],
      ['city', '工作城市', 'REQ'],
      ['manager', '直属上级', '']
    ]
  },
  {
    key: 'interview',
    title: '面试评估',
    fields: [
      ['commScore', '沟通表达', 'REQ'],
      ['techScore', '专业深度', 'REQ'],
      ['projectScore', '项目复杂度', 'REQ'],
      ['collabScore', '协作推进', 'REQ'],
      ['cultureScore', '文化匹配', 'REQ'],
      ['overallScore', '综合评分', 'REQ']
    ]
  },
  {
    key: 'experience',
    title: '经历与补充',
    fields: Array.from({ length: 16 }, (_, i) => [
      &#96;expField${i + 1}&#96;,
      &#96;经历补充项 ${i + 1}&#96;,
      i % 4 === 0 ? 'REQ' : ''
    ])
  }
];

const buildInitialData = () => {
  const data = {
    name: '张三',
    employeeNo: 'E20240018',
    department: '研发中心',
    position: '高级前端',
    phone: '13800138000',
    email: 'zhangsan@company.com',
    city: '上海',
    manager: '李四',
    commScore: '4',
    techScore: '5',
    projectScore: '4',
    collabScore: '4',
    cultureScore: '5',
    overallScore: '4.5',
    summary:
      '沟通清晰，项目推进稳定。以下为加长评估说明，用于验证弹窗 body 在超长表单下的 SimpleBar 滚动：标题与底部按钮应固定，仅中间表单区域滚动。'.repeat(3)
  };
  SECTION_DEFS[2].fields.forEach(([name], i) => {
    data[name] = &#96;补充说明内容 ${i + 1}：用于拉长表单高度。&#96;;
  });
  return data;
};

const LongFormFields = () => (
  <Flex vertical gap={16}>
    {SECTION_DEFS.map(section => (
      <FormInfo
        key={section.key}
        bordered
        title={section.title}
        column={2}
        gap={20}
        list={section.fields.map(([name, label, rule]) => (
          <Input key={name} name={name} label={label} rule={rule || undefined} />
        ))}
      />
    ))}
    <FormInfo
      bordered
      title="评估摘要（长文本）"
      column={1}
      gap={20}
      list={[
        <TextArea key="summary" name="summary" label="综合评语" rule="REQ" block />,
        <TextArea
          key="risk"
          name="risk"
          label="风险与待跟进"
          block
          placeholder="列出风险点、待确认事项等"
        />,
        <TextArea
          key="plan"
          name="plan"
          label="入职 / 下轮计划"
          block
          placeholder="试用期目标、面试官建议等"
        />
      ]}
    />
    {Array.from({ length: 8 }, (_, block) => (
      <FormInfo
        key={&#96;extra-${block}&#96;}
        bordered
        title={&#96;附加问卷 ${block + 1}&#96;}
        column={2}
        gap={20}
        list={Array.from({ length: 6 }, (_, i) => {
          const name = &#96;q${block + 1}_${i + 1}&#96;;
          return <Input key={name} name={name} label={&#96;问题 ${block + 1}.${i + 1}&#96;} />;
        })}
      />
    ))}
  </Flex>
);

const FormInfoModalExample = () => {
  const [open, setOpen] = useState(false);
  const [bodyScroll, setBodyScroll] = useState(true);
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';
  const initialData = useMemo(() => buildInitialData(), []);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [mode]);

  const renderModalBase = isDrawer
    ? createDrawerRender({ placement: 'right', footerButtons: [], bodyScroll: true, size: 'large' })
    : createModalRender({ footerButtons: [], bodyScroll: true, size: 'large' });

  const renderModal = ({
    formProps,
    saveText,
    autoClose,
    onCancel,
    footer,
    modalRender,
    children,
    ...props
  }) =>
    renderModalBase({
      ...props,
      bodyScroll,
      onClose: onCancel,
      footer: typeof footer === 'function' ? footer() : footer,
      modalRender,
      children
    });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Space wrap>
        <Button type="primary" onClick={() => setOpen(true)}>
          打开深度评估表单（FormModal）
        </Button>
        <Space>
          <Text type="secondary">bodyScroll</Text>
          <Switch checked={bodyScroll} onChange={setBodyScroll} checkedChildren="开" unCheckedChildren="关" />
        </Space>
      </Space>
      <Text type="secondary">
        createModalRender / createDrawerRender 注入默认 props；切换 Modal / Drawer 对比 form-info 宿主集成。
      </Text>

      <FormModal
        title={isDrawer ? '候选人深度评估（侧滑）' : '候选人深度评估（超长表单）'}
        open={open}
        onCancel={() => setOpen(false)}
        renderModal={renderModal}
        okText="保存评估"
        cancelText="取消"
        width={1000}
        formProps={{
          data: initialData,
          onSubmit: async data => {
            await new Promise(resolve => setTimeout(resolve, 500));
            message.success(&#96;已保存：${data.name}（共 ${Object.keys(data).length} 个字段）&#96;);
          }
        }}
      >
        <LongFormFields />
      </FormModal>
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <FormInfoModalExample />
  </App>
);


```

- FormStepsModal + renderModal
- Modal / Drawer 切换：分步表单，步骤内 FormInfo gap + Flex 垂直间距
- _ReactModal(@kne/react-modal)[import * as _ReactModal from "@kne/react-modal"],(@kne/react-modal/dist/index.css),_FormInfo(@kne/form-info)[import * as _FormInfo from "@kne/form-info"],(@kne/form-info/dist/index.css),antd(antd)

```jsx
const { createModalRender, createDrawerRender, modalClassNames, DrawerContextHolder } = _ReactModal;
const { default: FormInfo, FormStepsModal, List, Input, TextArea } = _FormInfo;
const { Button, Space, Typography, App, message, Flex, Radio } = antd;
const { useState, useEffect } = React;
const { Text } = Typography;

const renderStepsModalBase = isDrawer =>
  isDrawer
    ? createDrawerRender({
        placement: 'right',
        footerButtons: [],
        bodyScroll: true,
        size: 'default',
        className: modalClassNames.stepsForm
      })
    : createModalRender({
        footerButtons: [],
        bodyScroll: true,
        size: 'default',
        className: modalClassNames.stepsForm
      });

const renderStepsModal = isDrawer => ({
  formProps,
  saveText,
  autoClose,
  onCancel,
  footer,
  modalRender,
  children,
  className,
  ...props
}) =>
  renderStepsModalBase(isDrawer)({
    ...props,
    className,
    onClose: onCancel,
    footer: typeof footer === 'function' ? footer() : footer,
    modalRender,
    children
  });

const STEP_DATA = {
  name: '李四',
  employeeNo: 'E20240023',
  department: '产品部',
  phone: '13900139000',
  email: 'lisi@company.com',
  years: '6',
  position: '高级产品经理',
  commScore: '4',
  techScore: '4',
  projectScore: '5',
  summary: '产品规划清晰，跨团队推进能力强。',
  workExperience: [
    {
      companyName: '某互联网公司',
      role: '产品经理',
      years: '3年'
    }
  ],
  objectives: '1. 独立负责核心模块\n2. 推动跨部门协作\n3. 三个月内熟悉业务',
  risks: '对行业业务理解仍需加深'
};

const FormInfoStepsModalExample = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('modal');
  const isDrawer = mode === 'drawer';

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [mode]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space align="center" wrap>
        <Text type="secondary">打开方式</Text>
        <Radio.Group
          value={mode}
          optionType="button"
          size="small"
          options={[
            { label: 'Modal', value: 'modal' },
            { label: 'Drawer', value: 'drawer' }
          ]}
          onChange={e => setMode(e.target.value)}
        />
      </Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开分步评估（FormStepsModal）
      </Button>
      <Text type="secondary">三步完成候选人评估；切换 Modal / Drawer 对比分步表单高度链。</Text>

      <FormStepsModal
        autoStep
        completeText="提交评估"
        nextText="下一步"
        onComplete={async allData => {
          await new Promise(resolve => setTimeout(resolve, 600));
          message.success(&#96;已提交 ${allData.length} 步数据&#96;);
        }}
        modalProps={{
          open,
          title: isDrawer ? '候选人评估（侧滑分步）' : '候选人评估（分步）',
          width: 900,
          onCancel: () => setOpen(false),
          renderModal: renderStepsModal(isDrawer)
        }}
        items={[
          {
            title: '基本信息',
            formProps: { data: STEP_DATA },
            children: (
              <Flex vertical gap={16}>
                <FormInfo
                  bordered
                  title="候选人信息"
                  column={2}
                  gap={20}
                  list={[
                    <Input name="name" label="姓名" rule="REQ" />,
                    <Input name="employeeNo" label="工号" rule="REQ" disabled />,
                    <Input name="department" label="部门" rule="REQ" />,
                    <Input name="position" label="职位" rule="REQ" />,
                    <Input name="phone" label="手机号" rule="REQ TEL" />,
                    <Input name="email" label="邮箱" rule="EMAIL" />,
                    <Input name="years" label="工作年限" rule="REQ" />
                  ]}
                />
              </Flex>
            )
          },
          {
            title: '面试评分',
            formProps: { data: STEP_DATA },
            children: (
              <Flex vertical gap={16}>
                <FormInfo
                  bordered
                  title="维度评分"
                  column={2}
                  gap={20}
                  list={[
                    <Input name="commScore" label="沟通表达" rule="REQ" />,
                    <Input name="techScore" label="专业深度" rule="REQ" />,
                    <Input name="projectScore" label="项目复杂度" rule="REQ" />
                  ]}
                />
                <FormInfo
                  bordered
                  title="评语"
                  column={1}
                  gap={20}
                  list={[
                    <TextArea name="summary" label="综合评语" rule="REQ" block rows={4} />
                  ]}
                />
              </Flex>
            )
          },
          {
            title: '经历与结论',
            formProps: { data: STEP_DATA },
            children: (
              <Flex vertical gap={16}>
                <List
                  title="工作经历"
                  name="workExperience"
                  bordered
                  important
                  maxLength={5}
                  addText="添加经历"
                  itemTitle={({ index, data }) => data?.companyName || &#96;经历 ${index + 1}&#96;}
                  list={[
                    <Input name="companyName" label="公司" rule="REQ" />,
                    <Input name="role" label="职位" rule="REQ" />,
                    <Input name="years" label="年限" placeholder="例如 2年" />
                  ]}
                />
                <FormInfo
                  bordered
                  title="目标与风险"
                  column={1}
                  gap={20}
                  list={[
                    <TextArea name="objectives" label="培养目标" rule="REQ" block rows={4} />,
                    <TextArea name="risks" label="风险与跟进" block rows={3} />
                  ]}
                />
              </Flex>
            )
          }
        ]}
      />
    </Space>
  );
};

render(
  <App>
    <DrawerContextHolder />
    <FormInfoStepsModalExample />
  </App>
);


```

- isPopup 挂载验收（保存模版场景）
- 外层 Modal + responsive-boundary 内打开 useFormModal，内层 isPopup SuperSelect 下拉应盖在内层弹窗上且可选中文件夹
- _Modal(@kne/react-modal),_FormInfo(@components/FormInfo),global(@components/Global),antd(antd)

```jsx
const { default: Modal } = _Modal;
const { default: FormInfo, useFormModal, fields } = _FormInfo;
const { SuperSelect, Input } = fields;
const { useState } = React;
const { Button, Space, Alert, Typography, Steps } = antd;
const { PureGlobal, ResponsiveProvider } = global;

const { Text, Paragraph } = Typography;

const hintStyle = { color: '#666', fontSize: 13, lineHeight: 1.6 };
const cardStyle = {
  border: '1px solid var(--bg-color-grey-3, #f0f0f0)',
  borderRadius: 8,
  padding: 16
};

const mockQuestions = [
  { title: '1. 您的姓名', type: '单行文本' },
  { title: '2. 工作年限', type: '单选' },
  { title: '3. 技能描述', type: '多行文本' }
];

const folderApi = {
  loader: () => ({
    pageData: [
      { label: '全部', value: 'all', description: '根目录' },
      { label: '问卷模版', value: 'questionnaire', description: '业务模版库' },
      { label: '归档', value: 'archive', description: '历史归档' }
    ]
  })
};

const SaveTemplateForm = () => (
  <FormInfo
    column={1}
    list={[
      <SuperSelect
        name="folder"
        label="保存到文件夹"
        rule="REQ"
        single
        isPopup
        placeholder="请选择文件夹"
        api={folderApi}
      />,
      <Input name="name" label="模版名称" rule="REQ LEN-1-50" defaultValue="示例问卷模版" />
    ]}
  />
);

const MockFormCreator = ({ onSaveTemplate }) => (
  <ResponsiveProvider mode="container">
    <div
      className="kne-responsive-boundary"
      style={{
        minHeight: 320,
        padding: 16,
        border: '1px dashed var(--bg-color-grey-4, #d9d9d9)',
        borderRadius: 8,
        background: 'var(--bg-color-grey-1, #fafafa)'
      }}
    >
      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
        message="验收步骤"
        description={
          <ol style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            <li>点下方或 footer 的「保存为模版」</li>
            <li>在内层弹窗点「保存到文件夹」</li>
            <li>下拉应盖在内层弹窗上，且能选中「问卷模版 / 归档」</li>
          </ol>
        }
      />
      <Text strong>模拟 FormCreator 题目列表</Text>
      <Space direction="vertical" style={{ width: '100%', marginTop: 12 }} size={8}>
        {mockQuestions.map(item => (
          <div
            key={item.title}
            style={{
              padding: '10px 12px',
              background: '#fff',
              border: '1px solid var(--bg-color-grey-3, #f0f0f0)',
              borderRadius: 6
            }}
          >
            <div style={{ fontWeight: 500 }}>{item.title}</div>
            <Text type="secondary">{item.type}</Text>
          </div>
        ))}
      </Space>
      <Button type="primary" style={{ marginTop: 16 }} onClick={onSaveTemplate}>
        保存为模版（内容区入口）
      </Button>
    </div>
  </ResponsiveProvider>
);

const SaveTemplateInOuterModal = () => {
  const formModal = useFormModal();
  const [open, setOpen] = useState(false);

  const openSaveTemplate = () => {
    formModal({
      title: '保存为模版',
      size: 'small',
      formProps: {
        data: { name: '示例问卷模版' },
        onSubmit: () => {}
      },
      children: <SaveTemplateForm />
    });
  };

  return (
    <div style={cardStyle}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>外层 Modal + useFormModal + isPopup SuperSelect</div>
      <Paragraph style={hintStyle} type="secondary">
        本页不是完整 FormCreator，只复现「外层业务弹窗 + boundary + 内层保存模版 + isPopup 文件夹」的挂载链路。
        外层空白是正常的；请按步骤打开<strong>内层</strong>表单验收下拉。
      </Paragraph>
      <Steps
        size="small"
        style={{ marginBottom: 16, maxWidth: 560 }}
        items={[
          { title: '打开外层 Modal' },
          { title: '点保存为模版' },
          { title: '测文件夹下拉' }
        ]}
      />
      <Button type="primary" onClick={() => setOpen(true)}>
        ① 打开外层 Modal（模拟 BizUnit）
      </Button>
      <Modal
        title="问卷模版编辑"
        open={open}
        onClose={() => setOpen(false)}
        size="large"
        footerButtons={[
          {
            children: '② 保存为模版',
            type: 'primary',
            onClick: openSaveTemplate
          }
        ]}
      >
        <MockFormCreator onSaveTemplate={openSaveTemplate} />
      </Modal>
    </div>
  );
};

/** 不打开外层 Modal，直接测内层 isPopup（对照组） */
const InnerOnlyCase = () => {
  const formModal = useFormModal();
  return (
    <div style={cardStyle}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>对照：仅内层 useFormModal（无外层 Modal）</div>
      <div style={hintStyle}>若这里文件夹下拉正常、上面场景也正常，说明 modal-root 兄弟挂载生效。</div>
      <Button
        style={{ marginTop: 12 }}
        onClick={() => {
          formModal({
            title: '保存为模版',
            size: 'small',
            formProps: { data: { name: '对照模版' }, onSubmit: () => {} },
            children: <SaveTemplateForm />
          });
        }}
      >
        直接打开「保存为模版」
      </Button>
    </div>
  );
};

const PopupMountIsPopupExample = () => (
  <Space direction="vertical" style={{ width: '100%' }} size="large">
    <Alert
      type="info"
      showIcon
      message="isPopup 挂载策略验收（usePopupMount）"
      description="针对 flowup「保存为模版 → 选择文件夹」：手机预览应出现半屏 sheet（非桌面 Dropdown）；Modal 内 sheet 通过 antd zIndexContext 自动抬层，配合 modal-root 兄弟挂载。"
    />
    <SaveTemplateInOuterModal />
    <InnerOnlyCase />
  </Space>
);

render(
  <PureGlobal>
    <PopupMountIsPopupExample />
  </PureGlobal>
);

```

- 嵌套弹窗与层级
- 在 Form / FormModal 里用 SuperSelect 验收嵌套弹层挂载：选择层应盖住外层 footer，不能挂进表单内容区里
- _Modal(@kne/react-modal),_FormInfo(@components/FormInfo),global(@components/Global),antd(antd)

```jsx
const { default: Modal, useConfirmModal } = _Modal;
const { default: FormInfo, Form, FormModal, useFormModal, fields } = _FormInfo;
const { SuperSelect } = fields;
const { useState } = React;
const { Button, Space, Alert } = antd;
const { PureGlobal } = global;

const hintStyle = { color: "#666", fontSize: 13, lineHeight: 1.6 };
const cardStyle = {
  border: "1px solid var(--bg-color-grey-3, #f0f0f0)",
  borderRadius: 8,
  padding: 16,
};

const courseApi = {
  loader: () => ({
    pageData: [
      { label: "前端架构设计", value: "fe", description: "企业级前端架构" },
      { label: "微服务架构", value: "ms", description: "后端设计模式" },
      { label: "云原生应用", value: "cloud", description: "Kubernetes" },
      { label: "数据分析", value: "data", description: "Spark / Hadoop" },
    ],
  }),
};

const CourseSelect = ({ name = "course" }) => (
  <FormInfo
    column={1}
    list={[
      <SuperSelect name={name} label="选择课程" rule="REQ" api={courseApi} />,
    ]}
  />
);

const CaseCard = ({ title, expect, children }) => (
  <div style={cardStyle}>
    <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
    <div style={hintStyle}>{expect}</div>
    <div style={{ marginTop: 12 }}>{children}</div>
  </div>
);

const DeclarativeFormModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <CaseCard
      title="1. FormModal 里的 SuperSelect"
      expect="点「选择课程」弹出的 SuperSelect 层应盖住 FormModal 的取消/保存，不能缩在表单内容区里。"
    >
      <Button type="primary" onClick={() => setOpen(true)}>
        打开 FormModal
      </Button>
      <FormModal
        title="编辑课程"
        open={open}
        onClose={() => setOpen(false)}
        formProps={{
          onSubmit: () => setOpen(false),
        }}
      >
        <CourseSelect />
      </FormModal>
    </CaseCard>
  );
};

const UseFormModalSelect = () => {
  const formModal = useFormModal();
  return (
    <CaseCard
      title="2. useFormModal 里的 SuperSelect（原问题）"
      expect="底部只能看到 SuperSelect 弹层自己的确定/取消，外层「取消/保存」不能透出来。"
    >
      <Button
        type="primary"
        onClick={() => {
          formModal({
            title: "设置问卷",
            formProps: {
              onSubmit: () => {},
            },
            children: <CourseSelect name="questionnaireCourse" />,
          });
        }}
      >
        打开外层 FormModal
      </Button>
    </CaseCard>
  );
};

const ModalWithFormSelect = () => {
  const [open, setOpen] = useState(false);
  return (
    <CaseCard
      title="3. 声明式 Modal 内的 Form + SuperSelect"
      expect="普通 Modal 包一层 Form 后，SuperSelect 弹层同样盖住外层 footer。"
    >
      <Button type="primary" onClick={() => setOpen(true)}>
        打开 Modal
      </Button>
      <Modal
        title="外层弹窗"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <Form>
          <CourseSelect name="modalCourse" />
        </Form>
      </Modal>
    </CaseCard>
  );
};

const InnerFormWithSelect = () => {
  const [open, setOpen] = useState(false);
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <CourseSelect name="outerCourse" />
      <Button type="primary" onClick={() => setOpen(true)}>
        再打开内层 FormModal
      </Button>
      <FormModal
        title="内层表单"
        size="small"
        open={open}
        onClose={() => setOpen(false)}
        formProps={{
          onSubmit: () => setOpen(false),
        }}
      >
        <CourseSelect name="innerCourse" />
      </FormModal>
    </Space>
  );
};

const NestedFormModals = () => {
  const formModal = useFormModal();
  return (
    <CaseCard
      title="4. FormModal 套 FormModal，两层都是 SuperSelect"
      expect="先点外层 SuperSelect 看弹层；再开内层表单，内层 SuperSelect 应盖住内层和外层 footer。"
    >
      <Button
        type="primary"
        onClick={() => {
          formModal({
            title: "外层表单",
            formProps: {
              onSubmit: () => {},
            },
            children: <InnerFormWithSelect />,
          });
        }}
      >
        打开外层 FormModal
      </Button>
    </CaseCard>
  );
};

const ConfirmInForm = () => {
  const confirmModal = useConfirmModal();
  const [open, setOpen] = useState(false);
  return (
    <CaseCard
      title="5. FormModal 里 SuperSelect + 确认框"
      expect="SuperSelect 弹层和确认框都要叠在表单弹窗之上，关闭后表单还在。"
    >
      <Button type="primary" onClick={() => setOpen(true)}>
        打开 FormModal
      </Button>
      <FormModal
        title="外层表单"
        open={open}
        onClose={() => setOpen(false)}
        formProps={{
          onSubmit: () => setOpen(false),
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <CourseSelect name="confirmCourse" />
          <Button
            onClick={() => {
              confirmModal({
                type: "confirm",
                title: "确认提交？",
                message: "确认框应盖住 FormModal，不能被挡住。",
              });
            }}
          >
            打开确认框
          </Button>
        </Space>
      </FormModal>
    </CaseCard>
  );
};

const NestedModalExamples = () => (
  <Space direction="vertical" style={{ width: "100%" }} size="large">
    <Alert
      type="info"
      showIcon
      message="Form + SuperSelect 嵌套挂载验收"
      description="SuperSelect 会再弹出一层 Modal。请分别在桌面和示例手机预览下点「选择课程」。通过标准：选择层盖住外层 footer；不是缩在表单内容区；手机预览里仍在手机框内。"
    />
    <DeclarativeFormModal />
    <UseFormModalSelect />
    <ModalWithFormSelect />
    <NestedFormModals />
    <ConfirmInForm />
  </Space>
);

render(
  <PureGlobal>
    <NestedModalExamples />
  </PureGlobal>
);

```

- FormModal表单弹窗
- 展示FormModal组件的用法，在弹窗中展示表单，适合数据录入、编辑等场景
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd)

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

### API

#### Modal

声明式弹窗。基于 antd Modal，关闭请使用 `onClose`（内部映射 antd `onCancel`）。

##### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| open | boolean | - | 是否显示 |
| onClose | function | - | 关闭回调；受控时由此改 `open` |
| title | ReactNode \| function | - | 标题；为 function 时入参含 `close` |
| children | ReactNode \| function | - | 内容；为 function 时入参含 `close` |
| onConfirm | function | - | 默认确认按钮；支持 Promise；返回 `false` 不关闭 |
| onCancel | function | - | 默认取消按钮；语义同 `onConfirm` |
| confirmText | ReactNode | - | 默认确认文案（默认 intl Confirm） |
| cancelText | ReactNode | - | 默认取消文案（默认 intl Cancel） |
| footer | ReactNode \| function \| null | - | 左侧 footer 插槽；与 `footerButtons` 均为「未设置」且 `footer === null` 时不渲染 footer |
| footerButtons | array \| function | - | 右侧按钮区，见下表；未传时为取消+确认 |
| size | `small` \| `default` \| `large` | `default` | 桌面宽度档位 |
| noPadding | boolean | false | 去掉 body 内边距。未传且 `bodyScroll={false}` 时默认视为 true；显式 `noPadding={false}` 可保留内边距 |
| maskClosable | boolean | false | 点击蒙层是否关闭 |
| closable | boolean | true | 是否显示右上角关闭 |
| bodyScroll | boolean | true | true 使用 SimpleBar；false 不挂 SimpleBar，内容自管滚动，且默认 noPadding（可用 `noPadding={false}` 覆盖） |
| mobileFullscreen | boolean | true | 移动端是否全屏 |
| getContainer | HTMLElement \| function | - | 挂载容器；嵌套时默认挂到外层 `.ant-modal-root` 外侧 |
| width / zIndex / className / afterClose / style / styles | - | - | 透传或覆盖 antd Modal |

其余未列出参数按 antd Modal 习惯透传。

##### footerButtons 项

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| children | ReactNode | - | 按钮文案 |
| type | string | - | antd Button type |
| onClick | function | - | 可返回 Promise；末参为 `targetProps`（含 `close`）；`autoClose` 且结果 `!== false` 时关闭 |
| autoClose | boolean | true | 点击后是否自动关闭 |
| display | boolean \| function | - | `false` 隐藏；function 返回值决定是否展示 |
| ButtonComponent | component | - | 自定义按钮；默认走 ButtonGroup 内 LoadingButton |
| ... | - | - | 其余透传 Button |

- `footerButtons={[]}`：不渲染按钮列（可与左侧 `footer` 并存）。**移动端**此模式且 `footer` 有内容时（如 FormModal 自带 Submit/Cancel），按钮区会自动居中，与默认 `footerButtons` 行为一致。
- `footer === null` 且未传 `footerButtons`：不渲染整个 footer 区

#### useModal

命令式打开弹窗，参数同 Modal。需在 antd `App`（或 `App.useApp` 可用）上下文中使用。

##### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| modal | function | 调用后弹出 Modal；返回 `{ close }`；默认 `zIndex` 为 1100 |

#### useConfirmModal

命令式确认 / 提示弹窗，底层走 antd `App.modal` 的 `confirm` / `info` / `success` / `warning` / `error`。需在 antd `App` 上下文中使用。

##### 参数

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `confirm` \| `info` \| `success` \| `warning` \| `error` | `confirm` | 调用 `modal[type]` |
| title | ReactNode | - | 标题 |
| message | ReactNode | - | 正文 |
| danger | boolean | false | 为 true 时展示语义图标，确认钮危险色 |
| confirmType | `info` \| `warning` \| `error` \| `success` | `info` | `type=confirm` 时图标语义 |
| icon | ReactNode | - | 自定义图标，覆盖默认 |
| onConfirm | function | - | 映射 antd `onOk` |
| onCancel | function | - | 映射 antd `onCancel` |
| confirmText | ReactNode | - | 映射 `okText` |
| cancelText | ReactNode | - | 映射 `cancelText` |
| onClose | function | - | 调用 `close()` 时触发 |
| maskClosable | boolean | false | 默认不可点蒙层关闭 |
| getContainer | HTMLElement \| function | - | 嵌套时挂到外层 modal 外侧 |
| afterClose / zIndex / wrapClassName | - | - | 透传；默认 `zIndex` 1100 |

其余未列出参数按 antd Modal.confirm 习惯透传。

##### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| confirmModal | function | 调用后弹出确认框；返回 `{ close }` |

与 `useModal` 对比：专用于短文案确认 / 提示，桌面居中窄宽（约 400px），无 SimpleBar body。

#### CSS 变量

挂在 `.modal` / `.modal-outer` 上，可业务覆盖。

| 变量 | 说明 |
|------|------|
| `--kne-modal-viewport-height` | 默认 `var(--kne-viewport-height, 100vh)` |
| `--kne-modal-viewport-width` | 默认 `var(--kne-viewport-width, 100vw)` |
| `--kne-modal-title-height` | 标题区高度贡献，默认 `48px`；无 title 为 `0` |
| `--kne-modal-footer-height` | footer 高度贡献，默认 `58px`；无 footer 为 `0` |
| `--kne-modal-viewport-gutter` | 桌面相对视口留白合计，默认 `120px`；移动全屏 `0` |
| `--kne-modal-body-padding-vertical` | body 上下 padding 合计，默认 `48px`；`noPadding` 为 `0` |
| `--kne-modal-body-padding-horizontal` | body 左右 padding 合计，默认 `48px`；`noPadding` 为 `0` |
| `--kne-modal-body-height` | body 容器高度（**不**扣 body padding） |
| `--kne-modal-content-height` | 内容高度；默认 `body-height − padding-vertical`。`bodyScroll={false}` 时在 `.modal-body` 内覆盖为 `100%`（相对 body 实高），供内部滚动容器使用 |
| `--kne-modal-body-min-height` / `--kne-modal-body-max-height` | body 容器 min/max |
| `--kne-modal-content-min-height` | content 侧 min |
| `--kne-modal-content-width` | 内容宽度契约（扣 horizontal padding） |

#### 布局组合（Modal / Drawer 共用）

Tabs / N 列分栏等复杂内容区须 **`bodyScroll={false}`**，由 `ScrollRegion`（SimpleBar）分区滚动，避免与弹层 body 双层 SimpleBar。

##### TabsLayout

antd `Tabs` 封装：顶栏占 title 位（配合无 `title` 的弹层）、antd6 高度链、`destroyOnHidden` 默认 true。其余 props 透传 Tabs。

##### ColumnsLayout

固定 N 列 flex 分栏。`widths` 与 `children` 等长（如 `['36%', '1fr']`、`['200px', '1fr', '280px']`）；`'1fr'` 占剩余宽度。

##### ScrollRegion

单块 SimpleBar 滚动区，用于 Tab 面板或每一列。首列/末列背景由父级 `:first-child` / `:last-child` 选中。

- `inset`（默认 `false`）：为 `true` 时内容区增加 `16px 20px` 内边距（适合详情、概览等单列内容）
- 分栏列表左列通常保持 `inset={false}`，由列表项自行控制间距

Tabs / 分栏弹层须 **`bodyScroll={false}`**，此时默认 **noPadding**（内容贴边），以便分栏铺满 body；需要外层留白时可传 **`noPadding={false}`**。

##### modalClassNames

| 常量 | 值 | 用途 |
|------|-----|------|
| `stepsForm` | `react-modal-steps-form` | 分步弹窗挂 `className`，去横向溢出 |
| `splitter` | `react-modal-splitter` | antd Splitter 在弹层内的高度链 |

##### createModalRender

```ts
createModalRender(modalDefaults) => (hostProps) => Modal
```

仅合并 `modalDefaults` 与 `hostProps` 后渲染 Modal。宿主协议（`onCancel`→`onClose`、剥离非 Modal 字段、`footer` 函数等）由调用方在 `renderModal` 回调内完成。

推荐 `modalDefaults`：

| 场景 | modalDefaults |
|------|---------------|
| 子内容自带 Footer | `{ footerButtons: [] }` |
| 长内容 | `{ footerButtons: [], bodyScroll: true, size: 'large' }` |
| 分步弹窗 | `{ footerButtons: [], bodyScroll: true, size: 'default', className: modalClassNames.stepsForm }` |

#### Drawer

声明式侧滑层。基于 antd Drawer，关闭请使用 `onClose`（内部映射 antd `onClose`）。API 与 Modal 对齐处不再重复；差异如下。

##### 属性（差异与补充）

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| placement | `left` \| `right` \| `top` \| `bottom` | `right` | 滑出方向；`size` 映射 width（left/right）或 height（top/bottom） |
| size | `small` \| `default` \| `large` | `default` | 600 / 1000 / min(vw−64, 1500) px |
| 移动端 | - | 侧滑全宽 | left/right → 100vw；top/bottom → 100vh（非 Modal 式全屏居中） |

其余 `open` / `onClose` / `title` / `children` / `footer` / `footerButtons` / `bodyScroll` / `noPadding` / `closable` / `maskClosable` / `getContainer` 等与 Modal 相同。

**FormModal**：传入的 `modalRender` 会在 Drawer 内注入 `ModalForm`，包裹整块 chrome（title / body / footer，与 Modal 的 panel 语义一致）；footer 内 Submit/Cancel 需在 Form 上下文内。

嵌套时默认挂到外层 `.ant-drawer-root` 外侧。

#### useDrawer

命令式打开 Drawer，参数同 Drawer。须在 antd `App` 内挂载 **`<DrawerContextHolder />`**（对标 antd 内置 `ModalContextHolder`），签名与 `useModal` 相同：`const drawer = useDrawer(); drawer(props) → { close }`。

#### Drawer CSS 变量

挂在 `.drawer` / `.drawer-outer` 上；命名 `--kne-drawer-*`，语义与 Modal 对齐（无 viewport gutter，body 占满面板高度链）。`.drawer-outer` 内 bridge `--kne-modal-content-height` 等，供共用 `ScrollRegion` / `TabsLayout` 高度链。

#### createDrawerRender

```ts
createDrawerRender(drawerDefaults) => (hostProps) => Drawer
```

单参数合并渲染；宿主字段映射由 `renderModal` 回调内完成（同 `createModalRender`）。

