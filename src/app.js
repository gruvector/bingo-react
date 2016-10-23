/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import ApiController from './api/api-controller';
import ViewManipulator from './utils/view-manipulator';
import CardGenerator from './card/card-generator';
import CardDrawer from './card/card-drawer';
import Blower from './blower/blower';
import Dauber from './dauber/dauber';
import Timer from './utils/timer';
import { EventsConsts } from './events/events-consts';
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

	initPlayingCards(conf) {
		if (conf.gameConf.playingCards) {
			this.cardGen = new CardGenerator(conf);
			const arrRadioButtons = document.querySelectorAll('input[type=radio]');
			let numberOfCards = 0;
			let len = arrRadioButtons.length - 1;

			while(len >= 0) {
				if (arrRadioButtons[len].checked) {
					console.log(arrRadioButtons[len].value);
					numberOfCards = Number(arrRadioButtons[len].value);
				}
				len--;
			}

			const cardDrawer = new CardDrawer(this.cardGen.generateCards(numberOfCards), document.querySelector('#cardsContainer'));
		}
	}

	start(conf) {
		// Create the components only if they are allowed in the config
		const elMarketPlace = document.querySelector('#marketPlace');
		if (!conf.gameConf.marketCards) {
			ViewManipulator.toggleVisibility(elMarketPlace, false);
		}

		this.initPlayingCards(conf);

		if (conf.gameConf.mainGame) {
			const timer = new Timer(
				document.querySelector('#timerContainer'),
				conf.gameConf.beforeStartGameSeconds,
				EventsConsts.START_GAME, true
			);

			const startBtn = document.querySelector('#startBtn');
			if (startBtn) {
				startBtn.addEventListener('click', (e) => {
					console.log('>>> Start Game!');
					ViewManipulator.toggleVisibility(elMarketPlace, false);
					this.initPlayingCards(conf);
					timer.pulsate();
				});
			}
		}

		if (conf.gameConf.dauber) {
			const dauber = new Dauber(conf, document.querySelector('#tube'));
			const blower = new Blower(document.querySelector('#blower'));
		}

		const apiCtrl = new ApiController();
		const logoutBtn = document.querySelector('#logoutBtn');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', (e) => {
				apiCtrl.logout();
			});
		}

		if (ApiController.isLogged()) {
			ViewManipulator.showUserInfo();
		}
	}
}

export default App;

(() => {
	const app = new App();
})();
