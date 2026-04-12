import styles from './home.module.css'
import LinkButton from '../layouts/linkButton'

import savings from '../../img/savings.svg'

function Home(){
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