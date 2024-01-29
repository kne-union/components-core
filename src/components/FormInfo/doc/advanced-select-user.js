const { AdvancedSelect: _AdvancedSelect } = _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const UserSelect = _AdvancedSelect.User.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <UserSelect
              defaultValue={[1]}
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
          ),
        },
        {
          label: "单选",
          content: (
            <UserSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: range(0, 30).map((key) => {
                      return {
                        label: `用户${key + 1}`,
                        description: "我是用户描述",
                        value: key + 1,
                      };
                    }),
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "多选modal",
          content: (
            <UserSelect
              defaultValue={[1]}
              isPopup={false}
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
          ),
        },
        {
          label: "单选modal",
          content: (
            <UserSelect
              single
              defaultValue={1}
              isPopup={false}
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
          ),
        },
      ]}
    />
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);
