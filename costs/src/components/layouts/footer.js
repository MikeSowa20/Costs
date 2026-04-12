import {FaFacebook,FaInstagram,FaLinkedin} from 'react-icons/fa'

import styles from './footer.module.css'

function Footer(props){
    return(
        <footer className={styles.footer}>
            <ul>
                <li>
                    <FaFacebook/>
                </li>
                <li>
                    <FaInstagram/>
                </li>
                <li>
                    <FaLinkedin/>
                </li>
            </ul>
            <p>
                <span>
                    Costs
                </span>
                &copy;2026 
            </p>
        </footer>
    )
}
export default Footer