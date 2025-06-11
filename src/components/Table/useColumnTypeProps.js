import {useRef, useState} from "react";
import columnTypes from "@components/Table/columnTypes";
import isNil from "lodash/isNil";
import pick from "lodash/pick";
import get from "lodash/get";
import useRefCallback from "@kne/use-ref-callback";
import isColValueEmpty from "./isColValueEmpty";

const useColumnTypeProps = ({rowKey, renderProps}) => {
    const [expandInfo, setExpandInfo] = useState(null);
    const columnRenderPropsRef = useRef(renderProps);
    columnRenderPropsRef.current = renderProps;

    const computedColumnProps = useRefCallback((col, index, {columnsConfig}) => {
        const {
            name,
            type,
            expandType,
            title,
            titleRender,
            fixed,
            emptyOf,
            emptyRender,
            groupHeader,
            sort,
            disableColItem,
            ...otherColProps
        } = col;
        const {
            render, width, min, max
        } = Object.assign({}, columnTypes[type] || columnTypes['other'], type === "hideInfo" && !isNil(expandInfo) && pick(columnTypes[expandType] || columnTypes['other'], ["width", "min", "max"]));
        const targetRender = render;

        return {
            name,
            title: typeof titleRender === "function" ? titleRender(title) : title,
            min,
            max,
            width,
            fixed,
            groupHeader,
            sort,
            type,
            render: (item) => {
                const itemKey = typeof rowKey === "function" ? rowKey(item) : item[rowKey];
                const colProps = Object.assign({}, col, typeof col.render === "function" ? col.render({
                    ...columnRenderPropsRef.current, name, target: item,
                }) : {});
                const targetRenderWithProps = (colValue) => {
                    const isEmpty = isColValueEmpty(colValue, emptyOf);
                    return targetRender(colValue, {
                        ...otherColProps,
                        name,
                        width: get(columnsConfig, `${name}.width`) || width,
                        min,
                        max,
                        isEmpty,
                        emptyRender,
                        hover: colProps.hover,
                        colValue: Object.assign({}, item),
                        renderProps: columnRenderPropsRef.current,
                        primary: colProps.primary,
                        ellipsis: colProps.ellipsis,
                        expand: expandInfo === itemKey,
                        onExpand: () => setExpandInfo(itemKey),
                    });
                };

                const colValue = colProps.hasOwnProperty("valueOf") && typeof colProps.valueOf === "function" ? colProps.valueOf(item, Object.assign({}, columnRenderPropsRef.current, {
                    name,
                }, disableColItem ? {targetRender: targetRenderWithProps} : {})) : get(item, name);
                return disableColItem ? colValue : targetRenderWithProps(colValue);
            },
        };
    });

    return {
        expandInfo, computedColumnProps,
    };
};

export default useColumnTypeProps;
