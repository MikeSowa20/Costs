import { useNavigate } from 'react-router-dom';
import style from './newproject.module.css';
import ProjectForm from '../project/ProjectForm';
import { useState } from 'react';

function NewProject() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    function createPost(project) {
        // Inicializa custo e serviços
        project.cost = 0;
        project.services = [];

        // 1. Pega o texto do localStorage e transforma em Objeto JavaScript
        const userString = localStorage.getItem("user");
        const loggedUser = JSON.parse(userString);

        // 2. Adiciona o ID do usuário logado dentro do projeto
        project.userId = loggedUser.id;

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            // 3. Agora enviamos o projeto que já contém o userId
            body: JSON.stringify(project), 
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            // Redireciona com mensagem de sucesso
            navigate("/projects", { state: { message: "Projeto criado com sucesso!" } });
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={style.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar serviços!</p>
            <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} />
        </div>
    );
}

export default NewProject;