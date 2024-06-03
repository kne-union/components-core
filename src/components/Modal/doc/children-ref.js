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
                示例弹框示例弹框示例弹框示例弹框示例弹框示例弹框
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
