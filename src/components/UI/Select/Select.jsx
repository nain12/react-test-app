import styles from './Select.module.css';

const Select = ({ label = '', options = [], errors = {}, placeholder = '', ...delegated }) => {
	const formControlName = label.toLowerCase();
	return (
		<>
			<label htmlFor={formControlName}>
				{label}
				{errors && errors.isError ? <span className={styles.ErrorMessage}>{errors.errorMessage}</span> : null}
			</label>
			<select
				name={formControlName}
				id={formControlName}
				className={errors.isError ? `${styles.Dropdown} ${styles.Error}` : `${styles.Dropdown} ${styles.Success}`}
				defaultValue={'placeholder'}
				{...delegated}
			>
				<option value='placeholder' disabled>
					{placeholder}
				</option>
				{options.map((option) => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</>
	);
};

export default Select;
