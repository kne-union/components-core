import { getScrollEl } from "@common/utils/importantContainer";

const getPopupContainer = (triggerNode) => {
  const findAntdPopupContainer = (el) => {
    const currentBody = getScrollEl();
    if (!el || el === currentBody || !el.parentElement) {
      return currentBody;
    }
    const targetEl = [].slice
      .call(el.classList, 0)
      .find(
        (className) =>
          [
            "ant-modal-body",
            "ant-modal-content",
            "ant-popover-content",
          ].indexOf(className) > -1
      );
    if (targetEl) {
      return el;
    }
    return findAntdPopupContainer(el.parentElement);
  };
  return findAntdPopupContainer(triggerNode);
};

export default getPopupContainer;
