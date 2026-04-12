import { useEffect, useState } from 'react'

import style from './ProjectForm.module.css'
import Input from '../form/input'
import Select from '../form/select'
import SubmitButton from '../form/submitButton'

function ProjectForm({btnText, handleSubmit,projectData}){

    const [categories,setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", { 
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
        },
    })
        .then((resp) => resp.json())
        .then((data) => {
          setCategories(data)
        })  
        .catch((err) => console.log(err))

    }, [])

    const submit=  (e) => {
        e.preventDefault()
        console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category: { 
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return(
        <form onSubmit={submit} className={style.form}>
            <Input 
                type='text' 
                placeholder='insira o nome do projeto' 
                name='name' 
                text="Nome do projeto"
                handleOnChange = {handleChange}
                value={project.name ? project.name : ''}
            />
            <Input 
                type='number' 
                placeholder='Insira o orçamento' 
                name='budget' 
                text="Orçamento do Projeto"
                handleOnChange = {handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select text="Selecione a Categoria" 
                name="category-id" 
                options={categories} 
                hadleOnChange={handleCategory} 
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm