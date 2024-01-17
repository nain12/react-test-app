import styles from './ThankYou.module.css';

const ThankYou = () => {
	return (
		<div className={styles.Container}>
			<h1 className={styles.Heading}>Done!</h1>
			<p className={styles.Text}>We have successfully added your details in our system.</p>
		</div>
	);
};

export default ThankYou;
