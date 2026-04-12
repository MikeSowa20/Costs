import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import style from './project.module.css'
import { useState, useEffect } from 'react'
import Loading from '../layouts/loading'
import Container from '../layouts/container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layouts/message'
import ServiceForm from '../service/ServiceForm.js'
import ServiceCard from '../service/ServiceCard.js'

function Project(){

    const{ id } = useParams()
    const [showProjectForm, setShowProjectForm] = useState(false)
    const[project, setProject] = useState([])
    const [mensagem, setMensagem] = useState()
    const [type, setType] = useState()
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() =>{

        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },        
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch(err =>console.log(err))

    },[id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project){
        setMensagem('')
        if (project.cost > project.budget){
            setMensagem('O custo do projeto não pode ser maior que o orçamento!')
            setType('error')
            return false
        }
        project.cost = parseFloat(project.cost)
        project.budget = parseFloat(project.budget)
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMensagem('Projeto atualizado!')
            setType('success')
        })
        .catch(err =>console.log(err))
    }
    function toggleServiceForm(){
      setShowServiceForm(!showServiceForm)
    }

    function createService(project){
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if (newCost > parseFloat(project.budget)){
            setMensagem('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return false
        }

        //add service cost to project total cost
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json())
        .then((data) => {
            console.log(data)
            setShowServiceForm(false)
        })
        .catch(err =>console.log(err))
    }

    function removeService(id, cost){   
        const serviceUpdate = project.services.filter((service) => service.id !== id)   
        const projectUpdated = project

        projectUpdated.services = serviceUpdate  
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        }).then(resp => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setMensagem('Serviço removido com sucesso!')
            setType('success')
        })
        .catch(err =>console.log(err)) 
    }

return(
        <>
            {project.name ? ( 
                <div className={style.project_details}>
                    <Container customClass="column"> 
                            {mensagem && <Message type={type} msg={mensagem}/>}
                        <div className={style.details_container}>   
                            <div className={style.title_container}>
                                <h1>Projeto: {project.name}</h1>
                                <button className={style.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                                </button>
                            </div>

                            {!showProjectForm ? (
                                <div className={style.project_info}>
                                    <p><span>Categoria:</span> {project.category?.name}</p>  
                                    <p><span>Total de orçamento:</span> R${project.budget}</p>
                                    <p><span>Total Utilizado:</span> R${project.cost}</p>
                                </div>
                            ) : (
                                <div className={style.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project}/>
                                </div>
                            )}

                        </div> 
                        <div className={`${style.services_container} ${style.title_container}`}>
                                <h2>Adicione um serviço:</h2>
                                <button className={style.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                                </button>
                                <div className={`${style.project_info}`}>
                                    {showServiceForm && (
                                        <ServiceForm
                                            textBtn="Adicionar Serviço"
                                            handleSubmit={createService}
                                            projectData={project}
                                        />
                                    )}
                                 </div>
                        </div>
                        
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {
                                project.services?.length > 0 &&
                                project.services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}    
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {
                                project.services?.length === 0 && <p>Não há serviços cadastrados.</p>
                            }
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}
export default Project