import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/ManageAccounts";
import { read } from "fs";

const profileForm = {
  key: "profileForm",
  pageTitle: "Update Profile",
  subTitle: "Keep your profile up to date",
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
      readonly: true,
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
    {
      element: "input",
      type: "text",
      name: "mobile2",
      label: "Mobile 2",
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

export default profileForm;
