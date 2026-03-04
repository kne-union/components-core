const { default: Modal, useConfirmModal } = _Modal;
const { useState } = React;
const { Button, Space, message } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const confirmModal = useConfirmModal();
  return (
    <Space wrap>
      <Button
        onClick={() => {
          confirmModal({
            danger: true,
            type: "confirm",
            title: "确定要删除该记录吗？",
            message:
              "此操作将永久删除该记录，相关数据将无法恢复。请确认是否继续删除操作？",
          });
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "confirm",
            confirmType: "warning",
            title: "确定要编辑此内容吗？",
            message:
              "编辑后需要重新提交审核，未保存的修改将丢失。请确认是否继续编辑？",
          });
        }}
      >
        confirm 警告
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            title: "操作提示",
            message:
              "该操作将更新系统配置，可能影响其他用户的使用。建议在非工作时间进行此操作。",
          });
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            message:
              "数据已保存成功，系统将在后台进行同步处理，请稍候查看处理结果。",
          });
        }}
      >
        info无标题
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "success",
            title: "操作成功",
            message:
              "恭喜！您的操作已成功完成。系统已发送通知邮件给相关团队成员。",
          });
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "warning",
            title: "操作警告",
            message:
              "检测到数据异常，继续操作可能导致数据不一致。建议先备份数据或联系技术支持。",
          });
        }}
      >
        warning
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "error",
            title: "操作失败",
            message:
              "系统处理出错，请检查网络连接或联系系统管理员。错误代码：ERR-500",
          });
        }}
      >
        error
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
