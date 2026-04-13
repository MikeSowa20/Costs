import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    // Vai na gaveta do navegador e olha se tem alguém logado
    const isLogged = localStorage.getItem("user");
    if (!isLogged) {
        return <Navigate to="/login" replace state={{ message: "Você precisa fazer login para acessar esta página." }} />;
    }

    //Se estiver logado, o Outlet renderiza a página que o usuário queria acessar
    return <Outlet />;
}