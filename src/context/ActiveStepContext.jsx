import { createContext } from 'react';

// Create context with default values
const ActiveStepContext = createContext({
	activeStep: 1,
	setActiveStep: () => {}
});

export default ActiveStepContext;
