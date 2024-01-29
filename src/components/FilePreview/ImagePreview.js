import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Spin } from "antd";
import classnames from "classnames";

const ImagePreview = ({ url, scale, rotate, className, maxWidth }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.src = url;
    const handlerLoad = () => {
      setLoading(false);
    };

    const handlerError = () => {
      setLoading(false);
      setError(true);
    };

    image.addEventListener("load", handlerLoad);
    image.addEventListener("error", handlerError);
    return () => {
      image.removeEventListener("load", handlerLoad);
      image.removeEventListener("error", handlerError);
    };
  }, [url, scale, rotate]);
  return (
    <div
      className={classnames(className, style["container"])}
      style={{
        maxWidth,
      }}
    >
      {loading ? (
        <div className={style["loading"]}>
          <Spin />
        </div>
      ) : null}
      {error ? (
        <div className={style["error"]}>图片加载失败</div>
      ) : (
        <img src={url} alt="简历预览" />
      )}
    </div>
  );
};

export default ImagePreview;
