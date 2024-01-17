import styles from './Input.module.css';

const Input = ({ errors = {}, label = '', ...delegated }) => {
	const formControlName = label.toLowerCase();

	return (
		<>
			<label className={styles.Label} htmlFor={formControlName}>
				{label}
				{errors && errors.isError ? <span className={styles.ErrorMessage}>{errors.errorMessage}</span> : null}
				<input
					className={errors.isError ? `${styles.Input} ${styles.Error}` : `${styles.Input} ${styles.Success}`}
					id={formControlName}
					{...delegated}
				/>
			</label>
		</>
	);
};

export default Input;
