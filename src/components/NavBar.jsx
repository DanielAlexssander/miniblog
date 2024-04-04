import styles from "./NavBar.module.css";

import { useAuthentication } from "../hooks/useAthentication";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import { useAuthValue } from "../context/AuthContext";

import { NavLink } from "react-router-dom";

const NavBar = () => {
	const { user } = useAuthValue();
	const location = useLocation();

	const { logout } = useAuthentication();
	const [confirmLogout, setConfirmLogout] = useState(false);

	return (
		<nav className={styles.navbar}>
			<NavLink to="/" className={styles.brand}>
				Mini <span>Blog</span>
			</NavLink>
			<ul className={styles.links_list}>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? styles.active : "")}
					>
						Home
					</NavLink>
				</li>
				{!user && (
					<li>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								isActive || location.pathname === "/register"
									? styles.active
									: ""
							}
						>
							Login / Register
						</NavLink>
					</li>
				)}
				{user && (
					<>
						<li>
							<NavLink
								to="/posts/create"
								className={({ isActive }) => (isActive ? styles.active : "")}
							>
								New Post
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/dashboard"
								className={({ isActive }) => (isActive ? styles.active : "")}
							>
								Dashboard
							</NavLink>
						</li>
					</>
				)}
				<li>
					<NavLink
						to="/about"
						className={({ isActive }) => (isActive ? styles.active : "")}
					>
						About
					</NavLink>
				</li>
				{user && (
					<li>
						<button onClick={() => setConfirmLogout(true)}>LogOut</button>
					</li>
				)}
				{confirmLogout && (
					<div className={styles.confirm_logout}>
						<h3>Are you sure you want to logout?</h3>
						<button
							className={styles.exit}
							onClick={() => {
								logout();
								setConfirmLogout(false);
							}}
						>
							Exit
						</button>
						<button
							className={styles.cancel}
							onClick={() => setConfirmLogout(false)}
						>
							Cancel
						</button>
					</div>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
