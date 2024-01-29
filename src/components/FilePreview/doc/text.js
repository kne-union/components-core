const { TextPreview } = _FilePreview;
const BaseExample = () => {
  return (
    <TextPreview
      maxWidth={900}
      url="/ui_components/components-core/1.0.0/mock/demo.txt"
    />
  );
};

render(<BaseExample />);
