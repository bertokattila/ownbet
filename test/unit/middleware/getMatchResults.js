const expect = require('chai').expect;
const getMatchResultsMW = require('../../../middleware/match/getMatchResultsMW');

describe('getAllMatches middleware', () => {
	it('it should return matches with result administered', (done) => {
		const mw = getMatchResultsMW({
			matches: {
				find: (param, callBack) => {
					callBack(null, 'mockMatchesWithResults');
				},
			},
		});

		const mockRes = {
			locals: {},
		};
		mw({ params: {} }, mockRes, (err) => {
			expect(err).to.be.eql(undefined);
			expect(mockRes.locals).to.be.eql({ matches: 'mockMatchesWithResults' });
			done();
		});
	});

	it('it should call next with error', (done) => {
		const mw = getMatchResultsMW({
			matches: {
				find: (param, callBack) => {
					callBack('db error', null);
				},
			},
		});

		const mockRes = {
			locals: {},
		};
		mw({ params: {} }, mockRes, (err) => {
			expect(err).to.be.eql('db error');
			done();
		});
	});
});
