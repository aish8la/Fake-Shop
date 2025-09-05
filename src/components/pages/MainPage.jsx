import styles from "./MainPage.module.css"

function MainPage() {
    return <div>
        <section>
            <img className={styles.heroImage} src="./src/assets/hero-img.jpg" alt="" />
        </section>
    </div>
}

export default MainPage;