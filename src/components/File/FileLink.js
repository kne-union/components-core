import { Typography } from "antd";
import useFileModal from "./useFileModal";

const FileLink = ({
  id,
  originName,
  openDownload,
  children,
  modalProps,
  ...props
}) => {
  const modal = useFileModal();
  return (
    <Typography.Link
      {...props}
      onClick={() => {
        modal({ ...modalProps, id, originName, openDownload });
      }}
    >
      {children || originName}
    </Typography.Link>
  );
};

FileLink.defaultProps = {
  openDownload: true,
};

export default FileLink;
