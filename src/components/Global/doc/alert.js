const { PureGlobal } = _Global;
const { Alert, Space } = antd;

const BasicExample = () => {
  return (
      <PureGlobal>
          <Space direction="vertical">
              <Alert message="提示提示提示提示提示提示提示提示提示" type="success" showIcon />
              <Alert message="提示提示提示提示提示提示提示提示提示" type="info" showIcon />
              <Alert message="提示提示提示提示提示提示提示提示提示" type="warning" showIcon />
              <Alert message="提示提示提示提示提示提示提示提示提示" type="error" showIcon />

              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="success" showIcon />
              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="info" showIcon />
              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="warning" showIcon />
              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="error" showIcon />

              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="success" showIcon closable />
              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="info" showIcon closable />
              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="warning" showIcon closable />
              <Alert message="标题标题标题标题" description="提示提示提示提示提示提示提示提示提示" type="error" showIcon closable />
          </Space>
      </PureGlobal>
  );
};

render(<BasicExample />);
