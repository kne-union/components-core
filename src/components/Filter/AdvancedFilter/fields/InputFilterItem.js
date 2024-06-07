import { Input, Space, Button } from "antd";
import { useState, useEffect, useRef } from "react";
import useSimulationBlur from "@kne/use-simulation-blur";
import { useIntl } from "@components/Intl";

const InputFilterItem = ({ value, label, onChange, ...props }) => {
  const propsValue = value?.value;
  const [inputValue, setInputValue] = useState(propsValue || "");
  const [active, setActive] = useState(false);
  const { formatMessage } = useIntl({ moduleName: "Filter" });
  const searchHandler = () => {
    onChange(inputValue ? { label: inputValue, value: inputValue } : null);
  };
  const ref = useSimulationBlur(() => {
    setActive(false);
    searchHandler();
  });
  const inputValueRef = useRef("");
  inputValueRef.current = inputValue;

  useEffect(() => {
    if (propsValue !== inputValueRef.current) {
      setInputValue(propsValue);
    }
  }, [propsValue]);
  return (
    <span ref={ref}>
      <Space.Compact>
        <Input
          placeholder={`${formatMessage({ id: "pleaseInput" })}${label}`}
          {...props}
          size="small"
          value={inputValue}
          onFocus={() => {
            setActive(true);
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onPressEnter={searchHandler}
        />
        {active && (
          <Button size="small" type="primary" onClick={searchHandler}>
            {formatMessage({ id: "search" })}
          </Button>
        )}
      </Space.Compact>
    </span>
  );
};

export default InputFilterItem;
