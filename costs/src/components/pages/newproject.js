import {useNavigate} from 'react-router-dom'
import style from './newproject.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProject(){

    const navigate = useNavigate()

        function createPost(project){
            // intialize cost and services
            project.cost = 0
            project.services = []

            fetch("http://localhost:5000/projects",{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            })
            .then( (resp) => resp.json())
            .then((data) => {
                console.log(data)
                // redirect
                navigate("/projects", {state: { message: "Projeto criado com sucesso!" }})
            })
            .catch(err => console.log(err))
        }
    return(
        <div className={style.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adiconar serviços!</p>
            <ProjectForm btnText="Criar Projeto" handleSubmit={createPost}/>

        </div>
    )
}
export default NewProject