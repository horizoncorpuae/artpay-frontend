import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Dialog,
  DialogContent,
  DialogTi,
  Typographytle,
  IconButton,
  Typography,
  DialogActions,
  DialogTitle,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Logo from "../components/icons/Logo";
import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import Checkbox from "../components/Checkbox.tsx";
import LinkButton from "../components/LinkButton.tsx";
import SignUpForm from "../components/SignUpForm.tsx";
import SignInForm from "../components/SignInForm.tsx";

export interface UserInfo {
  id: number;
  username: string;
  email: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: UserInfo;
}

export interface AuthContext extends AuthState {
  getRole: () => string;
  logout: () => Promise<boolean>;
  login: () => void;
}

export interface AuthProviderProps extends React.PropsWithChildren {
  baseUrl?: string;
}

interface LoginArgs {
  identifier: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
  user: UserInfo;
}

const Context = createContext<AuthContext>({
  isAuthenticated: false,
  isLoading: true,
  user: undefined,
  getRole: () => {
    throw "Auth not loaded";
  },
  logout: () => Promise.reject("Auth not loaded"),
  login: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  baseUrl = "",
}) => {
  const userInfoUrl = `${baseUrl}/api/users/me`;
  const loginUrl = `${baseUrl}/api/auth/local`;
  const [loginOpen, setLoginOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const [authValues, setAuthValues] = React.useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: undefined,
  });

  const login = async ({ identifier, password }: LoginArgs) => {
    try {
      const resp = await axios.post<LoginArgs, AxiosResponse<LoginResponse>>(
        loginUrl,
        { identifier, password },
      );
      const userInfoResp = await axios.get<object, AxiosResponse<UserInfo>>(
        userInfoUrl,
        { headers: { Authorization: `Bearer ${resp.data.jwt}` } },
      );
      // TODO: save user to local storage
      // await storage.set('auth', JSON.stringify({jwt: resp.data.jwt, user: userInfoResp.data})) //TODO: local storage
      setAuthValues({
        ...authValues,
        isAuthenticated: true,
        user: userInfoResp.data,
      });
      return {};
    } catch (err: unknown) {
      setAuthValues({ ...authValues, isAuthenticated: false, user: undefined });
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data;
        return {
          error: data,
          status: err.response.status,
          message: err.message,
        };
      }
      //TODO: handle error
      return { error: err?.toString() };
    }
  };

  const showLoginDialog = () => {
    setLoginOpen(true);
  };
  const logout = async () => {
    // TODO: remove user from local storage
    // await storage.remove('auth')
    resetAuthValues();
    return Promise.resolve(true);
  };

  const getRole = () => {
    //TODO: get role
    return "";
  };

  const resetAuthValues = () =>
    setAuthValues({
      user: undefined,
      isAuthenticated: false,
      isLoading: false,
    });

  const state = {
    ...authValues,
    login: showLoginDialog,
    logout,
    getRole,
  };

  useEffect(() => {
    //TODO: check authentication
    /*axios.get<UserInfo>(userInfoUrl).then(resp => {
      setAuthValues({user: resp.data, isAuthenticated: true, isLoading: false})
    })*/
    setAuthValues({
      user: undefined,
      isAuthenticated: false,
      isLoading: false,
    });
  }, [userInfoUrl]);

  return (
    <Context.Provider value={state}>
      {authValues.isLoading ? <></> : children}
      <Dialog
        onClose={() => setLoginOpen(false)}
        aria-labelledby="auth-dialog-title"
        maxWidth="sm"
        open={loginOpen}>
        <Box px={6} pt={6} alignItems="center" display="flex">
          <Logo />
          <Box flexGrow={1} />
          <IconButton
            aria-label="close"
            onClick={() => setLoginOpen(false)}
            sx={{ color: (theme) => theme.palette.grey[500] }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent sx={{ pt: 2, pb: 6 }}>
          <Typography variant="h6">
            Qui possiamo mettere payoff / claim di artpay
          </Typography>
          {isSignIn ? <SignInForm /> : <SignUpForm />}
          <Divider sx={{ maxWidth: "80%", marginLeft: "10%" }} />
          <Box display="flex" flexDirection="column" gap={1} py={2}>
            <Button variant="outlined">Continua con Apple</Button>
            <Button variant="outlined">Continua con Google</Button>
            <Button variant="outlined">Continua con Facebook</Button>
          </Box>
          <Box display="flex" mt={1} gap={1} alignItems="center">
            <Typography variant="body2" color="textSecondary">
              {isSignIn ? "Non hai ancora un account?" : "Sei già registratə?"}
            </Typography>
            <LinkButton size="small" onClick={() => setIsSignIn(!isSignIn)}>
              {isSignIn ? "Registrati" : "Accedi"}
            </LinkButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);

export default AuthProvider;
