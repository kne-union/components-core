const { FileUpload } = _FileList;
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
    const id = uniqueId();
    return {
      ossId: id,
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
  return (
    <PureGlobal preset={preset}>
      <FileUpload list={list} setList={setList} apis={apis} />
      <div>非受控情况</div>
      <FileUpload
        setList={(fileList) => {
          console.log(">>>>>>>>>>", fileList);
        }}
        apis={apis}
      />
    </PureGlobal>
  );
});

render(<BaseExample />);
