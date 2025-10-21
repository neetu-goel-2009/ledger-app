// hooks/useAuth.ts
import { useAppDispatch } from '../store/hooks';
import { handleGoogleLogin } from '../utils/login/google/googleLogin';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const loginWithGoogle = async () => {
    return handleGoogleLogin(dispatch);
  };

  return {
    loginWithGoogle,
  };
};