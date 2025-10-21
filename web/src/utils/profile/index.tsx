import { AppDispatch } from "../../store/store";
import { setToggleStatus, setDynamicFormData, loadDynamicFormData, updateDynamicFormData } from "../../store/components/uiInteraction/uiInteraction";
// import { LoginFormExtras } from '../../components/login/LoginFormExtras';
import { setFormData, setUser } from "../../store/components/users/users";

export const handleProfileUpdate = (dispatch: AppDispatch, userFormData, data: { user: any }) => {
  // close the original popup 
  dispatch(setToggleStatus({ key: "profilePage", status: false }));

  // Map user data to form field names
  const id = data.user.id || null;

  const onSubmitCB = (values: any) => {
    if (id) {
      dispatch(updateDynamicFormData(`/users/${id}`, values)())
      .unwrap()
      .then(() => {
        dispatch(setToggleStatus({ key: "dynamicForm", status: false }));
        dispatch(loadDynamicFormData(`/users/${id}`)())
        .unwrap()
        .then((response) => {
          // Handle successful form data loading
          dispatch(setUser(response));
        });
      });
    }
  };

  // First get the current form structure
  const currentFormData = userFormData("profileForm");
  
  // Map user data to form field names
  const mappedUserData = {
    name: data.user.name || data.user.fullName,
    email: data.user.email,  // Using email as email
    mobile: data.user.mobile || '',
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
    {
      key: "submitCB",
      value: onSubmitCB,
    },
  ]));
  
  // Show the form
  dispatch(setToggleStatus({ key: "dynamicForm", status: true }));
};