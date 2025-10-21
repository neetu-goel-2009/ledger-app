import { AppDispatch } from "../../store/store";
import { setToggleStatus, setDynamicFormData, loadDynamicFormData, updateDynamicFormData, saveDynamicFormData } from "../../store/components/uiInteraction/uiInteraction";
// import { LoginFormExtras } from '../../components/login/LoginFormExtras';
import { setFormData, setToken, setUser } from "../../store/components/users/users";

export const handleSignup = (dispatch: AppDispatch, userFormData) => {
  // Map user data to form field names
  const onSubmitCB = (values: any) => {
    dispatch(saveDynamicFormData(`/users`, values)())
    .unwrap()
    .then((response) => {
      // const id = response.id || null;
      dispatch(setUser(response.user));
      dispatch(setToken({ mode: response.mode, token: response.token, refresh_token: response.refresh_token }));
      dispatch(setToggleStatus({ key: "dynamicForm", status: false }));
      // if (id) {
      //   dispatch(loadDynamicFormData(`/users/${id}`)())
      //   .unwrap()
      //   .then((response) => {
      //     // Handle successful form data loading
          
      //   });
      // }
    });
  };

  // First get the current form structure
  const currentFormData = userFormData("signupForm");
  
  // // Map user data to form field names
  // const mappedUserData = {
  //   name: data.user.name || data.user.fullName,
  //   email: data.user.email,  // Using email as email
  //   mobile: data.user.mobile || '',
  // };

  // // Prepare the form data with mapped values
  // const updatedFormData = {
  //   ...currentFormData,
  //   formElements: currentFormData.formElements.map(elem => ({
  //     ...elem,
  //     value: mappedUserData[elem.name] || ''
  //   }))
  // };

  // Update both states at once
  // dispatch(setFormData({ key: "signupForm", value: currentFormData }));
  dispatch(setDynamicFormData([
    { 
      key: "formData", 
      value: currentFormData
    },
    {
      key: "submitCB",
      value: onSubmitCB,
    },
  ]));
  
  // Show the form
  dispatch(setToggleStatus({ key: "dynamicForm", status: true }));
};