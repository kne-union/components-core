import style from "./style.module.scss";
import classnames from "classnames";
import { useMemo, useRef, useState } from "react";
import { App, Button, Typography } from "antd";
import { usePreset } from "@components/Global";
import createDeferred from "@common/utils/createDeferred";
import uniqueId from "lodash/uniqueId";

const withInputFile = (WrappedComponent) => {
  return ({ className, accept, multiple, onChange, children, ...props }) => {
    const ref = useRef(null);
    const resetFileInput = () => {
      ref.current.setAttribute("type", "text");
      ref.current.setAttribute("type", "file");
    };
    return (
      <WrappedComponent
        {...props}
        className={classnames(className, style["input-file"])}
      >
        {children}
        {props.disabled !== true && (
          <input
            ref={ref}
            type="file"
            accept={accept}
            multiple={multiple}
            className={style["input-file-input"]}
            onChange={(e) => {
              const fileList = [].slice.call(e.target.files, 0);
              if (fileList.length === 0) {
                return;
              }
              resetFileInput();
              onChange(fileList);
            }}
          />
        )}
      </WrappedComponent>
    );
  };
};

export const InputFileButton = withInputFile(Button);

export const InputFileLink = withInputFile(({ className, ...props }) => {
  return <Typography.Link {...props} className={className} />;
});

export const InputFileText = withInputFile(({ className, ...props }) => {
  return (
    <Typography.Text {...props} className={classnames("ant-btn", className)} />
  );
});

export const useFileUpload = (props) => {
  const { message } = App.useApp();
  const {
    multiple,
    fileSize,
    maxLength,
    value,
    concurrentCount,
    onAdd,
    onError,
    onSave,
    onChange,
    ossUpload: ossCustomUpload,
  } = Object.assign(
    {},
    {
      concurrentCount: 1,
      value: [],
    },
    props
  );
  const { apis } = usePreset();
  const [uploadingList, setUploadingList] = useState([]);
  const concurrentCountRef = useRef(concurrentCount);
  const deferred = useMemo(() => {
    return createDeferred(concurrentCountRef.current);
  }, []);
  return {
    fileList: uploadingList,
    onFileSelected: async (fileList) => {
      const allowCount = maxLength - value.length;
      if (
        !(maxLength === 1 || multiple !== true) &&
        fileList.length > allowCount
      ) {
        message.error(`上传文件不能超过最大允许数量${maxLength}`);
        return;
      }
      await Promise.allSettled(
        fileList.map(async (file) => {
          if (file.size > fileSize * 1024 * 1024) {
            message.error(`文件${file.name}不能超过${fileSize}MB!`);
            return;
          }
          const uuid = uniqueId();
          const catchError = (e) => {
            const errMsg =
              e.message ||
              `文件${file.name}上传错误${e.message ? ":" + e.message : ""}`;
            message.error(errMsg);
            onError && onError({ file, error: e, errMsg });
            setUploadingList((list) => {
              const newList = list.slice(0);
              const index = newList.findIndex((item) => item.uuid === uuid);
              index > -1 && newList.splice(index, 1);
              return newList;
            });
          };

          try {
            if (maxLength === 1 || multiple !== true) {
              setUploadingList([
                {
                  uuid,
                  type: "uploading",
                  filename: file.name,
                },
              ]);
            } else {
              setUploadingList((list) => {
                const newList = list.slice(0);
                newList.unshift({
                  uuid,
                  type: "uploading",
                  filename: file.name,
                });
                return newList;
              });
            }
            onAdd && (await Promise.resolve(onAdd(file)));
            const uploadFun = ossCustomUpload
              ? ossCustomUpload
              : apis.ossUpload;
            const { data } = await deferred(() => uploadFun({ file }));

            if (data.code !== 0) {
              catchError(
                new Error(
                  `文件${file.name}上传异常${data.msg ? ":" + data.msg : ""}`
                )
              );
              return;
            }

            const outputData = onSave
              ? await Promise.resolve(onSave(data, file, uuid))
              : {
                  filename: data.data.originalName || file.name,
                  id: data.data.id,
                  ossId: data.data.id,
                  uuid,
                };

            setUploadingList((list) => {
              const newList = list.slice(0);
              const index = newList.findIndex((item) => item.uuid === uuid);
              index > -1 && newList.splice(index, 1);
              return newList;
            });
            if (maxLength === 1 || multiple !== true) {
              onChange([outputData]);
            } else {
              onChange((list) => {
                const newList = list.slice(0);
                newList.push(outputData);
                return newList;
              });
            }
          } catch (e) {
            catchError(e);
          }
        })
      );
    },
  };
};

export default withInputFile;
