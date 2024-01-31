import style from "./style.module.scss";
import { Provider, useContext } from "./context";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useControlValue from "@kne/use-control-value";
import { withFetch } from "@kne/react-fetch";
import get from "lodash/get";
import { App, Popover, Space, Tag } from "antd";
import classnames from "classnames";
import Modal from "@components/Modal";
import Icon from "@components/Icon";
import isNil from "lodash/isNil";
import clone from "lodash/clone";
import last from "lodash/last";
import SimpleBarBox from "@common/components/SimpleBarBox";
import useRefCallback from "@kne/use-ref-callback";
import useResize from "@common/hooks/useResize";
import { numberToPx, pxToNumber } from "@common/utils/px";
import { FormattedMessage, useIntl, createWithIntl } from "@components/Intl";
import importMessages from "../locale";
import usePreset from "@common/hooks/usePreset";

const createValueWithMaxLength =
  ({ maxLength, single, setValue, value, message }) =>
  (newValue) =>
    setValue(
      (() => {
        if (
          !single &&
          Number.isInteger(maxLength) &&
          maxLength > 0 &&
          newValue.length > maxLength
        ) {
          message();
          return value;
        }
        return newValue;
      })()
    );

const renderDisplayLabel = ({ single, value, mapping, onClose }) => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  if (single) {
    return (
      <span className={style["text-inner"]}>
        {get(mapping.get(value[0]), "label") || value[0]}
      </span>
    );
  }

  return value.map((item) => {
    const mappingItem = mapping.get(item);
    return (
      <Tag
        key={item}
        className={style["display-tag"]}
        closable
        onClose={(e) => {
          e.preventDefault();
          onClose(item, mappingItem);
        }}
      >
        <span className={style["tag-inner"]}>
          {get(mappingItem, "label") || item}
        </span>
      </Tag>
    );
  });
};

const ModalContent = forwardRef(
  (
    {
      value: propsValue,
      onChange,
      extra,
      showSelectedTag,
      renderSelectedContent,
      children,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(propsValue);
    const propsValueRef = useRef(propsValue);
    const { formatMessage } = useIntl({ moduleName: "Common" });
    propsValueRef.current = propsValue;
    const [modalOpen, setModalOpenBase] = useState(false);
    const setModalOpen = (modalOpen) => {
      setModalOpenBase(modalOpen);
      props.onOpenChange?.(modalOpen);
    };
    const { message } = App.useApp();
    const setValueWithMaxLength = createValueWithMaxLength({
      maxLength: props.maxLength,
      single: props.single,
      setValue,
      value,
      message: () =>
        message.error(
          formatMessage({ id: "maxSelectedCount" }, { count: props.maxLength })
        ),
    });
    useEffect(() => {
      if (modalOpen) {
        setValue(propsValueRef.current);
      }
    }, [modalOpen]);
    useImperativeHandle(ref, () => {
      return {
        modalOpen: () => {
          setModalOpen(true);
        },
        close: () => {
          setModalOpen(false);
        },
      };
    });
    return (
      <Modal
        {...props}
        open={modalOpen}
        onConfirm={() => {
          onChange(value);
        }}
        onClose={() => {
          setModalOpen(false);
        }}
        footer={
          (showSelectedTag || extra) && (
            <Space direction="vertical" className={style["overlay-footer"]}>
              {extra && (
                <div className={style["overlay-footer-extra"]}>{extra}</div>
              )}
              {showSelectedTag &&
                renderSelectedContent({
                  value,
                  setValue: setValueWithMaxLength,
                })}
            </Space>
          )
        }
      >
        {typeof children === "function"
          ? children({ value, setValue: setValueWithMaxLength })
          : children}
      </Modal>
    );
  }
);

const PopupContent = forwardRef(
  (
    {
      value,
      setValue,
      children,
      renderSelectedContent,
      showSelectedTag,
      placement,
      inputContent,
      single,
      extra,
      overlayWidth,
      wrapClassName,
      overlayClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const [open, setOpenBase] = useState(false);
    const setOpen = useRefCallback((open) => {
      setOpenBase(open);
      props.onOpenChange?.(open);
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          close: () => {
            setOpen(false);
          },
        };
      },
      [setOpen]
    );
    return disabled ? (
      <div className={style["input-inner"]}>{inputContent}</div>
    ) : (
      <Popover
        {...props}
        open={open}
        onOpenChange={setOpen}
        transitionName={"ant-slide-up"}
        overlayClassName={classnames(style["overlay"], overlayClassName)}
        arrow={false}
        content={
          <div
            style={overlayWidth ? { "--overlay-width": overlayWidth } : {}}
            className={classnames(style["overlay-content"], "over-content")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={style["overlay-inner"]}>
              {typeof children === "function"
                ? children({
                    value,
                    setValue: (newValue) => {
                      !(single && value[0] === newValue[0]) &&
                        setValue(newValue);
                      single && setOpen(false);
                    },
                  })
                : children}
            </div>
            {(showSelectedTag || extra) && (
              <div className={style["overlay-footer"]}>
                {extra && (
                  <div className={style["overlay-footer-extra"]}>{extra}</div>
                )}
                {showSelectedTag && renderSelectedContent({ value, setValue })}
              </div>
            )}
          </div>
        }
        trigger="click"
        placement={placement}
      >
        <div className={style["input-inner"]}>{inputContent}</div>
      </Popover>
    );
  }
);

const DisplayLabel = withFetch(
  ({ setFetchApi, wrapClassName, getContentRef, ...fetchApi }) => {
    const [hover, setHover] = useState(false);
    const modalRef = useRef(null);
    const popupRef = useRef(null);
    const selectInnerContext = useContext();
    const { valueState, mapping, props, inputWidth } = selectInnerContext;
    const [value, setValue] = valueState;
    const { formatMessage } = useIntl({ moduleName: "Common" });
    const {
      single,
      placement,
      getPopupContainer,
      placeholder,
      isPopup,
      disabled,
      showSelectedTag,
      extra,
      inputContent: inputContentRender,
      allowClear,
      overlayClassName,
    } = props;
    const fetchApiRef = useRef(fetchApi);
    fetchApiRef.current = fetchApi;

    const contentRefHandler = useRefCallback(getContentRef);
    useEffect(() => {
      contentRefHandler(isPopup ? popupRef : modalRef);
    }, [isPopup, contentRefHandler]);

    useEffect(() => {
      setFetchApi(
        Object.assign({}, fetchApiRef.current, {
          data: fetchApi.data,
          isComplete: fetchApi.isComplete,
        })
      );
    }, [fetchApi.data, setFetchApi, fetchApi.isComplete]);

    const inner = renderDisplayLabel({
      single,
      value,
      mapping,
      onClose: (item) => {
        setValue((value) => {
          const newValue = value.slice(0);
          const index = value.indexOf(item);
          index > -1 && newValue.splice(index, 1);
          return newValue;
        });
      },
    });

    const renderSelectedContent = ({ value, setValue }) => (
      <Space className={style["selected-tag"]} align={"center"} wrap={false}>
        <div>
          <FormattedMessage
            id="selectedTextAdvanced"
            moduleName="Common"
            defaultMessage="已选"
          />
          {!props.single &&
          Number.isInteger(props.maxLength) &&
          props.maxLength > 0
            ? `(${value.length}/${props.maxLength})`
            : ""}
          :
        </div>
        <SimpleBarBox className={style["selected-tag-list"]}>
          <div className={style["selected-tag-inner"]}>
            {renderDisplayLabel({
              value,
              mapping,
              onClose: (item) => {
                setValue((value) => {
                  const newValue = value.slice(0);
                  const index = value.indexOf(item);
                  index > -1 && newValue.splice(index, 1);
                  return newValue;
                });
              },
            })}
          </div>
        </SimpleBarBox>
      </Space>
    );

    const inputContent = inputContentRender ? (
      inputContentRender(selectInnerContext)
    ) : (
      <Space
        className={style["display-content"]}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
      >
        <div>
          {inner || (
            <span className={style["placeholder"]}>
              {placeholder || formatMessage({ id: "pleaseSelect" })}
            </span>
          )}
        </div>
        {hover && value && value.length > 0 && !disabled && allowClear ? (
          <Icon
            className={classnames(
              style["close"],
              style["input-icon"],
              "close",
              "input-icon"
            )}
            type="icon-shibai"
            onClick={(e) => {
              e.stopPropagation();
              setValue([]);
            }}
          />
        ) : (
          <Icon
            className={classnames(
              style["input-icon"],
              "input-icon-arrow",
              "input-icon"
            )}
            type="icon-arrow-thin-down"
          />
        )}
      </Space>
    );

    if (isPopup) {
      return (
        <PopupContent
          ref={popupRef}
          overlayWidth={numberToPx(
            Math.max(inputWidth, pxToNumber(props.overlayWidth))
          )}
          value={value}
          setValue={setValue}
          single={single}
          disabled={disabled}
          inputContent={inputContent}
          onOpenChange={props.onOpenChange}
          overlayClassName={overlayClassName}
          extra={
            typeof extra === "function"
              ? extra({
                  close: () => popupRef.current.close(),
                  context: selectInnerContext,
                })
              : extra
          }
          renderSelectedContent={renderSelectedContent}
          showSelectedTag={showSelectedTag}
          trigger="click"
          placement={placement}
          getPopupContainer={getPopupContainer}
        >
          {props.children}
        </PopupContent>
      );
    }

    return (
      <div
        className={style["input-inner"]}
        onClick={() => {
          if (!disabled) {
            modalRef.current.modalOpen();
          }
        }}
      >
        <ModalContent
          size={props.modalSize}
          ref={modalRef}
          single={props.single}
          maxLength={props.maxLength}
          onOpenChange={props.onOpenChange}
          disabledScroller
          wrapClassName={classnames(
            style["overlay"],
            style["is-modal"],
            wrapClassName
          )}
          title={props.placeholder || formatMessage({ id: "pleaseSelect" })}
          value={value}
          onChange={setValue}
          extra={
            typeof extra === "function"
              ? extra({
                  close: () => modalRef.current.close(),
                  context: selectInnerContext,
                })
              : extra
          }
          showSelectedTag={showSelectedTag}
          renderSelectedContent={renderSelectedContent}
        >
          {props.children}
        </ModalContent>
        {inputContent}
      </div>
    );
  }
);

const getValueInType = (value, mapping, type) => {
  if (type !== "all") {
    return value;
  }
  return value.map((item) => mapping.get(item)).filter((item) => !!item);
};

const setValueInType = (value, setMapping) => {
  if (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item && item.hasOwnProperty("value") && item.hasOwnProperty("label")
    )
  ) {
    setMapping(value);
    return value.map((item) => item.value);
  }
  return value;
};
const _SelectInnerInput = ({
  api,
  className,
  displayItems,
  wrapClassName,
  ...props
}) => {
  const { locale } = usePreset();
  const [searchText, setSearchText] = useState("");
  const [mapping, setMapping] = useState(
    new Map(displayItems.map((item) => [item.value, item]))
  );
  const { formatMessage } = useIntl({ moduleName: "Common" });
  const [inputWidth, setInputWidth] = useState(0);

  const inputRef = useResize((el) => {
    setInputWidth(el.clientWidth);
  });

  const [fetchApi, setFetchApi] = useState({});
  const { message } = App.useApp();
  const appendMapping = (items) => {
    const newItems = items.filter((item) => mapping.get(item.value) !== item);

    if (newItems.length === 0) {
      return;
    }

    setMapping((mapping) => {
      const newMapping = clone(mapping);
      newItems.forEach((item) => {
        newMapping.set(item.value, item);
      });
      return newMapping;
    });
  };

  const transformValue = (value) => {
    return setValueInType(
      props.single ? (isNil(value) ? [] : [value]) : value || [],
      appendMapping,
      props.valueType
    );
  };

  const [value, setValue] = useControlValue(
    Object.assign(
      {},
      props,
      {
        onChange: (value) => {
          const newValue = getValueInType(value, mapping, props.valueType);
          props.onChange &&
            props.onChange(props.single ? last(newValue) : newValue);
        },
      },
      "value" in props
        ? { value: transformValue(props.value) }
        : { defaultValue: transformValue(props.defaultValue) }
    )
  );
  const setValueWithMaxLength = createValueWithMaxLength({
    maxLength: props.maxLength,
    single: props.single,
    setValue,
    value,
    message: () =>
      message.error(
        formatMessage({ id: "maxSelectedCount" }, { count: props.maxLength })
      ),
  });

  const contentRef = useRef(null);

  return (
    <Provider
      value={{
        inputWidth,
        mapping,
        searchText,
        setSearchText,
        appendMapping,
        setItems: (data) => {
          fetchApi.setData(data);
          appendMapping(get(props.dataFormat(data, { locale }), "list", []));
        },
        getContentApi: () => {
          return contentRef.current;
        },
        fetchApi,
        valueState: [value, setValueWithMaxLength],
        props,
      }}
    >
      <div
        ref={inputRef}
        className={classnames(
          style[
            `input${
              props.inputContent && typeof props.inputContent === "function"
                ? "-custom"
                : ""
            }`
          ],
          { "select-input-disabled": !!props.disabled },
          className
        )}
      >
        <DisplayLabel
          {...api}
          wrapClassName={wrapClassName}
          loading={null}
          setFetchApi={setFetchApi}
          getContentRef={(ref) => {
            if (ref.current) contentRef.current = ref.current;
          }}
          onRequestSuccess={(data) => {
            appendMapping(get(props.dataFormat(data, { locale }), "list", []));
            api.onRequestSuccess && api.onRequestSuccess(data);
          }}
        />
      </div>
    </Provider>
  );
};

_SelectInnerInput.defaultProps = {
  displayItems: [],
  extra: null,
  api: {
    loader: () => [],
  },
  dataFormat: (data) => {
    return { list: data };
  },
  placement: "bottomLeft",
  showSelectedTag: true,
  allowClear: true,
};

const SelectInnerInput = createWithIntl({
  importMessages,
  moduleName: "Common",
})(_SelectInnerInput);

SelectInnerInput.useContext = useContext;

export default SelectInnerInput;
