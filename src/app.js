/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import ApiController from './api/api-controller';
import ViewController from './utils/view-controller';
import CardGenerator from './card/card-generator';
import CardDrawer from './card/card-drawer';
import Blower from './blower/blower';
import Dauber from './dauber/dauber';
import 'es6-promise';
import 'isomorphic-fetch';

class App {

	constructor(title = 'Bingo game') {
		this.confUrl = 'http://localhost:8000/config.json';
		this.title = title;
		this.loadConfigs(App.init);
	}

	loadConfigs(callback) {
		fetch(this.confUrl)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			}).then((config) => {
			callback(this, config);
		});

		return callback;
	}

	static init(context, conf) {
		context.start(conf);
	}

	start(conf) {
		let blower = new Blower(document.querySelector('#blower'));
		let dauber = new Dauber(conf, document.querySelector('#tube'));

		let apiCtrl = new ApiController();
		this.cardGen = new CardGenerator(conf);
		this.htmlCards = CardDrawer.draw(this.cardGen.generateCards(4));
		const startBtn = document.querySelector('#startBtn');

		if (startBtn) {
			startBtn.addEventListener('click', (e) => {
				console.log('>>> Start Game!');
				blower.startAnimation();
				dauber.startDrawing(2000);
				this.htmlCards.forEach((el) => {
					document.getElementById('cardsContainer').appendChild(el);
				});
			});
		}

		const logoutBtn = document.querySelector('#logoutBtn');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', (e) => {
				apiCtrl.logout();
			});
		}

		if (ApiController.isLogged()) {
			ViewController.showUserInfo();
		}
	}
}

export default App;

(() => {
	let app = new App();
	//document.addEventListener('DOMContentLoaded', () => {});
})();
