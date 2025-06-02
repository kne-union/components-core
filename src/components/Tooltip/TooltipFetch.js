import {useState} from "react";
import {useFetch} from "@kne/react-fetch";
import {Spin} from "antd";
import style from "./style.module.scss";
import Tooltip from "./Tooltip";
import classnames from "classnames";

const TooltipFetch = ({
                          api, children, fetchContent, showLoading = true, loadingClassName, force, ...props
                      }) => {
    const [open, setOpen] = useState(false);
    const fetchApi = useFetch(Object.assign({}, api, {auto: false}));
    const {isComplete, isLoading, data, send} = fetchApi;
    return (<Tooltip
            {...Object.assign({}, props, isComplete ? fetchContent(data, fetchApi) : {})}
            open={open}
            onOpenChange={async (open) => {
                if (open && (!isComplete || force)) {
                    await send({type: "refresh"});
                }
                setOpen(open);
            }}
        >
      <span className={style["fetch-content"]}>
        {children}
          {showLoading && isLoading ? (<Spin
                  size="small"
                  className={classnames(loadingClassName, style["fetch-loading"])}
              />) : null}
      </span>
        </Tooltip>);
};

export default TooltipFetch;
