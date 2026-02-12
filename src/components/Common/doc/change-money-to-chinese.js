const { changeMoneyToChinese } = _Common;
const { Space, Typography, Input, Button, Card } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [amount, setAmount] = useState('');
  const chineseAmount = changeMoneyToChinese(amount);

  return (
    <Space direction="vertical" style={{ width: '400px' }}>
      <Typography.Text strong style={{ fontSize: 16 }}>
        金额转大写中文
      </Typography.Text>
      <Input
        placeholder="请输入金额"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        prefix="¥"
        size="large"
        addonAfter="元"
      />
      <Card size="small" style={{ marginTop: 8 }}>
        <Typography.Text strong style={{ fontSize: 14 }}>
          大写金额：
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginLeft: 8,
            color: '#1890ff'
          }}
        >
          {chineseAmount || '等待输入...'}
        </Typography.Text>
      </Card>
      <Space wrap>
        <Button onClick={() => setAmount('123456.78')}>
          常用金额：123,456.78
        </Button>
        <Button onClick={() => setAmount('10000')}>
          整数：10,000
        </Button>
        <Button onClick={() => setAmount('0')}>
          零值：0
        </Button>
        <Button onClick={() => setAmount('')}>
          清空
        </Button>
      </Space>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        * 最大支持金额：999,999,999,999,999.999999
      </Typography.Text>
    </Space>
  );
};

render(<BaseExample />);
