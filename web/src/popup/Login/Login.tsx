import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  getLoginStatus,
} from "../../store/components/users/users";
import {
  setToggleStatus,
} from "../../store/components/uiInteraction/uiInteraction";
import DynamicForm from '../DynamicForm/DynamicForm';
import { getFormData } from "../../store/components/users/users";

export default () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getLoginStatus);
  const formData = useAppSelector(getFormData("loginForm"));

  return (
    <DynamicForm dynamicFormData={formData}>
      {/* Sign Up Link */}
      <Box sx={{ textAlign: "center" }}>
        <Divider sx={{ marginBottom: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Don't have an account?
          </Typography>
        </Divider>
        
        <Button
          variant="outlined"
          fullWidth
          size="small"
          sx={{
            height: 32,
            borderRadius: 2,
            padding: "12px 24px",
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(255, 107, 53, 0.08)",
              borderColor: "primary.dark",
            },
          }}
          onClick={() => {
            if (isLoggedIn)
              dispatch(
                setToggleStatus({ key: "profilePage", status: false })
              );
            else
              dispatch(
                setToggleStatus({ key: "loginForm", status: false })
              );
            dispatch(
              setToggleStatus({ key: "registerForm", status: true })
            );
          }}
        >
          Create New Account
        </Button>
      </Box>
    </DynamicForm>
  );
};
