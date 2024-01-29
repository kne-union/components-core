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