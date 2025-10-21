import { AppDispatch } from "../../store/store";
import { setToggleStatus, setDynamicFormData, saveDynamicFormData, loadDynamicFormData } from "../../store/components/uiInteraction/uiInteraction";
import { LoginFormExtras } from '../../components/login/LoginFormExtras';
import { setToken, setUser } from "../../store/components/users/users";

export const handleLogin = (dispatch: AppDispatch, userFormData, isLoggedIn: boolean) => {
  const loginFormData = userFormData("loginForm");

  const onSubmitCB = (values: any) => {
    dispatch(saveDynamicFormData(`/users/login`, values)())
    .unwrap()
    .then((response) => {

      // const id = response.id || null;
      dispatch(setToggleStatus({ key: "dynamicForm", status: false }));
      
      dispatch(setUser(response.user));
      dispatch(setToken({ mode: response.mode, token: response.token, refresh_token: response.refresh_token }));
      // if (id) {
      //   dispatch(loadDynamicFormData(`/users/${id}`)())
      //   .unwrap()
      //   .then((response) => {
      //     // Handle successful form data loading
      //     dispatch(setUser(response));
      //     dispatch(setToken({ mode: res.data.mode, token: res.data.token, refresh_token: res.data.refresh_token }));
      //   })
      //   .catch((error) => {
      //     // Handle error loading user data
      //     dispatch(setDynamicFormData([{
      //       key: "error",
      //       value: "Failed to load user data. Please try again."
      //     }]));
      //   });
      // }
    })
    .catch((error) => {
      // Handle login error
      console.log({ error });
      const errorMessage = error.response?.data?.detail || "Invalid email or password. Please try again.";
      dispatch(setDynamicFormData([{
        key: "error",
        value: errorMessage
      }]));
    });
  };
  
  dispatch(setDynamicFormData([
    {
      key: "formData", 
      value: {
        ...loginFormData,
        postFormChildren: () => (
          <LoginFormExtras dispatch={dispatch} isLoggedIn={isLoggedIn} />
        )
      }
    },
    {
      key: "submitCB",
      value: onSubmitCB,
    },
  ]));
  dispatch(setToggleStatus({ key: "dynamicForm", status: true }));
};