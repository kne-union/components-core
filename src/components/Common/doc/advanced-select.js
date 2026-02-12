const { UserField } = _Common;
const { Space, Typography } = _antd;

const BaseExample = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text>
        已选择 {value.length} 人
      </Typography.Text>
      <UserField
        value={value}
        onChange={setValue}
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        allowSelectAll
        showSelectedCount
        countUnit="人"
        allLabel="所有人"
        placeholder="选择团队成员"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "张三",
                  value: 1,
                  avatar: "avatar-001",
                  description: "前端工程师",
                },
                {
                  label: "李四",
                  value: 2,
                  avatar: "avatar-002",
                  description: "后端工程师",
                },
                {
                  label: "王五",
                  value: 3,
                  avatar: "avatar-003",
                  description: "产品经理",
                },
                {
                  label: "赵六",
                  value: 4,
                  avatar: "avatar-004",
                  description: "UI设计师",
                },
                {
                  label: "钱七",
                  value: 5,
                  avatar: "avatar-005",
                  description: "测试工程师",
                },
              ],
            };
          },
        }}
      />
    </Space>
  );
};

render(<BaseExample />);
