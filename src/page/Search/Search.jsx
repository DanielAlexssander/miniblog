import styles from "./Search.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

// components
import PostDetail from "../../components/PostDetail";
import SearchForm from "../../components/SearchForm";
import { useEffect } from "react";

const Search = () => {
	const query = useQuery();
	const search = query.get("q");

	let { documents: posts } = useFetchDocuments("posts", search);

	console.log(posts);
	console.log(search);

	return (
		<div className={styles.search_container}>
			<h2>Search</h2>
			<SearchForm />
			<div>
				{posts && posts.length === 0 && (
					<div className={styles.noposts}>
						<p>No results found from your search.</p>
						<Link to="/posts/create" className="btn">
							Create the first post about this.
						</Link>
					</div>
				)}
				{posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
			</div>
		</div>
	);
};

export default Search;
