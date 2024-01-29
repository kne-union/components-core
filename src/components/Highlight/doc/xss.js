const { default: Highlight, HighlightProvider } = _Highlight;
const BaseExample = () => {
  const str = '<img src="/aaaa"/>';
  return (
    <HighlightProvider list={["哈", "呃呃"]}>
      <Highlight>哈哈哈西西西西呃呃呃{str}</Highlight>
    </HighlightProvider>
  );
};

render(<BaseExample />);
