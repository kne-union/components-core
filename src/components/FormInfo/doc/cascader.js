const { Cascader: _Cascader } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const Cascader = _Cascader.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "一次性获取数据",
          content: (
            <Cascader
              onlyAllowLastLevel
              single
              api={{
                loader: async () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          id: "client",
                          value: "client",
                          type: "module",
                          name: "客户",
                          label: "客户",
                          children: [
                            {
                              id: "client-list",
                              value: "client-list",
                              type: "feature",
                              name: "客户列表页",
                              label: "客户列表页",
                            },
                            {
                              id: "client-detail",
                              value: "client-detail",
                              type: "module",
                              name: "客户详情页",
                              label: "客户详情页",
                              children: [
                                {
                                  id: "contract",
                                  value: "contract",
                                  type: "module",
                                  name: "合同信息",
                                  label: "合同信息",
                                },
                              ],
                            },
                            {
                              id: "client-form",
                              value: "client-form",
                              type: "feature",
                              name: "客户表单",
                              label: "客户表单",
                              children: [
                                {
                                  id: "taxpayerIdNumber",
                                  value: "taxpayerIdNumber",
                                  type: "feature",
                                  name: "税号",
                                  label: "税号",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "position",
                          value: "position",
                          type: "module",
                          name: "职位",
                          label: "职位",
                          children: [
                            {
                              id: "position-list",
                              value: "position-list",
                              type: "feature",
                              name: "职位列表页",
                              label: "职位列表页",
                            },
                            {
                              id: "position-detail",
                              value: "position-detail",
                              type: "module",
                              name: "职位详情页",
                              label: "职位详情页",
                            },
                            {
                              id: "position-form",
                              value: "position-form",
                              type: "feature",
                              name: "职位表单",
                              label: "职位表单",
                              children: [
                                {
                                  id: "industry",
                                  value: "industry",
                                  type: "feature",
                                  name: "行业",
                                  label: "行业",
                                },
                              ],
                            },
                          ],
                        },
                      ]);
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
          label: "分层加载数据",
          content: (
            <Cascader
              openLoadData
              onSearch={async (searchText) => {
                return range(0, 20).map((key) => {
                  const parentId = "2";
                  return {
                    id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                    label: `节点-${searchText}-${
                      parentId ? `${parentId}-` : ""
                    }${key + 1}`,
                    parentId,
                  };
                });
              }}
              api={{
                loader: async ({ data }) => {
                  const parentId = get(data, "id", "");
                  const level = parentId.split("-").length;
                  console.log("loadData", parentId, level);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(
                        range(0, 20).map((key) => {
                          return Object.assign(
                            {
                              id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                              label: `节点-${parentId ? `${parentId}-` : ""}${
                                key + 1
                              }`,
                              parentId,
                            },
                            level >= 3 ? { children: null } : {}
                          );
                        })
                      );
                    }, 1000);
                  });
                },
              }}
            />
          ),
        },
        {
          label: "modal分层加载数据",
          content: (
            <Cascader
              openLoadData
              isPopup={false}
              api={{
                loader: async ({ data }) => {
                  const parentId = get(data, "id", "");
                  const level = parentId.split("-").length;
                  console.log("loadData", parentId, level);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(
                        range(0, 20).map((key) => {
                          return Object.assign(
                            {
                              id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                              label: `节点-${parentId ? `${parentId}-` : ""}${
                                key + 1
                              }`,
                              parentId,
                            },
                            level >= 3 ? { children: null } : {}
                          );
                        })
                      );
                    }, 1000);
                  });
                },
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
