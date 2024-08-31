import styles from '@/styles/reservation/reservation.module.css';

interface onSubmit {
    handleSubmit: (e:React.FormEvent) => void;
}

export default function NextBtn({handleSubmit}:onSubmit) {
    return (
        <div className={styles.btnWrapper}>
          <div className={styles.submitBtn}>
            <button onClick={handleSubmit}>내용 저장하기</button>
          </div>
        </div>
    )
}