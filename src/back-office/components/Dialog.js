import Button from './Button';
import React from 'react';

class Dialog extends React.Component {

	componentWillUnmount() {
		document.body.classList.remove('dialog-modal-open');
	}

	componentDidMount() {
		if (this.props.modal) {
			document.body.classList.add('dialog-modal-open');
		}
	}

	render() {
		return (
			<div className={this.props.modal ? 'dialog dialog-modal' : 'dialog'}>
				<div className={this.props.modal ? 'dialog-modal-wrap' : null}>
					<div className="dialog-header">{this.props.header}</div>
					<div className="dialog-body">{this.props.children}</div>
					<div className="dialog-footer">
						{this.props.hasCancel
							? <span
							className="dialog-dismiss"
							onClick={this.props.onAction.bind(this, 'dismiss')}>
                  Cancel
                </span>
							: null
						}
						<Button onClick={this.props.onAction.bind(this,
							this.props.hasCancel ? 'confirm' : 'dismiss')}>
							{this.props.confirmLabel}
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

Dialog.defaultProps = {
	confirmLabel: 'OK',
	modal: false,
	onAction: () => {},
	hasCancel: true
};

export default Dialog;
