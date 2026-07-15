import {Button, Col, Drawer} from "antd";
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
import {useMemo, useState} from "react";
import {useMobilePopupMount} from "@kne/responsive-utils";

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

const Menu = ({isMobile}) => {
    const {pageProps, setPageProps} = useContext();
    const {menu, menuOpen, menuWidth, menuCloseWidth, menuFixed, menuCloseButton} = pageProps;
    const [drawerVisible, setDrawerVisible] = useState(false);
    const {fixedModeClass, getPopupContainer, anchorRef} = useMobilePopupMount({cover: "boundary"});

    const location = useLocation();
    const pathModuleName = location.pathname.split("/")[1];
    const menuCssVars = {
        "--menu-width": menuWidth,
        "--menu-close-width": menuCloseWidth,
    };

    // 移动端渲染
    if (isMobile && menu) {
        return (
            <>
                <span ref={anchorRef} className={style["mobile-menu-anchor"]} aria-hidden="true"/>
                {!drawerVisible ? (
                    <div className={style["mobile-menu-trigger"]} style={menuCssVars}>
                        <Button
                            className={style["mobile-menu-edge-btn"]}
                            icon={<Icon type="icon-arrow-bold-right"/>}
                            onClick={() => setDrawerVisible(true)}
                        />
                    </div>
                ) : null}
                <Drawer
                    placement="left"
                    open={drawerVisible}
                    onClose={() => setDrawerVisible(false)}
                    width={menuWidth}
                    getContainer={getPopupContainer}
                    rootClassName={classnames(style["mobile-menu-drawer"], fixedModeClass)}
                    className={style["mobile-menu-drawer"]}
                    style={menuCssVars}
                    closable={false}
                    classNames={{mask: fixedModeClass}}
                    styles={{
                        wrapper: {overflow: "visible"},
                        section: {overflow: "visible"},
                        body: {padding: 0, position: "relative", height: "100%", overflow: "visible"},
                    }}
                >
                    <Button
                        className={classnames(style["mobile-menu-edge-btn"], style["mobile-menu-close-btn"])}
                        icon={<Icon type="icon-arrow-bold-left"/>}
                        onClick={() => setDrawerVisible(false)}
                    />
                    <div className={style["mobile-menu-wrapper"]}>
                        <SimpleBar className={style["mobile-menu-content"]}>
                            {typeof menu === 'function' ? menu({open: true}) : menu}
                        </SimpleBar>
                    </div>
                </Drawer>
            </>
        );
    }

    // 桌面端渲染
    return menu ? (
        <Col
            className={classnames(style["page-menu"], 'core-page-menu', {
                [style["closed"]]: !menuOpen,
            })}
            style={menuCssVars}
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
