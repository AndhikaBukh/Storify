import { FC } from 'react';
import './seperator.css';

interface SeperatorProps {
	type?: 'horizontal' | 'vertical';
	show?: boolean;
	className?: string;
	borderWidth?: number;
	fade?: boolean;
}

export const Seperator: FC<SeperatorProps> = props => {
	const {
		show = true,
		className,
		type = 'horizontal',
		borderWidth,
		fade,
	} = props;

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
			<div
				className={
					handleClassname() + (fade ? ' seperator-element--fade' : '')
				}
				style={
					type === 'vertical'
						? { minWidth: borderWidth }
						: { minHeight: borderWidth }
				}
			></div>
		</div>
	) : null;
};
