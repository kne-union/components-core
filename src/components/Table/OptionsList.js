import Fetch from "@kne/react-fetch";
import classnames from "classnames";
import {cloneElement, isValidElement} from 'react';
import ButtonGroup from "@components/ButtonGroup";
import style from "./style.module.scss";

const OptionsList = ({className, list = [], children, width}) => {
    const buttonProps = {
        className: classnames(className, style["options-btn"]), type: "link",
    };
    const buttonList = list
        .filter((item) => !item?.hidden)
        .map(({className, ...props}) => Object.assign({}, props, buttonProps));
    return (<div
        className={classnames(className, style["options-column"])}
        style={{
            "--max-width": width + "px",
        }}
    >
        {typeof children === "function" ? children({
            list: buttonList, itemClassName: "btn-no-padding", moreType: 'link', buttonProps
        }) : isValidElement(children) ? cloneElement(children, {
            ...buttonProps, itemClassName: "btn-no-padding", moreType: 'link'
        }) : children}
        {list && list.length > 0 && <ButtonGroup itemClassName="btn-no-padding"
                                                 moreType="link"
                                                 list={buttonList}
        />}
    </div>);
};

const Options = ({list, ...props}) => {
    if (typeof list === "function") {
        return (<Fetch
            loader={list}
            render={({data}) => {
                return <OptionsList {...props} list={data}/>;
            }}
        />);
    }
    if (Array.isArray(list)) {
        return <OptionsList {...props} list={list}/>;
    }
    return <OptionsList {...Object.assign({}, props, list)} />;
};

export default Options;
