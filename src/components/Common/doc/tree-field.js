const { TreeField } = _Common;
const { Space, Typography, Button } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>组织架构选择（多选）</Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        已选择: {value.length} 个部门
      </Typography.Text>
      <TreeField
        api={{
          loader: () => {
            return [
              {
                key: 'tech',
                title: '技术部',
                children: [
                  {
                    key: 'frontend',
                    title: '前端组',
                    children: [
                      { key: 'fe-web', title: 'Web前端' },
                      { key: 'fe-mobile', title: '移动端' },
                    ],
                  },
                  {
                    key: 'backend',
                    title: '后端组',
                    children: [
                      { key: 'be-java', title: 'Java后端' },
                      { key: 'be-node', title: 'Node.js后端' },
                    ],
                  },
                ],
              },
              {
                key: 'product',
                title: '产品部',
                children: [
                  { key: 'pm-web', title: 'Web产品' },
                  { key: 'pm-mobile', title: '移动产品' },
                ],
              },
              {
                key: 'design',
                title: '设计部',
                children: [
                  { key: 'ui', title: 'UI设计' },
                  { key: 'ux', title: 'UX设计' },
                ],
              },
              {
                key: 'marketing',
                title: '市场部',
                children: [
                  { key: 'market', title: '市场推广' },
                  { key: 'operation', title: '运营' },
                ],
              },
            ];
          },
        }}
        value={value}
        onChange={setValue}
        placeholder="请选择部门"
        single={false}
      />
      <Button onClick={() => setValue([])}>清空选择</Button>
    </Space>
  );
};

render(<BaseExample />);
