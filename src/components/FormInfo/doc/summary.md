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