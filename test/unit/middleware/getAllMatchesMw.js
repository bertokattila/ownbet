const expect = require('chai').expect;
const getAllMatchesMW = require('../../../middleware/match/getAllMatchesMW');

describe('getAllMatches middleware', () => {
	it('it should return matches', (done) => {
		const mw = getAllMatchesMW({
			matches: {
				find: (param, callBack) => {
					callBack(null, 'mockMatches');
				},
			},
		});

		const mockRes = {
			locals: {},
		};
		mw({ params: {} }, mockRes, (err) => {
			expect(err).to.be.eql(undefined);
			expect(mockRes.locals).to.be.eql({ matches: 'mockMatches' });
			done();
		});
	});

	it('it should call next with error', (done) => {
		const mw = getAllMatchesMW({
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
