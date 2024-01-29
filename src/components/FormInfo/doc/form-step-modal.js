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
const { default: Fetch } = fetch;

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
        items={[
          {
            name: "basic",
            title: "基本信息",
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
            name: "list",
            title: "列表信息",
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
            formProps: ({ data }) => {
              return {
                data: data,
                onSubmit: async (data) => {
                  console.log(data);
                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 1000);
                  });
                  api.close();
                },
              };
            },
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({
                        field1: "我接口获取的数据",
                      });
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
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
        hooks加载form数据调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            footerButtons: [
              { ButtonComponent: CancelButton, children: "取消" },
              {
                ButtonComponent: FormApiButton,
                autoClose: false,
                onClick: (context) => {
                  console.log(context);
                },
                children: "FormApiButton",
              },
              {
                ButtonComponent: SubmitButton,
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
      <FormModalButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  name: "Lucy",
                  desc: "个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍",
                });
              }, 1000);
            });
          },
        }}
        modalProps={({ data, close }) => {
          return {
            title: "加载数据的form弹窗",
            formProps: {
              data,
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                close();
              },
            },
            children: (
              <FormInfo
                title="基本信息"
                column={1}
                list={[
                  <Input name="name" label="姓名" rule="REQ" />,
                  <TextArea name="desc" label="介绍" rule="REQ" />,
                ]}
              />
            ),
          };
        }}
      >
        加载form数据按钮
      </FormModalButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
