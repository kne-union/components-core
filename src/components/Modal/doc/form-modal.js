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
