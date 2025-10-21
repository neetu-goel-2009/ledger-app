import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/ManageAccounts";

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
      name: "username",
      label: "E-Mail",
      placeholder: "Enter E-Mail",
      value: "",
      validation: "email",
    },
    {
      element: "input",
      type: "text",
      name: "phone",
      label: "Mobile",
      placeholder: "Enter Mobile No.",
      value: "",
      validation: "phoneno",
    },
  ],
  loadData: null,
  saveData: { endPoint: "save/data" },
  updateData: null,
  deleteData: null,
};

export default profileForm;
