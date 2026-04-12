import style from './submitButton.module.css'

function SubmitButton({text}){
    return(
        <div>
            <button className={style.btn}>{text}</button>
        </div>  
    )
}
export default SubmitButton