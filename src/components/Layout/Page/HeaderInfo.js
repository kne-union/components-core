import { useContext } from "../context";
import { useRef } from "react";
import style from "../style.module.scss";
import classnames from "classnames";

const HeaderInfo = () => {
  const { pageProps } = useContext();
  const { headerInfo } = pageProps;
  const headerInfoRef = useRef(null);
  return headerInfo ? (
    <div
      ref={headerInfoRef}
      className={classnames(style["page-header-info"], "page-header-info")}
    >
      {headerInfo}
    </div>
  ) : null;
};

export default HeaderInfo;
