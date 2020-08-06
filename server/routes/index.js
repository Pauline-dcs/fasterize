const express = require('express');
const router = express.Router();
const axios = require('axios');

const parsedHeaders = async (headers) => {
	let plugged = headers.server === 'fasterize' ? true : false;

	if (plugged) {
		const result = {
			plugged,
			statusCode: 200,
			fstrzFlags: [],
			cloudfrontStatus:
				headers['x-cache'] === 'Miss from cloudfront' ? 'MISS' : '',
			cloudfrontPOP: '',
		};

		const flags = headers['x-fstrz'].split(',');
		if (flags.includes('o')) {
			result.fstrzFlags.push('optimisée');
		}
		if (flags.includes('c')) {
			result.fstrzFlags.push('cachée');
		}

		let locationsUrl =
			'https://cdn.jsdelivr.net/gh/ft6/cloud.feitsui.com/cloudfront-edge-locations.json';

		const { status, data } = await axios.get(locationsUrl);

		if (status === 200 && data) {
			const locationCodes = headers['x-amz-cf-pop'].slice(0, 3);
			result.cloudfrontPOP = data.nodes[locationCodes].city;
		}

		return result;
	}

	return { plugged };
};

router.get('', (req, res) => {
	let url = req.query.url;
	axios
		.get(url)
		.then(async (resp) => {
			res.status(200).json(await parsedHeaders(resp.headers));
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

module.exports = router;
