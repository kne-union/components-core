const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "hr-system",
            type: "system",
            name: "人力资源管理系统",
            children: [
              {
                id: "employee",
                type: "module",
                name: "员工管理",
                children: [
                  {
                    id: "import",
                    type: "feature",
                    name: "批量导入",
                    dependencies: ["hr-system:employee:edit"],
                  },
                  {
                    id: "export",
                    type: "feature",
                    name: "数据导出",
                  },
                ],
              },
              {
                id: "attendance",
                type: "module",
                name: "考勤管理",
                children: [
                  {
                    id: "check-in",
                    type: "feature",
                    name: "签到打卡",
                  },
                ],
              },
              {
                id: "edit",
                type: "module",
                name: "编辑模块",
              },
            ],
          },
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <PermissionsPage name="employee" openFeatures>
          <Features id="import">
            <div>
              <h3>批量导入员工数据</h3>
              <p>支持 Excel 文件批量导入，一次性添加多名员工</p>
            </div>
          </Features>
          <Features id="export">
            <div>
              <h3>导出员工数据</h3>
              <p>导出员工列表到 Excel，支持自定义筛选条件</p>
            </div>
          </Features>
          <Features id="analytics">
            <div>
              <h3>数据分析</h3>
              <p>统计分析员工数据，生成可视化报表</p>
            </div>
          </Features>
        </PermissionsPage>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);
