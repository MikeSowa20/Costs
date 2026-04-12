import style from './loading.module.css'
import loading from '../../img/loading.svg'

function Loading(){
    return(
        <div className={style.loader_conatiner}>
            <img src={loading}  className={style.loader} alt='Loading'></img>
        </div>
    )
}
export default Loading