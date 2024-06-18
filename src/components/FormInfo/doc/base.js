const { default: FormInfo, Form, SubmitButton, ErrorTip, fields } = _FormInfo;
const { PureGlobal } = global;
const { useModal } = _Modal;
const { uniqueId } = lodash;

const {
  Input,
  TextArea,
  Upload,
  Avatar,
  TypeDateRangePicker,
  Rate,
  Switch,
  Slider,
  MoneyInput,
} = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      helperGuideName="test-from"
      lang={[
        "cn",
        {
          name: "EnUS",
          label: "英文",
          options: {
            //labelTransform: (label) => label + "(en)",
            ignore: [{ name: "avatar" }, { name: "photo" }],
            disabled: [{ name: "file" }], //fields:[{name:'name'}]
          },
        },
      ]}
      rules={{
        REP: (value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                result: false,
                errMsg: "%s重复",
                data: {
                  user: "我是一个重复的东西",
                },
              });
            }, 1000);
          });
        },
      }}
      onSubmit={(data) => {
        modal({
          title: "表单提交数据",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <FormInfo
        title="基本信息"
        list={[
          <Avatar name="avatar" label="头像" labelHidden block />,
          <Avatar
            name="photo"
            label="证件照"
            dropModalSize="default"
            border={50}
            width={960}
            height={540}
            block
          />,
          <ErrorTip
            name="name"
            errorRender={({ validateData }) => {
              console.log(validateData);
              if (!validateData.REP) {
                return null;
              }
              return <div>哈哈哈{validateData.REP.user}</div>;
            }}
          >
            <Input
              name="name"
              label="姓名"
              rule="REQ LEN-3-10 REP"
              tips="姓名"
            />
          </ErrorTip>,
          <MoneyInput name="money" label="金额" rule="REQ" tips={"money"} />,
          <Input name="phone" label="手机" rule="REQ TEL" />,
          <Input name="email" label="邮箱" rule="EMAIL" />,
          <Upload name="file" label="文件" tips="文件" block />,
          <Rate name="rate" label="评分" tips="评分" />,
          <Switch name="switch" label="开关" tips="开关" />,
          <Slider name="slider" label="滑动条" tips="滑动条" />,
          <TypeDateRangePicker
            name="type_date"
            label="日期时间段"
            tips="日期时间段"
            rule="REQ"
          />,
          <TextArea name="des" label="备注" tips="备注" block />,
          <SubmitButton>提交</SubmitButton>,
        ]}
      />
    </Form>
  );
};

render(
  <PureGlobal
    preset={{
      locale: "en-US",
      enums: {
        helperGuide: () => [
          {
            value: "test-from-name",
            content: "测试帮助文档",
            url: "/",
          },
        ],
      },
      apis: {
        oss: {
          loader: () => {
            return window.PUBLIC_URL + "/avatar.png";
          },
        },
        ossUpload: async ({ file }) => {
          console.log(file);
          return new Promise((resolve) => {
            setTimeout(() => {
              const id = uniqueId("file-");
              resolve({
                data: {
                  code: 0,
                  data: {
                    id,
                    originalName: id + "简历.pdf",
                  },
                },
              });
            }, 1000);
          });
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);
