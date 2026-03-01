const { default: Permissions } = _Permissions;
const { PureGlobal } = global;
const { Space, Button } = antd;

const CustomTagExample = () => {
  return (
    <PureGlobal
      preset={{
        permissions: ["document:view", "document:edit"],
      }}
    >
      <Space direction="vertical">
        <div>
          <h4>默认 span 标签:</h4>
          <Permissions request={["document:view"]} type="tooltip">
            <Button>查看文档</Button>
          </Permissions>
        </div>
        
        <div>
          <h4>自定义 div 标签:</h4>
          <Permissions
            request={["document:delete"]}
            type="tooltip"
            tagName="div"
            className="permission-wrapper"
          >
            <Button danger>删除文档（无权限）</Button>
          </Permissions>
        </div>
        
        <div>
          <h4>自定义 section 标签:</h4>
          <Permissions
            request={["document:edit"]}
            type="tooltip"
            tagName="section"
            className="permission-section"
          >
            <Button type="primary">编辑文档</Button>
          </Permissions>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<CustomTagExample />);
