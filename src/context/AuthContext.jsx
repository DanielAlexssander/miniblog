import { useContext, createContext } from "react";

const AuthContent = createContext();

export function AuthProvider({ children, value }) {
	return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>;
}

export function useAuthValue() {
	return useContext(AuthContent);
}
