import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import apiHandler from '../api/apiHandler';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSquare,
	faCloud,
	faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

function useStickyState(defaultValue, key) {
	const [value, setValue] = useState(() => {
		const stickyValue = window.localStorage.getItem(key);
		return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
	});
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, setValue];
}

const Index = () => {
	const [apiCalls, setApiCalls] = useStickyState([], 'apiCalls');

	const [url, setUrl] = useState('');

	const handleClick = () => {
		axios
			.get(`/api/?url=${url}`)
			.then((apiResponse) => {
				setApiCalls([
					...apiCalls,
					{
						...apiResponse.data,
						url: url,
						date: new Date().toLocaleDateString(),
					},
				]);
			})
			.catch((apiErr) => console.log(apiErr));
	};

	const cloudStatus = (call) => {
		if (!call.plugged) {
			return <FontAwesomeIcon icon={faCloud} id="unplugged" />;
		} else if (call.plugged && call.fstrzFlags.includes('optimisée')) {
			return <FontAwesomeIcon icon={faCloud} id="plugged-optimisee-cloud" />;
		} else {
			return <FontAwesomeIcon icon={faCloud} id="plugged-cloud" />;
		}
	};

	const handleClear = () => {
		window.localStorage.clear();
		setApiCalls([...apiCalls, {}]);
	};

	return (
		<div id="body">
			<header id="header">
				<h2>FASTERIZE DEBUGGER</h2>
			</header>

			<div id="sidebar">
				<img
					src="/images/logo-fasterize.png"
					alt="fasterize logo"
					id="fasterize-logo"
				/>
			</div>

			<div id="content">
				<section>
					<h2>
						<FontAwesomeIcon icon={faSquare} className="icons-square" /> HEADER
						DEBUGGER
					</h2>
					<div id="url-wrapper">
						<h4>Url to check</h4>
						<label htmlFor="url"></label>
						<input
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							name="url"
							id="url-input"
							type="text"
						/>
						<button type="submit" id="button-analysis" onClick={handleClick}>
							LAUNCH ANALYSIS
						</button>
					</div>
				</section>

				<section>
					<h2>
						<FontAwesomeIcon icon={faSquare} className="icons-square" /> HISTORY
					</h2>
					<span id="span-clear">
						<FontAwesomeIcon
							icon={faTimesCircle}
							id="icon-clear-data"
							onClick={handleClear}
						/>
						Clear data
					</span>
					<table id="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>URL</th>
								<th>Status</th>
								<th>Flags</th>
								<th>Cloudfront status</th>
								<th>Cloudfront pop</th>
							</tr>
						</thead>
						<tbody id="table-tbody">
							{apiCalls.map((call) => (
								<tr>
									<td>{call.date}</td>
									<td>{call.url}</td>
									<td>{cloudStatus(call)}</td>
									<td id="flag-keyword">
										{call.fstrzFlags &&
											call.fstrzFlags.map((flag, index) => (
												<span key={index} id="span-flag">
													{flag}
												</span>
											))}
									</td>

									<td>
										{call.cloudfrontStatus && (
											<span id="cloudfront-status">
												{call.cloudfrontStatus}
											</span>
										)}
									</td>

									<td>
										{call.cloudfrontPOP && <span>{call.cloudfrontPOP}</span>}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</div>
		</div>
	);
};

export default Index;
