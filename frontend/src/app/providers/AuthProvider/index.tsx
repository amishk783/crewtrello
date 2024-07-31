"use client";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

import api from "../../_utils/api/axios";
import { Session, User } from "./type";


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

  useEffect(() => {
    checkSession();
  }, []);
  useEffect(() => {
    if (session) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.accessToken}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [session]);

  const checkSession = async () => {
    try {
      const savedSession = localStorage.getItem("session");
      const savedUser = localStorage.getItem("user");
      if (savedSession && savedUser) {
        const parsedSession = JSON.parse(savedSession);
        const parsedUser = JSON.parse(savedUser);
        console.log("parsedSession", parsedSession);
        setSession(parsedSession);

        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Session check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });

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
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      setUser(response.data.user);
      setSession(response.data.session);
      localStorage.setItem("session", JSON.stringify(response.data.session));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };
  const logOut = async () => {
    try {
      setLoading(true);
      const session = localStorage.getItem("session");
      const response = await api.post("/auth/logout", { session });
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
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a ColumnProvider");
  }
  return context;
};
