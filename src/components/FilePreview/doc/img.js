const { ImagePreview } = _FilePreview;
const BaseExample = () => {
  return (
    <ImagePreview
      url={`/ui_components/components-core/1.0.0/mock/demo2.jpg`}
      renderTextLayer={true}
    />
  );
};

render(<BaseExample />);
