import styles from '@/styles/reservation/reservation.module.css';

interface onSubmit {
    handleSubmit: (e:React.FormEvent) => void;
    msg: string
}

export default function NextBtn({handleSubmit, msg}:onSubmit) {
    return (
        <div className={styles.btnWrapper}>
          <div className={styles.submitBtn}>
            <button onClick={handleSubmit}>{msg}</button>
          </div>
        </div>
    )
}