import { createContext, useContext } from "react";

export interface User {
  // Define your user properties here, for example:
  _id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
