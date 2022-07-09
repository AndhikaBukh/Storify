import React, { useRef } from 'react';
import './index.css';
import { Navbar } from '../../components/navbar/navbar';
import { Input } from '../../components/input/input';
import { PenIcon } from '../../components/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/button';

export const DebugPage = () => {
	const navigate = useNavigate();
	const getRoutesRef = useRef<HTMLInputElement>(null);

	const handleSpecificRoute = () => {
		navigate(`/${getRoutesRef.current?.value}`);
	};

	return (
		<div className="debug">
			<Navbar type="top" />

			<div className="debug__content">
				<div className="debug__content__container">
					<div className="debug__content__header">
						Go To Specific Routes
					</div>
					<Input
						type="link"
						placeholder="Routes pathname here!"
						refElement={getRoutesRef}
					/>

					<Button type="primary" onClick={handleSpecificRoute}>
						Go To This Routes
					</Button>
				</div>

				<div className="debug__content__container">
					<div className="debug__content__header">
						This is {'<Input />'} Component
					</div>
					<Input />
					<Input placeholder="This is a placeholder" />
					<Input
						icon={<PenIcon />}
						placeholder="This is a placeholder"
					/>
				</div>

				<div className="debug__content__container">
					<div className="debug__content__header">
						This is {'<Button />'} Component
					</div>
					<Button type="primary">Primary</Button>
					<Button type="bold">Bold</Button>
					<Button type="optional">Optional</Button>
				</div>
			</div>

			{/* <Navbar type="bottom" /> */}
		</div>
	);
};
