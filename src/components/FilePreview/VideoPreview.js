import style from "./style.module.scss";

const VideoPreview = ({ url, maxWidth, ...props }) => {
  return (
    <div
      className={style["container"]}
      style={{
        maxWidth,
      }}
    >
      <div className={style["video-inner"]}>
        <video {...props} src={url} controls />
      </div>
    </div>
  );
};

export default VideoPreview;
