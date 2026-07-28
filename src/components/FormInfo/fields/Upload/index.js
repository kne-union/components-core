import {Space, Flex} from "antd";
import classnames from "classnames";
import useControlValue from "@kne/use-control-value";
import style from "./style.module.scss";
import {List as FileList} from "@components/File";
import {hooks} from "@kne/react-form-antd";
import {useIntl} from '@kne/react-intl';
import omit from "lodash/omit";
import {InputFileButton, useFileUpload} from "@common/hocs/withInputFile";
import withLocale from "@components/FormInfo/withLocale";

const {useOnChange} = hooks;

const UploadField = withLocale((p) => {
    const {formatMessage} = useIntl();
    const {
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
        onUpload,
        getPermission,
        concurrentCount,
        ...props
    } = Object.assign({}, {
        defaultValue: [],
        children: formatMessage({id: 'uploadButtonText'}),
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
            ".eml",
            ".zip",
        ],
        renderTips: (defaultTips) => {
            return defaultTips;
        },
        multiple: true,
        showUploadList: true,
        maxLength: 10,
        fileSize: 30,
        concurrentCount: 10
    }, p);
    const [propsValue, onChange] = useControlValue(props);
    const value = propsValue || [];
    const {fileList: uploadingList, onFileSelected} = useFileUpload({
        multiple,
        onSave,
        onUpload: ossUpload || onUpload,
        fileSize,
        maxLength,
        value,
        onChange,
        concurrentCount,
    });
    const previewFileList = [...uploadingList, ...value];
    const tipsText = renderTips(formatMessage({id: 'uploadTips'}, {
            extensionNames: accept
                .map((str) => str.replace(/^\./, ""))
                .join(","), maxLength, fileSize
        }),
        {
            fileSize,
            maxLength,
            accept,
        }
    );

    return (
        <Space direction="vertical">
            <Flex align="start" gap={8} vertical>
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
            </Flex>
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
                            // FileList passes a copied item ({...item, index}); index is against previewFileList
                            const newList = value.slice(0);
                            const valueIndex =
                                typeof target.index === "number"
                                    ? target.index - uploadingList.length
                                    : -1;
                            if (valueIndex >= 0 && valueIndex < newList.length) {
                                newList.splice(valueIndex, 1);
                                onChange(newList);
                                return;
                            }
                            onChange(
                                value.filter((item) => {
                                    if (target.uuid && item.uuid) {
                                        return item.uuid !== target.uuid;
                                    }
                                    if (target.id && item.id) {
                                        return item.id !== target.id;
                                    }
                                    if (target.src && item.src) {
                                        return item.src !== target.src;
                                    }
                                    return item !== target;
                                })
                            );
                        },
                    }}
                />
            )}
        </Space>
    );
});

const Upload = ({interceptor = "file-format", ...props}) => {
    const render = useOnChange({interceptor, ...props});
    return render(UploadField);
};

Upload.Field = UploadField;

export default Upload;
