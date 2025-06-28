"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "admin_auth_token";
const AUTH_EXPIRY_KEY = "admin_auth_expiry";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount and when storage changes
  useEffect(() => {
    checkAuth();

    // Listen for storage changes (for logout in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY || e.key === AUTH_EXPIRY_KEY) {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem(AUTH_STORAGE_KEY);
      const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);

      if (!token || !expiry) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const expiryTime = parseInt(expiry);
      const now = Date.now();

      if (now > expiryTime) {
        // Token expired, clear storage
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(AUTH_EXPIRY_KEY);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Token is valid
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store authentication token and expiry (24 hours from now)
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        localStorage.setItem(AUTH_STORAGE_KEY, data.token || "authenticated");
        localStorage.setItem(AUTH_EXPIRY_KEY, expiryTime.toString());

        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_EXPIRY_KEY);

      // Update state
      setIsAuthenticated(false);
      setIsLoading(false);

      // Redirect to login page
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect even if there's an error
      window.location.href = "/admin/login";
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
