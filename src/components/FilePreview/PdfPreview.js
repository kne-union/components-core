import { memo, useState } from "react";
import { Space, Spin } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import style from "./style.module.scss";
import { useResize } from "@components/Common";
import { getPublicPath } from "@kne/remote-loader";
import classnames from "classnames";

const PdfPreview = memo(({ url, maxWidth, scale, rotate, className }) => {
  const [numPages, setNumPages] = useState(0);
  pdfjs.GlobalWorkerOptions.workerSrc =
    getPublicPath("components-core") + "/pdfjs/build/pdf.worker.js";
  const [width, setWidth] = useState(maxWidth);
  const ref = useResize(() => {
    if (ref.current && ref.current.clientWidth) {
      setWidth(Math.min(ref.current.clientWidth, maxWidth));
    }
  });

  return (
    <div
      ref={ref}
      className={classnames(className, style["container"])}
      style={{
        maxWidth: maxWidth,
      }}
    >
      <Document
        file={{ url }}
        options={{
          standardFontDataUrl:
            getPublicPath("components-core") + "/pdfjs/standard_fonts/",
          cMapUrl: getPublicPath("components-core") + "/pdfjs/cmaps/",
          cMapPacked: true,
        }}
        error="PDF文件加载失败"
        loading={
          <div className={style["loading"]}>
            <Spin />
          </div>
        }
        noData="未指定PDF文件"
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          console.log("onLoadSuccess");
        }}
        onLoadError={(props) => {
          console.log("onLoadError", props);
        }}
        onSourceError={(props) => {
          console.log("onSourceError", props);
        }}
      >
        <Space direction="vertical">
          {numPages >= 1 &&
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index}`}
                className="preview-item"
                scale={scale / 100}
                rotate={rotate}
                pageNumber={index + 1}
                width={width}
                loading={null}
                renderAnnotationLayer={false}
                renderTextLayer={true}
                noData="未指定页面"
              />
            ))}
        </Space>
      </Document>
    </div>
  );
});

PdfPreview.defaultProps = {
  autoSize: true,
  renderTextLayer: false,
  scale: 100,
  rotate: 0,
  maxWidth: 1200,
};

export default PdfPreview;
