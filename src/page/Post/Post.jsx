import styles from "./Post.module.css";

// hook
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
	const { id } = useParams();
	const { document: post, loading } = useFetchDocument("posts", id);

	return (
		<div className={styles.post_container}>
			{loading && <p>Loading...</p>}
			{post && (
				<>
					<h1>{post.title}</h1>
					<img src={post.image} alt={post.title} />
					<p>{post.body}</p>
					<h3>This post is about:</h3>
					<div className={styles.tags}>
						{post.tags.map((tag) => (
							<p key={tag}>
								<span>#</span>
								{tag.toUpperCase()}
							</p>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Post;
