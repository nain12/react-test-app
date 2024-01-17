import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import CompanyDetails from './CompanyDetails/CompanyDetails';
import IndividualDetails from './IndividualDetails/IndividualDetails';
import styles from './Wrapper.module.css';

const DetailsForm = () => {
	const { state } = useLocation();
	const { formDetails } = state;
	const ROLE = formDetails.role;
	const modules = formDetails.modules;

	return (
		<>
			<main className={styles.Wrapper}>
				<Sidebar formDetails={modules} />
				{ROLE === 'Individual' && <IndividualDetails formDetails={modules} />}
				{ROLE === 'Corporate' && <CompanyDetails formDetails={modules} />}
			</main>
		</>
	);
};

export default DetailsForm;
