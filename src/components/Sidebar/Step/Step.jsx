import { useContext } from 'react';
import ActiveStepContext from '../../../context/ActiveStepContext';

import styles from './Step.module.css';

const Step = ({ title = '', step = 1 }) => {
	const { activeStep } = useContext(ActiveStepContext);

	return (
		<div className={styles.Container}>
			<div className={activeStep == step ? styles.Active : styles.InActive}>{step}</div>
			<div className={styles.Info}>
				<span className={styles.Number}>Step {step}</span>
				<span className={styles.Name}>{title}</span>
			</div>
		</div>
	);
};

export default Step;
