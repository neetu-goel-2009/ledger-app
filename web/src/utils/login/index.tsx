import { AppDispatch } from "../../store/store";
import { setToggleStatus, setDynamicFormData } from "../../store/components/uiInteraction/uiInteraction";
import { LoginFormExtras } from '../../components/login/LoginFormExtras';

export const handleLogin = (dispatch: AppDispatch, userFormData, isLoggedIn: boolean) => {
  const loginFormData = userFormData("loginForm");
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
  ]));
  dispatch(setToggleStatus({ key: "dynamicForm", status: true }));
};