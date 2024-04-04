import styles from "./Register.module.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAthentication";

const Register = () => {
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const { createUser, error: authError, loading } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		const user = {
			displayName,
			email,
			password,
		};

		if (password !== confirmPassword) {
			setError("Confirm password correctly");
			console.log(error);
			return;
		}

		const res = await createUser(user);

		console.log(user);
	};

	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);

	return (
		<div className={styles.register}>
			<h2>Register to post</h2>
			<p>Create your username and share your stories</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Name:</span>
					<input
						type="name"
						name="displayName"
						required
						placeholder="Type your name"
						value={displayName}
						onChange={(e) => {
							setDisplayName(e.target.value);
						}}
					/>
				</label>
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
				<label>
					<span>Confirm your Password:</span>
					<input
						type="password"
						name="confirmPassword"
						required
						placeholder="Confirm your password"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
					/>
				</label>
				{!loading && (
					<button className={"btn " + styles.btn_register}>Register</button>
				)}
				{loading && (
					<button className={"btn " + styles.btn_register} disabled>
						Wainting...
					</button>
				)}
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	);
};

export default Register;
