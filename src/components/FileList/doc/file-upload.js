const { FileUpload } = _FileList;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { useState } = React;
const { uniqueId } = lodash;
const { Space, Typography, Alert } = antd;

const { Text } = Typography;

const ajax = {
  postForm: (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 0,
            data: {
              id: "uBFNeYQBnHRXlZaTGZpA",
              originalName: config.file.name,
            },
          },
        });
      }, 800);
    });
  },
};

const apis = {
  onSave: async ({ data }) => {
    return {
      ossId: uniqueId("oss_"),
      filename: data.originalName,
      date: new Date(),
      userName: "张三",
    };
  },
  onDelete: (item) => {
    console.log('删除文件:', item);
  },
};

const preset = {
  apis: {
    file: {
      getUrl: {
        loader: async ({ params }) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(getPublicPath("components-core") + "/avatar.png");
            }, 500);
          });
        },
      },
    },
    ossUpload: ({ file }) => {
      return ajax.postForm({ file });
    },
  },
};

const BaseExample = createWithRemoteLoader({
  modules: ["components-core:Global@PureGlobal"],
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  const [list, setList] = useState([]);
  const [uncontrolledList, setUncontrolledList] = useState([]);

  return (
    <PureGlobal preset={preset}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="文件上传示例"
          description="展示受控和非受控模式的文件上传功能"
          type="info"
          showIcon
        />

        <div>
          <Text strong>受控模式：</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            通过 list 和 setList 完全控制文件列表
          </Text>
          <FileUpload
            list={list}
            setList={setList}
            apis={apis}
            fileSize={10}
            maxLength={5}
          />
          <div style={{ marginTop: 8, padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
            <Text type="secondary">当前文件数量：{list.length}</Text>
          </div>
        </div>

        <div>
          <Text strong>非受控模式：</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            只通过 setList 接收变化，不传入 list
          </Text>
          <FileUpload
            setList={(fileList) => {
              setUncontrolledList(fileList);
            }}
            apis={apis}
            fileSize={10}
          />
          <div style={{ marginTop: 8, padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
            <Text type="secondary">当前文件数量：{uncontrolledList.length}</Text>
          </div>
        </div>
      </Space>
    </PureGlobal>
  );
});

render(<BaseExample />);
