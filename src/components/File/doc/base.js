const { default: File } = _File;
const { PureGlobal } = global;
const BaseExample = () => {
  return <File id="qqq">{({ url }) => url}</File>;
};

render(
  <PureGlobal
    preset={{
      apis: {
        oss: {
          loader: async ({ params }) => {
            console.log(params);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(window.PUBLIC_URL + "/avatar.png");
              }, 1000);
            });
          },
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);
