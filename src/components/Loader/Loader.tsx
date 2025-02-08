import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.flames}>
            <div className={styles.flames__item}></div>
            <div className={styles.flames__item}></div>
            <div className={styles.flames__item}></div>
        </div>
    )
};

export default Loader;