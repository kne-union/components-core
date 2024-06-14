import { useState, useMemo, useEffect } from "react";
import get from "lodash/get";
import { App, Space, Divider, Empty } from "antd";
import Title from "./Title";
import DragArea, { DragAreaOuter, DragButton, UploadButton } from "./DragArea";
import { List } from "@components/File";
import FilePreview from "@components/FilePreview";
import { useIntl, FormattedMessage, IntlProvider } from "@components/Intl";
import { useFileUpload } from "@common/hocs/withInputFile";
import { usePreset } from "@components/Global";
import importMessages from "./locale";
import style from "./style.module.scss";

const FileListInner = ({
  maxLength,
  list: previewList,
  setList,
  defaultTab,
  defaultPreviewFileId,
  apis: currentApis,
  getPermission,
  titleExtra,
  fileSize,
  accept,
  getPopupContainer,
}) => {
  const { apis: baseApis } = usePreset();
  const apis = Object.assign({}, baseApis, currentApis);
  const { fileList: uploadingList, onFileSelected } = useFileUpload({
    maxLength,
    multiple: true,
    value: previewList,
    onChange: setList,
    concurrentCount: 1,
    onAdd: () => {
      setCurrentTab("list");
    },
    onSave: apis.onSave,
    ossUpload: apis.ossUpload,
  });
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const { formatMessage } = useIntl({ moduleName: "FileList" });
  const { message } = App.useApp();
  const previewMap = useMemo(() => {
    return new Map(
      previewList.map((item) => {
        return [item.ossId, item];
      })
    );
  }, [previewList]);
  const [currentPreviewFileId, setCurrentPreviewFileId] = useState(
    defaultPreviewFileId || get(previewList, "[0].ossId", null)
  );
  useEffect(() => {
    if (currentPreviewFileId && previewMap.get(currentPreviewFileId)) {
      return;
    }
    setCurrentPreviewFileId(get(previewList, "[0].ossId", null));
  }, [previewList, previewMap, currentPreviewFileId]);
  const itemApis = {
    onPreview: (item) => {
      setCurrentPreviewFileId(item.ossId);
      setCurrentTab("preview");
    },
    onDelete: async (item) => {
      apis.onDelete && (await apis.onDelete(item));
      setList((list) => {
        const newList = list.slice(0);
        const index = list.findIndex(({ ossId }) => ossId === item.ossId);
        index > -1 && newList.splice(index, 1);
        return newList;
      });
      message.success(
        formatMessage({ id: "successDelete" }, { name: item.filename })
      );
    },
    onEdit: async ({ formData, item }) => {
      apis.onEdit && (await apis.onEdit({ formData, item }));
      setList((list) => {
        const newList = list.slice(0);
        const index = list.findIndex(({ ossId }) => ossId === item.ossId);
        index > -1 &&
          newList.splice(
            index,
            1,
            Object.assign({}, item, { filename: formData.name })
          );
        return newList;
      });
      message.success(
        formatMessage({ id: "successEditFileName" }, { name: item.filename })
      );
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
          <Space split={<Divider type="vertical" />}>
            {titleExtraInner}
            {getPermission("add", {}) ? (
              <>
                <DragButton>
                  <FormattedMessage id="dragText" moduleName="FileList" />
                </DragButton>
                <UploadButton>
                  <FormattedMessage id="uploadFile" moduleName="FileList" />
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
          dataSource={[...uploadingList, ...previewList]}
          getPermission={getPermission}
          apis={itemApis}
        />
      ) : null}
      {currentTab === "preview" ? (
        currentPreviewFileId ? (
          <div className={style["file-preview-inner"]}>
            <FilePreview
              className={style["file-preview"]}
              id={currentPreviewFileId}
              apis={apis}
              originName={previewMap.get(currentPreviewFileId)?.filename}
            />
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="ant-empty-normal"
          />
        )
      ) : null}
      <DragArea />
    </DragAreaOuter>
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
