const { PdfPreview } = _FilePreview;
const BaseExample = () => {
  return (
    <PdfPreview
      maxWidth={900}
      url={`/ui_components/components-core/1.0.0/mock/1_王晶简历-2023_06_2.pdf`}
      renderTextLayer={true}
    />
  );
};

render(<BaseExample />);
