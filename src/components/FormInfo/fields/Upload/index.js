import {Space} from "antd";
import classnames from "classnames";
import useControlValue from "@kne/use-control-value";
import style from "./style.module.scss";
import {List as FileList} from "@components/File";
import {hooks} from "@kne/react-form-antd";
import {createWithIntl, useIntl} from '@components/Intl';
import omit from "lodash/omit";
import {InputFileButton, useFileUpload} from "@common/hocs/withInputFile";
import importMessages from "@components/FormInfo/locale";

const {useOnChange} = hooks;

const UploadField = createWithIntl({
    importMessages, moduleName: 'FormInfo'
})((p) => {
    const {formatMessage} = useIntl({moduleName: "FormInfo"});
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
            <div align="start">
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
            </div>
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
});

const Upload = (props) => {
    const render = useOnChange(props);
    return render(UploadField);
};

Upload.defaultProps = {
    interceptor: "file-format",
};

Upload.Field = UploadField;

export default Upload;
