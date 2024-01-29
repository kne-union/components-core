const { default: FilePreview, HtmlPreview } = _FilePreview;
const BaseExample = () => {
  return (
    <HtmlPreview
      maxWidth={900}
      url="/ui_components/components-core/1.0.0/mock/demo2.html"
    />
  );
};

render(<BaseExample />);
