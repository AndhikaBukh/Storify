import React, { FC, useEffect, useRef, useState } from 'react';
import './popup.css';
import {
	CheckCircleFilledIcon,
	ExclamationCircleFilledIcon,
	InfoCircleFilledIcon,
	TimesSquareIcon,
} from '../icons';

interface PopUpProps {
	show?: boolean;
	variant: 'alert' | 'focus' | 'option';
	type: 'success' | 'error' | 'warning' | 'info' | string;
	onClose?: () => void;
	icon?: React.ReactNode;
	header?: React.ReactNode | string;
	content?: React.ReactNode | string;
	footer?: React.ReactNode | string;
	action?: React.ReactNode | string;
	className?: string;
}

export const PopUp: FC<PopUpProps> = ({
	show,
	variant,
	type = 'info',
	onClose,
	icon,
	header,
	content,
	footer,
	action,
	className = '',
}) => {
	const handleVariant = variant ? `pop-up--${variant}` : '';
	const handleType = type ? `pop-up--${type}` : '';
	const handleIcon =
		type === 'error' ? (
			<ExclamationCircleFilledIcon color="#F05454" />
		) : type === 'success' ? (
			<CheckCircleFilledIcon color="#16C79A" />
		) : type === 'warning' ? (
			<ExclamationCircleFilledIcon color="#FFCA00" />
		) : type === 'info' ? (
			<InfoCircleFilledIcon color="#00A0FF" />
		) : (
			icon
		);

	const handleAnimation = show ? 'pop-up--show' : '';
	const [handleDisplay, setHandleDisplay] = useState('flex');

	useEffect(() => {
		if (!show) {
			setTimeout(() => {
				setHandleDisplay('none');
			}, 200);
		} else {
			setTimeout(() => {
				setHandleDisplay('flex');
			}, 0);
		}
	}, [show]);

	return variant === 'alert' ? (
		<div
			className={`pop-up ${handleVariant} ${handleType} ${handleAnimation} ${className}`}
			style={{ display: handleDisplay }}
		>
			<div className="pop-up__icon">{handleIcon}</div>

			<div className="pop-up__wrapper">
				<div className="pop-up__header">{header}</div>

				<div className="pop-up__content">{content}</div>

				{footer && <div className="pop-up__footer">{footer}</div>}
			</div>

			<div className="pop-up__button-container">
				{action && (
					<button className="pop-up__button-container__button">
						{action}
					</button>
				)}

				<button
					className="pop-up__button-container__button"
					onClick={onClose}
				>
					<TimesSquareIcon color="#ffffff80" />
				</button>
			</div>
		</div>
	) : variant === 'focus' ? (
		<div className="pop-up pop-up--focus">
			<div className="pop-up__wrapper">
				<div className="pop-up__header">
					<h1 className="pop-up__header-title">
						Hi There! <br />
						Welcome Back.
					</h1>
				</div>

				<div className="pop-up__content">{content}</div>

				<div className="pop-up__footer">{footer}</div>

				<div className="pop-up__button-container">{action}</div>
			</div>
		</div>
	) : variant === 'option' ? (
		<div className="pop-up pop-up--option">
			<div className="pop-up__wrapper">
				<div className="pop-up__header">
					<h1 className="pop-up__header-title">
						Hi There! <br />
						Welcome Back.
					</h1>
				</div>

				<div className="pop-up__content">{content}</div>

				<div className="pop-up__footer">{footer}</div>

				<div className="pop-up__button-container">{action}</div>
			</div>
		</div>
	) : null;
};
