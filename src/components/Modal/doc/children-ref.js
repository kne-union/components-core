const { default: Modal, useModal } = _Modal;
const { Button } = antd;
const BaseExample = () => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        modal({
          title: "示例弹框",
          children: ({ childrenRef }) => {
            return (
              <div ref={childrenRef}>
                这是使用childrenRef的示例弹窗内容，展示了如何通过ref获取子组件的DOM引用。
              </div>
            );
          },
          onConfirm: (e, { childrenRef }) => {
            console.log(childrenRef.current);
          },
        });
      }}
    >
      点击弹出弹框
    </Button>
  );
};

render(<BaseExample />);
