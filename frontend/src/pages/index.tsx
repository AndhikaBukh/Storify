import type { NextPage } from "next";
import styles from "./index.module.scss";

const Landing: NextPage = () => (
	<div className={styles["landing"]}>
		<div className={styles["landing__logo-container"]}>
			<img
				className={styles["landing__logo"]}
				src="/assets/icons/dart.svg"
				alt=""
			/>
		</div>

		<div className={styles["landing__header"]}>
			<h4 className={styles["landing__header-title"]}>Project Sylly</h4>

			<h1 className={styles["landing__header-description"]}>
				Everything that you need just in your pocket!
			</h1>
		</div>

		<div className={styles["landing__buttons"]}>
			<button
				className={`
					${styles["landing__button"]}
					${styles["landing--login"]}
				`}
			>
				Log In
			</button>

			<button
				className={`
					${styles["landing__button"]}
					${styles["landing--signup"]}
				`}
			>
				Sign Up
			</button>
		</div>
	</div>
);

export default Landing;
