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
