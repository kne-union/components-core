const { UserField } = _Common;
const { Space } = antd;

const BaseExample = () => {
  return (
    <Space>
      <UserField
        defaultValue={[1]}
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        allowSelectAll
        showSelectedCount
        countUnit="人"
        allLabel="所有人"
        showSelectedTag={false}
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "用户一",
                  value: 1,
                  description: "我是用户描述",
                },
                {
                  label: "用户二",
                  value: 2,
                  description: "我是用户描述",
                },
                {
                  label: "用户三",
                  value: 3,
                  description: "我是用户描述",
                },
              ],
            };
          },
        }}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </Space>
  );
};

render(<BaseExample />);
