const { PureGlobal } = _Global;
const { Button, Typography, Space } = antd;
const { default: Icon } = icon;

const BaseExample = () => {
  return (
    <PureGlobal>
      <Space direction="vertical">
        <Space>
          <Button size="large">大按钮</Button>
          <Button>默认按钮</Button>
          <Button size="small">小按钮</Button>
        </Space>
        <Space>
          <Button type="primary">按钮</Button>
          <Button type="link">按钮</Button>
          <Button type="text">按钮</Button>
        </Space>
        <Space>
          <Button danger>危险按钮</Button>
          <Button type="primary" danger>
            危险按钮
          </Button>
          <Button type="link" danger>
            危险按钮
          </Button>
          <Button type="text" danger>
            危险按钮
          </Button>
        </Space>
        <Space>
          <Button disabled>禁用按钮</Button>
          <Button type="primary" danger disabled>
            禁用危险按钮
          </Button>
          <Button type="link" disabled>
            禁用Link按钮
          </Button>
          <Button type="text" disabled>
            禁用Text按钮
          </Button>
        </Space>
        <Space>
          <Button type="text" icon={<Icon type="icon-tianjia" />}>
            图标按钮
          </Button>
          <Button type="text">
            图标按钮右
            <Icon type="icon-arrow-thin-down" />
          </Button>
        </Space>
        <Space>
          <Button type="primary" icon={<Icon type="icon-tianjia" />} />
          <Button icon={<Icon type="icon-tianjia" />} />
          <Button danger icon={<Icon type="icon-tianjia" />} />
          <Button type="link" icon={<Icon type="icon-tianjia" />} />
          <Button type="text" icon={<Icon type="icon-tianjia" />} />
        </Space>
        <Space>
          <Button type="primary" disabled icon={<Icon type="icon-tianjia" />} />
          <Button disabled icon={<Icon type="icon-tianjia" />} />
          <Button disabled danger icon={<Icon type="icon-tianjia" />} />
          <Button disabled type="link" icon={<Icon type="icon-tianjia" />} />
          <Button disabled type="text" icon={<Icon type="icon-tianjia" />} />
        </Space>
        <Space>
          <Typography.Link>Link文字</Typography.Link>
          <Typography.Text className="ant-btn">文字</Typography.Text>
          <Typography.Link>
            <Icon type="icon-tianjia" />
            Link文字
          </Typography.Link>
          <Typography.Text className="ant-btn">
            <Icon type="icon-tianjia" />
            文字
          </Typography.Text>
          <Typography.Link className="ant-btn-dangerous">
            Link文字
          </Typography.Link>
        </Space>
        <Space>
          <Button className="btn-no-padding" type="link" size="large">
            大按钮
          </Button>
          <Button className="btn-no-padding" type="link">
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="small">
            小按钮
          </Button>
          <Button className="btn-no-padding" type="text" size="large">
            大按钮
          </Button>
          <Button className="btn-no-padding" type="text">
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="text" size="small">
            小按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="large" danger>
            大按钮
          </Button>
          <Button className="btn-no-padding" type="link" danger>
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="small" danger>
            小按钮
          </Button>
        </Space>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);
