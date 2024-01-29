import { useFormContext, util } from "@kne/react-form-antd";
import { Popover } from "antd";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import classnames from "classnames";
import useClickOutside from "@kne/use-click-outside";
import style from "./style.module.scss";

const useErrorMsg = ({ name, groupName, groupIndex }) => {
  const { emitter, formState } = useFormContext();
  const targetFieldInfo = useRef({ name, groupName, groupIndex });
  targetFieldInfo.current = { name, groupName, groupIndex };
  const formStateRef = useRef(formState);
  formStateRef.current = formState;
  const [currentError, setCurrentError] = useState(null);
  useEffect(() => {
    const target = emitter.addListener(
      "form-field-validate-complete",
      ({ id, validate }) => {
        const field = formStateRef.current[id];
        if (!field) {
          return;
        }
        const currentField = targetFieldInfo.current;
        if (
          field.name === currentField.name &&
          (!currentField.groupName ||
            (field.groupName === currentField.groupName &&
              field.groupIndex === currentField.groupIndex))
        ) {
          setCurrentError(
            validate.status === 2
              ? Object.assign({}, validate, {
                  label: field.label,
                  errMsg: util.compileErrMsg(validate.msg, field.label),
                })
              : null
          );
        }
      }
    );
    return () => {
      target && target.remove();
    };
  }, [emitter]);
  return currentError;
};

const ErrorTip = ({
  name,
  groupName,
  overlayClassName,
  errorRender,
  groupIndex,
  children,
}) => {
  const currentError = useErrorMsg({ name, groupName, groupIndex });
  const [isHover, setIsHover] = useState(false);
  const open = currentError && isHover;
  const errorContent =
    open &&
    errorRender(
      Object.assign({}, currentError, { closeHover: () => setIsHover(false) })
    );
  const popoverChildrenRef = useRef(null),
    popoverContentRef = useRef(null);

  const outerRef = useClickOutside(() => {
    setIsHover(false);
  });
  outerRef.current = {
    contains: (target) => {
      return (
        popoverChildrenRef.current.contains(target) ||
        (popoverContentRef.current &&
          popoverContentRef.current.contains(target))
      );
    },
  };
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const callback = () => {
      const target = popoverChildrenRef.current.querySelector(
        ".react-form__field-component"
      );
      target && setWidth(target.clientWidth);
    };
    callback();
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(popoverChildrenRef.current);
    const mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(popoverChildrenRef.current, {
      subtree: true,
      childList: true,
    });
    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <Popover
      open={!!errorContent}
      overlayClassName={classnames(
        overlayClassName,
        style["error-tip-overlay"]
      )}
      content={
        errorContent && (
          <div
            ref={popoverContentRef}
            style={{ width }}
            className={classnames(style["error-tip-overlay-content"])}
          >
            {errorContent}
          </div>
        )
      }
      placement="bottom"
      transitionName={"ant-slide-up"}
      arrow={false}
    >
      <div
        className={classnames("error-tip")}
        ref={popoverChildrenRef}
        onMouseEnter={() => {
          setIsHover(true);
        }}
      >
        {children}
      </div>
    </Popover>
  );
};

ErrorTip.defaultProps = {
  errorRender: () => {
    return null;
  },
};

export default ErrorTip;
