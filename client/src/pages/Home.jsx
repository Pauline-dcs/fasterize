import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import apiHandler from '../api/apiHandler';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	let url = 'https://www.fasterize.com/fr/';

	const urlData = axios
		.get(`/api/?url=${url}`)
		.then((apiResponse) => console.log(apiResponse))
		.catch((apiErr) => console.log(apiErr));

	return (
		<div id="body">
			<div id="header">
				<h2>FASTERIZE DEBUGGER</h2>
			</div>

			<div id="sidebar">
				<img
					src="/images/logo_fasterize.png"
					alt="fasterize logo"
					id="fasterize-logo"
				/>
			</div>

			<div id="content">
				<section>
					<h2>
						<FontAwesomeIcon icon={faSquare} /> HEADER DEBUGGER
					</h2>
					<div id="url-wrapper">
						<h4>Url to check</h4>
						<input type="text"></input>
						<button type="submit">LAUNCH ANALYSIS</button>
					</div>
				</section>
				<section>
					<h2>
						<FontAwesomeIcon icon={faSquare} />
						HISTORY
					</h2>
					<div id="history-wrapper"></div>
				</section>
			</div>
		</div>
	);
};

export default Home;
