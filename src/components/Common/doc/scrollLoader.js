const { get, merge, range } = lodash;
const { ScrollLoader } = _Common;
const { default: Fetch } = _reactFetch;
const { Card, List, Avatar, Typography, Space, Tag } = _antd;

const BaseExample = () => {
  const mockUsers = [
    { name: "张三", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang", role: "产品经理" },
    { name: "李四", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=li", role: "UI设计师" },
    { name: "王五", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang", role: "前端开发" },
    { name: "赵六", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao", role: "后端开发" },
    { name: "孙七", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sun", role: "测试工程师" },
    { name: "周八", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhou", role: "运维工程师" },
  ];

  const mockComments = [
    "这个功能很实用，期待上线！",
    "界面设计简洁美观，用户体验不错。",
    "建议增加批量操作功能。",
    "加载速度很快，性能很好。",
    "文档清晰，上手容易。",
  ];

  return (
    <Card title="团队评论列表" style={{ maxWidth: 600 }}>
      <Fetch
        loader={({ data }) => {
          const params = Object.assign(
            {
              perPage: 10,
              currentPage: 1,
            },
            data
          );
          return new Promise((resolve) => {
            const start = (params.currentPage - 1) * params.perPage;
            setTimeout(() => {
              resolve({
                totalCount: 50,
                pageData: range(start, start + params.perPage).map((key) => {
                  const user = mockUsers[key % mockUsers.length];
                  const comment = mockComments[key % mockComments.length];
                  const hours = Math.floor(key / 3);
                  return {
                    id: key + 1,
                    user: user.name,
                    avatar: user.avatar,
                    role: user.role,
                    content: comment,
                    time: `${hours}小时前`,
                    likes: Math.floor(Math.random() * 50) + 1,
                  };
                }),
              });
            }, 500);
          });
        }}
        render={(fetchApi) => {
          const pagination = {
            paramsType: "data",
            current: "currentPage",
            pageSize: "perPage",
            defaultPageSize: 10,
          };
          const current = get(
              fetchApi.requestParams,
              [pagination.paramsType, pagination.current],
              1
            ),
            pageSize =
              get(fetchApi.requestParams, [
                pagination.paramsType,
                pagination.pageSize,
              ]) || pagination.defaultPageSize;

          const formatData = {
            list: fetchApi.data.pageData || [],
            total: fetchApi.data.totalCount || 0,
          };
          return (
            <ScrollLoader
              completeTips=""
              className="scroll-list"
              isLoading={!fetchApi.isComplete}
              noMore={!formatData.total || current * pageSize >= formatData.total}
              onLoader={async () => {
                await fetchApi.loadMore(
                  merge({
                    data: {
                      [pagination.pageSize]: pageSize,
                      [pagination.current]: current + 1,
                    },
                  }),
                  (data, newData) => {
                    return Object.assign({}, newData, {
                      pageData: data.pageData.concat(newData.pageData),
                    });
                  }
                );
              }}
            >
              <List
                dataSource={formatData.list}
                renderItem={(item) => (
                  <List.Item style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={
                        <Space>
                          <Typography.Text strong>{item.user}</Typography.Text>
                          <Tag color="blue" style={{ fontSize: 12 }}>{item.role}</Tag>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Typography.Text>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={4}>
                          <Typography.Text>{item.content}</Typography.Text>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                            👍 {item.likes} 人赞同
                          </Typography.Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </ScrollLoader>
          );
        }}
      />
    </Card>
  );
};

render(<BaseExample />);
