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
