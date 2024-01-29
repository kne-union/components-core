import { createContext, createElement, useContext, useMemo } from "react";
import style from "./style.module.scss";

const context = createContext({});
const { Provider } = context;

const escapeSpecialCharacter = (str) => {
  const pattern =
    /[`+~!@#_$%^*()=|{}':;,\\[\].<>/?！￥…&（）—【】‘；：”“。，、？\s]/g;
  return str.replace(pattern, (match) => "\\" + match);
};

export const HighlightProvider = ({ list, children, highlightClassName }) => {
  return (
    <Provider value={{ list, highlightClassName }}>
      <span data-testid="components-core-highlight">{children}</span>
    </Provider>
  );
};
HighlightProvider.defaultProps = {
  caseSensitive: false,
  list: [],
  highlightClassName: "",
};
const Highlight = ({ tagName, children }) => {
  const { list, caseSensitive, highlightClassName } = useContext(context);
  const renderStr = useMemo(() => {
    if (!children) return;
    let target = children?.toString();
    if (!list || list.length === 0) {
      return target;
    }
    const allWordsRe = list
      .map(function (word) {
        return "(" + escapeSpecialCharacter(word) + ")";
      })
      .join("|");

    const regExp = new RegExp(allWordsRe, caseSensitive ? "gm" : "gim");

    return target.replace(regExp, (innerMatch) => {
      return `<font class="${style["high-color"]} ${highlightClassName}">${innerMatch}</font>`;
    });
  }, [list, caseSensitive, children, highlightClassName]);

  return createElement(tagName, {
    dangerouslySetInnerHTML: { __html: renderStr },
  });
};
Highlight.defaultProps = {
  tagName: "span",
  children: "",
};

// Highlight.propTypes={
//     children:PropTypes.string
// }
export default Highlight;
