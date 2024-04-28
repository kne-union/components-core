import { useContext } from "../context";
import Affix from "../Affix";
import { navigationHeight } from "@components/Navigation";
import ContainerHeight from "./ContainerHeight";
import style from "../style.module.scss";
import classNames from "classnames";

const Footer = () => {
  const { pageProps } = useContext();
  const { footer, footerFixed } = pageProps;

  return footer ? (
    <Affix
      isFixed={footerFixed}
      className={classNames(style["page-footer"], "page-footer")}
      offsetBottom={0}
    >
      <ContainerHeight targetKey="footerHeight">{footer}</ContainerHeight>
    </Affix>
  ) : null;
};

export default Footer;
