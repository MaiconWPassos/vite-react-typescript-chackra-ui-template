import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "@/services/api";
import { useToast } from "@chakra-ui/toast";

import * as User from "@/models/user";
import { User as UserType } from "@/types/user";

type SignInData = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | undefined;

  signIn(data: SignInData): Promise<void>;
  logOut(): void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem(
          import.meta.env.VITE_APP_AUTH_MD5_KEY
        );

        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const { data, status } = User.myInformation();

          if (status === 200) {
            setUser(data);
          }
        } else {
          setUser(undefined);
        }
      } catch (err: any) {
        console.log(err);
      }

      setLoading(false);
    })();
  }, [setUser, toast]);

  async function signIn({ email, password }: SignInData) {
    const { data, status } = User.createSession(email, password);

    if (status === 200) {
      localStorage.setItem(import.meta.env.VITE_APP_AUTH_MD5_KEY, email);

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      setUser(data);

      navigate("/app");
    }
  }

  function logOut() {
    localStorage.removeItem(import.meta.env.VITE_APP_AUTH_MD5_KEY);
    setUser(undefined);
    navigate("/signin");
  }

  if (loading) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
