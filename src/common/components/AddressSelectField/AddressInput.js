import AddressSelect from "./Address";
import { Col, Input, Row } from "antd";
import useControlValue from "@kne/use-control-value";
import useSimulationBlur from "@kne/use-simulation-blur";
import { useIntl, createWithIntl } from "@components/Intl";
import importMessages from "../locale";
import get from "lodash/get";
import pick from "lodash/pick";
import omit from "lodash/omit";

const AddressInputField = (props) => {
  const {
    isPopup,
    size,
    disabled,
    inputPlaceholder,
    onBlur,
    className,
    ...others
  } = props;
  const [value, setValue] = useControlValue(props);
  const addressProps = [
    "isPopup",
    "searchPlaceholder",
    "placeholder",
    "overlayWidth",
    "api",
    "dataFormat",
  ];
  const { formatMessage } = useIntl({ moduleName: "Common" });
  const ref = useSimulationBlur((e) => {
    onBlur && onBlur(e);
  });
  return (
    <div ref={ref}>
      <Row gutter={10}>
        <Col span={12}>
          <AddressSelect
            {...pick(others, addressProps)}
            className={className}
            disabled={disabled}
            single
            size={size}
            value={get(value, "city")}
            onChange={(city) => {
              setValue({ city, detail: get(value, "detail") });
            }}
          />
        </Col>
        <Col span={12}>
          <Input
            {...omit(others, addressProps)}
            className={className}
            placeholder={
              inputPlaceholder || formatMessage({ id: "pleaseInput" })
            }
            disabled={disabled}
            size={size}
            value={get(value, "detail")}
            onChange={(e) => {
              setValue({ city: get(value, "city"), detail: e.target.value });
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default createWithIntl({ importMessages, moduleName: "Common" })(
  AddressInputField
);
