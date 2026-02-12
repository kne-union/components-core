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
