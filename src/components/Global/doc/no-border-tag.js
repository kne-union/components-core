const { PureGlobal } = _Global;
const { Tag, Space } = antd;

const BasicExample = () => {
  return (
    <PureGlobal>
      <Space>
        <Tag className="no-border" closable>
          标签1
        </Tag>
        <Tag className="no-border" closable>
          标签2
        </Tag>
        <Tag className="no-border" closable>
          标签3
        </Tag>
      </Space>
    </PureGlobal>
  );
};

render(<BasicExample />);
