import styles from "./SearchForm.module.css";

// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
	const [query, setQuery] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<form className={styles.search_form} onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search by tags."
				onChange={(e) => setQuery(e.target.value)}
				value={query}
			/>
			<button className="btn btn-dark">Search</button>
		</form>
	);
};

export default SearchForm;
