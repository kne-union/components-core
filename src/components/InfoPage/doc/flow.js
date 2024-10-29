const { Space, Flex, Divider } = antd;
const { Flow } = _InfoPage;
const BaseExample = () => {
  return (
    <Flex vertical gap={8}>
      <Flow
        current={2}
        dataSource={[
          {
            title: "title1",
            description: "This is a description.",
            createTime: "2022-08-15 10:29",
            descriptionContent: [
              {
                name: "王建国1",
                action: "添加了备注",
                time: "2023-08-15 10:30",
                content: "test",
              },
              {
                name: "王建国2",
                action: "添加了备注",
                time: "2023-08-15 10:31",
                content: "test",
              },
            ],
          },
          {
            title: "自定义DescriptionContentItem渲染样式",
            description: "This is a description.",
            descriptionContent: [
              {
                name: "王建国3",
                action: "添加了备注",
                time: "08-15 10:30",
                content: "test",
              },
              {
                name: "王建国4",
                action: "添加了备注",
                time: "08-15 10:31",
                content: "test",
              },
            ],
          },
          { title: "title3", description: "This is a description." },
          {
            title: "title4",
            description: "This is a description.",
          },
        ]}
        columns={[
          {
            name: "title",
          },
          {
            name: "description",
          },
          {
            type: "subTitle",
            name: "createTime",
            format: "datetime",
          },
          {
            name: "status",
          },
          {
            type: "actionList",
            name: "descriptionContent",
            children: [
              {
                name: "name",
              },
              {
                name: "action",
              },
              {
                type: "options",
                name: "time",
                format: "datetime",
              },
              {
                name: "content",
                render: (item, { target }) => {
                  return `@@@@@${target.name}-${target.action}-${target.content}`;
                },
              },
            ],
          },
        ]}
      />
      <Flow
        direction="horizontal"
        progressDot
        dataSource={[
          {
            title: "finish",
            description: "This is a description.",
            status: "finish",
          },
          {
            title: "process",
            description: "This is a description.",
            status: "process",
          },
          {
            title: "error",
            description: "This is a description.",
            status: "error",
          },
          {
            title: "wait",
            description: "This is a description.",
            status: "wait",
          },
        ]}
      />

      <Flow
        direction="vertical"
        progressDot
        dataSource={[
          {
            title: "finish",
            description: "This is a description.",
            status: "finish",
          },
          {
            title: "process",
            description: "This is a description.",
            status: "process",
          },
          {
            title: "error",
            description: "This is a description.",
            status: "error",
          },
          {
            title: "wait",
            description: "This is a description.",
            status: "wait",
          },
        ]}
      />
      <Flow
        dataSource={[
          {
            title: "finish",
            description: "This is a description.",
            subTitle: "2023-08-15 10:29",
            status: "finish",
          },
          {
            title: "process",
            description: "This is a description.",
            status: "process",
          },
          {
            title: "error",
            description: "This is a description.",
            status: "error",
          },
          {
            title: "wait",
            description: "This is a description.",
            status: "wait",
          },
        ]}
        columns={[{ name: "subTitle", format: "datetime" }]}
      />
    </Flex>
  );
};

render(<BaseExample />);
