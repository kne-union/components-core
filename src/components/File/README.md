# File

### 概述

File 组件提供了一套完整的文件管理解决方案，包括文件展示、OSS 文件 ID 转换、文件列表展示、文件下载等功能。

该组件集成了文件上传、预览、编辑、删除等常见操作，支持通过 OSS ID 自动获取文件访问地址，并提供文件列表组件来展示和管理多个文件。同时提供了文件下载、文件预览链接等便捷组件，方便在各种场景下使用。

核心特性：
- **自动 OSS 地址转换**：支持通过文件 ID 自动获取 OSS 访问地址，无需手动处理 URL 转换
- **完整的文件操作**：提供文件预览、编辑名称、下载、删除等完整操作功能
- **灵活的列表展示**：支持自定义列渲染、权限控制、上传状态展示
- **多种使用方式**：提供按钮、链接、列表等多种形式的组件，适应不同场景需求
- **下载状态管理**：内置下载状态管理，支持下载进度控制和回调处理

适用于文档管理系统、文件共享平台、数据导入导出等需要文件处理的应用场景。


### 示例

#### 示例代码

- 获取文件地址
- 通过 OSS ID 获取文件访问地址，展示员工头像和公司 Logo 地址获取
- _File(@components/File),global(@components/Global),remoteLoader(@kne/remote-loader),antd(antd)

```jsx
const { default: File } = _File;
const { PureGlobal } = global;
const { getPublicPath } = remoteLoader;
const { Typography, Card, Space, Alert } = antd;

const { Paragraph, Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="文件地址获取示例"
        description="演示如何通过 OSS ID 获取文件访问地址"
        type="info"
        showIcon
      />

      <Card title="员工头像地址">
        <File id="employee-avatar-001">
          {({ url, isLoading }) => (
            <Space direction="vertical">
              <Text strong>访问地址：</Text>
              <Paragraph copyable>
                {isLoading ? '加载中...' : url}
              </Paragraph>
            </Space>
          )}
        </File>
      </Card>

      <Card title="公司 Logo 地址">
        <File id="company-logo-main">
          {({ url, isLoading }) => (
            <Space direction="vertical">
              <Text strong>访问地址：</Text>
              <Paragraph copyable>
                {isLoading ? '加载中...' : url}
              </Paragraph>
            </Space>
          )}
        </File>
      </Card>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      apis: {
        file: {
          getUrl: {
            loader: async ({ params }) => {
              const mapping = {
                "employee-avatar-001": "/avatar.png",
                "company-logo-main": "/mock/resume.pdf"
              };
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(getPublicPath("components-core") + mapping[params.id] || "");
                }, 500);
              });
            },
          },
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);

```

- 文件下载
- 展示不同类型文件的下载功能，包括成功和失败回调，人力资源相关文档下载
- _File(@components/File),global(@components/Global),remoteLoader(@kne/remote-loader),antd(antd)

```jsx
const { Download } = _File;
const { PureGlobal } = global;
const { getPublicPath } = remoteLoader;
const { Space, Card, Alert, Typography, message } = antd;

const { Title, Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="文件下载示例"
        description="演示不同类型文件的下载功能，包括成功和失败回调"
        type="info"
        showIcon
      />

      <Card title="人力资源相关文档下载">
        <Space direction="vertical">
          <div>
            <Text type="secondary">员工入职手册：</Text>
            <br />
            <Download
              id="doc-employee-handbook"
              filename="员工入职手册.pdf"
              onSuccess={() => message.success('员工入职手册下载成功')}
              onError={() => message.error('文件下载失败')}
            >
              点击下载
            </Download>
          </div>

          <div>
            <Text type="secondary">公司规章制度：</Text>
            <br />
            <Download
              id="doc-company-rules"
              filename="公司规章制度.docx"
              onSuccess={() => message.success('公司规章制度下载成功')}
            >
              点击下载
            </Download>
          </div>

          <div>
            <Text type="secondary">薪酬福利政策：</Text>
            <br />
            <Download
              id="doc-salary-policy"
              filename="薪酬福利政策.pdf"
              onSuccess={() => message.success('薪酬福利政策下载成功')}
            >
              点击下载
            </Download>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      apis: {
        file: {
          getUrl: {
            loader: async ({ params }) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(getPublicPath("components-core") + "/avatar.png");
                }, 800);
              });
            },
          },
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);

```

- 文件列表
- 展示文件列表组件，支持上传状态、文件信息展示、编辑、预览、删除等操作，项目文档库和员工简历场景
- _File(@components/File),global(@components/Global),remoteLoader(@kne/remote-loader),antd(antd)

```jsx
const { List } = _FileList;
const { Space, Card, Alert, Typography } = antd;
const { PureGlobal } = global;
const { getPublicPath } = remoteLoader;

const { Title } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="文件列表示例"
        description="展示文件上传状态、文件信息及操作功能"
        type="info"
        showIcon
      />

      <Card title="项目文档库">
        <List
          dataSource={[
            {
              uuid: "upload-001",
              type: "uploading",
              filename: "项目需求规格说明书.docx",
            },
            {
              id: "doc-project-plan",
              filename: "项目执行计划.pdf",
              date: "2024-01-15T10:30:00.000+08:00",
              userName: "张三",
            },
            {
              id: "doc-technical-design",
              filename: "技术架构设计文档.pdf",
              date: "2024-01-16T14:20:00.000+08:00",
              userName: "李四",
            },
            {
              id: "doc-api-interface",
              filename: "API 接口文档.md",
              date: "2024-01-17T09:15:00.000+08:00",
              userName: "王五",
            },
          ]}
          apis={{
            onEdit: async (formData, itemData) => {
              console.log('编辑文件:', formData, itemData);
            },
            onDelete: async (itemData) => {
              console.log('删除文件:', itemData);
            },
            onPreview: async (itemData) => {
              console.log('预览文件:', itemData);
            },
          }}
        />
      </Card>

      <Card title="员工简历上传">
        <List
          dataSource={[
            {
              id: "resume-zhangsan",
              filename: "张三-高级前端工程师-简历.pdf",
              date: "2024-01-18T16:45:00.000+08:00",
              userName: "张三",
            },
            {
              id: "resume-lisi",
              filename: "李四-产品经理-简历.doc",
              date: "2024-01-19T11:20:00.000+08:00",
              userName: "李四",
            },
          ]}
          apis={{
            onEdit: async (formData, itemData) => {
              console.log('编辑简历:', formData, itemData);
            },
            onDelete: async (itemData) => {
              console.log('删除简历:', itemData);
            },
            onPreview: async (itemData) => {
              console.log('预览简历:', itemData);
            },
          }}
        />
      </Card>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      apis: {
        file: {
          getUrl: {
            loader: async ({ params }) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(getPublicPath("components-core") + "/mock/resume.pdf");
                }, 600);
              });
            },
          },
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);

```

- 文件链接
- 展示 FileLink 和 useFileModal 的使用，合同文档、财务发票、政策文档预览
- _File(@components/File),remoteLoader(@kne/remote-loader),global(@components/Global),antd(antd)

```jsx
const { FileLink, useFileModal } = _File;
const { getPublicPath } = remoteLoader;
const { PureGlobal } = global;
const { Space, Card, Alert, Typography, Button, Descriptions } = antd;

const { Title, Text } = Typography;

const CustomPreviewButton = ({ children, ...props }) => {
  const modal = useFileModal(props);
  return (
    <Button type="primary" onClick={() => modal()}>
      {props.originName || children}
    </Button>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        apis: {
          file: {
            getUrl: {
              loader: async ({ params }) => {
                const mapping = {
                  "contract-001": "/avatar.png",
                  "contract-002": "/mock/resume.pdf",
                  "invoice-001": "/avatar.png",
                  "policy-001": "/mock/resume.pdf",
                };
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(getPublicPath("components-core") + (mapping[params.id] || ""));
                  }, 500);
                });
              },
            },
          },
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="文件链接示例"
          description="展示 FileLink 和 useFileModal 的使用方式"
          type="info"
          showIcon
        />

        <Card title="合同文档（FileLink）">
          <Space direction="vertical">
            <FileLink
              id="contract-001"
              originName="员工劳动合同.pdf"
            />
            <FileLink
              id="contract-002"
              originName="保密协议.docx"
            />
          </Space>
        </Card>

        <Card title="财务发票（使用 useFileModal 自定义按钮）">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="发票编号">INV-2024-0001</Descriptions.Item>
            <Descriptions.Item label="开票日期">2024-01-20</Descriptions.Item>
            <Descriptions.Item label="发票类型">增值税专用发票</Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 16 }}>
            <CustomPreviewButton
              id="invoice-001"
              originName="查看发票详情"
            />
          </div>
        </Card>

        <Card title="政策文档">
          <Space direction="vertical">
            <Text type="secondary">点击下方链接预览公司政策文档：</Text>
            <FileLink
              id="policy-001"
              originName="2024年度绩效考核管理办法.pdf"
            />
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

### API

### File 组件

File 组件用于通过 OSS ID 获取文件访问地址并展示文件内容。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| children | 渲染函数，接收 `{ url }` 参数 | Function | 是 | - |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| error | 加载失败时显示的内容 | ReactNode | 否 | null |
| loading | 加载中显示的内容 | ReactNode | 否 | null |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### Download 组件

文件下载按钮组件，支持通过 OSS ID 或 URL 下载文件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的下载地址 | string | 否* | - |
| filename | 下载后的文件名 | string | 否 | 未命名下载文件 |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| onSuccess | 下载成功回调函数 | function | 否 | - |
| onError | 下载失败回调函数 | function | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### List 组件

文件列表展示组件，支持文件预览、编辑名称、下载、删除等操作。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| dataSource | 文件数据列表 | array | 否 | [] |
| getPermission | 权限控制函数，接收 `{ type, itemData }` 参数，返回 `false` 表示无权限 | function | 否 | - |
| hasPreview | 是否启用预览功能 | boolean | 否 | true |
| infoItemRenders | 自定义列配置，数组中每项包含 `span`（栅格数）和 `render`（渲染函数） | array | 否 | - |
| renderModal | 自定义 Modal 渲染函数 | function | 否 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onEdit | 编辑文件名称回调，接收参数 `(formData, itemData)` | function | 否 | - |
| apis.onPreview | 预览文件回调，接收参数 `(itemData)` | function | 否 | - |
| apis.onDelete | 删除文件回调，接收参数 `(itemData)` | function | 否 | - |

#### dataSource 数据结构

| 属性名 | 说明 | 类型 |
|--------|------|------|
| id | 文件唯一标识符（一般为 OSS ID） | string |
| uuid | 临时文件唯一标识符 | string |
| type | 文件状态，值为 `"uploading"` 时显示上传中状态 | string |
| filename | 文件名称 | string |
| date | 上传日期（时间戳或 Date 对象） | Date \| string |
| userName | 上传人姓名 | string |

### OptionButtons 组件

文件操作按钮组，提供预览、编辑、删除等操作按钮。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| itemData | 文件数据对象 | object | 是 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onEdit | 编辑文件名称回调 | function | 否 | - |
| apis.onPreview | 预览文件回调 | function | 否 | - |
| apis.onDelete | 删除文件回调 | function | 否 | - |
| hasPreview | 是否显示预览按钮 | boolean | 否 | true |
| renderModal | 自定义 Modal 渲染函数 | function | 否 | - |

### FileLink 组件

文件链接组件，点击后弹出文件预览弹窗。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |
| children | 链接文字内容，不传则显示 `originName` | ReactNode | 否 | originName |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### downloadBlobFile 函数

下载文件的工具函数。

#### 函数签名

```typescript
downloadBlobFile(target: string | Blob, filename: string): void
```

#### 参数说明

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| target | 文件下载地址或二进制数据（Blob） | string \| Blob | 是 |
| filename | 下载后的文件名 | string | 是 |

### useDownload Hook

生成下载函数并管理下载状态的 Hook。

#### Hook 返回值

| 属性名 | 说明 | 类型 |
|--------|------|------|
| download | 执行下载的函数 | function |
| isLoading | 是否正在下载 | boolean |
| others | 其他 useFetch 返回的属性 | object |

#### Hook 参数

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的下载地址 | string | 否* | - |
| filename | 下载后的文件名 | string | 否 | - |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| onSuccess | 下载成功回调函数 | function | 否 | - |
| onError | 下载失败回调函数 | function | 否 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### useFileModal Hook

生成文件预览弹窗函数的 Hook。

#### Hook 返回值

| 属性名 | 说明 | 类型 |
|--------|------|------|
| modal | 打开文件预览弹窗的函数 | function |

#### modal 函数参数

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### FileButton 组件

文件按钮组件，点击后弹出文件预览弹窗。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |
| type | 按钮类型 | string | 否 | default |
| children | 按钮内容 | ReactNode | 是 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。
