import {Space, Divider, Row, Col} from "antd";
import DragArea, {DragAreaOuter, DragButton, UploadButton} from "./DragArea";
import {List} from "@components/File";
import {useFileUpload} from "@kne/react-file";
import {usePreset} from "@components/Global";
import useControlValue from "@kne/use-control-value";
import get from "lodash/get";

const FileUpload = ({
                        maxLength,
                        apis: currentApis,
                        getPermission,
                        fileSize,
                        accept,
                        ...props
                    }) => {
    const {apis: baseApis} = usePreset();
    const apis = Object.assign({}, baseApis, currentApis);
    const [previewList, setList] = useControlValue(props, {
        defaultValue: "defaultList",
        value: "list",
        onChange: "setList",
    });
    const {fileList: uploadingList, onFileSelected} = useFileUpload({
        maxLength,
        multiple: true,
        value: previewList,
        onChange: setList,
        concurrentCount: 1,
        onSave: async (response, ...args) => {
            if (typeof apis.onSave === "function") {
                const res = await apis.onSave(response, ...args);
                return Object.assign({}, {id: res?.ossId}, res);
            }
            return get(response, 'data') || {};
        },
        onUpload: apis.ossUpload,
    });
    return (
        <DragAreaOuter
            title={
                <Row>
                    <Col flex={1}></Col>
                    <Col>
                        <Space split={<Divider type="vertical"/>}>
                            <DragButton/>
                            <UploadButton>上传</UploadButton>
                        </Space>
                    </Col>
                </Row>
            }
            fileSize={fileSize}
            maxLength={maxLength}
            onFileSelected={onFileSelected}
            accept={accept}
        >
            <List
                dataSource={[...uploadingList, ...previewList]}
                getPermission={getPermission}
                apis={apis}
            />
            <DragArea/>
        </DragAreaOuter>
    );
};

FileUpload.defaultProps = {
    accept: [".png", ".jpg", ".pdf", ".docx", ".doc"],
    defaultList: [],
    fileSize: 20,
    maxLength: Number.MAX_VALUE,
    getPermission: () => true,
};

export default FileUpload;
