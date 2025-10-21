import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import { Select } from "../styledComponents";

const SelectComponent = (props: any) => {
  const { label, name, ...rest } = props;
  const options = rest.options || [];
  return (
    <div className="form-control custom-dropdown">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest} className="select">
        <option key={-1} value={-1}>
          Select
        </option>
        {options.map((option) => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </Field>

      <ErrorMessage
        component={() => (
          <TextError>
            <span>111</span>
          </TextError>
        )}
        name={name}
      />
    </div>
  );
};

export default SelectComponent;
