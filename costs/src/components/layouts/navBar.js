import { Link, useNavigate } from 'react-router-dom';
import Container from './container';

import styles from './navBar.module.css';
import logo from '../../img/costs_logo.png';

function NavBar() {
    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/login"); // Redirecionamento suave do React Router
    }

    return (
        <nav className={styles.navbar}>      
            <Container>
                <Link to="/home"> 
                    <img src={logo} alt='Costs' /> 
                </Link>
                {user && (
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/projects">Projects</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/company">Company</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li className={styles.item}>
                            <span className={styles.logout} onClick={handleLogout}>
                                Logout
                            </span>
                        </li>
                    </ul>
                )}
            </Container>
        </nav>
    );
}

export default NavBar;