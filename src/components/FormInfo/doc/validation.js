const { default: FormInfo, Form, SubmitButton, ErrorTip, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Alert } = antd;

const { Input, Password } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      rules={{
        USERNAME: (value) => {
          // 自定义规则：用户名必须是字母开头，4-16位
          const pattern = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
          return {
            result: pattern.test(value),
            errMsg: "用户名必须以字母开头，4-16位字母或数字",
          };
        },
        PASSWORD_STRENGTH: (value) => {
          // 自定义规则：密码强度校验
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecial = /[!@#$%^&*]/.test(value);
          if (!hasLetter || !hasNumber || !hasSpecial) {
            return {
              result: false,
              errMsg: "密码必须包含字母、数字和特殊字符",
            };
          }
          return { result: true, errMsg: "" };
        },
        USERNAME_EXISTS: (value) => {
          // 异步校验：检查用户名是否已存在
          return new Promise((resolve) => {
            setTimeout(() => {
              const exists = ["admin", "wangming", "zhangwei"].includes(value);
              resolve({
                result: !exists,
                errMsg: exists ? "该用户名已被占用" : "",
              });
            }, 500);
          });
        },
      }}
      onSubmit={(data) => {
        modal({
          title: "管理员账号创建成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <Alert
          message="账号注册规范"
          description="REQ-必填 | LEN-最小-最大 | EMAIL-邮箱 | PHONE-手机号 | URL-网址 | USERNAME-自定义规则"
          type="info"
        />

        <FormInfo
          title="管理员账号信息"
          list={[
            <ErrorTip name="username">
              <Input
                name="username"
                label="用户名"
                rule="REQ LEN-4-16 USERNAME USERNAME_EXISTS"
                tips="4-16位字母或数字，以字母开头（admin、wangming、zhangwei已被占用）"
              />
            </ErrorTip>,
            <Password
              name="password"
              label="登录密码"
              rule="REQ LEN-8-20 PASSWORD_STRENGTH"
              tips="至少8位，包含字母、数字和特殊字符"
            />,
            <Password
              name="confirmPassword"
              label="确认密码"
              rule="REQ"
              tips="请再次输入密码"
            />,
            <Input name="email" label="工作邮箱" rule="REQ EMAIL" />,
            <Input name="phone" label="联系电话" rule="REQ PHONE" />,
          ]}
        />
        <SubmitButton type="primary">创建管理员账号</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);
