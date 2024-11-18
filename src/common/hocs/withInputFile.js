import { FileInput, useFileUpload } from "@kne/react-file";
import { Typography } from "antd";
import classnames from "classnames";

const withInputFile = (WrappedComponent) => {
  return ({ className, multiple, accept, onChange, children, ...props }) => {
    return (
      <FileInput
        className={className}
        multiple={multiple}
        accept={accept}
        onChange={onChange}
      >
        {({ children: inputChildren, ...targetProps }) => (
          <WrappedComponent {...Object.assign({}, props, targetProps)}>
            {children}
            {inputChildren}
          </WrappedComponent>
        )}
      </FileInput>
    );
  };
};

export default withInputFile;

export const InputFileButton = ({ children, ...props }) => {
  return <FileInput {...props} buttonText={children} />;
};

export const InputFileLink = ({
  className,
  multiple,
  accept,
  onChange,
  children,
  ...props
}) => {
  return (
    <FileInput
      className={className}
      multiple={multiple}
      accept={accept}
      onChange={onChange}
    >
      {({ children: inputChildren, ...targetProps }) => (
        <Typography.Link {...Object.assign({}, props, targetProps)}>
          {children}
          {inputChildren}
        </Typography.Link>
      )}
    </FileInput>
  );
};

export const InputFileText = ({
  className,
  multiple,
  accept,
  onChange,
  children,
  ...props
}) => {
  return (
    <FileInput
      className={classnames(className, "ant-btn")}
      multiple={multiple}
      accept={accept}
      onChange={onChange}
    >
      {({ children: inputChildren, ...targetProps }) => (
        <Typography.Text {...Object.assign({}, props, targetProps)}>
          {children}
          {inputChildren}
        </Typography.Text>
      )}
    </FileInput>
  );
};

export { useFileUpload };
