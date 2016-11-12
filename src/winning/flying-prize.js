/**
 * Created by Mihail on 11/10/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';
import Animator from '../utils/animator';

class FlyingPrize {
	constructor(sum) {
		this.sum = sum;

		document.addEventListener(EventsConsts.PRIZE_WON, () => {
			if (this.sum > 0) {
				FlyingPrize.animatePrizeFlying(this.sum);
				this.sum = 0;
			}
		});
	}

	static animatePrizeFlying(sum) {
		const elFlyingPrize = document.createElement('div');
		elFlyingPrize.setAttribute('id', 'flyingPrize');
		elFlyingPrize.innerHTML = sum;
		document.body.appendChild(elFlyingPrize);
		//Animator.move(elFlyingPrize, 100, 1000, Animator.linear, 3000, 'px');
	}
}

export default FlyingPrize;