const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);

describe('Valid url , not plugged', () => {
	it('it should return an object with the key value/pair plugged:false', (done) => {
		let url = 'https://www.youtube.com/watch?v=5bgemCaaQkU';

		chai
			.request(app)
			.get(`/api/?url=${url}`)
			.end((err, res) => {
				// console.log(res.body);
				should.not.exist(err);
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('plugged');
				assert.isFalse(res.body.plugged, 'not plugged');

				done();
			});
	});
});

describe('Valid url , plugged', () => {
	it('it should return an object with valid values', (done) => {
		let url = 'https://www.fasterize.com/fr/';

		chai
			.request(app)
			.get(`/api/?url=${url}`)
			.end((err, res) => {
				// console.log(res.body);
				should.not.exist(err);
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('plugged');
				assert.isTrue(res.body.plugged, 'plugged');
				res.body.should.have.property('statusCode');
				res.body.should.have.property('fstrzFlags');
				res.body.fstrzFlags.should.be.a('array');
				res.body.should.have.property('cloudfrontStatus');
				res.body.should.have.property('cloudfrontPOP');
				done();
			});
	});
});

describe('fake Api', () => {
	it('should not get any data as the url is unvalid', (done) => {
		let url = 'fasterize.com';

		chai
			.request(app)
			.get(`/api/?url=${url}`)
			.end((err, res) => {
				assert.equal(
					res.body.name,
					'Error',
					'Invalid url did not return Error'
				);
				done();
			});
	});
});
