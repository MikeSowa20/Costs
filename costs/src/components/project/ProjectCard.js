import style from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill, BsPencilFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjectCard({id, name, budget, category, handleRemove, admin,user}){
    const remove =(e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={style.project_card}>
            <h4>
                {name}
            </h4>
            {admin && (
                <p className={style.admin_text}>
                    <span>Dono do projeto:</span> {user}
                </p>
            )}
            <p>
                <span>Orçamento:</span>R${budget}
            </p>
            <p className={style.category_text}>
                <span className={`${style[category?.toLowerCase()]}`}></span> {category}
            </p>
            <div className={style.project_card_action}>
                <Link to={`/project/${id}`}><BsPencilFill/> Editar</Link>   
                <button onClick={remove}><BsFillTrashFill/> Excluir</button>
            </div>
        </div>
    )
}
export default ProjectCard