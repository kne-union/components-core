import {Button} from "antd";
import Fetch from "@kne/react-fetch";
import classnames from "classnames";
import Icon from "@components/Icon";
import ButtonGroup from "@components/ButtonGroup";
import style from "./style.module.scss";

const OptionsList = ({className, list = [], children, width}) => {
    const buttonProps = {
        className: classnames(className, "btn-no-padding", style["options-btn"]), type: "link",
    };
    const buttonList = list
        .filter((item) => !item?.hidden)
        .map(({className, ...props}) => Object.assign({}, props, buttonProps));
    const more = <Button
        icon={<Icon type="icon-gengduo2"/>}
        className="btn-no-padding"
        type="link"
    />;
    return (<div
        className={classnames(className, style["options-column"])}
        style={{
            "--max-width": width + "px",
        }}
    >
        {typeof children === "function" ? children({
            list: buttonList, more, buttonProps
        }) : children}
        {list && list.length > 0 && <ButtonGroup
            list={buttonList}
            more={more}
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
