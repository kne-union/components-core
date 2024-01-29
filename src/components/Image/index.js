import Fetch from "@kne/react-fetch";
import withOSSFile from "@common/hocs/withOSSFile";
import Icon from "@components/Icon";
import classnames from "classnames";
import { Avatar, Skeleton } from "antd";
import { cloneElement } from "react";
import loadImage from "./loadImage";
import style from "./style.module.scss";
import defaultAvatar from "../../defaultAvatar.svg";

const ImageInner = ({
  data,
  className,
  alt,
  innerLoading,
  loading,
  error,
  innerError,
  children,
}) => {
  return (
    <Fetch
      loader={loadImage}
      params={{ data }}
      error={innerError || error}
      loading={innerLoading || loading}
      render={({ data }) => {
        if (typeof children === "function") {
          return children({
            alt,
            className: classnames(className, style["img"]),
            src: data,
          });
        }
        return (
          <img
            alt={alt}
            className={classnames(className, style["img"])}
            src={data}
          />
        );
      }}
    />
  );
};

const FetchImageInner = withOSSFile(ImageInner);

const renderInner = ({
  loading,
  error,
  src,
  id,
  alt,
  className,
  children,
  apis,
}) => {
  const imageLoading =
    loading &&
    cloneElement(loading, {
      className: style["loading"],
    });
  const imageError =
    error &&
    cloneElement(error, {
      className: style["error"],
    });

  if (src) {
    return (
      <ImageInner
        alt={alt}
        className={className}
        data={src}
        loading={imageLoading}
        error={imageError}
      >
        {children}
      </ImageInner>
    );
  }

  if (id) {
    return (
      <FetchImageInner
        alt={alt}
        className={className}
        id={id}
        loading={imageLoading}
        innerLoading={imageLoading}
        error={imageError}
        innerError={imageError}
        apis={apis}
      >
        {children}
      </FetchImageInner>
    );
  }

  return imageError;
};

const Image = ({ id, src, alt, loading, error, className, apis, ...props }) => {
  return (
    <div
      {...props}
      data-testid="components-core-image"
      className={classnames(className, style["img-outer"])}
    >
      {renderInner({
        loading,
        error,
        src,
        id,
        alt,
        className,
        apis,
      })}
    </div>
  );
};

Image.Avatar = ({
  id,
  src,
  alt,
  gender,
  loading,
  error,
  className,
  gap,
  icon,
  children,
  shape,
  size,
  width,
  height,
  defaultAvatar,
  apis,
  ...props
}) => {
  const inner = (() => {
    const styleProps =
      width && height ? { style: { width, height } } : { size };
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
        children: (props) => (
          <Avatar {...props} gap={gap} shape={shape} {...styleProps} />
        ),
      });
    }

    if (gender) {
      const type =
        gender && ["F", "female", "f"].indexOf(gender) > -1
          ? "icon-color-touxiang-nv"
          : "icon-color-touxiang-nan";
      return (
        <Avatar
          {...props}
          src={defaultAvatar || <Icon role="touxiang" colorful type={type} />}
          gap={gap}
          shape={shape}
          {...styleProps}
        />
      );
    }

    return (
      <Avatar
        {...props}
        gap={gap}
        icon={icon}
        shape={shape}
        size={size}
        src={defaultAvatar}
        {...styleProps}
      >
        {children}
      </Avatar>
    );
  })();
  return (
    <div
      {...props}
      data-testid="components-core-image-avatar"
      className={classnames(className, style["img-outer"])}
      style={{
        width: width && height ? width : size,
        height: width && height ? height : size,
      }}
    >
      {inner}
    </div>
  );
};

const commonDefaultProps = {
  error: <Icon role="error-icon" colorful type="icon-color-touxiang-nan" />,
  loading: <Skeleton.Avatar shape="square" active />,
};

Image.defaultProps = Object.assign({}, commonDefaultProps);

Image.Avatar.defaultProps = Object.assign({}, commonDefaultProps, {
  size: 100,
  defaultAvatar,
});

export default Image;
