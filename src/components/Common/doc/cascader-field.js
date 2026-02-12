const { CascaderField } = _Common;
const { Space, Typography, Button } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>省市区级联选择（最多3个）</Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        已选择: {value.length} 个区域
      </Typography.Text>
      <CascaderField
        api={{
          loader: () => {
            return [
              {
                id: 'zhejiang',
                label: '浙江省',
                children: [
                  {
                    id: 'hangzhou',
                    label: '杭州市',
                    children: [
                      { id: 'xihu', label: '西湖区' },
                      { id: 'gongshu', label: '拱墅区' },
                      { id: 'jianggan', label: '江干区' },
                      { id: 'binjiang', label: '滨江区' },
                    ],
                  },
                  {
                    id: 'ningbo',
                    label: '宁波市',
                    children: [
                      { id: 'haishu', label: '海曙区' },
                      { id: 'jiangbei', label: '江北区' },
                      { id: 'yinzhou', label: '鄞州区' },
                    ],
                  },
                ],
              },
              {
                id: 'jiangsu',
                label: '江苏省',
                children: [
                  {
                    id: 'nanjing',
                    label: '南京市',
                    children: [
                      { id: 'xuanwu', label: '玄武区' },
                      { id: 'jianye', label: '建邺区' },
                      { id: 'gulou', label: '鼓楼区' },
                    ],
                  },
                  {
                    id: 'suzhou',
                    label: '苏州市',
                    children: [
                      { id: 'gusu', label: '姑苏区' },
                      { id: 'wuzhong', label: '吴中区' },
                    ],
                  },
                ],
              },
              {
                id: 'guangdong',
                label: '广东省',
                children: [
                  {
                    id: 'guangzhou',
                    label: '广州市',
                    children: [
                      { id: 'yuexiu', label: '越秀区' },
                      { id: 'tianhe', label: '天河区' },
                      { id: 'baiyun', label: '白云区' },
                    ],
                  },
                  {
                    id: 'shenzhen',
                    label: '深圳市',
                    children: [
                      { id: 'futian', label: '福田区' },
                      { id: 'nanshan', label: '南山区' },
                      { id: 'baoan', label: '宝安区' },
                    ],
                  },
                ],
              },
            ];
          },
        }}
        value={value}
        onChange={setValue}
        placeholder="请选择省市区"
        maxLength={3}
        isPopup={true}
      />
      <Button onClick={() => setValue([])}>清空选择</Button>
    </Space>
  );
};

render(<BaseExample />);
