
# FormInfo


### 概述

表单控件，自带数据域管理。包含数据录入、校验以及对应样式

### 何时使用

* 用于创建或编辑一个实体或收集信息
* 需要对输入的数据类型进行校验时

### 概念

* Form Data：
  Form提交时获取到的输出值通常用来提交给后端，不包含Form的校验信息，只包含Form组件可以向外部提供的数据输出信息。
* Form State：
  Form中用来存储一切状态的值，包含Field信息，校验信息，Form的值（需要一定的转换从才能变成Form Data），表单是否验证通过，表单错误信息等值。
* 字段或称Field：
  Form中的一个项，必须拥有参数name,label,可选参数rule。name作为Form提交时获取到data的key值。
  label为字段展示给用户的名字以及字段报错时提示用户错误的语句中指代该字段的名字。
  rule为下方介绍的RULE。
  一个Field的取值可以是简单的Number，Boolean，String也可以是复杂的Array，Object等，所以在考虑一些值需要分成多个Field还是集中在一个Field时非常重要的。
  一个通用的规则是：***对于Form来说，它的最小校验单元是一个Field***。
* Field组件：
  Field组件是Field的一部分，可以由用户自己实现也可以由组件库提供，通过Form提供的Field hooks将其变成Field。
  field hooks主要接管Field组件的value，onChange参数，用来把Field组件的值获取到Form管理。Field组件必须为***受控组件***。
  field hooks还会接管triggerValidate，用来获取Field的校验时机。field hooks会向Field组件提供Field的校验状态和校验错误信息。
* RULE：
  用于字段的校验。RULE可以为一个function或者正则表达式，不过推荐以大写字符串调用。
  字符串形式的RULE以空格为间隔可以传入多条规则，如："REQ TEL"，
  执行校验时会从左至右依次校验，如果左侧的规则校验失败则不再执行其右侧规则，返回校验失败状态及该规则失败原因提示作为字段校验失败原因。
  字符串RULE允许传入参数，参数以中划线隔开，可传入多个参数，如："LEN-3-10"。
  字符串RULE使用前必须在Form组件中有所声明，Form的RULE声明有3个级别：
  默认级，包含于Form内部，提供了一些基本的校验规则。preset级：在项目的preset中声明，应该把项目中常用的或者是比较复杂的RULE声明集中维护于此。
  Form级：以rules参数传入Form组件，主要是某Form单独使用的RULE。
  如果声明字符相同，会以 Form级>preset级>默认级 进行覆盖。
  RULE声明为一个对象，key和去掉参数的字符串RULE相同，value为一个function称为校验函数。此function接收到的参数有三部分(
  value,[...args]
  ,{data,{field}}),第一个参数value为当前字段的值，最后一个参数为form的状态，data是form的当前值，field是form里面当前字段的信息，
  中间参数args为字符串参数如："LEN-3-10"会接收到3和20两个参数。校验函数返回{result,errMsg}，
  或者一个Promise.resolve({result,errMsg})的Promise对象。result为校验是否通过，errMsg为失败提示，失败提示可以用%s占位，展示时会替换成字段的label。
* 校验或称Validate：
  Form会在Field组件执行triggerValidate时执行当前Field的Validate，表单提交时执行所有Field的Validate。
  Validate会串行执行RULE里面的所有规则的校验函数，校验函数返回Promise时也会等待左边的校验函数的Promise完成再执行右边的规则校验函数。
  表单提交时，正在执行异步的校验函数的Field将不会重复执行Validate。表单提交时所有Field的校验状态为通过时才会执行onSubmit方法，否则会执行onError方法，
  onPrevSubmit方法在用户点击提交按钮时就会触发，不管Validate结果是否为通过。
* Event：
  Form采用了事件驱动的方式来设计，用以满足多种异步校验，和给Form提供强大的可扩展性。
  Form的API里面可以获取到的emitter就是Form内部的事件发射器，可以触发Form内部定义的事件，也可以自定义一些事件。同时可以通过emitter.addListener监听事件。
  Form内部定义的事件有：
  form-field-add：Field被添加进Form时触发，
  form-field-edit：Field的参数发生改变时触发，
  orm-field-remove：Field被卸载时触发，
  form-field-validate：Field执行Validate时触发，
  form-field-data-change：Field的值发生修改时触发，
  form-data-reset：Form组件重置data时触发，
  form-data-set-field：Form组件给data赋值时触发，
  form-data-set-field-validate：Field被赋值时触发，
  form-validate-all：Form执行全部Field的Validate时触发，一般为表单提交时，
  form-submit：表单提交时触发。
* 拦截器或称Interceptor：
  没有Field可以接收一个interceptor参数，字符串类型，和RULE类似可以再preset或者Form的interceptors props中声明以后使用，可以配置多个用空格连接。
  拦截器的作用是，在Field接收到一个新的值时，会串行执行拦截器的output部分，把其返回值输出到Form Data。
  在执行Form Data的赋值操作时把赋值作为输入串行执行拦截器的input部分，把其结果作为Form Data的输入。
  现在有个Field是日期选择，输出Date类型值，但是Form Data输出希望将其格式化为日期字符串，在表单编辑时Form
  Data输入格式化后的日期字符串，但是Field只接收Date类型的值，
  以下例子可以来解决此问题：
  ```jsx
  interceptors.input.use("date-string", (value) => {
    return value ? new Date(value) : null;
  });

  interceptors.output.use("date-string", (value) => {
    return value ? dayjs(value).format("YYYY-MM-DD") : "";
  });
  
  <Field name="date" label="日期" interceptor="date-string"/>
  ```
* Group：
  当Form的data需要接收到一个复杂值的时候，可以使用Group来实现，如：
  ```jsx
  <Group name="baseInfo">
    <Field name="name" label="名称"/>
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {baseInfo:{name:"xxx",des:"xxx"}}，Group的name和Field的name一致时也可以用来表示数组如：
  ```jsx
  <Group name="name">
    <Field name="name" label="名称"/>
  </Group>
  <Group name="des">
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {name:["name1","name2"],des:["des1","des2"]}。
  Group可以嵌套，如
  ```jsx
  <Group name="baseInfo">
    <Group name="info">
      <Field name="name" label="名称"/>
    </Group>
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {baseInfo:{info:{name:'xxx'},des:'xxx'}}。
  支持点操作，如：
  ```jsx
  <Group name="baseInfo.info">
    <Field name="name" label="名称"/>
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {baseInfo:{info:{name:'xxx',des:'xxx'}}}。
* GroupList：
  使用Group实现的一个特殊的区域用来更方便的实现多段式的表单如：
  ```jsx
  <Button onClick={()=>ref.current.onAdd()}>添加</Button>
  <GroupList name="edu" ref={ref}>
    {(key,{index,length,onAdd,onRemore})=><>
      <Button onClick={onRemore}>删除</Button>
      <Field name="schoolName" label="学校名称"/>
      <Field name="degree" label="学历"/>
      <Field name="des" label="说明"/>
    </>}
  </GroupList>
  ```
  以上是一个简历的学历列表的实现，可以点击添加按钮添加多段学历Field，可以点击删除按钮删除当前一段学历Field，
  Form的data可以接收到的 {edu:[{schoolName:'xxx',degree:'xxx',des:'xxx'}]}。
  当然你可以不用使用这样底层的API，FormInfo.List 已经帮你处理好一切。

### 特点

* 集中化校验规则管理，分层抽象，调用简便
* 支持异步校验规则
* 事件驱动式架构设计，便于扩展
* 支持Group及GroupList，可轻松实现复杂表单
* UI，校验逻辑分层抽象，一次封装使用简单
* context和ref双重API暴露，在Form内还是Form外都能轻松获取
* form-helper提供基本的表单封装，灵活组合
* 支持拦截器，便捷实现FormData和Field的值之间的转换

### Field实现规范

* FormInfo里面的Field都会放置在fields文件夹，其中每个文件夹代表一个Field
* 一个Field只能默认导出会被引用，其他的方法枚举等需要放置在默认导出的组件的function的静态属性上
* 一个Field的默认导出组件只能被放置在Form中作为Field被使用，它的Field组件会被挂载在默认导出的组件的function的Field静态属性上
* 一个Field的Field组件必须支持受控和非受控两种形式
* 一个Field的导出必须被包含在FormInfo导出的formModule中和FormInfo中，即：以下两种方法都可以获取到该Field
  ```jsx
  import {SomeField} from "@component/FormInfo";
  ```
  ```jsx
  import {formModule} from "@component/FormInfo";
  const {SomeField} = formModule;
  ```

### 选择器类型Field组件实现规范

* 必须使用SelectInnerInput作为选择器的值显示和触发的输入框
* SelectInnerInput可以通过isPopup提供popup和modal两种展示形态和交互逻辑，Field组件可以通过自身的默认值或者调用SelectInnerInput时显式指定来设置最佳推荐的默认形式，一般情况一种选择器需要良好支持两种形式
* SelectInnerInput可以通过single决定输出值是单项还是多项，单项和多项的交互逻辑也可能不同，SelectInnerInput的内部value state都是使用多项值来处理的，在输入值和在onChange输出时根据参数转化成数组，一般情况一种选择器需要支持两种情况
* 选择器可能会在顶部有一个搜索框，通过使用时是否传入getSearchProps来决定搜索框是否显示，在FormInfo/common中提供了默认的SearchInput实现，SelectInnerInput中管理了其searchText和setSearchText状态
* FormInfo/fields/AdvancedSelect/createList.js 实现了一个列表式选择器，实现了包括搜索，下拉加载等逻辑，只需要实现列表渲染逻辑就可以方便的扩展出新的List类型选择器
* 通过SelectInnerInput.useContext 可以拿到选择器的用户传入属性（props），值到选项的映射（mapping），搜索框的state（searchText,setSearchText），数据加载器的API（fetchApi）原始value值（valueState），添加映射方法（appendItems）

### 示例(全屏)


#### 示例样式

```scss
.input > .ant-row > .ant-col {
  padding: 10px 0;
}

.input .ant-space-item:last-child {
  width: 100%;
}
```

#### 示例代码

- 一个简单表单示例
- 展示了一个简单表单示例
- _FormInfo(@components/FormInfo),global(@components/Global),_Modal(@components/Modal),lodash(lodash)

```jsx
const { default: FormInfo, Form, SubmitButton, ErrorTip, fields } = _FormInfo;
const { PureGlobal } = global;
const { useModal } = _Modal;
const { uniqueId } = lodash;

const { Input, TextArea, Upload, Avatar, TypeDateRangePicker } = fields;

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
              tips="请输入姓名"
            />
          </ErrorTip>,
          <Input name="phone" label="手机" rule="REQ TEL" />,
          <Input name="email" label="邮箱" rule="EMAIL" />,
          <Upload name="file" label="文件" block />,
          <TypeDateRangePicker
            name="type_date"
            label="日期时间段"
            rule="REQ"
          />,
          <TextArea name="des" label="备注" block />,
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

```

- 一个含有多段列表的表单示例
- 展示了一个含有多段列表的表单示例，列表的最大长度为5，在添加5段之后添加按钮自动隐藏
- _FormInfo(@components/FormInfo),global(@components/Global),_Modal(@components/Modal),antd(antd)

```jsx
const {
  default: FormInfo,
  Form,
  List,
  AdvancedSelect,
  TableList,
  Input,
  TextArea,
  SubmitButton,
  FormApiButton,
} = _FormInfo;
const { PureGlobal } = global;
const { useModal } = _Modal;
const { Space } = antd;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "表单提交数据",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="基本信息"
          list={[
            <Input name="name" label="基本名称" rule="REQ" block />,
            <TextArea name="des" label="基本描述" block />,
          ]}
        />
        <List
          name="list"
          title="列表"
          itemTitle={({ index }) => `经历${index + 1}`}
          maxLength={5}
          list={[
            <Input name="name" label="名称" rule="REQ" />,
            <Input name="title" label="标题" rule="REQ" />,
            <TextArea name="des" label="描述" block rule="REQ" />,
          ]}
        />
        <TableList
          name="tableList"
          title="表格列表"
          maxLength={5}
          minLength={1}
          list={[
            <Input name="name" label="名称" rule="REQ" value="xxxxx" />,
            <Input name="title" label="标题" rule="REQ" />,
            <AdvancedSelect
              name="select"
              label="选项"
              rule="REQ"
              value={[1]}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "第一项",
                        value: 1,
                      },
                      {
                        label: "第二项",
                        value: 2,
                        disabled: true,
                      },
                      {
                        label: "第三项",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
            />,
          ]}
        />
        <List
          name="mult-list"
          important
          title="复杂列表"
          itemTitle={({ index }) => `经历${index + 1}`}
          maxLength={5}
          minLength={1}
          list={[
            <Input name="name" label="名称" rule="REQ" />,
            <Input name="title" label="标题" rule="REQ" />,
            <TextArea name="des" label="描述" block rule="REQ" />,
            <TableList
              block
              isUnshift={false}
              name="tableList"
              title="表格列表"
              maxLength={5}
              minLength={1}
              list={[
                <Input name="name" label="名称" rule="REQ" value="xxxxx" />,
                <Input name="title" label="标题" rule="REQ" />,
                <AdvancedSelect
                  name="select"
                  label="选项"
                  rule="REQ"
                  value={[1]}
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          {
                            label: "第一项",
                            value: 1,
                          },
                          {
                            label: "第二项",
                            value: 2,
                            disabled: true,
                          },
                          {
                            label: "第三项",
                            value: 3,
                          },
                        ],
                      };
                    },
                  }}
                />,
              ]}
            />,
          ]}
        />

        <List
          name="mult-list-2"
          important
          title="复杂列表2"
          itemTitle={({ index }) => `经历${index + 1}`}
          maxLength={5}
          minLength={1}
          list={[
            <Input name="name" label="名称" rule="REQ" />,
            <Input name="title" label="标题" rule="REQ" />,
            <TextArea name="des" label="描述" block rule="REQ" />,
            <List
              block
              name="tableList"
              title="列表"
              maxLength={5}
              minLength={1}
              list={[
                <Input name="name" label="名称" rule="REQ" value="xxxxx" />,
                <Input name="title" label="标题" rule="REQ" />,
                <TextArea name="des" label="描述" block rule="REQ" />,
              ]}
            />,
          ]}
        />
        <FormInfo
          list={[
            <SubmitButton>提交</SubmitButton>,
            <FormApiButton
              onClick={({ openApi }) => {
                openApi.setFields(
                  [
                    {
                      groupName: "tableList",
                      name: "name",
                      value: "",
                    },
                    {
                      groupName: "tableList",
                      name: "title",
                      value: "ssssssss",
                    },
                  ],
                  { runValidate: false }
                );
              }}
            >
              设置表单值
            </FormApiButton>,
          ]}
        />
      </Space>
    </Form>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- Modal Form弹窗
- 展示一个form弹窗
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd),fetch(@kne/react-fetch)

```jsx
const { Space, Button } = antd;
const { PureGlobal } = global;
const {
  default: FormInfo,
  List,
  Input,
  TextArea,
  FormModal,
  useFormModal,
  CancelButton,
  FormApiButton,
  SubmitButton,
  FormModalButton,
} = _FormInfo;
const { useState } = React;
const { default: Fetch } = fetch;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const formModal = useFormModal();
  return (
    <Space wrap>
      <FormModal
        open={open}
        title="表单弹窗"
        onClose={() => {
          setOpen(false);
        }}
        formProps={{
          data: {
            field1: "field1field1field1field1",
          },
          onSubmit: async (data) => {
            console.log(data);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            });
            setOpen(false);
          },
        }}
      >
        <FormInfo
          title="基本信息"
          list={[
            <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
            <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
            <TextArea name="field3" label="字段3" />,
          ]}
        />
        <List
          title="列表"
          name="list"
          maxLength={3}
          list={[
            <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
            <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
            <TextArea name="field3" label="字段3" />,
          ]}
        />
      </FormModal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            formProps: ({ data }) => {
              return {
                data: data,
                onSubmit: async (data) => {
                  console.log(data);
                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 1000);
                  });
                  api.close();
                },
              };
            },
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({
                        field1: "我接口获取的数据",
                      });
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks加载form数据调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            footerButtons: [
              { ButtonComponent: CancelButton, children: "取消" },
              {
                ButtonComponent: FormApiButton,
                autoClose: false,
                onClick: (context) => {
                  console.log(context);
                },
                children: "FormApiButton",
              },
              {
                ButtonComponent: SubmitButton,
                autoClose: false,
                children: "提交",
              },
            ],
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        自定义footerButtons
      </Button>
      <FormModalButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  name: "Lucy",
                  desc: "个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍",
                });
              }, 1000);
            });
          },
        }}
        modalProps={({ data, close }) => {
          return {
            title: "加载数据的form弹窗",
            formProps: {
              data,
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                close();
              },
            },
            children: (
              <FormInfo
                title="基本信息"
                column={1}
                list={[
                  <Input name="name" label="姓名" rule="REQ" />,
                  <TextArea name="desc" label="介绍" rule="REQ" />,
                ]}
              />
            ),
          };
        }}
      >
        加载form数据按钮
      </FormModalButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- Modal Step Form弹窗
- 展示一个step form弹窗
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd),fetch(@kne/react-fetch)

```jsx
const { Space, Button } = antd;
const { PureGlobal } = global;
const {
  default: FormInfo,
  List,
  Input,
  TextArea,
  FormModal,
  FormStepModal,
  useFormModal,
  useFormStepModal,
  CancelButton,
  FormApiButton,
  SubmitButton,
  FormModalButton,
} = _FormInfo;
const { useState } = React;
const { default: Fetch } = fetch;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const formModal = useFormStepModal();
  return (
    <Space wrap>
      <FormStepModal
        open={open}
        title="表单弹窗"
        onClose={() => {
          setOpen(false);
        }}
        formProps={{
          data: {
            field1: "field1field1field1field1",
          },
          onSubmit: async (data) => {
            console.log(data);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            });
            setOpen(false);
          },
        }}
        items={[
          {
            name: "basic",
            title: "基本信息",
            children: (
              <FormInfo
                title="基本信息"
                list={[
                  <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                  <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                  <TextArea name="field3" label="字段3" />,
                ]}
              />
            ),
          },
          {
            name: "list",
            title: "列表信息",
            children: (
              <List
                title="列表"
                name="list"
                maxLength={3}
                list={[
                  <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                  <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                  <TextArea name="field3" label="字段3" />,
                ]}
              />
            ),
          },
        ]}
      ></FormStepModal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            formProps: ({ data }) => {
              return {
                data: data,
                onSubmit: async (data) => {
                  console.log(data);
                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 1000);
                  });
                  api.close();
                },
              };
            },
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({
                        field1: "我接口获取的数据",
                      });
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks加载form数据调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            footerButtons: [
              { ButtonComponent: CancelButton, children: "取消" },
              {
                ButtonComponent: FormApiButton,
                autoClose: false,
                onClick: (context) => {
                  console.log(context);
                },
                children: "FormApiButton",
              },
              {
                ButtonComponent: SubmitButton,
                autoClose: false,
                children: "提交",
              },
            ],
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        自定义footerButtons
      </Button>
      <FormModalButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  name: "Lucy",
                  desc: "个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍",
                });
              }, 1000);
            });
          },
        }}
        modalProps={({ data, close }) => {
          return {
            title: "加载数据的form弹窗",
            formProps: {
              data,
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                close();
              },
            },
            children: (
              <FormInfo
                title="基本信息"
                column={1}
                list={[
                  <Input name="name" label="姓名" rule="REQ" />,
                  <TextArea name="desc" label="介绍" rule="REQ" />,
                ]}
              />
            ),
          };
        }}
      >
        加载form数据按钮
      </FormModalButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- Drawer Form 抽屉弹窗
- 展示一个form抽屉弹窗
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd),fetch(@kne/react-fetch)

```jsx
const { Space, Button } = antd;
const { PureGlobal } = global;
const {
  default: FormInfo,
  List,
  Input,
  TextArea,
  FormDrawer,
  useFormDrawer,
  CancelButton,
  FormApiButton,
  SubmitButton,
  FormDrawerButton,
} = _FormInfo;
const { useState } = React;
const { default: Fetch } = fetch;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const formDrawer = useFormDrawer();
  return (
    <Space wrap>
      <FormDrawer
        open={open}
        title="表单弹窗"
        onClose={() => {
          setOpen(false);
        }}
        formProps={{
          data: {
            field1: "field1field1field1field1",
          },
          onSubmit: async (data) => {
            console.log(data);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            });
            setOpen(false);
          },
        }}
      >
        <FormInfo
          title="基本信息"
          list={[
            <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
            <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
            <TextArea name="field3" label="字段3" />,
          ]}
        />
        <List
          title="列表"
          name="list"
          maxLength={3}
          list={[
            <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
            <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
            <TextArea name="field3" label="字段3" />,
          ]}
        />
      </FormDrawer>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
      <Button
        onClick={() => {
          const api = formDrawer({
            title: "表单弹窗",
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks调用
      </Button>
      <Button
        onClick={() => {
          const api = formDrawer({
            title: "表单弹窗",
            formProps: ({ data }) => {
              return {
                data: data,
                onSubmit: async (data) => {
                  console.log(data);
                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 1000);
                  });
                  api.close();
                },
              };
            },
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({
                        field1: "我接口获取的数据",
                      });
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks加载form数据调用
      </Button>
      <Button
        onClick={() => {
          const api = formDrawer({
            title: "表单弹窗",
            footerButtons: [
              { ButtonComponent: CancelButton, children: "取消" },
              {
                ButtonComponent: FormApiButton,
                autoClose: false,
                onClick: (context) => {
                  console.log(context);
                },
                children: "FormApiButton",
              },
              {
                ButtonComponent: SubmitButton,
                autoClose: false,
                children: "提交",
              },
            ],
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        自定义footerButtons
      </Button>
      <FormDrawerButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  name: "Lucy",
                  desc: "个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍",
                });
              }, 1000);
            });
          },
        }}
        modalProps={({ data, close }) => {
          return {
            title: "加载数据的form弹窗",
            formProps: {
              data,
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                close();
              },
            },
            children: (
              <FormInfo
                title="基本信息"
                column={1}
                list={[
                  <Input name="name" label="姓名" rule="REQ" />,
                  <TextArea name="desc" label="介绍" rule="REQ" />,
                ]}
              />
            ),
          };
        }}
      >
        加载form数据按钮
      </FormDrawerButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- 选择控件的数据展示框
- 展示了一个选择控件的数据展示框，它是其他选择器的子组件一般不独立使用，开放该组件是为了方面自定义新的选择控件，但是请谨慎使用
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd)

```jsx
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

```

- 高级选择组件
- 展示了高级选择组件的List形态
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const { AdvancedSelect: _AdvancedSelect, SelectInnerInput } = _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const AdvancedSelect = _AdvancedSelect.Field;

const useSelectInnerContext = SelectInnerInput.useContext;

const AddExtraButton = () => {
  const { appendItems, fetchApi } = useSelectInnerContext();

  return (
    <Button
      type="link"
      onClick={() => {
        const id = uniqueId("new_item_");
        appendItems({
          pageData: [
            {
              label: "添加的新项目_" + id,
              value: id,
            },
            ...fetchApi.data.pageData,
          ],
          totalCount: fetchApi.data.totalCount,
        });
      }}
    >
      添加
    </Button>
  );
};

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <AdvancedSelect
              defaultValue={[1]}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1 },
                      { label: "第二项", value: 2, disabled: true },
                      {
                        label: "第三项",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选",
          content: (
            <AdvancedSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: range(0, 100).map((key) => {
                      return {
                        label: `第${key + 1}项`,
                        value: key + 1,
                        disabled: key === 2,
                      };
                    }),
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "多选modal",
          content: (
            <AdvancedSelect
              defaultValue={[1]}
              isPopup={false}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1 },
                      { label: "第二项", value: 2 },
                      {
                        label: "第三项",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选modal",
          content: (
            <AdvancedSelect
              single
              defaultValue={1}
              isPopup={false}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1 },
                      { label: "第二项", value: 2 },
                      {
                        label: "第三项",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "描述信息",
          content: (
            <AdvancedSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1, description: "描述信息" },
                      {
                        label: "第二项",
                        value: 2,
                        description: "描述信息",
                      },
                      {
                        label: "第三项",
                        value: 3,
                        description: "描述信息",
                      },
                    ],
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "分页加载数据",
          content: (
            <AdvancedSelect
              single
              defaultValue={90}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
              displayItems={[{ label: "第九十项", value: 90 }]}
              extra={<AddExtraButton />}
              api={{
                loader: ({ data }) => {
                  const params = Object.assign(
                    {
                      perPage: 20,
                      currentPage: 1,
                    },
                    data
                  );
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      const start = (params.currentPage - 1) * params.perPage;
                      resolve({
                        totalCount: 100,
                        pageData: range(start, start + 20)
                          .map((key) => {
                            return {
                              label: `第${key + 1}项`,
                              value: key + 1,
                            };
                          })
                          .filter(({ label }) => {
                            return params.keyword
                              ? label.indexOf(params.keyword) > -1
                              : true;
                          }),
                      });
                    }, 1000);
                  });
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal分页加载数据",
          content: (
            <AdvancedSelect
              defaultValue={[90]}
              isPopup={false}
              extra={<AddExtraButton />}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
              displayItems={[{ label: "第九十项", value: 90 }]}
              api={{
                data: {
                  perPage: 10,
                },
                loader: ({ data }) => {
                  const params = Object.assign(
                    {
                      perPage: 20,
                      currentPage: 1,
                    },
                    data
                  );
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      const start = (params.currentPage - 1) * params.perPage;
                      resolve({
                        totalCount: 100,
                        pageData: range(start, start + params.perPage)
                          .map((key) => {
                            return {
                              label: `第${key + 1}项`,
                              value: key + 1,
                            };
                          })
                          .filter(({ label }) => {
                            return params.keyword
                              ? label.indexOf(params.keyword) > -1
                              : true;
                          }),
                      });
                    }, 1000);
                  });
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
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

```

- 用户选择组件
- 在List的交互逻辑基础上扩展出的不同列表样式
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const { AdvancedSelect: _AdvancedSelect } = _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const UserSelect = _AdvancedSelect.User.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <UserSelect
              defaultValue={[1]}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        value: 1,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户二",
                        value: 2,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户三",
                        value: 3,
                        description: "我是用户描述",
                      },
                    ],
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选",
          content: (
            <UserSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: range(0, 30).map((key) => {
                      return {
                        label: `用户${key + 1}`,
                        description: "我是用户描述",
                        value: key + 1,
                      };
                    }),
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "多选modal",
          content: (
            <UserSelect
              defaultValue={[1]}
              isPopup={false}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        value: 1,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户二",
                        value: 2,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户三",
                        value: 3,
                        description: "我是用户描述",
                      },
                    ],
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选modal",
          content: (
            <UserSelect
              single
              defaultValue={1}
              isPopup={false}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        value: 1,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户二",
                        value: 2,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户三",
                        value: 3,
                        description: "我是用户描述",
                      },
                    ],
                  };
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
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

```

- 表格选择组件
- 在List的交互逻辑基础上扩展出的不同列表样式
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const { AdvancedSelect: _AdvancedSelect } = _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const TableSelect = _AdvancedSelect.Table.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <TableSelect
              defaultValue={[1]}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
              api={{
                data: {
                  perPage: 10,
                },
                loader: ({ data }) => {
                  const params = Object.assign(
                    {
                      perPage: 20,
                      currentPage: 1,
                    },
                    data
                  );
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      const start = (params.currentPage - 1) * params.perPage;
                      resolve({
                        totalCount: 100,
                        pageData: range(start, start + params.perPage)
                          .map((key) => {
                            return {
                              label: `员工${key + 1}`,
                              company: "北京科技有限公司",
                              department: "技术部",
                              value: key + 1,
                            };
                          })
                          .filter(({ label }) => {
                            return params.keyword
                              ? label.indexOf(params.keyword) > -1
                              : true;
                          }),
                      });
                    }, 1000);
                  });
                },
              }}
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选",
          content: (
            <TableSelect
              single
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        company: "北京科技有限公司",
                        department: "财务部",
                        value: 1,
                      },
                      {
                        label: "用户二",
                        company: "北京科技有限公司",
                        department: "技术部",
                        value: 2,
                      },
                      {
                        label: "用户三",
                        company: "北京科技有限公司",
                        department: "商务部",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "多选modal",
          content: (
            <TableSelect
              defaultValue={[1]}
              isPopup={false}
              getSearchProps={(text) => {
                return {
                  data: { keyword: text },
                };
              }}
              api={{
                data: {
                  perPage: 10,
                },
                loader: ({ data }) => {
                  const params = Object.assign(
                    {
                      perPage: 20,
                      currentPage: 1,
                    },
                    data
                  );
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      const start = (params.currentPage - 1) * params.perPage;
                      resolve({
                        totalCount: 100,
                        pageData: range(start, start + params.perPage)
                          .map((key) => {
                            return {
                              label: `员工${key + 1}`,
                              company: "北京科技有限公司",
                              department: "技术部",
                              value: key + 1,
                            };
                          })
                          .filter(({ label }) => {
                            return params.keyword
                              ? label.indexOf(params.keyword) > -1
                              : true;
                          }),
                      });
                    }, 1000);
                  });
                },
              }}
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选modal",
          content: (
            <TableSelect
              single
              isPopup={false}
              defaultValue={1}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        company: "北京科技有限公司",
                        department: "财务部",
                        value: 1,
                      },
                      {
                        label: "用户二",
                        company: "北京科技有限公司",
                        department: "技术部",
                        value: 2,
                      },
                      {
                        label: "用户三",
                        company: "北京科技有限公司",
                        department: "商务部",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
              columns={[
                {
                  title: "姓名",
                  dataIndex: "label",
                },
                {
                  title: "所属公司",
                  dataIndex: "company",
                },
                {
                  title: "所属部门",
                  dataIndex: "department",
                },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
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

```

- 地址选择组件
- 展示地址选择组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const { AddressSelect: _AddressSelect, AddressInput: _AddressInput } =
  _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const AddressSelect = _AddressSelect.Field;
const AddressEnum = _AddressSelect.AddressEnum;
const AddressInput = _AddressInput.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <AddressSelect
              maxLength={3}
              defaultValue={["110"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选",
          content: (
            <AddressSelect
              single
              defaultValue={"110"}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal多选",
          content: (
            <AddressSelect
              maxLength={3}
              isPopup={false}
              defaultValue={["110"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal单选",
          content: (
            <AddressSelect
              isPopup={false}
              single
              defaultValue={"110"}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "valueType为all",
          content: (
            <AddressSelect
              valueType="all"
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "地址显示",
          content: <AddressEnum name="270070" />,
        },
        {
          label: "显示父级",
          content: <AddressEnum name="270070" displayParent />,
        },
        {
          label: "地址输入",
          content: (
            <AddressInput
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
      ]}
    />
  );
};

render(
  <PureGlobal preset={{ locale: "en-US" }}>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 级联选择组件
- 展示级联选择组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const { Cascader: _Cascader } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const Cascader = _Cascader.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "一次性获取数据",
          content: (
            <Cascader
              onlyAllowLastLevel
              single
              api={{
                loader: async () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          id: "client",
                          value: "client",
                          type: "module",
                          name: "客户",
                          label: "客户",
                          children: [
                            {
                              id: "client-list",
                              value: "client-list",
                              type: "feature",
                              name: "客户列表页",
                              label: "客户列表页",
                            },
                            {
                              id: "client-detail",
                              value: "client-detail",
                              type: "module",
                              name: "客户详情页",
                              label: "客户详情页",
                              children: [
                                {
                                  id: "contract",
                                  value: "contract",
                                  type: "module",
                                  name: "合同信息",
                                  label: "合同信息",
                                },
                              ],
                            },
                            {
                              id: "client-form",
                              value: "client-form",
                              type: "feature",
                              name: "客户表单",
                              label: "客户表单",
                              children: [
                                {
                                  id: "taxpayerIdNumber",
                                  value: "taxpayerIdNumber",
                                  type: "feature",
                                  name: "税号",
                                  label: "税号",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "position",
                          value: "position",
                          type: "module",
                          name: "职位",
                          label: "职位",
                          children: [
                            {
                              id: "position-list",
                              value: "position-list",
                              type: "feature",
                              name: "职位列表页",
                              label: "职位列表页",
                            },
                            {
                              id: "position-detail",
                              value: "position-detail",
                              type: "module",
                              name: "职位详情页",
                              label: "职位详情页",
                            },
                            {
                              id: "position-form",
                              value: "position-form",
                              type: "feature",
                              name: "职位表单",
                              label: "职位表单",
                              children: [
                                {
                                  id: "industry",
                                  value: "industry",
                                  type: "feature",
                                  name: "行业",
                                  label: "行业",
                                },
                              ],
                            },
                          ],
                        },
                      ]);
                    }, 1000);
                  });
                },
              }}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "分层加载数据",
          content: (
            <Cascader
              openLoadData
              onSearch={async (searchText) => {
                return range(0, 20).map((key) => {
                  const parentId = "2";
                  return {
                    id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                    label: `节点-${searchText}-${
                      parentId ? `${parentId}-` : ""
                    }${key + 1}`,
                    parentId,
                  };
                });
              }}
              api={{
                loader: async ({ data }) => {
                  const parentId = get(data, "id", "");
                  const level = parentId.split("-").length;
                  console.log("loadData", parentId, level);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(
                        range(0, 20).map((key) => {
                          return Object.assign(
                            {
                              id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                              label: `节点-${parentId ? `${parentId}-` : ""}${
                                key + 1
                              }`,
                              parentId,
                            },
                            level >= 3 ? { children: null } : {}
                          );
                        })
                      );
                    }, 1000);
                  });
                },
              }}
            />
          ),
        },
        {
          label: "modal分层加载数据",
          content: (
            <Cascader
              openLoadData
              isPopup={false}
              api={{
                loader: async ({ data }) => {
                  const parentId = get(data, "id", "");
                  const level = parentId.split("-").length;
                  console.log("loadData", parentId, level);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(
                        range(0, 20).map((key) => {
                          return Object.assign(
                            {
                              id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                              label: `节点-${parentId ? `${parentId}-` : ""}${
                                key + 1
                              }`,
                              parentId,
                            },
                            level >= 3 ? { children: null } : {}
                          );
                        })
                      );
                    }, 1000);
                  });
                },
              }}
            />
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

```

- 职能选择
- 展示行业职能选择
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const { FunctionSelect: _FunctionSelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const FunctionSelect = _FunctionSelect.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "职能选择",
          content: (
            <FunctionSelect
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal职能选择",
          content: (
            <FunctionSelect
              isPopup={false}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能选择无搜索",
          content: (
            <FunctionSelect
              search={null}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能枚举显示",
          content: <FunctionSelect.Enum name="001" />,
        },
      ]}
    />
  );
};

render(
  <PureGlobal preset={{ locale: "en-US" }}>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 行业选择
- 展示行业选择组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const { IndustrySelect: _IndustrySelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const IndustrySelect = _IndustrySelect.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "行业选择",
          content: (
            <IndustrySelect
              defaultValue={["001"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal行业选择",
          content: (
            <IndustrySelect
              isPopup={false}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能枚举显示",
          content: <IndustrySelect.Enum name="004" />,
        },
      ]}
    />
  );
};

render(
  <PureGlobal preset={{ locale: "en-US" }}>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 金额输入
- 展示金额输入组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const { MoneyInput: _MoneyInput } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const MoneyInput = _MoneyInput.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "金额输入",
          content: <MoneyInput />,
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

```

- 电话号码输入
- 展示电话号码输入组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const { PhoneNumber: _PhoneNumber } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const PhoneNumber = _PhoneNumber.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "电话输入",
          content: (
            <PhoneNumber
              onChange={(value) => {
                console.log(value);
              }}
            />
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

```

- 薪资组件
- 展示填写薪资范围输入组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const { SalaryInput, Form } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const SalaryInputField = SalaryInput.Field;

const BaseExample = () => {
  return (
    <div>
      <Content
        col={1}
        list={[
          {
            label: "薪资范围",
            content: (
              <SalaryInputField
                onChange={(value) => {
                  console.log(value);
                }}
              />
            ),
          },
        ]}
      />
      <Form
        rules={{
          SALARYRANGE: ({ min, max, type }) => {
            if (type !== 1) {
              if (!min || !max) {
                return {
                  result: false,
                  errMsg: `${!min ? "最低薪资" : "最高薪资"}不能为空`,
                };
              }
              if (min > max) {
                return {
                  result: false,
                  errMsg: "最高薪资应大于最低薪资",
                };
              }
            }
            return {
              result: true,
              errMsg: "",
            };
          },
        }}
        data={{ salaryRange: { type: 5, month: 12 } }}
      >
        <SalaryInput
          name="salaryRange"
          label="薪资范围"
          rule="REQ SALARYRANGE"
          showMonth
          remindUnit
        />
      </Form>
    </div>
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 可编辑的表格表单
- 可编辑的表格表单
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd)

```jsx
const { TableInput, Form, Input, SubmitButton } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  return (
    <div>
      <Form
        data={{
          tableInput: {
            1: { otherCode: "111" },
            2: { otherCode: "222" },
          },
        }}
        onSubmit={(formData) => {
          console.log(formData);
        }}
      >
        <TableInput
          controllerOpen={false}
          name="tableInput"
          label="表格表单"
          columns={[
            {
              title: "系统字段",
              dataIndex: "systemCode",
              key: "systemCode",
              width: 200,
            },
            {
              title: "对应的字段",
              dataIndex: "otherCode",
              key: "otherCode",
              editable: (text, record, index) => index !== 0,
              field: {
                type: Input,
                rule: "REQ",
                getValue: (e) => e.target.value,
              },
            },
          ]}
          api={{
            loader: () => {
              return {
                pageData: [
                  {
                    id: 1,
                    systemCode: "流水号",
                  },
                  {
                    id: 2,
                    systemCode: "流水号2",
                  },
                ],
              };
            },
          }}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <SubmitButton>提交</SubmitButton>
      </Form>
    </div>
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);

```

- 可扩展的AdvanceSelect
- AdvanceSelect支持左右布局
- _FormInfo(@components/FormInfo),icon(@components/Icon),_antd(antd),global(@components/Global),_lodash(lodash),_dayjs(dayjs)

```jsx
const { AdvancedSelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Icon } = icon;
const { useState } = React;
const { range, merge, get } = _lodash;
const dayjs = _dayjs;
const { Col } = _antd;

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        ajax: () => {
          return Promise.resolve({ data: { code: 0, data: [] } });
        },
      }}
    >
      <AdvancedSelect.Field
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        displayItems={[{ label: "第九十项", value: 90 }]}
        api={{
          loader: ({ data }) => {
            const params = Object.assign(
              {
                perPage: 20,
                currentPage: 1,
              },
              data
            );
            return new Promise((resolve) => {
              setTimeout(() => {
                const start = (params.currentPage - 1) * params.perPage;
                resolve({
                  totalCount: 100,
                  pageData: range(start, start + 20)
                    .map((key) => {
                      return {
                        label: `第${key + 1}项`,
                        value: key + 1,
                      };
                    })
                    .filter(({ label }) => {
                      return params.keyword
                        ? label.indexOf(params.keyword) > -1
                        : true;
                    }),
                });
              }, 1000);
            });
          },
        }}
        onChange={(value) => {
          console.log(value);
        }}
        single
        isPopup={false}
        label={"面试官"}
        placeholder={"选择面试官"}
        modalSize={"large"}
        wrapClassName={"calendar-modal"}
        selectIcon={
          <div>
            <Icon type={"icon-gouxuan"} />
          </div>
        }
        leftSpan={6}
        right={() => (
          <Col flex={1}>
            <div>我是header</div>
            <div>我是body</div>
          </Col>
        )}
        leftBottom={() => <div>我是leftBottom</div>}
      />
    </PureGlobal>
  );
};
render(<BaseExample />);

```


### API

| 属性名          | 说明 | 类型 | 默认值 |
|--------------|----|----|-----|
| data         |    |    |     |
| debug        |    |    |     |
| rules        |    |    |     |
| interceptors |    |    |     |
| noFilter     |    |    |     |
| onError      |    |    |     |
| onSubmit     |    |    |     |
| onPrevSubmit |    |    |     |

### SelectInnerInput

### formModule

### FormInfo

### preset

### List

### Form

同default导出组件

### useField

### useReset

### useSubmit

### Group

### GroupList

### useFormContext

### RULES

### interceptors

### SubmitButton

### CancelButton

### ResetButton

### Field类型:antd组件

以下组件请参考antd具体的组件文档此处不再赘述

Checkbox,CheckboxGroup,DatePicker,Input,InputNumber,RadioGroup,Select,Switch,TextArea,TimePicker,TreeSelect

### Field类型:@kne/react-form-antd实现组件

DatePickerToday

### Field类型:components-core实现组件

AddressSelect

AdvancedSelect

Avatar

Cascader

FunctionSelect

IndustrySelect

Money

PartSelect

PhoneNumber

TableDataSelect

Upload

### FormModal

一个Form和Modal组合起来的组件，它预置了Form组件，children传入的内容和footer区域均在Form的context内

| 属性名       | 说明        | 类型     | 默认值 |
|-----------|-----------|--------|-----|
| formProps | 同Form组件参数 | object | -   |

### useFormModal

获取一个执行后可以弹出一个FormModal组件的方法

#### return:formModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| formModal | 执行后可以弹出一个FormModal弹窗，参数同FormModal组件参数 | function |

### FormModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出FormModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同FormModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件
