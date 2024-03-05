| 属性名     | 说明                                                                                       | 类型     | 默认值  |
|---------|------------------------------------------------------------------------------------------|--------|------|
| id      | 如果文件为oss文件，传入ossId                                                                       | string | -    |
| url     | 如果文件为普通文件地址，传入该参数                                                                        | string | -    |
| error   | 加载文件失败展示组件                                                                               | jsx    | null |
| apis    | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object | -    |
| loading | 加载文件loading过程中显示组件                                                                       | jsx    | null |

#### Download

下载文件按钮

| 属性名       | 说明                                                                                       | 类型       | 默认值     |
|-----------|------------------------------------------------------------------------------------------|----------|---------|
| filename  | 下载文件的文件名                                                                                 | string   | 未命名下载文件 |
| onSuccess | 下载成功回调函数                                                                                 | function | -       |
| onError   | 下载失败回调函数                                                                                 | function | -       |
| id        | 如果文件为oss文件，传入ossId                                                                       | string   | -       |
| url       | 如果文件为普通文件地址，传入该参数                                                                        | string   | -       |
| apis      | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object   | -       |

#### List

显示文件列表，可以带有编辑文件名称，文件预览，文件删除等功能

| 属性名                      | 说明                                                                                                   | 类型                                      | 默认值  |
|--------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------|------|
| dataSource               | 文件列表                                                                                                 | array[{id,type,filename,date,userName}] | []   |
| dataSource[].id          | id:文件的id，一般为ossId                                                                                    | string                                  | -    |
| dataSource[].type        | 文件状态为uploading时该行文件展示为loading状态                                                                      | string                                  | -    |
| dataSource[].filename    | 文件名                                                                                                  | string                                  | -    |
| dataSource[].date        | 文件上传日期                                                                                               | Date,date timestamp                     | -    |
| dataSource[].userName    | 文件上传人                                                                                                | string                                  | -    |
| getPermission            | 获取操作权限，会在render每条数据时调用，获取到参数列表[type,itemData],type:preview预览,edit编辑,download下载，返回false为没有权限，其他情况为有权限 | function                                | -    |
| hasPreview               | 是否开启预览功能，和getPermission type:preview预览结果同事控制，全都判断通过才能开启预览功能                                          | boolean                                 | true |
| infoItemRenders          | 自定义列                                                                                                 | array[{span,render}]                    | -    |
| infoItemRenders[].span   | 当前列栅格数                                                                                               | number                                  | 4    |
| infoItemRenders[].render | render函数                                                                                             | function                                | -    |
| apis                     | 用于操作的api                                                                                             | object{onEdit,onPreview,onDelete}       | -    |
| apis.onEdit              | 文件名编辑回调接口                                                                                            | function                                | -    |
| apis.onPreview           | 文件预览回调接口                                                                                             | function                                | -    |
| apis.onDelete            | 文件删除回调接口                                                                                             | function                                | -    |

#### OptionButtons

文件操作按钮，可以带有编辑文件名称，文件预览，文件删除等功能

| 属性名            | 说明                                                          | 类型                                | 默认值  |
|----------------|-------------------------------------------------------------|-----------------------------------|------|
| apis           | 用于操作的api                                                    | object{onEdit,onPreview,onDelete} | -    |
| apis.onEdit    | 文件名编辑回调接口                                                   | function                          | -    |
| apis.onPreview | 文件预览回调接口                                                    | function                          | -    |
| apis.onDelete  | 文件删除回调接口                                                    | function                          | -    |
| hasPreview     | 是否开启预览功能，和getPermission type:preview预览结果同事控制，全都判断通过才能开启预览功能 | boolean                           | true |

#### FileLink

外观类似Link的组件，点击后可以弹出文件预览框

| 属性名          | 说明                                                                                       | 类型         | 默认值        |
|--------------|------------------------------------------------------------------------------------------|------------|------------|
| title        | 弹窗标题                                                                                     | string,jsx | originName |
| id           | 文件oss id                                                                                 | string     | -          |
| originName   | 文件名称                                                                                     | string     | -          |
| apis         | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object     | -          |
| openDownload | 是否开启文件下载                                                                                 | boolean    | true       |
| modalProps   | modal的其他参数，参考Modal组件                                                                     | object     | -          |

#### downloadBlobFile(target, filename)

下载文件的方法

| 属性名      | 说明             | 类型     | 默认值 |
|----------|----------------|--------|-----|
| target   | 下载链接地址,或者二进制数据 | string | -   |
| filename | 下载后的文件名        | string | -   |

#### {isLoading,download,...others} = useDownload({id,filename,apis,onError,onSuccess});

生成下载文件function的hooks，带有下载中的状态控制

| 属性名       | 说明                                                                                       | 类型       | 默认值 |
|-----------|------------------------------------------------------------------------------------------|----------|-----|
| id        | 文件ossId                                                                                  | string   | -   |
| filename  | 下载后的文件名                                                                                  | string   | -   |
| onError   | 下载失败回调                                                                                   | function | -   |
| onSuccess | 下载成功回调                                                                                   | function | -   |
| apis      | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object   | -   |
| isLoading | 是否正在下载中                                                                                  | boolean  | -   |
| download  | 执行该方法开始下载                                                                                | function | -   |
| others    | 其他@kne/react-fetch useFetch参数                                                            | object   | -   |

#### modal = useFileModal()

文件预览弹框方法生成的hooks

| 属性名                   | 说明                                                                                       | 类型                                                                   | 默认值        |
|-----------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------|------------|
| modal                 | 执行后弹出文件预览弹窗                                                                              | function({title, id, originName, apis, openDownload, ...modalProps}) | -          |
| modal({title})        | 弹窗标题                                                                                     | string,jsx                                                           | originName |
| modal({id})           | 文件oss id                                                                                 | string                                                               | -          |
| modal({originName})   | 文件名称                                                                                     | string                                                               | -          |
| modal({apis})         | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object                                                               | -          |
| modal({openDownload}) | 是否开启文件下载                                                                                 | boolean                                                              | true       |
| modalProps            | modal的其他参数，参考Modal组件                                                                     | object                                                               | -          |
