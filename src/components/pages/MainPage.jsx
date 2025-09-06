import styles from "./MainPage.module.css";
import hero from "../../assets/hero-img.jpg";

function MainPage() {

    return <div>
        <section>
            <img className={styles.heroImage} src={hero} alt="" />
        </section>
    </div>
}

export default MainPage;