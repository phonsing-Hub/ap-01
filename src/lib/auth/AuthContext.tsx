"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ApiClient } from "./api-client";
import { User } from "./user";
import { TokenManager } from "./token-manager";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  googleLogin: (code: string) => Promise<void>;
  register: (credentials: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    display_name: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: (authToken: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const apiClient = new ApiClient();

  useEffect(() => {
    const savedToken = TokenManager.getToken();
    if (savedToken) {
      setToken(savedToken);
      getCurrentUser(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = async (authToken: string) => {
    try {
      const response = await apiClient.getCurrentUser(authToken);
      TokenManager.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      TokenManager.removeToken();
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    display_name: string;
  }) => {
    try {
      const response = await apiClient.register(credentials);
      TokenManager.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiClient.login(credentials);
      TokenManager.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const googleLogin = async (code: string) => {
    try {
      const response = await apiClient.googleLogin(code);
      TokenManager.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiClient.logout(token);
      }
    } catch (error) {
      throw error;
    } finally {
      TokenManager.removeToken();
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        googleLogin,
        register,
        logout,
        getCurrentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
