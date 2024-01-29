const { AdvancedSelect: _AdvancedSelect } = _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const TableSelect = _AdvancedSelect.Table.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <TableSelect
              defaultValue={[1]}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
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
                              label: `员工${key + 1}`,
                              company: "北京科技有限公司",
                              department: "技术部",
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
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选",
          content: (
            <TableSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        company: "北京科技有限公司",
                        department: "财务部",
                        value: 1,
                      },
                      {
                        label: "用户二",
                        company: "北京科技有限公司",
                        department: "技术部",
                        value: 2,
                      },
                      {
                        label: "用户三",
                        company: "北京科技有限公司",
                        department: "商务部",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "多选modal",
          content: (
            <TableSelect
              defaultValue={[1]}
              isPopup={false}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
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
                              label: `员工${key + 1}`,
                              company: "北京科技有限公司",
                              department: "技术部",
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
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选modal",
          content: (
            <TableSelect
              single
              isPopup={false}
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        company: "北京科技有限公司",
                        department: "财务部",
                        value: 1,
                      },
                      {
                        label: "用户二",
                        company: "北京科技有限公司",
                        department: "技术部",
                        value: 2,
                      },
                      {
                        label: "用户三",
                        company: "北京科技有限公司",
                        department: "商务部",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
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
