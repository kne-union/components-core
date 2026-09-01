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
