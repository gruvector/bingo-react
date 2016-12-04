/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

/* @flow */

import { EventEmitter } from 'fbemitter';
import { List } from 'immutable';
import schema from '../schema';

let data: List<Object>;
const emitter = new EventEmitter();

const CRUDStore = {
	init(storage) {
		if (!storage) {
			let initialRecord = {};
			schema.forEach(item => initialRecord[item.id] = item.sample);
			data = List([initialRecord]);
		} else {
			data = List(storage);
		}
	},

	getData(): List<Object> {
		return data;
	},

	getSchema(): Array<Object> {
		return schema;
	},

	setData(newData: List<Object>, commit: boolean = true) {
		data = newData;
		if (commit && 'localStorage' in window) {
			localStorage.setItem('data', JSON.stringify(newData));
			// TODO: add/update record to the DB
		}
		emitter.emit('change');
	},

	addListener(eventType: string, fn: Function) {
		emitter.addListener(eventType, fn);
	},

	getCount(): number {
		setTimeout(() => {
			return data.count();
		}, 253);
	},

	getRecord(recordId: number): ?Object {
		return data.get(recordId);
	},

};

export default CRUDStore