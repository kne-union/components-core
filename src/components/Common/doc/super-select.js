const { SuperSelectField, SuperSelectTableListField, SuperSelectUserField } = _Common;
const { Space, Typography } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [userValue, setUserValue] = useState([]);
  const [deptValue, setDeptValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>用户选择</Typography.Text>
      <SuperSelectUserField
        value={userValue}
        onChange={setUserValue}
        allowSelectedAll
        placeholder="选择用户"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "张三",
                  value: 1,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang" },
                  description: "高级前端工程师",
                },
                {
                  label: "李四",
                  value: 2,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=li" },
                  description: "资深后端工程师",
                },
                {
                  label: "王五",
                  value: 3,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang" },
                  description: "产品经理",
                },
                {
                  label: "赵六",
                  value: 4,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao" },
                  description: "UI设计师",
                },
                {
                  label: "钱七",
                  value: 5,
                  avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=qian" },
                  description: "测试工程师",
                },
              ],
            };
          },
        }}
      />

      <Typography.Text strong>部门选择</Typography.Text>
      <SuperSelectField
        isPopup={false}
        value={deptValue}
        onChange={setDeptValue}
        allowSelectedAll
        placeholder="选择部门"
        api={{
          loader: () => {
            return {
              pageData: [
                {
                  label: "技术部",
                  value: "tech",
                  description: "负责产品技术实现",
                },
                {
                  label: "产品部",
                  value: "product",
                  description: "负责产品规划和设计",
                },
                {
                  label: "设计部",
                  value: "design",
                  description: "负责 UI/UX 设计",
                },
                {
                  label: "市场部",
                  value: "marketing",
                  description: "负责市场推广和运营",
                },
              ],
            };
          },
        }}
      />

      <Typography.Text strong>项目列表选择</Typography.Text>
      <SuperSelectTableListField
        isPopup={false}
        labelKey="name"
        valueKey="id"
        placeholder="选择项目"
        getSearchCallback={(searchProps, item, contextProps) => {
          const { props } = contextProps;
          const { labelKey } = props;
          if (!searchProps.searchText) {
            return true;
          }
          return item[labelKey].indexOf(searchProps.searchText) > -1;
        }}
        options={[
          { id: 1, name: "电商平台", count: 15, description: "在线购物平台", disabled: false },
          { id: 2, name: "OA系统", count: 8, description: "办公自动化系统", disabled: true },
          { id: 3, name: "CRM系统", count: 10, description: "客户关系管理", disabled: false },
          { id: 4, name: "数据大屏", count: 5, description: "数据可视化展示", disabled: false },
          { id: 5, name: "移动APP", count: 12, description: "移动端应用", disabled: false },
          { id: 6, name: "小程序", count: 6, description: "微信小程序", disabled: false },
        ]}
        columns={[
          {
            name: "name",
            title: "项目名称",
            span: 8,
          },
          {
            name: "count",
            title: "团队人数",
            span: 8,
          },
          {
            name: "description",
            title: "项目描述",
            span: 8,
          },
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);
