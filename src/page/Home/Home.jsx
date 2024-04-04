import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components
import PostDetail from "../../components/PostDetail";
import SearchForm from "../../components/SearchForm";

const Home = () => {
	const { documents: posts, loading } = useFetchDocuments("posts");

	return (
		<div className={styles.home}>
			<h1>Home</h1>
			<p>Check out our latest posts below.</p>
			<SearchForm />
			<div>
				{loading && <p>Loading...</p>}
				{posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
				{posts && posts.length === 0 && (
					<div className={styles.noposts}>
						<p>No posts were found.</p>
						<Link to="/posts/create" className="btn">
							Create first post
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
