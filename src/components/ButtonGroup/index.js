import { startTransition, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";
import { Button, Dropdown, Space } from "antd";
import classnames from "classnames";
import Icon from "@components/Icon";
import LoadingButton from "@components/LoadingButton";
import ConfirmButton from "@components/ConfirmButton";
import { useConfirmModal } from "@components/Modal";
import useResize from "@common/hooks/useResize";
import pick from "lodash/pick";
import style from "./style.module.scss";

const ButtonGroup = ({ list, more, compact, ...props }) => {
  const spaceProps = pick(props, ["size", "split", "align", "style"]);
  const [showLength, setShowLength] = useState(list.length);
  const confirmModal = useConfirmModal();
  const computedLength = useRefCallback(() => {
    const el = targetRef.current,
      moreEl = moreRef.current,
      widthEl = ref.current;

    const buttonEls = el.querySelectorAll(".button-group-item");
    if (!buttonEls) {
      return;
    }
    const buttonElLength = buttonEls.length;
    if (buttonEls.length === 0) {
      return;
    }
    const amountWidth = widthEl.clientWidth,
      moreBtnWidth = moreEl.clientWidth,
      spaceWidth = (() => {
        if (compact) {
          return 0;
        }

        if (["small", "middle", "large"].indexOf(spaceProps.size) > -1) {
          return (
            (["small", "middle", "large"].indexOf(spaceProps.size) + 1) * 8
          );
        }

        if (Number.isInteger(spaceProps.size)) {
          return spaceProps.size;
        }
        return 8;
      })();
    let targetLength = 0,
      targetWidth = 0,
      buttonWidthList = [].map.call(buttonEls, (el) => el.offsetWidth);
    // 采取先加后减策略
    while (
      amountWidth >=
        targetWidth +
          buttonWidthList[targetLength] +
          targetLength * spaceWidth &&
      targetLength < buttonElLength
    ) {
      targetWidth += buttonWidthList[targetLength];
      targetLength += 1;
    }

    while (
      amountWidth <
        targetWidth +
          (targetLength - 1) * spaceWidth +
          (targetLength < buttonElLength ? moreBtnWidth + spaceWidth : 0) &&
      targetLength > 0
    ) {
      targetWidth -= buttonWidthList[targetLength - 1];
      targetLength -= 1;
    }

    startTransition(() => {
      setShowLength(targetLength);
    });
  });
  const ref = useResize(computedLength);
  const targetRef = useResize(computedLength);
  const moreRef = useResize(computedLength);

  const otherList = list.slice(showLength);

  const renderButton = ({ className, confirm, ...props }, index) => {
    const isConfirm = confirm || props.message;
    const CurrentButton = isConfirm ? ConfirmButton : LoadingButton;
    return (
      <CurrentButton
        danger={isConfirm && props.isDelete !== false}
        {...props}
        key={index}
        className={classnames("button-group-item", className)}
      />
    );
  };

  const SpaceComponent = compact ? Space.Compact : Space;

  return (
    <>
      <div className={style["width-container"]} ref={ref} />
      <div className={style["hidden-container"]}>
        <div className={style["hidden-inner"]} ref={moreRef}>
          {more}
        </div>
        <div className={style["hidden-inner"]} ref={targetRef}>
          <SpaceComponent {...spaceProps}>
            {list.map(renderButton)}
          </SpaceComponent>
        </div>
      </div>
      <SpaceComponent {...spaceProps}>
        {list.slice(0, showLength).map(renderButton)}
        {otherList.length > 0 && (
          <Dropdown
            menu={{
              items: otherList.map(
                (
                  {
                    children,
                    confirm,
                    message,
                    onClick,
                    title,
                    isDelete,
                    okText,
                    ...props
                  },
                  key
                ) => ({
                  ...props,
                  key,
                  label: children,
                  onClick: (e) => {
                    const isConfirm = confirm || message;
                    isConfirm
                      ? confirmModal({
                          danger: isDelete !== false,
                          type: "confirm",
                          title,
                          message: message || "确定要删除吗?",
                          onOk: onClick,
                          okText: okText || (isDelete !== false && "删除"),
                        })
                      : onClick && onClick(e);
                  },
                })
              ),
            }}
          >
            {more}
          </Dropdown>
        )}
      </SpaceComponent>
    </>
  );
};

ButtonGroup.defaultProps = {
  more: (
    <Button>
      更多
      <Icon type="icon-arrow-thin-down" />
    </Button>
  ),
};

export default ButtonGroup;
