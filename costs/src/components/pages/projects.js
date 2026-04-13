import Message from "../layouts/message";
import { useLocation } from 'react-router-dom';
import style from './projects.module.css';
import Container from '../layouts/container.js';
import LinkButton from "../layouts/linkButton.js";
import ProjectCard from "../project/ProjectCard.js";
import { useState, useEffect } from "react";
import Loading from "../layouts/loading.js";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState();

    const location = useLocation();
    let message = "";
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        // 1. Pega os dados do usuário logado
        const userString = localStorage.getItem("user");
        const loggedUser = JSON.parse(userString);

        // 2. Modifica a URL para filtrar pelo userId do usuário logado
        fetch(`http://localhost:5000/projects?userId=${loggedUser.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            console.log(data);
            setProjects(data);
            setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, []);

    function removeProjects(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage("Projeto removido com sucesso!");
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            name={project.name}
                            budget={project.budget}
                            category={project.category?.name}
                            id={project.id}
                            key={project.id}
                            handleRemove={removeProjects}
                        />
                    ))}
                
                {!removeLoading && <Loading />}
                
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;