const { default: ConfirmButton, ConfirmLink } = _ConfirmButton;
const { Space } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <Space>
      <ConfirmButton
        onClick={() => {
          console.log("执行删除");
        }}
      >
        删除
      </ConfirmButton>
      <ConfirmButton
        isModal
        onClick={() => {
          console.log("执行删除");
        }}
      >
        Modal确认删除
      </ConfirmButton>
      <ConfirmLink
        onClick={() => {
          console.log("执行删除");
        }}
      >
        Link删除
      </ConfirmLink>
      <ConfirmButton
        title="确定要删除吗？"
        message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
        onClick={() => {
          console.log("执行删除");
        }}
      >
        有title的删除
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

      <ConfirmButton
        title="确定要删除吗？"
        isDelete={false}
        message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
        onClick={() => {
          console.log("执行删除");
        }}
      >
        非警告有title的删除
      </ConfirmButton>
      <ConfirmButton
        isModal
        title="确定要删除吗？"
        isDelete={false}
        message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
        onClick={() => {
          console.log("执行删除");
        }}
      >
        非警告有title的Modal确认删除
      </ConfirmButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
