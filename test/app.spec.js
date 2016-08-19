/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import App from '../src/app';
import { expect, assert } from 'chai';
import sinon from 'sinon';

describe('Bingo App', () => {

	let appBingo = new App();

	it('Should set the title of the application', () => {
		expect(appBingo.title).to.equal('Bingo game');
	});

	it('Should initialize the necessary services to start the app', () => {
		expect(appBingo.cardGenerator).not.to.be.undefined;
	});

	it("Should call the callback when get the configs", function () {
		let callback = sinon.spy();
		let proxy = appBingo.loadConfigs(callback);

		proxy();

		assert(callback.called);
	});
});