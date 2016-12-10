/**
 * Created by Mihail on 9/17/2016.
 */
'use strict';

import { EventsConsts } from '../events/events-consts';
import PubSubService from '../events/pubsub-service';
import LocalStorageService from '../local-storage/local-storage-service';
import DbService from './db-service';
import ViewManipulator from '../utils/view-manipulator';

class ApiController {
	constructor() {
		if (LocalStorageService.isLoggedIn()) {
			ViewManipulator.updateViewState(undefined, undefined, LocalStorageService.isLoggedIn());
		}

		this.pubsub = new PubSubService();
		this.viewCtrl = new ViewManipulator(this.pubsub);
	}

	static login() {
		const elEmail = document.querySelector('#email');
		const elPass = document.querySelector('#password');

		if (elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		const promiseLogin = DbService.loginPlayer(elEmail.value, elPass.value);
		promiseLogin.then((val) => {
			if (val.token) {
				ViewManipulator.updateViewState(undefined, undefined, true);
				LocalStorageService.saveToken(val.token);
				ViewManipulator.showUserInfo();
			} else {
				ViewManipulator.toggleErrorMessageView(document.querySelector('#alertMsg'),
					'Wrong login details.', true);
			}
		});
	}

	static register() {
		const elName = document.querySelector('#registerName');
		const elEmail = document.querySelector('#regEmail');
		const elPass = document.querySelector('#registerPassword');

		if (elName === null || elName.value === undefined ||
			elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		const promiseReg = DbService.registerPlayer(elName.value, elEmail.value, elPass.value);
		promiseReg.then((val) => {
			if (val) {
				if (val.isExisted) {
					ViewManipulator.toggleErrorMessageView(document.querySelector('#alertMsg'),
						'User already existed.', true);
				} else {
					LocalStorageService.saveToken(val.token);
					ViewManipulator.updateViewState(undefined, undefined, LocalStorageService.isLoggedIn());
					ViewManipulator.showUserInfo();
				}
			} else {
				console.log('Show error message for registration failed.');
			}
		});
	}

	logout() {
		LocalStorageService.logout();
		this.pubsub.publish(EventsConsts.LOGOUT, {
			isLogout: true
		});
	}

	static getProfileInfo() {
		return LocalStorageService.currentUser();
	}

	static isLogged() {
		return LocalStorageService.isLoggedIn();
	}

	static setNewBalance(sum, isSpending = true) {
		const promiseSetNewBalance = DbService.updateBalance(ApiController.getProfileInfo().email, sum, isSpending);

		promiseSetNewBalance.then((val) => {
			if (val) {
				ViewManipulator.updateBalance(val.balance - sum, val.balance);
			} else {
				console.log('Show error message for setting new balance failed.');
			}
		});
	}

	static getPlayerBalancePromise() {
		return DbService.getPlayerBalance().then((val) => {
			LocalStorageService.saveBalance(val);
			return val;
		});
	}

	static getPlayerBalanceFromStorage() {
		return LocalStorageService.getBalance();
	}

	static getPlayersDataPromise() {
		return DbService.getAllPlayersData().then((val) => {
			return val;
		});
	}

	static createPlayerPromise(objPlayerData) {
		return DbService.createPlayer(objPlayerData).then((val) => {
			return val;
		});
	}

	static deletePlayerPromise(playerEmail) {
		return DbService.deletePlayer(playerEmail).then((val) => {
			return val;
		});
	}

	static updatePlayerDataPromise(objPlayerData) {
		return DbService.updatePlayerData(objPlayerData).then((val) => {
			return val;
		});
	}

	static loginAdminPromise(objCredentials) {
		return DbService.loginAdmin(objCredentials).then((val) => {
			return val;
		});
	}
}

export default ApiController;