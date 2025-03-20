import { createContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const validarToken = useCallback(async (token) => {
        try {
            const response = await api.get("/auth/user", {
                headers: { "x-auth-token": token }
            });
            setUsuario(response.data);
        } catch (error) {
            console.error("Erro ao validar token:", error.response ? error.response.data : error.message);
            logout();
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers["x-auth-token"] = token;
            validarToken(token);
        } else {
            setCarregando(false);
        }
    }, [validarToken]);

    const login = async (email, senha) => {
        try {
            const response = await api.post("/auth/login", { email, senha });
            localStorage.setItem("token", response.data.token);
            api.defaults.headers["x-auth-token"] = response.data.token;
            setUsuario(response.data.usuario);
        } catch (error) {
            alert("Erro ao fazer login");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers["x-auth-token"];
        setUsuario(null);
    };

    if (carregando) {
        return <div>Carregando...</div>;
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
