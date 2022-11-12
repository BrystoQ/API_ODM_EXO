import { Component } from "react";
import axios from "axios";

export default class newPost extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "" };
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
    this.newPost();
    event.preventDefault();
  };

  newPost = () => {
    if (!this.state.title || !this.state.content) {
      throw new Error("Title and content cannot be empty");
    }
    const body = {
      title: this.state.title,
      content: this.state.content,
    };

    axios
      .post("http://localhost:3000/posts", body)
      .then((res) => this.setState({ reponse: true, status: res.status }))
      .catch((error) => console.log());
  };

  render = () => {
    return (
      <>
        <h1>New post</h1>
        <form>
          <label>title</label>
          <input
            type="text"
            name="text"
            placeholder="text"
            value={this.state.text}
            required
            onChange={this.handleChange}
          />
          <label>Content</label>
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={this.state.content}
            required
            onChange={this.handleChange}
          />
          <button type={"submit"} value="New Post">
            <span>New Post</span>
          </button>
        </form>
      </>
    );
  };
}
