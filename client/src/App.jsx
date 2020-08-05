import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact to="/" component={Home} />
			</Switch>
		</div>
	);
}

export default App;
