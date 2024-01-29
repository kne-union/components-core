const { FormModal, useFormModal } = _Modal;
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
            field1: "field1field1field1field1",
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
            <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
            <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
            <TextArea name="field3" label="字段3" />,
          ]}
        />
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
            title: "表单弹窗",
            formProps: {
              data: {
                field1: "field1field1field1field1",
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
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
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
                field1: "field1field1field1field1",
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
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
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
