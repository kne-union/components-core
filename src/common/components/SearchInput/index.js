import {Input} from "antd";
import classnames from "classnames";
import style from "./style.module.scss";
import Icon from "@components/Icon";
import {useEffect, useRef, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

const SearchInput = ({
                         value, debounce = 500, onSearch, isPopup, placeholder, className, ...props
                     }) => {
    const [state, setState] = useState(value);
    const valueRef = useRef(value);
    const debouncedFunc = useDebouncedCallback(onSearch, debounce);
    useEffect(() => {
        if (value !== valueRef.current) {
            setState(value);
            valueRef.current = value;
        }
    }, [value]);
    return (<Input.Search
        {...props}
        allowClear
        className={classnames(className, style["search-input"], {
            [style["is-popup"]]: isPopup,
        })}
        value={state}
        placeholder={placeholder}
        prefix={<Icon type="icon-sousuo"/>}
        enterButton={<Icon type="icon-sousuo"/>}
        onChange={(e) => {
            const value = e.target.value;
            valueRef.current = value;
            setState(value);
            debouncedFunc(value.trim());
        }}
        onSearch={(value) => {
            debouncedFunc(value.trim());
        }}
    />);
};

export default SearchInput;
