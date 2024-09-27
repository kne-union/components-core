const { Space, Button } = antd;
const { PureGlobal } = global;
const {
  default: FormInfo,
  List,
  Input,
  TextArea,
  FormModal,
  FormStepModal,
  useFormModal,
  useFormStepModal,
  CancelButton,
  FormApiButton,
  SubmitButton,
  FormModalButton,
} = _FormInfo;
const { useState } = React;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const formModal = useFormStepModal();
  return (
    <Space wrap>
      <FormStepModal
        open={open}
        title="表单弹窗"
        onClose={() => {
          setOpen(false);
        }}
        items={[
          {
            title: "基本信息",
            formProps: {
              data: {
                field1: "基本信息field1field1field1field1",
              },
              onSubmit: async (data) => {
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
              },
            },
            children: (
              <FormInfo
                title="基本信息"
                list={[
                  <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                  <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                  <TextArea name="field3" label="字段3" />,
                ]}
              />
            ),
          },
          {
            title: "列表信息",
            formProps: {
              data: {
                list: [{ field1: "列表信息field1field1field1field1" }],
              },
              onSubmit: async (data, { stepCacheRef }) => {
                console.log(stepCacheRef);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
              },
            },
            children: (
              <List
                title="列表"
                name="list"
                maxLength={3}
                list={[
                  <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                  <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                  <TextArea name="field3" label="字段3" />,
                ]}
              />
            ),
          },
        ]}
      ></FormStepModal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
