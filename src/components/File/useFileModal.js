import { useModal } from "@components/Modal";
import FilePreview from "@components/FilePreview";
import Download from "./Download";
import { App, Space } from "antd";
import { useCallback } from "react";
import style from "./style.module.scss";

const useFileModal = () => {
  const modal = useModal();
  const { message } = App.useApp();
  return useCallback(
    ({ title, id, originName, apis, openDownload = true, ...modalProps }) => {
      return modal(
        Object.assign(
          {
            footer: null,
          },
          modalProps,
          {
            title: (
              <Space size={10} className={style["file-title"]}>
                <span className={style["ellipse"]}>{title || originName}</span>
                {openDownload && (
                  <Download
                    className="btn-no-padding"
                    type="link"
                    id={id}
                    apis={apis}
                    filename={originName}
                    onSuccess={() => {
                      message.success("下载成功");
                    }}
                  />
                )}
              </Space>
            ),
            children: (
              <div className={style["file-modal-outer"]}>
                <FilePreview id={id} originName={originName} apis={apis} />
              </div>
            ),
          }
        )
      );
    },
    [modal, message]
  );
};

export default useFileModal;
