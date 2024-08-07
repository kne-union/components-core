import style from "./style.module.scss";

const AudioPreview = ({ url, maxWidth, ...props }) => {
  return (
    <div
      className={style["container"]}
      style={{
        maxWidth,
      }}
    >
      <div className={style["audio-inner"]}>
        <audio {...props} src={url} controls />
      </div>
    </div>
  );
};

export default AudioPreview;
