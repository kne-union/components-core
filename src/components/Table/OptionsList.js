import {Button} from "antd";
import Fetch from "@kne/react-fetch";
import classnames from "classnames";
import Icon from "@components/Icon";
import ButtonGroup from "@components/ButtonGroup";
import style from "./style.module.scss";

const OptionsList = ({className, list = [], width}) => {
    return (<div
        className={classnames(className, style["options-column"])}
        style={{
            "--max-width": width + "px",
        }}
    >
        <ButtonGroup
            list={list
                .filter((item) => !item?.hidden)
                .map(({className, ...props}) => Object.assign({}, props, {
                    className: classnames(className, "btn-no-padding", style["options-btn"]), type: "link",
                }))}
            more={<Button
                icon={<Icon type="icon-gengduo2"/>}
                className="btn-no-padding"
                type="link"
            />}
        />
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
    return <OptionsList {...props} list={list}/>;
};

export default Options;
