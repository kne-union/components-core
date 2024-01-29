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
import SimpleBar from "@common/components/SimpleBar";

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
          message(`最多选择${maxLength}个`);
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
    propsValueRef.current = propsValue;
    const [modalOpen, setModalOpen] = useState(false);
    const { message } = App.useApp();
    const setValueWithMaxLength = createValueWithMaxLength({
      maxLength: props.maxLength,
      single: props.single,
      setValue,
      value,
      message: message.error,
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
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(
      ref,
      () => {
        return {
          close: () => {
            setOpen(false);
          },
        };
      },
      []
    );
    return (
      <Popover
        {...props}
        open={open}
        onOpenChange={setOpen}
        overlayClassName={style["overlay"]}
        arrow={false}
        content={
          <div
            style={overlayWidth ? { "--overlay-width": overlayWidth } : {}}
            className={style["overlay-content"]}
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
  ({ setFetchApi, wrapClassName, ...fetchApi }) => {
    const [hover, setHover] = useState(false);
    const modalRef = useRef(null);
    const popupRef = useRef(null);
    const selectInnerContext = useContext();
    const { valueState, mapping, props } = selectInnerContext;
    const [value, setValue] = valueState;
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
    } = props;
    const fetchApiRef = useRef(fetchApi);
    fetchApiRef.current = fetchApi;

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
      <Space className={style["selected-tag"]} align={"center"} wrap>
        <div>
          已选
          {!props.single &&
          Number.isInteger(props.maxLength) &&
          props.maxLength > 0
            ? `(${value.length}/${props.maxLength})`
            : ""}
          :
        </div>
        <SimpleBar className={style["selected-tag-list"]}>
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
        </SimpleBar>
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
          {inner || <span className={style["placeholder"]}>{placeholder}</span>}
        </div>
        {hover && value && value.length > 0 && !disabled ? (
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
          overlayWidth={props.overlayWidth}
          value={value}
          setValue={setValue}
          single={single}
          inputContent={inputContent}
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
          modalRef.current.modalOpen();
        }}
      >
        <ModalContent
          size={props.modalSize}
          ref={modalRef}
          single={props.single}
          maxLength={props.maxLength}
          disabledScroller
          wrapClassName={classnames(
            style["overlay"],
            style["is-modal"],
            wrapClassName
          )}
          title={props.placeholder}
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
  return value.map((item) => mapping.get(item));
};

const setValueInType = (value, setMapping, type) => {
  if (type !== "all") {
    return value;
  }
  setMapping(value);
  return value.map((item) => item.value);
};

const SelectInnerInput = ({
  api,
  className,
  displayItems,
  wrapClassName,
  ...props
}) => {
  const [searchText, setSearchText] = useState("");
  const [mapping, setMapping] = useState(
    new Map(displayItems.map((item) => [item.value, item]))
  );
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
    message: message.error,
  });

  return (
    <Provider
      value={{
        mapping,
        searchText,
        setSearchText,
        appendMapping,
        setItems: (data) => {
          fetchApi.setData(data);
          appendMapping(get(props.dataFormat(data), "list", []));
        },
        fetchApi,
        valueState: [value, setValueWithMaxLength],
        props,
      }}
    >
      <div
        className={classnames(
          style[
            `input${
              props.inputContent && typeof props.inputContent === "function"
                ? "-custom"
                : ""
            }`
          ],
          className
        )}
      >
        <DisplayLabel
          {...api}
          wrapClassName={wrapClassName}
          loading={null}
          setFetchApi={setFetchApi}
          onRequestSuccess={(data) => {
            appendMapping(get(props.dataFormat(data), "list", []));
            api.onRequestSuccess && api.onRequestSuccess(data);
          }}
        />
      </div>
    </Provider>
  );
};

SelectInnerInput.defaultProps = {
  placeholder: "请选择",
  displayItems: [],
  extra: null,
  api: {
    loader: () => [],
  },
  dataFormat: (data) => {
    return { list: data };
  },
  placement: "bottomLeft",
  getPopupContainer: null,
  showSelectedTag: true,
};

SelectInnerInput.useContext = useContext;

export default SelectInnerInput;
