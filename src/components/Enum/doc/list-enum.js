const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Select, Radio, Checkbox, Table } = antd;

const ListEnumExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          department: [
            { value: "tech", description: "技术部" },
            { value: "product", description: "产品部" },
            { value: "design", description: "设计部" },
            { value: "marketing", description: "市场部" },
            { value: "hr", description: "人力资源部" },
            { value: "finance", description: "财务部" },
          ],
          role: [
            { value: "admin", description: "管理员", level: 1 },
            { value: "manager", description: "经理", level: 2 },
            { value: "employee", description: "员工", level: 3 },
            { value: "intern", description: "实习生", level: 4 },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>渲染为 Select 下拉框</h4>
          <Enum moduleName="department">
            {(list) => (
              <Select
                style={{ width: 200 }}
                placeholder="请选择部门"
                options={list.map((item) => ({
                  value: item.value,
                  label: item.description,
                }))}
              />
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Radio 单选组</h4>
          <Enum moduleName="role">
            {(list) => (
              <Radio.Group>
                {list.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.description}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Checkbox 多选组</h4>
          <Enum moduleName="department">
            {(list) => (
              <Checkbox.Group>
                {list.slice(0, 4).map((item) => (
                  <Checkbox key={item.value} value={item.value}>
                    {item.description}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Table 表格</h4>
          <Enum moduleName="role" format="origin">
            {(list) => (
              <Table
                size="small"
                pagination={false}
                columns={[
                  { title: "编码", dataIndex: "value", key: "value" },
                  { title: "名称", dataIndex: "description", key: "description" },
                  { title: "级别", dataIndex: "level", key: "level" },
                ]}
                dataSource={list.map(item => ({ ...item, key: item.value }))}
              />
            )}
          </Enum>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<ListEnumExample />);
