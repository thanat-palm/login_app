"use client"

import SessionProvider from "./components/SessionProvider";
import { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
    session?: any;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>
}