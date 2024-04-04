import styles from "./EditPost.module.css";

import { useNavigate, useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
	const { id } = useParams();
	const { document: post } = useFetchDocument("posts", id);

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState(null);

	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setBody(post.body);
			setImage(post.image);

			const textTags = post.tags.join(", ");

			setTags(textTags);
		}
	}, [post]);

	const { user } = useAuthValue();

	const { updateDocument, response } = useUpdateDocument("posts");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError("");

		try {
			new URL(image);
		} catch (error) {
			return setFormError("The image needs to be a URL.");
		}
		if (!title || !image || !tags || !body) {
			return setFormError("Please fill in all the fields above!");
		}

		const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

		const data = {
			title,
			image,
			body,
			tags: tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		};

		updateDocument(id, data);

		navigate("/dashboard");
	};

	return (
		<div className={styles.edit_post}>
			{post && (
				<>
					<h1>Editing post: {post.title}</h1>
					<p>Edit the post information as desired</p>
					<form onSubmit={handleSubmit}>
						<label>
							<span>Title:</span>
							<input
								type="text"
								name="title"
								placeholder="Think of a good title..."
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
						</label>
						<label>
							<span>Image URL:</span>
							<input
								type="text"
								name="image"
								placeholder="Insert an image that represents your post"
								onChange={(e) => setImage(e.target.value)}
								value={image}
							/>
						</label>
						<label>
							<span>Content:</span>
							<textarea
								name="body"
								placeholder="Insert the content of the post"
								onChange={(e) => setBody(e.target.value)}
								value={body}
							></textarea>
						</label>
						<label>
							<span>Tags:</span>
							<input
								type="text"
								name="tags"
								placeholder="Enter the tags separated by commas"
								onChange={(e) => setTags(e.target.value)}
								value={tags}
							/>
						</label>
						<div className={styles.btn_post}>
							{!response.loading && <button className="btn">Edit</button>}
							{response.loading && (
								<button className="btn" disabled>
									Wainting...
								</button>
							)}
							<Link className="btn btn-outline" to="/dashboard">
								Cancel
							</Link>
						</div>
						{response.error ||
							(formError && (
								<p className="error">{response.error || formError}</p>
							))}
						<div className={styles.preview_image}>
							<p>Image preview:</p>
							<img src={image} alt="" />
						</div>
					</form>
					{/* {post && new URL(image) && (
						
					)} */}
				</>
			)}
		</div>
	);
};

export default EditPost;
