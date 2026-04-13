import styles from './home.module.css'
import LinkButton from '../layouts/linkButton'

import savings from '../../img/savings.svg'

function Home(){
    const userString = localStorage.getItem("user");
    const loggedUser = JSON.parse(userString);
    if (loggedUser.username === "admin") {
        return (
            <section className={styles.home_container}>
                <h1>Bem-vindo a pagina de ADM da <span>Costs</span></h1>
                <p>Começe a gerenciar todos os projetos agora mesmo!</p>
                <LinkButton to="/projects" text="Veja todos os projetos"/>
                <img src={savings} alt='Costs'/>
            </section> 
        );
    }
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Começe a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Crie um novo Projeto!"/>
            <img src={savings} alt='Costs'/>
        </section>
    )
}
export default Home