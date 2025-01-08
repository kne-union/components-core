import {forwardRef, useLayoutEffect, useRef, useState} from "react";
import withInputFile, {InputFileLink} from "@common/hocs/withInputFile";
import Image from "@components/Image";
import {usePreset} from "@components/Global";
import {useModal} from "@components/Modal";
import Icon from "@components/Icon";
import {
    Avatar as AntdAvatar,
    Col,
    message,
    Row,
    Slider,
    Space,
    Spin,
    Tooltip,
} from "antd";
import AvatarEditor from "react-avatar-editor";
import get from "lodash/get";
import classnames from "classnames";
import {useDebouncedCallback} from "use-debounce";
import {hooks} from "@kne/react-form-antd";
import merge from "lodash/merge";
import style from "./style.module.scss";
import defaultAvatar from "../../../../defaultAvatar.svg";
import {IntlProvider, FormattedMessage, useIntl} from "@components/Intl";
import importMessages from "@components/FormInfo/locale";
import {createWithIntl} from "../../../Intl";

const {useOnChange} = hooks;

const AvatarDisplay = Image.Avatar;

const localeModuleName = "FormInfo";

const UploadButton = withInputFile(
    ({
         className,
         icon,
         loading,
         value,
         gender,
         width,
         height,
         children,
         shape,
         defaultAvatar,
         displayAvatar,
         apis,
     }) => {
        const inner = (
            <>
                <AvatarDisplay
                    {...Object.assign({}, typeof displayAvatar === 'function' ? displayAvatar(value) : {id: get(value, "id")})}
                    gender={gender}
                    width={(64 * width) / height}
                    height={64}
                    shape={shape}
                    defaultAvatar={defaultAvatar}
                    apis={apis}
                />
                <div className={style["upload-btn-tips"]}>
                    {icon || <Icon type="icon-chuanzhaopian" size={16}/>}
                </div>
                {children}
            </>
        );
        return (
            <div
                className={classnames(className, style["upload-btn"], {
                    [style["is-loading"]]: loading,
                    [style["square"]]: shape === "square" || !(width && width === height),
                })}
                style={{width: (64 * width) / height}}
            >
                {loading ? <Spin>{inner}</Spin> : inner}
            </div>
        );
    }
);

const dataURLtoBlob = (dataURL) => {
    let arr = dataURL.split(",");
    // 注意base64的最后面中括号和引号是不转译的
    let _arr = arr[1].substring(0, arr[1].length - 2);
    let mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(_arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime,
    });
};

const ControlAvatarEditor = forwardRef(
    (
        {
            image: propsImage,
            width,
            height,
            borderRadius,
            preview,
            fileSize,
            accept,
            renderTips,
            getApi,
            shape,
            border,
            ...props
        },
        ref
    ) => {
        const intl = useIntl({moduleName: localeModuleName});
        const [baseWidth, setBaseWidth] = useState(0);
        const outerRef = useRef(null);
        const [image, setImage] = useState(propsImage);
        const [scale, setScale] = useState(1);
        const [rotate, setRotate] = useState(0);
        const [previewImg, setPreviewImg] = useState("");
        const editorRef = useRef(null);
        useLayoutEffect(() => {
            setBaseWidth((outerRef.current.clientWidth * 2) / 3);
        }, []);
        getApi({
            getImage: () => {
                const canvas = editorRef.current.getImage();

                const targetCanvas = document.createElement("canvas");
                const targetCtx = targetCanvas.getContext("2d");
                targetCanvas.width = width;
                targetCanvas.height = height;

                targetCtx.drawImage(
                    canvas,
                    0,
                    0,
                    targetCanvas.width,
                    targetCanvas.height
                );

                return new window.File(
                    [dataURLtoBlob(targetCanvas.toDataURL())],
                    image.name,
                    {type: image.type}
                );
            },
        });
        const makePreviewInner = () => {
            setPreviewImg(editorRef.current.getImage().toDataURL());
        };
        const makePreview = useDebouncedCallback(makePreviewInner, 500);

        return (
            <div ref={outerRef}>
                <Row wrap={false} align="middle">
                    <Col span={preview ? 16 : 24}>
                        {baseWidth && (
                            <Space direction="vertical">
                                <AvatarEditor
                                    {...props}
                                    ref={editorRef}
                                    image={image}
                                    scale={scale}
                                    rotate={rotate}
                                    width={baseWidth - border * 2}
                                    height={
                                        (height * baseWidth) / width - (border * 2 * height) / width
                                    }
                                    border={border}
                                    color={[0, 0, 0, 0.6]}
                                    borderRadius={(borderRadius * baseWidth) / width}
                                    onImageReady={makePreviewInner}
                                    onImageChange={makePreview}
                                />
                                <div className={style["drop-tips"]}>
                                    {renderTips(
                                        `${intl.formatMessage({id: "PictureFormat"})}${accept
                                            .map((str) => str.replace(/^\./, ""))
                                            .join(" ")} ${intl.formatMessage({
                                            id: "ImageSize",
                                        })}${intl.formatMessage(
                                            {id: "NotExceeding"},
                                            {size: fileSize}
                                        )}`,
                                        {
                                            accept,
                                            fileSize,
                                        }
                                    )}
                                </div>
                                <Row gutter={14} align="middle">
                                    <Col>
                                        <Tooltip
                                            title={intl.formatMessage({id: "Rotate"})}
                                            placement="bottom"
                                        >
                                            <Icon
                                                type="icon-xuanzhuan"
                                                onClick={() => {
                                                    setRotate((rotate) => {
                                                        return (rotate - 90) % 360;
                                                    });
                                                }}
                                            />
                                        </Tooltip>
                                    </Col>
                                    <Col>
                                        <Tooltip
                                            title={intl.formatMessage({id: "ImageFull"})}
                                            placement="bottom"
                                        >
                                            <Icon
                                                type="icon-chongman"
                                                onClick={() => {
                                                    setScale(1);
                                                }}
                                            />
                                        </Tooltip>
                                    </Col>
                                    <Col flex={1}>
                                        <Slider
                                            tooltip={{
                                                placement: "bottom",
                                                formatter: () => intl.formatMessage({id: "Size"}),
                                            }}
                                            value={scale}
                                            step={0.05}
                                            min={0.2}
                                            max={3}
                                            onChange={setScale}
                                        />
                                    </Col>
                                    <Col>
                                        <InputFileLink
                                            accept={accept}
                                            onChange={(fileList) => {
                                                if (fileList[0].size > fileSize * 1024 * 1024) {
                                                    message.error(
                                                        intl.formatMessage(
                                                            {id: "FileNotExceeding"},
                                                            {name: fileList[0].name, size: fileSize}
                                                        )
                                                    );
                                                    return;
                                                }
                                                setRotate(0);
                                                setScale(1);
                                                setImage(fileList[0]);
                                            }}
                                        >
                                            <FormattedMessage
                                                id={"ReUpload"}
                                                moduleName={localeModuleName}
                                            />
                                        </InputFileLink>
                                    </Col>
                                </Row>
                            </Space>
                        )}
                    </Col>
                    {preview && (
                        <Col span={8}>
                            <div className={style["preview-area"]}>
                                <Space direction="vertical">
                                    <AntdAvatar
                                        src={previewImg}
                                        // alt="预览"
                                        shape={shape}
                                        style={{
                                            width: baseWidth / 2 - 36,
                                            height: ((baseWidth / 2 - 36) * height) / width,
                                        }}
                                    />
                                    <div
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <FormattedMessage
                                            id={"Preview"}
                                            moduleName={localeModuleName}
                                        />
                                    </div>
                                </Space>
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
);

ControlAvatarEditor.defaultProps = {
    border: 1,
};

const useDropModal = () => {
    const modal = useModal();
    return (props) => {
        const {
            image,
            width,
            height,
            borderRadius,
            getApi,
            preview,
            fileSize,
            accept,
            renderTips,
            border,
            dropModalSize,
            ...others
        } = Object.assign(
            {},
            {
                title: "编辑头像",
                width: 200,
                height: 200,
                borderRadius:
                    props.shape === "circle" &&
                    props.width &&
                    props.width === props.height
                        ? props.width / 2
                        : 2,
                preview: true,
            },
            props
        );
        return modal({
            ...others,
            size: dropModalSize,
            children: (
                <ControlAvatarEditor
                    preview={preview}
                    fileSize={fileSize}
                    accept={accept}
                    getApi={getApi}
                    renderTips={renderTips}
                    width={width}
                    height={height}
                    shape={
                        props.shape === "circle" &&
                        props.width &&
                        props.width === props.height
                            ? "circle"
                            : "square"
                    }
                    borderRadius={borderRadius}
                    image={image}
                    border={border}
                    scale={1}
                    rotate={0}
                />
            ),
        });
    };
};

const AvatarField = createWithIntl({importMessages, moduleName: "FormInfo"})(
    ({
         value,
         gender,
         fileSize,
         accept,
         openEditor,
         apis: currentApis,
         renderTips,
         onChange,
         shape,
         width,
         height,
         title,
         border,
         icon,
         dropModalSize,
         defaultAvatar,
         displayAvatar,
     }) => {
        const [loading, setLoading] = useState(false);
        const {apis: baseApis} = usePreset();
        const apis = merge({}, baseApis, currentApis);
        const {ossUpload} = apis;
        const dropRef = useRef(null);
        const dropModal = useDropModal();
        const intl = useIntl({moduleName: localeModuleName});
        return (
            <UploadButton
                value={value}
                gender={gender}
                accept={accept}
                width={width}
                height={height}
                shape={shape}
                icon={icon}
                loading={loading}
                defaultAvatar={defaultAvatar}
                displayAvatar={displayAvatar}
                apis={apis}
                onChange={(fileList) => {
                    if (fileList[0].size > fileSize * 1024 * 1024) {
                        message.error(
                            intl.formatMessage(
                                {id: "FileNotExceeding"},
                                {name: fileList[0].name, size: fileSize}
                            )
                        );
                        return;
                    }
                    const doUpload = (file) => {
                        setLoading(true);
                        return ossUpload({file})
                            .then(({data}) => {
                                if (data.code !== 0) {
                                    message.error(
                                        intl.formatMessage(
                                            {id: "UploadFailed"},
                                            {msg: data.msg ? ":" + data.msg : ""}
                                        )
                                    );
                                    return;
                                }
                                onChange(data.data);
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    };
                    if (openEditor) {
                        dropModal({
                            image: fileList[0],
                            width,
                            height,
                            title,
                            shape,
                            border,
                            dropModalSize,
                            getApi: (api) => (dropRef.current = api),
                            fileSize,
                            accept,
                            renderTips,
                            onConfirm: () => {
                                doUpload(dropRef.current.getImage());
                            },
                        });
                        return;
                    }
                    doUpload(fileList[0]);
                }}
            />
        );
    }
);

AvatarField.defaultProps = {
    defaultAvatar,
    openEditor: true,
    fileSize: 2,
    width: 200,
    height: 200,
    dropModalSize: "small",
    border: 1,
    title: (
        <IntlProvider importMessages={importMessages} moduleName="FormInfo">
            <FormattedMessage id={"Crop"} moduleName="FormInfo"/>
        </IntlProvider>
    ),
    accept: [".jpg", ".png", ".jpeg"],
    renderTips: (defaultTips) => {
        return defaultTips;
    },
    shape: "circle",
};

const Avatar = (props) => {
    const render = useOnChange(props);
    return render(AvatarField);
};

Avatar.defaultProps = {};

Avatar.Field = AvatarField;
Avatar.useDropModal = useDropModal;

export default Avatar;
