const { default: ConfirmButton, ConfirmLink } = _ConfirmButton;
const { Space } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <Space direction={"vertical"}>
      <Space>
        <ConfirmButton
          isDelete={false}
          message="确定要删除吗"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-气泡-正文
        </ConfirmButton>
        <ConfirmButton
          onClick={() => {
            console.log("执行删除");
          }}
        >
          警告-气泡-正文
        </ConfirmButton>
      </Space>
      <Space>
        <ConfirmButton
          title="确定要删除吗？"
          isDelete={false}
          message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-气泡-标题正文
        </ConfirmButton>
        <ConfirmButton
          title="确定要删除吗？"
          message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          警告-气泡-标题正文
        </ConfirmButton>
      </Space>
      <Space>
        <ConfirmButton
          isModal
          isDelete={false}
          message="确定提交XX吗？"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-modal-正文
        </ConfirmButton>
        <ConfirmButton
          isModal
          onClick={() => {
            console.log("执行删除");
          }}
        >
          警告-modal-正文
        </ConfirmButton>
      </Space>
      <Space>
        <ConfirmButton
          isModal
          title="确定提交XX吗？"
          isDelete={false}
          message="这里显示详情说明这里显示详情说明这里显示详情说明这里显示详情说明这里显示详情说明"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          非警告-modal-标题正文
        </ConfirmButton>
        <ConfirmButton
          isModal
          title="确定要删除吗？"
          message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
          onClick={() => {
            console.log("执行删除");
          }}
        >
          有title的Modal确认删除
        </ConfirmButton>
      </Space>
      <ConfirmLink
        onClick={() => {
          console.log("执行删除");
        }}
      >
        Link-警告-气泡-正文
      </ConfirmLink>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
