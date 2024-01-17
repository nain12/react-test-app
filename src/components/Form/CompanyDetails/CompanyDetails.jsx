import { useContext, useState } from 'react';
import ActiveStepContext from '../../../context/ActiveStepContext';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import ThankYou from '../../ThankYou/ThankYou';
import styles from './CompanyDetails.module.css';

const CompanyDetails = ({ formDetails = {} }) => {
	const { activeStep, setActiveStep } = useContext(ActiveStepContext);
	const stepNames = formDetails;

	const [values, setValues] = useState({
		companyNumber: '',
		companyTIN: '',
		companyType: '',
		addressLine1: '',
		addressLine2: '',
		district: '',
		city: '',
		state: '',
		pincode: '',
		contactPersonName: '',
		contactPersonEmail: '',
		contactPersonPhone: '',
		designation: ''
	});

	const [errors, setErrors] = useState({
		companyNumber: undefined,
		companyTIN: undefined,
		companyType: undefined,
		addressLine1: undefined,
		addressLine2: undefined,
		district: undefined,
		city: undefined,
		state: undefined,
		pincode: undefined,
		contactPersonName: undefined,
		contactPersonEmail: undefined,
		contactPersonPhone: undefined,
		designation: undefined
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
			return 'Please provide your company number, company TIN and company type';
		} else if (step == 2) {
			return 'Please provide your location details';
		} else if (step == 3) {
			return 'Please provide your name, email address, phone number and designation.';
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
		} else if (fieldName === 'companyNumber' && !value.match(/^[0-9]+$/)) {
			updateErrors(fieldName, 'Company number must only include numbers');
		} else if (fieldName === 'companyTIN' && !value.match(/^[a-z]*[0-9][a-z0-9]*$/i)) {
			updateErrors(fieldName, 'Company TIN must be alphanumeric');
		} else if (fieldName === 'pincode' && !value.match(/^[0-9]+$/)) {
			updateErrors(fieldName, 'Pincode must only include numbers');
		} else if (fieldName === 'contactPersonPhone' && !value.match(/^\+[0-9]{2}[0-9]{10}$/)) {
			updateErrors(fieldName, 'Please enter valid phone number with extension');
		} else {
			setErrors({ ...errors, [fieldName]: { isError: false, errorMessage: '' } });
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
							errors={errors.companyNumber}
							label='Company Number'
							placeholder='e.g. 12364408'
							value={values.companyNumber}
							onChange={(event) => validateInput('companyNumber', event.target.value)}
							required
							maxLength={8}
						/>
						<Input
							errors={errors.companyTIN}
							label='Company TIN'
							placeholder='e.g. 22AAAA0000A1Z5'
							value={values.companyTIN}
							onChange={(event) => validateInput('companyTIN', event.target.value)}
							required
							maxLength={14}
						/>
						<Select
							label='Company Type'
							errors={errors.companyType}
							placeholder='Select company type'
							options={['SME', 'MME', 'LLP', 'Startup', 'Private', 'Public']}
							onChange={(event) => validateInput('companyType', event.target.value)}
							required
						/>
						<div className={styles.ButtonContainer}>
							<Button
								type='Next'
								label='Next Step'
								onClickHandler={onClickHandler}
								disabled={
									!values.companyNumber ||
									!values.companyNumber.trim() ||
									!values.companyTIN ||
									!values.companyTIN.trim() ||
									!values.companyType ||
									(errors && (errors.companyNumber.isError || errors.companyTIN.isError || errors.companyType.isError))
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
									label='Name'
									placeholder='e.g. Raj Singh'
									value={values.contactPersonName}
									onChange={(event) => validateInput('contactPersonName', event.target.value)}
									errors={errors.contactPersonName}
									required
								/>
								<Input
									label='Email address'
									type='email'
									placeholder='e.g. rajsingh@lorem.com'
									value={values.contactPersonEmail}
									onChange={(event) => validateInput('contactPersonEmail', event.target.value)}
									errors={errors.contactPersonEmail}
									required
								/>
								<Input
									type='tel'
									label='Phone number'
									placeholder='e.g. +91 8739052648'
									value={values.contactPersonPhone}
									onChange={(event) => validateInput('contactPersonPhone', event.target.value)}
									errors={errors.contactPersonPhone}
									required
								/>
								<Input
									label='Designation'
									placeholder='e.g. Manager'
									value={values.designation}
									onChange={(event) => validateInput('designation', event.target.value)}
									errors={errors.designation}
									required
								/>
								<div className={styles.ButtonContainer}>
									<Button
										type='Confirm'
										label='Confirm'
										onClickHandler={onClickHandler}
										disabled={
											!values.contactPersonName ||
											!values.contactPersonName.trim() ||
											!values.contactPersonEmail ||
											!values.contactPersonEmail.trim() ||
											!values.contactPersonPhone ||
											!values.contactPersonPhone.trim() ||
											!values.designation ||
											!values.designation.trim() ||
											(errors &&
												(errors.contactPersonName.isError ||
													errors.contactPersonEmail.isError ||
													errors.contactPersonPhone.isError ||
													errors.designation.isError))
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
export default CompanyDetails;
