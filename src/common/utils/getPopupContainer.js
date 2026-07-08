import { getScrollEl } from "@common/utils/importantContainer";
import { findResponsiveBoundary } from "@kne/responsive-utils";

const getPopupContainer = (triggerNode) => {
  if (!triggerNode) {
    return null;
  }
  const findAntdPopupContainer = (el) => {
    const currentBody = getScrollEl();
    if (!el || el === currentBody || !el.parentElement) {
      const boundary = findResponsiveBoundary(triggerNode);
      return boundary || null;
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
