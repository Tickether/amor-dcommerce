import styles from '../styles/Footer.module.css'

const FooterComponent = () => {


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.dev}>
                    <p>
                        <span>made with</span>
                        <span> &hearts; </span>
                        <span>by geeloko.eth</span>
                    </p>
                </div>
                <div className={styles.socials}></div>
                <div className={styles.backed}></div>
            </div>
        </div>
    );
}

export default FooterComponent;