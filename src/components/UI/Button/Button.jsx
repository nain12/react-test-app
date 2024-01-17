import styles from './Button.module.css';

const Button = ({ label = '', type = 'Next', onClickHandler = () => {}, disabled = false, ...delegated }) => {
	return (
		<button
			disabled={disabled}
			className={
				type == 'Next'
					? `${styles.Button} ${styles.Next}`
					: type == 'Back'
					? `${styles.Button} ${styles.Back}`
					: `${styles.Button} ${styles.Confirm}`
			}
			onClick={onClickHandler}
			{...delegated}
		>
			{label}
		</button>
	);
};

export default Button;
