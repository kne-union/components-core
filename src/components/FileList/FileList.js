import {useState, useMemo, useEffect} from "react";
import get from "lodash/get";
import {App, Space, Divider, Empty} from "antd";
import Title from "./Title";
import DragArea, {DragAreaOuter, DragButton, UploadButton} from "./DragArea";
import {List} from "@components/File";
import FilePreview from "@components/FilePreview";
import {useIntl, FormattedMessage, IntlProvider} from "@components/Intl";
import {useFileUpload} from "@kne/react-file";
import {usePreset} from "@components/Global";
import importMessages from "./locale";
import style from "./style.module.scss";

const FileListInner = ({
                           className,
                           maxLength,
                           list: _previewList,
                           setList,
                           infoItemRenders,
                           defaultTab,
                           defaultPreviewFileId,
                           apis: currentApis,
                           getPermission,
                           titleExtra,
                           fileSize,
                           accept,
                           getPopupContainer,
                       }) => {
    const {apis: baseApis} = usePreset();
    const apis = Object.assign({}, baseApis, currentApis);

    const previewList = (_previewList || []).map((item) => {
        return Object.assign({}, {id: item.ossId}, item);
    });

    const {fileList: uploadingList, onFileSelected} = useFileUpload({
        maxLength,
        multiple: true,
        value: previewList,
        onChange: setList,
        concurrentCount: 1,
        onAdd: () => {
            setCurrentTab("list");
        },
        onSave: async (response, ...args) => {
            if (typeof apis.onSave === "function") {
                const res = await apis.onSave(response, ...args);
                return Object.assign({}, {id: res?.ossId}, res);
            }
            return get(response, 'data') || {};
        },
        onUpload: apis.onUpload || apis.ossUpload,
    });
    const [currentTab, setCurrentTab] = useState(defaultTab);
    const {formatMessage} = useIntl({moduleName: "FileList"});
    const {message} = App.useApp();
    const previewMap = useMemo(() => {
        return new Map(
            previewList.map((item) => {
                return [item.id, item];
            })
        );
    }, [previewList]);
    const [currentPreviewFileId, setCurrentPreviewFileId] = useState(
        defaultPreviewFileId || get(previewList, "[0].id", null)
    );
    useEffect(() => {
        if (currentPreviewFileId && previewMap.get(currentPreviewFileId)) {
            return;
        }
        setCurrentPreviewFileId(get(previewList, "[0].id", null));
    }, [previewList, previewMap, currentPreviewFileId]);
    const itemApis = {
        ...apis,
        onPreview: (item) => {
            setCurrentPreviewFileId(item.id);
            setCurrentTab("preview");
        },
        onDelete: async (item) => {
            if (apis.onDelete && (await apis.onDelete(item)) === false) {
                return;
            }
            setList((list) => {
                const newList = list.slice(0);
                const index = list.findIndex(({id}) => id === item.id);
                index > -1 && newList.splice(index, 1);
                return newList;
            });
            message.success(
                formatMessage({id: "successDelete"}, {name: item.filename})
            );
        },
        onEdit: async ({formData, item}) => {
            const res = apis.onEdit && (await apis.onEdit({formData, item}));
            if (res !== false) {
                setList((list) => {
                    const newList = list.slice(0);
                    const index = list.findIndex(({id}) => id === item.id);
                    index > -1 &&
                    newList.splice(
                        index,
                        1,
                        Object.assign({}, item, {filename: formData.name})
                    );
                    return newList;
                });
                message.success(
                    formatMessage({id: "successEditFileName"}, {name: item.filename})
                );
            }

            return res;
        },
    };

    const titleExtraInner =
        typeof titleExtra === "function"
            ? titleExtra({
                currentPreviewFileId,
                currentTab,
            })
            : titleExtra;

    return (
        <div className={className}>
            <DragAreaOuter
                title={
                    <Title
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        previewMap={previewMap}
                        previewList={previewList}
                        getPermission={getPermission}
                        currentPreviewFileId={currentPreviewFileId}
                        setCurrentPreviewFileId={setCurrentPreviewFileId}
                        itemApis={itemApis}
                        getPopupContainer={getPopupContainer}
                    >
                        <Space split={<Divider type="vertical"/>}>
                            {titleExtraInner}
                            {getPermission("add", {}) ? (
                                <>
                                    <DragButton>
                                        <FormattedMessage id="dragText" moduleName="FileList"/>
                                    </DragButton>
                                    <UploadButton>
                                        <FormattedMessage id="uploadFile" moduleName="FileList"/>
                                    </UploadButton>
                                </>
                            ) : null}
                        </Space>
                    </Title>
                }
                fileSize={fileSize}
                maxLength={maxLength}
                onFileSelected={onFileSelected}
                accept={accept}
            >
                {currentTab === "list" ? (
                    <List
                        dataSource={[...previewList, ...uploadingList]}
                        getPermission={getPermission}
                        apis={itemApis}
                        infoItemRenders={infoItemRenders}
                    />
                ) : null}
                {currentTab === "preview" ? (
                    currentPreviewFileId ? (
                        <div className={style["file-preview-inner"]}>
                            <FilePreview
                                className={style["file-preview"]}
                                src={previewMap.get(currentPreviewFileId)?.src}
                                id={currentPreviewFileId}
                                apis={apis}
                                filename={previewMap.get(currentPreviewFileId)?.filename}
                            />
                        </div>
                    ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            className="ant-empty-normal"
                        />
                    )
                ) : null}
                <DragArea/>
            </DragAreaOuter>
        </div>
    );
};

FileListInner.defaultProps = {
    defaultTab: "list",
    titleExtra: null,
    accept: [".png", ".jpg", ".pdf", ".docx", ".doc"],
    fileSize: 20,
    maxLength: Number.MAX_VALUE,
    getPermission: () => true,
};

const FileList = (props) => {
    return (
        <IntlProvider importMessages={importMessages} moduleName="FileList">
            <FileListInner {...props} />
        </IntlProvider>
    );
};

export default FileList;
