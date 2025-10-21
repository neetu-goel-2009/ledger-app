import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";

const signupForm = {
  key: "loginForm",
  pageTitle: "User Login",
  subTitle: "Sign in to your account",
  pageIcon: PersonIcon,
  formElements: [
    {
      element: "input",
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Enter Name",
      value: "",
      validation: "required",
    },
    {
      element: "input",
      type: "text",
      name: "email",
      label: "E-Mail",
      placeholder: "Enter E-Mail",
      value: "",
      validation: "email",
    },
    {
      element: "input",
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter Password",
      value: "",
      validation: "password",
    },
    {
      element: "input",
      type: "text",
      name: "mobile",
      label: "Mobile",
      placeholder: "Enter Mobile No.",
      value: "",
      validation: "mobile",
    },
  ],
  loadData: null,
  saveData: { endPoint: "save/data" },
  updateData: null,
  deleteData: null,
};

export default signupForm;
