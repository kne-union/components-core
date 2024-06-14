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
      ossId: uniqueId(),
      filename: data.originalName,
      date: new Date(),
      userName: "哈哈哈",
    };
  },
  onDelete: () => {},
};

const preset = {
  apis: {
    oss: {
      loader: async ({ params }) => {
        const mapping = {
          "01": "/avatar.png",
          "02": "/mock/demo.html",
          "03": "/mock/1_王晶简历-2023_06_2.pdf",
        };
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(getPublicPath("components-core") + mapping["03"]);
          }, 1000);
        });
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
                    "/mock/1_王晶简历-2023_06_2.pdf",
                },
              ],
            });
          }, 1000);
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
      ossId: "uBFNeYQBnHRXlZaTGZpA",
      filename: "avatar.pdf",
    },
    {
      ossId: "gWw26Y0BeK_D6zxND5vh",
      filename: "测试开发_夏永昱_本科_5年.docx",
    },
  ]);
  console.log(list);
  return (
    <PureGlobal preset={preset}>
      <FileList
        defaultPreviewFileId="gWw26Y0BeK_D6zxND5vh"
        list={list}
        setList={setList}
        apis={apis}
      />
    </PureGlobal>
  );
});

render(<BaseExample />);
