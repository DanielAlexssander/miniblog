import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<div className={styles.about}>
			<h2>
				About the Mini <span>Blog</span>
			</h2>
			<p>
				This project consists of a blog created using React on the front-end and
				Firebase on the back-end.
			</p>
			<span>
				Created by{" "}
				<a
					className={styles.portfolio}
					href="https://danielalexssander.github.io/Portfolio/"
					target="blank"
				>
					Daniel Alexssander
				</a>
			</span>
			<Link className={"btn " + styles.create_post} to="/posts/create">
				Create a Post
			</Link>
		</div>
	);
};

export default About;
