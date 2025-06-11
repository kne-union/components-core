import style from "./style.module.scss";
import {
    useState, useCallback, useEffect, useRef, useLayoutEffect,
} from "react";
import localStorage from "@common/utils/localStorage";
import StateTag from "@components/StateTag";
import {Popover, Space} from "antd";
import dropWhile from "lodash/dropWhile";
import uniqBy from "lodash/uniqBy";
import useClickOutside from "@kne/use-click-outside";
import classnames from "classnames";

const HistoryStore = ({
                          className,
                          overlayClassName,
                          storeName = 'HISTORY_STORE_KEY',
                          maxLength = 5,
                          label = '最近搜索',
                          children,
                          onSelect,
                          zIndex,
                          getPopupContainer,
                      }) => {
    const [list, setList] = useState(() => {
        return localStorage.getItem(storeName) || [];
    });
    const [open, setOpen] = useState(false);
    const openHistory = useCallback(() => {
        if (list.length === 0) {
            return;
        }
        setOpen(true);
    }, [list]);
    const storeNameRef = useRef(storeName);
    storeNameRef.current = storeName;
    useEffect(() => {
        localStorage.setItem(storeNameRef.current, list);
    }, [list]);

    const appendHistory = useCallback((item) => {
        if (item.value && item.label) {
            setList((list) => {
                const newList = dropWhile(list, {value: item.value});
                newList.splice(0, 0, item);
                return maxLength ? uniqBy(newList, "value").slice(0, maxLength) : newList;
            });
        }
        setOpen(false);
    }, [maxLength]);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    const outerRef = useClickOutside(close);

    const popoverChildrenRef = useRef(null), popoverContentRef = useRef(null);
    outerRef.current = {
        contains: (target) => {
            return (popoverChildrenRef.current.contains(target) || (open && popoverContentRef.current.contains(target)));
        },
    };

    const onSelectRef = useRef(null);
    const setOnSelect = (callback) => {
        onSelectRef.current = callback;
    };

    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const callback = () => {
            setWidth(popoverChildrenRef.current.clientWidth);
        };
        callback();
        const resizeObserver = new ResizeObserver(callback);
        resizeObserver.observe(popoverChildrenRef.current);
        const mutationObserver = new MutationObserver(callback);
        mutationObserver.observe(popoverChildrenRef.current, {
            subtree: true, childList: true,
        });
        return () => {
            mutationObserver.disconnect();
            resizeObserver.disconnect();
        };
    }, []);

    return (<Popover
            zIndex={zIndex}
            placement="bottom"
            transitionName={"ant-slide-up"}
            arrow={false}
            open={open}
            getPopupContainer={getPopupContainer}
            overlayClassName={classnames(overlayClassName, style["overlay"])}
            content={<div
                className={style["overlay-content"]}
                style={{width}}
                ref={popoverContentRef}
            >
                <Space direction="vertical">
                    <div>{label}</div>
                    <Space wrap>
                        {list.map((item) => (<StateTag
                                className={style["state-tag"]}
                                text={item.label}
                                type={"result"}
                                onClick={() => {
                                    onSelect && onSelect(item.value, item);
                                    onSelectRef.current && onSelectRef.current(item.value, item);
                                    close();
                                    appendHistory(item);
                                }}
                            />))}
                    </Space>
                </Space>
            </div>}
        >
            <div ref={popoverChildrenRef} className={classnames(className)}>
                {children({
                    open, openHistory, appendHistory, setOnSelect, close,
                })}
            </div>
        </Popover>);
};

export default HistoryStore;
