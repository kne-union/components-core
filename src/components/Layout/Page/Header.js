import { useContext } from "../context";
import Affix from "../Affix";
import { navigationHeight } from "@components/Navigation";
import ContainerHeight from "./ContainerHeight";
import style from "../style.module.scss";

const Header = () => {
  const { pageProps } = useContext();
  const { header, headerFixed } = pageProps;
  return header ? (
    <Affix
      isFixed={headerFixed}
      className={style["page-header"]}
      offsetTop={navigationHeight}
    >
      <ContainerHeight targetKey="headerHeight">{header}</ContainerHeight>
    </Affix>
  ) : null;
};

export default Header;
