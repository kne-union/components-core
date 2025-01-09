import {Button, Col} from "antd";
import classnames from "classnames";
import style from "../style.module.scss";
import FixedContainer from "./FixedContainer";
import {useContext} from "../context";
import Icon from "@components/Icon";
import SimpleBar from "@common/components/SimpleBar";
import {useLocation} from "react-router-dom";
import get from "lodash/get";
import isNotEmpty from "@utils/isNotEmpty";
import localStorage from "@utils/localStorage";
import {useMemo} from "react";

const pageMenuOpenKey = "CORE_PAGE_MENU_OPEN_KEY";

export const useMenuOpen = () => {
    const location = useLocation();
    const pathModuleName = location.pathname.split("/")[1];
    return useMemo(() => {
        const pageResult = localStorage.getItem(pageMenuOpenKey) || {};
        return isNotEmpty(get(pageResult, pathModuleName))
            ? get(pageResult, pathModuleName)
            : true;
    }, [pathModuleName]);
};

const Menu = () => {
    const {pageProps, setPageProps} = useContext();
    const {menu, menuOpen, menuWidth, menuCloseWidth, menuFixed, menuCloseButton} = pageProps;

    const location = useLocation();
    const pathModuleName = location.pathname.split("/")[1];

    return menu ? (
        <Col
            className={classnames(style["page-menu"],'core-page-menu', {
                [style["closed"]]: !menuOpen,
            })}
            style={{"--menu-width": menuWidth, "--menu-close-width": menuCloseWidth}}
        >
            <FixedContainer className={style["page-menu-inner"]} isFixed={menuFixed}>
                <div className={style["page-menu-main-outer"]}>
                    <SimpleBar
                        className={style["page-menu-main"]}>{typeof menu === 'function' ? menu({open: menuOpen}) : menu}</SimpleBar>
                </div>
            </FixedContainer>
            {menuCloseButton ? (
                <FixedContainer
                    className={classnames(style["page-menu-btn-outer"], 'core-page-menu-btn-outer', {
                        [style["is-fixed"]]: menuFixed,
                    })}
                    isFixed={menuFixed}
                >
                    <Button
                        className={classnames(style["page-menu-btn"], {
                            [style["closed"]]: !menuOpen,
                        })}
                        icon={
                            menuOpen ? (
                                <Icon type="icon-arrow-bold-left"/>
                            ) : (
                                <Icon type="icon-arrow-bold-right"/>
                            )
                        }
                        onClick={() => {
                            setPageProps({menuOpen: !pageProps.menuOpen});
                            const pageResult = localStorage.getItem(pageMenuOpenKey) || {};
                            pageResult[pathModuleName] = !pageProps.menuOpen;
                            localStorage.setItem(pageMenuOpenKey, pageResult);
                            setPageProps({menuOpen: !pageProps.menuOpen});
                        }}
                    />
                </FixedContainer>
            ) : null}
        </Col>
    ) : null;
};

export default Menu;
