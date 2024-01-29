import HelperGuide from "@components/HelperGuide";
import { createContext, useContext as useReactContext } from "react";
import { useGroup } from "@kne/react-form-antd";
import style from "./style.module.scss";

const context = createContext("");
export const { Provider } = context;

const useContext = () => {
  return useReactContext(context);
};

const HelperGuideLabel = ({ name }) => {
  const helperGuideName = useContext();
  const group = useGroup();
  return (
    helperGuideName && (
      <HelperGuide
        className={style["helper-guide-field"]}
        name={
          helperGuideName + "-" + (group.name ? group.name + "-" : "") + name
        }
      />
    )
  );
};

export default HelperGuideLabel;
