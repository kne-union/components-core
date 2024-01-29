const { default: Layout, Page } = layout;
const {
  InputFilterItem,
  CityFilterItem,
  AdvancedSelectFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
  getFilterValue,
} = filter;
const { useState } = React;
const { Space, Button } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const [filter, setFilter] = useState([]);
  return (
    <PureGlobal preset={{}}>
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="base"
          helperGuideName="base-detail"
          titleExtra={
            <Space>
              <Button type="primary">添加</Button>
            </Space>
          }
          filter={{
            extraExpand: (
              <Button type="primary" size="small">
                订阅筛选项
              </Button>
            ),
            value: filter,
            onChange: (value) => {
              setFilter(value);
              console.log(getFilterValue(value));
            },
            list: [
              [
                <InputFilterItem label="文字" name="text" />,
                <CityFilterItem label="城市" name="city" />,
                <AdvancedSelectFilterItem
                  label="高级选择"
                  name="select"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          { label: "第一项", value: 1 },
                          { label: "第二项", value: 2, disabled: true },
                          {
                            label: "第三项",
                            value: 3,
                          },
                        ],
                      };
                    },
                  }}
                />,
                <UserFilterItem
                  label="用户选择"
                  name="user"
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
                />,
                <FunctionSelectFilterItem
                  label="职能选择"
                  name="function"
                  onlyAllowLastLevel
                  single
                />,
                <IndustrySelectFilterItem
                  label="行业选择"
                  name="industry"
                  onlyAllowLastLevel
                />,
              ],
              [
                <UserFilterItem
                  label="职位协助人"
                  name="position_user"
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
                />,
              ],
            ],
          }}
        >
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);
