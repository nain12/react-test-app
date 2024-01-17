import { useContext, useState } from 'react';
import ActiveStepContext from '../../../context/ActiveStepContext';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ThankYou from '../../ThankYou/ThankYou';
import styles from '../Form.module.css';

const IndividualDetails = ({ formDetails = {} }) => {
	const { activeStep, setActiveStep } = useContext(ActiveStepContext);
	const stepNames = formDetails;

	const [values, setValues] = useState({
		name: '',
		email: '',
		phone: '',
		birthdate: '',
		addressLine1: '',
		addressLine2: '',
		district: '',
		city: '',
		state: '',
		pincode: '',
		panNumber: '',
		vehicleNumber: ''
	});

	const [errors, setErrors] = useState({
		name: undefined,
		email: undefined,
		phone: undefined,
		birthdate: undefined,
		addressLine1: undefined,
		addressLine2: undefined,
		district: undefined,
		city: undefined,
		state: undefined,
		pincode: undefined,
		panNumber: undefined,
		vehicleNumber: undefined
	});

	const [showThankYouMessage, setShowThankYouMessage] = useState(undefined);

	const onFormSubmit = (event) => {
		event.preventDefault();
	};

	const getHeadingContent = (step) => {
		return stepNames && stepNames[step - 1]['module_name'];
	};

	const getSubHeadingContent = (step) => {
		if (step == 1) {
			return 'Please provide your name, email address, phone number and birthdate.';
		} else if (step == 2) {
			return 'Please provide your location details';
		} else if (step == 3) {
			return 'Please provide your PAN and vehicle details';
		}
	};

	const onClickHandler = () => {
		if (activeStep < 3) {
			setActiveStep((activeStep) => activeStep + 1);
		} else {
			setActiveStep(3);
			setShowThankYouMessage(true);
		}
	};

	const onBackClickHandler = () => {
		if (activeStep > 1 && activeStep <= 3) {
			setActiveStep(activeStep - 1);
		}
	};

	const updateErrors = (fieldName, errorMessage) => {
		setErrors({
			...errors,
			[fieldName]: {
				isError: errorMessage !== '',
				errorMessage
			}
		});
	};

	const validateInput = (fieldName, value) => {
		if (!value || !value.trim()) {
			updateErrors(fieldName, 'This field is required');
		} else if (fieldName === 'phone' && !value.match(/^\+[0-9]{2}[0-9]{10}$/)) {
			updateErrors(fieldName, 'Please enter valid phone number with extension');
		} else if (fieldName === 'panNumber' && !value.match(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/)) {
			updateErrors(fieldName, 'Please enter valid PAN number');
		} else if (fieldName === 'vehicleNumber' && !value.match(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{2}[0-9]{1,4}$/)) {
			updateErrors(fieldName, 'Please enter valid vehicle number');
		} else if (fieldName === 'pincode' && !value.match(/^[0-9]+$/)) {
			updateErrors(fieldName, 'Pincode must only include numbers');
		} else {
			updateErrors(fieldName, '');
		}
		setValues({ ...values, [fieldName]: value });
	};

	const getStepHeadings = (step) => {
		if (step == 1) {
			return (
				<>
					<h1 className={styles.Heading}>{getHeadingContent(1)}</h1>
					<h2 className={styles.SubHeading}>{getSubHeadingContent(1)}</h2>
				</>
			);
		} else if (step == 2) {
			return (
				<>
					<h1 className={styles.Heading}>{getHeadingContent(2)}</h1>
					<h2 className={styles.SubHeading}>{getSubHeadingContent(2)}</h2>
				</>
			);
		} else if (step == 3) {
			return (
				<>
					<h1 className={styles.Heading}>{getHeadingContent(3)}</h1>
					<h2 className={styles.SubHeading}>{getSubHeadingContent(3)}</h2>
				</>
			);
		}
	};

	return (
		<div className={styles.Container}>
			{!showThankYouMessage && <header>{getStepHeadings(activeStep)}</header>}
			<form onSubmit={onFormSubmit}>
				{activeStep == 1 ? (
					<>
						<Input
							label='Name'
							placeholder='e.g. Raj Singh'
							value={values.name}
							onChange={(event) => validateInput('name', event.target.value)}
							errors={errors.name}
							required
						/>
						<Input
							label='Email address'
							type='email'
							placeholder='e.g. rajsingh@lorem.com'
							value={values.email}
							onChange={(event) => validateInput('email', event.target.value)}
							errors={errors.email}
							required
						/>
						<Input
							type='tel'
							label='Phone number'
							placeholder='e.g. +91 8739052648'
							value={values.phone}
							onChange={(event) => validateInput('phone', event.target.value)}
							errors={errors.phone}
							required
						/>
						<Input
							type='date'
							label='Birthdate'
							placeholder='e.g. DD/MM/YYYY'
							value={values.birthdate}
							onChange={(event) => validateInput('birthdate', event.target.value)}
							errors={errors.birthdate}
							required
						/>
						<div className={styles.ButtonContainer}>
							<Button
								type='Next'
								label='Next Step'
								onClickHandler={onClickHandler}
								disabled={
									!values.name ||
									!values.name.trim() ||
									!values.email ||
									!values.email.trim() ||
									!values.phone ||
									!values.phone.trim() ||
									!values.birthdate ||
									!values.birthdate.trim() ||
									(errors &&
										(errors.name.isError || errors.email.isError || errors.phone.isError || errors.birthdate.isError))
								}
							/>
						</div>
					</>
				) : activeStep == 2 ? (
					<>
						<Input
							label='Address Line 1'
							value={values.addressLine1}
							onChange={(event) => validateInput('addressLine1', event.target.value)}
							errors={errors.addressLine1}
							required
						/>
						<Input
							label='Address Line 2'
							value={values.addressLine2}
							onChange={(event) => validateInput('addressLine2', event.target.value)}
							errors={errors.addressLine2}
						/>
						<Input
							label='District'
							placeholder='e.g. Thane'
							value={values.district}
							onChange={(event) => validateInput('district', event.target.value)}
							errors={errors.district}
							required
						/>
						<Input
							label='City'
							placeholder='e.g. Kalyan'
							value={values.city}
							onChange={(event) => validateInput('city', event.target.value)}
							errors={errors.city}
							required
						/>
						<Input
							label='State'
							placeholder='e.g. Maharashtra'
							value={values.state}
							onChange={(event) => validateInput('state', event.target.value)}
							errors={errors.state}
							required
						/>
						<Input
							label='Pincode'
							placeholder='e.g. 421008'
							value={values.pincode}
							onChange={(event) => validateInput('pincode', event.target.value)}
							errors={errors.pincode}
							required
							maxLength={6}
						/>
						<div className={styles.ButtonContainer}>
							<Button
								type='Next'
								label='Next Step'
								onClickHandler={onClickHandler}
								disabled={
									!values.addressLine1 ||
									!values.addressLine1.trim() ||
									!values.addressLine2 ||
									!values.addressLine2.trim() ||
									!values.district ||
									!values.district.trim() ||
									!values.city ||
									!values.city.trim() ||
									!values.state ||
									!values.state.trim() ||
									!values.pincode ||
									!values.pincode.trim() ||
									(errors &&
										(errors.addressLine1.isError ||
											errors.addressLine2.isError ||
											errors.district.isError ||
											errors.city.isError ||
											errors.state.isError ||
											errors.pincode.isError))
								}
							/>
							<Button type='Back' label='Go Back' onClickHandler={onBackClickHandler} />
						</div>
					</>
				) : activeStep == 3 ? (
					<>
						{showThankYouMessage ? (
							<>
								<ThankYou />
							</>
						) : (
							<>
								<Input
									label='PAN'
									placeholder='e.g. ABCDE1234E'
									value={values.panNumber}
									onChange={(event) => validateInput('panNumber', event.target.value)}
									errors={errors.panNumber}
									required
									maxLength={10}
								/>
								<Input
									label='Vehicle Number'
									placeholder='e.g. AB12CD34'
									value={values.vehicleNumber}
									onChange={(event) => validateInput('vehicleNumber', event.target.value)}
									errors={errors.vehicleNumber}
									required
								/>
								<div className={styles.ButtonContainer}>
									<Button
										type='Confirm'
										label='Confirm'
										onClickHandler={onClickHandler}
										disabled={
											!values.panNumber ||
											!values.panNumber.trim() ||
											!values.vehicleNumber ||
											!values.vehicleNumber.trim() ||
											(errors && (errors.panNumber.isError || errors.vehicleNumber.isError))
										}
									/>
									<Button type='Back' label='Go Back' onClickHandler={onBackClickHandler} />
								</div>
							</>
						)}
					</>
				) : null}
			</form>
		</div>
	);
};
export default IndividualDetails;
