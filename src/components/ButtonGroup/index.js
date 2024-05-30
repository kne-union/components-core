import { startTransition, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";
import { Button, Dropdown, Space } from "antd";
import classnames from "classnames";
import Icon from "@components/Icon";
import LoadingButton from "@components/LoadingButton";
import ConfirmButton from "@components/ConfirmButton";
import useResize from "@common/hooks/useResize";
import pick from "lodash/pick";
import style from "./style.module.scss";
import memoize from "lodash/memoize";

const areaWidthComputed = memoize(
  ({ amountWidth, moreBtnWidth, buttonWidthList, spaceProps, compact }) => {
    const spaceWidth = (() => {
      if (compact) {
        return 0;
      }

      if (["small", "middle", "large"].indexOf(spaceProps.size) > -1) {
        return (["small", "middle", "large"].indexOf(spaceProps.size) + 1) * 8;
      }

      if (Number.isInteger(spaceProps.size)) {
        return spaceProps.size;
      }
      return 8;
    })();

    let targetLength = 0,
      targetWidth = 0;

    // 采取先加后减策略
    while (
      amountWidth >=
        targetWidth +
          buttonWidthList[targetLength] +
          targetLength * spaceWidth &&
      targetLength < buttonWidthList.length
    ) {
      targetWidth += buttonWidthList[targetLength];
      targetLength += 1;
    }

    while (
      amountWidth <
        targetWidth +
          (targetLength - 1) * spaceWidth +
          (targetLength < buttonWidthList.length
            ? moreBtnWidth + spaceWidth
            : 0) &&
      targetLength > 0
    ) {
      targetWidth -= buttonWidthList[targetLength - 1];
      targetLength -= 1;
    }

    return targetLength;
  },
  ({ amountWidth, moreBtnWidth, buttonWidthList, spaceProps, compact }) => {
    return `${amountWidth}${moreBtnWidth}${buttonWidthList.join(
      ","
    )}${Object.values(spaceProps).join(",")}${compact && compact.toString()}`;
  }
);

const ButtonGroup = ({ list, more, compact, ...props }) => {
  const spaceProps = pick(props, ["size", "split", "align", "style"]);
  const [showLength, setShowLength] = useState(list.length && 1);
  const computedLength = useRefCallback(() => {
    const el = targetRef.current,
      moreEl = moreRef.current,
      widthEl = ref.current;
    if (!el) {
      return;
    }

    const buttonEls = el.querySelectorAll(".button-group-item");
    if (!buttonEls) {
      return;
    }
    if (buttonEls.length === 0) {
      return;
    }

    const amountWidth = widthEl.clientWidth,
      moreBtnWidth = moreEl.clientWidth,
      buttonWidthList = [].map.call(buttonEls, (el) => el.offsetWidth);
    const targetLength = areaWidthComputed({
      amountWidth,
      moreBtnWidth,
      buttonWidthList,
      spaceProps,
      compact,
    });
    startTransition(() => {
      setShowLength(targetLength);
    });
  });
  const ref = useResize(computedLength);
  const targetRef = useResize(computedLength);
  const moreRef = useResize(computedLength);
  const otherList = list.slice(showLength);

  const renderButton = (renderItem, index, isDropdown) => {
    if (typeof renderItem === "function") {
      return renderItem({
        key: index,
        className: classnames("button-group-item", style["btn-item"]),
        isDropdown,
      });
    }
    const { className, confirm, ...props } = renderItem;
    const isConfirm = confirm || props.message;
    const CurrentButton = isConfirm ? ConfirmButton : LoadingButton;

    return (
      <CurrentButton
        danger={isConfirm && props.isDelete !== false}
        {...Object.assign(
          {},
          props,
          isConfirm && (props.isModal || isDropdown)
            ? {
                isModal: true,
              }
            : {}
        )}
        key={index}
        className={classnames(
          "button-group-item",
          style["btn-item"],
          className
        )}
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
        {list
          .slice(0, showLength)
          .map((item, index) => renderButton(item, index, false))}
        {otherList.length > 0 && (
          <Dropdown
            overlayClassName={style["menu-list"]}
            menu={{
              items: otherList.map((item, index) => {
                return {
                  key: index,
                  label: renderButton(item, index, true),
                };
              }),
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
