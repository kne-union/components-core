const { SelectInnerInput } = _FormInfo;
const { PureGlobal } = global;
const { Space, Button, List } = antd;
const { default: Content } = _Content;
const { useState } = React;

const ControlledSelectInnerInput = (props) => {
  const [value, setValue] = useState([1, 2, 3]);

  return <SelectInnerInput {...props} value={value} onChange={setValue} />;
};

const useSelectInnerContext = SelectInnerInput.useContext;

const ResetMapping = () => {
  const { mapping, appendMapping } = useSelectInnerContext();
  return (
    <span>
      <Button
        onClick={() => {
          appendMapping([
            { label: "修改的项", value: 1 },
            { label: "新增的项", value: 4 },
          ]);
        }}
      >
        点击设置mapping值
      </Button>
      <List
        dataSource={mapping.values()}
        renderItem={(item) => <div>{item.label}</div>}
      />
    </span>
  );
};

const BaseExample = () => {
  const children = "选区内容";
  return (
    <Content
      col={2}
      list={[
        {
          label: "非受控状态",
          content: (
            <SelectInnerInput
              defaultValue={[1, 2, 3]}
              onChange={(value) => {
                console.log(value);
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "受控状态",
          content: (
            <ControlledSelectInnerInput>{children}</ControlledSelectInnerInput>
          ),
        },
        {
          label: "mapping值显示",
          content: (
            <SelectInnerInput
              defaultValue={[1, 2, 3]}
              api={{
                loader: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        { label: "第一项", value: 1 },
                        { label: "第二项", value: 2 },
                        {
                          label: "第三项",
                          value: 3,
                        },
                      ]);
                    }, 1000);
                  });
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "单项值显示",
          content: (
            <SelectInnerInput
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        { label: "第一项", value: 1 },
                        { label: "第二项", value: 2 },
                        {
                          label: "第三项",
                          value: 3,
                        },
                      ]);
                    }, 1000);
                  });
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "多项超出情况",
          content: (
            <SelectInnerInput
              defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              api={{
                loader: () => {
                  return [
                    {
                      label:
                        "第一项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 1,
                    },
                    {
                      label:
                        "第二项超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 2,
                    },
                    {
                      label: "第三项",
                      value: 3,
                    },
                    {
                      label:
                        "第四项超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 4,
                    },
                    {
                      label:
                        "第五项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 5,
                    },
                    {
                      label:
                        "第六项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 6,
                    },
                    {
                      label:
                        "第七项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 7,
                    },
                    { label: "第八项", value: 8 },
                    { label: "第九项", value: 9 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "单项超出情况",
          content: (
            <SelectInnerInput
              defaultValue={1}
              single
              api={{
                loader: () => {
                  return [
                    {
                      label:
                        "第一项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 1,
                    },
                    {
                      label:
                        "第二项超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 2,
                    },
                    {
                      label: "第三项",
                      value: 3,
                    },
                    {
                      label:
                        "第四项超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 4,
                    },
                    {
                      label:
                        "第五项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 5,
                    },
                    {
                      label:
                        "第六项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 6,
                    },
                    {
                      label:
                        "第七项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 7,
                    },
                    { label: "第八项", value: 8 },
                    { label: "第九项", value: 9 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "popup多项超出情况",
          content: (
            <SelectInnerInput
              isPopup
              defaultValue={[1, 2, 3, 4, 5, 6, 7, 8]}
              api={{
                loader: () => {
                  return [
                    {
                      label:
                        "第一项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 1,
                    },
                    {
                      label:
                        "第二项超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 2,
                    },
                    {
                      label: "第三项",
                      value: 3,
                    },
                    {
                      label:
                        "第四项超级长超级长超级长超级长超级长超级长超级长超级长",
                      value: 4,
                    },
                    {
                      label: "第五项",
                      value: 5,
                    },
                    {
                      label: "第六项",
                      value: 6,
                    },
                    { label: "第七项", value: 7 },
                    { label: "第八项", value: 8 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "popup选区",
          content: (
            <SelectInnerInput
              single
              isPopup
              defaultValue={1}
              api={{
                loader: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        { label: "第一项", value: 1 },
                        { label: "第二项", value: 2 },
                        {
                          label: "第三项",
                          value: 3,
                        },
                      ]);
                    }, 1000);
                  });
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "更新mapping",
          content: (
            <SelectInnerInput
              single
              isPopup
              defaultValue={1}
              api={{
                loader: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        { label: "第一项", value: 1 },
                        { label: "第二项", value: 2 },
                        {
                          label: "第三项",
                          value: 3,
                        },
                      ]);
                    }, 1000);
                  });
                },
              }}
            >
              <ResetMapping />
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "隐藏已选标签",
          content: (
            <SelectInnerInput
              showSelectedTag={false}
              defaultValue={[1, 2, 3]}
              api={{
                loader: () => {
                  return [
                    { label: "第一项", value: 1 },
                    { label: "第二项", value: 2 },
                    { label: "第三项", value: 3 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "popup隐藏已选标签",
          content: (
            <SelectInnerInput
              isPopup
              showSelectedTag={false}
              defaultValue={[1, 2, 3]}
              api={{
                loader: () => {
                  return [
                    { label: "第一项", value: 1 },
                    { label: "第二项", value: 2 },
                    { label: "第三项", value: 3 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "extra",
          content: (
            <SelectInnerInput
              extra={<Button>添加</Button>}
              defaultValue={[1, 2, 3]}
              api={{
                loader: () => {
                  return [
                    { label: "第一项", value: 1 },
                    { label: "第二项", value: 2 },
                    { label: "第三项", value: 3 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "popup的extra",
          content: (
            <SelectInnerInput
              isPopup
              extra={({ close }) => <Button onClick={close}>添加</Button>}
              defaultValue={[1, 2, 3]}
              api={{
                loader: () => {
                  return [
                    { label: "第一项", value: 1 },
                    { label: "第二项", value: 2 },
                    { label: "第三项", value: 3 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
        {
          label: "valueType为all",
          content: (
            <SelectInnerInput
              isPopup
              valueType="all"
              defaultValue={[
                { label: "额外的一项", value: 100 },
                { label: "额外的二项", value: 200 },
              ]}
              api={{
                loader: () => {
                  return [
                    { label: "第一项", value: 1 },
                    { label: "第二项", value: 2 },
                    { label: "第三项", value: 3 },
                  ];
                },
              }}
            >
              {children}
            </SelectInnerInput>
          ),
        },
      ]}
    />
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);
