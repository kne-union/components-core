import formInfoMessage from "@components/FormInfo/locale/zh-CN.js";
import commonMessage from "@common/components/locale/zh-CN.js";

const message = {
  filterText: "筛选",
  moreText: "更多",
  selectedText: "您已选择",
  clearAllText: "清空全部",
  toggleUpText: "收起",
  selectedTextAdvanced: "已选",
  clearText: "清空筛选",
  otherText: "其他",
  cancelText: "取消",
  determineText: "确定",
  year: "年",
  over: "{count}{unit}以上",
  lessThan: "{count}{unit}以下",
};

export default Object.assign({}, commonMessage, formInfoMessage, message);
