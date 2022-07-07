import { FC } from 'react';
import './seperator.css';

interface SeperatorProps {
	type?: 'horizontal' | 'vertical';
	show?: boolean;
	className?: string;
}

export const Seperator: FC<SeperatorProps> = props => {
	const { show = true, className, type = 'horizontal' } = props;

	const handleClassname = () => {
		return type === 'horizontal'
			? className
				? `seperator-element seperator-element--horizontal ${className}`
				: 'seperator-element seperator-element--horizontal'
			: className
			? `seperator-element seperator-element--vertical ${className}`
			: 'seperator-element seperator-element--vertical';
	};

	return show && show ? (
		<div className="seperator-container">
			<div className={handleClassname()}></div>
		</div>
	) : null;
};
