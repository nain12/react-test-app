import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		emailId: '',
		password: ''
	});

	const [errors, setErrors] = useState({
		emailId: undefined,
		password: undefined
	});

	const individualDetails = {
		role: 'Individual',
		modules: [
			{
				module_name: 'Basic Details'
			},
			{
				module_name: 'Address Details'
			},
			{
				module_name: 'Personal Details'
			}
		]
	};

	const corporateDetails = {
		role: 'Corporate',
		modules: [
			{
				module_name: 'Company Details'
			},
			{
				module_name: 'Address Details'
			},
			{
				module_name: 'Contact Person Details'
			}
		]
	};

	const onClickHandler = () => {
		if (values.emailId === 'abc@gmail.com' && values.password === 'DGDFEEdd#%sss') {
			navigate('/corporate', { state: { formDetails: corporateDetails } });
		} else {
			navigate('/individual', { state: { formDetails: individualDetails } });
		}
	};

	const validateInput = (fieldName, value) => {
		if (!value || !value.trim()) {
			setErrors({
				...errors,
				[fieldName]: {
					isError: true,
					errorMessage: 'This field is required'
				}
			});
		} else if (fieldName === 'emailId' && !value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
			setErrors({
				...errors,
				[fieldName]: {
					isError: true,
					errorMessage: 'Email id must be valid'
				}
			});
		} else {
			setErrors({ ...errors, [fieldName]: false });
		}
		setValues({ ...values, [fieldName]: value });
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
	};
	return (
		<main className={styles.Wrapper}>
			<h1 className={styles.Heading}>Login Form</h1>
			<form onSubmit={onSubmitHandler}>
				<Input
					label='Email id'
					placeholder='Please enter your email id'
					type={'email'}
					value={values.emailId}
					onChange={(event) => validateInput('emailId', event.target.value)}
					errors={errors.emailId}
					required
				/>
				<Input
					label='Password'
					placeholder='Please enter your password'
					type={'password'}
					value={values.password}
					onChange={(event) => validateInput('password', event.target.value)}
					errors={errors.password}
					required
				/>
				<Button
					type='Submit'
					label='Submit'
					style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
					onClickHandler={onClickHandler}
					disabled={
						!values.emailId ||
						!values.emailId.trim() ||
						!values.password ||
						!values.password.trim() ||
						(errors && (errors.emailId.isError || errors.password.isError))
					}
				/>
			</form>
		</main>
	);
};

export default LoginForm;
