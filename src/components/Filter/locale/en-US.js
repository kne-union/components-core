import formInfoMessage from "@components/FormInfo/locale/en-US.js";
import commonMessage from "@common/components/locale/en-US.js";

const message = {
  filterText: "Filter",
  moreText: "More",
  selectedText: "Selected",
  clearAllText: "Clear All",
  toggleUpText: "Pack Up",
  selectedTextAdvanced: "Selected",
  clearText: "Clear Filter",
  otherText: "Other",
  cancelText: "Cancel",
  determineText: "Determine",
  year: "year",
  over: "over {count} {unit}s",
  lessThan: "less than {count} {unit}s",
};

export default Object.assign({}, commonMessage, formInfoMessage, message);
