import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './pages/Index';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact to="/" component={Index} />
			</Switch>
		</div>
	);
}

export default App;
