const { SuperSelectField, SuperSelectTableListField } = _Common;
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
      <SuperSelectTableListField
        isPopup={false}
        labelKey="name"
        valueKey="id"
        getSearchCallback={(searchProps, item, contextProps) => {
          const { props } = contextProps;
          const { labelKey } = props;
          if (!searchProps.searchText) {
            return true;
          }
          return item[labelKey].indexOf(searchProps.searchText) > -1;
        }}
        options={Array.from({ length: 20 }).map((item, key) => {
          return {
            id: key + 1,
            name: `名称${key + 1}`,
            count: key + 1,
            description: `描述${key + 1}`,
            disabled: key === 1,
          };
        })}
        columns={[
          {
            name: "name",
            title: "名称",
            span: 8,
          },
          {
            name: "count",
            title: "数量",
            span: 8,
          },
          {
            name: "description",
            title: "描述",
            span: 8,
          },
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);
