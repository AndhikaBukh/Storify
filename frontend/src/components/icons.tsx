import React, { FC } from 'react';

interface IconProps {
	color?: string;
}

export const BellIcon: FC<IconProps> = ({ color }) => (
	<svg viewBox="0 0 24 24">
		<path
			fill={color !== undefined ? color : 'white'}
			d="M9.99877 19.75H13.9988C13.9988 20.75 13.2818 21.75 11.9988 21.75C10.7158 21.75 9.99877 20.75 9.99877 19.75ZM20.2408 15.5249L19.1348 13.679C18.7158 12.98 18.4948 12.1799 18.4948 11.3669V8.73999C18.4948 5.16099 15.5808 2.25 11.9998 2.25C8.41877 2.25 5.50476 5.16099 5.50476 8.73999V11.3669C5.50476 12.1799 5.28376 12.98 4.86476 13.679L3.75876 15.5249C3.42076 16.0869 3.41277 16.7649 3.73677 17.3369C4.06077 17.9089 4.64676 18.25 5.30376 18.25H18.6978C19.3558 18.25 19.9418 17.9079 20.2658 17.3369C20.5868 16.7659 20.5788 16.0879 20.2408 15.5249Z"
		/>
	</svg>
);

export const MenuIcon: FC<IconProps> = ({ color }) => (
	<svg viewBox="0 0 24 24">
		<path
			fill={color !== undefined ? color : 'white'}
			d="M22 5C22 4.447 21.552 4 21 4H8C7.448 4 7 4.447 7 5C7 5.553 7.448 6 8 6H21C21.552 6 22 5.553 22 5ZM3 11H21C21.552 11 22 11.447 22 12C22 12.553 21.552 13 21 13H3C2.448 13 2 12.553 2 12C2 11.447 2.448 11 3 11ZM12 18H21C21.552 18 22 18.447 22 19C22 19.553 21.552 20 21 20H12C11.448 20 11 19.553 11 19C11 18.447 11.448 18 12 18Z"
		/>
	</svg>
);

export const PassIcon: FC<IconProps> = ({ color }) => (
	<svg viewBox="0 0 24 24">
		<path
			fill={color !== undefined ? color : 'white'}
			d="M21 7V17C21 19.757 18.757 22 16 22H12C11.448 22 11 21.553 11 21C11 20.447 11.448 20 12 20H16C17.654 20 19 18.654 19 17V7C19 5.346 17.654 4 16 4H12C11.448 4 11 3.553 11 3C11 2.447 11.448 2 12 2H16C18.757 2 21 4.243 21 7ZM14.923 12.382C15.024 12.138 15.024 11.862 14.923 11.618C14.872 11.495 14.799 11.385 14.706 11.292L10.707 7.29297C10.316 6.90197 9.684 6.90197 9.293 7.29297C8.902 7.68397 8.902 8.31603 9.293 8.70703L11.586 11H4C3.448 11 3 11.447 3 12C3 12.553 3.448 13 4 13H11.586L9.293 15.293C8.902 15.684 8.902 16.316 9.293 16.707C9.488 16.902 9.744 17 10 17C10.256 17 10.512 16.902 10.707 16.707L14.706 12.708C14.799 12.615 14.872 12.505 14.923 12.382Z"
		/>
	</svg>
);

export const UserIcon: FC<IconProps> = ({ color }) => (
	<svg viewBox="0 0 24 24">
		<path
			fill={color !== undefined ? color : 'white'}
			d="M12 13C15.033 13 17.5 10.532 17.5 7.5C17.5 4.468 15.033 2 12 2C8.967 2 6.5 4.468 6.5 7.5C6.5 10.532 8.967 13 12 13ZM12 4C13.93 4 15.5 5.57 15.5 7.5C15.5 9.43 13.93 11 12 11C10.07 11 8.5 9.43 8.5 7.5C8.5 5.57 10.07 4 12 4ZM20 17.967V18.978C20 19.974 19.636 20.929 18.975 21.667C18.777 21.888 18.504 22 18.229 22C17.992 22 17.753 21.916 17.562 21.745C17.15 21.377 17.116 20.744 17.484 20.333C17.816 19.962 17.999 19.48 17.999 18.978V17.967C17.999 16.568 17.072 15.358 15.746 15.025C15.554 14.977 15.349 15.001 15.185 15.095C13.204 16.197 10.786 16.191 8.82397 15.101C8.65097 15.002 8.447 14.977 8.255 15.025C6.926 15.358 6 16.568 6 17.967V18.978C6 19.481 6.18301 19.962 6.51501 20.333C6.88301 20.744 6.84801 21.377 6.43701 21.745C6.02501 22.114 5.39302 22.078 5.02502 21.667C4.36402 20.929 4 19.974 4 18.978V17.967C4 15.65 5.54903 13.642 7.76703 13.085C8.45403 12.91 9.19803 13.011 9.80603 13.358C11.155 14.106 12.836 14.1121 14.204 13.3521C14.803 13.0091 15.547 12.909 16.235 13.084C18.451 13.642 20 15.649 20 17.967Z"
		/>
	</svg>
);