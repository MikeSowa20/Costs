import Input from "../form/input";
import SubmitButton from "../form/submitButton";
import style from './Login.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function submitUser(e) {
        e.preventDefault();
        const user = {
            username,
            email,
            quantity: 0,
            password
        }
        console.log(user);
            fetch("http://localhost:5000/logins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((resp) => resp.json())
        .then((data) => {
            //redirecionar o usuário para a página de login
            navigate("/login", {state: { message: "Usuário criado com sucesso!" }})
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={style.login_container}>
            <h1>Registrar-se</h1>
            <form onSubmit={submitUser}>
                <Input
                    type="text"
                    text="Username"
                    name="username"
                    placeholder="Enter your username"
                    handleOnChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <Input
                    type="email" 
                    text="Email"
                    name="email"
                    placeholder="Enter your email"
                    handleOnChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    type="password"
                    text="Password"
                    name="password"
                    placeholder="Enter your password"
                    handleOnChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <SubmitButton text="Registrar-se" />
            </form>
        </div>
    )
}

export default Signup;