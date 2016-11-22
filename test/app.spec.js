/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import App from '../src/app';
import { expect, assert } from 'chai';
import sinon from 'sinon';

describe('Bingo App', () => {

	let appBingo = new App();

	it('Should set the url for loading the configs', () => {
		expect(appBingo.confUrl).to.not.be.undefined;
		expect(appBingo.confUrl).to.be.a('string');
	});

	it('Should set the title of the application', () => {
		expect(appBingo.confUrl).to.be.a('string');
		expect(appBingo.title).to.equal('Bingo Bigul');
	});

	it("Should call the callback when get the configs", function () {
		let callback = sinon.spy();
		let proxy = appBingo.loadConfigs(callback);

		proxy();

		assert(callback.called);
	});

	it('Should initialize the CardGenerator to start the app', () => {
		expect(appBingo.hasOwnProperty(appBingo.cardGen)).not.to.be.undefined;
	});

	it('Should initialize the CardDrawer to start the app', () => {
		expect(appBingo.hasOwnProperty(appBingo.CardDrawer)).not.to.be.undefined;
	});
});