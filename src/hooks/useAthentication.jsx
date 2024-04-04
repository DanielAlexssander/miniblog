import { db } from "../firebase/config";

import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { useState, userEffect } from "react";

export const useAuthentication = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(null);

	// CLEAN UP
	const [cancelled, setCancelled] = useState(false);

	const auth = getAuth();

	function checkIfIsCancelled() {
		if (cancelled) return;
	}

	// Register
	const createUser = async (data) => {
		checkIfIsCancelled();

		setLoading(true);
		setError(null);

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			await updateProfile(user, { displayName: data.displayName });

			setLoading(false);

			return user;
		} catch (error) {
			console.log(error.message);
			console.log(typeof error.message);

			let systemErrorMessage;

			if (error.message.includes("Password")) {
				systemErrorMessage = "Password must contain at least 6 characters.";
			} else if (error.message.includes("email-already")) {
				systemErrorMessage = "E-mail already registered.";
			} else {
				systemErrorMessage = "An error occurred, please try later";
			}

			setLoading(false);

			setError(systemErrorMessage);
		}
	};

	// LogOut
	const logout = () => {
		checkIfIsCancelled(true);

		signOut(auth);
	};

	// LogIn
	const login = async (data) => {
		checkIfIsCancelled();

		setLoading(true);
		setError(false);

		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			setLoading(false);
		} catch (error) {
			let systemErrorMessage;

			if (error.message) {
				systemErrorMessage = "Username or password is invalid";
			}

			setError(systemErrorMessage);

			setLoading(false);
		}
	};

	// userEffect(() => {
	// 	return () => setCancelled(true);
	// }, []);
	return { auth, createUser, error, loading, logout, login };
};
