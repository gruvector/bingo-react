/**
 * Created by Mihail on 12/8/2016.
 */
'use strict';

import React from 'react';
import Button from './Button';
import EventsConsts from '../components/EventsConsts';
import SchemaEmail from '../schema-login-email-form';
import Form from './Form';
import CRUDStore from '../flux/CRUDStore';
import ViewManipulator from '../../utils/view-manipulator';

type State = {
	isLogged: boolean,
};

class Login extends React.Component {
	state: State;

	constructor() {
		super();
		this.state = {
			isLogged: CRUDStore.isLoggedIn()
		};

		Login.login = Login.login.bind(this);

		CRUDStore.addListener(EventsConsts.LOGIN_SUCCESS, () => {
			this.setState({isLogged: true});
			ViewManipulator.toggleErrorMessageView(document.querySelector('#errorMsg'),
				'Wrong login details.', false);
		});

		CRUDStore.addListener(EventsConsts.LOGIN_FAILED, () => {
			this.setState({isLogged: false});
			ViewManipulator.toggleErrorMessageView(document.querySelector('#errorMsg'),
				'Wrong login details.', true);
		});

		CRUDStore.addListener(EventsConsts.LOGOUT, () => {
			this.setState({isLogged: false});
		});
	}

	static login() {
		CRUDStore.checkLogin(this.refs.loginForm.getData());
	}

	render() {
		return <div style={{display: this.state.isLogged ? 'none' : 'block'}}>
			<h3>Bingo Bigul Back Office Login</h3>
			<Form fields={SchemaEmail} ref="loginForm" />
			<Button onClick={Login.login}>
				Login
			</Button>
			<footer>
				<span>&copy; 2016{new Date().getFullYear()>2016 && document.write("-"+new Date().getFullYear());} <a href="mailto: me@mihail-gaberov.eu">Mihail Gaberov</a>.</span>
			</footer>
		</div>
	}
}
export default Login
