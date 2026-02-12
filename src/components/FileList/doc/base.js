const { default: FileList } = _FileList;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { useState } = React;
const { uniqueId } = lodash;

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
          const mapping = {
            "resume-zhangsan": "/mock/resume.pdf",
            "contract-employee": "/avatar.png",
            "policy-2024": "/mock/resume.pdf",
          };
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(getPublicPath("components-core") + mapping[params.id] || "");
            }, 100);
          });
        },
      },
    },
    previewOffice: {
      loader: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              name: "员工入职登记表.docx",
              data: [
                {
                  id: "doc-preview-001",
                  originalName: "preview.pdf",
                  url: getPublicPath("components-core") + "/mock/resume.pdf",
                },
              ],
            });
          }, 0);
        });
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
  const [list, setList] = useState([
    {
      id: "resume-zhangsan",
      filename: "张三-高级前端工程师-简历.pdf",
      date: "2024-01-15T10:30:00.000+08:00",
      userName: "张三",
    },
    {
      id: "contract-employee",
      filename: "劳动合同模板.docx",
      date: "2024-01-16T14:20:00.000+08:00",
      userName: "李四",
    },
    {
      id: "policy-2024",
      filename: "2024年度绩效考核管理办法.pdf",
      date: "2024-01-17T09:15:00.000+08:00",
      userName: "王五",
    },
  ]);
  return (
    <PureGlobal preset={preset}>
      <FileList
        defaultPreviewFileId="resume-zhangsan"
        list={list}
        setList={setList}
        apis={apis}
        titleExtra={({ currentTab, currentPreviewFileId }) => (
          <span style={{ fontSize: '12px', color: '#999' }}>
            {currentTab === 'preview' ? '预览模式' : '列表模式'}
            {currentPreviewFileId && ` | 当前: ${list.find(f => f.id === currentPreviewFileId)?.filename}`}
          </span>
        )}
      />
    </PureGlobal>
  );
});

render(<BaseExample />);
