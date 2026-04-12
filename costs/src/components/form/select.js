import style from './select.module.css'

function Select({text,name,options,hadleOnChange,value}){
    return(
        <div className={style.form_control}>
            <label htmlFor={name}>
                {text}:
            </label>    
            <select name={name} id={name} onChange={hadleOnChange} value={value|| ''}>
                <option>Selecione um opção</option>
                {options.map((option) => (
                    <option value={option.id } key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default Select 