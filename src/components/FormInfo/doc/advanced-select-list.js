const { AdvancedSelect: _AdvancedSelect, SelectInnerInput } = _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const AdvancedSelect = _AdvancedSelect.Field;

const useSelectInnerContext = SelectInnerInput.useContext;

const AddExtraButton = () => {
  const { appendItems, fetchApi } = useSelectInnerContext();

  return (
    <Button
      type="link"
      onClick={() => {
        const id = uniqueId("new_item_");
        appendItems({
          pageData: [
            {
              label: "添加的新项目_" + id,
              value: id,
            },
            ...fetchApi.data.pageData,
          ],
          totalCount: fetchApi.data.totalCount,
        });
      }}
    >
      添加
    </Button>
  );
};

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <AdvancedSelect
              defaultValue={[1]}
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
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选",
          content: (
            <AdvancedSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: range(0, 100).map((key) => {
                      return {
                        label: `第${key + 1}项`,
                        value: key + 1,
                        disabled: key === 2,
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
            <AdvancedSelect
              defaultValue={[1]}
              isPopup={false}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1 },
                      { label: "第二项", value: 2 },
                      {
                        label: "第三项",
                        value: 3,
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
            <AdvancedSelect
              single
              defaultValue={1}
              isPopup={false}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1 },
                      { label: "第二项", value: 2 },
                      {
                        label: "第三项",
                        value: 3,
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
          label: "描述信息",
          content: (
            <AdvancedSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1, description: "描述信息" },
                      {
                        label: "第二项",
                        value: 2,
                        description: "描述信息",
                      },
                      {
                        label: "第三项",
                        value: 3,
                        description: "描述信息",
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
          label: "分页加载数据",
          content: (
            <AdvancedSelect
              single
              defaultValue={90}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
              displayItems={[{ label: "第九十项", value: 90 }]}
              extra={<AddExtraButton />}
              api={{
                loader: ({ data }) => {
                  const params = Object.assign(
                    {
                      perPage: 20,
                      currentPage: 1,
                    },
                    data
                  );
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      const start = (params.currentPage - 1) * params.perPage;
                      resolve({
                        totalCount: 100,
                        pageData: range(start, start + 20)
                          .map((key) => {
                            return {
                              label: `第${key + 1}项`,
                              value: key + 1,
                            };
                          })
                          .filter(({ label }) => {
                            return params.keyword
                              ? label.indexOf(params.keyword) > -1
                              : true;
                          }),
                      });
                    }, 1000);
                  });
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal分页加载数据",
          content: (
            <AdvancedSelect
              defaultValue={[90]}
              isPopup={false}
              extra={<AddExtraButton />}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
              displayItems={[{ label: "第九十项", value: 90 }]}
              api={{
                data: {
                  perPage: 10,
                },
                loader: ({ data }) => {
                  const params = Object.assign(
                    {
                      perPage: 20,
                      currentPage: 1,
                    },
                    data
                  );
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      const start = (params.currentPage - 1) * params.perPage;
                      resolve({
                        totalCount: 100,
                        pageData: range(start, start + params.perPage)
                          .map((key) => {
                            return {
                              label: `第${key + 1}项`,
                              value: key + 1,
                            };
                          })
                          .filter(({ label }) => {
                            return params.keyword
                              ? label.indexOf(params.keyword) > -1
                              : true;
                          }),
                      });
                    }, 1000);
                  });
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
