import { createContext, FC, ReactNode, useContext, useState } from "react";
import { TOKEN_KEY } from "../../api/ApiClient";
import { CreateUserDto, LoginDto, UserDto } from "../../api/swagger";
import { useApi } from "../../api/useApi";

export interface LoginContextData {
  authToken: string | null;
  user: UserDto | null;
  setAuthToken: (token: string | null) => void;
  setUser: (user: UserDto | null) => void;
}

const LoginContext = createContext<LoginContextData>({
  user: null,
  setUser: (user: UserDto | null) => {},
  authToken: null,
  setAuthToken: (token: string | null) => {},
});

export const useLoginContext = () => {
  const api = useApi();
  const { authToken, setAuthToken, setUser, user } = useContext(LoginContext);

  const isLoggedIn = authToken !== null;

  const login = async (credentials: LoginDto) => {
    const response = await api.login(credentials);
    setAuthToken(response.accessToken);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    api.logout();
    setAuthToken(null);
    setUser(null);
  };

  const register = async (info: CreateUserDto) => {
    const response = await api.register(info);
    setAuthToken(response.accessToken);
    setUser(response.user);
    return response;
  };

  return {
    authToken,
    isLoggedIn,
    login,
    logout,
    register,
    user,
  };
};

export const LoginProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const [user, setUser] = useState<UserDto | null>(null);

  return (
    <LoginContext.Provider value={{ authToken, setAuthToken, setUser, user }}>
      {children}
    </LoginContext.Provider>
  );
};
