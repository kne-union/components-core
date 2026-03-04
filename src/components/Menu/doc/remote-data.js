const { default: Menu } = _Menu;
const { Space, Card, Typography } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 远程加载数据的菜单示例
const RemoteDataMenuExample = () => {
  return (
    <Card title="远程加载数据" size="small">
      <Text type="secondary">点击"动态部门"菜单项，会异步加载子菜单数据</Text>
      <Menu
        defaultItems={[
          {
            label: "静态菜单",
            iconType: "icon-jingtai",
            children: [
              {
                label: "子菜单项1",
                path: "/static/item1",
              },
              {
                label: "子菜单项2",
                path: "/static/item2",
              },
            ],
          },
          {
            label: "动态部门",
            iconType: "icon-bumen",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "技术部",
                        path: "/dept/tech",
                      },
                      {
                        label: "产品部",
                        path: "/dept/product",
                      },
                      {
                        label: "市场部",
                        path: "/dept/marketing",
                      },
                      {
                        label: "人力资源部",
                        path: "/dept/hr",
                      },
                    ]);
                  }, 1000);
                });
              },
            },
          },
          {
            label: "动态项目",
            iconType: "icon-xiangmu",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "进行中项目",
                        children: [
                          {
                            label: "网站改版",
                            path: "/projects/website",
                          },
                          {
                            label: "APP开发",
                            path: "/projects/app",
                          },
                        ],
                      },
                      {
                        label: "已完成项目",
                        path: "/projects/completed",
                      },
                    ]);
                  }, 1500);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

// 嵌套远程加载的菜单示例
const NestedRemoteMenuExample = () => {
  return (
    <Card title="嵌套远程加载" size="small">
      <Text type="secondary">多级菜单可以嵌套远程加载，点击后逐级加载数据</Text>
      <Menu
        defaultItems={[
          {
            label: "数据中心",
            iconType: "icon-shujuzhongxin",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "数据报表",
                        fetchOptions: {
                          loader: () => {
                            return new Promise((resolve) => {
                              setTimeout(() => {
                                resolve([
                                  {
                                    label: "日报表",
                                    path: "/data/daily",
                                  },
                                  {
                                    label: "周报表",
                                    path: "/data/weekly",
                                  },
                                  {
                                    label: "月报表",
                                    path: "/data/monthly",
                                  },
                                ]);
                              }, 800);
                            });
                          },
                        },
                      },
                      {
                        label: "数据源管理",
                        path: "/data/sources",
                      },
                    ]);
                  }, 1000);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

// 自定义加载内容示例
const CustomLoadingMenuExample = () => {
  return (
    <Card title="自定义加载状态" size="small">
      <Text type="secondary">可以通过fetchOptions配置自定义加载状态</Text>
      <Menu
        defaultItems={[
          {
            label: "快速操作",
            iconType: "icon-kuaisucaozuo",
            children: [
              {
                label: "新建文档",
                path: "/quick/new-doc",
              },
              {
                label: "上传文件",
                path: "/quick/upload",
              },
            ],
          },
          {
            label: "云存储",
            iconType: "icon-yuncunchu",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "我的文档",
                        path: "/cloud/docs",
                      },
                      {
                        label: "共享文档",
                        path: "/cloud/shared",
                      },
                      {
                        label: "回收站",
                        path: "/cloud/trash",
                      },
                    ]);
                  }, 2000);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

const RemoteDataExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <RemoteDataMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <NestedRemoteMenuExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <CustomLoadingMenuExample />
      </div>
    </Space>
  );
};

render(<RemoteDataExample />);