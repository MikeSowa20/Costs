import style from '../project/ProjectForm.module.css'
import { useState } from 'react'
import Input from '../form/input'
import SubmitButton from '../form/submitButton'

function ServiceForm({ textBtn, handleSubmit, projectData }){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)   
    }
    function handleOnChange(e){
        setService({...service, [e.target.name]: e.target.value})  
    }

    return(
        <form onSubmit={submit} className={style.form}>
            <Input type="text" text="Nome do serviço" name="name" placeholder="Insira o nome do serviço" handleOnChange={handleOnChange}/>
            <Input type="number" text="Custo do serviço" name="cost" placeholder="Insira o custo do serviço" handleOnChange={handleOnChange}/>
            <Input type="text" text="Descrição do serviço" name="description" placeholder="Descreva o serviço" handleOnChange={handleOnChange}/>
            <SubmitButton text={textBtn}/> 
        </form>
    )
}
export default ServiceForm