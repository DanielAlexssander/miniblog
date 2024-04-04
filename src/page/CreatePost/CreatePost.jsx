import styles from "./CreatePost.module.css";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState(null);

	const { user } = useAuthValue();

	const { insertDocument, response } = useInsertDocument("posts");

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

		insertDocument({
			title,
			image,
			body,
			tags: tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		});

		navigate("/");
	};

	return (
		<div className={styles.create_post}>
			<h1>Create a Post</h1>
			<p>Write about whatever you want and share your knowledge</p>
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
				{!response.loading && (
					<button className={"btn " + styles.btn_post}>Post</button>
				)}
				{response.loading && (
					<button className={"btn " + styles.btn_post} disabled>
						Wainting...
					</button>
				)}
				{response.error ||
					(formError && <p className="error">{response.error || formError}</p>)}
			</form>
		</div>
	);
};

export default CreatePost;
