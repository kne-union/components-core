import { Space } from "antd";
import classnames from "classnames";
import useControlValue from "@kne/use-control-value";
import style from "./style.module.scss";
import Icon from "@components/Icon";
import { List as FileList } from "@components/File";
import { hooks } from "@kne/react-form-antd";
import omit from "lodash/omit";
import { InputFileButton, useFileUpload } from "@common/hocs/withInputFile";

const { useOnChange } = hooks;

const UploadField = ({
  className,
  fileSize,
  maxLength,
  multiple,
  size,
  accept,
  children,
  renderTips,
  showUploadList,
  onSave,
  ossUpload,
  getPermission,
  ...props
}) => {
  const [propsValue, onChange] = useControlValue(props);
  const value = propsValue || [];
  const { fileList: uploadingList, onFileSelected } = useFileUpload({
    multiple,
    onSave,
    ossUpload,
    fileSize,
    maxLength,
    value,
    onChange,
    concurrentCount: 10,
  });
  const previewFileList = [...uploadingList, ...value];

  const tipsText = renderTips(
    `支持扩展名${accept
      .map((str) => str.replace(/^\./, ""))
      .join("、")},单个文件大小不超过${fileSize}M，最多上传${maxLength}个附件`,
    {
      fileSize,
      maxLength,
      accept,
    }
  );

  return (
    <Space direction="vertical">
      <Space>
        <InputFileButton
          {...omit(props, ["value", "onChange"])}
          size={size}
          multiple={multiple}
          accept={accept}
          className={classnames(style["upload"], className)}
          onChange={onFileSelected}
        >
          {children}
        </InputFileButton>
        {tipsText && <div className={style["tips"]}>{tipsText}</div>}
      </Space>
      {showUploadList && previewFileList.length > 0 && (
        <FileList
          className={style["upload-list"]}
          dataSource={previewFileList}
          infoItemRenders={[]}
          getPermission={
            getPermission
              ? getPermission
              : (type) => {
                  return type === "delete";
                }
          }
          apis={{
            onDelete: (target) => {
              const newList = value.slice(0);
              const index = newList.indexOf(target);
              index > -1 && newList.splice(index, 1);
              onChange(newList);
            },
          }}
        />
      )}
    </Space>
  );
};

UploadField.defaultProps = {
  defaultValue: [],
  children: (
    <>
      <Icon type="icon-shangchuanfujian" />
      上传附件
    </>
  ),
  accept: [
    ".pdf",
    ".jpg",
    ".png",
    ".jpeg",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".html",
    ".msg",
    ".zip",
  ],
  renderTips: (defaultTips) => {
    return defaultTips;
  },
  multiple: true,
  showUploadList: true,
  maxLength: 10,
  fileSize: 30,
};

const Upload = (props) => {
  const render = useOnChange(props);
  return render(UploadField);
};

Upload.defaultProps = {
  interceptor: "file-format",
};

Upload.Field = UploadField;

export default Upload;
