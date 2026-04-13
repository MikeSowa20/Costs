import { useState, useEffect } from "react"; // IMPORTANTE: Importe o useEffect
import Container from "../layouts/container";
import Input from "../form/input";
import SubmitButton from "../form/submitButton";
import style from './Login.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importe o useNavigate
import Message from "../layouts/message";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    // CORREÇÃO: Aqui deve ser useEffect, e não useState!
    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message);
            setType("success");
            // Limpa o state para não repetir a mensagem ao recarregar a página
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    function HandleSubmit(e) {
        e.preventDefault();
        message && setMessage(""); // Limpa mensagens anteriores
        
        // No json-server, buscamos o usuário na rota onde eles estão cadastrados (ex: /users)
        // Passamos o username e password como parâmetros de busca para filtrar
        fetch(`http://localhost:5000/logins?username=${username}&password=${password}`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // GET não tem 'body', os dados vão na URL acima
        })
        .then((resp) => resp.json())
        .then((data) => {
            // O json-server devolve uma Array []. 
            // Se encontrou alguém, a array tem tamanho maior que 0.
            if (data.length > 0) {
                setMessage("Login bem-sucedido!");
                setType("success");
                // Opcional: Salvar que o usuário está logado no navegador (simulação)
                localStorage.setItem("user", JSON.stringify(data[0]));
                // Redireciona o usuário
                navigate("/home");
            } else {
                // Se a array voltou vazia, as credenciais estão erradas
                setMessage("Usuário ou senha incorretos.");
                setType("error");
            }   
        })
        .catch((err) => {
            console.log(err);
            setMessage("Ocorreu um erro durante o login.");
            setType("error");
        });
    }

    return (
        <div className={style.login_container}>
            {message && <Message type={type} msg={message} />}
            <h1>Login</h1>
            <Container customClass="column">
                <form onSubmit={HandleSubmit}>
                    <Input
                        type="text"
                        text="Username"
                        name="username"
                        placeholder="Enter your username"
                        handleOnChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <Input
                        type="password"
                        text="Password"
                        name="password"
                        placeholder="Enter your password"
                        handleOnChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <p>Você não tem uma conta? <Link to="/signup">Cadastre-se</Link></p>
                    <SubmitButton text="Login" />
                </form>
            </Container>
        </div>
    );
}

export default Login;