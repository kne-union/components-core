import { defaultProps, useContext } from "../context";
import isEqual from "lodash/isEqual";
import { useEffect, useRef } from "react";
import { Result } from "antd";
import Features from "@components/Features";
import { useMenuOpen } from "./Menu";

const PageInner = ({ children, isPass, ...props }) => {
  const { setPageProps } = useContext();
  const propsRef = useRef(null);
  const localMenuOpen = useMenuOpen();
  const localMenuOpenRef = useRef(localMenuOpen);
  localMenuOpenRef.current = localMenuOpen;
  useEffect(() => {
    if (!isEqual(propsRef.current, props)) {
      propsRef.current = props;
      /**
       * 解决两个页面都用header时，menuButton产生的跳动问题：如果下一个页面有header，
       * headerHeight由其header组件自己更新，不再统一重置为0。
       * optionFooter同理
       * */
      const targetProps = Object.assign(
        {},
        defaultProps,
        props,
        typeof localMenuOpenRef.current === "boolean"
          ? { menuOpen: localMenuOpenRef.current }
          : {}
      );
      if (targetProps.header && targetProps.headerHeight === 0) {
        delete targetProps["headerHeight"];
      }
      if (targetProps.footer && targetProps.footerHeight === 0) {
        delete targetProps["footerHeight"];
      }
      if (targetProps.optionFooter && targetProps.optionFooterHeight === 0) {
        delete targetProps["optionFooter"];
      }
      setPageProps(targetProps);
    }
  }, [props, setPageProps]);

  if (isPass === false) {
    return <Result status="403" subTitle="暂未开放此功能" />;
  }

  return children;
};

const Page = ({ featureId, name, openFeatures, ...props }) => {
  if (openFeatures === true) {
    return (
      <Features id={name}>
        {({ isPass }) => <PageInner {...props} key={name} isPass={isPass} />}
      </Features>
    );
  }
  return <PageInner {...props} key={name} />;
};

Page.defaultProps = defaultProps;

export default Page;
