import styles from '@/styles/home/view.module.css';

export default function View() {
    let view:string = "829,091,839";
    let nowView:string = "17189";
    
    return (
        <div className={styles.use}>
            <div className={styles.inline}>
                <span>Total use </span>
                <div className={styles.accumulate}>
                    <span className={styles.accView}>{view}</span>
                </div>
            </div>
            <div className={styles.inline}>
                <span>Today use </span>
                <div className={styles.accumulate}>
                    <span className={styles.accView}>{nowView}</span>
                </div>
            </div>
        </div>
    )
}