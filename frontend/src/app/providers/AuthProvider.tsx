"use client"
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import api from "../_utils/api/axios";

interface User {
  id: string;
  username: string;
  email: string;
}

interface Session {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextProps {
  user?: User | null;
  session: Session | null;
  loading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  loading: false,
  logIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const logIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("api/auth/login", { email, password });

      setUser(response.data.user);
      setSession(response.data.session);
      localStorage.setItem("session", JSON.stringify(response.data.session));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("api/auth/signup", {
        username,
        email,
        password,
      });

      setUser(response.data.user);
      setSession(response.data.session);
      localStorage.setItem("session", JSON.stringify(response.data.session));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const logOut = async () => {
    try {
      setLoading(true);
      const session = localStorage.getItem("session");
      const response = await api.post("api/auth/logout", { session });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setSession(null);
      localStorage.removeItem("session");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, logIn, signUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
