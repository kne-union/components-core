const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "test",
              content:
                "哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈",
              url: "/xxxx",
            },
          ],
        },
      }}
    >
      <HelperGuide name="test" />
    </PureGlobal>
  );
};

render(<BaseExample />);
