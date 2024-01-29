const { List } = _FileList;
const { Space } = antd;
const { PureGlobal } = global;

const BaseExample = () => {
  return (
    <Space direction="vertical">
      <List
        dataSource={[
          {
            uuid: "121233",
            type: "uploading",
            filename: "张三的简历.doc",
          },
          {
            id: "xxxxx",
            filename: "我是一份简历.pdf",
            date: "2022-07-15T11:09:15.000+08:00",
            userName: "用户名",
          },
        ]}
      />
      <List dataSource={[]} />
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      apis: {
        oss: {
          loader: async ({ params }) => {
            console.log(params);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(window.PUBLIC_URL + "/mock/demo.pdf");
              }, 1000);
            });
          },
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);
