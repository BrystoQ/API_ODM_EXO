import { Component } from "react";
import axios from "axios";
import "./NewPost.css";
export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      message: "",
      response: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    if (!this.state.title || !this.state.content) {
      throw new Error("Title and content cannot be empty");
    } else {
      const body = {
        title: this.state.title,
        content: this.state.content,
      };
      console.log(body);

      axios
        .post("http://localhost:3000/posts", body)
        .then((res) =>
          this.setState({
            status: res.status,
            message: "Post created!",
          })
        )
        .catch((error) => console.log());
    }
    event.preventDefault();
  };

  render = () => {
    return (
      <>
        <h1>New post</h1>
        <form onSubmit={this.handleSubmit}>
          <label>title</label>
          <input
            className="title"
            name={"title"}
            placeholder={"title"}
            value={this.state.title}
            required
            onChange={this.handleChange}
          />
          <label>Content</label>
          <input
            className="content"
            name={"content"}
            placeholder={"Content"}
            value={this.state.content}
            required
            onChange={this.handleChange}
          />
          <input type={"submit"} value={"New Post!"} />
        </form>
      </>
    );
  };
}
