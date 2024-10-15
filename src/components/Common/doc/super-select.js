const { SuperSelectField } = _Common;
const { Space } = antd;

const BaseExample = () => {
  return (
    <Space>
      <SuperSelectField
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        allowSelectedAll
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
      <SuperSelectField
        isPopup={false}
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        allowSelectedAll
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
