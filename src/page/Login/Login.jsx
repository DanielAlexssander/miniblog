import styles from "./Login.module.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAthentication";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { login, error: authError, loading } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		const user = {
			email,
			password,
		};

		const res = await login(user);

		console.log(user);
	};

	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);

	return (
		<div className={styles.login}>
			<h2>Login</h2>
			<p>Log in now and make posts.</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>E-mail:</span>
					<input
						type="email"
						name="email"
						required
						placeholder="Type your E-mail"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</label>
				<label>
					<span>Password:</span>
					<input
						type="password"
						name="password"
						required
						placeholder="Type your password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</label>
				<Link className={styles.register_now} to="/register">
					Haven't registered yet? Register now!
				</Link>
				{!loading && (
					<button className={"btn " + styles.btn_login}>Login</button>
				)}
				{loading && (
					<button className={"btn " + styles.btn_login} disabled>
						Wainting...
					</button>
				)}
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	);
};

export default Login;
