import * as Yup from "yup";

const validationFormat = {
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
};

export default validationFormat;
