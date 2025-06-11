import React, {useMemo} from "react";
import classnames from "classnames";

import style from "./style.module.scss";
import {Space, Tag} from "antd";

const tagTypeEnum = {
    default: "#666666",
    skill: {
        color: "#666666", borderColor: "#EEEEEE",
    },
    result: "#666666",
    filterResult: "#5CB8B2",
    success: "#027A48",
    progress: "#F09700",
    danger: "#D14343",
    info: "#155ACF",
    other: "#6740C3",
};

const StateTag = ({
                      showBorder = false,
                      text = "",
                      type = "default",
                      showBackground = true,
                      className,
                      filterName,
                      ...props
                  }) => {
    const tagColor = useMemo(() => ({
        color: tagTypeEnum?.[type]?.color || tagTypeEnum[type],
        borderColor: tagTypeEnum?.[type]?.borderColor || tagTypeEnum[type],
    }), [type]);

    return (<Space
        data-testid={"components-core-state-tag"}
        className={classnames(style["state-tag-wrapper"], type === "filterResult" ? style["state-tag-filter-result-wrapper"] : "")}
        align="center"
        size={4}
    >
        {filterName ? (<span className={style["state-tag-filter-name"]}>{filterName}:</span>) : null}
        <Tag
            color={tagColor.color}
            {...props}
            style={{
                background: showBackground ? tagColor.color + "0F" : "none",
                color: tagColor.color,
                border: showBorder ? `1px solid ${tagColor.borderColor}` : "none",
            }}
            className={classnames(style["state-tag"], className, type === "result" ? style["state-result-tag"] : "", type === "skill" ? style["state-skill-tag"] : "", style[`state-tag-${type}`], showBackground ? style["show-bg"] : "", showBorder ? style["show-border"] : "", props?.onClick ? style["event-tag"] : "")}
        >
            <span className={style["tag-text"]}>{text}</span>
        </Tag>
    </Space>);
};

export default StateTag;
