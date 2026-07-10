import {Space, Row, Col} from "antd";
import classnames from "classnames";
import importMessages from "../locale";
import Icon from "@components/Icon";
import {isValidElement} from 'react';
import ButtonGroup from "@components/ButtonGroup";
import {IntlProvider} from "@components/Intl";
import {useIsMobile} from "@kne/responsive-utils";
import style from "./style.module.scss";

export const PageHeaderInner = ({
                                    className,
                                    title,
                                    icon,
                                    iconType,
                                    info,
                                    tags,
                                    tagSplit = <span className={style["tag-split"]}>|</span>,
                                    tagClassName = "",
                                    buttonOptions,
                                    buttonOptionsMaxWidth,
                                    addonBefore,
                                    addonAfter,
                                    children
                                }) => {
    const isMobile = useIsMobile();

    return (<Row
        className={classnames(className, style["page-header"], {
            [style["is-mobile"]]: isMobile
        })}
        wrap={isMobile}
        gutter={isMobile ? [0, 12] : 10}
    >
        {addonBefore && <Col>{addonBefore}</Col>}
        <Col flex={1} className={style["content"]}>
            <Space direction="vertical" size={isMobile ? 12 : 8} style={{width: '100%'}}>
                <Row wrap={isMobile} gutter={isMobile ? [0, 12] : 0}>
                    <Col flex={isMobile ? '100%' : 1} className={style["main"]}>
                        <div className={style["title-area"]}>
                            {icon && <div className={style["icon-outer"]}>{icon}</div>}
                            {!icon && iconType && (<div className={style["icon-outer"]}>
                                <Icon colorful type={iconType} size={isMobile ? 20 : 24}/>
                            </div>)}
                            <div className={style["title-content"]}>
                                <div className={style["title"]}>{title}</div>
                                {info && <div className={style["info"]}>{info}</div>}
                            </div>
                        </div>
                    </Col>
                    {buttonOptions && (<Col
                        flex={isMobile ? '100%' : 1}
                        className={style["button-options"]}
                        style={{"--max-width": buttonOptionsMaxWidth}}
                    >
                        {isValidElement(buttonOptions) && buttonOptions}
                        {typeof buttonOptions === "object" && Array.isArray(buttonOptions?.list) &&
                            <ButtonGroup {...buttonOptions} />}
                    </Col>)}
                </Row>
                {tags && (<Space
                    className={classnames(style["tags-row"], tagClassName)}
                    split={isMobile ? null : tagSplit}
                    size={isMobile ? [8, 8] : [16, 8]}
                    wrap
                >
                    {tags.map((item, index) => {
                        return (<div key={index} className={style["tags"]}>
                            {item}
                        </div>);
                    })}
                </Space>)}
                {children}
            </Space>
        </Col>
        {addonAfter && <Col>{addonAfter}</Col>}
    </Row>);
};

const PageHeader = (props) => {
    return (<IntlProvider importMessages={importMessages} moduleName="PageHeader">
        <PageHeaderInner {...props} />
    </IntlProvider>);
};

export default PageHeader;
