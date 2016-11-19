/**
 * Created by Mihail on 11/19/2016.
 */
'use strict';

import LocalStorageService from '../local-storage/local-storage-service';
import { ApiConsts } from './api-consts';

class DbService {
	static getPlayerBalance() {

		fetch(ApiConsts.PROFILE, {
			method: 'GET',
			mode: 'cors',
			redirect: 'follow',
			headers: {
				Authorization: 'Bearer '+ LocalStorageService.getToken()
			}
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			console.log('>>>>>>>:returnedValue: ', returnedValue);
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}
}

export default DbService;