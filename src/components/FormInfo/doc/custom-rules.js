const { default: FormInfo, Form, SubmitButton, ErrorTip, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Alert } = antd;

const { Input, Password, Select } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      rules={{
        // 自定义规则：密码强度校验
        PASSWORD_STRENGTH: (value) => {
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
        // 自定义规则：异步校验用户名
        USERNAME_EXISTS: (value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const exists = ["wangming", "lihua", "zhangwei"].includes(value);
              resolve({
                result: !exists,
                errMsg: exists ? "该用户名已被占用" : "",
              });
            }, 800);
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
          message="自定义校验规则说明"
          description="PASSWORD_STRENGTH-密码强度校验（必须包含字母、数字和特殊字符）| USERNAME_EXISTS-异步校验用户名是否已存在"
          type="info"
        />

        <FormInfo
          title="管理员账号配置"
          list={[
            <ErrorTip name="username">
              <Input
                name="username"
                label="管理员用户名"
                rule="REQ LEN-4-16 USERNAME_EXISTS"
                tips="4-16位，wangming、lihua、zhangwei已被占用"
              />
            </ErrorTip>,
            <Password
              name="password"
              label="设置密码"
              rule="REQ LEN-8-20 PASSWORD_STRENGTH"
              tips="至少8位，包含字母、数字和特殊字符"
            />,
            <Password
              name="confirmPassword"
              label="确认密码"
              rule="REQ"
              tips="请再次输入密码"
            />,
            <Select
              name="adminRole"
              label="管理权限级别"
              rule="REQ"
              options={[
                { label: "系统管理员", value: "superadmin" },
                { label: "部门管理员", value: "department" },
                { label: "内容管理员", value: "content" },
              ]}
            />,
          ]}
        />

        <SubmitButton type="primary">创建管理员账号</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);
