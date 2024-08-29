import { createContext, useCallback, useEffect, useReducer } from "react";
import { AuthInitialState } from "../types/auth/auth";
import { User } from "../types/user";
import { generateToken, verifyToken } from "../utils/jwt";

const initialState: AuthInitialState = {
  isAuthenticated: false,
  accessToken: "",
  user: null,
};

type AuthAction =
  | {
      type: "INIT";
      payload: { isAuthenticated: boolean; accessToken: string; user: User };
    }
  | { type: "LOGIN"; payload: { accessToken: string; user: User } }
  | { type: "LOGOUT"; payload: null };

type AuthContextType = {
  state: AuthInitialState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => undefined,
  login: () => Promise.resolve(),
  logout: () => undefined,
});

const reducer = (
  state: AuthInitialState,
  action: AuthAction
): AuthInitialState => {
  const { type, payload } = action;

  switch (type) {
    case "INIT": {
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        accessToken: payload.accessToken,
        user: payload.user,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: payload.accessToken,
        user: payload.user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        accessToken: "",
        user: null,
      };
    }
    default:
      throw new Error("Invalid action");
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialize = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const isValid = await verifyToken(accessToken);
        if (isValid) {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              accessToken,
              user: isValid as User,
            },
          });
        } else {
          localStorage.removeItem("accessToken");
        }
      }
    } catch (err) {
      console.error("Initialization failed:", err);
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = { email, password };
      const accessToken = await generateToken(data);

      localStorage.setItem("accessToken", accessToken);

      dispatch({
        type: "LOGIN",
        payload: {
          accessToken: accessToken,
          user: data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT", payload: null });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
