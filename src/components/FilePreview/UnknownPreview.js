import { Result } from "antd";
import style from "./style.module.scss";

const UnknownPreview = ({ maxWidth }) => {
  return (
    <div
      className={style["container"]}
      style={{
        maxWidth,
      }}
    >
      <div className={style["text-outer"]}>
        <Result
          status="500"
          title="不支持的文件类型"
          subTitle="系统不支持该文件类型预览，请下载到本地后进行预览"
        />
      </div>
    </div>
  );
};

export default UnknownPreview;
