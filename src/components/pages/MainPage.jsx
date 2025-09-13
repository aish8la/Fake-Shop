import styles from "./MainPage.module.css";
import hero from "../../assets/hero-img.jpg";
import { Link } from "react-router-dom";

function MainPage() {

    return <div>
        <section className={styles.hero}>
            <img className={styles.heroImage} src={hero} alt="" />
            <div className={styles.overlay}>
                <Link to="shop">Go To Shop</Link>
            </div>
        </section>
    </div>
}

export default MainPage;