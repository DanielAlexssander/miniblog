import "./App.css";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	// Navigate,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAthentication";

// Context
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./page/Home/Home";
import About from "./page/About/About";
import Register from "./page/Register/Register";
import Login from "./page/Login/Login";
import CreatePost from "./page/CreatePost/CreatePost";
import Dashboard from "./page/Dashboard/Dashboard";
import Search from "./page/Search/Search";
import Post from "./page/Post/Post";
import EditPost from "./page/EditPost/EditPost";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
	const [user, setUser] = useState(undefined);
	const { auth } = useAuthentication();

	const laodingUser = user === undefined;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, [auth]);

	if (laodingUser) {
		return <p>Loading...</p>;
	}

	return (
		<div className="App">
			<AuthProvider value={{ user }}>
				<BrowserRouter>
					<NavBar />
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/search" element={<Search />} />
							<Route path="/posts/:id" element={<Post />} />
							<Route
								path="/login"
								element={!user ? <Login /> : <Navigate to="/" />}
							/>
							<Route
								path="/register"
								element={!user ? <Register /> : <Navigate to="/" />}
							/>
							<Route
								path="/posts/edit/:id"
								element={user ? <EditPost /> : <Navigate to="/login" />}
							/>
							<Route
								path="/posts/create"
								element={user ? <CreatePost /> : <Navigate to="/login" />}
							/>
							<Route
								path="/dashboard"
								element={user ? <Dashboard /> : <Navigate to="/login" />}
							/>
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
