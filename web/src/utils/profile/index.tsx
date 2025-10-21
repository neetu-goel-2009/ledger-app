import { AppDispatch } from "../../store/store";
import { setToggleStatus, setDynamicFormData, saveDynamicFormData } from "../../store/components/uiInteraction/uiInteraction";
// import { LoginFormExtras } from '../../components/login/LoginFormExtras';
import { setFormData } from "../../store/components/users/users";

export const handleProfileUpdate = (dispatch: AppDispatch, userFormData, data: { user: any }) => {
  // close the original popup 
  dispatch(setToggleStatus({ key: "profilePage", status: false }));

  const onSubmitCB = (values: any) => {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa onSubmitCB");
    dispatch(saveDynamicFormData("", values))
      .unwrap()
      .then(() => {
        dispatch(setToggleStatus({ key: "dynamicForm", status: false }));
        loadLibraryData();
      });
  };

  // First get the current form structure
  const currentFormData = userFormData("profileForm");
  
  // Map user data to form field names
  const mappedUserData = {
    name: data.user.name || data.user.fullName,
    username: data.user.email,  // Using email as username
    phone: data.user.mobile || data.user.phone,
  };

  // Prepare the form data with mapped values
  const updatedFormData = {
    ...currentFormData,
    formElements: currentFormData.formElements.map(elem => ({
      ...elem,
      value: mappedUserData[elem.name] || ''
    }))
  };

  // Update both states at once
  dispatch(setFormData({ key: "profileForm", value: mappedUserData }));
  dispatch(setDynamicFormData([
    { 
      key: "formData", 
      value: updatedFormData
    },
  ]));
  
  // Show the form
  dispatch(setToggleStatus({ key: "dynamicForm", status: true }));
};