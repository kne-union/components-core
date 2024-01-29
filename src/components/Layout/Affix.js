import { Affix as AntdAffix } from "antd";

const Affix = ({ isFixed, offsetTop, offsetBottom, onChange, ...props }) => {
  if (!isFixed) {
    return <div {...props} />;
  }
  return (
    <AntdAffix
      {...props}
      offsetTop={Number.isInteger(offsetTop) ? offsetTop - 0.1 : offsetTop}
      offsetBottom={offsetBottom}
      onChange={onChange}
    />
  );
};

export default Affix;
