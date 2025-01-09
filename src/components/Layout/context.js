import {createContext, useContext as useReactContext} from "react";

export const defaultProps = {
    menu: null,
    filter: null,
    menuOpen: true,
    menuWidth: "240px",
    menuCloseWidth: "0px",
    menuFixed: true,
    menuCloseButton: true,
    backgroundColor: null,
    header: null,
    headerHeight: 0,
    headerFixed: true,
    headerInfo: null,
    backUrl: null,
    title: null,
    titleExtra: null,
    titleLeftExtra: null,
    noMargin: false,
    noPadding: false,
    optionFooterHeight: 0,
    option: null,
    optionWidth: "400px",
    optionNoPadding: false,
    optionFixed: true,
    optionFooter: null,
};

export const context = createContext({});

export const {Provider, Consumer} = context;

export const useContext = () => {
    return useReactContext(context);
};

export default context;
