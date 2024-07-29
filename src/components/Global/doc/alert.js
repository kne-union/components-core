const { PureGlobal } = _Global;
const { Alert, Space } = antd;
const { default: Icon } = icon;

const BasicExample = () => {
  return (
    <PureGlobal>
      <Space direction="vertical">
        <Alert message="这是一条操作成功的状态反馈" type="success" showIcon />
        <Alert message="这是一条普通的信息说明" type="info" showIcon />
        <Alert message="这是一条提示信息" type="warning" showIcon />
        <Alert message="这是一条请求失败的状态反馈" type="error" showIcon />
        <Alert
          message="这是一条警示信息"
          type="error"
          showIcon
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />

        <Alert
          message="这是一条操作成功的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="success"
          showIcon
        />
        <Alert
          message="这是一条普通的信息说明"
          description="提示提示提示提示提示提示提示提示提示"
          type="info"
          showIcon
        />
        <Alert
          message="这是一条提示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="warning"
          showIcon
        />
        <Alert
          message="这是一条请求失败的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
        />
        <Alert
          message="这是一条警示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />

        <Alert
          message="这是一条操作成功的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="success"
          showIcon
          closable
        />
        <Alert
          message="这是一条普通的信息说明"
          description="提示提示提示提示提示提示提示提示提示"
          type="info"
          showIcon
          closable
        />
        <Alert
          message="这是一条提示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="warning"
          showIcon
          closable
        />
        <Alert
          message="这是一条请求失败的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          closable
        />
        <Alert
          message="这是一条警示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          closable
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />
      </Space>
    </PureGlobal>
  );
};

render(<BasicExample />);
