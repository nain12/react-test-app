import Step from './Step/Step';
import styles from './Sidebar.module.css';

const Sidebar = ({ formDetails = {} }) => {
	return (
		<aside className={styles.Container}>
			{formDetails.map((formStep, index) => {
				return <Step step={index + 1} key={formStep['module_name']} title={formStep['module_name']} />;
			})}
		</aside>
	);
};

export default Sidebar;
