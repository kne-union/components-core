import Fetch from "@kne/react-fetch";
import withOSSFile from "@common/hocs/withOSSFile";
import Icon from "@components/Icon";
import classnames from "classnames";
import {Avatar, Skeleton} from "antd";
import {cloneElement} from "react";
import loadImage from "./loadImage";
import style from "./style.module.scss";
import defaultAvatarIcon from "../../defaultAvatar.svg";
import {usePreset} from "@components/Global";

const ImageInner = ({
                        data,
                        className,
                        alt,
                        innerLoading,
                        loading = <Skeleton.Avatar shape="square" active/>,
                        error = <Icon role="error-icon" colorful type="icon-color-touxiang-nan"/>,
                        innerError,
                        children,
                        onClick,
                        staticUrl: staticUrlProps,
                    }) => {
    const {staticUrl: staticUrlBase} = usePreset();
    const staticUrl = staticUrlProps || staticUrlBase || "";
    return (<Fetch
        loader={loadImage}
        params={{data: /^https?:\/\//.test(data) ? data : staticUrl + data}}
        error={innerError || error}
        loading={innerLoading || loading}
        render={({data}) => {
            if (typeof children === "function") {
                return children({
                    alt, className: classnames(className, style["img"]), src: data,
                });
            }
            return (<img
                alt={alt}
                className={classnames(className, style["img"])}
                src={data}
                onClick={onClick}
            />);
        }}
    />);
};

const FetchImageInner = withOSSFile(ImageInner);

const renderInner = ({
                         loading, error, src, id, alt, className, children, apis, onClick,
                     }) => {
    const imageLoading = loading && cloneElement(loading, {
        className: style["loading"],
    });
    const imageError = error && cloneElement(error, {
        className: style["error"],
    });

    if (src) {
        return (<ImageInner
            alt={alt}
            className={className}
            data={src}
            loading={imageLoading}
            error={imageError}
            onClick={onClick}
        >
            {children}
        </ImageInner>);
    }

    if (id) {
        return (<FetchImageInner
            alt={alt}
            className={className}
            id={id}
            loading={imageLoading}
            innerLoading={imageLoading}
            error={imageError}
            innerError={imageError}
            apis={apis}
            onClick={onClick}
        >
            {children}
        </FetchImageInner>);
    }

    return imageError;
};

const Image = ({
                   id,
                   src,
                   alt,
                   onClick,
                   loading = <Skeleton.Avatar shape="square" active/>,
                   error = <Icon role="error-icon" colorful type="icon-color-touxiang-nan"/>,
                   className,
                   apis,
                   ...props
               }) => {
    return (<div
        {...props}
        data-testid="components-core-image"
        className={classnames(className, style["img-outer"])}
    >
        {renderInner({
            loading, error, src, id, alt, className, apis, onClick,
        })}
    </div>);
};

Image.Avatar = ({
                    id,
                    src,
                    alt,
                    gender,
                    loading = <Skeleton.Avatar shape="square" active/>,
                    error = <Icon role="error-icon" colorful type="icon-color-touxiang-nan"/>,
                    className,
                    gap,
                    icon,
                    children,
                    shape,
                    size = 100,
                    width,
                    height,
                    defaultAvatar = defaultAvatarIcon,
                    apis,
                    ...props
                }) => {
    const inner = (() => {
        const styleProps = width && height ? {style: {width, height}} : {size};
        if (width && width !== height) {
            shape = "square";
        }
        if (id || src) {
            return renderInner({
                loading,
                error,
                src,
                defaultAvatar,
                id,
                alt,
                className,
                apis,
                children: (props) => (<Avatar {...props} gap={gap} shape={shape} {...styleProps} />),
            });
        }

        if (gender) {
            const type = gender && ["F", "female", "f"].indexOf(gender) > -1 ? "icon-color-touxiang-nv" : "icon-color-touxiang-nan";
            return (<Avatar
                {...props}
                src={<Icon role="touxiang" colorful type={type}/>}
                gap={gap}
                shape={shape}
                {...styleProps}
            />);
        }

        return (<Avatar
            {...props}
            gap={gap}
            icon={icon}
            shape={shape}
            size={size}
            src={defaultAvatar}
            {...styleProps}
        >
            {children}
        </Avatar>);
    })();
    return (<div
        {...props}
        data-testid="components-core-image-avatar"
        className={classnames(className, style["img-outer"])}
        style={{
            width: width && height ? width : size, height: width && height ? height : size,
        }}
    >
        {inner}
    </div>);
};

export default Image;
