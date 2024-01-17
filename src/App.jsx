import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ActiveStepContext from './context/ActiveStepContext';
import LoginForm from './components/LoginForm/LoginForm';
import Wrapper from './components/Form/Wrapper';
import './App.css';

function App() {
	const [activeStep, setActiveStep] = useState(1);

	return (
		<BrowserRouter>
			<ActiveStepContext.Provider value={{ activeStep, setActiveStep }}>
				<Routes>
					<Route path='/' element={<LoginForm />} />
					<Route path='/corporate' element={<Wrapper />} />
					<Route path='/individual' element={<Wrapper />} />
				</Routes>
			</ActiveStepContext.Provider>
		</BrowserRouter>
	);
}

export default App;
