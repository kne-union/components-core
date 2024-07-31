import { useRef } from "react";
import { Button } from "antd";
import { GroupList, useFormContext } from "@kne/react-form-antd";
import Icon from "@components/Icon";
import get from "lodash/get";
import style from "./style.module.scss";
import classnames from "classnames";

const MultiField = ({
  name,
  label,
  rule,
  field,
  defaultLength,
  minLength,
  maxLength,
  ...props
}) => {
  const ref = useRef(null);
  const CurrentFiled = field;
  const context = useFormContext();
  const { formData } = context;
  const allowAdd = !(
    maxLength && maxLength <= get(formData, `${name}.length`, 0)
  );
  return (
    <div className={classnames(style["mult-field"], "mult-field")}>
      <GroupList
        ref={ref}
        name={name}
        defaultLength={Math.max(defaultLength, minLength, 1)}
      >
        {(key, { index, onRemove, length }) => {
          return (
            <div
              key={key}
              className={classnames(
                style["mult-field-item"],
                "mult-field-item",
                {
                  [style["first-item"]]: index === 0,
                }
              )}
            >
              <CurrentFiled {...props} name={name} label={label} rule={rule} />
              <div>
                <div
                  className={classnames(
                    style["react-form__field-label"],
                    "react-form__field-label",
                    "mult-field-delete--label"
                  )}
                />
                <Button
                  icon={<Icon type="shanchu" />}
                  onClick={onRemove}
                  disabled={length <= Math.max(minLength, 1)}
                />
              </div>
            </div>
          );
        }}
      </GroupList>
      {allowAdd && (
        <Button
          className={style["mult-field-add-btn"]}
          type="dashed"
          onClick={() => ref.current.onAdd()}
        >
          <Icon type="tianjia" />
          添加{label}
        </Button>
      )}
    </div>
  );
};

MultiField.defaultProps = {
  minLength: 1,
  defaultLength: 1,
};

export default MultiField;
