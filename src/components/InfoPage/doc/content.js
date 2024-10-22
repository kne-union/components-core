const { Content } = _InfoPage;
const { Space, Radio } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 1,
    size: "default",
    labelAlign: "left",
  });
  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps((prevState) => Object.assign({}, prevState, { [name]: val }));
  };

  return (
    <Space direction="vertical" size={12}>
      <Radio.Group onChange={(e) => onChange(e, "col")} value={listProps.col}>
        <Radio.Button value={1}>1列</Radio.Button>
        <Radio.Button value={2}>2列</Radio.Button>
        <Radio.Button value={3}>3列</Radio.Button>
      </Radio.Group>
      <Radio.Group
        onChange={(e) => onChange(e, "labelAlign")}
        value={listProps.labelAlign}
      >
        <Radio.Button value="left">左对齐</Radio.Button>
        <Radio.Button value="center">中心对齐</Radio.Button>
        <Radio.Button value="right">右对齐</Radio.Button>
        <Radio.Button value="auto">自适应</Radio.Button>
      </Radio.Group>
      <Radio.Group onChange={(e) => onChange(e, "size")} value={listProps.size}>
        <Radio.Button value="default">默认</Radio.Button>
        <Radio.Button value="small">small</Radio.Button>
      </Radio.Group>
      <Content
        {...listProps}
        list={[
          { label: "标题", content: "内容" },
          { label: "标题标题", content: "内容内容" },
          {
            label: "标题标",
            content: "内容内容内容内容内容内容内容内容内容内容",
          },
          {
            label: "标题标题标题",
            content:
              "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
          },
        ]}
        itemRender={(inner, other) => {
          return other?.index === 2 ? "此处内容额外自定义" : inner;
        }}
      />
    </Space>
  );
};

render(<BaseExample />);
