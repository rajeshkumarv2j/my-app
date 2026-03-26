'use client';
import { cp } from "fs";
import React, { JSX } from "react";

export type ThemeState = {
    mode: string;
    changeTheme: (mode: string) => void;
}

const initialState: ThemeState = {
    mode: "light",
    changeTheme: (mode: string) => {
        initialState.mode = mode;
    }
}

export const AppThemeContext = React.createContext(initialState);

export function AppThemeProvider({ children }: { children: JSX.Element }) {
    const [ mode , setMode] = React.useState(initialState.mode);
    return (
        <AppThemeContext.Provider value={{ mode, changeTheme: setMode }}>
            {children}
        </AppThemeContext.Provider>
    )
}