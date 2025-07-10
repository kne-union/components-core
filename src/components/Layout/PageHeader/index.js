import {Space, Row, Col} from "antd";
import classnames from "classnames";
import importMessages from "../locale";
import Icon from "@components/Icon";
import ButtonGroup from "@components/ButtonGroup";
import {IntlProvider} from "@components/Intl";
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
    return (<Row
        className={classnames(className, style["page-header"])}
        wrap={false}
        gutter={10}
    >
        {addonBefore && <Col>{addonBefore}</Col>}
        <Col flex={1}>
            <Space direction="vertical">
                <Row wrap={false}>
                    <Col flex={1} className={style["main"]}>
                        <Space align="start">
                            {icon && <div className={style["icon-outer"]}>{icon}</div>}
                            {!icon && iconType && (<div className={style["icon-outer"]}>
                                <Icon colorful type={iconType} size={24}/>
                            </div>)}
                            <div className={style["title"]}>{title}</div>
                            {info && <div className={style["info"]}>{info}</div>}
                        </Space>
                    </Col>
                    {buttonOptions && (<Col
                        flex={1}
                        className={style["button-options"]}
                        style={{"--max-width": buttonOptionsMaxWidth}}
                    >
                        <ButtonGroup {...buttonOptions} />
                    </Col>)}
                </Row>
                {tags && (<Space className={tagClassName} split={tagSplit} size={[16, 8]}>
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
