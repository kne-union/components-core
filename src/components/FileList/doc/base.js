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
      }, 1000);
    });
  },
};

const apis = {
  onSave: async ({ data }) => {
    return {
      ossId: uniqueId("oss_"),
      filename: data.originalName,
      date: new Date(),
      userName: "哈哈哈",
    };
  },
  onDelete: (item) => {},
};

const preset = {
  apis: {
    file: {
      getUrl: {
        loader: async ({ params }) => {
          const mapping = {
            "01": "/avatar.png",
            "02": "/mock/resume.pdf",
            "03": "/mock/resume.pdf",
          };
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(getPublicPath("components-core") + mapping["03"]);
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
              name: "测试开发_夏永昱_本科_5年.docx",
              data: [
                {
                  id: "gWw26Y0BeK_D6zxND5vh",
                  originalName: "attachment/gWw26Y0BeK_D6zxND5vh.pdf",
                  url:
                    getPublicPath("components-core") +
                    "/mock/resume.pdf",
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
      id: "1",
      filename: "avatar.pdf",
    },
    {
      id: "2",
      filename: "测试开发_夏永昱_本科_5年.docx",
    },
  ]);
  return (
    <PureGlobal preset={preset}>
      <FileList
        defaultPreviewFileId="1"
        list={list}
        setList={setList}
        apis={apis}
      />
    </PureGlobal>
  );
});

render(<BaseExample />);
