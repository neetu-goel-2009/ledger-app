// import { useField, Form, FormikProps, Formik } from "formik";

import InputBox from "./InputBox/InputBox";
import Textarea from "./Textarea/Textarea";
import Select from "./Select/Select";
import RadioButtons from "./RadioButtons/RadioButtons";
import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import DatePicker from "./DatePicker/DatePicker";
import ChakraInput from "./ChakraInput/ChakraInput";

// import "./header.scss";

const FormElement = (props: any) => {
  const { element, ...rest } = props;
  switch (element) {
    case "input":
      return <InputBox {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
    case "dropdown":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "chakraInput":
      return <ChakraInput {...rest} />;
    default:
      return null;
  }
};

export default FormElement;
