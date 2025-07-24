import Enum from "@components/Enum";
import StateTag from "./StateTag";

const StateTagEnum = ({moduleName, name, ...props}) => {
  return (
    <Enum moduleName={moduleName} name={name}>
      {data => <StateTag {...props} text={data.description} {...data} />}
    </Enum>
  );
};

export default StateTagEnum;
