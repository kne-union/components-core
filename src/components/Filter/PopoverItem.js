import {useState, useMemo} from "react";
import {Button, Col, Popover, Row} from "antd";
import FilterItem from "./FilterItem";
import isNotEmpty from "@common/utils/isNotEmpty";
import classnames from "classnames";
import {FormattedMessage} from "@components/Intl";
import style from "./style.module.scss";

const PopoverItem = ({
                         value,
                         label,
                         onValidate,
                         overlayClassName,
                         placement = 'bottomLeft',
                         onOpenChange,
                         onChange,
                         children,
                     }) => {
    const [state, setState] = useState(value);
    const [open, setOpen] = useState(false);
    const disabled = useMemo(() => {
        return onValidate && !onValidate(state);
    }, [onValidate, state]);
    return (<Popover
        open={open}
        trigger="click"
        placement={placement}
        arrow={false}
        rootClassName={classnames(style["pop-util-overlay"], overlayClassName)}
        onOpenChange={(open) => {
            setOpen(open);
            setState(value);
            onOpenChange && onOpenChange(open);
        }}
        content={<span
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
          <div className={style["pop-util-content"]}>
            {children({value: state, onChange: setState})}
          </div>
          <Row className={style["pop-util-footer"]} justify="end" gutter={8}>
            <Col>
              <Button
                  size="small"
                  onClick={() => {
                      setOpen(false);
                      onOpenChange && onOpenChange(false);
                  }}
              >
                <FormattedMessage
                    id="cancelText"
                    moduleName="Filter"
                    defaultMessage="取消"
                />
              </Button>
            </Col>
            <Col>
              <Button
                  size="small"
                  type="primary"
                  disabled={disabled}
                  onClick={() => {
                      setOpen(false);
                      onOpenChange && onOpenChange(false);
                      onChange && onChange(state);
                  }}
              >
                <FormattedMessage
                    id="determineText"
                    moduleName="Filter"
                    defaultMessage="确定"
                />
              </Button>
            </Col>
          </Row>
        </span>}
    >
      <span>
        <FilterItem open={open} active={isNotEmpty(value)} label={label}/>
      </span>
    </Popover>);
};

export default PopoverItem;
