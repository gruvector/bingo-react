/**
 * Created by Mihail on 9/8/2016.
 */
/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import assert from 'assert';
import { NumbersGeneration } from '../../src/utils/numbers-generation';
import { expect } from 'chai';

describe('Numbers generation util', () => {

	let arrAmericanNumbers = [
		1, 2, 3, 4, 5,
		6, 7, 8, 9, 10,
		11, 12, 13, 14, 15,
		16, 17, 18, 19, 20,
		21, 22, 23, 24, 25,
		26, 27, 28, 29, 30,
		31, 32, 33, 34, 35,
		36, 37, 38, 39, 40,
		41, 42, 43, 44, 45,
		46, 47, 48, 49, 50,
		51, 52, 53, 54, 55,
		56, 57, 58, 59, 60,
		61, 62, 63, 64, 65,
		66, 67, 68, 69, 70,
		71, 72, 73, 74, 75
	];

	it ('Should produce random number between min and max values', () => {
		let min = 1, max = 5, res1 = 0, res2 = 0;
		while (res1 === res2) {
			res1 = NumbersGeneration.getRandomNumber(min, max)
			res2 = NumbersGeneration.getRandomNumber(min, max)
		}

		expect(res1).not.to.be.equal(res2);
	});

	/*it ('Should do random generation of 24 numbers by columns - first: B is 1-15', () => {
		//console.log(NumbersGeneration.getFirstColumnAmerican(arrAmericanNumbers));
		//NumbersGeneration.getFirstColumnAmerican(arrAmericanNumbers);
	});*/
});