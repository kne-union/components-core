import { Col, Space } from "antd";
import FixedContainer from "./FixedContainer";
import { useContext } from "../context";
import classnames from "classnames";
import SimpleBar from "@common/components/SimpleBar";
import ContainerHeight from "./ContainerHeight";
import style from "../style.module.scss";

const Option = () => {
  const { pageProps } = useContext();
  const {
    option,
    optionWidth,
    optionFixed,
    optionFooter,
    optionFooterHeight,
    optionNoPadding,
  } = pageProps;
  return option ? (
    <Col
      className={classnames(style["page-option"], "page-option")}
      style={{
        "--width": optionWidth,
        "--foot-height": optionFooterHeight + "px",
      }}
    >
      <FixedContainer
        className={style["page-option-inner"]}
        isFixed={optionFixed}
      >
        <SimpleBar
          className={classnames(style["page-option-main"], "page-option-main")}
          style={{ padding: optionNoPadding ? "0px" : "var(--padding-width)" }}
        >
          {option}
        </SimpleBar>
        {optionFooter ? (
          <ContainerHeight
            className={style["page-option-footer"]}
            targetKey="optionFooterHeight"
          >
            <Space align="center">{optionFooter}</Space>
          </ContainerHeight>
        ) : null}
      </FixedContainer>
    </Col>
  ) : null;
};

export default Option;
