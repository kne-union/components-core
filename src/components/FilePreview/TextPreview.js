import { useState, useEffect } from "react";
import TextEscape from "@kne/react-text-escape";
import axios from "axios";
import style from "./style.module.scss";
import { Spin } from "antd";
import classnames from "classnames";

const TextPreview = ({ url, className, maxWidth }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios.get(url).then(
      ({ data }) => {
        setText(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
  }, [url]);

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
      <div className={style["text-outer"]}>
        {error ? (
          <div className={style["error"]}>文件加载失败</div>
        ) : (
          <TextEscape text={text} />
        )}
      </div>
    </div>
  );
};

export default TextPreview;
