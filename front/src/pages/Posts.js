import "./Posts.css";
import { Component } from "react";
import axios from "axios";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      data: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.getPosts();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  getPosts = () => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => this.setState({ data: [...this.state.data, res.data] }))
      .catch((error) => console.log(error));
  };

  render = () => {
    return (
      <>
        <h2>All Posts</h2>
        {this.state.data.length > 0 ? (
          this.state.data.map((key) =>
            key.map((object) => (
              <div className="post" key={object._id}>
                <h3>{object.title}</h3>
                <p>{object.content}</p>
              </div>
            ))
          )
        ) : (
          <div>
            <h3>No Posts Available</h3>
          </div>
        )}
      </>
    );
  };
}
